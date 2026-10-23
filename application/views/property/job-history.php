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
                    if (!empty($client_id)) {
                        $this->load->view('clients/inc/nav-tab', ['id' => $client_id]);
                    } else {
                        $this->load->view('system/inc/secondary-nav', ['bc_title' => 'Properties']);
                    }
                    ?>
                    <!-- Tab panes -->
                    <div class="tab-content text-muted">
                        <div class="tab-pane active" id="properties" role="tabpanel">
                            <div class="card">
                                <?php
                                $this->load->view('property/inc/sub-nav-tab', ['client_id' => $client_id, 'property_id' => $property_id]);
                                ?>
                                <div class="card-body pt-0">

                                    <!-- Tab panes -->
                                    <div class="tab-content text-muted pt-0">
                                        <div class="tab-pane active" id="job-history" role="tabpanel">
                                            <div class="card" style="box-shadow: none;">
                                                <div>
                                                    <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 p-0 mb-2">
                                                        <form id="form_filters" class="card-body tablelist-form ps-0 pe-0" action="" method="GET">
                                                            <div class="row g-2">
                                                                <div class="col-xxl-3 col-sm-6">
                                                                    <div class="search-box">
                                                                        <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Search By Job Id / Work Order">
                                                                        <i class="mdi mdi-magnify search-widget-icon"></i>
                                                                    </div>
                                                                </div>
                                                                <?php if (!$is_job_history) { ?>
                                                                    <div class="col-xxl-2 col-sm-4">
                                                                        <div class="input-light">
                                                                            <select class="form-control search" name="mv.master_value" data-choices data-choices-search-false>
                                                                                <option value="all" >All Status</option>
                                                                                <option value="open" selected>Open</option>
                                                                                <option value="in progress">In Progress</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                <?php } ?>
                                                                <div class="col-xxl-1 col-sm-2">
                                                                    <button class="btn btn-primary px-2 waves-effect waves-light" id="search_grid" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>


                                                    <!--end row-->
                                                    <div class="assets-datatables-main">
                                                        <table class="table align-middle table-nowrap mb-0" id="job-datatables">
                                                            <thead class="table-light text-muted">
                                                                <tr>
                                                                    <th>Id</th>
                                                                    <th><span class="ps-3">Job Id</span></th>
                                                                    <th>Work Order</th>
                                                                    <th>Type</th>
                                                                    <th>Job</th>
                                                                    <th>Target Date</th>
                                                                    <th>Created Date</th>
                                                                    <th>Status</th>
                                                                </tr>
                                                            </thead>
                                                        </table>
                                                    </div>

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
    <input type="hidden" id="property_id" value="<?= $property_id ?? null ?>" />
    <input type="hidden" id="client_id" value="<?= $client_id ?? null ?>" />
    <input type="hidden" id="is_job_history" value="<?= $is_job_history ?? true ?>" />
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/property-job-history.js') ?>"></script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
    <!-- End Page-content -->
    <script type="text/javascript">
        $('.client-sub-nav').find('a[data-tab="client-properties"]').addClass('active');
        if ($('#is_job_history').val() == true) {
            $('.property-sub-nav').find('a[data-tab="job-history"]').addClass('active');
        } else {
            $('.property-sub-nav').find('a[data-tab="upcoming-jobs"]').addClass('active');
        }
    </script>