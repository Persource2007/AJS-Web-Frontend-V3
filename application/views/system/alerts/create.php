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

                    $action = app_url('master-alert/create');
                    if (isset($id) && $id > 0) {
                        $action = app_url('master-alert/edit/');
                    }
                    ?>
                    <form class="tablelist-form pb-4 simplebar-form" autocomplete="off" id="alertForm" method="post" action="<?= $action ?>">
                        <input type="hidden" id="edit_id" name="edit_id" value="<?= $id ?? null ?>" />
                        <div class="p-0 overflow-hidden">
                            <div data-simplebar style="height: calc(100vh - 112px);">
                                <div class="acitivity-timeline p-4">
                                    <div class="modal-body">
                                        <div class="row gy-2">
                                            <div class="col-xxl-12 col-md-12">
                                                <div>
                                                    <label for="code" class="form-label">Code <span class="text-danger">*</span></label>
                                                    <input type="text" class="form-control" id="code" name="code">
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-md-12">
                                                <div>
                                                    <label for="description" class="form-label">Description <span class="text-danger">*</span></label>
                                                    <div>
                                                        <textarea class="form-control" id="description" name="description"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-md-12">
                                                <div class="input-light">
                                                    <label for="type" class="form-label">Type <span class="text-danger">*</span></label>
                                                    <div>
                                                        <select class="form-control select2" id="type" name="type">
                                                            <option value="PROPERTY_ALERT">Property Alert</option>
                                                            <option value="RESIDENT_ALERT">Resident Alert</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-md-12">
                                                <div>
                                                    <label for="position" class="form-label">Position</label>
                                                    <input type="text" class="form-control number-only" id="position" name="position">
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-md-12">
                                                <div>
                                                    <label for="attribute" class="form-label">Attribute</label>
                                                    <input type="text" class="form-control" id="attribute" name="attribute">
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
                                <?php if (isset($edit) && $edit && isset($id) && $id > 0) {?>               
                                    <script>
                                        document.getElementById('deleteBtnContainer').innerHTML = delete_icon(<?= $id ?>, 'master-alert');
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
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/system/alerts.js') ?>"></script>