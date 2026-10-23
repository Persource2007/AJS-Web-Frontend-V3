<!-- ============================================================== -->
<!-- Other Interface — per-client certificate delivery over SFTP    -->
<!--                                                                -->
<!-- Rendered inside the interface dashboard's "Other Interface"     -->
<!-- tab, within the same .hav-dash wrapper, so the KPI tiles, cards -->
<!-- and tables pick up the dashboard's existing styling unchanged.   -->
<!--                                                                 -->
<!-- One common tab for every configured client: the client picker    -->
<!-- drives everything, so no client is ever named in the markup.     -->
<!--                                                                 -->
<!-- The SFTP panel mirrors Havering's "SFTP & settings" offcanvas    -->
<!-- but carries only the two tabs that apply here, Folders and       -->
<!-- Upload. There is no Inbound folder and no credentials form -     -->
<!-- the connection is the one global System > Settings > SFTP        -->
<!-- Setting record, shared with every other SFTP flow.               -->
<!-- ============================================================== -->
<style>
    /* Clickable folder cards. Scoped to this tab so Havering is unaffected. */
    .oi-folder-card {
        cursor: pointer;
        transition: border-color .15s ease, box-shadow .15s ease, transform .15s ease;
    }
    .oi-folder-card:hover { transform: translateY(-2px); }
    .oi-folder-card.active {
        border-color: var(--vz-primary) !important;
        box-shadow: 0 0 0 2px rgba(var(--vz-primary-rgb), .18) !important;
    }
    .oi-folder-card .oi-folder-icon {
        width: 44px; height: 44px; border-radius: 12px;
        display: flex; align-items: center; justify-content: center; font-size: 21px;
    }
    @media (prefers-reduced-motion: reduce) {
        .oi-folder-card, .oi-folder-card:hover { transition: none; transform: none; }
    }

    /* ── Client picker ──────────────────────────────────────────────
       One outlined control instead of a grey prefix box bolted to a
       select: tinted icon, borderless select, and the client code as a
       chip because that code is the folder the files actually go to.
       Theme tokens only, so light and dark both work.                */
    .oi-client-picker {
        display: inline-flex;
        align-items: center;
        gap: .4rem;
        padding: .2rem .4rem;
        border: 1px solid var(--vz-border-color);
        border-radius: .5rem;
        transition: border-color .15s ease, box-shadow .15s ease;
    }
    .oi-client-picker:focus-within {
        border-color: var(--vz-primary);
        box-shadow: 0 0 0 2px rgba(var(--vz-primary-rgb), .15);
    }
    .oi-client-picker .oi-client-icon {
        width: 26px; height: 26px; border-radius: 6px; flex: 0 0 auto;
        display: inline-flex; align-items: center; justify-content: center;
        font-size: 15px;
        background: rgba(var(--vz-primary-rgb), .12);
        color: var(--vz-primary);
    }
    /* background-color only — the shorthand would drop the select's arrow image. */
    .oi-client-picker .form-select {
        border: 0;
        background-color: transparent;
        box-shadow: none;
        font-weight: 500;
        min-width: 180px;
        padding-top: .1rem;
        padding-bottom: .1rem;
        padding-left: .15rem;
    }
    .oi-client-picker .form-select:focus { box-shadow: none; }
    .oi-client-picker .oi-client-code {
        flex: 0 0 auto;
        font-family: var(--vz-font-monospace, ui-monospace, SFMono-Regular, Menlo, monospace);
        letter-spacing: .2px;
    }
    @media (max-width: 575.98px) {
        .oi-client-picker .form-select { min-width: 120px; }
    }
    @media (prefers-reduced-motion: reduce) {
        .oi-client-picker { transition: none; }
    }
</style>

