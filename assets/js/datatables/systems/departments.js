var master_data_type = 'department';
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
            url: site_url + "department/get_all",
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
                    return (`<a data-after-load-func="edit_form" data-heading="Edit Department - ` + row.title + `" data-form-url="` + cdn_url + `system/` + master_data_type + `/edit/` + row.id + `"  class="popup-form-button" >`+edit_icon()+`</a>`);
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
                name: "description",
                data: "description",
                render: function (data, type, row) {
                    if (row.description !== null)
                    {
                         return '<span style="white-space:nowrap">' + row.description + "</span>";
                    }
                    else
                    {
                        return '';
                    }
                }
            },
            {
                name: "manager_name",
                data: "manager_name",
                render: function (data, type, row) {
                    return row.manager_name || '-';
                }
            },
            {
                name: "analysis_code",
                data: "analysis_code",
                render: function (data, type, row) {
                    return row.analysis_code;
                }
            },
            
        ],
        order: [
            ['1', 'desc']
        ]
    });
}


if ($('#ajax-datatables').length)
{
    fetch_default_filter(master_data_type);
     var breadcrumbs = [
		{ label: "System Admin", url: "javascript: void(0);" },
		{ label: "Setup", url: "javascript: void(0);" },
		{ label: "Departments", url: null },
	];
	set_breadcrumb(breadcrumbs);
}


function create_form(type)
{
    $("#addForm").closest('.offcanvas').addClass('custom-offcanvas-right2').removeClass('custom-offcanvas-right');
    if (typeof type !== 'undefined' && type == 'edit')
    {

    } else
    {
        add_autocomplete_sel('#manager_id', 'users', ['first_name', 'last_name'], null, null, 'offcanvasRight');
    }

    ajs.mask_inputs();

    $("#addForm").validate({
        onkeyup: false,
        rules: {
            title: {
                required: true,
            },
            // manager_id: {
            //     required: true,
            // },

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
            var post_data = $(form).serialize();
            ajs.ajax_form(action, post_data, method, null, '1', '1', ajs_form_handler.offcanvas_form, ajs_form_handler.offcanvas_form);
            return false;
        }
    });

}

function load_edit_data(result_json)
{
    if (ajs_form_handler.check_result(result_json))
    {
        var edit_data = result_json.message.data;
        $('#title').val(edit_data.title);
        $('#description').val(edit_data.description);
        $('#department_code').val(edit_data.workstream_code);
        $('#analysis_code').val(edit_data.analysis_code);

        add_autocomplete_sel('#manager_id', 'users', ['first_name', 'last_name'], null, null, 'offcanvasRight', edit_data.manager_id);

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
    ajs.ajax_form(site_url + 'department/get/' + id, null, 'GET', null, '1', '1', load_edit_data, load_edit_data);
}

ajs.apply_ind_roles('Masters');
