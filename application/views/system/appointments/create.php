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
                        <h4 class="mb-sm-0">Add</h4>
                        <div class="page-title-right">
                        </div>
                    </div>
                </div>
            </div>
            <!-- end page title -->

            <div class="row">
                <?php
                if($id > 0) {
                    $action = app_url('appointment-template/edit');
                } else {
                    $action = app_url('appointment-template/create');
                }
                $method = 'POST';
                ?>
                <form class="tablelist-form pb-4 simplebar-form" action="<?= $action ?>" method="<?= $method ?>" name="appointmentForm" id="appointmentForm" style="height: calc(100vh - 112px);" data-simplebar autocomplete="off">
                <input type="hidden" id="edit_id" name="edit_id" value="<?= $id ?? null ?>" />
                    <div class="p-0 overflow-hidden pb-3">
                        <div>
                            <div class="acitivity-timeline p-4 pt-2">
                                <div class="modal-body pb-3">
                                    <div class="">
                                        <div class="row gy-2"> 
                                            <div class="col-xxl-6 col-md-12">
                                                <div>
                                                    <label for="title" class="form-label">Title <span class="text-danger">*</span></label>
                                                    <input class="form-control" id="title" name="title" ></input>
                                                </div>
                                            </div>                                         
                                            <div class="col-xxl-12 col-md-12">
                                                <div>
                                                    <label for="draft" class="form-label">Draft <span class="text-danger">*</span></label>
                                                    <textarea class="form-control" id="draft" name="draft" rows="10" data-master-code="APPOINTMENT_FIELDS"></textarea>
                                                    <!-- <div id="draft" name="draft"></div> -->
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
                            <button type="submit" class="btn btn-success waves-effect waves-light" id="add-btn">Save</button>
                            <button type="button" class="btn btn-light waves-effect waves-light close-offcanvas" id="close-modal">Close</button>
                            <div id="deleteBtnContainer"></div>
                            <?php if (isset($id) && $id > 0) { ?>               
                                <script>
                                    document.getElementById('deleteBtnContainer').innerHTML = delete_icon(<?= $id ?>, 'appointment-template');
                                </script>
                            <?php }  ?>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- container-fluid -->
    </div>
</div>