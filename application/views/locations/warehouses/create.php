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
                    $action    = app_url('warehouse/create');
                    if (isset($edit) && $edit && isset($id) && $id > 0)
                    {
                        $action = app_url('warehouse/edit/');
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
                                            <div class="row gy-2">

                                                <div class="col-xxl-4 col-md-6">
                                                    <div>
                                                        <label class="form-label">Title <span class="text-danger">*</span></label>
                                                        <input type="text" class="form-control" name="title" id="title">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-6">
                                                    <div class="input-light">
                                                        <label class="form-label">Warehouse Code <span class="text-danger">*</span></label>
                                                        <input type="text" class="form-control" name="warehouse_code" id="warehouse_code">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-6">
                                                    <label for="labelInput" class="form-label">Mobile</label>
                                                    <div class="input-group">
                                                        <span class="input-group-text" id="basic-addon1">+44</span>
                                                        <input type="text" class="form-control mobile-mask" id="mobile" name="mobile">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-6 col-md-6">
                                                    <div class="input-light">
                                                        <label class="form-label">Address 1 <span class="text-danger">*</span></label>
                                                        <input type="text" class="form-control" name="address1" id="address1">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-6 col-md-6">
                                                    <div class="input-light">
                                                        <label class="form-label">Address 2</label>
                                                        <input type="text" class="form-control" name="address2" id="address2">
                                                    </div>
                                                </div>

                                                <div class="col-xxl-4 col-md-6">
                                                    <div class="input-light">
                                                        <label class="form-label">Town <span class="text-danger">*</span></label>
                                                        <select class="form-control select2" name="city" id="city">
                                                            <option value="" selected>Select</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div class="col-xxl-4 col-md-6">
                                                    <div class="input-light">
                                                        <label class="form-label">Postal Code <span class="text-danger">*</span></label>
                                                        <input type="text" class="form-control postalcode-mask" name="postalcode" id="postalcode">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-6">
                                                    <div class="input-light">
                                                        <label class="form-label">Latitude</label>
                                                        <input type="text" class="form-control " name="latitude" id="latitude">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-6">
                                                    <div class="input-light">
                                                        <label class="form-label">Longitude</label>
                                                        <input type="text" class="form-control " name="longitude" id="longitude">
                                                    </div>
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
                                <button type="submit" class="btn btn-success waves-effect waves-light" id="add-btn">Save</button>
                                <button type="button" class="btn btn-light waves-effect waves-light" id="close-modal" data-bs-dismiss="offcanvas">Close</button>
                                <div id="deleteBtnContainer"></div>
                                <?php if (isset($edit) && $edit && isset($id) && $id > 0) { ?>               
                                    <script>
                                        document.getElementById('deleteBtnContainer').innerHTML = delete_icon(<?= $id ?>, 'warehouse');
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