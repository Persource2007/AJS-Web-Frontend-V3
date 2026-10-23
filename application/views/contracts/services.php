<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
<div class="main-content">

    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            $title     = "Workstream";
            $id        = $contract_id;
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
                            <div class="tab-pane active selling-tab" id="services" role="tabpanel">
                                <div class="card">
                                    <?php
                                        if (!empty($client_id)) {
                                            $this->load->view('contracts/inc/sub-nav-tab', ['client_id' => $client_id,'title' => $title]);
                                        }
                                        $action = app_url('contract/' . $contract_id . '/add_services');
                                        if (isset($edit) && $edit && isset($id) && $id > 0)
                                        {
                                            $action = app_url('contract/' . $contract_id . '/modify_services/');
                                        }
                                        ?>
                                    <div class="card-body pt-0">

                                        <form name="contract_services_form" id="contract_services_form" action="<?= $action ?>" class="tablelist-form mt-1" autocomplete="off">
                                            <div class="row gy-4 align-items-center">
                                                <div class="col-xxl-4 col-md-6">
                                                    <div class="input-light multi-choice">
                                                        <label for="location" class="form-label select-billing">Service Preference <span class="text-danger">*</span><span class="tooltip-container" data-master-code="SERVICE_PREFERENCE"><i class="bx bx-info-circle tooltip"></i></span></label>
                                                        <div class="hstack gap-2">
                                                            <div class="w-100">
                                                                <select class="form-control" multiple="multiple" name="service_preference_am[]" id="service_preference_am">

                                                                </select>
                                                            </div>
                                                            <!--                                                            <div class="w-100">
                                                                                                                            <select class="form-control" name="service_preference_pm" id="service_preference_pm">
                                                                    <option  selected value="">Service Preference PM</option>
                                                                </select>
                                                                                                                        </div>-->
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style="display:none" class="col-xxl-4 col-md-6">
                                                    <div class="input-light mt-4">
                                                        <div>
                                                            <div class="form-check form-check-inline">
                                                                <input checked class="form-check-input" type="radio" name="schedule_setup" id="schedule_setupT" value="T">
                                                                <label class="form-check-label" for="schedule_setupT">Upload Template</label>
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" name="schedule_setup" id="schedule_setupM" value="M">
                                                                <label class="form-check-label" for="schedule_setupM">Mannual Setup</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div style="display: none" class="col-xxl-12 col-md-12 mt-3">
                                                    <div class="input-light">
                                                        <label for="basiInput" class="form-label select-billing">Schedule next job if previous job is incomplete?</label>
                                                        <div class="">
                                                            <div class="form-check form-check-inline mb-0">
                                                                <input class="form-check-input" checked="checked" type="radio" name="schedule_next_job" id="schedule_next_job_y" value="Y">
                                                                <label class="form-check-label" for="schedule_next_job_y">Yes</label>
                                                            </div>
                                                            <div class="form-check form-check-inline mb-0">
                                                                <input class="form-check-input" type="radio" name="schedule_next_job" id="schedule_next_job_n" value="N">
                                                                <label class="form-check-label" for="schedule_next_job_n">No, alert the Contract Manager</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div class="row gy-4 align-items-center mt-0">
                                                <div class="col-xxl-12 col-md-12 mt-3">
                                                    <div class="input-light multi-choice">
                                                        <h5 for="location" class="form-label">Workstreams</h5>

                                                        <div class="workstreams_div row">

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="workstream_parent_div">

                                            </div>
                                            <div class="card mt-3">
                                                <div class="card-header">
                                                    <div>
                                                        <ul class="nav worklist-ul nav-tabs-custom rounded card-header-tabs border-bottom-0" role="tablist">

                                                        </ul>
                                                        <!--end nav-->
                                                    </div>
                                                </div>
                                                <div class="card-body">
                                                    <div class="tab-content worklist-tab-content">

                                                    </div>
                                                    <!--end tab-content-->
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-sm-12 text-end mt-4">
                                                <input type="hidden" name="contract_id" id="contract_id" value="<?= $contract_id ?>" />
                                                <input type="hidden" name="service_type" id="service_type" value="" />
                                                <input type="hidden" name="client_id_ajs" id="client_id_ajs" value="" />
                                                <input type="hidden" name="selected_ws" id="selected_ws" value="" />
                                                <button type="submit" class="btn btn-success btn-lg add-btn" style="margin-right: 8px;">Save</button>
                                                <a href="<?= base_url('contract/master-plan/' . hash_encode($contract_id)) ?>" class="btn btn-primary add-btn hide">Next</a>
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
            <!--end modal-->

        </div>
        <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
    <style>
        /* app.min.css pins every select in this table to `width: 220px !important`
           and the row-header cell to 380px. Those were written when this table had
           far fewer columns; at 14 columns they leave no room to size anything
           individually, and the !important beats inline styles.

           Job Type, Default SOR, Priority and Appt. Workflow are all turned into
           select2 widgets, so the element actually on screen is a sibling
           `span.select2-container` — NOT the original <select>, which select2
           hides. Sizing the <select> alone does nothing, which is why the column
           widths would not move. Target the container via the adjacent-sibling of
           the classed select; each selector below is one step more specific than
           the app rule, so it wins cleanly.
           Scoped to #tasksTable so no other screen is affected. */
        #tasksTable tbody th {
            width: auto;
        }
        #tasksTable tbody th select.job-type-drop + .select2-container {
            width: 240px !important;
        }
        #tasksTable tbody td select.priority-col + .select2-container {
            width: 70px !important;
        }
        #tasksTable tbody td select.sor-col + .select2-container,
        #tasksTable tbody td select.workflow-col + .select2-container {
            width: 130px !important;
        }

        /* Fallbacks for the raw controls: the two plain inputs, plus the selects
           themselves in case select2 fails to initialise. */
        #tasksTable tbody th select.form-control.job-type-drop {
            width: 240px !important;
        }
        #tasksTable tbody td select.form-control.priority-col {
            width: 70px !important;
        }
        #tasksTable tbody td select.form-control.sor-col,
        #tasksTable tbody td select.form-control.workflow-col {
            width: 130px !important;
        }
        #tasksTable tbody td input.form-control.threshold-col {
            width: 110px !important;
        }
        #tasksTable tbody td input.form-control.min-margin-col {
            width: 120px !important;
        }
    </style>
    <script>
        contract_id = "<?= $contract_id; ?>";
    </script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/common.js') ?>"></script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/contract-commons.js') ?>"></script>

    <script type="text/javascript" src="<?= base_url('assets/js/datatables/contracts/contract-services.js?v=1.7') ?>"></script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/systems/services.js') ?>"></script>
    <script type="text/javascript">
    $('.client-sub-nav').find('a[data-tab="client-contracts"]').addClass('active');
</script>