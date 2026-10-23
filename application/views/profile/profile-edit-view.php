
<div class="main-content">

    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 class="mb-sm-0">View Profile</h4>
                        <div class="page-title-right">
                            <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item"><a href="javascript: void(0);">Profile</a></li>
                                <li class="breadcrumb-item active"><?php echo ($is_edit) ? 'Edit' : 'View'; ?></li>
                            </ol>
                        </div>

                    </div>
                </div>
            </div>
            <!-- end page title -->

            <div class="row">
                <form class="update-profile-form pb-4 simplebar-form" id="update-profile-form" style="height: calc(100vh - 112px);" method="post" data-simplebar autocomplete="off" action="<?php echo app_url('update/profile'); ?>">
                    <div class="p-0 overflow-hidden pb-3">
                        <div>
                            <div class="acitivity-timeline p-4">
                                <div class="modal-body">
                                    <div class="form-server-errors"></div>
                                    <?php
                                    if ($is_edit)
                                    {
                                        ?>
                                        <div class="card" id="profile-page-section" data-edit="true">
                                            <div class="card-header">
                                                <div class="row align-items-center pb-2">
                                                    <div class="col-xxl-9">
                                                        <h5 class="mb-0 "></h5>
                                                    </div>
                                                    <div class="col-xxl-3 text-end">
                                                        <a href="<?= cnd_url('profile/view'); ?>" class="">
                                                            <button type="button" class="btn btn-info">
                                                                <i class="fa fa-arrow-left"></i> Back
                                                            </button>
                                                        </a>
                                                        <button type="submit" class="btn btn-primary update-profile" id="add-btn">
                                                            <i class="fa fa-check"></i> Update
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-body">
                                                <div class="row gy-2">
                                                    <!-- form -->
                                                    <div class="row gy-3">
                                                        <div class="col-lg-12">
                                                            <div class="row gy-2">
                                                                <div class="col-xxl-4 col-md-4">
                                                                    <div class="card mb-0">
                                                                        <div class="card-body p-2">
                                                                            <div class="text-center">
                                                                                <div class="profile-user position-relative d-inline-block mx-auto  mb-0">
                                                                                    <img src="<?= cnd_url(); ?>assets/images/users/ajs-logo-wt.png" class="rounded-circle avatar-xl img-thumbnail user-profile-image" alt="user-profile-image" id="profile-preview">
                                                                                    <div class="avatar-xs p-0 rounded-circle profile-photo-edit">
                                                                                        <input type="hidden" id="profile_pic" name="profile_pic">
                                                                                        <input id="profile-img-file-input" type="file" class="profile-img-file-input" accept="image/*" data-preview-class="user-profile-image" data-upload-type="users" data-filename-input='profile_pic'>
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
                                                                            <div class="mb-3">
                                                                                <label for="first_name" class="form-label">First Name <span class="text-danger">*</span></label>
                                                                                <input type="text" class="form-control" id="first_name" name="first_name" required>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xxl-6 col-md-6">
                                                                            <div class="mb-3">
                                                                                <label for="last_name" class="form-label">Last Name <span class="text-danger">*</span></label>
                                                                                <input type="text" class="form-control" id="last_name" name="last_name" required>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xxl-6 col-md-6">
                                                                            <div class="mb-3">
                                                                                <label for="username" class="form-label">Username <span class="text-danger">*</span></label>
                                                                                <input type="text" class="form-control" id="username" readonly disabled>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xxl-6 col-md-6">
                                                                            <div class="mb-3">
                                                                                <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
                                                                                <input type="email" class="form-control" id="email" name="email" required>
                                                                            </div>
                                                                        </div>

                                                                            <div class="col-xxl-6 col-md-6">
                                                                                <div class="mb-3">
                                                                                    <label class="form-label">Mobile</label>
                                                                                    <div class="input-group">
                                                                                        <span class="input-group-text">+44</span>
                                                                                        <input type="text" class="form-control mobile-mask" id="mobile" name="mobile">
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xxl-6 col-md-6">
                                                                                <div class="mb-3">
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

                                                        </div>

                                                        <h5 class="fs-16 mb-0 mt-4">Update Your Password</h5>
                                                        <hr class="mb-2 mt-1">
                                                        <div class="col-xxl-12 col-md-12">
                                                            <div class="form-check mb-3">
                                                                <input type="checkbox" class="form-check-input" id="update_password" name="update_password" value="1">
                                                                <label class="form-check-label" for="update_password">Would you like to update your password?</label>
                                                            </div>
                                                        </div>

                                                        <div class="col-xxl-3 col-md-6 pwd-sec hide">
                                                            <div class="mb-3">
                                                                <label for="password" class="form-label">Current Password <span class="text-danger">*</span></label>
                                                                <div class="position-relative auth-pass-inputgroup mb-3">
                                                                    <input type="password" class="form-control password-input" id="current_password" name="current_password"autocomplete="old-password">

                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="col-xxl-3 col-md-6 pwd-sec hide">
                                                            <div class="mb-3">
                                                                <label for="password" class="form-label">New Password <span class="text-danger">*</span></label>
                                                                <div class="position-relative auth-pass-inputgroup mb-3">
                                                                    <input type="password" class="form-control password-input" id="password" name="password"autocomplete="new-password">
                                                                    <button class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon">
                                                                        <i class="ri-eye-fill align-middle"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-xxl-3 col-md-6 pwd-sec hide">
                                                            <div class="mb-3">
                                                                <label for="confirm_password" class="form-label">Re-enter New Password <span class="text-danger">*</span></label>
                                                                <input type="password" class="form-control" id="confirm_password" name="confirm_password"  autocomplete="new-password">
                                                            </div>
                                                        </div>

                                                        <h5 class="fs-16 mb-0 mt-4">Address</h5>
                                                        <div class="row gy-2">
                                                            <hr class="mb-2 mt-1">
                                                            <div class="col-xxl-4 col-md-2">
                                                                <div class="mb-3">
                                                                    <label class="form-label">Street Address</label>
                                                                    <input type="text" class="form-control" id="address" name="address">
                                                                </div>
                                                            </div>
                                                            <div class="col-xxl-4 col-md-2">
                                                                <div class="mb-3">
                                                                    <label class="form-label">City</label>
                                                                    <select class="form-control form-check-input select2" id="city_id" name="city_id">
                                                                        <option value="" selected>Select</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="col-xxl-4 col-md-2">
                                                                <div class="mb-3">
                                                                    <label class="form-label">County</label>
                                                                    <input type="text" class="form-control" id="county" name="county">
                                                                </div>
                                                            </div>
                                                            <div class="col-xxl-4 col-md-2">
                                                                <div class="mb-3">
                                                                    <label class="form-label">Postcode</label>
                                                                    <input type="text" class="form-control postalcode-mask" id="postcode" name="postcode">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!-- form -->
                                                    </div>
                                                </div>
                                            </div>
                                            <?php
                                        }
                                        else
                                        {
                                            ?>
                                            <div class="card" id="profile-page-section" data-edit="false">
                                                <div class="card-header">
                                                    <div class="row align-items-center pb-2">
                                                        <div class="col-xxl-9">
                                                            <h5 class="mb-0"></h5>
                                                        </div>
                                                        <div class="col-xxl-3 text-end">
                                                            <a href="<?= cnd_url('profile/edit'); ?>" class="sub-property-btn sub-property-back-btn">
                                                                <button type="button" class="btn btn-primary">
                                                                    <i class="ri-pencil-line"></i> Edit Profile
                                                                </button>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="card-body">
                                                    <div class="row gy-2 detail-data">
                                                        <!-- form -->
                                                        <div class="row gy-3">
                                                            <div class="col-lg-12">
                                                                <div class="row gy-2">
                                                                    <div class="col-xxl-4 col-md-4">
                                                                        <div class="card mb-0">
                                                                            <div class="card-body p-2">
                                                                                <div class="text-center">
                                                                                    <div class="profile-user position-relative d-inline-block mx-auto  mb-0">
                                                                                        <img src="<?= cnd_url(); ?>assets/images/users/ajs-logo-wt.png" class="rounded-circle avatar-xl img-thumbnail user-profile-image" alt="user-profile-image" id="profile-preview">
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <!--end card-->
                                                                    </div>
                                                                    <div class="col-xxl-8">
                                                                        <div class="row gy-2">
                                                                            <div class="col-xxl-6 col-md-6">
                                                                                <div class="mb-3">
                                                                                    <label>First Name</label>
                                                                                    <span class="first_name" id="first_name"></span>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xxl-6 col-md-6">
                                                                                <div class="mb-3">
                                                                                    <label>Last Name</label>
                                                                                    <span class="last_name" id="last_name"></span>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xxl-6 col-md-6">
                                                                                <div class="mb-3">
                                                                                    <label>Username</label>
                                                                                    <span class="username" id="username"></span>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xxl-6 col-md-6">
                                                                                <div class="mb-3">
                                                                                    <label>Email</label>
                                                                                    <span class="email" id="email"></span>
                                                                                </div>
                                                                            </div>

                                                                            <div class="col-xxl-6 col-md-6">
                                                                                <div class="mb-3">
                                                                                    <label class="form-label">Mobile</label>
                                                                                    <div class="d-flex">
                                                                                        <span class="input-group-text">+44</span>
                                                                                        <span class="mobile w-100" id="mobile"></span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xxl-6 col-md-6">
                                                                                <div class="mb-3">
                                                                                    <label class="form-label">Telephone</label>
                                                                                    <div class="d-flex">
                                                                                        <span class="input-group-text">+44</span>
                                                                                        <span class="telephone w-100" id="telephone"></span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                        <h5 class="fs-16 mb-0 mt-4">Address</h5>
                                                        <div class="row gy-2">
                                                            <hr class="mb-2 mt-1">
                                                            <div class="col-xxl-4 col-md-2">
                                                                <div class="mb-3">
                                                                    <label>Street Address</label>
                                                                    <span class="address" id="address"></span>
                                                                </div>
                                                            </div>
                                                            <div class="col-xxl-4 col-md-2">
                                                                <div class="mb-3">
                                                                    <label class="form-label">City</label>
                                                                    <span class="city_name" id="city_name"></span>
                                                                </div>
                                                            </div>
                                                            <div class="col-xxl-4 col-md-2">
                                                                <div class="mb-3">
                                                                    <label class="form-label">County</label>
                                                                    <span class="county" id="county"></span>
                                                                </div>
                                                            </div>
                                                            <div class="col-xxl-4 col-md-2">
                                                                <div class="mb-3">
                                                                    <label class="form-label">Postcode</label>
                                                                    <span class="postcode" id="postcode"></span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <h5 class="fs-16 mb-0 mt-4">Assign Clients & Contracts</h5>
                                                        <div class="gy-2" id="assigned-client-contracts">
                                                            <hr class="mb-2 mt-1">
                                                        </div>
                                                        <!-- form -->
                                                    </div>
                                                </div>
                                            </div>
                                        <?php } ?>

                                </div>

                            </div>
                        </div>
                    </div>
            </div>
            </form>
        </div>
    </div>
    <!-- container-fluid -->
</div>
<script type="text/javascript" src="<?= cdn_url('assets/js/profile/edit-view.js') ?>"></script>
<script src="<?= cnd_url('assets/js/pages/password-addon.init.js'); ?>"></script>

