<style>
    .img-preview{
        cursor:pointer;
        width: 100%;
        max-width: 50px;
    }
    /*    .img-preview:active {
            transform: scale(10);  Zoom in
        }*/
    
    /* Notification Templates Responsive Styles */
    #notification-templates-table .btn-group .btn {
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
    }

    /* Mobile card styles */
    #notification-templates-mobile .card {
        border: 1px solid #dee2e6;
    }
    
    #notification-templates-mobile .card-body {
        padding: 1rem;
    }
    
    /* Modal responsive styles */
    @media (max-width: 991.98px) {
        #notificationTemplateModal .modal-dialog {
            margin: 0.5rem;
        }
        
        #notificationTemplateModal .sticky-top {
            position: relative !important;
            top: 0 !important;
        }
        
        #variables-list {
            max-height: 300px !important;
        }
    }
    
    @media (min-width: 992px) {
        #variables-list {
            max-height: calc(100vh - 400px);
            min-height: 200px;
        }
    }
    
    /* Dynamic variables list - adjust based on content */
    #variables-card-body {
        display: flex;
        flex-direction: column;
    }
    
    #variables-list {
        flex: 1 1 auto;
        overflow-y: auto;
        overflow-x: hidden;
    }
    
    #variables-list::-webkit-scrollbar {
        width: 6px;
    }
    
    #variables-list::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 3px;
    }
    
    #variables-list::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 3px;
    }
    
    #variables-list::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
    
    .variable-btn {
        white-space: normal;
        word-break: break-word;
        text-align: left;
        padding: 0.5rem 0.75rem;
    }
    
    .variable-btn code {
        font-size: 0.85em;
        background: rgba(0, 0, 0, 0.05);
        padding: 0.15rem 0.3rem;
        border-radius: 0.2rem;
    }
</style>
<!-- Bootstrap Modal -->
<div class="modal fade" id="imagePreviewModal" tabindex="-1" aria-labelledby="imagePreviewModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body text-center">
                <img src="" id="modalImage" class="img-fluid">
            </div>
        </div>
    </div>
