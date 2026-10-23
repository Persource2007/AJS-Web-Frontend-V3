<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Schedule extends CI_Controller
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

    public function list($client_id)
    {
        $this->page_data['encoded_id'] = $client_id;
        $this->page_data['client_id']         = hash_decode($client_id);

        $this->load->view('commons/header', $this->header_data);
        $this->load->view('clients/appointments/schedule-process', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function create($client_id)
    {
        $this->page_data['encoded_id'] = $client_id;
        $this->page_data['client_id']         = hash_decode($client_id);
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('clients/appointments/schedule-create', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function edit($client_id, $id)
    {
        if ($id && $id > 0)
        {
            $this->page_data['id']   = $id;
            $this->page_data['edit'] = true;
            $this->page_data['client_id']   = $client_id;
            // $this->page_data['client'] = call_api_self(base_url('client/get/' . $id), 'GET');
            $this->load->view('commons/header', $this->header_data);
            $this->load->view('clients/appointments/schedule-create', $this->page_data);
            $this->load->view('commons/footer', $this->footer_data);
        }
        else
        {
            $this->load->view('404');
        }
    }

    public function schedule_process($client_id)
    {
        $this->page_data['encoded_id'] = $client_id;
        $this->page_data['id']         = hash_decode($client_id);

        $this->load->view('commons/header', $this->header_data);
        $this->load->view('clients/appointments/schedule-process', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

}
