<!DOCTYPE html>
<html lang="en" data-layout="vertical" data-topbar="light" data-sidebar="dark" data-sidebar-size="sm" data-sidebar-image="none" data-preloader="disable" data-sidebar-visibility="show">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content="0">
        <title>AJS</title>
        <script type="text/javascript">
            var user_settings = localStorage.getItem('user_settings');
            if (user_settings !== null)
            {
                user_settings = JSON.parse(user_settings);
            }
            if (typeof user_settings['WEB_THEME'] !== 'undefined')
            {
                document.documentElement.setAttribute("data-bs-theme", user_settings['WEB_THEME'].toLowerCase());
            }
            if (typeof user_settings['SIDEBAR_FIX'] !== 'undefined')
            {
                document.documentElement.setAttribute("data-sidebar-size", user_settings['SIDEBAR_FIX'].toLowerCase());
            }
        </script>

        <!--
            Rights are only known to the browser (localStorage user_roles), so the server sends every
            Add/Edit/Save button to everyone and ajs.apply_ind_roles()/apply_permissions() strip the
            ones this role cannot use. That runs on DOM ready, which is AFTER the first paint - so a
            view-only user used to watch the buttons appear and then vanish.

            This gate closes that window: the markup is hidden from the very first paint and only
            revealed once the permission pass has run (ajs.reveal_permissioned_ui). Kept as its own
            script block so an error in the settings script above cannot skip it, and set on
            documentElement, which exists before <body> is parsed.

            visibility rather than display: buttons the role KEEPS occupy their space all along, so
            revealing them shifts nothing. Removed ones collapse, which is the same reflow as today.
        -->
        <script type="text/javascript">
            document.documentElement.classList.add('perm-pending');

            // Last-resort release, deliberately inline rather than in ajs.js: that file is cached
            // under a fixed ?v= string, so a browser holding an older copy would have no
            // reveal_permissioned_ui() and the gate would never lift. This cannot go stale.
            window.addEventListener('load', function () {
                document.documentElement.classList.remove('perm-pending');
            });
        </script>
        <style>
            html.perm-pending .add-btn,
            html.perm-pending .new-job-btn,
            html.perm-pending .add-job-btn,
            html.perm-pending .edit-btn,
            html.perm-pending .view-btn,
            html.perm-pending .export-btn,
            html.perm-pending #export_button,
            html.perm-pending .import-btn,
            html.perm-pending .bulk-upload-form,
            html.perm-pending .approve-btn,
            html.perm-pending .reject-btn,
            html.perm-pending .remove-invoice-item-btn,
            html.perm-pending a.popup-form-button,
            html.perm-pending a.list_delete,
            html.perm-pending a.delete_invoice,
            html.perm-pending .check-permission,
            /* Sidebar entries are resolved by ajs.apply_sidebar_permissions() on ready; gating
               them here stops a role seeing menu items blink in and then disappear. Links with no
               data-module are never gated, so they paint immediately. */
            html.perm-pending .app-menu a.nav-link[data-module] {
                visibility: hidden !important;
            }
        </style>

        <?php
        require_once APPPATH . 'views/commons/header-inc.php';
        ?>
        <!--  END JS SECTION -->
    </head>
    <body>
        <?php
        require_once APPPATH . 'views/modals/alert-boxes.php';
        require_once APPPATH . 'views/modals/popup-form-modal.php';
        require_once APPPATH . 'views/modals/crud-modals.php';
        require_once APPPATH . 'views/modals/actions-approve-reject-modal.php';
        require_once APPPATH . 'views/property/inc/quick-edit-modal.php';
        ?>

        <div class="h-100 w-100 position-absolute" id="loader-main" style="display:none; background-color: #ffffff99; z-index: 100000;">
            <div class="spinner-grow text-secondary position-absolute" role="status" style="top: 50%; left: 50%; z-index: 9;">
                <span class="visually-hidden loader-text">Loading...</span>
            </div>
        </div>

        <script type="text/javascript">
            // $('body').addClass('modal-hide');

        </script>

        <!-- Begin page -->
        <div id="layout-wrapper">

            <header id="page-topbar">
                <div class="layout-width">
                    <div class="navbar-header">
                        <div class="d-flex">
                            <!-- LOGO -->
                            <div class="navbar-brand-box horizontal-logo">
                                <a href="<?= cnd_url(); ?>" class="logo logo-dark">
                                    <span class="logo-sm">
                                        <img src="<?= cnd_url(); ?>assets/images/logo-sm.png" alt="" height="22">
                                    </span>
                                    <span class="logo-lg">
                                        <img src="<?= cnd_url(); ?>assets/images/logo-dark.png" alt="" height="17">
                                    </span>
                                </a>

                                <a href="<?= cnd_url(); ?>" class="logo logo-light">
                                    <span class="logo-sm">
                                        <img src="<?= cnd_url(); ?>assets/images/logo-sm.png" alt="" height="22">
                                    </span>
                                    <span class="logo-lg">
                                        <img src="<?= cnd_url(); ?>assets/images/logo-light.png" alt="" height="17">
                                    </span>
                                </a>
                            </div>

                            <button type="button" class="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover" style="z-index: 9;">
                                <i class="ri-bar-chart-horizontal-line sidebar-fix-button"></i>
                            </button>

