<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Contract extends CI_Controller
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

    public function list($client_id = null)
    {
        if ($client_id != null) {
            $this->page_data['encoded_id'] = $client_id;
            $this->page_data['client_id']  = hash_decode($client_id);
        }
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('contracts/list', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function search_list()
    {
        $this->load->view('contracts/search-list', $this->page_data);
    }

    public function create($client_id = null)
    {
        $this->page_data['client_id'] = null;
        if ($client_id != null) {
            $this->page_data['encoded_id'] = $client_id;
            $this->page_data['client_id']  = hash_decode($client_id);
        }
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('contracts/create', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function edit($id, $client_id = null)
    {
        if ($id && $id > 0)
        {
            $this->page_data['id']   = hash_decode($id);
            $this->page_data['edit'] = true;
            $this->page_data['client_id'] = null;

            if ($client_id != null) {
                $this->page_data['encoded_id'] = $client_id;
                $this->page_data['client_id'] = hash_decode($client_id);
            }

            $this->load->view('commons/header', $this->header_data);
            $this->load->view('contracts/create', $this->page_data);
            $this->load->view('commons/footer', $this->footer_data);
        }
        else
        {
            $this->load->view('404');
        }
    }

    public function dashboard($id, $client_id = null)
    {
        if ($id && $id > 0)
        {
            $this->page_data['id']        = hash_decode($id);
            $this->page_data['edit']      = true;
            $this->page_data['client_id'] = null;
            $this->page_data['is_detail'] = $this->input->get('detail') == 'y' ? true : false;

            if ($client_id != null)
            {
                $this->page_data['encoded_id'] = $client_id;
                $this->page_data['client_id']  = hash_decode($client_id);
            }

            $this->load->view('commons/header', $this->header_data);
            $this->load->view('contracts/dashboard', $this->page_data);
            $this->load->view('commons/footer', $this->footer_data);
        }
        else
        {
            $this->load->view('404');
        }
    }

    public function details($id, $client_id = null)
    {
        if ($id && $id > 0)
        {
            if($this->input->get('modal') == true) {
                $this->page_data['id']         = $id;
                $this->load->view('contracts/detail-section', $this->page_data);
            } else {
                $this->page_data['id']   = hash_decode($id);
                $this->page_data['client_id'] = null;

                if ($client_id != null) {
                    $this->page_data['encoded_id'] = $client_id;
                    $this->page_data['client_id'] = hash_decode($client_id);
                }

                $this->load->view('commons/header', $this->header_data);
                $this->load->view('contracts/details', $this->page_data);
                $this->load->view('commons/footer', $this->footer_data);
            }
        }
        else
        {
            $this->load->view('404');
        }
    }

    public function personnel($contract_id, $client_id = null)
    {
        $this->page_data['id'] = hash_decode($contract_id);
        $this->page_data['client_id'] = null;
        if ($client_id != null) {
            $this->page_data['encoded_id'] = $client_id;
            $this->page_data['client_id'] = hash_decode($client_id);
        }
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('contracts/personnel', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function sors($contract_id, $client_id = null)
    {
        $this->page_data['id'] = hash_decode($contract_id);
        $this->page_data['client_id'] = null;
        $this->page_data['is_detail'] = $this->input->get('detail') == 'y' ? true : false;
        if ($client_id != null) {
            $this->page_data['encoded_id'] = $client_id;
            $this->page_data['client_id'] = hash_decode($client_id);
        }
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('contracts/sors', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function commissions($contract_id, $client_id = null)
    {
        $this->page_data['id'] = hash_decode($contract_id);
        $this->page_data['client_id'] = null;
        $this->page_data['is_detail'] = $this->input->get('detail') == 'y' ? true : false;
        if ($client_id != null) {
            $this->page_data['encoded_id'] = $client_id;
            $this->page_data['client_id'] = hash_decode($client_id);
        }
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('contracts/commissions', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function selling_and_billing($contract_id, $client_id = null)
    {
        $this->page_data['id'] = hash_decode($contract_id);
        $this->page_data['client_id'] = null;
        $this->page_data['is_detail'] = $this->input->get('detail') == 'y' ? true : false;
        if ($client_id != null) {
            $this->page_data['encoded_id'] = $client_id;
            $this->page_data['client_id'] = hash_decode($client_id);
        }
        $this->load->view('commons/header', $this->header_data);
        if($this->page_data['is_detail']) {
            $this->load->view('contracts/selling-and-billing-detail', $this->page_data);
        } else {
            $this->load->view('contracts/selling-and-billing', $this->page_data);
        }
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function settings($contract_id, $client_id = null)
    {
        $this->page_data['id'] = hash_decode($contract_id);
        $this->page_data['client_id'] = null;
        if ($client_id != null) {
            $this->page_data['encoded_id'] = $client_id;
            $this->page_data['client_id'] = hash_decode($client_id);
        }
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('contracts/settings', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function sor_variations_list($contract_id, $client_id = null)
    {
        $this->page_data['id'] = hash_decode($contract_id);
        $this->page_data['client_id'] = null;
        if ($client_id != null) {
            $this->page_data['encoded_id'] = $client_id;
            $this->page_data['client_id'] = hash_decode($client_id);
        }
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('contracts/sor_variations_list', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

     public function sor_variations_create($contract_id, $client_id = null)
    {        
        $this->page_data['id'] = hash_decode($contract_id);
        $this->page_data['client_id'] = null;
        if ($client_id != null) {
            $this->page_data['encoded_id'] = $client_id;
            $this->page_data['client_id'] = hash_decode($client_id);
        }
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('contracts/sor_variations_create', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    // New edit route to load the create view for editing a specific variation
    public function sor_variations_edit($contract_id, $edit_id, $client_id = null)
    {
        // print_r(hash_decode($edit_id));
        // print_r(hash_decode($contract_id));
        // print_r(hash_decode($client_id));
        // die;
        $this->page_data['id'] = hash_decode($contract_id);
        $this->page_data['client_id'] = null;
        if ($client_id != null) {
            $this->page_data['encoded_id'] = $client_id;
            $this->page_data['client_id'] = hash_decode($client_id);
        }
        // pass encoded or decoded variation id for context; actual data will be fetched client-side
        $this->page_data['edit_id'] = is_numeric($edit_id) ? intval($edit_id) : @hash_decode($edit_id);

        $this->load->view('commons/header', $this->header_data);
        $this->load->view('contracts/sor_variations_create', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }
    /* public function uplifts($contract_id, $client_id = null)
    {
        $this->page_data['id'] = hash_decode($contract_id);
        $this->page_data['client_id'] = null;
        $this->page_data['is_detail'] = $this->input->get('detail') == 'y' ? true : false;
        if ($client_id != null) {
            $this->page_data['encoded_id'] = $client_id;
            $this->page_data['client_id'] = hash_decode($client_id);
        }
        $this->load->view('commons/header', $this->header_data);
        if($this->page_data['is_detail']) {
            $this->load->view('contracts/uplifts-detail', $this->page_data);
        } else {
            $this->load->view('contracts/uplifts', $this->page_data);
        }
        $this->load->view('commons/footer', $this->footer_data);
    } */

    public function reports($contract_id, $client_id = null)
    {
        $this->page_data['id']        = hash_decode($contract_id);
        $this->page_data['client_id'] = null;
        $this->page_data['is_detail'] = $this->input->get('detail') == 'y' ? true : false;
        if ($client_id != null)
        {
            $this->page_data['encoded_id'] = $client_id;
            $this->page_data['client_id']  = hash_decode($client_id);
        }
        $this->load->view('commons/header', $this->header_data);
        if ($this->page_data['is_detail'])
        {
            $this->load->view('contracts/reports-detail', $this->page_data);
        }
        else
        {
            $this->load->view('contracts/reports', $this->page_data);
        }
        $this->load->view('commons/footer', $this->footer_data);
    }
}
