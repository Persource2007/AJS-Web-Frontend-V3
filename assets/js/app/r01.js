var r01Data = null;

// ─── Render helpers ───────────────────────────────────────────────────────────

function r01JobsTable(jobs) {
    if (!jobs || jobs.length === 0) {
        return '<p class="text-muted p-3 mb-0">No jobs in this service for the selected period.</p>';
    }
    var html = '<div class="table-responsive"><table class="table table-sm table-hover mb-0">';
    html += '<thead class="table-light"><tr>';
    html += '<th>Job Code</th>';
    html += '<th>Contract No</th>';
    html += '<th>Type</th>';
    html += '<th>Reported Date</th>';
    html += '<th>Completed Date</th>';
    html += '<th>Status</th>';
    html += '<th>Address</th>';
    html += '</tr></thead><tbody>';

    jobs.forEach(function (j) {
        html += '<tr>';
        html += '<td><strong>' + j.job_code + '</strong></td>';
        html += '<td>' + (j.contract_no || '—') + '</td>';
        html += '<td>';
        if (j.job_type === 'ppm') {
            html += '<span class="badge bg-info-subtle text-info">PPM</span>';
        } else if (j.job_type === 'reactive') {
            html += '<span class="badge bg-warning-subtle text-warning">Reactive</span>';
        } else {
            html += '<span class="badge bg-secondary">' + (j.job_type || '—') + '</span>';
        }
        html += '</td>';
        html += '<td>' + (j.in_reported ? '<span class="badge bg-primary-subtle text-primary">' + j.reported_date + '</span>' : '<span class="text-muted">' + j.reported_date + '</span>') + '</td>';
        html += '<td>' + (j.completed_date ? (j.in_completed ? '<span class="badge bg-success-subtle text-success">' + j.completed_date + '</span>' : '<span class="text-muted">' + j.completed_date + '</span>') : '<span class="badge bg-warning text-dark">Pending</span>') + '</td>';
        html += '<td>' + (j.status || '—') + '</td>';
        html += '<td class="text-muted fs-12">' + j.address + '</td>';
        html += '</tr>';
    });

    html += '</tbody></table></div>';
    return html;
}

function r01ServiceRows(services, suppIdx) {
    var html = '';
    services.forEach(function (svc, svcIdx) {
        var collapseId = 'r01-svc-' + suppIdx + '-' + svcIdx;
        var pct = (svc.reported_count + svc.completed_count) > 0
            ? Math.round((svc.completed_count / Math.max(svc.reported_count, 1)) * 100)
            : 0;

        html += '<tr class="r01-svc-row" style="cursor:pointer;" data-bs-toggle="collapse" data-bs-target="#' + collapseId + '">';
        html += '<td class="ps-4"><i class="las la-chevron-right r01-chevron me-1 text-muted fs-12"></i>' + svc.service_title + '</td>';
        html += '<td>' + (svc.service_code || '—') + '</td>';
        html += '<td><span class="badge bg-primary">' + svc.reported_count + '</span></td>';
        html += '<td><span class="badge bg-success">' + svc.completed_count + '</span></td>';
        html += '<td>' + pct + '%</td>';
        html += '<td></td>';
        html += '</tr>';
        html += '<tr id="' + collapseId + '" class="collapse"><td colspan="6" class="p-0 bg-light border-bottom">';
        html += r01JobsTable(svc.jobs);
        html += '</td></tr>';
    });
    return html;
}

