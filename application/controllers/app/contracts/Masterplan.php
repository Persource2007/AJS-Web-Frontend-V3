<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Masterplan extends CI_Controller
{

    private $header_data = [];
    private $page_data   = [];
    private $footer_data = [];

    public function __construct()
    {
        parent::__construct();
        if (PAGE_CACHING)
        {
            //$this->output->cache(PAGE_CACHE_TIMEOUT);
        }
    }

    public function masterplan($contract_id, $client_id = null)
    {
        $this->page_data['id'] = hash_decode($contract_id);
        $this->page_data['contract_id'] = hash_decode($contract_id);
        $this->page_data['client_id']   = null;
        $this->page_data['view_page']   = false;
        if ($client_id != null) {
            $this->page_data['encoded_id'] = $client_id;
            $this->page_data['client_id'] = hash_decode($client_id);
        }
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('contracts/master-plan', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function masterplan_list($contract_id, $client_id = null)
    {
        $this->page_data['id'] = hash_decode($contract_id);
        $this->page_data['contract_id'] = hash_decode($contract_id);
        $this->page_data['client_id']   = null;
        $this->page_data['view_page']   = false;
        if ($client_id != null) {
            $this->page_data['encoded_id'] = $client_id;
            $this->page_data['client_id'] = hash_decode($client_id);
        }
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('contracts/master-plan-list', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function masterplan_view($contract_id, $client_id = null)
    {
        $this->page_data['id']          = hash_decode($contract_id);
        $this->page_data['contract_id'] = hash_decode($contract_id);
        $this->page_data['is_detail']   = $this->input->get('detail') == 'y' ? true : false;
        $this->page_data['client_id']   = null;
        $this->page_data['view_page']   = true;
        if ($client_id != null)
        {
            $this->page_data['encoded_id'] = $client_id;
            $this->page_data['client_id']  = hash_decode($client_id);
        }
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('contracts/master-plan-details', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }
}
