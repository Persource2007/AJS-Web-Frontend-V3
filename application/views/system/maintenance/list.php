<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
<div class="main-content dataTables-height-detiles">

    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            $bc_title = 'Maintenance';
            ?>
            <!-- end page title -->

            <div class="same-page-height dataTables-height">
                <div>
                    <?php
                    include_once APPPATH . 'views/system/inc/secondary-nav.php';
                    ?>
                    <!-- Tab panes -->
                    <div class="tab-content text-muted">
                        <div class="tab-pane active selling-tab master-tab" id="maintenance" role="tabpanel">
                            <div class="card">
                                <div class="card-body">
                                    <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 p-0 pb-3 mb-3">
                                        <div class="row align-items-end">
                                            <div class="col-xxl-10 col-md-10">
                                                <h5 class="mb-0">Maintenance</h5>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row h-100 master-div mt-3">
                                        <div class="col-lg-3 col-md-6 mb-3">
                                            <a href="<?= base_url('system/maintenance/update-property-uprn') ?>" >
                                                <div class="card master-card">
                                                    <div class="card-body card-inner">
                                                        <div class="d-flex align-items-center">
                                                            <div class="flex-grow-1 ms-3">
                                                                <p class="text-uppercase fw-semibold fs-13 mb-1">Update Property UPRN</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <!-- <div class="col-lg-3 col-md-6 mb-3">
                                            <a href="#" >
                                                <div class="card master-card">
                                                    <div class="card-body card-inner">
                                                        <div class="d-flex align-items-center">
                                                            <div class="flex-grow-1 ms-3">
                                                                <p class="text-uppercase fw-semibold fs-13 mb-1">Move Property to another client</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div> -->
                                    </div>
                                </div>
                                <!--end card-body-->
                            </div>
                            <!--end card-->
                        </div>
                        <!--end tab-pane-->
                    </div>
                    <!--end tab-content-->
                </div>
                <!--end col-->
            </div>
            <!--end row-->

        </div>
        <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/systems/maintenance.js') ?>"></script>
    <script type="text/javascript">
        $(document).ready(function(e) {
        });
    </script>