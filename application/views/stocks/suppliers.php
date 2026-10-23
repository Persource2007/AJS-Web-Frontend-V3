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
                        $title = "Suppliers";
                        require_once APPPATH . 'views/stocks/inc/nav-tab.php';
                        ?>
                        <!-- Tab panes -->

                        <div class="tab-content- pt-0 text-muted">
                            <div class="tab-pane active " role="tabpanel">
                                <div class="card" id="tasksList">
                                    <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3">
                                        <?php
                                        require_once APPPATH . 'views/suppliers/inc/list-filters.php';
                                        ?>
                                        <div class="row">
                                            <h6 class="fs-14 mb-0 text-end position-absolute" style="top:20px; padding-right:25px">Average Price: £<span id="supplier-ave-price">0</span></h6>
                                        </div>
                                    </div>
                                    <!--end row-->
                                    <div class="card-body pt-0" style="padding-top: 10px !important;">
                                        <div class="table-responsive">
                                            <table class="table align-middle dt-responsive table-nowrap mb-0  w-100" id="supplier-datatables" style="">
                                                <thead class="table-light text-muted">
                                                    <tr>
                                                        <th></th>
                                                        <th>Id</th>
                                                        <th><span class="ps-3">Name</span></th>
                                                        <th>Code</th>
                                                        <th>Email</th>
                                                        <th>Mobile</th>
                                                        <th>City</th>
                                                        <th>Postcode</th>
                                                        <th>Supplier Part No.</th>
                                                        <th>Price (£)</th>
                                                        
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
<input type="hidden" id="stock_id" name="stock_id" value="<?= $id ?? null ?>" />
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/stocks/stock-supplier.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>