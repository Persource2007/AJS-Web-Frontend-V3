<?php
$redirect_url = $this->session->userdata('redirect_url');
$this->session->unset_userdata('redirect_url');
?>
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
        <script src="<?= cnd_url(); ?>assets/js/layout.js"></script>
        <!-- Bootstrap Css -->
        <link href="<?= cnd_url(); ?>assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <!-- Icons Css -->
        <link href="<?= cnd_url(); ?>assets/css/icons.min.css" rel="stylesheet" type="text/css" />
        <!-- App Css-->
        <link href="<?= cnd_url(); ?>assets/css/app.min.css" rel="stylesheet" type="text/css" />
        <!-- custom Css-->
        <link href="<?= cnd_url(); ?>assets/css/custom.min.css" rel="stylesheet" type="text/css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script type="text/javascript">
            site_url = '<?= api_url(); ?>';
            cdn_url = '<?= cdn_url(); ?>';

<?php
if ($redirect_url && trim($redirect_url) != '')
{
    ?>
                    redirect_url = '<?= $redirect_url; ?>';
                <?php
            }
else
{
    ?>
                    redirect_url = '';
                <?php
            }
?>
        </script>
        <script src="<?= cnd_url('assets/js/app/ajs.js'); ?>" rel="stylesheet" type="text/javascript" ></script>
        <script>
            ajs.is_logged_in(true);
            ajs.preload_settings();
        </script>
        <script src="<?= cnd_url('assets/js/forms/form-handler.js'); ?>" rel="stylesheet" type="text/javascript" ></script>
        <script src="<?= cnd_url('assets/js/app/commons.js'); ?>" rel="stylesheet" type="text/javascript" ></script>
        <script src="<?= cnd_url('assets/js/device-uuid.min.js'); ?>" rel="stylesheet" type="text/javascript" ></script>

    </head>

    <body>

        <div class="h-100 w-100 position-absolute" id="loader-main" style="display:none; background-color: #ffffff95; z-index: 9;">
            <div class="spinner-border position-absolute" role="status" style="top: 50%; left: 50%; z-index: 9;">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

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
                <div class="container">
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
                                        <form id="set_password_form" method="POST" action="<?= api_url('auth/reset_password') ?>">
                                            <h5 class="text-center mb-3">Set Password</h5>
                                            <div class="mb-3 form-server-errors" style="display:none">

                                            </div>

                                            <div class="mb-3">
                                                <label for="username" class="form-label">Username</label>
                                                <input name="username" id="username" type="text" disabled="disabled" class="form-control" required="required" placeholder="Enter username">
                                            </div>

                                            <div class="mb-3">
                                                <label class="form-label" for="password-input">Password</label>
                                                <div class="position-relative auth-pass-inputgroup mb-3">
                                                    <input type="password" name="password" class="form-control pe-5 password-input" required="required" placeholder="Enter password" id="password">
                                                    <button class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon"><i class="ri-eye-fill align-middle"></i></button>
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label" for="password-input">Confirm Password</label>
                                                <div class="position-relative auth-pass-inputgroup mb-3">
                                                    <input type="password" name="cpassword" class="form-control pe-5 password-input" required="required" placeholder="Enter password" id="cpassword">
                                                    <button class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon"><i class="ri-eye-fill align-middle"></i></button>
                                                </div>
                                                <input type="hidden" name="device_id" id="device_id" value="" />
                                                <input type="hidden" name="firebase_token" id="firebase_token" value="" />
                                                <input type="hidden" name="login_type" id="login_type" value="WEB" />
                                                <input type="hidden" name="user_id" id="user_id" value="" />
                                                <input type="hidden" name="user_email" id="user_email" value="" />
                                                <input type="hidden" name="key" id="key" value="<?= $key ?>" />
                                                <input type="hidden" name="forgot_key" id="forgot_key" value="<?= $forgot_key ?>" />
                                            </div>
                                            <div class="mt-4">
                                                <button class="btn btn-primary w-100" type="submit">Set Password</button>
                                            </div>
                                        </form>
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
        <!-- end auth-page-wrapper -->

        <!-- JAVASCRIPT -->
        <script src="<?= cnd_url('assets/libs/bootstrap/js/bootstrap.bundle.min.js'); ?>"></script>
        <script src="<?= cnd_url('assets/libs/simplebar/simplebar.min.js'); ?>"></script>
        <script src="<?= cnd_url('assets/libs/node-waves/waves.min.js'); ?>"></script>
        <script src="<?= cnd_url('assets/libs/feather-icons/feather.min.js'); ?>"></script>
        <script src="<?= cnd_url('assets/js/pages/plugins/lord-icon-2.1.0.js'); ?>"></script>
        <script src="<?= cnd_url('assets/js/plugins.js'); ?>"></script>
        <script src="<?= cnd_url('assets/js/validate/jquery.validate.min.js'); ?>"></script>
        <script src="<?= cnd_url('assets/js/validate/additional-methods.js'); ?>"></script>
        <script src="<?= cnd_url('assets/js/validate/form-validate.js'); ?>"></script>

        <!-- particles js -->
        <script src="<?= cnd_url('assets/libs/particles.js/particles.js'); ?>"></script>
        <!-- particles app js -->
        <script src="<?= cnd_url('assets/js/pages/particles.app.js'); ?>"></script>
        <!-- password-addon init -->
        <script src="<?= cnd_url('assets/js/pages/password-addon.init.js'); ?>"></script>
        <script type="text/javascript">

            ajs_form_handler.validate_user_key("<?= $key ?>", "<?= $new_user ?>");
            ajs_form_handler.validate_forgot_key("<?= $forgot_key ?>");

            var device_id = new DeviceUUID().get();
            $('#device_id').val(device_id);
            $('#firebase_token').val(device_id);
        </script>
        <script>
            $(document).ready(function () {
            <?php
            if ($this->session->flashdata('msg') && is_array($this->session->flashdata('msg')))
            {
                foreach ($this->session->flashdata('msg') as $msg)
                {
                    ?>
                                ajs.showModalAlert('<?= $msg['type']; ?>', "<?= $msg['message']; ?>");
                    <?php
                }
                unset($_SESSION['msg']);
            }
            if ($this->session->userdata('alert_msg') && is_array($this->session->userdata('alert_msg')))
            {

                foreach ($this->session->userdata('alert_msg') as $msg)
                {
        ?>
                                ajs.showAlertBar('<?= $msg['type']; ?>', "<?= $msg['message']; ?>", "1");
                    <?php
                }
                unset($_SESSION['alert_msg']);
            }
            ?>

            });
        </script>

    </body>

</html>
