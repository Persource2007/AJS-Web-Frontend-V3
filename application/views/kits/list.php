<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            $bc_title = 'Kits';
            include_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->

            <div class="row">
                <div class="col-lg-12">
                    <div class="same-page-height dataTables-height">
                        <!-- Tab panes -->
                        <div class="tab-content- pt-0 text-muted">
                            <div class="tab-pane active selling-tab" id="kit-tab" role="tabpanel">
                                <div class="card" id="tasksList">
                                    <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3">
                                        <?php
                                        require_once APPPATH . 'views/kits/inc/filters.php';
                                        ?>
                                    </div>
                                    <div class="card-body pt-0 kit-setting-btn- all-tbl-same-width1 all-tbl-same-width-kit-tbl" style="padding-top: 10px !important;">
                                        <div class="table-responsive">
                                            <table class="table align-middle dt-responsive table-nowrap mb-0  w-100" id="kit-datatables" style="">
                                                <thead class="table-light text-muted">
                                                    <tr>
                                                        <th></th>
                                                        <th>Id</th>
                                                        <th>Title</th>
                                                        <th>Type</th>
                                                        <th>Price Type</th>
                                                        <th>SOR Code</th>
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
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/kits/kit.js') ?>"></script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/kits/kit-items.js') ?>"></script>
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