<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
<style>
    /* Scoped to the dashboard only - uses theme tokens so light/dark both work */
    .ajs-dash .card {
        border-radius: .75rem;
        border: 1px solid var(--vz-border-color);
        box-shadow: 0 1px 2px rgba(16, 24, 40, .04);
        transition: box-shadow .2s ease, transform .2s ease;
    }
    .ajs-dash .card-title {
        text-transform: uppercase;
        letter-spacing: .5px;
        font-size: .75rem;
        font-weight: 600;
        color: var(--vz-secondary-color, var(--vz-body-color));
    }
    .ajs-dash .card-header {
        border-bottom: 1px solid var(--vz-border-color);
        background: transparent;
    }
    /* Figures line up column-wise when they animate */
    .ajs-dash h3, .ajs-dash h4, .ajs-dash h5, .ajs-dash .tabular {
        font-variant-numeric: tabular-nums;
        font-feature-settings: "tnum";
    }

    /* ── Coloured KPI tiles ─────────────────────────────────────────────── */
    .ajs-dash .kpi-tile {
        border: none;
        overflow: hidden;
        position: relative;
    }
    .ajs-dash a:hover .kpi-tile {
        transform: translateY(-4px);
        box-shadow: 0 .75rem 1.5rem rgba(16, 24, 40, .22);
    }
    /* .text-white-50 is too faint on the amber tile - lift it on all five */
    .ajs-dash .kpi-tile .text-white-50 {
        color: rgba(255, 255, 255, .88) !important;
    }
    .ajs-dash .kpi-tile .kpi-icon {
        width: 44px;
        height: 44px;
        border-radius: 12px;
        background: rgba(255, 255, 255, .2);
        backdrop-filter: blur(2px);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 21px;
        color: #fff;
    }
    .ajs-dash .kpi-tile .kpi-watermark {
        position: absolute;
        right: -14px;
        bottom: -26px;
        font-size: 104px;
        line-height: 1;
        color: #fff;
        opacity: .1;
        pointer-events: none;
    }
    .ajs-dash .kpi-tile .kpi-value {
        letter-spacing: -.5px;
    }
    .ajs-dash .kpi-tile .kpi-cta {
        opacity: .85;
        transition: transform .2s ease;
        display: inline-block;
    }
    .ajs-dash a:hover .kpi-tile .kpi-cta {
        transform: translateX(4px);
        opacity: 1;
    }

    /* ── Pipeline with connector line ───────────────────────────────────── */
    .ajs-dash .pipeline {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        overflow-x: auto;
        padding-bottom: .25rem;
    }
    .ajs-dash .pipeline-step {
        position: relative;
        flex: 1 1 0;
        min-width: 104px;
        text-align: center;
    }
    /* Line joining one stage icon to the next */
    .ajs-dash .pipeline-step:not(:last-child)::after {
        content: "";
        position: absolute;
        top: 27px;
        left: calc(50% + 34px);
        right: calc(-50% + 34px);
        height: 2px;
        background: repeating-linear-gradient(to right, var(--vz-border-color) 0 6px, transparent 6px 11px);
    }
    .ajs-dash .pipeline-icon {
        width: 54px;
        height: 54px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 23px;
        position: relative;
        z-index: 1;
        transition: transform .2s ease;
    }
    .ajs-dash .pipeline-step:hover .pipeline-icon {
        transform: scale(1.09);
    }
    .ajs-dash .stage-bar {
        height: 10px;
        border-radius: 99px;
        overflow: hidden;
        background: var(--vz-light);
    }
    .ajs-dash .stage-bar .progress-bar {
        transition: width .8s cubic-bezier(.4, 0, .2, 1);
    }

    /* ── KPI cards that link to a detail page ───────────────────────────── */
    .ajs-dash a .kpi-ring-card {
        cursor: pointer;
    }
    .ajs-dash a:hover .kpi-ring-card {
        transform: translateY(-4px);
        border-color: var(--vz-primary);
        box-shadow: 0 .5rem 1.25rem rgba(16, 24, 40, .13);
    }
    .ajs-dash a:focus-visible .kpi-ring-card {
        outline: 2px solid var(--vz-primary);
        outline-offset: 2px;
    }
    /* Reserve the radial-chart height (165px, set in dashboard.js) so the centred
       % overlay doesn't collapse onto the "x of y" subtitle before ApexCharts
       finishes rendering — this is the overlapping-text glitch on first load. */
    .ajs-dash .kpi-ring-card .card-body > .position-relative {
        min-height: 165px;
    }
    /* Same reservation for the smaller "Overall performance" donut (116px). */
    .ajs-dash #perf_chart {
        min-height: 116px;
    }
    /* Uniform gutters + vertical spacing for every top-level dashboard section
       (page header, KPI tiles, K01-K06 cards, charts, tables, reports) so the
       padding is consistent across the whole page, not just the KPI row. */
    .ajs-dash > .row {
        --bs-gutter-x: 1.25rem;
        --bs-gutter-y: 1.25rem;
        margin-bottom: 1.25rem;
    }
    .ajs-dash > .row:last-child {
        margin-bottom: 0;
    }
    .ajs-dash .kpi-detail-cta {
        display: block;
        text-align: center;
        margin-top: auto;
        padding: .55rem;
        border-top: 1px dashed var(--vz-border-color);
        border-radius: 0 0 .75rem .75rem;
        font-size: .7rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: .4px;
        color: var(--vz-secondary-color, var(--vz-body-color));
        transition: color .18s ease, background .18s ease;
    }
    .ajs-dash a:hover .kpi-detail-cta {
        color: var(--vz-primary);
        background: var(--vz-primary-bg-subtle);
    }
    .ajs-dash .kpi-detail-cta .cta-arrow {
        transition: transform .18s ease;
        display: inline-block;
    }
    .ajs-dash a:hover .kpi-detail-cta .cta-arrow {
        transform: translateX(3px);
    }
    .ajs-dash .kpi-info {
        color: var(--vz-border-color);
        cursor: help;
        font-size: 15px;
        transition: color .18s ease;
    }
    .ajs-dash .kpi-info:hover {
        color: var(--vz-primary);
    }

    /* ── Ranked bar rows ────────────────────────────────────────────────── */
    .ajs-dash .bar-row + .bar-row {
        margin-top: .7rem;
    }
    .ajs-dash .bar-row .bar-track {
        height: 8px;
        border-radius: 99px;
        background: var(--vz-light);
        overflow: hidden;
    }
    .ajs-dash .bar-row .bar-fill {
        height: 8px;
        border-radius: 99px;
        width: 0;
        transition: width .9s cubic-bezier(.4, 0, .2, 1);
    }

    /* ── Report launcher ────────────────────────────────────────────────── */
    .ajs-dash .report-link {
        display: flex;
        align-items: center;
        gap: .75rem;
        padding: .6rem .5rem;
        border-radius: .5rem;
        text-decoration: none;
        color: var(--vz-body-color);
        transition: background .18s ease;
    }
    .ajs-dash .report-link + .report-link {
        margin-top: .15rem;
    }
    .ajs-dash .report-link:hover {
        background: var(--vz-light);
    }
    .ajs-dash .report-link .report-icon {
        width: 36px;
        height: 36px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
        font-size: 18px;
    }
    .ajs-dash .report-link .report-chev {
        transition: transform .18s ease;
        color: var(--vz-border-color);
    }
    .ajs-dash .report-link:hover .report-chev {
        transform: translateX(3px);
        color: var(--vz-primary);
    }

    /* ── Tables ─────────────────────────────────────────────────────────── */
    .ajs-dash table thead th {
        text-transform: uppercase;
        letter-spacing: .4px;
        font-size: .6875rem;
        font-weight: 600;
        color: var(--vz-secondary-color, var(--vz-body-color));
        border-bottom: 1px solid var(--vz-border-color);
        background: transparent;
    }
    .ajs-dash table tbody td {
        border-bottom: 1px dashed var(--vz-border-color);
    }
    .ajs-dash table tbody tr:last-child td {
        border-bottom: none;
    }

    /* ── Loading shimmer ────────────────────────────────────────────────── */
    .ajs-dash .skeleton {
        height: 12px;
        border-radius: 99px;
        margin-bottom: .7rem;
        background: linear-gradient(90deg, var(--vz-light) 25%, var(--vz-secondary-bg) 37%, var(--vz-light) 63%);
        background-size: 400% 100%;
        animation: dashShimmer 1.4s ease infinite;
    }
    @keyframes dashShimmer {
        0%   { background-position: 100% 50%; }
        100% { background-position: 0 50%; }
    }

    /* ── Entrance ───────────────────────────────────────────────────────── */
    .ajs-dash > .row {
        animation: dashFadeUp .45s ease both;
    }
    .ajs-dash > .row:nth-child(2) { animation-delay: .04s; }
    .ajs-dash > .row:nth-child(3) { animation-delay: .08s; }
    .ajs-dash > .row:nth-child(4) { animation-delay: .12s; }
    .ajs-dash > .row:nth-child(5) { animation-delay: .16s; }
    .ajs-dash > .row:nth-child(6) { animation-delay: .20s; }
    .ajs-dash > .row:nth-child(7) { animation-delay: .24s; }
    @keyframes dashFadeUp {
        from { opacity: 0; transform: translateY(10px); }
        to   { opacity: 1; transform: none; }
    }

    @media (prefers-reduced-motion: reduce) {
        .ajs-dash > .row,
        .ajs-dash .skeleton {
            animation: none;
        }
        .ajs-dash .card,
        .ajs-dash .pipeline-icon,
        .ajs-dash .bar-fill,
        .ajs-dash .stage-bar .progress-bar,
        .ajs-dash .kpi-cta,
        .ajs-dash .report-chev {
            transition: none;
        }
    }
