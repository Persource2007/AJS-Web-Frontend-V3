<link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap5.min.css" />
<!--datatable responsive css-->
<link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.9/css/responsive.bootstrap.min.css" />
<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <?php
            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->

            <div class="row">
                <div class="col-lg-12">
                    <div>
                        <!-- Tab panes -->
                        <div class="tab-content- pt-0 text-muted">
                            <div class="same-page-height dataTables-height big-filter-tables" id="job-tab" role="tabpanel">
                                <div class="card " id="tasksList">
                                    <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pb-2">
                                        <?php
                                        require_once APPPATH . 'views/scheduler/inc/filter-tasks.php';
                                        ?> 
                                    </div>
                                    <div class="card-body pt-0 same-position-btn- all-tbl-same-width- check-input-check-right" style="padding-top: 10px !important;">                                       
                                        <table class="table align-middle table-nowrap mb-0 display table-hover" id="bulk-task-datatables" style=" ">
                                            <thead class="table-light text-muted">
                                                <tr>
                                                    <th>Id</th>
                                                    <th><input class="form-check-input all-select-row assign-btn allselect" type="checkbox"/></th>
                                                    <th>&nbsp; Task Id</th>
                                                    <th>Task</th>
                                                    <th>Job</th>
                                                    <th>Client</th>
                                                    <th>Property</th>
                                                    <th>Address</th>
                                                    <th>Postcode</th>
                                                    <th>Tags</th>
                                                    <th>Queue</th>
                                                    <th>Status</th>
                                                    <th>Assigned To</th>
                                                    <th>Assign Date/Time</th>
                                                    <th>Created</th>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                    <!--end card-body-->
                                </div>
                                <!--end card-->
                            </div>
                            <!--end tab-pane-->
                        </div>
                        <!--end tab-content-->
                    </div>
                </div>
                <!--end col-->
            </div>
            <!--end row-->
        </div>
        <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
    <!-- <div class="offcanvas offcanvas-end custom-offcanvas-right" tabindex="-1" id="offcanvasAssignTasks" aria-labelledby="offcanvasRightLabel" style="width: 500px !important;">
        <div class="offcanvas-header border-bottom">
            <h5 class="offcanvas-title" id="offcanvasRightLabel">Assign Tasks</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body p-4 overflow-hidden">
            <form class="tablelist-form pb-4 simplebar-form" autocomplete="off">
                <div class="p-0 overflow-hidden pb-3">
                    <div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-xxl-12 col-md-12">
                                    <div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input task-assign" id="is_assigned_0" type="radio" name="is_assigned" value="0" checked>
                                            <label class="form-check-label" for="is_assigned_0">Add task to queue</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input task-assign" id="is_assigned_1" type="radio" name="is_assigned" value="1">
                                            <label class="form-check-label" for="is_assigned_1">Assign now</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xxl-6 col-md-6 not_assign_div mt-2">
                                    <div>
                                        <label for="basiInput" class="form-label">Select Queue <span class="text-danger">*</span></label>
                                        <select class="form-control" id="queue_id" name="queue_id">
                                            <option value="">Select Queue</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xxl-6 col-md-6 assign_div row mt-2" style="display: none;">
                                    <div class="input-light multi-choice">
                                        <label class="form-label">Assign To <span class="text-danger">*</span></label>
                                        <select class="form-control" id="engineer_id" name="engineer_id">
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="offcanvas-foorter border p-3 text-center">
            <div class="hstack gap-2">
                <button type="submit" class="btn btn-success waves-effect waves-light" id="apply-filters">Assign Tasks</button>
                <button type="button" class="btn btn-light waves-effect waves-light" id="close-filters" data-bs-dismiss="offcanvas">Close</button>
                <button type="button" class="btn btn-secondary waves-effect waves-light" id="clear-filters">Reset</button>
            </div>
        </div>
    </div> -->
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/jobs/task.js') ?>"></script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/jobs/bulk-assign-tasks.js') ?>"></script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
   
    <script src="<?= cnd_url(); ?>assets/js/pages/datatables.init.js"></script> 