<div class="main-content">
    <div class="container-fluid">
        <!-- start page title -->
        <div class="row"></div>
        <div class="row">
            <form class="tablelist-form pb-4 simplebar-form bulk-jobs-form" data-simplebar autocomplete="off">
                <div class="p-4 overflow-hidden pb-3">
                    <div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-xxl-12 col-md-12 bulk-alert-message">
                                    <h6></h6>
                                </div>
                                <div class="col-xxl-12 col-md-12">
                                    <!-- <div class="row">
                                        <div class="col-xxl-6 col-md-6">
                                            <div class="form-check form-check-block">
                                                <input class="form-check-input task-assign" id="is_assigned_0" type="radio" name="is_assigned" value="0" checked>
                                                <label class="form-check-label" for="is_assigned_0">Ready to Invoce</label>
                                            </div>
                                        </div>
                                        <div class="col-xxl-6 col-md-6">
                                            <div class="form-check form-check-block">
                                                <input class="form-check-input task-assign" id="is_assigned_1" type="radio" name="is_assigned" value="1">
                                                <label class="form-check-label" for="is_assigned_1">Invoiced</label>
                                            </div>
                                        </div>
                                    </div> -->
                                    <div class="row">
                                        <!-- <div class="col-xxl-12 col-md-12 not_assign_div mt-1 mb-3">
                                            <div>
                                                <label for="basiInput" class="form-label">Select Queue <span class="text-danger">*</span></label>
                                                <select class="form-control" id="queue_id" name="queue_id">
                                                    <option value="">Select Queue</option>
                                                </select>
                                            </div>
                                        </div> -->
                                        <div class="col-xxl-12 col-md-12 assign_div mt-1 mb-3">
                                            <div class="input-light">
                                                <label class="form-label">Financial Status</label>
                                                <select class="form-control" id="job_status" name="job_status">
                                                    <option value="">Select Status</option>
                                                    <option value="RI">Clear to Invoice</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-xxl-12 col-md-12 assign_div mt-1 mb-3">
                                            <div>
                                                <label class="form-label">Process Batch No. <span class="text-danger">*</span></label>
                                                <input type="text" class="form-control" name="job_process_batch_id" id="job_process_batch_id" placeholder="Generating...">
                                                <div id="batch_id_error" class="text-danger small mt-1" style="display:none;"></div>
                                            </div>
                                        </div>
                                        <!-- <div class="col-xxl-12 col-md-12 assign_div mt-1 mb-3">
                                            <div class="input-light">
                                                <label class="form-label">Batch Id</label>
                                                <input class="form-control"  type="text">
                                            </div>
                                        </div> -->
                                    </div>

                                    <div class="row">
                                        <div class="col-xxl-6 col-md-6">
                                            <div class="form-check form-check-block">
                                                <input class="form-check-input add-tags" id="add-tags" type="checkbox">
                                                <label class="form-check-label" for="add-tags">Add Tags?</label>
                                            </div>
                                        </div>

                                        <div class="mt-2 col-xxl-12 col-md-12 create-tags-box mt-1 mb-3">
                                            <label class="form-label">Select Tags</label>
                                            <div class="d-flex">
                                                <select class="form-control" name="tags[]" id="tags" data-module="job" multiple>
                                                </select>
                                                <button type="button" class="btn btn-success ms-1 popup-form-button-master popup-add-btn" data-heading="Add New Tag" data-after-load-func="create_tag_form" data-element="tags" data-value="job" data-form-url="<?= cdn_url('system/tag/create?in_popup=1') ?>"><i class="ri-add-line align-bottom"></i></button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-xxl-6 col-md-6">
                                            <div class="form-check form-check-block">
                                                <input class="form-check-input remove-tags" id="remove-tags" type="checkbox">
                                                <label class="form-check-label" for="remove-tags">Remove Tags?</label>
                                            </div>
                                        </div>

                                        <div class="mt-2 col-xxl-12 col-md-12 remove-tags-box">
                                            <label class="form-label">Select Tags</label>
                                            <div class="d-flex">
                                                <select class="form-control" name="rtags[]" id="rtags" data-module="job" multiple>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="offcanvas-foorter p-4 text-center">
                <div class="hstack gap-2">
                    <button type="submit" class="btn btn-success" id="assign-tasks-btn">Update Status</button>
                    <button type="button" class="btn btn-light" id="close-modal" data-bs-dismiss="offcanvas" >Close</button>
                </div>
            </div>
        </div>
    </div>
</div>