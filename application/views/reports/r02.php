<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">

            <?php require_once APPPATH . 'views/commons/breadcrumb.php'; ?>

            <!-- Filter Bar -->
            <div class="card mb-3">
                <div class="card-body py-3">
                    <div class="row g-2 align-items-end">
                        <div class="col-auto">
                            <label class="form-label mb-1 fs-12 text-muted">Week</label>
                            <input type="week" id="r02-week" class="form-control form-control-sm" style="min-width:180px;" />
                        </div>
                        <div class="col-md-3">
                            <label class="form-label mb-1 fs-12 text-muted">Contract (optional)</label>
                            <select id="r02-contract" class="form-control form-control-sm" style="width:100%;">
                                <option value="">All Contracts</option>
                            </select>
                        </div>
                        <div class="col-auto">
                            <button id="r02-generate-btn" class="btn btn-primary btn-sm">
                                <i class="las la-sync me-1"></i> Generate
                            </button>
                        </div>
                        <div class="col-auto ms-auto">
                            <button id="r02-export-btn" class="btn btn-success btn-sm" style="display:none;">
                                <i class="las la-file-excel me-1"></i> Export Excel
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Status Filter Buttons -->
            <div id="r02-filter-bar" class="mb-3" style="display:none;">
                <div class="card mb-0">
                    <div class="card-body py-2">
                        <div class="d-flex flex-wrap gap-2 align-items-center">
                            <span class="fs-12 text-muted me-2">Filter:</span>
                            <button class="btn btn-sm r02-filter-btn btn-outline-secondary" data-status="all">
                                All <span class="badge bg-secondary ms-1 r02-count-all">0</span>
                            </button>
                            <button class="btn btn-sm r02-filter-btn btn-primary" data-status="in_progress">
                                In Progress <span class="badge bg-white text-primary ms-1 r02-count-in_progress">0</span>
                            </button>
                            <button class="btn btn-sm r02-filter-btn btn-outline-danger" data-status="outstanding">
                                Outstanding <span class="badge bg-danger ms-1 r02-count-outstanding">0</span>
                            </button>
                            <button class="btn btn-sm r02-filter-btn btn-outline-warning" data-status="incomplete">
                                Incomplete <span class="badge bg-warning text-dark ms-1 r02-count-incomplete">0</span>
                            </button>                            
                        </div>
                    </div>
                </div>
            </div>

            <!-- Summary Bar -->
            <div id="r02-summary-bar" style="display:none;" class="mb-3">
                <div class="card mb-0">
                    <div class="card-body py-2">
                        <div class="d-flex flex-wrap gap-4 align-items-center">
                            <span class="fs-13">Period: <strong class="r02-period text-dark">—</strong></span>
                            <span class="fs-13">Contracts: <strong class="r02-contract-count text-dark">—</strong></span>
                            <span class="fs-13">Total WIP Jobs: <strong class="r02-total-jobs text-primary">—</strong></span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Results -->
            <div id="r02-results">
                <div class="text-center py-5 text-muted">
                    <i class="las la-tasks fs-24 d-block mb-2"></i>
                    Select a week and click <strong>Generate</strong> to load the report.
                </div>
            </div>

        </div>
    </div>
    <input type="hidden" id="is_r02" value="1" />
</div>

<script type="text/javascript" src="<?= cdn_url('assets/js/app/r02.js?v=' . time()) ?>"></script>
