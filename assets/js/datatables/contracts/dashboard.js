function get_contract_dashboard(contract_id)
{
    ajs.ajax_form(site_url + 'contract/dashboard/' + contract_id, null, 'GET', null, '1', '1', set_dashboard_datail, set_dashboard_datail);
}

function set_dashboard_datail(result_json)
{
    if (ajs_form_handler.check_result(result_json)) {

        var contract = result_json.data.contract;
        console.log(result_json.data.contract_wise_invoice_total.total_invoice);
        $('#contract_type').html(ajs.ucWords(contract.type));
        $('#contract_workstreams').html(contract.workstream_name);       
        $('#contract_agent_commission').html(contract.contractor_commission);       
        $('#contract_invoice_total').html(result_json.data.contract_wise_invoice_total.total_invoice.toFixed(2));       
        $('#contract_total_commission').html(result_json.data.contract_wise_commission_total.total_commission.toFixed(2));       

        setJobCountAndChart(result_json.data);
        var validity = '';
        var start_date = ajs.format_date(contract.start_date);
        var end_date = ajs.format_date(contract.end_date) == '-' ? 'N/A' : ajs.format_date(contract.end_date);

        validity = start_date + ' to ' + end_date;

        $('#contract_validity').html(validity);

        if (typeof result_json.data.client_contacts !== 'undefined') {
            var contactHtml = format_contacts(result_json.data.client_contacts);
            $("#contacts").html(contactHtml);
        }

        if (result_json.data.ajs_contacts) {
            var contactHtml = format_contacts(result_json.data.ajs_contacts);
            $("#ajs_contacts").html(contactHtml);
        }

        var client_id = 0;
        if (client_id > 0) {
            var detail_url = 'clients/details/' + ajs.hash_encode(contract.client_id);
            var breadcrumbs = [
                {label: 'Clients', url: cdn_url + 'clients/list'},
                {label: contract.client_code, url: cdn_url + detail_url},
                {label: 'Contracts', url: cdn_url + 'clients/' + ajs.hash_encode(contract.client_id) + '/contract'},
                {label: contract.contract_number, url: null}
            ];
        } else {
            var breadcrumbs = [
                {label: 'Contracts', url: cdn_url + 'contract/list'},
                {label: 'Dashboard', url: null}
            ];
        }
        set_breadcrumb(breadcrumbs);


    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

contract_id_js = $('#contract_id_js').val();
if (typeof contract_id_js !== 'undefinded' && contract_id_js > 0)
{
    get_contract_dashboard(contract_id_js);
}


function format_contacts(contacts)
{
    var contactHtml = "";
    $.each(contacts, function (index, contact) {

        if (contact.name)
        {
            contactHtml += '<tr><td class="fw-medium">' + contact.type + '</td><td>' + ajs.ucWords(contact.name);
        } else if (contact.first_name)
        {
            contactHtml += '<tr><td class="fw-medium">' + contact.type + '</td><td>' + ajs.ucWords(contact.first_name) + ' ' + ajs.ucWords(contact.last_name);
        }

        if (contact.email) {
            contactHtml += '</br>E: <a href="mailto:' + contact.email + '">' + contact.email + '</a>';
        }
        if (contact.mobile || contact.phone) {
            contactHtml += '<br/>T: <a href="tel:' + contact.phone + '">' + contact.phone + '</a>';
        }
        contactHtml += '</td></tr>';

    });

    return contactHtml;
}


