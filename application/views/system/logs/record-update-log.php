<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>

<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->

<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <?php include_once APPPATH . 'views/commons/breadcrumb.php'; ?>            
            <div class="row">
                <div class="col-lg-12">
                    <div class="same-page-height dataTables-height selling-tab">
                        <div class="card" id="tasksList">
                            <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3 job-setting-btn">
                                <div>
                                    <div class="row">
                                        <!-- <div class="col-12">
                                            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                                                <h4 class="mb-sm-0">
                                                    Record Update Log&nbsp;&nbsp;&nbsp;
                                                </h4>
                                                <div class="page-title-right">
                                                    <ol class="breadcrumb m-0">
                                                        <li class="breadcrumb-item"><a href="javascript: void(0);">Resources Set up</a></li>
                                                        <li class="breadcrumb-item active">Record Update Log</li>
                                                    </ol>
                                                </div>
                                            </div>
                                        </div> -->
                                        <div class="col-12 ">
                                            <div class="">
                                                <div class="row ">
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
                                                        <div class="log-buttons">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                </div>       
                            </div>
                            <div class="card-body pt-0 all-tbl-same-width1 user-active-log"  style="padding-top: 10px !important;">
                                <div class="table-responsive table-card- mb-0">
                                    <table class="table align-middle table-nowrap mb-0 display job-listing-table table-hover task-pending-main" id="ajax-datatables">
                                        <thead class="table-light text-muted">
                                            <tr>
                                                <th></th>
                                                <th>Id</th>
                                                <th>User</th>
                                                <th>Table</th>
                                                <th>Record ID</th>
                                                <th>Date / Time</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 log-detail-div" style="display: none">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title mb-0">Request</h4>
                        </div>
                        <div class="card-body">
                            <div id="users">
                                <div data-simplebar style="height: 242px;" class="mx-n3 p-3 pt-0 pb-0">
                                    <p class="text-muted log-detail-request">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title mb-0">Response</h4>
                        </div> 
                        <div class="card-body">
                            <div id="users">
                                <div data-simplebar style="height: 242px;" class="mx-n3 p-3 pt-0 pb-0">
                                    <p class="text-muted log-detail-response">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </p>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div> 
        </div> 
    </div> 

    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/systems/record-update-logs.js') ?>"></script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/app/jquery.beautify-json.js'); ?>"></script>
