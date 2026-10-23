<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->

            <div class="row">
                <div class="col-lg-12">
                    <div class="same-page-height">
                        <?php
                        require_once APPPATH . 'views/clients/inc/nav-tab.php';
                        ?>
                        <!-- Tab panes -->
                        <div class="tab-content text-muted">
                            <div class="tab-pane active" id="client" role="tabpanel">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="" id="box">
                                            <div class="hide-section client-details-listing">
                                                <div class="row align-items-end card-header border border-dashed border-top-0 border-end-0 border-start-0 p-0 pb-3 mb-3">
                                                    <div class="col-xxl-9 col-md-9">
                                                        <h5 class="mb-0" id="company_name_header">Client Name</h5>
                                                    </div>
                                                    <div class="col-xxl-3 col-md-3 text-end">
                                                        <a href="<?= base_url('clients/list') ?>">
                                                            <button type="button" class="btn btn-info me-1">
                                                                <i class="ri-arrow-left-line fs-14"></i> Back
                                                            </button>
                                                        </a>

                                                        <button data-after-load-func="client_edit_form" data-form-url="<?= base_url('clients/edit/' . $id) ?>" data-heading="Edit Client"  type="button" class="btn btn-primary popup-form-button edit-btn" >
                                                            <i class="ri-pencil-line"></i> Edit
                                                        </button>
                                                    </div>
                                                </div>
                                                <?php
                                                require_once APPPATH . 'views/clients/detail-section.php';
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
        <!-- container-fluid -->
    </div>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/clients.js') ?>"></script>