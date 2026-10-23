<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Ajax extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
    }

    public function set_user_session()
    {
        $post = $this->input->post();
        if ($post)
        {
            $this->session->set_userdata('access_token', $post['token']);
            if (isset($post['refresh_token']) && $post['refresh_token'] != '')
            {
                $this->session->set_userdata('refresh_token', $post['refresh_token']);
            }
            if (isset($post['new_refresh_token']) && $post['new_refresh_token'] != '')
            {
                $this->session->set_userdata('refresh_token', $post['new_refresh_token']);
            }
            if (isset($post['access']))
            {
                $this->session->set_userdata('user_roles', $post['access']);
            }
            if (isset($post['user']))
            {
                $this->session->set_userdata('user_pofile', $post['user']);
            }
            if (isset($post['user_settings']))
            {
                $this->session->set_userdata('user_settings', $post['user_settings']);
            }
        }
    }

    public function set_user_profile()
    {

    }

    public function destroy_user_session()
    {
        $this->session->sess_destroy();
    }

    public function logout()
    {
        $this->destroy_user_session();
    }

}
