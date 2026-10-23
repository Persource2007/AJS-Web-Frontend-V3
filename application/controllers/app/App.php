<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class App extends CI_Controller
{

    private $header_data = [];
    private $page_data   = [];
    private $footer_data = [];

    function __construct()
    {
        parent::__construct();
        __is_logged_in(true);
    }

    public function index($view_page = 'index')
    {
        $data = str_decrypt('uodKtxUPKuWdvh5eGjtPNPj4J76aNN1JKFM7j8mcewi7cXdfMJ5nPmBnuw9iepckSKk1Hbj0jVGvT7d0tndKcOCHKkP0qqJw5IJWUjJXcw1OCubdvZJcMoWG95dolAb/YCKGIZNbp0gs+EnTBFjhZOYDfv3mP5UlHeetDeKOOSF1L2XaWWRS84iTmajjn1YpF3UjN78ScLUtrk3xYM3ryAC+55qy7PSc2X2CCd/m7UVY/z4HPnFeUMh8GxOgyIGmRc3afRLUtutWNqkDHRjaqMTkAGA+iCjaMHgXKQfvM86VXr3TLzCLt3UEKVJSMPNBpcwJ4X4kKWmuEX60gPHguLHhzDGj0OESssnLxNX7pdMc9zwiC54c8jYGbSr6FidD');
// $json_data = json_encode(['file_type' => 'image', 'file_path' => 'jobs']);
// $data = str_encrypt($json_data);
        var_dump($data);
        exit;
    }

    public function dashboard()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('app/dashboard', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function k03_detail()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('app/k03_detail', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function k04_detail()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('app/k04_detail', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function k06_detail()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('app/k06_detail', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function delay_board()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('app/delay_board', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function compliance()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('app/compliance', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function login()
    {
        $this->load->view('auth/login', $this->page_data);
    }

    public function decrypt()
    {
        $encrypted_data = $this->input->post('encrypted_data');
        echo str_decrypt($encrypted_data);
        exit;
    }

    public function encrypt()
    {
        $data = $this->input->post();
        $data = str_encrypt(json_encode($data));
        echo json_encode($data);
        exit;
    }

    public function error($page)
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('errors/'.$page, $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function demo_table()
    {
        $this->load->view('commons/header', $this->header_data);
       $this->load->view('demo_table');
        $this->load->view('commons/footer', $this->footer_data);
    }
}
