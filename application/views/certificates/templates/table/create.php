<!-- Added By Arun -->
<link rel="stylesheet" type="text/css" href="<?= base_url('assets/css/form-builder.css') ?>">
<link rel="stylesheet" href="https://code.jquery.com/ui/1.13.3/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/ui/1.13.3/jquery-ui.js"></script>
<style type="text/css">
    /**[type="checkbox"] ~ div {display: block !important;}*/

    /*.inputOption{display: flex;justify-content: space-between;}*/
    /*input,textarea{
        min-height: 20px !important;
    }*/
    .dynamicTable{
        width: 100%;
        overflow-x: auto;
        overflow-y: auto;
        height: 100%;
        max-height: 62vh;
    }
    .row-sec.sec-table{
        max-width: 90vw;
    }
    .form-input label{
        font-weight: normal !important;
    }
    table{
        margin-bottom: 5px;
    }
    .form-build div {
        margin-bottom: 3px;
    }
    .form-build .sectionTitle.allowduplicate:after {
        content: "Enabled Duplicate";
        position: absolute;
        right: 2rem;
        font-size: 14px;
        color: #ffff;
        background: green;
        padding: 2px 6px;
        border-radius: 2px;
    }
    .setinputwidth {
        display: flex;
        justify-content: space-between;
    }
    .selected_cell {
        border: 2px solid #5ea3cb;
    }
    /*.previewHTML td{padding-top: 0!important;padding-bottom: 0 !important;padding: 0!important;}*/
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        color: inherit;
        margin: 0!important;
    }
    .fTable{
        margin:0!important;
    }
    .sectionStart {
        border: 5px solid;
        padding: 0;
        margin: 0;
        margin-bottom: 5px;
        word-break: break-word;
    }
    .sectionTitle {
        color: #ffffff;
        background: #c00000;
        padding: 0 0 2px;
        margin: 0px;
        text-align: left;
    }
    .form-input {
        margin: 0.5rem 0;
        text-align: left;
        display: flex;
    }
    .form-check .label-text,.label-text {
        width: auto;
        vertical-align: middle;
        display: block;
        margin-bottom: 0;
    }
    .form-check .label-textarea,.label-textarea {
        width: auto;
        vertical-align: top;
        display: block;
        margin-bottom: 0;
    }
    .form-input {
        margin: 0;
    }

    .input {
        width: 100%;
        margin-left: 0.5rem;
        padding: 0.5rem 0.9rem;
        color: #000;
        font-weight: inherit;
        line-height: 1.5;
        appearance: none;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ccc;
        border-radius: 0.25rem;
        display: block;
    }
    label {
        font-weight: inherit;
    }
    .select {
        width: 100%;
        padding: 0.5rem 0.9rem;
        color: #000;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        display: block;
    }
    .p-1 {
        padding: 10px;
    }
    .p-2 {
        padding: 10px;
    }
    .table > :not(caption) > * > * {
        padding: 0.2rem 0.2rem;
    }
    .connectionbox .table > :not(caption) > * > * {
        padding: 0.8rem 0.2rem;
    }
    .table .form-check .form-check-input {
        margin-right: 5px;
    }

    table {
        border: none;
        width: 100%;
    }
    div.addchilebtn {
        margin-top: 5px;
    }
    table {
        border-collapse: collapse !important;
    }
    table td {
        vertical-align: top;
        border-collapse: collapse;
        padding: 2px;
        border-bottom: 0;
    }
    .table-bordered tr td {
        border: 1px solid #ccc;
    }
    /*.form-build .main-section tr{background: #808080a6;}*/
    td div.actions {
        position: absolute;
        top: 4px;
        right: 4px;
        border: none;
    }
    td div.actions:hover {
        border: none !important;
    }
    .child-sec {
        position: relative;
    }
    .drop-active {
        box-shadow: inset 0px 0px 5px 1px #fbff01 !important;
        border: 1px sold #fbff01 !important;
    }
    .form-build .inputOption,
    .form-build .fTitle,
    .form-build .fHeading,
    .form-build .fDescription,
    .form-build .fTable,
    .form-build div,
    .form-build .dbFields {
        outline: 1.5px dashed transparent !important;
    }
    .form-build .inputOption:hover,
    .form-build .fTitle:hover,
    .form-build .fHeading:hover,
    .form-build .fDescription:hover,
    .form-build .fTable:hover,
    .form-build div:hover,
    .form-build .dbFields:hover {
        outline: 1.5px dashed #000000 !important;
    }
    .fa.fa-plus.removeOption::before {
        content: "x";
    }
    .fa.fa-plus {
        padding: .4rem .8rem;
        background: #6d6d6d;
        margin-right: 10px;
        color: #fff;
        font-weight: 600;
        font-size: 0.82rem;
        cursor: pointer;
        line-height: 1.6;
        border-radius: 4px;
        height: 33px;
    }
    .fa.fa-plus.removeOption {
        padding: 4px 10px;
    }
    .fa.fa-plus.removeOption:hover {
        background: #d20000;
        cursor: pointer;
    }
    .fa.icon-plus {
        padding: .3rem .4rem;
        background: #198754;
        margin-right: 8px;
        color: #fff;
        font-weight: 600;
        font-size: 0.82rem;
        cursor: pointer;
        line-height: 24px;
        border-radius: 4px;
        height: 33px;
        width: 33px;
        min-width: 33px;
        text-align: center;
        display:inline-block;
    }
    .fa.icon-plus.removeOption { 
        background: #ED000C; 
    }
