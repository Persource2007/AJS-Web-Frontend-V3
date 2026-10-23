<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->

<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                </div>
            </div>
            <!-- end page title -->

            <div class="row">
                <?php
                $action = app_url('property/update-contact-details');
                ?>
                <form class="tablelist-form pb-4 simplebar-form" action="<?= $action ?>" method="post" id="residentContactForm" style="height: calc(100vh - 112px);" data-simplebar autocomplete="off">
                    <input type="hidden" value="" id="edit_property_id" name="id"  />
                    <div class="p-0 overflow-hidden pb-3">
                        <div>
                            <div class="acitivity-timeline p-4 pt-2">
                                <div class="modal-body">
                                    <div class="row g-3">
                                        <div class="col-12">
                                            <label class="form-label">Street Address 1 <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control" name="address1" value="">
                                        </div>
                                        <div class="col-12">
                                            <label class="form-label">Street Address 2</label>
                                            <input type="text" class="form-control" name="address2" value="">
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Area</label>
                                            <input type="text" class="form-control" name="area" value="">
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Town</label>
                                            <input type="text" class="form-control" name="town" value="">
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">County</label>
                                            <input type="text" class="form-control" name="county" value="">
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Postcode <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control" name="postalcode" value="">
                                        </div>
                                        <div class="col-12">
                                            <hr class="my-1">
                                            <h6 class="mb-0">Resident Contact</h6>
                                        </div>
                                        <div class="col-12">
                                            <label class="form-label">Resident Name</label>
                                            <input type="text" class="form-control" name="resident_name" value="">
                                        </div>
                                        <div class="col-md-12">
                                            <label class="form-label">Email</label>
                                            <input type="email" class="form-control" name="email" value="">
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Mobile</label>
                                            <div class="input-group">
                                                <span class="input-group-text">+44</span>
                                                <input type="text" class="form-control mobile-mask" name="mobile" value="">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Telephone</label>
                                            <div class="input-group">
                                                <span class="input-group-text">+44</span>
                                                <input type="text" class="form-control telephone-mask" name="telephone" value="">
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
                            <button type="button" class="btn btn-light waves-effect waves-light" data-bs-dismiss="offcanvas">Close</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
</div>