<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Downloads extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->helper('report/excel');
    }

    public function process_download_queue()
    {
        $pending_queue = pending_download_queue();
        if ($pending_queue)
        {
            foreach ($pending_queue as $pq)
            {
                $filename     = $pq->file_name;
                $data         = array();
                $data['data'] = $this->cache->redis->get('download_queue_' . $pq->id);
                $file_name    = generate_excel($data, 'excel-report', $filename);
                if ($file_name && trim($file_name) != '')
                {
                    //change_queue_status($pq->id, '1');
                    add_notification('download', "Your file is ready to download <a href='" . base_url('temp-reports/' . $file_name) . "'>Click here</a> to download the file", $pq->user_id);
                }
                else
                {
                    change_queue_status($$pq->id, '2');
                }
            }
        }
    }

}