</style>
<!-- Added By Arun -->
<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->

<!-- <div id="wrapper"> -->
<div class="main-content" id="wrapper">
    <!-- Sidebar -->
    <?php require_once __DIR__ . '/inc/form-elements.php'; ?>
    <!-- /#sidebar-wrapper -->
    <div id="page-content-wrapper">
        <div class="page-content">
            <!-- form elements button -->
            <?php require_once __DIR__ . '/inc/form-elements-button.php'; ?>
            <!-- form elements button -->
            <div class="container-fluid" style="margin-top: 30px;">

                <!-- starting point  -->
                <div class="row">
                    <div class="col-xxl-12">
                        <div class="same-page-height tables-template-same-page-height">
                            <div class="card">
                                <div class="card-header align-items-center d-flex form-header-fix">
                                    <h4 class="card-title mb-0 flex-grow-1">New Table Template</h4>
                                    
                                    <!-- <button type="button" data-bs-toggle="modal" data-bs-target="#formulasmodal" class="btn btn-secondary ms-2 setformulas"><i class=" ri-link-unlink-m align-bottom"></i> Formulas</button> -->
                                    <button type="button" data-bs-toggle="modal" data-bs-target="#makeconnections" class="btn btn-secondary ms-2 makeconnections"><i class=" ri-link-unlink-m align-bottom"></i> Connections</button>
                                    <form method="post" action="<?=app_url("certificate/template/preview?".time()); ?>" id="preview-form" target="_blank">
                                        <input type="hidden" name="header" id="header"/>
                                        <input type="hidden" name="footer" id="footer"/>
                                        <input type="hidden" name="preview" id="preview"/>
                                        <button type="button" class="btn btn-primary previewPDF ms-2"><i class=" ri-eye-fill align-bottom"></i> Preview</button>
                                    </form>
                                    <button type="button" class="btn btn-success saveTemplate float-end ms-2"><i class="ri-save-3-fill align-bottom"></i> Save</button>
                                </div><!-- end card header -->
                                
                                <div class="card-body form-build moveRowIconLeftFixed">
                                    <table cellspacing="0" style="overflow:wrap;width:100%;border-width: 0px; border-style: solid; border-color: #000" class="sectionStart" >
                                        <tr>
                                            <td class="row-sec sec-table">
                                                <?php $uid = date('dm').time().date('Y'); ?>
                                                <div data-section-id="0" data-field-uid="<?php echo $uid; ?>" type="table" class="dynamicTable dtable_<?php echo $uid; ?>" data-field-json='{"field_type":"table","name":"table_<?php echo $uid; ?>","columns":2,"rows":1,"allow_duplicate_row":0,"options":[],"font_size":13,"show_border":0,"field_width":100,"allow_multi_dropdown":0,"allow_multi_file":0,"show_opt_val":1,"allow_file_types":[],"table_rows":{},"auto_fill":[],"allow_gallery":0,"sort_order":0,"field_label":"Table Rows"}'>
                                                    <table cellspacing="0" style="width:100%;" cellpadding="10" class="table-bordered mb-0" data-color="#000000" data-bcolor="#ffffff" data-label="Table Rows">
                                                        <tbody>
                                                            <tr>
                                                                <td style="width:50%" class="resizable droppable"><h2 class="text-center">+</h2></td>
                                                                <td style="width:50%" class="resizable droppable"><h2 class="text-center">+</h2></td>
                                                                <td style='min-width:100px;max-width:100px;'>
                                                                    <div class='actionstr d-flex justify-content-center'>
                                                                        <span class='copy-sec btn btn-sm btn-info btn-icon waves-effect waves-light m-1'> <i class='ri-file-copy-fill'></i> </span>
                                                                        <span class='remove btn btn-sm btn-danger btn-icon waves-effect waves-light m-1'> <i class='ri-delete-bin-5-line'></i> </span>
                                                                        <span class='moveRowIcon btn btn-sm btn-dark btn-icon waves-effect waves-light'><i class='fa fa-arrows'></i></span>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>                                            
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="addchilebtn">
                                                    <button class="btn btn-sm btn-secondary addheadrow float-end"><i class="ri-add-fill align-bottom"></i> Add Header Row</button>
                                                    <button class="btn btn-sm btn-secondary addchilerow float-end me-2"><i class="ri-add-fill align-bottom"></i> Add Data Row</button>
                                                    <button class="btn btn-sm btn-secondary addchilecolumn float-end me-2"><i class="ri-add-fill align-bottom"></i> Add New Column</button>
                                                    <button onclick="mergeSelectedCells()" class="btn btn-sm btn-success float-end mergecellsbtn me-2" type="button" style="display: none;">Merge&nbsp;Cells</button>
                                                    <button onclick="seperateCells()" class="btn btn-sm btn-success float-end unmergecellsbtn me-2" type="button" style="display: none;">Seperate&nbsp;Cells</button>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div><!-- end card-body -->

                            </div><!-- end card -->
                        </div>
                    </div>
                </div>
                <!--end row-->








            </div>
            <!-- container-fluid -->
        </div>
    </div>
    <!-- End Page-content -->


