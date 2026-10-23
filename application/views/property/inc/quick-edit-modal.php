<!--
    Quick-edit popup for the Property Details panel on the Job / Task screens.
    Fields are populated by open_property_quick_edit() in assets/js/datatables/jobs/job.js.
    The alert rows reuse #property_alert_form + .alerts_input_field_div so the global
    add/remove handlers in assets/js/app/interface.js work here unchanged.
-->
<div class="modal bs-example-modal-xl" tabindex="-1" id="property_quick_edit_modal" aria-hidden="true" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header pb-3">
                <h5 class="modal-title">Edit Property Details</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="propertyQuickEditForm" autocomplete="off">
                    <input type="hidden" name="id" id="quick_edit_property_id" value="" />
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">Street Address 1 <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" name="address1" value="">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Street Address 2</label>
                            <input type="text" class="form-control" name="address2" value="">
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">Area</label>
                            <input type="text" class="form-control" name="area" value="">
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">Town</label>
                            <input type="text" class="form-control" name="town" value="">
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">County</label>
                            <input type="text" class="form-control" name="county" value="">
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">Postcode <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" name="postalcode" value="">
                        </div>

                        <div class="col-12">
                            <hr class="my-1">
                            <h6 class="mb-0">Resident Contact</h6>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Resident Name</label>
                            <input type="text" class="form-control" name="resident_name" value="">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-control" name="email" value="">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Mobile</label>
                            <input type="text" class="form-control" name="mobile" value="">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Telephone</label>
                            <input type="text" class="form-control" name="telephone" value="">
                        </div>

                        <div class="col-12">
                            <label class="form-label">Access Note</label>
                            <textarea class="form-control" name="access_note" rows="2"></textarea>
                        </div>

                        <div class="col-12">
                            <div id="property_quick_alert_form">
                                <h5 class="fs-14 mb-0 mt-2 d-flex align-items-end">Alerts
                                    <button type="button" data-parent-div="property_quick_alert_form" data-input-parent="quick_alerts_input_field_div" class="add-property-alerts ms-auto btn btn-success btn-sm popup-add-btn">
                                        <i class="ri-add-line align-bottom"></i>
                                    </button>
                                </h5>
                                <hr class="mt-1 mb-0">
                            </div>
                        </div>
                    </div>
                    <!--end row-->
                </form>
            </div>
            <div class="modal-footer">
                <button type="submit" form="propertyQuickEditForm" class="btn btn-success waves-effect waves-light" id="property_quick_edit_save">Save</button>
                <button type="button" class="btn btn-light waves-effect waves-light" data-bs-dismiss="modal">Close</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>

<!-- Hidden template row cloned by .add-property-alerts and populate_property_alert_rows() -->
<div class="row gy-2 quick_alerts_input_field_div property-alert-row" style="display: none">
    <input type="hidden" class="warning_id" name="alert_ids[]" value="0" />
    <div class="col-xxl-2 col-md-2 pt-2">
        <div class="input-light">
            <label class="form-label">Warning Type</label>
            <select class="form-control warning_type" name="warning_types[]">
                <option value="" selected>Select</option>
                <option value="0">Property Alert</option>
                <option value="1">Resident Alert</option>
            </select>
        </div>
    </div>
    <div class="col-xxl-4 col-md-4 pt-2">
        <div class="input-light warning_message_container">
            <label class="form-label">Message</label>
            <div class="mb-2">
                <input type="hidden" class="resident_alert_ids_hidden" name="master_alert_ids[]" />
                <select class="form-control select2 warning_message_select mb-1" multiple style="display: none;" disabled></select>
            </div>
            <textarea type="text" rows="3" class="form-control warning_message_text" name="messages[]" placeholder="Write your message here."></textarea>
        </div>
    </div>
    <div class="col-xxl-2 col-md-2 pt-2">
        <div class="input-light">
            <label class="form-label">Status</label>
            <select class="form-control warning_status" name="warning_status[]">
                <option value="1">Active</option>
                <option value="0">In-active</option>
            </select>
        </div>
    </div>
    <div class="col-xxl-2 col-md-2 pt-2">
        <div class="input-light">
            <label class="form-label">Start-End date</label>
            <input type="date" name="alert_start_date[]" class="form-control warning_start" />
            <input type="date" name="alert_end_date[]" class="form-control warning_end mt-1" />
        </div>
    </div>
    <div class="col-xxl-2 col-md-2 ms-auto pt-2">
        <label class="form-label" style="color: transparent;">Remove</label><br />
        <button type="button" data-parent-div="quick_alerts_input_field_div" class="remove-parent-btn ms-auto btn btn-danger popup-close-btn">
            <i class="ri-close-line"></i>
        </button>
    </div>
</div>
