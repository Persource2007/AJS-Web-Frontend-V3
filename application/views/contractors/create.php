<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            $sub_title = 'Create Contractor';
            include_once APPPATH . 'views/contractors/inc/breadcrumb.php';
            ?>
            <!-- end page title -->
            <div class="row">
                <div class="col-lg-12">
                    <?php
                    $action = app_url('contractor/create');
                    if (isset($edit) && $edit && isset($id) && $id > 0) {
                        $action = app_url('contractor/edit/');
                    }
                    ?>
                    <form class="tablelist-form pb-4" action="<?= $action ?>" method="post" id="contractorForm" autocomplete="off">
                        <input type="hidden" value="<?= $id ?? null ?>" id="edit_id" name="edit_id" />
                        <div class="p-0 overflow-hidden">
                            <div data-simplebar style="height: calc(100vh - 112px);">
                                <div class="acitivity-timeline p-4">
                                    <div class="modal-body">
                                        <div class="row gy-2">
                                            <div class="col-lg-12">
                                                <div class="row gy-2">
                                                    <div class="col-xxl-4 col-md-4">
                                                        <div class="card mb-2">
                                                            <div class="card-body p-2">
                                                                <div class="text-center">
                                                                    <div class="profile-user position-relative d-inline-block mx-auto  mb-4">
                                                                        <img src="<?= cnd_url(); ?>assets/images/users/ajs-logo-wt.png" class="rounded-circle avatar-xl img-thumbnail user-profile-image" alt="user-profile-image" id="profile-preview">
                                                                        <div class="avatar-xs p-0 rounded-circle profile-photo-edit">
                                                                            <input type="hidden" id="logo" name="logo">
                                                                            <input id="profile-img-file-input" type="file" class="profile-img-file-input" accept="image/*" data-preview-class="user-profile-image" data-upload-type="contractors" data-filename-input="logo">
                                                                            <label for="profile-img-file-input" class="profile-photo-edit avatar-xs">
                                                                                <span class="avatar-title rounded-circle bg-light text-body">
                                                                                    <i class="ri-camera-fill"></i>
                                                                                </span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!--end card-->
                                                    </div>
                                                    <div class="col-xxl-8">
                                                        <div class="row gy-2">
                                                            <div class="col-xxl-6 col-md-6">
                                                                <div>
                                                                    <label for="first_name" class="form-label">First Name <span class="text-danger">*</span></label>
                                                                    <input type="text" class="form-control" id="first_name" name="first_name">
                                                                </div>
                                                            </div>
                                                            <div class="col-xxl-6 col-md-6">
                                                                <div>
                                                                    <label for="last_name" class="form-label">Last Name <span class="text-danger">*</span></label>
                                                                    <input type="text" class="form-control" id="last_name" name="last_name">
                                                                </div>
                                                            </div>
                                                            <div class="col-xxl-6 col-md-6">
                                                                <div>
                                                                    <label class="form-label">Mobile <span class="text-danger">*</span></label>
                                                                    <div class="input-group">
                                                                        <span class="input-group-text">+44</span>
                                                                        <input type="text" class="form-control mobile-mask" id="mobile" name="mobile">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-xxl-6 col-md-6">
                                                                <div>
                                                                    <label class="form-label">Telephone</label>
                                                                    <div class="input-group">
                                                                        <span class="input-group-text">+44</span>
                                                                        <input type="text" class="form-control telephone-mask" id="telephone" name="telephone">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
                                                    <input type="email" class="form-control" id="email" name="email">
                                                </div>
                                            </div>
                                            <div class="col-xxl-2 col-md-2">
                                                <div>
                                                    <label class="form-label">VAT</label>
                                                    <input type="number" class="form-control number-only" id="vat" name="vat">
                                                </div>
                                            </div>
                                            <div class="col-xxl-2 col-md-2">
                                                <label class="form-label">Contractor Type</label>
                                                <div>
                                                    <div class="form-check form-check-inline mt-2">
                                                        <input class="form-check-input" type="radio" name="contractor_type" value="ajs" id="ajs_contr" checked>
                                                        <label class="form-check-label" for="ajs_contr">AJS</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="contractor_type" value="agent" id="agent_contr">
                                                        <label class="form-check-label" for="agent_contr">Agent</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <label class="form-label">Job Type</label>
                                                <div>
                                                    <div class="form-check form-check-inline mt-2">
                                                        <input class="form-check-input" type="radio" name="job_type" value="ppm" id="ppm_job_type" checked>
                                                        <label class="form-check-label" for="ppm_job_type">PPM</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="job_type" value="reactive" id="reactive_job_type">
                                                        <label class="form-check-label" for="reactive_job_type">Reactive</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <h5 class="fs-16 mb-0 mt-3 mb-0">Address</h5>
                                        <hr class="mt-1 mb-2">
                                        <div class="row gy-2">
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">Street Address</label>
                                                    <input type="text" class="form-control" id="address" name="address">
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

                                            <div class="col-xxl-8 col-md-12">
                                                <div>
                                                    <label  class="form-label">Other info</label>
                                                    <input type="text" class="form-control" id="other_info" name="other_info">
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
                                <button type="button" class="btn btn-light waves-effect waves-light close-offcanvas" id="close-modal" >Close</button>
                                <div id="deleteBtnContainer"></div>
                                <?php if (isset($edit) && $edit && isset($id) && $id > 0) { ?>               
                                    <script>
                                        document.getElementById('deleteBtnContainer').innerHTML = delete_icon(<?= $id ?>, 'contractor');
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