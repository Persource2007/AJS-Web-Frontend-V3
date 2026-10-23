<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Sor extends CI_Controller
{

    private $header_data = [];
    private $page_data   = [];
    private $footer_data = [];

    public function __construct()
    {
        parent::__construct();
        if (PAGE_CACHING)
        {
            $this->output->cache(PAGE_CACHE_TIMEOUT);
        }
    }

    public function list($client_id = null)
    {
        $this->page_data['client_id']   = $client_id;

        $this->load->view('commons/header', $this->header_data);
        $this->load->view('system/sors/list', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function search_list()
    {
        $this->load->view('system/sors/search-list', $this->page_data);
    }
    public function map_sors()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('system/sors/map-sors-form', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function create()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('system/sors/create', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function details($id)
    {
        if($this->input->get('modal') == true) {
            $this->page_data['id']         = $id;
            $this->load->view('system/sors/detail-section', $this->page_data);
        } else {

            $this->page_data['id'] = hash_decode($id);

            $this->load->view('commons/header', $this->header_data);
            $this->load->view('system/sors/details', $this->page_data);
            $this->load->view('commons/footer', $this->footer_data);
        }
    }

    public function edit($id)
    {
        if ($id && $id > 0)
        {
            $this->page_data['id']   = $id;
            $this->page_data['edit'] = true;
            $this->load->view('commons/header', $this->header_data);
            $this->load->view('system/sors/create', $this->page_data);
            $this->load->view('commons/footer', $this->footer_data);
        }
        else
        {
            $this->load->view('404');
        }
    }
}
