<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
<style>
    .select2-readonly, .select2-selection {
        pointer-events: none; /* Disable mouse interaction */
        background-color: #e9ecef; /* Give it a disabled look */
    }
</style>
<div class="main-content">

    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 class="mb-sm-0">Add New Service</h4>
                        <div class="page-title-right">
                            <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item"><a href="javascript: void(0);">Resources Set up</a></li>
                                <li class="breadcrumb-item active">Add Service</li>
                            </ol>
                        </div>

                    </div>
                </div>
            </div>
            <!-- end page title -->

            <div class="row">
                <?php
                $action = app_url('task/create');
                $method = 'POST';
                if (isset($edit) && $edit && isset($id) && $id > 0) {
                    $action = app_url('task/edit/');
                    $method = 'POST';
                }
                ?>
                <form class="tablelist-form pb-4 simplebar-form" action="<?= $action ?>" method="<?= $method ?>" name="addServiceForm" id="addServiceForm" style="height: calc(100vh - 112px);" data-simplebar autocomplete="off">
                    <div class="p-0 overflow-hidden pb-3">
                        <div>
                            <div class="acitivity-timeline p-4">
                                <div class="modal-body pb-3">
                                    <input type="hidden" id="tasksId" />
                                    <div class="">
                                        <div class="row gy-2">
                                            <div class="col-xxl-4 col-md-6">
                                                <div>
                                                    <label for="basiInput" class="form-label">Title <span class="text-danger">*</span></label>
                                                    <input type="text" class="form-control" id="title" name="title">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-6">
                                                <div>
                                                    <label for="basiInput" class="form-label">Code <span class="text-danger">*</span></label>
                                                    <input type="text" class="form-control" id="task_code" name="task_code">
                                                </div>
                                            </div>
                                            <!--                                            <div class="col-xxl-4 col-md-6">
                                                                                            <div class="input-light">
                                                    <label class="form-label">Jobtype <span class="text-danger">*</span></label>
                                                    <select class="form-control select2" id="service_id" name="service_id">
                                                        <option value="">Select Jobtype</option>
                                                    </select>
                                                </div>
                                                                                        </div>-->
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label for="basiInput" class="form-label">Task Type <span class="text-danger">*</span></label>
                                                    <select class="form-control" id="task_type" name="task_type">
                                                        <option value="">Select Task Type</option>
                                                        <option value="I">Internal</option>
                                                        <option value="E">External/On-Site</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4 user-type-div">
                                                <div class="input-light">
                                                    <label class="form-label">User Type <span class="text-danger">*</span></label>
                                                    <select class="form-control" name="user_type" id="user_type">
                                                        <option value="">Select Usertype</option>
                                                        <option value="E">Engineer</option>
                                                        <option value="R">RLO</option>
                                                        <option value="A">Admin</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4 ">
                                                <div class="input-light">
                                                    <label  class="form-label mb-2">Requires an External Task?</label>
                                                    <div class="form-check form-switch">
                                                        <input class="form-check-input" type="checkbox" id="require_external_task" role="switch" name="require_external_task" value="1" >
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4 skill-div">
                                                <div class="input-light">
                                                    <label class="form-label">Skill Required</label>
                                                    <select class="form-control" name="skill_id[]" multiple id="skill_id">
                                                        
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div class="input-light">
                                                    <label class="form-label">Overhead SOR <small>(optional)</small></label>
                                                    <select class="form-control" name="sor_id" id="sor_id">
                                                        <option value="">SOR</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-6">
                                                <div class="input-light">
                                                    <label for="basiInput" class="form-label">Fix Time <span class="text-danger">*</span></label>
                                                    <div class="d-flex">
                                                        <select class="form-control select2" id="service_time" name="service_time">
                                                            <option value="">Select</option>
                                                        </select>

                                                        <a data-heading="Add New Service Time" data-after-load-func="create_master_form" data-element="service_time" data-form-url="<?= base_url('system/master-record/create/SERVICE_TIMES') ?>" class="popup-form-button-master ms-2 btn btn-success popup-add-btn">
                                                            <i class="ri-add-line align-bottom"></i>
                                                        </a>
                                                    </div>
                                                </div>
<!--                                                <div class="row">
                                                    <div class="col-xxl-9 pe-0">
                                                        <label for="basiInput" class="form-label">Fix Time <span class="text-danger">*</span></label>
                                                        <select class="form-control select2" id="service_time" name="service_time">
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-xxl-3">
                                                        <label for="basiInput" class="form-label">Add</label>
                                                        <a data-heading="Add New Service Time" data-after-load-func="create_master_form" data-element="service_time" data-form-url="<?= base_url('system/master-record/create/SERVICE_TIMES') ?>" class="popup-form-button-master ms-auto btn btn-success popup-add-btn">
                                                            <i class="ri-add-line align-bottom"></i>
                                                        </a>
                                                    </div>
                                                </div>-->
                                            </div>
                                            <div class="col-xxl-12 col-md-12">
                                                <label class="form-label">Allowed Statuses <span class="text-danger">*</span></label>
                                                <select class="form-control" name="allowed_statuses[]" id="allowed_statuses" multiple>

                                                </select>
                                            </div>

                                            <div class="col-xxl-12 col-md-12">
                                                <div>
                                                    <label for="basiInput" class="form-label">Description</label>
                                                    <textarea class="form-control" id="description" name="description"></textarea>
                                                </div>
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
                            <?php if (isset($edit) && $edit && isset($id) && $id > 0) {?>               
                                <script>
                                    document.getElementById('deleteBtnContainer').innerHTML = delete_icon(<?= $id ?>, 'task');
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
