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
                        <h4 class="mb-sm-0"> List</h4>

                        <div class="page-title-right">
                            <ol class="breadcrumb m-0">
                            </ol>
                        </div>

                    </div>
                </div>
            </div>
            <!-- end page title -->

            <div class="row">
                <div class="col-lg-12">
                    <?php
                    $action    = app_url('client/' . $client_id . '/schedule/create');
                    if (isset($edit) && $edit && isset($id) && $id > 0) {
                        $action = app_url('client/' . $client_id . '/schedule/edit');
                    }
                    ?>
                    <form class="tablelist-form pb-4" action="<?= $action ?>" method="post" id="scheduleForm" autocomplete="off">
                        <input type="hidden" value="<?= $id ?? null ?>" id="edit_id" name="edit_id" />
                        <div class="p-0 overflow-hidden">
                            <div data-simplebar style="height: calc(100vh - 112px);">
                                <div class="acitivity-timeline p-4 pt-3 schedule-created-main">
                                    <div class="modal-body">
                                        <div class="row gy-2">
                                            <div class="col-lg-5 mb-3">
                                                <div>
                                                    <label for="title" class="form-label">Workflow title</label>
                                                    <input type="text" class="form-control" id="title" name="title">
                                                </div>
                                            </div>
                                            <div class="col-lg-7 mb-3">
                                            </div>
                                            <div class="col-lg-5">
                                                <div class="card">
                                                    <div class="card-header">
                                                        <h4 class="card-title mb-0 text-white">Comm. Templates</h4>
                                                    </div><!-- end card header -->
                                                    <div class="card-body">
                                                        <p class="text-muted">Drag below list right side for assign template</p>

                                                        <div class="list-group col template-list">
                                                            <div class="list-group-item"><i class="ri-drag-move-fill align-bottom handle"></i> Item 1</div>
                                                        </div>
                                                    </div><!-- end card-body -->
                                                </div><!-- end card -->
                                            </div>
                                            <!-- end col -->

                                            <div class="col-lg-7">
                                                <div class="card">
                                                    <div class="card-header">
                                                        <h4 class="card-title mb-0 text-white">Workflow Templates</h4>
                                                    </div><!-- end card header -->

                                                    <div class="card-body">
                                                        <p class="text-muted">
                                                            &nbsp;
                                                        </p>

                                                        <div class="list-group template-list-handle">
                                                        </div>
                                                    </div><!-- end card-body -->
                                                </div><!-- end card -->
                                            </div>
                                            <!-- end col -->
                                        </div>
                                        <!--end row-->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="offcanvas-foorter border p-3 text-center">
                            <div class="hstack gap-2">
                                <button type="submit" class="btn btn-success waves-effect waves-light" id="add-btn">Save</button>
                                <button type="button" class="btn btn-light waves-effect waves-light close-offcanvas" id="close-modal">Close</button>
                                <div id="deleteBtnContainer"></div>
                                <?php if (isset($edit) && $edit && isset($id) && $id > 0) { ?>               
                                    <script>
                                        document.getElementById('deleteBtnContainer').innerHTML = delete_icon(<?= $id ?>, 'workdlow-schedule');
                                    </script>
                                <?php }  ?>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
            <!-- end row -->

        </div>
        <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
</div>