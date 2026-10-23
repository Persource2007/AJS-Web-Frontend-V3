<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <?php include_once APPPATH . 'views/commons/breadcrumb.php'; ?>

            <div class="row">
                <div class="col-lg-12">
                    <div class="same-page-height dataTables-height" id="app-error-logs-wrapper" role="tabpanel">
                        <div class="card" id="tasksList">

                            <!-- Filter Bar -->
                            <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3">
                                <form id="form_filters" onsubmit="return false;">
                                    <div class="d-flex flex-wrap gap-2 align-items-end">

                                        <div style="width:130px;">
                                            <select id="filter_month" class="form-select form-select-sm">
                                                <?php
                                                for ($i = 1; $i <= 12; $i++) {
                                                    $m   = date('F', mktime(0, 0, 0, $i, 10));
                                                    $sel = ($m == date('F')) ? 'selected' : '';
                                                    echo "<option {$sel} value='{$m}'>{$m}</option>";
                                                }
                                                ?>
                                            </select>
                                        </div>

                                        <div style="width:110px;">
                                            <select id="filter_year" class="form-select form-select-sm">
                                                <?php
                                                $start_year = defined('START_YEAR') ? START_YEAR : (int) date('Y') - 5;
                                                for ($i = $start_year; $i <= (int) date('Y'); $i++) {
                                                    $sel = ($i == (int) date('Y')) ? 'selected' : '';
                                                    echo "<option {$sel} value='{$i}'>{$i}</option>";
                                                }
                                                ?>
                                            </select>
                                        </div>

                                        <div style="width:130px;">
                                            <select id="filter_severity" class="form-select form-select-sm">
                                                <option value="">All Severity</option>
                                                <option value="critical">Critical</option>
                                                <option value="error">Error</option>
                                                <option value="warning">Warning</option>
                                                <option value="info">Info</option>
                                            </select>
                                        </div>

                                        <div style="width:130px;">
                                            <select id="filter_error_type" class="form-select form-select-sm">
                                                <option value="">All Types</option>
                                                <option value="backend">Backend</option>
                                                <option value="frontend">Frontend</option>
                                                <option value="db">Database</option>
                                                <option value="api">API</option>
                                            </select>
                                        </div>

                                        <div style="width:200px;">
                                            <input type="text" id="filter_search" class="form-control form-control-sm" placeholder="Search message / URL / module">
                                        </div>

                                        <button type="button" onclick="apply_filters()" class="btn btn-primary btn-sm">
                                            <i class="ri-filter-line align-bottom"></i> Filter
                                        </button>

                                        <button type="button" onclick="clear_filters()" class="btn btn-light btn-sm">
                                            <i class="ri-refresh-line align-bottom"></i> Clear
                                        </button>

                                        <button type="button" onclick="cleanup_logs()" class="btn btn-outline-danger btn-sm ms-auto">
                                            <i class="ri-delete-bin-line align-bottom"></i> Cleanup (90d+)
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <!-- DataTable -->
                            <div class="card-body pt-0 all-tbl-same-width1" style="padding-top:10px !important;">
                                <div class="table-responsive table-card mb-0">
                                    <table class="table align-middle table-nowrap mb-0 display job-listing-table table-hover" id="ajax-datatables">
                                        <thead class="table-light text-muted">
                                            <tr>
                                                <th>Severity</th>
                                                <th>Type</th>
                                                <th>Message</th>
                                                <th>File / Module</th>
                                                <th>API URL</th>
                                                <th>User</th>
                                                <th>IP</th>
                                                <th>Date / Time</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <script>
        function cleanup_logs() {
            if (!confirm('Delete all error logs older than 90 days? This cannot be undone.')) return;
            ajs.ajax_form(site_url + 'log/system/app_error_log/cleanup', null, 'GET', null, '1', '0', function (r) {
                if (r && r.status) {
                    ajs.showAlertBar('success', 'Deleted ' + r.deleted + ' old log entries.', true, true);
                }
            });
        }

        $(function () {
            // Use apply_filters so initial request carries current month/year
            apply_filters();
        });
    </script>

    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/systems/app-error-logs.js') ?>"></script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
</div>
