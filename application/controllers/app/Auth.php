<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Auth extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
    }

    public function login()
    {
        if (!__is_logged_in())
        {
            if (isset($_GET['loggedout']))
            {
                if ($_GET['loggedout'] == '1')
                {
                    alert_message('Session Expired, please login again', 'warning');
                }
                else
                {
                    alert_message('Logout success', 'success');
                }
            }
            $this->load->view('auth/login', array(), false);
        }
        else
        {
            flash_message("You're already logged-in", 'warning');
            redirect('app/dashboard');
        }
    }

    public function set_password($key)
    {
        if (!__is_logged_in())
        {
            $this->load->view('auth/set-password', array('key' => $key, 'new_user' => 1), false);
        }
        else
        {
            redirect('app/dashboard');
        }
    }

    public function set_forgot_password($key, $forgot_key)
    {
        if (!__is_logged_in())
        {
            $this->load->view('auth/reset-password', array('key' => $key, 'forgot_key' => $forgot_key, 'forgot_password' => true, 'new_user' => 0), false);
        }
        else
        {
            redirect('app/dashboard');
        }
    }

    public function forgot_password()
    {
        if (!__is_logged_in())
        {
            $this->load->view('auth/forgot-password', null, false);
        }
        else
        {
            redirect('app/dashboard');
        }
    }

    public function verify_2fa_otp($user_id)
    {
        if (!__is_logged_in())
        {
            $this->load->view('auth/verify-2fa-otp', ['user_id' => hash_decode($user_id)], false);
        }
        else
        {
            redirect('app/dashboard');
        }
    }
}
