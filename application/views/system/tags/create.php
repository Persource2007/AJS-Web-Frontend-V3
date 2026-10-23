<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->

<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->
            <div class="row">
                <div class="col-lg-12">
                    <?php

                    $action = app_url('tag/create');
                    if (isset($id) && $id > 0) {
                        $action = app_url('tag/edit/');
                    }
                    ?>
                    <form class="tablelist-form pb-4 simplebar-form" autocomplete="off" id="tagForm" method="post" action="<?= $action ?>">
                        <input type="hidden" id="edit_id" name="edit_id" value="<?= $id ?? null ?>" />
                        <input type="hidden" id="element_id" value="" />
                        <div class="p-0 overflow-hidden">
                            <div data-simplebar style="height: calc(100vh - 112px);">
                                <div class="acitivity-timeline  p-3">
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="col-xxl-12 col-md-12 mb-3">
                                                <div>
                                                    <label for="title" class="form-label">Title <span class="text-danger">*</span></label>
                                                    <input type="text" class="form-control" id="title" name="title">
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-md-12 mb-3 input-light">
                                                <div class="">
                                                    <label class="form-label">Modules <span class="text-danger">*</span></label>
                                                    <div>
                                                        <select class="form-control select2" id="modules" name="modules[]" multiple>
                                                            <option value="" disabled>Select</option>
                                                            <option value="contract" >Contract</option>
                                                            <option value="client" >Client</option>
                                                            <option value="property" >Property</option>
                                                            <option value="job" >Job</option>
                                                            <option value="task" >Task</option>
                                                            <option value="quotation" >Quotation</option>
                                                            <option value="invoice" >Invoice</option>                                                            
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-md-12">
                                                <div>
                                                    <label class="form-label">Description</label>
                                                    <div>
                                                        <textarea class="form-control" id="description" name="description" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--end card-body-->
                        </div>
                        <div class="offcanvas-foorter p-3 text-center">
                            <div class="hstack gap-2">
                                <button type="submit"  class="btn btn-success add-btn" id="save-btn">Save</button>
                                <button type="button" class="btn btn-light custom-offcanvas-right2" id="close-modal"  <?php  if($this->input->get('in_popup') == true) { ?> data-bs-dismiss="offcanvas" <?php } ?> >Close</button>
                                <div id="deleteBtnContainer"></div>
                                <?php if (isset($edit) && $edit && isset($id) && $id > 0) {?>               
                                    <script>
                                        document.getElementById('deleteBtnContainer').innerHTML = delete_icon(<?= $id ?>, 'tag');
                                    </script>
                                <?php }  ?>
                            </div>
                        </div>
                    </form>
                    <!--end card-->
                </div>
                <!--end col-->
            </div>
            <!--end row-->
        </div>
        <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
</div>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/systems/tags.js') ?>"></script>