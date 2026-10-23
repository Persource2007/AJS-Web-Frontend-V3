const $newSection = '<table cellspacing="0" class=sectionStart style="overflow:wrap;width:100%;border-width:5px;border-style:solid;border-color:#c00000"><thead><th data-sort-order="{POSITION}" class=sectionTitle data-bcolor=#c00000 data-color=#ffffff style="padding:4px 8px;color: #ffffff;background: #c00000;font-size: 16px;font-weight: 600;">PART {PART_NUMBER} : Click To Edit This Text...</th></thead><tbody><tr><td class="row-sec" style="padding:8px;"><table cellspacing="0" class="text-center bg-white main-section mb-0 p-2 table table-bordered" style="width:100%" cellpadding=10><tbody><tr><td style=width:50% class="child-sec droppable resizable"><h2 class=text-center>+</h2></td><td style=width:50% class="child-sec droppable resizable"><h2 class=text-center>+</h2></td></tr></tbody></table><div class=addchilebtn><button class="btn btn-secondary btn-sm float-end newPart"><i class="align-bottom ri-add-fill"></i> Add New Child</button></div></td></tr></tbody></table>';
const $newPart = '<table cellspacing="0" style="width:100%;overflow:wrap;" cellpadding="10" class="p-2 bg-white main-section table table-bordered text-center mb-0"><tbody><tr><td style="width:50%" class="resizable child-sec droppable"><h2 class="text-center">+</h2></td><td style="width:50%" class="resizable child-sec droppable"><h2 class="text-center">+</h2></td></tr></tbody></table>';
const $childsec = "<td class='resizable child-sec droppable'><h2 class='text-center'>+</h2></td>";
const $formFields = {
    "number": "<div data-section-id='{{SECTIONID}}' data-field-uid='{{UNIQUEID}}' style='font-size:12px;padding 4px;' class='inputOption form-input bg-gray {{UNIQCLSS}}'><label style='font-size:10px;' class='label-text' for=''>Number</label><input type='number' placeholder='10' class='input' name='{{NAME}}'></div>",
    "phone": "<div data-section-id='{{SECTIONID}}' data-field-uid='{{UNIQUEID}}' style='font-size:12px;padding 4px;' class='inputOption form-input bg-gray {{UNIQCLSS}}'><label style='font-size:10px;' class='label-text' for=''>Phone Number</label><input type='number' placeholder='+91-000000000' class='input' name='{{NAME}}'></div>",
    "email": "<div data-section-id='{{SECTIONID}}' data-field-uid='{{UNIQUEID}}' style='font-size:12px;padding 4px;' class='inputOption form-input bg-gray {{UNIQCLSS}}'><label style='font-size:10px;' class='label-text' for=''>Email</label><input type='email' placeholder='ex: ebc@xyz.com' class='input' name='{{NAME}}'></div>",
    "date": "<div data-section-id='{{SECTIONID}}' data-field-uid='{{UNIQUEID}}' style='font-size:12px;padding 4px;' class='inputOption form-input bg-gray {{UNIQCLSS}}'><label style='font-size:10px;' class='label-text' for=''>Date</label><input type='text' placeholder='DD-MM-YYYY' class='input' name='{{NAME}}'></div>",
    "time": "<div data-section-id='{{SECTIONID}}' data-field-uid='{{UNIQUEID}}' style='font-size:12px;padding 4px;' class='inputOption form-input bg-gray {{UNIQCLSS}}'><label style='font-size:10px;' class='label-text' for=''>Time</label><input type='text' placeholder='--:-- --' class='input' name='{{NAME}}'></div>",
    "datetime": "<div data-section-id='{{SECTIONID}}' data-field-uid='{{UNIQUEID}}' style='font-size:12px;padding 4px;' class='inputOption form-input bg-gray {{UNIQCLSS}}'><label style='font-size:10px;' class='label-text' for=''>Date Time</label><input type='text' placeholder='DD-MM-YY --:-- --' class='input' name='{{NAME}}'></div>",
    "text": "<div data-section-id='{{SECTIONID}}' data-field-uid='{{UNIQUEID}}' style='font-size:12px;padding 4px;' class='inputOption form-input bg-gray {{UNIQCLSS}}'><label style='font-size:10px;' class='label-text' for=''>Single&nbsp;Text</label><input type='text' placeholder='Single Text' class='input' name='{{NAME}}'></div>",
    "textarea": "<div data-section-id='{{SECTIONID}}' data-field-uid='{{UNIQUEID}}' style='font-size:12px;padding 4px;' class='inputOption form-input bg-gray {{UNIQCLSS}}'><label style='font-size:10px;' class='label-textarea' for=''>Paragraph&nbsp;Text</label><textarea class='input' placeholder='Paragraph Text' name='{{NAME}}'></textarea></div>",
    "checkbox": "<div data-section-id='{{SECTIONID}}' data-field-uid='{{UNIQUEID}}' style='font-size:12px;padding 4px;' class='inputOption form-check bg-gray {{UNIQCLSS}}'><label style='font-size:10px;' class='label-textarea' for=''>Checkbox</label><label style='font-size:10px;' class='label-text'><input class='form-check-input' type='checkbox' name='{{NAME}}'>Option 1</label></div>",
    "radio": "<div data-section-id='{{SECTIONID}}' data-field-uid='{{UNIQUEID}}' style='font-size:12px;padding 4px;' class='inputOption form-check bg-gray {{UNIQCLSS}}'><label style='font-size:10px;' class='label-textarea' for=''>Radio&nbsp;Button</label><label style='font-size:10px;' class='label-text'><input class='form-check-input' type='radio' name='{{NAME}}'>Option 1</label></div>",
    "select": "<div data-section-id='{{SECTIONID}}' data-field-uid='{{UNIQUEID}}' style='font-size:12px;padding 4px;' class='inputOption form-input bg-gray {{UNIQCLSS}}'><label style='font-size:10px;' class='label-textarea' for=''>Dropdown</label><select class='select' name='{{NAME}}'><option>Option 1</option></select></div>",
    "file": "<div data-section-id='{{SECTIONID}}' data-field-uid='{{UNIQUEID}}' style='font-size:12px;padding 4px;' class='inputOption form-input bg-gray {{UNIQCLSS}}'><label style='font-size:10px;' class='label-text' for=''>File&nbsp;Upload</label><input type='file'  class='input' name='{{NAME}}'></div>",
    "file_caption": "<div data-section-id='{{SECTIONID}}' data-field-uid='{{UNIQUEID}}' style='font-size:12px;padding 4px;' class='inputOption form-input bg-gray {{UNIQCLSS}}'><label style='font-size:10px;' class='label-text' for=''>File&nbsp;Upload&nbsp;With&nbsp;Caption</label><input type='text'  class='input' name='{{NAMECAPTION}}' placeholder='Enter text here..'><input type='file'  class='input' name='{{NAME}}'></div>",
    "sign": "<div data-section-id='{{SECTIONID}}' data-field-uid='{{UNIQUEID}}' style='font-size:12px;padding 4px;' class='inputOption form-input bg-gray {{UNIQCLSS}}'><label style='font-size:10px;' class='label-text' for=''>Signature</label><input type='text' readonly class='input' value='Signature' name='{{NAME}}'></div>",
    "title": "<div data-section-id='{{SECTIONID}}' data-field-uid='{{UNIQUEID}}' data-color='#000' type='title' class='fTitle {{UNIQCLSS}}' style='width:100%;color:#000;font-size:14px;font-weight:bold;text-align:left;'>Click To Edit This Text...</div>",
    "heading": "<div data-section-id='{{SECTIONID}}' data-field-uid='{{UNIQUEID}}' data-color='#000' type='heading' class='fHeading {{UNIQCLSS}}' style='width:100%;color:#000;font-size:14px;font-weight:bold;text-align:left;'>Click To Edit This Text...</div>",
    "dheading": "<div data-section-id='{{SECTIONID}}' data-field-uid='{{UNIQUEID}}' data-color='#000' type='heading' class='dHeading {{UNIQCLSS}}' style='width:100%;color:#000;font-size:14px;font-weight:bold;text-align:left;'>Click To Edit This Text...</div>",
    "description": "<div data-section-id='{{SECTIONID}}' data-field-uid='{{UNIQUEID}}' data-color='#000' type='description' class='fDescription {{UNIQCLSS}}' style='width:100%;color:#000;font-size:10px;font-weight:normal;text-align:left;'>Click To Edit This Text...</div>",
    "line": "<hr style='opacity:0.75;margin:0;'/>",
    "table": "<div data-field-uid='{{UNIQUEID}}' type='table' class='fTable {{UNIQCLSS}}'><table cellspacing='0' data-color='#000000' data-bcolor='#ffffff' style='overflow:wrap;width:100%;border:1px solid #000;color:#000000;background:#ffffff;font-size:15px;text-align:left;font-weight:normal;'><tbody><tr><td class='resizable droppable' style='border:1px solid #000;'><h2 class='text-center'>+</h2></td><td class='resizable droppable' style='border:1px solid #000;'><h2 class='text-center'>+</h2></td></tr><tr><td class='resizable droppable' style='border:1px solid #000;'><h2 class='text-center'>+</h2></td><td class='resizable droppable' style='border:1px solid #000;'><h2 class='text-center'>+</h2></td></tr><tr><td class='resizable droppable' style='border:1px solid #000;'><h2 class='text-center'>+</h2></td><td class='resizable droppable' style='border:1px solid #000;'><h2 class='text-center'>+</h2></td></tr></tbody></table></div>",
    "dtable": "<div data-section-id='{{SECTIONID}}' data-field-uid='{{UNIQUEID}}' type='table' class='dynamicTable {{UNIQCLSS}}'><table cellspacing='0' data-label='' data-color='#000000' data-bcolor='#ffffff' style='overflow:wrap;width:100%;border:1px solid #000;color:#000000;background:#ffffff;font-size:15px;text-align:left;font-weight:normal;'><tbody><tr><td class='resizable droppable' style='border:1px solid #000;'><h2 class='text-center'>+</h2></td><td class='resizable droppable' style='border:1px solid #000;'><h2 class='text-center'>+</h2></td><td class='resizable droppable' style='border:1px solid #000;'><h2 class='text-center'>+</h2></td></tr></tbody></table></div>",
    "tableTemplate": "<div data-section-id='{{SECTIONID}}' data-field-uid='{{UNIQUEID}}' type='table' class='dynamicTable {{UNIQCLSS}}'><table cellspacing='0' data-label='' data-color='#000000' data-bcolor='#ffffff' style='overflow:wrap;width:100%;border:1px solid #000;color:#000000;background:#ffffff;font-size:15px;text-align:left;font-weight:normal;'><tbody><tr><td class='resizable' style='border:1px solid #000;'><h2 class='text-center'>Templates</h2></td></tr></tbody></table></div>",
    "dbfield": "<div data-section-id='{{SECTIONID}}' data-field-uid='{{UNIQUEID}}' class='dbFields {{UNIQCLSS}}' data-color='#000000' style='color:#000;text-align:left;font-size:12px;padding:4px;font-weight:500;'>{{Click to edit and select}}</div>",
    "logo": "<div type='logo' class='logoUpload {{UNIQCLSS}}' style='width:80px;height:80px;'></div>",
}
let choiceOtherOptions = '';
const assesmentAttributeOption = "ATTRIBUTE_CONTROLLED_FIELD";
$(document).ready(function () {
    choiceOtherOptions = new Choices($('#otherFieldOptions')[0], { placeholder: true, placeholderValue: 'Add options', allowHTML: true, removeItemButton: true, shouldSort: false, duplicateItemsAllowed: false, addItemFilter: function (value) { return $.trim(value) } });
})
const allowInterconnectionAttributes = ['text', 'select', 'radio', 'date', 'datetime', 'time', 'checkbox', 'number', 'phone', 'email', 'textarea', 'file', 'file_caption', 'signature'];
const allowCustomInputFields = ['select', 'radio', 'checkbox'];
let resetSorting = false;
function closeStyleForm() {
    $('#field-settings').offcanvas('hide');
}

function showStyleForm() {
    closeStyleForm();
    setTimeout(function () { $('#field-settings').offcanvas('show'); }, 200);
}

function resetStyleForm() {
    document.getElementById('fieldSettingForm').reset();
    var $form = $('#fieldSettingForm');
    $form.find('.pageOrientationType, .sectiontitilebox').remove();
    $form.find('.mobileAppHidden, .pdfVisibility').remove();
    $form.find('.showInlineData, .inlineDataSetting').remove();
    $form.find('.dynamicField').remove();
    $form.find('.displayStyle').hide();
    $form.find('.multipleoptionsbox').hide();
    $form.find('.fillableOptions').hide();
    $form.find('.multiplefilesbox').hide();
    $form.find('.advancesettingBox').hide();
    $form.find('.selectbox').hide();
    $form.find('.radiooptions').hide();
    $form.find('.checkboxoptions').hide();
    $form.find('.tablestyling').hide();
    $form.find('.styling').show();
    $form.find('.backColor').hide();
    $form.find('.dbFieldBox').hide();
    $form.find('.inputs').show();
    $form.find('.sectionDuplicate').hide();
    $form.find('.templateSelcetionBox').hide();
    $form.find('.borderDiv').show();
    $form.find('.dynamicTableBox').hide();
    $form.find('.dropdownbox').hide();
    $form.find('.optionsbox').hide();
    $form.find('#showAllOpt').prop("checked", false);
    $form.find('#showIcons').prop("checked", false);
    $form.find("#parent_field_box").remove();
    $form.find("#duplicateField").removeAttr("disabled");
    $form.find(".fieldOptionsColor, .optionsBgColor, .optionsColor").remove();
    $form.find("#customColorPicker").remove();
    $form.find(".reportDataFieldBox").remove();
    // $form.find('.formulasbox').hide();
    $form.find('.dateformat,.timeformat').hide();
    $('div,td,table,h1,h2,h3,h4,h5,h6,th,span').removeClass("changestyling");
    $form.find("#tableRows").removeAttr('readonly').removeAttr('disabled');
    $form.find('.dropdownfieldBox').hide();
    $form.find(".showColorInPDF").remove(); // color options 2
    $form.find("#fieldLabel").removeAttr("disabled").removeAttr("readonly");
    $form.find("#assesmentActionOptions").parent().remove();
    $form.find("#assesmentActionRulesContainer").remove();
    add_validation_btn();
    changeFieldType();
    setpaddingfield();
}

function resetSettings() {
    resetStyleForm();
    closeStyleForm();
}

function dragdrop() {
    setUpEventListeners();
    enableSortables();
}

function setUpEventListeners() {
    var drag_items = $('#fields_form li.nav-item span');
    var drop_items = $('.main-section').find('.droppable');

    drag_items.each(function () {
        var thisDrag = $(this);
        thisDrag[0].addEventListener('dragstart', dragStart, true);
        thisDrag[0].addEventListener('drag', dragNow, true);
        thisDrag[0].addEventListener('dragend', dragEnd, true);
    });
    $('.droppable').filter(function () {
        return !$(this).closest('.dynamicTable').length;
    }).off().on({
        dragenter: dragEnter,
        dragover: dragOver,
        dragleave: dragLeave,
        drop: dropNow
    });
}

//called as soon as the draggable starts being dragged
//used to set up data and options
function dragStart(event) {
    drag = event.target;
    dragItem = event.target;
    $(drag).addClass('drag-active');
}

//called continually as the draggable is dragged
function dragNow(event) { }

//called when the draggable has been released (either on droppable or not)
//may be called on invalid or valid drop
function dragEnd(event) {
    var drag = this;
    $(drag).removeClass('drag-active');
}

//called as the draggable enters a droppable
//needs to return false to make droppable area valid
function dragEnter(event) {
    var drop = this;
    $(drop).addClass('drop-active');
    event.preventDefault();
    event.stopPropagation();
}

//called continually while the draggable is over a droppable
//needs to return false to make droppable area valid
function dragOver(event) {
    var drop = this;
    $(drop).addClass('drop-active');
    event.preventDefault();
    event.stopPropagation();
}

//called when the draggable was inside a droppable but then left
function dragLeave(event) {
    var drop = this;
    $(drop).removeClass('drop-active');
}

//called when draggable is dropped on droppable
//final process, used to copy data or update UI on successful drop
function dropNow(event) {
    var drop = this;
    $(drop).removeClass('drop-active');
    $(drop).addClass('correct');

    var dataType = $(dragItem).attr('data-type');
    var dropCheck = $(drop).text();

    // 
    if ($(drop).parents('div').hasClass('dynamicTable')) {
        if (dataType == 'dtable' || dataType == 'table') {
            // alert("This field is not allowed for dropping in the selected section.");
            Swal.fire({
                icon: 'error',
                title: 'Validation Error!!!',
                text: 'This field is not allowed for dropping in the selected section.'
            })
            return false;
        }
        $(drop).off();
    }
    //
    // header/footer
    if ($(drop).parents('div').is('#headerPreview')) {
        headerAllowFields = ["title", "heading", "description", "logo"];
        if ($.inArray(dataType, headerAllowFields) < 0) {
            alert("This field is not allowed for dropping in the header and footer"); return false;
        }
    }
    // header/footer

    if (dropCheck == '+') {
        $(drop).empty();
    }
    var datenow = new Date();
    var month = datenow.getMonth();
    var day = datenow.getDate();
    var year = datenow.getFullYear();
    var time = datenow.getTime();
    var unq = day + '' + month + '' + time + '' + year;
    var unqId = time + '' + year + '' + day + '' + month;

    var $is_dyna = 1;
    var newData = {};

    var section = $(drop).closest('.sectionStart').index();
    if (dataType == 'text') {
        $(drop).append($formFields.text.replace('{{UNIQCLSS}}', 'text_' + unq).replace('{{NAME}}', 'text_' + unq).replace('{{UNIQUEID}}', unq).replace('{{SECTIONID}}', section));
        newData = { 'field_type': 'text', 'field_label': 'Single Text', 'name': 'text_' + unq, 'default_value': '', 'is_required': 0, 'show_label': 1, 'color': '#000', 'options': [], 'min_length': 0, 'max_length': 250, 'format': '' }
    }
    else if (dataType == 'textarea') {
        $(drop).append($formFields.textarea.replace('{{UNIQCLSS}}', 'textarea_' + unq).replace('{{NAME}}', 'textarea_' + unq).replace('{{UNIQUEID}}', unq).replace('{{SECTIONID}}', section));
        newData = { 'field_type': 'textarea', 'field_label': 'Paragraph Text', 'name': 'textarea_' + unq, 'default_value': '', 'is_required': 0, 'show_label': 1, 'color': '#000', 'options': [], 'min_length': 0, 'max_length': 250, 'format': '' }
    }
    else if (dataType == 'date') {
        $(drop).append($formFields.date.replace('{{UNIQCLSS}}', 'date_' + unq).replace('{{NAME}}', 'date_' + unq).replace('{{UNIQUEID}}', unq).replace('{{SECTIONID}}', section));
        newData = { 'field_type': 'date', 'field_label': 'Date', 'name': 'date_' + unq, 'default_value': '', 'is_required': 0, 'show_label': 1, 'color': '#000', 'options': [], 'min_length': 0, 'max_length': 250, 'format': 'd-m-Y.' }
    }
    else if (dataType == 'time') {
        $(drop).append($formFields.time.replace('{{UNIQCLSS}}', 'time_' + unq).replace('{{NAME}}', 'time_' + unq).replace('{{UNIQUEID}}', unq).replace('{{SECTIONID}}', section));
        newData = { 'field_type': 'time', 'field_label': 'Time', 'name': 'time_' + unq, 'default_value': '', 'is_required': 0, 'show_label': 1, 'color': '#000', 'options': [], 'min_length': 0, 'max_length': 250, 'format': '.H:i:s' }
    }
    else if (dataType == 'datetime') {
        $(drop).append($formFields.datetime.replace('{{UNIQCLSS}}', 'datetime_' + unq).replace('{{NAME}}', 'datetime_' + unq).replace('{{UNIQUEID}}', unq).replace('{{SECTIONID}}', section));
        newData = { 'field_type': 'datetime', 'field_label': 'Date Time', 'name': 'datetime_' + unq, 'default_value': '', 'is_required': 0, 'show_label': 1, 'color': '#000', 'options': [], 'min_length': 0, 'max_length': 250, 'format': 'd-m-Y.H:i:s' }
    }
    else if (dataType == 'select') {
        $(drop).append($formFields.select.replace('{{UNIQCLSS}}', 'select_' + unq).replace('{{NAME}}', 'select_' + unq).replace('{{UNIQUEID}}', unq).replace('{{SECTIONID}}', section));
        newData = { 'field_type': 'select', 'field_label': 'Dropdown', 'name': 'select_' + unq, 'default_value': '', 'is_required': 0, 'show_label': 1, 'color': '#000', 'options': [], 'min_length': 0, 'max_length': 250, 'format': '' }
    }
    else if (dataType == 'radio') {
        $(drop).append($formFields.radio.replace('{{UNIQCLSS}}', 'radio_' + unq).replace('{{NAME}}', 'radio_' + unq).replace('{{UNIQUEID}}', unq).replace('{{SECTIONID}}', section));
        newData = { 'field_type': 'radio', 'field_label': 'Radio Button', 'name': 'radio_' + unq, 'default_value': '', 'is_required': 0, 'show_label': 1, 'color': '#000', 'options': [], 'min_length': 0, 'max_length': 250, 'format': '' }
    }
    else if (dataType == 'checkbox') {
        $(drop).append($formFields.checkbox.replace('{{UNIQCLSS}}', 'checkbox_' + unq).replace('{{NAME}}', 'checkbox_' + unq).replace('{{UNIQUEID}}', unq).replace('{{SECTIONID}}', section));
        newData = { 'field_type': 'checkbox', 'field_label': 'Checkbox', 'name': 'checkbox_' + unq, 'default_value': '', 'is_required': 0, 'show_label': 1, 'color': '#000', 'options': [], 'min_length': 0, 'max_length': 250, 'format': '' }
    }
    else if (dataType == 'file') {
        $(drop).append($formFields.file.replace('{{UNIQCLSS}}', 'file_' + unq).replace('{{NAME}}', 'file_' + unq).replace('{{UNIQUEID}}', unq).replace('{{SECTIONID}}', section));
        newData = { 'field_type': 'file', 'field_label': 'File Upload', 'name': 'file_' + unq, 'default_value': '', 'is_required': 0, 'show_label': 1, 'color': '#000', 'options': [], 'min_length': 0, 'max_length': 250, 'format': '' }
    }
    else if (dataType == 'file_caption') {
        $(drop).append($formFields.file_caption.replace('{{UNIQCLSS}}', 'filecaption_' + unq).replace('{{NAME}}', 'filecaption_' + unq).replace('{{NAMECAPTION}}', 'filetext_' + unq).replace('{{UNIQUEID}}', unq).replace('{{SECTIONID}}', section));
        newData = { 'field_type': 'file_caption', 'field_label': 'File Upload With Caption', 'name': 'filecaption_' + unq, 'name2': 'filetext_' + unq, 'default_value': '', 'is_required': 0, 'show_label': 1, 'color': '#000', 'options': [], 'min_length': 0, 'max_length': 250, 'format': '' }
    }
    else if (dataType == 'signature') {
        $(drop).append($formFields.sign.replace('{{UNIQCLSS}}', 'sign_' + unq).replace('{{NAME}}', 'sign_' + unq).replace('{{UNIQUEID}}', unq).replace('{{SECTIONID}}', section));
        newData = { 'field_type': 'signature', 'field_label': 'Signature', 'name': 'sign_' + unq, 'default_value': '', 'is_required': 0, 'show_label': 1, 'color': '#000', 'options': [], 'min_length': 0, 'max_length': 250, 'format': '' }
    }
    else if (dataType == 'email') {
        $(drop).append($formFields.email.replace('{{UNIQCLSS}}', 'email_' + unq).replace('{{NAME}}', 'email_' + unq).replace('{{UNIQUEID}}', unq).replace('{{SECTIONID}}', section));
        newData = { 'field_type': 'email', 'field_label': 'Email', 'name': 'email_' + unq, 'default_value': '', 'is_required': 0, 'show_label': 1, 'color': '#000', 'options': [], 'min_length': 0, 'max_length': 250, 'format': '' }
    }
    else if (dataType == 'phone') {
        $(drop).append($formFields.phone.replace('{{UNIQCLSS}}', 'phone_' + unq).replace('{{NAME}}', 'phone_' + unq).replace('{{UNIQUEID}}', unq).replace('{{SECTIONID}}', section));
        newData = { 'field_type': 'phone', 'field_label': 'Phone Number', 'name': 'phone_' + unq, 'default_value': '', 'is_required': 0, 'show_label': 1, 'color': '#000', 'options': [], 'min_length': 0, 'max_length': 250, 'format': '' }
    }
    else if (dataType == 'number') {
        $(drop).append($formFields.number.replace('{{UNIQCLSS}}', 'number_' + unq).replace('{{NAME}}', 'number_' + unq).replace('{{UNIQUEID}}', unq).replace('{{SECTIONID}}', section));
        newData = { 'field_type': 'number', 'field_label': 'Number', 'name': 'number_' + unq, 'default_value': '', 'is_required': 0, 'show_label': 1, 'color': '#000', 'options': [], 'min_length': 0, 'max_length': 250, 'format': '' }
    }
    else if (dataType == 'title') {
        $(drop).append($formFields.title.replace('{{UNIQCLSS}}', 'title_' + unq).replace('{{UNIQUEID}}', unq).replace('{{SECTIONID}}', section));
        $is_dyna = 0;
    }
    else if (dataType == 'dheading') {
        $(drop).append($formFields.dheading.replace('{{UNIQCLSS}}', 'heading_' + unq).replace('{{UNIQUEID}}', unq).replace('{{SECTIONID}}', section));
        newData = { 'field_type': 'heading', 'field_label': 'Click To Edit This Text...', 'name': 'heading_' + unq, 'default_value': '', 'is_required': 0, 'show_label': 1, 'color': '#000', 'options': [], 'min_length': 0, 'max_length': 250, 'format': '' }
    }
    else if (dataType == 'heading') {
        $(drop).append($formFields.heading.replace('{{UNIQCLSS}}', 'heading_' + unq).replace('{{UNIQUEID}}', unq).replace('{{SECTIONID}}', section));
        $is_dyna = 0;
    }
    else if (dataType == 'description') {
        $(drop).append($formFields.description.replace('{{UNIQCLSS}}', 'description_' + unq).replace('{{UNIQUEID}}', unq).replace('{{SECTIONID}}', section));
        $is_dyna = 0;
    }
    else if (dataType == 'logo') {
        $(drop).append($formFields.logo.replace('{{UNIQCLSS}}', 'logo_' + unq));
        $is_dyna = 0;
    }
    else if (dataType == 'table') {
        $(drop).append($formFields.table.replace('{{UNIQCLSS}}', 'table_' + unq).replace('{{UNIQUEID}}', unq).replace('{{SECTIONID}}', section));
        $is_dyna = 0;
        $(".table_" + unq + " .droppable").on({
            dragenter: dragEnter,
            dragover: dragOver,
            dragleave: dragLeave,
            drop: dropNow
        });
    }
    else if (dataType == 'dtable') {
        $(drop).append($formFields.dtable.replace('{{UNIQCLSS}}', 'dtable_' + unq).replace('{{UNIQUEID}}', unq).replace('{{SECTIONID}}', section));
        newData = { 'field_type': 'table', 'name': 'table_' + unq, 'columns': 3, 'rows': 1, 'allow_duplicate_row': 0, options: [] };
        $(".dtable_" + unq + " .droppable").on({
            dragenter: dragEnter,
            dragover: dragOver,
            dragleave: dragLeave,
            drop: dropNow
        });
    }
    else if (dataType == 'tabletemplate') {
        $(drop).append($formFields.tableTemplate.replace('{{UNIQCLSS}}', 'dtable_' + unq).replace('{{UNIQUEID}}', unq).replace('{{SECTIONID}}', section));
        newData = { 'field_type': 'tableTemplate', 'name': 'tableTemplate_' + unq, 'columns': 3, 'rows': 1, 'allow_duplicate_row': 0, options: [], 'is_required': 0 };
        // $(".tableTemplate_" + unq + " .droppable").on({
        //     dragenter: dragEnter,
        //     dragover: dragOver,
        //     dragleave: dragLeave,
        //     drop: dropNow
        // });
    }
    else if (dataType == 'line') {
        $(drop).append($formFields.line);
        $is_dyna = 0;
    }
    else if (dataType == 'dbfield') {
        $(drop).append($formFields.dbfield.replace('{{UNIQCLSS}}', 'dbfield_' + unq).replace('{{UNIQUEID}}', unq).replace('{{SECTIONID}}', section));
        newData = { 'field_type': 'dbfield', 'field_label': 'Client', 'name': 'dbfield_' + unq, 'default_value': '', 'is_required': 0, 'show_label': 1, 'color': '#000', 'options': [], 'min_length': 0, 'max_length': 250, 'format': '' }
    }

    if ($is_dyna == 1) {
        newData['font_size'] = 13;
        newData['show_border'] = 0;
        newData['field_width'] = 100;
        newData['allow_multi_dropdown'] = 0;
        newData['allow_multi_file'] = 0;
        newData['show_opt_val'] = 1;
        newData['allow_file_types'] = [];
        newData['allow_duplicate_row'] = 0;
        newData['table_rows'] = [];
        newData['auto_fill'] = [];
        newData['allow_gallery'] = 0;
        newData['sort_order'] = 0;
        newData['is_dynamic_options'] = 0;
        // newData['formula_attribute'] = '';
        newData['connection_attribute'] = '';
        newData['max_file_size_length'] = 10;
        // newData['format'] = '';
        $('.form-build').find("[data-field-uid='" + unq + "']").attr('data-field-json', JSON.stringify(newData));
    }
    event.preventDefault();
    event.stopPropagation();
}

