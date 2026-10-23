var master_data_type = "worksheet_list";
dataTable = null;

function load_data_table(limit, search_term, filters) {
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

    dataTable = new DataTable("#worksheet-list-datatables", {
        scrollY: (screen.height - 450) + 'px',
        scrollX: true,
        autoWidth: false,
        serverSide: true,
        processing: true,
        paging: true,
        responsive: false,
        bDestroy: true,
        pageLength: page_limit,
//        dom: "<'row'<'col-sm-12'tr>>" +
//         "<'row'<'col-sm-4'l><'col-sm-4'i><'col-sm-4'p>>",
        search: {
            search: search
        },
        // dom: 'Bfrtip',
        
        ajax: {
            url: site_url + "worksheet/awaiting-approval-list",
            method: "GET",
            async: false,
            dataSrc: "data",
            data: function (d) {
                return $.extend({}, d, {
                    data_filters
                });
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            error: function (xhr, error, code) {
                ajs.datatable_error(xhr, "worksheet-list-datatables");
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
                    console.log(row.status)
                    var attribute = (row.status == 'ready_to_pay' || row.status == 'rejected' || row.status == 'paid') ? 'disabled' : '';
                    var value = (row.status == 'ready_to_pay' || row.status == 'rejected' || row.status == 'paid') ? "" : ajs.hash_encode(row.id);
                    // if(row.timsheet_status != 'pending'){
                    //     attribute = 'disabled';
                    // }
                    // return (`<input class="form-check-input selected_worksheet" type="checkbox" id="batch${row.id}" value="${ajs.hash_encode(row.id)}" ${attribute}/>`);
                    var action = `<input class="form-check-input approve-btn selected_worksheet" type="checkbox" id="batch${row.id}" value="${value}" ${attribute}/>`;
                    // var action =`<a href="` +cdn_url +"worksheet/tasks-detail-list/" +ajs.hash_encode(row.id) +`"  ><i class="ri-eye-line align-bottom me-2 primary-btn fs-15 "></i></a>`;
                    if(row.pdf_path) {
                        action += `<a href="${s3_url+'/'+row.pdf_path}"  target="_blank" download title="Download PDF"><i class="fa fa-file-pdf-o align-bottom me-2 ms-2 text-muted primary-btn fs-14"></i> </a>`;
                    }
                    if(row.excel_path) {
                        action += `<a href="${s3_url+'/'+row.excel_path}"  target="_blank" download title="Download Excel"><i class="fa fa-file-excel-o align-bottom me-1 text-muted primary-btn fs-14"></i> </a>`;
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
                    
            //         var action ='';
            //         // var action =`<a href="` +cdn_url +"worksheet/tasks-detail-list/" +ajs.hash_encode(row.id) +`"  ><i class="ri-eye-line align-bottom me-2 primary-btn fs-15 "></i></a>`;
            //         if(row.pdf_path) {
            //             action += `<a href="${s3_url+'/'+row.pdf_path}"  target="_blank" download><i class="las la-file-pdf  me-1 text-muted primary-btn fs-15"></i> </a>`;
            //         }
            //         if(row.excel_path) {
            //             action += `<a href="${s3_url+'/'+row.excel_path}"  target="_blank" download><i class="ri-file-excel-line  align-bottom me-1 text-muted primary-btn fs-15"></i> </a>`;
            //         }
			// 		return action;
            //     }
            // },            
            {
                name: "worksheet_no",
                data: "worksheet_no",
                render: function (data, type, row) {
                    return `<a href="${cdn_url}worksheet/tasks-detail-list/${ajs.hash_encode(row.id)}" >#${data}</a>`;
                },
            },
            {
                name: "engg_name",
                data: "engg_name",
                // render: function (data, type, row) {
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
                data: "add_date",
                name: "add_date",
                render: function (data) {
                    return ajs.format_date(data);
                }
            },
            {
                data: "start_date",
                name: "start_date",
                render: function (data, type, row) {
                    return ajs.format_date(row.start_date) + ' to ' + ajs.format_date(row.end_date);
                }
            },
            {
                name: "claim_amount",
                data: "claim_amount",
                className: "pricing-col",
                render: function(data){
                    return data.toFixed(2)
                }
            },
            {
                name: "approved_amount",
                data: "approved_amount",
                className: "pricing-col",
                render: function(data){
                    return data.toFixed(2)
                }
            },
            {
                data: "status",
                name: "status",
                render: function (data) {
                    btnC = (data == 'paid') ? 'success' : (data == 'rejected') ? 'danger' : (data == 'partially_approved' || data == 'approved') ? 'primary' : (data == 'ready_to_pay') ? 'info' : 'warning';
                    var label = (data == 'ready_to_pay') ? 'Clear to Pay' : data.replaceAll('_',' ');
                    return `<span class="badge  border border-${btnC} text-${btnC} text-capitalize">${label}</span>`;
                }
            },
            
        ],
        order: [["1", "desc"]],
        drawCallback: function () {
            ajs.apply_ind_roles("Worksheets");
        }
    });

    $('body').tooltip({
        selector: '[data-bs-toggle="tooltip"]'
    });
}

if ($("#worksheet-list-datatables").length) {
    select2_ajax_users("#engineer_filter", {user_type: 16}, 'body');
    fetch_default_filter(master_data_type);

    var breadcrumbs = [
        {label: 'Engineer CTP', url: 'javascript: void(0);'},
        {label: 'Worksheets', url: null}
    ];
    set_breadcrumb(breadcrumbs);
}

// Select/deselect All 
$(document).on("change","input.selected_worksheet",function(){
    var total = $("input.selected_worksheet").length;
    var selected = $("input.selected_worksheet:checked").length;
    if(total == selected){
        $("input.allselect").prop("checked",true);
    }else{
        $("input.allselect").prop("checked",false);
    }
});

$(document).on("change","input.allselect",function(){
    if($(this).is(":checked")){
        $("input.selected_worksheet").prop("checked",true);
    }else{
        $("input.selected_worksheet").prop("checked",false);
    }
});
// Select/deselect All 
// worksheet ready to pay
$(document).on("click","button.ready-to-pay-worksheet",function(e){
    e.preventDefault();
    var req_data = {};
    var selected_worksheet = [];
    var requetUrl = `${site_url}worksheet/ready_to_pay`;
    $("input.selected_worksheet:checked").each(function(){
        selected_worksheet.push(ajs.hash_decode($(this).val()));
    })
    if(selected_worksheet.length < 1){
        Swal.fire({
            title: "Validation Error",
            icon: "error",
            text: "Please select at least one worksheet.",
        });
        return false;
    }
    var $textMsg = `Are you sure you want to approve all ${selected_worksheet.length} selected worksheets for pay?`;

    if(selected_worksheet.length <= 1){
        $textMsg = `Are you sure you want to approve ${selected_worksheet.length} selected worksheet for pay?`;
    }
    req_data.worksheet = selected_worksheet.join(",");
    Swal.fire({
        title: "Confirmation Required",
        icon: "success",
        text: $textMsg,
        showCancelButton: true,
        confirmButtonText: "Approve",
        showLoaderOnConfirm: true,
        confirmButtonColor: "#157347",
        preConfirm: async (status) => {
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

ajs.apply_ind_roles('Worksheets');

document.addEventListener("DOMContentLoaded", function () {
    const tableContainer = document.querySelector("#worksheet-list-datatables"); // Replace with the actual parent container ID or class
    let lastChecked = null;

    tableContainer.addEventListener("click", function (e) {
        // Check if the clicked element is a checkbox with the class "selected_worksheet"
        if (e.target && e.target.classList.contains("selected_worksheet")) {
            const checkboxes = Array.from(
                tableContainer.querySelectorAll(".selected_worksheet")
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