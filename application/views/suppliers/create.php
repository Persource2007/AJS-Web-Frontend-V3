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
                    $action = app_url('supplier/create');
                    if (isset($id) && $id > 0) {
                        $action = app_url('supplier/edit/');
                    }
                    ?>
                    <form class="tablelist-form pb-4 simplebar-form" autocomplete="off" id="supplierForm" method="post" action="<?= $action ?>">
                        <input type="hidden" id="edit_id" name="edit_id" value="<?= $id ?? null ?>" />
                        <div class="p-0 overflow-hidden">
                            <div data-simplebar style="height: calc(100vh - 112px);">
                                <div class="acitivity-timeline p-4">
                                    <div class="modal-body">
                                        <div class="">
                                            <div class="row gy-2">
                                                <div class="col-xxl-8 col-md-8">
                                                    <div>
                                                        <label class="form-label">Supplier Name <span class="text-danger">*</span></label>
                                                        <input type="text" class="form-control" id="name" name="name">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-4">
                                                    <div>
                                                        <label class="form-label">Supplier Code <span class="text-danger">*</span></label>
                                                        <input type="text" class="form-control" id="code" name="code">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-4">
                                                    <div>
                                                        <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
                                                        <input type="email" class="form-control" id="email" name="email">
                                                    </div>
                                                </div>
                                                <!-- <div class="col-xxl-4 col-md-4">
                                                    <div>
                                                        <label class="form-label">Mobile</label>
                                                        <div class="input-group">
                                                            <span class="input-group-text">+44</span>
                                                            <input type="text" class="form-control mobile-mask" id="mobile" name="mobile">
                                                        </div>
                                                    </div>
                                                </div> -->
                                                <div class="col-xxl-4 col-md-4">
                                                    <div>
                                                        <label class="form-label">Telephone <span class="text-danger">*</span></label>
                                                        <div class="input-group">
                                                            <span class="input-group-text">+44</span>
                                                            <input type="text" class="form-control telephone-mask" id="telephone" name="telephone">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-4">
                                                    <div>
                                                        <label class="form-label">VAT Code</label>
                                                        <input type="text" class="form-control" id="vat_code" name="vat_code">
                                                    </div>
                                                </div>
                                            </div>
                                            <h5 class="fs-16 mb-0 mt-3">Address</h5>
                                            <hr class="mb-2 mt-1">
                                            <div class="row gy-2">
                                                <div class="col-xxl-6 col-md-6">
                                                    <div>
                                                        <label class="form-label">Address 1</label>
                                                        <input type="text" class="form-control" id="address1" name="address1">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-6 col-md-6">
                                                    <div>
                                                        <label class="form-label">Address 2</label>
                                                        <input type="text" class="form-control" id="address2" name="address2">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-4">
                                                    <div>
                                                        <label class="form-label">Town</label>
                                                        <select class="form-control select2" id="city_id" name="city_id">
                                                            <option value="" selected>Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-4">
                                                    <div>
                                                        <label class="form-label">County</label>
                                                        <input type="text" class="form-control" id="county" name="county">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-4">
                                                    <div>
                                                        <label class="form-label">Postcode</label>
                                                        <input type="text" class="form-control postalcode-mask" id="postcode" name="postcode">
                                                    </div>
                                                </div>
                                            </div>
                                            <h5 class="fs-16 mb-0 mt-3">Other details</h5>
                                            <hr class="mb-2 mt-1">
                                            <div class="row">
                                                <div class="col-xxl-4 col-md-4">
                                                    <div class="mb-2">
                                                        <label class="form-label">Account No.</label>
                                                        <input type="text" class="form-control" id="account_number" name="account_number">
                                                    </div>
                                                </div>

                                                <div class="col-xxl-8 col-md-12">
                                                    <div>
                                                        <label class="form-label">Additional Notes</label>
                                                        <input type="text" class="form-control" id="other_info" name="other_info">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="offcanvas-foorter p-4 text-center">
                            <div class="hstack gap-2">
                                <button type="submit" class="btn btn-success add-btn" id="add-btn">Save</button>
                                <button type="button" class="btn btn-light close-offcanvas" id="close-modal">Close</button>
                                <div id="deleteBtnContainer"></div>
                                <?php if (isset($id) && $id > 0) { ?>               
                                    <script>
                                        document.getElementById('deleteBtnContainer').innerHTML = delete_icon(<?= $id ?>, 'supplier');
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
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/suppliers/supplier.js') ?>"></script>