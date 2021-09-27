function call_ajax(urls, datas) {
    var ret = '';
    $.ajax({
        type: 'post',
        processData: false,
        contentType: false,
        cache: false,
        crossDomain: true,
        enctype: 'multipart/form-data',
        url: urls,
        async: false,
        data: datas,
        beforeSend: function() {
            $('body').css('cursor', 'progress');
        },
        success: function(result) {
            $('body').css('cursor', 'default');
            ret = result;
        },
        error: function(err) {
            $('body').css('cursor', 'default');
        }
    });

    return ret;
}

function call_ajax_with_json(url, datas) {
    var ret = '';
    $.ajax({
        type: 'post',
        url: url,
        cache: false,
        contentType: false,
        processData: false,
        crossDomain: true,
        async: false,
        enctype: 'multipart/form-data',
        data: datas,
        dataType: "json",
        beforeSend: function() {
            $('body').css('cursor', 'progress');
        },
        success: function(result) {
            $('body').css('cursor', 'default');
            ret = result;
        },
        error: function(err) {
            $('body').css('cursor', 'default');
        }
    });

    return ret;
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 &&
        (charCode < 48 || charCode > 57))
        return false;

    return true;
}

function get_ext(filename) {
    var str = filename.split('.')
    var ext = str.pop();
    if (ext == filename) return "";
    return ext;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function doesFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();

    if (xhr.status == "404") {
        return false;
    } else {
        return true;
    }
}

function isNumberWithPointKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 &&
        (charCode < 48 || charCode > 57))
        return false;

    return true;
}

function isEmpty(value) {
    return (value == null || value.length === 0);
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function get_random_color() {
    var letters = '0123456789ABCDEF';
    var color = '#';

    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

$.fn.clearFields = $.fn.clearInputs = function(includeHidden) {
    var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list
    return this.each(function() {
        var t = this.type,
            tag = this.tagName.toLowerCase();
        if (re.test(t) || tag == 'textarea') {
            this.value = '';
        } else if (t == 'checkbox' || t == 'radio') {
            this.checked = false;
        } else if (tag == 'select') {
            this.selectedIndex = -1;
        } else if (t == "file") {
            if (/MSIE/.test(navigator.userAgent)) {
                $(this).replaceWith($(this).clone(true));
            } else {
                $(this).val('');
            }
        } else if (includeHidden) {
            if ((includeHidden === true && /hidden/.test(t)) ||
                (typeof includeHidden == 'string' && $(this).is(includeHidden)))
                this.value = '';
        }
    });
}

function download(url, filename) {
    fetch(url).then(function(t) {
        return t.blob().then((b) => {
            var a = document.createElement("a");
            a.href = URL.createObjectURL(b);
            a.setAttribute("download", filename);
            a.click();
        });
    });
}

function doesFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();

    if (xhr.status == "404") {
        return false;
    } else {
        return true;
    }
}

function ref_captcha() {
    var ret = '';
    var frm = new FormData();
    ret = call_ajax('globals/get_captcha/', frm);

    $('#img_captcha').html(ret);
}

function ref_captcha_reset() {
    var ret = '';
    var frm = new FormData();
    ret = call_ajax('../../globals/get_captcha/', frm);

    $('#img_captcha').html(ret);
}

function setStorage(cname, cvalue) {
    localStorage.setItem(cname, cvalue);
}

function getAllStorage() {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while (i--) {
        values.push(localStorage.getItem(keys[i]));
    }

    return values;
}

function getStorage(cname) {
    return localStorage.getItem(cname);
}

function deleteStorage(cname) {
    localStorage.removeItem(cname);
}

function deleteAllCookies() {
    var dt = new Date();
    dt.setTime(dt.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + dt.toUTCString();
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;" + expires + ";path=/";
    }
}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}