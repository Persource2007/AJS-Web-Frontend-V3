<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<!-- Mobiscroll JS and CSS Includes -->
<link href="<?= cnd_url(); ?>assets/libs/mobiscroll/css/mobiscroll.jquery.min.css" rel="stylesheet">
<script src="<?= cnd_url(); ?>assets/libs/mobiscroll/js/mobiscroll.jquery.min.js"></script>
<link href="<?= cnd_url(); ?>assets/css/scheduler.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-multiselect/0.9.15/css/bootstrap-multiselect.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-multiselect/0.9.15/js/bootstrap-multiselect.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/moment-timezone@latest/builds/moment-timezone-with-data.min.js"></script>

<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-8"></div>
                <div class="col-lg-4 text-end"> </div>
                <div class="col-12">
                    <?php require APPPATH . 'views/scheduler/inc/filters.php'; ?> 
                    <div class="mbsc-grid mbsc-no-padding md-drag-drop-calendar job-calendar-body">
                        <div class="mbsc-row">
                            <div class="mbsc-col-sm-2 mt-2 pt-1 pe-2 h-100">
                                
                                <div id="external-drop-cont" class="mbsc-col-sm-12 external-drop-cont white-bg-main h-100">
                                    <div class="mbsc-form-group-title mb-2">Tasks</div>
                                    <div class="app-search d-none d-md-block pt-0">
                                        <div class="position-relative engineersbox">
                                            <input type="text" class="form-control" placeholder="Search Tasks..." autocomplete="off" id="search-sidebar-tasks">
                                            <span class="mdi mdi-magnify search-widget-icon"></span>
                                            <span class="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none" id="search-close-options"></span>
                                        </div>
                                    </div>
                                    <div id="md-task-cont" class=""></div>
                                </div>
                            </div>
                            <div class="mbsc-col-sm-10 mt-2  pt-1 job-calendar-main h-100">
                                <div class="mbsc-row">
                                    <div class="mbsc-col-sm-12">
                                        <div class="mb-2">
                                            <div class="hstack gap-2">
                                                <div>
                                                    <div style="width:175px;" class="mbsc-form-group">
                                                        <label>Calendar<input mbsc-segmented value="mcalendar" type="radio" name="calendar" checked></label>
                                                        <label>Eng. Diaries<input mbsc-segmented value="mscheduler" type="radio" name="calendar"></label>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div style="width:180px;" class="mbsc-form-group">
                                                        <label>Day<input mbsc-segmented value="d" type="radio" name="range" checked></label>
                                                        <label>Week<input mbsc-segmented value="w" type="radio" name="range"></label>
                                                        <label>Month<input mbsc-segmented value="m" type="radio" name="range" ></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mbsc-col-sm-3 mcalendar" id="calendar-month" style="height: fit-content;"></div>

                                    <div class="mbsc-col-sm-9 md-drag-drop-calendar-border mcalendar h-100">
                                        <div id="calendar1" class="h-100"></div>
                                    </div>

                                    <div class="mbsc-col-sm-12 mscheduler" id="calendar2" style="display: none;"></div>
                                    <!-- enginner diary popup -->
                                    <div id="diary-details-popup" class="mds-tooltip mds-popup" style="display: none;">
                                        <div class="mbsc-padding">
                                            <div class="mds-tooltip-label mbsc-margin d-flex">Tasks Assigned: <p id="diary-assigned-jobs" class="mbsc-light text-end mb-0"></p></div>
                                            <div class="mds-tooltip-label mbsc-margin d-flex">Hours Allocated: <p id="diary-jobs-hours" class="mbsc-light text-end mb-0"></p></div>
                                            <div class="mds-tooltip-label mbsc-margin d-flex">Completed Tasks: <p id="diary-completed-jobs" class="mbsc-light text-end mb-0"></p></div>
                                            <div class="mds-tooltip-label mbsc-margin d-flex">Pending tasks this mth.: <p id="diary-pending-jobs" class="mbsc-light text-end mb-0"></p></div>
                                            <div class="mds-tooltip-label mbsc-margin d-flex text-danger">Overdue tasks prv. mth.: <p id="diary-overdue-jobs" class="mbsc-light text-end mb-0"></p></div>
                                        </div>
                                    </div>
                                    <!-- enginner diary popup -->
                                </div>
                            </div>
                        </div>
                    </div>                   
                </div> <!-- end row-->

            </div>
            <!-- container-fluid -->
        </div>
    </div>