// section actions button code start
$(document).on("mouseenter", ".form-build .main-section td.child-sec, td.child-sec", function () {
    var $remove = "<div class='actions'>";
    $remove += "<span class='setting-sec btn btn-sm btn-success btn-icon waves-effect waves-light m-1'><i class='ri-settings-2-line'></i></span>";
    $remove += "<span class='copy-sec btn btn-sm btn-info btn-icon waves-effect waves-light m-1'><i class='ri-file-copy-fill'></i></span>";
    $remove += "<span class='remove btn btn-sm btn-danger btn-icon waves-effect waves-light m-1'><i class='ri-delete-bin-5-line'></i></span>";
    $remove += "</div>";
    $(this).find('.actions').remove();
    $(this).append($remove);
});

$(document).on("mouseleave", ".form-build .main-section td.child-sec, td.child-sec", function () {
    $(this).find('.actions').remove();
});
// section actions button code end

// add new section code start
$(document).on("click", ".addNewSection", function (event) {
    var secNos = $('.form-build .sectionStart').length;
    $('.form-build').append($newSection.replace("{PART_NUMBER}", secNos + 1).replace("{POSITION}", secNos + 1));
    $('.droppable').off().on({
        dragenter: dragEnter,
        dragover: dragOver,
        dragleave: dragLeave,
        drop: dropNow
    });
    event.preventDefault();
    event.stopPropagation();
});
// add new section code end

// copy/add row code start
$(document).on("click", ".newPart", function (event) {
    var $new_row = $newPart;
    var drop_items = $($new_row).find('.droppable');
    var index = $(this).parents('.row-sec').find('.table:last').index();
    $(this).parents('.row-sec').find('.table:nth-child(' + (index + 1) + ')').after($new_row);
    $('.droppable').off().on({
        dragenter: dragEnter,
        dragover: dragOver,
        dragleave: dragLeave,
        drop: dropNow
    });
    event.preventDefault();
    event.stopPropagation();
});
// copy/add row code end

// copy/add column code start
$(document).on("click", "td .actions .copy-sec", function (event) {
    $(this).closest('tr').append($childsec);
    $('.droppable').off().on({
        dragenter: dragEnter,
        dragover: dragOver,
        dragleave: dragLeave,
        drop: dropNow
    });
    setColumnsSize($(this), 'A');
    event.preventDefault();
    event.stopPropagation();
});
function setColumnsSize(obj, type) {
    var cols = $(obj).closest('tr').find('td.child-sec');
    var colNo = cols.length;
    if (type == 'R') { colNo -= 1; }
    var wdth = 100 / colNo;
    cols.each((e, tar) => {
        $(tar).css('width', wdth + '%');
    });
}
// copy/add column code end

// remove column code start
$(document).on("click", "td .actions .remove", function (e) {
    e.preventDefault();
    $target = $(this);
    var msg = "Are you sure you want to delete this section & Fields?"
    if (confirm(msg)) {
        setColumnsSize($target, 'R');
        if ($target.closest("table").find("td").length <= 1) {
            $target.closest("table").remove();
        } else {
            $target.closest('td').remove();
        }
    }
    e.stopPropagation();
})
// remove column code end

// remove field/sections code start
$(document).on("click", "#deleteField", function (e) {
    e.preventDefault();
    var $form = $('#fieldSettingForm');
    var fieldType = $form.find('#fieldType').val();
    var fieldName = $form.find('#fieldName').val();
    var $target = $('.changestyling');

    if (fieldType == 'Main Section') {
        var msg = "Are you sure you want to delete this section & Fields?"
        if (confirm(msg)) {
            $target.parents('.sectionStart').remove();
        }
    }
    else if (fieldType == 'Child Section') {
        var msg = "Are you sure you want to delete this section & Fields?"
        if (confirm(msg)) {
            setColumnsSize($target, 'R');
            $target.remove();
        }
    } else if (fieldType == 'Title' || fieldType == 'Heading' || fieldType == 'Description' || fieldType == 'DB Field' || fieldType == 'Dynamic Heading') {
        var msg = "Are you sure you want to delete this Field?"
        var tar = $target.closest('td');
        if (confirm(msg)) {
            $target.remove();
        }
        if (tar.html() == '') {
            tar.html("<h2 class='text-center'>+</h2>");
            tar.off().on({
                dragenter: dragEnter,
                dragover: dragOver,
                dragleave: dragLeave,
                drop: dropNow
            });
        }
    } else if (fieldType == 'Table' || fieldType == 'Dynamic Table' || fieldType == 'Table Templates') {
        var msg = "Are you sure you want to delete this Table?"
        var tar = $target.closest('td');
        if (confirm(msg)) {
            $target.parent().remove();
        }
        if (tar.html() == '') {
            tar.html("<h2 class='text-center'>+</h2>");
            tar.off().on({
                dragenter: dragEnter,
                dragover: dragOver,
                dragleave: dragLeave,
                drop: dropNow
            });
        }
    } else if (fieldName != '') {
        var msg = "Are you sure you want to delete this field?";
        var tar = $('div.' + fieldName).parent();
        if (confirm(msg)) {
            $('div.' + fieldName).remove();
        }
        if (tar.html() == '') {
            tar.html("<h2 class='text-center'>+</h2>");
            tar.off().on({
                dragenter: dragEnter,
                dragover: dragOver,
                dragleave: dragLeave,
                drop: dropNow
            });
        }
    }
    closeStyleForm();
    e.stopPropagation();
})
// remove field/sections code end

// save settings start
$(document).on("click", ".save_close", function (e) {
    e.preventDefault();
    var $form = $('#fieldSettingForm');
    var fieldType = $form.find('#fieldType').val();
    var fieldName = $form.find('#fieldName').val();
    var fieldLabel = $form.find('#fieldLabel').val();
    var display_rule = $form.find('#displayRule').val();
    var display_input = $form.find('#displayValueInput').val();
    var enableOtherOption = $form.find('#enableOtherOption:checked').val();
    var otherFieldOptions = $form.find('#otherFieldOptions').val().split(",").map(s => s.trim()).filter(s => s.length > 0);
    let errorMsg = '';

    if (!$.trim(fieldLabel) && $form.find('#fieldLabel').parent().css("display") != "none") {
        errorMsg = 'Field Label is required.';
    }
    else if ($.trim(display_rule) && !$.trim(display_input)) {
        errorMsg = 'Please enter a value for the selected display rule.';
    }
    else if (enableOtherOption == 'yes' && otherFieldOptions.length < 1) {
        errorMsg = 'Please enter at least one valid custom option (e.g., "Other", "Specify").';
    }

    if (errorMsg) {
        Swal.fire({
            icon: 'error',
            title: 'Validation Error!',
            text: errorMsg
        });
        return false;
    }

    if (fieldType == 'Main Section') {
        saveSectionTitle();
    } else if (fieldType == 'Child Section') {
        saveChildSection();
    } else if (fieldType == 'Title' || fieldType == 'Heading' || fieldType == 'Description') {
        saveStaticFields();
    } else if (fieldType == 'Table') {
        saveTableField(false);
    } else if (fieldType == 'Dynamic Table') {
        saveTableField(true);
    } else if (fieldType == 'Table Templates') {
        saveTableTemplateField();
    } else if (fieldType == 'Dynamic Heading') {
        saveDynamicHeading();
    } else if (fieldType == 'DB Field') {
        // saveDBFields();
        if (saveDBFields() === false) {
            return false;
        }
    }
    // if(fieldName != '' && fieldName != ' '){ saveInputFields(); }
    if ($.trim(fieldName) != '') {
        if (updateReportDataField() === false) {
            return false;
        }
        saveInputFields();
    }
    Toastify({
        text: "Setting saved successfully.",
        duration: 5000,
        destination: '',
        gravity: "top", // `top` or `bottom`
        position: "right",
        close: true,
        onClick: function () {
            ajs.read_nofification(id)
        }
    }).showToast();
    resetStyleForm();
    closeStyleForm();
    e.preventDefault();
    e.stopPropagation();
});
// save settings end

// edit/save Table field code start
function saveTableTemplateField() {
    var $form = $('#field-settings');
    var $target = $('.changestyling');
    var $target2 = $('.changestyling').parent();
    var reqCheck = $form.find('#reqCheck:checked').val();
    var templates = $form.find('#fieldTemplates option:selected').map(function () {
        return { "id": parseInt($(this).val()) };
    }).get();
    var $data = $target2.attr('data-field-json');
    var fieldData = JSON.parse($data);
    fieldData.is_required = (reqCheck == 'yes') ? 1 : 0;
    fieldData.table_templates = templates;
    fieldData = saveFieldAttribute(fieldData)
    fieldData = update_sortorder(fieldData);
    fieldData = saveinterconnection(fieldData);
    customClasses($target)
    $target2.attr('data-field-json', JSON.stringify(fieldData));
}

function saveTableField(isDynamic) {
    var $form = $('#field-settings');
    var $target = $('.changestyling');
    var $target2 = $('.changestyling').parent();

    var fieldLabel = $form.find('#fieldLabel').val();
    var fieldColor = $form.find('#fieldColor').val();
    var backColor = $form.find('#backColor').val();
    var showBorder = $form.find('#showBorder:checked').val();
    var fontSize = parseInt($form.find('#fieldSize').val());
    var fontWeight = $form.find('#fontWeight').val();
    var fieldWidth = $form.find('#fieldWidth').val();
    var textAlign = $form.find('.textAlign:checked').val();
    // var header = $form.find('#tableHeader:checked').val();
    var allowmultiRows = $form.find('#allowMultiRows:checked').val();

    var cols = $form.find('#tableCols').val();
    var rows = $form.find('#tableRows').val();
    var grows = $('table.changestyling tbody tr').length;
    var gcols = $('table.changestyling tbody tr:first td').length;

    if (isDynamic) {
        var $data = $target2.attr('data-field-json');
        var fieldData = JSON.parse($data);
        fieldData.field_label = $.trim(fieldLabel);
        fieldData.columns = parseInt(cols);
        if (allowmultiRows == 'yes') {
            // rows = 1;
            $target.attr('allow-duplicate-row', 1);
            fieldData.allow_duplicate_row = 1;
        } else {
            $target.removeAttr('allow-duplicate-row');
            fieldData.allow_duplicate_row = 0;
        }
        fieldData.rows = parseInt(rows);
        $target2.attr('data-field-json', JSON.stringify(fieldData));
    }
    var newCol = cols - gcols;
    var newRow = rows - grows;
    // Create header row
    // var headerRow = $('<tr>');
    // if(header == 'yes'){
    //     // for (var j = 0; j < cols; j++) {
    //     //     headerRow.append($('<th>').text('Click to Edit This Header Text..'));
    //     // }
    //     // table.prepend(headerRow);
    // }else{
    //     $(table).find('head').remove();
    // }
    // Create header row

    // Create data rows
    if (newRow > 0) {
        for (var i = 0; i < newRow; i++) {
            var row = $target.find('tbody tr:first').clone();
            row.find('td').html("<h2 class='text-center'>+</h2>");
            $target.append(row);
        }
    } else {
        for (var i = newRow; i < 0; i++) {
            $target.find('tbody tr:last').remove();
        }
    }

    if (newCol > 0) {
        for (var i = 0; i < newCol; i++) {
            $target.find('tbody tr').each(function () {
                $(this).append('<td class="resizable droppable" style=""><h2 class="text-center">+</h2></td>');
            })
        }
    } else {
        for (var i = newCol; i < 0; i++) {
            $target.find('tbody tr').each(function () {
                $(this).find('td:last').remove();
            })
        }
    }

    $target.cssImportant('width', fieldWidth + '%').cssImportant('color', fieldColor).css('backgroundColor', backColor).css('fontSize', fontSize).css('fontWeight', fontWeight).css('textAlign', textAlign);
    $target.attr('data-color', fieldColor).attr('data-bcolor', backColor).attr('data-label', fieldLabel);
    if (showBorder == 'yes') {
        applyBorders($target);
        applyBorders($target.find('td,th'));
    } else {
        applyBorders($target, 0);
        applyBorders($target.find('td,th'), 0);
    }
    customClasses($target);

    $('.tablecolumns .dcolumns input').each(function (tar, ind) {
        var fieldWidth = $.trim($(this).val());
        $target.find('tr').eq(0).find('td').eq(tar).css('width', fieldWidth + '%');
    });

    if ($target2.find("tr").length < 1) {
        $target2.remove();
    }
    $target.find(".droppable").off().on({
        dragenter: dragEnter,
        dragover: dragOver,
        dragleave: dragLeave,
        drop: dropNow
    });

}
function columnsWidth(cols, edit = 0) {
    var wd = (100 / cols).toFixed(2);
    var $target = $('.changestyling');
    $('.tablecolumns .dcolumns').empty();

    for (l = 1; l <= cols; l++) {
        var tdw = l - 1;
        if (edit == 1) {
            var wdp = $target.css('width');
            wd = $target.find('tr').eq(0).find('td').eq(tdw).css('width');
            wd = Math.round((parseFloat(wd) / parseFloat(wdp)) * 100);
        }
        $('.tablecolumns .dcolumns').append(`<div class='col-md-6 col-lg-6 col-sm-12 mb-2'><label class='form-label mb-0'>Column ${l}</label><div class='input-group'><input type='number' class='form-control' value='${wd}'><span class="input-group-text">%</span></div></div>`);
    }
}

$(document).on("keyup", "#tableCols", function (e) {
    var cols = $(this).val();
    columnsWidth(cols);
});

$(document).on("click", ".fTable", function (e) {
    resetStyleForm();
    var $form = $('#field-settings');
    var $target = $(this).find('table');
    $target.addClass("changestyling");
    $form.find('.inputs').hide();
    $form.find('.backColor').show();
    $form.find('.textAlign').show();
    $form.find('.tablestyling').show();

    var fontColor = $target.attr('data-color');
    var backColor = $target.attr('data-bcolor');
    var borderSize = parseInt($target.css('borderWidth'));
    var fontSize = parseInt($target.css('fontSize'));
    var fontWeight = $target.css('fontWeight');
    var text_align = $target.css('textAlign');

    var rows = $('table.changestyling tbody tr').length;
    var cols = $('table.changestyling tbody tr:first td').length;
    columnsWidth(cols, 1);

    $form.find('#fieldType').val("Table");
    $form.find('#fieldColor').val(fontColor);
    $form.find('#backColor').val(backColor);
    $form.find('#fontWeight').val(fontWeight);
    $form.find('#fieldSize').val(fontSize);
    $form.find("#tableCols").val(cols);
    $form.find("#tableRows").val(rows);
    $form.find('input[name=textAlign][value=' + text_align + ']').prop('checked', true);

    if (borderSize >= 1) {
        $form.find("#showBorder").prop("checked", true).trigger("change");
    } else {
        $form.find("#showBorder").prop("checked", false).trigger("change");
    }
    setCustomClasses($target);
    showStyleForm();
    e.preventDefault();
    e.stopPropagation();
});
// edit/save Table field code end

// edit/save Dynamic Table field code end
$(document).on("change", "#allowMultiRows", function (e) {
    var $form = $('#field-settings');
    if ($(this).prop("checked")) {
        // $form.find("#tableRows").val(1).attr('readonly',true).attr('disabled',true);
    } else {
        // $form.find("#tableRows").val(1).removeAttr('readonly').removeAttr('disabled');
    }
    e.preventDefault();
    e.stopPropagation();
});

function destroySelect2(targetid) {
    var $select = $('#' + targetid);
    if ($select.hasClass('select2-hidden-accessible')) {
        $select.select2('destroy');
    }
}

function initSelect2(targetid) {
    var $select = $('#' + targetid);
    if ($select.hasClass('select2-hidden-accessible')) {
        destroySelect2(targetid);
    }
    $select.select2({
        placeholder: 'Select an option',
        allowClear: true
    });
}
$(document).on("click", ".dynamicTable", function (e) {
    resetStyleForm();
    var $form = $('#field-settings');
    var $target = $(this).find('table');
    $target.addClass("changestyling");
    $form.find('.inputs').hide();
    var $data = $target.parent().attr('data-field-json');
    var fieldData = JSON.parse($data);
    var template_ids = fieldData.table_templates;

    // $form.find('.backColor').show();
    // $form.find('.textAlign').show();
    // $form.find('.tablestyling').show();
    // $form.find('.dynamicTableBox').show();
    // $form.find('#fieldLabel').parent().show();
    $form.find('.backColor,.borderDiv,.styling').hide();
    $form.find('.textAlign').hide();
    $form.find('.tablestyling').hide();
    $form.find('.dynamicTableBox').hide();
    $form.find('.templateSelcetionBox').show();
    $form.find('#fieldLabel').parent().hide();
    $form.find('#reqCheck').parent().show();
    show_sortorder(fieldData.sort_order);
    var options = '';
    destroySelect2('fieldTemplates');
    if ($templates.length > 0) {
        options = '';
        $templates.forEach((temp, ind) => {
            checked = '';
            if (template_ids != undefined && template_ids.some(item => item.id === temp.id)) { checked = 'selected' }
            options += `<option value='${temp.id}' ${checked}>${temp.title}</option>`;
        })
    } else {
        options = "<option selected value=''>--No Templates Found--</option>";
    }
    $form.find('#fieldTemplates').html(options);
    initSelect2('fieldTemplates');

    var fieldLabel = $target.attr('data-label');
    var fontColor = $target.attr('data-color');
    var backColor = $target.attr('data-bcolor');
    var fontSize = parseInt($target.css('fontSize'));
    var fontWeight = $target.css('fontWeight');
    var text_align = $target.css('textAlign');
    var allowmultiRows = $target.attr('allow-duplicate-row');

    var rows = $('table.changestyling tbody tr').length;
    var cols = $('table.changestyling tbody tr:first td').length;
    columnsWidth(cols, 1);

    if (fieldData.is_required == '1') {
        $form.find("#reqCheck").prop("checked", true);
    } else {
        $form.find("#reqCheck").prop("checked", false);
    }

    $form.find('#fieldType').val("Table Templates");
    // $form.find('#fieldType').val("Dynamic Table");
    $form.find('#fieldLabel').val(fieldLabel);
    $form.find('#fieldColor').val(fontColor);
    $form.find('#backColor').val(backColor);
    $form.find('#fontWeight').val(fontWeight);
    $form.find('#fieldSize').val(fontSize);
    $form.find("#tableCols").val(cols);
    $form.find("#tableRows").val(rows);
    $form.find('input[name=textAlign][value=' + text_align + ']').prop('checked', true);

    editinterconnection(fieldData);

    if (hasBorder($target)) {
        $form.find("#showBorder").prop("checked", true).trigger("change");
    } else {
        $form.find("#showBorder").prop("checked", false).trigger("change");
    }
    if (allowmultiRows == 1) {
        $form.find("#allowMultiRows").prop("checked", true);
        // $form.find("#tableRows").val(1).attr('readonly',true).attr('disabled',true);
    } else {
        $form.find("#allowMultiRows").prop("checked", false);
    }
    addFieldAttribute(fieldData?.custom_attribute);
    setCustomClasses($target)
    showStyleForm();
    e.preventDefault();
    e.stopPropagation();
});
// edit/save Dynamic Table field code end

