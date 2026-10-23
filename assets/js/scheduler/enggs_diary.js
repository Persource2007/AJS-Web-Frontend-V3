var master_data_type = 'enggs_diary';
dataTable = null;
let displaySelection = $("#selectdMonth");
function load_data_table(limit, search_term, filters)
{
    data_filters = '';
    page_limit = ajs.datatable_limit;
    search = '';
    if (typeof filters != 'undefined' && (typeof filters['filters'] !== 'undefined' || filters['filters'] != null))
    {
        data_filters = filters['filters'];
    }
    if (typeof limit !== 'undefined' || limit != null)
    {
        page_limit = limit;
    }
    if (typeof search_term !== 'undefined' || search_term != null)
    {
        search = search_term;
    }

    dataTable = new DataTable("#enggs-diary-datatable", {
        scrollCollapse: !0,
        scrollX: true,
        scrollCollapse: !0,
        serverSide: true,
        processing: true,
        paging: true,
        responsive:false,
        bDestroy: true,
        pageLength: page_limit,
        search: {
            search: search
        },
        // dom: 'Bfrtip',
        buttons: [
            'excel'
        ],
        ajax: {
            url: site_url + "engineers/diary/get",
            method: "GET",
            async: false,
            dataSrc: 'data',
            "data": function (d) {
                return $.extend({}, d, {
                    data_filters
                });
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            error: function (xhr) {
                ajs.datatable_error(xhr, "ajax-datatables");
            }
        },
        language: {
            emptyTable: "No data found",
        },
        columns: [
            {
                name: "id",
                data: "id",
                visible: false,
                searchable: false,
                render: function (data, type, row) {
                    return row.id;
                }
            },
            {
                name: "",
                data: "",
                className: "dotIcon",
                sortable: false,
                render: function (data, type, row) {
                    let is_available_class = (isEmpty(row.latitude) || isEmpty(row.longitude)) ? 'emergency-task-icon' : 'near-engineering-icon';
                    return `<i class="mdi mdi-circle fs-11 align-middle me-1 ${is_available_class}"></i>`;
                }
            },
            {
                name: "first_name",
                data: "first_name",
                render: function (data, type, row) {
                    return "<span class='text-capitalize'>"+row.first_name + " " + row.last_name+"</span>";
                }
            },
            {
                name: "assigned_jobs",
                data: "assigned_jobs",
                className: "text-end",
                render: function (data, type, row) {
                    return link_task_details(data, row.assigned_jobs_ids);
                }
            },
            {
                name: "jobs_hours",
                data: "jobs_hours",
                className: "text-end",
                render: function (data, type, row) {
                    return showSecToHours(data);
                }
            },
            {
                name: "completed_jobs",
                data: "completed_jobs",
                className: "text-end",
                render: function (data, type, row) {
                    return link_task_details(data, row.completed_jobs_ids);
                }
            },
            {
                name: "pending_jobs",
                data: "pending_jobs",
                className: "text-end",
                render: function (data, type, row) {
                    return link_task_details(data, row.pending_jobs_ids);
                }
            },
            {
                name: "overdue_jobs",
                data: "overdue_jobs",
                className: "text-end",
                render: function (data, type, row) {
                    return link_task_details(data, row.overdue_jobs_ids);
                }
            },
            {
                name: "inprogress_jobs",
                data: "inprogress_jobs",
                className: "text-end",
                createdCell: function (td) {
                    td.style.whiteSpace = 'normal';
                },
                render: function (data, type, row) {
                    return link_task_details(data, row.inprogress_jobs_ids) + "<span class='ms-2 badge border text-capitalize border-link-primary'>Started</span";
                }
            },
            {
                name: "",
                data: "",
                className: "text-center",
                sortable: false,
                render: function (data, type, row) {
                    return `<p class="mb-0 p-2"><a href="javascript:;" data-id="${row.id}" data-type="${row.user_type}"  class="send-notification add-btn"><i class="ri-message-line fs-18"></i></a></p>`
                }
            },
            {
                name: "",
                data: "",
                sortable: false,
                render: function (data, type, row) {
                    var totalAssigned = row.assigned_jobs + row.overdue_jobs;
                    $percent = Math.round(totalAssigned > 0 ? ((row.completed_jobs / totalAssigned) * 100) : 0);
                    percent_text = $percent+"%";
                    if($percent < 1){
                        percent_text = "";
                    }
                    return `${percent_text}<div class='progress' role='progressbar' aria-valuenow='${$percent}' aria-valuemin='0' aria-valuemax='100'>
                                <div class='progress-bar' style='width: ${$percent}%;'></div>
                            </div>`
                }
            }
        ],
        order: [
            ['0', 'desc']
        ],
        drawCallback: function () {
            ajs.apply_ind_roles('Scheduling');
        }
    });

    dataTable.buttons().container().appendTo($('#datatable_buttons'));
    setMonthSelection();
}

if ($('#enggs-diary-datatable').length)
{
    fetch_default_filter(master_data_type);
    var breadcrumbs = [
        {label : 'Engineer Job Status', url:null}
    ];
    select2_ajax('#skill_id_filter', site_url + 'skill/get_all', 'title', null);
    const now = new Date();
    const defSel = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2, '0')}`;
    for(let i=0; i<12; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const val = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2, '0')}`;
        const txt = `${d.toLocaleString('default', { month: 'long' })} ${d.getFullYear()}`;
        $('#srhmonth').append(`<option value="${val}">${txt}</option>`);
    }
    $("#srhmonth").val(defSel).select2();
    setMonthSelection();
    set_breadcrumb(breadcrumbs);
}

$(document).on('click', '.send-notification', function (e) {
        e.stopPropagation();
        ajs.show_loader();
        var id = $(this).data('id');
        var type_id = $(this).data('type');
        notification_user_ids.push(id);
        $('#user_type').val(type_id);
        var form_link = cdn_url+"notification/create?in_popup=1";
        ajs.showOffCanvasFormRight(form_link, 'Send Notification', 'send_notification');
        ajs.hide_loader();
        return false;
});

function setMonthSelection(){
    let val = $("#srhmonth option:selected").text();
    displaySelection.text(val)
}

function link_task_details(value, tasks){
    // var rlink = value ? "" : "text-muted";
    return `<a href="${cdn_url}tasks/list" data-tasks="${tasks}" class="link task-details-open" target="_blank">${value}</a>`;
}

$(document).on("click", "a.task-details-open", function(e){
    e.preventDefault();
    e.stopPropagation();
    var tasks = $(this).data('tasks');
    if(tasks != '' && tasks != null){
        ajs_form_handler.store_token("view-task-detail", tasks)
        var wWidth = window.innerWidth-80;
        var wHeight = window.innerHeight;

        window.open($(this).attr("href"),'_blank');
    }
})
ajs.apply_ind_roles('Scheduling');
