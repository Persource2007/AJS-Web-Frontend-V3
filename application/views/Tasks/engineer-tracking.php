<!doctype html>
<html lang="en" data-layout="vertical" data-topbar="light" data-sidebar="dark" data-sidebar-size="sm-hover" data-sidebar-image="none" data-preloader="disable">

<head>

    <meta charset="utf-8" />
    <title>AJS - Track Your Engineer</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="" name="description" />
    <meta content="" name="author" />
    <!-- App favicon -->
    <link rel="shortcut icon" href="<?= cnd_url('assets/images/ajs-favion.png'); ?>">

    <!-- Bootstrap Css -->
    <link href="<?= cnd_url(); ?>assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <!-- Icons Css -->
    <link href="<?= cnd_url(); ?>assets/css/icons.min.css" rel="stylesheet" type="text/css" />
    <!-- App Css-->
    <link href="<?= cnd_url(); ?>assets/css/app.min.css" rel="stylesheet" type="text/css" />
    <!-- custom Css-->
    <link href="<?= cnd_url(); ?>assets/css/custom.min.css" rel="stylesheet" type="text/css" />
    <link href="<?= cnd_url(); ?>assets/libs/sweetalert2/sweetalert2.min.css" rel="stylesheet" type="text/css" />
    
    <style>
        .skeleton-box {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s ease-in-out infinite;
        }
        @keyframes loading {
            0% {
                background-position: 200% 0;
            }
            100% {
                background-position: -200% 0;
            }
        }

        .tracking-status-box {
            background-color: #f8f9fa;
            border-left: 4px solid #1abc9c;
            padding: 15px;
            border-radius: 4px;
            margin-top: 20px;
        }
        .public-branding-header,
        .public-branding-footer {
            width: 100%;
            text-align: center;
            padding: 0;
            line-height: 0;
        }
        .public-branding-header img,
        .public-branding-footer img {
            width: 100%;
            height: auto;
            display: block;
            object-fit: contain;
        }
    </style>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js" crossorigin="anonymous"></script>
    <script src="<?= cnd_url(); ?>assets/libs/sweetalert2/sweetalert2.min.js"></script>
    <script>
        const hash = "<?= $hash; ?>";
        const baseURL = "<?= cnd_url(); ?>";
        const appURL = "<?= app_url(); ?>";
        const tracking_details_url = `${appURL}et/${hash}/detail`;
    </script>
</head>

<body>

    <div class="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
        <div class="bg-overlay"></div>
        <!-- auth-page content -->
        <div class="auth-page-content overflow-hidden pt-lg-5">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card overflow-hidden">
                            <div id="branding-header" class="public-branding-header" style="display: none;">
                                <img id="letter-header-img" src="" alt="">
                            </div>
                            <div class="row g-0">
                                    <div class="col-lg-5">
                                        <div class="p-lg-5 p-4 auth-one-bg h-100">
                                            <div class="position-relative h-100 d-flex flex-column">
                                                <a href="#" class="d-inline-block auth-logo">
                                                    <img src="<?= cnd_url(); ?>assets/images/ajs-logo-white.svg" alt="" height="60">
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                <!-- end col -->

                                <div class="col-lg-7">
                                    <div class="p-lg-5 p-4">
                                        <div class="">
                                            <h3 class="mb-4">Track Your Engineer</h3>
                                        </div>
                                        
                                        <!-- Error State -->
                                        <div id="error-container" style="display: none;" class="alert alert-danger">
                                            <h5 class="alert-heading text-danger">Error</h5>
                                            <p id="error-message" class="mb-0">This tracking link is invalid or has expired.</p>
                                        </div>

                                        <!-- Skeleton Loading State -->
                                        <div id="skeleton-loader">
                                            <div class="d-flex align-items-center mb-4">
                                                <div class="flex-grow-1">
                                                    <div class="skeleton-box" style="height: 25px; border-radius: 4px; margin-bottom: 10px; width: 70%;"></div>
                                                    <div class="skeleton-box" style="height: 20px; border-radius: 4px; width: 50%;"></div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6 mb-3">
                                                    <div class="skeleton-box" style="height: 25px; border-radius: 4px; margin-bottom: 10px;"></div>
                                                    <div class="skeleton-box" style="height: 25px; border-radius: 4px; margin-bottom: 10px;"></div>
                                                </div>
                                                <div class="col-12 mt-3">
                                                    <div class="skeleton-box" style="height: 60px; border-radius: 4px;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <!-- Actual Content (hidden initially) -->
                                        <div id="tracking-content" style="display: none;">
                                            <div class="d-flex align-items-center mb-4">
                                                <div class="flex-grow-1">
                                                    <h5 class="mb-1" id="engineer_name_display">Your assigned engineer is loading...</h5>
                                                </div>
                                            </div>
                                            
                                            <div class="row">
                                                <div class="col-12 mt-2">
                                                    <table class="table mb-0">
                                                        <tbody>
                                                            <tr>
                                                                <td class="view_data text-muted"><i class="mdi mdi-tools me-1"></i> Job Category: <strong><span id="job_type_title_display"></span></strong></td>
                                                            </tr>
                                                            <tr>
                                                                <td class="view_data text-muted"><i class="mdi mdi-calendar me-1"></i> Scheduled Date: <strong><span id="task_date_display"></span></strong></td>
                                                            </tr>
                                                            <tr id="task_time_row" style="display: none;">
                                                                <td class="view_data text-muted"><i class="mdi mdi-clock-outline me-1"></i> Scheduled Time: <strong><span id="task_time_display"></span></strong></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            
                                            <div class="tracking-status-box shadow-sm">
                                                <h6 class="text-uppercase text-muted fw-bold mb-2">Live Status</h6>
                                                <h5 class="mb-0 text-dark" id="tracking_status_message">Checking status...</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- end col -->
                            </div>
                            <!-- end row -->
                            <div id="branding-footer" class="public-branding-footer" style="display: none;">
                                <img id="letter-footer-img" src="" alt="">
                            </div>
                        </div>
                        <!-- end card -->
                    </div>
                    <!-- end col -->
                </div>
                <!-- end row -->
            </div>
            <!-- end container -->
            </div>
            <!-- end auth page content -->

            <!-- footer -->
        <footer class="footer">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="text-center">
                            <p class="mb-0 text-white">©
                                <script>document.write(new Date().getFullYear())</script> Copyright & Developed by <a href="https://netlink.co.in" target="_BLANK" class="text-warning">NetLink</a> &amp; <a href="https://www.globalbug.co.uk/" target="_BLANK" class="text-warning">Globalbug Ltd.</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        <!-- end Footer -->
    </div>
    <!-- end auth-page-wrapper -->

    <script src="<?= cnd_url(); ?>assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script type="text/javascript" src="<?= cnd_url('assets/js/datatables/engineer-tracking.js?v=1.0') ?>"></script>

</body>

</html>
