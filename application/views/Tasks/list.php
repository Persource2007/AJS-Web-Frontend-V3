<link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap5.min.css" />
<!--datatable responsive css-->
<link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.9/css/responsive.bootstrap.min.css" />
<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            // $bc_title = 'Jobs';
            // include_once APPPATH . 'views/jobs/inc/breadcrumb.php';
            ?>
            <?php
            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->

            <div class="row">
                <div class="col-lg-12">
                    <div>
                        <!-- Tab panes -->
                        <div class="tab-content- pt-0 text-muted">
                            <div class="same-page-height dataTables-height selling-tab tab-pane active" id="job-tab"
                                role="tabpanel">
                                <div class="card" id="tasksList">
                                    <div
                                        class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3 job-setting-btn">
                                        <?php
                                        require_once APPPATH . 'views/tasks/inc/filters.php';
                                        ?>

                                        <!-- <div class="sub-filter-menu pb-2">
                                                <form>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input sub-filters normal-task" type="radio" name="sub_filters" id="inlineRadio8" value="all" checked>
                                                        <label class="form-check-label" for="inlineRadio8">All</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input sub-filters normal-task" type="radio" name="sub_filters" id="inlineRadio7" value="require_allocation">
                                                        <label class="form-check-label" for="inlineRadio7">Unallocated</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input sub-filters normal-task" type="radio" name="sub_filters" id="inlineRadio6" value="completed_today">
                                                        <label class="form-check-label" for="inlineRadio6">Completed Today</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input sub-filters emergency-task" type="radio" name="sub_filters" id="inlineRadio1" value="emergency_job">
                                                        <label class="form-check-label" for="inlineRadio1">Emergency Jobs</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input sub-filters overdue-task" type="radio" name="sub_filters" id="inlineRadio3" value="overdue_task">
                                                        <label class="form-check-label" for="inlineRadio3">Overdue Tasks</label>
                                                    </div>
                                                </form>
                                            </div> -->

                                        <!--end row-->
                                    </div>
                                    <div class="card-body pt-0 same-position-btn- task-setting-btn- tasks-tbl-main-top all-tbl-same-width"
                                        style="padding-top: 10px !important;">

                                        <table
                                            class="table align-middle table-nowrap mb-0 display job-listing-table table-hover task-pending-main task-table-main"
                                            id="task-datatables" style="">
                                            <thead class="table-light text-muted">
                                                <tr>
                                                    <th></th>
                                                    <th>Id</th>
                                                    <th>Task Id</th>
                                                    <th>Task</th>
                                                    <th>Type</th>
                                                    <th>Job</th>
                                                    <th>Client</th>
                                                    <th>Property</th>
                                                    <th>Address</th>
                                                    <th>Postcode</th>
                                                    <!--<th>Title</th>-->
                                                    <th>Status</th>
                                                    <th>Target</th>
                                                    <!--                                                    <th>Pref. Date</th>
                                                    <th>Pref. Time</th>-->
                                                    <th>Tags</th>
                                                    <th>Queue</th>
                                                    <!--<th>Task Status</th>-->
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
    <input type="hidden" name="job_id" id="job_id" />
    <!-- End Page-content -->
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/jobs/job.js?v=1.5') ?>"></script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/jobs/task.js') ?>"></script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/jobs/task-details.js?v=1.1') ?>"></script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
    <script src="<?= cnd_url(); ?>assets/libs/dropzone/dropzone-min.js"></script>
    <!--
    <script src="<?= cnd_url(); ?>assets/js/pages/datatables.init.js"></script> -->