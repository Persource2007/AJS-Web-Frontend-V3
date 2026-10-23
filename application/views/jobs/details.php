<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.min.css" />
<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->
            <div class="row">
                <div class="col-xxl-3 col-md-4">
                    <div class="card jobs-details-main-box">
                        <div class="card-header pb-0">
                            <h5>Job Details: <span id="detail_code" class="job-code">0000</span></h5>
                            <div class="sub-nav-tabs">
                                <ul class="nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1 property-sub-nav" role="tablist">
                                    <li class="nav-item waves-effect waves-light">
                                        <a class="nav-link active" data-bs-toggle="tab" href="#home-1" role="tab">Overview</a>
                                    </li>
                                    <li class="nav-item waves-effect waves-light">
                                        <a class="nav-link" data-bs-toggle="tab" href="#profile-1" role="tab">Other Details</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="tab-content text-muted">
                                <div class="tab-pane active" id="home-1" role="tabpanel">
                                    <div class="table-responsive table-card job-details-tbl">
                                        <table class="table mb-0">
                                            <tbody class="td-width-fixed">
                                                <!-- <tr>
                                                    <td width="40%"><b>Job ID</b></td>
                                                    <td class="detail-data"><span id="detail_code" class="job-code">0000</span></td>
                                                </tr>-->
                                                <tr>
                                                    <td><b>Status</b></td>
                                                    <td id="detail_status"><span class="badge border bg-white text-capitalize border-indigo text-indigo">Open</span></td>
                                                </tr>
                                                <tr>
                                                    <td><b>Fin. Status</b></td>
                                                    <td><span id="financial_status"><span class="badge border bg-white text-capitalize border-gray text-gray">WIP</span> </span> <span id="fin-action" class="check-permission" data-module="Jobs" data-action="edit"></span></td>
                                                </tr>
                                                <tr id="hav_claim_row" style="display:none;">
                                                    <td><b>Post-Inspection</b></td>
                                                    <td>
                                                        <span id="hav_claim_status_badge"></span>
                                                        <button type="button" id="request_post_inspection_btn" class="btn btn-sm btn-warning ms-1 check-permission" data-module="Jobs" data-action="edit" data-job-id="" style="display:none;">
                                                            <i class="ri-refresh-line align-bottom me-1"></i>Request Post-Inspection
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><b>Contract No.</b></td>
                                                    <td class="detail-data"><span id="contract_number">-</span>
                                                        <input type="hidden" name="contract_id" id="contract_id" />
                                                        <input type="hidden" name="service_id" id="service_id" />
                                                    </td>

                                                </tr>
                                                <tr>
                                                    <td><b>Client Work Order #</b></td>
                                                    <td class="detail-data"><span id="client_work_order">-</span></td>
                                                </tr>
                                                <tr>
                                                    <td><b>Job</b></td>
                                                    <td class="detail-data"><span id="type" class="text-capitalize">-</span></td>
                                                </tr>
                                                <tr>
                                                    <td><b>Job Type</b></td>
                                                    <td class="detail-data"><span id="job_type_name" class="text-capitalize">-</span></td>
                                                </tr>
                                                <tr>
                                                    <td><b>Client Name</b></td>
                                                    <td class="detail-data"><span id="client_name">-</span></td>
                                                </tr>
                                                <tr>
                                                    <td><b>Property</b></td>
                                                    <td class="detail-data"><span id="property_name">-</span></td>
                                                </tr>
                                                <tr>
                                                    <td><b>Address</b></td>
                                                    <td class="detail-data"><span id="property_addr">-</span></td>
                                                </tr>
                                                <tr>
                                                    <td><b>Booking Details</b></td>
                                                    <td class="detail-data"><span id="job_booking_details">-</span></td>
                                                </tr>
                                                <tr>
                                                    <td><b>Resident Contact</b></td>
                                                    <td class="detail-data"><span id="resident_contact">-</span></td>
                                                </tr>

                                                <tr>
                                                    <td><b>Priority</b></td>
                                                    <td id="priority"><span class="badge bg-danger">High</span></td>
                                                </tr>

                                                <tr>
                                                    <td><b>Created</b></td>
                                                    <td class="detail-data"><span id="created_date"></span></td>
                                                </tr>
                                                <tr>
                                                    <td><b>Target Date Time</b></td>
                                                    <td class="detail-data"><span id="detail_target_date_time"></span></td>
                                                </tr>
                                            </tbody>
                                        </table> 
                                    </div>                                        
                                    <div class="row gy-2 mb-2 mt-3">
                                        <div class="col-xxl-12 col-md-12"> 
                                            <div class="table-box-con">
                                                <table class="table m-0">
                                                    <thead>
                                                        <tr>
                                                            <th class="table-col-width-60"><strong>Type</strong></th>
                                                            <th class="table-col-width-40 text-end"><strong>Value</strong></th>
                                                        </tr>
                                                        <tr>
                                                            <td>Material</td>
                                                            <td class="text-end"><i class="bx bx-pound" style="letter-spacing:-2px;"></i><span id="total_materials" data-type="price"></span></td>
                                                        </tr>
                                                            <tr>
                                                            <td>Labour</td>
                                                            <td class="text-end"><i class="bx bx-pound" style="letter-spacing:-2px;"></i><span id="total_labors" data-type="price"></span></td>
                                                        </tr>
                                                            <tr>
                                                            <td>Frmwk Commi</td>
                                                            <td class="text-end"><span><span id="framework_commission_pct"></span>%</span></td>
                                                        </tr>
                                                            <tr>
                                                            <td>Frmwk Commi</td>
                                                            <td class="text-end"><i class="bx bx-pound" style="letter-spacing:-2px;"></i><span id="framework_commission" data-type="price"></span></td>
                                                        </tr>
                                                            <tr>
                                                            <td>Sell</td>
                                                            <td class="text-end"><i class="bx bx-pound" style="letter-spacing:-2px;"></i><span id="total_sells" data-type="price"></span></td>
                                                        </tr>
                                                            <tr>
                                                            <td>Margin</td>
                                                            <td class="text-end"><span><span id="margins"></span>%</span></td>
                                                        </tr>
                                                    </thead> 
                                                </table>
                                            </div>  
                                            <?php /*                                         
                                            <div class="table-responsive">                                            
                                                <table class="table table-bordered table-sm mt-3">
                                                    <thead class="table-light">
                                                        <tr>
                                                        <th>Material</th>
                                                        <th>Labour</th>
                                                        <th>Framework Commi (%)</th>
                                                        <th>Framework Commi</th>
                                                        <th>Sell</th>
                                                        
                                                        <th>Margin</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                        <td><i class="bx bx-pound" style="letter-spacing:-2px;"></i><span id="total_materials" data-type="price"></span></td>
                                                        <td><i class="bx bx-pound" style="letter-spacing:-2px;"></i><span id="total_labors" data-type="price"></span></td>
                                                        <td><span style="color:orange"><span id="framework_commission_pct"></span>%</span></td>
                                                        <td><i class="bx bx-pound" style="letter-spacing:-2px;"></i><span id="framework_commission" data-type="price"></span></td>
                                                        <td><i class="bx bx-pound" style="letter-spacing:-2px;"></i><span id="total_sells" data-type="price"></span></td>
                                                        <td><span style="color:green"><span id="margins"></span>%</span></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            */?>
                                        </div>
                                        <div class="col-xxl-6 col-md-6 text-end task-detail-actions mt-1"></div>
                                    </div>
                                </div>

                                <div class="tab-pane" id="profile-1" role="tabpanel">
                                    <div class="table-responsive table-card job-details-tbl">
                                        <table class="table mb-0">
                                            <tbody>
                                                <tr>
                                                    <td width="40%"><b>Reference Job</b></td>
                                                    <td class="detail-data"><span class="reference-job">-</span></td>
                                                </tr>
                                                <tr>
                                                    <td width="40%"><b>PPM Batch</b></td>
                                                    <td class="detail-data"><span class="ppm-batch-code">-</span></td>
                                                </tr>
                                                <tr>
                                                    <td width="40%"><b>PPM Schedule</b></td>
                                                    <td class="detail-data"><span class="ppm-add-date">-</span></td>
                                                </tr>
                                                <tr>
                                                    <td><b>Tags</b></td>
                                                    <td class="detail-data"><span id="detail_tags">-</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <!--end table-->
                                    </div>

                                </div>
                            </div>
                        </div>
                        <!--end card-->
                    </div>
                    <div style="display: none" class="card">
                        <div class="card-header align-items-center d-flex">
                            <h4 class="card-title mb-0 flex-grow-1">Assigned To</h4>
                        </div><!-- end card header -->
                        <div class="card-body p-0">
                            <div data-simplebar style="max-height: 280px;">
                                <div class="p-3" id="assigned-users">
                                </div>
                            </div>
                        </div><!-- end cardbody -->
                    </div>
                    <!--  <div class="card">
                        <div class="card-header align-items-center d-flex">
                            <h4 class="card-title mb-0 flex-grow-1">JOB TAGS</h4>
                        </div>
                        <div class="card-body">
                            <div class="live-preview">
                                <div class="d-flex flex-wrap gap-2">
                                    <span class="badge bg-dark">Electric Work</span>
                                    <span class="badge bg-dark">Need Helper</span>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <!--end card-->
                </div>
                <div class="col-xxl-9 col-md-8">
                    <div class="card job-details-card-top-box">
                        <div class="card-body">
                            <div class="row mb-3">
                                <div class="col-xxl-12">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div style="flex: 1; margin-right: 20px;">
                                            <div id="job-progress-container"  class="d-flex align-items-center w-75" style="gap: 8px; display: none !important;">
                                                <div style="flex: 1;">
                                                    <div class="progress" style="height: 20px;">
                                                        <div id="job-progress-bar" class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                                                            <span id="job-progress-text">0%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <small id="job-progress-count" class="text-muted" style="white-space: nowrap;">0/0</small>
                                            </div>
                                        </div>
                                        <div class="text-end">
                                            <button id="callBtn" data-mobile_num="" data-telephone_num="" data-job_id="<?= $id ?>" class="btn btn-primary check-permission" data-module="Jobs" data-action="view"><i class="ri-phone-fill align-bottom me-1" aria-hidden="true"></i>Call Now</button>
                                            <a href="<?= base_url('job/summary/' . $id) ?>" id="job_summary_btn" target="_blank" class="btn btn-info ms-1 check-permission" data-module="Jobs" data-action="view">
                                                <i class="ri-file-list-3-line align-bottom me-1" aria-hidden="true"></i>Summary
                                            </a>
                                            <!-- LBH job-completion review link — shown by JS only for completed LBH jobs -->
                                            <button type="button" id="lbh_review_btn" class="btn btn-warning ms-1 check-permission" data-module="Jobs" data-action="view" data-review-url="" style="display:none;">
                                                <i class="ri-checkbox-circle-line align-bottom me-1" aria-hidden="true"></i>LBH Review Link
                                            </button>
                                            <span class="btn-select-box check-permission" data-module="Jobs" data-action="edit">
                                                <select class="form-control text-start" name="status_id" id="update_job_status" >
                                                    <option value="" selected>Select</option>
                                                </select>
                                            </span>
                                            <!-- <button  class="btn btn-primary update-job-notes check-permission hide" data-module="Jobs" data-action="edit" >
                                                <i class="ri-add-line align-bottom me-1" aria-hidden="true"></i>Add Notes
                                            </button> -->
                                            <button  id="send_email_sms" class="btn btn-success popup-form-button ms-1 check-permission" data-module="Jobs" data-action="edit" data-after-load-func="send_email_sms" data-form-url="<?= base_url('job/send-email-sms/' . $id) ?>" data-heading="Send Email/SMS" >
                                                <i class="ri-add-line align-bottom me-1" aria-hidden="true"></i>Send Email/SMS
                                            </button>
                                            <a href="<?= base_url('job/list') ?>" id="edit_job_detail" class="btn btn-success popup-form-button ms-1 check-permission" data-module="Jobs" data-action="edit" data-after-load-func="edit_job_form" data-form-url="" data-heading="" >
                                                <i class="ri-pencil-fill align-bottom me-1" aria-hidden="true"></i>Edit Job
                                            </a>
                                            <a href="javascript:void(0);"  data-job_id="<?= $id ?>" data-job_code=""  class="btn btn-success ms-1 check-permission copy_job_btn" data-module="Jobs" data-action="add" >
                                                <i class="ri-file-copy-fill align-bottom me-1" aria-hidden="true"></i>Follow On Job
                                            </a>
                                            <button type="button" class="btn btn-info ms-1" id="job-back-btn">
                                                <i class="ri-arrow-left-line fs-14 me-1"></i>Back
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--<p class="text-muted mb-2" id="title"> N/A</p>-->

                            <h5 class="mb-3">Description</h5>
                            <div class="job-description-fixed">
                                <p class="text-muted mb-2  job-description" > -</p>
                            </div>
                            <div class="mt-4">
                                <h5 class="mb-3">Tasks
                                    <button type="button" class="btn btn-success float-end ms-auto popup-form-button-task add-btn create-task-btn check-permission" data-module="Jobs" data-action="add" data-job-id="<?= $id ?>" data-heading="Add Task" data-after-load-func="get_job_details_for_task"  data-form-url="<?= base_url('job/create-task') ?>">
                                        <i class="ri-add-line align-bottom me-1"></i>Add Task
                                    </button>
                                </h5>
                            </div>
                            <div class="clearfix"></div>

                            <div class="table-responsive table-card mt-3 tasks-tbl">
                                    <div class="">
                                            <!-- <table role="grid" class="table align-middle table-nowrap mb-0 w-100 hover job-tasks-tbl">
                                                    <thead class="table-light text-muted">
                                            <tr>
                                                <th>Sr.</th>
                                                <th>SOR</th>
                                                <th>Title</th>
                                                <th>Fix Time</th>
                                                <th>Target Time</th>
                                                <th>Assets</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody class="list" id="services">
                                            <tr>
                                                <td colspan="7" align="center">Data not available</td>
                                            </tr>
                                        </tbody>
                                    </table>-->
                                    <div class="col-xxl-12 col-md-12 mb-5- job-task-div job-task-details-tbl">

                                    </div>
                                    <table style="display: none" class="table job-tasks-tbl align-middle table-nowrap mb-0" id="tasksTable">
                                        <thead class="table-light text-muted">
                                            <tr>
                                                <th>Task#</th>
                                                <th>Action</th>
                                                <th>Assigned To</th>
                                                <th>Summary</th>
                                                <th>Status</th>
                                                <th>Created On</th>
                                                <th>Action Taken On</th>
                                            </tr>
                                        </thead>
                                        <tbody class="form-check-all">
                                            <tr class="main-button">
                                                <td>#JOB001/1</td>
                                                <td>Communication</td>
                                                <td>Admin</td>
                                                <td>Appointment Letter 1</td>
                                                <td><span class="badge bg-success">Completed</span></td>
                                                <td>2024-05-30 15:10</td>
                                                <td>2024-05-30 15:10
                                                    <div style="background-color: #eee" class="hide">
                                                        <!--<h5 class="fs-16">SOR: 898121</h5>-->
                                                        <b>Appointment Letter</b>
                                                        <p class="text-wrap">Appointment Letter sent to Client</p>
                                                        <hr>
                                                        <div class="row">
                                                            <div class="col-xxl-6">
                                                                <table class="table tbl-sub-details mb-0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td><b>Created By</b></td>
                                                                            <td>Administrator 05/01/2024 | 10:46 | PDA</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td><b>Est. Operative Payment</b></td>
                                                                            <td>1.00</td>
                                                                        </tr>
                                                                         <!-- <tr>
                                                                            <td><b>Stock Attribute</b></td>
                                                                            <td>MOS_16</td>
                                                                        </tr>-->
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div class="col-xxl-6">
                                                                <table class="table tbl-sub-details mb-0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td><b>Last Updated</b></td>
                                                                            <td>Administrator 05/01/2024 | 10:46</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td><b>Est. Sub. Con. Payment</b></td>
                                                                            <td>0.00</td>
                                                                        </tr>
                                                                        <!-- <tr>
                                                                            <td><b>Certificate Issued</b></td>
                                                                            <td>Yes</td>
                                                                        </tr>-->
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                      <!--  <p class="pt-3"><b>Associated Event Detail</b></p>
                                                        <hr>
                                                        <table class="table tbl-sub-details align-middle table-nowrap mb-0 w-100">
                                                            <tbody>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>First Visit</td>
                                                                    <td>Mushtaq</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>2</td>
                                                                    <td>First Visit</td>
                                                                    <td>Mushtaq</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>-->
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr class="main-button">
                                                <td>#JOB001/2</td>
                                                <td>Communication</td>
                                                <td>Admin</td>
                                                <td>Appointment Letter 2</td>
                                                <td><span class="badge bg-success">Completed</span></td>
                                                <td>2024-05-30 15:10</td>
                                                <td>2024-05-30 15:10</td>
                                            </tr>
                                            <tr class="main-button">
                                                <td>#JOB001/3</td>
                                                <td>First Visit</td>
                                                <td>Nishant</td>
                                                <td>Check Faulty Fire Alarm</td>
                                                <td><span class="badge bg-success">Completed</span></td>
                                                <td>2024-05-30 15:10</td>
                                                <td>2024-05-30 15:10</td>
                                            </tr>
                                            <tr class="main-button">
                                                <td>#JOB001/4</td>
                                                <td>Certification</td>
                                                <td>Nishant</td>
                                                <td>Cert Issue</td>
                                                <td><span class="badge bg-success">Completed</span></td>
                                                <td>2024-05-30 15:10</td>
                                                <td>2024-05-30 15:10</td>
                                            </tr>
                                            <tr class="main-button">
                                                <td>#JOB001/5</td>
                                                <td>Certification</td>
                                                <td>Admin</td>
                                                <td>Cert Approved</td>
                                                <td><span class="badge bg-warning">Pending</span></td>
                                                <td>2024-05-30 15:10</td>
                                                <td>2024-05-30 15:10</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card job-details-card-bottom-box">
                        <div class="card-header pb-0" style="border-bottom: none;">
                            <div>
                                <ul class="client-sub-nav nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1 pt-0" role="tablist">
                                    <li class="nav-item"><a class="nav-link active fs-14" data-bs-toggle="tab" href="#sors" role="tab">SORs</a></li>
                                    <li class="nav-item"><a class="nav-link fs-14" data-bs-toggle="tab" href="#certificate" role="tab">Certificates</a></li>
                                    <li class="nav-item"><a class="nav-link fs-14" data-bs-toggle="tab" href="#media" role="tab">Media</a></li>
                                    <li class="nav-item"><a class="nav-link  fs-14" data-bs-toggle="tab" href="#events" role="tab">Log</a></li>
                                    <li class="nav-item"><a class="nav-link fs-14" data-bs-toggle="tab" href="#financial" role="tab">Financial</a></li>
                                </ul>
                                <!--end nav-->
                            </div>
                        </div>
                        <div class="card-body pt-1">
                            <div class="tab-content">

                                <div class="tab-pane active" id="sors" role="tabpanel">
                                    <div class="table-responsive job-sors-div table-card mt-1 tasks-tbl">

                                    </div>
                                </div>
                                <!--end tab-pane-->
                                <div class="tab-pane" id="certificate" role="tabpanel">
                                    <div class="mt-1 job-certificate-div"></div>
                                </div>
                                <!--end tab-pane-->
                                <div class="tab-pane" id="media" role="tabpanel">
                                    <div class="table-responsive job-media-div table-card mt-1 tasks-tbl">

                                    </div>
                                </div>
                                <!--edn tab-pane-->

                                <div class="tab-pane" id="financial" role="tabpanel">
                                    <div class="table-responsive financial-sors-div table-card mt-1 tasks-tbl"></div>
                                </div>
                                <div class="tab-pane " id="events" role="tabpanel">
                                    <div class="table-responsive job-event-div table-card mt-1 tasks-tbl">

                                    </div>
                                </div>
                            </div>
                            <!--end tab-content-->
                        </div>
                    </div>
                </div>
                <!--end row-->
            </div>
        </div>
        <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
