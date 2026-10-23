<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Maintenance extends CI_Controller
{

    function __construct()
    {
        parent::__construct();
    }

    public function index($view_page = 'index')
    {
        $multiview = array('view_files' =>
            array(
                0 => array('view' => 'app/maintenance', 'data' => array()),
            )
        );

        custom_multiview($multiview, array(), false);
    }

}