</div>
<!-- job assign popup -->
<div id="external-job-assign-dialog">
    <div class="mbsc-form-group btn-space">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        <div class="p-1 row">
            <div class="col-md-12 col-lg-6">
                <div class="mb-2">
                    <label class="form-label" for="external-job-title">Task</label>
                    <input type="text" class="form-control" id="external-job-title" name="Task" placeholder="Task title..." readonly></input>
                </div>
            </div>
            <div class="col-md-12 col-lg-6">
                <div class="mb-2">
                    <label class="form-label" for="external-job-select-staff">Select Engineer</label>
                    <input class="form-control form-select" id="external-job-select-staff" placeholder="Please select..." data-dropdown="true" />
                </div>
            </div>
            <div class="col-md-12 col-lg-12">
                <div class="mb-2">
                    <label class="form-label" for="external-job-details">Description</label>
                    <textarea class="form-control" id="external-job-details" name="Description" placeholder="Task description..." readonly></textarea>
                </div>
            </div>
            <div class="col-md-12 col-lg-6">
                <div class="mb-2">
                    <label class="form-label" for="start-date">Starts</label>
                    <input class="form-control" id="start-date" placeholder="Please select..." data-dropdown="true" disabled readonly/>
                </div>
            </div>
            <div class="col-md-12 col-lg-6">
                <div class="mb-2">
                    <label class="form-label" for="end-date">Ends</label>
                    <input class="form-control" id="end-date" placeholder="Please select..." data-dropdown="true" disabled readonly/>
                </div>
            </div>
            <div class="col-md-12 col-lg-12">
                <div id="job-assign-date"></div>
                <!-- <select id="external-staff-select"></select> -->
            </div>
        </div>
    </div>
</div>
<!-- job assign popup -->

<!-- add leave/block enginner popup -->
<div style="display: none">
    <div id="block-engineer-slots">
        <div class="p-3">
            <form method="POST" id="staffLeaveBox">                                    
                <div class="row">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div class="col-md-12 col-lg-12">
                        <div class="mbsc-form-group error" id="mbsc-staff-leave-errors"></div>
                    </div>
                    <div class="col-md-12 col-lg-6">
                        <div class="mb-2">
                            <label class="form-label" for="leave-title">Title <span class="required">*</span></label>
                            <input type="text" class="form-control" id="leave-title" name="title"  placeholder="Enter title here..."></input> 
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-6">
                        <div class="mb-2">
                            <label class="form-label" for="engg-leave">Select Engineer <span class="required">*</span></label>
                            <input class="form-control form-select" id="engg-leave" placeholder="Please select..." data-dropdown="true" />  
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="mb-2">
                            <label class="form-label" for="leave-desc">Description</label>
                            <textarea class="form-control h-auto" id="leave-desc" name="desc" autocomplete="off" placeholder="Enter description here..."></textarea>
                        </div>  
                    </div>
                    <div class="col-md-12 col-lg-6">
                        <div class="mb-2">
                            <label class="form-label" for="leave-from">Leave From <span class="required">*</span></label>
                            <input class="form-control" id="leave-from" name="leave_from" placeholder="Please select..." data-dropdown="true" readonly/> 
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-6">
                        <div class="mb-2">
                            <label class="form-label" for="leave-to">Leave To </label>
                            <input class="form-control" id="leave-to" name="leave_to" placeholder="Please select..." data-dropdown="true" readonly/> 
                        </div> 
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div id="leave-dates"></div>
                    </div>
                </div>                                    
            </form>
        </div>    
    </div>
</div>
<!-- add leave/block enginner popup -->

<!-- Job Task Details popup -->
<div id="task-details-dialog">
    <div class="mbsc-form-group p-2">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        <div class="d-flex mb-4">
            <div class="col-md-12">
                <div class="d-flex">
                    <i class="icons mdi mdi-square-rounded" id="selected-task-color" style="color:blue;"></i>
                    <div>
                        <h6 id="selected-task-title">Loading....</h6>
                        <span id="selected-task-datetime">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex mb-4">
            <div class="col-md-12">
                <div class="d-flex">
                    <i class="icons bx bx-info-circle"></i>
                    <div>
                        <h5>Description</h5>
                        <span id="selected-task-description">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex mb-4">
            <div class="col-md-12">
                <div class="d-flex">
                    <i class="icons ri-user-line"></i>
                    <div>
                        <h5>Engineer</h5>
                        <div class="task-engineers d-flex align-items-center">
                            <img class="engineer-avatar" id="selected-engineer-image" src="" />
                            <div class="eng-detail ps-2">
                                <div id="selected-engineer-name" class="md-work-week-name"></div>
                                <div id="selected-engineer-title" class="md-work-week-title designation-btn border mt-1"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex mb-4">
            <div class="col-md-12">
                <div class="d-flex">
                    <i class="icons ri-chat-quote-line"></i>
                    <div>
                        <h5>Contact Information</h5>
                        <div id="selected-task-address" class="fs-13">
                            Loading...
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Job Task Details popup -->
<!-- End Page-content -->
<script>
    const fetchAllTasks = "<?= app_url('scheduler/tasks/get_all') ?>";
    const fetchAllQueues = "<?= app_url('queues') ?>";
</script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/jobs/job.js?v=1.5') ?>"></script>
<script src="<?= cnd_url(); ?>assets/js/scheduler/scheduler.js"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
<script src="<?= cnd_url(); ?>assets/libs/dropzone/dropzone-min.js"></script>

