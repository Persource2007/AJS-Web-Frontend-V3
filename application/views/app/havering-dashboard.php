<!-- ============================================================== -->
<!-- Havering ⇄ Open Housing — integration monitoring dashboard -->
<!-- ============================================================== -->
<style>
    /* Scoped to the Havering dashboard — uses theme tokens so light/dark both work. */
    .hav-dash { padding-bottom: 1.5rem; }
    .hav-dash > .row {
        --bs-gutter-x: 1.25rem;
        --bs-gutter-y: 1.25rem;
        margin-bottom: 1.25rem;
    }
    .hav-dash > .row:last-child { margin-bottom: 0; }
    .hav-dash .card {
        border-radius: .75rem;
        border: 1px solid var(--vz-border-color);
        box-shadow: 0 1px 2px rgba(16, 24, 40, .04);
    }
    .hav-dash .card-title {
        text-transform: uppercase;
        letter-spacing: .5px;
        font-size: .75rem;
        font-weight: 600;
    }
    .hav-dash h3, .hav-dash h4, .hav-dash .tabular {
        font-variant-numeric: tabular-nums;
        font-feature-settings: "tnum";
    }

    /* ── Coloured KPI tiles ─────────────────────────────────────── */
    .hav-dash .kpi-tile { border: none; overflow: hidden; position: relative; }
    .hav-dash .kpi-tile .text-white-50 { color: rgba(255,255,255,.88) !important; }
    .hav-dash .kpi-tile .kpi-icon {
        width: 44px; height: 44px; border-radius: 12px;
        background: rgba(255,255,255,.2);
        display: flex; align-items: center; justify-content: center;
        font-size: 21px; color: #fff;
    }
    .hav-dash .kpi-tile .kpi-watermark {
        position: absolute; right: -14px; bottom: -26px;
        font-size: 104px; line-height: 1; color: #fff; opacity: .1; pointer-events: none;
    }
    .hav-dash .kpi-tile .kpi-value { letter-spacing: -.5px; }

    /* ── Interface table ────────────────────────────────────────── */
    .hav-dash .hav-iface-table tbody tr { transition: background .15s ease; }
    .hav-dash .hav-iface-table tbody tr:hover { background: var(--vz-light); }
    .hav-dash .hav-iface-table .iface-ico {
        width: 34px; height: 34px; border-radius: 9px; flex: 0 0 auto;
        display: inline-flex; align-items: center; justify-content: center; font-size: 17px;
    }

    /* ── Tables ─────────────────────────────────────────────────── */
    .hav-dash table thead th {
        text-transform: uppercase; letter-spacing: .4px;
        font-size: .6875rem; font-weight: 600;
        color: var(--vz-secondary-color, var(--vz-body-color));
        border-bottom: 1px solid var(--vz-border-color); background: transparent;
    }
    .hav-dash table tbody td { border-bottom: 1px dashed var(--vz-border-color); }
    .hav-dash table tbody tr:last-child td { border-bottom: none; }

    .hav-dash > .row { animation: havFadeUp .4s ease both; }
    .hav-dash > .row:nth-child(2) { animation-delay: .04s; }
    .hav-dash > .row:nth-child(3) { animation-delay: .08s; }
    .hav-dash > .row:nth-child(4) { animation-delay: .12s; }
    @keyframes havFadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
    @media (prefers-reduced-motion: reduce) {
        .hav-dash > .row, .hav-dash .hav-iface-table tbody tr { animation: none; transition: none; }
    }
</style>

