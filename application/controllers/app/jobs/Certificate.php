<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Certificate extends CI_Controller
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
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('jobs/certificates/list', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }
    public function reason_for_failed()
    {
        $this->load->view('jobs/certificates/reason_for_failed', $this->page_data);
    }
}
