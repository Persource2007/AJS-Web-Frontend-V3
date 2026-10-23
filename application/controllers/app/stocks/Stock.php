<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Stock extends CI_Controller
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
        $this->load->view('stocks/list', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function create()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('stocks/create', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function edit($id)
    {
        if ($id && $id > 0)
        {
            $this->page_data['id']   = hash_decode($id);
            $this->page_data['edit'] = true;
            $this->load->view('commons/header', $this->header_data);
            $this->load->view('stocks/create', $this->page_data);
            $this->load->view('commons/footer', $this->footer_data);
        }
        else
        {
            $this->load->view('404');
        }
    }

    public function details($id)
    {
        $this->page_data['id'] = hash_decode($id);
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('stocks/details', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function suppliers($id)
    {
        $this->page_data['id'] = hash_decode($id);
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('stocks/suppliers', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function transfer()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('stocks/stock-transfer', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }
}
