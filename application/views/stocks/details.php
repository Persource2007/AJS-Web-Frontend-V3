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
                            $title = "Stock";
                            require_once APPPATH . 'views/stocks/inc/nav-tab.php';
                        ?>
                        <!-- Tab panes -->
                        <div class="tab-content text-muted">
                            <div class="tab-pane active" role="tabpanel">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="" id="box">
                                            <div class="hide-section">
                                                <div class="row align-items-end card-header border border-dashed border-top-0 border-end-0 border-start-0 p-0 pb-3">
                                                    <div class="col-xxl-9 col-md-8">
                                                        <h5 class="mb-0" id="detail_stock_code">Stock Code</h5>
                                                    </div>
                                                    <div class="col-xxl-3 col-md-4 text-end">
                                                        <a href="<?= base_url('stock/list') ?>" class="ms-1">
                                                            <button type="button" class="btn btn-info me-1">
                                                                <i class="ri-arrow-left-line fs-14"></i> Back
                                                            </button>
                                                        </a>
                                                        <button data-after-load-func="edit_form" data-form-url="<?= base_url('stock/edit/' . hash_encode($id)) ?>" data-heading="Edit Stock"  type="button" class="btn btn-primary popup-form-button edit-btn" id="detail-edit-btn">
                                                            <i class="ri-pencil-line"></i> Edit
                                                        </button>
                                                    </div>
                                                </div>
                                                <?php
                                                    require_once APPPATH . 'views/stocks/detail-section.php';
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
