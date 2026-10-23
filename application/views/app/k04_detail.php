<div class="main-content">
    <div class="page-content">
        <div class="container-fluid ajs-dash">
            <?php $this->load->view('app/inc/dashboard-status-colors'); ?>

            <div class="row mb-3">
                <div class="col-12">
                    <div class="d-flex align-items-center">
                        <a href="<?= base_url('dashboard') ?>" class="btn btn-sm btn-light me-3">
                            <i class="las la-arrow-left"></i> Back
                        </a>
                        <div class="flex-grow-1">
                            <h4 class="mb-0">K04 — Appointments Kept</h4>
                            <small class="text-muted k04-detail-period"></small>
                        </div>
                        <button id="k04-export-btn" class="btn btn-sm btn-success ms-3" style="display:none;">
                            <i class="las la-file-excel me-1"></i> Export Excel
                        </button>
                    </div>
                </div>
            </div>

            <!-- Summary Bar -->
            <div class="row mb-3" id="k04-summary-bar" style="display:none!important;">
                <div class="col-12">
                    <div class="card mb-0">
                        <div class="card-body py-2">
                            <div class="d-flex flex-wrap gap-4 align-items-center">
                                <span class="fs-13">
                                    Total Appointments: <strong class="text-dark k04-total">—</strong>
                                </span>
                                <span class="fs-13">
                                    Kept: <strong class="text-success k04-kept">—</strong>
                                    (<strong class="k04-pct">—</strong>)
                                </span>
                                <span class="fs-13">
                                    Completed: <strong class="text-success k04-completed">—</strong>
                                </span>
                                <span class="fs-13">
                                    No Access: <strong class="text-danger k04-no-access-total">—</strong>
                                </span>
                                <span class="fs-13">
                                    Rescheduled (Pending): <strong class="text-warning k04-rescheduled-pending-count">—</strong>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ul class="nav nav-tabs nav-tabs-custom mb-3" id="k04-tabs-nav" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active fw-semibold" data-bs-toggle="tab" href="#k04-noaccess-tab" role="tab">
                        No Access <span class="badge bg-danger ms-1 k04-tab-noaccess-count">0</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fw-semibold" data-bs-toggle="tab" href="#k04-rescheduled-tab" role="tab">
                        Rescheduled <span class="badge bg-warning ms-1 k04-tab-rescheduled-count">0</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fw-semibold" data-bs-toggle="tab" href="#k04-furtherworks-tab" role="tab">
                        Further Works <span class="badge bg-info ms-1 k04-tab-fw-count">0</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fw-semibold" data-bs-toggle="tab" href="#k04-materials-tab" role="tab">
                        Materials Required <span class="badge bg-info ms-1 k04-tab-mat-count">0</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fw-semibold" data-bs-toggle="tab" href="#k04-other-tab" role="tab">
                        Other Outcomes <span class="badge bg-secondary ms-1 k04-tab-other-count">0</span>
                    </a>
                </li>
            </ul>

            <div class="tab-content">

                <!-- No Access Tab -->
                <div class="tab-pane active" id="k04-noaccess-tab" role="tabpanel">
                    <div class="accordion custom-accordionwithicon" id="k04-noaccess-accordion">
                        <div class="text-center py-5 text-muted">Click a tab above to load data.</div>
                    </div>
                </div>

                <!-- Rescheduled Tab -->
                <div class="tab-pane" id="k04-rescheduled-tab" role="tabpanel">
                    <div id="k04-rescheduled-content">
                        <div class="text-center py-5 text-muted">Click a tab above to load data.</div>
                    </div>
                </div>

                <!-- Further Works Tab -->
                <div class="tab-pane" id="k04-furtherworks-tab" role="tabpanel">
                    <div id="k04-fw-content">
                        <div class="text-center py-5 text-muted">Click a tab above to load data.</div>
                    </div>
                </div>

                <!-- Materials Required Tab -->
                <div class="tab-pane" id="k04-materials-tab" role="tabpanel">
                    <div id="k04-mat-content">
                        <div class="text-center py-5 text-muted">Click a tab above to load data.</div>
                    </div>
                </div>

                <!-- Other Outcomes Tab (H&S Failed, Asbestos Failed, Abandoned) -->
                <div class="tab-pane" id="k04-other-tab" role="tabpanel">
                    <div id="k04-other-content">
                        <div class="text-center py-5 text-muted">Click a tab above to load data.</div>
                    </div>
                </div>

            </div>

        </div>
    </div>
    <input type="hidden" id="is_k04_detail" value="1"/>
</div>
<script type="text/javascript" src="<?= cdn_url('assets/js/app/k04_detail.js') ?>"></script>
