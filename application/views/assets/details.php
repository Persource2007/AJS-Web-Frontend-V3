client-details-listing<!-- ============================================================== -->
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
                    <div>
                        <?php
                        $url_prefix = '';
                        if (!empty($client_id)) {
                            $url_prefix = 'clients/' . hash_encode($client_id) ;
                            $this->load->view('clients/inc/nav-tab', ['id' => $client_id]);
                        } else {
                            $this->load->view('system/inc/secondary-nav', ['bc_title' => 'Properties']);
                        }
                        ?>
                        <!-- Tab panes -->
                        <div class="tab-content pt-0 text-muted">
                            <div class="tab-pane active" id="properties" role="tabpanel">
                                <div class="card">
                                    <?php
                                        $this->load->view('property/inc/sub-nav-tab');
                                        ?>
                                    <div class="card-body pt-0">
                                        <!-- Tab panes -->
                                        <div class="tab-content text-muted pt-0">
                                            <div class="tab-pane active" id="assets1" role="tabpanel">
                                                <div class="" id="box">
                                                    <div class="hide-section client-details-listing">
                                                        <div class="row align-items-end border border-dashed border-top-0 border-end-0 border-start-0 pb-2">
                                                            <div class="col-xxl-9 col-md-8">
                                                                <h5 class="mb-0">UPRN: <span id="detail_uprn_no"></span></h5>
                                                            </div>
                                                            <div class="col-xxl-3 col-md-4 text-end">
                                                                <a href="<?= base_url($url_prefix. '/properties/' . hash_encode($property_id) . '/assets') ?>">
                                                                    <button type="button" class="btn btn-info me-1">
                                                                        <i class="ri-arrow-left-line fs-14"></i> Back
                                                                    </button>
                                                                </a>
                                                                <button id="detail-edit-btn" data-after-load-func="asset_edit_form" data-form-url="<?= base_url('assets/edit/' . $id) ?>" data-heading="Edit Assets" type="button" class="btn btn-primary popup-form-button edit-btn">
                                                                    <i class="ri-pencil-line"></i> Edit
                                                                </button>
                                                            </div>
                                                        </div>
                                                        
                                                        <?php
                                                        require_once APPPATH . 'views/assets/detail-section.php';
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
                </div>
                <!--end col-->
            </div>
            <!--end row-->
        </div>
        <!-- container-fluid -->
    </div>
</div>