function editinterconnection(fieldData) {
    $form.find(".dynamicOptionsInfoBox").parent().show();
    if (fieldData.is_dynamic_options == '1') {
        $form.find("#dynamicOptions").prop("checked", true);
        $form.find(".dynamicOptionsInfoBox #connection_attribute").attr('required', 'required').val(fieldData.connection_attribute);
    } else {
        $form.find("#dynamicOptions").prop("checked", false);
        $form.find(".dynamicOptionsInfoBox").hide();
        $form.find(".dynamicOptionsInfoBox #connection_attribute").removeAttr('required').val('');
    }
}

function saveinterconnection(fieldData) {
    var $target = $('.changestyling').parent();
    var connection_attribute = $form.find('.dynamicOptionsInfoBox #connection_attribute').val();
    var dynamicOptions = $form.find('#dynamicOptions:checked').val();
    if (dynamicOptions == 'yes') {
        $target.attr("set-dynamic-options", true);
        fieldOptions = [];
        fieldData.options = [];
        fieldData.connection_attribute = $.trim(connection_attribute);
    } else {
        $target.removeAttr("set-dynamic-options");
        fieldData.connection_attribute = '';
    }
    fieldData.is_dynamic_options = (dynamicOptions == 'yes') ? 1 : 0;
    saveDynamicOptionsJSON(fieldData);
    return fieldData
}

// edit/save static fields code start
function saveStaticFields() {
    var $form = $('#field-settings');
    var $target = $('.changestyling');

    var fieldLabel = $.trim($form.find('#fieldLabel').val());
    var fieldColor = $form.find('#fieldColor').val();
    var backColor = $form.find('#backColor').val();
    var showBorder = $form.find('#showBorder:checked').val();
    var fontSize = parseInt($form.find('#fieldSize').val());
    var fontWeight = $form.find('#fontWeight').val();
    var fieldWidth = $form.find('#fieldWidth').val();
    var textAlign = $form.find('.textAlign:checked').val();

    $target.text(fieldLabel);
    $target.attr('data-width', fieldWidth)
    $target.cssImportant('width', fieldWidth + '%').cssImportant('color', fieldColor).css('backgroundColor', backColor).css('fontSize', fontSize).css('fontWeight', fontWeight).css('textAlign', textAlign);
    $target.attr('data-color', fieldColor).attr('data-bcolor', backColor);
    customClasses($target);
    saveInlineDataSettings($target);
    if (showBorder == 'yes') {
        applyBorders($target);
    } else {
        applyBorders($target, 0);
    }
}
$(document).on("click", ".fTitle,.fHeading,.fDescription", function (e) {
    resetStyleForm();
    var $form = $('#field-settings');
    var $target = $(this);
    $target.addClass("changestyling");
    $form.find('.inputs').hide();
    $form.find('.backColor').show();
    $form.find('#fieldLabel').parent().show();
    $form.find('.textAlign').show();
    $form.find('.fieldWidth').show();
    $target.removeAttr("contenteditable");
    var fieldLabel = $target.clone().find('.actiontooltip').remove().end().text().trim();
    var fType = $target.attr('type');
    var fontColor = $target.attr('data-color');
    var backColor = $target.attr('data-bcolor');
    var borderSize = parseInt($target.css('borderWidth'));
    var fontSize = parseInt($target.css('fontSize'));
    var fontWeight = $target.css('fontWeight');
    var fieldWidth = $target.css('width');
    var text_align = $target.css('textAlign');
    if (backColor == undefined || backColor == '') {
        backColor = '#ffffff';
    }
    var fullWidth = $target.parent().css('width');
    fieldWidth = Math.round((parseFloat(fieldWidth) / parseFloat(fullWidth)) * 100);

    if ($target.attr('data-width')) {
        fieldWidth = $target.attr('data-width');
    }

    if (borderSize >= 1) {
        $form.find('#showBorder').prop("checked", true).trigger("change");
    } else {
        $form.find('#showBorder').prop("checked", false).trigger("change");
    }
    if (fType == 'title') {
        $form.find('#fieldType').val("Title");
    }
    if (fType == 'heading') {
        $form.find('#fieldType').val("Heading");
    }
    if (fType == 'description') {
        $form.find('#fieldType').val("Description");
    }
    $form.find("#fieldLabel").val(fieldLabel);
    $form.find('#fieldColor').val(fontColor);
    $form.find('#backColor').val(backColor);
    $form.find('#fieldWidth').val(fieldWidth);
    $form.find('#fontWeight').val(fontWeight);
    $form.find('#fieldSize').val(fontSize);
    $form.find('input[name=textAlign][value=' + text_align + ']').prop('checked', true);
    setCustomClasses($target)
    renderInlineData($target)
    showStyleForm();
    e.preventDefault();
    e.stopPropagation();
});
// edit/save static fields code end

// edit/save dynamic heading code start
function saveDynamicHeading() {
    var $form = $('#field-settings');
    var $target = $('.changestyling');

    var fieldLabel = $.trim($form.find('#fieldLabel').val());
    var fieldColor = $form.find('#fieldColor').val();
    var backColor = $form.find('#backColor').val();
    var showBorder = $form.find('#showBorder:checked').val();
    var fontSize = parseInt($form.find('#fieldSize').val());
    var fontWeight = $form.find('#fontWeight').val();
    var fieldWidth = $form.find('#fieldWidth').val();
    var textAlign = $form.find('.textAlign:checked').val();
    var sortOrder = parseInt($form.find('#sortOrder').val());

    $target.text(fieldLabel);
    $target.cssImportant('width', fieldWidth + '%').cssImportant('color', fieldColor).css('backgroundColor', backColor).css('fontSize', fontSize).css('fontWeight', fontWeight).css('textAlign', textAlign);
    $target.attr('data-color', fieldColor).attr('data-bcolor', backColor);
    customClasses($target);
    if (showBorder == 'yes') {
        applyBorders($target);
    } else {
        applyBorders($target, 0);
    }
    var $data = $target.attr('data-field-json');
    var fieldData = JSON.parse($data);
    fieldData = saveFieldAttribute(fieldData)
    // Hidden field
    var isHidden = $form.find('#isHidden:checked').val();
    fieldData.is_hidden = (isHidden == 'yes') ? true : false;
    $target.removeClass("isHidden")
    if (fieldData.is_hidden) {
        $target.addClass("isHidden")
    }
    // Hidden field

    fieldData.sort_order = sortOrder;
    fieldData.field_label = fieldLabel;
    fieldData.color = fieldColor;
    fieldData.text_color = fieldColor;
    fieldData.background_color = backColor;
    fieldData.show_border = (showBorder == 'yes') ? 1 : 0;;
    fieldData.field_width = fieldWidth;
    fieldData.font_size = fontSize;
    $target.attr('data-field-json', JSON.stringify(fieldData));
}
$(document).on("click", ".dHeading", function (e) {
    resetStyleForm();
    var $form = $('#field-settings');
    var $target = $(this);
    $target.addClass("changestyling");
    $form.find('.inputs').hide();
    $form.find('.backColor').show();
    $form.find('#fieldLabel').parent().show();
    $form.find('.textAlign').show();
    $form.find('.fieldWidth').show();
    $form.find('#isHidden').parent().show();

    var $data = $target.attr('data-field-json');
    var fieldData = JSON.parse($data);
    $form.find('#fieldType').val("Dynamic Heading");
    $form.find("#fieldLabel").val(fieldData.field_label);
    if (fieldData.show_border == '1') {
        $form.find("#showBorder").prop("checked", true).trigger("change");
    } else {
        $form.find("#showBorder").prop("checked", false).trigger("change");
    }
    $form.find("#isHidden").prop("checked", fieldData?.is_hidden === true);
    $form.find("#fieldWidth").val(fieldData.field_width);
    $form.find("#fieldSize").val(fieldData.font_size);
    $form.find("#fieldColor").val(fieldData.color);

    $form.find('#sortOrder').val(fieldData.sort_order).parents('.inputs').show();

    var backColor = $target.attr('data-bcolor');
    var fontWeight = $target.css('fontWeight');
    var text_align = $target.css('textAlign');
    if (backColor == undefined || backColor == '') {
        backColor = '#ffffff';
    }
    $form.find('#backColor').val(backColor);
    $form.find('#fontWeight').val(fontWeight);
    $form.find('input[name=textAlign][value=' + text_align + ']').prop('checked', true);
    addFieldAttribute(fieldData?.custom_attribute);
    setCustomClasses($target);
    showStyleForm();
    e.preventDefault();
    e.stopPropagation();
});
// edit/save dynamic headingcode end

// edit/save section title code start
function saveSectionTitle() {
    var $form = $('#field-settings');
    var $target = $('.changestyling');
    var $target2 = $target.parents('.sectionStart');

    var fieldLabel = $form.find('#fieldLabel').val();
    var appLabel = $form.find('#appLabel').val();
    var fieldColor = $form.find('#fieldColor').val();
    var backColor = $form.find('#backColor').val();
    var showBorder = $form.find('#showBorder:checked').val();
    var fontSize = parseInt($form.find('#fieldSize').val());
    var fontWeight = $form.find('#fontWeight').val();
    var textAlign = $form.find('.textAlign:checked').val();
    var sectionDuplicate = $form.find('#sectionDuplicate:checked').val();
    var secIndex = $target.closest(".sectionStart").index(".sectionStart");
    var sortOrder = parseInt($form.find('#sortOrder').val()) || secIndex;


    $target.text(fieldLabel);
    if (appLabel.trim() == '') {
        appLabel = fieldLabel;
    }
    $target.attr('app-label', appLabel.trim());
    $target.attr('data-sort-order', sortOrder);
    $target.cssImportant('color', fieldColor).css('backgroundColor', backColor).css('fontSize', fontSize).css('fontWeight', fontWeight).css('textAlign', textAlign);
    $target.attr('data-color', fieldColor).attr('data-bcolor', backColor);
    customClasses($target2);
    if (showBorder == 'yes') {
        applyBorders($target2, 5, 'solid', backColor);
    } else {
        applyBorders($target2, 0);
    }
    if (sectionDuplicate == 'yes') {
        $target.attr("data-duplicate-section", 1).addClass('allowduplicate');
    } else {
        $target.removeAttr("data-duplicate-section").removeClass('allowduplicate');;
    }
    saveOrientationType();
    saveMobileAppVisibility();

    resetStyleForm();
    closeStyleForm();
}
function addPdfLabel() {
    var $target = $(".changestyling");
    $form.find("#fieldLabel").after(`<div class="sectiontitilebox mt-3">
                                    <label for="appLabel" class="form-label">Section Title In App</label>
                                    <input type="text" class="form-control" id="appLabel" placeholder="Single Text" required="">
                                </div>`);
    var appLabel = $target.attr("app-label");
    var pdfLabel = $target.text().trim();
    if (appLabel == undefined || appLabel == '') {
        appLabel = pdfLabel;
    }
    $form.find("#appLabel").val(appLabel);
}
$(document).on("click", ".sectionTitle", function (e) {
    resetStyleForm();
    var $form = $('#field-settings');
    var $target = $(this);
    var $target2 = $(this).parents('.sectionStart');
    $target.addClass("changestyling");
    $form.find('.inputs').hide();
    $form.find('.backColor').show();
    $form.find('#fieldLabel').parent().show();
    $form.find('.textAlign').show();
    $form.find('.sectionDuplicate').show();
    $form.find("#fieldType").val("Main Section");
    $form.find('#sortOrder').parents('.inputs').show();
    renderMobileAppVisibility();
    fieldOrientationType();
    addPdfLabel();

    $target.removeAttr("contenteditable");
    var fieldLabel = $target.text().trim();
    var fontSize = $target.css('fontSize');
    var fontWeight = $target.css('fontWeight');
    var fontColor = $target.attr('data-color');
    var backColor = $target.attr('data-bcolor');
    var text_align = $target.css('textAlign');
    var duplicate_section = $target.attr('data-duplicate-section');
    var secIndex = $target.closest(".sectionStart").index(".sectionStart");
    var sortOrder = parseInt($target.attr('data-sort-order')) || secIndex;

    $form.find("#fieldLabel").val(fieldLabel);
    if (duplicate_section == '1') {
        $form.find("#sectionDuplicate").prop("checked", true);
    } else {
        $form.find("#sectionDuplicate").prop("checked", false);
    }
    if (hasBorder($target2)) {
        $form.find("#showBorder").prop("checked", true).trigger("change");
    } else {
        $form.find("#showBorder").prop("checked", false).trigger("change");
    }
    $form.find('input[name=textAlign][value=' + text_align + ']').prop('checked', true);
    $form.find("#fieldSize").val(fontSize.replace("px", ""));
    $form.find("#fontWeight").val(fontWeight);
    $form.find("#fieldColor").val(fontColor);
    $form.find("#backColor").val(backColor);
    $form.find("#sortOrder").val(sortOrder);
    setCustomClasses($target)
    showStyleForm();
    e.preventDefault();
    e.stopPropagation();
});
// edit/save section title code end

// edit/save child section code start
function saveChildSection() {
    var $form = $('#field-settings');
    var $target = $('.changestyling');
    var $target2 = $target.parent();

    var fieldWidth = $form.find('#fieldWidth').val();
    var backColor = $form.find('#backColor').val();
    var showBorder = $form.find('#showBorder:checked').val();
    var displaystyle = $form.find('input[name="displaystyle"]:checked').val();

    $target.removeClass("blockstyle inlinestyle").addClass(displaystyle);
    // Hidden field
    var isHidden = $form.find('#isHidden:checked').val();
    is_hidden = (isHidden == 'yes') ? true : false;
    $target.removeClass("isHidden")
    if (is_hidden) {
        $target.addClass("isHidden")
    }
    // Hidden field

    $target.cssImportant('width', fieldWidth + '%').css('backgroundColor', backColor);
    $target.attr('data-bcolor', backColor);
    customClasses($target);
    if (showBorder == 'yes') {
        applyBorders($target);
    } else {
        applyBorders($target, 0);
    }
}
$(document).on("click", ".setting-sec", function (e) {
    resetStyleForm();
    var $form = $('#fieldSettingForm');
    var $target = $(this).parents('.child-sec');
    var $target2 = $target.parent();
    $form.find('.inputs').hide();
    $form.find('.inputs.fieldWidth').show();
    $form.find('.styling').hide();
    $form.find('.backColor').show();
    $form.find('.displayStyle').show();
    $target.addClass("changestyling noborder");
    $form.find('#fieldType').val("Child Section");
    $form.find('#isHidden').parent().show();
    $form.find("#isHidden").prop("checked", $target2.hasClass("isHidden"));

    var fieldWidth = $target.css('width');
    var fullWidth = $target.parent().css('width');
    var backColor = $target.attr('data-bcolor');
    fieldWidth = (parseFloat(fieldWidth) / parseFloat(fullWidth)) * 100;
    if (backColor == undefined || backColor == '') {
        backColor = '#ffffff';
    }
    if (hasBorder($target)) {
        $form.find('#showBorder').prop("checked", true).trigger("change");
    } else {
        $form.find('#showBorder').prop("checked", false).trigger("change");
    }

    if ($target.hasClass("inlinestyle")) {
        $form.find('#inlinestyle').prop("checked", true);
    }
    $form.find('#fieldWidth').val(parseInt(fieldWidth));
    $form.find('#backColor').val(backColor);
    setCustomClasses($target)

    showStyleForm();
    $target.removeClass("noborder");
    e.preventDefault();
    e.stopPropagation();
});
// edit/save child section code end

// edit/save DB Fields start
function saveDBFields() {
    var $form = $('#field-settings');
    var $target = $('.changestyling');

    var $data = $target.attr('data-field-json');
    var fieldData = JSON.parse($data);
    fieldData = saveFieldAttribute(fieldData)


    var fieldLabel = $.trim($form.find('#fieldLabel').val());
    var showLabel = $form.find('#showLabel:checked').val();
    var fieldColor = $form.find('#fieldColor').val();
    var fieldDB = $form.find('#fieldDB').val();
    var fontSize = parseInt($form.find('#fieldSize').val());
    var fontWeight = $form.find('#fontWeight').val();
    var textAlign = $form.find('.textAlign:checked').val();
    var showBorder = $form.find('#showBorder:checked').val();
    var sortOrder = parseInt($form.find('#sortOrder').val());

    if ($.trim(fieldLabel) == '') {
        Swal.fire({
            icon: 'error',
            title: 'Validation Error!!!',
            text: "Field Label is required."
        })
        return false;
    }
    else if ($.trim(fieldDB) == '') {
        Swal.fire({
            icon: 'error',
            title: 'Validation Error!!!',
            text: "Please select database field."
        })
        return false;
    }


    fieldData.field_label = fieldLabel;
    fieldData.show_label = (showLabel == 'yes') ? 1 : 0;
    fieldData.color = fieldColor;
    fieldData.text_color = fieldColor;
    fieldData.font_size = fontSize;
    fieldData.sort_order = sortOrder;

    // Hidden field
    var isHidden = $form.find('#isHidden:checked').val();
    fieldData.is_hidden = (isHidden == 'yes') ? true : false;
    $target.removeClass("isHidden")
    if (fieldData.is_hidden) {
        $target.addClass("isHidden")
    }
    // Hidden field

    $target.html('');
    if (showLabel == 'yes') {
        $target.html('<span>' + fieldLabel + ' </span>');
    }

    if (fieldDB != null && fieldDB != '') {
        $target.append('{{' + fieldDB + '}}');
        fieldData.default_value = '{{' + fieldDB + '}}';
    }
    if (showBorder == 'yes') {
        applyBorders($target);
    } else {
        applyBorders($target, 0);
    }
    customClasses($target);
    saveInlineDataSettings($target);
    $target.css('color', fieldColor).css('fontSize', fontSize).css('fontWeight', fontWeight).css('textAlign', textAlign);
    $target.attr('data-color', fieldColor).addClass('dbFieldJSON');

    $target.attr('data-field-json', JSON.stringify(fieldData));

}
$(document).on("click", ".dbFields", function (e) {
    resetStyleForm();
    var $form = $('#field-settings');
    var $target = $(this);
    $target.addClass("changestyling");
    $form.find('.inputs').hide();
    // $form.find('.borderDiv').hide();
    $form.find('.textAlign').show();
    $form.find('.dbFieldBox').show();
    $form.find('#isHidden').parent().show();


    var $data = $target.attr('data-field-json');
    var fieldData = JSON.parse($data);

    var fontColor = fieldData.color;
    var fieldLabel = fieldData.field_label;
    var showLabel = fieldData.show_label;
    var fieldDB = fieldData.default_value.replaceAll("{", '').replaceAll("}", '');
    var fontSize = fieldData.font_size;
    var fontWeight = $target.css('fontWeight');
    var text_align = $target.css('textAlign');

    $form.find('#fieldType').val("DB Field");
    $form.find('#fieldColor').val(fontColor);
    $form.find('#fieldLabel').val(fieldLabel);
    $form.find('#fieldDB').val(fieldDB);
    $form.find('#fontWeight').val(fontWeight);
    $form.find('#fieldSize').val(fontSize);
    $form.find('#sortOrder').val(fieldData.sort_order);
    $form.find("#isHidden").prop("checked", fieldData?.is_hidden === true);
    if (fieldData.show_label == '1') {
        $form.find("#showLabel").prop("checked", true);
    } else {
        $form.find("#showLabel").prop("checked", false);
    }
    if (hasBorder($target)) {
        $form.find("#showBorder").prop("checked", true).trigger("change");
    } else {
        $form.find("#showBorder").prop("checked", false).trigger("change");
    }
    $form.find('input[name=textAlign][value=' + text_align + ']').prop('checked', true);
    addFieldAttribute(fieldData?.custom_attribute);
    renderInlineData($target)
    setCustomClasses($target)
    showStyleForm();
    e.preventDefault();
    e.stopPropagation();
});
// edit/save DB Fields end

// edit/save input Fields start
let $mutlti_radio_option = '<label {{STYLE}} class="label-text"><input class="form-check-input" type="radio" name="{{NAME}}">{{VALUE}}</label>';
let $mutlti_check_option = '<label {{STYLE}} class="label-text"><input class="form-check-input" type="checkbox" name="{{NAME}}">{{VALUE}}</label>';
let $mutlti_dropdown_option = '<option>{{VALUE}}</option>';
// color options
const isColorInPDF = `<div class="form-check form-switch form-switch-left form-switch-md mb-3 showColorInPDF"><label for="isColorInPDF" class="form-label ">Show Options Background Color In PDF?</label><input class="form-check-input" type="checkbox" id="isColorInPDF" value="yes"></div>`;
const colorsList = [{ name: "Custom Select", hex: "select" }, { name: "White", hex: "#FFFFFF" }, { name: "Black", hex: "#000000" }, { name: "Red", hex: "#FF0000" }, { name: "Lime", hex: "#00FF00" }, { name: "Blue", hex: "#0000FF" }, { name: "Yellow", hex: "#FFFF00" }, { name: "Orange", hex: "#FFA500" }, { name: "Purple", hex: "#800080" }, { name: "Cyan", hex: "#00FFFF" }, { name: "Pink", hex: "#FFC0CB" }, { name: "Gray", hex: "#808080" }, { name: "Brown", hex: "#A52A2A" }, { name: "Green", hex: "#008000" }, { name: "Gold", hex: "#FFD700" }, { name: "Silver", hex: "#C0C0C0" }];
const fieldOptionColor = `<div class="color-field fieldOptionsColor ms-2" id="colorField">T</div><input type="hidden" class="optionsColor"><input type="hidden" class="optionsBgColor">`;
let activeInput = null;
let customColorPicker = `<div id="customColorPicker">
                            <div class="color-picker-box">
                                <div class="preview" id="preview">Preview Text</div>
                                <div class="color-row">
                                    <div class="color-col"><label>Text Color</label><input type="color" id="textColor" value="#ffffff"></div>
                                    <div class="color-col"><label>Background Color</label><input type="color" id="bgColor" value="#007bff"></div>
                                </div>
                                <div class="actions-btn">
                                  <button type="button" class="btn btn-light cancel-btn" id="cancelBtn">Cancel</button>
                                  <button type="button" class="btn btn-success apply-btn" id="applyBtn">Apply</button>
                                </div>
                            </div>
                        </div>`;


function updatePreview() {
    $form.find("#preview").css({ "color": $("#textColor").val(), "backgroundColor": $("#bgColor").val() });
}
$(document).on("click", "#applyBtn", function () {
    let textColor = $("#textColor").val();
    let bgColor = $("#bgColor").val();
    activeInput.css("color", textColor).css("backgroundColor", bgColor);
    activeInput.siblings(".optionsColor").val(textColor);
    activeInput.siblings(".optionsBgColor").val(bgColor);
    $form.find("#customColorPicker").remove();
});
$(document).on("click", "#cancelBtn", function () {
    $form.find("#customColorPicker").remove();
})
$(document).on("input change", "#textColor, #bgColor", function () {
    updatePreview();
})
$(document).on("click", ".fieldOptionsColor", function (e) {
    activeInput = $(this);
    $form.find("#customColorPicker").remove();
    activeInput.after(customColorPicker);
    $("#textColor").val(activeInput.css("color"));
    $("#bgColor").val(activeInput.css("backgroundColor"));
    updatePreview();
})
// color options

function addNewField(obj, color = false) {
    var fType = $form.find("#fieldType").val();
    var colorField = (fType == "checkbox" || fType == "radio") ? fieldOptionColor : "";

    var $options = `<div class="d-flex align-items-center dynamicField mb-2"><span class="fa icon-plus removeOption"><i class="ri-subtract-fill align-bottom"></i></span><input type="text" class="form-control fieldOptions me-2" value="Option" placeholder="Option"><input type="text" class="form-control fieldOptionsNote" value="" placeholder="Option Info/Note">${colorField}</div>`;
    return $(obj).parents('.multipleoptionsbox').append($options);
}

function addPrefillOption(obj) {
    var $options = '<div class="d-flex align-items-center dynamicField mb-2"><span class="fa icon-plus removeOption"><i class="ri-subtract-fill align-bottom"></i></span><input type="text" class="form-control autofillOption" value="Prefill Option"></div>';
    return $(obj).parents('.fillableOptions').append($options);
}

$(document).on("click", ".removeOption", function () {
    $(this).parent().remove();
});

