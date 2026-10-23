
var deleted_workflow_templates = [];
var master_data_type = "workdlow-schedule";
dataTable = null;
var keys = ["title"];

function load_data_table(limit, search_term, filters) {
	data_filters = {};
	page_limit = ajs.datatable_limit;
	search = "";
	if (
		typeof filters != "undefined" &&
		(typeof filters["filters"] !== "undefined" || filters["filters"] != null)
	) {
		data_filters = filters["filters"];
	}
	if (typeof limit !== "undefined" || limit != null) {
		page_limit = limit;
	}
	if (typeof search_term !== "undefined" || search_term != null) {
		search = search_term;
	}

    var client_id = $("#client_id_hidden").val();

	dataTable = new DataTable("#schedule-datatables", {
            scrollY: (screen.height - 530) + 'px',
		searching: false,
		serverSide: true,
		processing: true,
		paging: true,
		bDestroy: true,
		pageLength: page_limit,
		search: {
			search: search,
		},
		//dom: "Bfrtip",
		// buttons: ["excel"],
		ajax: {
			url: site_url+'client/'+client_id+ "/schedule/get_all",
			method: "GET",
			async: false,
			dataSrc: "data",
			data: function (d) {
				return $.extend({}, d, {
					data_filters,
				});
			},
			beforeSend: function (xhr, settings) {
				ajs.set_auth_header(xhr, settings);
			},
            error: function (xhr) {
                ajs.datatable_error(xhr, "schedule-datatables");
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
                        `<a data-after-load-func="edit_form" data-heading="Edit schedule - ` +
                            row.id +
                            `" data-form-url="` +
                            cdn_url +
                            `clients/${row.client_id}/schedule-edit/` +
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
				data: "title",
			},
			{
				name: "templates",
				data: "templates",
			},			
		],
		order: [["1", "desc"]],
        drawCallback: function () {
            //ajs.apply_ind_roles("schedules");
        }
	});
}

