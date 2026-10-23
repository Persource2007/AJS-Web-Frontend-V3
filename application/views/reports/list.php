<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->

            <div class="same-page-height dataTables-height">
                <div class="card" id="tasksList">
                    <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3">
                        <?php
                        require_once APPPATH . 'views/reports/inc/list-filters.php';
                        ?>
                    </div>
                    <!--end card-body-->
                    <div class="card-body pt-0 report-setting-btn- same-position-btn- all-tbl-same-width2" style="padding-top: 10px !important;">
                        <div class="table-responsive mb-0">
                            <table id="ajax-datatables" class="display table dt-responsive align-middle table-nowrap mb-0 table-hover" style="">
                                <thead class="table-light text-muted">
                                    <tr>
                                        <th></th>
                                        <th>Id</th>
                                        <th>Title</th>
                                        <th>Code</th>
                                        <th>Created On</th>
                                        <th>Created By</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
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
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/reports/reports.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
<script type="text/javascript">
    $(document).ready(function (e) {
        var hash = window.location.hash;
        if (hash) {
            hash = hash.replace('#', ''); // strip the # at the beginning of the string
            if (hash == 'add') {
                $('button.popup-form-button').trigger('click');
            }
        }
    });
</script>