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
                        <h4 class="mb-sm-0">Add New Master</h4>
                        <div class="page-title-right">
                            <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item"><a href="javascript: void(0);">Resources Set up</a></li>
                                <li class="breadcrumb-item active">Add Master</li>
                            </ol>
                        </div>

                    </div>
                </div>
            </div>
            <!-- end page title -->
            <div class="row">
                <?php
                $action = app_url('job-task/create');
                if (isset($edit) && $edit && isset($task_id) && $task_id > 0) {
                    $action = app_url('job-task/edit/');
                }
                ?>
                <form class="tablelist-form pb-4 simplebar-form" action="<?= $action ?>" method="POST"
                    name="createTaskForm" id="createTaskForm" style="height: calc(100vh - 112px);" data-simplebar
                    autocomplete="off">
                    <div class="p-0 overflow-hidden pb-3">
                        <div>
                            <div class="acitivity-timeline p-4 pt-2">
                                <div class="modal-body pb-3">
                                    <style>
                                        /* Compact Docs/Media dropzone — it doesn't need to dominate the form.
                                           Placed inside the injected .row so the offcanvas loader keeps it. */
                                        #dropzone-docs.dropzone-compact { min-height: 90px !important; padding: 10px !important; }
                                        #dropzone-docs.dropzone-compact .dz-message { margin: 0.5em 0 !important; }
                                        #dropzone-docs.dropzone-compact .dz-message h4 { font-size: 0.9rem; }
                                        #dropzone-docs.dropzone-compact .dz-message .display-4 { font-size: 1.6rem !important; }
                                    </style>
                                    <!-- Property context: address, contact details & alerts (read-only reference) -->
                                    <div class="row gy-2 mb-2" id="task_property_context">
                                        <div class="col-12">
                                            <div class="border-main-details">
                                                <h5 class="fs-14 mb-2 d-flex align-items-center">Property Details
                                                    <button type="button" class="btn btn-primary btn-sm ms-auto" id="task_property_edit_btn" title="Edit Property Details"><i class="ri-pencil-line"></i></button>
                                                </h5>
                                                <table class="table table-sm table-borderless mb-0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="fw-medium text-nowrap pe-2" style="width:9%">Address</td>
                                                            <td style="width:41%"><span id="task_property_address"></span></td>
                                                            <td class="fw-medium text-nowrap ps-4 pe-2" style="width:9%">Email</td>
                                                            <td><span id="task_property_email"></span></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="fw-medium text-nowrap pe-2">Mobile</td>
                                                            <td><span id="task_property_mobile"></span></td>
                                                            <td class="fw-medium text-nowrap ps-4 pe-2">Telephone</td>
                                                            <td><span id="task_property_telephone"></span></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="fw-medium text-nowrap pe-2">Alerts</td>
                                                            <td><span id="task_property_alerts"></span></td>
                                                            <td class="fw-medium text-nowrap ps-4 pe-2">Access Note</td>
                                                            <td><span id="task_property_access_note"></span></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="hidden" id="tasksId" />
                                    <div class="row gy-2">
                                        <div class="col-xxl-6 col-md-6">
                                            <input type="hidden" name="job_id_hidden" id="job_id_hidden" />
                                            <input type="hidden" name="task_user_type_hidden"
                                                id="task_user_type_hidden" />
                                            <div>
                                                <label for="basiInput" class="form-label">Task ID</label>
                                                <input type="text" value="" readonly class="form-control" id="task_code"
                                                    name="task_code">
                                            </div>
                                        </div>
                                        <div class="col-xxl-6 col-md-6">
                                            <div>
                                                <label for="basiInput" class="form-label">Select Task <span
                                                        class="text-danger">*</span></label>
                                                <select class="form-control" id="task_id" name="task_id">
                                                    <option value="">Select Task</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="row">
                                                <div class="col-xxl-6 col-md-6 internal_task_fields"
                                                    style="display:none">
                                                    <div>
                                                        <label for="basiInput" class="form-label">Select Appointment
                                                            Template <span class="text-danger">*</span></label>
                                                        <select class="form-control select2" id="appointment_template_id"
                                                            name="appointment_template_id">
                                                            <option value="">Appointment Template</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-6 col-md-6 internal_task_fields"
                                                    style="display:none">
                                                    <div>
                                                        <label for="parent_job_task_id" class="form-label">Select External Task</label>
                                                        <select class="form-control" id="parent_job_task_id"
                                                            name="parent_job_task_id">
                                                            <option value="">Select External Task</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-6 col-md-6 internal_task_fields"
                                                    style="display:none">
                                                    <div class="mt-4">
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="is_send_now" name="is_send_now" value="1">
                                                            <label class="form-check-label" for="is_send_now">Send Now</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-xxl-6 col-md-6">
                                            <div>
                                                <label for="basiInput" class="form-label">Skill</label>
                                                <input type="text" class="form-control" id="skill" name="skill" value=""
                                                    readonly />
                                                <input type="hidden" class="form-control" id="skill_id" name="skill_id"
                                                    value="" />
                                            </div>
                                        </div>
                                        <div class="col-xxl-6 col-md-6">
                                            <div>
                                                <label for="basiInput" class="form-label">Task type</label>
                                                <input type="text" class="form-control" id="task_type_name"
                                                    name="task_type_name" value="" readonly />
                                                <input type="hidden" class="form-control" id="task_type"
                                                    name="task_type" value="" />
                                            </div>
                                        </div>
                                        <div class="col-xxl-6 col-md-6">
                                            <div>
                                                <label for="basiInput" class="form-label">Status <span
                                                        class="text-danger">*</span></label>
                                                <select class="form-control" id="status_id" name="status_id">
                                                    <option value="">Select Status</option>
                                                </select>
                                            </div>
                                        </div>
                                        <!-- Task cancellation reason (all clients). Hidden by default; shown
                                             next to Status only when the task is set to the "Cancelled" status.
                                             Reasons come from the client's own list, or the default list if none.
                                             The label is shown; the code is posted/stored. -->
                                        <div class="col-xxl-6 col-md-6" id="cancel_reason_wrap" style="display:none">
                                            <div>
                                                <label for="cancellation_reason_id" class="form-label">Cancellation Reason <span
                                                        class="text-danger">*</span></label>
                                                <select class="form-control" id="cancellation_reason_id" name="cancellation_reason">
                                                    <option value="">Select Reason</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-xxl-6 col-md-6">
                                            <div>
                                                <label for="sor_id_task" class="form-label">Overhead SOR</label>
                                                <div class="input-light">
                                                    <div class="d-flex error-div select-btn-fixed">
                                                        <select class="form-control" id="sor_id_task"
                                                            name="sor_id_task">
                                                            <option value="">Select SOR</option>
                                                        </select>
                                                        <button type="button"
                                                            class="btn btn-primary ms-2 popup-form-search-button popup-add-btn"
                                                            data-heading="Search SORs" data-element="sor_id_task"
                                                            data-after-load-func="set_sor_id_task"
                                                            data-form-url="<?= base_url('system/sor/search-list') ?>"><i
                                                                class="mdi mdi-magnify search-widget-icon"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xxl-12 col-md-12">
                                            <div class="input-light jobs-tags1">
                                                <label class="form-label">Tags</label>
                                                <div class="d-flex select-btn-fixed">
                                                    <select class="form-control" name="tags[]" id="task_tags"
                                                        data-module="task" multiple>
                                                    </select>
                                                    <button type="button"
                                                        class="btn btn-success ms-2 popup-form-button-master popup-add-btn"
                                                        data-heading="Add New Tag"
                                                        data-after-load-func="create_tag_form" data-element="task_tags"
                                                        data-form-url="<?= cdn_url('system/tag/create?in_popup=1') ?>"><i
                                                            class="ri-add-line align-bottom"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xxl-12 col-md-12">
                                            <div class="input-light">
                                                <label class="form-label">Task Description</label>
                                                <div class="d-flex">
                                                    <textarea class="form-control service-desc" rows="2"
                                                        id="task_description" name="task_description"></textarea>

                                                    <button type="button"
                                                        class="btn btn-primary ms-2 popup-form-search-button popup-add-btn phrasebook-btn"
                                                        data-heading="Use Phrasebook" data-element="task_description"
                                                        data-form-url="<?= base_url('system/phrasebook/search-list') ?>"><i
                                                            class="mdi mdi-book-open-page-variant search-widget-icon"></i></button>
                                                </div>
                                            </div>
                                        </div>

                                        <div style="display: none" class="external_task_fields">
                                            <div class="row">
                                                <div class="col-xxl-6 col-md-6 mb-2">
                                                    <div>
                                                        <label for="basiInput" class="form-label">Geo-Fencing <span
                                                                class="text-danger">*</span><span
                                                                class="tooltip-container"
                                                                data-master-code="GEO_FENCING"><i
                                                                    class="bx bx-info-circle tooltip"></i></span></label>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" id="geo_fencing_0"
                                                                type="radio" name="geo_fencing" value="1" >
                                                            <label class="form-check-label"
                                                                for="geo_fencing_0">Enabled</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" id="geo_fencing_1"
                                                                type="radio" name="geo_fencing" value="0" checked>
                                                            <label class="form-check-label"
                                                                for="geo_fencing_1">Disable</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <h5 class="fs-16 mb-0">Assets Management</h5>
                                            <hr class="mt-2 mb-3">
                                            <div class="row mb-2">
                                                <div class="col-xxl-6 col-md-6 asset-type-id">
                                                    <div>
                                                        <label for="asset_type_id" class="form-label">Asset Type</label>
                                                        <select class="form-control select2" name="asset_type_id"
                                                            id="asset_type_id">
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-2 col-md-2">
                                                    <div>
                                                        <label for="work_asset_quantity" class="form-label">Work Asset
                                                            Quantity</label>
                                                        <input type="text" class="form-control number-only"
                                                            id="work_asset_quantity" name="work_asset_quantity"
                                                            value="1">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-md-12">
                                                <div class="input-light">
                                                    <label class="form-label assets-label">Assets</label>
                                                    <div class="d-flex">
                                                        <select class="form-control select2" name="asset_ids[]"
                                                            id="asset_ids" multiple>
                                                        </select>
                                                        <button type="button"
                                                            class="btn btn-primary ms-2 popup-form-search-button popup-add-btn asset-search-btn"
                                                            data-heading="Search Assets" data-element="asset_ids"
                                                            data-after-load-func="set_asset_id_task"
                                                            data-form-url="<?= base_url('assets/search-list') ?>"><i
                                                                class="mdi mdi-magnify search-widget-icon"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="task-sor-section">
                                                <h5 class="mb-0 mt-3 d-flex align-items-end">Task SORs
                                                    <button type="button"
                                                        class="add-task-sor ms-auto btn btn-success popup-add-btn">
                                                        <i class="ri-add-line align-bottom"></i>
                                                    </button>
                                                </h5>
                                                <hr class="mt-1 mb-0">
                                                <!-- Shown only on an invoiced job: the billed total is frozen, so
                                                     lines can be rebalanced but the total must still match. Purely
                                                     an aid — the server enforces the same rule on save. -->
                                                <div id="invoiced_total_banner" class="alert py-2 px-3 mt-2 mb-0 d-none">
                                                    <span>Invoiced total: <strong id="invoiced_total_target">0.00</strong></span>
                                                    <span class="ms-3">This task now: <strong id="invoiced_total_current">0.00</strong></span>
                                                    <span class="ms-3" id="invoiced_total_hint"></span>
                                                </div>
                                                <div class="row g-2 gy-1 pt-2 task-sor-row">
                                                    <input type="hidden" class="row-id" name="task_sors[0][id]"
                                                        value="0" />
                                                    <div class="col-xxl-2">
                                                        <label class="form-label">Pricing Model</label>
                                                        <select class="form-control pricing-model" required
                                                            name="task_sors[0][pricing_model]" required>
                                                            <option value="1" selected>SOR</option>
                                                            <option value="2">Band Price</option>
                                                            <option value="3">Fixed Price</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-xxl-3">
                                                        <label class="form-label">Asset</label>
                                                        <select class="form-control sor-asset select2"
                                                            name="task_sors[0][asset_id]" id="asset_id_0">
                                                            <option value=''>Select</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-xxl-1 col-md-1">
                                                        <div class="input-light">
                                                            <label class="form-label">Quantity</label>
                                                            <input type="number"
                                                                class="form-control number-only sor-qty"
                                                                name="task_sors[0][quantity]" value="1" />
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-3 col-md-4">
                                                        <div class="input-light">
                                                            <label class="form-label">SOR</label>
                                                            <div class="d-flex error-div select-btn-fixed">
                                                                <select class="form-control sor-id"
                                                                    name="task_sors[0][sor_id]" id="sor_id_0"
                                                                    validateDuplicateSor="true" required>
                                                                    <option value="" selected>Select</option>
                                                                </select>
                                                                <button type="button"
                                                                    class="btn btn-primary ms-2 popup-form-search-button popup-add-btn"
                                                                    data-heading="Search SORs" data-element="sor_id_0"
                                                                    data-after-load-func="set_sor_id_task"
                                                                    data-form-url="<?= base_url('system/sor/search-list') ?>"><i
                                                                        class="mdi mdi-magnify search-widget-icon"></i></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-1 col-md-4">
                                                        <div class="input-light">
                                                            <label class="form-label">Material</label>
                                                            <input type="number"
                                                                class="form-control number-only material-rate text-end"
                                                                name="task_sors[0][material_price]" disabled />
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-1 col-md-4">
                                                        <div class="input-light">
                                                            <label class="form-label">Labour</label>
                                                            <input type="number"
                                                                class="form-control labour-rate text-end"
                                                                name="task_sors[0][labor_price]" disabled />
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-1 col-md-4">
                                                        <div class="input-light">
                                                            <label class="form-label">Sell</label>
                                                            <input type="number" class="form-control sell-rate text-end"
                                                                name="task_sors[0][sell_price]" disabled />
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-3">
                                                        <label class="form-label">Description</label>
                                                        <input type="text" class="form-control desc"
                                                            name="task_sors[0][description]" />
                                                    </div>
                                                    <div class="col-xxl-1 col-md-4">
                                                        <div class="input-light">
                                                            <label class="form-label mb-2">Chargeable?</label>
                                                            <div class="form-check form-switch">
                                                                <input type="hidden" name="task_sors[0][is_chargeable]"
                                                                    value="0">
                                                                <input class="form-check-input" type="checkbox"
                                                                    role="switch" name="task_sors[0][is_chargeable]"
                                                                    value="1" checked>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-1 col-md-4">
                                                        <div class="input-light">
                                                            <label class="form-label mb-2">Payable?</label>
                                                            <div class="form-check form-switch">
                                                                <input type="hidden" name="task_sors[0][is_payable]"
                                                                    value="0">
                                                                <input class="form-check-input" type="checkbox"
                                                                    role="switch" name="task_sors[0][is_payable]"
                                                                    value="1" checked>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-1 col-md-1 ">
                                                        <label class="form-label">&nbsp;</label><br />
                                                        <button type="button"
                                                            class="btn btn-danger delete-task-sor popup-close-btn">
                                                            <i class="ri-close-line"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="clearfix"><br /></div>
                                            <h5 class="fs-16 mb-0">Task Assignment</h5>
                                            <hr class="mt-2 mb-3">
                                            <div class="row">
                                                <div class="col-xxl-6 col-md-6 ">
                                                    <div>
                                                        <label for="basiInput" class="form-label">Assignment Type <span
                                                                class="text-danger">*</span></label>
                                                        <select required class="form-control select2"
                                                            id="preferred_time_range" name="preferred_time_range">
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="clearfix"></div>
                                                <div class="col-xxl-6 col-md-6 mt-2">
                                                    <div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input task-assign"
                                                                id="is_assigned_0" type="radio" name="is_assigned"
                                                                value="0" checked>
                                                            <label class="form-check-label" for="is_assigned_0">Add task
                                                                to queue</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input task-assign"
                                                                id="is_assigned_1" type="radio" name="is_assigned"
                                                                value="1">
                                                            <label class="form-check-label" for="is_assigned_1">Assign
                                                                now</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="clearfix"></div>
                                                <div class="col-xxl-6 col-md-6 not_assign_div mt-2">
                                                    <div>
                                                        <label for="basiInput" class="form-label">Select Queue <span class="text-danger">*</span></label>
                                                        <select class="form-control select2" id="queue_id"
                                                            name="queue_id">
                                                            <option value="">Select Queue</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-6 col-md-6 d-flex is-an-appointment-div"
                                                    style="display: none !important;">
                                                    <label for="labelInput" class="form-label me-3">Is this an
                                                        Appointment?</label>
                                                    <div class="clearfix"></div>
                                                    <div class="">
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input appointment-radio"
                                                                name="is_appointment" type="radio" id="is_appointment0"
                                                                value="0">
                                                            <label class="form-check-label"
                                                                for="is_appointment0">No</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input appointment-radio"
                                                                name="is_appointment" type="radio" id="is_appointment1"
                                                                value="1" checked>
                                                            <label class="form-check-label"
                                                                for="is_appointment1">Yes</label>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div class="clearfix"></div>
                                                <div class="col-xxl-6 col-md-6 mt-2 appointment_div assign_div"
                                                    style="display: none">
                                                    <label for="labelInput" class="form-label me-3">Is Appointment
                                                        Confirmed?</label>
                                                    <div class="clearfix"></div>
                                                    <div class="">
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input is_appointment_confirmed"
                                                                name="is_appointment_confirmed" type="radio"
                                                                id="is_appointment_confirmed0" value="0" checked="">
                                                            <label class="form-check-label"
                                                                for="is_appointment_confirmed0">No</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input is_appointment_confirmed"
                                                                name="is_appointment_confirmed" type="radio"
                                                                id="is_appointment_confirmed1" value="1">
                                                            <label class="form-check-label"
                                                                for="is_appointment_confirmed1">Yes</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="clearfix"></div>
                                                <div class="col-xxl-6 col-md-6  mt-2 assign_div "
                                                    style="display: none;">
                                                    <div class="appointment_div">
                                                        <label for="labelInput" class="form-label">Attend On Date <span
                                                                class="text-danger">*</span></label>
                                                        <input type="date" min="<?php echo date("Y-m-d"); ?>"
                                                            class="form-control" id="appointment_date"
                                                            name="appointment_date">
                                                    </div>
                                                </div>
                                                <!--end col-->
                                                <div class="col-xxl-6 col-md-6  mt-2 assign_div "
                                                    style="display: none;">
                                                    <div class="appointment_div">
                                                        <label for="labelInput" class="form-label">Attend On Time <span
                                                                class="text-danger">*</span></label>
                                                        <input type="time" class="form-control" id="appointment_time"
                                                            name="appointment_time">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="assign_div row" style="display: none;">
                                                <div class="col-xxl-6 col-md-6 mt-2">
                                                    <div class="preferred_date_div">
                                                        <label for="labelInput" class="form-label">Target Date <span
                                                                class="text-danger">*</span></label>
                                                        <input type="date" min="<?php echo date("Y-m-d"); ?>"
                                                            class="form-control" id="preferred_date"
                                                            name="preferred_date">
                                                    </div>
                                                </div>
                                                <!--end col-->
                                                <div class="col-xxl-6 col-md-6 mt-2">
                                                    <div class="preferred_date_div">
                                                        <label for="labelInput" class="form-label">Target Time <span
                                                                class="text-danger">*</span></label>
                                                        <input type="time" class="form-control" id="preferred_time"
                                                            name="preferred_time">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-6 col-md-6 mt-2">
                                                    <div class="input-light multi-choice">
                                                        <label class="form-label">Assign To <span
                                                                class="text-danger">*</span></label>
                                                        <div class="d-flex input-group">
                                                            <select class="form-control" id="engineer_id"
                                                                name="engineer_id">
                                                                <option value="">Select</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-xxl-12 col-md-12">
                                            <div class="input-light">
                                                <label for="basiInput" class="form-label">Summary/Notes</label>
                                                <div class="d-flex">
                                                    <textarea class="form-control" id="summary" rows="6"
                                                        style="min-height:140px;" name="summary"></textarea>

                                                    <button type="button"
                                                        class="btn btn-primary ms-2 popup-form-search-button popup-add-btn phrasebook-btn"
                                                        data-heading="Use Phrasebook" data-element="summary"
                                                        data-form-url="<?= base_url('system/phrasebook/search-list') ?>"><i
                                                            class="mdi mdi-book-open-page-variant search-widget-icon"></i></button>
                                                </div>

                                            </div>
                                        </div>

                                        <div class="col-lg-12">
                                            <label>Docs/Media</label>

                                            <div class="">
                                                <div class="dropzone dropzone-compact" id="dropzone-docs">
                                                    <div class="fallback">
                                                        <input name="docs" type="file" accept="application/pdf"
                                                            multiple="multiple">
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
                                                                <div class="flex-shrink-0 me-2">
                                                                    <div class="avatar-sm bg-light rounded">
                                                                        <img data-dz-thumbnail
                                                                            class="img-fluid rounded d-block"
                                                                            src="<?= cdn_url('assets/images/new-document.png') ?>" />
                                                                    </div>
                                                                </div>
                                                                <div class="flex-grow-1">
                                                                    <div class="pt-1">
                                                                        <p class="fs-12 mb-1 truncate" data-dz-name>
                                                                            &nbsp;</p>
                                                                        <!-- <p class="fs-13 text-muted mb-0" data-dz-size></p> -->
                                                                        <strong class="error text-danger"
                                                                            data-dz-errormessage></strong>
                                                                    </div>
                                                                </div>
                                                                <div class="flex-shrink-0 ms-3">
                                                                    <button data-dz-remove
                                                                        class="btn btn-icon-sm btn-danger"
                                                                        data-delete-url="job/delete-file/"><i
                                                                            class="ri-close-line"></i></button>
                                                                </div>
                                                            </div>
                                                            <div class="caption p-2">
                                                                <input type="hidden" name="documents[]"
                                                                    class="name-input">
                                                                <input type="hidden" name="document_ids[]"
                                                                    class="id-input" value="0">
                                                                <input type="text" name="document_captions[]"
                                                                    class="form-control caption-input"
                                                                    placeholder="Caption goes here">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- end dropzon-preview -->
                                            </div>
                                        </div>
                                        <?php if (isset($edit) && $edit && isset($task_id) && $task_id > 0): ?>
                                        <!-- Read-only task detail panel (edit mode only). Mirrors the task view
                                             window (views/commons/task-details-window.php) but with its own ids so the
                                             two can coexist on the same page. Populated by render_task_edit_details()
                                             in assets/js/datatables/jobs/task-details.js. -->
                                        <div class="col-lg-12 mt-3" id="task_edit_details_panel">
                                            <div class="row gy-2 mb-2">
                                                <div class="col-sm-12 col-md-6 col-lg-7">
                                                    <p style="font-size: 16px;">
                                                        Material <strong><i class="bx bx-pound fw-bold" style="letter-spacing: -2px;"></i><span id="te_total_materials"></span> </strong> &nbsp;|&nbsp;
                                                        Labour <strong><i class="bx bx-pound fw-bold" style="letter-spacing: -2px;"></i><span id="te_total_labors"></span></strong> &nbsp;|&nbsp;
                                                        Sell <strong><i class="bx bx-pound fw-bold" style="letter-spacing: -2px;"></i><span id="te_total_sells"></span></strong> &nbsp; | &nbsp;
                                                        Margin <strong> <span style="color:green" id="te_margins_wrap"><span id="te_margins"></span>%</span></strong>
                                                    </p>
                                                </div>
                                                <div class="col-sm-12 col-md-6 col-lg-5 text-end task-edit-detail-actions mt-1"></div>
                                            </div>
                                            <ul class="client-sub-nav nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1 pt-0" role="tablist">
                                                <li class="nav-item"><a class="nav-link fs-14 active" data-bs-toggle="tab" href="#te-sors" role="tab">SORs</a></li>
                                                <li class="nav-item"><a class="nav-link fs-14" data-bs-toggle="tab" href="#te-assets" role="tab">Assets</a></li>
                                                <li class="nav-item"><a class="nav-link fs-14" data-bs-toggle="tab" href="#te-certificate" role="tab">Certificates</a></li>
                                                <li class="nav-item"><a class="nav-link fs-14" data-bs-toggle="tab" href="#te-media" role="tab">Media</a></li>
                                                <li class="nav-item"><a class="nav-link fs-14" data-bs-toggle="tab" href="#te-events" role="tab">Log</a></li>
                                                <li class="nav-item"><a class="nav-link fs-14" data-bs-toggle="tab" href="#te-safety-feedback" role="tab">H&S</a></li>
                                                <li class="nav-item"><a class="nav-link fs-14" data-bs-toggle="tab" href="#te-observations" role="tab">Observations</a></li>
                                                <li class="nav-item"><a class="nav-link fs-14" data-bs-toggle="tab" href="#te-engineer-comment" role="tab">Engineer Comment</a></li>
                                                <li class="nav-item"><a class="nav-link fs-14" data-bs-toggle="tab" href="#te-manager-comment" role="tab">Manager Comment</a></li>
                                            </ul>
                                            <div class="tab-content stock-tbl-details-main">
                                                <div class="tab-pane active" style="overflow:auto" id="te-sors" role="tabpanel">
                                                    <div class="table-responsive job-sors-box table-card mt-1 tasks-tbl">
                                                        <table class="table table-borderless table-nowrap">
                                                            <thead>
                                                                <tr>
                                                                    <th>SOR #</th>
                                                                    <th>Desc.</th>
                                                                    <th>Engr. Comment</th>
                                                                    <th class="text-end">Material (<i class="bx bx-pound"></i>)</th>
                                                                    <th class="text-end">Labor (<i class="bx bx-pound"></i>)</th>
                                                                    <th class="text-end">Overhead (<i class="bx bx-pound"></i>)</th>
                                                                    <th class="text-end">Overhead ( % )</th>
                                                                    <th class="text-end">Sell (<i class="bx bx-pound"></i>)</th>
                                                                    <th class="text-center">Qty.</th>
                                                                    <th class="text-center">Certs.</th>
                                                                    <th class="text-center">Pics</th>
                                                                    <th>Chargeable</th>
                                                                    <th>Payable</th>
                                                                    <th>CTP</th>
                                                                    <th>Ok</th>
                                                                    <th>Added By</th>
                                                                    <th>Created On</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody class="task-detail-sors"></tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class="tab-pane" style="overflow:auto" id="te-assets" role="tabpanel">
                                                    <div class="table-responsive job-asset-box table-card mt-1 tasks-tbl">
                                                        <table class="table table-borderless table-nowrap">
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Client Asset No.</th>
                                                                    <th>Serial No.</th>
                                                                    <th>Type</th>
                                                                    <th>Make</th>
                                                                    <th>Model</th>
                                                                    <th>Installation Date</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody class="task-detail-assets"></tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class="tab-pane" id="te-certificate" role="tabpanel">
                                                    <div class="table-responsive job-certificate-box table-card mt-1 tasks-tbl" style="overflow:auto">
                                                        <table class="table table-borderless table-nowrap">
                                                            <thead>
                                                                <tr>
                                                                    <th>Action</th>
                                                                    <th>Code</th>
                                                                    <th>Title</th>
                                                                    <th>Required</th>
                                                                    <th>Assigned To</th>
                                                                    <th>Status</th>
                                                                    <th>Added By</th>
                                                                    <th>Created On</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody class="task-detail-certificates"></tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class="tab-pane" id="te-media" role="tabpanel">
                                                    <div class="table-responsive job-media-box table-card mt-1 tasks-tbl" style="overflow:auto">
                                                        <table class="table table-borderless table-nowrap">
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>File Type</th>
                                                                    <th>File Path</th>
                                                                    <th>Caption</th>
                                                                    <th>Added By</th>
                                                                    <th>Upload On</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody class="task-detail-medias"></tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class="tab-pane" style="overflow:auto" id="te-events" role="tabpanel">
                                                    <div class="table-responsive job-event-box table-card mt-1 tasks-tbl">
                                                        <table class="table table-borderless table-nowrap">
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Log Type</th>
                                                                    <th>Added By</th>
                                                                    <th>Log Date</th>
                                                                    <th>Comments</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody class="task-detail-events"></tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class="tab-pane" style="overflow:auto" id="te-safety-feedback" role="tabpanel">
                                                    <div class="table-responsive job-event-box table-card mt-1 tasks-tbl">
                                                        <table class="table table-borderless table-nowrap">
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Question</th>
                                                                    <th>Answer</th>
                                                                    <th>Created date</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody class="task-detail-safety-feedback"></tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class="tab-pane" style="overflow:auto" id="te-observations" role="tabpanel">
                                                    <div class="table-responsive job-event-box table-card mt-1 tasks-tbl">
                                                        <table class="table table-borderless table-nowrap">
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Question</th>
                                                                    <th>Answer</th>
                                                                    <th>Comments</th>
                                                                    <th>Files</th>
                                                                    <th>Created date</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody class="task-detail-observations"></tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class="tab-pane" style="overflow:auto" id="te-engineer-comment" role="tabpanel">
                                                    <div class="p-2 mt-1" id="te_engineer_comments"></div>
                                                </div>
                                                <div class="tab-pane" style="overflow:auto" id="te-manager-comment" role="tabpanel">
                                                    <div class="p-2 mt-1" id="te_manager_comments"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <?php endif; ?>
                                    </div>
                                    <!--end row-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="offcanvas-foorter p-3 text-center">

                        <div class="hstack gap-2">
                            <?php
                            if (isset($edit) && $edit && isset($task_id) && $task_id > 0) {
                                ?>
                                <input type="hidden" id="edit_task_id" name="edit_task_id" value="<?= $task_id ?>" />
                                <!-- Set by the Save and Duplicate button, read back in create_task_form's
                                     submitHandler. No name= so it is never posted, and unlike the clicked
                                     button it survives the NO_ACCESS re-submit. -->
                                <input type="hidden" id="save_and_duplicate" value="0" />
                                <?php
                            } else if (isset($copy) && $copy && isset($task_id) && $task_id > 0) {
                                ?>
                                <input type="hidden" id="edit_task_id" value="<?= $task_id ?>" />
                                <?php
                            }
                            ?>
                            <button type="submit" class="btn btn-success" id="add-btn">Save</button>
                            <?php
                            // Kept after Save: submitHandler resolves its loader target with
                            // :submit:first, which must stay pointing at Save.
                            if (isset($edit) && $edit && isset($task_id) && $task_id > 0) {
                                ?>
                                <button type="submit" class="btn btn-primary" id="save-duplicate-btn">Save and
                                    Duplicate</button>
                                <!-- LBH-only: cancel this task (sends Cancel Appointment to Open Housing) and
                                     create a queued duplicate with the same SORs but no appointment. Shown by
                                     job.js only for LBH jobs. -->
                                <button type="button" class="btn btn-danger" id="cancel-duplicate-btn"
                                    style="display:none">Cancel and Duplicate</button>
                                <?php
                            }
                            ?>
                            <button type="button" class="btn btn-light" id="close-modal"
                                data-bs-dismiss="offcanvas">Close</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- container-fluid -->
    </div>



    <!-- End Page-content -->