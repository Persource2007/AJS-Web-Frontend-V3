<!-- Added By Arun -->
<link rel="stylesheet" type="text/css" href="<?=base_url('assets/css/form-builder.css')?>">
<link rel="stylesheet" href="https://code.jquery.com/ui/1.13.3/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/ui/1.13.3/jquery-ui.js"></script>
<style type="text/css">
    /**[type="checkbox"] ~ div {display: block !important;}*/

    /*.inputOption{display: flex;justify-content: space-between;}*/
/*    input,textarea{min-height: 20px !important;}*/
    .form-input label{font-weight: normal !important;}
    table{margin-bottom: 5px;}
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
    .fTable{margin:0!important;}
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
    /*.table-bordered tr td {
        border: 1px solid #ccc;
    }*/
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
        <?php require_once __DIR__ . '/inc/form-elements.php';?>
        <!-- /#sidebar-wrapper -->
        <div id="page-content-wrapper">
            <div class="page-content">
                <!-- form elements button -->
                <?php require_once __DIR__ . '/inc/form-elements-button.php';?>
                <!-- form elements button -->
                <div class="container-fluid" style="margin-top: 30px;">

                    <!-- starting point  -->
                    <div class="row">
                        <div class="col-xxl-12">
                            <div class="same-page-height tables-template-same-page-height">
                                <div class="card">
                                    <div class="card-header align-items-center d-flex form-header-fix">
                                        <h4 class="card-title mb-0 flex-grow-1">Edit Certificate Template > <span class="certificateTemplateName">Loading...</span></h4>
                                        <form class="mb-ms-2 d-flex mb-lg-0" style="width: 30%;">
                                            <!-- <select class="form-select certificateBox" aria-label="Select header">
                                                <option selected value=''>Select Certificate</option>
                                            </select> -->
                                            <!-- <div class="mergeBtnBox">
                                                <button onclick="mergeSelectedCells()" class="btn btn-success mergecellsbtn" type="button">Merge&nbsp;Cells</button>
                                            </div> -->
                                            <select class="form-select ms-2 headersBox" aria-label="Select header">
                                                <option selected>Select Header</option>
                                            </select>

                                            <select class="form-select ms-2 footersBox" aria-label="Select footer">
                                                <option selected>Select Footer</option>
                                            </select>
                                        </form>
                                        <!-- <button type="button" data-bs-toggle="modal" data-bs-target="#formulasmodal" class="btn btn-secondary ms-2 setformulas"><i class=" ri-link-unlink-m align-bottom"></i> Formulas</button> -->
                                        <button type="button" data-bs-toggle="modal" data-bs-target="#makeconnections" class="btn btn-secondary ms-2 makeconnections"><i class=" ri-link-unlink-m align-bottom"></i> Connections</button>
                                        <form method="post" action="<?=app_url("certificate/template/preview?".time()); ?>" id="preview-form" target="_blank">
                                            <input type="hidden" name="header" id="header"/>
                                            <input type="hidden" name="footer" id="footer"/>
                                            <input type="hidden" name="preview" id="preview"/>
                                            <button type="button" class="btn btn-primary previewPDF ms-2"><i class=" ri-eye-fill align-bottom"></i> Preview</button>
                                        </form>
                                        <button type="button" class="btn btn-success saveTemplate float-end ms-2" style="display:none;"><i class="ri-save-3-fill align-bottom"></i> Update</button>
                                        <button type="button" class="btn btn-success publishTemplate float-end ms-2" style="display:none;"><i class="ri-share-circle-fill align-bottom"></i> Publish</button>
                                    </div><!-- end card header -->
                                    <div id="headerPreview" class="card-body"></div>
                                    <div class="card-body form-build">
                                        <h4 class="text-center">Loading...</h4>
                                    </div><!-- end card-body -->
                                    <div id="footerPreview" class="card-body">
                                        <table cellspacing="10" style="overflow:wrap;width:100%;" class="table table-bordered">
                                            <thead class="bg-dark text-white">
                                                <tr>
                                                    <th colspan="3" class="text-white">Footer Texts Manage:</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style="padding:8px;">
                                                        <div>
                                                            <label for="footerLeft" class="form-label text-dark">Footer Left Text:</label>
                                                            <input type="text" name="footer-left" id="footerLeft" class="form-control" maxlength="150" placeholder="Footer Left Text...">
                                                        </div>
                                                    </td>
                                                    <td style="padding:8px;">
                                                    <div>
                                                            <label for="footerCenter" class="form-label text-dark">Footer Center Text:</label>
                                                            <input type="text" name="footer-center" id="footerCenter" class="form-control" maxlength="150" placeholder="Footer Center Text...">
                                                        </div>
                                                    </td>
                                                        <td style="padding:8px;">
                                                        <div>
                                                            <label for="footerRight" class="form-label text-dark">Footer Right Text:</label>
                                                            <input type="text" name="footer-right" id="footerRight" class="form-control" maxlength="150" placeholder="Footer Right Text...">
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot class="bg-info">
                                                <tr>
                                                    <td colspan="3">Placeholders → Use <b>[page]</b> → Prints the current page number, <b>[toPage]</b> → Prints the total number of pages.</td>
                                                </tr>
                                            </tfoot>                                           
                                        </table>
                                    </div>

                                    <div class="modal-footer justify-content-start m-2">
                                        <button class="btn btn-success addNewSection float-end" style="font-size: 1em"><i class="ri-add-fill align-bottom"></i> Add New Section</button>
                                    </div>
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
<?php require_once __DIR__ . '/inc/form-styles.php';?>
<!-- Form Field Setting Arun -->

<!-- JAVASCRIPT -->
<script type="text/javascript" src="<?=base_url('assets/js/certificates/builder.js')?>"></script>
<script>
                            const editId = ajs.hash_decode("<?=$id?>");
                            let templateN = "";
                            let templateV = "";
                            const backURL = "<?=base_url('templates/list');?>";
                            const getTemplateData = "<?=app_url('template/get/')?>"+editId;
                            const savePdfTemplate = "<?=app_url('certificate/template/edit')?>";
                            // const getCertificatesURL = "<?=app_url('certificate/get_all')?>";
                            const getHeadersURL = "<?=app_url('template/headers')?>";
                            const getFootersURL = "<?=app_url('template/footers')?>";
                            const getTemplatesURL = "<?= app_url('table/template/all') ?>";
                            getHeaders();
                            getFooters();
                            // getCertificates();
                            editTemplate();
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
</script>
