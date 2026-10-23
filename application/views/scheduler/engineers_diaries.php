<link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap5.min.css" />
<!--datatable responsive css-->
<link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.9/css/responsive.bootstrap.min.css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.min.css" />
<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <div>
                        <div class="same-page-height dataTables-height">
                            <div class="card" id="enggs_diary_data">
                                <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3 job-setting-btn"> 
                                    <div class="tablelist-form">
                                        <form id="form_filters" action="" method="GET">
                                            <div class="d-flex justify-content-between">
                                                <div>
                                                    <div class="btn-group">
                                                        <div class="search-box" style="width: 250px;">
                                                            <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Search By Username">
                                                            <i class="mdi mdi-magnify search-widget-icon"></i>
                                                        </div>
                                                    </div>
                                                    <div class="btn-group ms-1">
                                                        <div class="input-light" style="width: 150px;">
                                                            <select class="form-control search bg-light border-light" name="usks.skill_id_filter" id="skill_id_filter">
                                                                <option value="" selected>All Skills</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="btn-group ms-1">
                                                        <div class="input-light" style="width: 150px;">
                                                            <select class="form-control search bg-light border-light" id="srhmonth" name="srhmonth">
                                                                <option value="" disabled selected>Select Month</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="btn-group ms-1">
                                                        <button class="btn btn-primary waves-effect waves-light" id="search_grid" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>                                    
                                </div>
                                <div class="card-body user-setting-btn all-tbl-same-width3">
                                    <div class="table-responsive">
                                        <h5 id="selectdMonth"><?php echo date("F Y") ?></h5>
                                        <table id="enggs-diary-datatable" class="table align-middle table-nowrap mb-0 display job-listing-table table-hover task-pending-main">
                                            <thead class="table-light text-muted">
                                                <tr>
                                                    <th></th>
                                                    <th class="dotIcon"></th>
                                                    <th>Name</th>
                                                    <th>Tasks Assigned</th>
                                                    <th>Hours Allocated</th>
                                                    <th>Completed</th>
                                                    <th>Pending</th>
                                                    <th>Overdue (Prv. Mth.)</th>
                                                    <th style="max-width: 200px;">In Progress</th>
                                                    <th class="text-center">Message</th>
                                                    <th>Completion Status</th>
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
<input type="hidden" id="user_type" value=""/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.full.min.js"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/notifications/notification.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/scheduler/enggs_diary.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
   
<script src="<?= cnd_url(); ?>assets/js/pages/datatables.init.js"></script> 
<style>
    .dataTables-height .dataTables_scroll {
        height: calc(100vh - 326px); 
    }
</style>