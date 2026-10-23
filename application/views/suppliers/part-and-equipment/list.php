<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content dataTables-height-detiles">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
                require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->

            <div class="same-page-height dataTables-height">
                <div>
                        <?php 
                         $title = "Part & Equipments";
                        require_once APPPATH . 'views/suppliers/inc/nav-tab.php'; 
                        ?>
                        <!-- Tab panes -->

                        <div class="tab-content pt-0 text-muted">
                            <div class="tab-pane active selling-tab" role="tabpanel">
                                <div class="card" id="tasksList">
                                    <?php
                                        require_once APPPATH . 'views/suppliers/part-and-equipment/inc/bulk-upload-form.php';
                                    ?>
                                    <!--end row-->
                                    <div class="card-body pt-0 part-setting-btn">
                                        <div class="table-responsive mb-4 all-tbl-same-width">
                                            <table class="table align-middle dt-responsive table-nowrap mb-0 properties-table w-100" id="part-datatables" style="margin-top: 0px !important;">
                                                <thead class="table-light text-muted">
                                                    <tr>
                                                        <th></th>
                                                        <th>Id</th>
                                                        <th>Name</th>
                                                        <th>Type</th>
                                                        <th>Category</th>
                                                        <th>Make</th>
                                                        <th>Model</th>
                                                        <th>Supplier Part No.</th>
                                                        <th>Manuf. Part No.</th>
                                                        <th>Price(£)</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                            <!--end card-body-->
                                        </div>
                                    </div>
                                </div>
                                <!--end card-->
                            </div>
                            <!--end tab-pane-->
                        </div>
                        <!--end tab-content-->
                    </div>
                <!--end col-->
            </div>
            <!--end row-->
        </div>
        <!-- container-fluid -->
    </div>
</div>
<!-- End Page-content -->
<input type="hidden" id="supplier_id" name="supplier_id" value="<?= $id ?? null ?>" />
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/suppliers/part-and-equipment.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/kits/kit-items.js') ?>"></script>