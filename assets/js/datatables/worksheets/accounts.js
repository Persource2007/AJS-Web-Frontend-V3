var master_data_type = "accounts_list";
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

    dataTable = new DataTable("#accounts-list-datatables", {
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
        buttons: [
            'excel'
        ],
        ajax: {
            url: site_url + "accounts/list",
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
            error: function (xhr) {
                ajs.datatable_error(xhr, "accounts-list-datatables");
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
            },
            // {
            //     name: "null",
            //     data: "null",
            //     searchable: false,
            //     orderable: false,
            //     render: function(data,type,row){
            //         var attribute = '';
            //         // if(row.timsheet_status != 'pending'){
            //         //     attribute = 'disabled';
            //         // }
            //         return (`<input class="form-check-input selected_batch" type="checkbox" id="batch${row.id}" value="${ajs.hash_encode(row.id)}" ${attribute}/>`);
            //     }
            // }, 
            {
                name: "batch_no",
                data: "batch_no",
                render: function (data) {
                    return '#' + data;
                },
            },
            {
                name: "worksheet_no",
                data: "worksheet_no",
                render: function (data) {
                    return '#' + data;
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
                data: "approve_date",
                name: "approve_date",
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
                data: "reference_number",
                name: "reference_number",
                render: function (data, type, row) {
                    return `<span title='${row.comments}'>${setDefValue(data)}</span>`;
                }
            },
            {
                data: "paid_date",
                name: "paid_date",
                render: function (data, type, row) {
                    return ajs.format_date(row.paid_date);
                }
            },
            {
                name: "claim_amount",
                data: "claim_amount",
                class: "text-end",
            },
            {
                name: "approved_amount",
                data: "approved_amount",
                class: "text-end",
            },
            {
                data: "status",
                name: "status", 
                render: function (data, type, row) {
                    if(data == 'paid'){
                        btnC = (data == 'ready_to_pay') ? 'primary' : (data == 'paid') ? 'success' : 'info';
                        var label = (data == 'ready_to_pay') ? 'Clear to Pay' : data.replaceAll('_',' ');
                        return `<span class="badge  border border-${btnC} text-${btnC} text-capitalize">${label}</span>`;
                    }else{
                        return `<button href="javascript:void(0);" data-value="${ajs.hash_encode(row.id)}" class="btn approve-btn action-btn btn-success action-paid">Mark Paid</button>`;
                    }
                }
            }
        ],
        order: [["0", "desc"]],
        drawCallback: function () {
            ajs.apply_ind_roles("Accounts");
        }
    });

    $('body').tooltip({
        selector: '[data-bs-toggle="tooltip"]'
    });
}

if ($("#accounts-list-datatables").length) {
    select2_ajax_users("#engineer_filter", {user_type: 16}, 'body');
    fetch_default_filter(master_data_type);

    var breadcrumbs = [
        {label: 'Engineer CTP', url: 'javascript: void(0);'},
        {label: 'Accounts', url: null}
    ];
    set_breadcrumb(breadcrumbs);
}

// Select/deselect All 
$(document).on("change","input.selected_batch",function(){
    var total = $("input.selected_batch").length;
    var selected = $("input.selected_batch:checked").length;
    if(total == selected){
        $("input.allselect").prop("checked",true);
    }else{
        $("input.allselect").prop("checked",false);
    }
});

$(document).on("change","input.allselect",function(){
    if($(this).is(":checked")){
        $("input.selected_batch").prop("checked",true);
    }else{
        $("input.selected_batch").prop("checked",false);
    }
});
// Select/deselect All 
$(document).on("click","button.action-paid",function(e){
    e.preventDefault();
    var req_data = {};
    var selected_batch = [];
    var requetUrl = `${site_url}batch/paid`;
    selected_batch.push(ajs.hash_decode($(this).data("value")));
    if(selected_batch.length < 1){
        Swal.fire({
            title: "Validation Error",
            icon: "error",
            text: "Please select at least one batch.",
        });
        return false;
    }
    var $textMsg = `Are you sure you want to mark this batch as paid?`;

    // if(selected_batch.length <= 1){
    //     $textMsg = `Are you sure you want to paid ${selected_batch.length} selected batch?`;
    // }
    req_data.batch = selected_batch.join(",");
    Swal.fire({
        title: "Confirmation Required",
        icon: "success",
        text: $textMsg,
        showCancelButton: true,
        confirmButtonText: "Paid",
        showLoaderOnConfirm: true,
        confirmButtonColor: "#157347",
        html: `
            ${$textMsg}
            <div class="form-group">
                <input id="swal-reference" placeholder="Enter reference number..." class="swal2-input ms-0" type="text" style="width: 100%;"/>
            </div>
            <div class="form-group">
                <input id="swal-pdate" placeholder="Paid date..." class="swal2-input ms-0" type="text" style="width: 100%;"/>
            </div>
            <div class="form-group">
                <input id="swal-comment" autocapitalize="off" placeholder="Enter message..." class="swal2-input ms-0" type="text" style="width: 100%;"/>
            </div>
          `,
        didOpen: () => {
            flatpickr("#swal-pdate", {
                dateFormat: "d M, Y",
                defaultDate: "today"
              });
        },
        preConfirm: async () => {
        try {              
            req_data.reference = document.getElementById("swal-reference").value;
            if($.trim(req_data.reference) == ""){
                return Swal.showValidationMessage(`
                    <strong>Error: </strong>Please enter valid reference number.
                `);
            }
            req_data.paid_date = document.getElementById("swal-pdate").value;
            if($.trim(req_data.paid_date) == ""){
                return Swal.showValidationMessage(`
                    <strong>Error: </strong>Please select valid paid date.
                `);
            }
            req_data.message = document.getElementById("swal-comment").value;
            if($.trim(req_data.message) == ""){
                return Swal.showValidationMessage(`
                    <strong>Error: </strong>Please enter message.
                `);
            }
            const response = await ajaxWithRefresh({
                type: 'POST',
                url: requetUrl,
                data:req_data
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

ajs.apply_ind_roles('Accounts');

document.addEventListener("DOMContentLoaded", function () {
    const tableContainer = document.querySelector("#accounts-list-datatables"); // Replace with the actual parent container ID or class
    let lastChecked = null;

    tableContainer.addEventListener("click", function (e) {
        // Check if the clicked element is a checkbox with the class "selected_batch"
        if (e.target && e.target.classList.contains("selected_batch")) {
            const checkboxes = Array.from(
                tableContainer.querySelectorAll(".selected_batch")
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