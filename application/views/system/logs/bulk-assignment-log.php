<?php require_once APPPATH . 'views/commons/datatables-inc.php'; ?> 
<style>
    /* .dt-buttons .buttons-excel{
        display:block;
    } */
</style>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <?php include_once APPPATH . 'views/commons/breadcrumb.php'; ?>  
            <div class="row">
                <div class="col-lg-12">
                    <div class="same-page-height dataTables-height selling-tab">                          
                        <div class="card" id="tasksList">
                            <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3 job-setting-btn">
                                <div class="page-title-box-">
                                    <div class="row ">
                                        <div class="col-xxl-1 col-sm-2">
                                            <div class="input-light">
                                                <select class="form-control search" name="table_length" id="table_length">
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50" selected="">50</option>
                                                    <option value="100">100</option>
                                                    <option value="250">250</option>
                                                    <option value="500">500</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-xxl-1 col-sm-2">

                                            <div class="input-light">
                                                <select onchange="return get_log_data()" class="form-control" name="month" id="month">
                                                    <?php
                                                    for ($i = 1; $i <= 12; $i++)
                                                    {
                                                        $month_name = date('F', mktime(0, 0, 0, $i, 10));
                                                        $sel        = '';
                                                        if ($month_name == date('F'))
                                                        {
                                                            $sel = 'selected';
                                                        }
                                                        echo '<option ' . $sel . ' value="' . $month_name . '">' . $month_name . '</option>';
                                                    }
                                                    ?>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-xxl-1 col-sm-2">
                                            <div class="input-light">
                                                <select onchange="return get_log_data()"  class="form-control" name="year" id="year">
                                                    <?php
                                                    for ($i = START_YEAR; $i <= date('Y'); $i++)
                                                    {
                                                        if ($i == date('Y'))
                                                        {
                                                            $sel = 'selected';
                                                        }
                                                        echo '<option ' . $sel . ' value="' . $i . '">' . $i . '</option>';
                                                    }
                                                    ?>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-xxl-2 col-sm-4">
                                            <div class="input-light">
                                                <select onchange="return get_log_data()" class="form-control search bg-light border-light" name="user_type_filter" id="user_type_filter">
                                                    <option value="">User Type</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-xxl-2 col-sm-4">
                                            <div class="input-light">
                                                <select onchange="return get_log_data()"  class="form-control" name="user_filter" id="user_filter">
                                                    <option value="">Select User</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-xxl-1 col-sm-2">
                                            <div class="log-buttons export-btn">

                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </div> 
                            <div class="card-body pt-0 all-tbl-same-width1 user-active-log " style="padding-top: 10px !important;"> 
                                <div class="table-responsive table-card-">
                                    <table class="table align-middle table-nowrap mb-0 display job-listing-table table-hover task-pending-main" id="ajax-datatables">
                                        <thead class="table-light text-muted">
                                            <tr>
                                                <th></th>
                                                <th >Id</th>
                                                <th data-sort="username">Username</th>
                                                <th data-sort="user-type">User Type</th>
                                                <th data-sort="log-type">Log Type</th>
                                                <th data-sort="date-time">Date / Time</th>
                                                <th data-sort="log_data">Log Data</th>
                                                <th data-sort="return_data">Return Data</th>
                                                <th data-sort="headers">Headers</th>
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

    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/systems/bulk-assignment-logs.js') ?>"></script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
