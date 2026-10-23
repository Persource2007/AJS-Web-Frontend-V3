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
                        <h4 class="mb-sm-0">Add New Certificate</h4>
                        <div class="page-title-right">
                            <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item"><a href="javascript: void(0);">Resources Set up</a></li>
                                <li class="breadcrumb-item active">Add Certificate</li>
                            </ol>
                        </div>

                    </div>
                </div>
            </div>
            <!-- end page title -->

            <div class="row">
                <?php
                $action = app_url('certificate/create');
                $method = 'POST';
                if (isset($edit) && $edit && isset($id) && $id > 0)
                {
                    $action = app_url('certificate/edit/');
                    $method = 'POST';
}
?>
                <form class="tablelist-form pb-4 simplebar-form" action="<?= $action ?>" method="<?= $method ?>" name="addCertificateForm" id="addCertificateForm" style="height: calc(100vh - 112px);" data-simplebar autocomplete="off">
                    <div class="p-0 overflow-hidden pb-3">
                        <div>
                            <div class="acitivity-timeline p-4">
                                <div class="modal-body pb-3">
                                    <input type="hidden" id="tasksId" />
                                    <div class="">
                                        <div class="row gy-2">
                                            <div class="col-xxl-12">
                                                <div>
                                                    <label for="basiInput" class="form-label">Title <span class="text-danger">*</span></label>
                                                    <input type="text" class="form-control" id="title" name="title">
                                                </div>
                                            </div>
                                            <div class="col-xxl-12">
                                                <div>
                                                    <label for="basiInput" class="form-label">Code <span class="text-danger">*</span></label>
                                                    <input type="text" class="form-control" id="certificate_code" name="certificate_code">
                                                </div>
                                            </div>
                                            <!-- <div style="display: none" class="col-xxl-12">
                                                <div>
                                                    <label for="basiInput" class="form-label">SOR</label>
                                                    <select type="text" class="form-control select2" id="sor_id" name="sor_id">
                                                        <option value="" selected>Select SOR</option>
                                                    </select>
                                                </div>
                                            </div> -->
                                            <div class="col-xxl-12">
                                                <div>
                                                    <label for="department_id" class="form-label">Department <span class="text-danger">*</span></label>
                                                    <input type="text" class="form-control select2" id="department_id" name="department_id">
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-md-12">
                                                <div>
                                                    <label for="description" class="form-label">Description</label>
                                                    <textarea class="form-control" id="description" name="description"></textarea>
                                                </div>
                                            </div>
                                            <div class="col-xxl-12">
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="checkbox" id="is_required_review" data-name="is_required_review" value="1">
                                                    <label class="form-check-label" for="is_required_review">Review Required</label> 
                                                </div>
                                            </div>
                                            <div class="col-xxl-12">
                                                <div>
                                                    <label for="job_types" class="form-label">Job Types</label>
                                                    <select class="form-control" id="job_types" name="job_types[]" multiple="multiple">
                                                    </select>
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
                            <button type="button" class="btn btn-light waves-effect waves-light" id="close-modal" data-bs-dismiss="offcanvas" >Close</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- container-fluid -->
    </div>



    <!-- End Page-content -->
