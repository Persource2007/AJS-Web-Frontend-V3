var r02Data          = null;
var r02ActiveStatus  = 'in_progress';

// ─── Render helpers ───────────────────────────────────────────────────────────

function r02DaysClass(days) {
    if (days > 14) return 'text-danger fw-bold';
    if (days > 7)  return 'text-warning';
    return '';
}

function r02StatusBadge(status) {
    if (status === 'in_progress')  return '<span class="badge bg-primary-subtle text-primary">In Progress</span>';
    if (status === 'outstanding')  return '<span class="badge bg-danger-subtle text-danger">Outstanding</span>';
    return '<span class="badge bg-warning-subtle text-warning">Incomplete</span>';
}

var R02_COL_WIDTHS = '15%,6%,18%,12%,8%,10%,10%,12%,9%'.split(',');

function r02ColGroup() {
    return '<colgroup>'
        + R02_COL_WIDTHS.map(function (w) { return '<col style="width:' + w + '">'; }).join('')
        + '</colgroup>';
}

function r02JobsTable(jobs, statusFilter) {
    var filtered = statusFilter === 'all' ? jobs : jobs.filter(function (j) { return j.wip_status === statusFilter; });

    if (!filtered || filtered.length === 0) {
        var label = statusFilter === 'all' ? 'WIP' : statusFilter.replace('_', ' ');
        return '<p class="text-muted p-3 mb-0">No ' + label + ' jobs in this contract for the selected period.</p>';
    }

    var html = '<div class="table-responsive"><table class="table table-sm table-hover mb-0" style="table-layout:fixed;">';
    html += r02ColGroup();
    html += '<thead class="table-light"><tr>';
    html += '<th>Job Code</th><th>Type</th><th>Service</th>';
    html += '<th>Reported Date</th><th>Days Open</th>';
    html += '<th>Status</th><th>Reason</th><th>Engineer</th><th>Address</th>';
    html += '</tr></thead><tbody>';

    filtered.forEach(function (j) {
        html += '<tr>';
        html += '<td><strong>' + j.job_code + '</strong></td>';
        html += '<td>';
        if (j.job_type === 'ppm') {
            html += '<span class="badge bg-info-subtle text-info">PPM</span>';
        } else if (j.job_type === 'reactive') {
            html += '<span class="badge bg-warning-subtle text-warning">Reactive</span>';
        } else {
            html += '<span class="badge bg-secondary">' + (j.job_type || '—') + '</span>';
        }
        html += '</td>';
        html += '<td class="fs-12">' + (j.service_title || '—') + '</td>';
        html += '<td>' + j.reported_date + '</td>';
        html += '<td class="' + r02DaysClass(j.days_open) + '">' + j.days_open + 'd</td>';
        html += '<td>' + r02StatusBadge(j.wip_status) + '</td>';
        html += '<td class="fs-12">' + (j.reason || '<span class="text-muted">—</span>') + '</td>';
        html += '<td class="fs-12">' + (j.latest_engineer || '<span class="text-muted">—</span>') + '</td>';
        html += '<td class="text-muted fs-12">' + j.address + '</td>';
        html += '</tr>';
    });

    html += '</tbody></table></div>';
    return html;
}

function renderR02(data, statusFilter) {
    if (!data || data.length === 0) {
        $('#r02-results').html('<div class="card"><div class="card-body text-center py-5 text-muted"><i class="las la-info-circle fs-24 d-block mb-2"></i>No WIP jobs found for the selected period.</div></div>');
        return;
    }

    var html = '';
    data.forEach(function (contract, idx) {
        var bodyId   = 'r02-contract-body-' + idx;
        var headerId = 'r02-contract-head-' + idx;

        var filtered = statusFilter === 'all'
            ? contract.jobs
            : contract.jobs.filter(function (j) { return j.wip_status === statusFilter; });

        var countBadge = filtered.length;

        html += '<div class="card mb-2">';
        html += '<div class="card-header py-2 px-3" id="' + headerId + '" style="cursor:pointer;" data-bs-toggle="collapse" data-bs-target="#' + bodyId + '">';
        html += '<div class="d-flex align-items-center justify-content-between">';
        html += '<div class="d-flex align-items-center gap-3">';
        html += '<i class="las la-chevron-down r02-chevron text-muted fs-13"></i>';
        html += '<strong class="fs-13">' + contract.contract_number + '</strong>';
        html += '<span class="text-muted fs-12">' + contract.client_name + '</span>';
        html += '</div>';
        html += '<div class="d-flex gap-3 fs-12">';
        html += '<span>In Progress: <strong class="text-primary">' + contract.in_progress_count + '</strong></span>';
        html += '<span>Outstanding: <strong class="text-danger">' + contract.outstanding_count + '</strong></span>';
        html += '<span>Incomplete: <strong class="text-warning">' + contract.incomplete_count + '</strong></span>';
        html += '<span class="badge bg-secondary">' + countBadge + ' shown</span>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div id="' + bodyId + '" class="collapse show">';
        html += r02JobsTable(contract.jobs, statusFilter);
        html += '</div>';
        html += '</div>';
    });

    $('#r02-results').html(html);

    $(document).off('show.bs.collapse.r02 hide.bs.collapse.r02')
        .on('show.bs.collapse.r02', '[id^="r02-contract-body-"]', function () {
            $('#' + this.id).closest('.card').find('.r02-chevron')
                .removeClass('la-chevron-right').addClass('la-chevron-down');
        })
        .on('hide.bs.collapse.r02', '[id^="r02-contract-body-"]', function () {
            $('#' + this.id).closest('.card').find('.r02-chevron')
                .removeClass('la-chevron-down').addClass('la-chevron-right');
        });
}

