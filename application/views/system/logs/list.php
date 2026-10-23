<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
<div class="main-content dataTables-height-detiles">

    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            $bc_title = 'Logs';
            //include_once APPPATH . 'views/system/inc/breadcrumbs.php';
            ?>
            <!-- end page title -->

            <div class="same-page-height dataTables-height">
                <div>
                    <?php
                    include_once APPPATH . 'views/system/inc/secondary-nav.php';
                    ?>
                    <!-- Tab panes -->
                    <div class="tab-content pt-0 text-muted">
                        <div class="tab-pane active selling-tab master-tab" id="masters" role="tabpanel">
                            <div class="card">
                                <div class="card-body">
                                    <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 p-0 pb-3 pt-0 mb-3">
                                        <h5 class="mb-0">Logs</h5>
                                    </div>

                                    <div class="row h-100 master-div" id="master-div">
                                        <div class="col-lg-3 col-md-6 mb-3">
                                            <a href="<?= base_url('system/logs/user-activity-logs') ?>">
                                                <div class="card master-card">
                                                    <div class="card-body card-inner">
                                                        <div class="d-flex align-items-center">
                                                            <div class="flex-grow-1 ms-3">
                                                                <p class="text-uppercase fw-semibold fs-13 mb-1">User Activity Logs</p>
                                                                <h4 class=" mb-0"><span >View</span></h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div class="col-lg-3 col-md-6 mb-3">
                                            <a href="<?= base_url('system/logs/mail-logs') ?>">
                                                <div class="card master-card">
                                                    <div class="card-body card-inner">
                                                        <div class="d-flex align-items-center">
                                                            <div class="flex-grow-1 ms-3">
                                                                <p class="text-uppercase fw-semibold fs-13 mb-1">Email Logs</p>
                                                                <h4 class=" mb-0"><span >View</span></h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div class="col-lg-3 col-md-6 mb-3">
                                            <a href="<?= base_url('system/logs/record-update-logs') ?>">
                                                <div class="card master-card">
                                                    <div class="card-body card-inner">
                                                        <div class="d-flex align-items-center">
                                                            <div class="flex-grow-1 ms-3">
                                                                <p class="text-uppercase fw-semibold fs-13 mb-1">Record Update Logs</p>
                                                                <h4 class=" mb-0"><span >View</span></h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div class="col-lg-3 col-md-6 mb-3">
                                            <a href="<?= base_url('system/logs/db-error-logs') ?>">
                                                <div class="card master-card">
                                                    <div class="card-body card-inner">
                                                        <div class="d-flex align-items-center">
                                                            <div class="flex-grow-1 ms-3">
                                                                <p class="text-uppercase fw-semibold fs-13 mb-1">DB Error Logs</p>
                                                                <h4 class=" mb-0"><span >View</span></h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div class="col-lg-3 col-md-6 mb-3">
                                            <a href="<?= base_url('system/logs/ppm-logs') ?>">
                                                <div class="card master-card">
                                                    <div class="card-body card-inner">
                                                        <div class="d-flex align-items-center">
                                                            <div class="flex-grow-1 ms-3">
                                                                <p class="text-uppercase fw-semibold fs-13 mb-1">PPM Logs</p>
                                                                <h4 class=" mb-0"><span >View</span></h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div class="col-lg-3 col-md-6 mb-3">
                                            <a href="<?= base_url('system/logs/bulk-assignment-logs') ?>">
                                                <div class="card master-card">
                                                    <div class="card-body card-inner">
                                                        <div class="d-flex align-items-center">
                                                            <div class="flex-grow-1 ms-3">
                                                                <p class="text-uppercase fw-semibold fs-13 mb-1">Bulk Assignment Logs</p>
                                                                <h4 class=" mb-0"><span >View</span></h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div class="col-lg-3 col-md-6 mb-3">
                                            <a href="<?= base_url('system/logs/app-error-logs') ?>">
                                                <div class="card master-card">
                                                    <div class="card-body card-inner">
                                                        <div class="d-flex align-items-center">
                                                            <div class="flex-grow-1 ms-3">
                                                                <p class="text-uppercase fw-semibold fs-13 mb-1">App Error Logs</p>
                                                                <h4 class=" mb-0"><span>View</span></h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
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
                <!--end col-->
            </div>
            <!--end row-->

        </div>
        <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/systems/logs.js') ?>"></script>
