<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->

<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 class="mb-sm-0">Add New Asset</h4>
                        <div class="page-title-right">
                            <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item"><a href="javascript: void(0);">Resources Set up</a></li>
                                <li class="breadcrumb-item">Property Details</li>
                                <li class="breadcrumb-item active">Add Asset</li>
                            </ol>
                        </div>

                    </div>
                </div>
            </div>
            <!-- end page title -->

            <div class="row">
                <?php
                $action = app_url('asset/create');
                $method = 'POST';
                if (isset($edit) && $edit && isset($id) && $id > 0) {
                    $action = app_url('asset/edit/');
                }
                ?>
                <form class="tablelist-form pb-4 simplebar-form" action="<?= $action ?>" method="<?= $method ?>" id="assetForm" style="height: calc(100vh - 112px);" data-simplebar autocomplete="off">
                    <input type="hidden" value="<?= $id ?? null ?>" id="edit_id" name="edit_id" />
                    <div class="p-0 overflow-hidden pb-3">
                        <div>
                            <div class="acitivity-timeline p-4 pt-2">
                                <div class="modal-body">
                                    <div class="row gy-2" style="margin-top: 0px;">
                                        <div class="col-xxl-4 col-md-6">
                                            <div>
                                                <label class="form-label">Asset Id</label>
                                                <input type="text" class="form-control" id="asset_id" name="asset_id" readonly value="">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-6">
                                            <div class="input-light">
                                                <label class="form-label">Asset Type <span class="text-danger">*</span></label>
                                                <div class="d-flex error-div">
                                                    <select class="form-control" id="equipment_type_id" name="equipment_type_id">
                                                        <option value="" selected>Select</option>
                                                    </select>

                                                    <button type="button" class="btn btn-success ms-2 popup-form-button-master popup-add-btn" data-heading="Add New Equipment Type" data-after-load-func="create_master_form" data-element="equipment_type_id" data-form-url="<?= base_url('system/master-record/create/EQUIPMENT_TYPES') ?>"><i class="ri-add-line"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- <div class="col-xxl-4 col-md-6">
                                            <div>
                                                <label class="form-label">Stock </label>
                                                <select class="form-control select2" id="stock_id" name="stock_id">
                                                    <option value="" selected>Select</option>
                                                </select>
                                            </div>
                                        </div> -->
                                        <div class="col-xxl-4 col-md-6">
                                            <div class="input-light">
                                                <label class="form-label">Make</label>
                                                <div class="d-flex error-div">
                                                    <select class="form-control" id="make_id" name="make_id">
                                                        <option value="" selected>Select</option>
                                                    </select>

                                                    <button type="button" class="btn btn-success ms-2 popup-form-button-master" data-heading="Add New Make" data-after-load-func="create_master_form" data-element="make_id" data-form-url="<?= base_url('system/master-record/create/ASSET_MAKE') ?>"><i class="ri-add-line"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-6">
                                            <div class="input-light">
                                                <label class="form-label">Model</label>
                                                <div class="d-flex error-div">
                                                    <select class="form-control" id="model_id" name="model_id">
                                                        <option value="" selected>Select</option>
                                                    </select>

                                                    <button type="button" class="btn btn-success ms-2 popup-form-button-master" data-heading="Add New Model" data-after-load-func="create_master_form" data-element="model_id" data-form-url="<?= base_url('system/master-record/create/ASSET_MODELS') ?>"><i class="ri-add-line"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-6">
                                            <div>
                                                <label class="form-label">Serial Number</label>
                                                <input type="text" class="form-control" id="serial_number" name="serial_number">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-6">
                                            <div>
                                                <label class="form-label">Client Asset Number</label>
                                                <input type="text" class="form-control" id="client_asset_number" name="client_asset_number">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-6">
                                            <div>
                                                <label class="form-label">Quantity</label>
                                                <input type="number" class="form-control number-only" id="quantity" name="quantity">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-6">
                                            <div>
                                                <label class="form-label">Location On Site <span class="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="asset_location" name="asset_location">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-6">
                                            <div>
                                                <label class="form-label">Installation Date</label>
                                                <input type="date" class="form-control" id="installation_date" name="installation_date">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-6">
                                            <div>
                                                <label class="form-label">Expiry Date</label>
                                                <input type="date" class="form-control" id="expiry_date" name="expiry_date">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-6">
                                            <div>
                                                <label class="form-label">Manufacturer Warranty Expiry</label>
                                                <input type="date" class="form-control" id="manufacturer_warranty_expiry" name="manufacturer_warranty_expiry">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-6">
                                            <div>
                                                <label class="form-label">Our Warranty Expiry</label>
                                                <input type="date" class="form-control" id="our_warranty_expiry" name="our_warranty_expiry">
                                            </div>
                                        </div>
                                    </div>

                                    <!-- <h5 class="fs-16 mt-3 mb-0">Pricing</h5>
                                    <hr class="mt-1 mb-0">
                                    <div class="row gy-2 mt-1">
                                        <div class="col-xxl-6 col-md-6">
                                            <label class="form-label">SOR</label>
                                            <div class="d-flex error-div">
                                                <select class="form-control select2" id="sor_code" name="sor_code">
                                                    <option value="" selected>Select</option>
                                                </select>
                                                <button type="button" class="btn btn-primary ms-2 popup-form-search-button" data-heading="Search SOR" data-element="sor_code" data-after-load-func="set_sor_code" data-form-url="<?= base_url('system/sor/search-list') ?>"><i class="mdi mdi-magnify search-widget-icon"></i></button>
                                                <button type="button" class="btn btn-primary ms-2  popup-form-view-button" data-heading="View SOR" data-element="sor_code"  data-form-url="<?= base_url('system/sor/details') ?>"><i class=" ri-eye-fill  align-bottom"></i></button>
                                            </div>
                                        </div>
                                        <div style="display:none" class="col-xxl-6 col-md-6">
                                            <label class="form-label">Fixed Price SOR</label>
                                            <div class="d-flex error-div">
                                                <select class="form-control select2" id="fixed_price_sor" name="fixed_price_sor">
                                                    <option value="" selected>Select</option>
                                                </select>
                                                <button type="button" class="btn btn-primary ms-2 popup-form-search-button" data-heading="Search SOR" data-element="fixed_price_sor" data-after-load-func="set_fixed_price_sor" data-form-url="<?= base_url('system/sor/search-list') ?>"><i class="mdi mdi-magnify search-widget-icon"></i></button>
                                                <button type="button" class="btn btn-primary ms-2  popup-form-view-button" data-heading="View SOR" data-element="fixed_price_sor"  data-form-url="<?= base_url('system/sor/details') ?>"><i class=" ri-eye-fill  align-bottom"></i></button>
                                            </div>
                                        </div>
                                        <div style="display:none" class="col-xxl-4 col-md-6">
                                            <div>
                                                <label class="form-label">Fixed Price Multiplier</label>
                                                <input type="number" class="form-control number-only" id="fixed_price_multiplier" name="fixed_price_multiplier">
                                            </div>
                                        </div>
                                        <div style="display:none" class="col-xxl-4 col-md-6">
                                            <div>
                                                <label class="form-label">Pricing Model<span class="tooltip-container" data-master-code="ASSET_PRICING_MODEL"><i class="bx bx-info-circle tooltip"></i></span></label>
                                                <select class="form-control select2" id="pricing_model" name="pricing_model">
                                                    <option value="" selected>Select</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div style="display:none" class="col-xxl-6 col-md-8">
                                            <label class="form-label">Asset Price</label>
                                            <div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="asset_pricing" value="default" checked>
                                                    <label class="form-check-label">Default SOR</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="asset_pricing" value="pricing">
                                                    <label class="form-check-label">Pricing Model</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="asset_pricing" value="fixed">
                                                    <label class="form-check-label">Fixed Price</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div> -->
                                    <h5 class="fs-16 mt-3 mb-0">Asset Conditions</h5>
                                    <hr class="mt-1 mb-0">
                                    <div class="row gy-2 mt-1">
                                        <div class="col-xxl-4 col-md-6">
                                            <div>
                                                <label class="form-label">Service Frequency</label>
                                                <input type="text" class="form-control" id="service_frequency" name="service_frequency">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-6">
                                            <div>
                                                <label class="form-label">Approximate Age</label>
                                                <input type="text" class="form-control" id="approximate_age" name="approximate_age">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-6">
                                            <div class="input-light">
                                                <label class="form-label">Visual Condition</label>
                                                <div class="d-flex error-div">
                                                    <select class="form-control" id="visual_condition_id" name="visual_condition_id">
                                                        <option value="" selected>Select</option>
                                                    </select>

                                                    <button type="button" class="btn btn-success ms-2 popup-form-button-master popup-add-btn" data-heading="Add New Visual Condition" data-after-load-func="create_master_form" data-element="visual_condition_id" data-form-url="<?= base_url('system/master-record/create/VISUAL_CONDITIONS') ?>"><i class=" ri-add-line"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <h5 class="fs-16 mt-3 mb-0">Asset Descriptions</h5>
                                    <hr class="mt-1 mb-0">
                                    <div class="row gy-2 mt-1">
                                        <div class="col-xxl-4 col-md-6">
                                            <div>
                                                <label class="form-label">Description</label>
                                                <textarea type="text" class="form-control" id="description" name="description"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-6">
                                            <div>
                                                <label class="form-label">Asset Notes</label>
                                                <textarea type="text" class="form-control" id="notes" name="notes"></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <h5 class="fs-16 mt-3 mb-0">Custom Parameters <span class="tooltip-container" data-master-code="ASSET_CUSTOM_FIELDS"><i class="bx bx-info-circle tooltip"></i></span></h5>
                                    <hr class="mt-1 mb-0">
                                    <div class="row gy-2 mt-1">
                                        <div class="row gy-2 pe-0" id="custom-fields-sec">
                                        </div>

                                        <div class="col-lg-12">
                                            <label>Upload Images</label>

                                            <div>
                                                <div class="dropzone" id="dropzone-images">
                                                    <div class="fallback">
                                                        <input name="images" type="file" multiple="multiple">
                                                    </div>
                                                    <div class="dz-message needsclick">
                                                        <div class="mb-3">
                                                            <i class="display-4 text-muted ri-upload-cloud-2-fill"></i>
                                                        </div>

                                                        <h4>Drop files here or click to upload.</h4>
                                                    </div>
                                                </div>

                                                <div class="mb-0 row" id="dropzone-preview">
                                                    <div class="mt-2 col-lg-4" id="dropzone-preview-list">
                                                        <!-- This is used as the file preview template -->
                                                        <div class="border rounded">
                                                            <div class="d-flex p-2">
                                                                <div class="flex-shrink-0 me-3">
                                                                    <div class="avatar-sm bg-light rounded">
                                                                        <img data-dz-thumbnail class="img-fluid rounded d-block" src="<?= cdn_url('assets/images/new-document.png') ?>" alt="Dropzone-Image" />
                                                                    </div>
                                                                </div>
                                                                <div class="flex-grow-1">
                                                                    <div class="pt-1">
                                                                        <p class="fs-14 mb-1 truncate" data-dz-name>&nbsp;</p>
                                                                        <!-- <p class="fs-13 text-muted mb-0" data-dz-size></p> -->
                                                                        <strong class="error text-danger" data-dz-errormessage></strong>
                                                                    </div>
                                                                </div>
                                                                <div class="flex-shrink-0 ms-3">
                                                                    <button data-dz-remove class="btn btn-icon-sm btn-danger" data-delete-url="asset/delete-file/">Delete</button>
                                                                </div>
                                                            </div>
                                                            <div class="caption p-2">
                                                                <input type="hidden" name="images[]" class="name-input">
                                                                <input type="hidden" name="image_ids[]" class="id-input" value="0">
                                                                <input type="text" name="image_captions[]" class="form-control caption-input" placeholder="Caption goes here">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- end dropzon-preview -->
                                            </div>
                                        </div>

                                        <div class="col-lg-12">
                                            <label>Upload Documents</label>

                                            <div class="">
                                                <div class="dropzone" id="dropzone-docs">
                                                    <div class="fallback">
                                                        <input name="docs" type="file" accept="application/pdf" multiple="multiple">
                                                    </div>
                                                    <div class="dz-message needsclick">
                                                        <div class="mb-3">
                                                            <i class="display-4 text-muted ri-upload-cloud-2-fill"></i>
                                                        </div>

                                                        <h4>Drop files here or click to upload.</h4>
                                                    </div>
                                                </div>

                                                <div class="mb-0 row" id="dropzone-doc-preview">
                                                    <div class="mt-2 col-lg-4" id="dropzone-doc-preview-list">
                                                        <!-- This is used as the file preview template -->
                                                        <div class="border rounded">
                                                            <div class="d-flex p-2">
                                                                <div class="flex-shrink-0 me-3">
                                                                    <div class="avatar-sm bg-light rounded">
                                                                        <img data-dz-thumbnail class="img-fluid rounded d-block" src="<?= cdn_url('assets/images/new-document.png') ?>" />
                                                                    </div>
                                                                </div>
                                                                <div class="flex-grow-1">
                                                                    <div class="pt-1">
                                                                        <p class="fs-14 mb-1 truncate" data-dz-name>&nbsp;</p>
                                                                        <!-- <p class="fs-13 text-muted mb-0" data-dz-size></p> -->
                                                                        <strong class="error text-danger" data-dz-errormessage></strong>
                                                                    </div>
                                                                </div>
                                                                <div class="flex-shrink-0 ms-3">
                                                                    <button data-dz-remove class="btn btn-icon-sm btn-danger" data-delete-url="asset/delete-file/"><i class="ri-close-line"></i></button>
                                                                </div>
                                                            </div>
                                                            <div class="caption p-2">
                                                                <input type="hidden" name="documents[]" class="name-input">
                                                                <input type="hidden" name="document_ids[]" class="id-input" value="0">
                                                                <input type="text" name="document_captions[]" class="form-control caption-input" placeholder="Caption goes here">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- end dropzon-preview -->
                                            </div>
                                        </div>
                                    </div>
                                    <!--end row-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="offcanvas-foorter p-4 text-center">

                        <div class="hstack gap-2">
                            <button type="submit" class="btn btn-success" id="add-btn">Save</button>
                            <button type="button" class="btn btn-light close-offcanvas" id="close-modal" >Close</button>
                            <div id="deleteBtnContainer"></div>
                            <?php if (isset($edit) && $edit && isset($id) && $id > 0) { ?>               
                                <script>
                                    document.getElementById('deleteBtnContainer').innerHTML = delete_icon(<?= $id ?>, 'asset');
                                </script>
                            <?php }  ?>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
</div>