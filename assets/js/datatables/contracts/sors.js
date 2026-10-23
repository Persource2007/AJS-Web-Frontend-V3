var master_data_type = 'contract_sor';
dataTable = null;
function load_data_table(limit, search_term, filters, column_visibility)
{

    data_filters = {};
    page_limit = ajs.datatable_limit;
    search = '';
    if (typeof filters !== 'undefined' && (typeof filters['filters'] !== 'undefined' || filters['filters'] != null))
    {
        data_filters = filters['filters'];
    }
    if (typeof limit !== 'undefined' || limit != null)
    {
        page_limit = limit;
    }
    if (typeof search_term !== 'undefined' || search_term != null)
    {
        search = search_term;
    }


    dataTable = new DataTable("#ajax-datatables", {
        serverSide: true,
        processing: true,
        paging: true,
        responsive:false,
        bDestroy: true,
        pageLength: page_limit,
        search: {
            search: search
        },
        // dom: 'Bfrtip',
        // buttons: [
        //     {
        //         extend: 'colvis',
        //         text: 'Toggle Columns',
        //         collectionLayout: 'two-column',
        //         className: 'btn btn-outline-dark  dropdown-toggle',
        //         init: function (api, node, config) {
        //             $(node).removeClass('dt-button');
        //             $(node).find('.dt-down-arrow').remove();
        //         }
        //     }
        // ],
        ajax: {
            url: site_url + "sor/get_all",
            method: "GET",
            async: false,
            dataSrc: 'message.data',
            "data": function (d) {
                if ($("#edit_id").val() > 0) {
                    d.contract = true;
                    d.contract_id = $("#edit_id").val();
                }
                return $.extend({}, d, {
                    data_filters
                });
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            error: function (xhr) {
                ajs.datatable_error(xhr, "ajax-datatables");
                if (xhr.status !== 200) {
                    $('#ajax-datatables').html('<p>No data found.</p>'); // Display "No data found" message if 404 error
                }
            }
        },
        language: {
            emptyTable: "No data found",
        },
        columns: [
            {
                name: "id",
                data: "id",
                visible: false,
                searchable: false,
            },
            {
                name: "id",
                data: "id",
            },
            {
                name: "title",
                data: "title",
            },
            {
                name: "sor_type_name",
                data: "sor_type_name",
                visible: false,
                searchable: false,
            },
            {
                name: "sor_code",
                data: "sor_code",
            },
            {
                name: "client_sor_code",
                data: "client_sor_code",
            },
            {
                name: "workstream_name",
                data: "workstream_name",
            },
            {
                name: "short_description",
                data: "short_description",
                className: "short-desc",
                // render: function (data) {
                //     return truncate_string(data, 40);
                // }
            },
            {
                name: "material_price",
                data: "material_price",
                className:"pricing-col",
                render: function (data) {
                    return data.toFixed(2);
                }
            },
            {
                name: "labor_price",
                data: "labor_price",
                className:"pricing-col",
                render: function (data) {
                    return data.toFixed(2);
                }
            },
            {
                name: "sell_price",
                data: "sell_price",
                className:"pricing-col",
                render: function (data) {
                    return data.toFixed(2);
                }
            }
        ],
        order: [
            ['0', 'desc']
        ]
    });
}


if ($('#ajax-datatables').length)
{
     
    select2_ajax('#sor_type_filter', site_url + 'master-record/get_all', 'master_value', {master_code: "SOR_TYPES"});
    select2_ajax('#workstream_id_filter', site_url + 'workstream/get_all', 'title', null);
    fetch_default_filter(master_data_type);
    ajs.ajax_form(site_url + 'contract/get/' + $("#edit_id").val(), null, 'GET', null, '0', '1', create_breadcrumb, create_breadcrumb, 'Contract SORs');

}

$(function () {

});