</div>
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

            <div class="same-page-height">
                <div>
                    <?php
                    require_once APPPATH . 'views/clients/inc/nav-tab.php';
                    ?>
                    <!-- Tab panes -->
                    <div class="tab-content text-muted">
                        <div class="tab-pane active selling-tab"  role="tabpanel">
                            <div class="card">
                                <div class="card-body">
                                    <form class="tablelist-form mt-1" enctype="multipart/form-data" autocomplete="off" id="appointmentForm" action="<?= app_url('client/' . $id . '/appointment'); ?>" method="post">
                                        <div class="row align-items-center">
                                            <div class="col-xxl-8 col-md-8">
                                                <h5 class="mb-0">Header / Footer</h5>
                                            </div>

                                        </div>
                                        <hr class="mt-2">
                                        <div class="row">
                                            <div class="col-xxl-3 col-md-3">
                                                <div>
                                                    <label for="set-job-types" class="form-label">Mail Header Image <small class="text-danger"> *max height 200px, min width 700px</small></label>
                                                    <div class="input-group">
                                                        <div class="file-img-input-full">
                                                            <div class="delete-logo mt-1 hide" style="width: auto;">
                                                                <i title="Delete" class="ri-delete-bin-line align-bottom me-2 text-danger delete-template-logo"  style="font-size: 20px !important; cursor: pointer;" data-image="mail_header" ></i>
                                                            </div>
                                                            <div class="file-img-input-img hide">
                                                                <img data-bs-toggle="modal" data-bs-target="#imagePreviewModal" class="img-responsive mail-header-preview img-preview"  src=""  />
                                                            </div>
                                                            <div class="file-img-input-input">
                                                                <input data-preview-class="mail-header-preview" data-acl="public-read" data-max-height="200" data-upload-type="clients" data-filename-input="mail_header_name" type="file" accept="image/*" name="mail_header_image" class="form-control profile-img-file-input" id="mail_header_image" aria-describedby="inputGroupFileAddon03" aria-label="Upload">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-3 col-md-3">
                                                <div>
                                                    <label for="set-job-types" class="form-label">Mail Footer Image <small class="text-danger"> *max height 100px, min width 700px</small></label>
                                                    <div class="input-group">
                                                        <div class="file-img-input-full">
                                                            <div class="delete-logo mt-1 hide" style="width: auto;">
                                                                <i title="Delete" class="ri-delete-bin-line align-bottom me-2 text-danger delete-template-logo"  style="font-size: 20px !important; cursor: pointer;" data-image="mail_footer" ></i>
                                                            </div>
                                                            <div class="file-img-input-img hide">
                                                                <img data-bs-toggle="modal" data-bs-target="#imagePreviewModal" class="img-responsive mail-footer-preview img-preview"  src=""  />
                                                            </div>
                                                            <div class="file-img-input-input">
                                                                <input data-preview-class="mail-footer-preview" data-acl="public-read" data-max-height="100" data-upload-type="clients" data-filename-input="mail_footer_name" type="file" accept="image/*" name="mail_footer_image" id="mail_footer_image" class="form-control profile-img-file-input" aria-describedby="inputGroupFileAddon03" aria-label="Upload">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-3 col-md-3">
                                                <div>
                                                    <label for="letter_header_image" class="form-label">Letter Header Image <small class="text-danger"> *max height 200px, min width 700px</small></label>
                                                    <div class="input-group">
                                                        <div class="file-img-input-full">
                                                            <div class="delete-logo mt-1 hide" style="width: auto;">
                                                                <i title="Delete" class="ri-delete-bin-line align-bottom me-2 text-danger delete-template-logo"  style="font-size: 20px !important; cursor: pointer;" data-image="letter_header" ></i>
                                                            </div>
                                                            <div class="file-img-input-img hide">
                                                                <img data-bs-toggle="modal" data-bs-target="#imagePreviewModal" class="img-responsive letter-header-preview img-preview"  src=""  />
                                                            </div>
                                                            <div class="file-img-input-input">
                                                                <input data-preview-class="letter-header-preview"  data-acl="public-read" data-max-height="200" data-upload-type="clients" data-filename-input="letter_header_name" type="file" accept="image/*" name="letter_header_image" id="letter_header_image"  class="form-control profile-img-file-input" aria-describedby="inputGroupFileAddon03" aria-label="Upload">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-3 col-md-3">
                                                <div>
                                                    <label for="set-job-types" class="form-label">Letter Footer Image <small class="text-danger"> *max height 200px, min width 700px</small></label>
                                                    <div class="input-group">
                                                        <div class="file-img-input-full">
                                                            <div class="delete-logo mt-1 hide" style="width: auto;">
                                                                <i title="Delete" class="ri-delete-bin-line align-bottom me-2 text-danger delete-template-logo"  style="font-size: 20px !important; cursor: pointer;" data-image="letter_footer" ></i>
                                                            </div>
                                                            <div class="file-img-input-img hide">
                                                                <img data-bs-toggle="modal" data-bs-target="#imagePreviewModal" class="img-responsive letter-footer-preview img-preview"  src=""  />
                                                            </div>
                                                            <div class="file-img-input-input">
                                                                <input data-preview-class="letter-footer-preview"  data-acl="public-read" data-max-height="200" data-upload-type="clients" data-filename-input="letter_footer_name" type="file" accept="image/*" class="form-control profile-img-file-input" name="letter_footer_image" id="letter_footer_image" aria-describedby="inputGroupFileAddon03" aria-label="Upload">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <input type="hidden" name="mail_header_name" id="mail_header_name" />
                                                    <input type="hidden" name="mail_footer_name" id="mail_footer_name" />
                                                    <input type="hidden" name="letter_header_name" id="letter_header_name" />
                                                    <input type="hidden" name="letter_footer_name" id="letter_footer_name" />
                                                </div>
                                            </div>
                                        </div>
                                        <hr class="mt-2">
                                        <div class="row align-items-center">
                                            <div class="col-xxl-8 col-md-8">
                                                <h5 class="mb-0">Communication Templates</h5>
                                            </div>
                                            <div class="col-xxl-4 col-md-4 text-end">
                                                <button type="button" class="add-appointment btn btn-success edit-btn"><i class="ri-add-line align-bottom me-1"></i> Add</button>
                                            </div>
                                        </div>
                                        <hr class="mt-2">
                                        <div class="accordion" id="appointment-section">
                                            <div class="accordion-item mb-2">
                                                <h2 class="accordion-header" >
                                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_0" aria-expanded="true" aria-controls="collapse_0">
                                                        Template #1
                                                    </button>
                                                </h2>
                                                <div id="collapse_0" class="accordion-collapse collapse "  data-bs-parent="#appointment-section">
                                                    <div class="accordion-body">
                                                        <div>
                                                            <div class="appointment-row row g-3 mb-0">
                                                                <input type="hidden" class="row-id" name="appointments[0][id]" value="0" />

                                                                <div class="col-xxl-3 col-md-3">
                                                                    <div class="row">
                                                                        <div class="col-xxl-6 col-md-6 mb-3">
                                                                            <div class="input-light">
                                                                                <label class="form-label">Type <span class="text-danger">*</span></label>
                                                                                <select class="form-control appointment-type" name="appointments[0][type]" required>
                                                                                    <option value="" selected>Select</option>
                                                                                    <option value="email">Email</option>
                                                                                    <option value="email-observation">Email - Observation</option>
                                                                                    <option value="letter">Letter</option>
                                                                                    <option value="phone">Phone</option>
                                                                                    <option value="sms">SMS</option>
                                                                                    <option value="survey_email">Survey - Email</option>
                                                                                    <option value="survey_sms">Survey - SMS</option>
                                                                                    <option value="eicr_email">EICR - Email</option>
                                                                                    <option value="invoice_submitted">Invoice Submitted - Email</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xxl-12 col-md-12 mb-3">
                                                                            <div class="input-light">
                                                                                <label class="form-label">Title <span class="text-danger">*</span></label>
                                                                                <input type="text" class="form-control appt-title" name="appointments[0][title]"  placeholder="Title" required/>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xxl-12 col-md-12 subject-div hide">
                                                                            <div class="input-light">
                                                                                <label class="form-label">Subject <span class="text-danger">*</span></label>
                                                                                <input type="text" class="form-control" name="appointments[0][subject]"  placeholder="Subject" required/>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <!--                                                                    <div class="col-xxl-2 col-md-2">
                                                                                                                                        <div class="input-light">
                                                                                                                                            <label class="form-label">Title</label>
                                                                                                                                            <input type="text" class="form-control" name="appointments[0][title]"  placeholder="Title" required/>
                                                                                                                                        </div>
                                                                                                                                    </div>-->
                                                                <!-- <div class="col-xxl-1 col-md-2">
                                                                    <div class="input-light">
                                                                        <label class="form-label">Lead Time</label>
                                                                        <input type="text" class="form-control number-only" name="appointments[0][lead_time]"  placeholder="In days" required/>
                                                                    </div>
                                                                </div> -->
                                                                <div class="col-xxl-8 col-md-8 pe-0 draft-box">
                                                                    <label class="form-label text-capitalize"> Draft <span class="text-danger">*</span></label>
                                                                    <textarea class="draft-field"  rows="10" name="appointments[0][draft]" id="draft_id_0" data-master-code="APPOINTMENT_FIELDS" ></textarea>
                                                                </div>
                                                                <div class="col-xxl-1 col-md-1 text-end draft-remove">
                                                                    <button type="button" class="preview-appointment btn btn-primary mt-4 hide"><i class="ri-eye-line align-bottom"></i></button>
                                                                    <button type="button" class="delete-appointment btn btn-danger mt-4"><i class="ri-close-line align-bottom"></i></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xxl-12 col-sm-12 text-end mt-4 ">
                                            <button type="submit" id="add-btn" class="btn btn-success btn-lg edit-btn" style="margin-right: 8px;">Save</button>
                                        </div>
                                    </form>
                                </div>
                                <!--end card-body-->
                            </div>
                            <!--end card-->
                            
                            <!-- Task Notification Templates Section -->
                            <div class="card mt-4">
                                <div class="card-body">
                                    <div class="row align-items-center">
                                        <div class="col-xxl-8 col-md-8">
                                            <h5 class="mb-0">Task Notification Templates</h5>
                                        </div>
                                    </div>
                                    <hr class="mt-2">
                                    <div class="table-responsive">
                                        <table class="table align-middle table-nowrap mb-0 table-hover d-none d-md-table" id="notification-templates-table">
                                            <thead class="table-light text-muted">
                                                <tr>
                                                    <th>Event Code</th>
                                                    <th>Channel</th>
                                                    <th>Template</th>
                                                    <th>Subject Template</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody id="notification-templates-tbody">
                                                <tr>
                                                    <td colspan="6" class="text-center">
                                                        <div class="spinner-border text-primary" role="status">
                                                            <span class="visually-hidden">Loading...</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <!-- Mobile-friendly card layout -->
                                        <div class="d-md-none" id="notification-templates-mobile">
                                            <div class="text-center py-3">
                                                <div class="spinner-border text-primary" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div>
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
                <!--end col-->
            </div>
            <!--end row-->
        </div>
        <!-- container-fluid -->
    </div>
