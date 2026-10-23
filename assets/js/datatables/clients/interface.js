var master_data_type = "interface";
dataTable = null;

function load_data_table(limit, search_term, filters) {
    var id = $("#client_id").val();
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

dataTable = new DataTable("#interface-datatables", {
    scrollY: (screen.height - 500) + 'px',
    scrollCollapse: !0,
    scrollX: true,
    autoWidth: false,
    searching: false,
    serverSide: true,
    processing: true,
    paging: true,
    responsive: false,
    bDestroy: true,
    //responsive: false,
    pageLength: page_limit,
    search: {
        search: search,
    },
    ajax: {
        url: site_url + "client/" + id + "/interface/get_all",
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
            ajs.datatable_error(xhr, "interface-datatables");
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
                    '<a id="interface_edit_' + row.id + '" data-after-load-func="edit_form" data-heading="Edit Interface - #' + row.id + '" data-form-url="' + cdn_url + 'clients/' + row.client_id + '/interface-edit/' + row.id + '" class="popup-form-button" >'+edit_icon()+'</a>'
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
            name: "config_name",
            data: "config_name",
        },
        {
            name: "interface_type",
            data: "interface_type",
            render: function (data) {
                return interface_type_label(data);
            },
        },       
        {
            data: "add_date",
            name: "add_date",
            render: function (data) {
                return ajs.format_date(data);
            }
        },        
    ],
    order: [["2", "desc"]],
    drawCallback: function () {
        ajs.apply_ind_roles("Interface");
    }
});

function interface_type_label(type)
{
    if (type == '1')
    {
        return `<span class="badge  border border-indigo text-indigo  text-capitalize">Certificate Upload</span>`;
    }
    else if(type == '2'){
        return `<span class="badge  border border-indigo text-indigo  text-capitalize">Fatch Jobs</span>`;
    }
}

}

if ($("#interface-datatables").length) {
    fetch_default_filter(master_data_type);    
    var breadcrumbs = [
        {label: 'Interfaces', url: null}
    ];
    set_breadcrumb(breadcrumbs);
}

// var deleted_interfaces = [];
var deleted_interface_reminders = [];

