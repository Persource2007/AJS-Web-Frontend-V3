<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
<style>
    /*  .dt-buttons .buttons-excel{
         display:block;
     } */
</style>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <?php
                include_once APPPATH . 'views/commons/breadcrumb.php';
            ?>                   
            <div class="row">
                <div class="col-lg-12">
                    <div>
                        <!--  <div class="row">
                            <div class="col-12">
                                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 class="mb-sm-0">
                                        User activity log&nbsp;&nbsp;&nbsp;
                                    </h4>        
                                    <div class="page-title-right">
                                        <ol class="breadcrumb m-0">
                                            <li class="breadcrumb-item"><a href="javascript: void(0);">Resources Set up</a></li>
                                            <li class="breadcrumb-item active">User activity log</li>
                                        </ol>
                                    </div>        
                                </div>        
                            </div>
                        </div>  --> 
                        <div class="same-page-height dataTables-height selling-tab" id="role-mahagement" role="tabpanel">
                            <div class="card" id="tasksList">
                                <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3 job-setting-btn">
                                    <form id="form_filters" action="" method="GET">
                                        <div class="btn-group" style="width: 220px;">
                                            <div class="search-box" style="width: 100%;">
                                                <input type="text" class="form-control search" name="search_term" id="search_term" placeholder="Search by ID / log type / user">
                                                <i class="mdi mdi-magnify search-widget-icon"></i>
                                            </div>
                                        </div>
                                        <div class="btn-group ms-1" style="width: 200px;">
                                            <div class="input-light" style="width: 100%;">
                                                <input type="text" class="form-control" placeholder="MM/DD/YYYY - MM/DD/YYYY" data-provider="flatpickr" data-date-format="m/d/Y" data-range-date="true" name="date_range" id="from_to_dates">
                                            </div>
                                        </div>
                                        <div class="btn-group ms-1" style="width: 150px;">
                                            <div class="input-light" style="width: 100%;">
                                                <select class="form-control search bg-light border-light" name="user_type_filter" id="user_type_filter">
                                                    <option value="">User Type</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="btn-group ms-1" style="width: 180px;">
                                            <div class="input-light" style="width: 100%;">
                                                <select class="form-control" name="user_filter" id="user_filter">
                                                    <option value="">Select User</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="btn-group ms-1" style="width: 150px;">
                                            <div class="input-light" style="width: 100%;">
                                                <select class="form-control search bg-light border-light" name="platform_filter" id="platform_filter">
                                                    <option value="">Platform</option>
                                                    <option value="web">Web</option>
                                                    <option value="android">Android</option>
                                                    <option value="ios">iOS</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="btn-group ms-1" style="width: 150px;">
                                            <div class="input-light" style="width: 100%;">
                                                <select class="form-control search bg-light border-light" name="status_filter" id="status_filter">
                                                    <option value="">Result</option>
                                                    <option value="error">Error</option>
                                                    <option value="success">Success</option>
                                                    <option value="mobile">Mobile Errors</option>
                                                </select>
                                            </div>
                                        </div>
                                        <!-- Not #search_grid / #clear_grid: datatable-defaults.js binds #search_grid
                                             globally to get_search_filter_data(), which would fire a second request
                                             with its own filter naming on top of this page's get_log_data(). -->
                                        <div class="btn-group ms-1">
                                            <button type="button" class="btn btn-primary waves-effect waves-light" id="log_search_btn" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
                                        </div>
                                        <div class="btn-group ms-1">
                                            <button type="button" class="btn btn-light waves-effect" id="log_clear_btn" style="padding: 1px 12px;"><i class="ri-refresh-line align-bottom fs-16"></i></button>
                                        </div>
                                    </form>
                                </div> 
                                <div class="card-body pt-0 all-tbl-same-width1" style="padding-top: 10px !important;">
                                    <div class="table-responsive table-card- mb-0">
                                        <table class="table align-middle table-nowrap mb-0 display job-listing-table table-hover task-pending-main" id="ajax-datatables">
                                            <thead class="table-light text-muted">
                                                <tr>
                                                    <th></th>
                                                    <th>ID</th>
                                                    <th>User</th>
                                                    <th data-sort="user-type">User Type</th>
                                                    <th data-sort="log-type">Log Type</th>
                                                    <th data-sort="platform">Platform</th>
                                                    <th data-sort="result">Result</th>
                                                    <th data-sort="date-time">Date / Time</th>
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
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/systems/activity-logs.js') ?>"></script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/app/jquery.beautify-json.js'); ?>"></script>
