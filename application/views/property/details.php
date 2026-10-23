<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <!-- <div class="row">
                <div class="col-12">
                    <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 class="mb-sm-0">Property Details</h4>

                        <div class="page-title-right">
                            <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item"><a href="javascript: void(0);">Resources Set up</a></li>
                                <li class="breadcrumb-item active">Property Details</li>
                            </ol>
                        </div>

                    </div>
                </div>
            </div> -->
            <?php
            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->

            <div class="same-page-height">
                <div>
                        <?php
                        $back_url = 'properties/list';
                        if (!empty($client_id)) {
                            $this->load->view('clients/inc/nav-tab', ['id' => $client_id]);

                            $back_url = 'clients/' . hash_encode($client_id) . '/properties';
                        } else {
                            $this->load->view('system/inc/secondary-nav', ['bc_title' => 'Properties']);
                        }
                        ?>
                        <!-- Tab panes -->
                        <div class="tab-content text-muted">
                            <div class="tab-pane active" id="properties" role="tabpanel">
                                <div class="card">
                                    <?php
                                    $this->load->view('property/inc/sub-nav-tab', ['client_id' => $client_id, 'property_id' => $id]);
                                    ?>
                                    <div class="card-body position-relative">
                                        <!-- Tab panes -->
                                        <div class="tab-content text-muted pt-0">
                                            <div class="tab-pane active" id="property1" role="tabpanel">
                                                <div class="" id="box">
                                                    <div class="hide-section">
                                                        <div class="row align-items-center card-header border border-dashed border-top-0 border-end-0 border-start-0 p-0 pb-2">
                                                            <div class="col-xxl-8 col-md-8">
                                                                <h5 class="mb-0">Details</h5>
                                                            </div>
                                                            <div class="col-xxl-4 col-md-4 text-end">
                                                                <!-- <a href="" class="sub-property-btn sub-property-back-btn">
                                                                    <button type="button" class="btn btn-info me-1">
                                                                        <i class="ri-arrow-left-line fs-14"></i> Back
                                                                    </button>
                                                                </a> -->
                                                                <button type="button" id="property-back-btn" class="btn btn-info me-1">
                                                                    <i class="ri-arrow-left-line fs-14"></i> Back
                                                                </button>
                                                                <button id="detail-edit-btn" data-after-load-func="property_edit_form" data-form-url="<?= base_url('properties/edit/' . $id) ?>" data-heading="Edit Property"  type="button" class="btn btn-primary popup-form-button sub-property-btn edit-btn sub-property-back-btn me-1" >
                                                                    <i class="ri-pencil-line"></i> Edit Property
                                                                </button>
                                                                <button type="button" data-heading="Add New Job" data-after-load-func="create_job_form" data-form-url="<?= cdn_url('job/create?in_popup=1') ?>" class="popup-form-button btn btn-success new-job-btn waves-effect waves-light">
                                                                    <i class="ri-add-line align-bottom"></i> Add Job
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <?php
                                                        require_once APPPATH . 'views/property/detail-section.php';
                                                        ?>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!--end card-body-->
                            </div>
                        </div>
                        <!--end tab-content-->
                    </div>
                <!--end col-->
            </div>
            <!--end row-->
        </div>
        <!-- container-fluid -->
    </div>
</div>
<!-- use for add job -->
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/jobs/job.js?v=1.5') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/property.js') ?>"></script>
<script type="text/javascript" src="<?= cnd_url('assets/libs/dropzone/dropzone-min.js'); ?>"></script>
<script>
    $(document).on("click", "#property-back-btn", function (e) {
        e.preventDefault();
        if (window.history.length > 1 && document.referrer) {
            window.history.back();
        } else {
            window.location.href = "<?= base_url($back_url) ?>";
        }
    });
</script>