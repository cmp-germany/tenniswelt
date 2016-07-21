<%@ Control Language="C#"
    AutoEventWireup="true"
    CodeBehind="ChatModule.ascx.cs"
    Inherits="MonoSoftware.MonoX.ModuleGallery.Chat.ChatModule" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%@ Import Namespace="MonoSoftware.Web" %>
<%@ Import Namespace="MonoSoftware.MonoX.Resources" %>

<div class="chat-users">
    <div class="notification-holder" style="position: relative;"></div>
    <div class="chat-users-header" onclick="$(this).parent().find('.chat-users-body').toggle()">
        <%-- Language.GetValue(Language.Keys.Default.Chat_Title) --%>
        <%= "Chat" %>
    </div>
    <div class="chat-users-body" style="display: block;">
        <div class="user-list">
            <%--  <%= this.GetInitialUserList() %>--%>
        </div>
        <div class="chat-search _actions alignment--center">
                <asp:TextBox ID="txtSearch" runat="server"></asp:TextBox>
                <ajaxToolkit:TextBoxWatermarkExtender ID="tbweSearch" runat="server" TargetControlID="txtSearch" WatermarkCssClass="chat-focus" WatermarkText="." />
        </div>

    </div>
</div>

<div class="chat-sessions">
</div>

<div class="chat-session-users" style="display: none">
</div>
<div class="chat-new-list" style="display: none">
</div>
<script type="text/javascript">
    $(function () {
        // Proxy created on the fly
        var chat = $.connection.chat;

        var chatSessionList = {
            list: new Array(),
            active: null,
            add: function (key, value) {
                var oldValue = this[key];
                if (oldValue == undefined) {
                    this.list.push(value);
                } else {
                    var valueIndex;
                    $.each(this.list, function (index, chatSession) {
                        if (chatSession === oldValue) {
                            valueIndex = index;
                            return false;
                        }
                    });

                    this.list[valueIndex] = value;
                }
                this[key] = value;
            }
        };

        $.chatSessionList = chatSessionList;

        function ChatSession(sessionId) {
            this.sessionId = sessionId;
            this.sessionElement = $('<%= GetSessionHtmlTemplate() %>');
            this.sessionElement.attr('sessionId', sessionId);
            this.participants = new Array();
            this.scrollPosition = 0;
            this.notified = null;
            this.messageList = new Object();
            this.init();
        }



        ChatSession.prototype = {
            init: function () {
                var chatSession = this;
                var $messageBox = chatSession.sessionElement.find('.chat-new-message');
                $messageBox.keydown(function (e) {
                    if (e.which == 13) {
                        sendMessage(chatSession);
                        e.preventDefault();
                        e.stopPropagation();
                    }
                });

                $messageBox.keyup(function () {
                    var limit = 1000;
                    var messagebox = $(this);
                    if (messagebox.val().length > limit) {
                        messagebox.val(messagebox.val().substr(0, limit));
                    }
                });

                chatSession.sessionElement.find(".chat-message-holder").scroll(function () {
                    this.scrollPosition = $(this).scrollTop();
                });

                chatSession.sessionElement.find(".chat-send").click(function (e) {
                    sendMessage(chatSession);
                });

                chatSession.sessionElement.find(".chat-session-header .chat-close").click(function (e) {
                    chat.server.leaveSession(chatSession.sessionId);
                    chatSession.close();
                    e.stopPropagation();
                });

                chatSession.sessionElement.find(".chat-session-header").click(function (e) {
                    var $chatBody = chatSession.sessionElement.find(".chat-session-body");
                    if ($chatBody.is(":visible")) {
                        chatSession.minimize();
                    } else {
                        chatSession.focus();
                    }
                });
            },
            open: function () {
                this.sessionElement.show();
            },
            close: function () {
                this.sessionElement.hide();
                this.minimize();
            },
            minimize: function () {
                this.sessionElement.find(".chat-session-body").hide();
                this.sessionElement.find(".chat-session-header").removeClass("chat-active");

                if (chatSessionList.active == this) {
                    chatSessionList.active = null;
                }

                chat.server.updateSessionFocus(this.sessionId, false);
            },
            focus: function (updateFocus) {

                updateFocus = (typeof updateFocus == "undefined") ? true : updateFocus

                if (chatSessionList.active != null && chatSessionList.active != this) {
                    chatSessionList.active.minimize();
                }
                chatSessionList.active = this;
                if (this.notified != null) {
                    clearInterval(this.notified);
                    this.notified = null;
                }

                this.sessionElement.find(".chat-session-header").removeClass("chat-notify").addClass("chat-active");
                this.sessionElement.find(".chat-session-body").show();
                //this.sessionElement.find(".chat-message-holder").scrollTop(this.scrollPosition);
                this.scrollToBottom();
                this.sessionElement.find('.chat-new-message').focus();
                if (updateFocus)
                    chat.server.updateSessionFocus(this.sessionId, true);
            },
            scrollToBottom: function () {
                var $messageHolder = this.sessionElement.find('.chat-message-holder');
                $messageHolder.scrollTop($messageHolder[0].scrollHeight - $messageHolder.height());
            },
            notify: function () {
                if (this.notified == null && chatSessionList.active != null && chatSessionList.active != this) {
                    var repeat = 3 * 2 + 1
                    var notifyClass = "chat-notify";
                    var $header = this.sessionElement.find(".chat-session-header");
                    var $this = this;
                    this.notified = setInterval(function () {
                        if (repeat == 0) {
                            $header.addClass(notifyClass);
                            clearInterval($this.notified);
                        } else {
                            $header.toggleClass(notifyClass);
                            repeat = repeat - 1;
                        }
                    }, 300);
                }
            },
            get_title: function () {
                return this.sessionElement.find(".chat-session-header .chat-title").html();
            },
            set_title: function (title) {
                this.sessionElement.find(".chat-session-header .chat-title").html(title);
            }
        };

        var chatSessionHolder = $(".chat-sessions");

        var _userId = '<%= MonoSoftware.MonoX.Utilities.SecurityUtility.GetUserId().ToString() %>';

        function createNewSession(sessionId, participants) {
            var chatSession = new ChatSession(sessionId);
            chatSession.participants = participants;

            chatSessionList.add(sessionId, chatSession);

            var title = '';
            $.each(participants, function (index, participant) {
                if (participant.userId == _userId) {
                    chatSession.participantId = participant.id;
                } else {
                    var name = participant.userName;
                    if (!(typeof participant.displayName == "undefined")) {
                        if (!participant.displayName.length == 0) {
                            name = participant.displayName;
                        }
                    }
                    title = title + name + ' ';
                }
            });
            chatSession.set_title(title);
            chatSession.sessionElement.appendTo(chatSessionHolder);
            return chatSession;
        }

        function sendMessage(chatSession) {
            var $messageBox = chatSession.sessionElement.find('.chat-new-message');
            if ($messageBox.val() != '') {
                chat.server.send(chatSession.sessionId, $messageBox.val())
                    .done(function () {
                        $messageBox.val('');
                        $messageBox.focus();
                    });
            }
        };

        function addMessageToSession(chatSession, messages, historical) {
            var $messages = $(messages);

            $messages.find(".message-time").each(function () {
                var $this = $(this);
                var timeString = $this.html();
                var timeIndex = timeString.indexOf('$time:');
                var time = new Date(parseInt(timeString.substring(timeIndex, timeString.indexOf('$', timeIndex + 1)).split(':')[1]));
                var displayTime = time.dateFormat('h:i:s A');

                $this.html('(' + displayTime + '):');
            });

            var $messageHolder = chatSession.sessionElement.find('.chat-message-holder');

            if (historical) {
                if ($messageHolder.children().length > 0) {
                    $messageHolder.children().before($messages);
                } else {
                    $messageHolder.append($messages);
                    chatSession.scrollToBottom();
                }
            } else {
                $messages.appendTo($messageHolder);
            }
        }

        chat.addMessage = function (messageDetails) {
            debugger;
        }

        chat.client.addMessage = function (messageDetails) {
            var chatSession = chatSessionList[messageDetails.sessionId];
            if (chatSession == null) {
                chatSession = createNewSession(messageDetails.sessionId, messageDetails.participants);

                chat.server.getHistory(chatSession.sessionId).done(function (historyDetails) {
                    chat.client.addMessage({ sessionId: historyDetails.sessionId, message: historyDetails.history });
                });
            } else {
                addMessageToSession(chatSession, messageDetails.message, false);

                chatSession.open();
                if (chatSessionList.active == null) {
                    chatSessionList.active = chatSession;
                    chatSession.focus();
                }

                if (chatSessionList.active == chatSession) {
                    chatSession.scrollToBottom();
                } else {
                    chatSession.notify();
                }
            }
        };

        chat.client.restoreState = function (chatSessionDetails) {
            var chatSession = createNewSession(chatSessionDetails.sessionId, chatSessionDetails.participants);

            chatSession.open();
            chatSession.focus(false);

            if (chatSessionDetails.history != null) {
                addMessageToSession(chatSession, chatSessionDetails.history, true);
            }


        };

        chat.client.setUserStatus = function (userId, isOnline) {
            if (_userId == userId) {
                if (!isOnline) {
                    setTimeout(function () { $.connection.hub.stop(); }, 100);
                }
            } else {
                var $userHolder = $(".chat-users .chat-user-holder").find(":input[type='hidden'][value='" + userId + "']").parent();

                if ($userHolder.length > 0) {
                    var onlineClass = "online";
                    var offlineClass = "offline";
                    if (isOnline) {
                        $userHolder.find("." + offlineClass).attr("class", onlineClass);
                    } else {
                        $userHolder.find("." + onlineClass).attr("class", offlineClass);
                    }
                }
            }
        }

        // Start the connection
        $.connection.hub.start({ transport: 'longPolling' });
    });


    function initUserList(list) {
        $(list).click(function () {
            var userId = $(this).find(":input[type='hidden']").val();
            startSession(userId);
        });
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }

    function sortList(list) {
        // var ul = list;
        var propName = "user-name";
        var usernames = [];
        $(".chat-new-list .user-name").each(function (index) {
            usernames[usernames.length] = $(this).html();
        });
        usernames.sort();
        var x = "";
        for (index = 0; index < usernames.length; index++) {
            var temp = "";
            var temp1 = "";
            var prev = list.substring(0, list.indexOf(usernames[index]));
            var after = list.substring(list.indexOf(usernames[index]), list.length - 1);
            var beginindex = prev.lastIndexOf("chat-user-holder") - 12;
            var endindex = after.indexOf("chat-user-holder") - 12;

            if (endindex < 0) {
                temp = after;  //after.substring(0, after.length - 1);
                //  alert('after' +  after);
            }
            else temp = after.substring(0, endindex - 1);
            var y = prev.substring(beginindex, prev.length) + temp;
            x = x + y;
        }
        x = x + "</div>";

        return x;
    }

    function sortUserList() {

        var ul = $(".chat-users").find(".user-list").html();
        //  if ($(".chat-new-list").html() != "")
        //    ul = $(".chat-new-list").html();
        var propName = "user-name";
        var usernames = [];
        $(".chat-users").find(".user-list .user-name").each(function (index) {
            //  console.log( index + ": " + $( this ).html() );
            usernames[usernames.length] = $(this).html();
        });
        usernames.sort();
        var x = "";
        for (index = 0; index < usernames.length; index++) {
            var temp = "";
            var temp1 = "";
            var prev = ul.substring(0, ul.indexOf(usernames[index]));
            var after = ul.substring(ul.indexOf(usernames[index]), ul.length - 1);
            var beginindex = prev.lastIndexOf("chat-user-holder") - 12;
            var endindex = after.indexOf("chat-user-holder") - 12;

            if (endindex < 0) {
                temp = after;
            }
            else temp = after.substring(0, endindex - 1);
            var y = prev.substring(beginindex, prev.length) + temp;
            x = x + y;
        }


        $(".chat-users").find(".user-list").html(x + "</div>");
        $('.chat-user-holder').click(function () {
            var userId2 = $(this).find(":input[type='hidden']").val();
            startSession(userId2);
        });
    }

    function editUserList(userId, isNew) {
        var userlisthtm = $(".chat-users").find(".user-list").html();
        document.cookie = "path=/";
        var x = "";
        if (userlisthtm.indexOf(userId) == -1) {
            var cookie = getCookie("userIds");
            if (cookie.indexOf(userId) == -1) {
                if (cookie.length == 0)
                    document.cookie = "userIds=" + userId + ";path=/";
                else
                    document.cookie = "userIds=" + cookie + ',' + userId + ";path=/";
            }
            var val = '';
            MonoX.WebServices.ChatService.RenderChatUser(userId, function (result) {
                x = result;
                if (isNew == true)
                    userlisthtm = userlisthtm + x;
                else {
                    var tmp = $(".chat-session-users").html() + x;
                    $(".chat-session-users").html(tmp);
                    userlisthtm = userlisthtm + tmp;
                }
                //initUserList(userlisthtm);

                //  userlisthtm = sortList(userlisthtm);
                $("chat-new-list").html(userlisthtm);
                $(".chat-users").find(".user-list").html(userlisthtm);
                if (isNew == false)
                    sortUserList();
                else {
                    $('.chat-user-holder').click(function () {
                        var userId2 = $(this).find(":input[type='hidden']").val();
                        startSession(userId2);
                    });
                }
            });
        }

        return "";
    }

    function refreshUserList(userId) {
        var userlisthtm = $(".chat-users").find(".user-list").html();
        var x = "";
        if (userlisthtm.indexOf(userId) == -1) {
            MonoX.WebServices.ChatService.GetInitialUserList(function (result) {
                var userList = $(result);
                // $("chat-new-list").html(userList);
                $(".chat-users").find(".user-list").html(userList);
                $('.chat-user-holder').click(function () {
                    var userId2 = $(this).find(":input[type='hidden']").val();
                    startSession(userId2);
                });
                //  sortUserList();
            });

        }
    }


    function addUsersInCookie() {
        document.cookie = "path=/";
        //alert(document.cookie);
        var userlisthtm = $(".chat-users").find(".user-list").html();
        var cookie = getCookie("userIds");
        if (cookie.length = 0) return;
        while (cookie.indexOf(',') > -1) {
            var userId = cookie.substring(0, cookie.indexOf(','));
            editUserList(userId, false);
            cookie = cookie.substring(cookie.indexOf(',') + 1, cookie.length);
        }
        editUserList(cookie, false);
    }

    $(document).ready(function () {
        // alert('tabi');
        //addUsersInCookie();
        //var cookie = getCookie("userIds");
        //if (cookie.length == 0)
        //   sortUserList();
        MonoX.WebServices.ChatService.GetInitialUserList(function (result) {
            var userList = $(result);
            $(".chat-users").find(".user-list").html(userList);
            $('.chat-user-holder').click(function () {
                var userId2 = $(this).find(":input[type='hidden']").val();
                startSession(userId2);
            });
        });

        $('#<%= txtSearch.ClientID %>').keyup(function () {
                MonoX.WebServices.ChatService.GetChatUserList(this.value, function (result) {
                    clearInterval(refreshStatusInterval);
                    var userList = $(result);
                    initUserList(userList);
                    $(".chat-users").find(".user-list").html(userList);
                    refreshStatusInterval = setInterval(function () {
                        updateUsersStatus();
                    }, 60000);
                });
            });

            var refreshStatusInterval = setInterval(function () {
                updateUsersStatus();
            }, 60000);

            $.connection.hub.disconnected(function () {
                clearInterval(refreshStatusInterval);
            });

            // stoping hub if more than 5 errors occurs inside 10 seconds
            var errorTime = null;
            var numberOfErrors = 0;
            $.connection.hub.error(function (error) {
                if (errorTime == null || errorTime < new Date().getTime()) {
                    errorTime = new Date().getTime() + 100000;
                    numberOfErrors = 0;
                } else if (numberOfErrors > 5) {
                    $.connection.hub.stop();
                } else {
                    numberOfErrors += 1;
                }
            });

            //  initUserList($(".chat-users").find(".chat-user-holder"));

            //   ;
            // var x = setTimeout(openUnreadSessions(), 5000)
        });

        function updateUsersStatus() {
            var users = new Array();
            $(".chat-users .chat-user-holder").find(":input[type='hidden']").each(function () { users.push($(this).val()) });
            MonoX.WebServices.ChatService.UpdateUserOnlineStatus(users, function (result) {
                $.each(result, function (index, item) {
                    $.connection.chat.client.setUserStatus(item.userId, item.online);
                });
            });
        }

        function setMessagesRead(userId) {
            MonoX.WebServices.ChatService.SetChatMessagesRead(userId, function (result) {
            });
        }

        function startSession(userId) {
            if ('<%= UserInfo.Session().UserId%>' == userId) {
                return;
            }
            setMessagesRead(userId);
            var chatSession = null;
            // editUserList(userId, true);
            console.log(userId + 'session baslar');
            $.each($.chatSessionList.list, function (index, session) {
                if (session.participants.length == 2) {
                    var cont = true;
                    $.each(session.participants, function (index, participant) {
                        if (participant.userId == userId) {
                            chatSession = session;
                            cont = false;
                            return false;
                        }
                    });

                    return cont;
                }
            });

            if (chatSession == null) {
                $.connection.chat.server.startNewSession(userId)
                            .done(function (chatSessionDetails) {
                                $.connection.chat.client.restoreState(chatSessionDetails);
                                refreshUserList(userId);
                            });
            } else {
                chatSession.open();
                chatSession.focus();
            }

            //   openUnreadSessions();
        }

        function openUnreadSessions() {
            MonoX.WebServices.ChatService.getUnreadSessions(function (result) {
                var unreadList = $(result);
                console.log(unreadList);
                var len = unreadList.length;
                var index;
                for (index = 0; index < len; index++) {
                    var userId = unreadList[index];
                    startUnreadSession(userId);
                }
            });
        }

        function startUnreadSession(userId) {
            var chatSession = null;
            console.log(userId + 'unread session baslar');
            $.each($.chatSessionList.list, function (index, session) {
                if (session.participants.length == 2) {
                    var cont = true;
                    $.each(session.participants, function (index, participant) {
                        if (participant.userId == userId) {
                            chatSession = session;
                            cont = false;
                            return false;
                        }
                    });

                    return cont;
                }
            });
            console.log('himm');
            if (chatSession == null) {
                $.connection.chat.server.startNewSession(userId)
                            .done(function (chatSessionDetails) {
                                console.log('himm');
                                $.connection.chat.client.restoreState(chatSessionDetails);
                            });
            } else {
                chatSession.open();
                chatSession.focus();
            }
        }



</script>
