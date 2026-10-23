<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Ajs extends CI_Controller
{

    public function index($view_page = 'index')
    {
        //redirect('app/auth/login');
        $this->load->view($view_page, array(), false);
    }

    public function generate_pass()
    {
        $pass = 'admin123';
        echo base64_encode($pass . LOGIN_SALT);
    }

}
