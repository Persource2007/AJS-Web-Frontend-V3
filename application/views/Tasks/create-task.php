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
                if (isset($edit) && $edit && isset($task_id) && $task_id > 0)
{
    $action = app_url('job-task/edit/');
}
?>
                <form class="tablelist-form pb-4 simplebar-form" action="<?= $action ?>" method="POST" name="createTaskForm" id="createTaskForm" style="height: calc(100vh - 112px);" data-simplebar autocomplete="off">
                    <div class="p-0 overflow-hidden pb-3">
                        <div>
                            <div class="acitivity-timeline p-4 pt-2">
                                <div class="modal-body pb-3">
                                    <input type="hidden" id="tasksId" />
                                    <div class="row gy-2">
                                            <div class="col-xxl-6 col-md-6">
                                                <input type="hidden" name="job_id_hidden" id="job_id_hidden" />
                                                <div>
                                                    <label for="basiInput" class="form-label">Task ID</label>
                                                    <input type="text" value="" readonly class="form-control" id="task_code" name="task_code">
                                                </div>
                                            </div>
                                            <div class="col-xxl-6 col-md-6">
                                                <div>
                                                    <label for="basiInput" class="form-label">Select Task <span class="text-danger">*</span></label>
                                                    <select class="form-control" id="task_id" name="task_id">
                                                        <option value="">Select Task</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-xxl-6 col-md-6">
                                                <div>
                                                    <label for="basiInput" class="form-label">Skill</label>
                                                    <input type="text" class="form-control" id="skill" name="skill" value="" readonly />
                                                    <input type="hidden" class="form-control" id="skill_id" name="skill_id" value="" />
                                                </div>
                                            </div>
                                            <div class="col-xxl-6 col-md-6">
                                                <div>
                                                    <label for="basiInput" class="form-label">Task type</label>
                                                    <input type="text" class="form-control" id="task_type_name" name="task_type_name" value="" readonly />
                                                    <input type="hidden" class="form-control" id="task_type" name="task_type" value="" />
                                                </div>
                                            </div>
                                            <div class="col-xxl-6 col-md-6">
                                                <div>
                                                    <label for="basiInput" class="form-label">Status <span class="text-danger">*</span></label>
                                                    <select class="form-control" id="status_id" name="status_id">
                                                        <option value="">Select Status</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-xxl-6 col-md-6">
                                                <div>
                                                    <label for="basiInput" class="form-label">Overhead SOR</label>
                                                    <select class="form-control" id="sor_id_task" name="sor_id_task">
                                                        <option value="">Select SOR</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-md-12">
                                                <div>
                                                    <label class="form-label">Task Description</label>
                                                    <textarea class="form-control service-desc" rows="2" id="task_description" name="task_description"></textarea>
                                                </div>
                                            </div>
                                            <div style="display: none" class="external_task_fields">
                                                <div class="col-xxl-12 col-md-12">
                                                    <div>
                                                        <label for="basiInput" class="form-label">Task SOR(s)</label>
                                                        <select class="form-control" id="sor_ids_task" name="sor_ids_task[]" multiple>

                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-12 col-md-12">
                                                    <div class="input-light">
                                                        <label class="form-label">Assets</label>
                                                        <select class="form-control select2" name="asset_ids[]" id="asset_ids" multiple>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="clearfix"><br/></div>
                                                <h5 class="fs-16 mb-0">Task Assignment</h5>
                                                <hr class="mt-2 mb-3">
                                                <div class="row">
                                                    <div class="col-xxl-6 col-md-6">
                                                        <div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input task-assign" id="is_assigned_0" type="radio" name="is_assigned" value="0" checked>
                                                                <label class="form-check-label" for="is_assigned_0">Add task to queue</label>
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input task-assign" id="is_assigned_1" type="radio" name="is_assigned" value="1">
                                                                <label class="form-check-label" for="is_assigned_1">Assign now</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-6 col-md-6 not_assign_div">
                                                        <div>
                                                            <label for="basiInput" class="form-label">Select Queue</label>
                                                            <select class="form-control" id="queue_id" name="queue_id">
                                                                <option value="">Select Queue</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="assign_div row" style="display: none;">
                                                    <div class="col-xxl-6 col-md-6 " >
                                                        <div>
                                                            <label for="basiInput" class="form-label">Assignment Type <span class="text-danger">*</span></label>
                                                            <select required class="form-control" id="preferred_time_range" name="preferred_time_range">
                                                                <option value=""></option>
                                                                <!--                                                                <option value="AM">AM</option>
                                                                                                                                <option value="PM">PM</option>-->
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-6 col-md-6 mb-2">
                                                        <div class="input-light multi-choice">
                                                            <label class="form-label">Assign To <span class="text-danger">*</span></label>
                                                            <div class="d-flex input-group">
                                                                <select class="form-control" id="engineer_id" name="engineer_id">
                                                                    <option value="">Select</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-12 col-md-12 d-flex">
                                                        <label for="labelInput" class="form-label me-3">Is this an Appointment?</label>
                                                        <div class="">
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input appointment-radio" name="is_appointment" type="radio" id="is_appointment0" value="0" checked="">
                                                                <label class="form-check-label" for="is_appointment0">No</label>
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input appointment-radio" name="is_appointment" type="radio" id="is_appointment1" value="1">
                                                                <label class="form-check-label" for="is_appointment1">Yes</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                        <div class="col-xxl-6 col-md-12 ">
                                                            <div style="display:none" class="appointment_div">
                                                                <label for="labelInput" class="form-label">Appointment Date <span class="text-danger">*</span></label>
                                                                <input type="date" min="<?php echo date("Y-m-d"); ?>" class="form-control" id="appointment_date" name="appointment_date">
                                                            </div>
                                                        </div>
                                                        <!--end col-->
                                                        <div class="col-xxl-6 col-md-6 " >
                                                            <div style="display:none" class="appointment_div">
                                                                <label for="labelInput" class="form-label">Appointment Time <span class="text-danger">*</span></label>
                                                                <input type="time" class="form-control" id="appointment_time" name="appointment_time">
                                                            </div>
                                                        </div>
                                                        <div class="col-xxl-6 col-md-6 ">
                                                            <div class="preferred_date_div">
                                                                <label for="labelInput" class="form-label">Target Date <span class="text-danger">*</span></label>
                                                                <input type="date" min="<?php echo date("Y-m-d"); ?>" class="form-control" id="preferred_date" name="preferred_date">
                                                            </div>
                                                        </div>
                                                        <!--end col-->
                                                        <div class="col-xxl-6 col-md-6 " >
                                                            <div class="preferred_date_div">
                                                                <label for="labelInput" class="form-label">Target Time <span class="text-danger">*</span></label>
                                                                <input type="time" class="form-control" id="preferred_time" name="preferred_time">
                                                            </div>
                                                        </div>

                                                </div>
                                            </div>

                                            <div class="col-xxl-12 col-md-2">
                                                <div>
                                                    <label for="basiInput" class="form-label">Summary/Notes</label>
                                                    <textarea class="form-control" id="summary" name="summary"></textarea>
                                                </div>
                                            </div>
                                            <div class="col-lg-12">
                                                <label>Docs/Media</label>

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
                                                                    <div class="flex-shrink-0 me-2">
                                                                        <div class="avatar-sm bg-light rounded">
                                                                            <img data-dz-thumbnail class="img-fluid rounded d-block" src="<?= cdn_url('assets/images/new-document.png') ?>" />
                                                                        </div>
                                                                    </div>
                                                                    <div class="flex-grow-1">
                                                                        <div class="pt-1">
                                                                            <p class="fs-12 mb-1 truncate" data-dz-name>&nbsp;</p>
                                                                            <!-- <p class="fs-13 text-muted mb-0" data-dz-size></p> -->
                                                                            <strong class="error text-danger" data-dz-errormessage></strong>
                                                                        </div>
                                                                    </div>
                                                                    <div class="flex-shrink-0 ms-3">
                                                                        <button data-dz-remove class="btn btn-sm btn-danger" data-delete-url="job/delete-file/">Delete</button>
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
                    <div class="offcanvas-foorter p-3 text-center">

                        <div class="hstack gap-2">
                            <?php
                            if (isset($edit) && $edit && isset($task_id) && $task_id > 0)
                            {
                                ?>
                            <input type="hidden" id="edit_task_id" name="edit_task_id" value="<?= $task_id ?>" />
                                <?php
                            }
                            ?>
                            <button type="submit" class="btn btn-success" id="add-btn">Save</button>
                            <button type="button" class="btn btn-light" id="close-modal" data-bs-dismiss="offcanvas">Close</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- container-fluid -->
    </div>



    <!-- End Page-content -->