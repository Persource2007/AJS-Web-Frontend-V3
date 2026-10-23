<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            $sub_title = 'Create Van';
            include_once APPPATH . 'views/jobs/inc/breadcrumb.php';
            ?>
            <!-- end page title -->
            <div class="row">
                <div class="col-lg-12">
                    <?php
                    $action = app_url('van/create');
                    if (isset($edit) && $edit && isset($id) && $id > 0) {
                        $action = app_url('van/edit/');
                    }
                    ?>
                    <form class="tablelist-form pb-4" action="<?= $action ?>" method="post" id="createForm" autocomplete="off">
                        <input type="hidden" value="<?= $id ?? null ?>" id="edit_id" name="edit_id" />
                        <div class="p-0 overflow-hidden">
                            <div data-simplebar style="height: calc(100vh - 112px);">
                                <div class="acitivity-timeline p-4 pt-2">
                                    <div class="modal-body">
                                        <input type="hidden" id="tasksId" />
                                        <div class="row gy-2">
                                            <h5 class="">Basic Details</h5>
                                            <div class="col-xxl-4 col-md-6">
                                                <div class="row">
                                                    <div class="col-xxl-12">
                                                        <label class="form-label">Make <span class="text-danger">*</span></label>
                                                        <div class="input-light error-div d-flex">
                                                            <select class="form-control" name="make_id" id="make_id">
                                                                <option value="" selected>Select</option>
                                                            </select>
                                                            <a data-heading="Add New Vehicle Manufracturer" data-after-load-func="create_master_form" data-element="make_id" data-form-url="<?= base_url('system/master-record/create/VEHICLE_MAKES') ?>" class="popup-form-button-master btn btn-success popup-add-btn ms-2">
                                                                <i class="ri-add-line align-bottom"></i>
                                                            </a>
                                                        </div>
                                                    </div>
<!--                                                    <div class="col-xxl-3">
                                                        <label for="basiInput" class="form-label">Add</label>
                                                        <a data-heading="Add New Vehicle Manufracturer" data-after-load-func="create_master_form" data-element="make_id" data-form-url="<?= base_url('system/master-record/create/VEHICLE_MAKES') ?>" class="popup-form-button-master ms-auto btn btn-success popup-add-btn">
                                                            <i class="ri-add-line align-bottom"></i>
                                                        </a>
                                                    </div>-->
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-6">
                                                <div class="row">
                                                    <div class="col-xxl-12">
                                                        <label class="form-label">Model <span class="text-danger">*</span></label>
                                                        <div class="input-light error-div d-flex">
                                                            <select class="form-control" name="model_id" id="model_id">
                                                                <option value="" selected>Select</option>
                                                            </select>
                                                            <a data-heading="Add New Vehicle Model" data-after-load-func="create_master_form" data-element="model_id" data-form-url="<?= base_url('system/master-record/create/VEHICLE_MODELS') ?>" class="popup-form-button-master ms-2 btn btn-success popup-add-btn">
                                                                <i class="ri-add-line align-bottom"></i>
                                                            </a>
                                                        </div>
                                                    </div>
<!--                                                    <div class="col-xxl-3">
                                                        <label for="basiInput" class="form-label">Add</label>
                                                        <a data-heading="Add New Vehicle Model" data-after-load-func="create_master_form" data-element="model_id" data-form-url="<?= base_url('system/master-record/create/VEHICLE_MODELS') ?>" class="popup-form-button-master ms-1 btn btn-success popup-add-btn">
                                                            <i class="ri-add-line align-bottom"></i>
                                                        </a>
                                                    </div>-->
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-6">
                                                <div class="input-light">
                                                    <label class="form-label">Van Code <span class="text-danger">*</span></label>
                                                    <input type="text" class="form-control" name="van_code" id="van_code">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-6">
                                                <div>
                                                    <label class="form-label">Reg. Number <span class="text-danger">*</span></label>
                                                    <input type="text" class="form-control" name="van_number" id="van_number">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-6">
                                                <div>
                                                    <label class="form-label">Vehicle Identification Number <span class="text-danger">*</span></label>
                                                    <input type="text" class="form-control" name="vin" id="vin">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-6">
                                                <div>
                                                    <label class="form-label">Fleet Number</label>
                                                    <input type="text" class="form-control" name="fleet_number" id="fleet_number">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-6">
                                                <div class="row">
                                                    <div class="col-xxl-12">
                                                        <label class="form-label">Vehicle Color</label>
                                                        <div class="input-light d-flex">
                                                            <select class="form-control select2" name="color" id="color">
                                                                <option value="" selected>Select</option>
                                                            </select>
                                                            <a data-heading="Add New Vehicle Model" data-after-load-func="create_master_form" data-element="color" data-form-url="<?= base_url('system/master-record/create/COLORS') ?>" class="popup-form-button-master ms-2 btn btn-success popup-add-btn">
                                                                <i class="ri-add-line align-bottom"></i>
                                                            </a>
                                                        </div>
                                                    </div>
