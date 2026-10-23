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
                            <input type="month" id="r04-month" class="form-control form-control-sm"
                                style="min-width:160px;" />
                        </div>

                        <div class="col-md-3">
                            <label class="form-label mb-1 fs-12 text-muted">Client (optional)</label>
                            <select id="r04-client" class="form-control form-control-sm select2-ajax-clients"
                                style="width:100%;">
                                <option value="">All Clients</option>
                            </select>
                        </div>

                        <!-- <div class="col-md-3">
                            <label class="form-label mb-1 fs-12 text-muted">Contract (optional)</label>
                            <select id="r04-contract" class="form-control form-control-sm select2-ajax-contracts" style="width:100%;">
                                <option value="">All Contracts</option>
                            </select>
                        </div> -->

                        <!-- Search filter -->
                        <div class="col-auto">
                            <input type="text" id="r04-search"
                                   class="form-control form-control-sm"
                                   placeholder="Search job, name, client…"
                                   style="min-width:200px;"
                                   autocomplete="off">
                        </div>
                        <div class="col-auto">
                            <button id="r04-generate-btn" class="btn btn-primary btn-sm">
                                <i class="las la-sync me-1"></i> Generate
                            </button>
                        </div>
                        <!-- Import External Surveys -->
                        <div class="col-auto">
                            <div class="btn-group ms-1">
                                <button type="button"
                                        class="btn btn-secondary btn-sm waves-effect waves-light dropdown-toggle"
                                        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                        title="Import External Surveys">
                                    <i class="las la-file-import"></i> Import
                                </button>
                                <div class="dropdown-menu dropdown-menu-end dropdown-menu-md p-4" style="min-width:280px;">
                                    <form method="POST" action=""
                                          data-upload-type="survey_external"
                                          data-file-type="excel"
                                          class="bulk-upload-form"
                                          enctype="multipart/form-data">
                                        <div class="mb-2">
                                            <label class="form-label">Import External Surveys</label>
                                            <div class="input-group custom-file-button" style="width:100%;">
                                                <input required autocomplete="off" name="upload" id="survey-import-file"
                                                       type="file" class="form-control">
                                                <label class="input-group-text mb-0" for="survey-import-file">Browse</label>
                                            </div>
                                        </div>
                                        <div class="hstack gap-2 mt-2">
                                            <button type="submit" class="btn btn-secondary w-50 ms-0">Upload</button>
                                            <a class="btn btn-outline-dark w-50"
                                               href="<?= app_url('resources/templates/ajs-survey-export-sample.xlsx') ?>"
                                               download>Template</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div class="col-auto ms-auto">
                            <button id="r04-export-btn" class="btn btn-success btn-sm" style="display:none;">
                                <i class="las la-file-excel me-1"></i> Export CSV
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            <!-- ── Summary Bar ── -->
            <div id="r04-summary-bar" style="display:none;" class="mb-3">
                <div class="card mb-0">
                    <div class="card-body py-2">
                        <div class="d-flex flex-wrap gap-4 align-items-center">
                            <span class="fs-13">Period: <strong class="r04-period text-dark">—</strong></span>
                            <span class="fs-13">Contracts: <strong
                                    class="r04-contract-count text-dark">—</strong></span>
                            <span class="fs-13">Surveys Sent: <strong
                                    class="r04-total-sent text-primary">—</strong></span>
                            <span class="fs-13">Responses: <strong
                                    class="r04-total-completed text-success">—</strong></span>
                            <span class="fs-13">Response Rate: <strong
                                    class="r04-response-rate text-dark">—</strong></span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ── Results ── -->
            <div id="r04-results">
                <div class="text-center py-5 text-muted">
                    <i class="las la-poll fs-24 d-block mb-2"></i>
                    Select a month and click <strong>Generate</strong> to load the report.
                </div>
            </div>

        </div>
    </div>
    <input type="hidden" id="is_r04" value="1" />
</div>

<script type="text/javascript" src="<?= cdn_url('assets/js/app/r04.js?v=' . time()) ?>"></script>