function saveInputFields() {
    var $form = $('#fieldSettingForm');

    var fieldType = $form.find('#fieldType').val();
    var fieldLabel = $.trim($form.find('#fieldLabel').val());
    var fieldName = $form.find('#fieldName').val();
    var reqCheck = $form.find('#reqCheck:checked').val();
    var canEdit = $form.find('#canEdit:checked').val();
    var showLabel = $form.find('#showLabel:checked').val();
    var allowGallery = $form.find('#allowGallery:checked').val();
    var showBorder = $form.find('#showBorder:checked').val();
    var fieldWidth = parseInt($form.find('#fieldWidth').val());
    var sortOrder = parseInt($form.find('#sortOrder').val());
    var fieldFontSize = parseInt($form.find('#fieldSize').val());
    var fieldColor = $form.find('#fieldColor').val();
    var fieldDefault = $form.find('#fieldDefault').val();
    var fieldMin = parseInt($form.find('#fieldMin').val());
    var fieldMax = parseInt($form.find('#fieldMax').val());
    var showOptVal = $form.find('#showOptVal:checked').val();
    var showAllOpt = $form.find('#showAllOpt:checked').val();
    var showIcons = $form.find('#showIcons:checked').val();
    var multiFileSelect = $form.find('#multiFileSelect:checked').val();
    var max_file_size_length = $form.find('#max_file_size_length').val();
    var multiOptionSelect = $form.find('#multiOptionSelect:checked').val();
    var optionsSeperator = $form.find('#optionSeperator').val();
    var dynamicOptions = $form.find('#dynamicOptions:checked').val();
    var connection_attribute = $form.find('.dynamicOptionsInfoBox #connection_attribute').val();
    // var formula_attribute = $form.find('.formulasbox #formula_attribute').val();
    // var formula_attribute_c = $form.find('.formulasbox #formula:checked').val();
    var duplicateField = $form.find('#duplicateField:checked').val();
    var isDuplicate = (duplicateField == 'yes') ? true : false;
    if (isDuplicate) {
        saveDuplicateInput();
        resetStyleForm();
        closeStyleForm();
        return false;
    }

    var fieldFormatDate = $form.find('#fieldFormat').val();
    var fieldFormatTime = $form.find('#fieldFormatTime').val();
    var fieldFormat = $.trim(fieldFormatDate + '.' + fieldFormatTime);
    var fieldOptions = [];
    // color options
    $form.find('.fieldOptions').each(function (index) {
        var val = $.trim($(this).val());
        var noteVal = $.trim($form.find('.fieldOptionsNote').eq(index).val());
        var color = null;
        var textColor = null;
        var bgcolor = null;
        if (fieldType == "checkbox" || fieldType == "radio") {
            color = $.trim($form.find('.optionsBgColor').eq(index).val());
            color = (color == '') ? null : color;
            textColor = $.trim($form.find('.optionsColor').eq(index).val());
            textColor = (textColor == '') ? null : textColor;
        }
        if (val != '' && val != ' ') {
            fieldOptions.push({ name: val, note: noteVal, color: color, text_color: textColor });
        }
    });
    // color options

    var autofillOptions = [];
    $form.find('.autofillOption').each(function () {
        var val = $.trim($(this).val());
        if (val != '' && val != ' ') {
            autofillOptions.push(val);
        }
    });

    var fileTypes = [];
    $form.find('.fileTypes:checked').each(function () {
        fileTypes.push($(this).val());
    });
    let $target = $(`.${fieldName}`);
    if (isDuplicate) {
        $target = $(`.${fieldName.replace(fieldType, "duplicate")}`);
    }
    var $data = $target.attr('data-field-json');
    var fieldData = JSON.parse($data);
    var fieldID = fieldName.split('_')[1];
    fieldData = saveFieldAttribute(fieldData);
    fieldData = saveAssesmentActionOptions(fieldData);

    // field header and description
    var showHeading = $form.find('#showHeading:checked').val();
    var fieldHeading = $.trim($form.find('#fieldHeading').val());
    var fieldDesc = $.trim($form.find('#fieldDesc').val());
    fieldData.show_heading = (showHeading == 'yes') ? true : false;
    fieldData.heading_title = fieldHeading;
    fieldData.description = fieldDesc;
    // field header and description

    // Hidden field
    var isHidden = $form.find('#isHidden:checked').val();
    fieldData.is_hidden = (isHidden == 'yes') ? true : false;
    $target.removeClass("isHidden")
    if (fieldData.is_hidden) {
        $target.addClass("isHidden")
    }
    // Hidden field

    // Other input field
    var enableOtherOption = $form.find('#enableOtherOption:checked').val();
    var otherFieldOptions = $form.find('#otherFieldOptions').val();
    var allowCustomInput = (enableOtherOption == 'yes') ? true : false;
    var matchingOptions = otherFieldOptions.split(",").map(s => s.trim()).filter(s => s.length > 0);
    fieldData.allow_custom_input = false;
    fieldData.matching_options = [];
    // Other input field

    // color options 2
    if (fieldType == "checkbox" || fieldType == "radio") {
        var BGColorInPDF = $form.find('#isColorInPDF:checked').val();
        fieldData.bg_pdf_options = (BGColorInPDF == 'yes') ? true : false;
    }
    // color options 2

    // modify JSON Start
    fieldData.sort_order = sortOrder;
    fieldData.field_label = fieldLabel;
    fieldData.is_required = (reqCheck == 'yes') ? 1 : 0;
    fieldData.can_edit = (canEdit == 'yes') ? true : false;
    fieldData.show_label = (showLabel == 'yes') ? 1 : 0;
    fieldData.show_border = (showBorder == 'yes') ? 1 : 0;
    fieldData.allow_gallery = (allowGallery == 'yes') ? 1 : 0;
    fieldData.font_size = fieldFontSize;
    fieldData.field_width = fieldWidth;
    fieldData.color = fieldColor;
    fieldData.text_color = fieldColor;
    fieldData.default_value = fieldDefault;
    fieldData.min_length = fieldMin;
    fieldData.max_length = fieldMax;
    fieldData.max_file_size_length = parseInt(max_file_size_length);

    fieldData.show_icons = (showIcons == 'yes') ? 1 : 0; //checkbox/radio
    fieldData.show_all_options = (showAllOpt == 'yes') ? 1 : 0; //checkbox/radio
    fieldData.show_opt_val = (showOptVal == 'yes') ? 1 : 0; //checkbox/radio
    fieldData.allow_multi_file = (multiFileSelect == 'yes') ? 1 : 0; //file/file_caption
    fieldData.allow_multi_dropdown = (multiOptionSelect == 'yes') ? 1 : 0; //checkbox
    fieldData.is_dynamic_options = (dynamicOptions == 'yes') ? 1 : 0; //checkbox
    fieldData.options = fieldOptions;  //radio/select/checkbox
    fieldData.auto_fill = autofillOptions;  //radio/select/checkbox
    fieldData.allow_file_types = fileTypes;   //file/file_caption
    fieldData.format = fieldFormat; //date/time/datetime
    // modify JSON End
    // if(formula_attribute_c == 'yes'){
    //     fieldData.formula_attribute = formula_attribute;
    // }else{
    //     fieldData.formula_attribute = '';
    // }
    // advance setting
    display_rule = "";
    display_input = "";
    if ($.inArray(fieldData.field_type, allowAdvanceSetting) >= 0) {
        display_rule = $form.find('#displayRule').val();
        display_input = $form.find('#displayValueInput').val();
    }
    fieldData.display_rule = display_rule;
    fieldData.display_input = display_input;
    // advance setting

    var fontWeight = $form.find('#fontWeight').val();
    $target.css('fontWeight', fontWeight).css('color', fieldColor).css('fontSize', fieldFontSize + 'px');
    if (showLabel == 'yes') {
        $target.find('label').eq(0).text(fieldLabel).show();
    } else {
        $target.find('label').eq(0).text('').hide();
    }

    var multiOptions = '';
    if ($.inArray(fieldData.field_type, allowInterconnectionAttributes) >= 0) {
        if (dynamicOptions == 'yes') {
            $target.attr("set-dynamic-options", true);
            if ($.inArray(fieldData.field_type, parentConnectionAttributes) >= 0) {
                fieldOptions = [];
                fieldData.options = [];
            }
            fieldData.connection_attribute = $.trim(connection_attribute);
        } else {
            $target.removeAttr("set-dynamic-options");
            fieldData.connection_attribute = '';
        }
        saveDynamicOptionsJSON(fieldData);
    }
    $target.css('width', fieldWidth + '%');

    if (fieldData.field_type == 'text' || fieldData.field_type == 'textarea' || fieldData.field_type == 'number' || fieldData.field_type == 'phone') {
        $target.addClass('setinputwidth');
        // $target.find('[name=' + fieldName + ']').css('width', fieldWidth + '%');
        // modify JSON
        fieldData.show_opt_val = 0;
        fieldData.allow_multi_file = 0;
        fieldData.allow_multi_dropdown = 0;
        fieldData.options = [];
        fieldData.allow_file_types = [];
        fieldData.format = '';
        fieldData.allow_gallery = 0;
        // modify JSON
    }
    else if (fieldData.field_type == 'date' || fieldData.field_type == 'time' || fieldData.field_type == 'datetime') {
        $target.addClass('setinputwidth');
        // $target.find('[name=' + fieldName + ']').css('width', fieldWidth + '%');
        // modify JSON
        fieldData.show_opt_val = 0;
        fieldData.allow_multi_file = 0;
        fieldData.allow_multi_dropdown = 0;
        fieldData.options = [];
        fieldData.allow_file_types = [];
        fieldData.auto_fill = [];
        fieldData.allow_gallery = 0;
        // modify JSON
    }
    else if (fieldData.field_type == 'email') {
        $target.addClass('setinputwidth');
        // $target.find('[name=' + fieldName + ']').css('width', fieldWidth + '%');
        // modify JSON
        fieldData.show_opt_val = 0;
        fieldData.allow_multi_file = 0;
        fieldData.allow_multi_dropdown = 0;
        fieldData.options = [];
        fieldData.allow_file_types = [];
        fieldData.auto_fill = [];
        fieldData.format = '';
        fieldData.allow_gallery = 0;
        // modify JSON
    }
    else if (fieldData.field_type == 'select') {
        // if(dynamicOptions == 'yes'){
        //     $target.attr("set-dynamic-options",true);
        //     fieldOptions = [];
        //     fieldData.options = [];
        // }else{
        //     $target.removeAttr("set-dynamic-options");
        // }
        // saveDynamicOptionsJSON(fieldData);
        $target.addClass('setinputwidth');
        var multiOptions = '';
        fieldOptions.forEach(function (val, index) {
            multiOptions += $mutlti_dropdown_option.replace("{{VALUE}}", val.name);
        });
        $target.find('select[name=' + fieldName + ']').html(multiOptions);
        // $target.find('[name=' + fieldName + ']').css('width', fieldWidth + '%');
        // modify JSON
        fieldData.show_opt_val = 0;
        fieldData.allow_multi_file = 0;
        fieldData.allow_multi_dropdown = 0;
        fieldData.allow_file_types = [];
        fieldData.auto_fill = [];
        fieldData.format = '';
        fieldData.allow_gallery = 0;
        // modify JSON
    }
    else if (fieldData.field_type == 'file' || fieldData.field_type == 'file_caption') {
        if (fieldData.field_type == 'file') {
            $target.addClass('setinputwidth');
        }
        if (fieldData.field_type == 'file_caption') {
            var printStyle = $form.find('.printStyles:checked').val();
            fieldData.print_style = printStyle;
        }
        // $target.find('[name=' + fieldName + ']').css('width', fieldWidth + '%');
        // modify JSON
        fieldData.show_opt_val = 0;
        fieldData.allow_multi_dropdown = 0;
        fieldData.options = [];
        fieldData.auto_fill = [];
        fieldData.format = '';
        // modify JSON
    }
    else if (fieldData.field_type == 'checkbox') {
        fieldOptions.forEach(function (val, index) {
            optval = val.name;
            if (showOptVal != 'yes') { optval = ''; }
            var bgStyle = (fieldData?.bg_pdf_options && val?.color != null) ? `style='background-color:${val?.color}'` : ''; // color options 2
            multiOptions += $mutlti_check_option.replace("{{VALUE}}", optval).replace("{{NAME}}", fieldData.name).replace("{{STYLE}}", bgStyle); // color options 2
        });
        $target.find('.label-text,.fieldoptionsbox').remove();
        $target.append(`<div class="fieldoptionsbox">${multiOptions}</div>`);
        // $target.css('width', fieldWidth + '%');
        // modify json
        fieldData.allow_multi_file = 0;
        fieldData.allow_file_types = [];
        fieldData.auto_fill = [];
        fieldData.format = '';
        fieldData.allow_gallery = 0;
        fieldData.options_seperator = (optionsSeperator != "") ? optionsSeperator : ", ";
        // modify json
    }
    else if (fieldData.field_type == 'radio') {
        fieldOptions.forEach(function (val, index) {
            var bgStyle = (fieldData?.bg_pdf_options && val?.color != null) ? `style='background-color:${val?.color}'` : ''; // color options 2
            multiOptions += $mutlti_radio_option.replace("{{VALUE}}", val.name).replace("{{NAME}}", fieldData.name).replace("{{STYLE}}", bgStyle); // color options 2
        });
        $target.find('.label-text,.fieldoptionsbox').remove();
        $target.append(`<div class="fieldoptionsbox">${multiOptions}</div>`);
        // $target.css('width', fieldWidth + '%');
        // modify json
        fieldData.allow_multi_file = 0;
        fieldData.allow_multi_dropdown = 0;
        fieldData.allow_file_types = [];
        fieldData.auto_fill = [];
        fieldData.format = '';
        fieldData.allow_gallery = 0;
        fieldData.show_opt_val = 1;
    }
    else {
        $target.addClass('setinputwidth');
        // $target.find('[name=' + fieldName + ']').css('width', fieldWidth + '%');
        // modify JSON
        fieldData.show_opt_val = 0;
        fieldData.allow_multi_file = 0;
        fieldData.allow_multi_dropdown = 0;
        fieldData.options = [];
        fieldData.allow_file_types = [];
        fieldData.auto_fill = [];
        fieldData.format = '';
        fieldData.allow_gallery = 0;
        // modify JSON
    }

    if ($.inArray(fieldData.field_type, allowCustomInputFields) >= 0) {
        // Other input field
        fieldData.allow_custom_input = allowCustomInput;
        if (allowCustomInput) {
            fieldData.matching_options = matchingOptions;
        }
        // Other input field
    }
    if (showBorder == 'yes') {
        applyBorders($target);
    } else {
        applyBorders($target, 0);
    }
    customClasses($target);
    saveInlineDataSettings($target);
    $target.attr('data-field-json', JSON.stringify(fieldData));

    resetStyleForm();
    closeStyleForm();
}

$(document).on("change", "#dynamicOptions", function (e) {
    var $form = $('#field-settings');
    var field = $form.find("#fieldType").val();
    if ($(this).is(':checked')) {
        if (field.toUpperCase() == 'SELECT' || field.toUpperCase() == 'RADIO') {
            $form.find(".multipleoptionsbox").hide();
        }
        $form.find(".dynamicOptionsInfoBox").show();
        // $form.find("#fieldDefault").val('').parent().hide();
    } else {
        if (field.toUpperCase() == 'SELECT' || field.toUpperCase() == 'RADIO') {
            $form.find(".multipleoptionsbox").show();
        }
        $form.find(".dynamicOptionsInfoBox").hide();
        // $form.find("#fieldDefault").val('').parent().show();
    }
    var dval = $("#fieldDefault").val();
    defaultValueField(field, dval)
});

// other input option
$(document).on("change", "#enableOtherOption", function (e) {
    var $form = $('#field-settings');
    var field = $form.find("#fieldType").val();
    if ($.inArray(field, allowCustomInputFields) >= 0) {
        $form.find(".dropdownfieldBox").show();
        if ($(this).is(':checked')) {
            $form.find(".dropdownfieldBox #displayOtherFields").show();
        } else {
            $form.find(".dropdownfieldBox #displayOtherFields").hide();
            if (choiceOtherOptions.getValue(true).length < 1) {
                choiceOtherOptions.clearStore();
                choiceOtherOptions.setValue(["Other"]);
            }
        }
    }
    else {
        $form.find(".dropdownfieldBox").hide();
    }
});

const formula_fields = ['text', 'number', 'select', 'radio', 'checkbox'];
const allowAdvanceSetting = ["checkbox", "select", "radio"];
$(document).on("click", ".inputOption", function (e) {
    resetStyleForm();
    changeFieldType(true);
    add_validation_btn(); //validation rules
    add_report_data_field(); //report data field
    var $form = $('#field-settings');
    var $target = $(this);
    var $data = $target.attr('data-field-json');
    var fieldData = JSON.parse($data);

    // color options 2
    if (fieldData.field_type == "checkbox" || fieldData.field_type == "radio") {
        $form.find(".multipleoptionsbox").after(isColorInPDF);
        $form.find("#isColorInPDF").prop("checked", fieldData?.bg_pdf_options === true);
    }
    // color options 2

    // $form.find("#fieldType").val(fieldData.field_type.toUpperCase());
    $form.find("#fieldType").val(fieldData.field_type);
    $form.find("#fieldLabel").val(fieldData.field_label);
    $form.find("#fieldName").val(fieldData.name);
    $form.find("#sortOrder").val(fieldData.sort_order);
    if (fieldData.is_required == '1') {
        $form.find("#reqCheck").prop("checked", true);
    } else {
        $form.find("#reqCheck").prop("checked", false);
    }
    var canEditValue = fieldData?.can_edit;
    $form.find("#canEdit").prop("checked", canEditValue === undefined || canEditValue === true);

    $form.find("#isHidden").prop("checked", fieldData?.is_hidden === true);
    $form.find("#showHeading").prop("checked", fieldData?.show_heading === true);
    $form.find("#fieldHeading").val(fieldData?.heading_title ?? "");
    $form.find("#fieldDesc").val(fieldData?.description ?? "");

    if (fieldData.show_label == '1') {
        $form.find("#showLabel").prop("checked", true);
    } else {
        $form.find("#showLabel").prop("checked", false);
    }
    if (fieldData.allow_gallery == '1') {
        $form.find("#allowGallery").prop("checked", true);
    } else {
        $form.find("#allowGallery").prop("checked", false);
    }
    if (fieldData.show_border == '1') {
        $form.find("#showBorder").prop("checked", true).trigger("change");
    } else {
        $form.find("#showBorder").prop("checked", false).trigger("change");
    }
    if (fieldData?.show_all_options && fieldData.show_all_options == '1') {
        $form.find("#showAllOpt").prop("checked", true);
    } else {
        $form.find("#showAllOpt").prop("checked", false);
    }
    if (fieldData?.show_icons && fieldData.show_icons == '1') {
        $form.find("#showIcons").prop("checked", true);
    } else {
        $form.find("#showIcons").prop("checked", false);
    }

    // if (fieldData.formula_attribute != '') {
    //     $form.find(".formulasbox #formula").prop("checked", true);
    //     $form.find(".formulasbox #formula_attribute").val(fieldData.formula_attribute);
    //     $form.find(".formulasbox #formulaattribute").css('display','block');
    // } else {
    //     $form.find(".formulasbox #formula").prop("checked", false);
    //     $form.find(".formulasbox #formula_attribute").val('');
    //     $form.find(".formulasbox #formulaattribute").css('display','none');
    // }

    if (fieldData.is_dynamic_options == '1') {
        $form.find("#dynamicOptions").prop("checked", true);
        $form.find(".multipleoptionsbox").hide();
        $form.find(".dynamicOptionsInfoBox").show();
        $form.find("#fieldOptions,#fieldOptionsNote").val('');
        $form.find(".dynamicOptionsInfoBox #connection_attribute").attr('required', 'required').val(fieldData.connection_attribute);
    } else {
        $form.find("#dynamicOptions").prop("checked", false);
        // $form.find(".multipleoptionsbox").show();
        $form.find(".dynamicOptionsInfoBox").hide();
        $form.find(".dynamicOptionsInfoBox #connection_attribute").removeAttr('required').val('');
    }

    $form.find("#fieldWidth").val(fieldData.field_width);
    $form.find("#fieldSize").val(fieldData.font_size);
    $form.find("#fieldColor").val(fieldData.color);
    $form.find("#fieldDefault").val(fieldData.default_value);
    $form.find("#fieldMin").val(fieldData.min_length);
    $form.find("#fieldMax").val(fieldData.max_length);
    $form.find('#max_file_size_length').val('0');

    var fontWeight = $target.css('fontWeight');
    $form.find("#fontWeight").val(fontWeight);

    if (fieldData.show_opt_val == '1') {
        $form.find("#showOptVal").prop("checked", true);
    } else {
        $form.find("#showOptVal").prop("checked", false);
    }

    if (fieldData.allow_multi_file == '1') {
        $form.find("#multiFileSelect").prop("checked", true);
    } else {
        $form.find("#multiFileSelect").prop("checked", false);
    }
    if (fieldData.allow_multi_dropdown == '1') {
        $form.find("#multiOptionSelect").prop("checked", true).trigger("change");
        $form.find("#optionSeperator").val(fieldData.options_seperator ?? ", ");
    } else {
        $form.find("#multiOptionSelect").prop("checked", false).trigger("change");
    }

    if (fieldData.format != '') {
        var format = fieldData.format.split('.');
        $form.find("#fieldFormat").val(format[0]);
        $form.find("#fieldFormatTime").val(format[1]);
    }
    // options
    var fieldOptions = fieldData.options;
    fieldOptions.forEach(function (val, index) {
        if (index > 0) {
            var target = addNewField($('.multipleoptionsbox span.icon-plus'));
            $(target).find('.fieldOptions:last').val(val.name);
            $(target).find('.fieldOptionsNote:last').val(val.note);
            // color options
            if (fieldData.field_type == "checkbox" || fieldData.field_type == "radio") {
                $form.find('.optionsBgColor:last').val(val?.color);
                $form.find('.optionsColor:last').val(val?.text_color);
                $form.find('.fieldOptionsColor:last').css("backgroundColor", val?.color).css("color", val?.text_color);
            }
            // color options
        } else {
            $form.find('.multipleoptionsbox #fieldOptions').val(val.name);
            $form.find('.multipleoptionsbox #fieldOptionsNote').val(val.note);
            // color options
            $form.find(".fieldOptionsColor").remove();
            if (fieldData.field_type == "checkbox" || fieldData.field_type == "radio") {
                $form.find('.multipleoptionsbox #fieldOptionsNote').after(fieldOptionColor);
                $form.find('.multipleoptionsbox .optionsBgColor').val(val?.color);
                $form.find('.multipleoptionsbox .optionsColor').val(val?.text_color);
                $form.find('.multipleoptionsbox .fieldOptionsColor').css("backgroundColor", val?.color).css("color", val?.text_color);
            }
            // color options
        }
    });
    // autofill options
    var autofillOptions = fieldData.auto_fill;
    autofillOptions.forEach(function (val, index) {
        if (index > 0) {
            var target = addPrefillOption($('.fillableOptions span.icon-plus'));
            $(target).find('.autofillOption:last').val(val);
        } else {
            $form.find('.fillableOptions #autofillOption').val(val);
        }
    });

    var fileTypesA = fieldData.allow_file_types;
    fileTypesA.forEach(function (val, index) {
        $form.find('input[name=fileType][value=' + val + ']').prop('checked', true);
    })
    //
    defaultValueField(fieldData.field_type, fieldData.default_value)
    // advance setting
    if ($.inArray(fieldData.field_type, allowAdvanceSetting) >= 0) {
        $form.find('.advancesettingBox').show();
        $form.find('#displayRule').val(fieldData?.display_rule).trigger("change");;
        $form.find('#displayValueInput').val(fieldData?.display_input);
    }
    addFieldAttribute(fieldData?.custom_attribute);
    if (fieldData?.custom_attribute == assesmentAttributeOption) {
        addAssesmentActionOptions(fieldData?.assessment_action_rules);
    }
    // advance setting

    $form.find("#fieldMin,#fieldMax").val('').parent().show();
    if (fieldData.field_type == 'text') {
        $form.find('.dropdownbox,.fillableOptions').show();
    }
    else if (fieldData.field_type == 'text' || fieldData.field_type == 'textarea' || fieldData.field_type == 'number' || fieldData.field_type == 'phone') {
        $form.find('.fillableOptions').show();
    }
    else if (fieldData.field_type == 'select') {
        $form.find('.selectbox').hide();
        $form.find('.multipleoptionsbox,.dropdownbox').show();
        if (fieldData.is_dynamic_options == '1') {
            $form.find(".multipleoptionsbox").hide();
        }
        $form.find("#fieldMin,#fieldMax").val('').parent().hide();
    }
    else if (fieldData.field_type == 'radio') {
        $form.find('.optionsbox').show();
        $form.find('.radiooptions').show();
        $form.find('.multipleoptionsbox').show();
        if (fieldData.is_dynamic_options == '1') {
            $form.find(".multipleoptionsbox").hide();
        }
        $form.find("#fieldMin,#fieldMax").val('').parent().hide();
    }
    else if (fieldData.field_type == 'checkbox') {
        $form.find('.optionsbox').show();
        $form.find('.checkboxoptions').show();
        $form.find('.selectbox').show();
        $form.find('.multipleoptionsbox').show();
        $form.find("#fieldMin,#fieldMax").val('').parent().hide();
    }
    else if (fieldData.field_type == 'file' || fieldData.field_type == 'file_caption') {
        $form.find('.multiplefilesbox').show();
        $form.find('#max_file_size_length').val(fieldData.max_file_size_length);
        $form.find("#fieldMin,#fieldMax").val('').parent().hide();
        $form.find("input[name=printStyle][value='" + (fieldData.print_style ?? "H") + "']").prop("checked", true);
    }
    else if (fieldData.field_type == 'text' || fieldData.field_type == 'textarea') {
        // $form.find('.fillableOptions').show();
    }
    else if (fieldData.field_type == 'date') {
        $form.find('.dateformat').show();
        $form.find("#fieldMin,#fieldMax").val('').parent().hide();
    }
    else if (fieldData.field_type == 'time') {
        $form.find('.timeformat').show();
        $form.find("#fieldMin,#fieldMax").val('').parent().hide();
    }
    else if (fieldData.field_type == 'datetime') {
        $form.find('.dateformat,.timeformat').show();
        $form.find("#fieldMin,#fieldMax").val('').parent().hide();
    }
    else if (fieldData.field_type == 'signature') {
        $form.find("#fieldMin,#fieldMax").val('').parent().hide();
    }

    if ($.inArray(fieldData.field_type, allowCustomInputFields) >= 0) {
        let allowCustomInput = fieldData?.allow_custom_input === true;
        $form.find("#enableOtherOption").prop("checked", allowCustomInput).trigger("change");
        if (allowCustomInput) {
            let matchingOptions = fieldData?.matching_options || [];
            // $form.find("#otherFieldOptions").val(matchingOptions.join(", "))
            if (matchingOptions.length > 0) {
                choiceOtherOptions.setValue(matchingOptions);
            }
        }
    }
    if ($.inArray(fieldData.field_type, allowInterconnectionAttributes) >= 0) {
        $form.find('.dropdownbox').show();
    }
    if (fieldData?.is_duplicate && fieldData.is_duplicate) {
        $form.find("#duplicateField").prop("checked", true).trigger("change").attr("disabled", "disabled");
        $form.find("#parentField").val(fieldData.duplicate_name).trigger("change");
    }
    setCustomClasses($target)
    renderInlineData($target)
    showStyleForm();
    e.preventDefault();
    e.stopPropagation();
});
// edit/save input Fields end

