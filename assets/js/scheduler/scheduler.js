var master_data_type = "calendar-scheduler";
// let $is_calendar = true;
let $pending_tasks = [];
let $tasks = [];
const $startTime = "07:00";
const $endTime = "19:00";
const dataTimezone = 'UTC';
const displayTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
let engstaff = [];
mobiscroll.momentTimezone.moment = moment;
mobiscroll.setOptions({
    theme: 'material',
    themeVariant: 'light'
});

let invalid = [];


let calType = 'mcalendar';
let calView = 'd';
let $initCalendar = false;
let $initScheduler = false;
let initMonthCalendar = '';
var $externalDropCont = $('#external-drop-cont');
let $overlap_engg = 0;

const filters = {
    clear: function () {
        init_dropdowns['client']([], null);
        init_dropdowns['contract']([], null);
        init_dropdowns['services']([], null);
        init_dropdowns['engineers']($all_engineers, null);
    },
    refresh: function () {
        $("#client_id_filter").multiselect("refresh")
        $("#contract_id_filter").multiselect("refresh")
        $("#services_id_filter").multiselect("refresh")
        $("#engineers_id_filter").multiselect("refresh")
    },
    default: function (res) {
        filters['clear']();
        init_dropdowns['client'](res.clients, null);
        init_dropdowns['contract'](res.contracts, null);
        init_dropdowns['services']([], null);
        init_dropdowns['engineers']($all_engineers, null);
    },
    client_id_filter: function (res) {
        init_dropdowns['contract'](res.contracts, null);
    },
    contract_id_filter: function (res) {
        init_dropdowns['services'](res.services, null);
    },
    services_id_filter: function (res) {
        var values = res.engineers.map(eng => eng.id);
        init_dropdowns['engineers']($all_engineers, null);
    }
};

function initCalendar()
{
    $('.mscheduler').hide();
    $('.mcalendar').show();
    if(initMonthCalendar != ''){
        initMonthCalendar.destroy();
    }
    initMonthCalendar = $('#calendar-month').mobiscroll().datepicker({
        display: 'inline',
        dataTimezone: dataTimezone,
        displayTimezone: displayTimeZone,
        timezonePlugin: mobiscroll.momentTimezone,
        onChange: function (args) {
            $initCalendar.navigate(args.value);
        },
    }).mobiscroll('getInst');

    $initCalendar = $('#calendar1')
            .mobiscroll()
            .eventcalendar({
                timeFormat: 'HH:mm',
                clickToCreate: false,
                data: $tasks,
                eventOverlap: true,
                exclusiveEndDates: false,
                dragToMove: true,
                dragToResize: false,
                dragInTime: true,
                eventDelete: true,
                externalDrag: true,
                externalDrop: true,
                dataTimezone: dataTimezone,
                displayTimezone: displayTimeZone,
                timezonePlugin: mobiscroll.momentTimezone,
                height: '100%',
                renderScheduleEventContent: function (event) {
                    return `
                        <div class="custom-event-label">
                            <div><strong>${event.title}</strong></div>
                            <div>#${event.original.job_code}</div>
                        </div>
                    `;
                },
                renderHeader: function () {
                    return (
                            '<div mbsc-calendar-nav class="mds-custom-header-nav"></div>' +
                            '<div class="mbsc-flex mbsc-flex-1-0 mbsc-justify-content-end">' +
                            '<button mbsc-calendar-prev class="mds-header-filter-prev"></button>' +
                            '<button mbsc-calendar-today class="mds-header-filter-today"></button>' +
                            '<button mbsc-calendar-next class="mds-header-filter-next"></button>'+
                            '</div>' 
                            );
                },
                view: {
                    schedule: {type: 'day', size: 1},
                },
                onEventDragEnd: function (args) {
                    $("#external-drop-cont #dropbox-placeholder").remove();
                    $("#external-drop-cont .external-drop-task").show();
                },
                onEventDragStart: function (args) {
                    if (args.action == "move") {
                        $lastaddedtask = args.event;
                        var color = args.event.color;
                        $("#external-drop-cont #dropbox-placeholder").remove();
                        $("#external-drop-cont .external-drop-task").hide();
                        $("#external-drop-cont #md-task-cont").prepend(`<div id="dropbox-placeholder">Drop Here</div>`);
                    }
                },
                onEventClick: function (args) {
                    mobiscroll.toast({
                        duration: 3000,
                        message: args.event.title,
                    });
                    showTaskDetail(args);
                },
                onEventUpdated: function (args) {
                    var rescheduleTitle = "Confirm Reschedule";
                    var rescheduleMsg = "Are you sure you want to reschedule this task?";
                    if (args?.event?.is_appt == "1") {
                        rescheduleTitle = "Reschedule Fixed Appointment";
                        rescheduleMsg = "This is a fixed appointment. Are you sure you want to reschedule it?";
                    }
                    mobiscroll.confirm({
                        title: rescheduleTitle,
                        message: rescheduleMsg,
                        okText: "Yes, Reschedule",
                        cancelText: "Cancel",
                        onClose: function (result) {
                            if (result) {
                                args.event.start = formatDateTime(args.event.start);
                                args.event.end = formatDateTime(args.event.end);
                                updateTaskStatus('rescheduled', args.event);
                            } else {
                                $initCalendar.updateEvent(args.oldEvent);
                            }
                        }
                    });
                },
                onSelectedDateChange: function (args) {
                    initMonthCalendar.setVal(args.date);
                },
                onEventCreated: function (args) {

                    if (args.action === 'externalDrop') {
                        mobiscroll.toast({
                            duration: 3000,
                            context: '#calendar1',
                            message: 'Job dropped to Calendar',
                        });
                    }
                    fillDialog(args); //assign popup
                },
                onEventCreateFailed: function (args) {
                    if ('overlap' in args) {
                        // $overlap_engg = args.overlap.resource;
                        $overlap_engg = 0;
                        fillDialog(args);
                    } else {
                        mobiscroll.confirm({
                            width: 500,
                            title: "Task schedule failed!!!",
                            message: "Engineer slot already booked..",
                            buttons: ['OK']
                        });
                    }
                    displaySidebarTasks($pending_tasks);
                },
                // onEventUpdateFailed: function (args) {
                //     if ('overlap' in args) {
                //         var resexi = args.overlap.resource;
                //         var resnew = args.oldEvent.resource;
                //         // if (resexi == resnew) {
                //             // mobiscroll.confirm({
                //             //     width: 500,
                //             //     title: "Task rescheduled failed!!!",
                //             //     message: "Engineer slot already booked..",
                //             //     buttons: ['OK']
                //             // });
                //         // } else {
                //             args.event.start = formatDateTime(args.event.start);
                //             args.event.end = formatDateTime(args.event.end);
                //             updateTaskStatus('rescheduled', args.event);
                //         // }
                //     }
                //     displaySidebarTasks($pending_tasks);
                // },
                onEventDeleted: function (args) {
                },
                // for external drop event
                onEventCreate: function (args) {
                    $('#md-event-' + args.event.id).remove();
                    mobiscroll.toast({
                        duration: 3000,
                        message: args.event.title + ' added',
                    });
                },
                onEventDelete: function (args) {
                    mobiscroll.confirm({
                        title: "Confirm Unschedule",
                        message: "Are you sure you want to remove this task from the schedule?",
                        okText: "Yes, Unschedule",
                        cancelText: "Cancel",
                        onClose: function (result) {
                            if (result) {
                                updateTaskStatus('unscheduled', args.event);
                            } else {
                                $('#md-event-' + args.event.id).remove();
                                $initCalendar.setEvents($tasks);
                                displaySidebarTasks($pending_tasks);
                            }
                        }
                    });
                },
                // for external drop event
            }).mobiscroll('getInst');
    switchCalendarView();
}

function initTasks() { //for calendar to sidebar drop tasks
    $externalDropCont.mobiscroll().dropcontainer({
        onItemDrop: function (args) {
            if (args.data) {
                var event = args.data;
                var eventLength = Math.round(Math.abs(new Date(event.end) - new Date(event.start)) / (60 * 60 * 1000));
                var elm = `<div id="md-event-${event.id}" class="external-drop-task border-right-filter" style="border-color:${event.color};"><div>${event.title}</div><div>${event.job_code}</div><div>${event.time}(${eventLength > 1 ? 's' : ''})</div></div>`;
                if ($('#md-task-cont .external-drop-task').length > 0) {
                    $('#md-task-cont').append(elm);
                } else {
                    $('#md-task-cont').html(elm);
                }
                $('#md-event-' + event.id).mobiscroll().draggable({dragData: event});
            }
        },
    });
}


