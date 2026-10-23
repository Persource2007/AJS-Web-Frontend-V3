<div>
    <div class="modal fade" id="saveTemplate" tabindex="-1" role="dialog" aria-hidden="true" data-bs-backdrop="static">
        <div class="modal-dialog modal-md modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="formModalTitle">Save Table Template</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form class="saveTemplate" id="saveCerti" method="post">
                        <div class="mb-3 mt-3">
                            <label for="name" class="form-label">Template Name</label>
                            <input type="text" class="form-control" id="name" name="name" required>
                        </div>
                        <div class="mb-3 mt-3">
                            <button class="btn btn-success" name="save" >Save</button>
                        </div>
                        <input type="hidden" name="save" value="1">
                        <input type="hidden" name="json" id="certi_json">
                        <input type="hidden" name="html" id="certi_html">
                        <input type="hidden" name="template" id="certi_template">
                        <input type="hidden" name="conn_html" id="conn_html" value="">
                        <input type="hidden" name="conn_json" id="conn_json" value="">
                        <input type="hidden" name="validation_rules" id="validation_rules" value="">
                        <input type="hidden" name="formulas" id="formulas" value="">
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Preview Modal Arun -->
<div>
    <div class="modal fade" id="previewModal" tabindex="-1" role="dialog" aria-labelledby="formModalTitle" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="formModalTitle">Preview Template</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body previewHTML">
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Preview Modal Arun -->

<!-- connections Modal Arun -->
<div>
    
    <div class="modal fade" id="makeconnections" tabindex="-1" role="dialog" aria-labelledby="formModalTitle" aria-hidden="true" data-bs-backdrop="static">
        <div class="modal-dialog modal-fullscreen modal-dialog-scrollable m-4" style="height:94vh;width: 97.5vw;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="formModalTitle">Create Connections</h5>
                    <button type="button" class="btn btn-primary addmoreconnection btn-sm ms-1"><i class="ri-add-fill align-bottom"></i> Add New</button>
                </div>
                <div class="modal-body connections">
                    <div class="row">
                        <div class="connectionbox col-lg-12">
                            <table class="table table-bordered- tabled-striped">
                                <tr>
                                    <td style="width:15%;" class="optionfield1">
                                        <label for="select_field1" class="text-muted">Select Parent Field: <span class="text-danger">*</span></label>
                                        <select class="form-control" name="select_field1" id="select_field1">
                                            <option value="">Select Field</option>
                                        </select>
                                    </td>
                                    <td style="width:25%;" class="optionvalue1">
                                        <label for="optionp1" class="text-muted">Add Parent Values: <span class="text-danger">*</span></label>
                                        <input class="form-control optionparent" id="optionp1" data-choices data-choices-removeItem type="text" />
                                    </td>
                                    <td style="width:5%;">
                                        <label class="form-label text-muted"></label>
                                        <input type="text" value="Equal" disabled readonly class="form-control text-center">
                                    </td>
                                    <td style="width:15%;" class="optionfield2">
                                        <label for="select_field2" class="form-label text-muted">Select Child Field:</label>
                                        <select class="form-control" name="select_field2" id="select_field2">
                                            <option value="">Select Child</option>
                                        </select>
                                    </td>
                                    <td style="width:35%;" class="optionvalue2">
                                        <label for="optionc1" class="form-label text-muted">Add Child Values:</label>
                                        <input class="form-control optionchild" id="optionc1" data-choices data-choices-removeItem type="text" />
                                    </td>
                                    <td style="vertical-align: bottom;text-align: center;width: 3%;">
                                        <button class="btn btn-danger removeconnection btn-sm btn-icon waves-effect waves-light"> <i class="ri-subtract-fill align-bottom"></i></button>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-lg-12 text-center dataloadspinner" style="display:none;">
                            <div class="spinner-border text-primary avatar-xs"></div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger resetconnections btn-sm ms-1"><i class=" ri-refresh-line"></i> Reset</button>
                    <button type="button" class="btn btn-primary saveinterconnections">Save</button>
                    <button type="button" class="btn btn-light" data-bs-dismiss="modal" aria-label="Close">Close</button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- connections Modal Arun -->