// show preview start
const previewData = { CompanyName: "AJS Ltd", CompanyAddress: "Farley House<br>Kinvara Business Park<br>22-24 Freshwater Road<br>Dagenham", CompanyPhone: "020 8597 7000", CompanyPostcode: "RM8 1RY", ClientName: "London Borough of Hounslow", ClientAddress: "Hounslow House<br>7 Bath Road<br>Hounslow<br>Middlesex", ClientPhone: "012 5865 4265", ClientPostcode: "TW3 3EB", RegistrationNumber: "028210", ContractorReferenceNumber: "123321", InstallationAddress: "27, DERWENT LODGE, STAR ROAD<br>ISLEWORTH", InstallationPostcode: "TW7 4HF", InstallationPhone: "021 5455 8874", UPRN: "81798", Occupier: "", BranchNumber: "N/A", EngineerSignature: "<img src='' alt='Engineer Signature' width='150px'>", EngineerName: "Liam Manning", text: "Lorem Ipsum is simply dummy text", textarea: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", checkbox: "Option1,Option2", radio: "Option1", select: "Option1", file: "<img src='' alt='Engineer Signature' width='300px'>", signature: "<img src='' alt='Signature' width='300px'>", number: "25", phone: "021 2654 6454", email: "abc@ajs.com", file_caption: "<img src='' alt='Signature' width='300px'>", date: "24/05/2024", time: "05:00 AM", datetime: "24/05/2024 05:00 AM" };
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function setDateTimeFormate(field_type, format) {
    let currentDate = new Date();
    let date = currentDate.getDate();
    let month = currentDate.getMonth() + 1; // Months are zero-based
    let day = currentDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
    let Y = currentDate.getFullYear();
    let m = ("0" + month).slice(-2); // Months are zero-based
    let d = ("0" + date).slice(-2); // Date are zero-based
    let F = monthNames[month - 1];
    let l = dayNames[day];

    let hours = currentDate.getHours();
    let H = hours;
    H = ("0" + H).slice(-2);
    let A = hours >= 12 ? 'PM' : 'AM';

    let hour12 = hours % 12;
    let h = hour12 ? hour12 : 12; // If hour is 0, set it to 12
    h = ("0" + h).slice(-2);

    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();
    let i = ("0" + minutes).slice(-2);
    let s = ("0" + seconds).slice(-2);

    var val = format.replace('s', s).replace('d', d).replace('Y', Y).replace('m', m).replace('l,', l + ",").replace('H', H).replace('h', h).replace(' A', " " + A).replace('i', i);
    val = val.replace("F,", F + ",").replace("F ", F + " ").replace(" F", " " + F);

    var newformat = val.split('.');
    // return '';
    if (field_type == 'date') {
        return newformat[0];
    }
    else if (field_type == 'time') {
        return newformat[1];
    }
    else if (field_type == 'datetime') {
        return newformat[0] + ' ' + newformat[1];
    }
}

$(document).on("click", ".previewPDF", function (e) {
    ajs.submit_button_element = $(this);
    ajs.show_button_loader();
    e.preventDefault();
    e.stopPropagation();
    var $preview = $('.form-build').clone();
    $preview.find(".selectedCell").removeClass("selectedCell");
    $preview.find(".inputOption.isHidden, .dbFields.isHidden").remove();
    $preview.find(".pdf-hidd-sec").remove();

    $preview.find('table').each(function (index, element) {
        $(element).find('.addchilebtn').remove();
        $(element).find('*[contenteditable]').removeAttr('contenteditable');
        $(element).removeClass('table-bordered');
    });
    setHeaderStyle($preview)
    $preview.find('.dbFields').each(function (index, element) {
        var $data = $(element).attr('data-field-json');
        var fieldData = JSON.parse($data);
        var field = fieldData.default_value.replaceAll("{", "").replaceAll("}", "");
        $(element).html($(element).html().replace('{{' + field + '}}', previewData[field] ?? 'N/A'));
    });
    $preview.find('.dHeading,.dynamicTable,.dbFieldJSON').each(function (index, element) {
        $(element).removeAttr('data-field-json'); //remove unwanted attributes
    });

    $preview.find('.inputOption').each(function (index, element) {
        var jsonData = $(element).data('field-json');
        var parsedData = jsonData;
        var field_type = parsedData.field_type;

        // var borderCSS = '';
        // if(parsedData.show_border == '1'){
        //     borderCSS = 'border: 1px solid;';
        // }
        // var $width = parsedData.field_width;
        // var $width2 = $width/2;
        // borderCSS += 'width:'+$width+'%;';

        // var replaceWith = '[[' + parsedData.name + ']]';
        var replaceWith = previewData[field_type];
        if (parsedData.name2) {
            let padding = $(element).css('padding') || 0;
            let borderWidth = $(element).css('border-width') || 0;
            let borderStyle = $(element).css('border-style') || 'solid';
            let borderColor = $(element).css('border-color') || '';
            $(element).css({ padding: '', border: '' });
            let cssStyle = `style="width:50%;padding:${padding};border-width:${borderWidth};border-style:${borderStyle};border-color:${borderColor};"`;
            if (parsedData.print_style == "V") {
                replaceWith = '<table cellspacing="0" cellpadding="0"> <tr><td ' + cssStyle + '>[[' + previewData.text + ']]<br>[[' + (previewData[field_type] ?? 'N/A') + ']]</td></tr></table>';
            } else {
                replaceWith = '<table cellspacing="0" cellpadding="0"> <tr><td ' + cssStyle + '>[[' + previewData.text + ']]</td><td ' + cssStyle + ' align="center">[[' + (previewData[field_type] ?? 'N/A') + ']]</td></tr></table>';
            }
        }
        if (parsedData.field_type == "file") {
            let padding = $(element).css('padding') || 0;
            let borderWidth = $(element).css('border-width') || 0;
            let borderStyle = $(element).css('border-style') || 'solid';
            let borderColor = $(element).css('border-color') || '';
            $(element).css({ padding: '', border: '' });
            let cssStyle = `style="padding:${padding};border-width:${borderWidth};border-style:${borderStyle};border-color:${borderColor};"`;
            replaceWith = '<table cellspacing="0" cellpadding="0"> <tr><td ' + cssStyle + ' align="center">[[' + (previewData[field_type] ?? 'N/A') + ']]</td></tr></table>';
        }
        if (field_type == 'date' || field_type == 'time' || field_type == 'datetime') {
            replaceWith = setDateTimeFormate(field_type, parsedData.format)
        }

        $css = '';
        // $css = $(element).find("input, select, textarea").attr('style');
        var labelVal = '';
        var fieldVal = replaceWith;
        if (parsedData.show_label == '1') {
            var labelVal = '<label class="label-textarea">' + parsedData.field_label + '</label>';
        }
        $replaceWith = '{{LABEL}}{{VALUE}}';

        $replaceWith = $replaceWith.replace("{{LABEL}}", labelVal).replace("{{VALUE}}", `<span style="${$css}">${fieldVal}</span>`);
        $(element).removeAttr('data-field-json'); //remove unwanted attributes
        $(element).html($replaceWith);
    });

    var header = $('#headerPreview').clone();
    header.find('.addchilebtn').remove();
    header.find('.actions').remove();
    header.removeClass('table-bordered');
    header = header.html().replaceAll('<h2 class="text-center">+</h2>', '').replaceAll('<h2 class="text-center ui-sortable-handle">+</h2>', '');

    var footerData = {};
    footerData.left = $.trim(footerLeft.val());
    footerData.right = $.trim(footerRight.val());
    footerData.center = $.trim(footerCenter.val());
    var footer = JSON.stringify(footerData);

    $preview.find('td,th').removeClass('light_border');
    var modifiedHtml = $preview.html().replaceAll('<h2 class="text-center">+</h2>', '').replaceAll('<h2 class="text-center ui-sortable-handle">+</h2>', '');
    // $('.previewHTML').html(header+modifiedHtml+footer);
    $target = $("#preview-form");
    $target.find("#header").val(header);
    $target.find("#footer").val(footer);
    $target.find("#preview").val(modifiedHtml);
    // $('#previewModal').modal("show");
    setTimeout(function () {
        $("#preview-form").submit();
        ajs.hide_button_loader();
    }, 3000);
});
// show preview end

// save Certificate
function getUniqueID() {
    var datenow = new Date();
    var month = datenow.getMonth();
    var day = datenow.getDate();
    var year = datenow.getFullYear();
    var time = datenow.getTime();
    var unq = day + '' + month + '' + time + '' + year;
    var unqId = time + '' + year + '' + day + '' + month;
    return unqId;
}

$(document).on("click", "button.saveTemplate", function () {
    ajs.submit_button_element = $(this);
    ajs.show_button_loader();
    document.getElementById('saveCerti').reset();

    $('#saveTemplate').find("button[name='save']").attr('disabled', 'disabled').text('Loading...');
    let formJsonData = { 'sections': [] };

    // var formJsonData = new Array();
    jsonData = formJsonData.sections;
    var $target = $('.form-build .sectionStart:not(".mob-hidd-sec")');
    var sections = $target.length;
    var unq_inc_id = 0;
    $target.each((i, data) => {
        var duplicate_section = $(data).find('.sectionTitle').attr('data-duplicate-section');
        var section_unq_id = $(data).attr('data-section-id');
        $data = {};
        $fields = {};
        unq_inc_id++;
        if (section_unq_id == undefined) {
            $data.id = unq_inc_id + getUniqueID();
            $(data).attr('data-section-id', $data.id);
        } else {
            $data.id = section_unq_id;
        }
        var nextInc = i + 1;

        var appLabel = $.trim($(data).find('.sectionTitle').attr("app-label"));
        if (appLabel == undefined || appLabel == '') {
            appLabel = $.trim($(data).find('.sectionTitle').text());
        }
        $data.title = appLabel;
        // $data.title = $.trim($(data).find('.sectionTitle').text());

        position = $.trim($(data).find('.sectionTitle').attr('data-sort-order')) || nextInc;
        $data.position = parseInt(position) || nextInc;

        if (duplicate_section == '1') {
            $data.allow_duplicate = 1;
        } else {
            $data.allow_duplicate = 0;
        }
        var sorting_order = 0;
        $(data).find('.inputOption:not(.isDuplicate),.dHeading,.dynamicTable,.dbFieldJSON').each((index, tar) => {

            if ($(tar).hasClass('dynamicTable')) {
                var $data = $(tar).attr('data-field-json');
                var uid = $(tar).attr('data-field-uid');
                uid = index + uid;
                // $fields.push(JSON.parse($data));
                $fields[uid] = JSON.parse($data);

                if ($fields[uid].sort_order == "0" || resetSorting == true) {
                    $fields[uid].sort_order = sorting_order++;
                }

                $(tar).attr('data-field-json', JSON.stringify($fields[uid]));
                // var tableSubField = {};
                var tableFields = [];
                $(tar).find('.inputOption:not(.isDuplicate),.dHeading,.dbFieldJSON').each((ind, targ) => {
                    var tableSubField = {};
                    var $data2 = $(targ).attr('data-field-json');
                    var uid = $(targ).attr('data-field-uid');
                    uid = ind + uid;
                    var mdata = JSON.parse($data2);
                    if (mdata.sort_order == "0" || resetSorting == true) {
                        mdata.sort_order = sorting_order++;
                    }

                    $(targ).attr('data-field-json', JSON.stringify(mdata));

                    row = $(targ).closest('tr').index();
                    col = $(targ).closest('td').index();
                    mdata.position = (parseInt(row) + 1) + '.' + (parseInt(col) + 1);
                    if (tableFields[row]) {
                        tableSubField = tableFields[row].fields;
                    } else {
                        tableFields[row] = {};
                    }
                    tableSubField[uid] = mdata;

                    unq_inc_id++;
                    tableFields[row].id = unq_inc_id + getUniqueID();
                    tableFields[row].title = $.trim($(tar).find('table').attr('data-label'));
                    tableFields[row].fields = tableSubField;

                });
                // tableFields.fields = tableSubField;      
                $fields[uid].table_rows = tableFields;
            }
            else if ($(tar).parents('div').hasClass('dynamicTable')) {
            } else {
                var $data = $(tar).attr('data-field-json');
                var uid = $(tar).attr('data-field-uid');
                uid = index + uid;
                // $fields.push(JSON.parse($data));
                $field_data = JSON.parse($data);
                if ($field_data.sort_order == "0" || resetSorting == true) {
                    $field_data.sort_order = sorting_order++;
                }

                $(tar).attr('data-field-json', JSON.stringify($field_data));
                $fields[uid] = $field_data;
            }
        })
        $data.fields = $fields;
        var lng = Object.keys($fields).length;
        if (lng >= 1) {
            jsonData.push($data);
        }
    });
    // 
    var headerPreview = $('#headerPreview').clone();
    headerPreview.find('.addchilebtn').remove();
    headerPreview.find('.actions').remove();
    headerPreview.removeClass('table-bordered');
    headerPreview = headerPreview.html().replaceAll('<h2 class="text-center">+</h2>', '').replaceAll('<h2 class="text-center ui-sortable-handle">+</h2>', '');

    var footerData = {};
    footerData.left = $.trim(footerLeft.val());
    footerData.right = $.trim(footerRight.val());
    footerData.center = $.trim(footerCenter.val());
    var footerPreview = JSON.stringify(footerData);
    // 
    var certi_id = $('.certificateBox').val();
    var $preview = $('.form-build').clone();
    $preview.find(".selectedCell").removeClass("selectedCell");
    var modifiedHtml = $preview.html();

    $preview.find('table').each(function (index, element) {
        $(element).find('.addchilebtn').remove();
        $(element).find('*[contenteditable]').removeAttr('contenteditable');
        $(element).removeClass('table-bordered');
    });

    // $preview.find('.inputOption').each(function(index, element) {
    //     var jsonData = $(element).data('field-json');
    //     var parsedData = jsonData;
    //     var replaceWith = '[[' + parsedData.name + ']]';
    //     $(element).text(replaceWith);
    // });
    $preview.find('.dynamicTable').each(function (index, element) {
        var jsonData = $(element).data('field-json');
        var parsedData = jsonData;
        var replaceWith = '[[' + parsedData.name + ']]';
        $(element).html(replaceWith);
    });

    $preview.find('.inputOption').each(function (index, element) {
        var jsonData = $(element).data('field-json');
        var parsedData = jsonData;
        // var borderCSS = '';
        // if(parsedData.show_border == '1'){
        //     borderCSS = 'border: 1px solid;';
        // }
        // var $width = parsedData.field_width;
        // var $width2 = $width/2;
        // // borderCSS += 'width:'+$width+'%;';
        if ($(element).hasClass("isDuplicate")) { // duplicate field
            parsedData.name = parsedData.duplicate_name;
        }
        var replaceWith = '[[' + parsedData.name + ']]';
        if (parsedData.name2) {
            let padding = $(element).css('padding') || 0;
            let borderWidth = $(element).css('border-width') || 0;
            let borderStyle = $(element).css('border-style') || 'solid';
            let borderColor = $(element).css('border-color') || '';
            $(element).css({ padding: '', border: '' });
            let cssStyle = `style="width:50%;padding:${padding};border-width:${borderWidth};border-style:${borderStyle};border-color:${borderColor};"`;
            if (parsedData.print_style == "V") {
                replaceWith = '<table cellspacing="0" cellpadding="0"> <tr><td ' + cssStyle + '>[[' + parsedData.name2 + ']]<br>[[' + parsedData.name + ']]</td></tr></table>';
            } else {
                replaceWith = '<table cellspacing="0" cellpadding="0"> <tr><td ' + cssStyle + '>[[' + parsedData.name2 + ']]</td><td ' + cssStyle + ' align="center">[[' + parsedData.name + ']]</td></tr></table>';
            }
        }
        if (parsedData.field_type == "file") {
            let padding = $(element).css('padding') || 0;
            let borderWidth = $(element).css('border-width') || 0;
            let borderStyle = $(element).css('border-style') || 'solid';
            let borderColor = $(element).css('border-color') || '';
            $(element).css({ padding: '', border: '' });
            let cssStyle = `style="padding:${padding};border-width:${borderWidth};border-style:${borderStyle};border-color:${borderColor};"`;
            replaceWith = '<table cellspacing="0" cellpadding="0"> <tr><td ' + cssStyle + ' align="center">[[' + parsedData.name + ']]</td></tr></table>';
        }
        $css = '';
        // $css = $(element).find("input, select, textarea").attr('style');
        var labelVal = '';
        var fieldVal = replaceWith
        if (parsedData.show_label == '1') {
            var labelVal = '<label class="label-textarea">' + parsedData.field_label + '</label>';
        }
        $replaceWith = '{{LABEL}}{{VALUE}}';

        $replaceWith = $replaceWith.replace("{{LABEL}}", labelVal).replace("{{VALUE}}", `<span style="${$css}">${fieldVal}</span>`);
        $(element).removeAttr('data-field-json'); //remove unwanted attributes
        $(element).html($replaceWith);
    });
    $preview.find('td,th').removeClass('light_border');
    dupli_sec_counter = 0;
    $preview.find(".isHidden").remove();
    $preview.find(".pdf-hidd-sec").remove();
    $preview.find('.sectionStart:not(".mob-hidd-sec")').after(function (index, section) {
        var sec = $(section).find(".inputOption,.dHeading,.dynamicTable,.dbFields");
        if (sec.length > 0) {
            dupli_sec_counter++;
            return `{{DUPLICATE_SECTION_APPEND_${$(this).attr('data-section-id')}}}`;
        }
    });
    $preview.find(".inputOption.isHidden, .dbFields.isHidden").remove();//remove hidden field
    setHeaderStyle($preview);
    var certi_template = $preview.html().replaceAll('<h2 class="text-center">+</h2>', '').replaceAll('<h2 class="text-center ui-sortable-handle">+</h2>', '');

    if (typeof editId !== 'undefined') {
        $('#saveTemplate').find('#name').val(templateN);
        $('#saveTemplate').find('#version').val(templateV);
    }
    $('#certi_id').val(certi_id);
    $('#validation_rules').val(JSON.stringify(validations_data)); //validations data
    $('#certi_json').val(JSON.stringify(formJsonData));
    $('#report_data').val(JSON.stringify(reportData));
    $('#certi_html').val(modifiedHtml.replace(/  +/g, ' '));
    $('#certi_template').val(certi_template.replace(/\s\s+/g, ''));
    $('#certi_header').val(headerPreview.replace(/  +/g, ' '));
    $('#certi_footer').val(footerPreview.replace(/  +/g, ' '));
    $('#saveTemplate').modal("show");
    setTimeout(function () {
        $('#saveTemplate').find("button[name='save']").removeAttr('disabled').text('Save');
        ajs.hide_button_loader();
    }, 3000);
});
$(document).on("submit", "form.saveTemplate", function () {
    var formData = $(this).serialize();
    $('#saveTemplate').find("button[name='save']").attr('disabled', 'disabled').text('Loading...');
    $.ajax({
        type: 'POST',
        url: savePdfTemplate, // Replace with your server-side script URL
        data: formData,
        beforeSend: function (xhr, settings) {
            ajs.set_auth_header(xhr, settings);
        },
        success: function (response) {
            // Handle successful response
            // alert(response.message);
            Swal.fire({
                icon: 'success',
                title: 'Success!!!',
                text: response.message
            }).then((result) => {
                location.href = backURL;
            })
            $('#saveTemplate').modal("hide");
            $('#saveTemplate').find("button[name='save']").removeAttr('disabled').text('Save');
            // 
        },
        error: function (xhr, status, error) {
            var status_code = xhr.status;
            if (status_code == 401) {
                refreshToken().then(function () {
                    $('form.saveTemplate').trigger('submit');
                });

                return; // Stop further execution
            }
            // Handle error
            var error_response = JSON.parse(xhr.responseText);
            //console.log(error_response);
            // alert(xhr.responseText);
            var target = document.createElement('div');
            target.innerHTML = error_response.message;
            var firstPTag = target.querySelector('p');
            var errorMsg = firstPTag ? firstPTag.textContent : 'Something went wrong.';
            Swal.fire({
                icon: 'error',
                title: 'Error!!!',
                text: errorMsg
            })
            $('#saveTemplate').find("button[name='save']").removeAttr('disabled').text('Save');
        }
    });
    return false;
});
// save Certificate

// table styling(Cell Selctions)
var isCtrlPressed = false;

// Event handler for Ctrl key press
$(document).keydown(function (event) {
    if (event.which === 17) { // Check if Ctrl key is pressed (key code for Ctrl is 17)
        isCtrlPressed = true;
    }
});
// Event handler for Ctrl key release
$(document).keyup(function () {
    isCtrlPressed = false;
});

// $(document).on("click","table td",()=>{
//     alert(isCtrlPressed);
//     if (isCtrlPressed) {
//         $(this).toggleClass('selected_cell'); // Toggle the 'selected' class on Ctrl + click
//     } else {
//         // Deselect all other cells if Ctrl is not pressed
//          $('.fTable td').removeClass('selected_cell');
//          $(this).addClass('selected_cell');
//      }
// })
// table styling(Cell Selctions)

// Header/Footer Start
let $headers = [];
let $footers = [];
let $templates = [];

function getTemplates() {
    $.ajax({
        type: 'GET',
        url: getTemplatesURL, // Replace with your server-side script URL
        beforeSend: function (xhr, settings) {
            ajs.set_auth_header(xhr, settings);
        },
        success: function (response) {
            var options = "";
            if (response.status) {
                var res = response.data;
                res.forEach((data, ind) => {
                    $templates.push({ id: data.id, title: data.title });
                    options += "<option value='" + data.id + "'>" + data.title + "</option>";
                })
            } else {
                options = "<option selected value=''>--No Templates Found--</option>";
            }
            $('.templateSelcetionBox #fieldTemplates').html(options);
        },
        error: function (xhr, status, error) {
            var status_code = xhr.status;
            if (status_code == 401) {
                refreshToken().then(function () {
                    getTemplates();
                });

                return; // Stop further execution
            }
            setTimeout(getTemplates, 5000); // on failed recall again in 5 Sec.
            console.error(xhr.responseText);
        }
    });
}
setTimeout(getTemplates, 4000);

function getCertificates() {
    $.ajax({
        type: 'GET',
        url: getCertificatesURL, // Replace with your server-side script URL
        beforeSend: function (xhr, settings) {
            ajs.set_auth_header(xhr, settings);
        },
        success: function (response) {
            var res = response.data || response.message.data;
            res.forEach((head, ind) => {
                $(".certificateBox").append("<option value='" + head.id + "'>" + head.title + "</option>")
            })
        },
        error: function (xhr, status, error) {
            var status_code = xhr.status;
            if (status_code == 401) {
                refreshToken().then(function () {
                    getCertificates();
                });

                return; // Stop further execution
            }
            // Handle error
            console.error(xhr.responseText);
        }
    });
}

function getHeaders() {
    $(".headersBox").append("<option value='addNew'>Add New Header</option>");
    $.ajax({
        type: 'GET',
        url: getHeadersURL, // Replace with your server-side script URL
        beforeSend: function (xhr, settings) {
            ajs.set_auth_header(xhr, settings);
        },
        success: function (response) {
            var res = response.message.data;
            res.forEach((head, ind) => {
                $headers.push({ "id": head.id, "title": head.title, "data": head.data });
                $(".headersBox").append("<option value='" + head.id + "'>" + head.title + "</option>")
            })
        },
        error: function (xhr, status, error) {
            var status_code = xhr.status;
            if (status_code == 401) {
                refreshToken().then(function () {
                    getHeaders();
                });

                return; // Stop further execution
            }
            // Handle error
            console.error(xhr.responseText);
        }
    });
}
function getFooters() {
    $(".footersBox").append("<option value='addNew'>Add New Footer</option>");
    $.ajax({
        type: 'GET',
        url: getFootersURL, // Replace with your server-side script URL
        beforeSend: function (xhr, settings) {
            ajs.set_auth_header(xhr, settings);
        },
        success: function (response) {
            var res = response.message.data;
            res.forEach((head, ind) => {
                $footers.push({ "id": head.id, "title": head.title, "data": head.data });
                $(".footersBox").append("<option value='" + head.id + "'>" + head.title + "</option>")
            })
        },
        error: function (xhr, status, error) {
            var status_code = xhr.status;
            if (status_code == 401) {
                refreshToken().then(function () {
                    getFooters();
                });

                return; // Stop further execution
            }
            // Handle error
            console.error(xhr.responseText);
        }
    });
}
$(document).on("change", ".headersBox", function () {
    var $val = $.trim($(this).val());
    if ($val == 'addNew') {
        replaceHeader(); return false;
    }
    $val = parseInt($val);
    var header = $headers.find(item => item.id === $val);
    if (header.id != undefined) {
        $('#headerPreview').html(header.data);
        addChildBtns();
    } else {
        $('#headerPreview').html('');
    }
});
$(document).on("change", ".footersBox", function () {
    var $val = $.trim($(this).val());
    if ($val == 'addNew') {
        replaceFooter(); return false;
    }
    $val = parseInt($val);
    var footer = $footers.find(item => item.id === $val);
    if (footer.id != undefined) {
        setFooter(footer.data);
    } else {
        setFooter(false);
    }
});
// Header/Footer End

// Edit Templates Start
function editTemplate() {
    var $form = $('#saveCerti');
    $form.find("#edit_id").remove();
    $form.append("<input type='hidden' id='edit_id' name='edit_id' value='" + editId + "'>");
    $('#saveTemplate').hide();
    $('.headersBox,.footersBox,.certificateBox,.addNewSection').attr("disabled", "disabled");
    $.ajax({
        type: 'GET',
        url: getTemplateData, // Replace with your server-side script URL
        beforeSend: function (xhr, settings) {
            ajs.set_auth_header(xhr, settings);
        },
        success: function (response) {
            if (response.status == false) {
                showerrorandback(response.type); return
            }
            var res = response.message.data;
            templateN = res.title;
            templateV = res.template_version;
            $('.certificateTemplateName').text(res.title);
            $form.find('#name').val(res.title);
            $form.find('#effective_date').attr('value', res.effective_date);
            $form.find('#version').val(res.template_version);
            $form.find("#certi_json").val(res.template_json);
            $form.find("#report_data").val(res.report_fields ?? "");
            initReportData(res.report_fields ?? "");
            set_validation_fields(res.validation_rules); // validation data
            $form.find("#certi_html").val(res.template_html);
            $form.find("#certi_template").val(res.template_data);
            $form.find("#certi_header").val(res.header_html);
            $form.find("#certi_footer").val(res.footer_text);
            $('#headerPreview').html(res.header_html);
            $('.form-build').html(res.template_html);
            // $('.connectionbox').html(res.interconnection_html);
            setFooter(res.footer_text);
            $('button.saveTemplate').show();
            $('.headersBox,.footersBox,.certificateBox,.addNewSection').removeAttr('disabled');
            dragdrop();
            setConnectionView(res);
            setTimeout(addChildBtns, 1000)
            // setFormulaView(res);
            // $(".form-build tbody").sortable({
            //     connectWith: ".form-build tbody",
            //     helper: "clone",
            //     cursor: "move",
            //     placeholder: "ui-state-highlight",
            //     start: function(event, ui) {
            //       ui.helper.addClass("ui-helper");
            //     },
            //     stop: function(event, ui) {
            //       ui.item.removeClass("ui-helper");
            //     }
            //   }).disableSelection();
            templateStatus = res.status;
            statusTemplates();
        },
        error: function (xhr, status, error) {
            var status_code = xhr.status;
            if (status_code == 401) {
                refreshToken().then(function () {
                    editTemplate();
                });

                return; // Stop further execution
            }
            // Handle error
            var error_response = JSON.parse(xhr.responseText);
            // $('.headersBox,.footersBox,.certificateBox,.addNewSection').removeAttr('disabled');
            showerrorandback(error_response.type);
            console.error(xhr.responseText);
        }
    });
}
// Edit Templates End

function showerrorandback(message) {
    Swal.fire({
        icon: 'error',
        title: 'Error!!!',
        text: message
    }).then((result) => {
        location.href = backURL;
    })
}

// duplicate template start
function duplicateFunaction() {
    var $form = $('#saveCerti');
    $('#saveTemplate').hide();
    $('.headersBox,.footersBox,.certificateBox,.addNewSection').attr("disabled", "disabled");
    $.ajax({
        type: 'GET',
        url: getTemplateData, // Replace with your server-side script URL
        beforeSend: function (xhr, settings) {
            ajs.set_auth_header(xhr, settings);
        },
        success: function (response) {
            if (response.status == false) {
                showerrorandback(response.type); return
            }
            var res = response.message.data;
            $form.find("#certi_json").val(res.template_json);
            $form.find("#report_data").val(res.report_fields ?? "");
            initReportData(res.report_fields ?? "");
            set_validation_fields(res.validation_rules); // validation data
            $form.find("#certi_html").val(res.template_html);
            $form.find("#certi_template").val(res.template_data);
            $form.find("#certi_header").val(res.header_html);
            $form.find("#certi_footer").val(res.footer_text);
            $('#headerPreview').html(res.header_html);
            $('.form-build').html(res.template_html);
            setFooter(res.footer_text);
            $('button.saveTemplate').show();
            $('.headersBox,.footersBox,.certificateBox,.addNewSection').removeAttr('disabled');
            setTimeout(function () { $(".certificateBox").val(res.certificate_id); }, 200)
            dragdrop();
            setConnectionView(res);
            // setFormulaView(res);
        },
        error: function (xhr, status, error) {
            var status_code = xhr.status;
            if (status_code == 401) {
                refreshToken().then(function () {
                    duplicateFunaction();
                });

                return; // Stop further execution
            }
            // Handle error
            // alert(xhr.responseText);
            $('.headersBox,.footersBox,.certificateBox,.addNewSection').removeAttr('disabled');
            var error_response = JSON.parse(xhr.responseText);
            showerrorandback(error_response.type);
            console.error(xhr.responseText);
        }
    });
}
if (typeof duplicate_id !== 'undefined') {
    $('.form-build').html("<h4 clas='text-center'>Loading...</h4>");
    duplicateFunaction();
}
// duplicate template end

// Row/Column Merge
$(document).on("click", ".dynamicTable table td,.fTable table td", function (event) {
    var $this = $(this);
    var $thisT = $(this).parents('table');
    var currentCol = $this.index();
    var currentRow = $this.parent().index();
    if ($this.hasClass('selectedCell')) {
        $this.removeClass("selectedCell");
        var lent = $(this).parents('table').find('.selectedCell').length;
        if (lent > 1) {
            $('.mergecellsbtn').show();
        } else {
            $('.mergecellsbtn').hide();
        }
        return false;
    }

    if (event.ctrlKey) {
        // Handle multi-selection with Ctrl key pressed
        var rowIndex1 = $thisT.find('td.selectedCell:first').parent().index();
        var rowIndex2 = $thisT.find('td.selectedCell:last').parent().index();

        var colIndex1 = $thisT.find('td.selectedCell:first').index();
        var colIndex2 = $thisT.find('td.selectedCell:last').index();

        if ((rowIndex1 === currentRow && rowIndex2 === currentRow) ||
            (colIndex1 === currentCol && colIndex2 === currentCol)) {
            $this.addClass("selectedCell");
        } else {
            $('td').removeClass("selectedCell");
            $this.addClass("selectedCell");
        }

        // selectCells($thisT);
    } else {
        // Handle single selection without Ctrl key
        $('td').removeClass("selectedCell");
        // $this.addClass("selectedCell");
        $('.mergecellsbtn').hide();
    }
    var lent = $(this).parents('table').find('.selectedCell').length;
    if (lent > 1) {
        $('.mergecellsbtn').show();
    } else {
        $('.mergecellsbtn').hide();
    }
    event.preventDefault();
    event.stopPropagation();
});
function selectCells($target) {
    var rowIndex1 = $target.find('td.selectedCell:first').parent().index();
    var rowIndex2 = $target.find('td.selectedCell:last').parent().index();

    var colIndex1 = $target.find('td.selectedCell:first').index();
    var colIndex2 = $target.find('td.selectedCell:last').index();
    var mergedCells = 0;
    if (colIndex1 == colIndex2) {
        for (ind = rowIndex1; ind < rowIndex2; ind++) {
            $target.find('table tr').eq(ind).find('td').eq(colIndex1).addClass('selectedCell');
        }
    }
    if (rowIndex1 == rowIndex2) {
        for (ind = colIndex1; ind < colIndex2; ind++) {
            $target.find('table tr').eq(rowIndex1).find('td').eq(ind).addClass('selectedCell');
        }
    }
}

// Function to merge selected cells
function mergeSelectedCells() {
    var selectedCells = $('td.selectedCell');

    if (selectedCells.length > 1) {
        var firstCell = selectedCells.first();
        var lastCell = selectedCells.last();
        var rowSpan = 1;
        var colSpan = 1;

        // Check if all selected cells are in the same row
        if (firstCell.parent().is(lastCell.parent())) {
            colSpan = selectedCells.length;
            if (firstCell.attr('colspan')) {
                colSpan += parseInt(firstCell.attr('colspan')) - 1;
            }
            firstCell.attr('colspan', colSpan);
        }
        // Check if all selected cells are in the same column
        else if (firstCell.index() === lastCell.index()) {
            rowSpan = selectedCells.length;
            if (firstCell.attr('rowspan')) {
                rowSpan += parseInt(firstCell.attr('rowspan')) - 1;
            }
            firstCell.attr('rowspan', rowSpan);
        }
        // Otherwise, clear selection and do nothing
        else {
            alert("Selected cells must be in the same row or column to merge.");
            return;
        }

        // Remove the other cells
        selectedCells.not(':first').remove();
        $('td').removeClass("selectedCell");
    } else {
        alert("Please select more than one cell to merge.");
    }
    $('.mergecellsbtn').hide();
}
// Row/Column Merge


// ToolTips
function showTool() {
    const tooltip = document.querySelector('.actiontooltip');
    const mainCont = document.querySelector('.form-build');

    // tooltip.addEventListener('mouseenter', () => {
    //     const containerRect = mainCont.getBoundingClientRect();
    //     const tooltipRect = tooltip.getBoundingClientRect();
    //     const availableSpaceAbove = containerRect.top;
    //     const availableSpaceBelow = window.innerHeight - containerRect.bottom;

    //     if (availableSpaceAbove > tooltipRect.height) {
    //         tooltip.classList.remove('bottom');
    //         tooltip.classList.add('top');
    //     } else if (availableSpaceBelow > tooltipRect.height) {
    //         tooltip.classList.remove('top');
    //         tooltip.classList.add('bottom');
    //     } else if (availableSpaceAbove > availableSpaceBelow) {
    //         tooltip.classList.remove('bottom');
    //         tooltip.classList.add('top');
    //     } else {
    //         tooltip.classList.remove('top');
    //         tooltip.classList.add('bottom');
    //     }
    // });
}
$(document).on("mouseenter hover", ".form-build .fTable,.form-build .inputOption,.form-build .fTitle,.form-build .fHeading,.form-build .dHeading,.form-build .fDescription,.form-build .dynamicTable,.form-build .dbFields", function () {
    var obj = $(this);
    var title = '';
    var classList = ''
    var Msg = '';
    if (obj.hasClass('fTable')) {
        title = "Table";
        classList = 'bottom';
        Msg = "&#9881; Edit Table Field.";
    }
    if (obj.hasClass('inputOption')) {
        title = "Input";
        classList = '';
        Msg = "&#9881; Edit Input Field.";
    }
    if (obj.hasClass('fTitle')) {
        title = "Title";
        classList = '';
        Msg = "Click to edit text.";
    }
    if (obj.hasClass('fHeading')) {
        title = "Heading";
        classList = '';
        Msg = "Click to edit text.";
    }
    if (obj.hasClass('dHeading')) {
        title = "Dynamic Heading";
        classList = '';
        Msg = "&#9881; Edit Dynamic Heading Field.";
    }
    if (obj.hasClass('fDescription')) {
        title = "Description";
        classList = '';
        Msg = "Click to edit text.";
    }
    if (obj.hasClass('dynamicTable')) {
        title = "Table Templates";
        classList = 'bottom';
        classList = 'bottom';
        Msg = "&#9881; Edit Table Templates Field.";
    }
    if (obj.hasClass('dbFields')) {
        title = "DB";
        classList = '';
        Msg = "&#9881; Edit DB Field.";
    }
    // classList = '';

    var toolbox = '<div class="actiontooltip ' + classList + '">';
    toolbox += "<span class='editfield btn btn-sm btn-success'>" + Msg + "</span>";
    toolbox += "</div>";
    $(this).find('.actiontooltip').remove();
    if (classList == 'bottom') {
        $(this).append(toolbox);
    } else {
        $(this).prepend(toolbox);
    }
    showTool();
})

$(document).on("mouseleave", ".form-build .fTable,.form-build .inputOption,.form-build .fTitle,.form-build .fHeading,.form-build .dHeading,.form-build .fDescription,.form-build .dynamicTable,.form-build .dbFields", function () {
    $(this).find('.actiontooltip').remove();
});
$(document).on("keyup click", ".form-build .fTitle,.form-build .fHeading,.form-build .fDescription", function () {
    $(this).find('.actiontooltip').remove();
});
// ToolTips

function enableSortables() {
    // Reorder Sections
    $(".form-build").sortable({
        items: ".sectionStart:not(.sticky)",
        connectWith: ".form-build",
        handle: ".sectionTitle",
        cancel: ".sticky",
        placeholder: "ui-state-highlight ui-corner-all",
        update: function (event, ui) { }
    }).disableSelection();
    // Reorder Sections

    // Reorder fields
    setTimeout(() => {
        $(".main-section .child-sec").sortable({
            connectWith: ".child-sec",
            placeholder: "ui-state-highlight ui-corner-all",
            update: function (event, ui) { }
        }).disableSelection();
    }, 2000);
    // Reorder fields
}
enableSortables();

// Reorder Fields
// $('.row-sec').each(function(){
//     $(this).find(".row-sec").sortable({
//         items: ".main-section:not(.sticky)",
//         connectWith: ".row-sec",
//         handle: ".child-sec",
//         cancel: ".sticky",
//         placeholder: "ui-state-highlight ui-corner-all",
//         update: function(event, ui) {}
//     });
// })
// Reorder Fields

function defaultValueField(fType, dVal) {
    var $form = $('#fieldSettingForm');
    var isDynamic = $form.find("#dynamicOptions").is(":checked");
    var flabel = `<label for="fieldDefault" class="form-label">Default Value</label>`;
    if ((fType == "radio" || fType == "checkbox" || fType == "select") && !isDynamic) {
        selected = ("N/A" == dVal) ? 'selected' : '';
        var options = `<option value="">--Select--</option><option value="N/A">N/A</option>`;
        $form.find('.fieldOptions').each(function (index) {
            var val = $.trim($(this).val());
            if (val != '' && val != ' ') {
                selected = (val == dVal) ? 'selected' : '';
                options += `<option value="${val}" ${selected}>${val}</option>`;
            }
        });
        $form.find("#fieldDefault").parent().html(`${flabel}<select class="form-control" id="fieldDefault">${options}</select>`)
    } else {
        $form.find("#fieldDefault").parent().html(`${flabel}<input type="text" class="form-control" id="fieldDefault" placeholder="Default Value" value="${dVal}">`)
        if (fType == 'file' || fType == 'file_caption' || fType == 'signature') {
            $form.find("#fieldDefault").val('');
            $form.find("#fieldDefault").parent().hide();
        }
    }
}

$(document).on("click change", ".multipleoptionsbox .fa.icon-plus, .multipleoptionsbox .fieldOptions", function (e) {
    var dval = $("#fieldDefault").val();
    defaultValueField("select", dval)
})

function changeFieldType(is_editable = false) {
    var $form = $('#fieldSettingForm');
    var flabel = `<label for="fieldType" class="form-label">Field Type</label>`;
    var editableFields = ["number", "phone", "email", "date", "time", "datetime", "text", "textarea", "checkbox", "radio", "select", "file", "file_caption", "signature"];
    if (is_editable) {
        var options = ``;
        editableFields.forEach(function (value, index) {
            options += `<option value="${value}">${value.toUpperCase()}</option>`;
        });
        $form.find("#fieldType").parent().html(`${flabel}<select class="form-control" id="fieldType" readonly disabled required>${options}</select>`)
    } else {
        $form.find("#fieldType").parent().html(`${flabel}<input type="text" class="form-control" id="fieldType" readonly disabled required>`)
    }
}

var $form = $('#fieldSettingForm');
$(document).on("change", "#multiOptionSelect", function () {
    if ($(this).is(":checked") == true) {
        $form.find('#showOptVal').prop("checked", true);
        $form.find('#showIcons').prop("checked", false);
        $form.find('#optionSeperatorBox').show();
    } else {
        $form.find('#optionSeperatorBox').hide();
    }
})

$(document).on("change", "#showAllOpt", function () {
    if ($(this).is(":checked") == true) {
        $form.find('#showOptVal').prop("checked", true);
        $form.find('#showIcons').prop("checked", false);
    }
})

$(document).on("change", "#showIcons", function () {
    if ($(this).is(":checked") == true) {
        $form.find('#multiOptionSelect').prop("checked", false);
        $form.find('#showAllOpt').prop("checked", false);
        $form.find('#showOptVal').prop("checked", true);
    }
})

$(document).on("change", "#showOptVal", function () {
    if ($(this).is(":checked") == false) {
        $form.find('#multiOptionSelect').prop("checked", false);
        $form.find('#showAllOpt').prop("checked", false);
        $form.find('#showIcons').prop("checked", false);
    }
})

//Add important CSSS
$.fn.cssImportant = function (property, value) {
    return this.each(function () {
        this.style.setProperty(property, value, 'important');
    });
};


// add header and footer code start
function replaceHeader() {
    $('#headerPreview').html($newSection.replace("{PART_NUMBER}", "1"));
    $('#headerPreview .sectionTitle').text('');
    $('.droppable').off().on({
        dragenter: dragEnter,
        dragover: dragOver,
        dragleave: dragLeave,
        drop: dropNow
    });
}

function replaceFooter() {
    setFooter(false);
}
// add header and footer code start

// upload logo code
$(document).on('click', "#uploadLogoBtn", function () {
    $('#logoUploadBox').remove();
    $(".actionLogoContainer").removeClass("actionLogoContainer")
    const $button = $(this);
    $button.closest('.logoUpload').addClass("actionLogoContainer");
    var $targetIMG = $(".actionLogoContainer");

    const $input = $('<input type="file" accept="image/*" style="display:none;" id="logoUploadBox">');
    $('body').append($input);
    $input.trigger('click');

    $input.on('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            var image_name = file.name;
            var image_extension = image_name.split('.').pop().toLowerCase();
            if (jQuery.inArray(image_extension, ['jpg', 'jpeg', 'png']) == -1) {
                // alert('Invalid image file');
                Swal.fire({
                    icon: 'error',
                    title: 'Error!!!',
                    text: "Invalid image file"
                })
                return false;
            }

            let formData = new FormData();
            formData.append('upload', file);
            formData.append("upload_type", 'templates');
            formData.append('file_type', "image");
            formData.append('acl', "public-read");
            formData = ajs.encrypt_form_data(formData);
            $.ajax({
                url: site_url + 'api/file/upload_s3',
                type: 'POST',
                data: formData,
                async: true,
                beforeSend: function (xhr, settings) {
                    ajs.set_auth_header(xhr, settings);
                    ajs.show_button_loader();
                    ajs.show_loader();
                },
                complete: function () {
                    ajs.hide_button_loader();
                    ajs.hide_loader();
                },
                success: function (res) {
                    // alert(res.message);
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!!!',
                        text: res.message
                    })
                    if (res.status) {
                        if ($targetIMG.children('img').length > 0) {
                            $targetIMG.find("img").attr("src", res.live_path);
                        } else {
                            $targetIMG.append(`<img src="${res.live_path}" width="100%" height="100%">`);
                        }
                    }
                },
                error: function (err) {
                    var status_code = err.status;
                    if (status_code == 401) {
                        refreshToken().then(function () {
                            $('#uploadLogoBtn').trigger('click');
                        });

                        return; // Stop further execution
                    }
                    var error_response = JSON.parse(err.responseText);
                    // alert(err.message);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!!!',
                        text: error_response.message
                    })
                    status_code = err.status;
                },
                cache: false,
                contentType: false,
                processData: false
            });

            $input.remove();
        }
    });

    $input.on('click', function () {
        setTimeout(() => {
            if (!$input.val()) {
                $input.remove();
            }
        }, 1000);
    });
});
// upload logo code