</div>
<!-- end main content-->
<!-- </div> -->
<!-- Save/Preview Certificate Modal Arun -->
<?php 
require_once __DIR__ . '/inc/save-template-modal.php'; 
// require_once APPPATH.'views/modals/certificate_template_formulas.php';
?>
<!-- Save/Preview Certificate Modal Arun -->


<!-- Form Field Setting Arun -->
<?php require_once __DIR__ . '/inc/form-styles.php'; ?>
<!-- Form Field Setting Arun -->
<?php
if (isset($duplicate_id))
{
    ?>
    <script>
        const duplicate_id = ajs.hash_decode("<?php echo $duplicate_id; ?>");
        const getTemplateData = "<?=app_url('template/tables/get/')?>"+duplicate_id;
    </script>
<?php } ?>

<!-- JAVASCRIPT -->
<script type="text/javascript" src="<?= base_url('assets/js/certificates/table_builder.js') ?>"></script>
<script>
        dragdrop();
        const backURL = "<?= base_url('template/tables/list'); ?>";
        const saveTableTemplate = "<?= app_url('template/tables/create') ?>";
        const getTemplatesURL = "<?= app_url('table/template/all') ?>";
</script>
<script>
    $(document).ready(function () {
        var trigger = $('.hamburger'),
                overlay = $('.overlay'),
                isClosed = false;

        trigger.click(function () {
            hamburger_cross();
        });

        function hamburger_cross() {

            if (isClosed == true) {
                overlay.hide();
                trigger.removeClass('is-open');
                trigger.addClass('is-closed');
                isClosed = false;
            } else {
                overlay.show();
                trigger.removeClass('is-closed');
                trigger.addClass('is-open');
                isClosed = true;
            }
        }

        $('[data-toggle="offcanvas"]').click(function () {
            $('#wrapper').toggleClass('toggled');
        });

        setTimeout(function () {
            $('#vertical-hover').click();
        }, 500);

    });
