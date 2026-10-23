<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Certificates extends CI_Controller
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
        $this->load->view('certificates/list', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function create()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('certificates/create', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function create_old()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('certificates/create-23-03-2024', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function details($id)
    {

        $this->page_data['id'] = $id;

        $this->load->view('commons/header', $this->header_data);
        $this->load->view('certificates/details', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function edit($id)
    {
        if ($id && $id > 0)
        {
            $this->page_data['id']   = $id;
            $this->page_data['edit'] = true;
            // $this->page_data['client'] = call_api_self(base_url('client/get/' . $id), 'GET');
            $this->load->view('commons/header', $this->header_data);
            $this->load->view('certificates/create', $this->page_data);
            $this->load->view('commons/footer', $this->footer_data);
        }
        else
        {
            $this->load->view('404');
        }
    }

    public function create_pop()
    {
        $this->page_data['data'] = [];

        $this->load->view('engineers/create', $this->page_data);
    }

    public function edit_pdf($task,$certificate)
    {
        $this->page_data['data'] = [];
        $this->page_data['task'] = $task;
        $this->page_data['certificate'] = $certificate;
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('certificates/edit_pdf_data', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }
}
