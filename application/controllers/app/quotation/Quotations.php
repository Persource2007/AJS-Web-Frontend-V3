<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Quotations extends CI_Controller
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
        $this->load->view('quotations/list', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function create()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('quotations/create', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function edit($id)
    {
        if ($id && $id > 0)
        {
            $this->page_data['id']   = $id;
            $this->page_data['edit'] = true;
            $this->load->view('commons/header', $this->header_data);
            $this->load->view('quotations/create', $this->page_data);
            $this->load->view('commons/footer', $this->footer_data);
        }
        else
        {
            $this->load->view('404');
        }
    }

    public function details($id)
    {
        $this->page_data['id'] = hash_decode($id);

        $this->load->view('commons/header', $this->header_data);
        $this->load->view('quotations/details', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function send_email_sms($id = null)
    {
        $this->page_data['quotation_id'] = $id;
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('quotations/send-email-sms', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function search_list()
    {
        $this->load->view('quotations/search-list', $this->page_data);
    }

    public function quote_approve($id)
    {
        $decoded_id = base64_decode(urldecode($id));;
        $this->page_data['id'] = $decoded_id;
        $this->load->view('quotations/quote_approve', $this->page_data);
    }
    public function quote_reject($id)
    {
        $decoded_id = base64_decode(urldecode($id));
        $this->page_data['id'] = $decoded_id;
        $this->load->view('quotations/quote_reject', $this->page_data);
    }
    public function view_quote($id)
    {
        if ($id && $id > 0)
        {
            $this->page_data['id']   = $id;
            $this->page_data['edit'] = true;
            $this->load->view('commons/header', $this->header_data);
            $this->load->view('quotations/view', $this->page_data);
            $this->load->view('commons/footer', $this->footer_data);
        }
        else
        {
            $this->load->view('404');
        }
    }

}
