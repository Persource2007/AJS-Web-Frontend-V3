<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <?php
            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- start page title -->
            <!-- end page title -->

            <div class="row">
                <div class="col-lg-12">
                    <div class="card same-page-height dataTables-height">
                        <div class="card-body border border-dashed border-top-0 border-end-0 border-start-0 pb-4 pt-3">
                            <form id="form_filters" action="" method="GET">
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <div class="btn-group">
                                            <div class="search-box" style="width: 250px;">
                                                <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Search Name / Description">
                                                <i class="ri-search-line search-icon"></i>
                                            </div>
                                        </div>
                                        <div class="btn-group ms-1">
                                            <button class="btn btn-primary waves-effect waves-light" id="search_grid" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="text-end ms-auto">
                                            <a type="button" href="<?= base_url('template/tables/create') ?>" class="btn btn-success add-btn waves-effect waves-light">
                                                <i class="ri-add-line align-bottom"></i> Add
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="row g-2">
                                    <div class="col-xxl-1 col-sm-2">
                                        <div class="input-light">
                                            <select class="form-control search" name="table_length" id="table_length">
                                                <option value="10">10</option>
                                                <option value="25">25</option>
                                                <option value="50" selected>50</option>
                                                <option value="100">100</option>
                                                <option value="250">250</option>
                                                <option value="500">500</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="card-body pt-0 all-tbl-same-width2" style="padding-top: 10px !important;">
                            <!--end row-->
                            <table class="table align-middle table-nowrap mb-0 properties-table mt-0 w-100" id="ajax-datatables">
                                <thead class="table-light text-muted">
                                    <tr>
                                        <th></th>
                                        <th>Id</th>
                                        <th>Title</th>
                                        <th>Added On</th>
                                        <th>Added By</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <!--end card-body-->
                    </div>
                </div>
                <!--end col-->
            </div>
            <!--end row-->
        </div>
        <!-- container-fluid -->
    </div>
</div>
<!-- End Page-content -->
<!-- End Page-content -->
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/certificate-table-templates.js') ?>"></script>
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