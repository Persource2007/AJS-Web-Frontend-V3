var master_data_type = 'master';
dataTable = null;

// flatpickr emits "m/d/Y" (zero padded), so "08/01/2026" -> "2026-08-01"
function log_date_to_ymd(value)
{
    var parts = $.trim(value || '').split('/');
    if (parts.length !== 3)
    {
        return '';
    }
    return parts[2] + '-' + parts[0] + '-' + parts[1];
}

// platform comes from the App-Platform request header, i.e. caller-controlled text, and an
// unrecognised value is printed as-is below. Escape before it reaches innerHTML.
function log_escape_html(value)
{
    return $('<div>').text(value == null ? '' : String(value)).html();
}

// Mobile vs web at a glance. Rows logged before the platform column existed have no
// value at all, which is why the empty case is a dash rather than an "unknown" badge.
function render_platform(platform)
{
    var value = $.trim(platform || '');
    if (value === '')
    {
        return '<span class="text-muted">-</span>';
    }

    var badges = { web: 'info', android: 'success', ios: 'dark' };
    var labels = { web: 'Web', android: 'Android', ios: 'iOS' };
    var key = value.toLowerCase();

    return '<span class="badge bg-' + (badges[key] || 'secondary') + '-subtle text-' +
           (badges[key] || 'secondary') + '">' +
           (labels[key] || log_escape_html(value)) + '</span>';
}

// Did the call fail? Decided server side (HTTP >= 400, or the response envelope's status flag)
// and stored per row, so this only paints it. A null means nothing was ever recorded for the row -
// a cron entry, or one logged before the column existed - which is not the same as having passed,
// so it gets a dash rather than a green badge.
function render_result(row)
{
    if (row.is_error === null || typeof row.is_error === 'undefined')
    {
        return '<span class="text-muted">-</span>';
    }

    var failed = Number(row.is_error) === 1;
    var tone   = failed ? 'danger' : 'success';
    var code   = row.http_status ? ' ' + log_escape_html(row.http_status) : '';

    return '<span class="badge bg-' + tone + '-subtle text-' + tone + '">' +
           (failed ? 'Error' : 'Success') + code + '</span>';
}

// Read straight from the controls on every request so ajax.reload() always sends
// current values - no need to rebuild the grid to change a filter
function collect_log_filters()
{
    var filters = {};
    filters['user_id'] = $('#user_filter').val() || '';
    filters['user_type'] = $('#user_type_filter').val() || '';
    // 'web' | 'android' | 'ios' - matched against the platform column server side
    filters['platform'] = $('#platform_filter').val() || '';
    // 'error' | 'success' - matched against the is_error column server side
    filters['status'] = $('#status_filter').val() || '';

    // flatpickr range mode joins the two dates with " to "; a half-picked range
    // holds a single date, which we treat as a one day range
    var date_range = $.trim($('#from_to_dates').val() || '');
    if (date_range !== '')
    {
        var dates = date_range.split(' to ');
        var start_date = log_date_to_ymd(dates[0]);
        var end_date = log_date_to_ymd(dates.length > 1 ? dates[1] : dates[0]);
        // The grid renders add_date in the viewer's timezone, so the picked days are
        // local days. Send the matching UTC window or the rows returned would not
        // match the dates on screen for entries either side of local midnight.
        if (start_date !== '')
        {
            filters['start_date'] = moment(start_date + ' 00:00:00', 'YYYY-MM-DD HH:mm:ss').utc().format('YYYY-MM-DD HH:mm:ss');
        }
        if (end_date !== '')
        {
            filters['end_date'] = moment(end_date + ' 23:59:59', 'YYYY-MM-DD HH:mm:ss').utc().format('YYYY-MM-DD HH:mm:ss');
        }
    }

    return filters;
}

