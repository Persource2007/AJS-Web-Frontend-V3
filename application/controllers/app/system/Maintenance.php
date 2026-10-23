<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Maintenance extends CI_Controller
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
        $this->load->view('system/maintenance/list', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function update_property_uprn()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('system/maintenance/update-property-uprn', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }
}
