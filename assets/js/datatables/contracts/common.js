var contract_client_id = null;
var contract_start_date = null;
function create_breadcrumb(result_json, nav= '')
{
    if (ajs_form_handler.check_result(result_json)) {
        var contract = result_json.data;

        const client_id = $("#client_id_hidden").val();

        var contract_url = 'contract/edit/'+ajs.hash_encode(contract.id);
        if($('#is_detail_page').val() > 0) {
            contract_url = 'contract/details/'+ajs.hash_encode(contract.id);
        }

        if(client_id > 0) {
            var detail_url = 'clients/details/' + ajs.hash_encode(contract.client_id);
            var breadcrumbs = [
                {label : 'Clients', url: cdn_url + 'clients/list'},
                {label : contract.client_code, url: cdn_url + detail_url},
                {label : 'Contracts', url: cdn_url + 'clients/'+ajs.hash_encode(contract.client_id)+'/contract'},
                {label : contract.contract_number, url: cdn_url + 'clients/'+ajs.hash_encode(contract.client_id)+'/'+contract_url},
                {label : nav, url: null}
            ];
        } else {
            var breadcrumbs = [
                {label : 'Contracts', url: cdn_url + 'contract/list'},
                {label : contract.contract_number, url: cdn_url + contract_url},
                {label : nav, url: null}
            ];
        }

        contract_client_id = contract.client_id;
        contract_start_date = contract.start_date;
        set_breadcrumb(breadcrumbs);
        
    } else {
        ajs_form_handler.show_errors(result_json);
    }
}