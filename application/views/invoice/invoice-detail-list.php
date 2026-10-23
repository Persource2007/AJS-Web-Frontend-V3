<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap5.min.css" />
<!--datatable responsive css-->
<link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.9/css/responsive.bootstrap.min.css" />

<link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.2.2/css/buttons.dataTables.min.css">
<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
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
                    <div>
                        <div class="tab-content- pt-0 text-muted">
                            <div class="same-page-height dataTables-height">
                                <div class="card same-page-height-"  id="">                                    
                                    <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3 job-setting-btn"> 
                                        <?php require_once APPPATH . 'views/invoice/inc/invoice-detail-filters.php'; ?>
                                    </div>
                                    <div class="card-body pt-0 same-position-btn- all-tbl-same-width-worksheet check-input-check-right" style="padding-top: 10px !important;"> 
                                        
                                        <div class="">
                                            <div class="table-responsive">
                                                <table class="table align-middle table-nowrap mb-0 display invoice-detail-listing-table table-hover" id="invoice-detail-list-datatables" style=" ">
                                                    <thead class="table-light text-muted">
                                                        <tr>                                                            
                                                            <th></th>
                                                            <th>Job Id.</th>
                                                            <th>Job</th>
                                                            <th>Client</th>
                                                            <th>Property</th>
                                                            <th>Contract</th>
                                                            <th>Address</th>
                                                            <th>Postcode</th>
                                                            <th>Target</th>
                                                            <th>Completed Date</th>
                                                            <th class="text-end">Material</th>
                                                            <th class="text-end">Labor</th>
                                                            <th class="text-end">Sell</th>
                                                            <th class="text-end">Qty</th>
                                                            <th class="text-end">Amount</th>
                                                            <th class="text-end">VAT</th>
                                                            <th class="text-end">Total</th>
                                                        </tr>
                                                    </thead>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div><script>
    const invoiceId = "<?php echo $id; ?>";
</script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/invoice/invoice-detail.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>