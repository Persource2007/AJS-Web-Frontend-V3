<link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap5.min.css" />
<!--datatable responsive css-->
<link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.9/css/responsive.bootstrap.min.css" />
<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>

<div class="main-content dataTables-height-detiles-">

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
                        <div class="tab-content- pt-0 text-muted">
                            <div class="same-page-height dataTables-height selling-tab" id="quotation-tab" role="tabpanel">
                                <div class="card" id="tasksList">
                                    <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3 quotation-setting-btn"> 
                                        <?php
                                            require_once APPPATH . 'views/quotations/inc/filters.php';
                                            ?>
                                            <div class="row sub-filter-menu">
                                                <div class="col-xxl-9 col-sm-8 ">
                                                  
                                                </div>
                                                <div class="col-xxl-3 col-sm-4 text-end">
                                                    
                                                </div>
                                            </div>
                                            <!--end row-->
                                    </div>
                                    <div class="card-body pt-0 same-position-btn- all-tbl-same-width2" style="padding-top: 10px !important;">
                                        <table class="table align-middle table-nowrap mb-0 display quotation-listing-table table-hover task-pending-main" id="quotation-datatables" style="">
                                            <thead class="table-light text-muted">
                                                <tr>
                                                    <th></th>
                                                    <th>Id</th>
                                                    <th>Quote. No.</th>
                                                    <th>Client</th>
                                                    <th>Property</th>
                                                    <th>Job Ref#</th>
                                                    <th>Date Logged</th>
                                                    <th>Expiry Date</th>
                                                    <th>Version</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
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
                </div>
                <!--end col-->
            </div>
            <!--end row-->

        </div>
        <!-- container-fluid -->
    </div>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/quotations/quotation.js') ?>"></script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
    <script type="text/javascript" src="<?= cnd_url('assets/libs/dropzone/dropzone-min.js'); ?>"></script>
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