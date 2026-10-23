<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Worksheet extends CI_Controller
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

    public function awaiting_approval_list()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('worksheet/awaiting-approval-list', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function accounts_list()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('worksheet/accounts-list', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }
    
    public function details_list($id){
        $this->page_data["id"] = $id;
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('worksheet/tasks-detail-list', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }
}
