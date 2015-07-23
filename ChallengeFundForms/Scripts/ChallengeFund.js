var domain = '';
$(document).ready(function () {
    domain = extractDomain(); //TODO won't work with digital.scvo.org.uk => hardcode to scvoapi.azurewebsites.net
    console.log(domain);
});

function get(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}

function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function makeId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function OnErrorCall(error) {
    showPopupWindow("alert-danger", error);
}

function OnOkCall(msg) {
    if (!msg) msg = "OK"
    showPopupWindow("alert-success", msg);
}

function showPopupWindow(type, msg) {
    window.scrollTo(0, 0); //scroll to the top of the screen to show the error message

    $("#ResultSection").html('<div class="alert ' + type + '"><button type="button" class="close">&times;</button><br />' +
                               msg + '</div>');
    window.setTimeout(function () {
        $(".alert").fadeTo(500, 0).slideUp(500, function () {
            //$(this).remove();
        });
    }, 5000);
    $('.alert .close').on("click", function (e) {
        $(this).parent().fadeTo(500, 0).slideUp(500);
    });
}

function deauthenticate() {
    eraseCookie("ChallengeFundApplicationKey");
}

function blockUI() {
    $.blockUI({
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff'
        }
    });
}

function unblockUI() {
    setTimeout($.unblockUI, 50);
}


function extractDomain(url) {
    if (!url) {
        url = window.location.href;
    }
    var index = nth_occurrence(url, '/', 3);
    return url.substr(0, index);
}


function nth_occurrence(string, char, nth) {
    var first_index = string.indexOf(char);
    var length_up_to_first_index = first_index + 1;

    if (nth == 1) {
        return first_index;
    } else {
        var string_after_first_occurrence = string.slice(length_up_to_first_index);
        var next_occurrence = nth_occurrence(string_after_first_occurrence, char, nth - 1);

        if (next_occurrence === -1) {
            return -1;
        } else {
            return length_up_to_first_index + next_occurrence;
        }
    }
}