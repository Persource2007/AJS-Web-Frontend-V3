var k06DataLoaded = false;
var k06HistoryCache = {};

// ─── History trail ────────────────────────────────────────────────────────────

function buildHistoryTimeline(events) {
    if (!events || events.length === 0) {
        return '<p class="text-muted mb-0 py-2 px-3">No history events found for this job.</p>';
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

function loadJobHistory(jobId, $container) {
    var cacheKey = 'J_' + jobId;
    if (k06HistoryCache[cacheKey]) {
        $container.html(buildHistoryTimeline(k06HistoryCache[cacheKey]));
        return;
    }
    $container.html('<p class="text-muted py-2 px-3 mb-0"><i class="las la-spinner la-spin"></i> Loading history...</p>');

    ajs.ajax_form(
        site_url + 'dashboard/task-history?job_id=' + jobId,
        null, 'GET', null, '0', '0',
        function (res) {
            if (res && res.status && res.data) {
                k06HistoryCache[cacheKey] = res.data;
                $container.html(buildHistoryTimeline(res.data));
            } else {
                $container.html('<p class="text-danger py-2 px-3 mb-0">Failed to load history.</p>');
            }
        },
        function () {
            $container.html('<p class="text-danger py-2 px-3 mb-0">Error loading history.</p>');
        }
    );
}

$(document).on('click', '.k06-history-btn', function () {
    var $btn   = $(this);
    var jobId  = $btn.data('job-id');
    var rowId  = 'k06hist_J_' + jobId;
    var $histRow = $('#' + rowId);

    if ($histRow.length) {
        $histRow.toggle();
        return;
    }

    var colCount = $btn.closest('tr').find('td').length;
    var $row = $('<tr id="' + rowId + '" class="k06-history-row"><td colspan="' + colCount + '" class="p-0 bg-light"></td></tr>');
    $btn.closest('tr').after($row);
    loadJobHistory(jobId, $row.find('td'));
});

// ─── Table builder ────────────────────────────────────────────────────────────

function historyBtn(jobId) {
    return '<button class="btn btn-xs btn-outline-secondary k06-history-btn py-0 px-1 fs-11" data-job-id="' + jobId + '" title="View history"><i class="las la-history"></i></button>';
}

function buildRectificationTable(jobs, isOverdue) {
    if (!jobs || jobs.length === 0) {
        if (isOverdue) {
            return '<p class="text-success p-3 mb-0"><i class="las la-check-circle"></i> All rectifications completed within 2 working days.</p>';
        }
        return '<p class="text-muted p-3">No rectifications completed on time in this period.</p>';
    }

    var html = '<div class="table-responsive"><table class="table table-sm table-striped mb-0">';
    html += '<thead class="table-light"><tr>';
    html += '<th>Job Code</th>';
    html += '<th>Re-opened Date</th>';
    html += '<th>Re-open Reason</th>';
    html += '<th>Re-completed Date</th>';
    html += '<th>Working Days</th>';
    html += '<th>Address</th>';
    html += '<th></th>';
    html += '</tr></thead><tbody>';

    jobs.forEach(function (j) {
        var rowClass = isOverdue ? 'table-danger' : '';
        html += '<tr class="' + rowClass + '">';
        html += '<td><strong>' + j.job_code + '</strong></td>';
        html += '<td>' + j.reopen_date + '</td>';
        html += '<td class="text-muted fst-italic">' + (j.reopen_reason !== '-' ? j.reopen_reason : '<span class="text-muted">—</span>') + '</td>';
        html += '<td>' + (j.recomplete_date || '<span class="badge bg-warning text-dark">Pending</span>') + '</td>';
        html += '<td>';
        if (j.working_days !== null && j.working_days !== undefined) {
            var badgeClass = j.working_days <= 2 ? 'bg-success' : 'bg-danger';
            html += '<span class="badge ' + badgeClass + '">' + j.working_days + ' day' + (j.working_days !== 1 ? 's' : '') + '</span>';
        } else {
            html += '<span class="badge bg-secondary">—</span>';
        }
        html += '</td>';
        html += '<td>' + j.property_address + '</td>';
        html += '<td class="text-end">' + historyBtn(j.job_id) + '</td>';
        html += '</tr>';
    });

    html += '</tbody></table></div>';
    return html;
}

// ─── Render ───────────────────────────────────────────────────────────────────

function exportK06() {
    Swal.fire({ title: 'Generating...', text: 'Please wait while the Excel file is prepared.', allowOutsideClick: false, didOpen: function () { Swal.showLoading(); } });
    ajs.ajax_form(site_url + 'dashboard/k06-export', null, 'GET', null, '1', '1',
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

function set_k06_detail(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var data     = result_json.data;
        var onTime   = data.on_time  || [];
        var overdue  = data.overdue  || [];
        var total    = onTime.length + overdue.length;
        var pct      = total > 0 ? Math.round((onTime.length / total) * 100) : 100;

        $('.k06-detail-period').text(data.period || '');
        $('.k06-total').text(total);
        $('.k06-on-time').text(onTime.length);
        $('.k06-pct').text(pct + '%');
        $('.k06-overdue-count').text(overdue.length);
        $('#k06-summary-bar').css('display', 'flex').show();

        $('.k06-tab-overdue-count').text(overdue.length);
        $('.k06-tab-ontime-count').text(onTime.length);

        $('#k06-overdue-content').html(buildRectificationTable(overdue, true));
        $('#k06-ontime-content').html(buildRectificationTable(onTime, false));

        $('#k06-export-btn').show();
    } else {
        var errHtml = '<p class="text-danger p-3">Failed to load data.</p>';
        $('#k06-overdue-content, #k06-ontime-content').html(errHtml);
    }
}

function loadK06Data() {
    if (k06DataLoaded) return;
    var spinner = '<div class="text-center py-5 text-muted"><i class="las la-spinner la-spin me-1"></i> Loading...</div>';
    $('#k06-overdue-content, #k06-ontime-content').html(spinner);

    ajs.ajax_form(
        site_url + 'dashboard/k06-detail',
        null, 'GET', null, '1', '1',
        function (res) { k06DataLoaded = true; set_k06_detail(res); },
        function (res) { set_k06_detail(res); }
    );
}

// ─── Init ─────────────────────────────────────────────────────────────────────

$(function () {
    if ($('#is_k06_detail').val() == 1) {
        set_breadcrumb([
            { label: 'Dashboard', url: site_url + 'dashboard' },
            { label: 'K06 Detail', url: null }
        ]);

        loadK06Data();

        $(document).on('click', '#k06-tabs-nav .nav-link', function () {
            loadK06Data();
        });

        $('#k06-export-btn').on('click', exportK06);
    }
});
