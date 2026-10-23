<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            $sub_title = 'Create Purchase Order';
            include_once APPPATH . 'views/purchase-orders/inc/breadcrumb.php';
            ?>
            <!-- end page title -->
            <div class="row">
                <div class="col-lg-12">
                    <?php

                    $action = app_url('purchase-order/create');
                    if (isset($edit) && $edit && isset($id) && $id > 0) {
                        $action = app_url('purchase-order/edit/');
                    }
                    ?>
                    <form class="tablelist-form pb-4" action="<?= $action ?>" method="post" id="purchase-orderForm" autocomplete="off">
                        <input type="hidden" value="<?= $id ?? null ?>" id="edit_id" name="edit_id" />
                        <input type="hidden" value="" id="supplier_def_filter"  />
                        <div class="p-0 overflow-hidden">
                            <div data-simplebar style="height: calc(100vh - 112px);">
                                <div class="acitivity-timeline p-4">
                                    <div class="modal-body">
                                        <div class="row gy-2">
                                            <div class="row gy-2">
                                                <div class="col-xxl-4 col-md-6">
                                                    <div>
                                                        <label for="supplier_id" class="form-label">Supplier <span class="text-danger">*</span></label>
                                                        <div class="input-light">
                                                            <select class="form-control select2" name="supplier_id" id="supplier_id">
                                                                <option value="" selected>Select</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-6">
                                                    <div>
                                                        <label for="job_id" class="form-label">Job Number <span class="text-danger">*</span></label>
                                                        <div class="input-light">
                                                            <select class="form-control select2" name="job_id" id="job_id">
                                                                <option value="" selected>Select</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-6">
                                                    <div class="input-light">
                                                        <label class="form-label">Est. Delivery Date</label>
                                                        <input type="date" class="form-control" id="est_delivery_date" name="est_delivery_date">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-6">
                                                    <div>
                                                        <label class="form-label">Discount</label>
                                                        <input type="number" class="form-control" name="discount" id="discount" onKeyPress="if(this.value.length==2) return false;">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-8 col-md-12">
                                                    <label class="form-label mb-1">Delivery Type</label>
                                                    <div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input delivery-type" id="delivery_type_warehouse" type="radio" name="delivery_type" value="warehouse" checked>
                                                            <label class="form-check-label" for="delivery_type_warehouse">At Warehouse</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input delivery-type" id="delivery_type_engineer" type="radio" name="delivery_type" value="engineer">
                                                            <label class="form-check-label" for="delivery_type_engineer">Collect By Engineer</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input delivery-type" id="delivery_type_custom_address" type="radio" name="delivery_type" value="custom_address">
                                                            <label class="form-check-label" for="delivery_type_custom_address">Custom Delivery Address</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-6" id="warehouse-field">
                                                    <div>
                                                        <label for="labelInput" class="form-label">Warehouse <span class="text-danger">*</span></label>
                                                        <div class="input-light">
                                                            <select class="form-control select2" name="warehouse_id" id="warehouse_id" required>
                                                                <option value="" selected>Select</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-6 hide" id="engineer-field">
                                                    <div>
                                                        <label for="labelInput" class="form-label">Engineer <span class="text-danger">*</span></label>
                                                        <div class="input-light">
                                                            <select class="form-control select2" name="engineer_id" id="engineer_id" required>
                                                                <option value="" selected>Select</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-12 col-md-12 hide" id="custom-addr-field">
                                                    <div class="row gy-2">
                                                        <div class="col-xxl-4 col-md-6">
                                                            <div>
                                                                <label for="address1" class="form-label">Street Address 1 <span class="text-danger">*</span></label>
                                                                <input type="text" class="form-control" id="address1" name="address1" required>
                                                            </div>
                                                        </div>
                                                        <div class="col-xxl-4 col-md-6">
                                                            <div>
                                                                <label for="address2" class="form-label">Street Address 2 </label>
                                                                <input type="text" class="form-control" id="address2" name="address2">
                                                            </div>
                                                        </div>
                                                        <div class="col-xxl-4 col-md-6">
                                                            <div>
                                                                <label for="area" class="form-label">Area <span class="text-danger">*</span></label>
                                                                <input type="text" class="form-control" id="area" name="area" required>
                                                            </div>
                                                        </div>
                                                        <div class="col-xxl-4 col-md-6">
                                                            <div>
                                                                <label for="postcode" class="form-label">Postcode <span class="text-danger">*</span></label>
                                                                <input type="text" class="form-control postalcode-mask" id="postcode" name="postcode" required>
                                                            </div>
                                                        </div>
                                                        <div class="col-xxl-4 col-md-6">
                                                            <div>
                                                                <label for="city_id" class="form-label">Town <span class="text-danger">*</span></label>
                                                                <select class="form-control select2" id="city_id" name="city_id" required>
                                                                    <option value="" selected>Select</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="hide stock-section">
                                                    <h5 class="mb-0 mt-4 d-flex">Stock Items
                                                        <button type="button" class="btn btn-success ms-auto popup-form-button-master popup-add-btn" data-heading="Add Items" data-width="680" data-after-load-func="initialize_item_table" data-form-url="<?= base_url('purchase-order/create-items/') ?>">
                                                            <i class="ri-add-line align-bottom"></i>
                                                        </button>
                                                    </h5>
                                                </div>
                                                <div class="col-xxl-12 col-md-12 hide stock-section">
                                                    <div class="mb-4">
                                                        <table class="display table dt-responsive align-middle table-nowrap mb-0">
                                                            <thead class="table-light text-muted">
                                                                <tr>
                                                                    <th>Manuf. Part No.</th>
                                                                    <th>Name</th>
                                                                    <th>Type</th>
                                                                    <th>Price Per Unit (£)</th>
                                                                    <th>Quantity</th>
                                                                    <th class="text-end"></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id="table-items" data-custom-field-fn="get_custom_fields">
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!--end row-->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="offcanvas-foorter border p-3 text-center">
                            <div class="hstack gap-2">
                                <button type="submit" class="btn btn-success" id="add-btn">Save</button>
                                <button type="button" class="btn btn-light close-offcanvas" id="close-modal">Close</button>
                                <div id="deleteBtnContainer"></div>
                                <?php if (isset($edit) && $edit && isset($id) && $id > 0) { ?>               
                                    <script>
                                        document.getElementById('deleteBtnContainer').innerHTML = delete_icon(<?= $id ?>, 'purchase-order');
                                    </script>
                                <?php }  ?>
                            </div>
                        </div>
                    </form>
                </div>
                <!--end col-->
            </div>
            <!--end row-->
        </div>
        <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
</div>
<!-- End Page-content -->
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/stocks/purchase-order.js') ?>"></script>