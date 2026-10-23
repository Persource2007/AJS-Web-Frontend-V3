var master_data_type = "warehouse";
dataTable = null;


function load_data_table(limit, search_term, filters) {
    data_filters = '';
    page_limit = ajs.datatable_limit;
    search = '';
    if (typeof filters != 'undefined' && (typeof filters['filters'] !== 'undefined' || filters['filters'] != null))
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
        scrollY: (screen.height - 450) + 'px',
        searching: false,
        serverSide: true,
        processing: true,
        paging: true,
        responsive:false,
        bDestroy: true,
        autoWidth: false,
        pageLength: page_limit,
        search: {
            search: search,
        },
        //dom: "Bfrtip",
        // buttons: ["excel"],
        ajax: {
            url: site_url + "warehouse/get_all",
            method: "GET",
            async: false,
            dataSrc: "message.data",
            data: function (d) {
                return $.extend({}, d, {
                    data_filters,
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
                data: null,
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                    return (
                        `<a data-after-load-func="edit_form" data-heading="Edit Warehouse - ` +
                            row.warehouse_code +
                            `" data-form-url="` +
                            cdn_url +
                            `warehouse/edit/` +
                            row.id +
                            `" class="popup-form-button" >`+edit_icon()+`</a>`
                            
                    );
                },
            },
            {
                name: "id",
                data: "id",
                visible: false,
                searchable: false,
            },
            {
                name: "title",
                data: "title"
            },
            {
                name: "warehouse_code",
                data: "warehouse_code",
                // render: function (data, type, row) {
                //     var str = "";
                //     str +=
                //             `<div class="d-flex">
                //                 <div class="avatar-group">
                //                     <a href="javascript: void(0);" class="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover"   data-bs-placement="top" title="#` +
                //             data +
                //             `">` +
                //             data +
                //             `</a>
                //                 </div>
                //                 </div>`;

                //     return str;
                // },
            },
            {
                name: "address1",
                data: "address1",
                render: function (data, type, row)
                {
                    return row.address1;
                }
            },
            {
                name: "postalcode",
                data: "postalcode"
            },
            {
                name: "city",
                data: "city_name"
            },
            {
                name: "mobile",
                data: "mobile"
            },
            {
                name: "stock_view",
                orderable: false,
                render: function (data, type, row)
                {
                    return `<a style="cursor:pointer" href="` + cdn_url + `warehouse/view-stock/` + ajs.hash_encode(row.id) + `" >View</a>`;
                }
            },            
        ],
        order: [["1", "desc"]],
        drawCallback: function () {
            ajs.apply_ind_roles("Warehouses");
        }
    });

    dataTable.buttons().container().appendTo($("#datatable_buttons"));
}

if ($("#ajax-datatables").length)
{
    select2_ajax('#city_filter', site_url + 'cities/get_all', 'title', null);
    fetch_default_filter(master_data_type);

    var breadcrumbs = [
        {label : 'System Admin', url: 'javascript: void(0);'},
        {label : 'Locations', url: null},
        {label : 'Warehouses', url:null}
    ];
    set_breadcrumb(breadcrumbs);
}

function load_stock()
{
    initialize_stock_table();
}


function create_form(type = "create") {

    ajs.mask_inputs();

    if (type == "create") {
        select2_ajax('#city', site_url + 'cities/get_all', 'title', null, 'offcanvasRight');
    }

    $("#createForm").validate({
        onkeyup: false,
        rules: {
            title: {
                required: true,
            },
            warehouse_code: {
                required: true,
            },
            address1: {
                required: true,
            },
            city: {
                required: true,
            },
            postalcode: {
                required: true,
            },
        },
        messages: {
            title: "Enter Title",
            warehouse_code: "Enter van code",
            address1: "Enter Address1",
            city: "Select City",
            postalcode: "Enter Postal Code"
        },
        errorPlacement: function (error, element) {
            if (element.hasClass("select2") && element.next(".select2-container").length)
            {
                error.insertAfter(element.next(".select2-container"));
            } else if (element.parent(".input-group").length)
            {
                error.insertAfter(element.parent());
            } else
            {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form) {
            var sub_button = $(form).find(":submit");
            ajs.submit_button_element = sub_button;
            var action = $(form).attr("action");
            var method = $(form).attr("method");

            var formData = $(form).serializeArray();
            // Modify checkbox value if checked

            ajs.ajax_form(action, formData, method, null, "1", "1", ajs_form_handler.offcanvas_form, ajs_form_handler.offcanvas_form);

            return false;
        },
    });
}

// set  data in edit page
function load_data(result_json) {
    if (ajs_form_handler.check_result(result_json))
    {
        var warehouse = result_json.message.data;

        $('#title').val(warehouse.title);
        $('#warehouse_code').val(warehouse.warehouse_code);
        $('#address1').val(warehouse.address1);
        $('#address2').val(warehouse.address2);
        $('#postalcode').val(warehouse.postalcode);
        $('#latitude').val(warehouse.latitude);
        $('#longitude').val(warehouse.longitude);
        $('#mobile').val(warehouse.mobile);

        select2_ajax('#city', site_url + 'cities/get_all', 'title', null, 'offcanvasRight', warehouse.city);
    } else {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}

function edit_form() {
    create_form("edit");
    var id = $("#edit_id").val();
    ajs.apply_ind_roles("Warehouses");
    ajs.ajax_form(site_url + "warehouse/get/" + id + "?edit=true", null, "GET", null, "0", "0", load_data, load_data);
}

$(function () {

    ajs.apply_ind_roles('Warehouses');
});
