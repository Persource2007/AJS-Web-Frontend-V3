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
                    <div class="card same-page-height">
                        <div class="card-body">
                            <div class="text-muted">
                                <div class="row align-items-end card-header border border-dashed border-top-0 border-end-0 border-start-0 p-3 pt-0 ps-0 pe-0">
                                    <div class="col-xxl-6 col-md-6">
                                        <h6 class="mb-0 fw-semibold">PO Number: <span id="detail_po_number">-</span></h6>
                                    </div>
                                    <div class="col-xxl-6 col-md-6 text-end">
                                        <a href="<?= base_url('purchase-order/list') ?>" >
                                            <button type="button" class="btn btn-info">
                                                <i class="ri-arrow-left-line fs-14"></i> Back
                                            </button>
                                            <!-- <button type="submit" class="btn btn-primary" id="add-btn"><i class="ri-printer-line align-bottom me-1"></i> Print</button> -->
                                        </a>
                                    </div>
                                </div>
                                <div class="pt-3">
                                    <div class="row gy-3">
                                        <div class="col-lg-2 col-sm-6">
                                            <div>
                                                <p class="mb-2 fw-medium fs-13">Supplier:</p>
                                                <h5 class="fs-15 mb-0" id="detail_supplier_name">-</h5>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-sm-6">
                                            <div>
                                                <p class="mb-2 fw-medium fs-13">Job Number:</p>
                                                <h5 class="fs-15 mb-0" id="detail_job_number">-</h5>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-sm-6">
                                            <div>
                                                <p class="mb-2 fw-medium fs-13">Est. Delivery Date:</p>
                                                <h5 class="fs-15 mb-0" id="detail_est_delivery_date">-</h5>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-sm-6">
                                            <div>
                                                <p class="mb-2 fw-medium fs-13">Delivered Date:</p>
                                                <h5 class="fs-15 mb-0" id="detail_delivery_date">-</h5>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-sm-6">
                                            <div>
                                                <p class="mb-2 fw-medium fs-13">Delivered Status:</p>
                                                <h5 class="fs-15 mb-0 text-capitalize" id="detail_delivery_status">-</h5>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-sm-6">
                                            <div>
                                                <p class="mb-2 fw-medium fs-13">Invoice Status:</p>
                                                <h5 class="fs-15 mb-0 text-capitalize" id="detail_invoice_status">-</h5>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-sm-6">
                                            <div>
                                                <p class="mb-2 fw-medium fs-13">Delivery Slip</p>
                                                <h5 class="fs-15 mb-0" id="detail_delivery_slip_url">-</h5>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-sm-6">
                                            <div>
                                                <p class="mb-2 fw-medium fs-13">Discount</p>
                                                <h5 class="fs-15 mb-0"><span id="detail_discount">0</span>%</h5>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-sm-6">
                                            <div>
                                                <p class="mb-2 fw-medium fs-13">Tax</p>
                                                <h5 class="fs-15 mb-0"><span id="detail_tax">0</span>%</h5>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-sm-6">
                                            <div>
                                                <p class="mb-2 fw-medium fs-13">Delivery Address</p>
                                                <h5 class="fs-15 mb-0" id="detail_delivery_address"></h5>
                                            </div>
                                        </div>
                                    </div>

                                    <h5 class="mt-4 mb-2 pt-4 border-top border-top-dashed mt-3" style="border-color: #c7c7c7 !important;">Stock Ordered</h5>
                                    <div class="table-responsive">
                                        <table class="table table-borderless align-middle mb-0">
                                            <thead class="table-light">
                                                <tr>
                                                    <th scope="col">Sr.</th>
                                                    <th>Manuf. Part No.</th>
                                                    <th>Name</th>
                                                    <th>Type</th>
                                                    <th class="text-center">Price</th>
                                                    <th class="text-center">Quantity</th>
                                                    <th class="text-center">Short Shipment</th>
                                                    <th class="text-center">Damaged Quantity</th>
                                                    <th class="text-center">Inward Quantity</th>
                                                    <th style="width:320px">Comments</th>
                                                    <th>Image of Damaged Goods</th>
                                                </tr>
                                            </thead>
                                            <tbody id="item-details">
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--end card-->
                </div>
            </div>
        </div>
        <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
</div>
<input type="hidden" id="purchase_order_id" value="<?= $id ?? null; ?>">
<input type="hidden" id="is_detail_page" value="1">
<!-- End Page-content -->
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/stocks/purchase-order.js') ?>"></script>