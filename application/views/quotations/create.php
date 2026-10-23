<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            $sub_title = 'Create Quotation';
            include_once APPPATH . 'views/quotations/inc/breadcrumb.php';
            ?>
            <!-- end page title -->

            <div class="row">
                <div class="col-lg-12">
                    <?php
                    $action    = app_url('quotation/create');
                    if (isset($edit) && $edit && isset($id) && $id > 0)
                    {
                        $action = app_url('quotation/edit/');
                    }
                    ?>
                    <form class="tablelist-form pb-4" action="<?= $action ?>" method="post" id="quotationForm" autocomplete="off">
                        <input type="hidden" value="<?= $id ?? null ?>" id="edit_id" name="edit_id" />
                        <input type="hidden" value="" id="last_inserted_id" name="last_inserted_id" />
                        <input type="hidden" value="" id="is_send" name="is_send" value="0" />
                        <div class="p-0 overflow-hidden">
                            <div data-simplebar style="height: calc(100vh - 112px);">
                                <div class="acitivity-timeline p-4">
                                    <div class="modal-body">
                                        <div class="">
                                            <div class="row gy-2">
                                                <h5 class="fs-16 mb-0">Quotation</h5>
                                                <div class="col-xxl-4 col-md-4">
                                                    <label class="form-label">Job Ref#</label>
                                                    <div class="input-light">
                                                        <div class="d-flex error-div">
                                                            <select class="form-control" name="job_id" id="job_id">
                                                                <option value="" selected>Select</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-4">
                                                    <label class="form-label">Client <span class="text-danger">*</span></label>
                                                    <div class="input-light">
                                                        <div class="d-flex error-div">
                                                            <select class="form-control" name="client_id" id="client_id">
                                                                <option value="" selected>Select</option>
                                                            </select>
                                                            <button type="button" class="btn btn-primary ms-2 popup-form-search-button popup-add-btn" data-heading="Search Client" data-element="client_id" data-after-load-func="set_client_id" data-form-url="<?= base_url('clients/search-list') ?>"><i class="mdi mdi-magnify search-widget-icon"></i></button>
                                                            <button type="button" class="btn btn-primary ms-2  popup-form-view-button popup-add-btn" data-heading="View Client" data-element="client_id"  data-form-url="<?= base_url('clients/details') ?>"><i class=" ri-eye-fill  align-bottom"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-4">
                                                    <label class="form-label">Property <span class="text-danger">*</span></label>
                                                    <div class="input-light">
                                                        <div class="d-flex error-div">
                                                            <select class="form-control" name="property_id" id="property_id">
                                                                <option value="" selected>Select</option>
                                                            </select>
                                                            <button type="button" class="btn btn-primary ms-2 popup-form-search-button popup-add-btn" data-heading="Search Property" data-element="property_id" data-after-load-func="set_property_id" data-form-url="<?= base_url('properties/search-list') ?>"><i class="mdi mdi-magnify search-widget-icon"></i></button>
                                                            <button type="button" class="btn btn-primary ms-2  popup-form-view-button popup-add-btn" data-heading="View Property" data-element="property_id"  data-form-url="<?= base_url('properties/details') ?>"><i class=" ri-eye-fill  align-bottom"></i></button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-xxl-4 col-md-6">
                                                    <label class="form-label">Contract <span class="text-danger">*</span></label>
                                                    <div class="input-light">
                                                        <div class="d-flex error-div">
                                                            <select class="form-control" name="contract_id" id="contract_id">
                                                                <option value="" selected>Select</option>
                                                            </select>
                                                            <button type="button" class="btn btn-primary ms-2 popup-form-search-button popup-add-btn" data-heading="Search Contract" data-element="contract_id" data-after-load-func="set_contract_id" data-form-url="<?= base_url('contract/search-list') ?>"><i class="mdi mdi-magnify search-widget-icon"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div class="row gy-2 mt-2">
                                                <h5 class="fs-16 mb-0">Quotation Details</h5>
                                                <hr>
                                                <?php /*<div class="col-xxl-4 col-md-12">
                                                    <div class="input-light multi-choice">
                                                        <label for="location" class="form-label">Quote By <span class="text-danger">*</span></label>
                                                        <div class="d-flex error-div">
                                                            <select class="form-control" data-choices data-choices-search-false name="quotation_by_id" id="quotation_by_id">
                                                                <option  value="" selected>Select </option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div> */ ?>
                                                <div class="col-xxl-4 col-md-12">
                                                    <label for="set-job-types" class="form-label">Quote Number <span class="text-danger">*</span></label>
                                                    <input type="text" class="form-control" id="quotation_num" name="quotation_num" maxlength="25" data-last-num="">
                                                </div>                                                 
                                                <div class="col-xxl-4 col-md-12">
                                                    <label for="set-job-types" class="form-label">Client Email <span class="text-danger">*</span></label>
                                                    <input type="email" class="form-control" id="email" name="email" maxlength="250">
                                                </div> 
                                                <div class="col-xxl-4 col-md-12">
                                                    <label for="set-job-types" class="form-label">Client Mobile <span class="text-danger">*</span></label>
                                                    <div class="input-group">
                                                        <span class="input-group-text" id="basic-addon1">+44</span>
                                                            <input type="text" class="form-control mobile-mask" id="client_mobile" name="client_mobile" maxlength="15">
                                                        </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-12">
                                                    <label for="set-job-types" class="form-label">AJS Contact </label>
                                                    <input type="text" class="form-control" id="ajs_email" name="ajs_email" maxlength="250">
                                                </div> 
                                                <div class="col-xxl-4 col-md-12">
                                                    <label for="set-job-types" class="form-label">AJS Mobile</label>
                                                    <div class="input-group">
                                                        <span class="input-group-text" id="basic-addon1">+44</span>
                                                            <input type="text" class="form-control mobile-mask" id="ajs_mobile" name="ajs_mobile" maxlength="15">
                                                        </div>
                                                </div>                                                
                                                <div class="col-xxl-4 col-md-6">
                                                    <div class="input-light">
                                                        <label class="form-label">Valid Until</label>
                                                         <select class="form-control" name="expire_after" id="expire_after">
                                                            <option value="30" selected>30</option>
                                                            <option value="60" >60</option>
                                                            <option value="90" >90</option>
                                                        </select>
                                                        <input type="hidden" class="form-control" name="expiry_date" id="expiry_date" value=>
                                                    </div>
                                                </div>                                                
                                                <div class="col-xxl-4 col-md-6" >
                                                    <label class="form-label">Status <span class="text-danger">*</span></label>
                                                    <input type="text" class="form-control" id="status_name" name="status_name" readonly>
                                                    <input type="hidden" class="form-control" id="status_id" name="status_id" value="">
                                                    <input type="hidden" class="form-control" id="status_code" name="status_code" value="">
                                                </div>
                                               
                                                <input type="hidden" class="form-control" id="quote_version" name="quote_version" value="0">
                                                <input type="hidden" class="form-control" id="version_updated_at" name="version_updated_at" value="">
                                               
                                                <div class="col-xxl-4 col-md-4">
                                                    <div class="input-light jobs-tags">
                                                        <label class="form-label">Tags</label>
                                                        <div class="d-flex">
                                                            <select class="form-control" name="tags[]" id="tags" data-module="quotation" multiple>
                                                            </select>
                                                            <button type="button" class="btn btn-success ms-2 popup-form-button-master popup-add-btn" data-heading="Add New Tag" data-after-load-func="create_tag_form" data-element="tags" data-form-url="<?= cdn_url('system/tag/create?in_popup=1') ?>"><i class="ri-add-line align-bottom"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-12 col-md-12">
                                                    <label for="set-job-types" class="form-label">Quote For</label>
                                                    <input type="text" class="form-control" id="quotation_title" name="quotation_title" maxlength="250">
                                                </div> 
                                                <div class="col-xxl-12 col-md-12">
                                                    <div class="input-light">
                                                        <label class="form-label">Description</label>
                                                        <div class="d-flex">
                                                            <textarea class="form-control" id="description" name="description"></textarea>
                                                        <button type="button" class="btn btn-primary ms-2 popup-form-search-button popup-add-btn phrasebook-btn" data-heading="Use Phrasebook" data-element="description" data-after-load-func="set_description" data-form-url="<?= base_url('system/phrasebook/search-list') ?>"><i class="mdi mdi-book-open-page-variant search-widget-icon"></i></button>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                                <?php /*
                                                <div id="client_create_ajs_contact_form">
                                                    <h5 class="mb-0 mt-3 d-flex align-items-end">Contacts
                                                        <button type="button" data-parent-div="client_create_ajs_contact_form" data-input-parent="contact_ajs_input_field_div" class="add-ajs-contacts ms-auto btn btn-success popup-add-btn">
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
                                                                    <label class="form-label">Contact Type</label>
                                                                    <div class="d-flex">
                                                                        <select class="form-control ajs_contact_type" name="ajs_contact_type[]" id="ajs_contact_type">
                                                                            <option value="" selected>Contact Type</option>
                                                                        </select>
                                                                        
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-xxl-4 col-md-6">
                                                                <div class="input-light">
                                                                    <input type="hidden" name="is_new_ajs_contact[]" value="1">
                                                                    <label for="account_manager" class="form-label">Name</label>
                                                                    <select name="account_manager[]" id="account_manager" class="form-control account_manager">
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <!--end col-->
                                                        </div>
                                                    <?php

                                                    }
                                                    ?>
                                                </div>
                                                */ ?>
                                                <div class="col-xxl-12 col-md-12 mt-2">
                                                    <div class="stock-section">
                                                        <h5 class="mb-0 mt-0 d-flex align-items-end">SOR
                                                            <button type="button" class="btn btn-success ms-auto popup-form-search-button popup-add-btn add-sor-btn" data-module="quotation_sor" data-heading="Search SOR" data-element="sor_id" data-form-url="<?= base_url('quotation/sors/search-list') ?>"><i class="ri-add-line align-bottom"></i></button> 
                                                        </h5>
                                                    </div>
                                                    <hr class="mt-1">

                                                    <div class="table-responsive mb-5 contact-tbl">                                                        
                                                        <table id="quotation_sor_datatables" class="display table dt-responsive align-middle table-nowrap mb-0 table-hover" >
                                                            <thead class="table-light text-muted">
                                                                <tr>
                                                                    <th>SOR</th>
                                                                    <th>Description</th>
                                                                    <th>Quantity</th>
                                                                    <th>Price</th>
                                                                    <th>Total</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody></tbody>
                                                            <tfoot></tfoot>
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
                                <button type="submit" class="btn btn-success waves-effect waves-light" id="add-btn">Save</button>
                                <button type="submit" class="btn btn-info waves-effect waves-light" id="send-btn">Send</button>
                                <button type="button" class="btn btn-light waves-effect waves-light close-offcanvas" id="close-modal" >Close</button>
                            </div>
                        </div>

                        <div class="row gy-2 contact_ajs_input_field_div mt-2" style="display: none">
                            <div class="col-xxl-4 col-md-5">
                                <div class="input-light">
                                    <label class="form-label">Contact Type</label>
                                    <div class="d-flex">
                                        <select class="form-control ajs_contact_type" name="ajs_contact_type[]">
                                            <option value="" selected>Contact Type</option>
                                        </select>                                        
                                    </div>
                                </div>
                            </div>
                            <div class="col-xxl-4 col-md-6 pe-0">
                                <div class="input-light">
                                    <input type="hidden" class="form-control" name="is_new_ajs_contact[]" value="0">
                                    <input type="hidden" class="form-control" name="ajs_contact_id[]" value="0">
                                    <label for="account_manager" class="form-label">Name</label>
                                    <select name="account_manager[]" class="form-control account_manager">

                                    </select>
                                </div>
                            </div>
                            <div class="col-xxl-4 col-md-1 ms-auto">
                                <label for="account_manager" class="form-label" style="color: transparent;">Remove</label><br />
                                <button type="button" data-parent-div="contact_ajs_input_field_div" class="remove-quote-item-btn ms-auto btn btn-danger popup-close-btn">
                                    <i class="ri-close-line"></i>
                                </button>
                            </div>
                            <!--end col-->
                        </div>

                    </form>
                </div>
                <!--end col-->

            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/quotations/quotation.js') ?>"></script>

