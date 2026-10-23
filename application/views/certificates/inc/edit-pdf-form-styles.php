 <div class="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="edit-field-settings" aria-labelledby="field-settingsLabel">
    <div class="offcanvas-header bg-primary bg-gradient">
        <h5 class="offcanvas-title text-white" id="field-settingsLabel">Edit Field Setting</h5>
    </div>
    <div class="offcanvas-body p-0">
        <div data-simplebar="init" style="height: 100%;" class="simplebar-scrollable-y">
            <div class="simplebar-wrapper" style="margin: 0px;">
                <div class="simplebar-height-auto-observer-wrapper">
                    <div class="simplebar-height-auto-observer"></div>
                </div>
                <div class="simplebar-mask">
                    <div class="simplebar-offset" style="right: 0px; bottom: 0px;">
                        <div class="simplebar-content-wrapper" tabindex="0" role="region" aria-label="scrollable content" style="height: 100%;overflow-x: hidden;">
                            <div class="simplebar-content" style="padding: 0px;">
                                <div class="p-4">
                                    <h6 class="mb-0 fw-bold text-uppercase">Field Setting</h6>
                                    <p class="text-muted">Change your settings</p>
                                    <div class="row gy-3">
                                        <div class="col-12">
                                            <form id="editFieldSettingForm">
                                                <div class="mb-3">
                                                    <label for="fieldType" class="form-label">Field Type</label>
                                                    <input type="text" class="form-control" id="fieldType" readonly disabled required>
                                                </div>

                                                <div class="mb-3">
                                                    <label for="fieldName" class="form-label">Field Name</label>
                                                    <input type="text" class="form-control" id="fieldName" placeholder="single_text_101" readonly disabled required>
                                                </div>

                                                <div class="mb-3 fieldValueBox">
                                                    <label for="fieldValue" class="form-label">Field Value</label>
                                                    <input type="text" class="form-control" id="fieldValue" placeholder="Value">
                                                </div>

                                                <div class="mb-3" hidden>
                                                    <label for="responseCode" class="form-label">Response Code</label>
                                                    <select name="responseCode" id="responseCode" class="form-control">
                                                        <option value="">--Select--</option>
                                                        <option value="100">100</option>
                                                        <option value="200">200</option>
                                                        <option value="201">201</option>
                                                        <option value="202">202</option>
                                                        <option value="300">300</option>
                                                        <option value="400" selected>400</option>
                                                        <option value="401">401</option>
                                                        <option value="404">404</option>
                                                        <option value="500">500</option>
                                                        <option value="900">900</option>
                                                    </select>
                                                </div>

                                                <div class="mb-3">
                                                    <label for="responseMessage" class="form-label">Response Message</label>
                                                    <input type="text" class="form-control" id="responseMessage">
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="offcanvas-footer border-top p-3 text-center">
        <div class="row">
            <div class="col-6">
                <button type="button" class="btn btn-light w-100" onclick="resetSettings();">Close</button>
            </div>
            <div class="col-6">
                <button type="button" class="btn btn-primary w-100 update_close">Save</button>
            </div>
        </div>
    </div>
</div>