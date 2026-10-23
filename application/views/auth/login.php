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
if ($redirect_url && trim($redirect_url) != '') {
    ?>
                redirect_url = '<?= $redirect_url; ?>';
    <?php
} else {
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
                                        <form id="login_form" method="POST" action="<?= api_url('auth/login') ?>">
                                            <h5 class="text-center mb-3">Login</h5>
                                            <div class="mb-2 form-server-errors text-danger" style="display:none">

                                            </div>

                                            <div class="mb-3">
                                                <label for="username" class="form-label">Username</label>
                                                <input tabindex="1" name="username" id="username" type="text" class="form-control" required="required" id="username" placeholder="Enter username">
                                            </div>

                                            <div class="mb-3">
                                                <div class="float-end">
                                                    <a href="<?= base_url('auth/forgot-password') ?>" class="text-muted">Forgot password?</a>
                                                </div>
                                                <label class="form-label" for="password-input">Password</label>
                                                <div class="position-relative auth-pass-inputgroup mb-2">
                                                    <input  tabindex="2" type="password" name="password" class="form-control pe-5 password-input" required="required" placeholder="Enter password" id="password-input">
                                                    <button class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon"><i class="ri-eye-fill align-middle"></i></button>
                                                </div>
                                                <input type="hidden" name="device_id" id="device_id" value="" />
                                                <input type="hidden" name="firebase_token" id="firebase_token" value="" />
                                                <input type="hidden" name="login_type" id="login_type" value="WEB" />
                                                <input type="hidden" name="re_auth_mfa" id="re_auth_mfa" value="0" />

                                                <!--                                                <div class="row">
                                                                                                    <div class="col-xl-12 col-md-12 text-end">
                                                        <div class="form-check mb-2 text-end remember-me-form-bottom">
                                                            <input class="form-check-input" type="checkbox" id="formCheck1" style="margin-top: 1px; border: var(--vz-border-width) solid #AAAAAA;">
                                                            <label class="form-check-label text-muted ms-1" for="formCheck1">
                                                                Remember me
                                                            </label>
                                                        </div>
                                                    </div>
                                                                                                </div>-->
                                            </div>
                                            <div class="mfa-div" style="display:none">
                                                <div class="row">
                                                    <div class="col-md-4 mfa-qr">

                                                    </div>
                                                    <div class="col-md-8">
                                                        <div class="mb-3">
                                                            <label for="mfa_code" style="text-align: justify" class="form-label qr-label">Authenticator OTP</label>
                                                            <input name="mfa_code" style="margin-top: 5px" id="mfa_code" type="text" class="form-control" required="required" placeholder="Enter OTP">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>



                                            <!-- <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="auth-remember-check">
                                                <label class="form-check-label" for="auth-remember-check">Remember me</label>
                                            </div> -->

                                            <div class="mt-4">
                                                <button class="btn btn-primary w-100" type="submit">Sign In</button>
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
        <script type="text/javascript" src="<?= cnd_url('assets/js/app/hashids.js'); ?>"></script>
        <script type="text/javascript">
            var hashids = new Hashids('', 10);
            var device_id = new DeviceUUID().get();
            $('#device_id').val(device_id);
            $('#firebase_token').val(device_id);
        </script>

        <script type="module">
            import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
            import { getMessaging, getToken} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging.js";

            const firebaseConfig = {
                apiKey: "AIzaSyDMRGcbz4AHQyNKVcKUXDLZ2KnK4Q55cTQ",
                authDomain: "ajs-project-f206b-integration.firebaseapp.com",
                projectId: "ajs-project-f206b-integration",
                messagingSenderId: "364370679822",
                appId: "1:364370679822:web:da02508ed0e322711ac45f"
            };

            // const firebaseConfig = {
            // apiKey: "AIzaSyCbrJT7rIOCIovfAxRUgvU6ehK331dhGqQ",
            // authDomain: "ajs-netlink.firebaseapp.com",
            // projectId: "ajs-netlink",
            // storageBucket: "ajs-netlink.firebasestorage.app",
            // messagingSenderId: "390259793163",
            // appId: "1:390259793163:web:3bdbf6394a4a34e9c9d60e"
            // };

            // Initialize Firebase in the main context
            const app = initializeApp(firebaseConfig);
            const messaging = getMessaging(app);

            // Register the service worker
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register("<?= cnd_url('firebase-messaging-sw.js'); ?>")
                        .then((registration) => {
                            console.log('Service Worker registered with scope:', registration.scope);
                        })
                        .catch((error) => {
                            console.log('Service Worker registration failed:', error);
                        });
            }

            // // Request notification permission and get FCM token
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    getToken(messaging, {
                        vapidKey: 'BC-OyBfddc0J1_H0rXV9yU3pdUR9i45rN5P6wKrGdRlIj4133wqYN-BKriSfS9SXT3_MKiGzGEzB0cTC2-sI3vY'
                                //vapidKey: 'BB411C0g7UzTm_znrhLN1Os-8qvT99J3zHnpO9sm9DiXbVQiFGe82bS7X0g77gDl_XtsEj4PRW1MLlNsDuy72Q0'
                    }).then((currentToken) => {
                        if (currentToken) {
                            $('#firebase_token').val(currentToken);
                            console.log("FCM Token:", currentToken);
                        } else {
                            console.warn('No registration token available. Request permission to generate one.');
                        }
                    }).catch((error) => {
                        console.error('An error occurred while retrieving the FCM token:', error);
                    });
                } else {
                    console.warn("Notification permission not granted.");
                }
            });

        </script>
        <script>
            $(document).ready(function () {
<?php
$load_in_popup = $this->session->userdata('load_in_popup');
unset($_SESSION['load_in_popup']);

if ($this->session->flashdata('msg') && is_array($this->session->flashdata('msg'))) {
    foreach ($this->session->flashdata('msg') as $msg) {
        ?>
                        ajs.showModalAlert('<?= $msg['type']; ?>', "<?= $msg['message']; ?>");
        <?php
    }
    unset($_SESSION['msg']);
}
if ($this->session->userdata('alert_msg') && is_array($this->session->userdata('alert_msg'))) {

    foreach ($this->session->userdata('alert_msg') as $msg) {
        ?>
                        ajs.showAlertBar('<?= $msg['type']; ?>', "<?= $msg['message']; ?>", "1");
        <?php
    }
    unset($_SESSION['alert_msg']);
}


if ($load_in_popup) {
    ?>
                    $('body').addClass('modal-hide');
    <?php
}
?>

            });
        </script>

    </body>

</html>
