<div class="row mt-3 sub-poperty-details-section">
    <div class="col-xxl-8 col-md-8">
        <div class="row">
            <div class="col-xxl-6 col-md-6">
                <div class="border-main-details">
                    <h5 class="mb-1">Details</h5>
                    <hr class="mt-1 mb-2">
                    <table class="table mb-0">
                        <tbody>
                            <tr>
                                <td><b>Client </b></td>
                                <td class="detail-data"><span id="detail_client_code">-</span></td>
                            </tr>
                            <tr>
                                <td><b>PO Number / Reference</b></td>
                                <td class="detail-data"><span id="detail_reference_number">-</span></td>
                            </tr>
                            <tr>
                                <td><b>AJS Contract Number</b></td>
                                <td class="detail-data"><span id="detail_contract_number">-</span></td>
                            </tr>
                            <tr>
                                <td><b>Description</b></td>
                                <td class="detail-data"><span id="detail_description">-</span></td>
                            </tr>
                            <tr>
                                <td><b>Start Date </b></td>
                                <td class="detail-data"><span id="detail_start_date">-</span></td>
                            </tr>
                            <tr>
                                <td><b>End Date </b></td>
                                <td class="detail-data"><span id="detail_end_date">-</span></td>
                            </tr>
                            <tr>
                                <td><b>Service Coverage</b></td>
                                <td class="detail-data"><span><em id="detail_service_start_time" style="font-style: normal;">-</em> - <em id="detail_service_end_time" style="font-style: normal;">-</em></span></td>
                            </tr>
                            <tr>
                                <td ><b>Tags</b></td>
                                <td  class="detail-data"><span id="detail_tags"></span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-xxl-6 col-md-6">
                <div class="border-main-details">
                    <h5 class="mb-1">Coverage Period</h5>
                    <hr class="mt-1 mb-2">
                    <table class="table mb-0 coverage-table">
                        <thead class="text-muted">
                            <tr>
                                <th scope="col">Day</th>
                                <th scope="col">Start Hour</th>
                                <th scope="col">End Hour</th>
                                <th scope="col">Closed</th>
                                <th scope="col">Open All Day</th>
                            </tr>
                        </thead>
                        <tbody id="detail_coverage_period">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xxl-4 col-md-4">
        <div class="border-main-details">
            <h5 class="mb-1">Personnel</h5>
            <hr class="mt-1 personnel-hr">
            <h6 class="mb-1">Client Contacts</h6>
            <table class="table mb-0">
                <tbody id="client_contacts">
                </tbody>
            </table>
            <hr class="mt-1 mb-2">
            <h6 class="mb-1">AJS Contacts</h6>
            <table class="table mb-0">
                <tbody id="ajs_contacts">
                </tbody>
            </table>
        </div>
    </div>
    <div class="col-xxl-8 col-md-8 mt-3">
        <h5 class="mb-1">Workstreams </h5>
        <hr class="mt-1 mb-2">
        <table class="table mb-0 coverage-table">
            <thead>
            <th>Name</th>
            <th>Job Type</th>
            <th>SOR</th>
            <th>Priority</th>
            <th>Appt. Req.</th>
            <th>Status</th>
            </thead>
            <tbody id="detail_workstreams">
            </tbody>
        </table>
    </div>
    <div class="col-xxl-4 col-md-4 mt-3">
        <h5 class="mb-1">Settings </h5>
        <hr class="mt-1 mb-2">
        <table class="table mb-0 coverage-table">
            <tbody>
                <tr>
                    <td><b>Job Prefix </b></td>
                    <td class="detail-data"><span id="detail_job_prefix">-</span></td>
                </tr>
                <tr>
                    <td><b>Preplan PPM schedule </b></td>
                    <td class="detail-data"><span><sm id="detail_ppm_preplan">-</sm> Days</span></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="clearfix"><br/></div>
    <div style="display:none" class="">
        <h5 class="mb-1">PPM Plan </h5>
        <hr class="mt-1 mb-2">
        <table class="table align-left table-nowrap mb-0 properties-table mt-2 table-hover masterplan-tbl">
            <thead class="table-light text-muted">
                <tr>
                    <th>#UPRN</th>
                    <th>Address</th>
                    <th>Jan</th>
                    <th>Feb</th>
                    <th>Mar</th>
                    <th>Apr</th>
                    <th>May</th>
                    <th>Jun</th>
                    <th>Jul</th>
                    <th>Aug</th>
                    <th>Sep</th>
                    <th>Oct</th>
                    <th>Nov</th>
                    <th>Dec</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Prop1234</td>
                    <td>London<br/>A000AA</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>1</td>
                    <td>0</td>
                    <td>2</td>
                    <td>5</td>
                    <td>1</td>
                    <td>0</td>
                    <td>1</td>
                    <td>1</td>
                    <td>2</td>
                </tr>
                <tr>
                    <td>PRO-123</td>
                    <td>Farley House, Kinvara Business Park<br/>A000AA</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>1</td>
                    <td>0</td>
                    <td>2</td>
                    <td>5</td>
                    <td>1</td>
                    <td>0</td>
                    <td>1</td>
                    <td>1</td>
                    <td>2</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
<!-- Contract Documents -->
<div class="card mt-3" id="contract-documents-card">
    <div class="card-header d-flex flex-wrap align-items-center justify-content-between">
        <h5 class="card-title mb-0">Documents</h5>
        <div class="d-flex align-items-center">
            <input type="file" id="contract_document_file" class="form-control form-control-sm me-2" style="max-width:260px"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif" />
            <button type="button" id="upload_contract_document" class="btn btn-primary btn-sm text-nowrap">
                <i class="ri-upload-2-line align-bottom"></i> Upload
            </button>
        </div>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-nowrap align-middle mb-0">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Document</th>
                        <th scope="col">Type</th>
                        <th scope="col">Uploaded By</th>
                        <th scope="col">Uploaded On</th>
                        <th scope="col" class="text-end">Action</th>
                    </tr>
                </thead>
                <tbody id="contract_documents_list">
                    <tr><td colspan="6" class="text-center">Loading...</td></tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<input type="hidden" id="contract_id" value="<?= $id ?>" />
<input type="hidden" id="hidden_contract_id" value="<?= $id ?>" />
<input type="hidden" id="client_id" value="0" />
<input type="hidden" name="is_detail_page" id="is_detail_page" value="1" />
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/jobs/job.js?v=1.5') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/libs/dropzone/dropzone-min.js'); ?>"></script>

<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/contract.js?v=1.0') ?>"></script>
<!-- End Page-content -->
<script type="text/javascript">
    var is_modal = "<?= $this->input->get('modal') ?>";
    $('.client-sub-nav').find('a[data-tab="client-contracts"]').addClass('active');
</script>