if ($("#schedule-datatables").length) {
    fetch_default_filter(master_data_type);
}
function create_form(type = 'create') {

    var client_id = $("#client_id_hidden").val();
    ajs.ajax_form(site_url + "client/" + client_id + "/appointment", null, "GET", null, "1", "1", load_templates, load_templates);
    if(type == 'create') {
    }
    ajs.apply_ind_roles('Clients');
    
    $("#scheduleForm").validate({
        onkeyup: false,
        rules: {
            'title': {
                required: true,
            },
            'templates[]': {
                required: true,
            }
        },
        errorPlacement: function (error, element) {
            if (
                    element.hasClass("select2") &&
                    element.next(".select2-container").length
                    ) {
                error.insertAfter(element.next(".select2-container"));
            } else if (element.parent(".error-div").length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form) {

            var sub_button = $(form).find(":submit");
            ajs.submit_button_element = sub_button;
            var action = $(form).attr("action");
            var method = $(form).attr("method");

            var formData = $(form).serializeArray();
            formData.push({name: 'deleted_workflow_templates', value: deleted_workflow_templates});
            
            ajs.ajax_form(action, formData, method, null, "1", "1", ajs_form_handler.offcanvas_form, ajs_form_handler.offcanvas_form);

            return false;
        },
    });

    $(".template-list").each(function () {
        new Sortable(this, {
            group: {
                name: 'shared',
                pull: 'clone',
                put: false // Do not allow items to be put into this list
            },
            sort: false,
            fallbackOnBody: true,
            swapThreshold: 0.65,
            onEnd: function () {
                // Update the index in the name attributes
                $(".template-list-handle .list-group-item").each(function (index) {
                    console.log(index);
                    // Update the index in all input elements inside the current item
                    $(this).find('input').each(function () {
                        // Update the name attribute with the new index
                        let name = $(this).data('name');
                        let updatedName = name.replace(/templates\[\d+\]/, `templates[${index}]`);
                        $(this).attr('name', updatedName);
                    });
                    $(this).find('.lead-time,.delete-template').show();
                });
            }
        });
    });
    
    
    $(".template-list-handle").each(function () {
        new Sortable(this, {
            //handle: ".handle",
            group: "shared",
            animation: 150,
            fallbackOnBody: true,
            swapThreshold: 0.65,
            onEnd: function () {
                // Update the index in the name attributes
                $(".template-list-handle .list-group-item").each(function (index) {
                    console.log(index);
                    // Update the index in all input elements inside the current item
                    $(this).find('input').each(function () {
                        // Update the name attribute with the new index
                        let name = $(this).attr('name');
                        let updatedName = name.replace(/templates\[\d+\]/, `templates[${index}]`);
                        $(this).attr('name', updatedName);
                    });
                });
            }
        });
    });

}

// load comm. templates on add/edit page
function load_templates(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var templates = result_json.data;

        $(".template-list").html("");

        $.each(templates, function (index, template) {
            $(".template-list").append(`<div class="list-group-item" >
                <div class="row align-items-center">
                    <div class="col-lg-8 col-md-8 col-12" style="cursor: move;">
                        <i class="ri-drag-move-fill align-bottom handle"></i> ${template.title} (${template.type})
                    </div>
                    <div class="col-lg-4 col-md-4 col-12  justify-content-end">
                        <input type="hidden" data-name="templates[0][template_id]"  value="${template.id}">
                        <input type="hidden" data-name="templates[0][id]"  value="0" class="row-id">
                        <div class="d-flex align-items-center error-div">
                            <input type="text" data-name="templates[0][lead_time]" value="" class="form-control w-75 number-only lead-time hide" placeholder="Lead time" required>
                            <i style="font-size: 24px;cursor: pointer; color: red;" class="las la-trash-alt delete-template ms-2 hide"></i>
                        </div>
                    </div>
                </div>
            </div>`);
        });

    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

// set  data in edit page
function set_data(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var schedule = result_json.data;
        $('#title').val(schedule.title);     

        $(".template-list-handle").html("");

        $.each(schedule.templates, function (index, template) {
            const lead_time = (template.lead_time != null) ? template.lead_time : '';
            $(".template-list-handle").append(`<div class="list-group-item" >
                <div class="row align-items-center">
                    <div class="col-lg-8 col-md-8 col-12" style="cursor: move;">
                        <i class="ri-drag-move-fill align-bottom handle"></i> ${template.title}
                    </div>
                    <div class="col-lg-4 col-md-4 col-12 justify-content-end">
                        <input type="hidden" data-name="templates[0][template_id]" name="templates[${index}][template_id]" value="${template.template_id}">
                        <input type="hidden" data-name="templates[0][id]" name="templates[${index}][id]" value="${template.id}" class="row-id">
                        <div class="d-flex align-items-center error-div">
                        <input type="text" data-name="templates[0][lead_time]" name="templates[${index}][lead_time]" value="${lead_time}" class="form-control w-75 number-only lead-time " placeholder="Lead time" required>
                        <i style="font-size: 24px;cursor: pointer; color: red;" class="las la-trash-alt delete-template ms-2"></i>
                        </div>
                    </div>
                </div>
            </div>`);
        });

    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

function edit_form() {
    create_form('edit');
    var id = $("#edit_id").val();
    var client_id = $("#client_id_hidden").val();
    ajs.ajax_form(site_url + "client/" + client_id + "/schedule/get/"+id, null, "GET", null, "1", "1", set_data, set_data);
}

function create_breadcrumb(result_json)
{
    if (ajs_form_handler.check_result(result_json)) {
        var client = result_json.message.data;

        var detail_url = 'clients/details/' + ajs.hash_encode(client.id);
        var breadcrumbs = [
            {label : 'Clients', url: cdn_url + 'clients/list'},
            {label : client.client_code, url: cdn_url + detail_url},
            {label : 'Comm. Templates', url: null}
        ];

        set_breadcrumb(breadcrumbs);
        
    } else {
        ajs_form_handler.show_errors(result_json);
    }
}


$(function () {

    $(document).on("click", ".delete-template", function () {
        var parent = $(this).closest('.list-group-item');
        var id = parent.find('.row-id').val();
        if (id) {
            deleted_workflow_templates.push(id);
        }
        parent.remove();
    });    

    
    ajs.apply_ind_roles('Clients');
});
