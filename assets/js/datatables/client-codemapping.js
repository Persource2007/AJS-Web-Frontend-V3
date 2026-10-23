dataTable = null;
function load_data_table(limit, search_term, filters)
{
    dataTable = new DataTable("#ajax-datatables", {
        serverSide: true,
        processing: true,
        paging: false,
        bDestroy: true,
        bInfo: false,
        buttons: [],
        ajax: {
            url: site_url + "client/code_mapping/" + client_id + "/workstreams",
            method: "GET",
            async: false,
            dataSrc: 'message.data',
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            error: function (xhr) {
                ajs.datatable_error(xhr, "ajax-datatables");
            }
        },
        language: {
            emptyTable: "No data found",
        },
        columns: [
            {
                name: "id",
                data: "id",
                searchable: false,
                sortable: false,
                render: function (data, type, row, meta) {
                    var startIndex = meta.settings._iDisplayStart;
                    return startIndex + meta.row + 1;
                }
            },
            {
                name: "title",
                data: "title",
                searchable: false,
                sortable: false,
                render: function (data, type, row) {
                    return row.title;
                }
            },
            {
                name: "our_code",
                data: "our_code",
                searchable: false,
                sortable: false,
                render: function (data, type, row) {
                    return row.our_code;
                }
            },
            {
                name: "client_code",
                data: "client_code",
                searchable: false,
                sortable: false,
                render: function (data, type, row) {
                    if (row.client_code == null)
                    {
                        row.client_code = '';
                    }
                    return "<input data-type='client_code_ws' class='add-client-code' data-ref-id='" + row.id + "' type='text' name='client_code_ws_" + row.id + "' id='client_code_ws_" + row.id + "' value='" + row.client_code + "'>";
                }
            },
            {
                name: "analysis_code",
                data: "analysis_code",
                searchable: false,
                sortable: false,
                render: function (data, type, row) {
                    if (row.analysis_code == null)
                    {
                        row.analysis_code = '';
                    }
                    return "<input data-type='client_analysis_ws' class='add-client-code' data-ref-id='" + row.id + "' name='client_analysis_ws_" + row.id + "' id='client_analysis_ws_" + row.id + "'  type='text' name='' value='" + row.analysis_code + "'>";
                }
            },
            {
                name: "row_action",
                data: "row_action",
                searchable: false,
                sortable: false,
                searchable: false,
                sortable: false,
                render: function (data, type, row) {
                    return "<button style='display:none' class='btn btn-primary save-client-code-ws' data-ref-id='" + row.id + "'>Save</button>";
                }
            }
        ],
        order: [
            ['0', 'desc']
        ]
    });
}

function load_data_table1(limit, search_term, filters)
{
    dataTable = new DataTable("#ajax-datatables1", {
        serverSide: true,
        processing: true,
        paging: false,
        bDestroy: true,
        bInfo: false,
        buttons: [],
        ajax: {
            url: site_url + "client/code_mapping/" + client_id + "/services",
            method: "GET",
            async: false,
            dataSrc: 'message.data',
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            error: function (xhr) {
                ajs.datatable_error(xhr, "ajax-datatables1");
            }
        },
        language: {
            emptyTable: "No data found",
        },
        columns: [
            {
                name: "id",
                data: "id",
                searchable: false,
                sortable: false,
                render: function (data, type, row, meta) {
                    var startIndex = meta.settings._iDisplayStart;
                    return startIndex + meta.row + 1;
                }
            },
            {
                name: "title",
                data: "title",
                searchable: false,
                sortable: false,
                render: function (data, type, row) {
                    return row.title;
                }
            },
            {
                name: "our_code",
                data: "our_code",
                searchable: false,
                sortable: false,
                render: function (data, type, row) {
                    return row.our_code;
                }
            },
            {
                name: "client_code",
                data: "client_code",
                searchable: false,
                sortable: false,
                render: function (data, type, row) {
                    if (row.client_code == null)
                    {
                        row.client_code = '';
                    }
                    return "<input data-type='client_code_service'  class='add-client-code' data-ref-id='" + row.id + "' name='client_code_service_" + row.id + "' id='client_code_service_" + row.id + "'   type='text' name='' value='" + row.client_code + "'>";
                }
            },
            {
                name: "analysis_code",
                data: "analysis_code",
                searchable: false,
                sortable: false,
                render: function (data, type, row) {
                    if (row.analysis_code == null)
                    {
                        row.analysis_code = '';
                    }
                    return "<input data-type='client_analysis_service'  class='add-client-code' data-ref-id='" + row.id + "' name='client_analysis_service_" + row.id + "' id='client_analysis_service_" + row.id + "'  type='text' name='' value='" + row.analysis_code + "'>";
                }
            },
            {
                name: "row_action",
                data: "row_action",
                searchable: false,
                sortable: false,
                render: function (data, type, row) {
                    return "<button style='display:none' class='btn btn-primary save-client-code-service' data-ref-id='" + row.id + "'>Save</button>";
                }
            }
        ],
        order: [
            ['0', 'desc']
        ]
    });
}

