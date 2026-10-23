// ─── R04 — Resident Satisfaction Survey KPI Report ───────────────────────────
// Mirrors r01.js exactly: same structure, same collapse pattern, same chevrons.
// ─────────────────────────────────────────────────────────────────────────────

var r04Data = null;

// KPI question labels matching the 7 survey questions in order
var R04_KPI = [
    { key: 'first_time_fix_avg',       label: 'First Time Fix' },
    { key: 'operative_uniform_avg',    label: 'Appropriate Uniform' },
    { key: 'operative_courteous_avg',  label: 'Courteous & Polite' },
    { key: 'works_satisfied_avg',      label: 'Satisfied with Works' },
    { key: 'appointment_kept_avg',     label: 'Appointment Kept' },
    { key: 'operative_id_avg',         label: 'Operative Showed ID' },
    { key: 'followon_scheduled_avg',   label: 'Follow-on Scheduled' },
];

// Answer keys for drilldown rows (same order as R04_KPI, without _pct suffix)
var R04_ANS = [
    'first_time_fix', 'operative_uniform', 'operative_courteous',
    'works_satisfied', 'appointment_kept', 'operative_id', 'followon_scheduled',
];

// ─── Search / Filter helpers ──────────────────────────────────────────────────

/**
 * Returns true if val (cast to string) contains term (case-insensitive).
 */
function r04MatchesTerm(val, term) {
    return val != null && String(val).toLowerCase().indexOf(term) >= 0;
}

/**
 * Filter r04Data by a search term across per-survey fields.
 * Returns a shallow copy of r04Data with surveys arrays filtered;
 * contracts with no matching surveys are removed from the result.
 */
