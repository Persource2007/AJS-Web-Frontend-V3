<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->

<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->
            <div class="row">
                <div class="col-lg-12">
                    <?php

                    $action = app_url('assets-type-field/create');
                    if (isset($id) && $id > 0) {
                        $action = app_url('assets-type-field/edit/');
                    }
                    ?>
                    <form class="tablelist-form pb-4 simplebar-form" autocomplete="off" id="fieldForm" method="post" action="<?= $action ?>">
                        <input type="hidden" id="edit_id" name="edit_id" value="<?= $id ?? null ?>" />
                        <div class="p-0 overflow-hidden">
                            <div data-simplebar style="height: calc(100vh - 112px);">
                                <div class="acitivity-timeline p-4">
                                    <div class="modal-body">
                                        <div class="row gy-2">
                                            <div class="col-xxl-12 col-md-12">
                                                <div class="input-light">
                                                    <label class="form-label">Asset Type <span class="text-danger">*</span></label>
                                                    <div>
                                                        <select class="form-control select2" id="asset_type_id" name="asset_type_id" >
                                                        <option value="" selected>Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-md-12">
                                                <div class="input-light">
                                                    <label class="form-label">Field Type <span class="text-danger">*</span></label>
                                                    <div>
                                                        <select class="form-control select2" id="field_id" name="field_id" >
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-md-12">
                                                <div>
                                                    <label class="form-label">Field Name <span class="text-danger">*</span></label>
                                                    <div>
                                                        <input type="text" class="form-control" id="name" name="name" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-md-12">
                                                <div>
                                                    <label class="form-label">Label <span class="text-danger">*</span></label>
                                                    <div>
                                                        <input type="text" class="form-control" id="label" name="label" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-md-12">
                                                <div>
                                                    <label class="form-label">Priority</label>
                                                    <div>
                                                    <input type="number" value="0" class="form-control number-only" id="priority" name="priority">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-md-12">
                                                <div>
                                                    <label class="form-label">Required</label>
                                                    <div class="form-check form-switch">
                                                        <input type="hidden" name="is_required" value="0" >
                                                        <input class="form-check-input" type="checkbox" role="switch" name="is_required" id="is_required" value="1" >
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--end card-body-->
                        </div>
                        <div class="offcanvas-foorter p-4 text-center">
                            <div class="hstack gap-2">
                                <button type="submit"  class="btn btn-success add-btn" id="save-btn">Save</button>
                                <button type="button" class="btn btn-light close-offcanvas" id="close-modal">Close</button>
                                <div id="deleteBtnContainer"></div>
                                <?php if (isset($id) && $id > 0) { ?>               
                                    <script>
                                        document.getElementById('deleteBtnContainer').innerHTML = delete_icon(<?= $id ?>, 'assets-type-field');
                                    </script>
                                <?php }  ?>
                            </div>
                        </div>
                    </form>
                    <!--end card-->
                </div>
                <!--end col-->
            </div>
            <!--end row-->
        </div>
        <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
</div>