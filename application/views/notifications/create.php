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

                    $action = app_url('notification/create');
                    if (isset($id) && $id > 0) {
                        $action = app_url('notification/edit/');
                    }
                    ?>
                    <form class="tablelist-form pb-4 simplebar-form" autocomplete="off" id="notificationForm" method="post" action="<?= $action ?>">
                        <input type="hidden" id="edit_id" name="edit_id" value="<?= $id ?? null ?>" />
                        <div class="p-0 overflow-hidden">
                            <div data-simplebar style="height: calc(100vh - 112px);">
                                <div class="acitivity-timeline p-4">
                                    <div class="modal-body">
                                        <div class="row gy-2">
                                            <div class="col-xxl-12 col-md-12">
                                                <div>
                                                    <label for="title" class="form-label">Title <span class="text-danger">*</span></label>
                                                    <input type="text" class="form-control" id="title" name="title">
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-md-12">
                                                <div>
                                                    <label for="message" class="form-label">Message <span class="text-danger">*</span></label>
                                                    <textarea class="form-control" id="message" name="message" rows="6"/>
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div class="input-light">
                                                    <label class="form-label">Notification Group <span class="text-danger">*</span></label>
                                                    <div>
                                                        <select class="form-control select2" id="group_id" name="group_id">
                                                            <option value="" selected>Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-8 col-md-8">
                                                <div class="input-light">
                                                    <label class="form-label">Users </label>
                                                    <div>
                                                        <select class="form-control" id="user_id" name="user_id[]" multiple>
                                                            <option value="" >All</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4">
                                                <div class="form-check mb-2">
                                                    <input class="form-check-input" type="checkbox" id="send_push_notification" data-name="send_push_notification" value="1" checked>
                                                    <label class="form-check-label" for="send_push_notification">
                                                        Send Push Notification
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col-xxl-2 col-md-2">
                                                <div class="form-check mb-2">
                                                    <input class="form-check-input" type="checkbox" id="send_now"  value="1" checked>
                                                    <label class="form-check-label" for="send_now">
                                                        Send Now
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-4 hide">
                                                <div>
                                                    <label class="form-label">Schedule Date Time <span class="text-danger">*</span></label>
                                                    <input type="text" name="scheduled_time" id="scheduled_time" class="form-control" autocomplete="off"  required readonly>
                                
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--end card-body-->
                        </div>
                        <div class="offcanvas-foorter p-4 text-center">
                            <div class="hstack gap-2">
                                <button type="submit" name="action" value="sent" class="btn btn-primary add-btn" id="send-now-btn">Send Now</button>
                                <button type="submit" name="action" value="draft" class="btn btn-success add-btn hide" id="save-btn">Save as Draft</button>
                                <button type="button" class="btn btn-light close-offcanvas" id="close-modal">Close</button>
                                <div id="deleteBtnContainer"></div>
                                <?php if (isset($edit) && $edit && isset($id) && $id > 0) { ?>               
                                    <script>
                                        document.getElementById('deleteBtnContainer').innerHTML = delete_icon(<?= $id ?>, 'notification');
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
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/notifications/notification.js') ?>"></script>