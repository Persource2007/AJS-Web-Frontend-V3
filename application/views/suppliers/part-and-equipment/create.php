<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            $sub_title = 'Create Part & Equipment';
            include_once APPPATH . 'views/suppliers/inc/breadcrumb.php';
            ?>
            <!-- end page title -->
            <div class="row">
                <div class="col-lg-12">
                    <?php
                    $action = app_url('part-and-equipment/create');
                    if (isset($edit) && $edit && isset($id) && $id > 0) {
                        $action = app_url('part-and-equipment/edit');
                    }
                    ?>
                    <form class="tablelist-form pb-4" action="<?= $action ?>" method="post" id="supplierPartForm" autocomplete="off">
                        <input type="hidden" value="<?= $id ?? null ?>" id="edit_id" name="edit_id" />
                        <input type="hidden" value="<?= $supplier_id ?? null ?>" id="supplier_id" name="supplier_id" />
                        <div class="p-0 overflow-hidden">
                            <div data-simplebar style="height: calc(100vh - 112px);">
                                <div class="acitivity-timeline p-4 pt-2">
                                    <div class="modal-body">
                                        <div class="row gy-2">
                                            <h5 class="mb-0 d-flex align-items-end">Part and Equipment Items
                                                <button type="button" class="btn btn-success ms-auto popup-form-button-master popup-add-btn" data-heading="Add Items" data-width="680"  data-after-load-func="initialize_item_table" data-form-url="<?= base_url('kit/create-items/') ?>">
                                                    <i class="ri-add-line align-bottom"></i>
                                                </button>
                                            </h5>
                                            <hr class="mb-2 mt-2">
                                            <div class="col-xxl-12 col-md-12">
                                                <div class="mb-4">
                                                    <table class="display table dt-responsive align-middle table-nowrap mb-0">
                                                        <thead class="table-light text-muted">
                                                            <tr>
                                                                <th>Manuf. Part No.</th>
                                                                <th>Name</th>
                                                                <th>Type</th>
                                                                <th>Ave. Price</th>
                                                                <th>Price(£) <span class="text-danger">*</span></th>
                                                                <th>Supplier Part No. <span class="text-danger">*</span></th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody id="table-items" data-custom-field-fn="get_custom_fields">
                                                        </tbody>
                                                    </table>
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
                                <?php if (isset($edit) && $edit && isset($id) && $id > 0) {?>               
                                    <script>
                                        document.getElementById('deleteBtnContainer').innerHTML = delete_icon(<?= $id ?>, 'part-and-equipment');
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