<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">

            <!-- ============================================================== -->
            <!-- Interface tabs                                                 -->
            <!--   Havering Interface · the existing dashboard, unchanged       -->
            <!--   Other Interface    · per-client SFTP delivery folders        -->
            <!--                                                                -->
            <!-- .hav-dash sits on an inner wrapper rather than on              -->
            <!-- .container-fluid so the dashboard's rows remain DIRECT         -->
            <!-- children of .hav-dash - every `.hav-dash > .row` rule (gutters,-->
            <!-- margins, the fade-up animation and its nth-child delays) keeps  -->
            <!-- matching exactly as before, with no CSS change. The new tab     -->
            <!-- reuses the same wrapper, so it inherits the same card, table    -->
            <!-- and spacing treatment for free.                                -->
            <!-- ============================================================== -->
            <!-- Each tab carries its own role module, so one can be granted without the
                 other. The tab AND its pane are marked: ajs.apply_permissions() removes
                 the element outright, and dropping only the link would leave the pane in
                 the DOM still showing its content. The pass, and re-activating whichever
                 tab survives, is done by other-interface.js. -->
            <ul class="nav nav-tabs mb-3" id="iface-tabs" role="tablist">
                <li class="nav-item check-permission" data-module="Havering Integration" data-action="view">
                    <a class="nav-link active" data-bs-toggle="tab" href="#iface-tab-havering" role="tab">
                        <i class="ri-exchange-line align-middle me-1"></i>Havering Interface
                    </a>
                </li>
                <li class="nav-item check-permission" data-module="Other Interface" data-action="view">
                    <a class="nav-link" data-bs-toggle="tab" href="#iface-tab-other" role="tab">
                        <i class="ri-folders-line align-middle me-1"></i>Other Interface
                    </a>
                </li>
            </ul>

            <div class="tab-content">

            <!-- ---------- Havering Interface tab ---------- -->
            <div class="tab-pane active check-permission" id="iface-tab-havering" role="tabpanel"
                 data-module="Havering Integration" data-action="view">
            <div class="hav-dash">

            <!-- ================= Page header ================= -->
            <div class="row">
                <div class="col-12">
                    <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-1">
                        <div>
                            <h4 class="mb-1">Havering &nbsp;&#8644;&nbsp; Open Housing Integration</h4>
                            <p class="text-muted mb-0 fs-13">
                                Live health of every data flow between AJS and the London Borough of Havering.
                                <span class="text-muted fs-12" id="hav-synced">&mdash;</span>
                            </p>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <span class="badge bg-success-subtle text-success py-2 px-3" id="hav-env">
                                <i class="ri-checkbox-blank-circle-fill align-middle me-1" style="font-size:8px;"></i> LIVE
                            </span>
                            <a href="<?= base_url('havering/code-mappings'); ?>" class="btn btn-sm btn-soft-secondary">
                                <i class="ri-links-line align-middle"></i> Standard job codes
                            </a>
                            <button type="button" class="btn btn-sm btn-soft-secondary" data-bs-toggle="offcanvas" data-bs-target="#hav-panel">
                                <i class="ri-folders-line align-middle"></i> SFTP &amp; settings
                            </button>
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
                    <div class="card kpi-tile h-100 bg-success bg-gradient">
                        <div class="card-body">
                            <i class="ri-pulse-line kpi-watermark"></i>
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1 overflow-hidden">
                                    <p class="text-uppercase fw-semibold text-white-50 text-truncate mb-2 fs-11">Interfaces healthy</p>
                                    <h3 class="text-white mb-0 kpi-value"><span id="kpi-healthy">0</span><small class="text-white-50 fs-14"> / <span id="kpi-total">0</span></small></h3>
                                </div>
                                <div class="flex-shrink-0"><div class="kpi-icon"><i class="ri-heart-pulse-line"></i></div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl col-lg-4 col-md-6">
                    <div class="card kpi-tile h-100 bg-primary bg-gradient">
                        <div class="card-body">
                            <i class="ri-database-2-line kpi-watermark"></i>
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1 overflow-hidden">
                                    <p class="text-uppercase fw-semibold text-white-50 text-truncate mb-2 fs-11">Processed so far</p>
                                    <h3 class="text-white mb-0 kpi-value"><span id="kpi-processed-total">0</span></h3>
                                    <p class="text-white-50 mb-0 mt-1 fs-11"><span id="kpi-files-total">0</span> files handled</p>
                                </div>
                                <div class="flex-shrink-0"><div class="kpi-icon"><i class="ri-database-2-line"></i></div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl col-lg-4 col-md-6">
                    <div class="card kpi-tile h-100 bg-info bg-gradient">
                        <div class="card-body">
                            <i class="ri-exchange-line kpi-watermark"></i>
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1 overflow-hidden">
                                    <p class="text-uppercase fw-semibold text-white-50 text-truncate mb-2 fs-11">Processed today</p>
                                    <h3 class="text-white mb-0 kpi-value"><span id="kpi-in">0</span><small class="text-white-50 fs-14"> in &middot; <span id="kpi-out">0</span> out</small></h3>
                                </div>
                                <div class="flex-shrink-0"><div class="kpi-icon"><i class="ri-exchange-line"></i></div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl col-lg-6 col-md-6">
                    <div class="card kpi-tile h-100 bg-warning bg-gradient">
                        <div class="card-body">
                            <i class="ri-time-line kpi-watermark"></i>
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1 overflow-hidden">
                                    <p class="text-uppercase fw-semibold text-white-50 text-truncate mb-2 fs-11">Pending in queue</p>
                                    <h3 class="text-white mb-0 kpi-value" id="kpi-pending">0</h3>
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
                                    <p class="text-uppercase fw-semibold text-white-50 text-truncate mb-2 fs-11">Failed &middot; needs action</p>
                                    <h3 class="text-white mb-0 kpi-value" id="kpi-failed">0</h3>
                                </div>
                                <div class="flex-shrink-0"><div class="kpi-icon"><i class="ri-error-warning-line"></i></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ============ Claim & Post-Inspection Tracker (LBH) ============ -->
            <style>
                .hav-claim-tile { cursor: pointer; transition: box-shadow .15s ease, transform .15s ease; }
                .hav-claim-tile:hover { transform: translateY(-3px); box-shadow: 0 10px 22px rgba(15,20,26,.18); }
                .hav-claim-tile .kpi-status { min-height: 2.4em; }
            </style>
            <div class="d-flex align-items-center mb-2 mt-1">
                <h5 class="mb-0 flex-grow-1">Claim &amp; Post-Inspection Tracker <span class="text-muted fs-13 fw-normal">(LBH)</span></h5>
                <span class="text-muted fs-12">Click a status to list the jobs</span>
            </div>
            <div class="row">
                <div class="col-xl col-lg-4 col-md-6">
                    <div class="card kpi-tile h-100 bg-info bg-gradient hav-claim-tile" role="button" data-claim-status="awaiting">
                        <div class="card-body">
                            <i class="ri-search-eye-line kpi-watermark"></i>
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1 overflow-hidden">
                                    <p class="text-white-50 fw-semibold mb-2 fs-11 kpi-status">Awaiting Post-Inspection</p>
                                    <h3 class="text-white mb-0 kpi-value" id="claim-awaiting">0</h3>
                                </div>
                                <div class="flex-shrink-0"><div class="kpi-icon"><i class="ri-search-eye-line"></i></div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl col-lg-4 col-md-6">
                    <div class="card kpi-tile h-100 bg-primary bg-gradient hav-claim-tile" role="button" data-claim-status="approved">
                        <div class="card-body">
                            <i class="ri-checkbox-circle-line kpi-watermark"></i>
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1 overflow-hidden">
                                    <p class="text-white-50 fw-semibold mb-2 fs-11 kpi-status">Post-Inspection Passed &mdash; Ready to Claim</p>
                                    <h3 class="text-white mb-0 kpi-value" id="claim-approved">0</h3>
                                </div>
                                <div class="flex-shrink-0"><div class="kpi-icon"><i class="ri-checkbox-circle-line"></i></div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl col-lg-4 col-md-6">
                    <div class="card kpi-tile h-100 bg-warning bg-gradient hav-claim-tile" role="button" data-claim-status="claim_sent">
                        <div class="card-body">
                            <i class="ri-send-plane-line kpi-watermark"></i>
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1 overflow-hidden">
                                    <p class="text-white-50 fw-semibold mb-2 fs-11 kpi-status">Claim Sent &mdash; Awaiting Approval</p>
                                    <h3 class="text-white mb-0 kpi-value" id="claim-claim_sent">0</h3>
                                </div>
                                <div class="flex-shrink-0"><div class="kpi-icon"><i class="ri-send-plane-line"></i></div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl col-lg-6 col-md-6">
                    <div class="card kpi-tile h-100 bg-success bg-gradient hav-claim-tile" role="button" data-claim-status="claimed">
                        <div class="card-body">
                            <i class="ri-medal-line kpi-watermark"></i>
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1 overflow-hidden">
                                    <p class="text-white-50 fw-semibold mb-2 fs-11 kpi-status">Claim Approved &mdash; Fully Completed</p>
                                    <h3 class="text-white mb-0 kpi-value" id="claim-claimed">0</h3>
                                </div>
                                <div class="flex-shrink-0"><div class="kpi-icon"><i class="ri-medal-line"></i></div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl col-lg-6 col-md-6">
                    <div class="card kpi-tile h-100 bg-danger bg-gradient hav-claim-tile" role="button" data-claim-status="failed">
                        <div class="card-body">
                            <i class="ri-close-circle-line kpi-watermark"></i>
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1 overflow-hidden">
                                    <p class="text-white-50 fw-semibold mb-2 fs-11 kpi-status">Post-Inspection Failed</p>
                                    <h3 class="text-white mb-0 kpi-value" id="claim-failed">0</h3>
                                </div>
                                <div class="flex-shrink-0"><div class="kpi-icon"><i class="ri-close-circle-line"></i></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ================= Interfaces (full-width table) ================= -->
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header d-flex align-items-center">
                            <h4 class="card-title mb-0 flex-grow-1">Interfaces</h4>
                            <span class="text-muted fs-12" id="hav-iface-count">&mdash;</span>
                        </div>
                        <div class="card-body p-0">
                            <div class="table-responsive">
                                <table class="table align-middle table-hover mb-0 hav-iface-table">
                                    <thead class="text-muted">
                                        <tr>
                                            <th class="ps-3">Interface</th>
                                            <th>Direction</th>
                                            <th>Transport</th>
                                            <th>Schedule</th>
                                            <th>Status</th>
                                            <th class="text-end">Processed</th>
                                            <th class="text-end">Pending</th>
                                            <th class="text-end">Failed</th>
                                            <th class="text-end">Today</th>
                                            <th>Last run</th>
                                            <th class="text-end pe-3">&nbsp;</th>
                                        </tr>
                                    </thead>
                                    <tbody id="hav-iface-rows">
                                        <tr><td colspan="11" class="text-center text-muted py-4">Loading&hellip;</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ================= Needs attention + recent alerts ================= -->
            <div class="row">
                <div class="col-xl-5">
                    <div class="card h-100">
                        <div class="card-header d-flex align-items-center">
                            <h4 class="card-title mb-0 flex-grow-1">Needs attention</h4>
                            <button type="button" class="btn btn-sm btn-soft-danger me-2 d-none" id="hav-err-clear-all">
                                <i class="ri-delete-bin-line align-middle"></i> Clear all
                            </button>
                            <span class="badge bg-danger-subtle text-danger" id="hav-err-count">0</span>
                        </div>
                        <div class="card-body p-0">
                            <div id="hav-errors" style="max-height: 460px; overflow-y: auto;">
                                <div class="text-center text-muted py-4">Loading&hellip;</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-7">
                    <div class="card h-100">
                        <div class="card-header d-flex align-items-center">
                            <h4 class="card-title mb-0 flex-grow-1">Recent alert emails</h4>
                            <span class="text-muted fs-12">Who was told, and when</span>
                        </div>
                        <div class="card-body p-0">
                            <div class="table-responsive" style="max-height: 460px; overflow-y:auto;">
                                <table class="table table-nowrap align-middle mb-0">
                                    <thead class="text-muted">
                                        <tr>
                                            <th scope="col">Sent</th>
                                            <th scope="col">Interface</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Recipients</th>
                                            <th scope="col" class="text-end">Records</th>
                                            <th scope="col">Delivered</th>
                                        </tr>
                                    </thead>
                                    <tbody id="hav-alert-rows">
                                        <tr><td colspan="6" class="text-center text-muted py-4">Loading&hellip;</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            </div><!-- /.hav-dash -->
            </div><!-- /#iface-tab-havering -->

            <!-- ---------- Other Interface tab ---------- -->
            <div class="tab-pane check-permission" id="iface-tab-other" role="tabpanel"
                 data-module="Other Interface" data-action="view">
                <div class="hav-dash">
                    <?php $this->load->view('app/other-interface'); ?>
                </div>
            </div>

            </div><!-- /.tab-content -->

        </div>
    </div>
