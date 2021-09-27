<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>Partisipatori | Dashboard</title>
    <meta name="description" content="Updates and statistics" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet" />
    <link href="<?php echo base_url() ?>assets/plugins/global/plugins.bundle.css?v=7.0.6" rel="stylesheet"
        type="text/css" />
    <link href="<?php echo base_url() ?>assets/plugins/custom/prismjs/prismjs.bundle.css?v=7.0.6" rel="stylesheet"
        type="text/css" />
    <link href="<?php echo base_url() ?>assets/css/style.bundle.css?v=7.0.6" rel="stylesheet" type="text/css" />
    <link href="<?php echo base_url() ?>assets/plugins/custom/leaflet/leaflet.bundle.css?v=7.0.6" rel="stylesheet"
        type="text/css" />
    <link href="<?php echo base_url() ?>assets/plugins/custom/leaflet/L.Control.MousePosition.css" rel="stylesheet"
        type="text/css" />
    <link href="<?php echo base_url() ?>assets/plugins/custom/leaflet/L.Control.Layers.Tree.css" rel="stylesheet"
        type="text/css" />
    <link href="<?php echo base_url() ?>assets/plugins/custom/leaflet/leaflet-search.css" rel="stylesheet"
        type="text/css" />
    <link href="<?php echo base_url() ?>assets/plugins/custom/leaflet/easy-button.css" rel="stylesheet" />
    <link href="<?php echo base_url() ?>assets/plugins/custom/leaflet/src/leaflet.draw.css" rel="stylesheet"
        type="text/css" />
    <link href="<?php echo base_url() ?>assets/deps/leaflet/dist/leaflet.css" rel="stylesheet" type="text/css" />
    <link href="<?php echo base_url() ?>assets/deps/leaflet-draw/dist/leaflet.draw.css" rel="stylesheet"
        type="text/css" />
    <link href="<?php echo base_url() ?>assets/plugins/custom/leaflet/Control.FullScreen.css" rel="stylesheet" />
    <link type="text/css" href="<?php echo base_url() ?>assets/deps/leaflet-toolbar/dist/leaflet.toolbar.css"
        rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="https://justinmanley.github.io/leaflet-draw-toolbar/dist/leaflet.draw-toolbar.css" />
    <link href="<?php echo base_url() ?>assets/media/logos/favicon.ico" rel="shortcut icon" />
</head>

