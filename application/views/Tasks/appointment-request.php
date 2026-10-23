<!doctype html>
<html lang="en" data-layout="vertical" data-topbar="light" data-sidebar="dark" data-sidebar-size="sm-hover" data-sidebar-image="none" data-preloader="disable">

    <head>

        <meta charset="utf-8" />
        <title>AJS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta content="" name="description" />
        <meta content="" name="author" />
        <!-- App favicon -->
        <link rel="shortcut icon" href="<?= cnd_url('assets/images/ajs-favion.png'); ?>">

        <!-- Layout config Js -->
        <!-- <script src="<?= cnd_url(); ?>assets/js/layout.js"></script> -->
        <!-- Bootstrap Css -->
        <link href="<?= cnd_url(); ?>assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <!-- Icons Css -->
        <link href="<?= cnd_url(); ?>assets/css/icons.min.css" rel="stylesheet" type="text/css" />
        <!-- App Css-->
        <link href="<?= cnd_url(); ?>assets/css/app.min.css" rel="stylesheet" type="text/css" />
        <!-- custom Css-->
        <link href="<?= cnd_url(); ?>assets/css/custom.min.css" rel="stylesheet" type="text/css" />
        <link href="<?= cnd_url(); ?>assets/libs/sweetalert2/sweetalert2.min.css" rel="stylesheet" type="text/css" />
        <link href="<?= cnd_url(); ?>assets/libs/flatpickr/flatpickr.min.css" rel="stylesheet" type="text/css" />
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
            /* Flatpickr header - improve month/year visibility on dark background */
            .flatpickr-months .flatpickr-month,
            .flatpickr-current-month,
            .flatpickr-current-month span.cur-month,
            .flatpickr-current-month input.cur-year,
            .flatpickr-current-month .flatpickr-monthDropdown-months,
            .flatpickr-months .flatpickr-prev-month,
            .flatpickr-months .flatpickr-next-month {
                color: #fff !important;
                fill: #fff !important;
            }
            .flatpickr-months .flatpickr-prev-month svg path,
            .flatpickr-months .flatpickr-next-month svg path {
                fill: #fff !important;
            }
            .tracking-status-box {
                background-color: #f8f9fa;
                border-left: 4px solid #ffc107;
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
        <script src="<?= cnd_url(); ?>assets/libs/flatpickr/flatpickr.min.js"></script>
        <script>
            const appointmentHash = "<?= $hash; ?>";
            const baseURL = "<?= cnd_url(); ?>";
            const appURL = "<?= app_url(); ?>";
            const apiAppointmentDetail = `${appURL}appointment-request/${appointmentHash}/detail`;
            const apiAppointmentConfirm = `${appURL}appointment-request/${appointmentHash}/confirm`;
            const apiAppointmentReschedule = `${appURL}appointment-request/${appointmentHash}/reschedule`;
        </script>

    </head>

    <body>

        <!--preloader-->
        <div id="status" class="d-flex align-items-center justify-content-center">
            <div class="spinner-border text-primary avatar-xxs m-auto" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

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
                                                <h3 class="mb-4 appointment_status">Confirm Appointment</h3>
                                            </div>
                                            <!-- Skeleton Loading State -->
                                            <div id="skeleton-loader">
                                                <div class="row">
                                                    <div class="col-md-8 col-sm-12 mb-3">
                                                        <div class="skeleton-box bg-color-date date-div" style="height: 40px; border-radius: 4px; margin-bottom: 15px;"></div>
                                                    </div>
                                                    <div class="col-md-4 col-sm-12 mb-3">
                                                        <div class="skeleton-box" style="height: 30px; border-radius: 4px; margin-bottom: 15px;"></div>
                                                    </div>
                                                    <div class="col-12 mb-3">
                                                        <div class="skeleton-box" style="height: 60px; border-radius: 4px; margin-bottom: 15px;"></div>
                                                    </div>
                                                    <div class="col-md-6 mb-3">
                                                        <div class="skeleton-box" style="height: 25px; border-radius: 4px; margin-bottom: 10px;"></div>
                                                        <div class="skeleton-box" style="height: 25px; border-radius: 4px; margin-bottom: 10px;"></div>
                                                        <div class="skeleton-box" style="height: 25px; border-radius: 4px; margin-bottom: 10px;"></div>
                                                    </div>
                                                    <div class="col-md-6 mb-3">
                                                        <div class="skeleton-box" style="height: 25px; border-radius: 4px; margin-bottom: 10px;"></div>
                                                        <div class="skeleton-box" style="height: 50px; border-radius: 4px; margin-bottom: 10px;"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- Actual Content (hidden initially) -->
                                            <div id="appointment-content" style="display: none;">
                                                <div class="row">
                                                    <div class="col-md-8 col-sm-12 mb-3">
                                                        <span class="bg-color-date date-div view_data"><b>Date:</b> {{DATE}} | Time: {{TIME}}</span>
                                                    </div>
                                                    <div class="col-md-4 col-sm-12">
                                                        <table class="table mb-0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="w-50 text-md-end text-start view_data"><b>Job Code:</b> {{JOB_CODE}}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div class="col-12">
                                                        <table class="table mb-0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="view_data"><b>Job Description:</b><br>{{DESCRIPTION}}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                                        <table class="table mb-0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="view_data"><b>Job Type:</b> {{JOB_TYPE}}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="view_data"><b>Contract:</b> {{CONTRACT}}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="view_data"><b>Client:</b> {{CLIENT}}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td height="10"></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                                        <table class="table mb-0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="view_data"><b>Property UPRN:</b> {{UPRN}}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="view_data"><b>Address:</b><br>{{ADDRESS1}}, {{POSTALCODE}}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class="mt-4 mb-3">
                                                    <div class="hstack gap-2 action-buttons">
                                                        <div><a href="javascript:;" class="btn btn-success w-100 apply-action confirm-btn" id="btn-confirm" data-action="confirm">Confirm Appointment</a></div>
                                                        <div><a href="javascript:;" class="btn btn-secondary w-100 apply-action reschedule-btn reschedule" id="btn-reschedule" data-action="reschedule">Reschedule</a></div>
                                                    </div>
                                                    <div id="past-date-message" class="tracking-status-box shadow-sm" style="display: none;">
                                                        <h6 class="text-uppercase text-muted fw-bold mb-2">Notice</h6>
                                                        <p class="mb-0 text-dark">You cannot make changes to this job at this hour.</p>
                                                    </div>
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

        <!-- JAVASCRIPT -->

        <script src="<?= cnd_url(); ?>assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script type="text/javascript" src="<?= cnd_url('assets/js/datatables/appointment-request.js?v=1.6') ?>"></script>

        <!-- particles js -->

        <!-- particles app js -->

        <!-- password-addon init -->

    </body>

</html>
