<!-- ============================================================== -->
<!-- Havering — single interface detail (file history + KPIs)   -->
<!-- ============================================================== -->
<style>
    .hav-dash { padding-bottom: 1.5rem; }
    .hav-dash > .row { --bs-gutter-x: 1.25rem; --bs-gutter-y: 1.25rem; margin-bottom: 1.25rem; }
    .hav-dash > .row:last-child { margin-bottom: 0; }
    .hav-dash .card { border-radius: .75rem; border: 1px solid var(--vz-border-color); box-shadow: 0 1px 2px rgba(16,24,40,.04); }
    .hav-dash .card-title { text-transform: uppercase; letter-spacing: .5px; font-size: .75rem; font-weight: 600; }
    .hav-dash h3, .hav-dash h4, .hav-dash .tabular { font-variant-numeric: tabular-nums; font-feature-settings: "tnum"; }
    .hav-dash .kpi-tile { border: none; overflow: hidden; position: relative; }
    .hav-dash .kpi-tile .text-white-50 { color: rgba(255,255,255,.88) !important; }
    .hav-dash .kpi-tile .kpi-icon { width: 42px; height: 42px; border-radius: 12px; background: rgba(255,255,255,.2); display: flex; align-items: center; justify-content: center; font-size: 20px; color: #fff; }
    .hav-dash .kpi-tile .kpi-watermark { position: absolute; right: -14px; bottom: -26px; font-size: 96px; line-height: 1; color: #fff; opacity: .1; pointer-events: none; }
    .hav-dash table thead th { text-transform: uppercase; letter-spacing: .4px; font-size: .6875rem; font-weight: 600; color: var(--vz-secondary-color, var(--vz-body-color)); border-bottom: 1px solid var(--vz-border-color); background: transparent; }
    .hav-dash table tbody td { border-bottom: 1px dashed var(--vz-border-color); }
    /* Clean, aligned key/value list (no dashed boxes) */
    .hav-dash .hav-meta-row {
        display: flex; align-items: baseline; justify-content: space-between; gap: 1rem;
        padding: .6rem 0; border-bottom: 1px solid var(--vz-border-color);
    }
    .hav-dash .hav-meta-row:last-child { border-bottom: 0; }
    .hav-dash .hav-meta-row .k {
        flex: 0 0 auto; font-size: .72rem; text-transform: uppercase; letter-spacing: .4px;
        color: var(--vz-secondary-color, var(--vz-body-color));
    }
    .hav-dash .hav-meta-row .v { text-align: right; font-weight: 500; word-break: break-word; min-width: 0; }
    .hav-dash .hav-halt {
        color: var(--vz-danger); background: var(--vz-danger-bg-subtle);
        border-radius: .375rem; padding: .5rem .65rem;
    }
</style>

<input type="hidden" id="hav-iface-code" value="<?= isset($interface_code) ? htmlspecialchars($interface_code, ENT_QUOTES) : '' ?>">

<div class="main-content">
    <div class="page-content">
        <div class="container-fluid hav-dash">

            <!-- ================= Page header ================= -->
            <div class="row">
                <div class="col-12">
                    <nav aria-label="breadcrumb" class="mb-1">
                        <ol class="breadcrumb mb-0 fs-13">
                            <li class="breadcrumb-item"><a href="<?= base_url('havering/dashboard'); ?>">Havering Integration</a></li>
                            <li class="breadcrumb-item active" aria-current="page" id="hav-crumb">Interface</li>
                        </ol>
                    </nav>
                    <div class="d-flex flex-wrap align-items-center justify-content-between gap-2">
                        <div>
                            <h4 class="mb-1" id="hav-iface-name">Loading…</h4>
                            <p class="text-muted mb-0 fs-13" id="hav-iface-sub">&mdash;</p>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <span id="hav-iface-action"></span>
                            <a href="<?= base_url('havering/dashboard'); ?>" class="btn btn-sm btn-soft-secondary">
                                <i class="ri-arrow-left-line align-middle"></i> Back
                            </a>
                            <button type="button" class="btn btn-sm btn-soft-primary" id="hav-refresh">
                                <i class="ri-refresh-line align-middle"></i> Refresh
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ================= KPI tiles ================= -->
            <div class="row">
                <div class="col-xl col-lg-4 col-md-6">
                    <div class="card kpi-tile h-100 bg-primary bg-gradient">
                        <div class="card-body">
                            <i class="ri-database-2-line kpi-watermark"></i>
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1 overflow-hidden">
                                    <p class="text-uppercase fw-semibold text-white-50 text-truncate mb-2 fs-11">Records total</p>
                                    <h3 class="text-white mb-0" id="k-total">0</h3>
                                </div>
                                <div class="flex-shrink-0"><div class="kpi-icon"><i class="ri-database-2-line"></i></div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl col-lg-4 col-md-6">
                    <div class="card kpi-tile h-100 bg-success bg-gradient">
                        <div class="card-body">
                            <i class="ri-checkbox-circle-line kpi-watermark"></i>
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1 overflow-hidden">
                                    <p class="text-uppercase fw-semibold text-white-50 text-truncate mb-2 fs-11">Processed so far</p>
                                    <h3 class="text-white mb-0" id="k-processed">0</h3>
                                </div>
                                <div class="flex-shrink-0"><div class="kpi-icon"><i class="ri-checkbox-circle-line"></i></div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl col-lg-4 col-md-6">
                    <div class="card kpi-tile h-100 bg-warning bg-gradient">
                        <div class="card-body">
                            <i class="ri-time-line kpi-watermark"></i>
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1 overflow-hidden">
                                    <p class="text-uppercase fw-semibold text-white-50 text-truncate mb-2 fs-11">Pending</p>
                                    <h3 class="text-white mb-0" id="k-pending">0</h3>
                                </div>
                                <div class="flex-shrink-0"><div class="kpi-icon"><i class="ri-time-line"></i></div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl col-lg-6 col-md-6">
                    <div class="card kpi-tile h-100 bg-danger bg-gradient">
                        <div class="card-body">
                            <i class="ri-error-warning-line kpi-watermark"></i>
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1 overflow-hidden">
                                    <p class="text-uppercase fw-semibold text-white-50 text-truncate mb-2 fs-11">Failed / needs action</p>
                                    <h3 class="text-white mb-0" id="k-failed">0</h3>
                                </div>
                                <div class="flex-shrink-0"><div class="kpi-icon"><i class="ri-error-warning-line"></i></div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl col-lg-6 col-md-6">
                    <div class="card kpi-tile h-100 bg-info bg-gradient">
                        <div class="card-body">
                            <i class="ri-file-list-3-line kpi-watermark"></i>
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1 overflow-hidden">
                                    <p class="text-uppercase fw-semibold text-white-50 text-truncate mb-2 fs-11">Files handled</p>
                                    <h3 class="text-white mb-0" id="k-files">0</h3>
                                </div>
                                <div class="flex-shrink-0"><div class="kpi-icon"><i class="ri-file-list-3-line"></i></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ================= Meta + file history ================= -->
            <div class="row">
                <div class="col-xl-3">
                    <div class="card h-100">
                        <div class="card-header"><h4 class="card-title mb-0">About this interface</h4></div>
                        <div class="card-body" id="hav-meta">
                            <div class="text-muted fs-13 py-3">Loading…</div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-9">
                    <div class="card h-100">
                        <div class="card-header d-flex align-items-center flex-wrap gap-2">
                            <h4 class="card-title mb-0 flex-grow-1">Files processed &mdash; full history</h4>
                            <span class="text-muted fs-12" id="hav-files-count">&mdash;</span>
                        </div>
                        <div class="card-body">
                            <!-- Filters: find a file by name, status or processed date -->
                            <div class="row g-2 align-items-end mb-3">
                                <div class="col-md-4">
                                    <label class="form-label fs-12 mb-1" for="f-q">File name</label>
                                    <div class="input-group input-group-sm">
                                        <span class="input-group-text"><i class="ri-search-line"></i></span>
                                        <input type="text" class="form-control" id="f-q" placeholder="Search by file name…" autocomplete="off">
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <label class="form-label fs-12 mb-1" for="f-status">Status</label>
                                    <select class="form-select form-select-sm" id="f-status">
                                        <option value="">Any status</option>
                                        <option value="received">Received</option>
                                        <option value="parsed">Parsed</option>
                                        <option value="built">Built</option>
                                        <option value="sent">Sent</option>
                                        <option value="partial">Partial</option>
                                        <option value="held">Held</option>
                                        <option value="failed">Failed</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>
                                <div class="col-md-2">
                                    <label class="form-label fs-12 mb-1" for="f-from">From</label>
                                    <input type="date" class="form-control form-control-sm" id="f-from">
                                </div>
                                <div class="col-md-2">
                                    <label class="form-label fs-12 mb-1" for="f-to">To</label>
                                    <input type="date" class="form-control form-control-sm" id="f-to">
                                </div>
                                <div class="col-md-1 d-grid">
                                    <button type="button" class="btn btn-sm btn-soft-secondary" id="f-clear" title="Clear filters"><i class="ri-close-line"></i></button>
                                </div>
                            </div>

                            <div class="table-responsive">
                                <table class="table table-nowrap align-middle mb-0">
                                    <thead class="text-muted">
                                        <tr>
                                            <th scope="col">File</th>
                                            <th scope="col">Processed</th>
                                            <th scope="col" class="text-end">Rows</th>
                                            <th scope="col" class="text-end">OK</th>
                                            <th scope="col" class="text-end">Errors</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Message</th>
                                        </tr>
                                    </thead>
                                    <tbody id="hav-files-rows">
                                        <tr><td colspan="7" class="text-center text-muted py-4">Loading&hellip;</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

<script src="<?= cnd_url(); ?>assets/js/app/havering-interface.js"></script>