</div>

<!-- Task Notification Template Modal -->
<div class="modal fade" id="notificationTemplateModal" tabindex="-1" aria-labelledby="notificationTemplateModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-lg-down">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="notificationTemplateModalLabel">Create/Edit Notification Template</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="notificationTemplateForm">
                    <input type="hidden" id="template_id" name="template_id" />
                    <input type="hidden" id="template_event_code" name="event_code" />
                    <input type="hidden" id="template_channel" name="channel" />
                    
                    <div class="row g-3">
                        <div class="col-12 col-lg-8 col-xl-8 order-2 order-lg-1">
                            <div class="mb-3" id="subject_template_div">
                                <label for="subject_template" class="form-label">Subject Template <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" id="subject_template" name="subject_template" placeholder="e.g., Custom - {$task_code}" />
                                <small class="text-muted">Use variables like {$task_code}, {$job_number}, etc.</small>
                            </div>
                            
                            <div class="mb-3">
                                <label for="template_content" class="form-label">Template Content <span class="text-danger">*</span></label>
                                <textarea class="form-control" id="template_content" name="template_content" rows="12" placeholder="Enter your template content here..."></textarea>
                                <small class="text-muted">
                                    <strong>Important:</strong> Only include the content area (no &lt;html&gt;, &lt;head&gt;, &lt;body&gt; tags). 
                                    Header and footer images are added automatically. Use variables from the list below.
                                </small>
                            </div>
                        </div>
                        
                        <div class="col-12 col-lg-4 col-xl-4 order-1 order-lg-2">
                            <div class="card sticky-top" style="top: 1rem;" id="variables-card">
                                <div class="card-header">
                                    <h6 class="card-title mb-0">Available Variables</h6>
                                </div>
                                <div class="card-body p-2" id="variables-card-body">
                                    <p class="text-muted small mb-2">Click on any variable to insert it into your template:</p>
                                    <div class="d-flex flex-column gap-2" id="variables-list">
                                        <div class="mb-2"><strong class="small">Task Information:</strong></div>
                                        <button type="button" class="btn btn-sm btn-outline-primary variable-btn text-start" data-variable="{$task_code}">
                                            <code>{$task_code}</code> - Task Code
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-primary variable-btn text-start" data-variable="{$job_number}">
                                            <code>{$job_number}</code> - Job Number
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-primary variable-btn text-start" data-variable="{$task_name}">
                                            <code>{$task_name}</code> - Task Name
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-primary variable-btn text-start" data-variable="{$service_name}">
                                            <code>{$service_name}</code> - Service Type
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-primary variable-btn text-start" data-variable="{$task_status}">
                                            <code>{$task_status}</code> - Task Status
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-primary variable-btn text-start" data-variable="{$task_date}">
                                            <code>{$task_date}</code> - Task Date
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-primary variable-btn text-start" data-variable="{$task_time}">
                                            <code>{$task_time}</code> - Task Time
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-primary variable-btn text-start" data-variable="{$target_date}">
                                            <code>{$target_date}</code> - Target Date
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-primary variable-btn text-start" data-variable="{$appointment_date}">
                                            <code>{$appointment_date}</code> - Appointment Date
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-primary variable-btn text-start" data-variable="{$appointment_time}">
                                            <code>{$appointment_time}</code> - Appointment Time
                                        </button>
                                        
                                        <div class="mb-2 mt-3"><strong class="small">Property Information:</strong></div>
                                        <button type="button" class="btn btn-sm btn-outline-primary variable-btn text-start" data-variable="{$property_address}">
                                            <code>{$property_address}</code> - Full Address
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-primary variable-btn text-start" data-variable="{$address1}">
                                            <code>{$address1}</code> - Address Line 1
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-primary variable-btn text-start" data-variable="{$address2}">
                                            <code>{$address2}</code> - Address Line 2
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-primary variable-btn text-start" data-variable="{$area}">
                                            <code>{$area}</code> - Area
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-primary variable-btn text-start" data-variable="{$town}">
                                            <code>{$town}</code> - Town/City
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-primary variable-btn text-start" data-variable="{$county}">
                                            <code>{$county}</code> - County
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-primary variable-btn text-start" data-variable="{$postcode}">
                                            <code>{$postcode}</code> - Postcode
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-primary variable-btn text-start" data-variable="{$property_uprn}">
                                            <code>{$property_uprn}</code> - Property UPRN
                                        </button>
                                        
                                        <div class="mb-2 mt-3"><strong class="small">People Information:</strong></div>
                                        <button type="button" class="btn btn-sm btn-outline-primary variable-btn text-start" data-variable="{$resident_name}">
                                            <code>{$resident_name}</code> - Resident Name
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-primary variable-btn text-start" data-variable="{$client_name}">
                                            <code>{$client_name}</code> - Client Name
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-primary variable-btn text-start" data-variable="{$company_name}">
                                            <code>{$company_name}</code> - Company Name
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-primary variable-btn text-start" data-variable="{$engineer_name}">
                                            <code>{$engineer_name}</code> - Engineer Name
                                        </button>
                                        
                                        <div class="mb-2 mt-3"><strong class="small">Contact Information:</strong></div>
                                        <button type="button" class="btn btn-sm btn-outline-primary variable-btn text-start" data-variable="{$support_phone}">
                                            <code>{$support_phone}</code> - Support Phone
                                        </button>
                                        
                                        <div class="mb-2 mt-3"><strong class="small">Appointment Information:</strong></div>
                                        <button type="button" class="btn btn-sm btn-outline-primary variable-btn text-start" data-variable="{$appointment_link}">
                                            <code>{$appointment_link}</code> - Appointment Link
                                        </button>

                                        <div class="mb-2 mt-3"><strong class="small">Survey Information:</strong></div>
                                        <button type="button" class="btn btn-sm btn-outline-primary variable-btn text-start" data-variable="{$survey_url}">
                                            <code>{$survey_url}</code> - Survey Url
                                        </button>
                                    </div>
                                    <div class="pt-2 border-top mt-2">
                                        <p class="text-muted small mb-0" style="line-height: 1.4;">
                                            <strong>Note:</strong> Variables will be replaced with actual values when the notification is sent.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="saveTemplateBtn">Save Template</button>
            </div>
        </div>
    </div>
</div>

<input type="hidden" id="client_id" value="<?= $id ?>" />
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
<input type="hidden" id="client_id" value="<?= $id ?>" />

<script type="text/javascript" src="<?= cdn_url('assets/js/ckeditor5.umd.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/app/ckeditor.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/client-appointment.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/clients/client-notification-templates.js') ?>"></script>
<!-- End Page-content -->
<script type="text/javascript">
    $('.client-sub-nav').find('a[data-tab="client-appointments"]').addClass('active');



</script>