<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            $title = "Reports";
            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->

            <div class="same-page-height">
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
                            <div class="tab-pane active" id="uplifts" role="tabpanel">
                                <div class="card">
                                    <?php
                                    if (!empty($client_id))
                                    {
                                        $this->load->view('contracts/inc/sub-nav-tab', ['client_id' => $client_id, 'title' => "Reports"]);
                                    }
                                    ?>
                                    <div class="card-body pt-0">
                                        <form class="tablelist-form mt-1" autocomplete="off" id="reportsForm" action="<?= app_url('contract/' . $id . '/reports'); ?>" method="post">
                                            <div class="col-xxl-12 col-md text-end">
                                                <button type="button" class="add-report btn btn-success"><i class="ri-add-line align-bottom me-1"></i> Add</button>
                                            </div>
                                            <div id="report-section">
                                                <div class="report-row row gy-2 mb-3 align-items-center">
                                                    <input type="hidden" class="row-id" name="reports[0][id]" value="0" />
                                                    <div class="col-xxl-3 col-md-6">
                                                        <div>
                                                            <label class="form-label">Report </label>
                                                            <div class="input-light">
                                                                <select class="report-id form-control select2" name="reports[0][report_id]" required id="report_id_0">
                                                                    <option value="" selected>Select</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-3 col-md-6">
                                                        <div>
                                                            <label class="form-label">Frequency </label>
                                                            <div class="input-light">
                                                                <select class="frequency-id form-control select2" name="reports[0][frequency]" required id="frequency_0">
                                                                    <option value="" selected>Select</option>
                                                                    <option value="Weekly">Weekly</option>
                                                                    <option value="Monthly">Monthly</option>
                                                                    <option value="Yearly">Yearly</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-2 col-md-3">
                                                        <div class="input-light">
                                                            <label class="form-label">Send To <span class="text-danger">*</span></label>
                                                            <input type="text" class="form-control send-to" id="send_to_0" name="reports[0][send_to]" required>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-1 col-md-1">
                                                        <label class="form-label">&nbsp;</label><br />
                                                        <button type="button" class="btn btn-danger delete-report popup-close-btn">
                                                            <i class="ri-close-line"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xxl-12 col-sm-12 text-end mt-4">
                                                <button type="submit" class="btn btn-success btn-lg add-btn">Save</button>
                                                <!-- <a class="btn btn-primary add-btn">Next</a> -->
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
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/reports.js') ?>"></script>

<script type="text/javascript">
    $('.client-sub-nav').find('a[data-tab="client-contracts"]').addClass('active');
</script>