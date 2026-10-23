<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->

<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            $title = "Stock";
            $sub_title = isset($id) && $id > 0 ? "Edit Stock" : "Add Stock";
            require_once APPPATH . 'views/stocks/inc/breadcrumb.php';
            ?>
            <!-- end page title -->
            <div class="row">
                <div class="col-lg-12">
                    <div>
                        <?php
                        require_once APPPATH . 'views/stocks/inc/nav-tab.php';
                        ?>
                        <!-- Tab panes -->
                        <div class="tab-content pt-0 text-muted">
                            <div class="tab-pane active selling-tab" id="stock" role="tabpanel">
                                <div class="card">
                                    <div class="card-body">
                                        <?php

                                        $action = app_url('stock/create');
                                        if (isset($id) && $id > 0) {
                                            $action = app_url('stock/edit/');
                                        }
                                        ?>
                                        <form class="tablelist-form mt-1" autocomplete="off" id="stockForm" method="post" action="<?= $action ?>">
                                            <input type="hidden" id="edit_id" name="edit_id" value="<?= $id ?? null ?>" />
                                            <div class="row gy-2">
                                                <div class="col-lg-4">
                                                    <label for="basiInput" class="form-label">Part Or Equipment</label>
                                                    <div class="">
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="type" id="inlineRadio1" value="part" checked>
                                                            <label class="form-check-label" for="inlineRadio1">Part</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="type" id="inlineRadio2" value="equipment">
                                                            <label class="form-check-label" for="inlineRadio2">Equipment</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-2">
                                                    <div>
                                                        <label for="labelInput" class="form-label">Name <span class="text-danger">*</span></label>
                                                        <input type="text" class="form-control" id="name" name="name">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-2">
                                                    <div>
                                                        <label for="labelInput" class="form-label">Stock Code <span class="text-danger">*</span></label>
                                                        <input type="text" class="form-control" id="stock_code" name="stock_code">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-2">
                                                    <div class="input-light">
                                                        <label class="form-label">Category <span class="text-danger">*</span></label>
                                                        <div class="d-flex error-div">
                                                            <select class="form-control" id="category_id" name="category_id">
                                                                <option value="" selected>Select</option>
                                                            </select>

                                                            <button type="button" class="btn btn-success ms-1 popup-form-button-master popup-add-btn" data-heading="Add New Category" data-after-load-func="create_master_form" data-element="category_id" data-form-url="<?= base_url('system/master-record/create/STOCK_CATEGORY') ?>"><i class="ri-add-line align-bottom"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-2">
                                                    <div class="input-light">
                                                        <label class="form-label">Make <span class="text-danger">*</span></label>
                                                        <div class="d-flex error-div">
                                                            <select class="form-control" id="manufacturer_id" name="manufacturer_id">
                                                                <option value="" selected>Select</option>
                                                            </select>

                                                            <button type="button" class="btn btn-success ms-1 popup-form-button-master popup-add-btn" data-heading="Add New Manufacturer" data-after-load-func="create_master_form" data-element="manufacturer_id" data-form-url="<?= base_url('system/master-record/create/ASSET_MAKE') ?>"><i class="ri-add-line align-bottom"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--end col-->
                                                <div class="col-xxl-4 col-md-2">
                                                    <div class="input-light">
                                                        <label class="form-label">Model <span class="text-danger">*</span></label>
                                                        <div class="d-flex error-div">
                                                            <select class="form-control" id="model_id" name="model_id">
                                                                <option value="" selected>Select</option>
                                                            </select>

                                                            <button type="button" class="btn btn-success ms-1 popup-form-button-master popup-add-btn" data-heading="Add New Model" data-after-load-func="create_master_form" data-element="model_id" data-form-url="<?= base_url('system/master-record/create/ASSET_MODELS') ?>"><i class="ri-add-line align-bottom"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--end col-->
                                                <div class="col-xxl-4 col-md-2">
                                                    <div>
                                                        <label for="labelInput" class="form-label">Manuf. Part No. <span class="text-danger">*</span></label>
                                                        <input type="text" class="form-control" id="manuf_part_no" name="manuf_part_no">
                                                    </div>
                                                </div>
                                                <!--end col-->
                                                <div class="col-xxl-4 col-md-2">
                                                    <div>
                                                        <label for="labelInput" class="form-label">AJS Part No. </label>
                                                        <input type="text" class="form-control" id="ajs_part_no" name="ajs_part_no">
                                                    </div>
                                                </div>
                                                <!--end col-->
                                                <div class="col-xxl-4 col-md-2">
                                                    <div>
                                                        <label for="labelInput" class="form-label">Short Description</label>
                                                        <input type="text" class="form-control" id="short_description" name="short_description">
                                                    </div>
                                                </div>
                                                <!--end col-->
                                                <div class="col-xxl-12 col-md-2">
                                                    <div>
                                                        <label for="labelInput" class="form-label">Long Description</label>
                                                        <input type="text" class="form-control" id="long_description" name="long_description">
                                                    </div>
                                                </div>
                                                <!--end col-->
                                                <div class="col-xxl-4 col-md-2">
                                                    <div>
                                                        <label for="labelInput" class="form-label">Price Per Unit</label>
                                                        <div class="input-group mb-3">
                                                            <span class="input-group-text">£</span>
                                                            <input type="number" class="form-control" id="price_per_unit" name="price_per_unit">
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--end col-->
                                                <div class="col-xxl-4 col-md-2">
                                                    <div>
                                                        <label for="labelInput" class="form-label">Sell Per Unit</label>
                                                        <div class="input-group mb-3">
                                                            <span class="input-group-text">£</span>
                                                            <input type="number" class="form-control" id="sell_per_unit" name="sell_per_unit">
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--end col-->
                                                <div class="col-xxl-4 col-md-2">
                                                    <div class="input-light">
                                                        <label class="form-label">Unit <span class="text-danger">*</span></label>
                                                        <div class="d-flex error-div">
                                                            <select class="form-control" id="unit" name="unit">
                                                                <option value="" selected>Select</option>
                                                            </select>

                                                            <button type="button" class="btn btn-success ms-1 popup-form-button-master popup-add-btn" data-heading="Add New Unit" data-after-load-func="create_master_form" data-element="unit" data-form-url="<?= base_url('system/master-record/create/STOCK_UNITS') ?>"><i class="ri-add-line align-bottom"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--end col-->
                                                <div class="col-xxl-4 col-md-2">
                                                    <div class="input-light">
                                                        <label class="form-label">Warranty Period</label>
                                                        <div class="d-flex error-div">
                                                            <select class="form-control" id="warranty_period_id" name="warranty_period_id">
                                                                <option value="" selected>Select</option>
                                                            </select>

                                                            <button type="button" class="btn btn-success ms-1 popup-form-button-master popup-add-btn" data-heading="Add New Warranty Period" data-after-load-func="create_master_form" data-element="warranty_period_id" data-form-url="<?= base_url('system/master-record/create/WARRANTY_PERIODS') ?>"><i class="ri-add-line align-bottom"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-2">
                                                    <div class="input-light">
                                                        <label class="form-label">Shelf Life</label>
                                                        <div class="d-flex error-div">
                                                            <select class="form-control" id="shelf_life_id" name="shelf_life_id">
                                                                <option value="" selected>Select</option>
                                                            </select>

                                                            <button type="button" class="btn btn-success ms-1 popup-form-button-master popup-add-btn" data-heading="Add New Shelf Life" data-after-load-func="create_master_form" data-element="shelf_life_id" data-form-url="<?= base_url('system/master-record/create/SHELF_LIFES') ?>"><i class="ri-add-line align-bottom"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-2">
                                                    <div>
                                                        <label for="labelInput" class="form-label">Minimum threshold for Van</label>
                                                        <div class="input-group">
                                                            <input type="number" class="form-control number-only" id="minimum_threshold_van" name="minimum_threshold_van">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-2">
                                                    <div>
                                                        <label for="labelInput" class="form-label">Minimum threshold for Warehouse</label>
                                                        <div class="input-group">
                                                            <input type="number" class="form-control number-only" id="minimum_threshold_warehouse" name="minimum_threshold_warehouse">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-8">
                                                    <div>
                                                        <label for="labelInput" class="form-label">Other Info</label>
                                                        <input type="text" class="form-control" id="other_info" name="other_info">
                                                    </div>
                                                </div>
                                                <!--end col-->
                                            </div>

                                            <div class="col-xxl-12 col-sm-12 text-end mt-4">
                                                <button type="submit" class="btn btn-success add-btn">Save</button>
                                            </div>
                                        </form>
                                    </div>
                                    <!--end card-body-->
                                </div>
                                <!--end card-->
                            </div>
                            <!--end tab-pane-->
                        </div>
                        <!--end tab-content-->
                    </div>
                </div>
                <!--end col-->
            </div>
            <!--end row-->
        </div>
        <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
</div>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/stocks/stock.js') ?>"></script>