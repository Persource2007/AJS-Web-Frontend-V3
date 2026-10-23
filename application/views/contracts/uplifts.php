<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            $title = "Uplifts";
            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->

            <div class="row">
                <div class="col-lg-12">
                    <div>
                        <?php
                        if (!empty($client_id)) {
                            require_once APPPATH . 'views/clients/inc/nav-tab.php';
                        } else {
                            require_once APPPATH . 'views/contracts/inc/nav-tab.php';
                        }
                        ?>
                        <!-- Tab panes -->
                        <div class="tab-content text-muted">
                            <div class="tab-pane active" id="uplifts" role="tabpanel">
                                <div class="card same-page-height">
                                    <?php
                                    if (!empty($client_id)) {
                                        $this->load->view('contracts/inc/sub-nav-tab', ['client_id' => $client_id, 'title' => "Uplifts"]);
                                    }
                                    ?>
                                    <div class="card-body pt-0">
                                        <form class="tablelist-form mt-1" autocomplete="off" id="upliftsForm" action="<?= app_url('contract/' . $id . '/uplift'); ?>" method="post">
                                            <div class="row align-items-center letter-form">
                                                <div class="col-xxl-8 col-md-12"> </div>
                                                <div class="col-xxl-2 col-md-6">
                                                    <button type="button" class="add-uplift btn btn-success mt-4 position-absolute"><i class="ri-add-line align-bottom me-1"></i> Add</button>
                                                </div>
                                            </div>
                                            <div id="uplift-section">
                                                <div class="uplift-row row gy-2 mb-3 align-items-center">
                                                    <input type="hidden" class="row-id" name="uplifts[0][id]" value="0" />
                                                    <div style="display:none" class="col-xxl-3 col-md-6">
                                                        <div>
                                                            <label class="form-label">Workstream </label>
                                                            <div class="input-light">
                                                                <select class="service-id form-control select2" name="uplifts[0][service_id]" id="service_id_0">
                                                                    <option value="" selected>Select</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-2 col-md-3">
                                                        <div class="input-light">
                                                            <label class="form-label">Uplift Date <span class="text-danger">*</span></label>
                                                            <input type="date" class="form-control" name="uplifts[0][uplift_date]" required>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-2 col-md-3">
                                                        <div>
                                                            <label for="labelInput" class="form-label">Uplift Percentage <span class="text-danger">*</span></label>
                                                            <div class="form-icon">
                                                                <input name="uplifts[0][percentage]" type="number" class="form-control form-control-icon"  onKeyDown="if (this.value.length == 5 && event.keyCode != 8)
                                                                            return false;" required>
                                                                <i class="ri-percent-line" style="align-items: normal; top:10px"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-3 col-md-3">
                                                        <label class="form-label">&nbsp;</label><br />
                                                        <div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" name="uplifts[0][rate]" value="original" checked>
                                                                <label class="form-check-label" >On original rate</label>
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" name="uplifts[0][rate]"  value="current">
                                                                <label class="form-check-label" >On current rate</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-1 col-md-1 hide">
                                                        <label class="form-label">&nbsp;</label><br />
                                                        <button type="button" class="btn btn-danger delete-uplift popup-close-btn">
                                                            <i class="ri-close-line"></i>
                                                        </button>
                                                    </div>
                                                    <div class="col-xl-1 col-md-3 hide">
                                                        <label class="form-label">&nbsp;</label><br />
                                                        <div class="form-check form-switch form-switch-right form-switch-md">
                                                            <span data-id="24" title="Deactivate" class="change-status-btn">
                                                                <i style="font-size: 24px;cursor: pointer;" class="ri-star-s-fill"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <!-- <div class="col-xxl-5 col-md text-end">
                                                        <button type="button" class="add-uplift btn btn-success mt-4"><i class="ri-add-line align-bottom me-1"></i> Add</button>
                                                    </div> -->
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-sm-12 text-end mt-4">
                                                <button type="submit" class="btn btn-success btn-lg add-btn">Save</button>
                                                <!-- <a class="btn btn-primary add-btn">Next</a> -->
                                            </div>
                                        </form>
                                        <h5 class="mb-1">Uplift Reminders</h5>
                                        <hr class="mt-1 mb-3" />
                                        <form class="tablelist-form mt-1" autocomplete="off" id="upliftReminderForm" action="<?= app_url('contract/' . $id . '/uplift-reminder'); ?>" method="post">
                                            <div class="row align-items-center letter-form">
                                                <div class="col-xxl-8 col-md-12"> </div>
                                                <div class="col-xxl-2 col-md-6">
                                                    <button type="button" class="add-uplift-reminder btn btn-success mt-4 position-absolute"><i class="ri-add-line align-bottom me-1"></i> Add</button>
                                                </div>
                                            </div>
                                            <div id="uplift-reminder-section">
                                                <div class="uplift-reminder-row row gy-2 mb-3 align-items-center">
                                                    <input type="hidden" class="row-id" name="uplift_reminders[0][id]" value="0" />
                                                    
                                                    <div class="col-xxl-2 col-md-3">
                                                        <div>
                                                            <label for="labelInput" class="form-label">Before Days <span class="text-danger">*</span></label>
                                                            <div class="form-icon">
                                                                <input name="uplift_reminders[0][day]" type="number" class="form-control number-only" max="90"   required>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-4 col-md-6">
                                                        <div>
                                                            <label for="labelInput" class="form-label">Emails <span class="text-danger">*</span></label>
                                                            <div class="form-icon">
                                                                <input name="uplift_reminders[0][emails]" type="text" class="form-control" placeholder="Enter multiple email addresses separated by commas." multiemail="true" required>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-1 col-md-1 hide">
                                                        <label class="form-label">&nbsp;</label><br />
                                                        <button type="button" class="btn btn-danger delete-uplift-reminder popup-close-btn">
                                                            <i class="ri-close-line"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-sm-12 text-end mt-4">
                                                <button type="submit" class="btn btn-success btn-lg add-btn">Save</button>
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
</div>
<input type="hidden" id="edit_id" value="<?= $id ?>" />
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/common.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/contract-commons.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/uplifts.js') ?>"></script>

<script type="text/javascript">
    $('.client-sub-nav').find('a[data-tab="client-contracts"]').addClass('active');
</script>