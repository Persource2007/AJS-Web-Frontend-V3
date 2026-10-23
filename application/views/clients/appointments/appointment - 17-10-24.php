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
                        require_once APPPATH . 'views/clients/inc/nav-tab.php';
                        ?>
                        <!-- Tab panes -->
                        <div class="tab-content text-muted">
                            <div class="tab-pane active selling-tab"  role="tabpanel">
                                <div class="card">
                                    <div class="card-body">
                                        <form class="tablelist-form mt-1" autocomplete="off" id="appointmentForm" action="<?= app_url('client/' . $id . '/appointment'); ?>" method="post">
                                            <div class="row">
                                                <div class="col-xxl-8 col-md-12">
                                                    <h5>Schedule Process</h5>
                                                </div>
                                            </div>

                                            <div class="hstack gap-5 mt-3">
                                                <div>
                                                    <div class="form-check form-switch form-switch-lg form-switch-right" dir="ltr">
                                                        <label class="form-check-label" for="customSwitchLetter">Letter</label>
                                                        <input type="checkbox" class="form-check-input appoint-switch" id="customSwitchLetter"  value="letter" name="types[]">
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="form-check form-switch form-switch-lg form-switch-right" dir="ltr">
                                                        <label class="form-check-label" for="customSwitchEmail">Email</label>
                                                        <input type="checkbox" class="form-check-input appoint-switch" id="customSwitchEmail" value="email" name="types[]">
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="form-check form-switch form-switch-lg form-switch-right" dir="ltr">
                                                        <label class="form-check-label" for="customSwitchSms">SMS</label>
                                                        <input type="checkbox" class="form-check-input appoint-switch" id="customSwitchSms" value="sms" name="types[]">
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="form-check form-switch form-switch-lg form-switch-right" dir="ltr">
                                                        <label class="form-check-label" for="customSwitchPhone">Phone Call</label>
                                                        <input type="checkbox" class="form-check-input appoint-switch" id="customSwitchPhone" value="phone" name="types[]">
                                                    </div>
                                                </div>
                                            </div>
                                            <hr>
                                            <ul class="nav nav-tabs nav-border-top nav-border-top-primary mb-3 mt-4" role="tablist">
                                                <li class="nav-item letter-tab hide">
                                                    <a class="nav-link " data-bs-toggle="tab" data-type="letter" href="#nav-border-top-letter" role="tab" aria-selected="false">
                                                        Letter
                                                    </a>
                                                </li>
                                                <li class="nav-item email-tab hide">
                                                    <a class="nav-link" data-bs-toggle="tab" data-type="email" href="#nav-border-top-email" role="tab" aria-selected="false">
                                                        Email
                                                    </a>
                                                </li>
                                                <li class="nav-item sms-tab hide">
                                                    <a class="nav-link" data-bs-toggle="tab" data-type="sms" href="#nav-border-top-sms" role="tab" aria-selected="false">
                                                        SMS
                                                    </a>
                                                </li>
                                                <li class="nav-item phone-tab hide">
                                                    <a class="nav-link" data-bs-toggle="tab" data-type="phone" href="#nav-border-top-phone" role="tab" aria-selected="false">
                                                        Phone Call
                                                    </a>
                                                </li>
                                            </ul>
                                            <div class="tab-content text-muted">
                                                <?php 
                                                    $appoint_types = ['letter', 'email', 'sms', 'phone'];

                                                    foreach ($appoint_types as $key => $type) {
                                                ?>
                                                <div class="tab-pane" id="nav-border-top-<?= $type ?>" role="tabpanel">
                                                        <div class="row gy-3">                                                            
                                                            <div class="col-xxl-10 col-md-12">
                                                                <label class="form-label text-capitalize"><?= $type ?> Draft</label>
                                                                <textarea  rows="10" name="drafts[<?=$type ?>]" id="draft_<?=$type ?>" data-master-code="<?=    strtoupper($type) ?>_FIELDS" required></textarea>
                                                            </div>
                                                            <div class="col-xxl-2 col-md-6">
                                                                <div class="input-light">
                                                                    <label class="form-label">Priority</label>
                                                                    <select class="form-control" name="priority[<?=$type ?>]" id="priority_<?=$type ?>">
                                                                        <option value="" selected>Select</option>
                                                                        <option value="1">1</option>
                                                                        <option value="2">2</option>
                                                                        <option value="3">3</option>
                                                                        <option value="4">4</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                </div>
                                                <?php } ?>
                                            </div>

                                            <div class="col-xxl-12 col-sm-12 text-end mt-4 ">
                                                <button type="submit" class="btn btn-success btn-lg add-btn hide" style="margin-right: 8px;">Save</button>
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
<input type="hidden" id="client_id" value="<?= $id ?>" />
<script type="text/javascript" src="<?= cdn_url('assets/js/ckeditor5.umd.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/app/ckeditor.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/client-appointment.js') ?>"></script>
<!-- End Page-content -->
<script type="text/javascript">
    $('.client-sub-nav').find('a[data-tab="client-appointments"]').addClass('active');
</script>