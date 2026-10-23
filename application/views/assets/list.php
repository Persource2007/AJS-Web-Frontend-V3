<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->

<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>

<div class="main-content dataTables-height-detiles">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
                require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->
            
            <div class="same-page-height dataTables-height">
                <div>
                        <?php
                        if (!empty($client_id))
                        {
                            $this->load->view('clients/inc/nav-tab', ['encoded_id' => $encoded_id]);
                        } else {
                            $this->load->view('system/inc/secondary-nav', ['bc_title' => 'Properties']);
                        }
                        ?>
                        <!-- Tab panes -->
                        <div class="tab-content text-muted">
                            <div class="tab-pane active" id="properties" role="tabpanel">
                                <div class="card" id="tasksList">
                                    <?php
                                        $this->load->view('property/inc/sub-nav-tab', ['client_id' => $client_id, 'property_id' => $property_id]);
                                        ?>
                                    <div class="card-body pt-0 assets-setting-btn">
                                        

                                        <!-- Tab panes -->
                                        <div class="tab-content text-muted pt-0">
                                            <div class="tab-pane active" id="assets1" role="tabpanel">
<!--                                                <div class="mb-4">
                                                     <b id="page-title" >UPRN: #1234 </b> 
                                                </div>-->

                                                <?php
                                                require_once APPPATH . 'views/assets/inc/bulk-upload-form.php';
                                                ?>

                                                <div class="table-responsive assets-datatables-main">
                                                    <table id="assets-datatables" class="display table dt-responsive align-middle table-nowrap mb-0">
                                                        <thead class="table-light text-muted">
                                                            <tr>
                                                                <th></th>
                                                                <th>Id</th>
                                                                <th>Location On Site</th>
                                                                <th>Client Asset Number</th>
                                                                <th>Property UPRN</th>
                                                                <th>Serial Number</th>
                                                                <th>Equipment Type</th>
                                                                <th>Quantity</th>
                                                                <!-- <th>SOR Code</th> -->
                                                                <th>Installation Date</th>
                                                                <th>Expiry Date</th>
                                                                <th>Mfr. Warranty Expiry</th>
                                                                <th>Our Warranty Expiry</th>                                                                
                                                            </tr>
                                                        </thead>
                                                    </table>
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
    <input type="hidden" id="property_id" value="<?= $property_id ?? null ?>" />
    <input type="hidden" id="client_id" value="<?= $client_id ?? null ?>" />

    <script src="<?= cnd_url(); ?>assets/libs/dropzone/dropzone-min.js"></script>

    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/assets.js?v=1.1') ?>"></script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
    <!-- End Page-content -->
    <script type="text/javascript">
        $('.client-sub-nav').find('a[data-tab="client-properties"]').addClass('active');
        $('.property-sub-nav').find('a[data-tab="property-assets"]').addClass('active');
    </script>