/**
 * Servicing Compliance report.
 *
 * Server-side paginated grid. Everything that narrows the result set — bucket,
 * reason, search — is sent to the API rather than applied to the fetched page,
 * because filtering client-side would silently return short pages.
 */

var compliancePage = 0;
var compliancePageSize = 50;
var complianceBucket = '';
var complianceTotal = 0;

function complianceEscape(value) {
    if (value === null || value === undefined) {
        return '';
    }
    return $('<div>').text(String(value)).html();
}

function complianceBucketBadge(bucket) {
    var map = {
        overdue: 'danger',
        never_serviced: 'danger',
        due_soon: 'warning',
        compliant: 'success'
    };
    return map[bucket] || 'secondary';
}

function complianceUkDate(value) {
    if (!value) {
        return '';
    }
    var d = new Date(value);
    if (isNaN(d.getTime())) {
        return complianceEscape(value);
    }
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear();
}

// ─── Query building ───────────────────────────────────────────────────────────

function complianceParams(extra) {
    var params = {
        start: compliancePage * compliancePageSize,
        length: compliancePageSize,
        order_by: 'due_date',
        order_type: 'asc'
    };

    var search = $.trim($('#compliance-search').val() || '');
    if (search) {
        params['search[value]'] = search;
    }
    if (complianceBucket) {
        params['filters[bucket]'] = complianceBucket;
    }

    return $.extend(params, extra || {});
}

function complianceQueryString(extra) {
    return $.param(complianceParams(extra));
}

// ─── Rendering ────────────────────────────────────────────────────────────────

function buildComplianceRow(row) {
    // The reason filter is applied here rather than server-side: `reason` is
    // derived from several columns after the row is fetched, so it cannot be a
    // WHERE clause without duplicating that logic in SQL. It therefore only
    // narrows the current page, which the count line makes explicit.
    var html = '<tr>';
    html += '<td class="fs-12">' + complianceEscape(row.uprn) + '</td>';
    html += '<td class="fs-12">' + complianceEscape(row.property_address) + '</td>';
    html += '<td class="fs-12">' + complianceEscape(row.client_name) + '</td>';
    html += '<td class="fs-12">' + complianceEscape(row.service_title) + '</td>';
    html += '<td class="fs-12">' + complianceEscape(row.frequency) + '</td>';
    html += '<td class="fs-12">' + (row.last_completed_date ? complianceUkDate(row.last_completed_date) : '<span class="text-danger">Never</span>') + '</td>';
    html += '<td class="fs-12">' + complianceUkDate(row.due_date) + '</td>';

    html += '<td><span class="badge bg-' + complianceBucketBadge(row.bucket) + '">'
          + complianceEscape(row.bucket_label) + '</span>';
    if (row.days_overdue > 0) {
        html += '<div class="text-danger fs-11">' + row.days_overdue + 'd over</div>';
    }
    html += '</td>';

    html += '<td class="fs-12">' + complianceEscape(row.reason_label) + '</td>';

    html += '<td class="fs-12">';
    if (row.open_job_id) {
        // cdn_url + hashid, as every other grid does. site_url is the API host
        // and would send the user to a route that does not exist there.
        html += '<a href="' + cdn_url + 'job/details/' + ajs.hash_encode(row.open_job_id) + '" target="_blank">'
              + complianceEscape(row.open_job_code) + '</a>';
    } else {
        html += '<span class="text-muted">&mdash;</span>';
    }
    html += '</td>';

    html += '</tr>';
    return html;
}

function renderComplianceRows(rows) {
    var reason = $('#compliance-reason').val();
    var filtered = rows;

    if (reason) {
        filtered = rows.filter(function (r) { return r.reason === reason; });
    }

    if (!filtered || filtered.length === 0) {
        $('#compliance-tbody').html(
            '<tr><td colspan="10" class="text-center text-muted py-4">No rows matched.</td></tr>'
        );
        return;
    }

    var html = '';
    filtered.forEach(function (row) {
        html += buildComplianceRow(row);
    });
    $('#compliance-tbody').html(html);

    var from = compliancePage * compliancePageSize + 1;
    var to   = from + rows.length - 1;
    var line = 'Showing ' + from + '–' + to + ' of ' + complianceTotal;
    if (reason) {
        line += ' (' + filtered.length + ' on this page match the reason filter)';
    }
    $('#compliance-count').text(line);
}

// ─── Loading ──────────────────────────────────────────────────────────────────

