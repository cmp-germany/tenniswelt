RegionRadius = [0, 5, 10, 15, 20, 25, 50, 100, 150, 200, 250, 500];
$(document).ready(
    function () {

        $('.RegInput input').focus(function () { $(this).addClass('platform-color platform-border-color'); });
        $('.RegInput select').focus(function () { $(this).addClass('platform-border-color'); });
        $('.RegInput input').blur(function () { $(this).removeClass('platform-color platform-border-color'); });
        $('.RegInput select').blur(function () { $(this).removeClass('platform-border-color'); });

        $('#TxtHeadSearchInput').keydown(function (event) {
            var keypressed = event.keyCode || event.which;
            if (keypressed == 13) {
                if ($('#TxtHeadSearchInput').val() != "") { location.href = "/search/" + $('#TxtHeadSearchInput').val() + "/"; }
            }
        });

        $('input[rel="SearchTagging"]').keyup(function (event) {
            var code = event.keyCode || event.which;
            if (code == 8 || (code >= '0'.charCodeAt(0) && code <= '9'.charCodeAt(0)) || (code >= 'A'.charCodeAt(0) && code <= 'Z'.charCodeAt(0)) || (code >= 'a'.charCodeAt(0) && code <= 'z'.charCodeAt(0)))
                SearchTagging($(this));
        });

        showRadius('RadiusRangeSpan', 'RadiusRange');
    }
);
function SearchOnEnter(myfield, e, ErrorMSG) {
    var keycode;
    if (window.event) keycode = window.event.keyCode;
    else if (e) keycode = e.which;
    else return true;

    if (keycode == 13) {
        MakeSearch(ErrorMSG);
        return false;
    }
    else {
        return true;
    }
}
function MakeSearch(ErrorMSG) {
    if ($('#TxtHeadSearchInput').val() == "") { alert(ErrorMSG); }
    else {
        if ($('#TxtHeadSearchRegion').val() == "") {
            location.href = "/SearchResults.aspx?SearchType=people&SearchStr=" + $('#TxtHeadSearchInput').val();
        }
        else {
            location.href = "/SearchResults.aspx?SearchType=companies&SearchStr="
                + $('#TxtHeadSearchInput').val()
                + "&RegionStr="
                + $('#TxtHeadSearchRegion').val()
                + "&RadiusRange="
                + RegionRadius[$('#RadiusRange').val()];
        }
    }
}
function closeLogout() {
    $(".logout_div").hide();
}
function showLogout() {
    $(".logout_div").show();
}
function ReloadPage() {
    window.location.href = window.location.href;
}
/* PopUp panel to show things in an iframe */
function ShowItem(ShowID1, ShowID2, HideID1) {
    $('#' + HideID1).hide();
    $('#' + ShowID1).show();
    $('#' + ShowID2).show();
    window.parent.$("#PopUpPanelIframe").height(window.parent.$("#PopUpPanelIframe").height() + parseInt(50));
}
function OpenPopUpPanel(PanelUrl, PnelHidth, PanelHeight) {
    $('<div/>', { id: 'PopUpPanelBack' }).appendTo('body');
    $('<div/>', { id: 'PopUpPanelInner' }).appendTo('body');
    $('<iframe/>', { id: 'PopUpPanelIframe', frameborder: '0', width: PnelHidth, height: PanelHeight, scrolling: 'yes', src: PanelUrl }).css('margin-top', ($(window).height() - PanelHeight) / 4).appendTo('#PopUpPanelInner');
}
function ClosePopUpPanel() {
    $("#PopUpPanelBack").remove();
    $("#PopUpPanelInner").remove();
}
function ChangePopUpHeight(NewHeight) {
    $("#PopUpPanelIframe").height(NewHeight);
}
/* PopUp panel to show things in an iframe END */
function HideWait() {
    $("#DivOpenPopUpWait").hide();
}
function ShowWait() {
    $("#DivOpenPopUpWait").show();
}
function ShowTab(TabID, ContentID, HideClass) {
    $('#' + TabID).siblings().removeClass('TabsItemSelected');
    $('#' + TabID).addClass('TabsItemSelected');

    $('.' + HideClass).hide();
    $('#' + ContentID).show();
}
function CopyValue(FromID, ToID, FileTypes) {
    var file = $('#' + FromID).val();
    var parts;
    if (file.toLowerCase().indexOf('\\'.toLowerCase()) > 0) {
        parts = file.split('\\');
        file = parts[parts.length - 1];
    }
    var ext = "";
    if (file.toLowerCase().indexOf('\.'.toLowerCase()) > 0) {
        parts = file.split('\.');
        ext = '.' + parts[parts.length - 1];
    }
    if (FileTypes.toLowerCase().indexOf(ext.toLowerCase()) < 0) {
        alert('For the Company image please use the following file types only: ' + FileTypes + '.');
        file = '';
        $('#' + FromID).val(file);
    }
    $('#' + ToID).val(file);
}
function FakeClick(ClickID) {
    $('#' + ClickID).click();
}
function AddCompany(MyID, ShowID) {
    if ($('#' + ShowID).is(':visible')) {
        $('#' + ShowID).hide();
        $('.MyCompaniesMSG').show();
        $('#' + MyID).html('Add a company');
    }
    else {
        $('#' + ShowID).show();
        $('.MyCompaniesMSG').hide();
        $('#' + MyID).html('Close form');
    }
}
function SearchTagging(elem) {
    var ClientID = $(elem).attr("id");
    //var prev = $('#' + ClientID).val();
    var cursorPosition = parseInt($(elem)[0].selectionStart);
    var value = $(elem).val();
    /*
    We will search backward for @ or ' ', and if
    - Find a space before @, we return.
    - Got to the start of the string, we return.
    - Find @, get the substring from @ till the cursor position, and call the AJAX with this substring.
    */
    var strudelPosition = -1;//Strudel = '@'
    for (var indx = cursorPosition - 1; indx > -1; indx--) {
        if (value[indx] == ' ') return;
        if (value[indx] == '@') {
            strudelPosition = parseInt(indx);
            var tag = value.substring(strudelPosition + 1, cursorPosition + 1);
            if (tag.length > 0)//make sure that the tag string is not empty.
                GetTaggingAJAX(tag, ClientID, strudelPosition + 1);
            return;
        }
    }
}
function GetTaggingAJAX(tag, clientId, strudelPosition) {
    var AjaxUrl = '/AjaxCalls/getUserlistForTagging.aspx?SearchStr=' + tag + '&ClientID=' + clientId + '&strudelPosition=' + strudelPosition;

    var dt = new Date();
    dt = dt.getTime();

    jQuery.ajax({
        url: AjaxUrl + "&dt=" + dt,
        success: function (RessHtml) {
            $('.DivPopupForTagging').remove();
            if (RessHtml != '') {
                jQuery('<div/>', {
                    'id': 'DivPopupForTagging',
                    'class': 'DivPopupForTagging'
                }).appendTo(jQuery('#' + clientId).parent()).html(RessHtml);
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            // do something
        }
    }
    );

    // http://stadt.koeln/AjaxCalls/getUserlistForTagging.aspx?SearchStr=@
}
function SelectTagging(UserName, ClientID, SearchStr, strudelPosition) {
    UserName = '[~' + UserName + ']';
    var oldVal = $('#' + ClientID).val();
    var newVal = oldVal.replace(SearchStr, UserName);
    //console.log(oldVal + "," + newVal + "," + SearchStr + "," + UserName);
    $('#' + ClientID).val(newVal);
    $('#' + ClientID).focus();
    document.getElementById(ClientID).setSelectionRange(strudelPosition + UserName.length, strudelPosition + UserName.length);
    $('.DivPopupForTagging').remove();
}
function changeLike(NoteId) {
    var AjaxUrl = "/AjaxCalls/NotesLikes.aspx?NoteId=" + NoteId;
    var dt = new Date();
    dt = dt.getTime();
    jQuery.ajax({
        url: AjaxUrl + "&dt=" + dt,
        success: function (RessHtml) {
            var arr = RessHtml.split('~');
            var UserId = arr[0];
            var NoteId = arr[1];
            var likesCount = arr[2];
            var LikeImg = arr[3];
            var LikeText = arr[4];

            if (likesCount == '0') {
                $('#spnLikes_' + NoteId).html('');
                $('#spnLikesText_' + NoteId).html('');
            } else {
                $('#spnLikes_' + NoteId).html(likesCount);
                $('#spnLikesText_' + NoteId).html(LikeText);
            }
            $('#imgLike_' + NoteId).attr();'src', '/Images/' + LikeImg
        }, error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus + ': ' + errorThrown);
        }
    }
    );
}
function getUserFriendList(Action, UserId, ShowAll, NewLoad) {
    var dt = new Date();
    dt = dt.getTime();
    $.ajax(
        {
            url: "/AjaxCalls/getUserFriendList.aspx?Action=" + Action + "&dt=" + dt + "&UserId=" + UserId + "&ShowAll=" + ShowAll + "&NewLoad=" + NewLoad,
            beforeSend: function () {
                $('#DivLoading_FriendList').addClass("loading");
            }, success: function (RessHtml) {
                if (RessHtml != '') {
                    $('#Wall_FriendsList').html(RessHtml);
                }
            }, complete: function () {
                $('#DivLoading_FriendList').removeClass("loading");
            }, error: function (jqXHR, textStatus, errorThrown) {
                $('#DivLoading_FriendList').removeClass("loading");
            }
        }
    );
}
function getMatchingList(Action, UserId, NewLoad, ShowAll, excludedUserId) {
    var dt = new Date();
    dt = dt.getTime();
    $.ajax(
        {
            url: "/AjaxCalls/getUserMatchingList.aspx?Action=" + Action + "&ShowAll=" + ShowAll + "&UserId=" + UserId + "&NewLoad=" + NewLoad + "&excludedUserId=" + excludedUserId + "&dt=" + dt,
            beforeSend: function () {
                $('#DivLoading_MatchingList').addClass("loading");
            }, success: function (RessHtml) {
                if (RessHtml != '') {
                    $('#Wall_MatchingsList').html(RessHtml);
                }
            }, complete: function () {
                $('#DivLoading_MatchingList').removeClass("loading");
            }, error: function (jqXHR, textStatus, errorThrown) {
                $('#DivLoading_MatchingList').removeClass("loading");
            }
        }
    );
}
function getGroupMatchingList(Action, UserId, NewLoad, ShowAll) {
    var dt = new Date();
    dt = dt.getTime();
    $.ajax(
        {
            url: "/AjaxCalls/getGroupMatchingList.aspx?Action=" + Action + "&ShowAll=" + ShowAll + "&UserId=" + UserId + "&NewLoad=" + NewLoad + "&dt=" + dt,
            beforeSend: function () {
                $('#gm_DivLoading_MatchingList').addClass("loading");
            }, success: function (RessHtml) {
                if (RessHtml != '') {
                    $('#gm_Wall_MatchingsList').html(RessHtml);
                }
            }, complete: function () {
                $('#gm_DivLoading_MatchingList').removeClass("loading");
            }, error: function (jqXHR, textStatus, errorThrown) {
                $('#gm_DivLoading_MatchingList').removeClass("loading");
            }
        }
    );
}
/*
//Full Ajax Call:
var dt = new Date();
dt = dt.getTime();
jQuery.ajax({
        url: AjaxUrl + "&dt=" + dt,
        beforeSend: function () {
            // do something
        }, success: function (RessHtml) {
            // do something
        }, complete: function () {
            // do something
        }, error: function (jqXHR, textStatus, errorThrown) {
            // do something
        }
    }
);
*/
/* Welcome (with 2 "L"s) page */
function ShowErrorMSG(MSG, Color) {
    //if(Color == '') Color = 'red';
    $('#WelcomeErrorText').html(MSG);//.css('color', Color);
    $('#WelcomeErrorBack').show();
    $('#WelcomeErrorWrapper').show();
    var b = parseInt($(window).width()) * 0.8;
    if (b > 500) b = 500;
    $('#WelcomeErrorBlock').width(b);
    var w = (parseInt($('#WelcomeErrorBlock').width()) + parseInt(2));
    var h = (parseInt($('#WelcomeErrorBlock').height()) + parseInt(2));
    var l = ($(window).width() / 2) - (w / 2);
    $('#WelcomeErrorWrapper').css({ width: (w + 'px'), height: (h + 'px'), left: (l + 'px') });
    $('html, body').animate({ scrollTop: $("#WelcomeErrorWrapper").offset().top }, 500);
}
function ShowSuccessMSG(pnlID, MSG) {
    var pnl = $('#' + pnlID);
    var h = pnl.height();
    var p = ((h * 0.9) / 2);
    pnl.html(MSG).css({ 'height': h + 'px', 'padding': p + 'px 20px', 'text-align': 'center', 'font-size': '14px' });
}
function HideErrorMSG() {
    $('#WelcomeErrorText').html('');
    $('#WelcomeErrorBack').hide();
    $('#WelcomeErrorWrapper').hide();
}
/* Welcome (with 2 "L"s) page END */
function showRadius(spanId, RadiusRange) {
    var input = document.getElementById(RadiusRange),
        output = document.getElementById(spanId);

    input.oninput = function () {
        output.innerHTML = "+" + RegionRadius[this.value];
    };
    input.oninput(); //set default value
}
function showHideCommentBlock (){
    alert("Test");
}