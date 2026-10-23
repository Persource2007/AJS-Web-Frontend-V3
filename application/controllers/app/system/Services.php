<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Services extends CI_Controller
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
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('system/services/list', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function create()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('system/services/create', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function details($id)
    {

        $this->page_data['id'] = $id;

        $this->load->view('commons/header', $this->header_data);
        $this->load->view('system/services/details', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function edit($id)
    {
        if ($id && $id > 0)
        {
            $this->page_data['id']   = $id;
            $this->page_data['edit'] = true;
            $this->load->view('commons/header', $this->header_data);
            $this->load->view('system/services/create', $this->page_data);
            $this->load->view('commons/footer', $this->footer_data);
        }
        else
        {
            $this->load->view('404');
        }
    }
}
