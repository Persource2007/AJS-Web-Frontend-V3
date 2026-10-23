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
                                <div class="card" id="tasksList">
                                    <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3">
                                        <div class="row">
                                            <div class="col-md-10">
                                                <form id="form_filters" class="card-body tablelist-form p-0 ps-0 pe-0" action="" method="GET">
                                                    <div class="d-flex justify-content-between">
                                                        <div>
                                                            <div class="btn-group">
                                                                <div class="search-box" style="width: 300px;">
                                                                    <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Search by Invoice No, Batch No">
                                                                    <i class="mdi mdi-magnify search-widget-icon"></i>
                                                                </div>
                                                            </div>
                                                            <div class="btn-group">
                                                                <div class="search-box" style="width: 150px;">
                                                                    <select class="form-control search" data-is-autocomplete="1" name="invoices.client_id_filter" id="client_id_filter">
                                                                        <option value="">Select Clients</option>
                                                                    </select>
                                                                </div>
                                                            </div>                                                           
                                                            <div class="btn-group">
                                                                <div class="search-box" style="width: 160px;">
                                                                    <!-- Only the statuses this list can return. APP Buildup and Ready To Go
                                                                         are batches still being assembled and never appear here; Cancelled
                                                                         only shows with "Show All Data" ticked. -->
                                                                    <select class="form-control search" name="financial_status_filter" id="financial_status_filter">
                                                                        <option value="">All Status</option>
                                                                        <option value="2">Invoiced</option>
                                                                        <option value="3">APP Submitted</option>
                                                                        <option value="6">Cancelled</option>
                                                                    </select>
                                                                </div>
                                                            </div> 
                                                            <div class="btn-group ms-2">
                                                                <div class="form-check d-flex align-items-center" style="gap: 6px;">
                                                                    <input type="checkbox" id="show_all_filter" name="show_all_filter" class="form-check-input" style="transform: scale(1.4); margin-top: 0;">
                                                                    <label for="show_all_checkbox" class="form-check-label" style="margin: 0; font-weight: 500;">Show All Data</label>
                                                                </div>
                                                            </div>                                               
                                                            <div class="btn-group ms-1">
                                                                <button class="btn btn-primary waves-effect waves-light" id="search_grid" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
                                                            </div>
                                                        </div>                                                        
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="col-md-2">
                                                <div class="d-flex justify-content-end">
                                                    <?php /* Create Invoice Batch hidden — batches are now built from the Job Process flow.
                                                    <div class="btn-group ms-1">
                                                        <div>
                                                            <a href="<?= base_url('invoice/readyto-invoices-list'); ?>" class="btn btn-primary">Create Invoice Batch</a>
                                                        </div>
                                                    </div>
                                                    */ ?>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div class="card-body pt-0 same-position-btn-" style="padding-top: 10px !important;">                                       
                                        <div class="all-tbl-same-width1">
                                            <div class="table-responsive"> 
                                                <table class="table align-middle table-nowrap mb-0 display job-listing-table table-hover" id="invoices-list-datatables" style="">
                                                    <thead class="table-light text-muted">
                                                        <tr>
                                                            <th></th>
                                                            <th>Batch No.</th>
                                                            <th>Invoice No.</th>
                                                            <th>Client</th>
                                                            <th>Contract</th>
                                                            <th>No of Jobs</th>
                                                            <th>Ref No#</th>
                                                            <th>Invoice Date</th>
                                                            <th>Added Date</th>                                                            
                                                            <th>Status</th>                                                            
                                                            <th>Action</th>
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
</div>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/invoice/invoice.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
<script src="<?= cnd_url(); ?>assets/libs/dropzone/dropzone-min.js"></script>