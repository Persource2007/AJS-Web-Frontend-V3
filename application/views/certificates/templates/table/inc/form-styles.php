 <div class="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="field-settings" aria-labelledby="field-settingsLabel">
    <div class="offcanvas-header">
        <div>
            <h6 class="mb-0 fw-bold text-uppercase">Field Setting</h6>
            <p class="text-muted mb-0">Change your settings</p>
        </div>

        <button type="button" class="btn btn-danger ms-auto" id="deleteField">Delete</button>
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
                                    <!-- <h6 class="mb-0 fw-bold text-uppercase">Field Setting</h6> -->
                                    <!-- <p class="text-muted">Change your settings</p> -->
                                    <div class="row gy-3">
                                        <div class="col-12 mt-1">
                                            <form id="fieldSettingForm">
                                                <div class="form-check form-switch form-switch-left form-switch-md mb-3 inputs duplicatefield">
                                                    <label for="duplicateField" class="form-label ">Duplicate existing field</label>
                                                    <input class="form-check-input" type="checkbox" id="duplicateField" value="yes">
                                                </div>

                                                <div class="mb-3 mt-0 duplicatefield">
                                                    <label for="fieldType" class="form-label">Field Type</label>
                                                    <input type="text" class="form-control" id="fieldType" readonly disabled required>
                                                </div>

                                                <div class="mb-3 dbFieldBox">
                                                    <label class="form-label" for="fieldDB">Select Database Field</label>
                                                    <select name="fieldDB" id="fieldDB" class="form-control">
                                                        <option value="">--Select--</option>
                                                        <option value="JobNumber">Job Number</option>
                                                        <option value="TaskNumber">Task Number</option>
                                                        <option value="EnrollmentNumber">Enrollment Number</option>
                                                        <option value="CompanyName">Company Name</option>
                                                        <option value="CompanyAddress">Company Address</option>
                                                        <option value="CompanyPhone">Company Phone</option>
                                                        <option value="CompanyPostcode">Company Postcode</option>
                                                        <option value="ClientName">Client Name</option>
                                                        <option value="ClientAddress">Client Address</option>
                                                        <option value="ClientPhone">Client Phone</option>
                                                        <option value="ClientPostcode">Client Postcode</option>
                                                        <option value="RegistrationNumber">Registration Number</option>
                                                        <option value="ContractorReferenceNumber">Contractor Reference Number</option>
                                                        <option value="InstallationAddress">Installation Address</option>
                                                        <option value="InstallationPostcode">Installation Postcode</option>
                                                        <option value="InstallationPhone">Installation Phone</option>
                                                        <option value="UPRN">UPRN</option>
                                                        <option value="Occupier">Occupier</option>
                                                        <option value="BranchNumber">Branch Number</option>
                                                        <option value="EngineerPosition">Engineer Position</option>
                                                        <option value="EngineerName">Engineer Name</option>
                                                        <option value="EngineerPhone">Engineer Phone</option>
                                                        <option value="QsName">QS Name</option>
                                                        <option value="QsPosition">QS Position</option>
                                                        <option value="QsSignature">QS Signature</option>
                                                        <option value="QsDate">QS Date</option>
                                                        <option value="CurrentDate">Current Date</option>
                                                    </select>
                                                </div>

                                                <div class="mb-3 inputs duplicatefield">
                                                    <label for="fieldName" class="form-label">Field Name</label>
                                                    <input type="text" class="form-control" id="fieldName" placeholder="single_text_101" readonly disabled required>
                                                </div>

                                                <div class="mb-3 inputs duplicatefield dbFieldBox">
                                                    <label for="fieldLabel" class="form-label">Field Label</label>
                                                    <input type="text" class="form-control" id="fieldLabel" placeholder="Single Text" required>
                                                </div>

                                                <div class="mb-3 inputs">
                                                    <label for="fieldHeading" class="form-label">Field Heading</label>
                                                    <input type="text" class="form-control" id="fieldHeading" placeholder="Heading...">
                                                </div>

                                                <div class="mb-3 inputs">
                                                    <label for="fieldDesc" class="form-label">Field Description</label>
                                                    <input type="text" class="form-control" id="fieldDesc" placeholder="Description...">
                                                </div>

                                                <div class="form-check form-switch form-switch-left form-switch-md mb-3 inputs">
                                                    <label for="showHeading" class="form-label ">Show Field Heading (In App)</label>
                                                    <input class="form-check-input" type="checkbox" id="showHeading" value="yes">
                                                </div>

                                                <div class="form-check form-switch form-switch-left form-switch-md mb-3 inputs dbFieldBox">
                                                    <label for="showLabel" class="form-label ">Show Label</label>
                                                    <input class="form-check-input code-switcher" type="checkbox" id="showLabel" checked value="yes">
                                                </div>

                                                <div class="form-check form-switch form-switch-left form-switch-md mb-3 inputs">
                                                    <label for="isHidden" class="form-label ">Set as Hidden in PDF</label>
                                                    <input class="form-check-input" type="checkbox" id="isHidden" value="yes">
                                                </div>

                                                <div class="form-check form-switch form-switch-left form-switch-md mb-3 borderDiv duplicatefield">
                                                    <label for="showBorder" class="form-label ">Show Border</label>
                                                    <input class="form-check-input code-switcher" type="checkbox" id="showBorder" value="yes">
                                                </div>

                                                <div class="form-check form-switch form-switch-left form-switch-md mb-3 borderDiv duplicatefield">
                                                    <label for="addPadding" class="form-label ">Set Padding</label>
                                                    <input class="form-check-input" type="checkbox" id="addPadding" value="yes">
                                                </div>

                                                <div class="form-check form-switch form-switch-left form-switch-md mb-3 inputs">
                                                    <label for="reqCheck" class="form-label ">Required</label>
                                                    <input class="form-check-input code-switcher" type="checkbox" id="reqCheck" value="yes">
                                                </div>

                                                <div class="form-check form-switch form-switch-left form-switch-md mb-3 inputs">
                                                    <label for="canEdit" class="form-label ">Make it Editable</label>
                                                    <input class="form-check-input code-switcher" type="checkbox" id="canEdit" value="yes" checked>
                                                </div>

                                                <div class="mb-3 fillableOptions">
                                                    <label for="prefill" class="form-label">Prefilled Options</label>
                                                    <div class="d-flex align-items-center mb-2">
                                                        <span class="fa icon-plus waves-effect waves-light" onclick="addPrefillOption(this);"><i class="ri-add-line align-bottom"></i></span>
                                                        <input type="text" class="form-control autofillOption" id="autofillOption" value="">
                                                    </div>
                                                </div>

                                                <div class="form-check form-switch form-switch-left form-switch-md mb-3 checkboxoptions">
                                                    <label for="showOptVal" class="form-label ">Show Options Value</label>
                                                    <input class="form-check-input code-switcher" type="checkbox" id="showOptVal" checked value="yes">
                                                </div>

                                                <div class="form-check form-switch form-switch-left form-switch-md mb-3 optionsbox">
                                                    <label for="showAllOpt" class="form-label ">Show All Options in PDF</label>
                                                    <input class="form-check-input code-switcher" type="checkbox" id="showAllOpt" value="yes">
                                                </div>

                                                <div class="form-check form-switch form-switch-left form-switch-md mb-3 optionsbox">
                                                    <label for="showIcons" class="form-label ">Show "Yes/No" Options with Icon in PDF</label>
                                                    <input class="form-check-input code-switcher" type="checkbox" id="showIcons" value="yes">
                                                </div>

                                                <div class="form-check form-switch form-switch-left form-switch-md mb-3 selectbox">
                                                    <label for="multiOptionSelect" class="form-label ">Allow Multiple Selection</label>
                                                    <input class="form-check-input code-switcher" type="checkbox" id="multiOptionSelect" value="yes">
                                                    <div class="mb-3" id="optionSeperatorBox" style="display:none;">
                                                        <input type="text" class="form-control" id="optionSeperator" placeholder="e.g. ;, |, <br/>" value=", ">
                                                    </div>
                                                </div>

                                               <!--  <div class="form-check form-switch form-switch-left form-switch-md mb-3 inputs formulasbox">
                                                    <label for="formula" class="form-label ">Set Formula Attribute</label>
                                                    <input class="form-check-input code-switcher" type="checkbox" id="formula" value="yes" onchange="if(this.checked) { document.getElementById('formulaattribute').style.display = 'block'; } else { document.getElementById('formulaattribute').style.display = 'none'; }">

                                                    <div id="formulaattribute" class="formulaattribute mb-3" style="display:none;">
                                                        <input type="text" name="attribute" id="formula_attribute" class="form-control" placeholder="ATTRIBUTE_OMEGA">
                                                    </div>
                                                </div> -->

                                                <div class="form-check form-switch form-switch-left form-switch-md mb-3 inputs dropdownbox radiooptions">
                                                    <label for="dynamicOptions" class="form-label ">Set Dynamic Options</label>
                                                    <input class="form-check-input code-switcher" type="checkbox" id="dynamicOptions" value="yes">

                                                    <div class="dynamicOptionsInfoBox mb-3">
                                                        <input type="text" name="attribute" id="connection_attribute" class="form-control" placeholder="CONNECTION_ATTRIBUTE_NAME">
                                                        <span class="bg-info-subtle text-info" style="font-size: 14px;">Info: Option sets now update dynamically from click to connection button and also interrelate all checked dynamic options</span>
                                                    </div>
                                                </div>

                                                

                                                <div class="mb-3 multipleoptionsbox">
                                                    <label for="fieldOptions" class="form-label">Options</label>
                                                    <!-- <span class="fa icon-plus" onclick="addNewField(this);"><i class="ri-add-line align-bottom"></i></span> -->
                                                    <div class="d-flex align-items-center mb-2">
                                                        <span class="fa icon-plus" onclick="addNewField(this);"><i class="ri-add-line align-bottom"></i></span>
                                                        <input type="text" class="form-control fieldOptions me-2" id="fieldOptions" value="Option 1" placeholder="Option 1">
                                                        <input type="text" class="form-control fieldOptionsNote" id="fieldOptionsNote" value="" placeholder="Option Info/Note">
                                                    </div>
                                                </div>

                                                <div class="mb-3 inputs">
                                                    <label for="fieldDefault" class="form-label">Default Value</label>
                                                    <input type="text" class="form-control" id="fieldDefault" placeholder="Single Text">
                                                </div>

                                                <!-- Other input field -->
                                                <div class="dropdownfieldBox form-check form-switch form-switch-left form-switch-md mb-3">
                                                    <label for="enableOtherOption" class="form-label d-inline-flex align-items-center">
                                                        Allow custom input when needed
                                                        <span class="d-flex ms-1" data-bs-toggle="tooltip"  title="Enable this setting to let users type a custom value when none of the dropdown options apply.">
                                                            <i class="bx bx-info-circle text-info fs-5"></i>
                                                        </span>
                                                    </label>
                                                    <input class="form-check-input" type="checkbox" id="enableOtherOption" value="yes">
                                                    <div class="mb-3" id="displayOtherFields" style="display:none;">
                                                        <input type="text" class="form-control" id="otherFieldOptions" placeholder="e.g. Other, Custom, Specify" value="Other">
                                                        <small class="form-text bg-info-subtle text-info">
                                                            Enter option labels that should show a text box when selected.
                                                        </small>
                                                    </div>
                                                </div>
                                                <!-- Other input field -->

                                                <div class="form-check form-switch form-switch-left form-switch-md mb-3 multiplefilesbox">
                                                    <label for="allowGallery" class="form-label ">Allow Gallery Access</label>
                                                    <input class="form-check-input code-switcher" type="checkbox" id="allowGallery" checked value="yes">
                                                </div>

                                                <div class="form-check form-switch form-switch-left form-switch-md mb-3 multiplefilesbox">
                                                    <label for="multiFileSelect" class="form-label ">Allow Multiple Files Uploading</label>
                                                    <input class="form-check-input code-switcher" type="checkbox" id="multiFileSelect" value="yes">
                                                </div>

                                                <div class="mb-3 multiplefilesbox">
                                                    <label for="max_file_size_length" class="form-label">Max File Upload Size</label>
                                                    <div class="mb-3 input-group">
                                                        <input type="text" class="form-control" id="max_file_size_length" placeholder="Eg: 10" minlength="1" maxlength="50">
                                                        <span class="input-group-text" id="size-addon">MB</span>
                                                    </div>
                                                </div>

                                                <div class="mb-3 multiplefilesbox">
                                                    <label class="form-label ">Allow File Types</label><br/>
                                                    <div class="form-check form-check-inline">
                                                        <label class="form-label " for="filePNG">
                                                            <input class="form-check-input code-switcher fileTypes" name="fileType" type="checkbox" id="filePNG" value="PNG"> PNG
                                                        </label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <label class="form-label " for="fileJPG">
                                                            <input class="form-check-input code-switcher fileTypes" name="fileType" type="checkbox" id="fileJPG" value="JPG"> JPG
                                                        </label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <label class="form-label " for="fileJPEG">
                                                            <input class="form-check-input code-switcher fileTypes" name="fileType" type="checkbox" id="fileJPEG" value="JPEG"> JPEG
                                                        </label>
                                                    </div>
                                                </div>

                                                <div class="mb-3 multiplefilesbox">
                                                    <label class="form-label ">Select Print Style for PDF</label><br/>
                                                    <div class="form-check form-check-inline">
                                                        <label class="form-label " for="printStyleHorizontal">
                                                            <input class="form-check-input code-switcher printStyles" name="printStyle" type="radio" id="printStyleHorizontal" value="H" checked> Horizontal
                                                        </label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <label class="form-label " for="printStyleVertical">
                                                            <input class="form-check-input code-switcher printStyles" name="printStyle" type="radio" id="printStyleVertical" value="V"> Vertical
                                                        </label>
                                                    </div>
                                                </div>

                                                <div class="mb-3 dateformat">
                                                    <label class="form-label " for="fieldFormat">Select Date Format</label>
                                                    <select name="fieldFormat" id="fieldFormat" class="form-control">
                                                        <option value="">--Select--</option>
                                                        <option value="d-m-Y"><?php echo date("d-m-Y"); ?></option>
                                                        <option value="d/m/Y"><?php echo date("d/m/Y"); ?></option>
                                                        <option value="d F,Y"><?php echo date("d F,Y"); ?></option>
                                                        <option value="F d,Y"><?php echo date("F d,Y"); ?></option>
                                                        <option value="F Y"><?php echo date("F Y"); ?></option>
                                                        <option value="d F"><?php echo date("d F"); ?></option>
                                                        <option value="l, d F, Y"><?php echo date("l, d F, Y"); ?></option>
                                                        <option value="l, F d, Y"><?php echo date("l, F d, Y"); ?></option>
                                                    </select>
                                                </div>

                                                <div class="mb-3 timeformat">
                                                    <label class="form-label " for="fieldFormatTime">Select Time Format</label>
                                                    <select name="fieldFormatTime" id="fieldFormatTime" class="form-control">
                                                        <option value="">--Select--</option>
                                                        <option value="H:i:s">H:i:s</option>
                                                        <option value="h:i:s">h:i:s</option>
                                                        <option value="H:i A">H:i A</option>
                                                        <option value="h:i A">h:i A</option>
                                                    </select>
                                                    <span class="bg-danger"><b>Note:</b> H(24 Hours), h(12 Hours), i(Minutes), s(Seconds), A(AM/PM)</span>
                                                </div>

                                                <div class="mb-3 styling duplicatefield">
                                                    <label for="fieldColor" class="form-label">Label Color</label>
                                                    <input type="color" class="form-control form-control-color w-50" id="fieldColor" placeholder="rgb(249, 6, 6)">
                                                </div>

                                                <div class="mb-3 styling backColor">
                                                    <label for="backColor" class="form-label">Background Color</label>
                                                    <input type="color" class="form-control form-control-color w-50" id="backColor" placeholder="#ffffff">
                                                </div>

                                                <div class="form-check form-switch form-switch-left form-switch-md mb-3 sectionDuplicate">
                                                    <label for="sectionDuplicate" class="form-label ">Allow Duplicate This Section</label>
                                                    <input class="form-check-input code-switcher" type="checkbox" id="sectionDuplicate" value="yes">
                                                </div>

                                                <div class="form-check form-switch form-switch-left form-switch-md mb-3 dynamicTableBox">
                                                    <label for="allowMultiRows" class="form-label ">Allow Duplicate Rows</label>
                                                    <input class="form-check-input code-switcher" type="checkbox" id="allowMultiRows" value="yes">
                                                </div>

                                                <div class="mb-3 templateSelcetionBox">
                                                    <label for="fieldTemplates" class="form-label ">Table Templates</label>
                                                    <select name="fieldTemplates" id="fieldTemplates" class="form-control" multiple>
                                                        <option value="">--Select--</option>
                                                    </select>
                                                </div>

                                                <div class="form-check form-switch form-switch-left form-switch-md mb-3 dynamicTableBox">
                                                    <label for="allowBreakTable" class="form-label ">Allow table to break into two parts</label>
                                                    <input class="form-check-input code-switcher" type="checkbox" id="allowBreakTable" value="yes">

                                                    <div class="breakTableInfoBox mb-3" style="display: none;">
                                                        <select name="fieldFormatTime" id="breakColumn" class="form-control">
                                                            <option value="" selected disabled>--Select Column--</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div class="mb-3 dynamicTableBox">
                                                    <label for="columnFieldVal" class="form-label ">Display column field value:</label>
                                                    <!-- <select name="column_val" id="columnFieldVal" class="form-control"></select> -->
                                                    <input name="column_val" id="columnFieldVal" class="form-control" type="number" placeholder="Enter field sort order">
                                                </div>

                                                <div class="mb-3 dynamicTableBox">
                                                    <label for="columnFieldDisplay" class="form-label ">Display column field:</label>
                                                    <!-- <select name="column_field" id="columnFieldDisplay" class="form-control"></select> -->
                                                    <input name="column_field" id="columnFieldDisplay" class="form-control" type="number" placeholder="Enter field sort order">
                                                </div>

                                                <div class="mb-3 tablestyling">
                                                    <label for="tableSize" class="form-label fw-bold">Table Size</label>
                                                    <div class="mb-3 input-group">
                                                        <span class="input-group-text" id="cols">No. Of Columns</span>
                                                        <input type="text" class="form-control" id="tableCols" placeholder="Eg: 4" value="4">
                                                        <span class="input-group-text" id="rows">No. Of Rows</span>
                                                        <input type="text" class="form-control" id="tableRows" placeholder="Eg: 4" value="4">
                                                    </div>
                                                </div>

                                                <div class="mb-3 tablestyling tablecolumns">
                                                    <label for="tableColSize" class="form-label fw-bold">Table Columns Width:</label>
                                                    <div class="row dcolumns"></div>
                                                </div>

                                                <div class="mb-3 styling duplicatefield">
                                                    <label for="fieldSize" class="form-label">Font Size</label>
                                                    <div class="mb-3 input-group">
                                                        <input type="text" class="form-control" id="fieldSize" placeholder="18">
                                                        <span class="input-group-text" id="px-addon">px</span>
                                                    </div>
                                                </div>

                                                <div class="mb-3 styling duplicatefield">
                                                    <label for="fontWeight" class="form-label">Font Weight</label>
                                                    <select name="fontWeight" id="fontWeight" class="form-control">
                                                        <option value="100">100</option>
                                                        <option value="200">200</option>
                                                        <option value="300">300</option>
                                                        <option value="400">400</option>
                                                        <option value="500">500</option>
                                                        <option value="600">600</option>
                                                        <option value="700">700</option>
                                                        <option value="800">800</option>
                                                        <option value="900">900</option>
                                                    </select>
                                                </div>

                                                <div class="mb-3 tablestyling textAlign">
                                                    <label for="textAlign" class="form-label">Text Align</label><br/>
                                                    <div class="form-check form-check-inline">
                                                        <label class="form-label " for="textLeft">
                                                            <input class="form-check-input code-switcher textAlign" name="textAlign" type="radio" id="textLeft" value="left"> Left
                                                        </label>
                                                    </div>
                                                    
                                                    <div class="form-check form-check-inline">
                                                        <label class="form-label " for="textCenter">
                                                            <input class="form-check-input code-switcher textAlign" name="textAlign" type="radio" id="textCenter" value="center" checked> Center
                                                        </label>
                                                    </div>
                                                    
                                                    <div class="form-check form-check-inline">
                                                        <label class="form-label " for="textRight">
                                                            <input class="form-check-input code-switcher textAlign" name="textAlign" type="radio" id="textRight" value="right"> Right
                                                        </label>
                                                    </div>

                                                </div>

                                                <!--  <div class="form-check form-switch form-switch-left form-switch-md mb-3 tablestyling">
                                                     <label for="tableHeader" class="form-label ">Add Table Header</label>
                                                     <input class="form-check-input code-switcher" type="checkbox" id="tableHeader" value="yes" checked>
                                                 </div> -->



                                                <div class="mb-3 inputs fieldWidth">
                                                    <label for="fieldWidth" class="form-label">Field Width</label>
                                                    <div class="mb-3 input-group">
                                                        <input type="text" class="form-control" id="fieldWidth" placeholder="Eg: 80" minlength="10" maxlength="100">
                                                        <span class="input-group-text" id="per-addon">%</span>
                                                    </div>
                                                </div>

                                                <div class="mb-3">
                                                    <label for="cssClass" class="form-label">Additional CSS Classes</label>
                                                    <div class="input-group">
                                                        <input type="text" class="form-control" id="cssClass" placeholder="class1 class2 ...">
                                                    </div>
                                                </div>

                                                <div class="mb-3 inputs dbFieldBox">
                                                    <label for="sortOrder" class="form-label">Sort Order</label>
                                                    <div class="mb-3 input-group">
                                                        <input type="text" class="form-control" id="sortOrder" placeholder="Eg: 1">
                                                    </div>
                                                </div>

                                                <div class="mb-3 inputs">
                                                    <label for="fieldMin" class="form-label">Min Input Length</label>
                                                    <input type="text" class="form-control" id="fieldMin" placeholder="10">
                                                </div>

                                                <div class="mb-3 inputs">
                                                    <label for="fieldMax" class="form-label">Max Input Length</label>
                                                    <input type="text" class="form-control" id="fieldMax" placeholder="50">
                                                </div>

                                                <div class="mb-3 advancesettingBox">
                                                    <h6 class="text-white p-1 bg-primary">Advanced</h6>
                                                </div>

                                                <div class="mb-3 advancesettingBox">
                                                    <label for="displayRule" class="form-label">PDF Value Display Rule</label>
                                                    <select class="form-control" id="displayRule">
                                                        <option value="" selected>--Select--</option>
                                                        <option value="first">Show first N characters</option>
                                                        <option value="last">Show last N characters</option>
                                                        <option value="before">Show text before a character</option>
                                                        <option value="after">Show text after a character</option>
                                                    </select>
                                                    <div class="mt-3" id="displayValueBox" style="display:none;">
                                                        <label for="displayValueInput" class="form-label" id="displayValueLabel">Input required value</label>
                                                        <input type="text" class="form-control" id="displayValueInput" placeholder="">
                                                        <small class="form-text text-muted" id="displayValueHint">Provide value based on selected rule</small>
                                                    </div>
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

    <div class="offcanvas-footer border-top p-3">
        <div class="row">
            <div class="col-12">
                <button type="button" class="btn btn-success waves-effect waves-light save_close">Save</button>
                <button type="button" class="btn btn-light waves-effect waves-light close-offcanvas" onclick="resetSettings();">Close</button>               
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    $('#displayRule').on('change', function () {
        const selected = $(this).val();
        const $label = $('#displayValueLabel');
        const $input = $('#displayValueInput');
        const $hint = $('#displayValueHint');

        switch (selected) {
            case 'first':
                $label.text('Number of characters to display from the beginning');
                $input.attr('placeholder', 'E.g. 2');
                $hint.text('Example: "Final Circuit" → "Fi" if you enter 2');
                $("#displayValueBox").show();
                break;
            case 'last':
                $label.text('Number of characters to display from the end');
                $input.attr('placeholder', 'E.g. 3');
                $hint.text('Example: "Final Circuit" → "uit" if you enter 3');
                $("#displayValueBox").show();
                break;
            case 'before':
                $label.text('Character to split before');
                $input.attr('placeholder', 'E.g. -');
                $hint.text('Example: "F - Final Circuit" → "F" if you enter "-"');
                $("#displayValueBox").show();
                break;
            case 'after':
                $label.text('Character to split after');
                $input.attr('placeholder', 'E.g. -');
                $hint.text('Example: "F - Final Circuit" → "Final Circuit" if you enter "-"');
                $("#displayValueBox").show();
                break;
            default:
                $label.text('Value');
                $input.attr('placeholder', 'Enter value...');
                $hint.text('Select a display rule to see what to enter.');
                $("#displayValueBox").hide();
        }
    });
</script>
