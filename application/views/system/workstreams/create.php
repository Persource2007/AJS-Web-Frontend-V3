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
                        <h4 class="mb-sm-0">Add New Workstream</h4>
                        <div class="page-title-right">
                            <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item"><a href="javascript: void(0);">Resources Set up</a></li>
                                <li class="breadcrumb-item active">Add Workstream</li>
                            </ol>
                        </div>

                    </div>
                </div>
            </div>
            <!-- end page title -->

            <div class="row">
                <?php
                $action = app_url('workstream/create');
                $method = 'POST';
                if (isset($edit) && $edit && isset($id) && $id > 0)
                {
                    $action = app_url('workstream/edit/');
    $method = 'POST';
}
?>
                <form class="tablelist-form pb-4 simplebar-form" action="<?= $action ?>" method="<?= $method ?>" name="addWorkstreamForm" id="addWorkstreamForm" style="height: calc(100vh - 112px);" data-simplebar autocomplete="off">
                    <div class="p-0 overflow-hidden pb-3">
                        <div>
                            <div class="acitivity-timeline p-4">
                                <div class="modal-body pb-3">
                                    <input type="hidden" id="tasksId" />
                                    <div class="">
                                        <div class="row gy-2">
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label for="basiInput" class="form-label">Title <span class="text-danger">*</span></label>
                                                    <input type="text" class="form-control" id="title" name="title">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label for="basiInput" class="form-label">Code <span class="text-danger">*</span></label>
                                                    <input type="text" class="form-control" id="workstream_code" name="workstream_code">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label for="basiInput" class="form-label">Department <span class="text-danger">*</span></label>
                                                    <input type="text" class="form-control select2" id="department_id" name="department_id">
                                                </div>
                                            </div>
                                            <div style="display:none" class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label for="basiInput" class="form-label">Analysis Code</label>
                                                    <input type="text" class="form-control" id="analysis_code" name="analysis_code" />
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label for="basiInput" class="form-label">Manager <span class="text-danger">*</span></label>
                                                    <select class="form-control select2" id="manager_id" name="manager_id">
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label for="basiInput" class="form-label">Position</label>
                                                    <input type="number" class="form-control" id="position" name="position" />
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label for="basiInput" class="form-label">Color Code</label>
                                                    <input type="color" class="form-control" id="color_code" name="color_code" />
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-md-12">
                                                <div>
                                                    <label for="basiInput" class="form-label">Description</label>
                                                    <textarea cols="3" class="form-control" id="description" name="description"></textarea>
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
                            <button type="button" class="btn btn-light waves-effect waves-light close-offcanvas" id="close-modal"  >Close</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- container-fluid -->
    </div>



    <!-- End Page-content -->
