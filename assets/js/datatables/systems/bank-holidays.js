var master_data_type = 'holiday';
var isInitialized = false;
dataTable = null;
function load_data_table(limit, search_term, filters)
{
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
        scrollY: (screen.height - 530) + 'px',
        serverSide: true,
        processing: true,
        paging: true,
        responsive: false,
        bDestroy: true,
        pageLength: page_limit,
        search: {
            search: search
        },
        // dom: 'Bfrtip',
        buttons: [
            'excel', // Excel export button
            {
                extend: 'colvis',
                text: '<i class="fa fa-cog"></i>', // FontAwesome settings icon
                className: 'custom-colvis-btn', // Custom CSS class
                titleAttr: 'Show/Hide Columns',
                position: 'last'
            }
        ],
        //colReorder: true,
        ajax: {
            url: site_url + "holiday/get_all",
            method: "GET",
            async: false,
            dataSrc: 'message.data',
            "data": function (d) {
                return $.extend({}, d, {
                    data_filters
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
        },
        columns: [
            {
                data: null,
                sortable: false,
                searchable: false,
                render: function (data, type, row) {
                    return (
                            `<a data-after-load-func="edit_form" data-heading="Edit Holiday - ` + row.title + `" data-form-url="` + cdn_url + `system/bank-holidays/edit/` + row.id + `"  class="popup-form-button" >` + edit_icon() + `</a>`

                            );
                }
            },
            {
                name: "id",
                data: "id",
                visible: false,
                searchable: false,
                render: function (data, type, row) {
                    return row.id;
                }
            },
            {
                name: "title",
                data: "title",
                render: function (data, type, row) {
                    var str = '';
                    str += `<div class="d-flex">
                                    <div class="avatar-group">
                                        ` + row.title + `
                                    </div>
                                </div>`;
                    return str;
                }
            },
            {
                name: "holiday_type",
                data: "type_name"
            },
            {
                name: "holiday_date",
                data: "holiday_date",
                render: function (data) {
                    return ajs.format_date(data);
                }
            },
            {
                name: "comments",
                data: "comments",
            },            
        ],
        order: [
            ['1', 'desc']
        ],
        drawCallback: function () {
            ajs.apply_ind_roles("Masters");
        },
    });


    // dataTable.on('column-visibility.dt', function () {
    //     saveColumnVisibilityAndOrder(dataTable);
    // });

    $('body').tooltip({
        selector: '[data-bs-toggle="tooltip"]'
    });
    
}


if ($('#ajax-datatables').length)
{
    select2_ajax('#holiday_type_filter', site_url + 'master-record/get_all', 'master_value', {master_code: "HOLIDAY_TYPES"});
    fetch_default_filter(master_data_type);
    var breadcrumbs = [
        {label: "System Admin", url: "javascript: void(0);"},
        {label: "Setup", url: "javascript: void(0);"},
        {label: "Bank Holidays", url: null},
    ];
    set_breadcrumb(breadcrumbs);
}


function create_form(type)
{
    $("#addForm").closest('.offcanvas').addClass('custom-offcanvas-right2').removeClass('custom-offcanvas-right');

    var filter = {master_code: "SERVICE_TIMES"};
    var filter2 = {master_code: "TARGET_TIMES"};
    if (typeof type !== 'undefined' && type == 'edit')
    {

    } else
    {

        select2_ajax('#holiday_type', site_url + 'master-record/get_all', 'master_value', {master_code: "HOLIDAY_TYPES"}, 'offcanvasRight');
    }

    ajs.mask_inputs();

    $("#addForm").validate({
        onkeyup: false,
        rules: {
            title: {
                required: true,
            },
            holiday_type: {
                required: true,
            },
            holiday_date: {
                required: true,
            },
        },
        messages: {
            title: "Enter Title",
            holiday_date: "Enter Holiday Date",
            holiday_type: "Select Type",
        },
        errorPlacement: function (error, element) {
            if (element.hasClass("select2") && element.next(".select2-container").length)
            {
                error.insertAfter(element.next(".select2-container"));
            } else if (element.parent(".input-group").length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form)
        {
            var sub_button = $(form).find(':submit');
            ajs.submit_button_element = sub_button;
            var action = $(form).attr('action');
            var method = $(form).attr('method');
            var post_data = $(form).serialize();
            ajs.ajax_form(action, post_data, method, null, '1', '1', ajs_form_handler.offcanvas_form, ajs_form_handler.offcanvas_form);
            return false;
        }
    });

}

function load_view_data(result_json)
{
    if (ajs_form_handler.check_result(result_json))
    {
        var edit_data = result_json.message.data;
        $('#title').val(edit_data.title);
        $('#comments').val(edit_data.comments);
        $('#holiday_date').val(edit_data.holiday_date);
        $('#half_day').val(edit_data.half_day);

        var filter = {master_code: "HOLIDAY_TYPES"};
        select2_ajax('#holiday_type', site_url + 'master-record/get_all', 'master_value', filter, 'offcanvasRight', edit_data.holiday_type);

    } else
    {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}

function edit_form()
{
    create_form('edit');
    var id = $('#edit_id').val();
    ajs.apply_ind_roles("Masters");
    ajs.ajax_form(site_url + 'holiday/get/' + id, null, 'GET', null, '1', '1', load_view_data, load_view_data);
}

// for set data on client detail page
function set_view_data(result_json)
{
    if (ajs_form_handler.check_result(result_json))
    {
        var client = result_json.message.data;
        $('#detail_registration_no').text(client.registration_no);
        $('#detail_company_name').html(client.company_name);
        $('#company_name_header').html(client.company_name);
        $('#detail_vat_no').html(client.vat_no);
        $('#detail_client_code').html(client.client_code);
        $('#detail_client_type').html(client.client_type_name);
        $('#detail_client_role').html(client.client_role);
        $('#detail_address1').html(client.address1);
        $('#detail_address2').html(client.address2);
        $('#detail_area').html(client.area);
        $('#detail_city').html(client.city);
        $('#detail_postalcode').html(client.postalcode);
        $('#detail_email').html(client.email);
        $('#detail_email').attr('href', 'mailto:' + client.email);
        $('#detail_mobile_number').html(client.phone_number);
        $('#detail_mobile_number').attr('href', 'tel:' + client.phone_number);
        $('#detail_telephone_number').html(client.telephone_number);
        $('#detail_telephone_number').attr('href', 'tel:' + client.telephone_number);

        if (typeof client.client_contacts !== 'undefined') {
            var contactHtml = format_contacts(client.client_contacts);
            $("#contacts").html(contactHtml);
        }

        if (client.client_ajs_contacts) {
            var contactHtml = format_contacts(client.client_ajs_contacts);
            $("#ajs_contacts").html(contactHtml);
        }
    } else
    {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}


function get_details()
{
    ajs.ajax_form(site_url + 'holiday/get/' + id, null, 'GET', null, '1', '1', set_view_data, set_view_data);

}

$(function () {
    if ($('#is_detail_page').val()) {
        get_details();
    }
});


ajs.apply_ind_roles('Masters');