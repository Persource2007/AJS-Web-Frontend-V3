<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Property extends CI_Controller
{

    private $header_data = [];
    private $page_data   = [];
    private $footer_data = [];

    public function __construct()
    {
        parent::__construct();
        if (PAGE_CACHING) {
            $this->output->cache(PAGE_CACHE_TIMEOUT);
        }
    }

    public function list($client_id = null)
    {
        if ($client_id != null) {
            $this->page_data['encoded_id'] = $client_id;
            $this->page_data['client_id']  = hash_decode($client_id);
        }

        $this->load->view('commons/header', $this->header_data);
        $this->load->view('property/list', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function search_list()
    {
        $this->load->view('property/search-list', $this->page_data);
    }

    public function create()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('property/create', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function details($id, $client_id = null)
    {
        if($this->input->get('modal') == true) {
            $this->page_data['id']         = $id;
            $this->load->view('property/detail-section', $this->page_data);
        } else {

            $this->page_data['id']        = hash_decode($id);
            $this->page_data['client_id'] = null;

            if ($client_id != null) {
                $this->page_data['encoded_id'] = $client_id;
                $this->page_data['client_id'] = hash_decode($client_id);
            }

            $this->load->view('commons/header', $this->header_data);
            $this->load->view('property/details', $this->page_data);
            $this->load->view('commons/footer', $this->footer_data);
        }
    }

    public function edit($id)
    {
        if ($id && $id > 0) {
            $this->page_data['id']   = $id;
            $this->page_data['edit'] = true;
            $this->load->view('commons/header', $this->header_data);
            $this->load->view('property/create', $this->page_data);
            $this->load->view('commons/footer', $this->footer_data);
        } else {
            $this->load->view('404');
        }
    }

    public function edit_contact_detail()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('property/update-contact', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function job_history($client_id = null, $property_id = null)
    {
        $this->page_data['encoded_id'] = $client_id;
        $this->page_data['is_job_history'] = true;

        $this->page_data['property_id'] = hash_decode($property_id);
        $this->page_data['client_id']   = hash_decode($client_id);

        $this->load->view('commons/header', $this->header_data);
        $this->load->view('property/job-history', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function upcoming_jobs($client_id = null, $property_id = null)
    {
        $this->page_data['encoded_id'] = $client_id;
        $this->page_data['is_job_history'] = false;

        $this->page_data['property_id'] = hash_decode($property_id);
        $this->page_data['client_id']   = hash_decode($client_id);

        $this->load->view('commons/header', $this->header_data);
        $this->load->view('property/job-history', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function certificates($client_id = null, $property_id = null)
    {
        $this->page_data['encoded_id'] = $client_id;

        $this->page_data['property_id'] = hash_decode($property_id);
        $this->page_data['client_id']   = hash_decode($client_id);

        $this->load->view('commons/header', $this->header_data);
        $this->load->view('property/certificate', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function master_plan($client_id = null, $property_id = null)
    {
        $this->page_data['encoded_id']     = $client_id;
        $this->page_data['is_job_history'] = true;

        $this->page_data['property_id'] = hash_decode($property_id);
        $this->page_data['client_id']   = hash_decode($client_id);

        $this->load->view('commons/header', $this->header_data);
        $this->load->view('property/master-plan', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function master_plan_list($client_id = null, $property_id = null)
    {
        $this->page_data['encoded_id']     = $client_id;
        $this->page_data['is_job_history'] = true;

        $this->page_data['property_id'] = hash_decode($property_id);
        $this->page_data['client_id']   = hash_decode($client_id);

        $this->load->view('commons/header', $this->header_data);
        $this->load->view('property/master-plan-list', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }
}