</style>

<div class="main-content">
    <div class="page-content">
        <div class="container-fluid ajs-dash">
            <?php $this->load->view('app/inc/dashboard-status-colors'); ?>

            <!-- ================= Page header ================= -->
            <div class="row">
                <div class="col-12">
                    <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                        <div>
                            <h4 class="mb-1">Repairs &amp; Maintenance KPI Dashboard</h4>
                            <p class="text-muted mb-0 fs-13">
                                Live view of jobs, appointments and contract performance.
                                <span class="dash-updated"></span>
                            </p>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <span class="badge bg-light text-body border fs-12 fw-normal py-2 px-3">
                                <i class="ri-calendar-2-line me-1 align-middle"></i>KPI period: <span class="dash-period fw-semibold">--</span>
                            </span>
                            <button type="button" class="btn btn-soft-primary btn-sm" id="dash-refresh">
                                <i class="ri-refresh-line me-1 align-middle"></i>Refresh
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ================= Operational KPI tiles ================= -->
            <div class="row">
                <div class="col-xl col-lg-4 col-md-6">
                    <a href="<?= base_url('job/list?custom_filter=awaiting_appointment'); ?>" class="text-decoration-none d-block">
                        <div class="card kpi-tile bg-danger bg-gradient">
                            <div class="card-body">
                                <i class="ri-user-search-line kpi-watermark"></i>
                                <div class="d-flex align-items-center">
                                    <div class="flex-grow-1 overflow-hidden">
                                        <p class="text-uppercase fw-semibold text-white-50 text-truncate mb-2 fs-11">Awaiting Appointment</p>
                                        <h3 class="text-white mb-0 kpi-value"><span class="counter-value appointment-count" data-target="0">0</span></h3>
                                    </div>
                                    <div class="flex-shrink-0">
                                        <div class="kpi-icon"><i class="ri-user-search-line"></i></div>
                                    </div>
                                </div>
                                <p class="text-white-50 mb-0 mt-3 fs-12 kpi-cta">View jobs <i class="ri-arrow-right-line align-middle"></i></p>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="col-xl col-lg-4 col-md-6">
                    <a href="<?= base_url('job/list?custom_filter=awaiting_review'); ?>" class="text-decoration-none d-block">
                        <div class="card kpi-tile bg-warning bg-gradient">
                            <div class="card-body">
                                <i class="ri-eye-line kpi-watermark"></i>
                                <div class="d-flex align-items-center">
                                    <div class="flex-grow-1 overflow-hidden">
                                        <p class="text-uppercase fw-semibold text-white-50 text-truncate mb-2 fs-11">Awaiting Review</p>
                                        <h3 class="text-white mb-0 kpi-value"><span class="counter-value review-count" data-target="0">0</span></h3>
                                    </div>
                                    <div class="flex-shrink-0">
                                        <div class="kpi-icon"><i class="ri-eye-line"></i></div>
                                    </div>
                                </div>
                                <p class="text-white-50 mb-0 mt-3 fs-12 kpi-cta">View jobs <i class="ri-arrow-right-line align-middle"></i></p>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="col-xl col-lg-4 col-md-6">
                    <a href="<?= base_url('job/list?custom_filter=pending_invoice'); ?>" class="text-decoration-none d-block">
                        <div class="card kpi-tile bg-info bg-gradient">
                            <div class="card-body">
                                <i class="ri-bill-line kpi-watermark"></i>
                                <div class="d-flex align-items-center">
                                    <div class="flex-grow-1 overflow-hidden">
                                        <p class="text-uppercase fw-semibold text-white-50 text-truncate mb-2 fs-11">Pending Invoice</p>
                                        <h3 class="text-white mb-0 kpi-value"><span class="counter-value invoice-count" data-target="0">0</span></h3>
                                    </div>
                                    <div class="flex-shrink-0">
                                        <div class="kpi-icon"><i class="ri-bill-line"></i></div>
                                    </div>
                                </div>
                                <p class="text-white-50 mb-0 mt-3 fs-12 kpi-cta">View jobs <i class="ri-arrow-right-line align-middle"></i></p>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="col-xl col-lg-6 col-md-6">
                    <a href="<?= base_url('job/list?custom_filter=logged_last_30_days'); ?>" class="text-decoration-none d-block">
                        <div class="card kpi-tile bg-primary bg-gradient">
                            <div class="card-body">
                                <i class="ri-add-circle-line kpi-watermark"></i>
                                <div class="d-flex align-items-center">
                                    <div class="flex-grow-1 overflow-hidden">
                                        <p class="text-uppercase fw-semibold text-white-50 text-truncate mb-2 fs-11">Logged (30 days)</p>
                                        <h3 class="text-white mb-0 kpi-value"><span class="counter-value logged-last-30days-count" data-target="0">0</span></h3>
                                    </div>
                                    <div class="flex-shrink-0">
                                        <div class="kpi-icon"><i class="ri-add-circle-line"></i></div>
                                    </div>
                                </div>
                                <p class="text-white-50 mb-0 mt-3 fs-12 kpi-cta">View jobs <i class="ri-arrow-right-line align-middle"></i></p>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="col-xl col-lg-6 col-md-6">
                    <a href="<?= base_url('job/list?custom_filter=job_completed_last_30_days'); ?>" class="text-decoration-none d-block">
                        <div class="card kpi-tile bg-success bg-gradient">
                            <div class="card-body">
                                <i class="ri-checkbox-circle-line kpi-watermark"></i>
                                <div class="d-flex align-items-center">
                                    <div class="flex-grow-1 overflow-hidden">
                                        <p class="text-uppercase fw-semibold text-white-50 text-truncate mb-2 fs-11">Completed (30 days)</p>
                                        <h3 class="text-white mb-0 kpi-value"><span class="counter-value last-30days-count" data-target="0">0</span></h3>
                                    </div>
                                    <div class="flex-shrink-0">
                                        <div class="kpi-icon"><i class="ri-checkbox-circle-line"></i></div>
                                    </div>
                                </div>
                                <p class="text-white-50 mb-0 mt-3 fs-12 kpi-cta">View jobs <i class="ri-arrow-right-line align-middle"></i></p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            <!-- ================= Pipeline + Overall performance ================= -->
            <div class="row">
                <div class="col-xl-8">
                    <div class="card h-100">
                        <div class="card-header align-items-center d-flex">
                            <h4 class="card-title mb-0 flex-grow-1">Jobs state information</h4>
                            <small class="text-muted fs-12">Open states &middot; last 30 days activity</small>
                        </div>
                        <div class="card-body">
                            <div class="pipeline">
                                <a href="<?= base_url('job/list?custom_filter=logged_last_30_days'); ?>" class="pipeline-step text-decoration-none">
                                    <span class="pipeline-icon bg-primary-subtle text-primary"><i class="ri-add-circle-line"></i></span>
                                    <h4 class="mt-2 mb-0 text-body counter-value logged-last-30days-count" data-target="0">0</h4>
                                    <p class="text-muted fs-12 mb-0">Logged<br>(30 days)</p>
                                </a>

                                <a href="<?= base_url('job/list?custom_filter=awaiting_appointment'); ?>" class="pipeline-step text-decoration-none">
                                    <span class="pipeline-icon bg-danger-subtle text-danger"><i class="ri-user-search-line"></i></span>
                                    <h4 class="mt-2 mb-0 text-body counter-value appointment-count" data-target="0">0</h4>
                                    <p class="text-muted fs-12 mb-0">Awaiting<br>appointment</p>
                                </a>

                                <a href="<?= base_url('job/list?custom_filter=awaiting_review'); ?>" class="pipeline-step text-decoration-none">
                                    <span class="pipeline-icon bg-warning-subtle text-warning"><i class="ri-eye-line"></i></span>
                                    <h4 class="mt-2 mb-0 text-body counter-value review-count" data-target="0">0</h4>
                                    <p class="text-muted fs-12 mb-0">Awaiting<br>review</p>
                                </a>

                                <a href="<?= base_url('job/list?custom_filter=pending_invoice'); ?>" class="pipeline-step text-decoration-none">
                                    <span class="pipeline-icon bg-info-subtle text-info"><i class="ri-bill-line"></i></span>
                                    <h4 class="mt-2 mb-0 text-body counter-value invoice-count" data-target="0">0</h4>
                                    <p class="text-muted fs-12 mb-0">Pending<br>invoice</p>
                                </a>

                                <a href="<?= base_url('job/list?custom_filter=job_completed_last_30_days'); ?>" class="pipeline-step text-decoration-none">
                                    <span class="pipeline-icon bg-success-subtle text-success"><i class="ri-checkbox-circle-line"></i></span>
                                    <h4 class="mt-2 mb-0 text-body counter-value last-30days-count" data-target="0">0</h4>
                                    <p class="text-muted fs-12 mb-0">Completed<br>(30 days)</p>
                                </a>
                            </div>

                            <div class="progress stage-bar mt-4">
                                <div class="progress-bar bg-danger" id="seg-appointment" style="width:0%" title="Awaiting appointment"></div>
                                <div class="progress-bar bg-warning" id="seg-review" style="width:0%" title="Awaiting review"></div>
                                <div class="progress-bar bg-info" id="seg-invoice" style="width:0%" title="Pending invoice"></div>
                            </div>
                            <div class="d-flex flex-wrap justify-content-between mt-2">
                                <span class="text-muted fs-13">Total open jobs: <b class="text-body tabular open-total">0</b></span>
                                <span class="text-muted fs-13" data-bs-toggle="tooltip" data-bs-placement="top"
                                      title="Jobs completed vs jobs logged in the last 30 days. Can exceed 100% when jobs logged earlier are completed in this window.">
                                    Completion rate (30 days): <b class="text-body tabular completion-rate">--</b>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-4">
                    <div class="card h-100">
                        <div class="card-header align-items-center d-flex">
                            <h4 class="card-title mb-0 flex-grow-1">Overall performance</h4>
                            <i class="ri-information-line kpi-info" data-bs-toggle="tooltip" data-bs-placement="top"
                               title="The share of contract KPIs currently meeting their target. KPIs with no records in the period cannot be measured, so they are listed as 'no data' and excluded from the score."></i>
                        </div>
                        <div class="card-body">
                            <div class="d-flex align-items-center">
                                <div class="flex-shrink-0 position-relative" style="width:116px;">
                                    <div id="perf_chart" data-colors='["--vz-success", "--vz-danger"]' class="apex-charts"></div>
                                    <div class="position-absolute top-50 start-50 translate-middle text-center">
                                        <span class="fs-20 fw-bold perf-pct">--</span>
                                        <small class="d-block text-muted fs-10">on target</small>
                                    </div>
                                </div>
                                <div class="flex-grow-1 ps-3">
                                    <p class="mb-1 fs-13">
                                        <i class="ri-circle-fill text-success me-1 fs-10"></i>On target
                                        <span class="float-end fw-semibold tabular perf-on">0</span>
                                    </p>
                                    <p class="mb-1 fs-13">
                                        <i class="ri-circle-fill text-danger me-1 fs-10"></i>Below target
                                        <span class="float-end fw-semibold tabular perf-below">0</span>
                                    </p>
                                    <p class="mb-1 fs-13 perf-nodata-row d-none">
                                        <i class="ri-circle-fill text-muted me-1 fs-10 opacity-50"></i>No data
                                        <span class="float-end fw-semibold tabular perf-nodata">0</span>
                                    </p>
                                    <p class="text-muted mb-0 fs-11 mt-2 perf-note">&nbsp;</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ================= Operational addons ================= -->
            <!--
                Both cards load independently of the KPI block: the delay board
                is on a 90s cache and must not be held up by the monthly KPI
                aggregates, which cache for a day.
            -->
            <div class="row">
                <div class="col-xl-6 col-lg-12">
                    <a href="<?= base_url('dashboard/delay-board') ?>" class="text-decoration-none d-block">
                        <div class="card kpi-tile bg-danger bg-gradient h-100">
                            <div class="card-body">
                                <i class="ri-alarm-warning-line kpi-watermark"></i>
                                <div class="d-flex align-items-center">
                                    <div class="flex-grow-1 overflow-hidden">
                                        <p class="text-uppercase fw-semibold text-white-50 text-truncate mb-2 fs-11">Today at Risk</p>
                                        <h3 class="text-white mb-0 kpi-value">
                                            <span class="counter-value delay-at-risk-count" data-target="0">0</span>
                                        </h3>
                                        <p class="text-white-50 mb-0 mt-1 fs-12 delay-top-exceptions">Checking&hellip;</p>
                                    </div>
                                    <div class="flex-shrink-0">
                                        <div class="kpi-icon"><i class="ri-alarm-warning-line"></i></div>
                                    </div>
                                </div>
                                <p class="text-white-50 mb-0 mt-3 fs-12 kpi-cta">Open board <i class="ri-arrow-right-line align-middle"></i></p>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="col-xl-6 col-lg-12">
                    <a href="<?= base_url('dashboard/compliance') ?>" class="text-decoration-none d-block">
                        <div class="card kpi-tile bg-info bg-gradient h-100">
                            <div class="card-body">
                                <i class="ri-shield-check-line kpi-watermark"></i>
                                <div class="d-flex align-items-center">
                                    <div class="flex-grow-1 overflow-hidden">
                                        <p class="text-uppercase fw-semibold text-white-50 text-truncate mb-2 fs-11">Servicing Compliance</p>
                                        <h3 class="text-white mb-0 kpi-value">
                                            <span class="compliance-pct">&mdash;</span>
                                        </h3>
                                        <p class="text-white-50 mb-0 mt-1 fs-12 compliance-breakdown">Loading&hellip;</p>
                                    </div>
                                    <div class="flex-shrink-0">
                                        <div class="kpi-icon"><i class="ri-shield-check-line"></i></div>
                                    </div>
                                </div>
                                <p class="text-white-50 mb-0 mt-3 fs-12 kpi-cta">View report <i class="ri-arrow-right-line align-middle"></i></p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            <!-- ================= Contract KPIs (K01 - K06) ================= -->
            <div class="row row-cols-1 row-cols-md-2 row-cols-xl-5">
                <div class="col">
                    <div class="card h-100 kpi-ring-card">
                        <div class="card-header align-items-center d-flex">
                            <h4 class="card-title mb-0 flex-grow-1">K01 &mdash; First Time Fix</h4>
                            <i class="ri-information-line kpi-info" data-bs-toggle="tooltip" data-bs-placement="top" title="Jobs completed on the engineer's first visit this month."></i>
                        </div>
                        <div class="card-body text-center pt-2">
                            <div class="position-relative">
                                <div id="k01_chart" data-colors='["--vz-primary"]' class="apex-charts"></div>
                                <div class="position-absolute top-50 start-50 translate-middle text-center" style="pointer-events:none;">
                                    <span class="fs-22 fw-bold k01-percentage">0%</span>
                                    <small class="d-block text-muted fs-11">First time fix</small>
                                </div>
                            </div>
                            <p class="text-muted mb-0 fs-13">
                                <span class="k01-fix-count fw-semibold text-body tabular">0</span> of <span class="k01-total-count fw-semibold text-body tabular">0</span> jobs
                            </p>
                            <p class="text-muted mb-0 fs-11 mt-1 k01-period"></p>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <a href="<?= base_url('dashboard/k03-detail') ?>" class="text-decoration-none">
                        <div class="card h-100 kpi-ring-card">
                            <div class="card-header align-items-center d-flex">
                                <h4 class="card-title mb-0 flex-grow-1">K03a &mdash; Attended</h4>
                            <i class="ri-information-line kpi-info" data-bs-toggle="tooltip" data-bs-placement="top" title="Jobs where the engineer arrived on site within the target attendance time. Contract target 95%."></i>
                            </div>
                            <div class="card-body text-center pt-2">
                                <div class="position-relative">
                                <div id="k03a_chart" data-colors='["--vz-success"]' class="apex-charts"></div>
                                <div class="position-absolute top-50 start-50 translate-middle text-center" style="pointer-events:none;">
                                    <span class="fs-22 fw-bold k03a-percentage">0%</span>
                                    <small class="d-block text-muted fs-11">Within target</small>
                                </div>
                            </div>
                                <p class="text-muted mb-0 fs-13">
                                    <span class="k03a-pass-count fw-semibold text-body tabular">0</span> of <span class="k03a-total-count fw-semibold text-body tabular">0</span> jobs
                                </p>
                                <p class="mb-0 mt-1"><span class="badge bg-light text-body fw-normal fs-11 kpi-chip" data-kpi="k03a">Target 95%</span></p>
                                <p class="text-muted mb-0 fs-11 mt-1 k03a-period"></p>
                            </div>
                            <span class="kpi-detail-cta"><i class="ri-eye-line align-middle me-1"></i>View detail <i class="ri-arrow-right-line align-middle cta-arrow"></i></span>
                        </div>
                    </a>
                </div>

                <div class="col">
                    <a href="<?= base_url('dashboard/k03-detail') ?>" class="text-decoration-none">
                        <div class="card h-100 kpi-ring-card">
                            <div class="card-header align-items-center d-flex">
                                <h4 class="card-title mb-0 flex-grow-1">K03b &mdash; Completed</h4>
                            <i class="ri-information-line kpi-info" data-bs-toggle="tooltip" data-bs-placement="top" title="Tasks completed within the fix-time target. Contract target 95%."></i>
                            </div>
                            <div class="card-body text-center pt-2">
                                <div class="position-relative">
                                <div id="k03b_chart" data-colors='["--vz-info"]' class="apex-charts"></div>
                                <div class="position-absolute top-50 start-50 translate-middle text-center" style="pointer-events:none;">
                                    <span class="fs-22 fw-bold k03b-percentage">0%</span>
                                    <small class="d-block text-muted fs-11">Within target</small>
                                </div>
                            </div>
                                <p class="text-muted mb-0 fs-13">
                                    <span class="k03b-pass-count fw-semibold text-body tabular">0</span> of <span class="k03b-total-count fw-semibold text-body tabular">0</span> tasks
                                </p>
                                <p class="mb-0 mt-1"><span class="badge bg-light text-body fw-normal fs-11 kpi-chip" data-kpi="k03b">Target 95%</span></p>
                                <p class="text-muted mb-0 fs-11 mt-1 k03b-period"></p>
                            </div>
                            <span class="kpi-detail-cta"><i class="ri-eye-line align-middle me-1"></i>View detail <i class="ri-arrow-right-line align-middle cta-arrow"></i></span>
                        </div>
                    </a>
                </div>

                <div class="col">
                    <a href="<?= base_url('dashboard/k04-detail') ?>" class="text-decoration-none">
                        <div class="card h-100 kpi-ring-card">
                            <div class="card-header align-items-center d-flex">
                                <h4 class="card-title mb-0 flex-grow-1">K04 &mdash; Appts Kept</h4>
                            <i class="ri-information-line kpi-info" data-bs-toggle="tooltip" data-bs-placement="top" title="Appointments where an outcome was recorded. Contract target 99%."></i>
                            </div>
                            <div class="card-body text-center pt-2">
                                <div class="position-relative">
                                <div id="k04_chart" data-colors='["--vz-warning"]' class="apex-charts"></div>
                                <div class="position-absolute top-50 start-50 translate-middle text-center" style="pointer-events:none;">
                                    <span class="fs-22 fw-bold k04-percentage">0%</span>
                                    <small class="d-block text-muted fs-11">Outcome recorded</small>
                                </div>
                            </div>
                                <p class="text-muted mb-0 fs-13">
                                    <span class="k04-kept-count fw-semibold text-body tabular">0</span> of <span class="k04-total-count fw-semibold text-body tabular">0</span> appts
                                </p>
                                <p class="mb-0 mt-1"><span class="badge bg-light text-body fw-normal fs-11 kpi-chip" data-kpi="k04">Target 99%</span></p>
                                <p class="text-muted mb-0 fs-11 mt-1 k04-period"></p>
                            </div>
                            <span class="kpi-detail-cta"><i class="ri-eye-line align-middle me-1"></i>View detail <i class="ri-arrow-right-line align-middle cta-arrow"></i></span>
                        </div>
                    </a>
                </div>

                <div class="col">
                    <a href="<?= base_url('dashboard/k06-detail') ?>" class="text-decoration-none">
                        <div class="card h-100 kpi-ring-card">
                            <div class="card-header align-items-center d-flex">
                                <h4 class="card-title mb-0 flex-grow-1">K06 &mdash; Rectifications</h4>
                            <i class="ri-information-line kpi-info" data-bs-toggle="tooltip" data-bs-placement="top" title="Rectification jobs completed within 2 working days. Contract target 99%."></i>
                            </div>
                            <div class="card-body text-center pt-2">
                                <div class="position-relative">
                                <div id="k06_chart" data-colors='["--vz-success"]' class="apex-charts"></div>
                                <div class="position-absolute top-50 start-50 translate-middle text-center" style="pointer-events:none;">
                                    <span class="fs-22 fw-bold k06-percentage">0%</span>
                                    <small class="d-block text-muted fs-11">On time</small>
                                </div>
                            </div>
                                <p class="text-muted mb-0 fs-13">
                                    <span class="k06-on-time-count fw-semibold text-body tabular">0</span> of <span class="k06-total-count fw-semibold text-body tabular">0</span> rects
                                </p>
                                <p class="mb-0 mt-1"><span class="badge bg-light text-body fw-normal fs-11 kpi-chip" data-kpi="k06">Target 99%</span></p>
                                <p class="text-muted mb-0 fs-11 mt-1 k06-period"></p>
                            </div>
                            <span class="kpi-detail-cta"><i class="ri-eye-line align-middle me-1"></i>View detail <i class="ri-arrow-right-line align-middle cta-arrow"></i></span>
                        </div>
                    </a>
                </div>
            </div>

            <!-- ================= Jobs by service + Appointment outcomes ================= -->
            <div class="row">
                <div class="col-xl-7">
                    <div class="card h-100">
                        <div class="card-header align-items-center d-flex">
                            <h4 class="card-title mb-0 flex-grow-1">Jobs by service type</h4>
                            <a href="<?= base_url('dashboard/k03-detail') ?>" class="text-muted fs-12 text-decoration-none">Detail <i class="ri-arrow-right-line align-middle"></i></a>
                        </div>
                        <div class="card-body" id="service-breakdown">
                            <div class="skeleton w-75"></div>
                            <div class="skeleton w-50"></div>
                            <div class="skeleton w-100"></div>
                            <div class="skeleton w-50"></div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-5">
                    <div class="card h-100">
                        <div class="card-header align-items-center d-flex">
                            <h4 class="card-title mb-0 flex-grow-1">Appointment outcomes</h4>
                            <a href="<?= base_url('dashboard/k04-detail') ?>" class="text-muted fs-12 text-decoration-none">Detail <i class="ri-arrow-right-line align-middle"></i></a>
                        </div>
                        <div class="card-body">
                            <div id="appt_outcome_chart" data-colors='["--vz-danger", "--vz-warning", "--vz-info", "--vz-primary", "--vz-secondary"]' class="apex-charts"></div>
                            <div id="appt-outcome-legend" class="mt-2">
                                <div class="skeleton w-75"></div>
                                <div class="skeleton w-50"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ================= Late jobs + Reports ================= -->
            <div class="row">
                <div class="col-xl-8">
                    <div class="card h-100">
                        <div class="card-header align-items-center d-flex">
                            <h4 class="card-title mb-0 flex-grow-1">Most overdue jobs (top 5)</h4>
                            <a href="<?= base_url('dashboard/k03-detail') ?>" class="text-muted fs-12 text-decoration-none">View all <i class="ri-arrow-right-line align-middle"></i></a>
                        </div>
                        <div class="card-body p-0">
                            <div class="table-responsive">
                                <table class="table table-sm table-hover align-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th class="ps-3">Job code</th>
                                            <th>Service</th>
                                            <th>Address</th>
                                            <th>Engineer</th>
                                            <th class="text-end pe-3">Late by</th>
                                        </tr>
                                    </thead>
                                    <tbody id="late-jobs-body">
                                        <tr>
                                            <td colspan="5" class="text-center text-muted py-4">
                                                <i class="ri-loader-4-line me-1"></i>Loading&hellip;
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-4">
                    <div class="card h-100">
                        <div class="card-header align-items-center d-flex">
                            <h4 class="card-title mb-0 flex-grow-1">Generate reports</h4>
                        </div>
                        <div class="card-body py-2">
                            <a href="<?= base_url('reports/r01'); ?>" class="report-link check-permission" data-module="Reports" data-action="view">
                                <span class="report-icon bg-primary-subtle text-primary"><i class="ri-file-list-3-line"></i></span>
                                <span class="flex-grow-1">
                                    <span class="d-block fw-semibold fs-13">R01 &mdash; Supplier Summary</span>
                                    <small class="text-muted fs-11">Jobs reported vs completed by supplier</small>
                                </span>
                                <i class="ri-arrow-right-s-line report-chev"></i>
                            </a>
                            <a href="<?= base_url('reports/r02'); ?>" class="report-link check-permission" data-module="Reports" data-action="view">
                                <span class="report-icon bg-warning-subtle text-warning"><i class="ri-tools-line"></i></span>
                                <span class="flex-grow-1">
                                    <span class="d-block fw-semibold fs-13">R02 &mdash; Work in Progress</span>
                                    <small class="text-muted fs-11">Weekly WIP by contract</small>
                                </span>
                                <i class="ri-arrow-right-s-line report-chev"></i>
                            </a>
                            <a href="<?= base_url('reports/r04'); ?>" class="report-link check-permission" data-module="Reports" data-action="view">
                                <span class="report-icon bg-success-subtle text-success"><i class="ri-emotion-happy-line"></i></span>
                                <span class="flex-grow-1">
                                    <span class="d-block fw-semibold fs-13">R04 &mdash; Job Satisfaction Survey</span>
                                    <small class="text-muted fs-11">Tenant satisfaction responses</small>
                                </span>
                                <i class="ri-arrow-right-s-line report-chev"></i>
                            </a>
                            <a href="<?= base_url('reports/r08'); ?>" class="report-link check-permission" data-module="Reports" data-action="view">
                                <span class="report-icon bg-info-subtle text-info"><i class="ri-shield-check-line"></i></span>
                                <span class="flex-grow-1">
                                    <span class="d-block fw-semibold fs-13">R08 &mdash; Property Condition &amp; H&amp;S</span>
                                    <small class="text-muted fs-11">Condition and safety observations</small>
                                </span>
                                <i class="ri-arrow-right-s-line report-chev"></i>
                            </a>
                            <a href="<?= base_url('reports/completed-certificate-report'); ?>" class="report-link check-permission" data-module="Reports" data-action="view">
                                <span class="report-icon bg-danger-subtle text-danger"><i class="ri-award-line"></i></span>
                                <span class="flex-grow-1">
                                    <span class="d-block fw-semibold fs-13">Completed Certificates</span>
                                    <small class="text-muted fs-11">Certificates issued on completion</small>
                                </span>
                                <i class="ri-arrow-right-s-line report-chev"></i>
                            </a>
                            <a href="<?= base_url('reports/list'); ?>" class="btn btn-primary w-100 mt-3 mb-2 check-permission" data-module="Reports" data-action="view">
                                <i class="ri-settings-4-line me-1 align-middle"></i>Custom report builder
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ================= Logged vs completed + system totals ================= -->
            <div class="row">
                <div class="col-xl-8">
                    <div class="card h-100">
                        <div class="card-header align-items-center d-flex">
                            <h4 class="card-title mb-0 flex-grow-1">Jobs logged vs completed</h4>
                            <small class="text-muted fs-12">Today &middot; 7 days &middot; 30 days</small>
                        </div>
                        <div class="card-body">
                            <div id="logged_completed_chart" data-colors='["--vz-primary", "--vz-success"]' class="apex-charts" dir="ltr"></div>
                            <div class="table-responsive mt-2">
                                <table class="table table-sm align-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th>Period</th>
                                            <th class="text-end">Logged</th>
                                            <th class="text-end">Completed</th>
                                            <th class="text-end">Open</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Today</td>
                                            <td class="text-end"><a href="<?= base_url('job/list?custom_filter=logged_today'); ?>" class="fw-semibold tabular counter-value logged-today-count" data-target="0">0</a></td>
                                            <td class="text-end"><a href="<?= base_url('job/list?custom_filter=job_completed_today'); ?>" class="fw-semibold tabular counter-value today-count" data-target="0">0</a></td>
                                            <td class="text-end text-muted tabular open-today">0</td>
                                        </tr>
                                        <tr>
                                            <td>Last 7 days</td>
                                            <td class="text-end"><a href="<?= base_url('job/list?custom_filter=logged_last_7_days'); ?>" class="fw-semibold tabular counter-value logged-last-7days-count" data-target="0">0</a></td>
                                            <td class="text-end"><a href="<?= base_url('job/list?custom_filter=job_completed_last_7_days'); ?>" class="fw-semibold tabular counter-value last-7days-count" data-target="0">0</a></td>
                                            <td class="text-end text-muted tabular open-7days">0</td>
                                        </tr>
                                        <tr>
                                            <td>Last 30 days</td>
                                            <td class="text-end"><a href="<?= base_url('job/list?custom_filter=logged_last_30_days'); ?>" class="fw-semibold tabular counter-value logged-last-30days-count" data-target="0">0</a></td>
                                            <td class="text-end"><a href="<?= base_url('job/list?custom_filter=job_completed_last_30_days'); ?>" class="fw-semibold tabular counter-value last-30days-count" data-target="0">0</a></td>
                                            <td class="text-end text-muted tabular open-30days">0</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-4">
                    <div class="card h-100">
                        <div class="card-header align-items-center d-flex">
                            <h4 class="card-title mb-0 flex-grow-1">System totals</h4>
                        </div>
                        <div class="card-body p-0">
                            <ul class="list-group list-group-flush px-3">
                                <li class="list-group-item px-0 border-0 border-bottom border-dashed">
                                    <a href="<?= base_url('contract/list'); ?>" class="d-flex align-items-center text-decoration-none">
                                        <div class="avatar-sm flex-shrink-0 me-3">
                                            <span class="avatar-title bg-success-subtle rounded fs-4">
                                                <i class="ri-file-text-line text-success"></i>
                                            </span>
                                        </div>
                                        <div class="flex-grow-1">
                                            <p class="text-muted mb-0 fs-13">Total contracts</p>
                                        </div>
                                        <h5 class="mb-0"><span class="counter-value contract-count" data-target="0">0</span></h5>
                                    </a>
                                </li>
                                <li class="list-group-item px-0 border-0 border-bottom border-dashed">
                                    <a href="<?= base_url('properties/list'); ?>" class="d-flex align-items-center text-decoration-none">
                                        <div class="avatar-sm flex-shrink-0 me-3">
                                            <span class="avatar-title bg-info-subtle rounded fs-4">
                                                <i class="ri-building-line text-info"></i>
                                            </span>
                                        </div>
                                        <div class="flex-grow-1">
                                            <p class="text-muted mb-0 fs-13">Total properties</p>
                                        </div>
                                        <h5 class="mb-0"><span class="counter-value property-count" data-target="0">0</span></h5>
                                    </a>
                                </li>
                                <li class="list-group-item px-0 border-0 border-bottom border-dashed">
                                    <a href="<?= base_url('clients/list'); ?>" class="d-flex align-items-center text-decoration-none">
                                        <div class="avatar-sm flex-shrink-0 me-3">
                                            <span class="avatar-title bg-warning-subtle rounded fs-4">
                                                <i class="ri-briefcase-line text-warning"></i>
                                            </span>
                                        </div>
                                        <div class="flex-grow-1">
                                            <p class="text-muted mb-0 fs-13">Clients</p>
                                        </div>
                                        <h5 class="mb-0"><span class="counter-value client-count" data-target="0">0</span></h5>
                                    </a>
                                </li>
                                <li class="list-group-item px-0 border-0">
                                    <a href="<?= base_url('system/user/list'); ?>" class="d-flex align-items-center text-decoration-none">
                                        <div class="avatar-sm flex-shrink-0 me-3">
                                            <span class="avatar-title bg-primary-subtle rounded fs-4">
                                                <i class="ri-group-line text-primary"></i>
                                            </span>
                                        </div>
                                        <div class="flex-grow-1">
                                            <p class="text-muted mb-0 fs-13">Users</p>
                                        </div>
                                        <h5 class="mb-0"><span class="counter-value user-count" data-target="0">0</span></h5>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <input type="hidden" id="is_dashboard" value="1"/>
</div>
<script src="<?= cnd_url('assets/libs/apexcharts/apexcharts.min.js'); ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/app/dashboard.js') ?>"></script>
