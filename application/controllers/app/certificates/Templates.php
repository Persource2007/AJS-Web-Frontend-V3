<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Templates extends CI_Controller {

	private $header_data = [];
	private $page_data = [];
	private $footer_data = [];

	public function __construct() {
		parent::__construct();
		//__is_logged_in(true);
		if (PAGE_CACHING) {
			$this->output->cache(PAGE_CACHE_TIMEOUT);
		}
	}

	public function table_template_list() {
		$get = $this->input->get();
		$this->load->view('commons/header', $this->header_data);
		$this->load->view('certificates/templates/table/list', $this->page_data);
		$this->load->view('commons/footer', $this->footer_data);
	}

	public function add_table_templates($id = 0) {
		if ($id && $id > 0) {
			$this->page_data['duplicate_id'] = $id;
		}
		$get = $this->input->get();
		$this->load->view('commons/header', $this->header_data);
		$this->load->view('certificates/templates/table/create', $this->page_data);
		$this->load->view('commons/footer', $this->footer_data);
	}

	public function edit_table_templates($id) {
		$get = $this->input->get();
		$this->page_data['id'] = $id;
		$this->load->view('commons/header', $this->header_data);
		$this->load->view('certificates/templates/table/edit', $this->page_data);
		$this->load->view('commons/footer', $this->footer_data);
	}

	public function list() {
		$get = $this->input->get();
		$this->load->view('commons/header', $this->header_data);
		$this->load->view('certificates/templates/list', $this->page_data);
		$this->load->view('commons/footer', $this->footer_data);
	}

	public function headers_list() {
		$get = $this->input->get();
		$this->load->view('commons/header', $this->header_data);
		$this->load->view('certificates/templates/header_list', $this->page_data);
		$this->load->view('commons/footer', $this->footer_data);
	}

	public function footers_list() {
		$get = $this->input->get();
		$this->load->view('commons/header', $this->header_data);
		$this->load->view('certificates/templates/footers_list', $this->page_data);
		$this->load->view('commons/footer', $this->footer_data);
	}

	public function create($id = 0) {
		if ($id && $id > 0) {
			$this->page_data['duplicate_id'] = $id;
		}
		$this->load->view('commons/header', $this->header_data);
		$this->load->view('certificates/templates/create', $this->page_data);
		$this->load->view('commons/footer', $this->footer_data);
	}

	public function create_old() {
		$this->load->view('commons/header', $this->header_data);
		$this->load->view('certificates/templates/create-23-03-2024', $this->page_data);
		$this->load->view('commons/footer', $this->footer_data);
	}

	public function details($id) {

		$this->page_data['id'] = $id;

		$this->load->view('commons/header', $this->header_data);
		$this->load->view('certificates/templates/details', $this->page_data);
		$this->load->view('commons/footer', $this->footer_data);
	}

	public function edit($id) {
		if ($id && $id > 0) {
			$this->page_data['id'] = $id;
			$this->page_data['edit'] = true;
			// $this->page_data['client'] = call_api_self(base_url('client/get/' . $id), 'GET');
			$this->load->view('commons/header', $this->header_data);
			$this->load->view('certificates/templates/edit', $this->page_data);
			$this->load->view('commons/footer', $this->footer_data);
		} else {
			$this->load->view('404');
		}
	}
}