<button class="btn btn btn-danger position-fixed bottom-0 mb-4 ms-2" style="z-index: 1051;" id="templateStyles" type="button">Custom Template CSS</button>
<style>
div[set-dynamic-options],div[set-dynamic-options] select {background: #6bd378;padding: 2px;border-radius: 5px;}
</style>
<script type="text/javascript">

    let $connectionrow = $('.connectionbox table tr:first').html();
    $(document).on("click",".removeconnection",function(){
        $(this).parents('tr').remove();
    });

    $(document).on("focusout focus",'input[name="search_terms"]',function(){
        $(this).val('');
    });

    $(document).on("change",".connectionbox select[name='select_field2']",function(){
        var ftype = $(this).find(":selected").attr("ftype") ?? "";
        let errmsg = `<span class="error">You can manage this field's options from the Field Edit screen.</span>`;
        var $targetCell = $(this).parents('tr');
        $targetCell.find('.optionvalue2 > label span').remove();
        if ($.inArray(ftype, parentConnectionAttributes) == -1) {
            if(ftype){
                $targetCell.find('.optionvalue2 > label').append(errmsg);
            }
            $targetCell.find('.optionvalue2 > .choices').addClass("is-disabled");
            $targetCell.find('.optionvalue2 input, .optionvalue2 button').prop("disabled", true);
        }else{
            $targetCell.find('.optionvalue2 > .choices').removeClass("is-disabled");
            $targetCell.find('.optionvalue2 input, .optionvalue2 button').prop("disabled", false);
        }
    });

    $(document).on("change","select[name='select_field1']",function(){
        var $targetP = $(this);
        var selectedVal = $targetP.val();
        var tar = $($targetP).parents('tr');
        // tar.find('.optionparent').parents('.choices').remove();
        var matched = 0;
        $(tar).find("select[name='select_field2']").val('');
        $(tar).find("select[name='select_field2'] option").removeAttr('disabled');
        $(tar).find("select[name='select_field2'] option[value='"+selectedVal+"']").attr('disabled','disabled');
        valuesJ = [];
        matched = $("select[name='select_field2']").toArray().some(e => selectedVal !== '' && $(e).val() === selectedVal) ? 1 : 0;
        if(matched == 1){
            $("select[name='select_field2']").each(function(ind,target){
                var matchedVal = $(target).val();
                
                if(selectedVal == matchedVal && selectedVal != ''){
                   matched = 1;
                   var valuesO = $(target).parents('tr').find('.optionchild').val();
                   var parentO = $(target).parents('tr').find('.optionparent').val();
                   if(valuesO != ''){
                        var childOptionsParent = parentO;
                        if (!Array.isArray(parentO)) {
                            childOptionsParent = parentO.split(',');
                        }
                        childOptionsParent.forEach(function(value,ind3){
                            valuesJ.push({value:valuesO,pvalue:value});
                        })
                    }
                }
            });
            var newOptions = [];
            valuesJ.forEach(function(option){
                option.value.split(",").forEach(function(opt){
                    var valfirst = option.pvalue;
                    var newopt = opt+' - ('+valfirst+')';
                    // var valfirst = option.pvalue.split(" -");
                    // var newopt = opt+' - ('+valfirst[0]+')';
                    newOptions.push(newopt);
                })
            })
            valuesJ = newOptions;
            valuesO = valuesJ.join(",");
            if(valuesO != ''){
                valuesO = "<option>"+valuesO.split(',').join('</option><option>')+"</option>";
            }
            var parentoptionsvalue = "<option value='ALL_OPTIONS'>All Options</option>"+valuesO;
            var numIDs = 'select_field2'+(Math.floor((Math.random() * 100000) + 1));
            var parentoptions = '<select class="form-control optionparent" data-choices id="'+numIDs+'" multiple>'+parentoptionsvalue+'</select>';
            
            // var tar = $($targetP).parents('tr');
            tar.find('.optionvalue1').append(parentoptions);
            tar.find('.optionvalue1 .choices').remove();
            dropdown_choices['choice' + numIDs] = new Choices($('#'+numIDs)[0],{
                                                        allowHTML: true,
                                                        removeItemButton: true,
                                                        shouldSort:false,
                                                        duplicateItemsAllowed:true,
                                                        addItemFilter: function (value) { 
                                                            return $.trim(value)
                                                        }
                                                    });
        }
        else
        {
            tar.find('.optionvalue1 .choices').remove();
            var numIDs = 'optionp'+(Math.floor((Math.random() * 100) + 1));
            var parentoptions = '<input class="form-control optionparent" id="'+numIDs+'" data-choices data-choices-removeItem type="text" />';
            tar.find('.optionvalue1').append(parentoptions);
            dropdown_choices['choice' + numIDs] = new Choices($('#'+numIDs)[0],{
                                                        allowHTML: true,
                                                        removeItemButton: true,
                                                        shouldSort:false,
                                                        duplicateItemsAllowed:false,
                                                        addItemFilter: function (value) { 
                                                            return $.trim(value)
                                                        }
                                                    });              
        }

    });

    $(document).on("click",".addmoreconnection",function(){
        $(this).attr("disabled","disabled");
        var added = $('.connectionbox table tbody').append("<tr>"+$connectionrow+"</tr>");
        setdynamicFields();    
        initChoices();
        setTimeout(function(){$('#makeconnections .addmoreconnection').removeAttr("disabled");},1000);
    });

    let dropdown_choices = [];
    function initChoices(){
        var trlen = $('.connectionbox table tbody tr').length;
        var datenow = new Date();
        var time = datenow.getTime();
        var id1 = 'optionp'+trlen+time;
        var id2 = 'optionc'+trlen+time;
        $('.connectionbox tr:last').find('input.optionparent').removeAttr('id').attr('id', id1);
        $('.connectionbox tr:last').find('input.optionchild').removeAttr('id').attr('id', id2);
        dropdown_choices['choice' + id1] = new Choices($('#'+id1)[0],{
                                                    allowHTML: true,
                                                    removeItemButton: true,
                                                    shouldSort:false,
                                                    duplicateItemsAllowed:false,
                                                    addItemFilter: function (value) { 
                                                        return $.trim(value)
                                                    }
                                                }); 
        dropdown_choices['choice' + id2] = new Choices($('#'+id2)[0],{
                                                    allowHTML: true,
                                                    removeItemButton: true,
                                                    shouldSort:false,
                                                    duplicateItemsAllowed:false,
                                                    addItemFilter: function (value) { 
                                                        return $.trim(value)
                                                    }
                                                }); 
    }
    
    let $connection_fields = [];
    $(document).ready(function(){
        // initChoices();
        setTimeout(initDynamicOptionsJSON,500);
    });
    //for edit
    function initDynamicOptionsJSON($set = true){
        $connection_fields = [];
        $('div[set-dynamic-options]').each(function(index,target){
            var $data = $(target).attr('data-field-json');
            var data = JSON.parse($data);
            $connection_fields.push({field_type:data.field_type,label:data.field_label,name:data.name,connection_attribute:data.connection_attribute});
        });
        $connection_fields = $connection_fields.filter((value, index, self) =>
                            index === self.findIndex((t) => (
                                t.connection_attribute === value.connection_attribute
                            ))
                        );
        if($set){
            setdynamicFields();
        }
    }
    //for edit
    const parentConnectionAttributes = ['text', 'select', 'radio'];
    function saveDynamicOptionsJSON(data){  
        var index = $connection_fields.findIndex(item => item.connection_attribute == data.connection_attribute);
        var deletef = 0;
        if(index >= 0 && data.is_dynamic_options == 0){
            $connection_fields.splice(index,1);
            $('.connections table tr td select[name=select_field1]').find('option[value="'+data.connection_attribute+'"]').remove();
            $('.connections table tr td select[name=select_field2]').find('option[value="'+data.connection_attribute+'"]').remove();
            deletef = 1;
        }
        else if(index < 0 && data.is_dynamic_options == 1){
            $connection_fields.push({field_type:data.field_type,label:data.field_label,name:data.name,connection_attribute:data.connection_attribute});
            var option = `<option ftype="${data.field_type}" value="${data.connection_attribute}">${data.connection_attribute}</option>`;
            if ($.inArray(data.field_type, parentConnectionAttributes) >= 0) {
                $('.connections table tr td select[name="select_field1"]').append(option);
            }
            $('.connections table tr td select[name="select_field2"]').append(option);
        }
        if(index >= 0 && deletef == 0){
            $connection_fields[index].label = data.field_label;
        }
        // $('select[name="select_field1"],select[name="select_field2"]').each(function(i,opt){
        //   var option = $(opt).find('option[value="'+data.connection_attribute+'"]').text(data.connection_attribute);
        // })
    }
    function setdynamicFields(){ // call when add new row for connection
        $('.connections table tr:last td select[name=select_field1]').html('');
        $('.connections table tr:last td select[name=select_field2]').html('');
        var dfields1 = '<option value="">Select Field</option>';
        var dfields2 = '<option value="">Select Field</option>';
        $connection_fields.forEach(function(opt){
            if ($.inArray(opt.field_type, parentConnectionAttributes) >= 0) {
                dfields1 += '<option value="'+opt.connection_attribute+'">'+opt.connection_attribute+'</option>';
            }
            dfields2 += `<option ftype="${opt.field_type}" value="${opt.connection_attribute}">${opt.connection_attribute}</option>`;
            $('.connections table tr:last td select[name=select_field1]').html(dfields1);
            $('.connections table tr:last td select[name=select_field2]').html(dfields2);
        });
    }

    $(document).on("click","button.resetconnections, button.makeconnections",function(){
        handleActions(true);
        stopLoading = false;
        setTimeout(setConnectionView,3000);
    });
    
    $(document).on("click","#makeconnections button[data-bs-dismiss='modal']",function(){
        handleActions(false)
        $("button.makeconnections").removeAttr("disabled");
    });

    $(document).on("click","button.makeconnections",function(){
        ajs.submit_button_element = $(this);
        ajs.show_button_loader();
        setTimeout(() => {
            ajs.hide_button_loader();
        },1000);
    })

    let stopLoading = false;
    function handleActions(disable = true){
        stopLoading = true;
        let $target = $('#makeconnections .modal-header, #makeconnections .modal-footer');
        $target.find("button").attr("disabled",disable);
        $target.find("button[data-bs-dismiss='modal']").attr("disabled",false);
        if(disable){
            $("#makeconnections .connections .dataloadspinner").show();
            $('.connectionbox table tbody').html('');
        }else{
            $("#makeconnections .connections .dataloadspinner").hide();
        }
    }

    $(document).on("click",".saveinterconnections",function(){
        $('#makeconnections .modal-header, #makeconnections .modal-footer').find("button").attr("disabled",true);
        ajs.submit_button_element = $(this);
        ajs.show_button_loader();

        let $connectionJSON = [];
        let childOptionsArray = [];
        let incNum = 1000;
        let groupId = 1000;

        // Validation: Check for any empty selects or input fields
        if ($('.connectionbox tr select[name=select_field1], .connectionbox tr .optionparent').filter(function () {
            return !$(this).val();
        }).length) {
            $('#makeconnections .modal-header, #makeconnections .modal-footer').find("button").attr("disabled",false);
            alert('Please fill all required fields.');
            ajs.hide_button_loader();
            return false;
        }
        setTimeout(function(){
            $('.connectionbox tr').each(function(ind,opt){
                
                var parentField = $(opt).find('select[name=select_field1]').val();
                var parentOptions = $(opt).find('.optionparent').val();
                var parentType = $(opt).find('.optionparent').prop('tagName');
                var parentValues = parentOptions;
                if(parentType != "SELECT"){
                    parentValues = parentOptions.split(',');
                }

                if (!parentField) return; //skip if parent not selected

                var parentOptionData = parentValues;
                var groupName = "group_"+groupId;
                    groupId++;

                parentOptionData.forEach(function(optionValue,index){
                    var unq_id = incNum;
                    incNum++;
                    var parentOption    = decodeHtmlEntities(optionValue);
                    var childField      = $(opt).find('select[name=select_field2]').val();
                    var childOptions    = decodeHtmlEntities($(opt).find('.optionchild').val());

                    var childValues = childOptions.split(',');

                    var childOptionData = childValues;

                    if(childField == ''){ childOptionData = []; }

                    var isParentField = "";
                    var isParent = true;
                    if(parentType == "SELECT"){
                        // isParentField = parentOption.match(/\(([^)]+)\)/)?.[1];
                        isParentField = parentOption.match(/\((.*)\)/)?.[1];
                        parentOption = $.trim(parentOption.split(" - (")[0]);
                        isParent = false;
                    }
                    var allChildsOptions = [];
                    childOptionData.forEach(function(optionValue2,index2){
                        var unq_id2 = incNum;
                        allChildsOptions.push({id:unq_id2,name:optionValue2});
                        childOptionsArray.push({
                                                id:unq_id2,
                                                name:optionValue2,
                                                child:childField,
                                                parent:parentField,
                                                parentV:optionValue
                                            });
                        incNum++;
                    })

                    var findParentIndex = $connectionJSON.findIndex(item => item.hasOwnProperty(parentField));
                    var parentIndex = findParentIndex;

                    var checkVal = childOptionsArray.find(item => (item.child == parentField && item.name == parentOption && item.parentV == isParentField));
                    if(checkVal != undefined){
                        unq_id = checkVal.id;
                    }
                    if(parentOption == "ALL_OPTIONS"){
                        unq_id = 0;
                    }

                    let jsonData = {
                        id: unq_id,
                        is_parent: isParent,
                        parentO: isParentField,
                        name: parentOption,
                        dependencies: [{ group: groupName, dependency: childField, options: allChildsOptions }]
                    };

                    if (parentIndex < 0) {
                        let json = { [parentField]: [jsonData] };
                        $connectionJSON.push(json);
                    } else {
                        let parentArray = $connectionJSON[parentIndex][parentField];
                        let findDependencyIndex = parentArray.findIndex(item => (item.name === parentOption && item.parentO == isParentField));
            
                        if (findDependencyIndex < 0) {
                            parentArray.push(jsonData);
                        } else {
                            let dependencyArray = parentArray[findDependencyIndex].dependencies;
                            // Check if the dependency exists
                            let existingDepIndex = dependencyArray.findIndex(item => item.dependency === childField);
                            if (existingDepIndex < 0) {
                                dependencyArray.push({
                                    group: groupName,
                                    dependency: childField,
                                    options: allChildsOptions
                                });
                            }else{
                                let existingOptions = dependencyArray[existingDepIndex].options;
                                dependencyArray[existingDepIndex].group = groupName;
                                groupId++;
                                allChildsOptions.forEach(opt => {
                                    if (!existingOptions.some(e => e.name === opt.name)) {
                                        existingOptions.push(opt);
                                    }
                                });
                            }
                        }
                    }
                })
            })
            
            $('#conn_html').val('');
            // $('#conn_html').val($('.connectionbox').html());
            $('#conn_json').val(JSON.stringify($connectionJSON));
            $connection_data.interconnection_json = JSON.stringify($connectionJSON);
            $('#makeconnections').modal('hide');
            Toastify({
                text: "Connections saved successfully.",
                duration: 5000,
                destination: '',
                gravity: "top", // `top` or `bottom`
                position: "right",
                close: true,
                onClick: function () {
                    ajs.read_nofification(id)
                }
            }).showToast();
            ajs.hide_button_loader();
        },1000)
    });

    let $connection_data = new Array();
    let templateLoad = true;

    function setConnectionView(data) {
        initDynamicOptionsJSON(false);
        dropdown_choices = [];
        let proceed = false;
        if (!data) {
            data = $connection_data;
            proceed = true;
        } else {
            $connection_data = data;
        }

        if (data.interconnection_json && data.interconnection_json !== 'null') {
            $('.connectionbox table tbody').html('');
        }

        $('form#saveCerti #conn_html').val(data.interconnection_html || '');
        $('form#saveCerti #conn_json').val(data.interconnection_json || '');
        if(!proceed){
            return false
        }
        const dsoptions2 = '<option value="">Select Field</option>' +
            $.map($connection_fields, function (opt) {
                return `<option ftype="${opt.field_type}" value="${opt.connection_attribute}">${opt.connection_attribute}</option>`;
            }).join('');
        const dsoptions1 = '<option value="">Select Field</option>' +
                $connection_fields
                    .filter(function (opt) {
                        return $.inArray(opt.field_type, parentConnectionAttributes) >= 0;
                    })
                    .map(function (opt) {
                        return `<option value="${opt.connection_attribute}">${opt.connection_attribute}</option>`;
                    })
                    .join('');

        if (templateLoad && data.interconnection_json && data.interconnection_json !== 'null') {
            const json = JSON.parse(data.interconnection_json);

            const processDependency = function (key, connection, dependency, len) {
                const dfd = $.Deferred();
                if (stopLoading) return dfd.resolve();

                // grouping
                if($(`.${dependency.group}_${dependency.dependency}`).length > 0){
                    id = $(`.${dependency.group}_${dependency.dependency}`).attr('id');
                    var svalue = connection.name;
                    if(!connection.is_parent){
                        var svalue = connection.name+' - ('+connection.parentO+')';
                        if(connection.name == "ALL_OPTIONS"){
                            svalue = connection.name;
                        }
                    }
                    var targetF = dropdown_choices['choice'+id];
                        if(targetF._isTextElement){
                            targetF.setValue([svalue]);
                        }else{
                            var preSelectedVals = targetF.getValue(true);
                            preSelectedVals.push(svalue);
                            targetF.setChoiceByValue(preSelectedVals);
                        }
                    return false
                }
                // grouping
                $('.connectionbox table tbody').append("<tr>"+$connectionrow+"</tr>");
                var $targetCell = $('.connectionbox table tbody tr:last');
                $targetCell.find('select[name=select_field1]').html(dsoptions1); //set parent attributes options
                $targetCell.find('select[name=select_field2]').html(dsoptions2); //set child attributes options
                $targetCell.find('select[name=select_field1]').val(key); //set selected parent attribute

                var datenow = new Date();
                var time = datenow.getTime();
                var id1 = 'optionp'+len+time;
                var id2 = 'optionc'+len+time;
                            
                $targetCell.find('.optionparent').attr('id',id1);                    
                $targetCell.find('.optionchild').attr('id',id2);

                var childOptions = [];
                dependency.options.forEach(function(item){
                    var itemVal = item.name;
                    childOptions.push(itemVal);
                })
                $targetCell.find('.optionparent').val(connection.name);
                $targetCell.find('.optionchild').val(childOptions.join(","));

                if(!connection.is_parent){
                    $targetCell.find('.optionparent').remove();
                    $targetCell.find('select[name=select_field1]').trigger('change');
                    var choice_attr = $targetCell.find('.optionparent').attr('id');

                    var svalue = connection.name+' - ('+connection.parentO+')';
                    if(connection.name == "ALL_OPTIONS"){
                        svalue = connection.name;
                    }
                    dropdown_choices['choice'+choice_attr].setChoiceByValue(svalue);
                }else{
                    dropdown_choices['choice' + id1] = new Choices($('#'+id1)[0],{
                                                                allowHTML: true,
                                                                removeItemButton: true,
                                                                shouldSort:false,
                                                                duplicateItemsAllowed:false,
                                                                addItemFilter: function (value) { 
                                                                    return $.trim(value)
                                                                }
                                                            });       
                }

                $targetCell.find('.optionparent').addClass(dependency.group+"_"+dependency.dependency)
                $targetCell.find('select[name=select_field2]').val(dependency.dependency);
                $targetCell.find('select[name=select_field2] option[value="'+key+'"]').attr('disabled','disabled');
                dropdown_choices['choice' + id2] = new Choices($('#'+id2)[0],{
                                                            allowHTML: true,
                                                            removeItemButton: true,
                                                            shouldSort:false,
                                                            duplicateItemsAllowed:false,
                                                            addItemFilter: function (value) { 
                                                                return $.trim(value)
                                                            }
                                                        });
                $targetCell.find('select[name=select_field2]').trigger("change");
                return dfd.resolve();
            };

            // Create async task functions for each dependency
            const allTasks = $.map(json, function (item, index) {
                const key = Object.keys(item)[0];
                const connections = item[key];

                return $.map(connections, function (connection) {
                    return $.map(connection.dependencies, function (dependency) {
                        return function () {
                            if (stopLoading) return $.Deferred().resolve();
                            return processDependency(key, connection, dependency, index);
                        };
                    });
                });
            });

            // Execute each task sequentially
            (function runTasksSequentially(tasks) {
                if (!tasks.length) {
                    handleActions(false);
                    return;
                }
                const next = tasks.shift();
                $.when(next()).then(function () {
                    runTasksSequentially(tasks);
                });
            })(allTasks);
        }else{
            handleActions(false);return;
        }
        templateLoad = true;
    }
function decodeHtmlEntities(text) {
  return $('<textarea/>').html(text).text();
}
</script>
