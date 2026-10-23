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
                        <h4 class="mb-sm-0">Add New Servicetime</h4>
                        <div class="page-title-right">
                            <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item"><a href="javascript: void(0);">Resources Set up</a></li>
                                <li class="breadcrumb-item active">Add Servicetime</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end page title -->

            <div class="row">
                <?php
                $action = app_url('servicetime/create');
                $method = 'POST';
                if (isset($edit) && $edit && isset($id) && $id > 0)
                {
                    $action = app_url('servicetime/edit/');
    $method = 'POST';
}
?>
                <form class="tablelist-form pb-4 simplebar-form" action="<?= $action ?>" method="<?= $method ?>" name="addForm" id="addForm" style="height: calc(100vh - 112px);" data-simplebar autocomplete="off">
                    <div class="p-0 overflow-hidden pb-3">
                        <div>
                            <div class="acitivity-timeline p-4 pt-2">
                                <div class="modal-body pb-3">
                                    <input type="hidden" id="tasksId" />
                                    <div class="">
                                        <div class="row gy-2">
                                            <div class="col-xxl-12 col-md-12">
                                                <div>
                                                    <label for="basiInput" class="form-label">Title <span class="text-danger">*</span></label>
                                                    <input type="text" class="form-control" id="title" name="title">
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-md-12">
                                                <div>
                                                    <label for="basiInput" class="form-label">Client</label>
                                                    <select class="form-control" id="client_id" name="client_id">
                                                        <option value="">Select Client</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-md-12">
                                                <div>
                                                    <label for="basiInput" class="form-label">Start Time <span class="text-danger">*</span></label>
                                                    <input type="time" class="form-control" id="start_time" name="start_time">
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-md-12">
                                                <div>
                                                    <label for="basiInput" class="form-label">End Time</label>
                                                    <input type="time" class="form-control" id="end_time" name="end_time">
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-md-12">
                                                <div>
                                                    <label for="basiInput" class="form-label">Description</label>
                                                    <textarea class="form-control" id="comments" name="comments"></textarea>
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
                            if (isset($edit) && $edit && isset($id) && $id > 0)
                            {
                                ?>
                            <input type="hidden" id="edit_id" name="edit_id" value="<?= $id ?>" />
                                <?php
                            }
                            ?>
                            <button type="submit" class="btn btn-success waves-effect waves-light" id="add-btn">Save</button>
                            <button type="button" class="btn btn-light waves-effect waves-light close-offcanvas" id="close-modal" >Close</button>
                            <div id="deleteBtnContainer"></div>
                            <?php if (isset($edit) && $edit && isset($id) && $id > 0) {?>               
                                <script>
                                    document.getElementById('deleteBtnContainer').innerHTML = delete_icon(<?= $id ?>, 'servicetime');
                                </script>
                            <?php }  ?>
                        </div>
                    </div>
                </form>
                <div class="row gy-2 certificate_input_field_div" style="display: none">
                    <hr class='separator-hr' style='margin-top:30px'>
                    <div class="col-xxl-4 col-md-2">
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
                    <div class="col-xxl-4 col-md-6 ms-auto">
                        <label for="account_manager" class="form-label">Remove</label><br/>
                        <button type="button" data-parent-div="certificate_input_field_div" class="remove-parent-btn ms-auto btn btn-danger popup-close-btn">
                            <i class="ri-close-line"></i>
                        </button>
                    </div>
                    <!--end col-->
                </div>
            </div>
        </div>
        <!-- container-fluid -->
    </div>



    <!-- End Page-content -->
