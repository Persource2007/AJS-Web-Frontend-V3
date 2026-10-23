<!-- JAVASCRIPT -->
<script src="<?= cnd_url(); ?>assets/libs/node-waves/waves.min.js"></script>
<script src="<?= cnd_url(); ?>assets/libs/feather-icons/feather.min.js"></script>
<script src="<?= cnd_url(); ?>assets/js/pages/plugins/lord-icon-2.1.0.js"></script>
<!--<script src="<?= cnd_url(); ?>assets/js/plugins.js"></script>-->
<script src="<?= cnd_url(); ?>assets/libs/choices.js/public/assets/scripts/choices.min.js"></script>
<script src="<?= cnd_url(); ?>assets/libs/flatpickr/flatpickr.min.js"></script>
<!-- list.js min js -->
<script src="<?= cnd_url(); ?>assets/libs/list.js/list.min.js"></script>
<!--list pagination js-->
<script src="<?= cnd_url(); ?>assets/libs/list.pagination.js/list.pagination.min.js"></script>
<!-- titcket init js -->
<!--<script src="<?= cnd_url(); ?>assets/js/pages/tasks-list.init.js"></script>-->
<!-- Sweet Alerts js -->
<script src="<?= cnd_url(); ?>assets/libs/sweetalert2/sweetalert2.min.js"></script>
<!-- App js -->
<script src="<?= cnd_url(); ?>assets/js/app.js"></script>
<script src="<?= cnd_url('assets/js/validate/jquery.validate.min.js'); ?>"></script>
<script src="<?= cnd_url('assets/js/validate/additional-methods.js'); ?>"></script>
<script src="<?= cnd_url('assets/js/validate/additional-methods-custom.js'); ?>"></script>
<script src="<?= cnd_url('assets/js/validate/jquery.validate.file.js'); ?>"></script>
<script src="<?= cnd_url('assets/js/validate/form-validate.js?v=1.2'); ?>"></script>
<script src="<?= cnd_url('assets/libs/glightbox/js/glightbox.min.js'); ?>" rel="stylesheet"
    type="text/javascript"></script>
<script src="<?= cnd_url('assets/js/pages/gallery.init.js'); ?>" rel="stylesheet" type="text/javascript"></script>
<script src="<?= cnd_url('assets/js/app/footer-scripts.js'); ?>"></script>

<script>
    $(document).ready(function () {
        <?php
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
        ?>

    });

    
</script>
