<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">

            <?php require_once APPPATH . 'views/commons/breadcrumb.php'; ?>

            <!-- ── Filter Bar ── -->
            <div class="card mb-3">
                <div class="card-body py-3">
                    <div class="row g-2 align-items-end">

                        <div class="col-auto">
                            <label class="form-label mb-1 fs-12 text-muted">Month</label>
                            <input type="month" id="r08-month" class="form-control form-control-sm"
                                style="min-width:160px;" />
                        </div>

                        <div class="col-md-3">
                            <label class="form-label mb-1 fs-12 text-muted">Client (optional)</label>
                            <select id="r08-client" class="form-control form-control-sm select2-ajax-clients"
                                style="width:100%;">
                                <option value="">All Clients</option>
                            </select>
                        </div>

                        <div class="col-auto">
                            <button id="r08-generate-btn" class="btn btn-primary btn-sm">
                                <i class="las la-sync me-1"></i> Generate
                            </button>
                        </div>

                        <div class="col-auto ms-auto">
                            <button id="r08-export-btn" class="btn btn-success btn-sm" style="display:none;">
                                <i class="las la-file-excel me-1"></i> Export CSV
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            <!-- ── Summary Bar ── -->
            <div id="r08-summary-bar" style="display:none;" class="mb-3">
                <div class="card mb-0">
                    <div class="card-body py-2">
                        <div class="d-flex flex-wrap gap-4 align-items-center">
                            <span class="fs-13">Period: <strong class="r08-period text-dark">—</strong></span>
                            <span class="fs-13">Contracts: <strong class="r08-contract-count text-dark">—</strong></span>
                            <span class="fs-13">Submissions: <strong class="r08-total-submissions text-primary">—</strong></span>
                            <span class="fs-13">Fully Compliant: <strong class="r08-total-compliant text-success">—</strong></span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ── Results ── -->
            <div id="r08-results">
                <div class="text-center py-5 text-muted">
                    <i class="las la-clipboard-check fs-24 d-block mb-2"></i>
                    Select a month and click <strong>Generate</strong> to load the report.
                </div>
            </div>

        </div>
    </div>
    <input type="hidden" id="is_r08" value="1" />
</div>

<script type="text/javascript" src="<?= cdn_url('assets/js/app/r08.js?v=' . time()) ?>"></script>
