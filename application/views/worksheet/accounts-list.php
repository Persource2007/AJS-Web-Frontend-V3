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
                                        <div class="">
                                        <!-- filter -->
                                            <form id="form_filters" class="card-body tablelist-form p-0 ps-0 pe-0" action="" method="GET">
                                                <div class="d-flex justify-content-between">
                                                    <div>
                                                        <div class="btn-group">
                                                            <div class="search-box" style="width: 250px;">
                                                                <select class="form-control search" name="engineer_filter" id="engineer_filter">
                                                                    <option value="">Select Engineer</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="btn-group ms-1">
                                                            <div class="search-box" style="width: 250px;">
                                                                <select class="form-control search" name="type_filter" id="type_filter" data-choices>
                                                                    <option value="">Select Status</option>
                                                                    <option value="approved">Approved</option>
                                                                    <option value="ready_to_pay">Clear To Pay</option>
                                                                    <option value="paid">Paid</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="btn-group ms-1">
                                                            <div class="search-box" style="width: 250px;">
                                                                <input type="date" id="requestbw_filter" name="requestbw_filter" class="form-control search" placeholder="Search">
                                                                <i class="mdi mdi-magnify search-widget-icon"></i>
                                                            </div>
                                                        </div>
                                                        <div class="btn-group ms-1">
                                                            <button class="btn btn-primary waves-effect waves-light" id="search_grid" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
                                                        </div>
                                                    </div>
                                                    <!-- <div>
                                                        <button href="javascript:void(0);" class="btn btn-success action-paid">Paid</button>
                                                    </div> -->
                                                </div>
                                            </form>
                                            <!-- filter -->
                                        </div>
                                    </div>
                                    <div class="card-body pt-0 same-position-btn-" style="padding-top: 10px !important;">                                       
                                        <div class="all-tbl-same-width1">
                                            <div class="table-responsive"> 
                                                <table class="table align-middle table-nowrap mb-0 display job-listing-table table-hover" id="accounts-list-datatables" style="">
                                                    <thead class="table-light text-muted">
                                                        <tr>
                                                            <th></th>
                                                            <!-- <th><input class="form-check-input approve-batch allselect" type="checkbox"/></th> -->
                                                            <th>Batch No.</th>
                                                            <th>Worksheet No.</th>
                                                            <th>Engineer Name</th>
                                                            <th>Approved Date</th>
                                                            <th>Time Period</th>
                                                            <th>Reference No.</th>
                                                            <th>Paid Date</th>
                                                            <th class="text-end">Claimed Amt.</th>
                                                            <th class="text-end">Approved Amt.</th>
                                                            <th>Status</th>
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
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/worksheets/accounts.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
<script src="<?= cnd_url(); ?>assets/libs/dropzone/dropzone-min.js"></script>