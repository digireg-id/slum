<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>Partisipatori | Login</title>
    <meta name="description" content="Login page example" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" />
    <link href="<?php echo(base_url()) ?>assets/css/pages/login/classic/login-4.css?v=7.0.6" rel="stylesheet"
        type="text/css" />
    <link href="<?php echo(base_url()) ?>assets/plugins/global/plugins.bundle.css?v=7.0.6" rel="stylesheet"
        type="text/css" />
    <link href="<?php echo(base_url()) ?>assets/plugins/custom/prismjs/prismjs.bundle.css?v=7.0.6" rel="stylesheet"
        type="text/css" />
    <link href="<?php echo(base_url()) ?>assets/css/style.bundle.css?v=7.0.6" rel="stylesheet" type="text/css" />
    <link rel="shortcut icon" href="assets/media/logos/favicon.ico" />
</head>

<body id="kt_body" class="header-fixed header-mobile-fixed subheader-enabled page-loading">
    <div class="d-flex flex-column flex-root">
        <div class="login login-4 login-signin-on d-flex flex-row-fluid" id="kt_login">
            <div class="d-flex flex-center flex-row-fluid bgi-size-cover bgi-position-top bgi-no-repeat"
                style="background-image: url('<?php echo(base_url()) ?>assets/media/bg/bg-3.jpg');">
                <div class="login-form text-center p-7 position-relative overflow-hidden">
                    <div class="d-flex flex-center mb-10">
                        <a href="#">
                            <img src="<?php echo(base_url()) ?>assets/media/logos/logo-letter-8.png" class="max-h-100px"
                                alt="" />
                        </a>
                    </div>
                    <div class="login-signin">
                        <div class="mb-10">
                            <h2 class="font-weight-bold">Sign In</h2>
                            <p class="text-muted font-weight-bold">Enter your username and password</p>
                            <small class="text-danger">for demo, use this account username: demo and pass: demo</small>
                        </div>
                        <form class="form" id="kt_login_signin_form">
                            <div class="form-group mb-5">
                                <input class="form-control h-auto form-control-solid py-4 px-8" type="text"
                                    placeholder="Username" name="nama_akun" autocomplete="off" />
                            </div>
                            <div class="form-group mb-5">
                                <input class="form-control h-auto form-control-solid py-4 px-8" type="password"
                                    placeholder="Password" name="password" />
                            </div>
                            <br>
                            <table>
                                <tr>
                                    <td>
                                        <small style="float:left">kode bersifat case sensitif</small>
                                        <div id="img_captcha"></div>
                                    </td>
                                    <td width="20px"></td>
                                    <td style="padding-top:20px">
                                        <a href="javascript:void(0)" onclick="ref_captcha()">
                                            <i class="flaticon2-refresh text-primary"></i>
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            <div class="form-group py-2 border-bottom m-0">
                                <input class="form-control h-auto border-0 px-0 placeholder-dark-75" type="text"
                                    placeholder="Isi kode diatas disini" name="captcha" autocomplete="off" />
                            </div>
                            <div class="form-group d-flex flex-wrap justify-content-between align-items-left">
                                <div class="checkbox-inline">
                                    <label class="checkbox m-0 text-muted">
                                        <input type="checkbox" name="remember" />
                                        <span></span>Remember me</label>
                                </div>
                                <a href="javascript:forgot()"
                                    class="text-muted text-hover-primary font-weight-bold">Forgot password ?</a>
                            </div>
                            <button id="kt_login_signin_submit"
                                class="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
    var KTAppSettings = {
        "breakpoints": {
            "sm": 576,
            "md": 768,
            "lg": 992,
            "xl": 1200,
            "xxl": 1200
        },
        "colors": {
            "theme": {
                "base": {
                    "white": "#ffffff",
                    "primary": "#0BB783",
                    "secondary": "#E5EAEE",
                    "success": "#1BC5BD",
                    "info": "#8950FC",
                    "warning": "#FFA800",
                    "danger": "#F64E60",
                    "light": "#F3F6F9",
                    "dark": "#212121"
                },
                "light": {
                    "white": "#ffffff",
                    "primary": "#D7F9EF",
                    "secondary": "#ECF0F3",
                    "success": "#C9F7F5",
                    "info": "#EEE5FF",
                    "warning": "#FFF4DE",
                    "danger": "#FFE2E5",
                    "light": "#F3F6F9",
                    "dark": "#D6D6E0"
                },
                "inverse": {
                    "white": "#ffffff",
                    "primary": "#ffffff",
                    "secondary": "#212121",
                    "success": "#ffffff",
                    "info": "#ffffff",
                    "warning": "#ffffff",
                    "danger": "#ffffff",
                    "light": "#464E5F",
                    "dark": "#ffffff"
                }
            },
            "gray": {
                "gray-100": "#F3F6F9",
                "gray-200": "#ECF0F3",
                "gray-300": "#E5EAEE",
                "gray-400": "#D6D6E0",
                "gray-500": "#B5B5C3",
                "gray-600": "#80808F",
                "gray-700": "#464E5F",
                "gray-800": "#1B283F",
                "gray-900": "#212121"
            }
        },
        "font-family": "Poppins"
    };
    </script>
    <script src="<?php echo base_url() ?>assets/plugins/custom/leaflet/leaflet.bundle.js?v=7.0.6"></script>
    <script src="assets/plugins/global/plugins.bundle.js?v=7.0.6"></script>
    <script src="assets/plugins/custom/prismjs/prismjs.bundle.js?v=7.0.6"></script>
    <script src="assets/js/scripts.bundle.js?v=7.0.6"></script>
    <script src="assets/js/var.js"></script>
    <script src="assets/js/globals.js"></script>
    <script src="assets/js/functions.js"></script>
    <script src="assets/js/login.js"></script>
</body>

</html>