function filterR02(status) {
    r02ActiveStatus = status;

    $('.r02-filter-btn').each(function () {
        var $btn = $(this);
        var s    = $btn.data('status');
        $btn.removeClass('btn-primary btn-danger btn-warning btn-secondary btn-outline-primary btn-outline-danger btn-outline-warning btn-outline-secondary');
        if (s === status) {
            var activeClass = s === 'in_progress' ? 'btn-primary' : s === 'outstanding' ? 'btn-danger' : s === 'incomplete' ? 'btn-warning' : 'btn-secondary';
            $btn.addClass(activeClass);
        } else {
            var outlineClass = s === 'in_progress' ? 'btn-outline-primary' : s === 'outstanding' ? 'btn-outline-danger' : s === 'incomplete' ? 'btn-outline-warning' : 'btn-outline-secondary';
            $btn.addClass(outlineClass);
        }
    });

    if (r02Data) renderR02(r02Data, status);
}

// ─── Load data ────────────────────────────────────────────────────────────────

function loadR02Data() {
    var week        = $('#r02-week').val();
    var contract_id = $('#r02-contract').val();

    if (!week) {
        Swal.fire({ icon: 'warning', title: 'Select a week', text: 'Please select a week before generating the report.', confirmButtonText: 'OK' });
        return;
    }

    $('#r02-results').html('<div class="text-center py-5 text-muted"><i class="las la-spinner la-spin me-1"></i> Loading...</div>');
    $('#r02-summary-bar').hide();
    $('#r02-filter-bar').hide();
    $('#r02-export-btn').hide();

    var url = site_url + 'report/r02?week=' + week;
    if (contract_id) url += '&contract_id=' + contract_id;

    ajs.ajax_form(
        url, null, 'GET', null, '1', '1',
        function (res) {
            if (res && res.status) {
                r02Data = res.data;

                // Compute totals for filter badges
                var totals = { in_progress: 0, outstanding: 0, incomplete: 0, all: 0 };
                (res.data || []).forEach(function (c) {
                    totals.in_progress  += c.in_progress_count;
                    totals.outstanding  += c.outstanding_count;
                    totals.incomplete   += c.incomplete_count;
                    totals.all          += c.total_jobs;
                });
                $('.r02-count-in_progress').text(totals.in_progress);
                $('.r02-count-outstanding').text(totals.outstanding);
                $('.r02-count-incomplete').text(totals.incomplete);
                $('.r02-count-all').text(totals.all);

                $('.r02-period').text(res.period || week);
                $('.r02-contract-count').text((res.data || []).length);
                $('.r02-total-jobs').text(totals.all);

                $('#r02-summary-bar').show();
                $('#r02-filter-bar').show();
                $('#r02-export-btn').show();

                renderR02(res.data, r02ActiveStatus);
            } else {
                $('#r02-results').html('<div class="alert alert-danger m-3">Failed to load report data.</div>');
            }
        },
        function () {
            $('#r02-results').html('<div class="alert alert-danger m-3">Error loading report data.</div>');
        }
    );
}

// ─── Export ───────────────────────────────────────────────────────────────────

function exportR02() {
    var week        = $('#r02-week').val();
    var contract_id = $('#r02-contract').val();
    if (!week) return;

    var url = site_url + 'report/r02/export?week=' + week;
    if (contract_id) url += '&contract_id=' + contract_id;

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
    if ($('#is_r02').val() != '1') return;

    set_breadcrumb([
        { label: 'Dashboard', url: site_url + 'dashboard' },
        { label: 'Reports', url: site_url + 'reports/list' },
        { label: 'R02 — Work in Progress', url: null }
    ]);

    // Default to current ISO 8601 week (Monday-start, first-Thursday rule)
    var now     = new Date();
    var dayNum  = now.getDay() || 7;                               // Mon=1 … Sun=7
    now.setDate(now.getDate() + 4 - dayNum);                       // shift to Thursday of this week
    var yearStart = new Date(now.getFullYear(), 0, 1);
    var isoWeek = Math.ceil((((now - yearStart) / 86400000) + 1) / 7);
    var isoYear = now.getFullYear();
    $('#r02-week').val(isoYear + '-W' + String(isoWeek).padStart(2, '0'));

    select2_ajax('#r02-contract', site_url + 'contract/get_all', 'contract_number', null, 'body', null, false, '');

    $('.r02-filter-btn').on('click', function () {
        filterR02($(this).data('status'));
    });

    $('#r02-generate-btn').on('click', loadR02Data);
    $('#r02-export-btn').on('click', exportR02);

    // Auto-load on page open
    loadR02Data();
});
