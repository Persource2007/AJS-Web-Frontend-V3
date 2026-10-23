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
                            <h4 class="mb-0">K03 — Jobs Attended &amp; Completed Within Target</h4>
                            <small class="text-muted k03-detail-period"></small>
                        </div>
                        <button id="k03-export-btn" class="btn btn-sm btn-success ms-3" style="display:none;">
                            <i class="las la-file-excel me-1"></i> Export Excel
                        </button>
                    </div>
                </div>
            </div>

            <ul class="nav nav-tabs nav-tabs-custom mb-3" id="k03-tabs-nav" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active fw-semibold" data-bs-toggle="tab" href="#k03a-tab" role="tab">
                        K03a — Attended Within Target
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fw-semibold" data-bs-toggle="tab" href="#k03b-tab" role="tab">
                        K03b — Completed Within Target
                    </a>
                </li>
            </ul>

            <div class="tab-content">
                <div class="tab-pane active" id="k03a-tab" role="tabpanel">
                    <div class="row mb-2">
                        <div class="col-12">
                            <span class="text-muted fs-13">
                                Overall: <strong class="k03a-overall-pct text-dark">—</strong>
                                &nbsp;|&nbsp; Target: <strong class="text-success">95%</strong>
                            </span>
                        </div>
                    </div>
                    <div class="accordion custom-accordionwithicon" id="k03a-accordion">
                        <div class="text-center py-5 text-muted" id="k03a-loading">Click a tab above to load data.</div>
                    </div>
                </div>

                <div class="tab-pane" id="k03b-tab" role="tabpanel">
                    <div class="row mb-2">
                        <div class="col-12">
                            <span class="text-muted fs-13">
                                Overall: <strong class="k03b-overall-pct text-dark">—</strong>
                                &nbsp;|&nbsp; Target: <strong class="text-success">95%</strong>
                            </span>
                        </div>
                    </div>
                    <div class="accordion custom-accordionwithicon" id="k03b-accordion">
                        <div class="text-center py-5 text-muted" id="k03b-loading">Click a tab above to load data.</div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <input type="hidden" id="is_k03_detail" value="1"/>
</div>
<script type="text/javascript" src="<?= cdn_url('assets/js/app/k03_detail.js') ?>"></script>
