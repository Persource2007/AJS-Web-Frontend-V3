<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Scheduler extends CI_Controller
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

    public function home()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('scheduler/scheduler', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function bulk_assign_tasks(){
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('scheduler/bulk_assign_tasks', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function assign_task_form(){
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('scheduler/inc/assign-form', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function engineers_diaries(){
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('scheduler/engineers_diaries', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }
}
