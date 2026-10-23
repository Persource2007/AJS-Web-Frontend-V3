<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>PDF</title>
        <style>
            body{
                width:60% !important;
                font-size:10px;
            }
            *{
                font-family: sans-serif;
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
            .form-check .label-text {
                width: auto;
                vertical-align: middle;
                display: block;
                margin-bottom: 0;
            }
            .form-check .label-textarea {
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
            // table {
            //     border-collapse: collapse !important;
            // }
            table td {
                vertical-align: top;
                border-collapse: collapse;
                padding: 2px;
                border-bottom: 0;
            }
            .table-bordered tr td {
                border: 1px solid #ccc !important;
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
            .form-build .inputOption:hover,
            .form-build .fTitle:hover,
            .form-build .fHeading:hover,
            .form-build .fDescription:hover,
            .form-build .fTable:hover,
            .form-build div:hover,
            .form-build .dbFields:hover {
                border: 1.5px dashed transparent !important;
            }
            .form-build .inputOption:hover,
            .form-build .fTitle:hover,
            .form-build .fHeading:hover,
            .form-build .fDescription:hover,
            .form-build .fTable:hover,
            .form-build div:hover,
            .form-build .dbFields:hover {
                border: 1.5px dashed #000000 !important;
            }
            .fa.fa-plus.removeOption::before {
                content: "x";
            }
            .fa.fa-plus {
                padding: 15px;
                background: #6d6d6d;
                margin-right: 10px;
                border-radius: 20px;
                color: #fff;
                font-weight: bold;
            }
            .fa.fa-plus.removeOption {
                padding: 4px 10px;
            }
            .fa.fa-plus.removeOption:hover {
                background: #d20000;
                cursor: pointer;
            }
            .fa.icon-plus {
                padding: 3px 10px;
                background: #5ea3cb;
                margin-right: 10px;
                color: #fff;
                font-weight: 600;
                font-size: 15px;
                cursor: pointer;
                cursor: pointer;
            }
        </style>
    </head>
    <body class="pdf-body" id="content">
        <table width="100%" style="border: 5px solid #c00000;font-family: sans-serif;overflow: wrap;">
            <tbody>
                <tr>
                    <td><img src="https://bucketnetlink.s3.ap-south-1.amazonaws.com/2024/templates/1713265197logo.png" width="100px"></td>
                    <td align="right">
                        <h3 style="color:#c00000;margin:2px;font-weight: 900;font-size: 18.5px;">DOMESTIC ELECTRICAL INSTALLATION CERTIFICATE</h3>
                        <p style="font-size:14px;margin:2px;">Issued in accordance with BS 7671: 2018+A2:2022 – Requirements for Electrical Installations</p>
                        <h5 style="color:black;margin:6px 2px 0px 2px;font-size: 14px;font-weight: 900;">Serial: {{SERIAL_NUMBER}} Property Id: {{PROPERTY_ID}}</h5>
                    </td>
                </tr>
            </tbody>
        </table>
        <table cellspacing="0" style="width:100%;border-width: 5px; border-style: solid; border-color: #c00000;overflow: wrap;" class="sectionStart">
            <tbody>
                <tr>
                    <td style="padding:0;" data-color="#ffffff" data-bcolor="#c00000" class="sectionTitle"> PART 1 : Click To Edit This Text... </td>
                </tr>
                <tr>
                    <td class="row-sec">
                        <table  cellspacing="0" style="width:100%;overflow: wrap;" cellpadding="10" class="p-2 bg-white main-section table mb-0">
                            <tbody>
                                <tr>
                                    <td style="width: 33.3333%;border: 1px solid grey;" class="">
                                        <div data-section-id="0" data-field-uid="17317133348536782024" style="font-size: 10px; font-weight: 400; color: rgb(0, 0, 0);justify-content: space-between;display:flex;" class="inputOption form-input bg-gray email_17317133348536782024 setinputwidth">
                                            <label style="float:left; width:35%" class="label-text" for="">Email</label>
                                            <span style="float:left; width:65%" style="border: 1px solid #000;">[[email_17317133348536782024]]</span>
                                        </div>
                                    </td>
                                    <td style="width: 33.3333%;border: 1px solid grey;" class="">
                                        <div data-section-id="0" data-field-uid="17317133348752912024" style="font-size:10px;" class="inputOption form-input bg-gray phone_17317133348752912024">
                                            <label style="float:left; width:35%;height:auto;" class="label-text" for="">Phone Number</label>
                                            <span style="float:left; width:65%";height:auto; >[[phone_17317133348752912024]]</span>
                                        </div>
                                    </td>
                                    <td style="width: 33.3333%;border: 1px solid grey;">
                                        <div data-section-id="0" data-field-uid="17317133348792162024" style="font-size:10px;" class="inputOption form-input bg-gray number_17317133348792162024">
                                            <label style="float:left; width:35%" class="label-text" for="">Number</label>
                                            <span style="float:left; width:65%" >[[number_17317133348792162024]]</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table  cellspacing="0" style="width:100%;overflow: wrap;" cellpadding="10" class="p-2 bg-white main-section table text-center mb-0">
                            <tbody>
                                <tr>
                                    <td style="width: 33.3333%;" class="resizable child-sec droppable correct">
                                        <div data-section-id="0" data-field-uid="17317133348852462024" style="font-size:10px;" class="inputOption form-input bg-gray textarea_17317133348852462024">
                                            <label style="float:left; width:35%" class="label-textarea" for="">Paragraph&nbsp;Text</label>
                                            <span style="float:left; width:65%" >[[textarea_17317133348852462024]]</span></div>
                                    </td>
                                    <td style="width: 33.3333%;">
                                        <div style="width: 100%;">
                                            <label style="float:left; width:35%">Radio&nbsp;Button</label>
                                            <span style="float:left; width:65%">[[radio_17317133348872972024]]</span>
                                        </div>
                                    </td>
                                    <td class="" style="width: 33.3333%">
                                        <div data-section-id="0" data-field-uid="17317133348892702024" style="font-size:10px;" class="inputOption form-check bg-gray checkbox_17317133348892702024">
                                            <label style="float:left; width:35%" class="label-textarea" for="">Checkbox</label><span style="float:left; width:65%" >[[checkbox_17317133348892702024]]</span></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table  cellspacing="0" style="width:100%;overflow: wrap;" cellpadding="10" class="p-2 bg-white main-section table text-center mb-0">
                            <tbody>
                                <tr>
                                    <td style="width: 33.3333%;" class="resizable child-sec droppable correct">
                                        <div data-section-id="0" data-field-uid="17317133348912272024" style="font-size:10px;" class="inputOption form-input bg-gray select_17317133348912272024">
                                            <label style="float:left; width:35%" class="label-textarea" for="">Dropdown</label><span style="float:left; width:65%" >[[select_17317133348912272024]]</span></div>
                                    </td>
                                    <td style="width: 33.3333%;" class="resizable child-sec droppable correct">
                                        <div data-section-id="0" data-field-uid="17317133348927122024" style="font-size:10px;" class="inputOption form-input bg-gray file_17317133348927122024">
                                            <label style="float:left; width:35%" class="label-text" for="">File&nbsp;Upload</label><span style="float:left; width:65%" >[[file_17317133348927122024]]</span></div>
                                    </td>
                                    <td class="resizable child-sec droppable correct" style="width: 33.3333%;">
                                        <div data-section-id="0" data-field-uid="17317133348947872024" style="font-size:10px;" class="inputOption form-input bg-gray filecaption_17317133348947872024">
                                            <label style="float:left; width:35%" class="label-text" for="">File&nbsp;Upload&nbsp;With&nbsp;Caption</label><span style="float:left; width:65%" >[[filetext_17317133348947872024]] [[filecaption_17317133348947872024]]</span></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table  cellspacing="0" style="width:100%;overflow: wrap;" cellpadding="10" class="p-2 bg-white main-section table text-center mb-0">
                            <tbody>
                                <tr>
                                    <td style="width: 33.3333%;" class="resizable child-sec droppable correct">
                                        <div data-section-id="0" data-field-uid="17317133348970642024" style="font-size:10px;" class="inputOption form-input bg-gray date_17317133348970642024">
                                            <label style="float:left; width:35%" class="label-text" for="">Date</label><span style="float:left; width:65%" >[[date_17317133348970642024]]</span></div>
                                    </td>
                                    <td style="width: 33.3333%;" class="resizable child-sec droppable correct">
                                        <div data-section-id="0" data-field-uid="17317133348986612024" style="font-size:10px;" class="inputOption form-input bg-gray time_17317133348986612024">
                                            <label style="float:left; width:35%" class="label-text" for="">Time</label><span style="float:left; width:65%" >[[time_17317133348986612024]]</span></div>
                                    </td>
                                    <td class="resizable child-sec droppable correct" style="width: 33.3333%;">
                                        <div data-section-id="0" data-field-uid="17317133349033922024" style="font-size:10px;" class="inputOption form-input bg-gray datetime_17317133349033922024">
                                            <label style="float:left; width:35%" class="label-text" for="">Date Time</label><span style="float:left; width:65%" >[[datetime_17317133349033922024]]</span></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table  cellspacing="0" style="width:100%;overflow: wrap;" cellpadding="10" class="p-2 bg-white main-section table text-center mb-0">
                            <tbody>
                                <tr>
                                    <td style="width: 33.3333%;" class="resizable child-sec droppable"></td>
                                    <td style="width: 33.3333%;" class="resizable child-sec droppable"></td>
                                    <td class="resizable child-sec droppable" style="width: 33.3333%;"></td>
                                </tr>
                            </tbody>
                        </table>
                        <table  cellspacing="0" style="width:100%;overflow: wrap;" cellpadding="10" class="p-2 bg-white main-section table text-center mb-0">
                            <tbody>
                                <tr>
                                    <td style="width: 33.3333%;" class="resizable child-sec droppable correct">
                                        <h6 data-section-id="0" data-field-uid="17317133349133382024" class="dbFields dbfield_17317133349133382024 dbFieldJSON" data-color="#000000" style="color: rgb(0, 0, 0); text-align: left; font-size: 10px; font-weight: 500;"
                                            data-field-json="{&quot;field_type&quot;:&quot;dbfield&quot;,&quot;field_label&quot;:&quot;Client&quot;,&quot;name&quot;:&quot;dbfield_17317133349133382024&quot;,&quot;default_value&quot;:&quot;{{CompanyName}}&quot;,&quot;is_required&quot;:0,&quot;show_label&quot;:1,&quot;color&quot;:&quot;#000000&quot;,&quot;options&quot;:[],&quot;min_length&quot;:5,&quot;max_length&quot;:250,&quot;font_size&quot;:13,&quot;show_border&quot;:0,&quot;field_width&quot;:100,&quot;allow_multi_dropdown&quot;:0,&quot;allow_multi_file&quot;:0,&quot;show_opt_val&quot;:1,&quot;allow_file_types&quot;:[],&quot;table_rows&quot;:{},&quot;auto_fill&quot;:[],&quot;allow_gallery&quot;:0,&quot;format&quot;:&quot;&quot;}"><span>Client</span>{{CompanyName}}</h6></td>
                                    <td style="width: 33.3333%;" class="resizable child-sec droppable"></td>
                                    <td class="resizable child-sec droppable correct" style="width: 33.3333%;">
                                        <div data-section-id="0" data-field-uid="17317133349073542024" style="font-size:10px;" class="inputOption form-input bg-gray sign_17317133349073542024">
                                            <label style="float:left; width:35%" class="label-text" for="">Signature</label><span style="float:left; width:65%" >[[sign_17317133349073542024]]</span></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
        <table width="100%" style="border: 1px solid #c00000;overflow: wrap;">
            <tbody>
                <tr>
                    <td>
                        <p style="font-size:10px">This report is based on the model forms shown in Appendix 6 of BS 7671: 2018+A2:2022</p>
                    </td>
                    <td>
                        <p style="font-size:10px">Page {PAGENO} of {nbpg}</p>
                    </td>
                </tr>
            </tbody>
        </table>
    </body>
    <script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.5.0-beta4/html2canvas.min.js"></script>
    <script type="text/javascript">
var pdf = new jsPDF('p', 'pt', 'letter');
pdf.addHTML(document.body, function () {
    pdf.save('Test.pdf');
});
    </script>
</html>