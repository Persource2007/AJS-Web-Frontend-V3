<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->
            <div class="row pt-0">
                <div class="col-lg-12">
                    <div>
                        <?php
                        $title = "Dashboard";
                        if (!empty($client_id)) {

                            require_once APPPATH . 'views/clients/inc/nav-tab.php';
                        } else if (isset($is_detail) && $is_detail) {
                            require_once APPPATH . 'views/contracts/inc/detail-nav-tab.php';
                        } else {
                            require_once APPPATH . 'views/contracts/inc/nav-tab.php';
                        }
                        ?>
                        <!-- Tab panes -->
                        <div class="tab-content text-muted">
                            <div class="tab-pane active selling-tab" id="dashboard" role="tabpanel">
                                <div class="card" style="background-color: transparent; box-shadow: none;">
                                    <?php
                                    if (!empty($client_id)) {
                                        if (isset($is_detail) && $is_detail) {
                                            $this->load->view('contracts/inc/detail-sub-nav-tab', ['client_id' => $client_id, 'title' => "Dashboard"]);
                                        } else {
                                            $this->load->view('contracts/inc/sub-nav-tab', ['client_id' => $client_id, 'title' => "Dashboard"]);
                                        }
                                    }
                                    ?>
                                    <div class="card-body contract-body pt-3 p-0 mt-3">
                                        <div class="row mt-0 sub-poperty-details-section p-3 pt-0 pb-0">
                                            <div class="col-xxl-8">
                                                <div class="row">
                                                    <div class="col-xxl-6">
                                                        <h5 class="mb-1">Details</h5>
                                                        <hr class="mt-1 mb-2">
                                                        <table class="table mb-0">
                                                            <tbody>
                                                                <tr>
                                                                    <td><b>Type</b></td>
                                                                    <td id="contract_type"></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Workstreams</b></td>
                                                                    <td id="contract_workstreams"></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Validity</b></td>
                                                                    <td id="contract_validity"></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Framework Commission (%)</b></td>
                                                                    <td id="contract_agent_commission"></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Invoice Total</b></td>
                                                                    <td id="contract_invoice_total"></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Total Commission</b></td>
                                                                    <td id="contract_total_commission"></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div class="col-xxl-6">
                                                        <h5 class="mb-1">Client Contact</h5>
                                                        <hr class="mt-1 mb-2">
                                                        <table class="table mb-0">
                                                            <tbody id="contacts">
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-4">
                                                <h5 class="mb-1">AJS Contacts</h5>
                                                <hr class="mt-1 mb-2">
                                                <table class="table mb-0">
                                                    <tbody id="ajs_contacts">
                                                    </tbody>
                                                </table>
                                                <!--end table-->

                                                <!--end table-->
                                            </div>
                                        </div>

                                        <div class="row master-tab jobs-dashboard-main contract-dashboard-main mt-3 p-0 pt-3">
                                            <div class="col-xl-4">
                                                <div class="card mb-3">
                                                    <div class="card-header align-items-center d-flex">
                                                        <h4 class="card-title mb-0 flex-grow-1">Jobs Overview</h4>
                                                    </div><!-- end card header -->

                                                    <div class="card-body p-0" style="padding-top: 0px !important;">
                                                        <ul class="list-group list-group-flush border-dashed px-3">
                                                            <li class="list-group-item ps-0">
                                                                <a href="javascript: void(0);">
                                                                    <div class="d-flex align-items-start">
                                                                        <div class="flex-grow-1">
                                                                            <p class="fs-15 mb-0">Jobs awaiting appointment</p>
                                                                        </div>
                                                                        <div class="flex-shrink-0 ms-2">
                                                                            <b class="text-muted fs-16 mb-0 appointment-count">0</b>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                            <li class="list-group-item ps-0">
                                                                <a href="javascript: void(0);">
                                                                    <div class="d-flex align-items-start">
                                                                        <div class="flex-grow-1">
                                                                            <p class="fs-15 mb-0">Jobs awaiting review</p>
                                                                        </div>
                                                                        <div class="flex-shrink-0 ms-2">
                                                                            <b class="text-muted fs-16 mb-0 review-count">0</b>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                            <li class="list-group-item ps-0">
                                                                <a href="javascript: void(0);">
                                                                    <div class="d-flex align-items-start">
                                                                        <div class="flex-grow-1">
                                                                            <p class="fs-15 mb-0">Jobs pending invoices</p>
                                                                        </div>
                                                                        <div class="flex-shrink-0 ms-2">
                                                                            <b class="text-muted fs-16 mb-0 invoice-count">0</b>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xl-4">
                                                <div class="card mb-3">
                                                    <div class="card-header align-items-center d-flex">
                                                        <h4 class="card-title mb-0 flex-grow-1">Jobs Logged</h4>
                                                    </div><!-- end card header -->

                                                    <div class="card-body p-0" style="padding-top: 0px !important;">
                                                        <ul class="list-group list-group-flush border-dashed px-3">
                                                            <li class="list-group-item ps-0">
                                                                <a href="javascript: void(0);">
                                                                    <div class="d-flex align-items-start">
                                                                        <div class="flex-grow-1">
                                                                            <p class="fs-15 mb-0">Logged today</p>
                                                                        </div>
                                                                        <div class="flex-shrink-0 ms-2">
                                                                            <b class="text-muted fs-16 mb-0 logged-today-count">0</b>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                            <li class="list-group-item ps-0">
                                                                <a href="javascript: void(0);">
                                                                    <div class="d-flex align-items-start">
                                                                        <div class="flex-grow-1">
                                                                            <p class="fs-15 mb-0">Logged in last 7 days</p>
                                                                        </div>
                                                                        <div class="flex-shrink-0 ms-2">
                                                                            <b class="text-muted fs-16 mb-0 logged-last-7days-count">0</b>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                            <li class="list-group-item ps-0">
                                                                <a href="javascript: void(0);">
                                                                    <div class="d-flex align-items-start">
                                                                        <div class="flex-grow-1">
                                                                            <p class="fs-15 mb-0">Logged in last 30 days</p>
                                                                        </div>
                                                                        <div class="flex-shrink-0 ms-2">
                                                                            <b class="text-muted fs-16 mb-0 logged-last-30days-count">0</b>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xl-4">
                                                <div class="card mb-3">
                                                    <div class="card-header align-items-center d-flex">
                                                        <h4 class="card-title mb-0 flex-grow-1">Jobs Completed</h4>
                                                    </div><!-- end card header -->

                                                    <div class="card-body p-0" style="padding-top: 0px !important;">
                                                        <ul class="list-group list-group-flush border-dashed px-3">
                                                            <li class="list-group-item ps-0">
                                                                <a href="javascript: void(0);">
                                                                    <div class="d-flex align-items-start">
                                                                        <div class="flex-grow-1">
                                                                            <p class="fs-15 mb-0">Completed today</p>
                                                                        </div>
                                                                        <div class="flex-shrink-0 ms-2">
                                                                            <b class="text-muted fs-16 mb-0 today-count">0</b>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                            <li class="list-group-item ps-0">
                                                                <a href="javascript: void(0);">
                                                                    <div class="d-flex align-items-start">
                                                                        <div class="flex-grow-1">
                                                                            <p class="fs-15 mb-0">Completed in last 7 days</p>
                                                                        </div>
                                                                        <div class="flex-shrink-0 ms-2">
                                                                            <b class="text-muted fs-16 mb-0 last-7days-count">0</b>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                            <li class="list-group-item ps-0">
                                                                <a href="javascript: void(0);">
                                                                    <div class="d-flex align-items-start">
                                                                        <div class="flex-grow-1">
                                                                            <p class="fs-15 mb-0">Completed in last 30 days</p>
                                                                        </div>
                                                                        <div class="flex-shrink-0 ms-2">
                                                                            <b class="text-muted fs-16 mb-0 last-30days-count">0</b>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row chart-main">
                                            <div class="col-lg-12">
                                                <div class="card mb-0" id="tasksList">
                                                    <div class="card-body pb-0">
                                                        <div class="row">
                                                            <div class="col-xl-12">
                                                                <div class="card">
                                                                    <div class="card-header">
                                                                        <h4 class="card-title mb-0">Open vs Completed Jobs <i class="ri-question-line align-bottom me-1"></i></h4>
                                                                    </div><!-- end card header -->

                                                                    <div class="card-body">
                                                                        <div class="row">
                                                                            <div class="col-xl-4 text-center">
                                                                                <h6>Today</h6>
                                                                                <div id="today_chart" data-colors='["--vz-success", "--vz-primary"]' class="apex-charts" dir="ltr"></div>
                                                                            </div>
                                                                            <div class="col-xl-4 text-center">
                                                                                <h6>Last 7 Days</h6>
                                                                                <div id="last_7day_chart" data-colors='["--vz-success", "--vz-primary"]' class="apex-charts" dir="ltr"></div>
                                                                            </div>
                                                                            <div class="col-xl-4 text-center">
                                                                                <h6>Last 30 Days</h6>
                                                                                <div id="last_30day_chart" data-colors='["--vz-success", "--vz-primary"]' class="apex-charts" dir="ltr"></div>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<?= cnd_url('assets/libs/apexcharts/apexcharts.min.js'); ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/app/dashboard.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/dashboard.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/contract-commons.js') ?>"></script>