var master_data_type = 'task-status';
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
        responsive:false,
        bDestroy: true,
        pageLength: page_limit,
//        dom: "<'row'<'col-sm-12'tr>>" +
//         "<'row'<'col-sm-4'l><'col-sm-4'i><'col-sm-4'p>>",
        search: {
            search: search
        },
        ajax: {
            url: site_url + "task-status/get_all",
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
                name: "id",
                data: "id",
                visible: false,
                searchable: false,
                render: function (data, type, row) {
                    return row.id;
                }
            },
            {
                name: "status_code",
                data: "status_code",
            },
            {
                name: "title",
                data: "title"
            },
            {
                name: "status_for",
                data: "status_for",
                render: function (data, type, row) {
                    if (row.status_for == 'M')
                    {
                        return 'Mobile/PDA';
                    } else if (row.status_for == 'W')
                    {
                        return 'Web';
                    }
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
                name: "description",
                data: "description",
                render: function (data, type, row) {
                    return row.description;
                }
            }
        ],
        order: [
            ['0', 'desc']
        ]
    });

    $('body').tooltip({
        selector: '[data-bs-toggle="tooltip"]'
    });
}


if ($('#ajax-datatables').length)
{
    fetch_default_filter(master_data_type);
     var breadcrumbs = [
		{ label: "System Admin", url: "javascript: void(0);" },
		{ label: "Setup", url: "javascript: void(0);" },
		{ label: "Task Status", url: null },
	];
	set_breadcrumb(breadcrumbs);
}


function create_form(type)
{
    if (typeof type !== 'undefined' && type == 'edit')
    {

    } else
    {

       
    }

    ajs.mask_inputs();

    $("#addServiceForm").validate({
        onkeyup: false,
        rules: {
            title: {
                required: true,
            },
            status_code: {
                required: true,
                noSpace: true,
            },
            status_for: {
                required: true,
            },
            position: {
                required: true,
            },
        },
        messages: {
            title: "Enter Title",
            status_code: "Enter Task Code",
            status_for: "Select an Option",
            position: "Enter Position",
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

function load_view_data(result_json)
{
    if (ajs_form_handler.check_result(result_json))
    {
        var edit_data = result_json.message.data;
        $('#title').val(edit_data.title);
        $('#description').val(edit_data.description);
        $('#status_code').val(edit_data.status_code);
        $('#status_for').val(edit_data.status_for);

    } else
    {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}

function edit_form()
{
    create_form('edit');
    var id = $('#edit_id').val();

    ajs.ajax_form(site_url + 'task-status/get/' + id, null, 'GET', null, '1', '1', load_view_data, load_view_data);
}

ajs.apply_ind_roles('Masters');