load_data_table();
load_data_table1();

function save_callback(return_data)
{
    if (ajs.check_result(return_data))
    {
        var ref_id = return_data.post_data.ref_id;
        var type = return_data.post_data.type;

        if (type == 'services')
        {
            $(document).find(".save-client-code-service[data-ref-id='" + ref_id + "']").css('display', 'none');
        } else if (type == 'workstreams')
        {
            $(document).find(".save-client-code-ws[data-ref-id='" + ref_id + "']").css('display', 'none');
        }
    }
}

function create_breadcrumb(result_json)
{
    if (ajs_form_handler.check_result(result_json)) {
        var client = result_json.message.data;

        var detail_url = 'clients/details/' + ajs.hash_encode(client.id);
        var breadcrumbs = [
            {label : 'Clients', url: cdn_url + 'clients/list'},
            {label : client.client_code, url: cdn_url + detail_url},
            {label : 'Code Mapping', url: null}
        ];

        set_breadcrumb(breadcrumbs);
        
    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

$(document).ready(function (e) {

    var id = $("#client_id").val();
    ajs.ajax_form(site_url + 'client/get/' + id, null, 'GET', null, '0', '0', create_breadcrumb, create_breadcrumb);

    $('.add-client-code').on('keyup', function (event) {
        var ref_id = $(this).data('ws-id');
        $(this).closest('tr').find('button').css('display', '');
    });

    $('.save-client-code-ws').on('click', function (event) {

        var type = 'workstreams';
        var ref_id = $(this).data('ref-id');
        var code = $('#client_code_ws_' + ref_id).val();
        var analysis_code = $('#client_analysis_ws_' + ref_id).val();
        
        ajs.submit_button_element = $(document).find(".save-client-code-ws[data-ref-id='" + ref_id + "']");

        var data = {client_id: client_id, ref_id: ref_id, code: code, analysis_code: analysis_code, type: type};
        ajs.ajax_form(site_url + "client/code_mapping", data, 'POST', null, '1', '1', save_callback, save_callback);

    });

    $('.save-client-code-service').on('click', function (event) {

        
        var type = 'services';
        var ref_id = $(this).data('ref-id');
        var code = $('#client_code_service_' + ref_id).val();
        var analysis_code = $('#client_analysis_service_' + ref_id).val();
        
        ajs.submit_button_element = $(document).find(".save-client-code-service[data-ref-id='" + ref_id + "']");

        var data = {client_id: client_id, ref_id: ref_id, code: code, analysis_code: analysis_code, type: type};
        ajs.ajax_form(site_url + "client/code_mapping", data, 'POST', null, '1', '1', save_callback, save_callback);

    });

    $('.devider').remove();
})


