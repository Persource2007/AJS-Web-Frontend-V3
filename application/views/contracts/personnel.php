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
                    <div>

                        <?php
                        $title = "Personnel";
                        if (!empty($client_id)) {
                            require_once APPPATH . 'views/clients/inc/nav-tab.php';
                        } else {
                            require_once APPPATH . 'views/contracts/inc/nav-tab.php';
                        }
                        ?>
                        <!-- Tab panes -->
                        <div class="tab-content text-muted">
                            <div class="tab-pane active selling-tab" id="personnel" role="tabpanel">
                                <div class="card">
                                    <?php
                                    if (!empty($client_id)) {
                                        $this->load->view('contracts/inc/sub-nav-tab', ['client_id' => $client_id, 'title' => $title]);
                                    }
                                    $action = app_url('contract/create');
                                    if (isset($id) && $id > 0) {
                                        $action = app_url("contract/$id/personnel");
                                    }
                                    ?>
                                    <div class="card-body pt-0">
                                        <form class="tablelist-form mt-1" autocomplete="off" id="personnelForm" method="post" action="<?= $action ?>">
                                            <div class="row align-items-end letter-form">
                                                <div class="col-xxl-9 col-md-9">
                                                    <h5 class="mb-0">Client Contact</h5>
                                                </div>
                                                <div class="col-xxl-3 col-md-3 text-end">
                                                    <button type="button" class="btn btn-success add-client-contact popup-add-btn"><i class="ri-add-line align-bottom me-1"></i> Add</button>
                                                </div>
                                            </div>
                                            <hr class="mt-1 mb-0">
                                            <div id="client-section">
                                                <div class="client-row row gy-2 mt-1 align-items-center mb-1">
                                                    <input type="hidden" class="contact-id" name="client_contacts[0][id]" value="0" />
                                                    <div class="col-xxl-3 col-md-4">
                                                        <div class="input-light">
                                                            <label class="form-label">Type </label>
                                                            <div class="d-flex error-div">
                                                                <select class="form-control client-type" name="client_contacts[0][type_id]" id="client_contact_type_0" >
                                                                    <option value="" selected>Select</option>
                                                                </select>

                                                                <button type="button" class="btn btn-success ms-2 popup-form-button-master" data-heading="Add New Type" data-after-load-func="create_master_form" data-element="client_contact_type_0" data-form-url="<?= base_url('system/master-record/create/CONTACT_TYPE') ?>"><i class="ri-add-line align-bottom"></i></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-3 col-md-4">
                                                        <div class="input-light">
                                                            <label class="form-label">Name </label>
                                                            <input type="text" class="form-control" name="client_contacts[0][name]">
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-3 col-md-4">
                                                        <div class="input-light">
                                                            <label class="form-label">Email</label>
                                                            <input type="email" class="form-control" name="client_contacts[0][email]" >
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl col-xl-4 col-md-4">
                                                        <div class="input-light">
                                                            <label class="form-label">Phone</label>
                                                            <input type="text" class="form-control telephone-mask" name="client_contacts[0][phone]" >
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-1 col-md-1 hide">
                                                        <label class="form-label">&nbsp;</label><br />
                                                        <button type="button" class="btn btn-danger delete-client-contact popup-close-btn">
                                                            <i class="ri-close-line"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row align-items-end letter-form mt-2">
                                                <div class="col-xxl-9 col-md-9">
                                                    <h5 class="mb-0">AJS Contact</h5>
                                                </div>
                                                <div class="col-xxl-3 col-md-3 text-end">
                                                    <button type="button" class="btn btn-success add-ajs-contact popup-add-btn"><i class="ri-add-line align-bottom me-1"></i> Add</button>
                                                </div>
                                            </div>
                                            <hr class="mt-1 mb-0">
                                            <div id="ajs-section" class="mb-2">
                                                <div class="ajs-row row gy-2 mt-1 align-items-center mb-1">
                                                    <input type="hidden" class="contact-id" name="ajs_contacts[0][id]" value="0" />
                                                    <div class="col-xxl-3 col-md-4">
                                                        <div class="input-light multi-choice">
                                                            <label for="location" class="form-label">User Type <span class="text-danger">*</span></label>
                                                            <div class="d-flex error-div">
                                                                <select class="form-control ajs-type" id="ajs_contact_type_0" name="ajs_contacts[0][type_id]" required>
                                                                    <option value="" selected>Select</option>
                                                                </select>

                                                                <button type="button" class="btn btn-success ms-2 popup-form-button-master popup-add-btn" data-heading="Add New Type" data-after-load-func="create_master_form" data-element="ajs_contact_type_0" data-form-url="<?= base_url('system/master-record/create/USER_TYPES') ?>"><i class="ri-add-line align-bottom"></i></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-3 col-md-4">
                                                        <div class="input-light">
                                                            <label class="form-label">User <span class="text-danger">*</span></label>
                                                            <select class="form-control select2 ajs-user" id="ajs_user_0" name="ajs_contacts[0][user_id]" required>
                                                                <option value="" selected>Select</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-3 col-md-4">
                                                        <div class="input-light">
                                                            <label class="form-label">Email</label>
                                                            <input type="email" class="form-control email-field" name="ajs_contacts[0][email]" >
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl col-xl-4 col-md-4 ">
                                                        <div class="input-light">
                                                            <label class="form-label">Phone</label>
                                                            <input type="text" class="form-control phone-field telephone-mask" name="ajs_contacts[0][phone]" >
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-1 col-md-1 hide">
                                                        <label class="form-label">&nbsp;</label><br />
                                                        <button type="button" class="btn btn-danger delete-ajs-contact">
                                                            <i class="ri-close-line"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- <div class="col-xxl-12 mb-3" data-select2-id="select2-data-33-8ce4">
                                                <label for="set-role" class="form-label">Preferred Engineers</label>
                                                <select class="form-control" id="engineers" name="engineers[]" multiple>
                                                </select>
                                            </div> -->

                                            <div class="col-xxl-12">
                                                <label class="form-label">Scheduling Staff</label>
                                                <select class="form-control" id="staffs" name="staffs[]" multiple>
                                                </select>
                                            </div>
                                            <div class="col-xxl-12 col-sm-12 text-end mt-4">
                                                <button type="submit" class="btn btn-success add-btn btn-lg">Save</button>
                                            </div>
                                    </div>
                                    </form>
                                </div>
                                <!--end card-body-->
                            </div>
                            <!--end card-->
                        </div>
                        <!--end tab-pane-->
                    </div>
                    <!--end tab-content-->
                </div>
            </div>
            <!--end col-->
        </div>
        <!--end row-->
    </div>
    <!-- container-fluid -->
</div>
<!-- End Page-content -->
<input type="hidden" id="edit_id" name="edit_id" value="<?= $id ?? null ?>" />
<input type="hidden" id="client_id" name="client_id" autocomplete="off" value="<?= $client_id ?? '0' ?>" />
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/common.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/personnel.js?v=1.1') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/contract-commons.js') ?>"></script>
<script type="text/javascript">
    $('.client-sub-nav').find('a[data-tab="client-contracts"]').addClass('active');
</script>