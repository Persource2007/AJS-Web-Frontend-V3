<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->

<div class="main-content">

    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
                $title = "Client Settings";
                require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->

            <div class="same-page-height">
                <div>
                    <?php
                    require_once APPPATH . 'views/clients/inc/nav-tab.php';
                    ?>
                    <!-- Tab panes -->
                    <div class="tab-content text-muted">
                        <div class="tab-pane active selling-tab" id="settings" role="tabpanel">

                            <!-- Communication Settings Card -->
                            <div class="card">
                                <div class="card-header">
                                    <h5 class="card-title mb-0">Communication Settings</h5>
                                </div>
                                <div class="card-body pt-0">
                                    <div id="communication-settings-container">
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

                            <!-- Certificate Codes Settings Card -->
                            <div class="card mt-4">
                                <div class="card-header">
                                    <h5 class="card-title mb-0">Certificate Codes Settings</h5>
                                </div>
                                <div class="card-body pt-0">
                                    <p class="text-muted small mb-3 mt-3">Override the certificate codes for this client. Each code defaults to the master certificate code and can be edited below.</p>
                                    <div id="certificate-codes-container">
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

                            <!-- Certificate File Name Card -->
                            <div class="card mt-4">
                                <div class="card-header">
                                    <h5 class="card-title mb-0">Certificate File Name</h5>
                                </div>
                                <div class="card-body pt-0">
                                    <p class="text-muted small mb-3 mt-3">Build the file name for generated certificate PDFs from the tags below. A <code>-</code> separator between tags and the <code>.pdf</code> extension are added automatically; each tag can be used once.</p>
                                    <div id="certificate-filename-container">
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

                            <!-- Task Cancellation Reasons Card -->
                            <div class="card mt-4">
                                <div class="card-header">
                                    <h5 class="card-title mb-0">Task Cancellation Reasons</h5>
                                </div>
                                <div class="card-body pt-0">
                                    <div id="task-cancel-reasons-container">
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
        </div>
        <!-- container-fluid -->
    </div>
</div>
<input type="hidden" id="client_id" value="<?= $client_id ?>" />
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/clients/communication-settings.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/clients/certificate-codes.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/clients/certificate-filename.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/clients/task-cancel-reasons.js') ?>"></script>
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
    $('.client-sub-nav').find('a[data-tab="settings"]').addClass('active');
</script>
