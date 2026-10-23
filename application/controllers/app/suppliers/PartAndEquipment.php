<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class PartAndEquipment extends CI_Controller
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

    public function list($supplier_id)
    {
        $this->page_data['id'] = hash_decode($supplier_id);
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('suppliers/part-and-equipment/list', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function create($supplier_id=null)
    {
        $this->page_data['supplier_id'] = $supplier_id;
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('suppliers/part-and-equipment/create', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function edit($id)
    {
        if ($id && $id > 0)
        {
            $this->page_data['id']   = $id;
            $this->page_data['edit'] = true;
            $this->load->view('commons/header', $this->header_data);
            $this->load->view('suppliers/part-and-equipment/edit', $this->page_data);
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
        $this->load->view('suppliers/part-and-equipment/details', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }
}