<body id="kt_body" class="header-fixed header-mobile-fixed page-loading">
    <div class="page-loader page-loader-logo">
        <img alt="Logo" class="max-h-75px" src="<?php echo base_url() ?>assets/media/logos/logo-letter-8.png" />
    </div>
    <div id="kt_header_mobile" class="header-mobile bg-primary  header-mobile-fixed ">
        <a href="https://www.digireg.id/">
            <img alt="Logo" src="<?php echo base_url() ?>assets/media/logos/logo-letter-9.png" class="max-h-30px" />
        </a>
        <div class="d-flex align-items-center">
            <button class="btn p-0 ml-2" id="kt_header_mobile_topbar_toggle">
                <span class="svg-icon svg-icon-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px"
                        height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <polygon points="0 0 24 0 24 24 0 24" />
                            <path
                                d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z"
                                fill="#000000" fill-rule="nonzero" opacity="0.3" />
                            <path
                                d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z"
                                fill="#000000" fill-rule="nonzero" />
                        </g>
                    </svg>
                </span>
            </button>
        </div>
    </div>
    <div class="d-flex flex-column flex-root">
        <div class="d-flex flex-row flex-column-fluid page">
            <div class="d-flex flex-column flex-row-fluid wrapper" id="kt_wrapper">
                <div id="kt_header" class="header flex-column  header-fixed ">
                    <div class="header-top">
                        <div class=" container ">
                            <div class="d-none d-lg-flex align-items-center mr-3">
                                <a href="https://www.digireg.id/" class="mr-5">
                                    <img alt="Logo" src="<?php echo base_url() ?>assets/media/logos/logo-letter-9.png"
                                        class="max-h-35px" />
                                </a>
                                <p class="mb-15 font-weight-bold text-black"
                                    style="width:350px; font-size:12pt; color: white; font-weight:bold; padding-top:45px; line-height: 1.2">
                                    PARTISIPATORI
                                </p>
                            </div>
                            <div class="topbar">
                                <?php
                                    if ($this->session->userdata('logged_in')) {
                                ?>
                                <div class="dropdown d-flex d-lg-none">
                                    <div class="topbar-item" data-toggle="dropdown" data-offset="10px,0px">
                                        <div class="btn-icon btn-hover-transparent-white btn-lg btn-dropdown mr-1">
                                        </div>
                                    </div>
                                </div>
                                <div class="topbar-item">
                                    <div class="btn-icon btn-hover-transparent-white w-auto d-flex align-items-center btn-lg px-2"
                                        id="kt_quick_user_toggle">
                                        <div class="d-flex flex-column text-right pr-3">
                                            <span
                                                class="text-white opacity-50 font-weight-bold font-size-sm d-none d-md-inline">Name</span>
                                            <span
                                                class="text-white font-weight-bolder font-size-sm d-none d-md-inline">Users</span>
                                        </div>
                                        <span class="symbol symbol-35">
                                            <a href="javascript:logout()">
                                                <span
                                                    class="symbol-label font-size-h5 font-weight-bold text-white bg-white-o-30">U</span>
                                            </a>
                                        </span>
                                    </div>
                                    <span class="symbol symbol-35">
                                        <a href="<?php echo(base_url()) ?>recap_data"><span
                                                class="symbol-label font-size-h5 font-weight-bold text-white bg-danger">R</span></a>
                                    </span>
                                </div>
                                <?php
                                    }
                                ?>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content d-flex flex-column flex-column-fluid" id="kt_content">
                    <div class="d-flex flex-column-fluid">
                        <div class="container-fluid">
                            <div class="card card-custom">
                                <div class="card-header flex-wrap py-5">
                                    <div class="card-title">
                                        <h3 class="card-label">Recap Data
                                            <span class="d-block text-muted pt-2 font-size-sm">List Data</span>
                                        </h3>
                                    </div>
                                    <div class="card-toolbar">
                                        <a href="javascript:download_all()" class="btn btn-primary font-weight-bolder">
                                            Download All
                                        </a>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="mb-7">
                                        <div class="row align-items-center">
                                            <div class="col-lg-9 col-xl-8">
                                                <div class="row align-items-center">
                                                    <div class="col-md-4 my-2 my-md-0">
                                                        <div class="input-icon">
                                                            <input type="text" class="form-control"
                                                                placeholder="Search..." id="kt_pencarian" />
                                                            <span>
                                                                <i class="flaticon2-search-1 text-muted"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="datatable datatable-bordered datatable-head-custom" id="kt_recap_data">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="modal_form" data-backdrop="static" tabindex="-1" role="dialog"
                    aria-labelledby="staticBackdrop" aria-hidden="true">
                    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">
                                    Edit Data
                                </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <i aria-hidden="true" class="ki ki-close"></i>
                                </button>
                            </div>
                            <div class="modal-body">
                                <input type="hidden" id="id" name="id" class="form-control" />
                                <div id="maps" style="height:300px;"></div><br>
                                <h3>Region</h3>
                                <h4 id="region"></h4><br>
                                <div class="form-group">
                                    <label>Pilih peran yang paling menggambarkan diri Anda</label>
                                    <select id="peran" name="peran" class="form-control selectpicker">
                                        <option value="">-- Choose one --</option>
                                        <option value="1">Pemerintah / Goverment</option>
                                        <option value="2">LSM / NGO</option>
                                        <option value="3">Akademisi / Academician</option>
                                        <option value="4">Ahli GIS / GIS Professional</option>
                                        <option value="5">Masyarakat lokal / Local Community</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Pengalaman kerja (dalam tahun)</label>
                                    <input type="text" class="form-control" id="pengalaman" name="pengalaman"
                                        placeholder="Type here.." onkeypress="return isNumberKey(event);" />
                                </div>
                                <div class="form-group">
                                    <label>Apakah Anda bertempat tinggal di Jakarta?</label>
                                    <select id="live" name="live" class="form-control selectpicker">
                                        <option value="">-- Choose one --</option>
                                        <option value="1">Ya</option>
                                        <option value="2">Tidak</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Berapa tahun Anda tinggal di Jakarta?</label>
                                    <input type="text" class="form-control" id="live_year" name="live_year"
                                        placeholder="Type here.." onkeypress="return isNumberKey(event);" />
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-light-primary font-weight-bold"
                                    data-dismiss="modal">Batal</button>
                                <button type="button" onclick="save_update()"
                                    class="btn btn-primary font-weight-bold">Kirim</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="footer bg-white py-4 d-flex flex-lg-column " id="kt_footer">
        <div class=" container  d-flex flex-column flex-md-row align-items-center justify-content-between">
            <div class="text-dark order-2 order-md-1">
                <span class="text-muted font-weight-bold mr-1">2021 &copy;</span>
                <a href="https://google.com" target="_blank" class="text-dark-75 text-hover-primary">partisipatori</a>
            </div>
            <div class="nav nav-dark order-1 order-md-2">
                <span style="padding-top:5px;padding-right:10px">Supported By</span> <a href="https://www.digireg.id/"
                    target="_blank"><img src="<?php echo base_url() ?>assets/media/logos/logo-letter-8.png" width="30px"
                        height="20px" /></a>
            </div>
        </div>
    </div>
    </div>
    </div>
    </div>
    <div id="kt_scrolltop" class="scrolltop">
        <span class="svg-icon">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px"
                height="24px" viewBox="0 0 24 24" version="1.1">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <polygon points="0 0 24 0 24 24 0 24" />
                    <rect fill="#000000" opacity="0.3" x="11" y="10" width="2" height="10" rx="1" />
                    <path
                        d="M6.70710678,12.7071068 C6.31658249,13.0976311 5.68341751,13.0976311 5.29289322,12.7071068 C4.90236893,12.3165825 4.90236893,11.6834175 5.29289322,11.2928932 L11.2928932,5.29289322 C11.6714722,4.91431428 12.2810586,4.90106866 12.6757246,5.26284586 L18.6757246,10.7628459 C19.0828436,11.1360383 19.1103465,11.7686056 18.7371541,12.1757246 C18.3639617,12.5828436 17.7313944,12.6103465 17.3242754,12.2371541 L12.0300757,7.38413782 L6.70710678,12.7071068 Z"
                        fill="#000000" fill-rule="nonzero" />
                </g>
            </svg>
        </span>
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
    <script src="<?php echo base_url() ?>assets/plugins/global/plugins.bundle.js"></script>
    <script src="<?php echo base_url() ?>assets/plugins/custom/prismjs/prismjs.bundle.js"></script>
    <script src="<?php echo base_url() ?>assets/js/scripts.bundle.js"></script>
    <script src="<?php echo base_url() ?>assets/plugins/custom/leaflet/leaflet.bundle.js?v=7.0.6"></script>
    <script src="https://justinmanley.github.io/leaflet-draw-toolbar/deps/leaflet/dist/leaflet-src.js"></script>
    <script src="https://justinmanley.github.io/leaflet-draw-toolbar/deps/leaflet-toolbar/dist/leaflet.toolbar-src.js">
    </script>
    <script src="https://justinmanley.github.io/leaflet-draw-toolbar/deps/leaflet-draw/dist/leaflet.draw-src.js">
    </script>
    <script src="https://justinmanley.github.io/leaflet-draw-toolbar/dist/leaflet.draw-toolbar.js"></script>
    <script src="https://unpkg.com/esri-leaflet@2.5.3/dist/esri-leaflet.js"
        integrity="sha512-K0Vddb4QdnVOAuPJBHkgrua+/A9Moyv8AQEWi0xndQ+fqbRfAFd47z4A9u1AW/spLO0gEaiE1z98PK1gl5mC5Q=="
        crossorigin=""></script>
    <script src="<?php echo base_url() ?>assets/plugins/custom/leaflet/easy-button.js"></script>
    <script src="<?php echo base_url() ?>assets/plugins/custom/leaflet/L.Control.MousePosition.js"></script>
    <script src="<?php echo base_url() ?>assets/plugins/custom/leaflet/leaflet-search.js"> </script>
    <script src="<?php echo base_url() ?>assets/plugins/custom/leaflet/shp.min.js"> </script>
    <script src="<?php echo base_url() ?>assets/plugins/custom/leaflet/L.Control.Layers.Tree.js"></script>
    <script src="<?php echo base_url() ?>assets/plugins/custom/leaflet/Control.FullScreen.js"></script>
    <script src="<?php echo base_url() ?>assets/js/var.js"></script>
    <script src="<?php echo base_url() ?>assets/js/globals.js"></script>
    <script src="<?php echo base_url() ?>assets/js/functions.js"></script>
    <script src="<?php echo base_url() ?>assets/js/recap_data.js"></script>
</body>

</html>