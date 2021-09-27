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
    <link href="<?php echo base_url() ?>assets/css/pages/wizard-1.css?v=7.2.0" rel="stylesheet" type="text/css" />
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
<style>
    .leaflet-layerstree-header-label {
        margin-bottom: 0px;
    }

    .leaflet-layerstree-header label {
        margin-left: 0px;
    }

    .leaflet-control-search .search-button {
        display: block;
        float: left;
        width: 30px;
        height: 30px;
        background: url('http://slum.geo-portal.id/assets/plugins/custom/images/search-icon.png') no-repeat 4px 4px #fff;
        border-radius: 4px;
    }

    .leaflet-container .leaflet-control-search {
        margin-left: 10px;
    }

    .leaflet-bar button,
    .leaflet-bar button:hover {
        background-color: #fff;
        border: none;
        border-bottom: 1px solid #ccc;
        width: 30px;
        height: 30px;
        line-height: 26px;
        display: block;
        text-align: center;
        text-decoration: none;
        color: black;
    }

    .leaflet-bar a,
    .leaflet-bar a:hover {
        background-color: #fff;
        border-bottom: 1px solid #ccc;
        width: 30px;
        height: 30px;
        line-height: 26px;
        display: block;
        text-align: center;
        text-decoration: none;
        color: black;
    }

    .leaflet-draw-toolbar .leaflet-draw-draw-polygon {
        background-position: -29px 0px;
    }

    .leaflet-touch .leaflet-control-layers-toggle {
        width: 36px;
        height: 36px;
    }

    body {
       background: #FFFFFF;
    }

    .card.card-custom {
       -webkit-box-shadow: none;
       box-shadow: none;
       border: 0;
    }

    .wizard.wizard-1 .wizard-nav .wizard-steps .wizard-step .wizard-label .wizard-icon {
       color: #B5B5C3;
       font-size: 1.75rem;
    }

    .bootstrap-select .dropdown-menu.inner > li.selected > a .check-mark, .bootstrap-select .dropdown-menu.inner > li:hover > a .check-mark {
       color: #1BC5BD;
       font-size: 10pt;
    }

    .bootstrap-select .dropdown-menu.inner > li.selected > a {
       background: #b7dffb;
    }

    .bootstrap-select .dropdown-menu.inner > li.selected > a .check-mark {
       top: 50%;
       position: absolute;
       margin-top: -0.4rem;
       font-size: 0.7rem;
       left: 0.3rem;
       padding-left: 10px;
    }

    .bootstrap-select .dropdown-menu li a span.text {
       display: inline-block;
       margin-left: 20px;
    }
    </style>
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
            <!-- <button class="btn p-0 burger-icon burger-icon-left ml-4" id="kt_header_mobile_toggle">
                    <span></span>
                </button> -->
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
                <!-- <div id="kt_header" class="header flex-column  header-fixed ">
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
                                <div class="dropdown d-flex d-lg-none">
                                    <div class="topbar-item" data-toggle="dropdown" data-offset="10px,0px">
                                        <div class="btn btn-icon btn-hover-transparent-white btn-lg btn-dropdown mr-1">
                                                <span class="svg-icon svg-icon-xl">
                                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                            <rect x="0" y="0" width="24" height="24"/>
                                                            <path d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"/>
                                                            <path d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z" fill="#000000" fill-rule="nonzero"/>
                                                        </g>
                                                    </svg>
                                                </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="topbar-item">
                                    <span class="symbol symbol-35">
                                        <a href="<?php base_url() ?>login">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px"
                                                viewBox="0 0 24 24" version="1.1">
                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <mask fill="white">
                                                        <use xlink:href="#path-1"></use>
                                                    </mask>
                                                    <g></g>
                                                    <path
                                                        d="M7,10 L7,8 C7,5.23857625 9.23857625,3 12,3 C14.7614237,3 17,5.23857625 17,8 L17,10 L18,10 C19.1045695,10 20,10.8954305 20,12 L20,18 C20,19.1045695 19.1045695,20 18,20 L6,20 C4.8954305,20 4,19.1045695 4,18 L4,12 C4,10.8954305 4.8954305,10 6,10 L7,10 Z M12,5 C10.3431458,5 9,6.34314575 9,8 L9,10 L15,10 L15,8 C15,6.34314575 13.6568542,5 12,5 Z"
                                                        fill="#000000"></path>
                                                </g>
                                            </svg>
                                        </a>
                                    </span>
                                        <div class="btn-icon btn-hover-transparent-white w-auto d-flex align-items-center btn-lg px-2" id="kt_quick_user_toggle">
                                            <div class="d-flex flex-column text-right pr-3">
                                                <span class="text-white opacity-50 font-weight-bold font-size-sm d-none d-md-inline">Name</span>
                                                <span class="text-white font-weight-bolder font-size-sm d-none d-md-inline">Users</span>
                                            </div>
                                            <span class="symbol symbol-35">
                                                <span class="symbol-label font-size-h5 font-weight-bold text-white bg-white-o-30">U</span>
                                            </span>
                                        </div>
                                        <span class="symbol symbol-35">
                                            <a href="<?php echo(base_url()) ?>recap_data"><span class="symbol-label font-size-h5 font-weight-bold text-white bg-danger">R</span></a>
                                        </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="header-bottom">
                            <div class=" container ">
                                <div class="header-menu-wrapper header-menu-wrapper-left" id="kt_header_menu_wrapper">
                                    <div id="kt_header_menu" class="header-menu header-menu-left header-menu-mobile  header-menu-layout-default " >
                                        <ul class="menu-nav ">
                                            <li class="menu-item menu-item-submenu menu-item-rel <?php echo ($menu_active == 'dashboard' ? 'menu-item-open menu-item-here' : '') ?>"  data-menu-toggle="hover" aria-haspopup="true">
                                                <a  href="<?php echo base_url() ?>dashboard" class="menu-link"><span class="menu-text">Dashboard</span><span class="menu-desc">Updates & Reports</span><i class="menu-arrow"></i></a>
                                            </li>
                                            <li class="menu-item menu-item-submenu menu-item-rel <?php echo ($menu_active == 'data' ? 'menu-item-open menu-item-here' : '') ?>"  data-menu-toggle="hover" aria-haspopup="true">
                                                <a  href="<?php echo base_url() ?>data" class="menu-link"><span class="menu-text">Data</span><span class="menu-desc">Assets Table</span><i class="menu-arrow"></i></a>
                                            </li>
                                            <li class="menu-item menu-item-submenu menu-item-rel <?php echo ($menu_active == 'master' ? 'menu-item-open menu-item-here' : '') ?>" data-menu-toggle="hover" aria-haspopup="true">
                                                <a  href="<?php echo base_url() ?>master" class="menu-link"><span class="menu-text">Master Table</span><span class="menu-desc">Data Master</span><i class="menu-arrow"></i></a>
                                            </li>
                                            <li class="menu-item menu-item-submenu menu-item-rel <?php echo ($menu_active == 'modules' ? 'menu-item-open menu-item-here' : '') ?>" data-menu-toggle="hover" aria-haspopup="true">
                                                <a  href="<?php echo base_url() ?>modules" class="menu-link"><span class="menu-text">Report</span><span class="menu-desc">Manual Assets</span><i class="menu-arrow"></i></a>
                                            </li>
                                            <li class="menu-item menu-item-submenu menu-item-rel <?php echo ($menu_active == 'users' ? 'menu-item-open menu-item-here' : '') ?>"  data-menu-toggle="hover" aria-haspopup="true">
                                                <a  href="<?php echo base_url() ?>users" class="menu-link"><span class="menu-text">Users</span><span class="menu-desc">List Users</span><i class="menu-arrow"></i></a>
                                            </li>
                                            <li class="menu-item menu-item-submenu menu-item-rel <?php echo ($menu_active == 'profile' ? 'menu-item-open menu-item-here' : '') ?>"  data-menu-toggle="hover" aria-haspopup="true">
                                                <a  href="<?php echo base_url() ?>profile" class="menu-link"><span class="menu-text">Profile</span><span class="menu-desc">Edit Profile</span><i class="menu-arrow"></i></a>
                                            </li>
                                            <li class="menu-item menu-item-submenu menu-item-rel <?php echo ($menu_active == 'logout' ? 'menu-item-open menu-item-here' : '') ?>"  data-menu-toggle="hover" aria-haspopup="true">
                                                <a  href="javascript:logout()" class="menu-link"><span class="menu-text">Logout</span><span class="menu-desc">Exit Applications</span><i class="menu-arrow"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                -->
                <div class="content d-flex flex-column flex-column-fluid" id="kt_content">
                    <div class="d-flex flex-column-fluid">
                        <div class="container-fluid">