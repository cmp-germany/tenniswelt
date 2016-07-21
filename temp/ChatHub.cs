using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MonoSoftware.MonoX.Utilities;
using System.Threading.Tasks;
using System.Collections;
using System.Text;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using MonoSoftware.MonoX.Repositories;
using MonoSoftware.MonoX.Chat.DAL.EntityClasses;
using MonoSoftware.MonoX.Common.DependencyInjection;

namespace MonoSoftware.MonoX.ModuleGallery.Chat
{
    [HubName("chat")]
    public class ChatHub : Hub
    {
        private static readonly DateTime jsReferenceTime = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        private ChatRepository _repository = null;
        protected ChatRepository repository
        {
            get
            {
                if (_repository == null)
                    _repository = DIFactory.ResolveWithoutContext<ChatRepository>();

                return _repository;
            }
        }

        public void Send(string sessionId, string message)
        {
            var session = repository.GetSession(new Guid(sessionId));
            int messageLimit = 1000;

            Guid senderId = SecurityUtility.GetUserId();
            // Find participant.
            ChatParticipantEntity participant = session.ChatParticipants.FirstOrDefault(p => !p.LeaveDate.HasValue && p.UserId == senderId);

            if (message.Length > messageLimit)
                message = message.Substring(0, messageLimit);

            if (participant != null)
            {
                ChatMessageEntity messageEntity = repository.SaveMessage(participant.Id, message);
                messageEntity.ChatParticipant = participant;

                object messageDetails = new
                {
                    sessionId = sessionId,
                    participants = session.ChatParticipants.Select(p => new { userId = p.UserId, userName = p.AspnetUser.DisplayName }).ToArray(),
                    message = RenderMessage(messageEntity)
                };
                foreach (string connectionId in session.ChatParticipants.Select(p => p.UserId.ToString()).Distinct())
                {
                    // Group name is user id.
                    this.Clients.Group(connectionId).addMessage(messageDetails);
                }
            }
            else
            {
                throw new Exception(String.Format("User is not participant in this session({0})", sessionId));
            }
        }

        public object StartNewSession(string userId)
        {
            Guid initiatorId = SecurityUtility.GetUserId(this.Context.User.Identity.Name);
            Guid callingUserId = new Guid(userId);
            ChatRepository chatRep = repository;
            var session = chatRep.FindSession(initiatorId, callingUserId);

            object result;
            if (session != null)
            {
                result = new
                {
                    sessionId = session.Id,
                    participants = session.ChatParticipants.Select(p => new { userId = p.UserId, userName = p.AspnetUser.UserName, displayName = p.AspnetUser.DisplayName }).ToArray(),
                    history = this.GenerateHistory(initiatorId, session.Id),
                };
            }
            else
            {
                session = chatRep.CreateSession(new Guid[] { initiatorId, callingUserId }.ToList());
            }

            return new
            {
                sessionId = session.Id,
                participants = session.ChatParticipants.Select(p => new { userId = p.UserId, userName = p.AspnetUser.UserName, displayName = p.AspnetUser.DisplayName }).ToArray(),
                history = this.GenerateHistory(initiatorId, session.Id),
            };
        }

        public void LeaveSession(string sessionId)
        {
            var userId = SecurityUtility.GetUserId(this.Context.User.Identity.Name);

            repository.LeaveSession(new Guid(sessionId), userId);
        }

        public void UpdateSessionFocus(string sessionId, bool focused)
        {
            repository.UpdateSessionFocus(new Guid(sessionId), SecurityUtility.GetUserId(this.Context.User.Identity.Name), focused);
        }

        public object GetHistory(string sessionId)
        {
            return new { sessionId = sessionId, history = this.GenerateHistory(SecurityUtility.GetUserId(this.Context.User.Identity.Name), new Guid(sessionId)) };
        }


        private string GenerateHistory(Guid userId, Guid sessionId)
        {
            StringBuilder historyHtml = new StringBuilder();

            List<ChatMessageEntity> history = repository.GetSessionHistory(sessionId, userId, 20);
            history.Reverse();
            history.ForEach(p => historyHtml.Append(RenderMessage(p)));

            return historyHtml.ToString();
        }

        private string RenderMessage(ChatMessageEntity messageEntity)
        {
            Hashtable tags = new Hashtable();
            //MonoSoftware.MonoX.Blog.Gravatar avatar = new MonoSoftware.MonoX.Blog.Gravatar();
            //avatar.UserName = messageEntity.ChatParticipant.AspnetUser.UserName;
            UserInfo uInfo = new UserInfo();
            uInfo.UserId = messageEntity.ChatParticipant.AspnetUser.UserId.ToString();
            uInfo.UserName = messageEntity.ChatParticipant.AspnetUser.DisplayName;
            string avatarUrl = Functions.UserAvatar(uInfo.UserId, uInfo.Name);
            tags.Add("<# Avatar #>", avatarUrl);
           // tags.Add("<# Avatar #>", avatar);
            tags.Add("<# Username #>", messageEntity.ChatParticipant.AspnetUser.DisplayName);
            tags.Add("<# Time #>", String.Format("$time:{0}$", ToJavascriptTicks(messageEntity.DateCreated)));
            tags.Add("<# Message #>", messageEntity.Message);
            return MonoXUtility.RenderMonoXTemplate(MonoXUtility.GetTemplateHtml(ChatSettings.ChatTemplates.ChatMessage_htm), tags);
        }

        private long ToJavascriptTicks(DateTime date)
        {
            return (long)date.Subtract(jsReferenceTime).TotalMilliseconds;
        }

        #region Connect Members


        public override Task OnConnected()
        {
            return Connect();
            //return base.OnConnected();
        }

        public override Task OnDisconnected()
        {
            //Guid userId = SecurityUtility.GetUserId(this.Context.User.Identity.Name);
            //this.Groups.Remove(this.Context.ConnectionId, userId.ToString());
            //this.Clients.All.setUserStatus(userId.ToString(), false);
            return base.OnDisconnected();
        }

        public override Task OnReconnected()
        {
            return base.OnReconnected();
        }

        public Task Connect()
        {
            Guid userId = SecurityUtility.GetUserId(this.Context.User.Identity.Name);
            repository.UpdateLastActivityDate(userId);

            this.Groups.Add(this.Context.ConnectionId, userId.ToString());

            ChatSessionEntity focusedSession = repository.GeFocusedSession(userId);
            if (focusedSession != null)
            {
                Clients.Caller.restoreState(new
                {
                    sessionId = focusedSession.Id,
                    participants = focusedSession.ChatParticipants.Select(p => new
                    {
                        userId = p.UserId,
                        userName = p.AspnetUser.UserName,
                        displayName = p.AspnetUser.DisplayName
                    }).ToArray(),
                    history = this.GenerateHistory(userId, focusedSession.Id),
                    isNew = false
                });
            }

            return Clients.Caller.setUserStatus(userId.ToString(), true);
        }

        public Task Reconnect(IEnumerable<string> groups)
        {
            return null;
        }
        #endregion
    }
}
