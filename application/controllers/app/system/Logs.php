<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Logs extends CI_Controller
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
        $this->load->view('system/logs/list', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function user_activity_logs()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('system/logs/user-activity-log', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function mail_logs()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('system/logs/mail-log', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function record_update_logs()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('system/logs/record-update-log', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function db_error_logs()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('system/logs/db-error-log', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function ppm_logs()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('system/logs/ppm-logs', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function user_activity_log_details($id = 0, $month = '', $year = '')
    {
        $this->page_data['id']    = $id;
        $this->page_data['month'] = $month;
        $this->page_data['year']  = $year;
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('system/logs/log-details', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function db_update_log_details($id = 0, $month = '', $year = '')
    {
        $this->page_data['id']    = $id;
        $this->page_data['month'] = $month;
        $this->page_data['year']  = $year;
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('system/logs/record-update-log-details', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function app_error_logs()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('system/logs/app-error-log', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    // bulk job tasks assignment logs
    public function bulk_assignment_logs()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('system/logs/bulk-assignment-log', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }
    
    public function bulk_assignment_log_details($id = 0, $month = '', $year = '')
    {
        $this->page_data['id']    = $id;
        $this->page_data['month'] = $month;
        $this->page_data['year']  = $year;
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('system/logs/bulk-assignment-log-detail', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }
}