function renderR01(data) {
    if (!data || data.length === 0) {
        $('#r01-results').html('<div class="card"><div class="card-body text-center py-5 text-muted"><i class="las la-info-circle fs-24 d-block mb-2"></i>No data found for the selected period.</div></div>');
        return;
    }

    var totalReported = 0, totalCompleted = 0;
    data.forEach(function (s) { totalReported += s.total_reported; totalCompleted += s.total_completed; });

    $('.r01-supplier-count').text(data.length);
    $('.r01-total-reported').text(totalReported);
    $('.r01-total-completed').text(totalCompleted);
    $('#r01-summary-bar').show();
    $('#r01-export-btn').show();

    var html = '';
    data.forEach(function (sup, idx) {
        var pct = sup.total_reported > 0
            ? Math.round((sup.total_completed / sup.total_reported) * 100)
            : (sup.total_completed > 0 ? 100 : 0);

        var headerId = 'r01-sup-head-' + idx;
        var bodyId   = 'r01-sup-body-' + idx;

        html += '<div class="card mb-2">';
        html += '<div class="card-header py-2 px-3" id="' + headerId + '" style="cursor:pointer;" data-bs-toggle="collapse" data-bs-target="#' + bodyId + '">';
        html += '<div class="d-flex align-items-center justify-content-between">';
        html += '<div class="d-flex align-items-center gap-3">';
        html += '<i class="las la-chevron-down r01-sup-chevron text-muted fs-13"></i>';
        html += '<strong class="fs-13">' + sup.supplier_name + '</strong>';
        if (sup.supplier_email) {
            html += '<span class="text-muted fs-12">' + sup.supplier_email + '</span>';
        }
        html += '</div>';
        html += '<div class="d-flex gap-3 fs-12">';
        html += '<span>Services: <strong>' + sup.services.length + '</strong></span>';
        html += '<span>Reported: <strong class="text-primary">' + sup.total_reported + '</strong></span>';
        html += '<span>Completed: <strong class="text-success">' + sup.total_completed + '</strong></span>';
        html += '<span class="badge ' + (pct >= 80 ? 'bg-success' : pct >= 50 ? 'bg-warning text-dark' : 'bg-danger') + '">' + pct + '%</span>';
        html += '</div>';
        html += '</div>';
        html += '</div>';

        html += '<div id="' + bodyId + '" class="collapse show">';
        html += '<div class="table-responsive">';
        html += '<table class="table table-sm mb-0">';
        html += '<thead class="table-light"><tr>';
        html += '<th>Service</th><th>Code</th><th>Reported</th><th>Completed</th><th>Rate</th><th></th>';
        html += '</tr></thead><tbody>';
        html += r01ServiceRows(sup.services, idx);
        html += '</tbody></table>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
    });

    $('#r01-results').html(html);

    // Chevron toggle on collapse events
    $(document).off('show.bs.collapse.r01 hide.bs.collapse.r01')
        .on('show.bs.collapse.r01', '[id^="r01-sup-body-"]', function () {
            $('#' + this.id).closest('.card').find('.r01-sup-chevron')
                .removeClass('la-chevron-right').addClass('la-chevron-down');
        })
        .on('hide.bs.collapse.r01', '[id^="r01-sup-body-"]', function () {
            $('#' + this.id).closest('.card').find('.r01-sup-chevron')
                .removeClass('la-chevron-down').addClass('la-chevron-right');
        })
        .on('show.bs.collapse.r01', '[id^="r01-svc-"]', function () {
            var $row = $('tr[data-bs-target="#' + this.id + '"]');
            $row.find('.r01-chevron').removeClass('la-chevron-right').addClass('la-chevron-down');
        })
        .on('hide.bs.collapse.r01', '[id^="r01-svc-"]', function () {
            var $row = $('tr[data-bs-target="#' + this.id + '"]');
            $row.find('.r01-chevron').removeClass('la-chevron-down').addClass('la-chevron-right');
        });
}

// ─── Load data ────────────────────────────────────────────────────────────────

function loadR01Data() {
    var month         = $('#r01-month').val();
    var contractor_id = $('#r01-contractor').val();

    if (!month) {
        Swal.fire({ icon: 'warning', title: 'Select a month', text: 'Please select a month before generating the report.', confirmButtonText: 'OK' });
        return;
    }

    $('#r01-results').html('<div class="text-center py-5 text-muted"><i class="las la-spinner la-spin me-1"></i> Loading...</div>');
    $('#r01-summary-bar').hide();
    $('#r01-export-btn').hide();

    var url = site_url + 'report/r01?month=' + month;
    if (contractor_id) url += '&contractor_id=' + contractor_id;

    ajs.ajax_form(
        url, null, 'GET', null, '1', '1',
        function (res) {
            if (res && res.status) {
                r01Data = res.data;
                $('.r01-period').text(res.period || month);
                renderR01(res.data);
            } else {
                $('#r01-results').html('<div class="alert alert-danger m-3">Failed to load report data.</div>');
            }
        },
        function () {
            $('#r01-results').html('<div class="alert alert-danger m-3">Error loading report data.</div>');
        }
    );
}

// ─── Export ───────────────────────────────────────────────────────────────────

function exportR01() {
    var month         = $('#r01-month').val();
    var contractor_id = $('#r01-contractor').val();
    if (!month) return;

    var url = site_url + 'report/r01/export?month=' + month;
    if (contractor_id) url += '&contractor_id=' + contractor_id;

    Swal.fire({ title: 'Generating...', text: 'Please wait while the Excel file is prepared.', allowOutsideClick: false, didOpen: function () { Swal.showLoading(); } });

    ajs.ajax_form(url, null, 'GET', null, '1', '1',
        function (res) {
            Swal.close();
            if (res && res.status && res.path) {
                window.location.href = site_url + res.path;
            } else {
                Swal.fire({ icon: 'error', title: 'Export Failed', text: res.message || 'Could not generate the Excel file.' });
            }
        },
        function () {
            Swal.fire({ icon: 'error', title: 'Export Failed', text: 'An error occurred while generating the report.' });
        }
    );
}

// ─── Init ─────────────────────────────────────────────────────────────────────

$(function () {
    if ($('#is_r01').val() != '1') return;

    set_breadcrumb([
        { label: 'Dashboard', url: site_url + 'dashboard' },
        { label: 'Reports', url: site_url + 'reports/list' },
        { label: 'R01 — Supplier Summary', url: null }
    ]);

    // Default to current month
    var now = new Date();
    var yyyy = now.getFullYear();
    var mm   = String(now.getMonth() + 1).padStart(2, '0');
    $('#r01-month').val(yyyy + '-' + mm);

    select2_ajax('#r01-contractor', site_url + 'contractor/get_all', ['first_name', 'last_name'], null, 'body', null, false, ' ');

    $('#r01-generate-btn').on('click', loadR01Data);
    $('#r01-export-btn').on('click', exportR01);

    // Auto-load on page open
    loadR01Data();
});