function filterR04Data(term) {
    if (!term || !r04Data) return r04Data;
    term = term.toLowerCase().trim();
    return r04Data.map(function (contract) {
        var filtered = Object.assign({}, contract);
        filtered.surveys = (contract.surveys || []).filter(function (s) {
            return r04MatchesTerm(s.batch_id,      term)
                || r04MatchesTerm(s.job_code,       term)
                || r04MatchesTerm(s.job_type,       term)
                || r04MatchesTerm(s.completed_at,   term)
                || r04MatchesTerm(s.resident_notes, term)
                || r04MatchesTerm(s.client_code,    term)
                || r04MatchesTerm(s.resident_name,  term);
        });
        return filtered;
    }).filter(function (contract) {
        return contract.surveys.length > 0;
    });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

// KPI summary badge — avg rating 1–5
function r04PctBadge(avg) {
    if (avg === null || avg === undefined) {
        return '<span class="badge bg-light text-muted border">No data</span>';
    }
    var cls = avg >= 4 ? 'bg-success' : avg >= 3 ? 'bg-warning text-dark' : 'bg-danger';
    return '<span class="badge ' + cls + '">' + parseFloat(avg).toFixed(1) + ' / 5</span>';
}

// Individual survey answer badge — rating 1–5
function r04AnsBadge(val) {
    if (val === null || val === undefined) {
        return '<span class="badge bg-light text-muted border" title="Not applicable">N/A</span>';
    }
    var labels = { 5: 'Very Good', 4: 'Good', 3: 'Average', 2: 'Poor', 1: 'Very Poor' };
    var cls    = val >= 4 ? 'bg-success' : val >= 3 ? 'bg-warning text-dark' : 'bg-danger';
    return '<span class="badge ' + cls + '" title="' + (labels[val] || val) + '">' + val + ' ★</span>';
}

function r04FormatDate(dt) {
    if (!dt) return '—';
    var d = new Date(dt.replace(' ', 'T'));
    var dd  = String(d.getDate()).padStart(2, '0');
    var mm  = String(d.getMonth() + 1).padStart(2, '0');
    var hh  = String(d.getHours()).padStart(2, '0');
    var min = String(d.getMinutes()).padStart(2, '0');
    return dd + '/' + mm + '/' + d.getFullYear() + ' ' + hh + ':' + min;
}

// ─── KPI Score Row (horizontal bar for each question) ─────────────────────────

// KPI score row — avg is a 1–5 rating; normalise to 0–100 for the progress bar
function r04KpiScoreRow(key, label, avg) {
    var barPct = avg !== null ? Math.round((avg / 5) * 100) : 0;
    var barCls = avg !== null ? (avg >= 4 ? 'bg-success' : avg >= 3 ? 'bg-warning' : 'bg-danger') : 'bg-light';
    var pct = avg;   // alias kept so the rest of the function body below is unchanged
    var display = avg !== null ? parseFloat(avg).toFixed(1) + ' / 5' : 'No responses';

    return '<tr>'
        + '<td class="fs-12 text-muted" style="width:200px;">' + label + '</td>'
        + '<td>'
        + '<div class="progress" style="height:14px;border-radius:4px;">'
        + '<div class="progress-bar ' + barCls + '" role="progressbar" style="width:' + barPct + '%;font-size:11px;line-height:14px;" aria-valuenow="' + barPct + '" aria-valuemin="0" aria-valuemax="100">'
        + (barPct >= 15 ? display : '')
        + '</div>'
        + '</div>'
        + '</td>'
        + '<td class="text-end" style="width:80px;">' + r04PctBadge(pct) + '</td>'
        + '</tr>';
}

// ─── Drilldown: individual survey rows ───────────────────────────────────────

function r04SurveysTable(surveys, contractIdx) {
    if (!surveys || surveys.length === 0) {
        return '<p class="text-muted p-3 mb-0 fs-13">No survey responses for this contract in the selected period.</p>';
    }

    var html = '<div class="table-responsive">'
        + '<table class="table table-sm table-hover mb-0 fs-12">'
        + '<thead class="table-light"><tr>'
        + '<th>Batch No.</th>'
        + '<th>Client Code</th>'
        + '<th>Job Code</th>'
        + '<th>Sent To</th>'
        + '<th>Survey Sent</th>'
        + '<th>Responded</th>'
        + '<th>Response Time</th>'
        + '<th>First Fix</th>'
        + '<th>Uniform</th>'
        + '<th>Courteous</th>'
        + '<th>Satisfied</th>'
        + '<th>Appt Kept</th>'
        + '<th>ID Shown</th>'
        + '<th>Follow-on</th>'
        + '<th>Notes</th>'
        + '</tr></thead><tbody>';

    surveys.forEach(function (s) {
        var responded = !!s.completed_at;
        html += '<tr>';
        html += '<td class="text-muted">' + (s.batch_id && s.batch_id != 0 ? s.batch_id : '-') + '</td>';
        html += '<td class="text-muted">' + (s.client_code || '-') + '</td>';
        html += '<td><strong>' + (s.job_code || '-') + '</strong></td>';
        html += '<td class="text-muted" style="font-size:11px;">' + (s.sent_to || '-') + '</td>';
        html += '<td>' + r04FormatDate(s.sent_at) + '</td>';
        html += '<td>'
            + (responded
                ? '<span class="badge bg-success-subtle text-success">' + r04FormatDate(s.completed_at) + '</span>'
                : '<span class="badge bg-warning-subtle text-warning">Pending</span>')
            + '</td>';
        html += '<td>'
            + (s.hours_to_respond !== null && s.hours_to_respond !== undefined
                ? s.hours_to_respond + 'h'
                : '—')
            + '</td>';

        // 7 KPI answer cells
        R04_ANS.forEach(function (k) {
            html += '<td>' + (responded ? r04AnsBadge(s[k]) : '<span class="text-muted">—</span>') + '</td>';
        });

        // Notes cell
        var notes = s.resident_notes ? s.resident_notes : '';
        html += '<td class="text-muted" style="max-width:200px;white-space:normal;">'
            + (notes
                ? '<span title="' + notes.replace(/"/g, '&quot;') + '">'
                + (notes.length > 60 ? notes.substring(0, 60) + '…' : notes)
                + '</span>'
                : '—')
            + '</td>';
        html += '</tr>';
    });

    html += '</tbody></table></div>';
    return html;
}

// ─── Main render ─────────────────────────────────────────────────────────────

function renderR04(data) {
    if (!data || data.length === 0) {
        $('#r04-results').html(
            '<div class="card"><div class="card-body text-center py-5 text-muted">'
            + '<i class="las la-info-circle fs-24 d-block mb-2"></i>'
            + 'No survey data found for the selected period and filters.'
            + '</div></div>'
        );
        return;
    }

    var html = '';

    data.forEach(function (contract, idx) {
        var headerId = 'r04-con-head-' + idx;
        var bodyId = 'r04-con-body-' + idx;
        var kpiId = 'r04-kpi-' + idx;
        var drillId = 'r04-drill-' + idx;
        var pct = contract.response_rate;
        var pctCls = pct >= 80 ? 'bg-success' : pct >= 50 ? 'bg-warning text-dark' : 'bg-danger';

        // ── Contract header card (collapsible — same as r01 supplier) ──
        html += '<div class="card mb-2">';

        html += '<div class="card-header py-2 px-3" id="' + headerId + '" style="cursor:pointer;" '
            + 'data-bs-toggle="collapse" data-bs-target="#' + bodyId + '">';
        html += '<div class="d-flex align-items-center justify-content-between">';
        html += '<div class="d-flex align-items-center gap-3">';
        html += '<i class="las la-chevron-right r04-con-chevron text-muted fs-13"></i>';
        html += '<strong class="fs-13">' + contract.contract_number + '</strong>';
        html += '<span class="text-muted fs-12">' + contract.client_name + '</span>';
        html += '</div>';
        html += '<div class="d-flex gap-3 fs-12 align-items-center">';
        html += '<span>Sent: <strong class="text-primary">' + contract.total_sent + '</strong></span>';
        html += '<span>Responded: <strong class="text-success">' + contract.total_completed + '</strong></span>';
        html += '<span>Rate: <span class="badge ' + pctCls + '">' + pct + '%</span></span>';
        html += '</div>';
        html += '</div>';
        html += '</div>';

        // ── Collapsible body ──
        html += '<div id="' + bodyId + '" class="collapse">';

        // KPI scores section
        html += '<div class="px-3 pt-3 pb-2">';
        html += '<p class="text-muted fs-11 fw-semibold text-uppercase letter-spacing mb-2">KPI Scores — Average Rating (out of 5)</p>';
        html += '<div class="table-responsive">';
        html += '<table class="table table-borderless table-sm mb-0" style="max-width:640px;">';
        html += '<tbody>';
        R04_KPI.forEach(function (kpi) {
            html += r04KpiScoreRow(kpi.key, kpi.label, contract[kpi.key]);
        });
        html += '</tbody></table></div>';
        html += '</div>';

        // Divider + toggle for drilldown
        html += '<div class="px-3 pb-2">';
        html += '<a class="fs-12 text-muted text-decoration-none" style="cursor:pointer;" '
            + 'data-bs-toggle="collapse" data-bs-target="#' + drillId + '">'
            + '<i class="las la-angle-down me-1 r04-drill-chevron-' + idx + '"></i>'
            + 'View ' + contract.total_sent + ' individual survey response' + (contract.total_sent !== 1 ? 's' : '')
            + '</a>';
        html += '</div>';

        // Drilldown table (collapsed by default)
        html += '<div id="' + drillId + '" class="collapse border-top">';
        html += r04SurveysTable(contract.surveys, idx);
        html += '</div>';

        html += '</div>';  // /collapse body
        html += '</div>';  // /card
        html += '</div>';  // /card
    });

    $('#r04-results').html(html);

    // ── Chevron toggles — identical pattern to r01 ──
    $(document).off('show.bs.collapse.r04 hide.bs.collapse.r04')
        .on('show.bs.collapse.r04', '[id^="r04-con-body-"]', function () {
            $(this).closest('.card').find('.r04-con-chevron')
                .removeClass('la-chevron-right').addClass('la-chevron-down');
        })
        .on('hide.bs.collapse.r04', '[id^="r04-con-body-"]', function () {
            $(this).closest('.card').find('.r04-con-chevron')
                .removeClass('la-chevron-down').addClass('la-chevron-right');
        })
        .on('show.bs.collapse.r04', '[id^="r04-drill-"]', function () {
            var idx = this.id.replace('r04-drill-', '');
            $('.r04-drill-chevron-' + idx)
                .removeClass('la-angle-down').addClass('la-angle-up');
        })
        .on('hide.bs.collapse.r04', '[id^="r04-drill-"]', function () {
            var idx = this.id.replace('r04-drill-', '');
            $('.r04-drill-chevron-' + idx)
                .removeClass('la-angle-up').addClass('la-angle-down');
        });
}

// ─── Load data ────────────────────────────────────────────────────────────────

function loadR04Data() {

    add_autocomplete_sel("#r04-client", "clients", ["client_code"], null, null);
    var month = $('#r04-month').val();
    var client_id = $('#r04-client').val();
    var contract_id = $('#r04-contract').val();

    if (!month) {
        Swal.fire({ icon: 'warning', title: 'Select a month', text: 'Please select a month before generating the report.', confirmButtonText: 'OK' });
        return;
    }

    $('#r04-results').html('<div class="text-center py-5 text-muted"><i class="las la-spinner la-spin me-1"></i> Loading…</div>');
    $('#r04-summary-bar').hide();
    $('#r04-export-btn').hide();

    var url = site_url + 'report/r04?month=' + month;
    if (client_id) url += '&client_id=' + client_id;
    if (contract_id) url += '&contract_id=' + contract_id;

    ajs.ajax_form(
        url, null, 'GET', null, '1', '1',
        function (res) {
            if (res && res.status) {
                r04Data = res.data;

                // Update summary bar
                $('.r04-period').text(res.period || month);
                $('.r04-contract-count').text(res.data.length);
                $('.r04-total-sent').text(res.total_sent);
                $('.r04-total-completed').text(res.total_completed);
                $('.r04-response-rate').text(res.response_rate + '%');
                $('#r04-summary-bar').show();
                $('#r04-export-btn').show();

                // Apply any active search term to the fresh data
                renderR04(filterR04Data($('#r04-search').val()));
            } else {
                $('#r04-results').html('<div class="alert alert-danger m-3">Failed to load report data. Please try again.</div>');
            }
        },
        function () {
            $('#r04-results').html('<div class="alert alert-danger m-3">Error loading report data. Please check your connection.</div>');
        }
    );
}

// ─── Client-side CSV export (used when a search filter is active) ────────────

function exportR04ClientSide(data, month) {
    var kpi_keys = [
        'first_time_fix', 'operative_uniform', 'operative_courteous',
        'works_satisfied', 'appointment_kept', 'operative_id', 'followon_scheduled',
    ];
    var rows = [[
        'Contract', 'Client', 'Client Code', 'Job Code', 'Sent To',
        'Survey Sent', 'Survey Completed', 'Response Time (hrs)',
        'First Time Fix (1-5)', 'Appropriate Uniform (1-5)', 'Courteous & Polite (1-5)',
        'Satisfied with Works (1-5)', 'Appointment Kept (1-5)',
        'Operative Showed ID (1-5)', 'Follow-on Scheduled (1-5)', 'Resident Notes',
    ]];

    data.forEach(function (contract) {
        (contract.surveys || []).forEach(function (s) {
            var row = [
                contract.contract_number,
                contract.client_name,
                contract.client_code || s.client_code || '',
                s.job_code || '',
                s.sent_to || '',
                s.sent_at      ? r04FormatDateCsv(s.sent_at)      : '',
                s.completed_at ? r04FormatDateCsv(s.completed_at) : 'Not responded',
                s.hours_to_respond != null ? s.hours_to_respond : '',
            ];
            kpi_keys.forEach(function (k) { row.push(s[k] != null ? s[k] : ''); });
            row.push(s.resident_notes || '');
            rows.push(row);
        });
    });

    // Build CSV with UTF-8 BOM so Excel opens it correctly
    var csv = '﻿';
    rows.forEach(function (row) {
        csv += row.map(function (cell) {
            var str = String(cell == null ? '' : cell);
            if (str.search(/[,"\n\r]/) >= 0) str = '"' + str.replace(/"/g, '""') + '"';
            return str;
        }).join(',') + '\r\n';
    });

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'R04_Survey_' + month + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
}

// ─── Export ───────────────────────────────────────────────────────────────────

async function exportR04() {
    var month = $('#r04-month').val();
    var client_id = $('#r04-client').val();
    var contract_id = $('#r04-contract').val();

    if (!month) {
        Swal.fire({ icon: 'warning', title: 'Select a month', text: 'Please select a month before exporting.', confirmButtonText: 'OK' });
        return;
    }

    // If a search filter is active, export client-side from the already-filtered data
    var searchTerm = $('#r04-search').val().trim();
    if (searchTerm && r04Data) {
        exportR04ClientSide(filterR04Data(searchTerm), month);
        return;
    }

    // Build URL
    var url = site_url + 'report/r04_export?month=' + encodeURIComponent(month);
    if (client_id) url += '&client_id=' + encodeURIComponent(client_id);
    if (contract_id) url += '&contract_id=' + encodeURIComponent(contract_id);

    // Use fetch() with the Bearer token (same token ajs.ajax_form uses)
    // so the backend constructor's authorize_request() passes successfully.
    var token = localStorage.getItem('access_token') || '';
    var appVersion = localStorage.getItem('app_version') || '';
    var appPlatform = localStorage.getItem('app_platform') || 'web';

    $('#r04-export-btn').prop('disabled', true).html('<i class="las la-spinner la-spin me-1"></i> Exporting…');

    try {
        var response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': token,
                'App-Version': appVersion,
                'App-Platform': appPlatform
            }
        });

        if (!response.ok) {
            var txt = await response.text();
            throw new Error(txt || response.statusText);
        }

        var blob = await response.blob();
        var filename = 'R04_Survey_' + month + '.csv';
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
    } catch (err) {
        Swal.fire({ icon: 'error', title: 'Export Failed', text: 'Could not export the report. Please try again.' });
        console.error('R04 export error:', err);
    } finally {
        $('#r04-export-btn').prop('disabled', false).html('<i class="las la-file-excel me-1"></i> Export CSV');
    }
}

// ── Helper: format date for CSV (dd/mm/yyyy HH:MM) ──
function r04FormatDateCsv(dt) {
    if (!dt) return '—';
    var d = new Date(dt.replace(' ', 'T'));
    var dd = String(d.getDate()).padStart(2, '0');
    var mm = String(d.getMonth() + 1).padStart(2, '0');
    var yyyy = d.getFullYear();
    var hh = String(d.getHours()).padStart(2, '0');
    var min = String(d.getMinutes()).padStart(2, '0');
    return dd + '/' + mm + '/' + yyyy + ' ' + hh + ':' + min;
}

// ─── Init ─────────────────────────────────────────────────────────────────────

$(function () {
    if ($('#is_r04').val() !== '1') return;

    set_breadcrumb([
        { label: 'Reports', url: site_url + 'reports/list' },
        { label: 'R04 — Job Satisfaction Survey', url: null }
    ]);

    // Default to current month
    var now = new Date();
    var yyyy = now.getFullYear();
    var mm = String(now.getMonth() + 1).padStart(2, '0');
    $('#r04-month').val(yyyy + '-' + mm);

    $('#r04-generate-btn').on('click', loadR04Data);
    $('#r04-export-btn').on('click', exportR04);

    // Auto-load on page open
    loadR04Data();
});
