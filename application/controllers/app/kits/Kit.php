<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Kit extends CI_Controller
{

    private $header_data = [];
    private $page_data   = [];
    private $footer_data = [];

    public function __construct()
    {
        parent::__construct();
        if (PAGE_CACHING) {
            $this->output->cache(PAGE_CACHE_TIMEOUT);
        }
    }

    public function list()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('kits/list', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function create()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('kits/create', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function edit($id)
    {
        if ($id && $id > 0) {
            $this->page_data['id']   = $id;
            $this->page_data['edit'] = true;
            $this->load->view('commons/header', $this->header_data);
            $this->load->view('kits/create', $this->page_data);
            $this->load->view('commons/footer', $this->footer_data);
        } else {
            $this->load->view('404');
        }
    }

    public function details($id)
    {
        if($this->input->get('modal') == true) {
            $this->page_data['id']         = $id;
            $this->load->view('kits/detail-section', $this->page_data);
        } else {

            $this->page_data['id'] = hash_decode($id);

            $this->load->view('commons/header', $this->header_data);
            $this->load->view('kits/details', $this->page_data);
            $this->load->view('commons/footer', $this->footer_data);
        }
    }

    public function create_items($id = null)
    {
        if ($id && $id > 0)
        {
            $this->page_data['kit_id'] = $id;
        }
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('kits/kit-items', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }
}
