var master_data_type = 'master';
dataTable = null;


// function load_masters()
// {
//     ajs.ajax_form(site_url + master_data_type + '/get_all/?order_by=title&order_type=ASC', null, 'GET', null, '1', '1', load_data_table, load_data_table);
// }

// load_masters();

function load_view_data(result_json)
{
    if (ajs_form_handler.check_result(result_json))
    {
        var edit_data = result_json.message.data;
        $('#title').val(edit_data.title);
        $('#description').val(edit_data.description);
        $('#service_code').val(edit_data.service_code);
        $('input[name="appointment_required"][value="' + edit_data.appointment_required + '"]').prop('checked', true);

    } else
    {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
    
     
}

function get_details()
{
    ajs.ajax_form(site_url + 'master/get/' + id, null, 'GET', null, '1', '1', set_view_data, set_view_data);

}

$(function () {
    if ($('#is_detail_page').val()) {
        get_details();
    }
});


var breadcrumbs = [
		{ label: "System Admin", url: "javascript: void(0);" },
		{ label: "Setup", url: "javascript: void(0);" },
		{ label: "Logs", url: null },
	];
	set_breadcrumb(breadcrumbs);
