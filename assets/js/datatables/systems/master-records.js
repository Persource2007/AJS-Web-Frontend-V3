var master_data_type = 'master-record';
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

    if (typeof master_id !== 'undefined' && master_id > 0)
    {
        if (typeof data_filters == 'string')
        {
            data_filters = {};
        }
        data_filters['master_values.master_id'] = master_id;
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
        buttons: [
            'excel'
        ],
        ajax: {
            url: site_url + master_data_type + "/get_all",
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
                orderable:false,
                render: function (data, type, row) {
                    return (
                        `<a data-after-load-func="edit_form" data-heading="Edit Master - ` + row.master_value + `" data-form-url="` + cdn_url + `system/` + master_data_type + `/edit/` + row.id + `"  class="popup-form-button" >`+edit_icon()+`</a>`                            
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
                name: "parent_id",
                data: "parent_id",
                render: function (data, type, row) {
                    return row.parent_title;
                }
            },
            {
                name: "master_value_code",
                data: "master_value_code",
                render: function (data, type, row) {
                    return row.master_value_code;
                }
            },
            {
                name: "master_value",
                data: "master_value",
                render: function (data, type, row) {
                    var str = '';
                    str += `<div class="d-flex">
                                    <div class="avatar-group">
                                        ` + row.master_value + `
                                    </div>
                                </div>`;
                    return str;
                }
            },
            {
                name: "description",
                data: "description",
                render: function (data, type, row) {
                    return row.description;
                }
            },
            {
                name: "position",
                data: "position",
                render: function (data, type, row) {
                    return row.position;
                }
            },
            {
                name: "custom_attr1",
                data: "custom_attr1",
                render: function (data, type, row) {
                    return row.custom_attr1;
                }
            },
            {
                name: "custom_attr2",
                data: "custom_attr2",
                render: function (data, type, row) {
                    return row.custom_attr2;
                }
            },            
        ],
        order: [
            ['1', 'desc']
        ]
    });

    var parent_val = $('#has_parent').val();
    if (parent_val == 0)
    {
        dataTable.columns([2]).visible(false);
    }
}


if ($('#ajax-datatables').length)
{
    if (typeof master_id !== 'undefined' && master_id > 0)
    {
        ajs.ajax_form(site_url + 'master/get/' + master_id, null, 'GET', null, '1', '1', set_master_data, set_master_data);
    }
    fetch_default_filter(master_data_type);
}

function set_master_data(data)
{
    if (ajs_form_handler.check_result(data))
    {
        $('.popup-form-button').attr('data-heading', 'Add New - ' + data.message.data.title);
        $('#has_parent').val(data.message.data.parent_id);
        $('.master-title').html('Masters - ' + data.message.data.title);

        var breadcrumbs = [
            {label : 'System Admin', url: 'javascript: void(0);'},
            {label : 'Setup', url: 'javascript: void(0);'},
            {label : 'Masters', url: cdn_url +'system/master/list'},
            {label : data.message.data.title, url: null}
        ];
        set_breadcrumb(breadcrumbs);
    }
}


function create_form(type)
{
    if (typeof type !== 'undefined' && type == 'edit')
    {

    } else
    {
        
    }

    var has_parent = $('#has_parent').val();

    if (typeof master_id !== 'undefined' && master_id > 0)
    {
        $('#addForm').find('input#master_id').val(master_id);
    }
    if (typeof has_parent !== 'undefined' && has_parent > 0)
    {
        $('.parent-val').css('display', '');
        select2_ajax('#parent_id', site_url + 'master-record/get_all', 'master_value', {"master_values.master_id": has_parent}, 'offcanvasRight');
    }

    ajs.mask_inputs();

    $("#addForm").validate({
        onkeyup: false,
        rules: {
            title: {
                required: true,
            },
            master_value_code: {
                required: true,
                noSpace: true,
            },
        },
        messages: {
            title: "Enter Title",
            master_value_code: "Enter Code",
        },
        errorPlacement: function (error, element) {
            if (
                    element.hasClass("select2") &&
                    element.next(".select2-container").length
                    ) {
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
            var post_data = $(form).serializeArray();
            $("#addForm input:checkbox:not(.all-module)").each(function () {
                var checkbox_value = $(this).is(':checked') ? 1 : 0;
                post_data.push({name: $(this).data('name'), value: checkbox_value});
            });
            ajs.ajax_form(action, post_data, method, null, '1', '1', ajs_form_handler.offcanvas_form, ajs_form_handler.offcanvas_form);
            return false;
        }
    });

}

function load_view_data(result_json)
{
    if (ajs_form_handler.check_result(result_json))
    {
        var has_parent = $('#has_parent').val();
        var edit_data = result_json.message.data;
        $('#title').val(edit_data.master_value);
        $('#master_value_code').val(edit_data.master_value_code);
        $('#description').val(edit_data.description);
        $('#master_id').val(edit_data.master_id);
        $('#master_value_position').val(edit_data.position);
        $('#custom_attr1').val(edit_data.custom_attr1);
        $('#custom_attr2').val(edit_data.custom_attr2);
        select2_ajax('#parent_id', site_url + 'master-record/get_all', 'master_value', {"master_values.master_id": has_parent}, 'offcanvasRight',edit_data.parent_id);
        if (edit_data.status == 1) {
            $("#user-status").prop("checked", true);
        } else {
            $("#user-status").prop("checked", false);
        }


    } else
    {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}

function edit_form()
{
    create_form('edit');
    var id = $('#edit_id').val();

    ajs.ajax_form(site_url + master_data_type + '/get/' + id, null, 'GET', null, '1', '1', load_view_data, load_view_data);
}


function get_details()
{
    ajs.ajax_form(site_url + master_data_type + '/get/' + id, null, 'GET', null, '1', '1', set_view_data, set_view_data);

}

$(function () {
    if ($('#is_detail_page').val()) {
        get_details();
    }
    ajs.apply_ind_roles('Masters');
});
