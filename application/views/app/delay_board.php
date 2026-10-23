<div class="main-content">
    <div class="page-content">
        <div class="container-fluid ajs-dash">
            <?php $this->load->view('app/inc/dashboard-status-colors'); ?>

            <style>
                /* Same treatment the KPI cards use for their info icons. The rule
                   lives in dashboard.php's own style block, which this page does
                   not load, so it is restated here rather than left unstyled. */
                .ajs-dash .kpi-info {
                    color: var(--vz-border-color);
                    cursor: help;
                    transition: color .18s ease;
                }
                .ajs-dash .kpi-info:hover { color: var(--vz-primary); }

                .delay-board .exception-card { border-left: 4px solid #dee2e6; }
                .delay-board .exception-card.sev-high   { border-left-color: #f06548; }
                .delay-board .exception-card.sev-medium { border-left-color: #f7b84b; }
                .delay-board .exception-card.sev-low    { border-left-color: #6c757d; }
                .delay-board .nav-tabs .badge { margin-left: .35rem; }
                .delay-board .exception-row + .exception-row { border-top: 1px solid #f0f0f0; }
                .delay-board .detail-line { font-size: 12px; }
                /* The board is read-only; every row is a link out, so make that legible. */
                .delay-board .row-link { text-decoration: none; }
                .delay-board .row-link:hover { background: #f8f9fa; }
                .delay-board .suggest-box { background: #f8f9fa; border-radius: 4px; }
            </style>

            <div class="row mb-3">
                <div class="col-12">
                    <div class="d-flex align-items-center flex-wrap gap-2">
                        <a href="<?= base_url('dashboard') ?>" class="btn btn-sm btn-light me-2">
                            <i class="las la-arrow-left"></i> Back
                        </a>
                        <div class="flex-grow-1">
                            <h4 class="mb-0 d-flex align-items-center gap-2">
                                Today at Risk
                                <!--
                                    The read-only caveat lives here rather than in a
                                    banner: it is worth saying once, but it is the same
                                    sentence on every load and does not earn a full row
                                    above the rows the page exists to show.
                                -->
                                <i class="ri-information-line kpi-info fs-14 text-muted"
                                   data-bs-toggle="tooltip" data-bs-placement="top"
                                   title="This board is read-only. Select any row to open the job or task and act there."></i>
                            </h4>
                            <small class="text-muted">
                                Work that needs attention now &mdash;
                                <span class="delay-generated-at">loading&hellip;</span>
                            </small>
                        </div>
                        <button id="delay-refresh-btn" class="btn btn-sm btn-outline-primary">
                            <i class="las la-sync"></i> Refresh
                        </button>
                    </div>
                </div>
            </div>

            <div class="delay-board">
                <ul class="nav nav-tabs nav-tabs-custom mb-3" id="delay-tabs-nav" role="tablist">
                    <!-- Tabs are rendered from the API response so the board never -->
                    <!-- shows an exception class that produced no rows. -->
                </ul>

                <div class="tab-content" id="delay-tab-content">
                    <div class="text-center py-5 text-muted" id="delay-loading">
                        <i class="las la-spinner la-spin fs-22"></i>
                        <div class="mt-2">Checking today's work&hellip;</div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <input type="hidden" id="is_delay_board" value="1"/>
</div>
<script type="text/javascript" src="<?= cdn_url('assets/js/app/delay_board.js') ?>"></script>
