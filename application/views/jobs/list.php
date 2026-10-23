<link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap5.min.css" />
<!--datatable responsive css-->
<link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.9/css/responsive.bootstrap.min.css" />
<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<style>
    #job-datatables th,
    #job-datatables td {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
<div class="main-content dataTables-height-detiles-">
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
                            <div class="same-page-height dataTables-height selling-tab" id="job-tab" role="tabpanel">
                                <div class="card" id="tasksList">
                                    <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3 job-setting-btn"> 
                                        <?php
                                            require_once APPPATH . 'views/jobs/inc/filters.php';
                                            ?>
                                            <div class="row sub-filter-menu">
                                                <div class="col-xxl-9 col-sm-8 ">
                                                    <!-- <form>
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
                                                    </form> -->
                                                </div>
                                                <div class="col-xxl-3 col-sm-4 text-end">
                                                    
                                                </div>
                                            </div>
                                            <!--end row-->
                                    </div>
                                    <div class="card-body pt-0 same-position-btn- all-tbl-same-width1 table-responsive" style="padding-top: 10px !important;">
                                        <table class="table align-middle table-nowrap mb-0 display job-listing-table table-hover task-pending-main" id="job-datatables" style="">
                                            <thead class="table-light text-muted">
                                                <tr>
                                                    <th style="min-width:50px;width:50px">&nbsp;&nbsp;&nbsp;</th>
                                                    <th style="min-width:36px;width:36px"><input class="form-check-input" type="checkbox" id="job-select-all"></th>
                                                    <th>Id</th>
                                                    <th>Job Id</th>
                                                    <th style="max-width:100px;width:100px">Job</th>
                                                    <th style="max-width:100px;width:100px">Client</th>
                                                    <th style="max-width:100px;width:100px">Property</th>
                                                    <th style="max-width:100px;width:100px">Contract</th>
                                                    <th style="max-width:200px;width:200px">Address</th>
                                                    <th style="max-width:80px;width:80px">Postcode</th>
                                                    <th style="max-width:80px;width: 80px;">Status</th>
                                                    <th style="max-width:80px;width:80px">Fin. Status</th>
                                                    <th style="max-width:140px;width:140px">Progress Status</th>
                                                    <th style="max-width:80px;width:80px">Target</th>
                                                    <th style="max-width:80px;width:80px">Created</th>
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

    <!-- End Page-content -->
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/jobs/job.js?v=1.5') ?>"></script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/jobs/task-details.js?v=1.1') ?>"></script>
    <script type="text/javascript" src="<?= cnd_url('assets/libs/dropzone/dropzone-min.js'); ?>"></script>
    <script type="text/javascript">
        $(document).ready(function (e) {
            var hash = window.location.hash;
            if (hash) {
                hash = hash.replace('#', ''); // strip the # at the beginning of the string
                if (hash == 'add') {
                    $('button.popup-form-button').trigger('click');
                }
            }
        });
    </script>