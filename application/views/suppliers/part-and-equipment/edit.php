<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            $sub_title = 'Edit Part & Equipment';
            include_once APPPATH . 'views/suppliers/inc/breadcrumb.php';
            ?>
            <!-- end page title -->
            <div class="row">
                <div class="col-lg-12">
                    <?php
                    $action = app_url('part-and-equipment/edit');
                    ?>
                    <form class="tablelist-form pb-4" action="<?= $action ?>" method="post" id="supplierPartForm" autocomplete="off">
                        <input type="hidden" value="<?= $id ?? null ?>" id="edit_id" name="edit_id" />
                        <input type="hidden" value="" id="supplier_id" name="supplier_id" />
                        <div class="p-0 overflow-hidden">
                            <div data-simplebar style="height: calc(100vh - 112px);">
                                <div class="acitivity-timeline p-4 pt-3">
                                    <div class="modal-body">
                                        <div class="row gy-2">
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label for="labelInput" class="form-label">Price <span class="text-danger">*</span></label>
                                                    <input type="number" class="form-control" name="price" id="price" value="" required>
                                                </div>
                                            </div>
                                            <!--end col-->
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label for="labelInput" class="form-label">Supplier Part No. <span class="text-danger">*</span></label>
                                                    <input type="text" class="form-control" id="supplier_part_no" name="supplier_part_no" required>
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