function switchCalendarView() {
    calView = $('input[name="range"]:checked').val();
    $("#calendar1").parent().removeClass("mbsc-day-view")
    switch (calView) {
        case 'm':
            $initCalendar.setOptions({
                view: {
                    calendar: {
                        type: 'month',
                        labels: 5,
                    }

                }
            });
            break; // Add break statement here
        case 'w':
            $initCalendar.setOptions({
                view: {
                    schedule: {type: 'week',maxEventStack: 1, size: 1, startTime: $startTime, endTime: $endTime},
                }
            });
            break; // Add break statement here
        case 'd':
            $initCalendar.setOptions({
                view: {
                    schedule: {type: 'day',maxEventStack: 5, size: 1, startTime: $startTime, endTime: $endTime},
                }
            });
            $("#calendar1").parent().addClass("mbsc-day-view")
            break; // Add break statement here
    }
}

// type 2
function initScheduler()
{
    $('.mcalendar').hide();
    $('.mscheduler').show();
    $initScheduler = $('#calendar2')
            .mobiscroll()
            .eventcalendar({
                timeFormat: 'HH:mm',
                data: $tasks,
                resources: engstaff,
                invalid: invalid,
                // slots: slots,
                view: {
                    timeline: {
                        type: 'month',
                        maxEventStack: 5
                    },
                },
                clickToCreate: false,
                eventOverlap: false,
                exclusiveEndDates: false,
                dragToMove: true,
                dragToResize: false,
                dragInTime: true,
                eventDelete: true,
                externalDrag: true,
                externalDrop: true,
                height: '100%',
                dataTimezone: dataTimezone,
                displayTimezone: displayTimeZone,
                timezonePlugin: mobiscroll.momentTimezone,
                renderScheduleEventContent: function (event) {
                    return `
                        <div class="custom-event-label">
                            <div><strong>${event.title}</strong></div>
                            <div>#${event.original.job_code}</div>
                        </div>
                    `;
                },
                onEventClick: function (args) {
                    mobiscroll.toast({
                        duration: 3000,
                        message: args.event.title,
                    });
                    showTaskDetail(args);
                },
                onEventDragEnd: function (args) {
                    $("#external-drop-cont #dropbox-placeholder").remove();
                    $("#external-drop-cont .external-drop-task").show();
                },
                onEventDragStart: function (args) {
                    if (args.action == "move") {
                        $lastaddedtask = args.event;
                        var color = args.event.color;
                        $("#external-drop-cont #dropbox-placeholder").remove();
                        $("#external-drop-cont .external-drop-task").hide();
                        $("#external-drop-cont #md-task-cont").prepend(`<div id="dropbox-placeholder">Drop Here</div>`);
                    }
                },
                onEventUpdated: function (args) {
                    var rescheduleTitle = "Confirm Reschedule";
                    var rescheduleMsg = "Are you sure you want to reschedule this task?";
                    if (args?.event?.is_appt == "1") {
                        rescheduleTitle = "Reschedule Fixed Appointment";
                        rescheduleMsg = "This is a fixed appointment. Are you sure you want to reschedule it?";
                    }
                    mobiscroll.confirm({
                        title: rescheduleTitle,
                        message: rescheduleMsg,
                        okText: "Yes, Reschedule",
                        cancelText: "Cancel",
                        onClose: function (result) {
                            if (result) {
                                args.event.start = formatDateTime(args.event.start);
                                args.event.end = formatDateTime(args.event.end);
                                updateTaskStatus('rescheduled', args.event);
                            } else {
                                $initScheduler.updateEvent(args.oldEvent);
                            }
                        }
                    });
                },
                onEventCreated: function (args) {

                    if (args.action === 'externalDrop') {
                        mobiscroll.toast({
                            duration: 3000,
                            context: '#calendar1',
                            message: 'Job dropped to Calendar',
                        });
                    }
                    fillDialog(args);
                },
                onEventCreateFailed: function (args) {
                },
                onEventUpdateFailed: function (args) {
                },
                onEventDeleted: function (args) {
                },
                // onItemDrag: function(args){
                //     console.log(args)
                // },
                // for external drop event
                onEventCreate: function (args) {
                    $('#md-event-' + args.event.id).remove();
                    mobiscroll.toast({
                        duration: 3000,
                        message: args.event.title + ' added',
                    });
                },
                onEventDelete: function (args) {
                    mobiscroll.confirm({
                        title: "Confirm Unschedule",
                        message: "Are you sure you want to remove this task from the schedule?",
                        okText: "Yes, Unschedule",
                        cancelText: "Cancel",
                        onClose: function (result) {
                            if (result) {
                                updateTaskStatus('unscheduled', args.event);
                            } else {
                                $('#md-event-' + args.event.id).remove();
                                $initScheduler.setEvents($tasks);
                                displaySidebarTasks($pending_tasks);
                            }
                        }
                    });
                },
                // for external drop event
                renderResource: function (resource) {
                    var engg_name = resource.name;
                    var profile = resource.img;
                    var jobs_hours = resource.jobs_hours;
                    var assigned_jobs = resource.assigned_jobs;
                    var completed_jobs = resource.completed_jobs;
                    var pending_jobs = resource.pending_jobs;
                    var overdue_jobs = resource.overdue_jobs;
                    
                    var data = {engg_name, profile};
                    data.assigned_jobs = assigned_jobs ?? 0;
                    data.jobs_hours = jobs_hours ? showSecToHours(jobs_hours) : "00:00";
                    data.completed_jobs = completed_jobs ?? 0;
                    data.pending_jobs = pending_jobs ?? 0;
                    data.overdue_jobs = overdue_jobs ?? 0;

                    var diary_data = JSON.stringify(data);
                    return (`<div class='md-work-week-cont view_diary_detail' data-details='${diary_data}'><div class='md-work-week-name' style="margin-bottom: 5px;">${engg_name}</div><div class='md-work-week-title designation-btn border'>${resource.title || "N/A"}</div><img style='display:none' class='md-work-week-avatar' src='${resource.img}'/></div>`)
                },
            })
            .mobiscroll('getInst');
    // 
    switchSchedulerView();
}
function switchSchedulerView() {
    calView = $('input[name="range"]:checked').val();
    switch (calView) {
        case 'm':
            $initScheduler.setOptions({
                view: {
                    timeline: {
                        type: 'month',
                        maxEventStack: 5,
                        eventList: true,
                    },
                },
                slots: undefined,
                colors: undefined
            });
            break; // Add break statement here
        case 'w':
            $initScheduler.setOptions({
                view: {
                    timeline: {
                        type: 'week',
                        maxEventStack: 5,
                        startDay: 1,
                        endDay: 0,
                        resolutionHorizontal: 'hour',
                        timeCellStep: 60,
                        timeLabelStep: 60,
                        startTime: $startTime,
                        endTime: $endTime,
                        size: 1
                    },
                },
                colors: [
                {
                  background: '#a5ceff4d',
                  slot: 1,
                  recurring: {
                    repeat: 'daily',
                  },
                },
                {
                  background: '#f7f7bb4d',
                  slot: 2,
                  recurring: {
                    repeat: 'daily',
                  },
                },
              ],
                slots: [
                    {
                      id: 1,
                      name: 'AM',
                    },
                    {
                      id: 2,
                      name: 'PM',
                    },
                  ],
                renderSlot: function (args) {
                    var slotId = args.slot.id;
                    return (
                      '<div style="background:' +
                      (slotId == 1 ? '#a5ceff4d' : '#f7f7bb4d') +
                      ';padding:4px;">' +
                      '<div class="slot-name">' +
                      args.slot.name +
                      '</div>' +
                      '</div>'
                    );
                  }
            });
            break; // Add break statement here
        case 'd':
            $initScheduler.setOptions({
                view: {
                    timeline: {
                        maxEventStack: 5,
                        type: 'day',
                        startDay: 1,
                        endDay: 0,
                        timeCellStep: 60,
                        timeLabelStep: 60,
                        startTime: $startTime,
                        endTime: $endTime,
                        size: 1
                    },
                },
                slots: undefined,
                colors: undefined
            });
            break; // Add break statement here
    }
    refreshEngineers();
}