</div>

<!-- ============================================================== -->
<!-- Havering management side panel (offcanvas)                     -->
<!--   Folders  · live SFTP folders + filter/download/delete        -->
<!--   Upload   · hand a corrected file to an interface             -->
<!--   Alert recipients · who gets told, and the failure settings   -->
<!--   Open Housing API · connection + test requests                -->
<!-- ============================================================== -->
<div class="offcanvas offcanvas-end" tabindex="-1" id="hav-panel" aria-labelledby="hav-panel-title" style="width: 720px; max-width: 96vw;">
    <div class="offcanvas-header border-bottom">
        <h5 class="offcanvas-title" id="hav-panel-title">Havering &mdash; SFTP &amp; settings</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">

        <ul class="nav nav-tabs mb-3" role="tablist">
            <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" href="#hav-tab-folders" role="tab">
                <i class="ri-folders-line align-middle me-1"></i>Folders</a></li>
            <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#hav-tab-upload" role="tab">
                <i class="ri-upload-2-line align-middle me-1"></i>Upload</a></li>
            <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#hav-tab-recipients" role="tab">
                <i class="ri-mail-settings-line align-middle me-1"></i>Alert recipients</a></li>
            <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#hav-tab-api" role="tab">
                <i class="ri-plug-line align-middle me-1"></i>Open Housing API</a></li>
        </ul>

        <div class="tab-content">

            <!-- ---------- Folders tab ---------- -->
            <div class="tab-pane active" id="hav-tab-folders" role="tabpanel">
                <div class="d-flex align-items-center flex-wrap gap-2 mb-2">
                    <div class="btn-group btn-group-sm" role="group" id="hav-folder-toggle">
                        <button type="button" class="btn btn-outline-primary active" data-folder="inbound">Inbound <span class="badge bg-light text-body ms-1" id="cnt-inbound">0</span></button>
                        <button type="button" class="btn btn-outline-primary" data-folder="processed">Processed <span class="badge bg-light text-body ms-1" id="cnt-processed">0</span></button>
                        <button type="button" class="btn btn-outline-primary" data-folder="outbound">Outbound <span class="badge bg-light text-body ms-1" id="cnt-outbound">0</span></button>
                        <button type="button" class="btn btn-outline-primary" data-folder="errors">Errors <span class="badge bg-light text-body ms-1" id="cnt-errors">0</span></button>
                    </div>
                    <button type="button" class="btn btn-sm btn-soft-primary ms-auto" id="hav-folders-refresh">
                        <i class="ri-refresh-line align-middle"></i> Refresh
                    </button>
                </div>

                <!-- File filter: find a file by name in the current folder -->
                <div class="input-group input-group-sm mb-2">
                    <span class="input-group-text"><i class="ri-search-line"></i></span>
                    <input type="text" class="form-control" id="hav-folder-filter" placeholder="Filter files in this folder by name…" autocomplete="off">
                    <button class="btn btn-outline-secondary" type="button" id="hav-folder-filter-clear" title="Clear filter"><i class="ri-close-line"></i></button>
                </div>

                <p class="text-muted fs-12 mb-2" id="hav-folder-hint"></p>

                <div class="d-flex align-items-center mb-2 flex-wrap gap-2">
                    <div class="form-check mb-0">
                        <input class="form-check-input" type="checkbox" id="hav-select-all">
                        <label class="form-check-label fs-13" for="hav-select-all">Select all</label>
                    </div>
                    <span class="text-muted fs-12 ms-2" id="hav-folder-shown"></span>

                    <div class="ms-auto d-flex align-items-center gap-2 flex-wrap">
                        <label class="btn btn-sm btn-soft-secondary mb-0" title="Upload a file straight into this folder">
                            <i class="ri-upload-2-line align-middle"></i> Upload here
                            <input type="file" id="hav-folder-upload" hidden>
                        </label>
                        <div class="input-group input-group-sm" style="width:auto;">
                            <select class="form-select form-select-sm" id="hav-move-target" style="max-width:150px;">
                                <option value="">Move to&hellip;</option>
                                <option value="inbound">inbound</option>
                                <option value="processed">processed</option>
                                <option value="outbound">outbound</option>
                                <option value="errors">errors</option>
                            </select>
                            <button type="button" class="btn btn-sm btn-soft-primary" id="hav-move-selected" disabled>
                                <i class="ri-folder-transfer-line align-middle"></i> Move<span class="cnt-move"></span>
                            </button>
                        </div>
                        <button type="button" class="btn btn-sm btn-soft-danger" id="hav-delete-selected" disabled>
                            <i class="ri-delete-bin-line align-middle"></i> Delete<span class="cnt"></span>
                        </button>
                    </div>
                </div>

                <div id="hav-folders-body">
                    <div class="text-center text-muted py-4">Loading&hellip;</div>
                </div>
            </div>

            <!-- ---------- Upload tab ---------- -->
            <div class="tab-pane" id="hav-tab-upload" role="tabpanel">
                <p class="text-muted fs-13">
                    Drops the file into the interface's inbox and processes it straight away,
                    exactly as a scheduled SFTP collection would. Use this to load a corrected
                    file Havering have resent.
                </p>
                <div class="mb-3">
                    <label class="form-label" for="hav-upload-iface">Interface</label>
                    <select class="form-select" id="hav-upload-iface">
                        <option value="location_extract">Location extract (.xml)</option>
                        <option value="job_stage_export">Job stage export (.csv)</option>
                        <option value="certificate">Certificate (.csv)</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label" for="hav-upload-file">File</label>
                    <input type="file" class="form-control" id="hav-upload-file" accept=".xml,.csv">
                    <div class="form-text">Maximum 32 MB.</div>
                </div>
                <div id="hav-upload-result" class="mb-3"></div>
                <button type="button" class="btn btn-primary" id="hav-upload-go">
                    <i class="ri-upload-2-line align-middle"></i> Upload and process
                </button>
            </div>

            <!-- ---------- Alert recipients tab ---------- -->
            <div class="tab-pane" id="hav-tab-recipients" role="tabpanel">
                <p class="text-muted fs-13">
                    These people are emailed when a Havering file has records we cannot use, or
                    when a file has to be rejected outright. One summary email is sent per file —
                    never one per record.
                </p>

                <div class="border rounded p-3 mb-3">
                    <div class="form-check form-switch mb-2">
                        <input class="form-check-input hav-setting" type="checkbox" id="set-notify_enabled" data-key="notify_enabled">
                        <label class="form-check-label" for="set-notify_enabled">
                            Send failure emails
                            <span class="text-muted fs-12 d-block">Turn off to silence all Havering alerts.</span>
                        </label>
                    </div>
                    <div class="form-check form-switch mb-2">
                        <input class="form-check-input hav-setting" type="checkbox" id="set-notify_single_list" data-key="notify_single_list">
                        <label class="form-check-label" for="set-notify_single_list">
                            Use one recipient list for every interface
                            <span class="text-muted fs-12 d-block">When off, you can also add extra people to a single flow.</span>
                        </label>
                    </div>
                    <div class="form-check form-switch mb-3">
                        <input class="form-check-input hav-setting" type="checkbox" id="set-auto_pause" data-key="auto_pause">
                        <label class="form-check-label" for="set-auto_pause">
                            Pause an interface when its file is rejected
                            <span class="text-muted fs-12 d-block">Only the failing flow stops; the other interfaces keep running.</span>
                        </label>
                    </div>
                    <div class="row g-2">
                        <div class="col-sm-6">
                            <label class="form-label fs-13" for="set-reject_threshold_pct">Reject a file when more than &hellip; % of records are bad</label>
                            <input type="number" min="0" max="100" class="form-control form-control-sm hav-setting"
                                   id="set-reject_threshold_pct" data-key="reject_threshold_pct">
                        </div>
                        <div class="col-sm-6">
                            <label class="form-label fs-13" for="set-reject_threshold_rows">&hellip; or more than this many records (0 = no limit)</label>
                            <input type="number" min="0" class="form-control form-control-sm hav-setting"
                                   id="set-reject_threshold_rows" data-key="reject_threshold_rows">
                        </div>
                    </div>
                </div>

                <div class="row g-2 align-items-end mb-3">
                    <div class="col-md-5">
                        <label class="form-label fs-13" for="rcpt-email">Email address</label>
                        <input type="email" class="form-control form-control-sm" id="rcpt-email" placeholder="name@example.com">
                    </div>
                    <div class="col-md-3">
                        <label class="form-label fs-13" for="rcpt-type">Send as</label>
                        <select class="form-select form-select-sm" id="rcpt-type">
                            <option value="to">TO</option>
                            <option value="cc">CC</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label fs-13" for="rcpt-iface">Applies to</label>
                        <select class="form-select form-select-sm" id="rcpt-iface">
                            <option value="">All interfaces</option>
                        </select>
                    </div>
                    <div class="col-12">
                        <button type="button" class="btn btn-sm btn-primary" id="rcpt-add">
                            <i class="ri-add-line align-middle"></i> Add recipient
                        </button>
                        <button type="button" class="btn btn-sm btn-soft-secondary" id="rcpt-test">
                            <i class="ri-send-plane-line align-middle"></i> Send test email
                        </button>
                        <span id="rcpt-msg" class="ms-2 fs-13"></span>
                    </div>
                </div>

                <div class="table-responsive mb-3">
                    <table class="table table-sm table-nowrap align-middle mb-0">
                        <thead class="text-muted table-light">
                            <tr>
                                <th scope="col">Email</th>
                                <th scope="col">Type</th>
                                <th scope="col">Applies to</th>
                                <th scope="col">Active</th>
                                <th scope="col" class="text-end">&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody id="rcpt-rows">
                            <tr><td colspan="5" class="text-center text-muted py-3">Loading&hellip;</td></tr>
                        </tbody>
                    </table>
                </div>

                <button type="button" class="btn btn-primary" id="hav-settings-save">Save settings</button>
            </div>

            <!-- ---------- Open Housing API tab ---------- -->
            <div class="tab-pane" id="hav-tab-api" role="tabpanel">
                <p class="text-muted fs-13">
                    The API interfaces (Log Job, Post Inspection, Log/Cancel Appointment,
                    Extension of Time) each POST an XML message to Open Housing. Set the login below,
                    then send a request to check connectivity and the response. Nothing is sent until
                    you press a button.
                </p>

                <div class="border rounded p-3 mb-3">
                    <h6 class="mb-2">Connection</h6>
                    <div class="row g-2 align-items-end">
                        <div class="col-sm-3">
                            <label class="form-label fs-13" for="api-env">Environment</label>
                            <select class="form-select form-select-sm" id="api-env">
                                <option value="test">Test</option>
                                <option value="live">Live</option>
                            </select>
                        </div>
                        <div class="col-sm-4">
                            <label class="form-label fs-13" for="api-username">Username</label>
                            <input type="text" class="form-control form-control-sm" id="api-username" autocomplete="off" spellcheck="false">
                        </div>
                        <div class="col-sm-5">
                            <label class="form-label fs-13" for="api-password">Password</label>
                            <input type="password" class="form-control form-control-sm" id="api-password" autocomplete="new-password"
                                   placeholder="leave blank to keep the stored password">
                        </div>
                    </div>
                    <div class="d-flex align-items-center mt-2">
                        <button type="button" class="btn btn-sm btn-primary" id="api-settings-save">Save connection</button>
                        <span id="api-settings-msg" class="ms-2 fs-13"></span>
                    </div>
                    <div class="fs-12 text-muted mt-2" id="api-config-status">Loading&hellip;</div>
                </div>

                <div class="border rounded p-3">
                    <div class="d-flex align-items-center mb-2">
                        <h6 class="mb-0 flex-grow-1">Send a test request</h6>
                        <button type="button" class="btn btn-sm btn-soft-secondary" id="api-ping" title="Send a harmless request to check the login works">
                            <i class="ri-pulse-line align-middle"></i> Test connection
                        </button>
                    </div>

                    <div class="mb-2">
                        <label class="form-label fs-13" for="api-endpoint">Endpoint</label>
                        <select class="form-select form-select-sm" id="api-endpoint">
                            <option value="log_job">Log Job</option>
                            <option value="post_inspection">Post Inspection</option>
                            <option value="extension_of_time">Extension of Time</option>
                            <option value="log_appointment">Log Appointment</option>
                            <option value="cancel_appointment">Cancel Appointment</option>
                        </select>
                    </div>

                    <div class="mb-2">
                        <div class="d-flex align-items-center">
                            <label class="form-label fs-13 mb-0 flex-grow-1" for="api-params">Parameters (JSON)</label>
                            <button type="button" class="btn btn-sm btn-link p-0 fs-12" id="api-load-sample">Reset to example</button>
                        </div>
                        <textarea class="form-control font-monospace fs-12" id="api-params" rows="8" spellcheck="false" style="max-height:32vh;"></textarea>
                        <div class="form-text">
                            An empty <code>""</code> value is sent as an empty field; remove a line to omit it.
                        </div>
                    </div>

                    <button type="button" class="btn btn-primary" id="api-send-go">
                        <i class="ri-send-plane-line align-middle"></i> Send request
                    </button>

                    <div id="api-result" class="mt-3"></div>
                </div>
            </div>

        </div>
    </div>
