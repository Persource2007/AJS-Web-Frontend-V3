<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Job extends CI_Controller
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
        $this->load->view('jobs/list', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function bulk_assign_jobs(){
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('jobs/bulk-list', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function assign_job_form(){
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('jobs/inc/bulk-assign-form', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function create()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('jobs/create', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function edit($id)
    {
        if ($id && $id > 0)
        {
            $this->page_data['id']   = $id;
            $this->page_data['edit'] = true;
            $this->load->view('commons/header', $this->header_data);
            $this->load->view('jobs/create', $this->page_data);
            $this->load->view('commons/footer', $this->footer_data);
        }
        else
        {
            $this->load->view('404');
        }
    }

    public function copy($id)
    {
        if ($id && $id > 0)
        {
            $this->page_data['id']   = $id;
            $this->page_data['copy'] = true;
            $this->load->view('commons/header', $this->header_data);
            $this->load->view('jobs/create', $this->page_data);
            $this->load->view('commons/footer', $this->footer_data);
        }
        else
        {
            $this->load->view('404');
        }
    }

    public function details($id)
    {
        $this->page_data['id'] = hash_decode($id);

        $this->load->view('commons/header', $this->header_data);
        $this->load->view('jobs/details', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function summary($id)
    {
        $this->page_data['id'] = $id;
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('jobs/summary', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function print_summary($id)
    {
        $this->page_data['id'] = $id;
        $this->load->view('jobs/summary-print', $this->page_data);
    }

    public function send_email_sms($id = null)
    {
        $this->page_data['job_id'] = $id;
        $this->page_data['event_id'] = $this->input->get('event_id');
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('jobs/send-email-sms', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function bulk_communication()
    {
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('jobs/bulk-communication', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function create_task($id = null)
    {
        if ($id && $id > 0)
        {
            $this->page_data['job_id'] = $id;
        }
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('jobs/create-task', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function edit_task($task_id = null)
    {
        if ($task_id && $task_id > 0)
        {
            $this->page_data['task_id'] = $task_id;
            $this->page_data['edit']    = TRUE;
        }
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('jobs/create-task', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function copy_task($task_id = null)
    {
        if ($task_id && $task_id > 0)
        {
            $this->page_data['task_id'] = $task_id;
            $this->page_data['copy']    = TRUE;
        }
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('jobs/create-task', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }

    public function task_details($task_id)
    {
        $this->page_data['id']         = $task_id;
        $this->load->view('jobs/task-details', $this->page_data);
    }

    public function reassign_task($task_id, $engr_id)
    {
        $this->page_data['task_id']         = $task_id;
        $this->page_data['engr_id']         = $engr_id;
        $this->load->view('commons/header', $this->header_data);
        $this->load->view('jobs/reassign-task', $this->page_data);
        $this->load->view('commons/footer', $this->footer_data);
    }
    /**
     * Resident satisfaction survey — public page, no login required.
     *
     * URL (full):  /survey/{token}
     * URL (short): /s/{token}
     *
     * The token is validated by the API (/api/survey/form/{token}).
     * This controller simply serves the HTML shell; all data loading
     * and answer submission happen via JavaScript calling the API.
     *
     * @param string $token  SHA-256 token embedded in the email/SMS link
     */
    public function survey_form($token = null)
    {
        if (empty($token)) {
            // No token — show a generic invalid page
            $this->load->view('jobs/survey-form', ['token' => null]);
            return;
        }

        $this->page_data['token']   = $token;
        $this->page_data['api_base'] = API_URL; // your existing API base URL constant

        // Standalone page — no header/footer chrome needed (public-facing, no sidebar)
        $this->load->view('jobs/survey-form', $this->page_data);
    }

    /**
     * LBH job-completion review — public page, no login required.
     *
     * URL (full):  /lbh-review/{token}
     * URL (short): /lr/{token}
     *
     * The token is validated by the API (/api/lbh-review/form/{token}). This
     * controller serves the HTML shell; the PDF summary and Approve/Reject
     * decision are loaded/submitted via JavaScript calling the API.
     *
     * @param string $token  token embedded in the review link
     */
    public function lbh_review_form($token = null)
    {
        if (empty($token)) {
            $this->load->view('jobs/lbh-review', ['token' => null, 'api_base' => API_URL]);
            return;
        }

        $this->page_data['token']    = $token;
        $this->page_data['api_base'] = API_URL;

        $this->load->view('jobs/lbh-review', $this->page_data);
    }
}
