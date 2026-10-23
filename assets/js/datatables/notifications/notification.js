var notification_user_ids = [];
var master_data_type = "notification";
dataTable = null;
const keys = ["add_date", "added_by", "id", "status", "send_push_notification"];

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

	dataTable = new DataTable("#notification-datatables", {
		scrollY: screen.height - 475 + "px",
		searching: false,
		serverSide: true,
		processing: true,
		paging: true,
		bDestroy: true,
		responsive: false,
		pageLength: page_limit,
		search: {
			search: search,
		},
		//dom: "Bfrtip",
		// buttons: ["excel"],
		ajax: {
			url: site_url + "notification/get_all",
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
                ajs.datatable_error(xhr, "notification-datatables");
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
                    var action = '';
                    if(row.delivery_status == 'draft') {
                        action += `<a data-after-load-func="edit_form" data-heading="Edit Notification - ` +  row.id + `" data-form-url="` + cdn_url + `notification/edit/` + ajs.hash_encode(row.id) +  `" class="popup-form-button" >`+edit_icon()+`</a>`;
                    }                    

                    return action;
				},
			},
			{
				name: "id",
				data: "id",
				visible: false,
				searchable: false,
			},
			{
				name: "group",
				data: "group",
			},
			{
				name: "title",
				data: "title",
			},
			{
				name: "message",
				data: "message",
				render: function (data) {
					return truncate_string(data, 40);
				},
			},
			{
				data: "delivery_status",
				name: "delivery_status",
				class: "text-capitalize",
			},
			
		],
		order: [["1", "desc"]],
		drawCallback: function () {
			ajs.apply_ind_roles("Notifications");
		},
	});

	dataTable.buttons().container().appendTo($("#datatable_buttons"));
}

if ($("#notification-datatables").length) {
	select2_ajax(
		"#group_id_filter",
		site_url + "master-record/get_all",
		"master_value",
		{ master_code: "USER_TYPES" }
	);
	fetch_default_filter(master_data_type);
	var breadcrumbs = [{ label: "Notifications", url: null }];
	set_breadcrumb(breadcrumbs);
}

function create_form(type = "create") {
	if (type == "create") {
		select2_ajax(
			"#group_id",
			site_url + "master-record/get_all",
			"master_value",
			{ master_code: "USER_TYPES" },
			"offcanvasRight"
		);
        add_autocomplete_sel(
            "#user_id",
            "users",
            ["first_name", "last_name"],
            null,
            null,
            "offcanvasRight"
        );
	}

	$("#notificationForm").validate({
		onkeyup: false,
		rules: {
			title: {
				required: true,
			},
			message: {
				required: true,
			},
			group_id: {
				required: true,
			},
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
		submitHandler: function (form) {
			var sub_button = $(form).find(":submit");
			ajs.submit_button_element = sub_button;
			var action = $(form).attr("action");
			var method = $(form).attr("method");

			var formData = $(form).serializeArray();
			// Modify checkbox value if checked

            $("#notificationForm input:checkbox:not(.all-module)").each(function () {
                var checkbox_value = $(this).is(':checked') ? 1 : 0;
                formData.push({name: $(this).data('name'), value: checkbox_value});
            });

			ajs.ajax_form(
				action,
				formData,
				method,
				null,
				"1",
				"1",
				ajs_form_handler.offcanvas_form,
				ajs_form_handler.offcanvas_form
			);

			return false;
		},
	});

	$("#scheduled_time").datetimepicker({format: 'd-m-Y H:i', step: 15});
}

function send_notification() {
    create_form("edit");
    let group_id = $('#user_type').val();
    
	select2_ajax(
        "#group_id",
        site_url + "master-record/get_all",
        "master_value",
        { master_code: "USER_TYPES" },
        "offcanvasRight",
        group_id
    );
}

// set  data in edit page
function load_data(result_json) {
	if (ajs_form_handler.check_result(result_json)) {
		var notification = result_json.data;

		for (const [key, value] of Object.entries(notification)) {
			if (!keys.includes(key)) {
				$("#" + key).val(value);
			}
		}

        if (notification.send_push_notification == 1) {
            $("#send_push_notification").prop('checked', true);
        } else {
            $("#send_push_notification").prop('checked', false);
        }
        if (notification.delivery_status == 'draft') {
            $("#send_now").prop('checked', false).trigger('change');
        }

        notification_user_ids = pluck(notification.users, 'user_id');

		select2_ajax(
			"#group_id",
			site_url + "master-record/get_all",
			"master_value",
			{ master_code: "USER_TYPES" },
			"offcanvasRight",
			notification.group_id
		);
	} else {
		ajs_form_handler.show_errors_offcanvas(result_json);
	}
}

function edit_form() {
	create_form("edit");
	var id = $("#edit_id").val();
	ajs.apply_ind_roles("Notifications");
	ajs.ajax_form(
		site_url + "notification/get/" + id + "?edit=true",
		null,
		"GET",
		null,
		"0",
		"0",
		load_data,
		load_data
	);
}

// for set data on detail page
function set_details(result_json) {
	if (ajs_form_handler.check_result(result_json)) {
		var notification = result_json.data;

		var breadcrumbs = [
			{ label: "notifications", url: cdn_url + "notification/list" },
			{ label: notification.title, url: null },
		];
		set_breadcrumb(breadcrumbs);

		for (const [key, value] of Object.entries(notification)) {
			if (!keys.includes(key)) {
				$("#detail_" + key).html(value);
			}
		}
	} else {
		ajs_form_handler.show_errors(result_json);
	}
}

function get_details() {
	var id = $("#notification_id").val();
    if(id > 0) {
        ajs.ajax_form(
            site_url + "notification/get/" + id,
            null,
            "GET",
            null,
            "1",
            "1",
            set_details,
            set_details
        );
    }
}

$(function () {
	if ($("#is_detail_page").val()) {
		get_details();
	}

	$(document).on("change", "#group_id", function () {
		var group_id = $(this).val();
		if (group_id > 0) {
			if ($("#user_id").hasClass("select2-hidden-accessible")) {
				$("#user_id").select2("destroy");
				$("#user_id").find("option:not(:first)").remove();
			}

			add_autocomplete_sel(
				"#user_id",
				"users",
				["first_name", "last_name"],
				null,
				{ user_type: group_id },
				"offcanvasRight",
                notification_user_ids
			);
            notification_user_ids = [];
		}
	});

    $(document).on("change", "#send_now", function () {
		if ($(this).is(':checked')) {
            $("#scheduled_time").val('');
			$("#scheduled_time").parent().parent().hide();
			$("#save-btn").hide();
			$("#send-now-btn").show();
		} else {
            $("#scheduled_time").parent().parent().show();
			$("#send-now-btn").hide();
			$("#save-btn").show();
        }
	});

	ajs.apply_ind_roles('Notifications');
});
