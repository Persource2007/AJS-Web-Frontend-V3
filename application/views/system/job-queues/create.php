<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
<style>
    .select2-readonly, .select2-selection {
        pointer-events: none; /* Disable mouse interaction */
        background-color: #e9ecef; /* Give it a disabled look */
    }
</style>
<div class="main-content">

    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 class="mb-sm-0">Add New Job Queue</h4>
                        <div class="page-title-right">
                            <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item"><a href="javascript: void(0);">Queue Set up</a></li>
                                <li class="breadcrumb-item active">Add Job Queue</li>
                            </ol>
                        </div>

                    </div>
                </div>
            </div>
            <!-- end page title -->

            <div class="row">
                <?php
                $action = app_url('queue/create');
                $method = 'POST';
                if (isset($edit) && $edit && isset($id) && $id > 0)
                {
                    $action = app_url('queue/edit/');
    $method = 'POST';
}
?>
                <form class="tablelist-form pb-4 simplebar-form" action="<?= $action ?>" method="<?= $method ?>" name="addForm" id="addForm" style="height: calc(100vh - 112px);" data-simplebar autocomplete="off">
                    <div class="p-0 overflow-hidden pb-3">
                        <div>
                            <div class="acitivity-timeline p-4 pt-2">
                                <div class="modal-body pb-3">
                                    <div class="">
                                        <div class="row gy-2">
                                            <div class="col-xxl-4 col-md-6">
                                                <div>
                                                    <label for="basiInput" class="form-label">Title <span class="text-danger">*</span></label>
                                                    <input type="text" class="form-control" id="title" name="title">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-6 skill-div">
                                                <div class="input-light">
                                                    <label class="form-label">Contract Id</label>
                                                    <select class="form-control" name="contract_id" id="contract_id">
                                                        <option value="">Select Contract</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-6 skill-div">
                                                <div class="input-light">
                                                    <label class="form-label">Workstream Id</label>
                                                    <select class="form-control" name="workstream_id" id="workstream_id">
                                                        <option value="">Select Workstream</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-6 skill-div">
                                                <div class="input-light">
                                                    <label class="form-label">Job Type</label>
                                                    <select class="form-control" name="service_id" id="service_id">
                                                        <option value="">Select Job Type</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-6 skill-div">
                                                <div class="input-light">
                                                    <label class="form-label">Engineer Id</label>
                                                    <select class="form-control" name="engineer_id" id="engineer_id">
                                                        <option value="">Select Engineer</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-md-12">
                                                <div>
                                                    <label for="basiInput" class="form-label">Description</label>
                                                    <textarea class="form-control" id="description" name="description"></textarea>
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
                            <?php
                            if (isset($edit) && $edit && isset($id) && $id > 0)
                            {
                                ?>
                            <input type="hidden" id="edit_id" name="edit_id" value="<?= $id ?>" />
                                <?php
                            }
                            ?>
                            <button type="submit" class="btn btn-success waves-effect waves-light" id="add-btn">Save</button>
                            <button type="button" class="btn btn-light waves-effect waves-light close-offcanvas" id="close-modal"  >Close</button>
                            <div id="deleteBtnContainer"></div>
                            <?php if (isset($edit) && $edit && isset($id) && $id > 0) {?>               
                                <script>
                                    document.getElementById('deleteBtnContainer').innerHTML = delete_icon(<?= $id ?>, 'queue');
                                </script>
                            <?php }  ?>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