<!-- ================= Page header + client picker ================= -->
<div class="row">
    <div class="col-12">
        <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-1">
            <div>
                <h4 class="mb-1">Other Interface</h4>
                <p class="text-muted mb-0 fs-13">
                    Approved certificates delivered over SFTP to each client's own folder.
                    <span class="text-muted fs-12" id="oi-synced">&mdash;</span>
                </p>
            </div>
            <div class="d-flex align-items-center gap-2">
                <div class="oi-client-picker">
                    <span class="oi-client-icon"><i class="ri-community-line"></i></span>
                    <label class="visually-hidden" for="oi-client">Client</label>
                    <select class="form-select form-select-sm" id="oi-client">
                        <option value="">Loading&hellip;</option>
                    </select>
                    <span class="badge bg-primary-subtle text-primary oi-client-code" id="oi-client-code"
                          title="Client code — the SFTP folder these files go to">&mdash;</span>
                </div>
                <button type="button" class="btn btn-sm btn-soft-secondary" data-bs-toggle="offcanvas" data-bs-target="#oi-panel">
                    <i class="ri-folders-line align-middle"></i> SFTP &amp; folders
                </button>
                <button type="button" class="btn btn-sm btn-soft-primary" id="oi-refresh">
                    <i class="ri-refresh-line align-middle"></i> Refresh
                </button>
            </div>
        </div>
    </div>
</div>

<!-- ================= Connection / listing problems ================= -->
<!-- Deliberately NOT a .row/.col: the dashboard's `.hav-dash > .row` rules
     animate and space rows as a flex grid, and a row toggled with an inline
     display left this banner short enough for the KPI tiles (which are
     position:relative, so they paint on top) to cover its text. A plain block
     alert toggled with Bootstrap's own d-none always takes its full height. -->
<div class="alert alert-warning d-flex align-items-start d-none" id="oi-alert-row" role="alert">
    <i class="ri-error-warning-line fs-18 me-2"></i>
    <div id="oi-alert-text" class="flex-grow-1"></div>
    <button type="button" class="btn-close ms-2" id="oi-alert-close" aria-label="Dismiss"></button>
</div>

<!-- ================= KPI tiles ================= -->
<div class="row">
    <div class="col-xl-3 col-lg-6 col-md-6">
        <div class="card kpi-tile h-100 bg-success bg-gradient">
            <div class="card-body">
                <i class="ri-check-double-line kpi-watermark"></i>
                <div class="d-flex align-items-center">
                    <div class="flex-grow-1 overflow-hidden">
                        <p class="text-uppercase fw-semibold text-white-50 text-truncate mb-2 fs-11">Processed so far</p>
                        <h3 class="text-white mb-0 kpi-value" id="oi-kpi-processed-total">0</h3>
                    </div>
                    <div class="flex-shrink-0"><div class="kpi-icon"><i class="ri-check-double-line"></i></div></div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-xl-3 col-lg-6 col-md-6">
        <div class="card kpi-tile h-100 bg-primary bg-gradient">
            <div class="card-body">
                <i class="ri-calendar-check-line kpi-watermark"></i>
                <div class="d-flex align-items-center">
                    <div class="flex-grow-1 overflow-hidden">
                        <p class="text-uppercase fw-semibold text-white-50 text-truncate mb-2 fs-11">Processed today</p>
                        <h3 class="text-white mb-0 kpi-value" id="oi-kpi-processed-today">0</h3>
                    </div>
                    <div class="flex-shrink-0"><div class="kpi-icon"><i class="ri-calendar-check-line"></i></div></div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-xl-3 col-lg-6 col-md-6">
        <div class="card kpi-tile h-100 bg-warning bg-gradient">
            <div class="card-body">
                <i class="ri-time-line kpi-watermark"></i>
                <div class="d-flex align-items-center">
                    <div class="flex-grow-1 overflow-hidden">
                        <p class="text-uppercase fw-semibold text-white-50 text-truncate mb-2 fs-11">Pending in queue</p>
                        <h3 class="text-white mb-0 kpi-value" id="oi-kpi-pending">0</h3>
                    </div>
                    <div class="flex-shrink-0"><div class="kpi-icon"><i class="ri-time-line"></i></div></div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-xl-3 col-lg-6 col-md-6">
        <div class="card kpi-tile h-100 bg-danger bg-gradient">
            <div class="card-body">
                <i class="ri-error-warning-line kpi-watermark"></i>
                <div class="d-flex align-items-center">
                    <div class="flex-grow-1 overflow-hidden">
                        <p class="text-uppercase fw-semibold text-white-50 text-truncate mb-2 fs-11">Total failed</p>
                        <h3 class="text-white mb-0 kpi-value" id="oi-kpi-failed">0</h3>
                    </div>
                    <div class="flex-shrink-0"><div class="kpi-icon"><i class="ri-error-warning-line"></i></div></div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- ================= Deliveries ================= -->
