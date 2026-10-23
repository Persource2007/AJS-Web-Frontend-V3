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
                        <h4 class="mb-sm-0"></h4>
                        <div class="page-title-right">
                        </div>
                    </div>
                </div>
            </div>
            <!-- end page title -->

            <div class="row">
                <?php
                $action = app_url('setting/edit');
                $method = 'POST';
                ?>
                <form class="tablelist-form pb-4 simplebar-form" action="<?= $action ?>" method="<?= $method ?>" id="settingForm" style="height: calc(100vh - 112px);" data-simplebar autocomplete="off">
                    <input type="hidden" id="edit_id" name="edit_id" value="<?= $id ?? null ?>" />
                    <div class="p-0 overflow-hidden pb-3">
                        <div>
                            <div class="acitivity-timeline p-4 pt-2">
                                <div class="modal-body pb-3">
                                    <div class="row gy-2">
                                        <div class="row gy-2">
                                            <div class="col-xxl-12 col-md-12">
                                                <div>
                                                    <label for="var_value" class="form-label">Setting Value <span id="setting-comment"></span> <span class="text-danger">*</span></label>
                                                    <?php if ($this->input->get('is_boolean_value') == '1') { ?>
                                                        <div class="form-check form-switch form-switch-lg" >
                                                            <input type="hidden" name="var_value" value="0" >
                                                            <input type="checkbox" class="form-check-input" name="var_value" id="var_value"  value="1" >
                                                        </div>
                                                    <?php } else { 
                                                        $type = $this->input->get('var_datatype');
                                                        // print_r($$this->input->get('var_datatype')); die;
                                                        switch ($type) {
                                                            case 'number': ?>
                                                                <input type="number" class="form-control" id="var_value" name="var_value" maxlength="20" required>
                                                                <?php break;
                                                
                                                            case 'url': ?>
                                                                <input type="url" class="form-control" id="var_value" name="var_value" required>
                                                                <?php break;
                                                
                                                            case 'time': ?>
                                                                <input type="time"  class="form-control" id="var_value" name="var_value" required>
                                                                <?php break;
                                                
                                                            default: ?>
                                                                <input type="text" class="form-control" id="var_value" name="var_value" required>
                                                                <?php break;
                                                        }

                                                        ?>
                                                    <?php } ?>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--end row-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="offcanvas-foorter p-4 text-center">
                        <div class="hstack gap-2">
                            <button type="submit" class="btn btn-success waves-effect waves-light" id="edit-btn">Save</button>
                            <button type="button" class="btn btn-light waves-effect waves-light close-offcanvas" id="close-modal">Close</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- container-fluid -->
    </div>
</div>

<!-- End Page-content -->