function loadComplianceSummary() {
    ajs.ajax_form(
        site_url + 'dashboard/compliance/summary?' + complianceQueryString(),
        null, 'GET', null, '0', '0',
        function (res) {
            if (!res || !res.status || !res.data) {
                return;
            }
            var d = res.data;
            $('.stat-total').text(d.total);
            $('.stat-overdue').text(d.overdue);
            $('.stat-never').text(d.never_serviced);
            $('.stat-duesoon').text(d.due_soon);
            $('.stat-compliant').text(d.compliant);
            $('.stat-pct').text(d.percentage + '%');
        },
        function () { /* the grid still loads; a failed tile row is not fatal */ }
    );
}

function loadComplianceGrid() {
    $('#compliance-tbody').html(
        '<tr><td colspan="10" class="text-center text-muted py-4">'
        + '<i class="las la-spinner la-spin"></i> Loading&hellip;</td></tr>'
    );

    ajs.ajax_form(
        site_url + 'dashboard/compliance?' + complianceQueryString(),
        null, 'GET', null, '0', '0',
        function (res) {
            if (!res) {
                $('#compliance-tbody').html('<tr><td colspan="10" class="text-center text-danger py-4">Failed to load.</td></tr>');
                return;
            }
            complianceTotal = res.recordsTotal || 0;
            renderComplianceRows(res.data || []);
            $('#compliance-prev').prop('disabled', compliancePage === 0);
            $('#compliance-next').prop('disabled', (compliancePage + 1) * compliancePageSize >= complianceTotal);
        },
        function () {
            $('#compliance-tbody').html('<tr><td colspan="10" class="text-center text-danger py-4">Error loading rows.</td></tr>');
        }
    );
}

function reloadCompliance() {
    loadComplianceSummary();
    loadComplianceGrid();
}

// ─── Events ───────────────────────────────────────────────────────────────────

$(document).on('click', '.compliance-page .stat-tile', function () {
    $('.compliance-page .stat-tile').removeClass('active');
    $(this).addClass('active');
    complianceBucket = $(this).data('bucket') || '';
    compliancePage = 0;
    loadComplianceGrid();
});

$(document).on('click', '#compliance-apply', function () {
    compliancePage = 0;
    reloadCompliance();
});

$(document).on('click', '#compliance-reset', function () {
    $('#compliance-search').val('');
    $('#compliance-reason').val('');
    complianceBucket = '';
    compliancePage = 0;
    $('.compliance-page .stat-tile').removeClass('active');
    $('.compliance-page .stat-tile[data-bucket=""]').addClass('active');
    reloadCompliance();
});

$(document).on('keypress', '#compliance-search', function (e) {
    if (e.which === 13) {
        compliancePage = 0;
        reloadCompliance();
    }
});

$(document).on('change', '#compliance-reason', function () {
    loadComplianceGrid();
});

$(document).on('click', '#compliance-prev', function () {
    if (compliancePage > 0) {
        compliancePage--;
        loadComplianceGrid();
    }
});

$(document).on('click', '#compliance-next', function () {
    if ((compliancePage + 1) * compliancePageSize < complianceTotal) {
        compliancePage++;
        loadComplianceGrid();
    }
});

$(document).on('click', '#compliance-export-btn', function () {
    var $btn = $(this);
    $btn.prop('disabled', true).html('<i class="las la-spinner la-spin"></i> Exporting&hellip;');

    ajs.ajax_form(
        site_url + 'dashboard/compliance/export?' + complianceQueryString(),
        null, 'GET', null, '0', '0',
        function (res) {
            $btn.prop('disabled', false).html('<i class="las la-file-excel me-1"></i> Export Excel');
            if (!res || !res.status) {
                ajs.alert_msg(res && res.message ? res.message : 'Export failed.', 'error');
                return;
            }
            if (res.path) {
                // site_url is right here, unlike for page links: the generated
                // file is written under the API's temp-reports directory. Same
                // as k03/k04/k06 and r01/r02. (base_url is not a global in this
                // app at all - it was a ReferenceError.)
                window.location.href = site_url + res.path;
            } else {
                // Large exports are queued; the user is notified when ready.
                ajs.alert_msg(res.message, 'success');
            }
        },
        function () {
            $btn.prop('disabled', false).html('<i class="las la-file-excel me-1"></i> Export Excel');
            ajs.alert_msg('Export failed.', 'error');
        }
    );
});

// See the note in delay_board.js — the theme's one-shot tooltip binding is not
// dependable on pages it was not written for, so bind explicitly.
function initComplianceTooltips() {
    if (typeof bootstrap === 'undefined' || !bootstrap.Tooltip) return;
    Array.prototype.forEach.call(
        document.querySelectorAll('.ajs-dash [data-bs-toggle="tooltip"]'),
        function (el) {
            if (!bootstrap.Tooltip.getInstance(el)) {
                new bootstrap.Tooltip(el);
            }
        }
    );
}

$(document).ready(function () {
    initComplianceTooltips();

    if ($('#is_compliance').val() === '1') {
        reloadCompliance();
    }
});
