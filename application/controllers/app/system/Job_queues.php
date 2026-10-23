<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Job_queues extends CI_Controller
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

    public function list($master_id = 0)
    {
        $this->page_data['encoded_id'] = $master_id;
        $this->page_data['master_id']  = hash_decode($master_id);
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('system/job-queues/list', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function create($master_id = 0)
    {
        $this->page_data['master_id'] = $master_id;
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('system/job-queues/create', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function create_pop($master_type = '')
    {
        $this->page_data['master_type'] = $master_type;
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('system/job-queues/create-pop', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function details($id)
    {

        $this->page_data['id'] = $id;

        $this->load->view('commons/header', $this->header_data);
        $this->load->view('system/job-queues/details', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function edit($id)
    {
        if ($id && $id > 0)
        {
            $this->page_data['id']   = $id;
            $this->page_data['edit'] = true;
            $this->load->view('commons/header', $this->header_data);
            $this->load->view('system/job-queues/create', $this->page_data);
            $this->load->view('commons/footer', $this->footer_data);
        }
        else
        {
            $this->load->view('404');
        }
    }
}
