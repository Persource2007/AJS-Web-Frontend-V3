<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <?php
            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- start page title -->
            <!-- end page title -->

            <div class="same-page-height dataTables-height">
                <div class="card">
                    <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3 pb-4">
                        <?php
                        require_once APPPATH . 'views/certificates/templates/inc/list-filters.php';
                        ?>
                    </div>
                    <div class="card-body pt-2">
                        <!--end row-->
                        <table class="table align-middle table-nowrap mb-0 properties-table mt-4 w-100" id="ajax-datatables"></table>
                    </div>
                    <!--end card-body-->
                </div>
                <!--end col-->
            </div>
            <!--end row-->
        </div>
        <!-- container-fluid -->
    </div>
</div>
<!-- End Page-content -->
<!-- End Page-content -->
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/certificate-templates.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
<script type="text/javascript">
    $(document).ready(function (e) {
        var hash = window.location.hash;
        if (hash) {
            hash = hash.replace('#', ''); // strip the # at the beginning of the string
            if (hash == 'add')
            {
                $('button.popup-form-button').trigger('click');
            }
        }
    });
</script>
