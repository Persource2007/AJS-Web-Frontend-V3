var master_data_type = 'completed_certificate_report';
dataTable = null;

// engineer_comment/condition are free-text engineer input, not controlled data -
// escape before interpolating into title="" / innerHTML so a quote or tag in a
// submitted comment can't break the attribute or inject markup.
function ccr_escape_html(value) {
    return $('<div>').text(value == null ? '' : String(value)).html();
}

function ccr_default_dates() {
    var end = new Date();
    var start = new Date();
    start.setDate(start.getDate() - 30);
    var fmt = function (d) { return d.toISOString().slice(0, 10); };
    return { start: fmt(start), end: fmt(end) };
}

function ccr_build_filters() {
    return {
        client_id: $('#ccr-client').val() || '',
        contract_id: $('#ccr-contract').val() || '',
        engineer_id: $('#ccr-engineer').val() || '',
        job_no: $('#ccr-job-no').val() || '',
        start_date: $('#ccr-start-date').val() || '',
        end_date: $('#ccr-end-date').val() || ''
    };
}

function load_data_table()
{
    dataTable = new DataTable("#ajax-datatables", {
        scrollX: true,
        serverSide: true,
        processing: true,
        paging: true,
        responsive: false,
        bDestroy: true,
        pageLength: ajs.datatable_limit,
        ajax: {
            url: site_url + "report/completed-certificates",
            method: "GET",
            dataSrc: 'data',
            "data": function (d) {
                return $.extend({}, d, { data_filters: ccr_build_filters() });
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            error: function (xhr) {
                ajs.datatable_error(xhr, "ajax-datatables");
            }
        },
        language: {
            emptyTable: "No completed certificates found for these filters",
        },
        columns: [
            { data: "client_name", name: "client_name", defaultContent: "" },
            { data: "job_no", name: "job_no", defaultContent: "" },
            { data: "client_job_no", name: "client_job_no", defaultContent: "" },
            { data: "contract_number", name: "contract_number", defaultContent: "" },
            { data: "workstream", name: "workstream", defaultContent: "" },
            {
                data: "job_type_title", name: "job_type_title", defaultContent: "",
                render: function (data, type, row) { return data || row.job_type || ''; }
            },
            {
                data: "certificate_type", name: "certificate_type", defaultContent: "", width: "160px",
                render: function (data) {
                    if (!data) return "";
                    var safe = ccr_escape_html(data);
                    return `<span class="text-truncate d-inline-block" style="max-width:160px;" data-bs-toggle="tooltip" data-bs-trigger="hover" title="${safe}">${ccr_escape_html(truncate_string(data, 20))}</span>`;
                }
            },
            {
                data: "certificate_date", name: "certificate_date", defaultContent: "",
                render: function (data) { return data ? ajs.format_date(data) : ''; }
            },
            { data: "engineer_name", name: "engineer_name", defaultContent: "" },
            { data: "uprn", name: "uprn", defaultContent: "" },
            {
                data: "address1", name: "address1", defaultContent: "", width: "180px",
                render: function (data, type, row) {
                    var full = [row.address1, row.address2, row.town].filter(Boolean).join(', ');
                    if (!full) return "";
                    var safe = ccr_escape_html(full);
                    return `<span class="text-truncate d-inline-block" style="max-width:180px;" data-bs-toggle="tooltip" data-bs-trigger="hover" title="${safe}">${ccr_escape_html(truncate_string(full, 25))}</span>`;
                }
            },
            { data: "postalcode", name: "postalcode", defaultContent: "" },
            {
                data: "condition", name: "condition", defaultContent: "", width: "120px",
                render: function (data) {
                    if (!data) return "";
                    var safe = ccr_escape_html(data);
                    return `<span class="text-truncate d-inline-block" style="max-width:120px;" data-bs-toggle="tooltip" data-bs-trigger="hover" title="${safe}">${ccr_escape_html(truncate_string(data, 15))}</span>`;
                }
            },
            {
                data: "engineer_comment", name: "engineer_comment", defaultContent: "", width: "200px",
                render: function (data) {
                    if (!data) return "";
                    var safe = ccr_escape_html(data);
                    return `<span class="text-truncate d-inline-block" style="max-width:200px;" data-bs-toggle="tooltip" data-bs-trigger="hover" title="${safe}">${ccr_escape_html(truncate_string(data, 30))}</span>`;
                }
            },
        ],
        order: [[7, 'desc']],
        drawCallback: function () {
            $('[data-bs-toggle="tooltip"]').each(function () {
                new bootstrap.Tooltip(this, { customClass: 'ccr-tooltip' });
            });
        }
    });
}

function ccr_export() {
    var filters = ccr_build_filters();
    $('#ccr-export-btn').prop('disabled', true).html('<i class="las la-spinner la-spin me-1"></i> Exporting…');

    ajs.ajax_form(site_url + 'report/completed-certificates/export', filters, 'GET', null, '1', '1', function (res) {
        $('#ccr-export-btn').prop('disabled', false).html('<i class="las la-file-excel me-1"></i> Export');
        if (res && res.status && res.path) {
            Swal.fire({ icon: 'success', title: 'Export ready', text: res.message, confirmButtonText: 'Download' })
                .then(function () { window.open(site_url + res.path, '_blank'); });
        } else if (res && res.status) {
            Swal.fire({ icon: 'info', title: 'Export queued', text: res.message });
        } else {
            Swal.fire({ icon: 'warning', title: 'Nothing to export', text: (res && res.message) || 'No completed certificates matched these filters.' });
        }
    }, function () {
        $('#ccr-export-btn').prop('disabled', false).html('<i class="las la-file-excel me-1"></i> Export');
        Swal.fire({ icon: 'error', title: 'Export failed', text: 'Please try again.' });
    });
}

if ($('#ajax-datatables').length) {
    var defaults = ccr_default_dates();
    $('#ccr-start-date').val(defaults.start);
    $('#ccr-end-date').val(defaults.end);

    add_autocomplete_sel("#ccr-client", "clients", ["client_code", "company_name"], null, null);
    add_autocomplete_sel("#ccr-contract", "contracts", ["contract_number"], null, null);
    add_autocomplete_sel("#ccr-engineer", "users", ["first_name", "last_name"], null, { user_type: 16 });

    load_data_table();

    $('#ccr-search-btn').on('click', function (e) {
        e.preventDefault();
        dataTable.ajax.reload();
    });
    $('#ccr-export-btn').on('click', function (e) {
        e.preventDefault();
        ccr_export();
    });

    var breadcrumbs = [
        { label: 'Reports', url: null },
        { label: 'Certificate Report', url: null }
    ];
    set_breadcrumb(breadcrumbs);
}
