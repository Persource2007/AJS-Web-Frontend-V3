<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Supplier extends CI_Controller
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
        $this->load->view('suppliers/list', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function create()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('suppliers/create', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function edit($id)
    {
        if ($id && $id > 0)
        {
            $this->page_data['id']   = hash_decode($id);
            $this->page_data['edit'] = true;
            $this->load->view('commons/header', $this->header_data);
            $this->load->view('suppliers/create', $this->page_data);
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
        $this->load->view('suppliers/details', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function purchase_orders($id)
    {
        $this->page_data['id'] = hash_decode($id);
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('suppliers/purchase-orders', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function part_and_equipments($supplier_id)
    {
        $this->page_data['id'] = hash_decode($supplier_id);
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('suppliers/part-and-equipments', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }
}
