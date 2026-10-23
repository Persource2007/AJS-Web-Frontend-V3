<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            $sub_title = 'Create Kit';
            include_once APPPATH . 'views/kits/inc/breadcrumb.php';
            ?>
            <!-- end page title -->
            <div class="row">
                <div class="col-lg-12">
                    <?php

                    $action = app_url('kit/create');
                    if (isset($edit) && $edit && isset($id) && $id > 0) {
                        $action = app_url('kit/edit/');
                    }
                    ?>
                    <form class="tablelist-form pb-4" action="<?= $action ?>" method="post" id="kitForm" autocomplete="off">
                        <input type="hidden" value="<?= $id ?? null ?>" id="edit_id" name="edit_id" />
                        <div class="p-0 overflow-hidden">
                            <div data-simplebar style="height: calc(100vh - 112px);">
                                <div class="acitivity-timeline p-4">
                                    <div class="modal-body">
                                        <div class="">
                                            <div class="row gy-2">
                                                <div class="col-xxl-4 col-md-6">
                                                    <div>
                                                        <label class="form-label">Title <span class="text-danger">*</span></label>
                                                        <input type="text" class="form-control" name="title" id="title">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-6">
                                                    <div class="input-light">
                                                        <label class="form-label">Type <span class="text-danger">*</span></label>
                                                        <div class="d-flex error-div">
                                                            <select class="form-control" id="type_id" name="type_id">
                                                                <option value="" selected>Select</option>
                                                            </select>

                                                            <button type="button" class="btn btn-success ms-2 popup-form-button-master popup-add-btn" data-heading="Add New Kit Type" data-after-load-func="create_master_form" data-element="type_id" data-form-url="<?= base_url('system/master-record/create/KIT_TYPES') ?>"><i class="ri-add-line align-bottom"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-6 hide">
                                                    <label class="form-label">Price Type</label>
                                                    <div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input price-type" id="price_type_dynamic" type="radio" name="price_type" value="dynamic" checked>
                                                            <label class="form-check-label" for="price_type_dynamic">Dynamic</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input price-type" id="price_type_fix" type="radio" name="price_type" value="fix">
                                                            <label class="form-check-label" for="price_type_fix">Fix</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-6 hide" id="sor-field">
                                                    <div>
                                                        <label for="labelInput" class="form-label">SOR</label>
                                                        <div class="input-light">
                                                            <select class="form-control" name="sor_id" id="sor_id">
                                                                <option value="" selected>Select</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h5 class="mb-0 mt-4 d-flex">Kit Items
                                                    <button type="button" class="btn btn-success ms-auto popup-form-button-master popup-add-btn" data-heading="Add Items" data-width="680"  data-after-load-func="initialize_item_table" data-form-url="<?= base_url('kit/create-items/') ?>">
                                                        <i class="ri-add-line align-bottom"></i>
                                                    </button>
                                                </h5>
                                                <div class="col-xxl-12 col-md-12">
                                                    <div class="mb-4">
                                                        <table class="display table dt-responsive align-middle table-nowrap mb-0">
                                                            <thead class="table-light text-muted">
                                                                <tr>
                                                                    <th>Manuf. Part No.</th>
                                                                    <th>Name</th>
                                                                    <th>Type</th>
                                                                    <th class="pricing-col">Price Per Unit</th>
                                                                    <th colspan="2">Quantity</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id="table-items" data-custom-field-fn="get_custom_fields">
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!--end row-->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="offcanvas-foorter border p-3 text-center">
                            <div class="hstack gap-2">
                                <button type="submit" class="btn btn-success" id="add-btn">Save</button>
                                <button type="button" class="btn btn-light close-offcanvas" id="close-modal" >Close</button>
                                <div id="deleteBtnContainer"></div>
                                <?php if (isset($edit) && $edit && isset($id) && $id > 0) { ?>               
                                    <script>
                                        document.getElementById('deleteBtnContainer').innerHTML = delete_icon(<?= $id ?>, 'kit');
                                    </script>
                                <?php }  ?>
                            </div>
                        </div>
                    </form>
                </div>
                <!--end col-->
            </div>
            <!--end row-->
        </div>
        <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
</div>
<!-- End Page-content -->
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/kits/kit.js') ?>"></script>