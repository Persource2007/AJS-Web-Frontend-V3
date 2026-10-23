<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content dataTables-height-detiles-">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->

            <div class="same-page-height dataTables-height">
                <div>
                    <!-- Tab panes -->
                    <div class="tab-content- p-0 text-muted-">
                        <div class="tab-pane active " id="purchase-order-tab" role="tabpanel">
                            <div class="card" id="tasksList">
                                <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3">
                                    <?php
                                    require_once APPPATH . 'views/purchase-orders/inc/filters.php';
                                    ?>
                                </div>
                                <div class="card-body pt-0 purchase-setting-btn- purchase-orders-same-width" style="padding-top: 10px !important;">
                                    <div class="table-responsive">
                                        <!--end row-->
                                        <table class="display table dt-responsive align-middle table-nowrap mb-0 purchase-order-tbl-main" id="purchase-order-datatables" style="">
                                            <thead class="table-light text-muted">
                                                <tr>
                                                    <th></th>
                                                    <th>Id</th>
                                                    <th>PO Number</th>
                                                    <th>Job Number</th>
                                                    <th>Supplier</th>
                                                    <th>Ordered Date</th>
                                                    <th>Delivery Date</th>
                                                    <th>Est. Delivery Date</th>
                                                    <th>Delivery Status</th>
                                                    <th>Invoice Status</th>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </div>
                                <!--end card-body-->
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
    <!-- End Page-content -->
</div>
<!-- End Page-content -->
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/stocks/purchase-order.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/suppliers/supplier-items.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/suppliers/supplier-kit.js') ?>"></script>
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