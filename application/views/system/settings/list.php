<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content dataTables-height-detiles">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
                include_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->

            <div class="same-page-height dataTables-height">
                <div>
                        <?php
                        $bc_title = 'Settings';
                        include_once APPPATH . 'views/system/inc/secondary-nav.php';
                        ?>
                        <ul class="nav nav-tabs nav-tabs-custom mb-3" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" data-bs-toggle="tab" href="#settings-tab" role="tab">
                                    <span class="d-block d-sm-none"><i class="mdi mdi-cog"></i></span>
                                    <span class="d-none d-sm-block">Settings</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-bs-toggle="tab" href="#letter-print-tab" role="tab">
                                    <span class="d-block d-sm-none"><i class="mdi mdi-email"></i></span>
                                    <span class="d-none d-sm-block">Letter Print Settings</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-bs-toggle="tab" href="#sftp-tab" role="tab">
                                    <span class="d-block d-sm-none"><i class="mdi mdi-server-network"></i></span>
                                    <span class="d-none d-sm-block">SFTP Settings</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-bs-toggle="tab" href="#open-ai-tab" role="tab">
                                    <span class="d-block d-sm-none"><i class="mdi mdi-server-network"></i></span>
                                    <span class="d-none d-sm-block">Open AI Settings</span>
                                </a>
                            </li>
                        </ul>
                        <!-- Tab panes -->
                        <div class="tab-content text-muted">
                            <div class="tab-pane active" id="settings-tab" role="tabpanel">
                                <div class="card">
                                    <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3 job-setting-btn">
                                            <?php
                                            require_once APPPATH . 'views/system/settings/inc/filters.php';
                                            ?>
                                        </div>
                                    <div class="card-body settings-setting-btn">
                                        
                                        <!--end row-->
                                        <table class="table align-middle table-nowrap mb-0  mt-4 table-hover" id="settings-datatables" style="margin-top: 0px !important;">
                                            <thead class="table-light text-muted">
                                                <tr>
                                                    <th></th>
                                                    <th>ID</th>
                                                    <th>Key</th>
                                                    <th>Value</th>
                                                    <th>Type</th>
                                                    <th>Description</th>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                    <!--end card-body-->
                                </div>
                                <!--end card-->

                                <!-- Certificate File Name (global default) -->
                                <div class="card mt-4">
                                    <div class="card-header">
                                        <h5 class="card-title mb-0">Certificate File Name</h5>
                                    </div>
                                    <div class="card-body">
                                        <p class="text-muted small mb-3">Global default file name for generated certificate PDFs, used when a client has not set their own. A <code>-</code> separator between tags and the <code>.pdf</code> extension are added automatically; each tag can be used once.</p>
                                        <div id="system-certificate-filename-container">
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

                            <!-- LETTER PRINT TAB (SEPARATE FILE) -->
                            <div class="tab-pane" id="letter-print-tab" role="tabpanel">
                                <?php
                                    // This file will use $letter_print, $papers, $envelopes, $packmodes, $document_formats
                                    $this->load->view('system/settings/letter_print');
                                ?>
                            </div>
                            <!--end Letter Print tab-->

                            <!-- SFTP SETTINGS TAB (SEPARATE FILE) -->
                            <div class="tab-pane" id="sftp-tab" role="tabpanel">
                                <?php
                                    $this->load->view('system/settings/sftp_settings');
                                ?>
                            </div>
                            <!--end SFTP Settings tab-->

                            <!-- SFTP SETTINGS TAB (SEPARATE FILE) -->
                            <div class="tab-pane" id="open-ai-tab" role="tabpanel">
                                <?php
                                    $this->load->view('system/settings/open_ai_settings');
                                ?>
                            </div>
                            <!--end SFTP Settings tab-->

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
<!-- End Page-content -->
<!-- End Page-content -->
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/systems/settings.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/systems/certificate-filename.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