function load_data_table(limit)
{
    page_limit = limit || ajs.datatable_limit;

    dataTable = new DataTable("#ajax-datatables", {
        scrollY: (screen.height - 525) + 'px',
        serverSide: true,
        processing: true,
        paging: true,
        responsive:false,
        bDestroy: true,
        pageLength: page_limit,
        // dom: 'Bfrtip',

        ajax: {
            url: site_url + "user/activity_log",
            method: "GET",
            dataSrc: 'data',
            "data": function (d) {
                d.search = {value: $('#search_term').val() || '', regex: false};
                return $.extend({}, d, {
                    data_filters: collect_log_filters()
                });
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            error: function (xhr, error, code) {
                ajs.datatable_error(xhr, "ajax-datatables");
            }
        },
        language: {
            emptyTable: "No data found",
            processing: '<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i><span class="sr-only">Loading...</span>',
        },
        columns: [
            {
                name: "id",
                data: "id",
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                    return `<a href="javascript:;" data-id="` + row.id + `" data-month="` + row.month_name + `" data-year="` + row.year_name + `" data-heading="Log Details" data-after-load-func="get_log_details" data-form-url="` + cdn_url + `system/logs/user-activity-logs/view/` + row.id + `/` + row.month_name + `/` + row.year_name + `" class='popup-form-button'><i class="ri-eye-line align-bottom me-2 primary-btn fs-15 "></i></a>`;
                }
            },
            {
                name: "log_id",
                data: "id",
                orderable: false,
                render: function (data, type, row) {
                    // Ids restart in every monthly table, so the id alone does not identify a row
                    // across months - the Date / Time column is what disambiguates it. Not
                    // orderable for the same reason: get_user_logs() falls back to add_date when
                    // the query spans more than one month.
                    return '<span class="text-muted">' + log_escape_html(row.id) + '</span>';
                }
            },
            {
                name: "first_name",
                data: "full_name",
            },
            {
                name: "user_type_name",
                data: "user_type_name",
                render: function (data, type, row) {
                    return row.user_type_name;
                }
            },
            {
                name: "log_type",
                data: "log_type",
                render: function (data, type, row) {
                    return row.log_type;
                }
            },
            {
                name: "platform",
                data: "platform",
                render: function (data, type, row) {
                    return render_platform(row.platform);
                }
            },
            {
                name: "is_error",
                data: "is_error",
                render: function (data, type, row) {
                    return render_result(row);
                }
            },
            {
                name: "add_date",
                data: "add_date",
                render: function (data, type, row) {
                    return ajs.format_datetime(row.add_date);
                }
            }
        ],
        order: [
            [7, 'desc']
        ]
    });
}

if ($('#ajax-datatables').length)
{
    select2_ajax_users('#user_filter');
    select2_ajax('#user_type_filter', site_url + "master-record/get_all", "master_value", {master_code: "USER_TYPES"});
    $('#platform_filter').select2({ allowClear: true, placeholder: 'Platform', minimumResultsForSearch: Infinity });
    $('#status_filter').select2({ allowClear: true, placeholder: 'Result', minimumResultsForSearch: Infinity });
    ajs.apply_ind_roles('System Logs');
    var breadcrumbs = [
        {label: 'System Admin', url: 'javascript: void(0);'},
        {label: 'Setup', url: 'javascript: void(0);'},
        {label: 'Logs', url: cdn_url+'system/logs'},
        {label: 'User Activity Log', url: null},
    ];
    set_breadcrumb(breadcrumbs);
}

// Reload in place rather than rebuilding: destroying the grid restores the original
// <thead> and re-runs the async column visibility pass, which makes columns flicker
function get_log_data()
{
    if (!dataTable)
    {
        load_data_table(ajs.datatable_limit);
    }
    else
    {
        dataTable.ajax.reload(null, true); // true = back to page 1 for a new filter
    }
    return false;
}

function clear_log_filters()
{
    $('#search_term').val('');
    $('#user_filter, #user_type_filter, #platform_filter, #status_filter').val('').trigger('change.select2');

    var picker = $('#from_to_dates').get(0);
    if (picker && picker._flatpickr)
    {
        picker._flatpickr.clear();
    }
    else
    {
        $('#from_to_dates').val('');
    }

    return get_log_data();
}

// Filters only apply on demand - changing a control does not reload the grid
$(document).on('click', '#log_search_btn', function (e) {
    e.preventDefault();
    get_log_data();
});

$(document).on('click', '#log_clear_btn', function (e) {
    e.preventDefault();
    clear_log_filters();
});

$(document).on('submit', '#form_filters', function (e) {
    e.preventDefault();
    get_log_data();
});

$(document).on('keydown', '#search_term', function (e) {
    if (e.key === 'Enter' || e.which === 13)
    {
        e.preventDefault();
        get_log_data();
    }
});

// The payload behind the panel currently on screen, kept so the download button can emit it
// without a second round trip - set_log_details() already received the whole thing.
var current_log_detail = null;

/**
 * Parse a stored log body, falling back to the raw string when it is not JSON.
 * Older rows hold plain text ('Success', 'Validation failed', a bare id), so this has to cope
 * with both shapes.
 */
function parse_log_body(raw)
{
    if (raw === null || typeof raw === 'undefined') { return null; }
    try { return JSON.parse(raw); } catch (e) { return raw; }
}