$(document).on("hover mouseenter", ".logoUpload", function () {
    var actions = `<div class="actionslogo"><button class="btn btn-sm btn-primary" id="uploadLogoBtn">Upload Logo</button><button class="btn btn-sm btn-primary" id="logoSize">Logo Size</button></div>`;
    $(this).append(actions);
})

$(document).on("mouseleave", ".logoUpload", function () {
    $(this).find(".actionslogo").remove();
});

$(document).on('click', "#logoSize", function () {
    $(".actionLogoContainer").removeClass("actionLogoContainer")
    const $button = $(this);
    $button.closest('.logoUpload').addClass("actionLogoContainer");
    var $targetIMG = $(".actionLogoContainer");

    let currentWidth = parseInt($targetIMG.css('width'));
    currentWidth = isNaN(currentWidth) ? 80 : currentWidth;

    let currentHeight = parseInt($targetIMG.css('height'));
    currentHeight = isNaN(currentHeight) ? 80 : currentHeight;

    let width = prompt("Enter logo width in pixels (integer only:", currentWidth);
    let height = prompt("Enter logo height in pixels (integer only:", currentHeight);

    if (width !== null && height !== null) {
        width = parseInt(width);
        height = parseInt(height);

        if (!isNaN(width) && !isNaN(height) && width > 0 && height > 0) {
            $targetIMG.css("width", width + 'px').css("height", height + 'px');
        } else {
            alert("Please enter valid positive integers for both width and height.");
        }
    }
});

let addChildBtn = `<div class="addchilebtn"><button class="btn btn-secondary btn-sm float-end newPart"><i class="align-bottom ri-add-fill"></i> Add New Child</button></div>`;
function addChildBtns() {
    if ($("#headerPreview .row-sec .addchilebtn").length < 1) {
        $("#headerPreview .row-sec").append(addChildBtn);
    }
    // if($("#footerPreview .row-sec .addchilebtn").length < 1){
    //     $("#footerPreview .row-sec").append(addChildBtn);
    // }
}

