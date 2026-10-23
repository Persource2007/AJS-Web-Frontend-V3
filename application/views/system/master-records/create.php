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
                $action = app_url('master-record/create');
                $method = 'POST';
                $readonly = '';
                if (isset($edit) && $edit && isset($id) && $id > 0) {
                    $action = app_url('master-record/edit/');
                    $method = 'POST';
                    $readonly = 'readonly = "readonly"';
                }
                ?>
                <form class="tablelist-form pb-4 simplebar-form" action="<?= $action ?>" method="<?= $method ?>" name="addForm" id="addForm" style="height: calc(100vh - 112px);" data-simplebar autocomplete="off">
                    <div class="p-0 overflow-hidden pb-3">
                        <div>
                            <div class="acitivity-timeline p-4 pt-0">
                                <div class="modal-body pb-3">
                                    <input type="hidden" id="tasksId" />
                                    <div class="row gy-2 pt-3">
                                        <div class="col-xxl-4 col-md-6">
                                            <input type="hidden" name="master_id" value="<?= @$master_id ?>" id="master_id" />
                                            <div>
                                                <label for="basiInput" class="form-label">Title <span class="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="title" name="title">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-6">
                                            <div>
                                                <label for="basiInput" class="form-label">Code <span class="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="master_value_code" name="master_value_code" <?= $readonly ?>>
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-6">
                                            <div>
                                                <label for="basiInput" class="form-label">Position </label>
                                                <input type="number" value="0" class="form-control" id="master_value_position" name="master_value_position">
                                            </div>
                                        </div>
                                        <div class="col-xxl-6 col-md-6 parent-val" style="display:none">
                                            <div>
                                                <label for="basiInput" class="form-label">Parent</label>
                                                <input type="text" class="form-control" id="parent_id" value="0" name="parent_id">
                                            </div>
                                        </div>
                                        <div class="col-xxl-12 col-md-12">
                                            <div>
                                                <label for="basiInput" class="form-label">Description</label>
                                                <textarea class="form-control" id="description" name="description"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-xxl-12 col-md-12">
                                            <div class="flex-shrink-0">
                                                <div class="form-check form-switch form-switch-lg">
                                                    <label for="nestednavscrollspy-showcode" class="form-label text-muted me-3">Activate / De-activate</label>
                                                    <input class="form-check-input code-switcher me-1" type="checkbox" name="status" data-name="status" id="user-status" value="1" checked  style="left: -8px;">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h5 class="mt-3 mb-0">Custom Attributes</h5>
                                    <hr class="mt-1 mb-2">
                                    <div class="row">
                                        <div class="col-xxl-6 col-md-6">
                                            <div>
                                                <label for="basiInput" class="form-label">Custom Attribute 1</label>
                                                <input type="text" class="form-control" id="custom_attr1" name="custom_attr1">
                                            </div>
                                        </div>
                                        <div class="col-xxl-6 col-md-6">
                                            <div>
                                                <label for="basiInput" class="form-label">Custom Attribute 2</label>
                                                <input type="text" class="form-control" id="custom_attr2" name="custom_attr2">
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
                            <button type="button" class="btn btn-light waves-effect waves-light close-offcanvas" id="close-modal" >Close</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- container-fluid -->
    </div>



    <!-- End Page-content -->
