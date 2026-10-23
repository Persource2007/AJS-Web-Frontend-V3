<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<style>
    .select2-selection__clear {
        display: none;
    }
</style>

<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            $title = "PPM Master Plan List";
            $id    = $contract_id;

            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->

            <div class="row">
                <div class="col-lg-12">
                    <div class="same-page-height">
                        <?php
                        if (!empty($client_id)) {
                            require_once APPPATH . 'views/clients/inc/nav-tab.php';
                        } else {
                            require_once APPPATH . 'views/contracts/inc/nav-tab.php';
                        }
                        ?>
                        <!-- Tab panes -->
                        <div class="tab-content text-muted">
                            <div class="tab-pane active" id="master" role="tabpanel">
                                <div class="card">
                                    <?php
                                    if (!empty($client_id)) {
                                        $this->load->view('contracts/inc/sub-nav-tab', ['client_id' => $client_id, 'title' => "PPM Master Plan List"]);
                                    }
                                    ?>
                                    <div class="row scheduler-update-div" style="display: none">
                                        <div class="col-xxl-12">
                                            <div class="card border card-border-warning card-custom-ajs mb-0">
                                                <div class="card-header pb-2">
                                                    <div class="row">
                                                        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-12">
                                                            <h5 class="card-title mb-2">Auto-Scheduler Update</h5>
                                                        </div>
                                                        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-12">
                                                            <div class="text-end">
                                                                <a href="<?= base_url('system/logs/ppm-logs') ?>" target="_BLANK" class="link-warning link-custom  fw-medium">View Logs <i class="ri-arrow-right-line align-middle"></i></a>
                                                            </div>
                                                        </div>
                                                        <div class="col-xxl-12 mt-2">
                                                            <ul class="mb-0 master-plan-listed">
                                                                <li><b class="card-text mb-3">Last Execution Date:</b> &nbsp;&nbsp;<span class="schedule-execute-date align-middle fs-13 master-plan-details">28-11-2024</span></li>
                                                                <li><b>Batch Code:</b>&nbsp;&nbsp; <span class="schedule-batch-code align-middle fs-13 master-plan-details">PPM000001</span> </li>
                                                                <li><b>Scheduled Period:</b>&nbsp;&nbsp; <span class="schedule-start-date align-middle fs-13 master-plan-details">28-11-2024</span> &nbsp;<b>-</b>&nbsp; <span class="schedule-end-date master-plan-details align-middle fs-13">28-11-2024</span></li>
                                                                <li><b>Jobs Generated:</b>&nbsp;&nbsp; <span class="schedule-jobs-count align-middle fs-13 master-plan-details">5</span></li>
                                                                <li><a href="<?= base_url('job/list') ?>" target="_BLANK" class="link-warning link-custom  fw-medium view-batch-jobs">View Jobs </a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="card accordion-box-con">
                                                <div class="card-body">
                                                    <div>
                                                        <div class="card shadow-sm">
                                                            <div class="card-header">
                                                                <div class="row align-items-center">
                                                                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-12">
                                                                        <h5 class="card-title mb-0"> Property Masterplan </h5>
                                                                    </div>
                                                                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-12 text-end">
                                                                        <button type="button" class="btn btn-primary waves-effect waves-light" id="queue_masterplan"><i class="las la-briefcase"></i> Generate Job Queue</button>
                                                                        <button type="button" class="btn btn-secondary waves-effect waves-light export-btn ms-1" id="export_contract_masterplan"><i class="las la-file-pdf"></i> Export</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3" style="background-color: #fff;">
                                                                    <div class="d-flex justify-content-between">
                                                                        <div>
                                                                            <form id="form_filters" action="" method="GET">
                                                                                <div class="btn-group">
                                                                                    <div class="search-box" style="width: 250px;">
                                                                                        <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Search UPRN / Postcode / Job Type">
                                                                                        <i class="mdi mdi-magnify search-widget-icon"></i>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="btn-group ms-1">
                                                                                    <button class="btn btn-primary" id="search_grid" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
                                                                                </div>
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            <div class="card-body">
                                                                <div class="table-responsive">
                                                                    <table class="table text-muted align-middle mb-0 mt-0 table-hover table-nowrap" id="ajax-datatables1">
                                                                        <thead class="table-light  text-muted" id="ppm-data1-head">

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
            <!--end modal-->
            <form id="ppmHiddenForm" action="" method="post" style="display:none;"></form>

        </div>
        <!-- container-fluid -->
    </div>
<!-- End Page-content -->
<script>
    contract_id = "<?= $contract_id; ?>";
</script>
<script type="text/javascript" src="<?= base_url('assets/js/datatables/contracts/masterplan-commons.js?v=1.1') ?>"></script>
<script type="text/javascript" src="<?= base_url('assets/js/datatables/contracts/masterplan-list.js?v=1.1') ?>"></script>

<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/contract-commons.js') ?>"></script>
<script type="text/javascript">
    $('.client-sub-nav').find('a[data-tab="client-contracts"]').addClass('active');
</script>