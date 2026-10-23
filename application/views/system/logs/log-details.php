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
                        <h4 class="mb-sm-0">Log Details</h4>
                        <!-- No controls here: showOffCanvasFormRight() renders only .row index 1
                             (the form below), so this whole title row is discarded in the panel. -->

                    </div>
                </div>
            </div>
            <!-- end page title -->

            <div class="row">
                <?php
                $action = app_url('sor/create');
                $method = 'POST';
                if (isset($edit) && $edit && isset($id) && $id > 0)
                {
                    $action = app_url('sor/edit/');
                    $method = 'POST';
                }
                ?>
                <form class="tablelist-form pb-4 simplebar-form" action="<?= $action ?>" method="<?= $method ?>" name="addForm" id="addForm" style="height: calc(100vh - 112px);" data-simplebar autocomplete="off">
                    <style type="text/css">
                        .hoverable {
                            transition: background-color .2s ease-out 0s;
                            -webkit-transition: background-color .2s ease-out 0s;
                            display: inline-block;
                        }

                        .hovered {
                            transition-delay: .2s;
                            -webkit-transition-delay: .2s;
                        }

                        .selected {
                            outline-style: solid;
                            outline-width: 1px;
                            outline-style: dotted;
                        }

                        .collapsed>.collapsible {
                            display: none;
                        }

                        .ellipsis {
                            display: none;
                        }

                        .collapsed>.ellipsis {
                            display: inherit;
                        }

                        .collapser {
                            position: absolute;
                            top: 1px;
                            left: -1.5em;
                            cursor: default;
                            user-select: none;
                            -webkit-user-select: none;
                        }

                        .status {
                            position: fixed;
                            left: 0px;
                            bottom: 0px;
                            min-width: 628px;
                            border-color: #c2c2c2;
                            border-top-width: 1px;
                            border-right-width: 1px;
                            border-bottom-width: 0px;
                            border-left-width: 0px;
                            border-style: solid;
                            border-top-right-radius: 4px;
                            height: 16px;
                            padding-top: 2px;
                            padding-bottom: 2px;
                            padding-right: 7px;
                            padding-left: 4px;
                            font-family: sans-serif;
                            font-size: 12px;
                            opacity: 0;
                            background-color: #d2d2f6;
                            color: #696969;
                            transition: opacity .2s ease-out;
                            -webkit-transition: opacity .2s ease-out;
                            user-select: none;
                            -webkit-user-select: none;
                        }

                        .status:not(:empty ) {
                            opacity: 1;
                        }

                        .toolbox {
                            font-family: sans-serif;
                            font-size: 13px;
                            opacity: .25;
                            background-color: #d2d2f6;
                            position: fixed;
                            right: 0px;
                            top: 0px;
                            border-color: #c2c2c2;
                            border-bottom-width: 1px;
                            border-left-width: 1px;
                            border-top-width: 0px;
                            border-right-width: 0px;
                            border-style: solid;
                            border-bottom-left-radius: 4px;
                            padding-bottom: 3px;
                            transition: opacity .2s ease-out;
                            -webkit-transition: opacity .2s ease-out;
                            cursor: default;
                            user-select: none;
                            -webkit-user-select: none;
                            padding-left: 2px;
                        }

                        .toolbox:hover {
                            opacity: 1;
                        }

                        .toolbox>* {
                            padding-left: 3px;
                            padding-right: 3px;
                        }

                        .toolbox>a {
                            padding-left: 5px;
                        }

                        .toolbox>img {
                            height: 14px;
                            vertical-align: bottom;
                            cursor: pointer;
                        }

                        .property {
                            font-weight: bold;
                        }

                        .type-null {
                            color: gray;
                        }

                        .type-boolean {
                            color: firebrick;
                        }

                        .type-number {
                            color: blue;
                        }

                        .type-string {
                            color: green;
                        }

                        .callback-function {
                            color: gray;
                        }

                        .collapser:after {
                            content: "-";
                        }

                        .collapsed > .collapser:after {
                            content: "+";
                        }

                        .collapsed>.ellipsis {
                            display: inherit;
                        }

                        .ellipsis:after {
                            content: " … ";
                        }

                        .collapsible {
                            margin-left: 2em;
                        }

                        .hoverable {
                            padding-top: 1px;
                            padding-bottom: 1px;
                            padding-left: 2px;
                            padding-right: 2px;
                            border-radius: 2px;
                        }

                        .hovered {
                            background-color: rgba(235, 238, 249, 1);
                        }

                        .collapser {
                            padding-right: 6px;
                            padding-left: 6px;
                        }
                    </style>
                    <div class="p-0 overflow-hidden pb-3">
                        <div>
                            <div class="acitivity-timeline p-4">
                                <div class="modal-body pb-3">
                                    <input type="hidden" id="tasksId" />
                                    <div class="row gy-3">
                                        <input type="hidden" name="log_id" id="log_id" value="<?= (int) $id ?>" />
                                        <input type="hidden" name="log_month" id="log_month" value="<?= htmlspecialchars($month, ENT_QUOTES, 'UTF-8') ?>" />
                                        <input type="hidden" name="log_year" id="log_year" value="<?= htmlspecialchars($year, ENT_QUOTES, 'UTF-8') ?>" />
                                        <div class="d-flex justify-content-between align-items-center">
                                            <span class="text-muted small">
                                                Log ID: <strong class="text-body" id="log-id-label"><?= (int) $id ?></strong>
                                                <span class="text-muted">&middot; <?= htmlspecialchars($month, ENT_QUOTES, 'UTF-8') ?> <?= htmlspecialchars($year, ENT_QUOTES, 'UTF-8') ?></span>
                                            </span>
                                            <button type="button" class="btn btn-sm btn-primary download-log-json" id="download-log-json" title="Download the full request and response as JSON">
                                                <i class="ri-download-2-line align-bottom me-1"></i>Download JSON
                                            </button>
                                        </div>
                                        <div class="">
                                            <div class="card-header">
                                                <h4 class="card-title mb-0">Request</h4>
                                            </div><!-- end card header -->
                                            <div class="bg-warning-subtle border border-warning-subtle rounded text-body py-2 px-3 small align-items-center justify-content-between mb-2 d-none" id="log-note-request"></div>

                                            <div class="card-body">
                                                <div id="users">
                                                    <div data-simplebar style="max-height: 320px;" class="mx-n3 p-3 pt-0 pb-0">
                                                        <div class="text-muted log-detail-request">
                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div><!-- end card body -->
                                        </div>

                                        <div class="">
                                            <div class="card-header">
                                                <h4 class="card-title mb-0">Response</h4>
                                            </div><!-- end card header -->
                                            <div class="bg-warning-subtle border border-warning-subtle rounded text-body py-2 px-3 small align-items-center justify-content-between mb-2 d-none" id="log-note-response"></div>

                                            <div class="card-body">
                                                <div id="users">
                                                    <div data-simplebar style="max-height: 320px;" class="mx-n3 p-3 pt-0 pb-0">
                                                        <div class="text-muted log-detail-response">
                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div><!-- end card body -->
                                        </div>
                                        <div class="">
                                            <div class="card-header">
                                                <h4 class="card-title mb-0">Headers</h4>
                                            </div><!-- end card header -->
                                            <div class="bg-warning-subtle border border-warning-subtle rounded text-body py-2 px-3 small align-items-center justify-content-between mb-2 d-none" id="log-note-headers"></div>

                                            <div class="card-body">
                                                <div id="users">
                                                    <div data-simplebar style="max-height: 320px;" class="mx-n3 p-3 pt-0 pb-0">
                                                        <div class="text-muted log-detail-headers">
                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div><!-- end card body -->
                                        </div>
                                    </div>
                                    <!--end row-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="offcanvas-foorter p-4 text-center">

                        <div class="hstack gap-2">
                            <button type="button" class="btn btn-danger" id="close-modal" data-bs-dismiss="offcanvas" >Close</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- container-fluid -->
    </div>



    <!-- End Page-content -->