function setHeaderStyle($preview) {
    var headerHeight = $('#headerPreview .sectionStart table').length ? $('#headerPreview .sectionStart table').height() : $('#headerPreview').height();
    var footerHeight = $('#footerPreview .sectionStart table').length ? $('#footerPreview .sectionStart table').height() : $('#footerPreview').height();
    headerHeight = headerHeight + 7;
    footerHeight = footerHeight + 7;
    var styleTag = $('<style>')
        .prop('type', 'text/css')
        .html(`.content {top: ${headerHeight}px !important;margin-bottom: ${footerHeight}px !important;bottom:0 !important;}`);
    return $preview.prepend(styleTag);
}

let templateStatus = 0;
let saveButton = $("button.saveTemplate");
let publishButton = $("button.publishTemplate");
function statusTemplates() {
    if (templateStatus == "2") {
        saveButton.show();
        publishButton.show();
    } else if (templateStatus == "1") {
        saveButton.remove();
        publishButton.remove();
        $('#field-settings').find(".save_close, #deleteField").remove();
        $('#fieldSettingForm, #headerPreview, #footerPreview').css("pointer-events", "none");
        $('button.addNewSection, div.addchilebtn').remove();
        $(".form-build table td.child-sec").removeClass("child-sec");
        $("#makeconnections").find("button.addmoreconnection, button.resetconnections, button.saveinterconnections").remove();
        $('#makeconnections .connectionbox').css("pointer-events", "none");
        $(".card .card-header").find("select.headersBox, select.footersBox").remove();
    } else {
        saveButton.show();
        publishButton.remove();
    }
}

publishButton.click(async function (e) {
    e.preventDefault();
    Swal.fire({
        title: "Publish Certificate Template",
        text: "Are you sure you want to publish this certificate template?",
        icon: "warning",
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Yes, publish it",
        cancelButtonText: "No, Cancel",
        showLoaderOnConfirm: true,
        preConfirm: async (comments) => {
            try {
                const url = `${site_url}certificate/template/${editId}/publish`;
                return await ajs.ajax_form(url, null, "GET", null, "1", "1", publishTemplate, publishTemplate);
            } catch (error) {
                Swal.showValidationMessage(`<strong>Request Failed:</strong> ${error.message}`);
            }
        },
        allowOutsideClick: () => !Swal.isLoading(),
    })
});

function publishTemplate(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        Swal.fire({ icon: "success", title: "Publish Certificate Template", text: result_json.message }).then(() => { location.reload(); });
    } else {
        const errorMessage = result_json?.message || "An unexpected error occurred. Please try again.";
        return Swal.showValidationMessage(`<strong>Error:&nbsp;</strong> ${errorMessage}`);
    }
}

// duplicate field
let selectedField = "";
$(document).on('change', "#parentField", function () {
    var val = $(this).val();
    var $data = $(`.form-build .inputOption.${val}`).attr("data-field-json");
    var fieldData = JSON.parse($data);
    $form.find("#fieldType").val(fieldData.field_type);
    $form.find("#fieldName").val(fieldData.name);
    $form.find("#fieldLabel").val(fieldData.field_label);
});

$(document).on('change', "#duplicateField", function () {
    $form.find("#parentField").select2('destroy');
    $form.find("#parent_field_box").remove();
    $form.find(".inputs, .optionsbox, .multipleoptionsbox, .multiplefilesbox, .advancesettingBox, .fillableOptions").hide();
    $form.find("#fieldLabel").removeAttr("disabled").removeAttr("readonly");
    $form.find(".duplicatefield").show();
    if ($(this).is(':checked')) {
        selectedField = $form.find("#fieldName").val();
        $form.find("#fieldType").val('');
        $form.find("#fieldName").val('');
        $form.find("#fieldLabel").val('');
        selectDuplicateParent()
    } else {
        $(`.form-build .inputOption.${selectedField}`).click();
    }
});

function selectDuplicateParent() {
    var flabel = `<label for="parentField" class="form-label">Select Parent Field</label>`;
    var options = `<option value="">Select</option>`;
    $(".form-build .inputOption").not("[class*='filecaption_']").each(function () {
        var $data = $(this).attr('data-field-json');
        var fieldData = JSON.parse($data);
        if (selectedField != fieldData.name) {
            options += `<option value="${fieldData.name}">${fieldData.field_label} | ${fieldData.name}</option>`;
        }
    });
    $form.find("#duplicateField").parent().after(`<div id="parent_field_box" class="mb-3">${flabel}<select class="form-control" id="parentField" required>${options}</select></div>`)
    $form.find("#fieldLabel").attr("disabled", "disabled").attr("readonly", "readonly");
    $form.find("#parentField").select2({
        placeholder: "Select field",
        allowClear: false,
        sorter: function (data) {
            return data.sort(function (a, b) {
                return a.text.localeCompare(b.text, undefined, { sensitivity: "base" });
            });
        }
    });
}

function saveDuplicateInput() {
    var fieldName = $form.find('#fieldName').val();
    var showBorder = $form.find('#showBorder:checked').val();
    var fieldColor = $form.find('#fieldColor').val();
    var fieldFontSize = parseInt($form.find('#fieldSize').val());
    var fontWeight = $form.find('#fontWeight').val();
    var $target = $('.' + selectedField);

    var fieldID = fieldName.split('_')[1];
    var $data = $("." + fieldName).attr('data-field-json');
    var fieldData = JSON.parse($data);
    fieldData.show_border = (showBorder == 'yes') ? 1 : 0;
    fieldData.name = fieldData.name.replace(fieldData.field_type, "duplicate");
    fieldData.font_size = fieldFontSize;
    fieldData.color = fieldColor;
    fieldData.text_color = fieldColor;
    fieldData.is_duplicate = true;
    fieldData.duplicate_name = fieldName;

    $target.css('fontWeight', fontWeight).css('color', fieldColor).css('fontSize', fieldFontSize + 'px');
    if (showBorder == 'yes') {
        applyBorders($target);
    } else {
        applyBorders($target, 0);
    }
    $target.addClass("isDuplicate").removeClass(selectedField).addClass(fieldData.name);
    customClasses($target);
    saveInlineDataSettings($target);
    $target.attr('data-field-json', JSON.stringify(fieldData));
}

function applyBorders($target, width = 1, type = 'solid', color = '#000000') {
    var top = right = bottom = left = 0;
    if (width > 0) {
        top = parseInt($form.find("#borderSizeTop").val());
        right = parseInt($form.find("#borderSizeRight").val());
        bottom = parseInt($form.find("#borderSizeBottom").val());
        left = parseInt($form.find("#borderSizeLeft").val());
    }
    color = $form.find('#borderColor').val();
    if ($.inArray($target.attr("type"), ['radio', 'checkbox']) >= 0) {
        $target = $target.parents(".inputOption");
    }
    bclass = (top > 0 || right > 0 || bottom > 0 || left > 0);
    var borderStyle = "";
    if (bclass) {
        borderStyle = "solid";
    }
    $target.attr("data-border-color", color).toggleClass("light_border", bclass).css({
        "border-top-width": `${top}px`,
        "border-right-width": `${right}px`,
        "border-bottom-width": `${bottom}px`,
        "border-left-width": `${left}px`,
        "border-style": borderStyle,
        "border-color": `${color}`,
    });
    // padding code
    var ptop = pright = pbottom = pleft = 0;
    if ($form.find("#addPadding").prop("checked")) {
        ptop = parseInt($form.find("#paddingTop").val()) || 0;
        pright = parseInt($form.find("#paddingRight").val()) || 0;
        pbottom = parseInt($form.find("#paddingBottom").val()) || 0;
        pleft = parseInt($form.find("#paddingLeft").val()) || 0;
    }
    if ($target.hasClass("sectionStart")) {
        $target = $target.find(".sectionTitle");
    }
    $target.css({
        "padding-top": `${ptop}px`,
        "padding-right": `${pright}px`,
        "padding-bottom": `${pbottom}px`,
        "padding-left": `${pleft}px`,
    })
    // padding code
}

function addFieldAttribute(value = "") {
    $form.find("#customAttribute").parent().remove();
    let fieldAttribute = `<div class="mb-3 advancesettingBox">
                              <label for="customAttribute" class="form-label">Custom Field Attribute</label>
                              <input type="text" class="form-control" id="customAttribute" placeholder="Enter attribute" value="${value}">
                          </div>`;
    $form.find(".advancesettingBox:first").show();
    $form.find(".advancesettingBox:last").after(fieldAttribute)
}

function saveFieldAttribute(data) {
    var val = $.trim($form.find("#customAttribute").val());
    data.custom_attribute = val;
    return data;
}

// styling
function borderStyling($obj) {
    var $target = $('.changestyling');
    if ($target.hasClass("sectionTitle")) {
        $target = $target.parents('.sectionStart');
    }
    var fieldName = $form.find('#fieldName').val();
    if ($.trim(fieldName) != '') {
        var fieldID = fieldName.split('_')[1];
        // $target = $('.' +fieldName).find('*[name=' + fieldName + '],*[name=filetext_' + fieldID + ']');
        $target = $('.' + fieldName);
        // if($.inArray($target.attr("type"), ['radio', 'checkbox']) >= 0){
        //     $target = $target.parents(".inputOption");
        // }
    }

    var top = parseInt($target.css("border-top-width")) || 0;
    var right = parseInt($target.css("border-right-width")) || 0;
    var bottom = parseInt($target.css("border-bottom-width")) || 0;
    var left = parseInt($target.css("border-left-width")) || 0;
    var bcolor = $target.attr("data-border-color") || "#000";

    $($obj).after(`<div class="row borderStylingBox">
                        <div class="col-md-2 pe-0">
                            <label for="borderSizeTop" class="form-label mb-0">Top</label>
                            <input type="number" class="form-control" id="borderSizeTop" placeholder="Border Size Top" required="" value="${top}" min="1" max="10">
                        </div>
                        <div class="col-md-2 pe-0">
                            <label for="borderSizeRight" class="form-label mb-0">Right</label>
                            <input type="number" class="form-control" id="borderSizeRight" placeholder="Border Size Right" required="" value="${right}" min="1" max="10">
                        </div>
                        <div class="col-md-2 pe-0">
                            <label for="borderSizeBottom" class="form-label mb-0">Bottom</label>
                            <input type="number" class="form-control" id="borderSizeBottom" placeholder="Border Size Bottom" required="" value="${bottom}" min="1" max="10">
                        </div>
                        <div class="col-md-2 pe-0">
                            <label for="borderSizeLeft" class="form-label mb-0">Left</label>
                            <input type="number" class="form-control" id="borderSizeLeft" placeholder="Border Size Left" required="" value="${left}" min="1" max="10">
                        </div>
                        <div class="col-md-4 pe-0">
                            <label for="borderColor" class="form-label mb-0">Color</label>
                            <input type="color" class="form-control form-control-color" id="borderColor" placeholder="rgb(0, 0, 0)" value="${bcolor}">
                        </div>
                </div>`)
}

$(document).on("change", "#showBorder", function () {
    $(this).siblings(".borderStylingBox").remove();
    if ($(this).prop("checked")) {
        borderStyling($(this))
    }
})

function hasBorder($el) {
    return (
        parseInt($el.css("border-top-width")) > 0 ||
        parseInt($el.css("border-right-width")) > 0 ||
        parseInt($el.css("border-bottom-width")) > 0 ||
        parseInt($el.css("border-left-width")) > 0
    );
}
// styling

// validations start
$(document).on("click", ".rule .dependent_field:not('active'), .rule select.compare_with:not('active')", function () {
    initSelect2Validation($(this), true);
})

function initSelect2Validation($target, open = false) {
    $target.addClass("active").select2({
        dropdownParent: $('#offcanvasRight2'),
        placeholder: "Select a field",
        allowClear: false,
        data: compareWithOptions,
        sorter: function (data) {
            return data.sort(function (a, b) {
                return a.text.localeCompare(b.text, undefined, { sensitivity: "base" });
            });
        }
    })
    if (open) {
        $target.select2("open");
    }
}

function replaceTexts($target, $text, $replaceWith) {
    let textNode = $target.contents().first()[0];
    textNode.textContent = textNode.textContent.replace($text, $replaceWith);
}

let ruleNo = 1;
function addRule() {
    return $(`
    <fieldset class="rule mb-3 border border-2 border-dark p-2 pt-0" style="border-color:#AAAAAA !important;">
    <legend class="p-1 fs-17" style="width:auto;float:unset;">Rule ${ruleNo++}:</legend>
    <div class="row ps-0">
          <div class="col-md-6 mb-3"><label class="mb-0 text-muted">Operator: <span class="text-danger">*</span></label>
            <select class="form-control operator">
              <option>=</option>
              <option>&lt;</option>
              <option>&gt;</option>
              <option>&lt;=</option>
              <option>&gt;=</option>
              <option value="x̄">x̄ (Average)</option>
              <option value="%">% (Percentage)</option>
              <option value="x">x (Multiply)</option>
            </select>
          </div>
          <div class="col-md-6 mb-3"><label class="mb-0 text-muted">Compare Type: <span class="text-danger">*</span></label>
            <select class="form-control compare_type">
              <option value="field">field</option>
              <option value="default_value">Default value</option>
              <option value="value">value</option>
              <option value="self">self</option>
              <option value="required">required</option>
            </select>
          </div>
          <div class="mb-2 col-md-12 compare_with_box">
              <label class="mb-0 text-muted">Compare With: <span class="text-danger">*</span></label>
              <input type="text" class="form-control compare_with" placeholder="Enter comparison value or field...">
          </div>
          
          <div class="dep-fields">
            <div class="field mb-3 col-md-12"><label class="mb-0 text-muted">Dependent Field: <span class="text-danger">*</span></label><select class="form-control dependent_field"><option value="">Select a field</option></select></div>
            <div class="expected mb-3 col-md-12"><label class="mb-0 text-muted">Dependent Expected: <span class="text-danger">*</span></label><input type="text" class="form-control dependent_expected" placeholder="Enter expected value for the dependent field..."></div>
          </div>

          <div class="mb-3 col-md-12"><label class="mb-0 text-muted rule_message">Message: <span class="text-danger">*</span></label><input type="text" class="form-control message" placeholder="Enter the validation message..."></div>

          <div><button class="btn btn-danger removeRule">Remove</button>
    </div>
    </fieldset>
  `);
}
let reportData = {};
function initReportData(data = "") {
    try {
        reportData = JSON.parse(data);
    } catch (e) {
        reportData = { fields: [] };
    }
}
initReportData();
const reportDataFields = ["number", "phone", "email", "date", "time", "datetime", "text", "textarea", "checkbox", "radio", "select"];
function add_report_data_field() {
    setTimeout(function () {
        var fieldType = $form.find('#fieldType').val();
        var fieldName = $form.find('#fieldName').val();
        if ($.inArray(fieldType, reportDataFields) >= 0) {
            reportData.fields = reportData.fields || [];
            const reportField = reportData.fields.find(field => field.name === fieldName);
            const isChecked = !!reportField;
            const selectedKey = reportField?.type || '';

            $form.find("#fieldName").parent().after(`<div class="form-check form-switch form-switch-left form-switch-md mb-3 reportDataFieldBox">
                <label for="reportDataField" class="form-label ">Include in Report Data</label>
                <input class="form-check-input" type="checkbox" id="reportDataField" value="yes">
                <div class="reportDataKeyBox" style="display: none;">
                    <select class="form-control reportDataKey" id="reportDataKey"><option value="">Select a key</option><option value="condition">Satisfactory/Unsatisfactory Field</option><option value="engineer_comment">Engineer Comment Field</option></select>
                </div>
                </div>`);
            $form.find("#reportDataField").prop("checked", isChecked).trigger("change");
            $form.find("#reportDataKey").val(selectedKey);
        }
    }, 100)
}
$(document).on("change", "#reportDataField", function (e) {
    if ($(this).is(':checked')) {
        $form.find(".reportDataKeyBox").show();
    } else {
        $form.find(".reportDataKeyBox").hide();
        $form.find("#reportDataKey").val('');
    }
});
function updateReportDataField() {
    var fieldType = $form.find('#fieldType').val();
    var fieldName = $form.find('#fieldName').val();
    if ($.inArray(fieldType, reportDataFields) >= 0) {
        reportData.fields = reportData.fields || [];

        reportData.fields = reportData.fields.filter(field => field.name !== fieldName);
        if (!$form.find("#reportDataField").is(":checked")) { return; }
        var keyType = $form.find('#reportDataKey').val();
        if (!keyType) {
            alert('Please select a report data key.');
            $form.find('#reportDataKey').focus();
            return false;
        }
        reportData.fields.push({
            name: fieldName,
            label: $form.find('#fieldLabel').val(),
            type: keyType
        });
    }
    return true;
}

function add_validation_btn() {
    let $formStyle = $("#field-settings");
    $formStyle.find(".offcanvas-footer #actionValidations").remove();
    const validationsFields = ["number", "phone", "email", "date", "time", "datetime", "text", "textarea", "checkbox", "radio", "select"];
    setTimeout(function () {
        var fieldType = $form.find('#fieldType').val();
        $formStyle.find(".offcanvas-footer #actionValidations").remove();
        if ($.inArray(fieldType, validationsFields) >= 0) {
            $formStyle.find(".offcanvas-footer .save_close").after(`<button type="button" style="float:right;" id="actionValidations" class="btn btn-sm btn-dark bg-black">Manage Validations</button>`);
        }
    }, 100)
}

$(document).on('click', '.rule .removeRule', function () {
    $(this).closest('.rule').remove();
});

$(document).on("change", "select.operator", function () {
    const operator = $(this).val();
    const $compare_with_box = $(this).closest('.rule').find('.compare_with_box');
    const $compare_type = $(this).closest('.rule').find('.compare_type');
    const $dep1 = $(this).closest('.rule').find('.dep-fields .field');
    const $dep2 = $(this).closest('.rule').find('.dep-fields .expected');
    const $rule_message = $(this).closest('.rule').find('.message').parent();
    $rule_message.hide();

    $dep1.find(".dependent_field").attr("multiple", false);
    replaceTexts($dep1.find("label"), "Dependent Fields:", "Dependent Field:");
    replaceTexts($compare_with_box.find("label"), "Numerator Field:", "Compare With:");
    replaceTexts($dep1.find("label"), "Denominator Field:", "Dependent Field:");

    if (operator == "x̄" || operator == "x") { // for average and multiply
        replaceTexts($dep1.find("label"), "Dependent Field:", "Dependent Fields:");
        $compare_type.val("value").attr("disabled", true).trigger("change");
        $compare_with_box.hide();
        $dep1.find(".dependent_field").attr("multiple", true);
        $dep1.show();
        $dep2.hide();
    }
    else if (operator == "%") {
        $compare_type.val("value").attr("disabled", true).trigger("change");
        $compare_with_box.show();
        $compare_with_box.find(".compare_with").replaceWith(`<select class="form-control compare_with"><option value="">Select a field</option></select>`)
        replaceTexts($compare_with_box.find("label"), "Compare With:", "Numerator Field:");
        replaceTexts($dep1.find("label"), "Dependent Field:", "Denominator Field:");
        $dep1.show();
        $dep2.hide();
    }
    else {
        $compare_with_box.show();
        $rule_message.show();
        $compare_type.attr("disabled", false).trigger("change");;
    }

    if ($dep1.find(".dependent_field").hasClass('select2-hidden-accessible')) {
        $dep1.find(".dependent_field").select2("destroy");
    }
    initSelect2Validation($dep1.find(".dependent_field"));

})

$(document).on("change", "select.compare_type", function () {
    const type = $(this).val();
    const $rule_message = $(this).closest('.rule').find('.rule_message span');
    const $rule_expected = $(this).closest('.rule').find('.dep-fields .expected span');
    const $dep = $(this).closest('.rule').find('.dep-fields');
    const $dep1 = $(this).closest('.rule').find('.dep-fields .field');
    const $dep2 = $(this).closest('.rule').find('.dep-fields .expected');
    $rule_message.show();
    $rule_expected.show();
    if (type === "default_value") {
        $rule_message.hide();
        $rule_expected.hide();
        $dep1.show();
        $dep2.show();
        if ($dep.parent().find(".compare_with").hasClass('select2-hidden-accessible')) {
            $dep.parent().find(".compare_with").select2("destroy");
        }
        $dep.parent().find(".compare_with").replaceWith(`<input type="text" class="form-control compare_with" placeholder="Enter comparison value or field...">`)
    } else if (type === "value") {
        if ($dep.parent().find(".compare_with").hasClass('select2-hidden-accessible')) {
            $dep.parent().find(".compare_with").select2("destroy");
        }
        $dep.parent().find(".compare_with").replaceWith(`<input type="text" class="form-control compare_with" placeholder="Enter comparison value or field...">`)
        $dep1.show();
        $dep2.show();
    } else if (type === "self") {
        $dep1.hide();
        $dep2.hide();
        $dep.find('input,select').val("");
        $dep.parent().find(".compare_with").replaceWith(`<input type="text" class="form-control compare_with" placeholder="Enter comparison value or field...">`)
    } else if (type === "required") {
        $rule_message.hide();
        $dep1.show();
        $dep2.hide();
        $dep.parent().find(".compare_with").replaceWith(`<input type="text" class="form-control compare_with" placeholder="Enter comparison value or field...">`)
        $dep.find('input,select').val("");
        $dep.parent().find(".compare_with").val("all")
    } else {
        $dep1.hide();
        $dep2.hide();
        $dep.find('input,select').val("");
        $dep.parent().find(".compare_with").replaceWith(`<select class="form-control compare_with"><option value="">Select a field</option></select>`)
    }
})

function addRuleHandler(isView = false) {
    showLoader();
    setTimeout(function () {
        $('#offcanvasRight2').find('.offcanvas-body').append(addRule());
        $(".rule:last").find(".compare_type").val("value").trigger("change");
        if (!isView) {
            new Choices($('.rule:last .dependent_expected')[0], { allowHTML: true, removeItemButton: true, shouldSort: false, duplicateItemsAllowed: false, addItemFilter: function (value) { return $.trim(value) } });
        }
    }, 410)
    removeLoader();
}

$(document).on("click", "button.resetRules", function () {
    ruleNo = 1;
    var $valiData = $('#offcanvasRight2').find('.offcanvas-body');
    $valiData.html('');
    validationActions('r');
    edit_view_validations();
})

$(document).on("click", "button.addRule", function () {
    addRuleHandler();
})

function removeLoader() {
    setTimeout(function () {
        $('#offcanvasRight2').find('.dataloadspinner').remove();
    }, 400)
}

function showLoader() {
    $('#offcanvasRight2').find('.offcanvas-body .dataloadspinner').remove();
    $('#offcanvasRight2').find('.offcanvas-body').append(`<div class="col-lg-12 text-center dataloadspinner"><div class="spinner-border text-primary avatar-xs"></div></div>`);
}

function validationActions(type = 'e') {
    var $valiForm = $('#offcanvasRight2');
    var $valiData = $('#offcanvasRight2').find('.offcanvas-body');

    $valiForm.find(".add_valition_btn").remove();
    if (type == 'e') {

        $valiData.before(`<div class="bg-white p-2 me-4 text-end add_valition_btn"><button type="button" class="btn btn-primary addRule btn-sm ms-1"><i class="ri-add-fill align-bottom"></i> Add New</button></div>`);
        $valiData.after(`<div class="offcanvas-footer border-top p-3 add_valition_btn"><button type="button" class="btn btn-success  btn-sm ms-1" id="save_validations"><i class="ri-save-3-fill align-bottom"></i> Save</button><button type="button" class="btn btn-danger btn-sm ms-1 resetRules"><i class=" ri-refresh-line align-bottom"></i> Reset</button></div>`);
    }
}

$(document).on("click", "#actionValidations", function () {
    ruleNo = 1;
    compareWithOptions = [];
    var $valiForm = $('#offcanvasRight2');
    var $valiData = $('#offcanvasRight2').find('.offcanvas-body');
    $valiData.html('');
    $valiForm.find(".add_valition_btn").remove();
    $valiData.addClass("p-4 pt-1 rulesContainer").removeClass("overflow-hidden");
    $valiForm.offcanvas('show').css("zIndex", "1052").css("width", "500");
    $('#offcanvasRight2Label').text('Field Validation Rules');

    setTimeout(function () {
        selectedField = $form.find("#fieldName").val();
        validation_fields();
        edit_view_validations();
    }, 500)

})

