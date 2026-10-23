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

                .compliance-page .stat-tile { cursor: pointer; border: 1px solid #e9ebec; }
                .compliance-page .stat-tile.active { border-color: #405189; box-shadow: 0 0 0 2px rgba(64,81,137,.12); }
                .compliance-page .stat-tile .stat-value { font-size: 22px; font-weight: 600; }
                .compliance-page .bucket-overdue        { color: #f06548; }
                .compliance-page .bucket-never_serviced { color: #b42318; }
                .compliance-page .bucket-due_soon       { color: #f7b84b; }
                .compliance-page .bucket-compliant      { color: #0ab39c; }
                .compliance-page table td { vertical-align: middle; }
            </style>

            <div class="row mb-3">
                <div class="col-12">
                    <div class="d-flex align-items-center flex-wrap gap-2">
                        <a href="<?= base_url('dashboard') ?>" class="btn btn-sm btn-light me-2">
                            <i class="las la-arrow-left"></i> Back
                        </a>
                        <div class="flex-grow-1">
                            <h4 class="mb-0 d-flex align-items-center gap-2">
                                Servicing Compliance
                                <i class="ri-information-line kpi-info fs-14 text-muted"
                                   data-bs-toggle="tooltip" data-bs-placement="top"
                                   title="Measured against the planned servicing cycle for each property, taken from the contract masterplan. Due date = last completed service plus one cycle; where nothing has been completed, the cycle runs from the plan's start date."></i>
                            </h4>
                            <!--
                                The "not certificate validity" clause stays visible rather
                                than moving into the tooltip. The banner it replaced was
                                intrusive, but this page is named "compliance" and must not
                                be mistaken for a statutory record - that has to be readable
                                without hovering anything.
                            -->
                            <small class="text-muted">
                                Whether each planned service has happened within its cycle
                                &mdash; not a record of certificate validity.
                            </small>
                        </div>
                        <button id="compliance-export-btn" class="btn btn-sm btn-success">
                            <i class="las la-file-excel me-1"></i> Export Excel
                        </button>
                    </div>
                </div>
            </div>

            <!--
                Named "Servicing Compliance" deliberately. This measures adherence
                to the contract_masterplan servicing cycle, derived from completed
                jobs - it is not a statement about certificate validity or
                statutory compliance. See compliance_helper.php.
            -->
            <div class="compliance-page">

                <div class="row g-2 mb-3" id="compliance-stats">
                    <div class="col-6 col-lg">
                        <div class="card stat-tile mb-0 active" data-bucket="">
                            <div class="card-body py-2 px-3">
                                <div class="text-muted fs-11 text-uppercase">All</div>
                                <div class="stat-value stat-total">&mdash;</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-lg">
                        <div class="card stat-tile mb-0" data-bucket="overdue">
                            <div class="card-body py-2 px-3">
                                <div class="text-muted fs-11 text-uppercase">Overdue</div>
                                <div class="stat-value bucket-overdue stat-overdue">&mdash;</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-lg">
                        <div class="card stat-tile mb-0" data-bucket="never_serviced">
                            <div class="card-body py-2 px-3">
                                <div class="text-muted fs-11 text-uppercase">Never Serviced</div>
                                <div class="stat-value bucket-never_serviced stat-never">&mdash;</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-lg">
                        <div class="card stat-tile mb-0" data-bucket="due_soon">
                            <div class="card-body py-2 px-3">
                                <div class="text-muted fs-11 text-uppercase">Due in 30 days</div>
                                <div class="stat-value bucket-due_soon stat-duesoon">&mdash;</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-lg">
                        <div class="card stat-tile mb-0" data-bucket="compliant">
                            <div class="card-body py-2 px-3">
                                <div class="text-muted fs-11 text-uppercase">On Track</div>
                                <div class="stat-value bucket-compliant stat-compliant">&mdash;</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-lg">
                        <div class="card mb-0 border">
                            <div class="card-body py-2 px-3">
                                <div class="text-muted fs-11 text-uppercase">Meeting Cycle</div>
                                <div class="stat-value stat-pct">&mdash;</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <div class="row g-2 mb-3">
                            <div class="col-md-3">
                                <input type="text" id="compliance-search" class="form-control form-control-sm"
                                       placeholder="Search UPRN, client, service, job&hellip;">
                            </div>
                            <div class="col-md-2">
                                <select id="compliance-reason" class="form-select form-select-sm">
                                    <option value="">Any reason</option>
                                    <option value="not_scheduled">Not Scheduled</option>
                                    <option value="scheduled_after_due">Scheduled After Due</option>
                                    <option value="no_access">No Access</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="awaiting_certificate">Awaiting Certificate</option>
                                    <option value="cert_rejected">Certificate Rejected</option>
                                </select>
                            </div>
                            <div class="col-md-auto">
                                <button id="compliance-apply" class="btn btn-sm btn-primary">Apply</button>
                                <button id="compliance-reset" class="btn btn-sm btn-light">Reset</button>
                            </div>
                        </div>

                        <div class="table-responsive">
                            <table class="table table-sm table-hover align-middle mb-0" id="compliance-table">
                                <thead class="table-light">
                                    <tr>
                                        <th>UPRN</th>
                                        <th>Address</th>
                                        <th>Client</th>
                                        <th>Service</th>
                                        <th>Frequency</th>
                                        <th>Last Completed</th>
                                        <th>Due</th>
                                        <th>Status</th>
                                        <th>Reason</th>
                                        <th>Open Job</th>
                                    </tr>
                                </thead>
                                <tbody id="compliance-tbody">
                                    <tr><td colspan="10" class="text-center text-muted py-4">Loading&hellip;</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="d-flex align-items-center justify-content-between mt-3">
                            <small class="text-muted" id="compliance-count"></small>
                            <div>
                                <button class="btn btn-sm btn-light" id="compliance-prev">Previous</button>
                                <button class="btn btn-sm btn-light" id="compliance-next">Next</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
    <input type="hidden" id="is_compliance" value="1"/>
</div>
<script type="text/javascript" src="<?= cdn_url('assets/js/app/compliance.js') ?>"></script>
