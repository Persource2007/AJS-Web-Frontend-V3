<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Profiles extends CI_Controller
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

    public function view_profile()
    {
        $this->page_data['is_edit'] = false;
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('profile/profile-edit-view', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function edit_profile()
    {
        $this->page_data['is_edit'] = true;
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('profile/profile-edit-view', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }
}
