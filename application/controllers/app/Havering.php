<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * app/Havering
 *
 * Renders the Havering ⇄ Open Housing integration monitoring dashboard.
 * Data is loaded client-side from the backend API (api/havering/dashboard).
 * Access is gated by the "Havering Integration" permission module (view right).
 */
class Havering extends CI_Controller
{
    private $header_data = [];
    private $page_data   = [];
    private $footer_data = [];

    function __construct()
    {
        parent::__construct();
        __is_logged_in(true);
    }

    public function index()
    {
        $this->page_data['title'] = 'Havering Integration';
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('app/havering-dashboard', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    /**
     * Per-interface detail page. The interface code is validated and rendered
     * client-side (api/havering/interface-detail/<code>); we only pass it to
     * the view so the JS knows which interface to load.
     */
    public function interface_detail($code = '')
    {
        $this->page_data['title']          = 'Havering Interface';
        $this->page_data['interface_code'] = preg_replace('/[^a-z0-9_]/', '', strtolower($code));
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('app/havering-interface', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    /**
     * Standard job code mapping screen: link each AJS service to the Open
     * Housing standard job code the Log Job interface should send. Data is
     * loaded and saved client-side (api/havering/code-map).
     */
    public function code_mappings()
    {
        $this->page_data['title'] = 'Havering Standard Job Codes';
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('app/havering-code-mappings', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }
}
