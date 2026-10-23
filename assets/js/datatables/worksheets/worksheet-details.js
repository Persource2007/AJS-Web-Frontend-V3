var master_data_type = "worksheet_details";
dataTable = null;

function load_data_table(limit, search_term, filters) {

    data_filters = {};
    page_limit = ajs.datatable_limit;
    search = "";    
    if (typeof filters != "undefined" && (typeof filters["filters"] !== "undefined" || filters["filters"] != null) ) {
        data_filters = filters["filters"];
    }
    if (typeof limit !== "undefined" || limit != null) {
        page_limit = limit;
    }
    if (typeof search_term !== "undefined" || search_term != null) {
        search = search_term;
    }

    dataTable = new DataTable("#worksheet-details-datatables", {
        //scrollY: (screen.height - 470) + 'px',
        scrollCollapse: !0,
        scrollX: true, 
        autoWidth: false,
        searching: false,
        serverSide: true,
        processing: true,
        paging: true,
        responsive: false,
        bDestroy: true,
        //responsive: false,
        pageLength: page_limit,
        search: {
            search: search,
        },
        // dom: "Bfrt<'row ps-3 pe-3 pb-3'<'col-sm-12 col-md-5' i><'col-sm-12 col-md-7' p>>",
        // // buttons: ["excel"],
        ajax: {
            url: site_url + "worksheet/tasks-detail-list",
            method: "GET",
            async: false,
            dataSrc: "data",
            data: function (d) {
                d.request_id = ajs.hash_decode(worksheetId);
                return $.extend({}, d, {
                    data_filters,
                });
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            error: function (xhr, error, code) {
                ajs.datatable_error(xhr, "worksheet-details-datatables");
            }
        },
        language: {
            emptyTable: "No data found",
        },
        columns: [
            {
                name: "null",
                data: "null",
                searchable: false,
                orderable: false,
                render: function(data,type,row){
                    var classname = 'selected_tasks';
                    var attribute = '';
                    if(row.timsheet_status != 'pending'){
                        classname = '';
                        attribute = 'disabled';
                    }
                    // return (`<input class="form-check-input approve-btn ${classname}" type="checkbox" id="job${row.id}" value="${ajs.hash_encode(row.id)}" ${attribute}/>`);
                    var action = `<input class="form-check-input me-1 approve-btn ${classname}" type="checkbox" id="job${row.id}" value="${ajs.hash_encode(row.id)}" ${attribute}/>`;
                        if(row.is_prev_rejected == '1'){
                            action +=`<a class='waves-effect waves-light view-approval-info me-1' data-task-target="${row.id}" data-heading="Task Approval Information" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight2" aria-controls="offcanvasFilters" ><i class="ri-error-warning-fill org-color align-bottom primary-btn fs-15 "></i></a>`;
                        }
                        if(row.timsheet_status == 'pending'){
                            action += (`<button type="button" class="btn btn-sm btn-success approve-btn approve-job-task text-capitalize worksheet-approve-btn me-1" data-task="${ajs.hash_encode(row.id)}"><i class="ri-check-line fs-14"></i>&nbsp;CTP</button>
                                    <button type="button" class="btn btn-sm btn-danger reject-btn reject-job-task text-capitalize worksheet-approve-btn me-1" data-task="${ajs.hash_encode(row.id)}"><i class="ri-close-line fs-14"></i>&nbsp;Reject</button>`);
                        }else{
                            action += status_label(row.timsheet_status);
                        }
                    return action;
                }
            },  
            {
                name: "id",
                data: "id",
                visible: false,
                searchable: false,
            },
            // {
            //     data: null,
            //     searchable: false,
            //     orderable: false,
            //     render: function (data, type, row) {
            //         if(row.timsheet_status == 'pending'){
            //             return (`<button type="button" class="btn btn-sm btn-success approve-btn approve-job-task text-capitalize worksheet-approve-btn" data-task="${ajs.hash_encode(row.id)}"><i class="ri-check-line fs-14"></i>&nbsp;Approve</button>
            //                     <button type="button" class="btn btn-sm btn-danger reject-btn reject-job-task text-capitalize worksheet-approve-btn ms-1" data-task="${ajs.hash_encode(row.id)}"><i class="ri-close-line fs-14"></i>&nbsp;Reject</button>`);
            //         }else{
            //             return status_label(row.timsheet_status);
            //         }
            //     },
            // },          
            {
                name: "job_no",
                data: "job_no",
            },
	    {
                data: "sors",
                name: "sors",
                render: function(data,type,row){
                    return `<a target="_blank" href="${cdn_url}job/details/${ajs.hash_encode(row.sor_action)}">${data}</a>`;
                }
            },
            {
                name: "is_payable",
                data: "is_payable",
                render: function (data, type, row) {
                    var pay_msg = row.is_payable == 1 ? "Yes" : "No";
                    var cls = row.is_payable == 1 ? "success" : "danger";
                    return `<span class="badge border border-${cls} text-${cls}">${pay_msg}</span>`;
                },
            }, 
            {
                name: "task_code",
                data: "task_code",
                render: function (data, type, row) {
                    var str = "";
                    var element_id = "task_id_"+row.id;
                    str +=
                            `<div class="d-flex">
                                <div class="avatar-group ps-0 align-items-center">
                                <input type="hidden" id="${element_id}" value="${row.job_task_id}" />
                                <a href="javascript: void(0);" data-heading="View Task" data-element="${element_id}"  data-after-load-func="view_task_details" data-form-url="` + task_detail_url(row.job_task_id) + `" class="avatar-group-item task-detail-window-button ps-0" data-bs-toggle="tooltip" data-bs-trigger="hover"   data-bs-placement="top" title="#` +
                            data +
                            `" style="display:block !important">` +
                            data +
                            `</a>
                                </div>
                            </div>`;

                    return str;
                },
            }, 
            {
                name: "task_title",
                data: "task_title",
            },  
            {
                name: "contract",
                data: "contract",
            },
            {
                name: "job_type",
                data: "job_type",
            },           
            {
                data: "attend_on",
                name: "attend_on",
                render: function (data) {
                    return ajs.format_date(data);
                }
            },
            {
                name: "events",
                data: "events",
                className: "pricing-col",
            },            
            // {
            //     data: "finish_date",
            //     name: "finish_date",
            //     render: function (data) {
            //         return ajs.format_date(data);
            //     }
            // },
            {
                name: "engg_name",
                data: "engg_name",
                // render: function(data,type,row){
                //     var profile = row.profile_pic ? `${s3_url}/${row.profile_pic}` : cdn_url + 'assets/images/users/avatar-3.jpg';
                //     return (`<div class="d-flex">
                //                     <div class="avatar-group">
                //                         <img src="${profile}" alt="" class="rounded-circle avatar-xxs me-2" />
                //                         ${data}
                //                     </div>
                //                 </div>`);
                // }
            },
            {
                name: "certificates",
                data: "certificates",
                className: "pricing-col",
            },
            {
                name: "certi_status",
                data: "certi_status",
                render: function(data){
                    return `<b>${data}</b>`;
                }
            },
            {
                name: "sell_price",
                data: "sell_price",
                className: "pricing-col",
                render: function(data){
                    return data.toFixed(2);
                }
            },
            {
                name: "labour_price",
                data: "labour_price",
                className: "pricing-col",
                render: function(data){
                    return data.toFixed(2);
                }
            },
            {
                name: "material_price",
                data: "material_price",
                className: "pricing-col",
                render: function(data){
                    return data.toFixed(2);
                }
            },
            {
                name: "margin",
                data: "margin",
                render: function(data,type,row){
                    margin = calculateMargin(parseFloat(row.material_price), parseFloat(row.labour_price), parseFloat(row.sell_price));
                    var colorCode = 'green';
                    if(margin < 0){
                        colorCode = 'red';
                    }
                    return `<span style="color:${colorCode}">${margin}%</span>`;
                    // return (((parseFloat(row.sell_price) - (parseFloat(row.labour_price) + parseFloat(row.material_price))) / parseFloat(row.sell_price)) * 100).toFixed(2) + '%';

                }
            },
            {
                name: "task_status",
                data: "task_status",
                render: function(data){
                    return status_label(data);
                }
            },
            
        ],
        order: [["1", "desc"]],
        drawCallback: function () {
            ajs.apply_ind_roles("Worksheets");
        }
    });

    // dataTable.buttons().container().appendTo($("#datatable_buttons"));
}

function calculateMargin(materialPrice, labourPrice, sellingPrice)
{
    $totalCost = materialPrice + labourPrice;
    $profit = sellingPrice - $totalCost;
    if ($totalCost == 0) {
        return '0.00'; 
    }
    $margin = ($profit / $totalCost) * 100;
    return $margin.toFixed(2);
}

if ($("#worksheet-details-datatables").length) {
    fetch_default_filter(master_data_type);
    var breadcrumbs = [
        {label: 'Engineer CTP', url: 'javascript: void(0);'},
        {label: 'Worksheet', url: cdn_url + 'worksheet/awaiting-approval-list'},
        {label: 'Worksheet Details', url: null}
    ];
    set_breadcrumb(breadcrumbs);
}

function status_label(value) {
    if (value == null) {
        return "-";
    }

    var icon = `<span class="badge border border-primary text-primary text-capitalize">${value}</span>`;
    if (value == '0' || value.toLowerCase() == 'open')
    {
        icon = `<span class="badge  border border-indigo text-indigo  text-capitalize">Open</span>`;
    } 
    else if (value == '0' || value.toLowerCase() == 'pending')
    {
        icon = `<span class="badge  border text-capitalize border-warning text-warning" >Pending</span>`;
    } 
    else if (value == '1' || value.toLowerCase() == 'complete' || value.toLowerCase() == 'completed' || value.toLowerCase() == 'task complete')
    {
        icon = `<span  class="badge  border border-success text-success  text-capitalize">Complete</span>`;
    } 
    else if (value == '2' || value.toLowerCase() == 'rejected' || value == '3')
    {
        icon = `<span class="badge  border border-danger text-danger  text-capitalize" >Rejected</span>`;
    } 
    else if (value.toLowerCase() == 'cancelled')
    {
        icon = `<span class="badge  border border-danger text-danger  text-capitalize" >Cancelled</span>`;
    } 
    else if (value.toLowerCase() == 'approved')
    {
        icon = `<span class="badge  border border-success text-success  text-capitalize">Approved</span>`;

    } 
    else if (value.toLowerCase() == 'in progress')
    {
        icon = `<span class="badge border border-indigo text-indigo  text-capitalize">In Progress</span>`;
    } 
    else if (value.toLowerCase() == 'abandoned' || value.toLowerCase() == 'task abandoned')
    {
        icon = `<span class="badge border border-danger text-danger  text-capitalize">Abandoned</span>`;
    } 
    else if (value.toLowerCase() == 'h&s fail')
    {
        icon = `<span class="badge border border-danger text-danger  text-capitalize">H&S Failed</span>`;
    } 
    else if (value.toLowerCase() == 'asbestos fail')
    {
        icon = `<span class="badge border border-danger text-danger  text-capitalize">Asbestos Failed</span>`;
    } 
    else if (value.toLowerCase() == 'no access')
    {
        icon = `<span class="badge border border-warning text-warning  text-capitalize">No Access</span>`;
    } 
    else if (value.toLowerCase() == 'further works')
    {
        icon = `<span class="badge border border-indigo text-indigo  text-capitalize">Further Works</span>`;
    } 
    else if (value.toLowerCase() == 'materials required')
    {
        icon = `<span class="badge border border-indigo text-indigo  text-capitalize">Materials Required</span>`;
    }
    else if (value.toLowerCase() == 'start task')
    {
        icon = `<span class="badge border border-indigo text-indigo  text-capitalize">Start Task</span>`;
    }

    return icon;
}

// function create_breadcrumb(result_json)
// {
//     if (ajs_form_handler.check_result(result_json)) {
//         var worksheet = result_json.data;

//         var breadcrumbs = [
//             {label: 'Jobs', url: 'javascript: void(0);'},
//             {label: 'Worksheet', url: cdn_url + 'worksheet/awaiting-approval-list'},
//             {label: worksheet.batch_no, url: null}
//         ];

//         set_breadcrumb(breadcrumbs);

//     } else {
//         ajs_form_handler.show_errors(result_json);
//     }
// }

$(function () {
    $(".fold-table tr.view").on("click", function () {
        $(this).toggleClass("open").next(".fold").toggleClass("open");
    });
});
let columnIdx = -1;
$(document).on("change","#marginShow",()=>{
    let $target = $("#worksheet-details-datatables");
    if(columnIdx == -1){
        columnIdx = $target.find("thead th.manage-margin").index();
    }
    let column = dataTable.column(columnIdx+1);
    column.visible(!column.visible());
})

// Select/deselect All 
$(document).on("change","input.selected_tasks",function(){
    var total = $("input.selected_tasks").length;
    var selected = $("input.selected_tasks:checked").length;
    if(total == selected){
        $("input.allselect").prop("checked",true);
    }else{
        $("input.allselect").prop("checked",false);
    }
});

$(document).on("change","input.allselect",function(){
    if($(this).is(":checked")){
        $("input.selected_tasks").prop("checked",true);
    }else{
        $("input.selected_tasks").prop("checked",false);
    }
});
// Select/deselect All 

// reject job task
$(document).on("click","button.reject-job-task",function(e){
    e.preventDefault();
    var $taskId = $(this).attr('data-task');
    Swal.fire({
        title: "Reject Job Task",
        text: "Please provide a reason for rejecting this job task.",
        icon: "error",
        input: "text",
        inputAttributes: {
        autocapitalize: "off",
        placeholder: "Enter message..."
        },
        showCancelButton: true,
        confirmButtonText: "Reject",
        customClass: {
        confirmButton: "swal2-deny",
        },
        showLoaderOnConfirm: true,
        preConfirm: async (message) => {
            if($.trim(message) == ''){
                return Swal.showValidationMessage(`<strong>Error: </strong> Please enter message.`);
            }
        try {
            const requetUrl = `${site_url}worksheet/task/reject/${ajs.hash_decode($taskId)}`;
            const response = await ajaxWithRefresh({
                type: 'POST',
                url: requetUrl,
                data:{message},
            });
                if (response.status == false) {
                return Swal.showValidationMessage(`
                    <strong>Error: </strong>${response.message}
                `);
                }
                return response;
        } catch (error) {
            var errorMsg = "Something went wrong.please try again...";
            if('responseJSON' in error){
                errorMsg = $(`<div>${error.responseJSON.message}</div>`).text();
            }
            Swal.showValidationMessage(`<strong>Error: </strong> ${errorMsg}`);
        }
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed && result.value.status) {
        Swal.fire({
            // title: `Success!!`,
            icon: "success",
            text: result.value.message
        });
        ajs.refreshDataTable();//reload data
        }
    });
});
// reject job task

// approve job task
$(document).on("click","button.approve-job-task",function(e){
    e.preventDefault();
    var $taskId = $(this).attr('data-task');
    var $textMsg = "Are you sure you want to approve this job task?";
    let requetUrl = `${site_url}worksheet/task/approve/${ajs.hash_decode($taskId)}`;
    var req_data = {};
    var selected_jobs = [];
    if($(this).hasClass("multiapprove")){
        requetUrl = `${site_url}worksheet/tasks/approve`;
        $("input.selected_tasks:checked").each(function(){
            selected_jobs.push(ajs.hash_decode($(this).val()));
        })
        if(selected_jobs.length < 1){
            Swal.fire({
                title: "Validation Error",
                icon: "error",
                text: "Please select at least one task.",
            });
            return false;
        }
        $textMsg = `Are you sure you want to approve all ${selected_jobs.length} selected job tasks?`;
        if(selected_jobs.length <= 1){
            $textMsg = `Are you sure you want to approve ${selected_jobs.length} selected job task?`;
        }
        req_data.tasks = selected_jobs.join(",");
    }
    Swal.fire({
        title: "Confirmation Required",
        icon: "success",
        text: $textMsg,
        // input: "radio",
        // inputOptions: {"yes": "Is Payable","no": "Is Not Payable"},
        // inputValue: "yes",
        showCancelButton: true,
        confirmButtonText: "Approve",
        showLoaderOnConfirm: true,
        confirmButtonColor: "#157347",
        preConfirm: async (status) => {
        // req_data.status = status;
        try {                        
            const response = await ajaxWithRefresh({
                type: 'POST',
                url: requetUrl,
                data:req_data,
            });
                if (response.status == false) {
                return Swal.showValidationMessage(`
                    <strong>Error: </strong>${response.message}
                `);
                }
                return response;
        } catch (error) {
            var errorMsg = "Something went wrong.please try again...";
            if('responseJSON' in error){
                errorMsg = $(`<div>${error.responseJSON.message}</div>`).text();
            }
            Swal.showValidationMessage(`<strong>Error: </strong> ${errorMsg}`);
        }
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed && result.value.status) {
        Swal.fire({
            // title: `Success!!`,
            icon: "success",
            text: result.value.message
        });
        ajs.refreshDataTable();//reload data
        }
    });
});
// approve job task
// $(function () {
//     var id = ajs.hash_decode(worksheetId);
// 	if (id) {
// 		ajs.ajax_form(site_url + 'timesheet/get/' + id, null, 'GET', null, '0', '0', create_breadcrumb, create_breadcrumb);
// 	}
// });

document.addEventListener("DOMContentLoaded", function () {
    const tableContainer = document.querySelector("#worksheet-details-datatables"); // Replace with the actual parent container ID or class
    let lastChecked = null;

    tableContainer.addEventListener("click", function (e) {
        // Check if the clicked element is a checkbox with the class "selected_tasks"
        if (e.target && e.target.classList.contains("selected_tasks")) {
            const checkboxes = Array.from(
                tableContainer.querySelectorAll(".selected_tasks")
            );

            // Check if Shift key is pressed and there is a last checked checkbox
            if (e.shiftKey && lastChecked) {
                const start = Math.min(
                    checkboxes.indexOf(e.target),
                    checkboxes.indexOf(lastChecked)
                );
                const end = Math.max(
                    checkboxes.indexOf(e.target),
                    checkboxes.indexOf(lastChecked)
                );

                // Select all checkboxes between the start and end indices
                for (let i = start; i <= end; i++) {
                    checkboxes[i].checked = lastChecked.checked;
                }
            }

            // Update the last checked checkbox
            lastChecked = e.target;
        }
    });
});


["keyup","keydown"].forEach((event) => {
    window.addEventListener(event, (e) => {
        document.onselectstart = function() {
            return !(e.key == "Shift" && e.shiftKey);
        }
    });
});

$(document).on("click", ".view-approval-info", function(e){
    e.preventDefault();
    var heading = $(this).data('heading');
    var off_canvas = $(this).data('bs-target');
    var task_target = $(this).data('task-target');
    var w_target = ajs.hash_decode(worksheetId);
    $(off_canvas).find('h5.offcanvas-title').html(heading);
    ajs.ajax_form(`${site_url}worksheet/${w_target}/task/${task_target}`, null, "GET", null, "0", "0", view_approval_info, view_approval_info);
})

function view_approval_info(result_json){
    if (ajs_form_handler.check_result(result_json)) {
        var data = result_json.data;
        var media = '';
        if (Array.isArray(data.media) && data.media.length > 0) {
            data.media.forEach(function(item){
                media += `<div class="col-sm-6 col-md-4 img-gal-list-col"><a class="image-popup glightbox" data-gallery="glightbox3" href="${s3_url}/${item.file}" title=""><img src="${s3_url}/${item.file}"/> </a></div>`;
            })
        } else {
            media = "No media available";
        }
        html = `<div class="p-4"><div class="modal-body"><h5 class="fs-15 mb-4">Comment: <span class="text-dark-emphasis fw-normal comment">${data.comment}</span></h5><h5 class="fs-15 mb-0">Medias:</h5><div class="row gx-2">${media}</div></div></div>`
        
        $('.offcanvas-body').html(html);
        $(".offcanvas-body").addClass("offcanvas-body-overflow");
        if ($(".gallery-wrapper").length) {
        var t = new Isotope(".gallery-wrapper", {
            itemSelector: ".element-item",
            layoutMode: "fitRows"
        }); 
    }

    $(".categories-filter").on("click", "li a", function(e){
        e.preventDefault();
        var filterValue = $(this).attr("data-filter");
        if (filterValue) {
            t.arrange({ filter: filterValue });
        }
    });

    $(".categories-filter").each(function(){
        $(this).on("click", "li a", function(){
            $(this).closest(".categories-filter").find(".active").removeClass("active");
            $(this).addClass("active");
        });
    });

    var lightbox = GLightbox({
        selector: ".image-popup",
        title: false
    });
    } else {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}