<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-header d-flex align-items-center flex-wrap gap-2">
                <h4 class="card-title mb-0 flex-grow-1">Certificate deliveries</h4>
                <div class="btn-group btn-group-sm" role="group" id="oi-delivery-filter">
                    <button type="button" class="btn btn-outline-primary active" data-state="all">All</button>
                    <button type="button" class="btn btn-outline-primary" data-state="pending">Pending</button>
                    <button type="button" class="btn btn-outline-primary" data-state="delivered">Delivered</button>
                    <button type="button" class="btn btn-outline-primary" data-state="failed">Failed</button>
                </div>
            </div>
            <div class="card-body">
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text"><i class="ri-search-line"></i></span>
                    <input type="text" class="form-control" id="oi-delivery-search"
                           placeholder="Search job, task, certificate, UPRN or address&hellip;" autocomplete="off">
                    <button class="btn btn-outline-secondary" type="button" id="oi-delivery-search-clear" title="Clear">
                        <i class="ri-close-line"></i>
                    </button>
                </div>
                <div id="oi-deliveries-body">
                    <div class="text-center text-muted py-4">Select a client to list its deliveries.</div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- ================= Folders (counts; open the panel to browse) ================= -->
<div class="row">
    <div class="col-12">
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
            <h5 class="mb-0">Folders</h5>
            <span class="text-muted fs-12">Select a folder to browse its files.</span>
        </div>
    </div>

    <div class="col-lg-4 col-md-6">
        <div class="card h-100 oi-folder-card active" data-folder="outbound" role="button" tabindex="0"
             aria-label="Browse the Outbound folder">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div class="flex-grow-1 overflow-hidden">
                        <p class="text-uppercase fw-semibold text-muted text-truncate mb-2 fs-11">Outbound</p>
                        <h4 class="mb-0 tabular"><span id="oi-cnt-outbound">0</span>
                            <small class="text-muted fs-13">files</small></h4>
                    </div>
                    <div class="flex-shrink-0">
                        <div class="oi-folder-icon bg-info-subtle text-info"><i class="ri-upload-2-line"></i></div>
                    </div>
                </div>
                <p class="text-muted fs-12 mb-0 mt-2">Awaiting collection, or stalled part-way.</p>
            </div>
        </div>
    </div>

    <div class="col-lg-4 col-md-6">
        <div class="card h-100 oi-folder-card" data-folder="processed" role="button" tabindex="0"
             aria-label="Browse the Processed folder">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div class="flex-grow-1 overflow-hidden">
                        <p class="text-uppercase fw-semibold text-muted text-truncate mb-2 fs-11">Processed</p>
                        <h4 class="mb-0 tabular"><span id="oi-cnt-processed">0</span>
                            <small class="text-muted fs-13">files</small></h4>
                    </div>
                    <div class="flex-shrink-0">
                        <div class="oi-folder-icon bg-success-subtle text-success"><i class="ri-check-double-line"></i></div>
                    </div>
                </div>
                <p class="text-muted fs-12 mb-0 mt-2">Delivered successfully.</p>
            </div>
        </div>
    </div>

    <div class="col-lg-4 col-md-6">
        <div class="card h-100 oi-folder-card" data-folder="error" role="button" tabindex="0"
             aria-label="Browse the Errors folder">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div class="flex-grow-1 overflow-hidden">
                        <p class="text-uppercase fw-semibold text-muted text-truncate mb-2 fs-11">Errors</p>
                        <h4 class="mb-0 tabular"><span id="oi-cnt-error">0</span>
                            <small class="text-muted fs-13">errors</small></h4>
                    </div>
                    <div class="flex-shrink-0">
                        <div class="oi-folder-icon bg-danger-subtle text-danger"><i class="ri-error-warning-line"></i></div>
                    </div>
                </div>
                <p class="text-muted fs-12 mb-0 mt-2">One CSV per failed delivery, with the reason.</p>
            </div>
        </div>
    </div>
</div>

