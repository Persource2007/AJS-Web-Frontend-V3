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

        <!-- Bootstrap Css -->
        <link href="<?= cnd_url(); ?>assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <!-- Icons Css -->
        <link href="<?= cnd_url(); ?>assets/css/icons.min.css" rel="stylesheet" type="text/css" />
        <!-- App Css-->
        <link href="<?= cnd_url(); ?>assets/css/app.min.css" rel="stylesheet" type="text/css" />
        
    </head>
    <style>
        /* app.min.css: .btn { height: 33px; font-size: 0.8125rem } */
        a.btn.app-download-btn {
            display: grid !important;
            place-items: center !important;
            height: 33px !important;
            min-height: 33px !important;
            max-height: 33px !important;
            padding: 0 0.8125rem !important;
            line-height: 1 !important;
            box-sizing: border-box !important;
        }
        a.btn.app-download-btn .app-download-btn__inner {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.375rem;
            line-height: 1;
            margin: 0;
            padding: 0;
        }
        a.btn.app-download-btn .app-download-btn__icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 1.125rem;
            width: 1.125rem;
            height: 1.125rem;
            line-height: 1;
            margin: 0;
            padding: 0;
            flex-shrink: 0;
        }
        a.btn.app-download-btn .app-download-btn__inner > span {
            display: inline-flex;
            align-items: center;
            line-height: 1;
            font-size: 0.8125rem;
            position: relative;
            top: 2px;
        }
    </style>

    <body>

        <div class="auth-page-wrapper pt-5">
            <!-- auth page bg -->
            <div class="auth-one-bg-position auth-one-bg">
                <div class="bg-overlay"></div>

                <div class="shape">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 120">
                    <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
                    </svg>
                </div>
            </div>

            <!-- auth page content -->
            <div class="auth-page-content ">
                <div class="container ">
                    <div class="row justify-content-center">
                        <div class="col-md-8 col-lg-6 col-xl-5 page-content">
                            <div class="text-center mt-sm-5 mb-4 text-white-50">
                                <div>
                                    <a class="d-inline-block auth-logo">
                                        <img src="<?= cnd_url(); ?>assets/images/ajs-logo-white.svg" alt="" height="60">
                                    </a>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body p-4 container-fluid">
                                    <div class="p-2 mt-2">
                                        <?php
                                            // Optional: controller can pass these in
                                            $android_url = getenv('ANDROID_APP_URL') ?? '#';
                                            $android_beta_url = getenv('ANDROID_BETA_APP_URL') ?? '#';
                                            $ios_url = getenv('IOS_APP_URL') ?? '#';
                                            $ios_beta_url = getenv('IOS_BETA_APP_URL') ?? '#';
                                        ?>

                                        <div class="text-center mb-4">
                                            <h5 class="mb-1">Download AJS Mobile App</h5>
                                            <p class="text-muted mb-0">Choose your device platform</p>
                                        </div>

                                        <div class="text-center mb-2">
                                            <b class="mb-1">App Server</b>
                                        </div>

                                        <div class="row g-3">
                                            <div class="col-12 col-sm-6">
                                                <a href="<?= htmlspecialchars($android_url, ENT_QUOTES, 'UTF-8'); ?>" target="_blank" rel="noopener noreferrer"
                                                   class="btn btn-success w-100 app-download-btn">
                                                    <span class="app-download-btn__inner">
                                                        <i class="ri-android-fill app-download-btn__icon" aria-hidden="true"></i>
                                                        <span>Android</span>
                                                    </span>
                                                </a>
                                            </div>
                                            <div class="col-12 col-sm-6">
                                                <a href="<?= htmlspecialchars($ios_url, ENT_QUOTES, 'UTF-8'); ?>" target="_blank" rel="noopener noreferrer"
                                                   class="btn btn-dark w-100 app-download-btn" style="background-color: #2a2a2a;">
                                                    <span class="app-download-btn__inner">
                                                        <i class="ri-apple-fill app-download-btn__icon" aria-hidden="true"></i>
                                                        <span>iOS</span>
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="text-center mb-2 mt-4">
                                            <b class="mb-1">Beta Server</b>
                                        </div>
                                        <div class="row g-3">
                                            <div class="col-12 col-sm-6">
                                                <a href="<?= htmlspecialchars($android_beta_url, ENT_QUOTES, 'UTF-8'); ?>" target="_blank" rel="noopener noreferrer"
                                                   class="btn btn-success w-100 app-download-btn">
                                                    <span class="app-download-btn__inner">
                                                        <i class="ri-android-fill app-download-btn__icon" aria-hidden="true"></i>
                                                        <span>Android</span>
                                                    </span>
                                                </a>
                                            </div>
                                            <div class="col-12 col-sm-6">
                                                <a href="<?= htmlspecialchars($ios_beta_url, ENT_QUOTES, 'UTF-8'); ?>" target="_blank" rel="noopener noreferrer"
                                                   class="btn btn-dark w-100 app-download-btn" style="background-color: #2a2a2a;">
                                                    <span class="app-download-btn__inner">
                                                        <i class="ri-apple-fill app-download-btn__icon" aria-hidden="true"></i>
                                                        <span>iOS</span>
                                                    </span>
                                                </a>
                                                <span class="mt-2 d-block text-center">Install via TestFlight</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- end card body -->
                            </div>
                            <!-- end card -->

                        </div>
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
                                <p class="mb-0 text-muted">&copy;
                                    <script>document.write(new Date().getFullYear())</script> Copyright & Developed by <a href="https://netlink.co.in" target="_BLANK">NetLink</a> & <a href="https://www.globalbug.co.uk/" target="_BLANK">Globalbug Ltd.</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <!-- end Footer -->
        </div>        
    </body>
</html>
