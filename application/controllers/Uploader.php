<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Uploader extends CI_Controller
{

    var $upload_path = '';

    public function __construct()
    {
        parent::__construct();
        $this->load->helper(array('form'));

        $upload_path = UPLOAD_PATH . date('Y') . '/' . date('m');

        if (!file_exists($upload_path))
        {
            mkdir($upload_path, 0777, true);
        }

        $this->upload_path = $upload_path . '/';
    }

    public function load_library($file_type = 'image')
    {
        $config = array();

        $config['upload_path'] = $this->upload_path . $file_type;
        if (!file_exists($config['upload_path']))
        {
            mkdir($config['upload_path'], 0777, true);
        }

        $config['max_size'] = 1024; // 1MB
        if ($file_type == 'image')
        {
            $config['allowed_types'] = 'gif|jpg|png|webp|jpeg';
        }
        if ($file_type == 'doc')
        {
            $config['allowed_types'] = 'docx|doc|pdf';
            $config['max_size']      = 10240; // 10MB
        }
        if ($file_type == 'excel')
        {
            $config['allowed_types'] = 'xls|xlsx';
            $config['max_size']      = 10240; // 10MB
        }

        $this->load->library('upload', $config);
    }

    public function upload_file()
    {
        $response = array();

        $upload_type = $this->input->post('upload_type');
        $file_type   = $this->input->post('file_type');

        if ($upload_type && $file_type)
        {
            $this->load_library($file_type);

            if (!$this->upload->do_upload('upload'))
            {
                $response['status']  = '0';
                $response['message'] = $this->upload->display_errors();
            }
            else
            {
                $upload_data             = $this->upload->data();
                $response['upload_path'] = $this->upload_path . $file_type . '/';
                $response['filename']    = $upload_data['file_name'];
                $response['file_type']   = $file_type;
                $response['upload_type'] = $upload_type;
                $response['status']      = '1';
                $response['message']     = 'File uploaded successfully';
            }
        }
        else
        {
            $response['status']  = '0';
            $response['message'] = 'Missing parameters';
        }
        echo json_encode($response);
    }

}
