<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Clients extends CI_Controller
{

    private $header_data = [];
    private $page_data   = [];
    private $footer_data = [];

    public function __construct()
    {
        parent::__construct();
        //__is_logged_in(true);
        if (PAGE_CACHING)
        {
            $this->output->cache(PAGE_CACHE_TIMEOUT);
        }
    }

    public function list()
    {
        $get = $this->input->get();
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('clients/list', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function search_list()
    {
        $this->load->view('clients/search-list', $this->page_data);
    }

    public function create()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('clients/create', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function details($id)
    {
        if($this->input->get('modal') == true) {
            $this->page_data['id']         = $id;
            $this->load->view('clients/detail-section', $this->page_data);
        } else {

            $this->page_data['encoded_id'] = $id;
            $this->page_data['id']         = hash_decode($id);
    
            $this->load->view('commons/header', $this->header_data);
            $this->load->view('clients/details', $this->page_data);
            $this->load->view('commons/footer', $this->footer_data);
        }

    }

    public function edit($id)
    {
        if ($id && $id > 0)
        {
            $this->page_data['id']   = $id;
            $this->page_data['edit'] = true;
            // $this->page_data['client'] = call_api_self(base_url('client/get/' . $id), 'GET');
            $this->load->view('commons/header', $this->header_data);
            $this->load->view('clients/create', $this->page_data);
            $this->load->view('commons/footer', $this->footer_data);
        }
        else
        {
            $this->load->view('404');
        }
    }

    public function create_pop()
    {
        $this->page_data['data'] = [];

        $this->load->view('engineers/create', $this->page_data);
    }

    public function appointments($client_id)
    {
        $this->page_data['encoded_id'] = $client_id;
        $this->page_data['id']         = hash_decode($client_id);

        $this->load->view('commons/header', $this->header_data);
        $this->load->view('clients/appointments/appointment', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function schedule_process($client_id)
    {
        $this->page_data['encoded_id'] = $client_id;
        $this->page_data['id']         = hash_decode($client_id);

        $this->load->view('commons/header', $this->header_data);
        $this->load->view('clients/appointments/schedule-process', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function selling_and_billing($client_id)
    {
        $this->page_data['encoded_id'] = $client_id;
        $this->page_data['id']         = hash_decode($client_id);

        $this->load->view('commons/header', $this->header_data);
        $this->load->view('clients/selling-and-billing', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function sors($client_id)
    {
        $this->page_data['encoded_id'] = $client_id;
        $this->page_data['id']         = hash_decode($client_id);

        $this->load->view('commons/header', $this->header_data);
        $this->load->view('clients/sors', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function uplifts($client_id)
    {
        $this->page_data['encoded_id'] = $client_id;
        $this->page_data['id'] = hash_decode($client_id);
        $this->page_data['is_detail'] = $this->input->get('detail') == 'y' ? true : false;
        
        $this->load->view('commons/header', $this->header_data);

        if($this->page_data['is_detail']) {
            $this->load->view('clients/uplifts-detail', $this->page_data);
        } else {
            $this->load->view('clients/uplifts', $this->page_data);
        }
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function interface($client_id)
    {
        $this->page_data['encoded_id'] = $client_id;
        $this->page_data['id']         = hash_decode($client_id);

        $this->load->view('commons/header', $this->header_data);
        $this->load->view('clients/interface', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function interface_create($client_id)
    {
        $this->page_data['encoded_id'] = $client_id;
        $this->page_data['client_id']  = $client_id;
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('clients/interface-create', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }
    public function interface_edit($client_id, $id)
    {
        $this->page_data['encoded_id'] = $client_id;
        $this->page_data['client_id']  = $client_id;
        $this->page_data['id']  = $id;
        $this->page_data['edit'] = true;
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('clients/interface-create', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }
}
