var master_data_type = 'queue';
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
//        dom: "<'row'<'col-sm-12'tr>>" +
//         "<'row'<'col-sm-4'l><'col-sm-4'i><'col-sm-4'p>>",
        search: {
            search: search
        },
        // dom: 'Bfrtip',
        
        ajax: {
            url: site_url + "queue/get_all",
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
                        `<a data-after-load-func="edit_form" data-heading="Edit Task - ` + row.title + `" data-form-url="` + cdn_url + `system/job-queue/edit/` + row.id + `"  class="popup-form-button" >`+edit_icon()+`</a>`
                            
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
                name: "contract_id",
                data: "contract_number",
            },
            {
                name: "workstream_id",
                data: "workstream_name",
            },
            {
                name: "service_id",
                data: "service_name",
            },
            {
                name: "engineer_id",
                data: "engineer_name",
            },
            {
                name: "description",
                data: "description",
                render: function (data, type, row) {
                    return row.description;
                }
            },
            
        ],
        order: [
            ['1', 'desc']
        ]
    });

    $('body').tooltip({
        selector: '[data-bs-toggle="tooltip"]'
    });
}


if ($('#ajax-datatables').length)
{
    //select2_ajax('#service_id_filter', site_url + 'service/get_all', 'title', null);
    fetch_default_filter(master_data_type);
     var breadcrumbs = [
		{ label: "System Admin", url: "javascript: void(0);" },
		{ label: "Setup", url: "javascript: void(0);" },
		{ label: "Job Queues", url: null },
	];
	set_breadcrumb(breadcrumbs);
}


function create_form(type)
{

    if (typeof type !== 'undefined' && type == 'edit')
    {

    } else
    {

        select2_ajax('#contract_id', site_url + 'contract/get_all', 'contract_number', null, 'offcanvasRight');
        select2_ajax_users('#engineer_id', {user_type: 16}, 'offcanvasRight');
        select2_ajax('#workstream_id', site_url + 'workstream/get_all', 'title', null, 'offcanvasRight');
        select2_ajax('#service_id', site_url + 'service/get_all', 'title', null, 'offcanvasRight');
    }

    ajs.mask_inputs();

    $("#addForm").validate({
        onkeyup: false,
        ignore: [],
        rules: {
            title: {
                required: true,
            },
            contract_id: {
                number: true,
            },
            service_id: {
                number: true,
            },
            engineer_id: {
                number: true,
            },
            workstream_id: {
                number: true,
            }
        },
        messages: {
            title: "Enter Title",
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

        select2_ajax('#contract_id', site_url + 'contract/get_all', 'contract_number', null, 'offcanvasRight',edit_data.contract_id);
        select2_ajax_users('#engineer_id', {user_type: 16}, 'offcanvasRight', edit_data.engineer_id);
        select2_ajax('#workstream_id', site_url + 'workstream/get_all', 'title', null, 'offcanvasRight',edit_data.workstream_id);
        select2_ajax('#service_id', site_url + 'service/get_all', 'title', null, 'offcanvasRight',edit_data.service_id);
        
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
    ajs.ajax_form(site_url + 'queue/get/' + id, null, 'GET', null, '1', '1', load_view_data, load_view_data);
}


$(document).on("change", "#task_type", function () {
    var val = $(this).val();
    setSelectedByText('#skill_id', '');
    $('.skill-div').css('display', '');
    if ($('#allowed_statuses').hasClass('select2-hidden-accessible'))
    {
        $("#allowed_statuses").select2("destroy");
        $('#allowed_statuses').find('option:not(:first)').remove();
    }
    if (val == 'I')
    {
        select2_ajax('#allowed_statuses', site_url + 'task-status/get_all', 'title', {status_for: "W"}, 'offcanvasRight');
        setSelectedByText('#skill_id', 'Admin');
    }
    if (val == 'E')
    {
        $('.skill-div').css('display', 'none');
        select2_ajax('#allowed_statuses', site_url + 'task-status/get_all', 'title', {status_for: "M"}, 'offcanvasRight');

    }

    selectAllOptions('#allowed_statuses');
});

ajs.apply_ind_roles('Masters');