function create_form(type = "create") {
    if (type == "create") { 
        get_details();
    } 
    $("#interfaceForm").validate({
        onkeyup: false,
        rules: {
            "config_name": {
                required: true,
            },
            "api_type": {
                required: true,
            },
            "base_url": {
                required: true,
            },
            "login_endpoint": {
                required: true,
            },
            "upload_endpoint": {
                required: true,
            },
            "auth_type": {
                required: true,
            },
            "username": {
                required: true,
            },
            "password": {
                // required: true,
                minlength: 6,
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
            ajs.reload = true;
            ajs.ajax_form(action, formData, method, null, "1", "1", ajs_form_handler.form_submit_response, ajs_form_handler.form_submit_response);

            return false;
        },
    });    
}

function edit_form() {
    create_form('edit');
    var client_id = $("#client_id").val();
    var id = $("#edit_id").val();
    ajs.apply_ind_roles("Interface");
    add_autocomplete_sel("#api_type", "interface_api_types", ["type_name"], null, null,"offcanvasRight",'1');   
    ajs.ajax_form(site_url + 'client/get/' + client_id, null, 'GET', null, '0', '1', create_breadcrumb, create_breadcrumb, 'Interfaces');
    ajs.ajax_form(site_url + "client/" + client_id+"/interface/get/"+id , null, "GET", null, "0", "0", set_data, set_data);
}

function get_details() {    
    var id = $("#client_id").val();
    add_autocomplete_sel("#api_type", "interface_api_types", ["type_name"], null, null,"offcanvasRight");    
    ajs.ajax_form(site_url + 'client/get/' + id, null, 'GET', null, '0', '1', create_breadcrumb, create_breadcrumb, 'Interfaces');
}

function set_data(result_json) {
    console.log(result_json);
    if (ajs_form_handler.check_result(result_json) && result_json.data) {                     
        var interface = result_json.data;
        var interface_endpoints = result_json.interface_endpoints;

        add_autocomplete_sel("#api_type", "interface_api_types", ["type_name"], null, null,"offcanvasRight", interface.interface_api_type_id);
        $('#config_name').val(interface.config_name);
        $('#base_url').val(interface.base_url);
        $('#login_endpoint').val(interface.login_endpoint);
        $('#upload_endpoint').val(interface.upload_endpoint);
        $('#auth_type').val(interface.auth_type);
        $('#username').val(interface.username);
        $('#password').val(interface.password);
        $('#status').val(interface.status);
        $('#client_id').val(interface.client_id);
        $('#interface_id').val(interface.id);

        var additional_header = interface.additional_headers;                
                        
        if(additional_header){            
            var additional_headers = JSON.parse(additional_header);     
            additional_header_count = Object.keys(additional_headers).length;     
            // console.log(additional_headers);
            // console.log(additional_header_count);
            for (let index = 1; index < additional_header_count; index++)
            {
                $(".add-additional-header").trigger('click');
            }
            set_additional_header(additional_headers);
        }
        if(interface_endpoints){            
            // var additional_headers = JSON.parse(additional_header);     
            additional_header_count = interface_endpoints.length;  
            console.log(additional_header_count);               
            for (let index = 1; index < additional_header_count; index++)
            {
                $(".add-additional-apiednpoint").trigger('click');
            }
            set_endpoints(interface_endpoints);
        }
    } else {       
       // ajs_form_handler.show_errors(result_json);
    }
}
function set_detail(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var interface = result_json.data;
        var interface_reminders = result_json.interface_reminders;
        var interfaceHtml = "";
        
        
    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

function set_additional_header(additional_headers) {
    console.log(additional_headers);
    let i = 0;
    $.each(additional_headers, function (key, value) {       
        $("input[name='header_key["+i+"]']").val(key);
        $("input[name='header_value["+i+"]']").val(value);
        i++;
    });
}

function set_endpoints(additional_headers) {
    console.log(additional_headers);
    let i = 0;
    $.each(additional_headers, function (key, value) {   
           
        $("input[name='endpoint_name["+i+"]']").val(value.endpoint_name);
        $("input[name='endpoint_url["+i+"]']").val(value.endpoint_url);
        $("input[name='method["+i+"]']").val(value.method);
        $("input[name='parameters["+i+"]']").val(value.parameters);
        i++;
    });
}

function create_breadcrumb(result_json)
{
    if (ajs_form_handler.check_result(result_json)) {
        var client = result_json.message.data;

        var detail_url = 'clients/details/' + ajs.hash_encode(client.id);
        var breadcrumbs = [
            {label : 'Clients', url: cdn_url + 'clients/list'},
            {label : client.client_code, url: cdn_url + detail_url},
            {label : 'Interfaces', url: null}
        ];

        set_breadcrumb(breadcrumbs);
        
    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

$(function () {
    // Custom method for multiple email validation
    var interface_reminder_index = 1;
    var interface_reminder_row = $(".additional-header-row").first().clone();

    var interface_apiednpoint_index = 1;
    var interface_apiednpoint_row = $(".additional-apiednpoint-row").first().clone();

    $(document).on("click", ".add-additional-apiednpoint", function (e, interface) {
        
        var new_row = interface_apiednpoint_row.clone();

        new_row.find('.btn-danger').parent().removeClass('hide');

        new_row.html(function (i, oldHTML) {
            let updatedHTML = oldHTML
            .replaceAll('endpoint_name[0]', 'endpoint_name[' + interface_apiednpoint_index + ']')
            .replaceAll('endpoint_url[0]', 'endpoint_url[' + interface_apiednpoint_index + ']')
            .replaceAll('method[0]', 'method[' + interface_apiednpoint_index + ']')
            .replaceAll('parameters[0]', 'parameters[' + interface_apiednpoint_index + ']');
            return updatedHTML;
        });

        $("#additional-apiednpoint-section").append(new_row);
        interface_apiednpoint_index++;
    });

    $(document).on("click", ".delete-additional-apiednpoint", function () {
        var parent = $(this).closest('.additional-apiednpoint-row');
        var id = parent.find('.row-id').val();
        if (id) {
            deleted_interface_reminders.push(id);
        }
        parent.remove();        
    });
    $(document).on("click", ".add-additional-header", function (e, interface) {
        
        var new_row = interface_reminder_row.clone();

        new_row.find('.btn-danger').parent().removeClass('hide');

        new_row.html(function (i, oldHTML) {
            let updatedHTML = oldHTML
            .replaceAll('header_key[0]', 'header_key[' + interface_reminder_index + ']')
            .replaceAll('header_value[0]', 'header_value[' + interface_reminder_index + ']');
            return updatedHTML;
        });

        $("#additional-header-section").append(new_row);
        interface_reminder_index++;
    });

    $(document).on("click", ".delete-additional-header", function () {
        var parent = $(this).closest('.additional-header-row');
        var id = parent.find('.row-id').val();
        if (id) {
            deleted_interface_reminders.push(id);
        }
        parent.remove();        
    });
 
    ajs.apply_ind_roles('Interface');
});