<!--                            <button type="button" class="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger" id="vertical-hover">
                                <span class="hamburger-icon">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </button>-->


                            <div class="page-title-box d-sm-flex align-items-center justify-content-between" style="margin:10px -1.5rem 10px 0rem; border:none; -webkit-box-shadow:none; box-shadow: none">
                                <div class="page-title-right">
                                    <ol class="breadcrumb m-0" id="breadcrumbs">
                                        <li class="breadcrumb-item"><a href="javascript: void(0);"></a></li>
                                    </ol>
                                </div>
                            </div>

                            <!-- App Search-->
                            <form style="display:none !important" class="app-search d-none d-md-block">
                                <div class="position-relative">
                                    <input type="text" class="form-control" placeholder="Search..." autocomplete="off" id="search-options" value="">
                                    <span class="mdi mdi-magnify search-widget-icon"></span>
                                    <span class="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none" id="search-close-options"></span>
                                </div>
                                <div class="dropdown-menu dropdown-menu-lg" id="search-dropdown">
                                    <div data-simplebar style="max-height: 320px;">
                                        <!-- item-->
                                        <div class="dropdown-header">
                                            <h6 class="text-overflow text-muted mb-0 text-uppercase">Recent Searches</h6>
                                        </div>

                                        <div class="dropdown-item bg-transparent text-wrap">
                                            <a href="index.html" class="btn btn-soft-secondary btn-sm rounded-pill">how to setup <i class="mdi mdi-magnify ms-1"></i></a>
                                            <a href="index.html" class="btn btn-soft-secondary btn-sm rounded-pill">buttons <i class="mdi mdi-magnify ms-1"></i></a>
                                        </div>
                                        <!-- item-->
                                        <div class="dropdown-header mt-2">
                                            <h6 class="text-overflow text-muted mb-1 text-uppercase">Pages</h6>
                                        </div>

                                        <!-- item-->
                                        <a href="javascript:void(0);" class="dropdown-item notify-item">
                                            <i class="ri-bubble-chart-line align-middle fs-18 text-muted me-2"></i>
                                            <span>Analytics Dashboard</span>
                                        </a>

                                        <!-- item-->
                                        <a href="javascript:void(0);" class="dropdown-item notify-item">
                                            <i class="ri-lifebuoy-line align-middle fs-18 text-muted me-2"></i>
                                            <span>Help Center</span>
                                        </a>

                                        <!-- item-->
                                        <a href="javascript:void(0);" class="dropdown-item notify-item">
                                            <i class="ri-user-settings-line align-middle fs-18 text-muted me-2"></i>
                                            <span>My account settings</span>
                                        </a>

                                        <!-- item-->
                                        <div class="dropdown-header mt-2">
                                            <h6 class="text-overflow text-muted mb-2 text-uppercase">Members</h6>
                                        </div>

                                        <div class="notification-list">
                                            <!-- item -->
                                            <a href="javascript:void(0);" class="dropdown-item notify-item py-2">
                                                <div class="d-flex">
                                                    <img src="<?= cnd_url(); ?>assets/images/users/avatar-2.jpg" class="me-3 rounded-circle avatar-xs" alt="user-pic">
                                                    <div class="flex-grow-1">
                                                        <h6 class="m-0">Angela Bernier</h6>
                                                        <span class="fs-11 mb-0 text-muted">Manager</span>
                                                    </div>
                                                </div>
                                            </a>
                                            <!-- item -->
                                            <a href="javascript:void(0);" class="dropdown-item notify-item py-2">
                                                <div class="d-flex">
                                                    <img src="<?= cnd_url(); ?>assets/images/users/avatar-3.jpg" class="me-3 rounded-circle avatar-xs" alt="user-pic">
                                                    <div class="flex-grow-1">
                                                        <h6 class="m-0">David Grasso</h6>
                                                        <span class="fs-11 mb-0 text-muted">Web Designer</span>
                                                    </div>
                                                </div>
                                            </a>
                                            <!-- item -->
                                            <a href="javascript:void(0);" class="dropdown-item notify-item py-2">
                                                <div class="d-flex">
                                                    <img src="<?= cnd_url(); ?>assets/images/users/avatar-5.jpg" class="me-3 rounded-circle avatar-xs" alt="user-pic">
                                                    <div class="flex-grow-1">
                                                        <h6 class="m-0">Mike Bunch</h6>
                                                        <span class="fs-11 mb-0 text-muted">React Developer</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    <div class="text-center pt-3 pb-1">
                                        <a href="pages-search-results.html" class="btn btn-primary btn-sm">View All Results <i class="ri-arrow-right-line ms-1"></i></a>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div class="d-flex align-items-center">

                            <div class="dropdown d-md-none topbar-head-dropdown header-item">
                                <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" id="page-header-search-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="bx bx-search fs-22"></i>
                                </button>
                                <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-search-dropdown">
                                    <form style="display: none" class="p-3">
                                        <div class="form-group m-0">
                                            <div class="input-group">
                                                <input type="text" class="form-control" placeholder="Search ..." aria-label="Recipient's username">
                                                <button class="btn btn-primary" type="submit"><i class="mdi mdi-magnify"></i></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="ms-1 header-item d-none d-sm-flex">
                                <div style="width: 280px;">
                                    <label for="global-property-search" class="d-block mb-0 fs-11 lh-1 text-muted">By Property</label>
                                    <div class="search-box">
                                        <input type="text" id="global-property-search" class="form-control" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="bottom" title="Search by UPRN / Email / Phone (Mobile) / Name / Address / Postcode" placeholder="Search properties...">
                                        <i class="mdi mdi-magnify search-widget-icon"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="ms-1 header-item d-none d-sm-flex">
                                <div style="width: 280px;">
                                    <label for="global-job-search" class="d-block mb-0 fs-11 lh-1 text-muted">By Jobs</label>
                                    <div class="search-box">
                                        <input type="text" id="global-job-search" class="form-control" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="bottom" title="Search by Job Id / Client Order Number / Job / Client / Contract / Address / UPRN / Email / Phone (Mobile) / Name / Postcode" placeholder="Search jobs...">
                                        <i class="mdi mdi-magnify search-widget-icon"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="ms-1 header-item d-none d-sm-flex">
                                <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary do-sync rounded-circle">
                                    <i class='bx bx-refresh fs-24'></i>
                                </button>
                            </div>
                            <?php
                            require APPPATH . 'views/commons/history.php';
                            ?>
                            <div class="ms-1 header-item d-none d-sm-flex">
                                <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" data-toggle="fullscreen">
                                    <i class='bx bx-fullscreen fs-22'></i>
                                </button>
                            </div>

                            <div class="ms-1 header-item d-none d-sm-flex">
                                <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode">
                                    <i class='bx bx-moon fs-22'></i>
                                </button>
                            </div>

                            <?php
                            require APPPATH . 'views/commons/notifications.php';
                            ?>

                            <div class="dropdown ms-sm-3 header-item topbar-user">
                                <button type="button" class="btn h-auto" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span class="d-flex align-items-center">
                                        <img class="rounded-circle header-profile-user" loading="lazy" src="<?= cnd_url(); ?>assets/images/users/ajs-logo-wt.png" alt="Header Avatar">
                                        <span class="text-start ms-xl-2">
                                            <span class="d-none d-xl-inline-block ms-1 fw-medium user-name-text">&nbsp;</span>
                                            <span class="d-none d-xl-block ms-1 fs-12 user-name-sub-text"></span>
                                        </span>
                                    </span>
                                </button>
                                <div class="dropdown-menu dropdown-menu-end">
                                    <!-- item-->
                                    <h6 class="dropdown-header">Welcome <span class="welcome_text"></span>!</h6>
                                    <a class="dropdown-item" href="<?= cnd_url(); ?>profile/view"><i class="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i> <span class="align-middle">Profile</span></a>
