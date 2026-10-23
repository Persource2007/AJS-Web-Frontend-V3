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

                    $action = app_url('phrasebook/create');
                    if (isset($id) && $id > 0) {
                        $action = app_url('phrasebook/edit/');
                    }
                    ?>
                    <form class="tablelist-form pb-4 simplebar-form" autocomplete="off" id="phrasebookForm" method="post" action="<?= $action ?>">
                        <input type="hidden" id="edit_id" name="edit_id" value="<?= $id ?? null ?>" />
                        <div class="p-0 overflow-hidden">
                            <div data-simplebar style="height: calc(100vh - 112px);">
                                <div class="acitivity-timeline p-4">
                                    <div class="modal-body">
                                        <div class="row gy-2">
                                            <div class="col-xxl-12 col-md-12">
                                                <div>
                                                    <label for="basiInput" class="form-label">Title <span class="text-danger">*</span></label>
                                                    <input type="text" class="form-control" id="title" name="title">
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-md-12">
                                                <div>
                                                    <label class="form-label">Description <span class="text-danger">*</span></label>
                                                    <div>
                                                        <textarea class="form-control" id="description" name="description" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-md-12">
                                                <div class="input-light">
                                                    <label class="form-label">Type <span class="text-danger">*</span></label>
                                                    <div>
                                                        <select class="form-control select2" id="types" name="types[]" multiple>
                                                        </select>
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
                                <?php if (isset($edit) && $edit && isset($id) && $id > 0) {?>               
                                    <script>
                                        document.getElementById('deleteBtnContainer').innerHTML = delete_icon(<?= $id ?>, 'phrasebook');
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
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/system/phrasebooks.js') ?>"></script>