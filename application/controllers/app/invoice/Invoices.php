<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Invoices extends CI_Controller
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
        $this->load->view('invoice/invoice-list', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function readyto_invoice_list()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('invoice/readyto-invoice-list', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }
    
    public function buildup_form(){
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('invoice/buildup-form', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }
    

    public function invoice_addto_existing_form(){
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('invoice/invoice-addto-existing-form', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function detail_list($invoice_id)
    {
        $this->load->view('commons/header', $this->header_data);
        $this->page_data['id']         = $invoice_id;
        $this->load->view('invoice/invoice-detail-list', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }
    public function generate_invoice($invoice_id)
    {
        $this->load->view('commons/header', $this->header_data);
        $this->page_data['id']         = $invoice_id;
        $this->load->view('invoice/generate-invoice', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }
    public function generate_excel($invoice_id)
    {
        $this->load->view('commons/header', $this->header_data);
        $this->page_data['id']         = $invoice_id;
        $this->load->view('invoice/generate-excel', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }
    public function search_list()
    {
        $this->load->view('invoice/search-list', $this->page_data);
    }
    
    public function delete_invoice()
    {
        $this->load->view('invoice/delete-invoice', $this->page_data);
    }
    public function delete_reason()
    {
        $this->load->view('invoice/delete-reason', $this->page_data);
    }
}
