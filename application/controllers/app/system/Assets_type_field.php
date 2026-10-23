<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Assets_type_field extends CI_Controller
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

    public function list()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('system/assets-type-fields/list', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function create()
    {
        $this->page_data['id']   = null;
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('system/assets-type-fields/create', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function edit($id)
    {
        if ($id && $id > 0)
        {
            $this->page_data['id']   = hash_decode($id);
            $this->page_data['edit'] = true;
            $this->load->view('commons/header', $this->header_data);
            $this->load->view('system/assets-type-fields/create', $this->page_data);
            $this->load->view('commons/footer', $this->footer_data);
        }
        else
        {
            $this->load->view('404');
        }
    }
}
