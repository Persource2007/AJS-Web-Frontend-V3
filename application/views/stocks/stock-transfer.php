<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
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

            <div class="card same-page-height dataTables-height">
                <div class="card-body check-input-check-right">
                    <div class="card-body ps-0 pe-0 pt-0">
                        <form id="load-stock-form">
                            <div class="row g-2 card-header border border-dashed border-top-0 border-end-0 border-start-0 p-0 pb-3 align-items-end">
                                <div class="col-xxl-2 col-xl-3 col-lg-4">
                                    <div class="mb-2 d-flex">
                                        <h5 class="card-title mb-0">From</h5>
                                        <div class="mt-4 mt-lg-0 ms-3">
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input from_location_type" type="radio" name="from_location_type" id="from_location_type_w" value="W" checked="">
                                                <label class="form-check-label" for="from_location_type_w">Warehouse</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input from_location_type" type="radio" name="from_location_type" id="from_location_type_v" value="V">
                                                <label class="form-check-label" for="from_location_type_v">Van</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="input-light">
                                        <select class="form-control select2" name="from_location" id="from_location">
                                            <option value="" selected>From Location</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xxl-2 col-xl-3 col-lg-4">
                                    <div class="mb-2 d-flex">
                                        <h5 class="card-title mb-0">To</h5>
                                        <div class="mt-4 mt-lg-0 ms-3">
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input to_location_type" type="radio" name="to_location_type" id="to_location_type_w" value="W" checked="">
                                                <label class="form-check-label" for="to_location_type_w">Warehouse</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input to_location_type" type="radio" name="to_location_type" id="to_location_type_v" value="V">
                                                <label class="form-check-label" for="to_location_type_v">Van</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="input-light">
                                        <select class="form-control select2" name="to_location" id="to_location">
                                            <option value="" selected>To Location</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xxl-8 col-xl-6 col-lg-6">
                                    <div class="mb-2 d-flex">
                                        <h5 class="card-title mb-0">Transfer By</h5>
                                        <div class="mt-4 mt-lg-0 ms-3">
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input selection_by" type="radio" name="selection_by" id="selection_by_stock" value="stock" checked="">
                                                <label class="form-check-label" for="selection_by_stock">Stock</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input selection_by" type="radio" name="selection_by" id="selection_by_kit" value="kit">
                                                <label class="form-check-label" for="selection_by_kit">Kit</label>
                                            </div>
                                        </div>
                                        <div class="input-light w-25 hide kit-fields">
                                            <div class="d-flex error-div">
                                                <select class="form-control" id="kits" name="kits" required>
                                                    <option value="">Select Kit</option>
                                                </select>
                                                <button type="button" class="btn btn-primary ms-1  popup-form-view-button popup-add-btn" data-heading="View Kit" data-element="kits"  data-form-url="<?= base_url('kit/details') ?>"><i class=" ri-eye-fill  align-bottom"></i></button>
                                            </div>
                                        </div>
                                        <div class="input-light w-50 hide kit-fields" style="margin-left: 10px;">
                                            <input type="number" class="form-control number-only w-25" value="1" min="1" id="kit_qty" name="kit_qty" placeholder="Kit Qty" required>
                                        </div>
                                    </div>

                                    <div class="row g-2">
                                        <div class="col-xxl-5 col-xl-4 col-sm-12 input-light">
                                            <select class="form-control" id="manufacturer_id">
                                                <option value="">All Make</option>
                                            </select>
                                        </div>
                                        <div class="col-xxl-5 col-xl-5 col-sm-12">
                                            <div class="search-box">
                                                <input type="text" class="form-control search" placeholder="Search By Name / Model / Category / Type" id="search">
                                                <i class="mdi mdi-magnify search-widget-icon"></i>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-xxl-2 col-xl-3">
                                            <button id="load-btn" class="btn btn-primary w-100">Load Stock</button>
                                        </div>
                                    </div>

                                </div>

                                <!-- <div class="col-xxl-3 col-sm-12">
                                     <div class="input-light">
                                        <select class="form-control" id="manufacturer_id">
                                            <option value="">All Make</option>
                                        </select>
                                     </div>
                                </div> -->

                            </div>
                            <!--end col-->
                        </form>
                        <div class='card-body ps-0 pe-0 pt-0 server-errors hide'>
                            <div class="row align-items-end">
                                <div class="col-lg-11">
                                    <h5 class="mb-0">Insufficient Stocks</h5>
                                    <div class="error error-msg py-2"></div>
                                </div>
                            </div>
                            <hr class="mt-1 mb-2 all-tbl-same-width">
                                <table class="display table dt-responsive align-middle table-nowrap mb-0 error-table stock-transfer-main-tbl">
                                <thead class="table-light text-muted">
                                    <tr>
                                        <th>Name</th>
                                        <th>Manuf. Part No.</th>
                                        <th>Make</th>
                                        <th>Model</th>
                                        <th>Available Qty</th>
                                        <th>Needed Qty</th>
                                    </tr>
                                </thead>
                                <tbody id="stock-errors">
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!--end row-->
                    <form id="transfer-form">
                        <div class="card-body p-0 hide" id="stock-section">
                            <div class="row align-items-end">
                                <div class="col-lg-11">
                                    <h5 class="mb-0">Stocks</h5>
                                </div>
                                <div class="col-lg-1 col-sm-1">
                                    <button id="transfer-btn" type="button" class="btn btn-success w-100 hide">Transfer</button>
                                </div>
                            </div>
                            <hr class="mt-1 mb-2">

                            <div class="table-responsive all-tbl-same-width">
                                <table class="display table dt-responsive align-middle table-nowrap mb-0" id="stock-datatables">
                                    <thead class="table-light text-muted">
                                        <tr>
                                            <th style="width: 40px;">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="check-all" value="option">
                                                </div>
                                            </th>
                                            <th>Name</th>
                                            <th>Manuf. Part No.</th>
                                            <th>Make</th>
                                            <th>Model</th>
                                            <th>Qty Stock</th>
                                            <th>Qty Transfer</th>
                                        </tr>
                                    </thead>
                                </table>
                                <!--end table-->
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <!--end card-body-->
        </div>
        <!--end row-->
    </div>
    <!-- container-fluid -->
</div>
<!-- End Page-content -->
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/stocks/stock-transfer.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>