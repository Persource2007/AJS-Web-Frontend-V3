var dataTable = null;

function load_data_table(limit, search_term, filters) {
    var data_filters = (filters && filters.filters) ? filters.filters : '';
    var page_limit   = limit || ajs.datatable_limit;
    var search       = search_term || '';

    dataTable = new DataTable("#ajax-datatables", {
        scrollY:    (screen.height - 525) + 'px',
        serverSide: true,
        processing: true,
        paging:     true,
        responsive: false,
        bDestroy:   true,
        pageLength: page_limit,
        search:     { search: search },
        ajax: {
            url:     site_url + "log/system/app_error_log",
            method:  "GET",
            dataSrc: 'data',
            data: function (d) {
                return $.extend({}, d, { data_filters: data_filters });
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            error: function (xhr) {
                ajs.datatable_error(xhr, "ajax-datatables");
            }
        },
        language: {
            emptyTable: "No error logs found",
            processing: '<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i><span class="sr-only">Loading...</span>',
        },
        columns: [
            {
                name: "severity", data: "severity",
                render: function (data) {
                    var map = { critical: 'danger', error: 'danger', warning: 'warning', info: 'info' };
                    return `<span class="badge bg-${map[data] || 'secondary'}">${data}</span>`;
                }
            },
            {
                name: "error_type", data: "error_type",
                render: function (data) {
                    var map = { frontend: 'primary', backend: 'dark', db: 'warning', api: 'info' };
                    return `<span class="badge bg-${map[data] || 'secondary'}">${data}</span>`;
                }
            },
            {
                name: "message", data: "message",
                render: function (data) {
                    if (!data) return '-';
                    var s = data.substring(0, 120);
                    return s + (data.length > 120 ? '&hellip;' : '');
                }
            },
            {
                name: "file_module", data: "file_module",
                render: function (data) { return data || '-'; }
            },
            {
                name: "api_url", data: "api_url",
                render: function (data) {
                    if (!data) return '-';
                    var s = data.substring(0, 60);
                    return s + (data.length > 60 ? '&hellip;' : '');
                }
            },
            {
                name: "user_id", data: "user_id",
                render: function (data) { return data || '-'; }
            },
            {
                name: "ip_address", data: "ip_address",
                render: function (data) { return data || '-'; }
            },
            {
                name: "add_date", data: "add_date",
                render: function (data) { return ajs.format_datetime(data); }
            }
        ],
        order: [['7', 'desc']]
    });
}

function apply_filters() {
    var filters = {
        month:      $('#filter_month').val(),
        year:       $('#filter_year').val(),
        severity:   $('#filter_severity').val(),
        error_type: $('#filter_error_type').val(),
    };
    var search = $('#filter_search').val();
    if (dataTable) { dataTable.destroy(); }
    load_data_table(ajs.datatable_limit, search, { filters: filters });
}

function clear_filters() {
    $('#filter_search').val('');
    $('#filter_severity, #filter_error_type').val('');
    // Reset month/year to current
    var now = new Date();
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    $('#filter_month').val(months[now.getMonth()]);
    $('#filter_year').val(now.getFullYear());
    apply_filters();
}

// Reload when month/year changes
$(document).on('change', '#filter_month, #filter_year', function () { apply_filters(); });
