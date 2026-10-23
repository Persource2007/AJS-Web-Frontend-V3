var cert_datatable = null;
function load_certificate_table() {
	cert_datatable = new DataTable("#cert-datatables", {
		responsive: false,
		searching: false,
		serverSide: false,
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
			url: site_url + "property/certificates/" + $("#property_id").val(),
			method: "GET",
			async: false,
			dataSrc: "data",
			data: function (d) {
                d.search =  $("#cert_search_term").val();
			},
			beforeSend: function (xhr, settings) {
				ajs.set_auth_header(xhr, settings);
			},
            error: function (xhr) {
                ajs.datatable_error(xhr, "cert-datatables");
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
			},
			{
				data: "pdf_url",
				name: "pdf_url",
				searchable: false,
				orderable: false,
				render: function (data, type, row) {
					return (
						`<a href="` + data + `"  target="_blank">` + view_icon(true) + `</a>`
					);
				},
			},			
			{
				name: "certificate_code",
				data: "certificate_code",
			},
			{
				name: "title",
				data: "title",
				defaultContent: "-",
			},
			{
				name: "added_by_name",
				data: "added_by_name",
				class: "text-capitalize",
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
					return status_label(data);
				},
			},
		],
		order: [["0", "desc"]],
	});
}

function status_label(value) {
    const labels = {
        3: `<span class="badge  border border-indigo text-indigo">Update & Approved</span>`,
        4: `<span class="badge  border border-success text-success">Approved</span>`,
    };

    return labels[value] ?? "-";
}

$(function () {
	load_certificate_table();
	$(document).on("change", "#cert_search_term", function () {
        
		cert_datatable.search(this.value).draw();
        cert_datatable.ajax.reload();
	});
    $(document).on("shown.bs.tab", ".certificate-tab", function () {
		//cert_datatable.ajax.reload();
        cert_datatable.columns.adjust().responsive.recalc();
	});
});
