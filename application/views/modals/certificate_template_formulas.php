<div>
    <div class="modal fade" id="formulasmodal" tabindex="-1" role="dialog" aria-labelledby="formModalTitle" aria-hidden="true" data-bs-backdrop="static">
        <div class="modal-dialog modal-xl modal-dialog-scrollable h-75">
            <div class="modal-content h-100">
                <div class="modal-header">
                    <h5 class="modal-title" id="formModalTitle">Set Formulas</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body formulas">
                    <div class="row">
                        <!-- <div class="col-lg-12 mb-2 text-end">
                            <button type="button" class="btn btn-primary addmoreconnection btn-sm"><i class="ri-add-circle-line"></i> Add New</button>
                        </div> -->
                        <div class="formulasbox col-lg-12">
                            <table class="table table-bordered tabled-striped">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Title</th>
                                        <th class="applyon_td">Apply On</th>
                                        <th>Formulas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="text-center" colspan="3">No Data Found...</td>
                                    </tr>
                                </tbody>
                                
                            </table>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary saveformulas">Save</button>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    // Get Certificate Formulas Start
    const getCertiFormulas = "<?=app_url('certificate/template/formulas');?>";
    // $(document).on("click",".setformulas",function(){
    //     // var $option = "<option value=''>Select Field</option>";
    //     // $('.form-build').find('.inputOption select,.inputOption input[type="text"],.inputOption [type="number"]').each(function(index,field){
    //     //     var $data = $(field).parent().attr('data-field-json');
    //     //     var data = JSON.parse($data);
    //     //     $option += "<option value='"+data.name+"'>"+data.field_label+" ("+data.name+")</option>";
    //     // })
    //     // $('#formulasmodal td.applyon_td select').html($option).addClass('form-control');
    //     // $('#formulasmodal td.applyon_td select').each(function(ind,sel){
    //     //     var val = $(sel).data('val');
    //     //     $(sel).val(val);
    //     // })
    // })
    function getCertificateFormulas(){
        $('.formulasbox tbody').html('');
        $('.setformulas').attr("disabled","disabled");
        $.ajax({
            type: 'GET',
            url: getCertiFormulas, // Replace with your server-side script URL
            beforeSend: function (xhr, settings) {
                    ajs.set_auth_header(xhr, settings);
                },
            success: function (response) {
                var res = response.data;
                if(response.status){
                    var fhtml = '';
                    res.forEach(function(item,ind){
                        fhtml += `<tr><td><input type="checkbox" name="" class="form-check-input code-switcher" value="${item.id}"></td><td class='title'>${item.title}</td><td class="applyon_td">${item.apply_on}</td><td class='formula'>${item.formula}</td></tr>`;
                    })
                    $('.formulasbox tbody').html(fhtml);
                }
                $('.setformulas').removeAttr('disabled');
            },
            error: function (xhr, status, error) {
                var status_code = xhr.status;
                if (status_code == 401) {
                    refreshToken().then(function () {
                        getCertificateFormulas();
                    });
            
                    return; // Stop further execution
                }
                // Handle error
                var error_response = JSON.parse(xhr.responseText);
                $('.setformulas').removeAttr('disabled');
                Swal.fire({
                    icon: 'error',
                    title: 'Error!!!',
                    text: error_response.message
                })
                console.error(xhr.responseText);
            }
        });
    }
    getCertificateFormulas();
    $(document).on("click",".saveformulas",function(){
        var $formulaJSON = [];
        $('.formulas tr input[type=checkbox]:checked').each(function(ind,opt){
            var id = $(opt).val();
            var title = $(opt).parents('tr').find('.title').text();
            var formula = $(opt).parents('tr').find('.formula').text();
            var apply_to = $(opt).parents('tr').find('.applyon_td select').val();
            $formulaJSON.push({id:parseInt(id)});
        });
        $('#saveCerti #formulas').val(JSON.stringify($formulaJSON));
        $('#formulasmodal').modal('hide');
    })

    $(document).on("change",".formulas tr input[type=checkbox]",function(){
        var $formulaJSON = [];
        $('.formulas tr input[type=checkbox]:checked').each(function(ind,opt){
            var id = $(opt).val();
            var title = $(opt).parents('tr').find('.title').text();
            var formula = $(opt).parents('tr').find('.formula').text();
            var apply_to = $(opt).parents('tr').find('.applyon_td').text();
            // $formulaJSON.push({id:parseInt(id),title:title,formula:formula,apply_on:apply_to});
            $formulaJSON.push({id:parseInt(id)});
        });
        $('#saveCerti #formulas').val(JSON.stringify($formulaJSON));
        // $('#formulasmodal').modal('hide');
        // if($(this).is(":checked")){
        //     $(this).parents('tr').find('.applyon_td select').removeAttr('disabled');
        // }else{
        //     $(this).parents('tr').find('.applyon_td select').attr('disabled','disabled').val('');
        // }
    })

    function setFormulaView(data){
        function load(){
            json.forEach(function(item,ind){
                $('.formulas tr input[type=checkbox][value="'+item.id+'"]').prop('checked', true);
                // $('.formulas tr input[type=checkbox][value="'+item.id+'"]').parents('tr').find('.applyon_td select').attr("data-val",item.apply_on).removeAttr('disabled');
            });
            $('#saveCerti #formulas').val(JSON.stringify(json));
        }
        if(data.formulas != null && data.formulas != '' && data.formulas != 'null'){
            var json = JSON.parse(data.formulas);
            setTimeout(load,200);
        }
    }
    // Get Certificate Formulas End
</script>