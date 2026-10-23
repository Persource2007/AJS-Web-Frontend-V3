<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->

<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 class="mb-sm-0">Add New Property</h4>
                        <div class="page-title-right">
                            <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item"><a href="javascript: void(0);">Resources Set up</a></li>
                                <li class="breadcrumb-item active">Add Property</li>
                            </ol>
                        </div>

                    </div>
                </div>
            </div>
            <!-- end page title -->

            <div class="row">
                <?php
                $action = app_url('property/create');
                $method = 'POST';
                if (isset($edit) && $edit && isset($id) && $id > 0) {
                    $action = app_url('property/edit/');
                }
                ?>
                <form class="tablelist-form pb-4 simplebar-form" action="<?= $action ?>" method="<?= $method ?>" id="propertyForm" style="height: calc(100vh - 112px);" data-simplebar autocomplete="off">
                    <input type="hidden" value="<?= $id ?? null ?>" id="edit_id" name="edit_id" />
                    <div class="p-0 overflow-hidden pb-3">
                        <div>
                            <div class="acitivity-timeline p-4 pt-2">
                                <div class="modal-body">
                                    <div class="">
                                        <div class="row gy-2" style="margin-top: 0px;">
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label for="uprn" class="form-label">UPRN <span class="text-danger">*</span><span class="tooltip-container" data-master-code="PROPERTY_UPRN"><i class="bx bx-info-circle tooltip"></i></span></label>

                                                    <input value="" type="text" class="form-control" id="uprn_no" name="uprn_no">
                                                </div>
                                            </div>
                                            <div class="col-xxl-8 col-md-8">
                                                <div class="input-light">
                                                    <label class="form-label">Client Code <span class="text-danger">*</span></label>
                                                    <div class="d-flex error-div">
                                                        <select class="form-control" id="client_code" name="client_id">
                                                            <option value="" selected>Select</option>
                                                        </select>
                                                        <button type="button" class="btn btn-primary ms-2 popup-form-search-button popup-add-btn" data-heading="Search Client" data-element="client_code" data-after-load-func="set_client_code" data-form-url="<?= base_url('clients/search-list') ?>"><i class="mdi mdi-magnify search-widget-icon"></i></button>
                                                        <button type="button" class="btn btn-primary ms-2  popup-form-view-button popup-add-btn" data-heading="View Client" data-element="client_code"  data-form-url="<?= base_url('clients/details') ?>"><i class=" ri-eye-fill  align-bottom"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div class="input-light">
                                                    <label class="form-label">Property Type </label>
                                                    <div class="d-flex error-div">
                                                        <select class="form-control" name="property_type" id="property_type">
                                                            <option value="" selected>Select</option>
                                                        </select>

                                                        <button type="button" class="btn btn-success ms-2 popup-form-button-master popup-add-btn" data-heading="Add New Property Type" data-after-load-func="create_master_form" data-element="property_type" data-form-url="<?= base_url('system/master-record/create/PROPERTY_TYPES') ?>"><i class="ri-add-line align-bottom"></i></button>
                                                    </div>

                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div class="mt-4">
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox" name="is_block" id="is_block" value="1">
                                                        <label class="form-check-label" for="is_block">Block</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox" name="is_hrb" id="is_hrb" value="1">
                                                        <label class="form-check-label" for="is_hrb" title="High Rise Block">HRB</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">Associated Block/Property ID<span class="tooltip-container" data-master-code="ASSO_BLOCK"><i class="bx bx-info-circle tooltip"></i></span></label>
                                                    <select class="form-control select2" id="parent_id" name="parent_id">
                                                        <option value="" selected>Select</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4 hide">
                                                <div>
                                                    <label class="form-label">AJS Property Id</label>
                                                    <input type="text" class="form-control" id="ajs_property_id" name="ajs_property_id">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">Client Property Id</label>
                                                    <input type="text" class="form-control" id="client_property_id" name="client_property_id">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label for="size" class="form-label">Number of bedrooms</label>
                                                    <input value="" type="text" class="form-control" id="size" name="size">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label for="units" class="form-label">Units</label>
                                                    <input value="" type="number" class="form-control number-only" id="units" name="units">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label for="no_of_floors" class="form-label">Floors</label>
                                                    <input value="" type="number" class="form-control number-only" id="no_of_floors" name="no_of_floors">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label for="address1" class="form-label">Street Address 1 <span class="text-danger">*</span></label>
                                                    <input type="text" class="form-control" id="address1" name="address1">
                                                </div>
                                            </div>
                                            <!--end col-->
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">Street Address 2</label>
                                                    <input type="text" class="form-control" id="address2" name="address2">
                                                </div>
                                            </div>
                                            <!--end col-->
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">Area</label>
                                                    <input type="text" class="form-control" id="area" name="area">
                                                </div>
                                            </div>
                                            <!--end col-->
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">Town </label>
                                                    <input type="text" class="form-control" id="town" name="city">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">County</label>
                                                    <input type="text" class="form-control" id="county" name="county">
                                                </div>
                                            </div>
                                            <!--end col-->
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label for="labelInput" class="form-label">Postcode <span class="text-danger">*</span></label>
                                                    <input type="text" class="form-control postalcode-mask" id="postalcode" name="postalcode">
                                                </div>
                                            </div>
                                            <!--end col-->
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">Resident Name</label>
                                                    <input type="text" class="form-control" id="resident_name" name="resident_name">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">Resident Contact Method</label>
                                                    <select class="form-control select2" id="resident_contact_methods" name="resident_contact_methods[]" multiple>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">Preferred Contact Method</label>
                                                    <select class="form-control select2" id="preferred_contact_method" name="preferred_contact_method">
                                                        <option value="" selected>Select</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label for="labelInput" class="form-label">Email</label>
                                                    <input type="email" class="form-control" id="email" name="email">
                                                </div>
                                            </div>
                                            <!--end col-->
                                            <div class="col-xxl-4 col-md-4">
                                                <label for="labelInput" class="form-label">Mobile</label>
                                                <div class="input-group">
                                                    <span class="input-group-text">+44</span>
                                                    <input type="text" class="form-control mobile-mask" id="mobile" name="mobile">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <label for="labelInput" class="form-label">Telephone</label>
                                                <div class="input-group">
                                                    <span class="input-group-text">+44</span>
                                                    <input type="text" class="form-control telephone-mask" id="telephone" name="telephone">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">Account Code</label>
                                                    <input type="text" class="form-control" id="account_code" name="account_code">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">Year Built</label>
                                                    <select class="form-control basic-select2" id="year_built" name="year_built">
                                                        <option value="" selected>Select</option>
                                                        <?php
                                                        for ($i = date('Y'); $i > 1900; $i--) {
                                                            echo "<option value=$i>$i</option>";
                                                        }
                                                        ?>
                                                    </select>

                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">Latitude</label>
                                                    <input type="text" class="form-control" id="latitude" name="latitude">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">Longitude</label>
                                                    <input type="text" class="form-control" id="longitude" name="longitude">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">Status</label>
                                                    <select class="form-control basic-select2" name="status" id="status" >
                                                        <option value="1" selected>Active</option>
                                                        <option value="0">Inactive</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-md-12">
                                                <div class="input-light">
                                                    <label class="form-label">Notes</label>
                                                    <div class="d-flex">
                                                        <textarea type="text" class="form-control" id="notes" name="notes"></textarea>

                                                        <button type="button" class="btn btn-primary ms-2 popup-form-search-button popup-add-btn phrasebook-btn" data-heading="Use Phrasebook" data-element="notes" data-form-url="<?= base_url('system/phrasebook/search-list') ?>"><i class="mdi mdi-book-open-page-variant search-widget-icon"></i></button>
                                                    </div>
                                                </div>
                                                <div>


                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-md-12">
                                                <div class="input-light">
                                                    <label class="form-label">Access Note</label>
                                                    <textarea class="form-control" id="access_note" name="access_note"></textarea>
                                                </div>
                                            </div>
                                            <div class="clearfix"></div>

                                            <div class="col-xxl-6 col-md-6">
                                                <div class="input-light">
                                                    <label class="form-label">Tags</label>
                                                    <div class="d-flex">
                                                        <select class="form-control" name="tags[]" id="tags" data-module="property" multiple>
                                                        </select>
                                                        <button type="button" class="btn btn-success ms-2 popup-form-button-master popup-add-btn" data-heading="Add New Tag" data-after-load-func="create_tag_form" data-element="tags" data-form-url="<?= cdn_url('system/tag/create?in_popup=1') ?>"><i class="ri-add-line align-bottom"></i></button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xxl-2 col-md-3">
                                                <div class="mt-4">
                                                    <div class="form-check form-check-inline" style="margin-right: 5px;">
                                                        <input class="form-check-input" type="checkbox" name="is_asbestos" id="is_asbestos" value="1">
                                                        <label class="form-check-label" for="is_asbestos">Has Asbestos</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div style="display: none;">
                                                    <label class="form-label">Asbestos Register Link</label>
                                                    <input type="text" class="form-control" id="asbestos_register_link" name="asbestos_register_link">
                                                </div>
                                            </div>
                                        </div>
                                        <h5 class="fs-16 mb-0 mt-3">Leaseholder Details</h5>
                                        <hr class="mb-2 mt-1">
                                        <div class="row gy-2">
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">Name</label>
                                                    <input type="text" class="form-control" id="leaseholder_name" name="leaseholder_name">
                                                </div>
                                            </div>
                                            <!--end col-->
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">Address 1</label>
                                                    <input type="text" class="form-control" id="leaseholder_address1" name="leaseholder_address1">
                                                </div>
                                            </div>
                                            <!--end col-->
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">Address 2</label>
                                                    <input type="text" class="form-control" id="leaseholder_address2" name="leaseholder_address2">
                                                </div>
                                            </div>
                                            <!--end col-->
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">Area</label>
                                                    <input type="text" class="form-control" id="leaseholder_area" name="leaseholder_area">
                                                </div>
                                            </div>
                                            <!--end col-->
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">Town</label>
                                                    <input type="text" class="form-control" id="leaseholder_town" name="leaseholder_town">
                                                </div>
                                            </div>
                                            <!--end col-->
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">County</label>
                                                    <input type="text" class="form-control" id="leaseholder_county" name="leaseholder_county">
                                                </div>
                                            </div>
                                            <!--end col-->
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">Postcode</label>
                                                    <input type="text" class="form-control postalcode-mask" id="leaseholder_postalcode" name="leaseholder_postalcode">
                                                </div>
                                            </div>
                                            <!--end col-->
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">Contact Method</label>
                                                    <select class="form-control select2" id="leaseholder_contact_methods" name="leaseholder_contact_methods[]" multiple>
                                                    </select>
                                                </div>
                                            </div>
                                            <!--end col-->
                                            <div class="col-xxl-4 col-md-4">
                                                <div>
                                                    <label class="form-label">Preferred Contact Method</label>
                                                    <select class="form-control select2" id="leaseholder_preferred_contact_method" name="leaseholder_preferred_contact_method">
                                                        <option value="" selected>Select</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <!--end col-->
                                            <div class="col-xxl-4 col-md-4">
                                                <label class="form-label">Mobile</label>
                                                <div class="input-group">
                                                    <span class="input-group-text">+44</span>
                                                    <input type="text" class="form-control mobile-mask" id="leaseholder_mobile" name="leaseholder_mobile">
                                                </div>
                                            </div>
                                            <!--end col-->
                                            <div class="col-xxl-4 col-md-4">
                                                <label class="form-label">Telephone</label>
                                                <div class="input-group">
                                                    <span class="input-group-text">+44</span>
                                                    <input type="text" class="form-control telephone-mask" id="leaseholder_telephone" name="leaseholder_telephone">
                                                </div>
                                            </div>
                                            <!--end col-->
                                        </div>
                                        <div id="property_alert_form">
                                            <h5 class="mb-0 mt-3 d-flex align-items-end">Alerts
                                                <button type="button" data-parent-div="property_alert_form" data-input-parent="alerts_input_field_div" class="add-property-alerts ms-auto btn btn-success popup-add-btn">
                                                    <i class="ri-add-line align-bottom"></i>
                                                </button>
                                            </h5>
                                            <hr class="mt-1 mb-0">
                                            <?php
                                            if (!isset($id)) {
                                                ?>
                                                <div class="row gy-2 pt-2 property-alert-row">
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
                                                                <input type="hidden" class="resident_alert_ids_hidden" name="master_alert_ids[]" />
                                                                <select class="form-control select2 warning_message_select" multiple style="display: none;" disabled></select>
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
                                                                    <input type="date" name="alert_end_date[]" class="form-control mt-1 warning_end" />
                                                                </div>
                                                        </div>
                                                        <!--end col-->
                                                </div>
                                                <?php
                                            }
                                            ?>
                                        </div>
                                    </div>
                                    <!--end row-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="offcanvas-foorter p-4 text-center">

                        <div class="hstack gap-2">
                            <button type="submit" class="btn btn-success waves-effect waves-light" id="add-btn">Save</button>
                            <button type="button" class="btn btn-light waves-effect waves-light close-offcanvas" id="close-modal" >Close</button>
                            <div id="deleteBtnContainer"></div>
                            <?php if (isset($edit) && $edit && isset($id) && $id > 0) { ?>               
                                <script>
                                    document.getElementById('deleteBtnContainer').innerHTML = delete_icon(<?= $id ?>, 'property');
                                </script>
                            <?php }  ?>
                        </div>
                    </div>
                </form>
                <div class="row gy-2 alerts_input_field_div property-alert-row" style="display: none">

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
                        <button type="button" data-parent-div="alerts_input_field_div" class="remove-parent-btn ms-auto btn btn-danger popup-close-btn">
                            <i class="ri-close-line"></i>
                        </button>
                    </div>
                    <!--end col-->
                </div>
            </div>
        </div>
        <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
</div>