var k04DataLoaded = false;
var k04HistoryCache = {};

// ─── History trail ────────────────────────────────────────────────────────────

function buildHistoryTimeline(events) {
    if (!events || events.length === 0) {
        return '<p class="text-muted mb-0 py-2 px-3">No history events found for this task.</p>';
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

function loadTaskHistory(refType, refId, $container) {
    var cacheKey = refType + '_' + refId;
    if (k04HistoryCache[cacheKey]) {
        $container.html(buildHistoryTimeline(k04HistoryCache[cacheKey]));
        return;
    }
    $container.html('<p class="text-muted py-2 px-3 mb-0"><i class="las la-spinner la-spin"></i> Loading history...</p>');

    var paramStr = refType === 'T' ? 'task_id=' + refId : 'job_id=' + refId;
    ajs.ajax_form(
        site_url + 'dashboard/task-history?' + paramStr,
        null, 'GET', null, '0', '0',
        function (res) {
            if (res && res.status && res.data) {
                k04HistoryCache[cacheKey] = res.data;
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

$(document).on('click', '.k04-history-btn', function () {
    var $btn     = $(this);
    var refType  = $btn.data('ref-type');
    var refId    = $btn.data('ref-id');
    var rowId    = 'k04hist_' + refType + '_' + refId;
    var $histRow = $('#' + rowId);

    if ($histRow.length) {
        $histRow.toggle();
        return;
    }

    // Insert history row after parent row
    var colCount = $btn.closest('tr').find('td').length;
    var $row = $('<tr id="' + rowId + '" class="k04-history-row"><td colspan="' + colCount + '" class="p-0 bg-light"></td></tr>');
    $btn.closest('tr').after($row);
    loadTaskHistory(refType, refId, $row.find('td'));
});

// ─── Table builders ──────────────────────────────────────────────────────────

function historyBtn(refType, refId) {
    return '<button class="btn btn-xs btn-outline-secondary k04-history-btn py-0 px-1 fs-11" data-ref-type="' + refType + '" data-ref-id="' + refId + '" title="View history"><i class="las la-history"></i></button>';
}

function buildNoAccessAccordion(groups) {
    if (!groups || groups.length === 0) {
        return '<p class="text-muted p-3">No no-access appointments recorded in this period.</p>';
    }
    var html = '';
    groups.forEach(function (grp, idx) {
        var collapseId = 'k04_noaccess_collapse_' + idx;
        html += '<div class="accordion-item">';
        html += '<h2 class="accordion-header">';
        html += '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#' + collapseId + '">';
        html += '<span class="flex-grow-1">' + grp.reason_name + '</span>';
        html += '<span class="badge bg-danger me-2">' + grp.count + ' appointment' + (grp.count !== 1 ? 's' : '') + '</span>';
        html += '</button></h2>';
        html += '<div id="' + collapseId + '" class="accordion-collapse collapse" data-bs-parent="#k04-noaccess-accordion">';
        html += '<div class="accordion-body p-0">';
        html += buildFlatTable(grp.tasks, false, 'T');
        html += '</div></div></div>';
    });
    return html;
}

function buildFlatTable(tasks, showEmpty, refType) {
    if (!tasks || tasks.length === 0) {
        return showEmpty !== false
            ? '<p class="text-muted p-3">No records in this category.</p>'
            : '<p class="text-success p-3 mb-0"><i class="las la-check-circle"></i> No records in this category.</p>';
    }
    var html = '<div class="table-responsive"><table class="table table-sm table-striped mb-0">';
    html += '<thead class="table-light"><tr>';
    html += '<th>Task Code</th><th>Job Code</th><th>Service</th><th>Appointment Date</th><th>Engineer</th><th>Address</th><th></th>';
    html += '</tr></thead><tbody>';
    tasks.forEach(function (t) {
        html += '<tr>';
        html += '<td>' + t.task_code + '</td>';
        html += '<td>' + t.job_code + '</td>';
        html += '<td>' + t.service_title + '</td>';
        html += '<td>' + t.appointment_date + '</td>';
        html += '<td>' + t.engineer_name + '</td>';
        html += '<td>' + t.property_address + '</td>';
        html += '<td class="text-end">' + historyBtn(refType || 'T', t.task_id) + '</td>';
        html += '</tr>';
    });
    html += '</tbody></table></div>';
    return html;
}

function buildMixedStatusTable(tasks) {
    if (!tasks || tasks.length === 0) {
        return '<p class="text-muted p-3">No records in this category.</p>';
    }
    var html = '<div class="table-responsive"><table class="table table-sm table-striped mb-0">';
    html += '<thead class="table-light"><tr>';
    html += '<th>Task Code</th><th>Job Code</th><th>Service</th><th>Appointment Date</th><th>Status</th><th>Engineer</th><th>Address</th><th></th>';
    html += '</tr></thead><tbody>';
    tasks.forEach(function (t) {
        html += '<tr>';
        html += '<td>' + t.task_code + '</td>';
        html += '<td>' + t.job_code + '</td>';
        html += '<td>' + t.service_title + '</td>';
        html += '<td>' + t.appointment_date + '</td>';
        html += '<td><span class="badge bg-secondary">' + (t.status_title || '-') + '</span></td>';
        html += '<td>' + t.engineer_name + '</td>';
        html += '<td>' + t.property_address + '</td>';
        html += '<td class="text-end">' + historyBtn('T', t.task_id) + '</td>';
        html += '</tr>';
    });
    html += '</tbody></table></div>';
    return html;
}

function buildRescheduledTable(pending, completed_count) {
    var html = '';
    if (completed_count > 0) {
        html += '<div class="alert alert-success py-2 mb-3 fs-13">';
        html += '<i class="las la-check-circle me-1"></i>';
        html += '<strong>' + completed_count + '</strong> rescheduled appointment' + (completed_count !== 1 ? 's were' : ' was') + ' subsequently completed and counted in the kept total.';
        html += '</div>';
    }
    if (!pending || pending.length === 0) {
        html += '<p class="text-muted p-3">No pending rescheduled appointments.</p>';
        return html;
    }
    html += '<div class="table-responsive"><table class="table table-sm table-striped mb-0">';
    html += '<thead class="table-light"><tr>';
    html += '<th>Task Code</th><th>Job Code</th><th>Service</th><th>Original Date</th><th>Rescheduled To</th><th>Engineer</th><th>Address</th><th></th>';
    html += '</tr></thead><tbody>';
    pending.forEach(function (t) {
        html += '<tr>';
        html += '<td>' + t.task_code + '</td>';
        html += '<td>' + t.job_code + '</td>';
        html += '<td>' + t.service_title + '</td>';
        html += '<td>' + t.appointment_date + '</td>';
        html += '<td>' + (t.reschedule_date || '-') + '</td>';
        html += '<td>' + t.engineer_name + '</td>';
        html += '<td>' + t.property_address + '</td>';
        html += '<td class="text-end">' + historyBtn('T', t.task_id) + '</td>';
        html += '</tr>';
    });
    html += '</tbody></table></div>';
    return html;
}

// ─── Render ───────────────────────────────────────────────────────────────────

function exportK04() {
    Swal.fire({ title: 'Generating...', text: 'Please wait while the Excel file is prepared.', allowOutsideClick: false, didOpen: function () { Swal.showLoading(); } });
    ajs.ajax_form(site_url + 'dashboard/k04-export', null, 'GET', null, '1', '1',
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

function set_k04_detail(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var data = result_json.data;

        var noAccessTotal = 0;
        (data.no_access_groups || []).forEach(function (g) { noAccessTotal += g.count; });

        $('.k04-detail-period').text(data.period || '');
        $('.k04-total').text(data.total_appointments || 0);
        $('.k04-kept').text(data.kept_count || 0);
        $('.k04-pct').text((data.percentage || 0) + '%');
        $('.k04-completed').text(data.completed_count || 0);
        $('.k04-no-access-total').text(noAccessTotal);
        $('.k04-rescheduled-pending-count').text((data.rescheduled_pending || []).length);
        $('#k04-summary-bar').css('display', 'flex').show();

        $('.k04-tab-noaccess-count').text(noAccessTotal);
        $('.k04-tab-rescheduled-count').text((data.rescheduled_pending || []).length);
        $('.k04-tab-fw-count').text((data.further_works || []).length);
        $('.k04-tab-mat-count').text((data.materials_required || []).length);
        $('.k04-tab-other-count').text((data.other_outcomes || []).length);

        $('#k04-noaccess-accordion').html(buildNoAccessAccordion(data.no_access_groups || []));
        $('#k04-rescheduled-content').html(buildRescheduledTable(data.rescheduled_pending || [], data.rescheduled_completed_count || 0));
        $('#k04-fw-content').html(buildFlatTable(data.further_works || [], true));
        $('#k04-mat-content').html(buildFlatTable(data.materials_required || [], true));
        $('#k04-other-content').html(buildMixedStatusTable(data.other_outcomes || []));

        $('#k04-export-btn').show();
    } else {
        var errHtml = '<p class="text-danger p-3">Failed to load data.</p>';
        $('#k04-noaccess-accordion, #k04-rescheduled-content, #k04-fw-content, #k04-mat-content, #k04-other-content').html(errHtml);
    }
}

function loadK04Data() {
    if (k04DataLoaded) return;
    var spinner = '<div class="text-center py-5 text-muted"><i class="las la-spinner la-spin me-1"></i> Loading...</div>';
    $('#k04-noaccess-accordion, #k04-rescheduled-content, #k04-fw-content, #k04-mat-content, #k04-other-content').html(spinner);

    ajs.ajax_form(
        site_url + 'dashboard/k04-detail',
        null, 'GET', null, '1', '1',
        function (res) { k04DataLoaded = true; set_k04_detail(res); },
        function (res) { set_k04_detail(res); }
    );
}

// ─── Init ─────────────────────────────────────────────────────────────────────

$(function () {
    if ($('#is_k04_detail').val() == 1) {
        set_breadcrumb([
            { label: 'Dashboard', url: site_url + 'dashboard' },
            { label: 'K04 Detail', url: null }
        ]);

        // Fire for the initially active tab on page ready
        loadK04Data();

        // Also fire on tab switch in case user switches before data arrives
        $(document).on('click', '#k04-tabs-nav .nav-link', function () {
            loadK04Data();
        });

        $('#k04-export-btn').on('click', exportK04);
    }
});
