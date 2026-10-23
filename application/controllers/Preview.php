<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Preview extends CI_Controller
{

    private $header_data;
    private $page_data;
    private $footer_data;

    public function __construct()
    {
        parent::__construct();
    }

    public function index($view_page = 'index')
    {
        if ($view_page == 'index')
        {
            redirect('auth/login');
            return;
        }

        // Check if the view file exists
        if (!file_exists(APPPATH . 'views/' . $view_page . '.php'))
        {
            show_404(); // Show CodeIgniter 404 page
            return;
        }

        $this->load->view($view_page);
    }

    function bulk_upload_preview()
    {
        $load_in_popup           = true;
        $this->session->set_userdata('load_in_popup', $load_in_popup);
        //$data                    = $this->input->post();

        $raw = $this->input->raw_input_stream;

        $data = json_decode($raw, true);

        // ✅ Step 1: Ensure array
        $data = is_array($data) ? $data : [];

        // ✅ Step 2: Remove NULL values recursively (IMPORTANT)
        $data = $this->remove_nulls($data);

        // ✅ Step 3: Now safe for xss_clean
        $data = $this->security->xss_clean($data);

        $this->page_data['data'] = $data;

        $this->load->view('app/bulk-preview', $this->page_data);
    }

    // ✅ ADD THIS FUNCTION HERE (inside class)
    private function remove_nulls($array)
    {
        foreach ($array as $key => $value) {
            if (is_array($value)) {
                $array[$key] = $this->remove_nulls($value);
            } elseif (is_null($value)) {
                $array[$key] = ''; // or unset($array[$key]);
            }
        }
        return $array;
    }

    function app_site_association()
    {
        echo $content = file_get_contents(base_url('.well-known/apple-app-site-association.json'));
        exit;
    }
}