</div>
<input type="hidden" id="job_id" value="<?= $id ?? null; ?>">
<input type="hidden" id="client_id_hidden" value="">
<input type="hidden" name="job_skills_hidden" id="job_skills_hidden" value="" />
<input type="hidden" name="job_skills_names_hidden" id="job_skills_names_hidden" value="" />
<input type="hidden" id="is_detail_page" value="1">
<!-- End Page-content -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.full.min.js"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/jobs/job.js?v=1.5') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/jobs/task-details.js?v=1.1') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/ckeditor5.umd.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/app/ckeditor.js') ?>"></script>
<script src="<?= cnd_url(); ?>assets/libs/dropzone/dropzone-min.js"></script>
<script>
    // toggle-able row
    $('.job-tasks-tbl tbody tr').not('.hidden-row').on('click', function () { // table row is clicked
        var hiddenRow = $(this).next(".hidden-row"); // variable that finds the hidden content for clicked row
        $(this).toggleClass('main-button--blue');
        var rowExists = $(hiddenRow).length; // variable that figures out if the collapsible row already exists or not
        if (rowExists) { // if collapsible row exists already
            $('.job-tasks-tbl tbody .hidden-row').not(hiddenRow).hide(); // hide all open toggle-able rows
            $(hiddenRow).toggle(); // toggle the row on and off
        } else { // if collapsible row doesn't exist
            var expRowContent = $(this).find('.hide').html(); // grab this row's hidden content and store in a variable
            var newExpRow = '<tr class="hidden-row" style="display:none;background-color:#eee"><td colspan="10">' + expRowContent + '</td></tr>'; // wrap hidden content in a table row
            $(newExpRow).insertAfter(this); // insert the collapsible table row after the clicked row
            $('.job-tasks-tbl tbody .hidden-row').not(hiddenRow).hide(); // hide all open toggle-able rows
            $(this).next('.hidden-row').toggle();  // toggle the row on and off
        }
    });
</script>

<style>
    .modal .modal-content{
        min-height: 100%;
        max-height: 100%;
    }
</style>