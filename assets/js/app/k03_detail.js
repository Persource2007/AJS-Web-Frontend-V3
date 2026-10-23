var k03DataLoaded = false;
var k03HistoryCache = {};

// ─── History trail ────────────────────────────────────────────────────────────

function buildK03HistoryTimeline(events) {
    if (!events || events.length === 0) {
        return '<p class="text-muted mb-0 py-2 px-3">No history events found.</p>';
    }
    var html = '<ul class="list-unstyled mb-0 py-2 px-3" style="border-left:3px solid #dee2e6;margin-left:8px;">';
    events.forEach(function (e) {
        var actionLabel = e.action.replace(/_/g, ' ');
        html += '<li class="mb-2 ps-3 position-relative">';
        html += '<span class="position-absolute" style="left:-7px;top:4px;width:11px;height:11px;background:#6c757d;border-radius:50%;display:inline-block;"></span>';
        html += '<small class="text-muted d-block">' + e.date + (e.user ? ' &middot; ' + e.user : '') + (e.platform ? ' (' + e.platform + ')' : '') + '</small>';
        html += '<strong class="fs-12">' + actionLabel + '</strong>';
        if (e.comments) {
            html += ' &mdash; <span class="text-muted fs-12">' + e.comments + '</span>';
        }
        html += '</li>';
    });
    html += '</ul>';
    return html;
}

function loadK03History(refType, refId, $container) {
    var cacheKey = refType + '_' + refId;
    if (k03HistoryCache[cacheKey]) {
        $container.html(buildK03HistoryTimeline(k03HistoryCache[cacheKey]));
        return;
    }
    $container.html('<p class="text-muted py-2 px-3 mb-0"><i class="las la-spinner la-spin"></i> Loading history...</p>');

    var paramStr = refType === 'T' ? 'task_id=' + refId : 'job_id=' + refId;
    ajs.ajax_form(
        site_url + 'dashboard/task-history?' + paramStr,
        null, 'GET', null, '0', '0',
        function (res) {
            if (res && res.status && res.data) {
                k03HistoryCache[cacheKey] = res.data;
                $container.html(buildK03HistoryTimeline(res.data));
            } else {
                $container.html('<p class="text-danger py-2 px-3 mb-0">Failed to load history.</p>');
            }
        },
        function () {
            $container.html('<p class="text-danger py-2 px-3 mb-0">Error loading history.</p>');
        }
    );
}

$(document).on('click', '.k03-history-btn', function () {
    var $btn    = $(this);
    var refType = $btn.data('ref-type');
    var refId   = $btn.data('ref-id');
    var rowId   = 'k03hist_' + refType + '_' + refId;
    var $histRow = $('#' + rowId);

    if ($histRow.length) {
        $histRow.toggle();
        return;
    }

    var colCount = $btn.closest('tr').find('td').length;
    var $row = $('<tr id="' + rowId + '" class="k03-history-row"><td colspan="' + colCount + '" class="p-0 bg-light"></td></tr>');
    $btn.closest('tr').after($row);
    loadK03History(refType, refId, $row.find('td'));
});

// ─── Accordion builders ───────────────────────────────────────────────────────

function k03HistoryBtn(refType, refId) {
    return '<button class="btn btn-xs btn-outline-secondary k03-history-btn py-0 px-1 fs-11" data-ref-type="' + refType + '" data-ref-id="' + refId + '" title="View history"><i class="las la-history"></i></button>';
}

function buildK03aAccordion(services) {
    var html = '';
    services.forEach(function (svc, idx) {
        var pct = svc.k03a_pct;
        var badgeClass = pct >= 95 ? 'bg-success' : 'bg-danger';
        var failed = svc.k03a_failed_jobs || [];
        var collapseId = 'k03a_collapse_' + idx;

        html += '<div class="accordion-item">';
        html += '<h2 class="accordion-header">';
        html += '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#' + collapseId + '">';
        html += '<span class="flex-grow-1">' + svc.service_title + '</span>';
        html += '<span class="badge ' + badgeClass + ' me-2">' + pct + '%</span>';
        html += '<span class="text-muted me-3 fs-13">(' + svc.k03a_pass + ' / ' + svc.total_jobs + ' jobs)</span>';
        html += '</button></h2>';
        html += '<div id="' + collapseId + '" class="accordion-collapse collapse" data-bs-parent="#k03a-accordion">';
        html += '<div class="accordion-body p-0">';

        if (failed.length === 0) {
            html += '<p class="text-success p-3 mb-0"><i class="las la-check-circle"></i> All jobs attended within target.</p>';
        } else {
            html += '<div class="table-responsive"><table class="table table-sm table-striped mb-0">';
            html += '<thead class="table-light"><tr>';
            html += '<th>Job Code</th><th>Job Type</th><th>Target</th><th>Actual (hrs)</th><th>Late By (hrs)</th><th>Engineer</th><th>Address</th><th></th>';
            html += '</tr></thead><tbody>';
            failed.forEach(function (job) {
                html += '<tr>';
                html += '<td>' + job.code + '</td>';
                html += '<td>' + job.service_title + '</td>';
                html += '<td>' + (job.target_display || job.target_hours + ' hrs') + '</td>';
                html += '<td>' + job.actual_hours + '</td>';
                html += '<td class="text-danger fw-semibold">+' + job.late_by_hours + '</td>';
                html += '<td>' + job.engineer_name + '</td>';
                html += '<td>' + job.property_address + '</td>';
                html += '<td class="text-end">' + k03HistoryBtn('J', job.job_id) + '</td>';
                html += '</tr>';
            });
            html += '</tbody></table></div>';
        }

        html += '</div></div></div>';
    });
    return html || '<p class="text-muted p-3">No data available for this period.</p>';
}

