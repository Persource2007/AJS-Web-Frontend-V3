<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content">

    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <!-- <div class="row">
                <div class="col-12">
                    <div class="page-title-box d-sm-flex align-items-center justify-content-between">

                        <div class="page-title-right">
                            <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item"><a href="javascript: void(0);">Resources Set up</a></li>
                                <li class="breadcrumb-item active">Clients List</li>
                            </ol>
                        </div>

                    </div>
                </div>
            </div> -->
            <?php
            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <?php
            if (isset($bulk_preview) && isset($bulk_preview_html)) {
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
                                $data = array('parsed_data' => $parsed_data);
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

            <div class="same-page-height dataTables-height">
                <div class="card" id="tasksList">
                    <?php
                    require_once APPPATH . 'views/clients/inc/bulk-upload-form.php';
                    ?>
                    <!--end card-body-->
                    <div class="card-body pt-0 same-position-btn-" style="padding-top: 10px !important;">
                        <div class="table-responsive mb-0 all-tbl-same-width2">
                            <table id="ajax-datatables" class="display table dt-responsive align-middle table-nowrap mb-0 table-hover" >
                                <thead class="table-light text-muted">
                                    <tr>
                                        <th></th>
                                        <!-- <th></th> -->
                                        <th>Id</th>
                                        <th style="width:150px;">Company</th>
                                        <th>Client Code</th>
                                        <!-- <th>Reg. No</th> -->
                                        <!-- <th>VAT No</th> -->
                                        <th>Tags</th>
                                        <th>Client Type</th>
                                        <th>Address</th>
                                        <!--<th>Town</th>-->
                                        <th>Postcode</th>
                                        <!-- <th>Email</th>
                                        <th>Telephone</th> -->
                                        <th>Created By</th>
                                        <th>Created On</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div class="d-flex justify-content-end mt-2">
                            <!-- <div class="pagination-wrap hstack gap-2">
                                <a class="page-item pagination-prev disabled" href="#">
                                    Previous
                                </a>
                                <ul class="pagination listjs-pagination mb-0"></ul>
                                <a class="page-item pagination-next" href="#">
                                    Next
                                </a>
                            </div>-->
                        </div>
                    </div>
                    <!--end card-body-->
                </div>
                <!--end col-->
            </div>
            <!--end row-->
        </div>
        <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/clients.js') ?>"></script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script> 
    <script type="text/javascript">
        $(document).ready(function (e) {
            var hash = window.location.hash;
            if (hash) {
                hash = hash.replace('#', ''); // strip the # at the beginning of the string
                if (hash == 'add')
                {
                    $('button.popup-form-button').trigger('click');
                }
            }
        }); 
    </script>
