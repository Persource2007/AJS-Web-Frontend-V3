<?php include_once 'commons/header.php'; ?>



<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
<div class="main-content">

    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 class="mb-sm-0">AJS Supervisor & QA Dashboard</h4>

                        <div class="page-title-right">
                            <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item"><a href="javascript: void(0);">Dashboard</a></li>
                                <li class="breadcrumb-item active">Supervisor & QA Dashboard</li>
                            </ol>
                        </div>

                    </div>
                </div>
            </div>
            <!-- end page title -->

            
            <div class="row master-tab jobs-dashboard-main">
                <div class="col-xl-4">
                    <div class="card">
                        <div class="card-header align-items-center d-flex">
                            <h4 class="card-title mb-0 flex-grow-1">Jobs</h4>
                        </div><!-- end card header -->

                        <div class="card-body p-0">
                            <ul class="list-group list-group-flush border-dashed px-3">
                                <li class="list-group-item ps-0">
                                    <a href="javascripe:void(0);">
                                        <div class="d-flex align-items-start">
                                            <div class="flex-grow-1">
                                                <p class="fw-semibold fs-15 mb-0">Jobs awaiting approval</p>
                                            </div>
                                            <div class="flex-shrink-0 ms-2">
                                                <b class="text-muted fs-16 mb-0">25</b>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li class="list-group-item ps-0">
                                    <a href="javascripe:void(0);">
                                        <div class="d-flex align-items-start">
                                            <div class="flex-grow-1">
                                                <p class="fw-semibold fs-15 mb-0">Compliance jobs pending in next 60 days</p>
                                            </div>
                                            <div class="flex-shrink-0 ms-2">
                                                <b class="text-muted fs-16 mb-0">30</b>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li class="list-group-item ps-0">
                                    <a href="javascripe:void(0);">
                                        <div class="d-flex align-items-start">
                                            <div class="flex-grow-1">
                                                <p class="fw-semibold fs-15 mb-0">Jobs returned to engineer in last 15 days</p>
                                            </div>
                                            <div class="flex-shrink-0 ms-2">
                                                <b class="text-muted fs-16 mb-0">5</b>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="col-xl-4">
                    <div class="card">
                        <div class="card-header align-items-center d-flex">
                            <h4 class="card-title mb-0 flex-grow-1">Job Completed</h4>
                        </div><!-- end card header -->

                        <div class="card-body p-0">
                            <ul class="list-group list-group-flush border-dashed px-3">
                                <li class="list-group-item ps-0">
                                    <a href="javascripe:void(0);">
                                        <div class="d-flex align-items-start">
                                            <div class="flex-grow-1">
                                                <p class="fw-semibold fs-15 mb-0">Completed today</p>
                                            </div>
                                            <div class="flex-shrink-0 ms-2">
                                                <b class="text-muted fs-16 mb-0">20</b>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li class="list-group-item ps-0">
                                    <a href="javascripe:void(0);">
                                        <div class="d-flex align-items-start">
                                            <div class="flex-grow-1">
                                                <p class="fw-semibold fs-15 mb-0">Completed in last 7 days</p>
                                            </div>
                                            <div class="flex-shrink-0 ms-2">
                                                <b class="text-muted fs-16 mb-0">75</b>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li class="list-group-item ps-0">
                                    <a href="javascripe:void(0);">
                                        <div class="d-flex align-items-start">
                                            <div class="flex-grow-1">
                                                <p class="fw-semibold fs-15 mb-0">Completed in last 30 days</p>
                                            </div>
                                            <div class="flex-shrink-0 ms-2">
                                                <b class="text-muted fs-16 mb-0">200</b>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="col-xl-4">
                    <div class="card">
                        <div class="card-header align-items-center d-flex">
                            <h4 class="card-title mb-0 flex-grow-1">Engineers</h4>
                        </div><!-- end card header -->

                        <div class="card-body p-0">
                            <ul class="list-group list-group-flush border-dashed px-3">
                                <li class="list-group-item ps-0">
                                    <a href="<?= cnd_url(); ?>jobs-timesheets-awaiting-approval-list">
                                        <div class="d-flex align-items-start">
                                            <div class="flex-grow-1">
                                                <p class="fw-semibold fs-15 mb-0">Timesheets awaiting approval</p>
                                            </div>
                                            <div class="flex-shrink-0 ms-2">
                                                <b class="text-muted fs-16 mb-0">20</b>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row chart-main mt-4">
                <div class="col-lg-12">                    
                    <div class="card" id="tasksList">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-xl-6">
                                    <div class="card">
                                        <div class="card-header">
                                            <h4 class="card-title mb-0">Outstanding Jobs vs Completed Jobs <i class="ri-question-line align-bottom me-1"></i></h4>
                                        </div><!-- end card header -->

                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-xl-4 text-center">
                                                    <h6>Today</h6>
                                                    <div id="simple_dount_chart" data-colors='["--vz-success", "--vz-primary"]' class="apex-charts" dir="ltr"></div>
                                                </div>
                                                <div class="col-xl-4 text-center">
                                                    <h6>Last 7 Days</h6>
                                                    <div id="day_dount_chart" data-colors='["--vz-success", "--vz-primary"]' class="apex-charts" dir="ltr"></div>
                                                </div>
                                                <div class="col-xl-4 text-center">
                                                    <h6>Last 30 Days</h6>
                                                    <div id="month_dount_chart" data-colors='["--vz-success", "--vz-primary"]' class="apex-charts" dir="ltr"></div>
                                                </div>
                                            </div>
                                        </div><!-- end card-body -->
                                    </div><!-- end card -->
                                </div>

                                <div class="col-xl-6">
                                    <div class="card">
                                        <div class="card-header">
                                            <h4 class="card-title mb-0">First Time Fixes <i class="ri-question-line align-bottom me-1"></i></h4>
                                        </div><!-- end card header -->

                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-xl-8 mx-auto">
                                                    <div class="row">
                                                        <div class="col-xl-6 text-center">
                                                            <h6>Last 30 Days</h6>
                                                            <div id="last_dount_chart" data-colors='["--vz-success", "--vz-primary"]' class="apex-charts" dir="ltr"></div>
                                                        </div>
                                                        <div class="col-xl-6 text-center">
                                                            <h6>All Time</h6>
                                                            <div id="all_time_dount_chart" data-colors='["--vz-success", "--vz-primary"]' class="apex-charts" dir="ltr"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div><!-- end card-body -->
                                    </div><!-- end card -->
                                </div>
                            </div>
                        </div>
                        <!--end card-body-->
                    </div>
                    <!--end card-->
                </div>
                <!--end col-->
            </div>
            <!--end row-->
        </div>
        <!-- container-fluid -->
    </div>
    <!-- End Page-content -->

    <?php include_once 'commons/footer.php'; ?>
    <!-- profile-setting init js -->
    <script src="<?= cnd_url('assets/js/pages/profile-setting.init.js'); ?>"></script>
    <script src="<?= cnd_url('assets/libs/apexcharts/apexcharts.min.js'); ?>"></script>
    <script src="<?= cnd_url('assets/js/pages/apexcharts-pie.init.js'); ?>"></script>