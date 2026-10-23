<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->

<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            $title = "Contract Settings";
            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->

            <div class="row">
                <div class="col-lg-12">
                    <div>
                        <?php
                        if (!empty($client_id))
                        {
                            require_once APPPATH . 'views/clients/inc/nav-tab.php';
                        }
else
{
    require_once APPPATH . 'views/contracts/inc/nav-tab.php';
                        }
                        ?>
                        <!-- Tab panes -->
                        <div class="tab-content text-muted">
                            <div class="tab-pane active selling-tab" id="settings" role="tabpanel">
                                <div class="card">
                                    <?php
                                    if (!empty($client_id))
                                    {
                                        $this->load->view('contracts/inc/sub-nav-tab', ['client_id' => $client_id, 'title' => "Contract Settings"]);
                                    }
                                    ?>
                                    <div class="card-body pt-0">

                                        <form class="tablelist-form mt-1" autocomplete="off" id="settingsForm" action="<?= app_url('contract/' . $id . '/settings'); ?>" method="post">
                                            <div class="row gy-4 align-items-center">
                                                <div style="display: none" class="col-xxl-2 col-md-6">
                                                    <div class="input-light">
                                                        <label for="sor_prefix" class="form-label">SOR Prefix </label>
                                                        <input type="text" class="form-control" id="sor_prefix" name="sor_prefix">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-2 col-md-6">
                                                    <div class="input-light">
                                                        <label for="job_prefix" class="form-label">Job Prefix <span class="text-danger">*</span></label>
                                                        <input type="text" class="form-control" id="job_prefix" name="job_prefix">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-2 col-md-6">
                                                    <div class="input-light">
                                                        <label for="job_prefix" class="form-label">Preplan PPM schedule <!-- <span id="client_tooltip" class="tooltip-container" data-vars='' data-master-code="appointment_lead_time"><i class="bx bx-info-circle tooltip-dynamic"></i></span> --></label>
                                                        <select class="form-control" id="ppm_preplan" name="ppm_preplan">
                                                            <option value=""></option>
                                                            <option value="15">15 Days</option>
                                                            <option value="30">30 Days</option>
                                                            <option value="45">45 Days</option>
                                                            <option value="60">60 Days</option>
                                                            <option value="90">90 Days</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-2 col-lg-6">
                                                    <div class="flex-shrink-0">
                                                        <label for="is_contract_agent" class="form-label">Is Framework Contract</label>
                                                        <div class="form-check form-switch form-switch-lg mt-2">
                                                            <input class="form-check-input me-1" type="checkbox" name="is_contract_agent" id="is_contract_agent" value="1" >
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-2 col-md-3 hide agent-div">
                                                    <div>
                                                        <label for="contractor_commission" class="form-label">Framework Commission (%) <span class="text-danger">*</span></label>
                                                        <div class="form-icon">
                                                            <input id="contractor_commission" name="contractor_commission" type="number" class="form-control form-control-icon"  onKeyDown="if (this.value.length == 2 && event.keyCode != 8)
                                                                        return false;" required>
                                                            <i class="ri-percent-line" style="align-items: normal; top:10px"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-2 col-md-6 hide agent-div">
                                                    <div class="input-light">
                                                        <label for="contractor_id" class="form-label">Framework Contractor<span class="text-danger">*</span></label>
                                                        <select class="form-control select2" id="contractor_id" name="contractor_id" required>
                                                                <option value="" selected>Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xxl-12 col-sm-12 text-end mt-4">
                                                <button type="submit" class="btn btn-success btn-lg add-btn" style="margin-right: 8px;">Save</button>
                                            </div>
                                        </form>
                                    </div>
                                    <!--end card-body-->
                                </div>
                                <!--end card-->

                                <!-- Notification Settings Card -->
                                <div class="card mt-4">
                                    <div class="card-header">
                                        <h5 class="card-title mb-0">Notification Settings</h5>
                                    </div>
                                    <div class="card-body pt-0">
                                        <div id="notification-settings-container">
                                            <div class="notification-settings-loading text-center py-4">
                                                <div class="spinner-border text-primary" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--end card-body-->
                                </div>
                                <!--end card-->

                                <!-- Appointment Slots Card -->
                                <div class="card mt-4">
                                    <div class="card-header">
                                        <h5 class="card-title mb-0">Appointment Slots</h5>
                                    </div>
                                    <div class="card-body pt-0">
                                        <p class="text-muted small mb-3 mt-3">Configure the number of morning (AM) and afternoon/evening (PM) appointment slots available per day.</p>
                                        <div id="time-slots-container">
                                            <div class="text-center py-4">
                                                <div class="spinner-border text-primary" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        </div>
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
<input type="hidden" id="contract_id" value="<?= $id ?>" />
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/common.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/settings.js?v=1.1') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/contract-commons.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/notification-settings.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/time-slots.js') ?>"></script>
<style>
    .notification-settings-form .channel-selection.disabled {
        opacity: 0.6;
        pointer-events: none;
    }
    
    .notification-settings-form .channel-selection.disabled .form-check-input {
        cursor: not-allowed;
    }
    
    .notification-settings-form .form-label {
        font-weight: 500;
    }

    /* Vertical divider between side-by-side sections only when columns sit side by side */
    @media (max-width: 767.98px) {
        .section-divider {
            border-right: 0 !important;
        }
    }
</style>
<script type="text/javascript">
    $('.client-sub-nav').find('a[data-tab="client-contracts"]').addClass('active');
</script>