/** Render one body into its pane, pretty-printed when it is JSON and left as text when it is not. */
// beautifyJSON builds a DOM node per key and per value, so the cost is in the shape of the
// payload, not its bytes. A few hundred KB of list data is tens of thousands of nodes and locks
// the browser up for seconds - which is what made the panel look like it had hung. Past this,
// the body is shown as pre-formatted text instead: no tree, no collapsing, but it renders
// instantly and the Download JSON button still gives the whole thing.
var LOG_TREE_RENDER_LIMIT = 102400; // 100 KB

function render_log_body(section, raw)
{
    var text  = (raw === null || typeof raw === 'undefined') ? '' : String(raw);
    var $el   = $('.log-detail-' + section);
    var $note = $('#log-note-' + section).addClass('d-none').empty();

    if (text.length > LOG_TREE_RENDER_LIMIT)
    {
        // Pretty-print if it parses - that is cheap - but never build the tree.
        var pretty = text;
        try { pretty = JSON.stringify(JSON.parse(text), null, 2); } catch (e) { /* leave as-is */ }

        // The notice lives outside the scroll box, so it stays put and cannot disturb the
        // layout of the body itself. Offering the download here is the point: this is where
        // the body stopped being readable on screen.
        $note.removeClass('d-none').addClass('d-flex').html(
            '<span>Shown as plain text - ' + Math.round(text.length / 1024) +
            ' KB is too large to expand as a tree.</span>' +
            '<button type="button" class="btn btn-sm btn-primary ms-3 flex-shrink-0 download-log-json">' +
            '<i class="ri-download-2-line align-bottom me-1"></i>Download JSON</button>'
        );

        $el.html('<pre class="mb-0 small text-body" style="white-space:pre-wrap;word-break:break-all;">' +
                 log_escape_html(pretty) + '</pre>');
        return;
    }

    $el.text(text);
    try {
        JSON.parse(text);
        $el.beautifyJSON({ collapsible: true, color: true, hoverable: true });
    } catch (e) {
        // Not JSON - the text is already in place, which is the most useful thing to show.
        console.warn('Log body is not JSON (' + section + '):', e);
    }
}

function set_log_details(json_data)
{
    if (ajs_form_handler.check_result(json_data))
    {
        current_log_detail = json_data.data;

        render_log_body('request', json_data.data.log_data);
        render_log_body('response', json_data.data.return_data);
        render_log_body('headers', json_data.data.headers);

        // A body over LOG_MAX_BODY_BYTES is stored as a marker holding only its opening bytes.
        // Say so, rather than letting the marker render as though it were the payload. A marker
        // is tiny, so it never collides with the oversized-body notice render_log_body() sets.
        var response = parse_log_body(json_data.data.return_data);
        if (response && typeof response === 'object' && response._truncated === true)
        {
            $('#log-note-response').removeClass('d-none').addClass('d-flex').html(
                '<span>Only the first ' +
                Math.round((response.head ? response.head.length : 0) / 1024) +
                ' KB of this ' + Math.round((response.original_length || 0) / 1024) +
                ' KB response was stored. The rest was never written and cannot be recovered.</span>'
            );
        }
    } else
    {
        current_log_detail = null;
        ajs_form_handler.show_errors_offcanvas(json_data);
    }
}

// Built in the browser from the data the panel already holds: no extra endpoint, no temp file on
// the server, and no auth-header problem (a plain download link cannot carry the API token).
$(document).on('click', '.download-log-json', function () {
    if (!current_log_detail)
    {
        return;
    }

    var d = current_log_detail;
    var payload = {
        log_id:   d.id,
        user:     d.username,
        log_type: d.log_type,
        platform: d.platform,
        add_date: d.add_date,
        request:  parse_log_body(d.log_data),
        response: parse_log_body(d.return_data),
        headers:  parse_log_body(d.headers)
    };

    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    var url  = URL.createObjectURL(blob);
    var a    = document.createElement('a');

    a.href     = url;
    a.download = 'activity-log-' + d.id + '-' + String(d.add_date || '').substring(0, 10) + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

get_log_data();

function get_log_details()
{
    var id = $('#log_id').val();
    var month = $('#log_month').val();
    var year = $('#log_year').val();
    ajs.ajax_form(site_url + 'user/activity_log/' + month + '/' + year + '/' + id, null, 'GET', null, '1', '1', set_log_details, set_log_details);
}

$(document).on('click', '.view-log-details', function (e) {
    var id = $(this).data('id');
    var month = $(this).data('month');
    var year = $(this).data('year');
    ajs.ajax_form(site_url + 'user/activity_log/' + month + '/' + year + '/' + id, null, 'GET', null, '1', '1', set_log_details, set_log_details);
});
