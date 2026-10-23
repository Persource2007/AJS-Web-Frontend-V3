<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<style>
    .img-preview{
        cursor:pointer;
        width: 100%;
        max-width: 50px;
    }
    /*
        .img-preview:active {
            transform: scale(10);  Zoom in
        }
    */
</style>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid"> 
            <?php include_once APPPATH . 'views/commons/breadcrumb.php'; ?> 
            <div class="row">
                <div class="col-lg-12">
                    <div>
                        <?php
                            $bc_title = 'AJS/Generic Temp.';
                            include_once APPPATH . 'views/system/inc/secondary-nav.php';
                        ?>  
                        <div class="same-page-height dataTables-height selling-tab"  role="tabpanel">
                            <div class="card">
                                <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3 job-setting-btn">
                                    <form  enctype="multipart/form-data" autocomplete="off" id="appointmentHeaderForm" action="<?= app_url('system/appointment_header_footer'); ?>" method="POST">
                                        <div class="row align-items-center">
                                            <div class="col-xxl-8 col-md-8">
                                                <h5 class="mb-0">Default Header / Footer</h5>
                                            </div>
                                        </div>
                                        <hr class="mt-2">
                                        <div class="row">
                                            <div class="col-xxl-3 col-md-3">
                                                <div>
                                                    <label for="set-job-types" class="form-label">Mail Header Image <small class="text-danger"> *max height 200px, min width 700px</small></label>
                                                    <div class="input-group">
                                                        <img data-bs-toggle="modal" data-bs-target="#imagePreviewModal" class="img-responsive mail-header-preview img-preview"  src=""  />
                                                        <input  data-acl="public-read" data-preview-class="mail-header-preview" data-max-height="200" data-upload-type="system" data-filename-input="mail_header_name" type="file" accept="image/*" name="mail_header_image" class="form-control profile-img-file-input" id="mail_header_image" aria-describedby="inputGroupFileAddon03" aria-label="Upload">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-3 col-md-3">
                                                <div>
                                                    <label for="set-job-types" class="form-label">Mail Footer Image <small class="text-danger"> *max height 100px, min width 700px</small></label>
                                                    <div class="input-group">
                                                        <img data-bs-toggle="modal" data-bs-target="#imagePreviewModal" class="img-responsive mail-footer-preview img-preview"  src=""  />
                                                        <input data-acl="public-read" data-preview-class="mail-footer-preview" data-max-height="100" data-upload-type="system" data-filename-input="mail_footer_name" type="file" accept="image/*" name="mail_footer_image" id="mail_footer_image " class="form-control profile-img-file-input" aria-describedby="inputGroupFileAddon03" aria-label="Upload">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-3 col-md-3">
                                                <div>
                                                    <label for="letter_header_image" class="form-label">Letter Header Image <small class="text-danger"> *max height 200px, min width 700px</small></label>
                                                    <div class="input-group">
                                                        <img data-bs-toggle="modal" data-bs-target="#imagePreviewModal" class="img-responsive letter-header-preview img-preview"  src=""  />
                                                        <input data-acl="public-read" data-preview-class="letter-header-preview" data-max-height="200" data-upload-type="system" data-filename-input="letter_header_name" type="file" accept="image/*" name="letter_header_image" id="letter_header_image"  class="form-control profile-img-file-input" aria-describedby="inputGroupFileAddon03" aria-label="Upload">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-3 col-md-3">
                                                <div>
                                                    <label for="set-job-types" class="form-label">Letter Footer Image <small class="text-danger"> *max height 200px, min width 700px</small></label>
                                                    <div class="input-group">
                                                        <img data-bs-toggle="modal" data-bs-target="#imagePreviewModal" class="img-responsive letter-footer-preview img-preview"  src=""  />
                                                        <input data-acl="public-read" data-preview-class="letter-footer-preview" data-max-height="200" data-upload-type="system" data-filename-input="letter_footer_name" type="file" accept="image/*" class="form-control profile-img-file-input" name="letter_footer_image" id="letter_footer_image" aria-describedby="inputGroupFileAddon03" aria-label="Upload">
                                                    </div>
                                                    <input type="hidden" name="mail_header_name" id="mail_header_name" />
                                                    <input type="hidden" name="mail_footer_name" id="mail_footer_name" />
                                                    <input type="hidden" name="letter_header_name" id="letter_header_name" />
                                                    <input type="hidden" name="letter_footer_name" id="letter_footer_name" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xxl-12 col-sm-12 text-end mt-3">
                                            <button type="submit" id="add-btn" class="btn btn-success btn-lg add-btn" style="margin-right: 8px;">Save</button>
                                        </div>
                                    </form>
                                    <hr class="mt-2">
                                    <?php  require_once APPPATH . 'views/system/appointments/inc/filters.php'; ?>
                                </div>  
                                <div class="card-body pt-0 all-tbl-same-width1 appoinment-setting-btn" style="padding-top: 10px !important;">                                   
                                    <table class="table align-middle table-nowrap mb-0 display job-listing-table table-hover task-pending-main" id="appointment-datatables">
                                        <thead class="table-light text-muted">
                                            <tr>
                                                <th></th>
                                                <th>ID</th>
                                                <th>Title</th>
                                                <th>Draft</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div> 
                            </div> 
                        </div> 
                    </div> 
                </div> 
            </div> 
        </div> 
    </div> 
 
<!-- <script src="https://cdn.ckeditor.com/ckeditor5/43.1.0/ckeditor5.umd.js"></script> -->

<script type="text/javascript" src="<?= cdn_url('assets/js/ckeditor5.umd.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/app/ckeditor.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/systems/appointment.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
<!-- End Page-content -->
<script type="text/javascript">
    $('.client-sub-nav').find('a[data-tab="client-appointments"]').addClass('active');
</script>
<style>
    .dataTables-height .dataTables_scroll {
        height: calc(100vh - 490px);
        min-height: 160px;
    }
</style>