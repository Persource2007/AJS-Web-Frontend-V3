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
                    <?php
                    require_once APPPATH . 'views/stocks/inc/bulk-upload-form.php';
                    ?>
                    <!--end card-body-->
                    <div class="card-body pt-3 stock-setting-btn all-tbl-same-width1">
                        <div class="table-responsive">
                            <table id="stock-datatables" class="display table dt-responsive align-middle table-nowrap mb-0 table-hover" style="margin-top: 0px !important;">
                                <thead class="table-light text-muted">
                                    <tr>
                                        <th></th>
                                        <th>Id</th>
                                        <th>Code</th>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Category</th>
                                        <th>Make</th>
                                        <th>Model</th>
                                        <th>Price Per Unit (£)</th>
                                        <th>Sell Per Unit (£)</th>
                                        <th>Unit</th>
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
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/stocks/stock.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>