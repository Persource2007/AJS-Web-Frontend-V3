<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Report extends CI_Controller
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
        $this->load->view('reports/list', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function create()
    {
        $this->page_data['id']   = 0;
        $this->page_data['edit'] = false;
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('reports/create', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function edit($id)
    {
        if ($id && $id > 0)
        {
            $this->page_data['id']   = hash_decode($id);
            $this->page_data['edit'] = true;
            $this->load->view('commons/header', $this->header_data);
            $this->load->view('reports/create', $this->page_data);
            $this->load->view('commons/footer', $this->footer_data);
        }
        else
        {
            $this->load->view('404');
        }
    }

    public function add_filters($id)
    {
        if ($id && $id > 0)
        {
            $this->page_data['id']   = $id;
            $this->page_data['edit'] = true;
            $this->load->view('commons/header', $this->header_data);
            $this->load->view('reports/add-filters', $this->page_data);
            $this->load->view('commons/footer', $this->footer_data);
        }
        else
        {
            $this->load->view('404');
        }
    }

    public function r01()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('reports/r01', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function r02()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('reports/r02', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function r04()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('reports/r04', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function r08()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('reports/r08', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function completed_certificate_report()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('reports/completed-certificate-report', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }
}
