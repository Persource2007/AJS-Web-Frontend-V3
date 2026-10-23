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
        <script src="https://code.jquery.com/jquery-3.4.1.min.js" crossorigin="anonymous"></script>
        <script src="<?= cnd_url(); ?>assets/libs/sweetalert2/sweetalert2.min.js"></script>
        <script type="text/javascript" src="<?= cnd_url(); ?>assets/js/app/hashids.js"></script>
        <script src="<?= cnd_url(); ?>assets/libs/flatpickr/flatpickr.min.js"></script>

        

        <script>
            hashids = new Hashids('',10);
            //const app = hashids.decode("<?= $id; ?>");
            const id = "<?= $id ?>";
            const token ="<?= $id; ?>";
            const baseURL = "<?= cnd_url(); ?>"
            const appURL = "<?= app_url(); ?>"
            const confirm_app = `${appURL}quotation/approve-quote/{ID}`;
            const quotation_details = `${appURL}quotation/quotation_details/{ID}`;
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
                    <input type="hidden" id="quotation_status" value="approve">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card overflow-hidden">
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
                                            <div class="check_status">
                                                
                                            </div>
                                        </div>                                    
                                    <!-- end col -->
                                </div>
                                <!-- end row -->
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
                                    <script>document.write(new Date().getFullYear())</script> Copyright & Developed by <a href="https://netlink.co.in" target="_BLANK">NetLink</a> &amp; <a href="https://www.globalbug.co.uk/" target="_BLANK">Globalbug Ltd.</a>
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
        <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/confirm-quote.js') ?>"></script>

        <!-- particles js -->

        <!-- particles app js -->

        <!-- password-addon init -->

    </body>

</html>