"use strict";

var KTLogin = function() {
    var _login;

    var _showForm = function(form) {
        var cls = 'login-' + form + '-on';
        var form = 'kt_login_' + form + '_form';

        _login.removeClass('login-forgot-on');
        _login.removeClass('login-signin-on');

        _login.addClass(cls);

        KTUtil.animateClass(KTUtil.getById(form), 'animate__animated animate__backInUp');
    }

    var _handleSignInForm = function() {
        var validation;

        validation = FormValidation.formValidation(
            KTUtil.getById('kt_login_signin_form'), {
                fields: {
                    nama_akun: {
                        validators: {
                            notEmpty: {
                                message: 'Username is required'
                            }
                        }
                    },
                    password: {
                        validators: {
                            notEmpty: {
                                message: 'Password is required'
                            }
                        }
                    },
                    captcha: {
                        validators: {
                            notEmpty: {
                                message: 'Captcha is required'
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    submitButton: new FormValidation.plugins.SubmitButton(),
                    //defaultSubmit: new FormValidation.plugins.DefaultSubmit(), // Uncomment this line to enable normal button submit after form validation
                    bootstrap: new FormValidation.plugins.Bootstrap()
                }
            }
        );

        $('#kt_login_signin_submit').on('click', function(e) {
            e.preventDefault();

            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    var username = $("[name='nama_akun']").val();
                    var password = $("[name='password']").val();
                    var captcha = $("[name='captcha']").val();
                    var remember_me = $("[name='remember_me']").is(':checked');

                    var urlx = url + 'login/sign_in';
                    var frm = new FormData();
                    frm.append('username', username);
                    frm.append('password', password);
                    frm.append('captcha', captcha);
                    frm.append('remember_me', remember_me);

                    var res = call_ajax_with_json(urlx, frm);

                    if (res.status) {
                        swal.fire({
                            title: res.message,
                            text: "Now, you have access current system",
                            icon: "success",
                            buttonsStyling: false,
                            confirmButtonText: "Accept",
                            customClass: {
                                confirmButton: "btn font-weight-bold btn-light-primary"
                            }
                        }).then(function() {
                            location.href = url + 'recap_data';
                        });
                    } else {
                        swal.fire({
                            title: "Access Denied",
                            text: res.message,
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Try Again",
                            customClass: {
                                confirmButton: "btn font-weight-bold btn-light-danger"
                            }
                        }).then(function() {
                            KTUtil.scrollTop();
                        });
                    }
                }
            });
        });
    }

    return {
        init: function() {
            _login = $('#kt_login');

            _handleSignInForm();
        }
    };
}();

function forgot() {
    Swal.fire("Warning", "Please contact your system administrator", "warning");
}

jQuery(document).ready(function() {
    ref_captcha();
    KTLogin.init();
});