<!-- ============================================================== -->
<!-- Other Interface SFTP panel (offcanvas)                         -->
<!--   Folders · browse Outbound / Processed / Errors, download      -->
<!--   Upload  · place a file straight into one of those folders     -->
<!--                                                                 -->
<!-- Same shape as Havering's panel, minus the tabs that do not apply -->
<!-- here (no Inbound, no alert recipients, no Open Housing API, and  -->
<!-- no credentials - those live in System > Settings > SFTP Setting).-->
<!-- ============================================================== -->
<div class="offcanvas offcanvas-end" tabindex="-1" id="oi-panel" aria-labelledby="oi-panel-title"
     style="width: 720px; max-width: 96vw;">
    <div class="offcanvas-header border-bottom">
        <h5 class="offcanvas-title" id="oi-panel-title">
            SFTP &amp; folders <span class="text-muted fs-13" id="oi-panel-client"></span>
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">

        <ul class="nav nav-tabs mb-3" role="tablist">
            <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" href="#oi-tab-folders" role="tab">
                <i class="ri-folders-line align-middle me-1"></i>Folders</a></li>
            <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#oi-tab-upload" role="tab">
                <i class="ri-upload-2-line align-middle me-1"></i>Upload</a></li>
        </ul>

        <div class="tab-content">

            <!-- ---------- Folders tab ---------- -->
            <div class="tab-pane active" id="oi-tab-folders" role="tabpanel">
                <div class="d-flex align-items-center flex-wrap gap-2 mb-2">
                    <div class="btn-group btn-group-sm" role="group" id="oi-folder-toggle">
                        <button type="button" class="btn btn-outline-primary active" data-folder="outbound">
                            Outbound <span class="badge bg-light text-body ms-1" id="oi-badge-outbound">0</span></button>
                        <button type="button" class="btn btn-outline-primary" data-folder="processed">
                            Processed <span class="badge bg-light text-body ms-1" id="oi-badge-processed">0</span></button>
                        <button type="button" class="btn btn-outline-primary" data-folder="error">
                            Errors <span class="badge bg-light text-body ms-1" id="oi-badge-error">0</span></button>
                    </div>
                    <button type="button" class="btn btn-sm btn-soft-primary ms-auto" id="oi-folders-refresh">
                        <i class="ri-refresh-line align-middle"></i> Refresh
                    </button>
                </div>

                <p class="text-muted fs-12 mb-2">
                    <span class="font-monospace" id="oi-files-path">&mdash;</span>
                    <span id="oi-folder-hint"></span>
                </p>

                <div class="input-group input-group-sm mb-2">
                    <span class="input-group-text"><i class="ri-search-line"></i></span>
                    <input type="text" class="form-control" id="oi-filter"
                           placeholder="Filter files in this folder by name&hellip;" autocomplete="off">
                    <button class="btn btn-outline-secondary" type="button" id="oi-filter-clear" title="Clear filter">
                        <i class="ri-close-line"></i>
                    </button>
                </div>

                <div id="oi-files-body">
                    <div class="text-center text-muted py-4">Select a client to list its folders.</div>
                </div>
            </div>

            <!-- ---------- Upload tab ---------- -->
            <div class="tab-pane" id="oi-tab-upload" role="tabpanel">
                <p class="text-muted fs-13">
                    Places the file straight into the chosen folder for this client. Nothing is
                    processed and no certificate status changes &mdash; use it to put a corrected
                    file back, or to re-stage one the client could not read.
                </p>
                <div class="mb-3">
                    <label class="form-label" for="oi-upload-folder">Destination folder</label>
                    <select class="form-select" id="oi-upload-folder">
                        <option value="outbound">Outbound</option>
                        <option value="processed">Processed</option>
                        <option value="error">Errors</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label" for="oi-upload-file">File</label>
                    <input type="file" class="form-control" id="oi-upload-file">
                    <div class="form-text">Maximum 32 MB. The filename is kept, with unusual characters replaced.</div>
                </div>
                <div id="oi-upload-result" class="mb-3"></div>
                <button type="button" class="btn btn-primary" id="oi-upload-go">
                    <i class="ri-upload-2-line align-middle"></i> Upload to folder
                </button>
            </div>

        </div>
    </div>
</div>

<!-- ============================================================== -->
<!-- Why a delivery failed. Reads the attempt history from the        -->
<!-- existing job/certificate/get_file_upload_logs/{id} endpoint,     -->
<!-- the same one the certificate list's "View Reason to Failed" uses. -->
<!-- ============================================================== -->
<div class="modal fade" id="oi-reason-modal" tabindex="-1" aria-labelledby="oi-reason-title" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="oi-reason-title">Reason for failure</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="oi-reason-body">
                <div class="text-center text-muted py-4">Loading&hellip;</div>
            </div>
        </div>
    </div>
</div>
