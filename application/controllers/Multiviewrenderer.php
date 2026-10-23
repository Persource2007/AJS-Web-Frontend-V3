<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Multiviewrenderer extends CI_Controller
{

    public function validate_request($input = array())
    {
        //$auth_token = $this->input->get_request_header('Authorization', TRUE);

        $auth_token = $input['Authorization'];
        if ($auth_token != VIEW_SERVER_AUTH)
        {
            $return_data = $this->load->view('403', array(), true);
            $this->generate_response($return_data, 403);
        }
    }

    public function index()
    {
        $input       = $this->input->raw_input_stream;
        $input       = json_decode(file_get_contents('php://input'), true);
        //var_dump($input);
        //$input       = json_decode($input, true);
        $this->validate_request($input);
        $return_data = array();
        if (is_array($input) && isset($input['view_files']) && is_array($input['view_files']))
        {
            set_view_data($input);

            foreach ($input['view_files'] as $view_files)
            {
                $view_file = $view_files['view'];
                $view_data = $view_files['data'];
                if (is_file(APPPATH . 'views/' . $view_file . '.php'))
                {
                    $return_data[] = $this->load->view($view_file, $view_data, true);
                    $response_code = 200;
                }
                else
                {
                    $return_data[] = $this->load->view(404, array(), true);
                    $response_code = 404;
                }
            }
        }
        else
        {
            $return_data[] = $this->load->view('403', array(), true);
            $response_code = 403;
        }
        $this->generate_response($return_data, $response_code);
    }

    public function generate_response($html, $header)
    {
        $return_data           = array();
        $return_data['status'] = FALSE;
        if ($header == 200)
        {
            $return_data['status'] = TRUE;
        }
        $return_data['html']          = $html;
        $return_data['response_code'] = $header;
        http_response_code($header);
        header('Content-Type: application/json');
        echo json_encode($return_data);
        exit;
    }

}
