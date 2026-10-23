<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->

            <div class="same-page-height dataTables-height">
                <div>
                    <!-- Tab panes -->
                    <div class="tab-content text-muted">
                        <div class="tab-pane active selling-tab" id="job-tab" role="tabpanel">
                            <div class="card all-tbl-same-width1" id="tasksList">
                                <div class="card-body pt-0 warehouse-setting-btn">
                                    <?php
                                    require_once APPPATH . 'views/locations/warehouses/inc/filters.php';
                                    ?>

                                    <!--end row-->
                                    <table class="card-body table dt-responsive table align-middle table-nowrap mb-0 p-0 table-hover" id="ajax-datatables" style="margin-top: 0px !important; padding-top: 0px !important;">
                                        <thead class="table-light text-muted">
                                            <tr>
                                                <th></th>
                                                <th>Id</th>
                                                <th>Title</th>
                                                <th>Code</th>
                                                <th>Address</th>
                                                <th>Postcode</th>
                                                <th>Town</th>
                                                <th>Mobile</th>
                                                <th>Stocks</th>                                                
                                            </tr>
                                        </thead>
                                    </table>
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

    <!-- End Page-content -->
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/locations/warehouses.js') ?>"></script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
    <script type="text/javascript">
        $(document).ready(function (e) {
            var hash = window.location.hash;
            if (hash) {
                hash = hash.replace('#', ''); // strip the # at the beginning of the string
                if (hash == 'add') {
                    $('button.popup-form-button').trigger('click');
                }
            }
        });
    </script>