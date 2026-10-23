<link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap5.min.css" />
<!--datatable responsive css-->
<link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.9/css/responsive.bootstrap.min.css" />
<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<style>
    /* The Show/Hide-columns gear (.colvis-fixed-container) is absolutely positioned
       at the top-left of the table wrapper, so the leftmost column has to reserve
       room for it. This grid's first visible column only holds the letter preview
       icon and is empty on most rows, so pin a width on it — without this the gear
       sits on top of the "Task Id" header. */
    #bulk-task-datatables th.comm-action-col,
    #bulk-task-datatables td.comm-action-col {
        min-width: 46px;
        width: 46px;
        text-align: center;
    }
</style>
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
                                <div class="card same-page-height-" id="tasksList">
                                    <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pb-2">
                                        <?php
                                         require_once APPPATH . 'views/tasks/inc/filter-tasks.php';
                                        ?> 
                                    </div>
                                    <div class="card-body pt-0 same-position-btn- check-input-check-right " style="padding-top: 10px !important;">  
                                        <!--end row-->
                                        <div class="table-responsive mb-0">
                                            <table class="table align-middle table-nowrap mb-0 display  table-hover" id="bulk-task-datatables" style=" ">
                                                <!-- <thead class="table-light text-muted">
                                                    <tr>
                                                        <th>Id</th>
                                                        <th><input class="form-check-input assign-btn allselect" type="checkbox"/></th>
                                                        <th>Task Id</th>
                                                        <th>Task</th>
                                                        <th>Job Type</th>
                                                        <th>Client</th>
                                                        <th>Property</th>
                                                        <th>Batch No</th>
                                                        <th>Address</th>
                                                        <th>Postcode</th>
                                                        <th>Total Comm.</th>
                                                        <th>Last Comm. Date</th>
                                                        <th>Status</th>
                                                        <th>Assigned To</th>
                                                        <th>Assign Date/Time</th>
                                                        <th>Created</th>
                                                    </tr>
                                                </thead> -->
                                            </table>
                                        </div>
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
    
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/jobs/batch-printing.js') ?>"></script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>

    <script src="<?= cnd_url(); ?>assets/js/pages/datatables.init.js"></script>