function buildK03bAccordion(services) {
    var html = '';
    services.forEach(function (svc, idx) {
        var pct = svc.k03b_pct;
        var badgeClass = pct >= 95 ? 'bg-success' : 'bg-danger';
        var failed = svc.k03b_failed_tasks || [];
        var collapseId = 'k03b_collapse_' + idx;

        html += '<div class="accordion-item">';
        html += '<h2 class="accordion-header">';
        html += '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#' + collapseId + '">';
        html += '<span class="flex-grow-1">' + svc.service_title + '</span>';
        html += '<span class="badge ' + badgeClass + ' me-2">' + pct + '%</span>';
        html += '<span class="text-muted me-3 fs-13">(' + svc.k03b_pass + ' / ' + svc.total_tasks + ' tasks)</span>';
        html += '</button></h2>';
        html += '<div id="' + collapseId + '" class="accordion-collapse collapse" data-bs-parent="#k03b-accordion">';
        html += '<div class="accordion-body p-0">';

        if (failed.length === 0) {
            html += '<p class="text-success p-3 mb-0"><i class="las la-check-circle"></i> All tasks completed within target.</p>';
        } else {
            html += '<div class="table-responsive"><table class="table table-sm table-striped mb-0">';
            html += '<thead class="table-light"><tr>';
            html += '<th>Task Code</th><th>Job Code</th><th>Fix Target</th><th>Actual (hrs)</th><th>Late By (hrs)</th><th>Engineer</th><th>Address</th><th></th>';
            html += '</tr></thead><tbody>';
            failed.forEach(function (task) {
                html += '<tr>';
                html += '<td>' + task.task_code + '</td>';
                html += '<td>' + task.code + '</td>';
                html += '<td>' + (task.target_display || task.target_hours + ' hrs') + '</td>';
                html += '<td>' + task.actual_hours + '</td>';
                html += '<td class="text-danger fw-semibold">+' + task.late_by_hours + '</td>';
                html += '<td>' + task.engineer_name + '</td>';
                html += '<td>' + task.property_address + '</td>';
                html += '<td class="text-end">' + k03HistoryBtn('T', task.task_id) + '</td>';
                html += '</tr>';
            });
            html += '</tbody></table></div>';
        }

        html += '</div></div></div>';
    });
    return html || '<p class="text-muted p-3">No data available for this period.</p>';
}

// ─── Render ───────────────────────────────────────────────────────────────────

function exportK03() {
    Swal.fire({ title: 'Generating...', text: 'Please wait while the Excel file is prepared.', allowOutsideClick: false, didOpen: function () { Swal.showLoading(); } });
    ajs.ajax_form(site_url + 'dashboard/k03-export', null, 'GET', null, '1', '1',
        function (res) {
            Swal.close();
            if (res && res.status && res.path) {
                window.location.href = site_url + res.path;
            } else {
                Swal.fire({ icon: 'error', title: 'Export Failed', text: res.message || 'Could not generate the Excel file.' });
            }
        },
        function () { Swal.fire({ icon: 'error', title: 'Export Failed', text: 'An error occurred while generating the report.' }); }
    );
}

function set_k03_detail(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var data = result_json.data;

        $('.k03-detail-period').text(data.period || '');
        $('.k03a-overall-pct').text(data.overall_k03a_pct + '%');
        $('.k03b-overall-pct').text(data.overall_k03b_pct + '%');

        var services = data.services || [];
        $('#k03a-accordion').html(buildK03aAccordion(services));
        $('#k03b-accordion').html(buildK03bAccordion(services));

        $('#k03-export-btn').show();
    } else {
        var err = '<p class="text-danger p-3">Failed to load data.</p>';
        $('#k03a-accordion').html(err);
        $('#k03b-accordion').html(err);
    }
}

function loadK03Data() {
    if (k03DataLoaded) return;
    var spinner = '<div class="text-center py-5 text-muted"><i class="las la-spinner la-spin me-1"></i> Loading...</div>';
    $('#k03a-accordion').html(spinner);
    $('#k03b-accordion').html(spinner);

    ajs.ajax_form(
        site_url + 'dashboard/k03-detail',
        null, 'GET', null, '1', '1',
        function (res) { k03DataLoaded = true; set_k03_detail(res); },
        function (res) { set_k03_detail(res); }
    );
}

// ─── Init ─────────────────────────────────────────────────────────────────────

$(function () {
    if ($('#is_k03_detail').val() == 1) {
        set_breadcrumb([
            { label: 'Dashboard', url: site_url + 'dashboard' },
            { label: 'K03 Detail', url: null }
        ]);

        // Fire for the initially active tab on page ready
        loadK03Data();

        // Also fire on tab switch in case user switches before data arrives
        $(document).on('click', '#k03-tabs-nav .nav-link', function () {
            loadK03Data();
        });

        $('#k03-export-btn').on('click', exportK03);
    }
});
