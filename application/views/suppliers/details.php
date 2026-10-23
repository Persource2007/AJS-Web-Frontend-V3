<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <div class="same-page-height">
                <div>
                    <?php
                    $title = "Supplier";
                    require_once APPPATH . 'views/suppliers/inc/nav-tab.php';
                    ?>
                    <!-- Tab panes -->
                    <div class="tab-content text-muted">
                        <div class="tab-pane active" role="tabpanel">
                            <div class="card">
                                <div class="card-body">
                                    <div class="" id="box">
                                        <div class="hide-section">
                                            <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-0 ps-0 pe-0 mb-3">
                                                <div class="d-flex justify-content-between align-items-end">
                                                    <div>
                                                        <div class="btn-group me-1 mb-2">
                                                            <h5 class="mb-0" id="detail_code">Code</h5>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div class="hstack gap-1 justify-content-end">
                                                            <a href="<?= base_url('supplier/list') ?>" >
                                                                <button type="button" class="btn btn-info me-1">
                                                                    <i class="ri-arrow-left-line fs-14"></i> Back
                                                                </button>
                                                            </a>
                                                            <button data-after-load-func="edit_form" data-form-url="<?= base_url('supplier/edit/' . hash_encode($id)) ?>" data-heading="Edit Supplier"  type="button" class="btn btn-primary popup-form-button edit-btn" id="detail-edit-btn">
                                                                <i class="ri-pencil-line"></i> Edit
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <?php
                                            require_once APPPATH . 'views/suppliers/detail-section.php';
                                            ?>
                                        </div>
                                    </div>
                                    <!--end row-->
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