<!--                                                    <div class="col-xxl-3">
                                                        <label for="basiInput" class="form-label">Add</label>
                                                        <a data-heading="Add New Vehicle Model" data-after-load-func="create_master_form" data-element="color" data-form-url="<?= base_url('system/master-record/create/COLORS') ?>" class="popup-form-button-master ms-1 btn btn-success popup-add-btn">
                                                            <i class="ri-add-line align-bottom"></i>
                                                        </a>
                                                    </div>-->
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-6">
                                                <div>
                                                    <label class="form-label">Mileage</label>
                                                    <input type="text" class="form-control" name="mileage" id="mileage">
                                                </div>
                                            </div>
                                        </div>
                                        <h5 class="mb-0 mt-3">Insurance Details</h5>
                                        <hr class="mb-2 mt-1">
                                        <div class="row gy-2">
                                            <div class="col-xxl-4 col-md-6">
                                                <div class="row">
                                                    <div class="col-xxl-12">
                                                        <label class="form-label">Insurance Company</label>
                                                        <div class="input-light d-flex">
                                                            <select class="form-control select2" name="insurance_company" id="insurance_company">
                                                                <option value="" selected>Select</option>
                                                            </select>
                                                            <a data-heading="Add New Vehicle Model" data-after-load-func="create_master_form" data-element="insurance_company" data-form-url="<?= base_url('system/master-record/create/VEHICLE_INSURANCE_COMPANIES') ?>" class="popup-form-button-master ms-2 btn btn-success popup-add-btn">
                                                                <i class="ri-add-line align-bottom"></i>
                                                            </a>
                                                        </div>
                                                    </div>
<!--                                                    <div class="col-xxl-3">
                                                        <label for="basiInput" class="form-label">Add</label>
                                                        <a data-heading="Add New Vehicle Model" data-after-load-func="create_master_form" data-element="insurance_company" data-form-url="<?= base_url('system/master-record/create/VEHICLE_INSURANCE_COMPANIES') ?>" class="popup-form-button-master ms-auto btn btn-success popup-add-btn">
                                                            <i class="ri-add-line align-bottom"></i>
                                                        </a>
                                                    </div>-->
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-6">
                                                <div>
                                                    <label class="form-label">Insurance Policy Number</label>
                                                    <input type="text" class="form-control" name="insurance_number" id="insurance_number">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-6">
                                                <div>
                                                    <label class="form-label">Insurance Date</label>
                                                    <input type="date" class="form-control" name="last_insurance_date" id="last_insurance_date">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-6">
                                                <div>
                                                    <label class="form-label">Insurance Due Date</label>
                                                    <input type="date" class="form-control" name="insurance_due_date" id="insurance_due_date">
                                                </div>
                                            </div>

                                        </div>
                                        <h5 class="mb-0 mt-3">Service Details</h5>
                                        <hr class="mb-2 mt-1">
                                        <div class="row gy-2">
                                            <div class="col-xxl-4 col-md-6">
                                                <div>
                                                    <label class="form-label">Service Date</label>
                                                    <input type="date" class="form-control" name="last_service_date" id="last_service_date">
                                                </div>

                                            </div>
                                            <div class="col-xxl-4 col-md-6">
                                                <div>
                                                    <label class="form-label">Service Due Date</label>
                                                    <input type="date" class="form-control" name="service_due_date" id="service_due_date">
                                                </div>
                                            </div>
                                        </div>
                                        <h5 class="mb-0 mt-3">Roadtax & MOT Details</h5>
                                        <hr class="mb-2 mt-1">
                                        <div class="row gy-2 mb-4">
                                            <div class="col-xxl-4 col-md-6">
                                                <div>
                                                    <label class="form-label">Roadtax Date</label>
                                                    <input type="date" class="form-control" name="last_roadtax_date" id="last_roadtax_date">
                                                </div>

                                            </div>
                                            <div class="col-xxl-4 col-md-6">
                                                <div>
                                                    <label class="form-label">Service Due Date</label>
                                                    <input type="date" class="form-control" name="roadtax_due_date" id="roadtax_due_date">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-6">
                                                <div>
                                                    <label class="form-label">MOT Date</label>
                                                    <input type="date" class="form-control" name="last_mot_date" id="last_mot_date">
                                                </div>

                                            </div>
                                            <div class="col-xxl-4 col-md-6">
                                                <div>
                                                    <label class="form-label">MOT Due Date</label>
                                                    <input type="date" class="form-control" name="mot_due_date" id="mot_due_date">
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
                                <button type="submit" class="btn btn-success " id="add-btn">Save</button>
                                <button type="button" class="btn btn-light waves-effect waves-light" id="close-modal" data-bs-dismiss="offcanvas">Close</button>
                                <div id="deleteBtnContainer"></div>
                                <?php if (isset($edit) && $edit && isset($id) && $id > 0) { ?>               
                                    <script>
                                        document.getElementById('deleteBtnContainer').innerHTML = delete_icon(<?= $id ?>, 'van');
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
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/jobs/job.js?v=1.5') ?>"></script>