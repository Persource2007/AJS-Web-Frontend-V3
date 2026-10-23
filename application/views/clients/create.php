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
                        <h4 class="mb-sm-0">Add New Client</h4>
                        <div class="page-title-right">
                            <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item"><a href="javascript: void(0);">Resources Set up</a></li>
                                <li class="breadcrumb-item active">Add Assets</li>
                            </ol>
                        </div>

                    </div>
                </div>
            </div>
            <!-- end page title -->

            <div class="row">
                <?php

                $action = app_url('client/create');
                $method = 'POST';
                if (isset($edit) && $edit && isset($id) && $id > 0) {
                    $action = app_url('client/edit/');
                    $method = 'POST';
                }
                ?>
                <form class="tablelist-form pb-4 simplebar-form" action="<?= $action ?>" method="<?= $method ?>" name="addClientForm" id="addClientForm" style="height: calc(100vh - 112px);" data-simplebar autocomplete="off">
                    <div class="p-0 overflow-hidden pb-3">
                        <div>
                            <div class="acitivity-timeline p-4">
                                <div class="modal-body">
                                    <div class="row gy-2">
                                        <div class="col-xxl-6 col-md-6">
                                            <div class="card mb-2">
                                                <div class="card-body p-2">
                                                    <div class="text-center">
                                                        <div class="profile-user position-relative d-inline-block mx-auto mb-0">
                                                            <img src="<?= cnd_url(); ?>assets/images/users/ajs-logo-wt.png" class="rounded-circle avatar-xl img-thumbnail client-profile-image" id="profile-preview" alt="user-profile-image">
                                                            <div class="avatar-xs p-0 rounded-circle profile-photo-edit">
                                                                <input data-upload-type="client_profile_pic" data-preview-class="client-profile-image" data-filename-input="client_profile_pic" id="profile-img-file-input" type="file" class="profile-img-file-input">
                                                                <input type="hidden" name="client_profile_pic" id="client_profile_pic" value="" />
                                                                <label for="profile-img-file-input" class="profile-photo-edit avatar-xs">
                                                                    <span class="avatar-title rounded-circle bg-light text-body">
                                                                        <i class="ri-camera-fill"></i>
                                                                    </span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--end card-->
                                        </div>
                                        <!--                                            <div class="col-xxl-6 col-md-6">
                                                                                            <div class="mb-4">
                                                                                                <label for="basiInput" class="form-label">First Name</label>
                                                                                                <input type="text" class="form-control" id="first_name" name="first_name">
                                                                                            </div>

                                                                                            <div>
                                                                                                <label for="basiInput" class="form-label">Last Name</label>
                                                                                                <input type="text" class="form-control" id="last_name" name="last_name">
                                                                                            </div>
                                                                                        </div>-->


                                        <div class="col-xxl-6 col-md-6">
                                            <div class="mb-2">
                                                <label for="basiInput" class="form-label">Company Name <span class="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="company_name" name="company_name">
                                            </div>

                                            <div>
                                                <label for="basiInput" class="form-label">Client Code <span class="text-danger">*</span></label>
                                                <input value="" type="text" class="form-control" id="client_code" name="client_code">
                                            </div>
                                        </div>
                                        <!--                                            <div class="col-xxl-4 col-md-6">
                                                <div>
                                                    <label for="basiInput" class="form-label">Client UPRN <span class="text-danger">*</span></label>
                                                    <input value="" type="text" class="form-control" id="client_uprn" name="client_uprn">
                                                </div>
                                            </div>-->

                                        <div class="col-xxl-6 col-md-3">
                                            <div>
                                                <label for="labelInput" class="form-label">Street Address 1 <span class="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="address1" name="address1">
                                            </div>
                                        </div>
                                        <!--end col-->
                                        <div class="col-xxl-6 col-md-3">
                                            <div>
                                                <label for="labelInput" class="form-label">Street Address 2</label>
                                                <input type="text" class="form-control" id="address2" name="address2">
                                            </div>
                                        </div>
                                        <!--end col-->
                                        <div class="col-xxl-4 col-md-3">
                                            <div>
                                                <label for="labelInput" class="form-label">Area</label>
                                                <input type="text" class="form-control" id="area" name="area">
                                            </div>
                                        </div>
                                        <!--end col-->
                                        <div class="col-xxl-4 col-md-3">
                                            <div>
                                                <label for="labelInput" class="form-label">Town</label>
                                                <input type="text" class="form-control" id="city" name="city" />
                                            </div>
                                        </div>
                                        <!--end col-->
                                        <div class="col-xxl-4 col-md-3">
                                            <div>
                                                <label for="labelInput" class="form-label">Postcode <span class="text-danger">*</span></label>
                                                <input type="text" class="form-control postalcode-mask" id="postalcode" name="postalcode">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-6">
                                            <div>
                                                <label for="telephone" class="form-label">Telephone</label>
                                                <input type="text" class="form-control telephone-mask" id="telephone" name="telephone">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-6">
                                            <div>
                                                <label for="fax" class="form-label">Fax</label>
                                                <input value="" type="text" class="form-control" id="fax" name="fax">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-6">
                                            <div>
                                                <label for="website" class="form-label">Website</label>
                                                <input value="" type="text" class="form-control" id="website" name="website">
                                            </div>
                                        </div>
                                        <div class="col-xxl-12">
                                            <hr>
                                        </div>
                                        <div class="col-xxl-4 col-md-6">
                                            <div class="input-light">
                                                <label class="form-label">Client Type</label>
                                                <div class="d-flex">
                                                    <select class="form-control" name="client_type" id="client_type">
                                                        <option value="" selected>Select Client Type</option>
                                                    </select>
                                                    <button type="button" class="btn btn-success ms-2 popup-form-button-master popup-add-btn" data-heading="Add New Client Type" data-after-load-func="create_master_form" data-element="client_type" data-form-url="<?= base_url('system/master-record/create/CLIENT_TYPE') ?>"><i class="ri-add-line align-bottom"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-6">
                                            <div>
                                                <label for="basiInput" class="form-label">Company Registration Number</label>
                                                <input type="text" class="form-control" id="registration_no" name="registration_no">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-6">
                                            <div>
                                                <label for="basiInput" class="form-label">Company VAT Number</label>
                                                <input value="" type="text" class="form-control" id="vat_no" name="vat_no">
                                            </div>
                                        </div>
                                        <div class="col-xxl-8 col-md-8">
                                            <div class="input-light">
                                                <label class="form-label">Tags</label>
                                                <div class="d-flex">
                                                    <select class="form-control" name="tags[]" id="tags" data-module="client" multiple>
                                                    </select>
                                                    <button type="button" class="btn btn-success ms-2 popup-form-button-master popup-add-btn" data-heading="Add New Tag" data-after-load-func="create_tag_form" data-element="tags" data-form-url="<?= cdn_url('system/tag/create?in_popup=1') ?>"><i class="ri-add-line align-bottom"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <!--end col-->
                                        <div class="col-xxl-4 col-md-4">
                                            <div>
                                                <label class="form-label d-block">Status</label>
                                                <?php if (isset($edit) && $edit && isset($id) && $id > 0): ?>
                                                <div class="form-check form-switch form-switch-lg">
                                                    <input class="form-check-input" type="checkbox" role="switch" id="client_status" data-bs-toggle="tooltip" data-bs-placement="top" title="Toggle Active / Inactive">
                                                </div>
                                                <?php else: ?>
                                                <div class="form-check form-switch form-switch-lg">
                                                    <input type="hidden" name="status" value="0">
                                                    <input class="form-check-input" type="checkbox" role="switch" id="client_status" name="status" value="1" checked data-bs-toggle="tooltip" data-bs-placement="top" title="Toggle Active / Inactive">
                                                </div>
                                                <?php endif; ?>
                                            </div>
                                        </div>
                                        <!-- <div class="col-xxl-4 col-md-2">
                                                <div>
                                                    <label for="labelInput" class="form-label">Email</label>
                                                    <input type="email" class="form-control" id="email" name="email">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-2">
                                                <label for="labelInput" class="form-label">Mobile</label>
                                                <div class="input-group">
                                                    <span class="input-group-text" id="basic-addon1">+44</span>
                                                    <input type="text" class="form-control mobile-mask" id="mobile_number" name="mobile_number">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-2">
                                                <label for="labelInput" class="form-label">Telephone</label>
                                                <div class="input-group">
                                                    <span class="input-group-text" id="basic-addon1">+44</span>
                                                    <input type="text" class="form-control telephone-mask" id="telephone_number" name="telephone_number">
                                                </div>
                                            </div> -->
                                    </div>


                                    <div style="display:none" class="col-xxl-4 col-md-6">
                                        <label for="labelInput" class="form-label">Create Login?</label>
                                        <div class="">
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input login-check-radio" name="create_login" type="radio" id="inlineCheckbox6" value="0" checked>
                                                <label class="form-check-label" for="inlineCheckbox6">No</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input login-check-radio" name="create_login" type="radio" id="inlineCheckbox7" value="1">
                                                <label class="form-check-label" for="inlineCheckbox7">Yes</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="display:none" class="row role-div">
                                        <div class="col-xxl-4 col-md-6">
                                            <div class="input-light">
                                                <label class="form-label">Username</label>
                                                <input type="text" class="form-control " name="client_username" id="client_username" />
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-6">
                                            <div class="input-light">
                                                <label class="form-label">Role</label>
                                                <select class="form-control " name="client_role" id="client_role">
                                                    <option value="" selected>Role</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="client_create_ajs_contact_form">
                                        <h5 class="mb-0 mt-3 d-flex align-items-end">AJS Contacts
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
                                                            <button type="button" class="btn btn-success ms-2 popup-form-button-master popup-add-btn" data-heading="Add New Contact Type" data-after-load-func="create_master_form" data-element="ajs_contact_type" data-form-url="<?= base_url('system/master-record/create/AJS_CONTACT_TYPES') ?>"><i class="ri-add-line align-bottom"></i></button>
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
                                    <!--end row-->
                                    <div id="client_create_contact_form">
                                        <h5 class="mb-0 mt-3 d-flex align-items-end">Client Contacts
                                            <button type="button" data-parent-div="client_create_contact_form" data-input-parent="contact_input_field_div" class="add-client-contacts ms-auto btn btn-success popup-add-btn">
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
                                                            <select class="form-control contact_type"  name="contact_type[]" id="contact_type">
                                                                <option value="" selected>Contact Type</option>
                                                            </select>
                                                            <button type="button" class="btn btn-success ms-2 popup-form-button-master popup-add-btn" data-heading="Add New Contact Type" data-after-load-func="create_master_form" data-element="contact_type" data-form-url="<?= base_url('system/master-record/create/CONTACT_TYPE') ?>"><i class="ri-add-line align-bottom"></i></button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-xxl-4 col-md-4">
                                                    <div>
                                                        <label for="basiInput" class="form-label">First Name <span class="text-danger">*</span></label>
                                                        <input type="text" class="form-control" id="contact_fname" name="contact_fname[]">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-4">
                                                    <div>
                                                        <label for="basiInput" class="form-label">Last Name</label>
                                                        <input type="text" class="form-control" id="contact_lname" name="contact_lname[]">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-4">
                                                    <div>
                                                        <label for="labelInput" class="form-label">Email <span class="text-danger">*</span></label>
                                                        <input type="email" class="form-control" id="contact_email" name="contact_email[]">
                                                    </div>
                                                </div>
                                                <!--end col-->
                                                <div class="col-xxl-4 col-md-4">
                                                    <div>
                                                        <label for="labelInput" class="form-label">Mobile No.</label>
                                                        <div class="input-group">
                                                            <span class="input-group-text" id="basic-addon1">+44</span>
                                                            <input type="text" class="form-control mobile-mask" id="contact_mobile" name="contact_mobile[]">
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--end col-->
                                                <div class="col-xxl-4 col-md-4">
                                                    <div>

                                                        <label for="labelInput" class="form-label">Telephone</label>
                                                        <div class="input-group">
                                                            <input type="hidden" class="form-control telephone-mask" name="is_new_contact[]" value="1">
                                                            <span class="input-group-text" id="basic-addon1">+44</span>
                                                            <input type="text" class="form-control telephone-mask" id="contact_telephone" name="contact_telephone[]">
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--end col-->
                                            </div>
                                        <?php

                                        }
                                        ?>

                                    </div>

                                    <!--end row-->
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
                            <button type="button" class="btn btn-light waves-effect waves-light close-offcanvas" id="close-modal">Close</button>
                            <div id="deleteBtnContainer"></div>
                            <?php if (isset($edit) && $edit && isset($id) && $id > 0) { ?>               
                                <script>
                                    document.getElementById('deleteBtnContainer').innerHTML = delete_icon(<?= $id ?>, 'client');
                                </script>
                            <?php }  ?>
                        </div>
                    </div>
                </form>
                <div class="row gy-2 contact_ajs_input_field_div mt-2" style="display: none">
                    <!--                    <hr class='separator-hr' style='margin-top:20px; margin-bottom: 0px;'>-->
                    <div class="col-xxl-4 col-md-5">
                        <div class="input-light">
                            <label class="form-label">Contact Type</label>
                            <div class="d-flex">
                                <select class="form-control ajs_contact_type" name="ajs_contact_type[]">
                                    <option value="" selected>Contact Type</option>
                                </select>
                                <button type="button" class="btn btn-success ms-2 popup-form-button-master popup-add-btn" data-heading="Add New Contact Type" data-after-load-func="create_master_form" data-element="ajs_contact_type" data-form-url="<?= base_url('system/master-record/create/AJS_CONTACT_TYPES') ?>"><i class="ri-add-line align-bottom"></i></button>
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
                        <button type="button" data-parent-div="contact_ajs_input_field_div" class="remove-parent-btn ms-auto btn btn-danger popup-close-btn">
                            <i class="ri-close-line"></i>
                        </button>
                    </div>
                    <!--end col-->
                </div>

                <div class="row gy-2 contact_input_field_div mt-2" style="display: none">
                    <!--                    <hr class='separator-hr' style='margin-top:20px; margin-bottom: 0px;'>-->
                    <div class="col-xxl-4 col-md-4">
                        <div class="input-light">
                            <label class="form-label">Contact Type</label>
                            <div class="d-flex">
                                <select class="form-control contact_type" name="contact_type[]">
                                    <option value="" selected>Contact Type</option>
                                </select>
                                <button type="button" class="btn btn-success ms-2 popup-form-button-master popup-add-btn" data-heading="Add New Contact Type" data-after-load-func="create_master_form" data-element="contact_type" data-form-url="<?= base_url('system/master-record/create/CONTACT_TYPE') ?>"><i class="ri-add-line align-bottom"></i></button>
                            </div>
                        </div>
                    </div>
                    <!--                            <div class="col-xxl-4 col-md-2">
                                                    <div>
                                                        <label for="labelInput" class="form-label">Preferred Mode of Contact</label>
                                                        <select class="form-control" id="preferred_mode_of_contact" name="preferred_mode_of_contact" >
                                                            <option value="" selected>Select Option</option>
                                                        </select>

                                                    </div>
                                                </div>-->
                    <div class="col-xxl-4 col-md-4">
                        <div>
                            <label for="basiInput" class="form-label">First Name <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" name="contact_fname[]">
                        </div>
                    </div>
                    <div class="col-xxl-4 col-md-4">
                        <div>
                            <label for="basiInput" class="form-label">Last Name</label>
                            <input type="text" class="form-control" name="contact_lname[]">
                        </div>
                    </div>

                    <div class="col-xxl-4 col-md-4">
                        <div>
                            <label for="labelInput" class="form-label">Email <span class="text-danger">*</span></label>
                            <input type="email" class="form-control" name="contact_email[]">
                        </div>
                    </div>
                    <!--end col-->
                    <div class="col-xxl-4 col-md-4">
                        <div>
                            <label for="labelInput" class="form-label">Mobile No.</label>
                            <div class="input-group">
                                <span class="input-group-text" id="basic-addon1">+44</span>
                                <input type="text" class="form-control mobile-mask" name="contact_mobile[]">
                            </div>
                        </div>
                    </div>
                    <!--end col-->
                    <div class="col-xxl-3 col-md-3 pe-0">
                        <div>
                            <label for="labelInput" class="form-label">Telephone</label>
                            <div class="input-group">
                                <span class="input-group-text" id="basic-addon1">+44</span>
                                <input type="text" class="form-control telephone-mask" name="contact_telephone[]">
                                <input type="hidden" class="form-control" name="is_new_contact[]" value="0">
                                <input type="hidden" class="form-control" name="contact_id[]" value="0">
                            </div>
                        </div>
                    </div>
                    <!--end col-->
                    <div class="col-xxl-1 col-md-1">
                        <label for="account_manager" class="form-label" style="color: transparent;">Remove</label><br />
                        <button type="button" data-parent-div="contact_input_field_div" class="remove-parent-btn ms-auto btn btn-danger popup-close-btn">
                            <i class="ri-close-line"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- container-fluid -->
    </div>



    <!-- End Page-content -->