function edit_view_validations() {
    validationActions('r');
    const existingValidations = searchValidationsByField(selectedField);
    if (existingValidations.length > 0) {
        let indexId = 0;
        function loadValidations() {
            addRuleHandler(true);
            setTimeout(function () {
                // target last added rule
                const $lastRule = $(".rule").last();
                const rule = existingValidations[indexId];
                $lastRule.find(".compare_type").val(rule.compare_type).trigger("change");
                $lastRule.find(".operator").val(rule.operator).trigger("change");

                if (rule.operator == calcOperators[0] || rule.operator == calcOperators[1]) { //for average and multiply 
                    $lastRule.find(".dependent_field").attr("multiple", true);
                    initSelect2Validation($lastRule.find(".dependent_field"));
                    $lastRule.find(".dependent_field").val(rule.dependent_fields);
                    $lastRule.find(".dependent_field").trigger("change");
                }
                initSelect2Validation($lastRule.find("select.compare_with"))
                $lastRule.find(".compare_with").val(rule.compare_with).trigger("change");
                $lastRule.find(".message").val(rule.message);
                if (rule.numerator_field) {
                    $lastRule.find(".compare_with").val(rule.numerator_field).trigger("change");
                }

                if (rule.denominator_field) {
                    $lastRule.find(".dependent_field").val(rule.denominator_field).trigger("change");
                }

                if (rule.dependent_field) {
                    initSelect2Validation($lastRule.find("select.dependent_field"));
                    $lastRule.find(".dependent_field").val(rule.dependent_field).trigger("change");
                }
                if (rule.dependent_expected) {
                    $lastRule.find(".dependent_expected").val(rule.dependent_expected);
                    new Choices($('.rule:last .dependent_expected')[0], { allowHTML: true, removeItemButton: true, shouldSort: false, duplicateItemsAllowed: false, addItemFilter: function (value) { return $.trim(value) } });
                }
                indexId++;
                if (indexId < existingValidations.length) {
                    loadValidations();
                } else {
                    $('#offcanvasRight2').find("button").prop("disabled", false);
                    validationActions()
                }
            }, 412)

        }
        loadValidations();
    } else {
        addRuleHandler();
        validationActions()
        $('#offcanvasRight2').find("button").prop("disabled", false);
    }
}

let compareWithOptions = [];
function validation_fields() {
    $(".form-build .inputOption").not("[class*='filecaption_']").not("[class*='file_']").each(function () {
        var $data = $(this).attr('data-field-json');
        var fieldData = JSON.parse($data);
        if (selectedField != fieldData.name) {
            compareWithOptions.push({ "id": fieldData.name, "text": `${fieldData.field_label} | ${fieldData.name}` })
        }
    });
}

const calcOperators = ["x̄", "x", "%"];
let validations_data = { validations: [] };
$(document).on("click", "#save_validations", function (e) { //save validation JSON
    e.preventDefault();
    let isValid = true;

    var $valiForm = $('#offcanvasRight2');
    $valiForm.find("button").prop("disabled", true);
    $valiForm.find(".rule").css("pointer-events", "none");
    $valiForm.append(`<div class="col-lg-12 text-center dataloadspinner h-100 w-100 position-absolute top-0 start-0 bg-white d-flex justify-content-center align-items-center opacity-50"><div class="spinner-border text-primary avatar-xs"></div></div>`);
    const rules = [];
    let field = $form.find('#fieldName').val();
    $('.rulesContainer .rule').each(function (index) {
        let ruleNo = index + 1;
        let operator = $(this).find(".operator").val().trim();
        let compareType = $(this).find(".compare_type").val().trim();
        let compareWith = $(this).find(".compare_with").val().trim();
        let dependentField = $(this).find(".dependent_field").val();
        let dependentExpected = $(this).find(".dependent_expected").val().trim();

        dependentExpected = dependentExpected ? dependentExpected.split(',') : [];

        let message = $(this).find(".message").val().trim();
        if (compareType === "default_value") {
            message = message || true;
            dependentExpected = dependentExpected.length ? dependentExpected : [''];
        }
        else if (compareType === "field" || compareType === "self") {
            dependentField = true;
            dependentExpected = [''];
        }
        else if (compareType == "required") {
            dependentExpected = [''];
            message = message || true;
        }
        else if (compareType == "value" && $.inArray(operator, calcOperators) >= 0) {
            dependentExpected = [''];
            message = true;
            if (operator == calcOperators[0] || operator == calcOperators[1]) { //for average and multiply 
                compareWith = true;
            }
        }

        if (!operator || !compareType || !compareWith || !dependentField || !dependentExpected.length || !message) {
            isValid = false;
            alert(`Please fill all required fields in Rule ${ruleNo}.`);
            $valiForm.find("button").prop("disabled", false);
            $valiForm.find(".rule").css("pointer-events", "unset");
            return false; // break out of .each loop
        }
        if (message == true) {
            message = '';
        }
        const rule = {
            field: field,
            operator: operator,
            compare_with: compareWith,
            compare_type: compareType,
            message: message
        };
        if (compareType === "value") {
            if (operator == calcOperators[0] || operator == calcOperators[1]) { //for average and multiply 
                rule.dependent_fields = dependentField;
            }
            else if (operator == calcOperators[2]) {
                rule.numerator_field = compareWith;
                rule.denominator_field = dependentField.trim();
            }
            else {
                rule.dependent_field = dependentField.trim();
                rule.dependent_expected = dependentExpected;
            }
        }
        else if (compareType == "required") {
            rule.dependent_field = dependentField;
        }
        else if (compareType == "default_value") {
            rule.dependent_field = dependentField.trim();
            rule.dependent_expected = dependentExpected;
        }
        rules.push(rule);
    });
    if (isValid) {
        const json = rules;
        upsertValidations(selectedField, json);
        setTimeout(function () {
            Toastify({
                text: "Validation rules were updated successfully.",
                duration: 5000,
                destination: '',
                gravity: "top", // `top` or `bottom`
                position: "right",
                close: true
            }).showToast();
            $valiForm.offcanvas("hide");
            removeLoader();
        }, 3000)
    } else {
        removeLoader();
    }
});

function searchValidationsByField(fieldName) {
    return validations_data.validations.filter(v => v.field === fieldName);
}

function upsertValidations(fieldName, newValidations) {
    validations_data.validations = validations_data.validations.filter(v =>
        v.field !== fieldName
    );
    validations_data.validations = validations_data.validations.concat(newValidations);
}

function set_validation_fields(data) {
    validData = JSON.parse(data);
    if (data && validData?.validations) {
        validations_data = validData;
    } else {
        data = JSON.stringify(validations_data);
    }
    $('#saveCerti').find("#validation_rules").val(data);
}
// validations end

// css classes
function setCustomClasses($target) {
    var prevClss = $target.attr("data-classes");
    $form.find('#cssClass').val(prevClss || '');
}

function customClasses($target) {
    var cssClass = $form.find('#cssClass').val();
    var prevClss = $target.attr("data-classes");
    if (prevClss) {
        $target.removeClass(prevClss);
    }
    $target.addClass(cssClass).attr("data-classes", cssClass);
}
// css classes

// custom css styling
function minifyCss(css) {
    return css
        .replace(/\s+/g, ' ')
        .replace(/\s*([{}:;,])\s*/g, '$1')
        .trim();
}
function formatCss(css) {
    return css
        .replace(/\s*}.\s*/g, ' }\n.')
        .replace(/\s*{\s*/g, ' {\n    ')
        .replace(/;\s*/g, ';\n    ')
        .replace(/\n\s*}/g, '\n}')
        .replace(/\s+$/, '');
}
function saveCustomCss() {
    var cssContent = $("#cssEditor").val() || '';
    var minifiedCss = minifyCss(cssContent);

    var styleTag = $("#customCssStyle");
    if (styleTag.length === 0) {
        $(".form-build").append('<style id="customCssStyle"></style>');
        styleTag = $("#customCssStyle");
    }
    styleTag.html(minifiedCss);
}
function formatStyles() {
    var cssContent = $("#cssEditor").val() || '';
    var formattedCss = formatCss(cssContent);
    $("#cssEditor").val(formattedCss);
}

function loadCustomCss() {
    var styleTag = $("#customCssStyle");
    var existingCss = styleTag.html() || '';
    var formattedCss = formatCss(existingCss);
    $("#cssEditor").val(formattedCss);
}

$(document).on("click", "#templateStyles", function () {
    var $styles = $('#offcanvasRight2');
    var $styleData = $('#offcanvasRight2').find('.offcanvas-body');
    $styleData.html(`
                    <textarea id="cssEditor" rows="6" cols="50" placeholder="Enter your CSS here..." class="form-control h-75"></textarea>
                    <br>
                    <button class="btn btn-success" id="saveTemplateStyle">Save</button>
                    <button class="btn btn-light closeStyling">Close</button>
                    <button  class="btn btn-secondary float-end" onclick="formatStyles()">Format CSS</button>
                `);
    $styles.find(".add_valition_btn").remove();
    $styleData.addClass("p-4 pt-1").removeClass("overflow-hidden");
    loadCustomCss();
    $styles.offcanvas('show').css("zIndex", "1046").css("width", "500");
    $('#offcanvasRight2Label').text('Custom Styles');
})
$(document).on("click", ".closeStyling", function () {
    $('#offcanvasRight2').offcanvas("hide");
});

$(document).on("click", "#saveTemplateStyle", function () {
    var $styles = $('#offcanvasRight2');
    $styles.find("button").prop("disabled", true);
    saveCustomCss();
    setTimeout(function () {
        $styles.offcanvas("hide");
    }, 200)
})
// custom css styling

$(document).on("change", "#addPadding", function () {
    $(this).siblings(".paddingStylingBox").remove();
    if ($(this).prop("checked")) {
        paddingStyling($(this))
    }
})

function paddingStyling($obj) {
    var $target = $('.changestyling');
    // if ($target.hasClass("sectionTitle")) {
    //     $target = $target.parents('.sectionStart');
    // }
    var fieldName = $form.find('#fieldName').val();
    if ($.trim(fieldName) != '') {
        var fieldID = fieldName.split('_')[1];
        // $target = $('.' +fieldName).find('*[name=' + fieldName + '],*[name=filetext_' + fieldID + ']');
        $target = $('.' + fieldName);
        // if($.inArray($target.attr("type"), ['radio', 'checkbox']) >= 0){
        //     $target = $target.parents(".inputOption");
        // }
    }

    var ptop = parseInt($target.css("padding-top")) || 0;
    var pright = parseInt($target.css("padding-right")) || 0;
    var pbottom = parseInt($target.css("padding-bottom")) || 0;
    var pleft = parseInt($target.css("padding-left")) || 0;

    $($obj).after(`<div class="row paddingStylingBox">
                        <div class="col-md-2 pe-0">
                            <label for="paddingTop" class="form-label mb-0">Top</label>
                            <input type="number" class="form-control" id="paddingTop" placeholder="Padding Top" required="" value="${ptop}" min="1" max="10">
                        </div>
                        <div class="col-md-2 pe-0">
                            <label for="paddingRight" class="form-label mb-0">Right</label>
                            <input type="number" class="form-control" id="paddingRight" placeholder="Padding Right" required="" value="${pright}" min="1" max="10">
                        </div>
                        <div class="col-md-2 pe-0">
                            <label for="paddingBottom" class="form-label mb-0">Bottom</label>
                            <input type="number" class="form-control" id="paddingBottom" placeholder="Padding Bottom" required="" value="${pbottom}" min="1" max="10">
                        </div>
                        <div class="col-md-2 pe-0">
                            <label for="paddingLeft" class="form-label mb-0">Left</label>
                            <input type="number" class="form-control" id="paddingLeft" placeholder="Padding Left" required="" value="${pleft}" min="1" max="10">
                        </div>
                </div>`)
}

function setpaddingfield() {
    setTimeout(function () {
        var $target = $('.changestyling');
        // if ($target.hasClass("sectionTitle")) {
        //     $target = $target.parents('.sectionStart');
        // }
        var fieldName = $form.find('#fieldName').val();
        if ($.trim(fieldName) != '') {
            var fieldID = fieldName.split('_')[1];
            $target = $('.' + fieldName);
            // $target = $('.' +fieldName).find('*[name=' + fieldName + '],*[name=filetext_' + fieldID + ']');
            // if($.inArray($target.attr("type"), ['radio', 'checkbox']) >= 0){
            //     $target = $target.parents(".inputOption");
            // }
        }

        var ptop = parseInt($target.css("padding-top")) || 0;
        var pright = parseInt($target.css("padding-right")) || 0;
        var pbottom = parseInt($target.css("padding-bottom")) || 0;
        var pleft = parseInt($target.css("padding-left")) || 0;

        padd = (ptop > 0 || pright > 0 || pbottom > 0 || pleft > 0);
        $form.find("#addPadding").prop("checked", padd).trigger("change")
    }, 400)
}

function fieldOrientationType() {
    var $target = $('.changestyling').parents(".sectionStart");
    var type = $target.attr("page-type");
    $form.prepend(`<div class="form-check form-switch form-switch-left form-switch-md mb-3 pageOrientationType">
                        <label for="fieldOrientation" class="form-label ">Make this section landscape in PDF</label>
                        <input class="form-check-input" type="checkbox" id="fieldOrientation" value="yes" title="Make this section landscape in PDF">
                    </div>`);
    $form.find("#fieldOrientation").prop("checked", (type == 'l') ? true : false);
}

function saveOrientationType() {
    var $target = $('.changestyling').parents(".sectionStart");
    var type = $form.find("#fieldOrientation").is(":checked");

    var prevNode = $target[0].previousSibling;
    if (prevNode && prevNode.nodeType === 8 && prevNode.nodeValue.trim() === "LANDSCAPE_START") {
        prevNode.remove();
    }
    var nextNode = $target[0].nextSibling;
    if (nextNode && nextNode.nodeType === 8 && nextNode.nodeValue.trim() === "LANDSCAPE_END") {
        nextNode.remove();
    }
    if (type) {
        $target.before("<!--LANDSCAPE_START-->");
        $target.after("<!--LANDSCAPE_END-->");
        $target.attr("page-type", "l");
    } else {
        $target.attr("page-type", "p");
    }
}

let footerLeft = $("#footerPreview #footerLeft");
let footerCenter = $("#footerPreview #footerCenter");
let footerRight = $("#footerPreview #footerRight");

function setFooter(data) {
    footerLeft.val('');
    footerCenter.val('');
    footerRight.val('');

    if (data) {
        try {
            let parsed = JSON.parse(data);
            if (parsed && typeof parsed === 'object') {
                footerLeft.val(parsed.left ?? '');
                footerCenter.val(parsed.center ?? '');
                footerRight.val(parsed.right ?? '');
            }
        } catch (e) {
            console.warn('Invalid JSON for footer:', e);
        }
    }
}
function show_sortorder(sort_order) {
    $form.find('#sortOrder').val(sort_order).parents('.inputs').show();
}
function update_sortorder(data) {
    data.sort_order = parseInt($form.find('#sortOrder').val());
    return data;
}


function renderMobileAppVisibility() {
    var $section = $('.changestyling').parents(".sectionStart");
    const hideInApp = $section.attr('app-hidden') === 'y';
    const hideInPdf = $section.attr('pdf-hidden') === 'y';
    $form.find(".mobileAppHidden, .pdfVisibility").remove();
    $form.prepend(`<div class="form-check form-switch form-switch-left form-switch-md mb-3 mobileAppHidden">
                        <label for="mobileAppHidden" class="form-label ">Hide this section in the Mobile App</label>
                        <input class="form-check-input" type="checkbox" id="mobileAppHidden" value="yes" title="Hide this section in the mobile app" aria-label="Hide this section in the mobile app">
                    </div>
                    <div class="form-check form-switch form-switch-left form-switch-md mb-3 pdfVisibility">
                        <label for="hideInPdf" class="form-label ">Hide this section in the PDF</label>
                        <input class="form-check-input" type="checkbox" id="hideInPdf" value="yes" title="Hide this section in the PDF" aria-label="Hide this section in the PDF">
                    </div>`);
    $form.find("#mobileAppHidden").prop('checked', hideInApp);
    $form.find("#hideInPdf").prop('checked', hideInPdf);
}

function saveMobileAppVisibility() {
    const $section = $('.changestyling').closest('.sectionStart');
    const hideInApp = $('#mobileAppHidden').is(':checked');
    const hideInPdf = $('#hideInPdf').is(':checked');
    let visibilityMessage = "";
    if (hideInApp && hideInPdf) {
        visibilityMessage = 'Hidden in Mobile App and PDF';
    } else if (hideInPdf) {
        visibilityMessage = 'Hidden in PDF';
    } else if (hideInApp) {
        visibilityMessage = 'Hidden in Mobile App';
    }
    $section.attr('app-hidden', hideInApp ? 'y' : 'n').toggleClass('mob-hidd-sec', hideInApp);
    $section.attr('pdf-hidden', hideInPdf ? 'y' : 'n').toggleClass('pdf-hidd-sec', hideInPdf);
    $section.attr('visibility-msg', visibilityMessage);
    $('.changestyling').attr('visibility-msg', visibilityMessage);
}

function renderInlineData($target) {
    const $section = $target;
    const isInline = $section.hasClass('show-inline-data');
    const separator = $section.attr('data-separator') || '';

    $form.find('.advancesettingBox:first').show();
    $form.find('.inlineDataSetting').remove();

    $form.find('.advancesettingBox:last').after(`
        <div class="inlineDataSetting mb-3">
            <div class="form-check form-switch form-switch-left form-switch-md">
                <input
                    class="form-check-input"
                    type="checkbox"
                    id="showInlineData"
                    name="showInlineData"
                    title="Display data inline using a separator"
                    aria-label="Display data inline using a separator"
                >
                <label for="showInlineData" class="form-label">
                    Show Inline Data
                </label>
            </div>

            <div class="mt-2 inlineSeparatorBox d-none">
                <input
                    type="text"
                    class="form-control"
                    id="inlineDataSeparator"
                    name="inlineDataSeparator"
                    placeholder="Example: , - | ..."
                    title="Separator used to merge inline data"
                    aria-label="Inline data separator"
                    maxlength="5" value=","
                >
                <small class="text-muted">
                    Choose a character to separate inline values (e.g. <code>,</code> <code>-</code> <code>|</code>)
                </small>
            </div>
        </div>
    `);

    $form.find('#showInlineData').prop('checked', isInline);

    if (isInline) {
        $form.find('.inlineSeparatorBox').removeClass('d-none').show();
        $form.find('#inlineDataSeparator').val(separator);
    }
}

function saveInlineDataSettings($target) {
    const $section = $target;
    const isInline = $form.find('#showInlineData').is(':checked');
    const separator = $form.find('#inlineDataSeparator').val() || '';

    $section.removeClass('show-inline-data').removeAttr('data-separator');

    if (isInline) {
        $section.addClass('show-inline-data').attr('data-separator', separator);
    }
}

$(document).on("change", "#showInlineData", function () {
    if ($(this).is(":checked")) {
        $form.find('.inlineSeparatorBox').removeClass('d-none').show();
    } else {
        $form.find('.inlineSeparatorBox').addClass('d-none').hide();
    }
})

/**
 * Event: #customAttribute input
 *
 * Listens for changes on the custom attribute input field.
 * When the entered value matches `assesmentAttributeOption`, the
 * assessment action options input field is dynamically appended to
 * the form. If the value no longer matches, the options field is
 * removed from the DOM.
 */
$(document).on("input", "#customAttribute", function () {
    if ($(this).val() === assesmentAttributeOption) {
        addAssesmentActionOptions();
    } else {
        $form.find("#assesmentActionRulesContainer").remove();
    }
})

$(document).on("click", ".add-assesment-rule", function () {
    let html = getAssesmentActionRuleHtml({}, false);
    $(this).closest(".rules-list").append(html);
});

$(document).on("click", ".remove-assesment-rule", function () {
    $(this).closest(".assesment-action-rule-item").remove();
});

function getAssesmentActionRuleHtml(rule, isFirst = false) {
    let actionBtn = isFirst
        ? `<button type="button" class="btn btn-sm btn-success add-assesment-rule px-2 fw-bold">+</button>`
        : `<button type="button" class="btn btn-sm btn-danger remove-assesment-rule px-2 fw-bold">-</button>`;

    let controllerOptions = (rule.controller_options || []).join(", ");
    let disabledOptions = (rule.disabled_options || []).join(", ");
    let defaultValue = rule.default_value || "";
    let checkAll = rule.should_check_all !== false ? 'checked' : '';
    let customAttribute = rule.custom_attribute || "";

    return `<div class="p-2 border rounded mb-2 assesment-action-rule-item">
                <div class="d-flex gap-2 align-items-center mb-2">
                    ${actionBtn}
                    <div class="flex-grow-1">
                        <input type="text" class="form-control form-control-sm rule-controller-options" placeholder="Controller Options (e.g. Yes, Passed)" value="${controllerOptions}">
                    </div>
                    <div class="form-check mb-0 text-nowrap">
                        <input class="form-check-input rule-check-all" type="checkbox" ${checkAll}>
                        <label class="form-check-label" style="font-size:12px;">Check All</label>
                    </div>
                </div>
                <div class="d-flex gap-2 align-items-center mb-2">
                    <div class="flex-grow-1">
                        <input type="text" class="form-control form-control-sm rule-disabled-options" placeholder="Disabled Options (e.g. UNSATISFACTORY)" value="${disabledOptions}">
                    </div>
                    <div class="flex-grow-1">
                        <input type="text" class="form-control form-control-sm rule-default-value" placeholder="Default Value" value="${defaultValue}">
                    </div>
                </div>
                <div>
                    <input type="text" class="form-control form-control-sm rule-custom-attribute" placeholder="Custom Attribute" value="${customAttribute}">
                </div>
            </div>`;
}

/**
 * Renders the Assessment Action Options input field into the advanced
 * settings panel.
 *
 * Clears any existing instance of the field before re-rendering to
 * avoid duplicates. The optional `rules` array is used to pre-populate
 * the input (e.g. when loading saved field data).
 *
 * @param {Object[]} [rules=[]] - Pre-existing rules to display.
 */
function addAssesmentActionOptions(rules = []) {
    $form.find("#assesmentActionRulesContainer").remove();

    if (!Array.isArray(rules) || rules.length === 0) {
        rules = [{
            custom_attribute: null,
            controller_options: [],
            disabled_options: [],
            should_check_all: true,
            default_value: ""
        }];
    }

    let rulesHtml = rules.map((rule, index) => getAssesmentActionRuleHtml(rule, index === 0)).join('');

    let fieldAttribute = `<div class="mb-3 advancesettingBox" id="assesmentActionRulesContainer">
                              <label class="form-label">Assessment Action Rules</label>
                              <div class="rules-list">
                                  ${rulesHtml}
                              </div>
                          </div>`;
    $form.find(".advancesettingBox:first").show();
    $form.find(".advancesettingBox:last").after(fieldAttribute)
}

/**
 * Reads and persists the assessment action options from the form into
 * the field data object before saving.
 *
 * If the field's `custom_attribute` does not match `assesmentAttributeOption`,
 * the options are cleared (set to an empty array). Otherwise, the raw
 * values are parsed, trimmed, and filtered to remove
 * any blank entries before being stored on `data.assessment_action_rules`.
 *
 * @param {Object} data - The field data object being prepared for save.
 * @returns {Object} The mutated `data` object with `assessment_action_rules` set.
 */
function saveAssesmentActionOptions(data) {
    if (data.custom_attribute != assesmentAttributeOption) {
        data.assessment_action_rules = [];
        return data;
    }

    let rules = [];
    $form.find(".assesment-action-rule-item").each(function () {
        let customAttribute = $(this).find(".rule-custom-attribute").val().trim();
        let controllerStr = $(this).find(".rule-controller-options").val();
        let disabledStr = $(this).find(".rule-disabled-options").val();
        let defaultValue = $(this).find(".rule-default-value").val().trim();
        let shouldCheckAll = $(this).find(".rule-check-all").is(":checked");

        let controller_options = controllerStr.split(",").map(v => v.trim()).filter(v => v.length > 0);
        let disabled_options = disabledStr.split(",").map(v => v.trim()).filter(v => v.length > 0);

        if (controller_options.length > 0 || disabled_options.length > 0 || customAttribute.length > 0) {
            rules.push({
                custom_attribute: customAttribute.length > 0 ? customAttribute : null,
                controller_options: controller_options,
                disabled_options: disabled_options,
                should_check_all: shouldCheckAll,
                default_value: defaultValue.length > 0 ? defaultValue : null
            });
        }
    });

    data.assessment_action_rules = rules;
    return data;
}
