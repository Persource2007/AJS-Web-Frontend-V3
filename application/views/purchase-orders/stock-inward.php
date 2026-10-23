<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
                require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->
            <div class="row">
                <div class="col-lg-12">
                    <?php

                    $action = app_url('purchase-order/stock-inward');
                    if (isset($edit) && $edit && isset($id) && $id > 0) {
                        $action = app_url('purchase-order/stock-inward');
                    }
                    ?>
                    <form class="tablelist-form pb-4" action="<?= $action ?>" method="post" id="purchase-orderForm" autocomplete="off">
                        <input type="hidden" value="<?= $id ?? null ?>" id="edit_id" name="edit_id" />
                        <div class="tab-content pt-4 text-muted">
                            <div class="tab-pane active" role="tabpanel">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row gy-2">
                                            <div class="row gy-2">
                                                <div class="col-xxl-3 col-md-6">
                                                    <div class="input-light">
                                                        <label class="form-label">PO Number</label>
                                                        <input type="text" class="form-control" id="po_number" readonly>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-3 col-md-6">
                                                    <div>
                                                        <label for="supplier_id" class="form-label">Supplier </label>
                                                        <div class="input-light">
                                                            <select class="form-control select2" name="supplier_id" id="supplier_id">
                                                                <option value="" selected>Select</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-3 col-md-6">
                                                    <div class="input-light">
                                                        <label class="form-label">Delivery Date <span class="text-danger">*</span></label>
                                                        <input type="date" class="form-control" id="delivery_date" name="delivery_date" max="<?= date('Y-m-d'); ?>">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-3 col-md-4">
                                                    <label for="labelInput" class="form-label">Delivery Slip</label>
                                                    <div class="hstack gap-2">
                                                        <div class="input-group custom-file-button">
                                                            <input type="hidden" name="delivery_slip" id="delivery_slip">
                                                            <input type="file" class="form-control" data-name="delivery_slip" id="delivery_slip_file">
                                                            <label class="input-group-text" for="delivery_slip_file">Browse</label>
                                                        </div>
                                                        <div id="slip-prev">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-3 col-sm-4">
                                                    <label  class="form-label">Delivery Status <span class="text-danger">*</span></label>
                                                    <div class="input-light">
                                                        <select class="form-control basic-select2" name="delivery_status" id="delivery_status" data-choices-search-false>
                                                            <option value="pending">Pending</option>
                                                            <option value="delivered">Delivered</option>
                                                            <option value="short_shipment">Short Shipment</option>
                                                            <option value="damaged">Damaged</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-3 col-sm-4">
                                                    <label  class="form-label">Invoice Status <span class="text-danger">*</span></label>
                                                    <div class="input-light">
                                                        <select class="form-control basic-select2" name="invoice_status" id="invoice_status"  data-choices-search-false>
                                                            <option value="unpaid">Unpaid</option>
                                                            <option value="paid">Paid</option>
                                                            <option value="partial">Partial</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div class="col-xxl-6 col-md-12">
                                                    <label class="form-label">Description</label>
                                                    <textarea class="form-control" name="description" id="description"></textarea>
                                                </div>
                                                <div class="col-xxl-3 col-md-6 hide inward-section">
                                                    <label class="form-label mb-3">Inward To</label>
                                                    <div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input inward-to" id="inward_to_warehouse" type="radio" name="inward_to" value="warehouse" >
                                                            <label class="form-check-label" for="inward_to_warehouse">Warehouse</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input inward-to" id="inward_to_van" type="radio" name="inward_to" value="van">
                                                            <label class="form-check-label" for="inward_to_van">Van</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-3 col-md-6 hide" id="warehouse-field">
                                                    <div>
                                                        <label for="labelInput" class="form-label">Warehouse</label>
                                                        <div class="input-light">
                                                            <select class="form-control select2" name="inward_warehouse_id" id="inward_warehouse_id" required>
                                                                <option value="" selected>Select</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-3 col-md-6 hide" id="van-field">
                                                    <div>
                                                        <label for="labelInput" class="form-label">Van</label>
                                                        <div class="input-light">
                                                            <select class="form-control select2" name="inward_van_id" id="inward_van_id" required>
                                                                <option value="" selected>Select</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="stock-section">
                                                    <h5 class="mb-0 mt-4 d-flex">Stock Items</h5>
                                                </div>
                                                <div class="col-xxl-12 col-md-12  stock-section">
                                                    <div class="mb-4">
                                                        <table class="display table dt-responsive align-middle table-nowrap mb-0">
                                                            <thead class="table-light text-muted">
                                                                <tr>
                                                                    <th></th>
                                                                    <th>Manuf. Part No.</th>
                                                                    <th>Name</th>
                                                                    <th>Type</th>
                                                                    <th>Price</th>
                                                                    <th>Quantity</th>
                                                                    <th>Stock Inward</th>
                                                                    <th>Short Shipment</th>
                                                                    <th>Damaged Quantity</th>
                                                                    <th style="width:320px">Comments</th>
                                                                    <th>Image of Damaged Goods</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id="table-items">
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-sm-12 text-end mt-4">
                                                <button type="submit" class="btn btn-success" id="add-btn">Save</button>
                                                <!-- <button type="button" class="btn btn-danger" id="close-modal" data-bs-dismiss="offcanvas">Close</button> -->
                                            </div>
                                        </div>
                                        <!--end row-->
                                    </div>
                                </div>
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
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/stocks/stock-inward.js') ?>"></script>