<!--                                    <a class="dropdown-item" href="apps-chat.html"><i class="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i> <span class="align-middle">Messages</span></a>
                                    <a class="dropdown-item" href="apps-tasks-kanban.html"><i class="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1"></i> <span class="align-middle">Taskboard</span></a>
                                    <a class="dropdown-item" href="pages-faqs.html"><i class="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i> <span class="align-middle">Help</span></a>-->
                                    <div class="dropdown-divider"></div>
<!--                                    <a class="dropdown-item" href="pages-profile.html"><i class="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i> <span class="align-middle">Balance : <b>$5971.67</b></span></a>
                                    <a class="dropdown-item" href="pages-profile-settings.html"><span class="badge bg-success-subtle text-success mt-1 float-end">New</span><i class="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i> <span class="align-middle">Settings</span></a>
                                    <a class="dropdown-item" href="auth-lockscreen-basic.html"><i class="mdi mdi-lock text-muted fs-16 align-middle me-1"></i> <span class="align-middle">Lock screen</span></a>-->
                                    <a class="dropdown-item logout-link" href="auth-logout-basic.html"><i class="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> <span class="align-middle" data-key="t-logout">Logout</span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <!-- removeNotificationModal -->
            <div id="removeNotificationModal" class="modal fade zoomIn" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="NotificationModalbtn-close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mt-2 text-center">
                                <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon>
                                <div class="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                                    <h4>Are you sure ?</h4>
                                    <p class="text-muted mx-4 mb-0">Are you sure you want to remove this Notification ?</p>
                                </div>
                            </div>
                            <div class="d-flex gap-2 justify-content-center mt-4 mb-2">
                                <button type="button" class="btn w-sm btn-light" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn w-sm btn-danger" id="delete-notification">Yes, Delete It!</button>
                            </div>
                        </div>

                    </div><!-- /.modal-content -->
                </div><!-- /.modal-dialog -->
            </div><!-- /.modal -->
            <!-- ========== App Menu ========== -->
            <?php
            require_once APPPATH . 'views/navigation/sidebar.php';
            ?>
            <script>
                ajs.applyUserSettings();
                ajs.apply_roles();
            </script>
            <!-- Left Sidebar End -->
            <!-- Vertical Overlay-->
            <div class="vertical-overlay"></div>

