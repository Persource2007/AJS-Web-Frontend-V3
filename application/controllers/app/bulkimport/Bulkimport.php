<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Bulkimport extends CI_Controller
{

    private $header_data = [];
    private $page_data   = [];
    private $footer_data = [];

    public function __construct()
    {
        parent::__construct();
        //__is_logged_in(true);
        if (PAGE_CACHING)
        {
            $this->output->cache(PAGE_CACHE_TIMEOUT);
        }
    }

    public function list()
    {
        $get = $this->input->get();
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('bulk_import/list', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function details($module, $batch_id)
    {
        $this->page_data['module'] = $module;
        $this->page_data['batch_id'] = $batch_id;
        
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('bulk_import/details', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }
}