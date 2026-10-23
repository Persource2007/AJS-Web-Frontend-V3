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

            <div class="row">
                <div class="col-lg-12">
                    <div>
                        <!-- Tab panes -->
                        <div class="">
                            <div class="same-page-height dataTables-height" id="contractor-tab" role="tabpanel">
                                <div class="card" id="tasksList">
                                    <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3 mb-2">
                                            <?php
                                            require_once APPPATH . 'views/contractors/inc/filters.php';
                                            ?>
                                        </div>
                                        <div class="card-body pt-0 same-position-btn- contractor-setting-btn all-tbl-same-width1" style="padding-top: 10px !important;">
                                            <div class="table-responsive mb-0">
                                                <table class="card-body table align-middle table-nowrap mb-0 p-0 table-hover" id="contractor-datatables" style="margin-top: 0px !important; padding-top: 0px !important;">
                                                    <thead class="table-light text-muted">
                                                        <tr>
                                                            <th></th>
                                                            <th>Id</th>
                                                            <th>Name</th>
                                                            <th>Job Type</th>
                                                            <th>Email</th>
                                                            <th>Mobile</th>
                                                            <th>Address</th>
                                                            <th>Town</th>
                                                        </tr>
                                                    </thead>
                                                </table>
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
                </div>
                <!--end col-->
            </div>
            <!--end row-->
        </div>
        <!-- container-fluid -->
    </div>
    <!-- End Page-content -->

    <!-- End Page-content -->
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contractors/contractor.js') ?>"></script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
    <script type="text/javascript">
        $(document).ready(function(e) {
            var hash = window.location.hash;
            if (hash) {
                hash = hash.replace('#', ''); // strip the # at the beginning of the string
                if (hash == 'add') {
                    $('button.popup-form-button').trigger('click');
                }
            }
        });
    </script>