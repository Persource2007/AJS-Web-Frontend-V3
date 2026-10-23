<?php require_once APPPATH . 'views/commons/datatables-inc.php'; ?>
<style>
    /* scoped to this page only - do not left-align tooltips app-wide */
    .ccr-tooltip .tooltip-inner {
        text-align: left;
    }
</style>
<div class="main-content dataTables-height-detiles-">
    <div class="page-content">
        <div class="container-fluid">

            <?php require_once APPPATH . 'views/commons/breadcrumb.php'; ?>

            <div class="row">
                <div class="col-lg-12">
                    <div>
                        <!-- Tab panes -->
                        <div class="tab-content- pt-0 text-muted">
                            <div class="same-page-height dataTables-height" id="ccr-tab" role="tabpanel">
                                <div class="card" id="ccrList">
                                    <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3">
                                        <div class="row g-2 align-items-end">

                                            <div class="col-md-2">
                                                <label class="form-label mb-1 fs-12 text-muted">Client</label>
                                                <select id="ccr-client" class="form-control form-control-sm" style="width:100%;">
                                                    <option value="">All Clients</option>
                                                </select>
                                            </div>

                                            <div class="col-md-2">
                                                <label class="form-label mb-1 fs-12 text-muted">Contract</label>
                                                <select id="ccr-contract" class="form-control form-control-sm" style="width:100%;">
                                                    <option value="">All Contracts</option>
                                                </select>
                                            </div>

                                            <div class="col-md-2">
                                                <label class="form-label mb-1 fs-12 text-muted">Engineer</label>
                                                <select id="ccr-engineer" class="form-control form-control-sm" style="width:100%;">
                                                    <option value="">All Engineers</option>
                                                </select>
                                            </div>

                                            <div class="col-auto">
                                                <label class="form-label mb-1 fs-12 text-muted">Job Number</label>
                                                <input type="text" id="ccr-job-no" class="form-control form-control-sm"
                                                    placeholder="e.g. JOB000019" style="min-width:150px;" autocomplete="off">
                                            </div>

                                            <div class="col-auto">
                                                <label class="form-label mb-1 fs-12 text-muted">From</label>
                                                <input type="date" id="ccr-start-date" class="form-control form-control-sm">
                                            </div>

                                            <div class="col-auto">
                                                <label class="form-label mb-1 fs-12 text-muted">To</label>
                                                <input type="date" id="ccr-end-date" class="form-control form-control-sm">
                                            </div>

                                            <div class="col-auto">
                                                <button id="ccr-search-btn" class="btn btn-primary btn-sm">
                                                    <i class="las la-sync me-1"></i> Search
                                                </button>
                                            </div>

                                            <div class="col-auto ms-auto">
                                                <button id="ccr-export-btn" class="btn btn-success btn-sm">
                                                    <i class="las la-file-excel me-1"></i> Export
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="card-body pt-0 table-responsive" style="padding-top: 10px !important;">
                                        <table id="ajax-datatables" class="table align-middle table-nowrap mb-0 table-hover" style="">
                                            <thead class="table-light text-muted">
                                                <tr>
                                                    <th>&nbsp;&nbsp;&nbsp;Client</th>
                                                    <th>Job No</th>
                                                    <th>Client Job No</th>
                                                    <th>Contract</th>
                                                    <th>Workstream</th>
                                                    <th>Job Type</th>
                                                    <th>Certificate Type</th>
                                                    <th>Certificate Date</th>
                                                    <th>Engineer</th>
                                                    <th>UPRN</th>
                                                    <th>Address</th>
                                                    <th>Postcode</th>
                                                    <th>Condition</th>
                                                    <th>Engineer Comments</th>
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
    </div>
</div>

<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/reports/completed_certificate_report.js?v=' . time()) ?>"></script>