// Get All Tasks Start
let filterData = {};
let default_load = 1;
let taskHTML = '<div id="md-event-{{ID}}" data-drag-data=\'{{JOB_DATA}}\' class="external-drop-task border-right-filter{{EXTRA_CLASS}}" style="border-color: {{COLOR}}"><h6 class="mb-1">{{JOB_TITLE}}</h6><p class="mb-0">{{JOB_CODE}}<br>{{TIME}}</p>{{APPT_PLUS_ICON}}</div>';
async function get_all_tasks(q = 0) {
    let $target = $("#external-drop-cont #md-task-cont");
    $target.html("Loading...");
    try {
        q = queueFilter;
        const contracts = JSON.parse(ajs_form_handler.get_token('user_contracts'));
        await ajs.ajax_form(fetchAllTasks, {default_load, contracts, filterData, q}, "POST", null, "0", "0", load_all_tasks, load_all_tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        $target.html("No data found");
        $('.engineersbox #lists').html("No engineer found.");
    }
}
function load_all_tasks(response){
    if (ajs_form_handler.check_result(response)) {
        const res = response.data;

        $tasks = [];
        if (res.assigned.length > 0) {
            res.assigned.forEach(task => {
                var req_minutes = Math.floor(task.time_required / 60);
                let end_date = new Date(task.start_date);
                    end_date.setMinutes(end_date.getMinutes() + parseInt(req_minutes));
                    end_date = formatDateTime(end_date);
                    let infoData = {
                        resident_name: task?.resident_name ?? "",
                        address1: task?.address1 ?? "",
                        address2: task?.address2 ?? "",
                        postalcode: task?.postalcode ?? "",
                        email: task?.email ?? "",
                        mobile: task?.mobile ?? "",
                        telephone: task?.telephone ?? ""
                    };
                    $tasks.push({
                        info: infoData,
                        id: task.job_task_id,
                        allDay: false,
                        start: task.start_date,
                        end: end_date,
                        title: task.title,
                        description: task.task_description,
                        job_code: task.code,
                        color: task.color_code,
                        time: req_minutes,
                        resource: task.staff_id ?? null,
                        is_appt: task.is_appointment_confirm ?? null,
                        slot: task?.slot_id ?? 1,
                        preferred_staff: [],
                        skilled_staff: [],
                        overlap: true,
                        bufferBefore: task.before_extra, //add interval before task
                        bufferAfter: task.after_extra, // add interval after task
                    });
            });
        }

        $pending_tasks = [];
        let $preferred_staff = [];
        let $skilled_staff = [];
        if (res.pending.length > 0) {
            res.pending.forEach(task => {
                var req_minutes = Math.floor(task.time_required / 60);
                
                    let start_date = "00:00";
                    let end_date = "03:00";
                    if(task.is_appointment_confirm == 1){
                        var req_minutes = Math.floor(task.time_required / 60);
                        start_date = task.start_date;
                        end_date = new Date(start_date);
                        end_date.setMinutes(end_date.getMinutes() + parseInt(req_minutes));
                        end_date = formatDateTime(end_date);
                    }
                    let $pstaff = [];
                    if(task.preferred_staff != null && task.preferred_staff != ''){
                        $pstaff = task.preferred_staff.split(",").map(s => s.trim());
                        $preferred_staff = [...$preferred_staff, ...$pstaff];
                    }
                    let $sstaff = [];
                    if(task.skilled_staff != null && task.skilled_staff != ''){
                        $sstaff = task.skilled_staff.split(",").map(s => s.trim());
                        $skilled_staff = [...$skilled_staff, ...$sstaff];
                    }
                    let infoData = {
                        resident_name: task?.resident_name ?? "",
                        address1: task?.address1 ?? "",
                        address2: task?.address2 ?? "",
                        postalcode: task?.postalcode ?? "",
                        email: task?.email ?? "",
                        mobile: task?.mobile ?? "",
                        telephone: task?.telephone ?? ""
                    };
                    $pending_tasks.push({
                        info: infoData,
                        id: task.job_task_id,
                        allDay: false,
                        start: start_date,
                        end: end_date,
                        title: task.title,
                        description: task.task_description,
                        time: req_minutes,
                        color: task.color_code,
                        job_code: task.code,
                        is_appt: task.is_appointment_confirm,
                        resource: null,
                        preferred_staff: $pstaff,
                        skilled_staff: $sstaff,
                        slot: task?.slot_id ?? 1,
                        queue: task.queue_id,
                        overlap: true,
                        bufferBefore: task.before_extra, //add interval before task
                        bufferAfter: task.after_extra, // add interval after task
                    });
            });

        }else {
            let $target = $("#external-drop-cont #md-task-cont");
            $target.html("No data found");
        }
        if($preferred_staff.length <= 0){
            $preferred_staff = $skilled_staff;
        }
        displaySidebarTasks($pending_tasks);//display tasks in sidebar
        $multiEngg.val($preferred_staff).multiselect("refresh");
        multi_engineer()
    }
    else{
        let $target = $("#external-drop-cont #md-task-cont");
            $target.html("No data found");
        ajs_form_handler.show_errors_offcanvas(response);
    }
}
// --------------

//display tasks in sidebar start
function displaySidebarTasks($task_data = []) {
    var $target = $("#external-drop-cont #md-task-cont");
    $target.html("Loading...");
    if ($task_data.length > 0) {
        var tasks = '';
        $task_data.forEach((task, ind) => {
            var date = new Date();
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMinutes(date.getMinutes() + task.time);
            var endTime = date.toTimeString().split(' ')[0].slice(0, 5);
            let infoData = {
                        resident_name: task.info?.resident_name ?? "",
                        address1: task.info?.address1 ?? "",
                        address2: task.info?.address2 ?? "",
                        postalcode: task.info?.postalcode ?? "",
                        email: task.info?.email ?? "",
                        mobile: task.info?.mobile ?? "",
                        telephone: task.info?.telephone ?? ""
                    };
            var task_data = {id: task.id, allDay: false, start: task.start, overlap: true, end: task.end, title: task.title, description: task.task_description, job_code: task.job_code, color: task.color, time: task.time, resource: null, slot: null, info: infoData};
            extraClass = "";
            plusIcon = "";
            if(task.is_appt == 1){
                extraClass = " appt_task"
                plusIcon = "<h5><i class='fa fa-plus'></i></h5>";
            }
            tasks += taskHTML.replaceAll('{{ID}}', task.id)
                    .replaceAll('{{EXTRA_CLASS}}', extraClass)
                    .replaceAll('{{APPT_PLUS_ICON}}', plusIcon)
                    .replaceAll('{{JOB_TITLE}}', task.title)
                    .replaceAll('{{JOB_CODE}}', '#' + task.job_code)
                    .replaceAll('{{COLOR}}', task.color)
                    .replaceAll('{{TIME}}', displayServiceTime(task.time * 60))
                    .replaceAll('{{JOB_DATA}}', JSON.stringify(task_data));
        })
        $target.html(tasks);
        initTaskDraggable();
    } else {
        $target.html("Select queue/client to view..");
    }
}
//display tasks in sidebar end

$(document).on("click",".appt_task .fa.fa-plus", function(){
    var event = {event:$(this).parents(".appt_task").data("drag-data")};
    fillDialog(event)
})

function displayServiceTime(seconds) {
    if (seconds < 60) {
        return `${seconds} second(s)`;
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        return `${minutes} minute(s)`;
    } else {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours} hour(s) and ${minutes} minute(s)`;
    }
}

// call after add new task
async function reinitCalendar(isLive = true) {
    // controlLoader('show')
    if(isLive){
        await get_all_tasks();
    }
    if ($initScheduler) { $initScheduler.destroy() }
    if ($initCalendar) { $initCalendar.destroy() }

    if (calType == 'mcalendar') { initCalendar(); } 
    else if (calType == 'mscheduler') { initScheduler(); }
    // controlLoader('hide')
}
// call after add new task

$(document).on("change", 'input[name="range"]', function (ev) {
    if (calType == 'mcalendar') {
        switchCalendarView()
    } else if (calType == 'mscheduler') {
        switchSchedulerView()
    }
});


$(document).on("change", 'input[name="calendar"]', function (ev) {
    calType = $(this).val();
    if (calType == 'mcalendar') {
        if ($initScheduler) {
            $initScheduler.destroy()
        }
        initCalendar();
    } else if (calType == 'mscheduler') {
        if ($initCalendar) {
            $initCalendar.destroy()
        }
        initScheduler();
    }
    // refreshEngineers();
});


// Get All Queues End

// Task details popup start
let $task_title = $('#selected-task-title');
let $task_address = $('#selected-task-address');
let $task_description = $('#selected-task-description');
let $engineer_image = $('#selected-engineer-image');
let $engineer_name = $('#selected-engineer-name');
let $engineer_title = $('#selected-engineer-title');
let $selected_task_datetime = $('#selected-task-datetime');
let $selected_task_color = $('#selected-task-color');

let dialogDetails = $('#task-details-dialog')
        .mobiscroll()
        .popup({
            display: 'center',
            animation: 'slide-down',
            width: 500,
            contentPadding: 20,
            touchUi: true,
            // headerText: 'Task Details',
            closeOnOverlayClick: true,
            closeOnEsc: true,
            showOverlay: false,
            showOverlay: true,
        })
        .mobiscroll('getInst');

// Job Task Details popup close code 
$(document).on("click","#task-details-dialog .btn-close", function(){
    $task_title.text('Loading...');
    $task_address.text('Loading...');
    $task_description.text('Loading...');
    $selected_task_datetime.text('Loading...');
    $engineer_name.text('Loading...');
    $engineer_title.text('');
    $engineer_image.removeAttr('src');
    $selected_task_color.removeAttr('style');
    dialogDetails.close();
});
//
// Job Task Details popup close code 
$(document).on("click","#block-engineer-slots .btn-close", function(){
    clearLeaveForm();
    $enggBlockSlot.close();
});
//
// Job Task Details popup close code 
$(document).on("click","#external-job-assign-dialog .btn-close", function(){
    if (calType == 'mcalendar') {
        $initCalendar.removeEvent($lastaddedtask);
    } else if (calType == 'mscheduler') {
        $initScheduler.removeEvent($lastaddedtask);
    }
    displaySidebarTasks($pending_tasks);//display tasks in sidebar
    dialog.close();
    $overlap_engg = 0;
});
//

function datetimefortaskdetails(dateTimeStr) {
    dateTimeStr = convertUTCToLocal(dateTimeStr, "", { separate: false });
    const date = new Date(dateTimeStr);

    const options = {
        weekday: "long",
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    };
    let formattedDate = date.toLocaleString("en-US", options).replace(",", "");
    // Add comma after weekday
    formattedDate = formattedDate.replace(/^(\w+)\s/, "$1, ");

    return formattedDate;
}

function showTaskDetail(args) {
    // $task_title.mobiscroll('getInst').value = args.event.title || '';
    // $task_description.mobiscroll('getInst').value = args.event.details || '';
    var taskTitle = args.event.title || '';
    var taskCode = "#"+ args.event.job_code + " - " || '';
    var taskDetail = args.event.details || 'N/A';
    $task_title.text(taskCode + taskTitle);
    $task_description.text(taskDetail);
    $selected_task_datetime.text(datetimefortaskdetails(args.event.start)+' - '+datetimefortaskdetails(args.event.end));
    $selected_task_color.css("color",args.event.color)
    var engData = $engineers.find(eng => eng.id === args.event.resource);
    if (engData && "name" in engData) {
        $engineer_name.text(engData.name);
        $engineer_title.text(engData.title || 'N/A');
        $engineer_image.attr("src", engData.img);
    } else {
        $engineer_name.text('N/A');
        $engineer_title.text('N/A');
        $engineer_image.removeAttr('src');
    }
    let address = [
        args.event.info?.resident_name,
        args.event.info?.address1,
        args.event.info?.address2,
        args.event.info?.postalcode
    ]
    .filter(item => item?.toString().trim()).join("<br>");

    let contact = [
        args.event.info?.email && `<b>Email:</b> ${args.event.info.email}`,
        args.event.info?.mobile && `<b>Mobile:</b> ${args.event.info.mobile}`,
        args.event.info?.telephone && `<b>Telephone:</b> ${args.event.info.telephone}`
    ]
    .filter(Boolean).join("<br>"); 
    $task_address.html(`${address} <br>${contact}`)
    // $task_dates.setVal([formatDateTime(args.event.start), formatDateTime(args.event.end)]);
    // $initCalendar.navigateToEvent(args);
    dialogDetails.open();
}
// Task details popup end

// assign task confirmation popup start
let $lastaddedtask = {};
let $title = document.getElementById('external-job-title');
let $details = document.getElementById('external-job-details');
// var datePickerResponsive = {
//     medium: {
//       controls: ['calendar'],
//       touchUi: false,
//     },
//   };
let datetimePickerResponsive = {
    medium: {
        controls: ['calendar', 'time'],
        touchUi: false,
    },
};

function formatDateTime(dateStr) {
    let dateObj = new Date(dateStr);

    function padZero(num) {
        return num < 10 ? '0' + num : num;
    }

    return `${dateObj.getFullYear()}-${padZero(dateObj.getMonth() + 1)}-${padZero(dateObj.getDate())} ` +
            `${padZero(dateObj.getHours())}:${padZero(dateObj.getMinutes())}:${padZero(dateObj.getSeconds())}`;
}

let dialog = $('#external-job-assign-dialog')
        .mobiscroll()
        .popup({
            display: 'center',
            animation: 'slide-down',
            width: 600,
            contentPadding: 20,
            touchUi: true,
            headerText: 'Assign task',
            closeOnOverlayClick: false,
            closeOnEsc: false,
            showOverlay: true,
            buttons: [
                {
                    text: 'Assign',
                    handler: 'set',
                    cssClass: 'mbsc-popup-button-primary btn btn-success waves-effect waves-light',
                    handler: function (event) {
                        var staff = technician.getVal();
                        if (staff == '' || staff < 1) {
                            mobiscroll.alert({
                                width: 400,
                                display: 'center',
                                title: "Validation Error.",
                                message: "Please Select Engineer.",
                            });
                        } else if ($overlap_engg == staff) {
                            mobiscroll.alert({
                                width: 400,
                                display: 'center',
                                title: "Validation Error.",
                                message: "Selected engineer slot already booked...",
                            });
                        } else {
                            $lastaddedtask.resource = staff;
                            if (calType == 'mcalendar') {
                                $initCalendar.updateEvent($lastaddedtask); //update last added event engineer
                                $initCalendar.navigateToEvent($lastaddedtask);
                            } else if (calType == 'mscheduler') {
                                $initScheduler.updateEvent($lastaddedtask); //update last added event engineer
                                $initScheduler.navigateToEvent($lastaddedtask);
                            }
                            const eventToSave = $lastaddedtask;
                            updateTaskStatus('scheduled', eventToSave);
                            dialog.close();
                            $overlap_engg = 0;
                        }
                    }
                }
            ],
        })
        .mobiscroll('getInst');

function fillDialog(args) {
    setEngineersPopup(args);
    $title.value = args.event.title;
    $details.value = args.event.details || '';
    //set task end date and time
    enddatetime = new Date(args.event.start);
    enddatetime.setMinutes(enddatetime.getMinutes() + parseInt(args.event.time));

    if(calType == "mscheduler" && calView == "w"){
        args.event.start = formatDateTime(args.event.start);
        args.event.end = formatDateTime(enddatetime);
    }else{
        event_start = formatDateTime(args.event.start);
        args.event.start = convertLocalToUTC(event_start, "", { separate: false });

        event_end = formatDateTime(enddatetime);
        args.event.end = convertLocalToUTC(event_end, "", { separate: false });
    }

    $lastaddedtask = args.event; //store task detail for remove the task by code
    //set task end date and time

    if (args.source == "schedule") { // for calendar
        $initCalendar.updateEvent(args);  //update added event end date
    } else if (args.source == "timeline") { // for scheduler
        technician.setOptions({disabled: true});
        technician.setVal(args.event.resource);
        $initScheduler.updateEvent(args);
    }
    dialog.setOptions({anchor: args.target});
    range.setVal([args.event.start, args.event.end]);
    dialog.open();
}

let technician = '';
function setEngineersPopup(eargs) {
    if (calType == 'mscheduler') {
        var engs = [];
        if(eargs?.resourceObj){
            engs = $engineers.filter(engg => eargs.resourceObj.value);
        }else{
            engs = $engineers.filter(engg => selectedResources[engg.id]);
        }
    }
    else{
        let edata = $pending_tasks.find(task => task.id == eargs.event.id);
        var preferred_staff = edata.preferred_staff;
        var skilled_staff = edata.skilled_staff;
        if(preferred_staff.length < 1){
            preferred_staff = skilled_staff;
        }
        var engs = $engineers.filter(engg => preferred_staff.includes(String(engg.id)));
    }
    technician = $('#external-job-select-staff')
            .mobiscroll()
            .select({
                // inputElement: document.getElementById('external-job-select-staff'),
                data: engs,
                display: 'anchored',
                touchUi: false,
                filter: true,
                disabled: false,
                width: '18em',
                height: '200px',
                cssClass: "custom-dropdown"
            })
            .mobiscroll('getInst');
    technician.setVal('');
}

let range = $('#job-assign-date')
        .mobiscroll()
        .datepicker({
            controls: ['datetime'],
            select: 'range',
            startInput: '#start-date',
            endInput: '#end-date',
            showRangeLabels: false,
            touchUi: true,
            responsive: datetimePickerResponsive,
            dateFormat: 'DD/MM/YYYY',// UK Date Format
            timeFormat: 'HH:mm',// 24-hour Time Format
            ampm: false,
            dataTimezone: dataTimezone,
            displayTimezone: displayTimeZone,
            timezonePlugin: mobiscroll.momentTimezone,
            onChange: function (args) {
                var date = args.value;
            },
        })
        .mobiscroll('getInst');

//  range.setOptions({
//       controls: 'datetime',
//       responsive: datetimePickerResponsive,
//     });
// // for (var i = 0; i < taskElm.length; i++) {
// //   mobiscroll.draggable(taskElm[i], { dragData: tasks[i] });
// // }
// assign task confirmation popup end





// Update Task start
let recenttaskdata = {};
let recenttasktype = '';

function handle_assignment_errors(type){
    if (type == 'scheduled') 
    {
        if (calType == 'mcalendar') 
        {
            $initCalendar.removeEvent($lastaddedtask);
        } 
        else if (calType == 'mscheduler') 
        {
            $initScheduler.removeEvent($lastaddedtask);
        }
    } 
    else if (type == 'rescheduled' || type == 'unscheduled') 
    {
        if (calType == 'mcalendar') 
        {
            $initCalendar.setEvents($tasks);
        } 
        else if (calType == 'mscheduler') 
        {
            $initScheduler.setEvents($tasks);
        }
    }
    displaySidebarTasks($pending_tasks);//display tasks in sidebar
}

async function updateTaskStatus(type, data) {
    recenttaskdata = data;
    recenttasktype = type;
    if (!(calType === "mscheduler" && calView === "w")) {
        data.slot = null;
    }
    if(type != 'scheduled'){
        data.start = convertLocalToUTC(data.start, "", { separate: false });
        data.end = convertLocalToUTC(data.end, "", { separate: false });
    }

    controlLoader('show')
    try 
    {
        await ajs.ajax_form(site_url + '/calendar/task/' + type, data, "POST", null, "0", "0", update_task_statues, update_task_statues);
    } 
    catch (error) 
    {
        await get_all_tasks();
        var err_msg = "Something went wrong.please try again...";
        if (error?.responseJSON && error?.responseJSON?.message) 
        {
            messageHTML = error.responseJSON.message;
            var match = messageHTML.match(/<p>(.*?)<\/p>/);
            err_msg = match ? match[1] : err_msg;
        }
        handle_assignment_errors(type);
    }
    dialog.close();
    $overlap_engg = 0;
    controlLoader('hide');
}

async function update_task_statues(response){
    var data = recenttaskdata;
    var type = recenttasktype;
    if (ajs_form_handler.check_result(response)){
        const status = response.status;
        if (status) {
            var icon = 'success';
            var title = 'Success!!!';
            var message = $('<div>').html(response.message).text()
            if(response?.data?.start){
                data.start = response.data.start;
            }
            if(response?.data?.end){
                data.end = response.data.end;
            }
            
            if (type == 'scheduled') {
                scheduleTaskUpdate(data, response.id);
            } else if (type == 'rescheduled') {
                rescheduleTaskUpdate(data, response.id);
            } else if (type == 'unscheduled') {
                unscheduleTaskUpdate(response.id);
            } else {
                icon = 'error';
                title = 'Error!!!';
                message = 'Something went wrong'
            }
            refreshEngineers();
            Swal.fire({
                icon: icon,
                title: title,
                text: message
            })
        } else {
            await get_all_tasks();
            Swal.fire({
                icon: 'error',
                title: 'Error!!!',
                text: $('<div>').html(response.message).text()
            })
            handle_assignment_errors(type);
            // reinitCalendar(false);
        }
    }else{
        await get_all_tasks();
        Swal.fire({
            icon: 'error',
            title: 'Error!!!',
            text: $('<div>').html(response.message).text()
        })
        handle_assignment_errors(type);
        // reinitCalendar(false)
        // ajs_form_handler.show_errors_offcanvas(response);
    }
}
// -------------------------

function unscheduleTaskUpdate(task_id) {
    $newdata = $tasks.find(task => task.id === task_id);
    $newdata.allDay = false;
    $newdata.resource = null;
    $pending_tasks.push($newdata);
    $tasks = $tasks.filter(task => task.id !== task_id);//remove task from scheduled tasks array
    if (calType == 'mcalendar') {
        $initCalendar.setEvents($tasks);
    } else if (calType == 'mscheduler') {
        $initScheduler.setEvents($tasks);
    }
    displaySidebarTasks($pending_tasks);
}

function scheduleTaskUpdate(data, task_id) {
    $newdata = $pending_tasks.find(task => task.id === task_id);
    $newdata.start = data.start;
    $newdata.end = data.end;
    $newdata.slot = data.slot;
    $newdata.resource = data.resource;
    $("#md-task-cont #md-event-"+task_id).remove();
    $pending_tasks = $pending_tasks.filter(task => task.id !== task_id);//remove task from pending tasks array
    $tasks.push($newdata);
    if (calType == 'mcalendar') {
        $initCalendar.setEvents($tasks);
    } else if (calType == 'mscheduler') {
        $initScheduler.setEvents($tasks);
    }
    if ($pending_tasks.length < 1) {
        displaySidebarTasks($pending_tasks);
    }
}

function rescheduleTaskUpdate(data, task_id) {
    taskindex = $tasks.findIndex(task => task.id === task_id);
    if (taskindex >= 0) {
        $tasks[taskindex].start = formatDateTime(data.start);
        $tasks[taskindex].end = formatDateTime(data.end);
        $tasks[taskindex].resource = data.resource;
        $tasks[taskindex].slot = data.slot;
    }
    // if (calType == 'mcalendar') {
    //     $initCalendar.updateEvent(data);
    // } else if (calType == 'mscheduler') {
    //     $initScheduler.updateEvent(data);
    // }
    if (calType == 'mcalendar') {
        $initCalendar.setEvents($tasks);
    } else if (calType == 'mscheduler') {
        $initScheduler.setEvents($tasks);
    }
}
// Update Task end

// Engg Leaves popup start
let $leaveTitle = document.getElementById('leave-title');
let $leaveDesc = document.getElementById('leave-desc');
let $leaveEngg = document.getElementById('engg-leave');
// let $leaveType = document.querySelectorAll('input[name="leave_type"]');
let $leaveFrom = document.getElementById('leave-from');
let $leaveTo = document.getElementById('leave-to');
// let $leavePeriod = document.getElementById('leave-period');
// let leavePeriods = [{value: "first_half", text: "First Half"}, {value: "second_half", text: "Second Half"}];
// travelTimeGroup.style.display = 'none';
//     travelTime.value = 0;
// let $leavePeriodGroup = document.getElementById('leave-period-group');
// $leavePeriodGroup.style.display = 'none';

function clearLeaveForm() {
    $leaveTitle.value = '';
    $leaveDesc.value = '';
    $leaveEngg.setVal('');
    $('#leave-type-full').click();
    // $('#leave_period1,#leave_period2').prop("checked", false);
    $('#leaveToBox').show();
    $leaveDates.destroy();
    showDateRangePicker();
    // $leavePeriodGroup.style.display = 'none';
}
// function setLeavePeriods(){
//     $leavePeriod = $('#leave-period')
//             .mobiscroll()
//             .select({
//                 data: leavePeriods,
//                 display: 'anchored',
//                 touchUi: true,
//                 filter: false,
//             })
//             .mobiscroll('getInst');
//     $leavePeriod.setVal('');
// }

function setLeaveEngineers() {
    $leaveEngg = $('#engg-leave')
            .mobiscroll()
            .select({
                display: 'anchored',
                itemHeight: 34,
                data: $engineers,
                touchUi: false,
                filter: true,
                width: '18em',
                height: '200px',
                cssClass: "custom-dropdown"
            })
            .mobiscroll('getInst');
    $leaveEngg.setVal('');
}

let dateBlockEngg = {
    medium: {
        controls: ['calendar'],
        touchUi: false,
    },
};
let datetimeBlockEngg = {
    medium: {
        controls: ['calendar', 'time'],
        touchUi: false,
    },
};


let $reset_leave_popup = false;
let $enggBlockSlot = $('#block-engineer-slots').mobiscroll().popup({
    display: 'center',
    animation: 'slide-down',
    width: 600,
    contentPadding: 0,
    touchUi: true,
    headerText: 'Block Engineer Slots',
    closeOnOverlayClick: false,
    closeOnEsc: false,
    showOverlay: true,
    buttons: [
        {
            text: 'Block',
            cssClass: 'mbsc-popup-button-primary btn btn-success waves-effect waves-light',
            handler: async function () {
                $leave_staff_errors.innerHTML = '';
                var $formData = $('#staffLeaveBox').serialize();
                $formData += '&staff=' + $leaveEngg.getVal();
                // var leaveType = $('input[name="leave_type"]:checked').val();

                var error_msg = '';
                if ($.trim($leaveTitle.value).length < 1) {
                    error_msg = 'Leave title is required.';
                }
                // else if($.trim($leaveDesc.value).length < 1){
                //     error_msg = 'Leave description is required.';
                // }
                else if ($.trim($leaveEngg.getVal()).length < 1) {
                    error_msg = 'Engineer is required.';
                } 
                else if (!isValidDate($leaveFrom.value)) {
                    error_msg = "Please select a valid 'leave from' date.";
                } 
                else if (!isValidDate($leaveTo.value)) {
                    error_msg = "Please select a valid 'leave to' date.";
                }
                

                if (error_msg != '') {
                    mobiscroll.alert({
                        display: 'top',
                        title: "Validation Error.",
                        message: error_msg,
                    });
                    return false;
                } else {
                    await addStaffLeaves($formData);
                }
                if ($reset_leave_popup) {
                    clearLeaveForm();
                    $enggBlockSlot.close();
                }
            }
        }
    ]
}).mobiscroll('getInst');

function isValidDate(date) {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
}
let $leaveDates = '';
function showDateRangePicker() {
    $leaveDates = $('#leave-dates')
            .mobiscroll()
            .datepicker({
                controls: ['datetime'],
                select: 'range',
                startInput: '#leave-from',
                endInput: '#leave-to',
                showRangeLabels: false,
                touchUi: true,
                display: 'bubble',
                // responsive: datetimeBlockEngg,
                dateFormat: 'DD/MM/YYYY',// UK Date Format
                timeFormat: 'hh:mm A',
                dataTimezone: dataTimezone,
                displayTimezone: displayTimeZone,
                timezonePlugin: mobiscroll.momentTimezone,
                // showOnClick: false,
                // showOnFocus: false,
                onChange: function (args) {
                    // <!-- var date = args.value; -->
                },
            })
            .mobiscroll('getInst');
}

showDateRangePicker();

let $leave_staff_errors = document.getElementById('mbsc-staff-leave-errors');
$(document).on("click", "#block-engg-slot", function () {
    $leave_staff_errors.innerHTML = '';
    setLeaveEngineers();
    // setLeavePeriods();
    $enggBlockSlot.open();
    $leaveDates.setVal([new Date(), new Date()]);
})
// Engg Leaves popup end

var breadcrumbs = [
    {label: "Scheduler", url: null},
];
set_breadcrumb(breadcrumbs);

function refreshEngineers() {
    if (calType == 'mscheduler') {
        if($initScheduler != ''){
            let resourcesL = engstaff
            if(Object.keys(selectedResources).length > 0){
                resourcesL = engstaff.filter(function (r) {
                    return selectedResources[r.id];
                })
            }
            setTimeout(()=>{
                $initScheduler.setOptions({
                    resources: resourcesL,
                });
            },500)
        }
    } else if (calType == 'mcalendar') {
        let filteredEvents = $tasks;
        if(Object.keys(selectedResources).length > 0){
            filteredEvents = $tasks.filter(function (e) {
                return selectedResources[e.resource];
            });
        }
        if($initCalendar != ''){
            setTimeout(()=>{
                $initCalendar.setEvents(filteredEvents);
            },500)
        }
    }
}


function initTaskDraggable() {
    $('#md-task-cont .external-drop-task').not('.appt_task').each((ind, task) => {
        var targetID = $(task).attr('id');
        var event = $(task).data('drag-data');
        $('#' + targetID).mobiscroll().draggable({dragData: event});
    })
}

// save search result start
$(document).on('submit', '.save-search-box form', async function (e) {
    e.preventDefault();
    controlLoader('show')
    try {
        await ajs.ajax_form(site_url + "calendar/filter/save", $(this).serialize(), "POST", null, "0", "0", save_search_box, save_search_box);
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error!!!',
            text: 'Something went wrong.please try again...'
        })
    }
    controlLoader('hide');
    e.stopPropagation();
})
function save_search_box(response){
    if (ajs_form_handler.check_result(response)){
        const status = response.status;
        if (status) {
            Swal.fire({
                icon: 'success',
                title: 'Success!!!',
                text: 'Save search data successfully.'
            })
            document.querySelector('.save-search-box form').reset();
            $('#filter_data').val('');
            $('.save-search-box').hide();
            list_saved_filters();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error!!!',
                text: 'Save search failed.please try again...'
            })
        }
    }else{
        ajs_form_handler.show_errors_offcanvas(response);
    }
}
// save search result end


// Filters
async function applyFilters($target) {
    try {
        var $ref_id = $('#' + $target);
        if ($ref_id.attr('multiple') == 'multiple') {
            $ref_id = $('#' + $target).find('option:selected').map(function () {
                return $(this).val();
            }).get().join(',');
        } else {
            $ref_id = $('#' + $target).val();
        }
        var post_data = {id: $ref_id, type: $target};
        await ajs.ajax_form(site_url + "calendar/filter", post_data, "POST", null, "0", "0", apply_filters, apply_filters);
    } catch (error) {
        setTimeout(applyFilters, 2000);
    }
}
function apply_filters(response){
    if (ajs_form_handler.check_result(response)){
        const res = response.data;
        if (response.status) {
            var call = res.type;
            filters[call](res);
        } else {
            setTimeout(applyFilters, 2000);
        }
    }else{
        ajs_form_handler.show_errors_offcanvas(response);
    }
}
// -----------

function controlLoader(type) {
    loader_id = 'loader-main';
    if (type == 'show') {
        $('#' + loader_id).fadeIn(250);
    } else {
        $('#' + loader_id).fadeOut(250);
    }
}

$(document).on("click", "#clear-filters", function () {
    filters['clear']();
});

async function applysavedfilter(index) {
    if (typeof $search_list[index] !== 'undefined') {
        // controlLoader('show')
        var $data = JSON.parse($search_list[index].filters);
        if ('client_id_filter' in $data) {
            $('#client_id_filter').val($data.client).select2();
            await applyFilters('client_id_filter');
        }
        if ('contract_id_filter' in $data) {
            $('#contract_id_filter').val($data.contract).select2();
            await applyFilters('contract_id_filter');
        }
        if ('services_id_filter' in $data) {
            var servs = $data.services.split(',');
            $('#services_id_filter').val(servs).select2();
            await applyFilters('services_id_filter');
        }
        if ('engineers_id_filter' in $data) {
            var engss = $data.engineers.split(',');
            $('#engineers_id_filter').val(engss).select2();
        }
        setTimeout(function(){
            $('#apply-filters').click();
        },500)
    }
    // controlLoader('hide')
}

$(document).on("click", "#apply-filters", async function () {
    default_load = 0;
    queueFilter = 0;
    filterData = {};
    $multiQueue.val(null).multiselect("refresh");
    $("#multi-engineer").val(null).multiselect("refresh");
    $multiEngg = $("#engineers_id_filter");
    $("#queuesTab .queues").empty();
    $("#queuesTab .engineers").empty();
    $(".filter-box-tab").removeClass("active");
    $(".filter-box-tab.engineer").addClass("active");
    var is_valid = 0;
    if ($('#client_id_filter').val()) {
        client = $('#client_id_filter').val();
        filterData.client = client;
        is_valid = 1;
    }
    if ($('#contract_id_filter').val()) {
        contract = $('#contract_id_filter').val();
        filterData.contract = contract;
        is_valid = 1;
    }
    if ($('#services_id_filter').val() != '') {
        services = $('#services_id_filter').find('option:selected').map(function () {
            return $(this).val();
        }).get().join(',');
        filterData.services = services;
        is_valid = 1;
    }
    if ($('#engineers_id_filter').val() != '') {
        engineers = $('#engineers_id_filter').find('option:selected').map(function () {
            return $(this).val();
        }).get().join(',');
        filterData.engineers = engineers;
        is_valid = 1;
    }
    // if (is_valid == 0) {
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Validation Error!!!',
    //         text: 'To continue, please select at least one option from the available options.'
    //     })
    //     return false;
    // }
    $("#queuesTab").css("opacity", "1");
    reinitCalendar();
    $('#filter_data').val(JSON.stringify(filterData));
    // $('.save-search-box').show();
    $('#offcanvasFilters').offcanvas('hide');
    filterData = {};
});

$(document).on("change", "#client_id_filter,#contract_id_filter,#services_id_filter", async function () {
    var type = $(this).attr('id');
    if (type == 'client_id_filter') {
        init_dropdowns['contract']([], null);
        init_dropdowns['services']([], null);
        init_dropdowns['engineers']($all_engineers, null);
    } else if (type == 'contract_id_filter') {
        init_dropdowns['services']([], null);
        init_dropdowns['engineers']($all_engineers, null);
    } else if (type == 'services_id_filter') {
        init_dropdowns['engineers']($all_engineers, null);
    }
    await applyFilters(type);
})

async function listStaffLeaves() {
    var staff = $engineers.map(item => item.id).join(',');
    await ajs.ajax_form(site_url + 'staff-leaves/list', {staff}, "POST", null, "0", "0", staff_leaves_list, staff_leaves_list);
    
}
function staff_leaves_list(response){
    if (ajs_form_handler.check_result(response)){
        const status = response.status;
        if (status) {
            res = response.data;
            invalid = res.map(record => ({
                    ...record,
                    cssClass: 'md-lunch-break-class mbsc-flex'
                }));
        }
    }else{
        ajs_form_handler.show_errors_offcanvas(response);
    }
}
// ----------------------

async function addStaffLeaves(data) {
    controlLoader('show')
    try {
        await ajs.ajax_form(site_url + 'staff-leaves/add', data, "POST", null, "0", "0", staff_leave_add, staff_leave_add);
    } catch (error) {
        $reset_leave_popup = false;
        var icon = 'Error';
        var err_msg = "Something went wrong.please try again...";
        if (error.responseJSON && error.responseJSON.message) {
            err_msg = error.responseJSON.message;
        }
        $leave_staff_errors.innerHTML = `<b>${icon}: </b>${err_msg}`;
    }
    controlLoader('hide');
}
async function staff_leave_add(response){
    if (ajs_form_handler.check_result(response)){
        const status = response.status;
        if (status) {
            $reset_leave_popup = true;
            Swal.fire({
                icon: 'success',
                title: 'Success!!!',
                text: response.message
            })
            await listStaffLeaves();
            await reinitCalendar(false);
        } else {
            var icon = 'Error';
            var title = 'Error!!!';
            var message = response.message;
            $reset_leave_popup = false;
            $leave_staff_errors.innerHTML = `<b>${icon}: </b>${message}`;
        }
    }else{
        $reset_leave_popup = false;
        var icon = 'Error';
        var err_msg = "Something went wrong.please try again...";
        if (response.responseJSON && response.responseJSON.message) {
            err_msg = error.responseJSON.message;
        }
        $leave_staff_errors.innerHTML = `<b>${icon}: </b>${err_msg}`;
        ajs_form_handler.show_errors_offcanvas(response);
    }
}
// -----------------------

var $tooltip = $('#diary-details-popup');
var tooltip;

// On button click
$(document).on("mouseleave", ".view_diary_detail", function () {
    tooltip.close();
});

$(document).on("mouseenter", ".view_diary_detail", function () {
    var anchorEl = this;
    var detail = $(anchorEl).data('details');
    // $('#diary-details-engineer-name').text(detail.engg_name)
    $('#diary-assigned-jobs').text(detail.assigned_jobs)
    $('#diary-jobs-hours').text(detail.jobs_hours)
    $('#diary-completed-jobs').text(detail.completed_jobs)
    $('#diary-pending-jobs').text(detail.pending_jobs)
    $('#diary-overdue-jobs').text(detail.overdue_jobs)
    if (!tooltip) {
        tooltip = $tooltip.mobiscroll().popup({
            contentPadding: false,
            display: 'anchored',
            anchor: anchorEl,  // use the current button
            scrollLock: false,
            showOverlay: false,
            touchUi: true,
            width: 200
        }).mobiscroll('getInst');
    } else {
        tooltip.setOptions({
            anchor: anchorEl
        });
    }
    tooltip.open();
});
// *******************************************************************************************************************************
// default call start
$(document).ready(async function () {
    init();
})

async function init(){
    filterData = {};
    controlLoader('show')
    await get_all_engineers(); //get all engineers
    await get_all_queues(); //get all queues
    await get_all_tasks();
    applyFilters();
    fetch_default_filter(master_data_type);
    await listStaffLeaves();
    // await initCalendar();
    filters['refresh']();
    initTasks();
    // default_load = 0;
    controlLoader('hide');
}
// default call end
// reset
$(document).on("click", "#reset_filters", function (e) {
    e.preventDefault();

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to reset all filters?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reset',
      cancelButtonText: 'No, keep them',
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload();
        }
    });
});
// reset

// Search sidebar tasks start
let foundTask = [];
const $searchTasks = $("#search-sidebar-tasks");
$searchTasks.on("keyup click", function (e) {
    const searchText = $(this).val().trim().toLowerCase();
    const selected   = $multiQueue.find('option:selected').map((_, el) => $(el).val()).get();
    let should_search_queue = false;
    // if(selected.length <= 0){
    //     should_search_queue = false;
    // }
        foundTask = $pending_tasks.filter(task =>
            (task.title.toLowerCase().includes(searchText) || task.job_code.toLowerCase().includes(searchText))
        );
        // foundTask = $pending_tasks.filter(task =>
        //     (task.title.toLowerCase().includes(searchText) || task.job_code.toLowerCase().includes(searchText)) && selected.includes(String(task.queue)) == should_search_queue
        // );
    displaySidebarTasks(foundTask);//display tasks in sidebar
})
// Search sidebar tasks end

// Engineers code start
let selectedResources = {};
let $all_engineers = [];
// let enggDiaryData = [];
const s3Url = JSON.parse(ajs_form_handler.get_token('s3_url'));
async function get_all_engineers() { //Get All engineers Start
    try {
        await ajs.ajax_form(`${site_url}engineers/data/get`, null, "GET", null, "0", "0", load_all_engineers, load_all_engineers);
    } catch (error) {
        $('.queuesbox #lists').html("Something went wrong...");
        console.error('Error fetching queues:', error);
    }
}

let $multiEngg = $('#multi-engineer');
function load_all_engineers(response){
    if (ajs_form_handler.check_result(response)){
        $all_engineers = response.data;
        // enggDiaryData = response.data.diary_data;
        const selectBox = document.getElementById('multi-engineer');
        selectBox.innerHTML = '';
        $all_engineers.forEach(engg => {
            engg.img = engg.profile_pic ? `${s3Url}/${engg.profile_pic}` : '../assets/images/users/avatar-3.jpg';
            engg.eventOverlap = true;
            engg.text = $.trim(engg.username);
            engg.name = engg.text;
            engg.value = engg.id;

            const option = document.createElement('option');
            option.value = engg.id;
            option.textContent = engg.username;
            selectBox.appendChild(option);

            selectedResources[engg.id] = true;
        });

        $engineers = $all_engineers;
        engstaff = $engineers;

        $multiEngg.multiselect('destroy');
        $('#multi-engineer').multiselect({
            enableFiltering: true, // Enable search/filtering
            buttonWidth: '110px',
            nonSelectedText: 'Engineers',
            includeSelectAllOption: true,
            allSelectedText:"All Engineers",
            selectAllText: '<span>Select All</span>',
            buttonText: function (options, select) {
                if (options.length === 0) {
                    return 'All Engineers';
                }
                else if (options.length === 1) {
                    return '1 Engineer';
                } else {
                    let labels = [];
                    options.each(function () {
                        labels.push($(this).text());
                    });
                    return labels.length + ' Engineers';
                  }
            },
            enableHTML: true,
            optionLabel: function (element) {
                  return `<span>${$(element).text()}</span>`;
            },
            templates: {
                button: '<button type="button" class="multiselect multiengineers dropdown-toggle btn btn-info" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
            },
            onInitialized: function($select, container) {
                const $applyBtn2 = $('<li class="multiselect-item multiselect-apply-btn mt-1"><button class="btn btn-primary btn-sm p-0 pt-1 pb-1 ps-2 pe-2">Apply</button></li>');
                    container.find('ul.multiselect-container').append($applyBtn2);

                $applyBtn2.on('click', function(e) {
                    e.stopPropagation();
                    container.find('.dropdown-toggle').dropdown('toggle');
                    multi_engineer();
                });
            }
        });
        $('[data-bs-toggle="tooltip"]').tooltip();
    }else{
        ajs_form_handler.show_errors_offcanvas(response);
        setTimeout(get_all_engineers, 5000);
    }
}

function multi_engineer()
{
    selectedResources = {};
    const $enggBox   = $('#display-filters .engineers').empty();
    const selected    = $multiEngg.find('option:selected').map((_, el) => $(el).val()).get();
    
    const badgeFragment2 = $(document.createDocumentFragment());
    selected.forEach((val) => {
        selectedResources[val] = true;
        const $opt = $multiEngg.find(`option[value="${val}"]`);
        const $badge2 = $(`
            <span class="btn position-relative border border-primary text-primary mt-2 me-3 engineer" data-val="${val}">
                ${$opt.text()}
                <a href="javascript:void(0)" class="badge-close">
                <span class="position-absolute right-0 start-100 translate-middle badge rounded-pill bg-light text-secondary border border-secondary close">
                    &times;
                </span>
                </a>
            </span>
            `);
        badgeFragment2.append($badge2);
    });
    $enggBox.append(badgeFragment2);
    refreshEngineers();
}
// Engineers code end

// Queues code start
let $queues = [];
async function get_all_queues() { //Get All Queues Start
    try {
        await ajs.ajax_form(fetchAllQueues, null, "GET", null, "0", "0", load_all_queues, load_all_queues);
    } catch (error) {
        $('.queuesbox #lists').html("Something went wrong...");
        console.error('Error fetching queues:', error);
    }
}

const $multiQueue = $('#multi-queue');
function load_all_queues(response){
    if (ajs_form_handler.check_result(response)){
        const res = response.message.data;
        $queues = res.map(que => ({
            id: que.id,
            title: que.title,
            description: que.description
        }));

        const selectBox = document.getElementById('multi-queue');
        selectBox.innerHTML = '';
        res.forEach(que => {
            const option = document.createElement('option');
            option.value = que.id;
            option.textContent = que.title;
            selectBox.appendChild(option);
        });

        $multiQueue.multiselect('destroy');
        $multiQueue.multiselect({
            enableFiltering: true, // Enable search/filtering
            buttonWidth: '110px',
            nonSelectedText: 'Queues',
            includeSelectAllOption: true,
            allSelectedText:"All selected",
            selectAllText: '<span>Select All</span>',
            enableHTML: true,
            templates: {
                button: '<button type="button" class="multiselect multiqueue dropdown-toggle btn btn-primary" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
            },            
            buttonText: function (options, select) {
                if (options.length === 0) return 'All Queues';
                if (options.length === 1) return '1 Queue';
                return `${options.length} Queues`;
            },
            optionLabel: function (element) {
                return `<span>${$(element).text()}</span>`;
            },
            onInitialized: function($select, container) {
                const $applyBtn = $('<li class="multiselect-item multiselect-apply-btn mt-1"><button class="btn btn-primary btn-sm p-0 pt-1 pb-1 ps-2 pe-2">Apply</button></li>');
                    container.find('ul.multiselect-container').append($applyBtn);

                $applyBtn.on('click', function(e) {
                    e.stopPropagation();
                    container.find('.dropdown-toggle').dropdown('toggle');
                    default_load = 0;
                    multi_queue();
                });
            }
        });
    }else{
        $('.queuesbox #lists').html("Something went wrong...");
    }
}

let queueFilter = 0;
async function multi_queue() {
  filterData = {}
  const $queueBox   = $('#display-filters .queues').empty();
  const selected    = $multiQueue.find('option:selected').map((_, el) => $(el).val()).get();
  
  const badgeFragment = $(document.createDocumentFragment());
  selected.forEach((val) => {
    const $opt = $multiQueue.find(`option[value="${val}"]`);
    const $badge = $(`
      <span class="btn position-relative border border-primary text-primary mt-2 me-3 queue"
            data-val="${val}">
        ${$opt.text()}
        <a href="javascript:void(0)" class="badge-close">
          <span class="position-absolute right-0 start-100 translate-middle badge rounded-pill bg-light text-secondary border border-secondary close">
            &times;
          </span>
        </a>
      </span>
    `);
    badgeFragment.append($badge);
  });
  $queueBox.append(badgeFragment);
  $multiEngg = $('#multi-engineer');
  $("#queuesTab").css("opacity", "1");
  $(".filter-box-tab").removeClass("active");
  $(".filter-box-tab.queue").addClass("active");
  applyFilters()
  controlLoader("show")
  queueFilter = selected;
  await get_all_tasks(selected);
  // await initCalendar();
  reinitCalendar(false)
  initTasks();
  controlLoader("hide")
  // const tasksToShow = selected.length ? $pending_tasks.filter(t => selected.includes(String(t.queue))) : $pending_tasks;
  // displaySidebarTasks(tasksToShow);
  $searchTasks.click();
}
// Queues code end

// Queues & Enginner Filter
$(document).on("click","#display-filters .scheduler-filter span a",function(){
    var $target = $(this).parent();
    var $val = $target.data('val');
    if($target.hasClass('engineer')){
        $multiEngg.multiselect('deselect', $val);
        multi_engineer();
        $target.remove();
    }
    else if($target.hasClass('queue')){
        $multiQueue.multiselect('deselect', $val);
        multi_queue();
        $target.remove();
    }
})
// Queues & Enginner Filter

const init_dropdowns = {
    client: function (data, value) {
        init_styles("client_id_filter", "Clients", "All Clients", false, data, value);
    },
    contract: function (data, value) {
        init_styles("contract_id_filter", "Contracts", "All Contracts", false, data, value);
    },
    services: function (data, value) {
        init_styles("services_id_filter", "Job Types", "All Job Types", true, data, value);
    },
    engineers: function (data, value) {
        init_styles("engineers_id_filter", "Engineers", "All Engineers", true, data, value);
    },
}

function init_styles(target, dtext, atext, allbtn = false, options = [], value){
    let $target = $(`#${target}`);
    $target.empty();
    $target.multiselect('destroy');

    options.forEach(item => {
      $target.append(new Option(item.text, item.id));
    });

    $target.multiselect({
            enableFiltering: true,
            buttonWidth: '110px',
            nonSelectedText: dtext,
            includeSelectAllOption: allbtn,
            allSelectedText: atext,
            selectAllText: '<span>Select All</span>',
            buttonText: function (options, select) {
                if (options.length === 0) {
                    return atext;
                }
                else if (options.length === 1) {
                    if(allbtn){
                        return '1 '+dtext;
                    }
                    return options[0].label || $(options[0]).text();
                } else {
                    let labels = [];
                    options.each(function () {
                        labels.push($(this).text());
                    });
                    return labels.length + ' '+ dtext;
                  }
            },
            enableHTML: true,
            optionLabel: function (element) {
                  return `<span>${$(element).text()}</span>`;
            },
            templates: {
                button: '<button type="button" class="multiselect dropdown-toggle btn btn-primary" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
            }
        });
    $target.val(value).multiselect("refresh");
}



$(document).on("change", "#engineers_id_filter", function(){
    selectedResources = {};
    const $enggBox   = $('#display-filters .engineers').empty();
    const selected    = $multiEngg.find('option:selected').map((_, el) => $(el).val()).get();
    
    const badgeFragment2 = $(document.createDocumentFragment());
    selected.forEach((val) => {
        selectedResources[val] = true;
        const $opt = $multiEngg.find(`option[value="${val}"]`);
        const $badge2 = $(`
            <span class="btn position-relative border border-primary text-primary mt-2 me-3 engineer" data-val="${val}">
                ${$opt.text()}
                <a href="javascript:void(0)" class="badge-close">
                <span class="position-absolute right-0 start-100 translate-middle badge rounded-pill bg-light text-secondary border border-secondary close">
                    &times;
                </span>
                </a>
            </span>
            `);
        badgeFragment2.append($badge2);
    });
    $enggBox.append(badgeFragment2);
    refreshEngineers();
})


function apply_default_filter(result_json){
    filterData = {};
    if (ajs_form_handler.check_result(result_json))
    {
        if (result_json.message == 'success')
        {
            default_load = 0;
            $multiEngg = $("#engineers_id_filter");
            if (typeof result_json.filter !== 'undefined')
            {
                var filter_value = JSON.parse(result_json.filter.filter_value);
                if (typeof filter_value.filters !== 'undefined')
                {
                    var filters_list = filter_value.filters;
                    $.each(filters_list, function (index, data) {
                        var key = index;
                        var qpara = data;
                        var key2 = key.replace("_id", "");
                        $('#form_filters').find('#' + key + '_filter').val(data).trigger('change');
                        if(typeof data != 'string'){
                            qpara = data.join(",");
                        }
                        filterData[key2] = qpara;
                    })
                    filters['refresh']();
                }
            }
        }
    }
    reinitCalendar(true)
    if ($('#search_preset_list_div').length)
    {
        get_user_filters(master_data_type);
    }
}
