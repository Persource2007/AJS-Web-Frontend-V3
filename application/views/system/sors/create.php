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
                        <h4 class="mb-sm-0">Add New Chargecode/SOR</h4>
                        <div class="page-title-right">
                            <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item"><a href="javascript: void(0);">Resources Set up</a></li>
                                <li class="breadcrumb-item active">Add Chargecode</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end page title -->

            <div class="row">
                <?php
                $action = app_url('sor/create');
                $method = 'POST';
                if (isset($edit) && $edit && isset($id) && $id > 0) {
                    $action = app_url('sor/edit/');
                    $method = 'POST';
                }
                ?>
                <form class="tablelist-form pb-4 simplebar-form" action="<?= $action ?>" method="<?= $method ?>" name="addForm" id="addForm" style="height: calc(100vh - 112px);" data-simplebar autocomplete="off">
                    <div class="p-0 overflow-hidden pb-3">
                        <div>
                            <div class="acitivity-timeline p-4">
                                <div class="modal-body pb-3">
                                    <input type="hidden" id="tasksId" />
                                    <div class="row gy-2">
                                        <h5 class="fs-16 mt-0 mb-0">SOR Details</h5>
                                        <div class="col-xxl-4 col-md-4">
                                            <div>
                                                <label for="basiInput" class="form-label">Title <span class="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="title" name="title">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-4">
                                            <div>
                                                <label for="basiInput" class="form-label">SOR Code <span class="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="sor_code" name="sor_code">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-4">
                                            <div>
                                                <label for="basiInput" class="form-label">SOR For <span class="text-danger">*</span></label>
                                                <select class="form-control sor_for" id="sor_for" name="sor_for">
                                                    <option value="A">System</option>
                                                    <option value="C">Client</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-4">
                                            <div>
                                                <label for="basiInput" class="form-label">Type <span class="text-danger">*</span></label>
                                                <input type="text" class="form-control sor_type select2" id="sor_type" name="sor_type">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-4">
                                            <div>
                                                <label for="basiInput" class="form-label">Workstream Type</label>
                                                <select type="text" class="form-control workstream_type" id="workstream_id" multiple="multiple" name="workstream_id[]">
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <h5 class="fs-16 mt-3 mb-0 client_detail_div">Client Details</h5>
                                    <hr class="mt-1 mb-2 client_detail_div">
                                    <div class="row gy-2">
                                        <div class="col-xxl-4 col-md-6 client_detail_div">
                                            <div>
                                                <label for="client_code" class="form-label">Client <span class="text-danger">*</span></label>
                                                <select class="form-control select2" id="client_id" name="client_id">
                                                    <option value="" selected>Select</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-6 client_detail_div">
                                            <div>
                                                <label for="client_code" class="form-label">Contract</label>
                                                <select class="form-control select2" multiple="multiple" id="contract_id" name="contract_id[]">
                                                    <!--<option value="" selected>Select</option>-->
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-4 client_detail_div">
                                            <div>
                                                <label for="basiInput" class="form-label">Client SOR Code</label>
                                                <input type="text" class="form-control" id="client_sor_code" name="client_sor_code">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-4 client_detail_div">
                                            <div>
                                                <label for="basiInput" class="form-label">Client Analysis Code</label>
                                                <input type="text" class="form-control" id="client_analysis_code" name="client_analysis_code" />
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-4 client_detail_div">
                                            <div>
                                                <label for="basiInput" class="form-label">Client Budget Code</label>
                                                <input type="text" class="form-control" id="client_budget_code" name="client_budget_code" />
                                            </div>
                                        </div>
                                        <div class="stock_detail_div row" style="display:none">
                                            <h5 class="fs-16  mt-3">Stock Details</h5>
                                            <div style="display:none" class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label for="basiInput" class="form-label">Stock Code</label>
                                                    <input type="text" class="form-control" id="stock_code" name="stock_code" />
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-md-12 stock_detail_div">
                                                <div>
                                                    <label for="basiInput" class="form-label">Stock(s) <small>(Stock Name | Manu. | Stock Code | AJS Part No.)</small></label>
                                                    <select type="text" autocomplete="off" class="form-control" id="stock_id" name="stock_id[]">
                                                        <option value="" selected>Select</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="group_sor_form" class="group_sor_div" style="display: none">
                                            <h5 class="mb-0 fs-14  mt-3 d-flex">Group SORs
                                                <button type="button" data-parent-div="group_sor_form" data-input-parent="group_sor_input_field_div" class="add-group-sor ms-auto btn btn-success popup-add-btn">
                                                    <i class="ri-add-line align-bottom me-1"></i>
                                                </button>
                                            </h5>
                                            <?php
                                            if (!isset($edit) && !isset($id)) {
                                                ?>
                                                <div class="row gy-2">
                                                    <div class="col-xxl-4 col-md-2">
                                                        <div class="input-light">
                                                            <label class="form-label">SOR</label>
                                                            <select class="form-control ajs_contact_type"  name="group_sor_id[]" id="group_sor_id">
                                                                <option value="" selected>Select SOR</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-4 col-md-6">
                                                        <label for="labelInput" class="form-label">Qty.</label>
                                                        <input type="number" value="1" class="form-control" id="group_sor_qty" name="group_sor_qty[]" />
                                                        <input type="hidden" class="form-control telephone-mask" name="is_new_group_sor[]" value="1">
                                                    </div>
                                                    <!--end col-->
                                                </div>
                                                <?php
                                            }
                                            ?>
                                        </div>
                                    </div>
                                    <h5 class="fs-16 mt-3 mb-0">Pricing</h5>
                                    <hr class="mt-1 mb-2">
                                    <div class="row">
                                        <div class="col-xxl-4 col-md-4">
                                            <label for="basiInput" class="form-label">Material Price</label>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text">£</span>
                                                <input type="number" value="0.00" step="0.01" name="material_price" id="material_price" class="form-control" aria-label="Dollar amount (with dot and two decimal places)">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-4">
                                            <label for="basiInput" class="form-label">Labour Price</label>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text">£</span>
                                                <input type="number" value="0.00" step="0.01" name="labor_price" id="labor_price" class="form-control" aria-label="Dollar amount (with dot and two decimal places)">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-4">
                                            <label for="basiInput" class="form-label">Sell Price </label>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text">£</span>
                                                <input type="number" value="0.00" step="0.01" name="sell_price" id="sell_price" class="form-control" aria-label="Dollar amount (with dot and two decimal places)">
                                            </div>
                                        </div>
                                    </div>
                                    <h5 class="fs-16 mt-3 mb-0">SOR Description</h5>
                                    <hr class="mt-1 mb-2">
                                    <div class="row gy-2">
                                        <div class="col-xxl-12 col-md-12">
                                            <div>
                                                <label for="basiInput" class="form-label">Short Description</label>
                                                <textarea class="form-control" id="short_description" name="short_description"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-xxl-12 col-md-12">
                                            <div>
                                                <label for="basiInput" class="form-label">Description</label>
                                                <textarea class="form-control" id="description" name="description"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <h5 class="fs-16 mt-3 mb-0">Other Details</h5>
                                    <hr class="mt-1 mb-2">
                                    <div class="row">
                                        <div class="col-xxl-12 col-md-12">
                                            <div>
                                                <label for="basiInput" class="form-label">Engineer Accreditation</label>
                                                <textarea class="form-control" id="engg_accreditation" name="engg_accreditation"></textarea>
                                            </div>
                                        </div>

                                        <div id="service_create_certificate_form">
                                            <h5 class="mb-0 fs-16 mt-3 d-flex align-items-end">Certificates
                                                <button type="button" data-parent-div="service_create_certificate_form" data-input-parent="certificate_input_field_div" class="add-service-certificates ms-auto btn btn-success popup-add-btn">
                                                    <i class="ri-add-line align-bottom"></i>
                                                </button>
                                            </h5>
                                            <hr class="mt-1 mb-0">
                                            <?php
                                            if (!isset($edit) && !isset($id)) {
                                                ?>
                                                <div class="row gy-2 pt-2">
                                                    <div class="col-xxl-4 col-md-4">
                                                        <div class="input-light">
                                                            <label class="form-label">Certificate</label>
                                                            <select class="form-control ajs_contact_type"  name="certificate_id[]" id="certificate_id">
                                                                <option value="" selected>Select Certificate</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-4 col-md-6">
                                                        <label for="labelInput" class="form-label">Required</label>
                                                        <select class="form-control" id="certificate_required" name="certificate_required[]">
                                                            <option value="0">No</option>
                                                            <option value="1">Yes</option>
                                                        </select>

                                                        <input type="hidden" class="form-control telephone-mask" name="is_new_certificate[]" value="1">
                                                        <input type="hidden" name="sor_certificate_id[]" value="0">
                                                    </div>
                                                    <!--end col-->
                                                </div>
                                                <?php
                                            }
                                            ?>
                                        </div>

                                    </div>
                                    <!--end row-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="offcanvas-foorter p-4 text-center">

                        <div class="hstack gap-2">
                            <?php
                            if (isset($edit) && $edit && isset($id) && $id > 0) {
                                ?>
                                <input type="hidden" id="edit_id" name="edit_id" value="<?= $id ?>" />
                                <?php
                            }
                            ?>
                            <button type="submit" class="btn btn-success waves-effect waves-light" id="add-btn">Save</button>
                            <button type="button" class="btn btn-light waves-effect waves-light close-offcanvas" id="close-modal"  >Close</button>
                            <div id="deleteBtnContainer"></div>
                            <?php if (isset($edit) && $edit && isset($id) && $id > 0) {?>               
                                <script>
                                    document.getElementById('deleteBtnContainer').innerHTML = delete_icon(<?= $id ?>, 'sor');
                                </script>
                            <?php }  ?>
                        </div>
                    </div>
                </form>
                <div id="certificate_input_field_template" class="row gy-2 certificate_input_field_div pt-3" style="display: none">

                    <div class="col-xxl-4 col-md-4">
                        <div class="input-light">
                            <label class="form-label">Certificate</label>
                            <select class="form-control certificate_id"  name="certificate_id[]">
                                <option value="" selected>Select Certificate</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-xxl-4 col-md-6">
                        <label for="labelInput" class="form-label">Required</label>
                        <select class="certificate_required form-control" name="certificate_required[]">
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </select>
                    </div>
                    <input type="hidden" class="form-control telephone-mask" name="is_new_certificate[]" value="0">
                    <input type="hidden" name="sor_certificate_id[]" value="0">
                    <div class="col-xxl-4 col-md-2 ms-auto">
                        <label for="account_manager" class="form-label" style="color: transparent;">Remove</label><br/>
                        <button type="button" data-parent-div="certificate_input_field_div" class="remove-parent-btn ms-auto btn btn-danger popup-close-btn">
                            <i class=" ri-close-line "></i>
                        </button>
                    </div>
                    <!--end col-->
                </div>
                <div class="row gy-2 group_sor_input_field_div pt-3" style="display: none">

                    <div class="col-xxl-4 col-md-2">
                        <div class="input-light">
                            <label class="form-label">SOR</label>
                            <select required class="form-control group_sor_id"  name="group_sor_id[]">
                                <option value="" selected>Select SOR</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-xxl-4 col-md-6">
                        <label for="labelInput" class="form-label">Qty.</label>
                        <input type="number" value="1" required class="group_sor_qty form-control" name="group_sor_qty[]" />
                    </div>
                    <input type="hidden" class="form-control telephone-mask" name="is_new_group_sor[]" value="0">
                    <div class="col-xxl-4 col-md-6 ms-auto">
                        <label for="account_manager" class="form-label">Remove</label><br/>
                        <button type="button" data-parent-div="group_sor_input_field_div" class="remove-parent-btn ms-auto btn btn-danger popup-close-btn">
                            <i class=" ri-close-line "></i>
                        </button>
                    </div>
                    <hr class='separahr class=tor-hr' style='margin-top:20px'>
                    <!--end col-->
                </div>
            </div>
        </div>
        <!-- container-fluid -->
    </div>



    <!-- End Page-content -->
