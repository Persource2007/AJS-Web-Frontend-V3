<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<style>
.editednow{color: #01bef3 !important;}
</style>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <?php
            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- start page title -->
            <!-- end page title -->

            <div class="row">
                <div class="col-lg-12">
                    <div class="card">

                        <div class="card-body border-0 border-dashed border-end-0 border-start-0">
                            <div class="row g-2">
                                <div class="col-xxl-4 col-sm-4">
                                    <div class="d-flex align-items-center"><label style="margin: 2px 5px;width:13px;height: 13px;background: #d20000;"></label> Error response set</div>
                                    <div class="d-flex align-items-center"><label style="margin: 2px 5px;width:13px;height: 13px;background: #0000ff;"></label> Field modified</div>
                                    <div class="d-flex align-items-center"><label style="margin: 2px 5px;width:13px;height: 13px;background: #01bef3;"></label> Field edit mode</div>
                                </div>
                                <div class="col-xxl-8 col-sm-4 text-end">
                                    <button data-action="approve" type="button" data-heading="Update Certificate" class="update-certificate btn btn-primary approve-btn waves-effect waves-light">
                                        <i class="ri-checkbox-circle-line align-bottom me-1"></i>Approve Certificate
                                    </button>

                                    <button data-action="generate" type="button" data-heading="Update Certificate" class="update-certificate btn btn-primary generate-btn waves-effect waves-light" style="display: none;">
                                        <i class="ri-edit-box-line align-bottom me-1"></i>Update & Generate Certificate
                                    </button>

                                    <button data-action="reject" type="button" data-heading="Reject Certificate" class="reject-certificate btn btn-danger add-btn waves-effect waves-light">
                                        <i class="ri-close-circle-line me-1"></i>Reject & Return Certificate
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body content" id="edit-certificate-pdf">
                        <!--end row-->

                    </div>
                    <!--end card-body-->
                </div>
            </div>
            <!--end col-->
        </div>
        <!--end row-->
    </div>
    <!-- container-fluid -->
</div>
</div>
<!-- Form Field Edit Setting -->
<?php require_once __DIR__ . '/inc/edit-pdf-form-styles.php'; ?>
<!-- Form Field Edit Setting -->
<script type="text/javascript">
    controlLoader('show');
    let $table_templates_json = [];
    let $fields_json = [];
    let $data_json = [];
    let $dataConnectionJson = [];
    const $task = "<?php echo $task; ?>";
    const $certificate = "<?php echo $certificate; ?>";
    set_breadcrumb([{label: 'Edit Certificate PDF', url: null}]);
    async function edit_certificate_pdf() {
        await ajs.ajax_form(site_url + 'edit-certificate-pdf', {task: $task, certificate: $certificate}, "POST", null, "0", "0", edit_certificate, edit_certificate);
    }
    function edit_certificate(response){
        if (ajs_form_handler.check_result(response)){
            if (response.status) {
                var data = response.data;
                $table_templates_json = data.table_data;
                $fields_json = data.certificate_data;
                $data_json = data.pdf_data;
                $dataConnectionJson = data.interconnection;
                $('#edit-certificate-pdf').html(data.pdf);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!!!',
                    text: response.message
                }).then((result) => {
                    location.href = cdn_url + 'job/list';
                })
            }
            controlLoader('hide');
        }else{
            ajs_form_handler.show_errors_offcanvas(response);
        }
    }
    edit_certificate_pdf();

    function closeStyleForm() {
        $('#edit-field-settings').offcanvas('hide');
    }
    function showStyleForm() {
        closeStyleForm();
        setTimeout(function () {
            $('#edit-field-settings').offcanvas('show');
        }, 200);
    }
    function resetSettings() {
        document.getElementById('editFieldSettingForm').reset();
        $is_duplicate = false;
        $is_table_template = false;
        $data_key_index = -1;
        $selected_field = -1;
        $table_row_index = -1;
        $table_key_index = -1;
        $selected_field_data = new Array();
        $table_template_name = '';
        $template_table_name = '';
        $('.edit-field').removeClass('editednow');
        closeStyleForm();
    }

    let $selected_field_data = new Array();
    let $is_table_template = false;
    let $table_template_name = '';
    let $template_table_name = '';
    let $table_row_index = -1;
    let $table_key_index = -1;
    let $is_duplicate = false;
    let $data_key_index = -1;
    let $selected_field = -1;
    let $edit_form = $('#edit-field-settings');
    let dynamicSave = true;

    function saveConnectionOptions(ftype){
        controlLoader('show');
        dynamicSave = false
        selectData = [];
        // var tarRow = $(".editednow").closest("table").closest("tr");
        $edit_form.find('.fieldValueBox .fielddatas').each(function(){
            let dataType = $(this).attr("data-type");
            let value = "";
            let attr = $(this).find("input,select").attr("data-attribute");
            let dvalue = $(this).find("input,select").attr("field-default-value");
            if(dataType == "radio"){
                value = $(this).find("input:checked").val();
                // attr = $(this).find("input").attr("data-attribute");
            }else{
                value = $(this).find("input,select").val();
            }
            if(dataType == "select" && $(this).find("input").length > 0){
                ovalue = $(this).find("input").val();
                let otherattr = attr+"|other";
                selectData.push({ value: ovalue, attribute: otherattr, message: msg});
            }

            if($.trim(value) == ""){
                value = dvalue;
            }
            if(value == undefined || $(this).css("display") == "none"){
                value = '';
            }
            var msg = $edit_form.find('#responseMessage').val();
            
            selectData.push({ value: value, attribute: attr, message: msg});
            $edit_form.find('#responseMessage').val('');
        })

        let parentF;
        if($(".editednow").parents().hasClass("dynamicTable")){ //for table templates interconnection
            attr = selectData[0].attribute;
            parentF = $(".editednow").closest(".child-sec").find(".dynamicTable");
            let attrLen = $(parentF).find(`button[connection-attr="${attr}"]`).length;
            if(attrLen > 1){
                let rowIndex = $(".editednow").closest("table").closest("tr").index();
                parentF = parentF.find("table tr").eq(rowIndex);
            }
        }else{
            parentF = $(".editednow").closest(".row-sec").children().not(".dynamicTable");
        }
        function processSelectData(item, tarRow, isSingle = false) {
            callIndex++;
            $('#edit-field-settings').css('display',"none");
            let editbutton;
            if(isSingle){
                editbutton = tarRow;
            }else{
                // var tarParent = tarRow.find(`button[connection-attr='${item.attribute}']`).closest("tr").find("td");
                editbutton = tarRow.find(`button[connection-attr='${item.attribute}']`);
            }
            if(editbutton.length > 0){
                let field_type = editbutton.attr("field-type");
                editbutton.click();
                editbutton.attr("field-value", JSON.stringify(item.value));
                $edit_form.find('#responseMessage').val(item.message);
                var field = '';
                
                var othrAttr = item.attribute+"|other";
                let valuee = item.value;

                var othrext = selectData.findIndex(data => data.attribute == othrAttr);
                if(field_type == "select" && othrext != -1){
                    valueeo = selectData[othrext].value;
                    field += `<input type="text" class="otherbox" checked name="fieldValue" value='${valueeo}'>`;
                }
                if(field_type == "radio"){
                    field += `<input type="radio" class="" checked name="fieldValue" id="fieldValue" value='${valuee}'>`;
                }else{
                    field += `<input type="text" class="form-control" id="fieldValue" value='${valuee}' placeholder="Value">`;
                }
                $edit_form.find('.fieldValueBox').html(field);
                setTimeout(function(){$(".update_close").click();},110)
            }
            
            if(selectData[callIndex]?.value !== undefined){
                setTimeout(function(){
                    closeStyleForm();
                    $('#edit-field-settings').removeAttr('style');
                    processSelectData(selectData[callIndex], tarRow);
                },500)
            }
            if(callIndex == selectData.length){
                setTimeout(function(){
                    dynamicSave = true;
                    closeStyleForm();
                    $('#edit-field-settings').removeAttr('style');
                    controlLoader('hide');
                },1000)
            }
        }
        var callIndex = 0;
        if(selectData.length == 1){
            processSelectData(selectData[callIndex], $(".edit-field.editednow"));
        }else{
            processSelectData(selectData[callIndex], parentF);
        }
    }

    $(document).on('click', '.update_close', function () {
        try {
            var value = $edit_form.find('#fieldValue').val();
            var res_code = $edit_form.find('#responseCode').val();
            res_code = 400;
            var res_msgg = $edit_form.find('#responseMessage').val();

            if ($selected_field == -1) {
                Swal.fire({
                    title: "Error!!",
                    text: "Something went wrong.please try again.",
                    icon: "error",
                    customClass: {
                        confirmButton: 'swal2-deny',
                    },
                });
                resetSettings();
                return false;
            }
            //
            let otherfieldvalue = false;
            var ftype = $selected_field_data.field_type;
            var is_dynamic_options = $selected_field_data.is_dynamic_options;
            if (is_dynamic_options == '1' && (ftype == 'text' || ftype == 'select' || ftype == 'radio') && dynamicSave) {
                var selectData = [];
                dynamicSave = false;
                saveConnectionOptions(ftype);
                return false;
            }
            else if (ftype == 'checkbox') {
                var sel = $edit_form.find('input[name="fieldValue"]:checked').length;
                if (sel > 0) {
                    var options = [];
                    $edit_form.find('input[name="fieldValue"]:checked').each(function () {
                        if ($selected_field_data.allow_multi_dropdown != 1) {
                            options = [];
                        }
                        var cval = $(this).val();
                        var data = $selected_field_data.options.find((data) => data.name == cval);
                        options.push({name: cval, note: data?.note || ''});
                    });
                    json_value = options;
                    value = options.map(item => item.name).join(', ');
                } else {
                    json_value = [];
                    var value = '';
                }
            } else if (ftype == 'radio') {
                value = $edit_form.find('input[name="fieldValue"]:checked').val();
                if (value != '' && value != undefined && value != null) {
                    var data = $selected_field_data.options.find((data) => data.name == value);
                    json_value = {name: value, note: data?.note || ''};
                } else {
                    json_value = {};
                }
            } else if (ftype == 'select') {
                value = $edit_form.find('#fieldValue').val();
                if($edit_form.find("#fieldValue").parent().find("input.otherbox").length > 0){
                    otherfieldvalue = $edit_form.find("#fieldValue").parent().find("input.otherbox").val();;
                }
                if (value != '' && value != undefined && value != null) {
                    var data = $selected_field_data.options.find((data) => data.name == value);
                    json_value = {name: value, note: data?.note || ''};
                } else {
                    json_value = {};
                }
            } else {
                json_value = value;
            }
            if (value == null || value == undefined) {
                value = '';
            }
            //
            if ($is_table_template) {
                if ($is_duplicate) {
                    var table_fields_data = $data_json.duplicate_sections[$data_key_index].data[$table_template_name][$template_table_name];
                } else {
                    var table_data = $data_json[$table_template_name][$template_table_name];
                    var table_fields_data = $data_json[$table_template_name][$template_table_name];
                }
                while (table_fields_data.length <= $table_row_index) {
                    table_fields_data.push({});
                }
                table_fields_data[$table_row_index][$selected_field] = json_value;
                if(otherfieldvalue != false){
                    $otherselected_field = $selected_field+"|other";
                    table_fields_data[$table_row_index][$otherselected_field] = otherfieldvalue;
                    value = otherfieldvalue;
                }
            } else {
                if ($is_duplicate) {
                    $data_json.duplicate_sections[$data_key_index].data[$selected_field] = json_value;
                    if(otherfieldvalue != false){
                        $otherselected_field = $selected_field+"|other";
                        $data_json.duplicate_sections[$data_key_index].data[$otherselected_field] = otherfieldvalue;
                        value = otherfieldvalue;
                    }
                } else {
                    $data_json[$selected_field] = json_value;
                    if(otherfieldvalue != false){
                        $otherselected_field = $selected_field+"|other";
                        $data_json[$otherselected_field] = otherfieldvalue;
                        value = otherfieldvalue;
                    }
                }
            }
            if ($data_json.errors == undefined) {
                $data_json.errors = {duplicates: []};

                //Added by Nishant Solanki, 13th April 2025 to avoid first time error message
                if (typeof $data_json.duplicate_sections !== 'undefined' && $data_json.duplicate_sections.length > 0)
                {
                    for (int = 0; int < $data_json.duplicate_sections.length; int++) {
                        section_id = $data_json.duplicate_sections[int].section_id;
                        $data_json.errors.duplicates.push({section_id, data: {}});
                    }
                }
            }

            // if(res_code != ''){
            if ((res_code != '' && $.trim(res_msgg) != '')) {
                var $res_err = {code: res_code, message: res_msgg};
                if ($is_duplicate) {
                    if ($is_table_template) {
                        $data_json.errors.duplicates[$data_key_index].data[$table_template_name] ??= {};
                        $data_json.errors.duplicates[$data_key_index].data[$table_template_name][$template_table_name] ??= [];
                        $mjsondata = $data_json.errors.duplicates[$data_key_index].data[$table_template_name][$template_table_name];
                        while ($mjsondata.length <= $table_row_index) {
                            $mjsondata.push({});
                        }
                        $mjsondata[$table_row_index][$selected_field] = $res_err;
                    } else {
                        $data_json.errors.duplicates[$data_key_index].data[$selected_field] = $res_err;
                    }
                } else {
                    if ($is_table_template) {
                        $data_json.errors[$table_template_name] ??= {};
                        $data_json.errors[$table_template_name][$template_table_name] ??= [];
                        $mjsondata = $data_json.errors[$table_template_name][$template_table_name];
                        while ($mjsondata.length <= $table_row_index) {
                            $mjsondata.push({});
                        }
                        $mjsondata[$table_row_index][$selected_field] = $res_err;
                    } else {
                        $data_json.errors[$selected_field] = $res_err;
                    }
                }
                $('.editednow').css("color", "#d20000");
            } else {
                // if($is_duplicate && $data_json.errors.duplicates[$data_key_index].data[$selected_field] != undefined){
                //     delete $data_json.errors.duplicates[$data_key_index].data[$selected_field];
                // }
                // else if($is_duplicate && $is_table_template && $data_json.errors.duplicates[$data_key_index].data[$table_template_name][$template_table_name][$table_row_index][$selected_field] != undefined){
                //     delete $data_json.errors.duplicates[$data_key_index].data[$selected_field];
                // }
                // else if($data_json.errors[$selected_field] != undefined){
                //     delete $data_json.errors[$selected_field];
                // }
                // else if($is_table_template && $data_json.errors[$table_template_name][$template_table_name][$table_row_index][$selected_field] != undefined){
                //     delete $data_json.errors[$table_template_name][$template_table_name][$table_row_index][$selected_field];
                // }
                if ($is_duplicate) {
                    const dupField = $data_json.errors?.duplicates?.[$data_key_index]?.data;

                    if (dupField?.[$selected_field] !== undefined) {
                        delete dupField[$selected_field];
                    } else if ($is_table_template && dupField?.[$table_template_name]?.[$template_table_name]?.[$table_row_index]?.[$selected_field] !== undefined) {
                        delete dupField[$table_template_name][$template_table_name][$table_row_index][$selected_field];
                    }

                } else {
                    const errorRoot = $data_json.errors;

                    if (errorRoot?.[$selected_field] !== undefined) {
                        delete errorRoot[$selected_field];
                    } else if ($is_table_template && errorRoot?.[$table_template_name]?.[$template_table_name]?.[$table_row_index]?.[$selected_field] !== undefined) {
                        delete errorRoot[$table_template_name][$template_table_name][$table_row_index][$selected_field];
                    }
                }

                $('.editednow').css("color", "#0000ff");
            }
            var editbutton = $('.editednow')[0].outerHTML;
            let showAllOption = $selected_field_data?.show_all_options || false;
            let allowMulti = $selected_field_data?.allow_multi_dropdown || false;
            if(ftype == "radio" || (ftype == "checkbox" && allowMulti != "1" && showAllOption != "1") || ftype == "select"){
                let displayRule = $selected_field_data?.display_rule || false;
                let displayInput = $selected_field_data?.display_input || false;
                if(displayRule && displayInput){
                    value = applyDisplayRule(value, displayRule, displayInput);
                }
            }
            $('.editednow').parent().html(editbutton + value);
            $('.approve-btn').hide();
            $('.generate-btn').show();

        } catch (error) {

            console.log("Error name:", error.name);       // e.g. "ReferenceError"
            console.log("Error message:", error.message); // e.g. "myUndefinedFunction is not defined"
            console.log("Stack trace:", error.stack);     // Full error trace (optional)
            Swal.fire({
                title: "Error!!",
                text: "Something went wrong.please try again.",
                icon: "error",
                customClass: {
                    confirmButton: 'swal2-deny',
                },
            });
        }
        resetSettings();
    });

    // Function to access nested object properties based on a string path
    function getFieldDataByStringPath(obj, path) {
        return path.split('.').reduce((acc, key) => acc[key], obj);
    }

    $(document).on('click', '.edit-field', function () {
        try{
        resetSettings();
        $edit_form.find(".fieldValueBox").html('')
        var $target = $(this);
        $target.addClass('editednow');
        let $editable_data = $target.attr('editable-data');
        $editable_data = JSON.parse($editable_data);

        var is_table_template = $editable_data.is_table_template;
        var is_duplicate_row = $editable_data.is_duplicate_row;
        var section_key_index = $editable_data.section_key_index;
        var is_duplicate = $editable_data.is_duplicate;
        var data_key_index = $editable_data.data_key_index;
        var field_index = $editable_data.field_index;
        var field_name = $editable_data.field_name;
        // tt
        var template_index = $editable_data.template_index;
        var template_name = $editable_data.template_name;
        var table_index = $editable_data.table_index;
        var table_name = $editable_data.table_name;
        var table_row_index = $editable_data.table_row_index;
        // tt
        var field_data = '';
        if (is_table_template) {
            $is_table_template = true;
            if (is_duplicate) {
                $is_duplicate = true;
                var table_fields_data = $data_json.duplicate_sections[data_key_index].data[template_name][table_name];
            } else {
                var table_fields_data = $data_json[template_name][table_name];
            }
            // var check_data_exist = table_fields_data.find((row) => row.hasOwnProperty(field_name));
            if (table_fields_data[table_row_index] && table_fields_data[table_row_index][field_name] !== undefined) {
                var field_value = table_fields_data[table_row_index][field_name];
            } else {
                var field_value = '';
            }

            if ($table_templates_json[table_index][table_row_index] == undefined) {
                table_row_index = 0;
            }
            var field_data = $table_templates_json[table_index][table_row_index]['fields'][field_index];
        } else {
            if (is_duplicate) {
                $is_duplicate = true;
                var field_value = $data_json.duplicate_sections[data_key_index].data[field_name];
            } else {
                var field_value = $data_json[field_name];
            }
            var dataPath = `${section_key_index}.fields.${field_index}`;
            var field_data = getFieldDataByStringPath($fields_json, dataPath);
        }

        if (field_data == undefined || field_data == '') {
            Swal.fire({
                title: "Error!!",
                text: "Something went wrong.please try again.",
                icon: "error",
                customClass: {
                    confirmButton: 'swal2-deny',
                },
            });
            resetSettings();
            return false;
        }

        if ($.trim(field_value) == '') {
            field_value = field_data.default_value;
        }
        $data_key_index = data_key_index;
        $selected_field = field_name;
        $selected_field_data = field_data;
        $table_template_name = template_name;
        $template_table_name = table_name;
        $table_row_index = table_row_index;
        $table_key_index = table_index;

        var field_type = field_data.field_type;
        var field_name = field_data.name;

        createDataField(field_type, field_value, field_data);
        $edit_form.find('#fieldType').val(field_type.toUpperCase());
        $edit_form.find('#fieldName').val(field_name);
        $edit_form.find('#fieldValue').val(field_value);
        var responseCode = 400;
        var responseMessage = '';
        let fieldError = null;
        // if($is_duplicate && $data_json.errors != undefined && $data_json.errors.duplicates[$data_key_index].data[$selected_field] != undefined){
        //     responseCode = $data_json.errors.duplicates[$data_key_index].data[$selected_field].code;
        //     responseMessage = $data_json.errors.duplicates[$data_key_index].data[$selected_field].message;
        // }
        // else if(!$is_duplicate && $data_json.errors != undefined){

        //     if(is_table_template && $data_json.errors[template_name][table_name][table_row_index][$selected_field] != undefined)
        //     {
        //         responseCode = $data_json.errors[template_name][table_name][table_row_index][$selected_field].code;
        //         responseMessage = $data_json.errors[template_name][table_name][table_row_index][$selected_field].message;
        //     }
        //     else if($data_json.errors[$selected_field] != undefined)
        //     {
        //         responseCode = $data_json.errors[$selected_field].code;
        //         responseMessage = $data_json.errors[$selected_field].message;
        //     }
        // }
        if ($is_duplicate) {
            if (is_table_template) {
                fieldError = $data_json.errors?.duplicates?.[$data_key_index]?.data?.[template_name]?.[table_name]?.[table_row_index]?.[$selected_field] ?? null;
            } else {
                fieldError = $data_json.errors?.duplicates?.[$data_key_index]?.data?.[$selected_field] ?? null;
            }
        } else if ($data_json.errors) {
            if (is_table_template) {
                fieldError = $data_json.errors?.[template_name]?.[table_name]?.[table_row_index]?.[$selected_field] ?? null;
            } else {
                fieldError = $data_json.errors?.[$selected_field] ?? null;
            }
        }

        if (fieldError) {
            responseCode = fieldError.code ?? 400;
            responseMessage = fieldError.message ?? '';
        }

        $edit_form.find('#responseCode').val(responseCode);
        $edit_form.find('#responseMessage').val(responseMessage);
        showStyleForm()
        }catch{
            Swal.fire({
                title: "Error!!",
                text: "Something went wrong.please try again.",
                icon: "error",
                customClass: {
                    confirmButton: 'swal2-deny',
                },
            });
        }
    });
    function controlLoader(type) {
        loader_id = 'loader-main';
        $('#' + loader_id).addClass("position-fixed").addClass("position-absolute");
        if (type == 'show') {
            $('#' + loader_id).fadeIn(250);
        } else {
            $('#' + loader_id).fadeOut(250);
        }
    }
    // controlLoader('show');

    function createDataField(type, value, fdata) {
        // var fields = $edit_form.find('.fieldValueBox')
        if (value == null || value == undefined) {
            value = '';
        }
        var is_dynamic_options = fdata.is_dynamic_options;
        var selected = '';
        var field = '<label for="fieldValue" class="form-label">Field Value</label>';

        if (type == 'number' || type == 'phone') {
            field += `<input type="number" class="form-control" id="fieldValue" value='${value}' placeholder="Value">`;
        } else if (type == 'email') {
            field += `<input type="email" class="form-control" id="fieldValue" value='${value}' placeholder="Value">`;
        } else if (type == 'date') {
            field += `<input type="text" class="form-control datepicker" id="fieldValue" value='${value}' placeholder="Value">`;
        } else if (type == 'time') {
            field += `<input type="text" class="form-control timepicker" id="fieldValue" value='${value}' placeholder="Value">`;
        } else if (type == 'datetime') {
            field += `<input type="text" class="form-control datetimepicker" id="fieldValue" value='${value}' placeholder="Value">`;
        } else if (type == 'text') {
            if (is_dynamic_options == '1') {
                initConnectionOptions(fdata.connection_attribute, value, fdata);
                return '';
            }else{
                field += `<input type="text" class="form-control" id="fieldValue" value='${value}' placeholder="Value">`;
            }
        } else if (type == 'textarea') {
            field += `<textarea class="form-control" id="fieldValue" placeholder="Value">${value}</textarea>`;
        } else if (type == 'checkbox') {
            var multiselect = (fdata.allow_multi_dropdown == 1) ? 'mupltipleselect' : 'singleselectcheck';
            var options = '';
            fdata.options.forEach(function (val, index) {
                if (value.name != '' && value.findIndex(data => data.name.toLowerCase() == val.name.toLowerCase()) != -1) {
                    selected = 'checked';
                }
                options += `<label class='label-text d-block'><input ${selected} class='form-check-input fieldValue ${multiselect}' data-note="${val.note}" type='checkbox' name='fieldValue' value='${val.name}'>${val.name}</label>`;
                selected = '';
            });
            field += '<div class="form-check bg-gray">' + options + '</div>';
        } else if (type == 'radio') {
            if (is_dynamic_options == '1') {
                initConnectionOptions(fdata.connection_attribute, value, fdata);
                return '';
            }
            var options = '';
            fdata.options.forEach(function (val, index) {
                if (value.name != undefined && value.name != '' && value.name.toLowerCase() == val.name.toLowerCase()) {
                    selected = 'checked';
                }
                options += `<label class='label-text d-block'><input ${selected} class='form-check-input fieldValue' data-note="${val.note}"" type='radio' name='fieldValue' value='${val.name}'>${val.name}</label>`;
                selected = '';
            });
            field += '<div class="form-check bg-gray">' + options + '</div>';
        } else if (type == 'select') {
            if (is_dynamic_options == '1') {
                initConnectionOptions(fdata.connection_attribute, value, fdata);
                return '';
            } else {
                var sother = fdata?.allow_custom_input == true ? 1 : 0;
                var oother = fdata?.matching_options || [];
                var options = `<option value="" disabled>Select</option>`;
                fdata.options.forEach(function (val, index) {
                    if (value.name != undefined && value.name != '' && val.name.toLowerCase() == value.name.toLowerCase()) {
                        selected = 'selected';
                    }
                    options += `<option value="${val.name}" ${selected}>${val.name}</option>`;
                    selected = '';
                });
                dvalue = $(".editednow").parent().text();
                field += `<select other='${sother}' options='${oother}' data-default='${dvalue}' class="form-control" id="fieldValue" placeholder="SELECT">${options}</select>`;
                setTimeout(function () {
                    $edit_form.find('#fieldValue').val(value.name);
                    $edit_form.find('#fieldValue').trigger("change");
                }, 5)
            }
        }
        // else if(type == 'file'){
        //     field += `<input type="number" class="form-control" id="fieldValue" value='${value}' placeholder="Value">`;
        // }
        // else if(type == 'file_caption'){
        //     field += `<input type="number" class="form-control" id="fieldValue" value='${value}' placeholder="Value">`;
        // }
        // else if(type == 'sign'){
        //     field += `<input type="number" class="form-control" id="fieldValue" value='${value}' placeholder="Value">`;
        // }
        else {
            return '';
        }
        $edit_form.find('.fieldValueBox').html(field);
    }

    let connections = [];
    function defaultValueField(){
        let vall = $(".editednow").text();
        let field = `<label for="fieldValue" class="form-label">Field Value</label><input type="text" class="form-control" id="fieldValue" value='${vall}' placeholder="Value">`;
        $edit_form.find('.fieldValueBox').html(field);
        controlLoader("hide")
    }

    function initConnectionOptions(connectionAttribute, value, fdata) {
        controlLoader("show")
        if ($is_table_template) {
            connections = $table_templates_json?.interconnection[$table_key_index];
        } else {
            connections = $dataConnectionJson;
        }
        var field = '';
        const parentFields = connections.filter(obj => { 
                                            const key = Object.keys(obj)[0];
                                            return obj[key]?.some?.(item => item.is_parent === true);
                                    }).map(obj => Object.keys(obj)[0]);
        parentFields.forEach(attr => {
            let parentF;
            if($(".editednow").parents().hasClass("dynamicTable")){ //for table templates interconnection
                    parentF = $(".editednow").closest(".child-sec").find(".dynamicTable");
                let attrLen = $(parentF).find(`button[connection-attr="${attr}"]`).length;
                if(attrLen > 1){
                    let rowIndex = $(".editednow").closest("table").closest("tr").index();
                    parentF = parentF.find("table tr").eq(rowIndex);
                }
            }else{
                parentF = $(".editednow").closest(".row-sec").children().not(".dynamicTable");
            }      
                if(parentF){
                    let parentIndex = connections.findIndex(obj => obj.hasOwnProperty(attr));
                    if(parentIndex != -1){
                        let connData = connections?.[parentIndex]?.[attr] || [];
                        let fieldId = attr.toLowerCase();
                        if($(parentF).find(`button[connection-attr="${attr}"]`).length == 0){
                            defaultValueField();
                            return
                        }
                        let tar_label = $(parentF).find(`button[connection-attr="${attr}"]`).attr("field-label");
                        let field_type = $(parentF).find(`button[connection-attr="${attr}"]`).attr("field-type");
                        let field_value = $(parentF).find(`button[connection-attr="${attr}"]`).attr("field-value");
                        let sother = $(parentF).find(`button[connection-attr="${attr}"]`).attr("sother");
                        let oother = $(parentF).find(`button[connection-attr="${attr}"]`).attr("oother");
                            field_value = JSON.parse(field_value);
                        let field = `<div class="mb-3 fielddatas ${attr.toLowerCase()}"><label for="${fieldId}" class="form-label">${tar_label}</label>`;

                        if(field_type == "text")
                        {   
                            field_value = field_value || connData[0]?.name;
                            field += `<input data-attribute="${attr}" type="text" data-target="${connData[0].id}" data-default="${field_value}" class="form-control dynamicInput mb-2" id="${fieldId}" value="${field_value}">`;
                            setTimeout(() => {$edit_form.find(`.${attr.toLowerCase()} input`).click()},0);
                        }
                        else if(field_type == "select")
                        {
                            let optionsHtml = `<option value="" disabled>Select</option>`;
                            let selected = '';
                            connData.forEach(option => {
                                if (field_value?.name === option.name || field_value === option.name) {
                                    selected = 'selected';
                                }
                                optionsHtml += `<option data-target="${option.id}" value="${option.name}" ${selected}>${option.name}</option>`;
                                selected = '';
                            });
                            field += `<select other='${sother}' options='${oother}' data-attribute="${attr}" data-default="${field_value?.name || ''}" class="form-control dynamicSelect mb-2" id="${fieldId}">${optionsHtml}</select>`;
                            setTimeout(() => {$edit_form.find(`.${attr.toLowerCase()} select`).trigger("change")},0);
                        }
                        else if(field_type == "radio")
                        {
                            let checked = '';
                            field += `<div>`;
                            connData.forEach(option => {
                                if (field_value?.name === option.name || field_value === option.name) {
                                    checked = 'checked';
                                }
                                field += `<label><input data-attribute="${attr}" name="${attr}" data-target="${option.id}" type="radio" data-default="${field_value?.name || ''}" class="dynamicRadio mb-2" id="${fieldId}" value="${option.name}" ${checked}>&nbsp;${option.name}</label><br/>`; 
                            });
                            field += `</div>`;
                            setTimeout(() => {$edit_form.find(`.${attr.toLowerCase()} input:checked`).trigger("change")},0);
                        }

                        field += `</div>`;
                        $edit_form.find('.fieldValueBox').html(field);
                        $edit_form.find(`.fieldValueBox .${attr.toLowerCase()}`).attr("data-type",field_type);
                    }
                }
        })
    }
    let selectedAttrData = {};
    $(document).on("click",".fieldValueBox .dynamicInput", function(){
        let targetId = $(this).data("target");
        let attr = $(this).data("attribute");
        oldtargetId = selectedAttrData[attr] || false;
        selectedAttrData[attr] = targetId;
        // $(this).parents(".fielddatas").nextAll().hide();
        makeInterconnectionFields($(this), targetId, attr)        
    })

    let canSetDefault = true;
    $(document).on("change",".fieldValueBox .dynamicRadio", function(){
        let targetId = $(this).data("target");
        let attr = $(this).data("attribute");
        oldtargetId = selectedAttrData[attr] || false;
        selectedAttrData[attr] = targetId;
        // $(this).parents(".fielddatas").nextAll().hide();
        makeInterconnectionFields($(this), targetId, attr)        
    })

    $(document).on("change",".fieldValueBox .dynamicSelect", function(){
        let targetId = $(this).find("option:selected").data("target");
        let attr = $(this).data("attribute");
        oldtargetId = selectedAttrData[attr] || false;
        selectedAttrData[attr] = targetId;
        // $(this).parents(".fielddatas").nextAll().hide();
        makeInterconnectionFields($(this), targetId, attr)        
    })
    let oldtargetId = false;
    function makeInterconnectionFields(Obj, targetId, attr){
        let uiLastAttr = attr;
        if ($is_table_template) {
            connections = $table_templates_json?.interconnection[$table_key_index];
        } else {
            connections = $dataConnectionJson;
        }
        let parentIndex = connections.findIndex(obj => obj.hasOwnProperty(attr));
        if(parentIndex != -1){
            let connData = connections?.[parentIndex]?.[attr] || [];
            // remove default
            let rDepnIndex = connData.findIndex(depend => depend.id == oldtargetId);

            if(rDepnIndex != -1){
                // $(".fieldValueBox").find(`.${attr.toLowerCase()}`).nextAll().hide();
                let dependencies = connData[rDepnIndex]?.dependencies;
                dependencies.forEach(dpndncy => {
                    let dependency = dpndncy.dependency;
                    $(".fieldValueBox").find(`.${dependency.toLowerCase()}`).hide();
                })
            }
            // remove default
            // All Options
            let allOptionIndex = connData.findIndex(comm => comm.id == 0);
            let allOption = connData?.[allOptionIndex] || [];
            if(allOptionIndex != -1){
                // $(".fieldValueBox").find(`.${attr.toLowerCase()}`).nextAll().hide();
                let dependencies = connData[allOptionIndex]?.dependencies;
                dependencies.forEach(dpndncy => {
                    let dependency = dpndncy.dependency;
                    let options = dpndncy.options;

                    attr = dependency;
                    let parentF;
                    if($(".editednow").parents().hasClass("dynamicTable")){ //for table templates interconnection
                            parentF = $(".editednow").closest(".child-sec").find(".dynamicTable");
                        let attrLen = $(parentF).find(`button[connection-attr="${attr}"]`).length;
                        if(attrLen > 1){
                            let rowIndex = $(".editednow").closest("table").closest("tr").index();
                            parentF = parentF.find("table tbody tr").eq(rowIndex);
                        }
                    }else{
                        parentF = $(".editednow").closest(".row-sec").children().not(".dynamicTable");
                    }
                    if($(parentF).find(`button[connection-attr="${attr}"]`).length == 0){
                        controlLoader("hide")
                        return
                    }
                    let fieldId = attr.toLowerCase();
                    let tar_label = $(parentF).find(`button[connection-attr="${attr}"]`).attr("field-label");
                    let field_type = $(parentF).find(`button[connection-attr="${attr}"]`).attr("field-type");
                    let field_value = $(parentF).find(`button[connection-attr="${attr}"]`).attr("field-value");
                    let sother = $(parentF).find(`button[connection-attr="${attr}"]`).attr("sother");
                    let oother = $(parentF).find(`button[connection-attr="${attr}"]`).attr("oother");
                        field_value = JSON.parse(field_value);

                    let field = `<div class="mb-3 fielddatas ${attr.toLowerCase()}"><label for="${fieldId}" class="form-label">${tar_label}</label>`;
                    if(field_type == "text")
                    {   
                        field_value = options[0]?.name || field_value;
                        field += `<input data-attribute="${attr}" type="text" data-target="${options[0].id}" data-default="${field_value}" class="form-control dynamicInput mb-2" id="${fieldId}" value="${field_value}">`;
                        setTimeout(() => {$edit_form.find(`.${attr.toLowerCase()} input`).trigger("change")},0);
                    }
                    else if(field_type == "select")
                    {
                        let optionsHtml = `<option value="" selected disabled>Select</option>`;
                        let selected = '';
                        options.forEach(option => {
                            if (field_value?.name === option.name || field_value === option.name) {
                                selected = 'selected';
                            }
                            optionsHtml += `<option data-target="${option.id}" value="${option.name}" ${selected}>${option.name}</option>`;
                            selected = '';
                        });
                        field += `<select other='${sother}' options='${oother}' data-attribute="${attr}" data-default="${field_value?.name || ''}" class="form-control dynamicSelect mb-2" id="${fieldId}">${optionsHtml}</select>`;
                        setTimeout(() => {$edit_form.find(`.${attr.toLowerCase()} select`).trigger("change")},0);
                    }
                    else if(field_type == "radio")
                    {
                        let checked = '';
                        field += `<div>`;
                        options.forEach(option => {
                            if (field_value?.name === option.name || field_value === option.name) {
                                checked = 'checked';
                            }
                            field += `<label><input data-attribute="${attr}" name="${attr}" data-target="${option.id}" type="radio" data-default="${field_value?.name || ''}" class="dynamicRadio mb-2" id="${fieldId}" value="${option.name}" ${checked}>&nbsp;${option.name}</label><br/>`;
                            checked = '';
                        });
                        field += `</div>`;
                        setTimeout(() => {$edit_form.find(`.${attr.toLowerCase()} input:checked`).trigger("change")},0);
                    }else{
                        field = "";
                    }
                    if(field != ''){
                        field += "<hr></div>";
                    }
                    // $edit_form.find(`.fieldValueBox .${uiLastAttr.toLowerCase()}`).after(field);
                    if($edit_form.find(`.fieldValueBox .${attr.toLowerCase()}`).length < 1){
                        // $edit_form.find(`.fieldValueBox`).append(field);
                        $(Obj).parents(".fielddatas").after(field);
                        Obj = $(`.fieldValueBox .${attr.toLowerCase()}`).find("select, input");
                    }else{
                        $edit_form.find(`.fieldValueBox .${attr.toLowerCase()}`).after(field);
                        $edit_form.find(`.fieldValueBox .${attr.toLowerCase()}`).eq(0).remove();
                    }
                    $edit_form.find(`.fieldValueBox .${attr.toLowerCase()}`).show();
                    $edit_form.find(`.fieldValueBox .${attr.toLowerCase()}`).attr("data-type",field_type);
                    uiLastAttr = attr;
                })
            }
            // All Options
            let depnIndex = connData.findIndex(depend => depend.id == targetId);

            if(depnIndex != -1){
                // $(".fieldValueBox").find(`.${attr.toLowerCase()}`).nextAll().hide();
                let dependencies = connData[depnIndex]?.dependencies;
                dependencies.forEach(dpndncy => {
                    let dependency = dpndncy.dependency;
                    let options = dpndncy.options;

                    attr = dependency;
                    let parentF;
                    if($(".editednow").parents().hasClass("dynamicTable")){ //for table templates interconnection
                            parentF = $(".editednow").closest(".child-sec").find(".dynamicTable");
                        let attrLen = $(parentF).find(`button[connection-attr="${attr}"]`).length;
                        if(attrLen > 1){
                            let rowIndex = $(".editednow").closest("table").closest("tr").index();
                            parentF = parentF.find("table tbody tr").eq(rowIndex);
                        }
                    }else{
                        parentF = $(".editednow").closest(".row-sec").children().not(".dynamicTable");
                    }
                    if($(parentF).find(`button[connection-attr="${attr}"]`).length == 0){
                        controlLoader("hide")
                        return
                    }
                    let fieldId = attr.toLowerCase();
                    let tar_label = $(parentF).find(`button[connection-attr="${attr}"]`).attr("field-label");
                    let field_type = $(parentF).find(`button[connection-attr="${attr}"]`).attr("field-type");
                    let field_value = $(parentF).find(`button[connection-attr="${attr}"]`).attr("field-value");
                    let sother = $(parentF).find(`button[connection-attr="${attr}"]`).attr("sother");
                    let oother = $(parentF).find(`button[connection-attr="${attr}"]`).attr("oother");
                        field_value = JSON.parse(field_value);

                    let field = `<div class="mb-3 fielddatas ${attr.toLowerCase()}"><label for="${fieldId}" class="form-label">${tar_label}</label>`;
                    if(field_type == "text")
                    {   
                        field_value = options[0]?.name || field_value;
                        field += `<input data-attribute="${attr}" type="text" data-target="${options[0].id}" data-default="${field_value}" class="form-control dynamicInput mb-2" id="${fieldId}" value="${field_value}">`;
                        setTimeout(() => {$edit_form.find(`.${attr.toLowerCase()} input`).trigger("change")},0);
                    }
                    else if(field_type == "select")
                    {
                        let optionsHtml = `<option value="" selected disabled>Select</option>`;
                        let selected = '';
                        options.forEach(option => {
                            if (field_value?.name === option.name || field_value === option.name) {
                                selected = 'selected';
                            }
                            optionsHtml += `<option data-target="${option.id}" value="${option.name}" ${selected}>${option.name}</option>`;
                            selected = '';
                        });
                        field += `<select other='${sother}' options='${oother}' data-attribute="${attr}" data-default="${field_value?.name || ''}" class="form-control dynamicSelect mb-2" id="${fieldId}">${optionsHtml}</select>`;
                        setTimeout(() => {$edit_form.find(`.${attr.toLowerCase()} select`).trigger("change")},0);
                    }
                    else if(field_type == "radio")
                    {
                        let checked = '';
                        field += `<div>`;
                        options.forEach(option => {
                            if (field_value?.name === option.name || field_value === option.name) {
                                checked = 'checked';
                            }
                            field += `<label><input data-attribute="${attr}" name="${attr}" data-target="${option.id}" type="radio" data-default="${field_value?.name || ''}" class="dynamicRadio mb-2" id="${fieldId}" value="${option.name}" ${checked}>&nbsp;${option.name}</label><br/>`;
                            checked = '';
                        });
                        field += `</div>`;
                        setTimeout(() => {$edit_form.find(`.${attr.toLowerCase()} input:checked`).trigger("change")},0);
                    }else{
                        field = "";
                    }
                    if(field != ''){
                        field += "<hr></div>";
                    }
                    // $edit_form.find(`.fieldValueBox .${uiLastAttr.toLowerCase()}`).after(field);
                    if($edit_form.find(`.fieldValueBox .${attr.toLowerCase()}`).length < 1){
                        // $edit_form.find(`.fieldValueBox`).append(field);
                        $(Obj).parents(".fielddatas").after(field);
                        Obj = $(`.fieldValueBox .${attr.toLowerCase()}`).find("select, input");
                    }else{
                        $edit_form.find(`.fieldValueBox .${attr.toLowerCase()}`).after(field);
                        $edit_form.find(`.fieldValueBox .${attr.toLowerCase()}`).eq(0).remove();
                    }
                    $(".fieldValueBox").find(`.${attr.toLowerCase()}`).show();
                    $edit_form.find(`.fieldValueBox .${attr.toLowerCase()}`).attr("data-type",field_type);
                    uiLastAttr = attr;
                })
            }
        }
        setTimeout(controlLoader.bind(null,"hide"), 5000)
    }

    $(document).on('change', 'input.singleselectcheck', function () {
        $('input.singleselectcheck').prop("checked", false);
        $(this).prop("checked", true);
    });

    $(document).on('click', '.update-certificate', function () {
        if ($data_json.errors != undefined && Object.keys($data_json.errors).length > 1) {
            Swal.fire({
                title: "Validation Error!!",
                text: "You are not allowed to update the certificate when an error field is set. Please reject the certificate instead.",
                icon: "error",
                customClass: {
                    confirmButton: 'swal2-deny',
                },
            });
            return false;
        }
        $type = 'update_approve';
        if ($(this).attr('data-action') == 'approve') {
            $type = 'approve';
        }

        Swal.fire({
            title: "Approve Certificate",
            text: "Are you sure you want to approve this certificate?",
            icon: "warning",
            html: signature_box(),
            showCancelButton: true,
            confirmButtonText: "Yes, approve it!",
            cancelButtonText: "No, cancel",
            showLoaderOnConfirm: true,
            preConfirm: async (message) => {
                try {
                    // signature
                    let signature = validateSign();
                    if (!signature) return false;
                    // signature
                    
                    const requetUrl = `${site_url}job/certificate/${$type}`;
                    const response = await ajaxWithRefresh({
                        type: 'POST',
                        url: requetUrl,
                        data: {message: message, data: JSON.stringify($data_json), task: $task, certificate: $certificate,signature: signature},
                    });
                    if (response.status == false) {
                        return Swal.showValidationMessage(`
                              <strong>Error: </strong>${response.message}
                            `);
                    }
                    return response;
                } catch (error) {
                    var errorMsg = "Something went wrong.please try again...";
                    if ('responseJSON' in error) {
                        errorMsg = $(`<div>${error.responseJSON.message}</div>`).text();
                    }
                    Swal.showValidationMessage(`<strong>Error: </strong> ${errorMsg}`);
                }
            },
            allowOutsideClick: () => Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: `Success!!`,
                    icon: "success",
                    text: result.value.message
                }).then((result) => {
                    location.href = cdn_url + 'job/list';
                });
            }
        });
    });
    $(document).on('click', '.reject-certificate', function () {
        Swal.fire({
            title: "Reject Certificate",
            text: "Please provide a reason for rejecting this certificate.",
            icon: "warning",
            input: "text",
            inputAttributes: {
                autocapitalize: "off",
                placeholder: "Enter reason..."
            },
            showCancelButton: true,
            confirmButtonText: "Yes, reject it!",
            cancelButtonText: "No, cancel",
            showLoaderOnConfirm: true,
            customClass: {
                confirmButton: 'swal2-deny',
            },
            preConfirm: async (message) => {
                try {
                    if ($.trim(message) == '') {
                        return Swal.showValidationMessage(`<strong>Error: </strong> Please enter reason.`);
                    }

                    const requetUrl = `${site_url}job/certificate/reject`;
                    const response = await ajaxWithRefresh({
                        type: 'POST',
                        url: requetUrl,
                        data: {message: message, data: JSON.stringify($data_json), task: $task, certificate: $certificate},
                        beforeSend: function (xhr, settings) {
                            ajs.set_auth_header(xhr, settings);
                        }
                    });
                    if (response.status == false) {
                        return Swal.showValidationMessage(`
                              <strong>Error: </strong>${response.message}
                            `);
                    }
                    return response;
                } catch (error) {
                    var errorMsg = "Something went wrong.please try again...";
                    if ('responseJSON' in error) {
                        errorMsg = $(`<div>${error.responseJSON.message}</div>`).text();
                    }
                    Swal.showValidationMessage(`<strong>Error: </strong> ${errorMsg}`);
                }
            },
            allowOutsideClick: () => Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: `Success!!`,
                    icon: "success",
                    text: result.value.message
                }).then((result) => {
                    location.href = cdn_url + 'job/list';
                });
            }
        });
    });

    function applyDisplayRule(text, displayRule, displayValue) {
        text = text.trim();
        displayValue = displayValue.toString().trim();

        switch (displayRule) {
            case 'first':
                return text.substring(0, parseInt(displayValue)).trim();

            case 'last':
                return text.substring(text.length - parseInt(displayValue)).trim();

            case 'before': {
                const pos = text.indexOf(displayValue);
                return (pos !== -1 ? text.substring(0, pos) : text).trim();
            }

            case 'after': {
                const pos = text.indexOf(displayValue);
                return (pos !== -1 ? text.substring(pos + displayValue.length) : text).trim();
            }

            default:
                return text;
        }
    }

    function createOtherField(Obj, value = '', remove = false) {
        if(remove){
            $(Obj).parents(".fielddatas").find("input").remove();
        }else{
            let otherField = `<input type="text" placeholder="Other" class="form-control otherbox" value="${value}">`;
            if($(Obj).parents(".fielddatas").find("input").length < 1){
                $(Obj).after(otherField);
            }
        }
    }
    $(document).on("change", ".fieldValueBox select", function(){
        let hasOther = $(this).attr("other");
        let Ooptions = $(this).attr("options");
        let ddval = $(this).attr("data-default");
        let otherOptions = JSON.parse(Ooptions);
        if(hasOther != undefined && Ooptions != undefined && hasOther == "1" && otherOptions.length > 0){
            if($.inArray($(this).val(),otherOptions) != -1)
                createOtherField($(this),ddval);
            else
                createOtherField($(this),'', true);                
        }else{
            createOtherField($(this),'', true);
        }
    })

</script>