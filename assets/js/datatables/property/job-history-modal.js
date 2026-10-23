var job_datatable = null;
var job_status = "completed";
function load_job_history_table() {
	let data_filters = {};
	job_datatable = new DataTable("#job-history-datatables", {
		responsive: false,
		searching: false,
		serverSide: true,
		processing: true,
		paging: true,
		bDestroy: true,
		pageLength: ajs.datatable_modal_limit,
		// search: {
		//     search: $('#history_search_term').val(),
		// },
		// dom: "Bfrtip",
		buttons: ["excel"],
		ajax: {
			url: site_url + "job/get_all",
			method: "GET",
			async: false,
			dataSrc: "data",
			data: function (d) {
				d.search = {
					value: $("#history_search_term").val(),
				};
				data_filters["property_id"] = $("#property_id").val();
				data_filters["mv.master_value"] = job_status;

				return $.extend({}, d, {
					data_filters,
				});
			},
			beforeSend: function (xhr, settings) {
				ajs.set_auth_header(xhr, settings);
			},
            error: function (xhr) {
                ajs.datatable_error(xhr, "job-history-datatables");
            },
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
				name: "code",
				data: "code",
				render: function (data, type, row) {
					var is_emergency =
						row.emergency_job == 1
							? '<i class="mdi mdi-circle fs-11 align-middle me-1 emergency-task-icon blink-" ></i>'
							: "";
					var str = "";
					str +=
						`<div class="d-flex">
                                <div class="avatar-group align-items-center">
                                  <a  href="` +
						cdn_url +
						"job/details/" +
						ajs.hash_encode(row.id) +
						`" class="avatar-group-item pe-1" data-bs-toggle="tooltip" data-bs-trigger="hover"   data-bs-placement="top" title="` +
						data +
						`">` +
						data +
						`</a> ${is_emergency} </div> </div>`;

					return str;
				},
			},
			{
				name: "client_work_order",
				data: "client_work_order",
				defaultContent: "-",
			},
			{
				name: "service_type",
				data: "service_type",
				class: "text-capitalize",
				defaultContent: "-",
				render: function (data) {
					if (data == "P") {
						return "PPM";
					} else {
						return "Reactive";
					}
				},
			},
			{
				name: "service_name",
				data: "service_name",
			},
			{
				data: "target_date",
				name: "target_date",
				render: function (data) {
					return ajs.format_date(data);
				},
			},
			{
				data: "add_date",
				name: "add_date",
				render: function (data) {
					return ajs.format_date(data);
				},
			},
			{
				data: "status",
				name: "status",
				render: function (data) {
					return history_status_label(data);
				},
			},
		],
		order: [["0", "desc"]],
	});
}

function history_status_label(value) {
    if (value == null) {
        return "-";
    }

    var icon = `<span class="badge border border-primary text-primary text-capitalize">${value}</span>`;
    if (value == '0' || value.toLowerCase() == 'open')
    {
        icon = `<span class="badge  border border-indigo text-indigo  text-capitalize">Open</span>`;
    } else if (value == '0' || value.toLowerCase() == 'pending')
    {
        icon = `<span class="badge  border border-warning text-warning  text-capitalize">Pending</span>`;
    } else if (value == '1' || value.toLowerCase() == 'complete' || value.toLowerCase() == 'completed' || value.toLowerCase() == 'task complete')
    {
        icon = `<span  class="badge  border border-success text-success  text-capitalize">Complete</span>`;
    } else if (value == '2' || value.toLowerCase() == 'rejected' || value == '3')
    {
        icon = `<span class="badge  border border-danger text-danger  text-capitalize" >Rejected</span>`;
    } else if (value.toLowerCase() == 'cancelled')
    {
        icon = `<span class="badge  border border-danger text-danger  text-capitalize" >Cancelled</span>`;
    } else if (value.toLowerCase() == 'approved')
    {
        icon = `<span class="badge  border border-success text-success  text-capitalize">Approved</span>`;

    } else if (value.toLowerCase() == 'in progress')
    {
        icon = `<span class="badge border text-capitalize" style="border-color:#20388A !important;color:#20388A">In Progress</span>`;
    } else if (value.toLowerCase() == 'abandoned' || value.toLowerCase() == 'task abandoned')
    {
        icon = `<span class="badge border border-danger text-danger  text-capitalize">Abandoned</span>`;
    } else if (value.toLowerCase() == 'h&s fail')
    {
        icon = `<span class="badge border border-danger text-danger  text-capitalize">H&S Failed</span>`;
    } else if (value.toLowerCase() == 'asbestos fail')
    {
        icon = `<span class="badge border border-danger text-danger  text-capitalize">Asbestos Failed</span>`;
    } else if (value.toLowerCase() == 'no access')
    {
        icon = `<span class="badge border border-warning text-warning  text-capitalize">No Access</span>`;
    } else if (value.toLowerCase() == 'further works')
    {
        icon = `<span class="badge border border-indigo text-indigo  text-capitalize">Further Works</span>`;
    } else if (value.toLowerCase() == 'materials required')
    {
        icon = `<span class="badge border border-warning text-warning  text-capitalize">Materials Required</span>`;
    } else if (value.toLowerCase() == 'start task')
    {
        icon = `<span class="badge border border-secondary text-secondary  text-capitalize">Start Task</span>`;
    }

    return icon;
}

$(function () {
	// Same guard as the assets tab: job/get_all needs view_jobs, and this popup is reachable by
	// roles that have Properties but not Jobs.
	if (!ajs.check_role('Jobs', 'view')) {
		return;
	}

	load_job_history_table();
	$(document).on("click", "#search-history", function () {
		job_datatable.ajax.reload(null, false);
	});

	$(document).on("shown.bs.tab", ".upcoming-job-tab", function () {
		job_status = "open";
		job_datatable.ajax.reload(null, false);
	});
	$(document).on("shown.bs.tab", ".job-history-tab", function () {
		job_status = "completed";
		job_datatable.ajax.reload(null, false);
	});
});
