<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Sms_replies extends CI_Controller
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

    public function index()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('sms/replies', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function get_replies() {
        // This is a placeholder for the backend functionality if it was being implemented here.
        // However, the user specified the API endpoint is already ready at: GET /system/Sms/get_replies
        // So this controller is mainly for serving the view.
        // If the JS calls this method, we would proxy or standardise here, but usually JS calls API directly in this architecture.
    }
    public function reply($from_number = null)
    {
        $this->page_data['from_number'] = $from_number;
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('sms/reply', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }
}
