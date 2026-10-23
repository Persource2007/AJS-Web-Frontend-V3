var master_data_type = 'servicetime';
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
        scrollY: (screen.height - 530)+'px',
        serverSide: true,
        processing: true,
        paging: true,
        responsive: false,
        bDestroy: true,
        pageLength: page_limit,
        search: {
            search: search
        },
        ajax: {
            url: site_url + "servicetime/get_all",
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
                        `<a data-after-load-func="edit_form" data-heading="Edit Service Time - ` + row.title + `" data-form-url="` + cdn_url + `system/service-times/edit/` + row.id + `"  class="popup-form-button" >`+edit_icon()+`</a>`                            
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
                name: "start_time",
                data: "start_time",
                render: function (data) {
                    return ajs.convert_time_utc_to_local(data);
                }
            },
            {
                name: "end_time",
                data: "end_time",
                render: function (data) {
                    return ajs.convert_time_utc_to_local(data);
                }
            },
            {
                name: "client_code",
                data: "client_code"
            },
            {
                name: "comments",
                data: "comments",
            },
            {
                name: "added_by_name",
                data: "added_by_name",
            },            
        ],
        order: [
            ['1', 'desc']
        ],
        drawCallback: function () {
            ajs.apply_ind_roles("Masters");
        }
    });

    $('body').tooltip({
        selector: '[data-bs-toggle="tooltip"]'
    });

    dataTable.buttons().container().appendTo($('#datatable_buttons'));
}


if ($('#ajax-datatables').length)
{
    fetch_default_filter(master_data_type);
     var breadcrumbs = [
		{ label: "System Admin", url: "javascript: void(0);" },
		{ label: "Setup", url: "javascript: void(0);" },
		{ label: "Service Times", url: null },
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
        select2_ajax('#client_id', site_url + 'client/get_all', 'client_code', null, 'offcanvasRight');
    }

    ajs.mask_inputs();

    $("#addForm").validate({
        onkeyup: false,
        rules: {
            title: {
                required: true,
            },
            start_time: {
                required: true,
            },
            end_date: {
                required: true,
            },
        },
        messages: {
            title: "Enter Title",
            start_time: "Enter Start time",
            end_date: "Select Etart time",
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
            $('#start_time').val(ajs.convert_time_local_to_utc($('#start_time').val()));
            $('#end_time').val(ajs.convert_time_local_to_utc($('#end_time').val()));
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
        $('#start_time').val(ajs.convert_time_utc_to_local(edit_data.start_time));
        $('#end_time').val(ajs.convert_time_utc_to_local(edit_data.end_time));

        select2_ajax('#client_id', site_url + 'client/get_all', 'client_code', null, 'offcanvasRight', edit_data.client_id);

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
    ajs.ajax_form(site_url + 'servicetime/get/' + id, null, 'GET', null, '1', '1', load_view_data, load_view_data);
}


$(function () {
    if ($('#is_detail_page').val()) {
        get_details();
    }
});


ajs.apply_ind_roles('Masters');