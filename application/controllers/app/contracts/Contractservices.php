<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Contractservices extends CI_Controller
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

    public function services($contract_id, $client_id = null)
    {
        $this->page_data['id'] = hash_decode($contract_id);
        $this->page_data['contract_id'] = hash_decode($contract_id);

        $this->page_data['client_id'] = null;
        if ($client_id != null) {
            $this->page_data['encoded_id'] = $client_id;
            $this->page_data['client_id'] = hash_decode($client_id);
        }

        $this->load->view('commons/header', $this->header_data);
        $this->load->view('contracts/services', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }
}
