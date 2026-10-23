<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
                require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->
            <div class="row">
                <div class="col-xxl-3">
                    <div class="card">
                        <div class="card-header">
                            <h5>Job Details</h5>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive table-card">
                                <table class="table mb-0">
                                    <tbody>
                                        <tr>
                                            <td class="fw-medium">Job ID</td>
                                            <td class="job-code" id="code">#0000</td>
                                        </tr>
                                        <tr>
                                            <td class="fw-medium">Status</td>
                                            <td id="detail_status"><span class="badge bg-info">Open</span></td>
                                        </tr>
                                        <tr>
                                            <td class="fw-medium">Contract No.</td>
                                            <td id="contract_number">-</td>
                                        </tr>
                                        <tr>
                                            <td class="fw-medium">Client Work Order #</td>
                                            <td id="client_work_order">-</td>
                                        </tr>
                                        <tr>
                                            <td class="fw-medium">Job Type</td>
                                            <td id="type" class="text-capitalize">-</td>
                                        </tr>
                                        <tr>
                                            <td class="fw-medium">Job</td>
                                            <td id="job_type_name" class="text-capitalize">-</td>
                                        </tr>
                                        <tr>
                                            <td class="fw-medium">Client Name</td>
                                            <td id="client_name">-</td>
                                        </tr>
                                        <tr>
                                            <td class="fw-medium">Property</td>
                                            <td id="property_name">-</td>
                                        </tr>
                                        <tr>
                                            <td class="fw-medium">Address</td>
                                            <td id="property_addr"> - </td>
                                        </tr>
                                        <tr>
                                            <td class="fw-medium">Booking Details</td>
                                            <td id="job_booking_details"> -</td>
                                        </tr>
                                        <tr>
                                            <td class="fw-medium">Resident Contact</td>
                                            <td id="resident_contact"> -</td>
                                        </tr>
                                        <tr>
                                            <td class="fw-medium">Priority</td>
                                            <td id="priority"><span class="badge bg-danger">High</span></td>
                                        </tr>
                                        
                                        <tr>
                                            <td class="fw-medium">Created</td>
                                            <td id="created_date"></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <!--end table-->
                            </div>
                        </div>
                    </div>
                    <!--end card-->

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

                <div class="col-xxl-9">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-xxl-6">
                                    <h5 class="mb-3 job-code">#CN-JOB400013 </h5>
                                </div>
                                <div class="col-xxl-6 text-end">
                                    <a href="<?= base_url('job/list') ?>" >
                                        <button type="button" class="btn btn-info">
                                            <i class="fa fa-arrow-left" aria-hidden="true"></i> Back
                                        </button>
                                    </a>
                                </div>
                            </div>                            
                            <!--<p class="text-muted mb-2" id="title"> N/A</p>-->

                            <h5 class="mb-3">Description</h5>
                            <p class="text-muted mb-2  job-description" > -</p>

                            <div class="mt-4">
                                <h5 class="mb-3">Tasks
                                    <button type="button" class="btn btn-success float-end ms-auto popup-form-button-task add-btn" data-job-id="<?= $id ?>" data-heading="Add Task" data-after-load-func="get_job_details_for_task"  data-form-url="<?= base_url('job/create-task') ?>">
                                        <i class="ri-add-line align-bottom me-1"></i> Add
                                    </button>
                                </h5>
                            </div>
                            <div class="clearfix"></div>

                            <div class="table-responsive table-card mt-3 ">
                                <div class="">
<!--                                    <table role="grid" class="table align-middle table-nowrap mb-0 w-100 hover job-tasks-tbl">
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
                                    <div class="col-xxl-12 col-md-12 mb-5 job-task-div">

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
<!--                                                                        <tr>
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
<!--                                                                        <tr>
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

                    <div class="card">
                        <div class="card-header">
                            <div>
                                <ul class="nav nav-tabs-custom rounded card-header-tabs border-bottom-0" role="tablist">
                                    <li class="nav-item"><a class="nav-link active fs-14" data-bs-toggle="tab" href="#sors" role="tab">SORs</a></li>
                                    <li class="nav-item"><a class="nav-link fs-14" data-bs-toggle="tab" href="#certificate" role="tab">Certificates</a></li>
                                    <li class="nav-item"><a class="nav-link fs-14" data-bs-toggle="tab" href="#media" role="tab">Media</a></li>
                                    <li class="nav-item"><a class="nav-link fs-14" data-bs-toggle="tab" href="#events" role="tab">Events</a></li>
                                    <li class="nav-item"><a class="nav-link fs-14" data-bs-toggle="tab" href="#financial" role="tab">Financial</a></li>
                                </ul>
                                <!--end nav-->
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="tab-content">
                                <div class="tab-pane active" id="sors" role="tabpanel">
                                    <div class="table-responsive job-sors-div table-card mt-1">

                                    </div>
                                </div>
                                <!--end tab-pane-->
                                <div class="tab-pane" id="certificate" role="tabpanel">
                                    <div class="mt-1 job-certificate-div"></div>
                                </div>
                                <!--end tab-pane-->
                                <div class="tab-pane" id="media" role="tabpanel">
                                    <div class="table-responsive job-media-div table-card mt-1">

                                    </div>
                                </div>
                                <!--edn tab-pane-->
                                <div class="tab-pane" id="events" role="tabpanel">
                                    <div class="table-responsive job-event-div table-card mt-1">

                                    </div>
                                </div>
                                <div class="tab-pane" id="financial" role="tabpanel">
                                    <div class="mt-1"></div>
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
<input type="hidden" id="is_detail_page" value="1">
<!-- End Page-content -->
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/jobs/job.js?v=1.5') ?>"></script>
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
