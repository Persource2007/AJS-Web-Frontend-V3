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
    <link href="<?= cnd_url('assets/libs/sweetalert2/sweetalert2.min.css'); ?>" rel="stylesheet" type="text/css" />
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
    <script src="<?= cnd_url('assets/js/app/ajs.js'); ?>" rel="stylesheet" type="text/javascript"></script>
    <script>
        ajs.is_logged_in(true);
        ajs.preload_settings();
    </script>
    <script src="<?= cnd_url('assets/js/forms/form-handler.js'); ?>" rel="stylesheet" type="text/javascript"></script>
    <script src="<?= cnd_url('assets/js/app/commons.js'); ?>" rel="stylesheet" type="text/javascript"></script>
    <script src="<?= cnd_url('assets/js/device-uuid.min.js'); ?>" rel="stylesheet" type="text/javascript"></script>

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
                <div class="row">
                    <div class="col-lg-12">
                        <div class="text-center mt-sm-5 mb-4 text-white-50">
                            <div>
                                <a href="#" class="d-inline-block auth-logo">
                                    <img src="<?= cnd_url(); ?>assets/images/ajs-logo-white.svg" alt="" height="60">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end row -->

                <div class="row justify-content-center">
                    <div class="col-md-8 col-lg-6 col-xl-5 page-content">
                        <div class="card">
                            <div class="card-body p-4 container-fluid">
                                <div class="p-2 mt-2">
                                    <form id="verify_2fa_otp_form" method="POST" action="<?= api_url('auth/verify_2fa_otp/' . $user_id) ?>">
                                        <h5>Verify OTP</h5>
                                        <div class="mb-3">
                                            <label class="form-label">We have sent a OTP on your register email. </label>
                                        </div>
                                        <div class="mb-2 form-server-errors text-danger" style="display:none"></div>

                                        <div class="mb-3">
                                            <input name="otp" id="hidden-otp" type="hidden">
                                            <!--                                                <input name="otp" type="text" class="form-control " required="required" placeholder="Enter OTP" inputmode="numeric" pattern="[0-9]{6}" maxlength="6">                                            -->
                                            <div class="otp-field">
                                                <input type="text" maxlength="1" />
                                                <input type="text" maxlength="1" />
                                                <input type="text" maxlength="1" />
                                                <input type="text" maxlength="1" />
                                                <input type="text" maxlength="1" />
                                                <input type="text" maxlength="1" />
                                            </div>

                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Didn't get a OTP ? <button class="btn btn-link" type="button" id="resend-btn">Resend</button> <span id="timer"></span> </label>
                                        </div>
                                        <div>
                                            <button class="btn btn-primary w-100" type="submit" id="verify-btn" disabled>Verify</button>
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
                                <script>
                                    document.write(new Date().getFullYear())
                                </script> Copyright & Developed by <a href="https://netlink.co.in" target="_BLANK">NetLink</a> & <a href="https://www.globalbug.co.uk/" target="_BLANK">Globalbug Ltd.</a>
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
    <script src="<?= cnd_url('assets/libs/node-waves/waves.min.js'); ?>"></script>
    <script src="<?= cnd_url('assets/libs/feather-icons/feather.min.js'); ?>"></script>
    <script src="<?= cnd_url('assets/js/pages/plugins/lord-icon-2.1.0.js'); ?>"></script>
    <script src="<?= cnd_url('assets/js/plugins.js'); ?>"></script>
    <script src="<?= cnd_url('assets/js/validate/jquery.validate.min.js'); ?>"></script>
    <script src="<?= cnd_url(); ?>assets/libs/sweetalert2/sweetalert2.min.js"></script>

    <script>
        $(document).ready(function() {
            $("#verify_2fa_otp_form").validate({
                onkeyup: false,
                rules: {
                    otp: {
                        required: true,
                    }
                },
                messages: {
                    otp: "Please enter OTP",
                },
                submitHandler: function(form) {
                    var sub_button = $(form).find(':submit');
                    ajs.submit_button_element = sub_button;
                    var action = $(form).attr('action');
                    var post_data = $(form).serialize();
                    ajs.ajax_form(action, post_data, 'POST', null, '1', '1', ajs_form_handler.login_form, ajs_form_handler.login_form);
                    return false;
                }
            });

            $(document).on('click', '#resend-btn', function() {
                startResendTimer();
                ajs.ajax_form(site_url + 'auth/resend_2fa_otp/<?= $user_id; ?>', null, 'post', null, '1', '1', ajs_form_handler.form_submit_response, ajs_form_handler.form_submit_response);
            });

            let timer;
            let countdown = 60; // Set the countdown duration in seconds

            function startResendTimer() {
                $('#resend-btn').prop('disabled', true);
                // Start the countdown
                timer = setInterval(updateTimer, 1000);
            }

            function updateTimer() {
                const timerElement = document.getElementById('timer');

                if (countdown > 0) {
                    timerElement.textContent = `Resend in ${countdown} seconds`;
                    countdown--;
                } else {
                    // Enable the button when the countdown reaches zero
                    $('#resend-btn').prop('disabled', false);
                    timerElement.textContent = '';

                    // Reset countdown for the next attempt
                    countdown = 60;

                    // Stop the timer
                    clearInterval(timer);
                }
            }

            const inputs = document.querySelectorAll(".otp-field input");

            inputs.forEach((input, index) => {
                input.dataset.index = index;
                input.addEventListener("keyup", handleOtp);
                input.addEventListener("paste", handleOnPasteOtp);
            });

            function handleOtp(e) {
                const input = e.target;
                let value = input.value;
                let isValidInput = value.match(/[0-9]/gi);
                input.value = "";
                input.value = isValidInput ? value[0] : "";

                let fieldIndex = input.dataset.index;
                if (fieldIndex < inputs.length - 1 && isValidInput) {
                    input.nextElementSibling.focus();
                }

                if (e.key === "Backspace" && fieldIndex > 0) {
                    input.previousElementSibling.focus();
                }
                setHiddenField();
            }

            function handleOnPasteOtp(e) {
                const data = e.clipboardData.getData("text");
                const value = data.split("");
                if (value.length === inputs.length) {
                    inputs.forEach((input, index) => (input.value = value[index]));
                    setHiddenField();
                    $('#verify_2fa_otp_form').submit();
                }
            }

            function setHiddenField() {
                let otp = "";
                inputs.forEach((input) => {
                    otp += input.value;
                    // input.disabled = true;
                    // input.classList.add("disabled");
                });
                $('#hidden-otp').val(otp);
                if(otp.length == 6) {
                    $('#verify-btn').prop('disabled', false);
                } else {
                    $('#verify-btn').prop('disabled', true);
                }
            }
        });
    </script>
</body>
</html>