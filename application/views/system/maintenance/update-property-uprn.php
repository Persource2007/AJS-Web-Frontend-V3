<div class="main-content">

    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            $bc_title = 'Maintenance';
            include_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->

            <div class="same-page-height">
                <div>
                    <?php include_once APPPATH . 'views/system/inc/secondary-nav.php'; ?>
                    <!-- Tab panes -->
                    <div class="tab-content text-muted">
                        <div class="tab-pane active selling-tab" id="system-sor" role="tabpanel">
                            <div class="card">
                                <div class="card-body pt-0  all-tbl-same-width">
                                    <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 p-0 mb-3">
                                        <div class="card-body ps-0 pe-0 pt-0" style="padding-top: 0px !important; padding-bottom: 0px !important;">
                                            <div class="row">
                                                <div class="flex-grow-1 ms-3">
                                                    <p class="text-uppercase fw-semibold fs-13 mb-1">Update Property UPRN</p>
                                                </div>
                                                <div>
                                                    <!-- <div class="btn-group ms-1">
                                                        <button type="button" class="btn btn-secondary waves-effect waves-light ms-1 dropdown-toggle d-flex- import-btn" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="Import">
                                                            <i class="las la-file-import"></i> import
                                                        </button>
                                                        <div class="dropdown-menu dropdown-menu-md p-4">
                                                            <form action="" method="POST" data-upload-type="property-uprn" data-file-type="excel" class="bulk-upload-form" enctype="multipart/form-data">
                                                                <div class="mb-2">
                                                                    <label class="form-label" for="search_preset_label">Import</label>
                                                                    <div class="input-group custom-file-button" style="width: 100%;">
                                                                        <input required="true" autocomplete="off" name="upload" id="upload" type="file" class="form-control">
                                                                        <label class="input-group-text mb-0" for="upload">Browse</label>
                                                                    </div>
                                                                </div>
                                                                <div class="">
                                                                    <div class="hstack gap-2 mt-2">
                                                                        <button type="submit" class="btn btn-secondary w-50 ">Upload</button>
                                                                        <a class="btn bulk-upload-template-button btn-outline-dark w-50 ">Template</a>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div> -->
                                                    <div class="col-lg-3 p-4">
                                                            <form action="" method="POST" data-upload-type="property-uprn" data-file-type="excel" class="bulk-upload-form" enctype="multipart/form-data">
                                                                <div class="mb-2">
                                                                    <label class="form-label" for="search_preset_label">Import</label>
                                                                    <div class="input-group custom-file-button" style="width: 100%;">
                                                                        <input required="true" autocomplete="off" name="upload" id="upload" type="file" class="form-control">
                                                                        <label class="input-group-text mb-0" for="upload">Browse</label>
                                                                    </div>
                                                                </div>
                                                                <div class="">
                                                                    <div class="hstack gap-2 mt-2">
                                                                        <button type="submit" class="btn btn-secondary w-50 ">Upload</button>
                                                                        <a class="btn bulk-upload-template-button btn-outline-dark w-50 " href="<?= app_url('resources/templates/ajs-property-uprn.xlsx'); ?>">Template</a>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                </div>
                                            </div>
                                        </div>

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
</div>
<!-- End Page-content -->

<!-- End Page-content -->
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/systems/maintenance.js') ?>"></script>