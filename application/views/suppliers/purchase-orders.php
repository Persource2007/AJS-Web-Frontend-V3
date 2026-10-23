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
                        $title = "Purchase Orders";
                        require_once APPPATH . 'views/suppliers/inc/nav-tab.php';
                        ?>
                        <!-- Tab panes -->

                        <div class="tab-content pt-0 text-muted">
                            <div class="tab-pane active " role="tabpanel">
                                <div class="card" id="tasksList">
                                    <div class="card-body card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3 mb-1">
                                        <?php
                                        require_once APPPATH . 'views/purchase-orders/inc/filters.php';
                                        ?>
                                    </div>
                                    <!--end row-->
                                    <div class="card-body purchase-setting-btn pt-0">
                                        <div class="table-responsive">
                                            <table class="display table dt-responsive align-middle table-nowrap mb-0" id="purchase-order-datatables" style="margin-top: 0px !important;">
                                                <thead class="table-light text-muted">
                                                    <tr>
                                                        <th></th>
                                                        <th>Id</th>
                                                        <th><span class="ps-3">PO Number</span></th>
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
<input type="hidden" id="supplier_id_hidden" name="supplier_id_hidden" value="<?= $id ?? null ?>" />
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/stocks/purchase-order.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
<script>
    $('button.add-btn').remove();
    $('#supplier_id_filter').parent().parent().remove();
</script>