<!-- ============================================================== -->
<!-- Havering — standard job code mapping (AJS service -> OH code) -->
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
    .hav-dash table tbody td { border-bottom: 1px dashed var(--vz-border-color); vertical-align: middle; }
    .hav-dash table tbody tr:last-child td { border-bottom: none; }
    .hav-dash code.oh { background: var(--vz-light); border: 1px solid var(--vz-border-color); border-radius: 5px; padding: 1px 7px; font-size: .8125rem; }
    .hav-dash tr.is-unmapped { background: var(--vz-warning-bg-subtle); }
    .hav-dash tr.row-saving { opacity: .55; }
    .hav-dash .svc-select { min-width: 240px; }
    .hav-dash .save-flash { color: var(--vz-success); font-size: 1.05rem; }
</style>

<div class="main-content">
    <div class="page-content">
        <div class="container-fluid hav-dash">

            <!-- ================= Page header ================= -->
            <div class="row">
                <div class="col-12">
                    <nav aria-label="breadcrumb" class="mb-1">
                        <ol class="breadcrumb mb-0 fs-13">
                            <li class="breadcrumb-item"><a href="<?= base_url('havering/dashboard'); ?>">Havering Integration</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Standard job codes</li>
                        </ol>
                    </nav>
                    <div class="d-flex flex-wrap align-items-center justify-content-between gap-2">
                        <div>
                            <h4 class="mb-1">Standard job code mapping</h4>
                            <p class="text-muted mb-0 fs-13">
                                Link each AJS service to the Open Housing standard job code the
                                <strong>Log Job</strong> interface should send. One service &rarr; one code.
                            </p>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <a href="<?= base_url('havering/dashboard'); ?>" class="btn btn-sm btn-soft-secondary">
                                <i class="ri-arrow-left-line align-middle"></i> Back
                            </a>
                            <button type="button" class="btn btn-sm btn-soft-primary" id="hav-cm-refresh">
                                <i class="ri-refresh-line align-middle"></i> Refresh
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ================= KPI tiles ================= -->
            <div class="row">
                <div class="col-xl-4 col-md-4">
                    <div class="card kpi-tile h-100 bg-primary bg-gradient">
                        <div class="card-body">
                            <i class="ri-list-check-2 kpi-watermark"></i>
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1 overflow-hidden">
                                    <p class="text-uppercase fw-semibold text-white-50 text-truncate mb-2 fs-11">Standard job codes</p>
                                    <h3 class="text-white mb-0" id="cm-total">0</h3>
                                </div>
                                <div class="flex-shrink-0"><div class="kpi-icon"><i class="ri-list-check-2"></i></div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 col-md-4">
                    <div class="card kpi-tile h-100 bg-success bg-gradient">
                        <div class="card-body">
                            <i class="ri-links-line kpi-watermark"></i>
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1 overflow-hidden">
                                    <p class="text-uppercase fw-semibold text-white-50 text-truncate mb-2 fs-11">Mapped</p>
                                    <h3 class="text-white mb-0" id="cm-mapped">0</h3>
                                </div>
                                <div class="flex-shrink-0"><div class="kpi-icon"><i class="ri-links-line"></i></div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 col-md-4">
                    <div class="card kpi-tile h-100 bg-warning bg-gradient">
                        <div class="card-body">
                            <i class="ri-link-unlink kpi-watermark"></i>
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1 overflow-hidden">
                                    <p class="text-uppercase fw-semibold text-white-50 text-truncate mb-2 fs-11">Still to map</p>
                                    <h3 class="text-white mb-0" id="cm-unmapped">0</h3>
                                </div>
                                <div class="flex-shrink-0"><div class="kpi-icon"><i class="ri-link-unlink"></i></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ================= Mapping table ================= -->
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header d-flex align-items-center flex-wrap gap-2">
                            <h4 class="card-title mb-0 flex-grow-1">Open Housing standard job codes</h4>
                            <span class="text-muted fs-12" id="cm-count">&mdash;</span>
                        </div>
                        <div class="card-body">
                            <!-- Filters -->
                            <div class="row g-2 align-items-end mb-3">
                                <div class="col-md-4">
                                    <label class="form-label fs-12 mb-1" for="cm-q">Search</label>
                                    <div class="input-group input-group-sm">
                                        <span class="input-group-text"><i class="ri-search-line"></i></span>
                                        <input type="text" class="form-control" id="cm-q" placeholder="Code, description or service…" autocomplete="off">
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <label class="form-label fs-12 mb-1" for="cm-contract">Contract</label>
                                    <select class="form-select form-select-sm" id="cm-contract">
                                        <option value="">All contracts</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label class="form-label fs-12 mb-1" for="cm-state">Status</label>
                                    <select class="form-select form-select-sm" id="cm-state">
                                        <option value="">All</option>
                                        <option value="unmapped">Unmapped only</option>
                                        <option value="mapped">Mapped only</option>
                                    </select>
                                </div>
                                <div class="col-md-2 d-grid">
                                    <button type="button" class="btn btn-sm btn-soft-secondary" id="cm-clear" title="Clear filters">
                                        <i class="ri-close-line"></i> Clear
                                    </button>
                                </div>
                            </div>

                            <div class="table-responsive">
                                <table class="table table-nowrap align-middle mb-0">
                                    <thead class="text-muted">
                                        <tr>
                                            <th scope="col">Contract</th>
                                            <th scope="col">OH standard job code</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">AJS service</th>
                                            <th scope="col" class="text-center" style="width:46px;"></th>
                                        </tr>
                                    </thead>
                                    <tbody id="cm-rows">
                                        <tr><td colspan="5" class="text-center text-muted py-4">Loading&hellip;</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p class="text-muted fs-12 mt-3 mb-0">
                                <i class="ri-information-line align-middle"></i>
                                Changes save as soon as you pick a service &mdash; the next Log Job for that
                                service will use the mapped code. Set a row back to <em>&mdash; not mapped &mdash;</em> to clear it.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

<script src="<?= cnd_url(); ?>assets/js/app/havering-code-mappings.js"></script>
