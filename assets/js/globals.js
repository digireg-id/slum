function get_data(url = '') {
    var frm = new FormData();
    var ret = '';

    ret = call_ajax_with_json(url, frm);

    return ret;
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