</script>

<script>
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.form-header-fix').addClass('scroll-top-add');
        } else {
            $('.form-header-fix').removeClass('scroll-top-add');
        }
    });
    function getUnqFieldId(){
        var datenow = new Date();
        var month = datenow.getMonth();
        var day = datenow.getDate();
        var year = datenow.getFullYear();
        var time = datenow.getTime();
        var unq = day + '' + month + '' + time + '' + year;
        return unq;
    }

    $(document).on("click",".addheadrow",function(){
        var $target = $('.dynamicTable');
        if($target.find("table thead").length <= 0){
            $target.find("table").prepend('<thead></thead>');
            var append_row = $target.find("tbody tr:first").clone();
                append_row = append_row.find('.actionstr').parent().remove();
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Header Row Limit Reached!!!',
                text: 'Only one header row is allowed, and a header row has already been added.'
            })
            return;
            var append_row = $target.find("thead tr:last").clone();
        }
        
        $(append_row).find('td').each(function(index,html){
            var $target_col = $(html);
            if($target_col.children().is('div.actionstr')){
                // $target_col.html('');
            }else{
                $target_col.html('<h2 class="text-center">+</h2>');                
            }
        })
        $target.find('thead').append(append_row);
        dragdrop();
    });

    $(document).on("click",".addchilerow",function(){
        var $target = $('.dynamicTable');
        var append_row = $target.find("tbody  tr:last").clone();
        $(append_row).find('td').each(function(index,html){
            var $target_col = $(html);
            if(!$target_col.children().is('div.actionstr')){
                $target_col.html('<h2 class="text-center">+</h2>');
            }
        })
        if($target.find("tbody td").hasClass("break-table-here")){
            rowslen = $target.find("tbody td.break-table-here").attr("rowspan");
            newlen = parseInt(rowslen)+1;
            $target.find("tbody td.break-table-here").attr("rowspan",newlen);
        }
        $target.find('tbody').append(append_row);
        dragdrop();
    })

    $(document).on("click",".addchilecolumn",function(){
        var $target = $('.dynamicTable');
        var csstd = $target.find('tbody tr td').attr('style');
        
        $target.find('tr').each(function () {
            // $(this).append('<td style="'+csstd+'%" class="resizable droppable" ><h2 class="text-center">+</h2></td>');
            $(this).children().eq(-2).after('<td style="'+csstd+'%" class="resizable droppable" ><h2 class="text-center">+</h2></td>');
            $(this).children().eq(-2).css("width","100px").css("min-width","100px");
        })
        // setTableColumnsWidth($('.dynamicTable tr td:first'),'A');
        dragdrop();
    })

    function setTableColumnsWidth(obj,type){
        var cols = $(obj).closest('tr').find('td');
        var colNo = cols.length-1;
        if(type == 'R'){colNo -= 1;}
        var wdth = 100/colNo;
        cols.closest('table').find('tr td').each((e,tar)=>{
            if(!$(tar).children().is('div.actionstr') && !$(tar).is('.break-table-here')){
                $(tar).css('width',wdth+'%');
            }
        });
    }
</script>
