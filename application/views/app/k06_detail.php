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
                            <h4 class="mb-0">K06 — Rectifications Completed Within 2 Working Days</h4>
                            <small class="text-muted k06-detail-period"></small>
                        </div>
                        <button id="k06-export-btn" class="btn btn-sm btn-success ms-3" style="display:none;">
                            <i class="las la-file-excel me-1"></i> Export Excel
                        </button>
                    </div>
                </div>
            </div>

            <!-- Summary Bar -->
            <div class="row mb-3" id="k06-summary-bar" style="display:none!important;">
                <div class="col-12">
                    <div class="card mb-0">
                        <div class="card-body py-2">
                            <div class="d-flex flex-wrap gap-4 align-items-center">
                                <span class="fs-13">
                                    Total Rectifications: <strong class="text-dark k06-total">—</strong>
                                </span>
                                <span class="fs-13">
                                    Completed on Time: <strong class="text-success k06-on-time">—</strong>
                                    (<strong class="k06-pct">—</strong>)
                                </span>
                                <span class="fs-13">
                                    Overdue / Outstanding: <strong class="text-danger k06-overdue-count">—</strong>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ul class="nav nav-tabs nav-tabs-custom mb-3" id="k06-tabs-nav" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active fw-semibold" data-bs-toggle="tab" href="#k06-overdue-tab" role="tab">
                        Overdue / Outstanding <span class="badge bg-danger ms-1 k06-tab-overdue-count">0</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fw-semibold" data-bs-toggle="tab" href="#k06-ontime-tab" role="tab">
                        Completed on Time <span class="badge bg-success ms-1 k06-tab-ontime-count">0</span>
                    </a>
                </li>
            </ul>

            <div class="tab-content">

                <!-- Overdue Tab -->
                <div class="tab-pane active" id="k06-overdue-tab" role="tabpanel">
                    <div id="k06-overdue-content">
                        <div class="text-center py-5 text-muted">Loading...</div>
                    </div>
                </div>

                <!-- Completed on Time Tab -->
                <div class="tab-pane" id="k06-ontime-tab" role="tabpanel">
                    <div id="k06-ontime-content">
                        <div class="text-center py-5 text-muted">Loading...</div>
                    </div>
                </div>

            </div>

        </div>
    </div>
    <input type="hidden" id="is_k06_detail" value="1"/>
</div>
<script type="text/javascript" src="<?= cdn_url('assets/js/app/k06_detail.js?v=' . time()) ?>"></script>
