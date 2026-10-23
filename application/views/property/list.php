<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content">

    <div class="page-content">
        <div class="container-fluid">
            <div class="same-page-height dataTables-height">
            <!-- start page title -->
            <?php
                require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->
            
            <div class="row pt-0">
                <div class="col-lg-12">
                    <div>
                        <?php
                        if (!empty($client_id))
                        {
                            $this->load->view('clients/inc/nav-tab', ['id' => $client_id]);
                        } else {
                            $this->load->view('system/inc/secondary-nav', ['bc_title' => 'Properties']);
                        }
                        ?>
                        <!-- Tab panes -->
                        <div class="tab-content text-muted">
                            <div class="tab-pane active" id="properties" role="tabpanel">
                                <div>
                                    <div>
                                        <div>
                                            <?php
                                            if (isset($bulk_preview) && isset($bulk_preview_html))
                                            {
                                                ?>

                                            <div class="accordion custom-accordionwithicon bulk-preview-accordion accordion-fill-secondary" id="bulk-preview-accordion">
                                                    <div class="accordion-item">
                                                        <h2 class="accordion-header" id="accordionwithplusExample1">
                                                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accor_plusExamplecollapse1" aria-controls="accor_plusExamplecollapse1">
                                                                <i class="ri-arrow-down-circle-line fs-16"></i>&nbsp;Preview Uploaded Data
                                                            </button>

                                                            </h2>
                                                            <div id="accor_plusExamplecollapse1" class="accordion-collapse collapse" aria-labelledby="accordionwithplusExample1" data-bs-parent="#accordionWithplusicon">
                                                                <div class="accordion-body">
                                                                    <?php
                                                                    $parsed_data = json_decode($bulk_preview_batch['upload_data'], true);
                                                                    $data        = array('parsed_data' => $parsed_data);
                                                                    include APPPATH . 'views/app/bulk-preview.php';
                                                                    ?>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <?php
                                                }
                                                ?>
                                                <!-- end page title -->

                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="card property-list-main-tbl property-setting-btn" id="tasksList">
                                                        <?php
                                                        require_once APPPATH . 'views/property/inc/bulk-upload-form.php';
                                                        ?>
                                                        <!--   <div class="card-header border-bottom-0 pb-0 pt-2">
                                                            <div class="row align-items-center">
                                                                <div class="col-xxl-9 col-sm-6">
                                                                    <div class="d-flex align-items-center">
                                                                        <h5 class="card-title mb-0 flex-grow-1">All Properties</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>-->
                                                        
                                                        <!--end card-body-->
                                                        <div class="card-body pt-0" style="padding-top: 10px !important;">
                                                            <div class="table-responsive mb-0 all-tbl-same-width2">
                                                                <table id="property-datatables" class="display table dt-responsive align-middle table-nowrap mb-0 table-hover">
                                                                    <thead class="table-light text-muted">
                                                                        <tr>
                                                                            <!-- <th>Action</th> -->
                                                                            <th></th>
                                                                            <th>Id</th>
                                                                            <th>UPRN</th>
                                                                            <th>Open Jobs</th>
                                                                            <th>Client Code</th>
                                                                            <th>Address</th>
                                                                            <!-- <th>Area</th>
                                                                            <th>Town</th> -->
                                                                            <th>Postcode</th>
                                                                            <th>Resident</th>
                                                                            <th>Phone</th>
                                                                            <th>Email</th>
                                                                            <th>Property Type</th>
                                                                            <th>Assets</th>
                                                                        </tr>
                                                                    </thead>
                                                                </table>
                                                            </div>
                                                            <div class="d-flex justify-content-end mt-2">
                                                            </div>
                                                        </div>
                                                        <!--end card-body-->
                                                    </div>
                                                    <!--end card-->
                                                </div>
                                                <!--end col-->
                                            </div>
                                            <!--end row-->
                                        </div>
                                        <!--end row-->
                                    </div>
                                    <!--end card-body-->
                                </div>
                                <!--end card-->
                            </div>
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
    <input type="hidden" id="client_id" name="client_id" autocomplete="off" value="<?= $client_id ?? '0' ?>" />
    <input type="hidden" id="client_id_hidden" data-paraname="client_properties.client_id" value="<?= $client_id ?? '0' ?>" />
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/property.js?v=1.0.2') ?>"></script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
    <!-- End Page-content -->
    <script type="text/javascript">
        $('.client-sub-nav').find('a[data-tab="client-properties"]').addClass('active');
    </script>
