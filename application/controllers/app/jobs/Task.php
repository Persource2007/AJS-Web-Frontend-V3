<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Task extends CI_Controller
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
        $this->load->view('tasks/list', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function batch_printing()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('tasks/batch-print', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function details($id)
    {
        $this->page_data['id'] = $id;

        $this->load->view('commons/header', $this->header_data);
        $this->load->view('tasks/details', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function confirm_appointment($job_task)
    {
        $this->page_data['job_task'] = $job_task;
        $this->load->view('tasks/confirm-appointment', $this->page_data);
    }

    public function appointment_request($hash)
    {
        $this->page_data['hash'] = $hash;
        $this->load->view('tasks/appointment-request', $this->page_data);
    }

    public function engineer_tracking($hash)
    {
        $this->page_data['hash'] = $hash;
        $this->load->view('tasks/engineer-tracking', $this->page_data);
    }

    // new tasks list
    public function list_tasks()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('tasks/tasks_list', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function list_task_sors($job_id, $job_task_id)
    {
        $this->page_data['job_id']      = $job_id;
        $this->page_data['job_task_id'] = $job_task_id;
        $this->load->view('commons/task_sors_list', $this->page_data);
    }

    public function pending_appointment()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('tasks/pending_appointment', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function detail_window($id)
    {
        $this->page_data['id'] = $id;
        $this->load->view('commons/task-details-window', $this->page_data);
    }
}
