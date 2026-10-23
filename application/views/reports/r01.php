<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">

            <?php require_once APPPATH . 'views/commons/breadcrumb.php'; ?>

            <!-- Filter Bar -->
            <div class="card mb-3">
                <div class="card-body py-3">
                    <div class="row g-2 align-items-end">
                        <div class="col-auto">
                            <label class="form-label mb-1 fs-12 text-muted">Month</label>
                            <input type="month" id="r01-month" class="form-control form-control-sm" style="min-width:160px;" />
                        </div>
                        <div class="col-md-3">
                            <label class="form-label mb-1 fs-12 text-muted">Supplier (optional)</label>
                            <select id="r01-contractor" class="form-control form-control-sm select2-ajax-contractors" style="width:100%;">
                                <option value="">All Suppliers</option>
                            </select>
                        </div>
                        <div class="col-auto">
                            <button id="r01-generate-btn" class="btn btn-primary btn-sm">
                                <i class="las la-sync me-1"></i> Generate
                            </button>
                        </div>
                        <div class="col-auto ms-auto">
                            <button id="r01-export-btn" class="btn btn-success btn-sm" style="display:none;">
                                <i class="las la-file-excel me-1"></i> Export Excel
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Summary Bar -->
            <div id="r01-summary-bar" style="display:none;" class="mb-3">
                <div class="card mb-0">
                    <div class="card-body py-2">
                        <div class="d-flex flex-wrap gap-4 align-items-center">
                            <span class="fs-13">Period: <strong class="r01-period text-dark">—</strong></span>
                            <span class="fs-13">Suppliers: <strong class="r01-supplier-count text-dark">—</strong></span>
                            <span class="fs-13">Total Reported: <strong class="r01-total-reported text-primary">—</strong></span>
                            <span class="fs-13">Total Completed: <strong class="r01-total-completed text-success">—</strong></span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Results -->
            <div id="r01-results">
                <div class="text-center py-5 text-muted">
                    <i class="las la-chart-bar fs-24 d-block mb-2"></i>
                    Select a month and click <strong>Generate</strong> to load the report.
                </div>
            </div>

        </div>
    </div>
    <input type="hidden" id="is_r01" value="1" />
</div>

<script type="text/javascript" src="<?= cdn_url('assets/js/app/r01.js?v=' . time()) ?>"></script>
