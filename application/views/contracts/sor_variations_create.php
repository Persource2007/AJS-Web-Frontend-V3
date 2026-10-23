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
                        <h4 class="mb-sm-0">Add SOR Variation</h4>                        
                    </div>
                </div>
            </div>
            <!-- end page title -->

            <div class="row">
              <?php $action = app_url('contract_sor_variation/create');
                                    if (isset($edit_id) && $edit_id > 0) {
                                        $action = app_url('contract_sor_variation/edit');                                        
                                    } ?>
                <form class="tablelist-form pb-4 simplebar-form" id="variationForm" action="<?= $action; ?>" method="post" style="height: calc(100vh - 112px);" data-simplebar autocomplete="off">
                  <?php $client_id= !empty($client_id) ? $client_id : ''; ?>    
                  <?php $id= !empty($id) ? $id : ''; ?>   
                    <input type="hidden" name="client_id" id="client_id" value="<?= $client_id; ?>">
                    <input type="hidden" name="contract_id" id="contract_id" value="<?= $id; ?>">
                    <input type="hidden" name="edit_id" id="edit_id" value="<?= $edit_id ?? null ?>">
                    
                  <div class="p-0 overflow-hidden pb-3">
                        <div>
                            <div class="acitivity-timeline p-4 pt-2">
                                <div class="modal-body">

                                <div class="row gy-2">

                                    <!-- ================= VARIATION TYPE ================= -->
                                    <div class="col-xxl-12 col-md-12">
                                        <div class="input-light">
                                            <label class="form-label">Variation Type</label>
                                            <div class="mt-1">
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="variation_type" value="unit" checked>
                                                    <label class="form-check-label">Unit wise variation</label>
                                                </div>
                                                <div class="form-check form-check-inline hide">
                                                    <input class="form-check-input" type="radio" name="variation_type" value="uprn">
                                                    <label class="form-check-label">UPRN wise variation</label>
                                                </div>
                                                <input type="hidden" name="variation_type_hidden" id="variation_type_hidden" value="">
                                            </div>
                                        </div>
                                    </div>

                                    <!-- ================= UNIT WISE SECTION ================= -->
                                    <div id="unitSection" class="col-xxl-12 col-md-12">

                                        <div class="row gy-2">
                                            <!-- <div class="col-xxl-3 col-md-3">
                                                <div class="input-light">
                                                    <label class="form-label">Job Type</label>
                                                    <div class="d-flex">
                                                        <select class="form-control select2" name="job_type_id"  id="job_type_id">
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div> -->
                                            <div class="col-xxl-12 col-md-12">
                                                <h5 class="mb-0 mt-3 d-flex align-items-end">
                                                    Unit Pricing
                                                    <button type="button"
                                                            id="addUnitRow"
                                                            class="ms-auto btn btn-success popup-add-btn">
                                                        <i class="ri-add-line align-bottom"></i>
                                                    </button>
                                                </h5>
                                                <hr class="mt-1 mb-0">
                                            </div>
                                            <div class="col-xxl-12 col-md-12">
                                                <div class="row gx-2 unit-row">
                                                    <div class="col-xxl-2 col-md-2">
                                                        <label class="form-label fw-bold">Job Type <span class="text-danger">*</span></label>
                                                    </div>
                                                    <div class="col-xxl-3 col-md-3">
                                                        <label class="form-label fw-bold">SOR <span class="text-danger">*</span></label>
                                                    </div>
                                                    <div class="col-xxl-1 col-md-1">
                                                        <label class="form-label fw-bold">Unit From <span class="text-danger">*</span></label>
                                                    </div>
                                                    <div class="col-xxl-1 col-md-1">
                                                        <label class="form-label fw-bold">Unit To <span class="text-danger">*</span></label>
                                                    </div>
                                                    <div class="col-xxl-2 col-md-2">
                                                        <label class="form-label fw-bold">Labour <span class="text-danger">*</span></label>
                                                    </div>
                                                    <div class="col-xxl-2 col-md-2">
                                                        <label class="form-label fw-bold">Sell <span class="text-danger">*</span></label>
                                                    </div>
                                                    <div class="col-xxl-1 col-md-1">
                                                        <label class="form-label fw-bold">Action</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="unitRows" class="col-xxl-12 col-md-12">
                                                <div class="row gy-2 gx-2 mb-2 unit-row">
                                                    <div class="col-xxl-2 col-md-2">
                                                        <div class="input-light">
                                                            <select class="form-control select2 job_types" name="job_type_id[]"  id="job_type_id_0" required>
                                                                    <option value="">Select</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-3 col-md-3">
                                                        <div class="input-light d-flex error-div select-btn-fixed">
                                                            <select class="form-control  contract_sors" name="contract_sors[]"  id="contract_sors_0" required>
                                                                <option value="">Select</option>
                                                            </select>
                                                            <button type="button" class="btn btn-primary ms-2 popup-form-search-button popup-add-btn" data-heading="Search SORs" data-element="contract_sors_0" data-after-load-func="set_sor_id_variance" data-form-url="<?= base_url('system/sor/search-list') ?>"><i class="mdi mdi-magnify search-widget-icon"></i></button>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-1 col-md-1">
                                                        <input type="text" id="unit_from_0" name="unit_from[]" class="form-control required-text integer_only unit-from" placeholder="Unit From" required>
                                                    </div>
                                                    <div class="col-xxl-1 col-md-1">
                                                        <input type="text" id="unit_to_0" name="unit_to[]" class="form-control required-text integer_only unit-to" placeholder="Unit To" required>
                                                    </div>
                                                    <div class="col-xxl-2 col-md-2">
                                                        <input type="text" id="labour_0" name="labour[]" class="form-control price-validation labour" placeholder="Labour" required>
                                                    </div>
                                                    <div class="col-xxl-2 col-md-2">
                                                        <input type="text" id="sell_0" name="sell[]" class="form-control price-validation sell" placeholder="Sell" required>
                                                    </div>
                                                    <div class="col-xxl-1 col-md-1">                                                        
                                                        <button type="button"
                                                                class="btn btn-danger popup-close-btn remove-unit"
                                                                style="display:none;">
                                                            <i class="ri-close-line"></i>
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>

                                    <!-- ================= UPRN WISE SECTION ================= -->
                                    <!-- <div id="uprnSection" class="col-xxl-12 col-md-12" style="display:none;">

                                        <h5 class="mb-0 mt-3 d-flex align-items-end">
                                            UPRN Pricing
                                            <button type="button"
                                                    id="addUprnRow"
                                                    class="ms-auto btn btn-success popup-add-btn">
                                                <i class="ri-add-line align-bottom"></i>
                                            </button>
                                        </h5>
                                        <hr class="mt-1 mb-0">

                                        <div id="uprnRows">

                                            <div class="row gy-2 pt-2 uprn-row">
                                                <div class="col-xxl-2 col-md-2">
                                                    <select id="uprn_property_0" class="form-control select2 uprn_property" name="uprn_property[]"><option>Select Property</option>
                                                    </select>
                                                </div>
                                                <div class="col-xxl-2 col-md-2">
                                                    <div class="input-light">
                                                        <select id="contract_sors_uprn_0" class="form-control select2 contract_sors_uprn" name="contract_sors_uprn[]">
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-2 col-md-2">
                                                    <input type="text" name="uprn_material[]" class="form-control price-validation" placeholder="Material">
                                                </div>
                                                <div class="col-xxl-2 col-md-2">
                                                    <input type="text" name="uprn_labour[]" class="form-control price-validation" placeholder="Labour">
                                                </div>
                                                <div class="col-xxl-2 col-md-2">
                                                    <input type="text" name="uprn_sell[]" class="form-control price-validation" placeholder="Sell">
                                                </div>
                                                <div class="col-xxl-2 col-md-2">                                                    
                                                    <button type="button"
                                                            class="btn btn-danger popup-close-btn remove-uprn"
                                                            style="display:none;">
                                                        <i class="ri-close-line"></i>
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div> -->

                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="offcanvas-foorter p-4 text-center">

                        <div class="hstack gap-2">
                            <button type="submit" class="btn btn-success" id="add-btn">Save</button>
                            <button type="button" class="btn btn-light close-offcanvas" id="close-modal" >Close</button>                           
                        </div>
                    </div>

                </form>


                <!-- Templates -->
                <div id="unitRowTemplate" style="display:none;">
                    <div class="row gy-2 gx-2 mb-2 unit-row">
                        <div class="col-xxl-2 col-md-2">
                            <div class="input-light">
                                <select class="form-control select2 job_types" name="job_type_id[]"  id="job_type_id_0" required>
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-xxl-3 col-md-3">
                            <div class="d-flex error-div select-btn-fixed">
                                <select class="form-control required-text contract_sors" name="contract_sors[]"  id="contract_sors_0" required>
                                    <option value="">Select</option>
                                </select>
                                <button type="button" class="btn btn-primary ms-2 popup-form-search-button popup-add-btn" data-heading="Search SORs" data-element="contract_sors_0" data-after-load-func="set_sor_id_variance" data-form-url="<?= base_url('system/sor/search-list') ?>"><i class="mdi mdi-magnify search-widget-icon"></i></button>
                            </div>
                        </div>
                        <div class="col-xxl-1 col-md-1"><input type="text" name="unit_from[]" class="form-control required-text integer_only unit-from" placeholder="Unit From"></div>
                        <div class="col-xxl-1 col-md-1"><input type="text" name="unit_to[]" class="form-control required-text integer_only unit-to" placeholder="Unit To"></div>
                        <div class="col-xxl-2 col-md-2"><input type="text" name="labour[]" class="form-control price-validation labour" placeholder="Labour"></div>
                        <div class="col-xxl-2 col-md-2"><input type="text" name="sell[]" class="form-control price-validation sell" placeholder="Sell"></div>
                        <div class="col-xxl-1 col-md-1">
                            <button type="button" class="btn btn-danger popup-close-btn remove-unit">
                                <i class="ri-close-line"></i>
                            </button>
                        </div>
                  </div>
              </div>

              <div id="uprnRowTemplate" style="display:none;">
                  <div class="row gy-2 pt-2 uprn-row">
                      <div class="col-xxl-2 col-md-2">
                          <select name="uprn_property[]" class="form-control select2 uprn_property" ><option>Select Property</option></select>
                      </div>
                      <div class="col-xxl-2 col-md-2">
                        <div class="input-light">
                            <select class="form-control select2 contract_sors_uprn" name="contract_sors_uprn[]">
                            </select>
                        </div>
                    </div>
                      <div class="col-xxl-2 col-md-2"><input type="text" name="uprn_material[]" class="form-control price-validation" placeholder="Material"></div>
                      <div class="col-xxl-2 col-md-2"><input type="text" name="uprn_labour[]" class="form-control price-validation" placeholder="Labour"></div>
                      <div class="col-xxl-2 col-md-2"><input type="text" name="uprn_sell[]" class="form-control price-validation" placeholder="Sell"></div>
                      <div class="col-xxl-2 col-md-2">
                          <button type="button" class="btn btn-danger popup-close-btn remove-uprn">
                              <i class="ri-close-line"></i>
                          </button>
                      </div>
                  </div>
              </div>              
          </div>
        </div>
    </div>
</div>
