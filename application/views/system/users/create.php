<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            $bc_title = 'Role Management';
            include_once APPPATH . 'views/system/inc/breadcrumbs.php';
            ?>
            <!-- end page title -->
            <div class="row">
                <div class="col-lg-12">
                    <?php
                    $action   = app_url('user/create');
                    if (isset($edit) && $edit && isset($id) && $id > 0)
                    {
                        $action = app_url('user/edit/');
                    }
                    ?>
                    <form class="tablelist-form pb-4" action="<?= $action ?>" method="post" id="userForm" autocomplete="off">
                        <input type="hidden" value="<?= $id ?? null ?>" id="edit_id" name="edit_id" />
                        <div class="p-0 overflow-hidden">
                            <div data-simplebar style="height: calc(100vh - 112px);">
                                <div class="acitivity-timeline p-4">
                                    <div class="modal-body pb-3">
                                        <div class="row gy-3">
                                            <div class="col-lg-12">
                                                <div class="row gy-2">
                                                    <div class="col-xxl-4 col-md-4">
                                                        <div class="card mb-0">
                                                            <div class="card-body p-2">
                                                                <div class="text-center">
                                                                    <div class="profile-user position-relative d-inline-block mx-auto  mb-0">
                                                                        <img src="<?= cnd_url(); ?>assets/images/users/ajs-logo-wt.png" class="rounded-circle avatar-xl img-thumbnail user-profile-image" alt="user-profile-image" id="profile-preview">
                                                                        <div class="avatar-xs p-0 rounded-circle profile-photo-edit">
                                                                            <input type="hidden" id="profile_pic" name="profile_pic">
                                                                            <input id="profile-img-file-input" type="file" class="profile-img-file-input" accept="image/*" data-preview-class="user-profile-image" data-upload-type="users" data-filename-input='profile_pic'>
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
                                                    <div class="col-xxl-8">
                                                        <div class="row gy-2">
                                                            <div class="col-xxl-6 col-md-6">
                                                                <div>
                                                                    <label for="first_name" class="form-label">First Name <span class="text-danger">*</span></label>
                                                                    <input type="text" class="form-control" id="first_name" name="first_name">
                                                                </div>
                                                            </div>
                                                            <div class="col-xxl-6 col-md-6">
                                                                <div>
                                                                    <label for="last_name" class="form-label">Last Name <span class="text-danger">*</span></label>
                                                                    <input type="text" class="form-control" id="last_name" name="last_name">
                                                                </div>
                                                            </div>
                                                            <div class="col-xxl-6 col-md-6">
                                                                <div>
                                                                    <label for="username" class="form-label">Username <span class="text-danger">*</span></label>
                                                                    <input type="text" class="form-control" id="username" name="username">
                                                                </div>
                                                            </div>
                                                            <div class="col-xxl-6 col-md-6">
                                                                <div>
                                                                    <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
                                                                    <input type="email" class="form-control" id="email" name="email">
                                                                </div>
                                                            </div>
                                                            <!-- <div class="col-xxl-6 col-md-6">
                                                                <div>
                                                                    <label for="password" class="form-label">Password <?php
                                                            if (isset($id) && $id > 0)
                                                            {

                                                            }
                                                            else
                                                            {
                                                                ?>
                                                                                <span class="text-danger">*</span>
                                                            <?php } ?>
                                                                    </label>
                                                                    <div class="position-relative auth-pass-inputgroup mb-3">
                                                                    <input type="password" class="form-control password-input" id="password" name="password" <?= isset($id) && $id > 0 ? '' : 'required' ?> autocomplete="new-password">
                                                                    <button class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon"><i class="ri-eye-fill align-middle"></i></button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-xxl-6 col-md-6">
                                                                <div>
                                                                    <label for="confirm_password" class="form-label">Confirm Password <?php
                                                            if (isset($id) && $id > 0)
                                                            {

                                                            }
                                                            else
                                                            {
                                                                ?>
                                                                                <span class="text-danger">*</span>
                                                            <?php } ?></label>
                                                                    <input type="password" class="form-control" id="confirm_password" name="confirm_password" <?= isset($id) && $id > 0 ? '' : 'required' ?> autocomplete="new-password">
                                                                </div>
                                                            </div> -->
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">Mobile</label>
                                                    <div class="input-group">
                                                        <span class="input-group-text">+44</span>
                                                        <input type="text" class="form-control mobile-mask" id="mobile" name="mobile">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">Telephone</label>
                                                    <div class="input-group">
                                                        <span class="input-group-text">+44</span>
                                                        <input type="text" class="form-control telephone-mask" id="telephone" name="telephone">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">Qualification / Certification</label>
                                                    <input type="text" class="form-control" id="qualification" name="qualification">
                                                </div>
                                            </div>
                                        </div>

                                        <h5 class="fs-16 mb-0 mt-3">Address</h5>
                                        <hr class="mb-2 mt-1">
                                        <div class="row gy-2">
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">Street Address</label>
                                                    <input type="text" class="form-control" id="address" name="address">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">Town</label>
                                                    <input type="text" class="form-control" id="town" name="town">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">County</label>
                                                    <input type="text" class="form-control" id="county" name="county">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">Postcode</label>
                                                    <input type="text" class="form-control postalcode-mask" id="postcode" name="postcode">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">Color Code</label>
                                                    <input type="color" class="form-control postalcode-mask" id="color_code" name="color_code">
                                                </div>
                                            </div>
                                        </div>
                                        <h5 class="fs-16 mb-0 mt-3">User Roles</h5>
                                        <hr class="mb-2 mt-1">
                                        <div class="row">
                                            <div class="col-xxl-4 col-md-4">
                                                <div class="input-light">
                                                    <label class="form-label">User Types <span class="text-danger">*</span></label>
                                                    <select class="form-control select2" id="user_type" name="user_type">
                                                        <option value="" selected>Select</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div class="input-light">
                                                    <label class="form-label">Role <span class="text-danger">*</span></label>
                                                    <select class="form-control select2" id="role_id" name="role_id">
                                                        <option value="" selected>Select</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="col-xxl-4 col-md-6">
                                                <label class="form-label">&nbsp;</label>
                                                <div class="mt-2">
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox" id="poie" data-name="poie" value="1">
                                                        <label class="form-check-label" for="poie">PAYEE</label>
                                                    </div>
                                                    <div class="form-check form-check-inline hide engr-section">
                                                        <input class="form-check-input" type="checkbox" id="is_contract_engineer" data-name="is_contract_engineer" value="1">
                                                        <label class="form-check-label" for="is_contract_engineer">Is Contractor Engineer</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4" id="contractor-sec" style="display: none;">
                                                <div class="input-light">
                                                    <label class="form-label">Contractor</label>
                                                    <select class="form-control select2" id="contractor_id" name="contractor_id">
                                                        <option value="" selected>Select</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4" id="worksheet-sec" style="display: none;">
                                                <label class="form-label">&nbsp;</label>
                                                <div class="mt-2">
                                                    <div class="form-check form-check-inline ">
                                                        <input class="form-check-input" type="checkbox" checked="checked" id="enable_worksheet_submission" data-name="enable_worksheet_submission" value="1">
                                                        <label class="form-check-label" for="enable_worksheet_submission">Enable Worksheet Submission</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="engineer-details" class="col-lg-12 mb-2" style="display: none;">
                                                <h5 class="fs-16 mb-0 mt-3">Engineer Details</h5>
                                                <hr class="mb-2 mt-1">
                                                <div class="row gy-2">
                                                    <div class="col-xxl-4 col-md-4">
                                                        <div>
                                                            <label for="engineer_code" class="form-label">Engineer Id</label>
                                                            <input type="text" class="form-control" id="engineer_code" name="engineer_code" maxlength="50">
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-8 col-md-8">
                                                        <div class="input-light">
                                                            <label class="form-label">Test Instruments</label>
                                                            <select class="form-control select2" id="test_instrument_ids" name="test_instrument_ids[]" multiple>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- One Make / Model / Serial Number row per selected instrument,
                                                     built by render_instrument_rows() in users.js. -->
                                                <div id="instrument-detail-sec" class="mt-2" style="display: none;">
                                                    <div id="instrument-rows"></div>
                                                </div>
                                            </div>
                                            <div id="work-details" class="col-lg-12 mb-2" style="display: none;">
                                                <h5 class="fs-16 mb-0 mt-3">Work Details</h5>
                                                <hr class="mb-2 mt-1">
                                                <div class="row gy-0">
                                                    <div class="col-xxl-4 col-md-4">
                                                        <div class="input-light multi-choice">
                                                            <label class="form-label">Working Hours</label>
                                                            <input type="text" class="form-control" id="working_hour" name="working_hour">
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-4 col-md-4">
                                                        <div>
                                                            <label class="form-label">Standard Rate / Hr.</label>
                                                            <div class="input-group mb-3">
                                                                <span class="input-group-text">£</span>
                                                                <input type="number" value="0.00" step="0.01" name="standard_rate" id="standard_rate" class="form-control" aria-label="Dollar amount (with dot and two decimal places)">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-4 col-md-4">
                                                        <div>
                                                            <label class="form-label">Extended Rate / Hr.</label>
                                                            <div class="input-group mb-3">
                                                                <span class="input-group-text">£</span>
                                                                <input type="number" value="0.00" step="0.01" name="extended_rate" id="extended_rate" class="form-control" aria-label="Dollar amount (with dot and two decimal places)">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-4 col-md-4">
                                                        <div>
                                                            <label class="form-label">Weekend Rate / Hr.</label>
                                                            <div class="input-group mb-3">
                                                                <span class="input-group-text">£</span>
                                                                <input type="number" value="0.00" step="0.01" name="weekend_rate" id="weekend_rate" class="form-control" aria-label="Dollar amount (with dot and two decimal places)">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-4 col-md-4">
                                                        <div>
                                                            <label class="form-label">Holiday Rate / Hr.</label>
                                                            <div class="input-group mb-3">
                                                                <span class="input-group-text">£</span>
                                                                <input type="number" value="0.00" step="0.01" name="holiday_rate" id="holiday_rate" class="form-control" aria-label="Dollar amount (with dot and two decimal places)">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-4 col-md-4">
                                                        <div>
                                                            <label class="form-label">Overhead </label>
                                                            <div class="input-group mb-3">
                                                                <span class="input-group-text">%</span>
                                                                <input 
                                                                    type="number" 
                                                                    value="0" 
                                                                    min="0" 
                                                                    max="100"
                                                                    name="overhead_percentage" 
                                                                    id="overhead_percentage" 
                                                                    class="form-control" 
                                                                    placeholder="0"
                                                                    aria-label="Overhead percentage">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-4 col-md-6">
                                                        <label class="form-label">Geo Location Tracking</label>
                                                        <div class="col-xxl-4 col-md-6">
                                                            <div class="flex-shrink-0">
                                                                <div class="form-check form-switch form-switch-lg">
                                                                    <!--<label for="nestednavscrollspy-showcode" class="form-label text-muted me-4">Enable/Disable</label>-->
                                                                    <input class="form-check-input code-switcher me-1" type="checkbox" name="geo_location_tracking" id="geo_location_tracking" value="1" checked>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h5 class="fs-16 mb-0 mt-3">Department and Skill Details</h5>
                                                <hr class="mb-2 mt-1">
                                                <div class="row gy-2">
                                                    <div class="col-xxl-4 col-md-4">
                                                        <div>
                                                            <label class="form-label">Department</label>
                                                            <select class="form-control select2" id="department_id" name="department_id">
                                                                <option value="" selected>Select</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-8 col-md-4">
                                                        <div>
                                                            <label class="form-label">Skills</label>
                                                            <select class="form-control select2" id="skill_ids" name="skill_ids[]" multiple>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-4 col-md-4">
                                                        <div class="input-light">
                                                            <label class="form-label">Work Stream</label>
                                                            <select class="form-control select2" id="workstream_id" name="workstream_id">
                                                                <option value="" selected>Select</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-8 col-md-4">
                                                        <div class="input-light">
                                                            <label class="form-label">Job Types</label>
                                                            <select class="form-control select2" id="service_ids" name="service_ids[]" multiple>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div hidden class="hide ajs_contracts_row" style="display:none;"><div class="row gy-2 pt-2"><div class="col-xxl-4 col-md-4"><div class="input-light"><label class="form-label">Client</label><div class="d-flex"><select class="form-control ajs_clients" name="ajs_clients[]" id="ajs_clients"><option value="" selected>Select Client</option></select></div></div></div><div class="col-xxl-4 col-md-5"><div class="input-light"><label for="ajs_contracts" class="form-label">Contracts <span class="text-danger">*</span></label><select multiple name="ajs_contracts[]" id="ajs_contracts" class="form-control ajs_contracts"></select></div></div><div class="col-xxl-1 col-md-1"><br/><button type="button" class="remove-connection ms-auto btn btn-danger popup-add-btn"><i class="ri-close-line"></i></button></div></div></div>
                                        <div id="client_ajs_contact_form">
                                            <h5 class="mb-0 mt-3 d-flex align-items-end">AJS Contracts
                                                <button type="button" class="ms-auto btn btn-success add-connections popup-add-btn">
                                                    <i class="ri-add-line align-bottom"></i>
                                                </button>
                                            </h5>
                                            <hr class="mt-1 mb-0">
                                            <?php if (!isset($edit) && !isset($id))
                                            {
                                                ?>
                                                <div class="row gy-2 pt-2">
                                                    <div class="col-xxl-4 col-md-4">
                                                        <div class="input-light">
                                                            <label class="form-label">Client</label>
                                                            <div class="d-flex">
                                                                <select class="form-control ajs_clients" name="ajs_clients[]" id="ajs_clients0">
                                                                    <option value="" selected>Select Client</option>
                                                                </select>
                                                                    <!-- <button type="button" class="btn btn-success ms-2 popup-form-button-master popup-add-btn" data-heading="Add New Select Client" data-after-load-func="create_master_form" data-element="ajs_contact_type" data-form-url="<?= base_url('system/master-record/create/AJS_CONTACT_TYPES') ?>"><i class="ri-add-line align-bottom"></i></button> -->
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-4 col-md-5">
                                                        <div class="input-light">
                                                            <label for="ajs_contracts0" class="form-label">Contracts <span class="text-danger">*</span></label>
                                                            <select multiple name="ajs_contracts[]" id="ajs_contracts0" class="form-control ajs_contracts">
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
<?php } ?>
                                        </div>

                                        <h5 class="fs-16 mb-0 mt-3">Other Details</h5>
                                        <hr class="mb-2 mt-1">
                                        <div class="row gy-2 align-items-center">
                                            <div class="col-xl-12 col-lg-12">
                                                <div>
                                                    <label class="form-label">Other Info</label>
                                                    <input type="text" class="form-control" id="other_info" name="other_info">
                                                </div>
                                            </div>
                                                <div class="col-xl-4 col-lg-6">
                                                    <div class="flex-shrink-0">
                                                        <div class="form-check form-switch form-switch-lg">
                                                            <label for="nestednavscrollspy-showcode" class="form-label text-muted me-3">Activate / De-activate</label>
                                                            <input class="form-check-input code-switcher me-1" type="checkbox" data-name="status" id="user-status" value="1" checked  style="left: -8px;">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xl-4 col-lg-6">
                                                    <div >
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="checkbox" id="send_verification_link" data-name="send_verification_link" value="1" checked>
                                                            <label class="form-check-label" for="send_verification_link">Send verification link</label>
                                                        </div>
                                                    </div>
                                                </div>                                                
                                                <div class="col-xl-4 col-lg-6 pwd-sec hide">
                                                    <div>
                                                        <label for="password" class="form-label">Password <?php
                                                            if (isset($id) && $id > 0)
                                                            {

                                                            }
                                                            else
                                                            {
                                                                ?>
                                                                <span class="text-danger">*</span>
                                                        <?php } ?>
                                                        </label>
                                                        <div class="position-relative auth-pass-inputgroup mb-3">
                                                            <input type="password" class="form-control password-input" id="password" name="password" <?= isset($id) && $id > 0 ? '' : 'required' ?> autocomplete="new-password">
                                                            <button class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon"><i class="ri-eye-fill align-middle"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xl-4 col-lg-6 pwd-sec hide">
                                                    <div class="pb-3">
                                                        <label for="confirm_password" class="form-label">Confirm Password <?php
                                                            if (isset($id) && $id > 0)
                                                            {

                                                            }
                                                            else
                                                            {
                                                                ?>
                                                                <span class="text-danger">*</span>
                                                        <?php } ?></label>
                                                        <input type="password" class="form-control" id="confirm_password" name="confirm_password" <?= isset($id) && $id > 0 ? '' : 'required' ?> autocomplete="new-password">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-4">
                                                    <div class="mt-2">
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="checkbox" id="is_dialpad_user" data-name="is_dialpad_user" value="1">
                                                            <label class="form-check-label" for="poie">Is Dialpad User ?</label>
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
                                <button type="button" class="btn btn-light waves-effect waves-light close-offcanvas" id="close-modal" >Close</button>
                                <div id="deleteBtnContainer"></div>
                                <?php if (isset($edit) && $edit && isset($id) && $id > 0) {?>               
                                    <script>
                                        document.getElementById('deleteBtnContainer').innerHTML = delete_icon(<?= $id ?>, 'user');
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
    <input type="hidden" id="is_create_page" value="1">
    <!-- End Page-content -->
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/systems/users.js') ?>"></script>
    <script src="<?= cnd_url('assets/js/pages/password-addon.init.js'); ?>"></script>