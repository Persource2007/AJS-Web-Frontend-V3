var master_data_type = "location-stock";


function load_data_table() {
    var filters = {};
    var location_id = $('#location_id').val();
    var location_type = $('#location_type').val();

    dataTable = new DataTable("#ajax-datatables", {
        searching: false,
        serverSide: true,
        processing: true,
        paging: true,
        responsive:false,
        bDestroy: true,
        pageLength: ajs.datatable_limit,
        search: {
            search: $("#search_term").val(),
        },
        //dom: "Bfrtip",
        // buttons: ["excel"],
        ajax: {
            url: site_url + "location/get_stock/" + location_type + "/" + location_id,
            method: "GET",
            async: false,
            dataSrc: "message.data",
            data: function (d) {
                if ($("#manufacturer_id_filter").val() > 0) {
                    filters['manufacturer_id'] = $("#manufacturer_id_filter").val();
                }
                return $.extend({}, d, {
                    filters,
                });
            },
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
                visible: false,
                searchable: false,
            },
            {
                name: "manuf_part_no",
                data: "manuf_part_no",
            },
            {
                name: "name",
                data: "name",
            },
            {
                name: "type",
                data: "type",
                class: "text-capitalize"
            },
            {
                name: "quantity",
                data: "quantity"
            },
            {
                name: "manufacturer",
                data: "manufacturer"
            },
            {
                name: "model",
                data: "model",
            }
        ],
        order: [["0", "desc"]],
    });
}


if ($("#ajax-datatables").length)
{
    select2_ajax(
        "#manufacturer_id_filter",
        site_url + "master-record/get_all",
        "master_value",
        {master_code: "ASSET_MAKE"},
        );
    fetch_default_filter(master_data_type);

    var location_id = $('#location_id').val();
    var location_type = $('#location_type').val() == 'V' ? 'van' : 'warehouse';

    ajs.ajax_form(site_url + location_type + "/get/" + location_id , null, "GET", null, "0", "0", create_breadcrumb, create_breadcrumb);
}

function create_breadcrumb(result_json)
{
    if (ajs_form_handler.check_result(result_json)) {
        var location = result_json.message.data;

        var breadcrumbs = [
            {label : 'System Admin', url: 'javascript: void(0);'},
            {label : 'Locations', url: 'javascript: void(0);'},
        ];

        if($('#location_type').val() == 'V') {
            breadcrumbs.push({label : 'Vans', url: cdn_url+'van/list'});
            breadcrumbs.push({label : location.van_number, url: null});
        } else {
            breadcrumbs.push({label : 'Warehouses', url: cdn_url+'warehouse/list'});
            breadcrumbs.push({label : location.title, url: null});
        }

        set_breadcrumb(breadcrumbs);

    } else {
        ajs_form_handler.show_errors(result_json);
    }
}
ajs.apply_ind_roles('Stocks');