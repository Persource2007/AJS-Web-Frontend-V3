<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <div class="same-page-height">
            <!-- start page title -->
            <?php
                require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->

            <div class="row">
                <div class="col-lg-12">
                    <div>
                        <?php
                            $title = "Overview";

                            if (!empty($client_id)) {

                                require_once APPPATH . 'views/clients/inc/nav-tab.php';
                            } else {
                                require_once APPPATH . 'views/contracts/inc/detail-nav-tab.php';
                            }
                        ?>
                        <!-- Tab panes -->
                        <div class="tab-content text-muted">
                            <div class="tab-pane active" id="client" role="tabpanel">
                                <div class="card">
                                <?php
                                    $back_url = 'contract/list';
                                    if (!empty($client_id)) {
                                        $this->load->view('contracts/inc/detail-sub-nav-tab', ['client_id' => $client_id, 'title' => $title]);
                                        $back_url = 'clients/' . hash_encode($client_id) . '/contract';
                                    }

                                    $edit_url = !empty($client_id) ? 'clients/' . hash_encode($client_id) . '/' : '';
                                    ?>
                                    <div class="card-body">
                                        <div class="" id="box">
                                            <div class="hide-section">
                                                <div class="row align-items-end card-header border border-dashed border-top-0 border-end-0 border-start-0 p-0 pb-3 mb-3">
                                                    <div class="col-xxl-9 col-md-7">
                                                        <h5 class="mb-0" id="contract_no_header">Contract Number</h5>
                                                    </div>
                                                    <div class="col-xxl-3 col-md-5 text-end">
                                                        <a href="<?= base_url($back_url) ?>" >
                                                            <button type="button" class="btn btn-info me-1">
                                                                <i class="ri-arrow-left-line fs-14"></i> Back
                                                            </button>
                                                        </a>
                                                        <a href="<?= base_url($edit_url.'contract/edit/' . hash_encode($id)) ?>"   class="btn btn-primary edit-btn" >
                                                            <i class="ri-pencil-line"></i> Edit Contract
                                                        </a>
                                                        <button id="add-job" type="button" data-heading="Add New Job" data-after-load-func="create_job_form" data-form-url="<?= cdn_url('job/create?in_popup=1') ?>" class="popup-form-button btn btn-success new-job-btn waves-effect waves-light ms-1">
                                                            <i class="ri-add-line align-bottom"></i> Add Job
                                                        </button>
                                                    </div>
                                                </div>
                                                <?php
                                                    require_once APPPATH . 'views/contracts/detail-section.php';
                                                ?>
                                            </div>
                                        </div>
                                        <!--end row-->
                                    </div>
                                    <!--end card-body-->
                                </div>
                                <!--end card-->
                            </div>
                            <!--end tab-pane-->
                        </div>
                        <!--end tab-content-->
                    </div>
                </div>
                <!--end col-->
            </div>
            <!--end row-->
            </div>
        </div>
        <!-- container-fluid -->
    </div>