</div>

<!-- ============================================================== -->
<!-- Inspect / correct / retry one rejected record                  -->
<!-- ============================================================== -->
<div class="modal fade" id="hav-record-modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Rejected record <span class="font-monospace fs-14 text-muted" id="rec-ref"></span></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

                <div class="d-flex align-items-start gap-2 fs-13 text-danger mb-3">
                    <i class="ri-error-warning-line"></i><span id="rec-error"></span>
                </div>

                <div class="row g-2 mb-3 fs-13">
                    <div class="col-sm-4"><span class="text-muted">Interface</span><div id="rec-iface" class="fw-medium">—</div></div>
                    <div class="col-sm-4"><span class="text-muted">Source file</span><div id="rec-file" class="fw-medium text-truncate">—</div></div>
                    <div class="col-sm-2"><span class="text-muted">Row</span><div id="rec-row" class="fw-medium">—</div></div>
                    <div class="col-sm-2"><span class="text-muted">Attempts</span><div id="rec-attempts" class="fw-medium">—</div></div>
                </div>

                <label class="form-label" for="rec-payload">
                    Record as received <span class="text-muted fw-normal fs-12" id="rec-format-hint"></span>
                </label>
                <textarea class="form-control font-monospace fs-12" id="rec-payload" rows="10" spellcheck="false" style="max-height:40vh;"></textarea>
                <div class="form-text">
                    Correcting this changes only the copy held in AJS. The file Havering sent is
                    archived unchanged, so the original is never lost.
                </div>

                <div id="rec-result" class="mt-3"></div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-ghost-secondary me-auto" id="rec-skip">
                    <i class="ri-eye-off-line align-middle"></i> Skip this record
                </button>
                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-soft-primary" id="rec-retry">Retry unchanged</button>
                <button type="button" class="btn btn-primary" id="rec-save">Save &amp; retry</button>
            </div>
        </div>
    </div>
</div>

<!-- ============================================================== -->
<!-- Claim / Post-Inspection tracker drill-down: slides in from right -->
<!-- (same offcanvas-end pattern as the SFTP & settings panel).       -->
<!-- ============================================================== -->
<div class="offcanvas offcanvas-end" tabindex="-1" id="hav-claim-jobs-panel" aria-labelledby="hav-claim-jobs-title" style="width: 720px; max-width: 96vw;">
    <div class="offcanvas-header border-bottom">
        <div>
            <h5 class="offcanvas-title mb-0" id="hav-claim-jobs-title">Jobs</h5>
            <span class="text-muted fs-12" id="hav-claim-jobs-sub">&nbsp;</span>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
        <div id="hav-claim-jobs-body">
            <p class="text-center text-muted py-4 mb-0">Loading&hellip;</p>
        </div>
    </div>
</div>

<script src="<?= cnd_url(); ?>assets/js/app/havering-dashboard.js"></script>
<script src="<?= cnd_url(); ?>assets/js/app/other-interface.js"></script>
