let task_assets = [];
const $taskDetailWindow = $("#card-task-details-fixed");
let $top = $("#card-tasks-list-fixed");
let $bottom = $("#card-task-details-fixed");

var defaultHeightTop = localStorage.getItem("listWindowHeight");
var defaultHeightBottom = localStorage.getItem("detailWindowHeight");
if(defaultHeightTop != null && defaultHeightBottom != null){
    $top.height(defaultHeightTop);
    $bottom.height(defaultHeightBottom);
}

$(function () {
    let minHeight = 100;    
    $(".card-top-handle-bottom").on("mousedown", function (event) {
        let startY = event.clientY;
        let startHeight1 = $top.height();
        let startHeight2 = $bottom.height();

        $(document).on("mousemove.resize", function (event) {
            let dy = event.clientY - startY;

            let newHeight1 = startHeight1 + dy;
            let newHeight2 = startHeight2 - dy;

            // Ensure both sections maintain minimum height
            if (newHeight1 >= minHeight && newHeight2 >= minHeight) {
                $top.height(newHeight1);
                $bottom.height(newHeight2);

                localStorage.setItem("listWindowHeight", newHeight1);
                localStorage.setItem("detailWindowHeight", newHeight2);
            }
        });

        $(document).on("mouseup.resize", function () {
            $(document).off(".resize"); 
        });

        // Prevent default dragging behavior
        event.preventDefault();
    });
});

let previousVisitURL = '';
let selectedRow = null;
$(document).on('click', '.task-detail-window-button', function (e) {
    e.stopPropagation();
    selectedRow = $(this);
    ajs.show_loader();
    $(".task-detail-window-button").parents("tr").removeAttr("style");
    $(this).parents("tr").css("background-color","#e6f7fc")
    var form_link = $(this).data('form-url');
    previousVisitURL = form_link;
    view_task_details(form_link);
    ajs.hide_loader();
    return false;
});

// Approve / Reject / Add Comments can be triggered from either the view panel or the
// Task Edit off-canvas, so refresh whichever surfaces are actually on the page.
// previousVisitURL is '' until the view panel has been opened at least once - without
// the guard, acting from the edit popup alone would fetch cdn_url with an empty path.
async function refresh_task_details(){
    if (previousVisitURL) {
        view_task_details(previousVisitURL, true);
    }
    refresh_task_edit_details();
    return false;
}

// Saving the Task Edit off-canvas closes it through offcanvas_form3, which reloads the grid
// and then calls ajs.refreshDetailData() - the same hook clients.js and property.js use. Wire
// it here so an open detail card picks up the edit instead of keeping its pre-save values.
// Scoped to the pages that actually have the card (Tasks list, Worksheet): the job details
// and job list pages load this file too, and overriding the hook there would shadow their own
// detail handling.
$(function () {
    if ($('#card-task-details-fixed').length) {
        ajs.refreshDetailData = refresh_task_details;
    }
});

// The task detail markup is rendered on two surfaces at once: the view panel
// (#card-task-details-fixed) and the read-only panel inside the Task Edit off-canvas
// (#task_edit_details_panel). Both reuse the same tbody classes, so every display*
// function takes an optional $scope to keep them from writing into each other.
// Omitting $scope preserves the original document-wide behaviour.
function scoped($scope, selector) {
    return $scope && $scope.length ? $scope.find(selector) : $(selector);
}

async function task_details(url) {
    try {
        const details = await ajaxWithRefresh({
            url: `${site_url}${url}`,
            type: 'GET',
        });
        return details;
    } catch (error) {
        console.error('Error in task_details:', error);
    }
}

// Read-only detail panel inside the Task Edit off-canvas (views/jobs/create-task.php,
// rendered in edit mode only). Pulls the same task/{id}/detail payload the view panel
// uses - job-task-details/{id}?edit=true does not carry the totals, margin or H&S data.
let taskEditDetailsId = null;

async function render_task_edit_details(task_id) {
    const $panel = $('#task_edit_details_panel');
    if (!$panel.length || !task_id) {
        return false;
    }
    taskEditDetailsId = task_id;

    try {
        const taskDetails = await task_details(task_detail_url(task_id));
        const data = taskDetails?.data;
        if (!data) {
            return false;
        }

        $('#te_total_materials', $panel).text(data.total_materials ?? '-');
        $('#te_total_labors', $panel).text(data.total_labors ?? '-');
        $('#te_total_sells', $panel).text(data.total_sells ?? '-');
        $('#te_margins', $panel).text(data.margins ?? '-');
        // Matches the view panel: a negative margin turns the whole figure red.
        $('#te_margins_wrap', $panel).css('color', data.margins < 0 ? 'red' : 'green');

        displaySors(data.sors, data.task_status, $panel);
        displayAssets(data.assets, $panel);
        displayCertificates(data.certificates, data.task_status, $panel);
        displayMedias(data.files, $panel);
        displayEvents(data.events, $panel);
        displayReviewedComments(data, $panel);
        displaySafetyFeedback(data.safety_feedbacks, $panel);
        displayObservations(data.observations, $panel);

        const no_comments = '<span class="text-muted">No comments.</span>';
        $('#te_engineer_comments', $panel).html(isEmpty(data.engineer_comments) ? no_comments : setDefValue(data.engineer_comments));
        $('#te_manager_comments', $panel).html(isEmpty(data.manager_comments) ? no_comments : setDefValue(data.manager_comments));

        // Same buttons as the view panel minus "Modify SORs". The check_actions/data-actions
        // pair is what initValidations() evaluates to strip buttons the status or role forbids.
        var actionBtns = `<button data-actions="handleTaskAction(this, '${data.task_status}', 'comment')" class="check_actions mt-1 mb-1 btn btn-info me-2 waves-effect waves-light action-task-comment" data-task-id="${data.id}" data-comments="${data.manager_comments}">Add Comments</button>`;
        actionBtns += `<button data-actions="handleTaskAction(this, '${data.task_status}', 'approve')" class="check_actions mt-1 mb-1 btn btn-primary me-2 waves-effect waves-light action-task-approve" data-task-id="${data.id}">Approve</button>`;
        actionBtns += `<button data-actions="handleTaskAction(this, '${data.task_status}', 'reject')" class="check_actions mt-1 mb-1 btn btn-danger me-2 waves-effect waves-light action-task-reject" data-task-id="${data.id}">Reject</button>`;
        $('.task-edit-detail-actions', $panel).html(actionBtns);

        initValidations();
        ajs.apply_permissions();
    } catch (error) {
        console.error('Error in render_task_edit_details:', error);
    }
    return false;
}

async function refresh_task_edit_details() {
    if (!$('#task_edit_details_panel').length || !taskEditDetailsId) {
        return false;
    }
    return render_task_edit_details(taskEditDetailsId);
}

async function view_task_details(url, is_reload = false) {
    if(!is_reload){
        $taskDetailWindow.html(`<h5 class="d-flex justify-content-center align-items-center h-75"><span class="spinner-grow flex-shrink-0" role="status"></span></h5>`);
    }
    try {
        const response = await $.ajax({
            url: `${cdn_url}${url}`,
            type: 'GET'
        });
        const taskDetails = await task_details(url);
        let taskDetailsData = taskDetails.data;
        task_assets = taskDetailsData.assets || [];
        let $detailViewData = $(response);
        $detailViewData.find("span.data").each(function(){
            let $this = $(this);
            $this.removeClass('data');
            let target = $.trim($this.attr("class"));
            let type = $.trim($this.data("type"));
            let value = taskDetailsData[target] || `-`;
            if(type == 'date' && value != '-'){
                value = ajs.format_datetime(value);
            }
            if($this.hasClass('margins') && value < 0){
                $this.parent().css("color","red");
            }
            // if(type == 'price'){
            //     // value = parseFloat(value.replace("-","")).toFixed(2);
            //     value = value.replace("-",0);
            // }
            $this.replaceWith(value);
        })
        var latestStatus = status_label(taskDetailsData.task_status);
        // $(selectedRow).parents('tr').find('.task_latest_status').html(latestStatus)
        var statusElement = $(selectedRow).parents('tr').find('.task_latest_status');
        if (statusElement.length > 0) {
          statusElement.html(latestStatus);
        }

        jobContractId = taskDetailsData.contract_id;
        jobPropertyId = taskDetailsData.property_id;
        jobServiceId = taskDetailsData.service_id;
        jobId = taskDetailsData.job_id;
        taskId = taskDetailsData.id;
        $taskDetailWindow.html($detailViewData);
        // Scope to this panel so the identically-classed tables in the Task Edit
        // off-canvas are not overwritten with this task's data (and vice versa).
        displaySors(taskDetailsData.sors, taskDetailsData.task_status, $taskDetailWindow);
        displayAssets(taskDetailsData.assets, $taskDetailWindow);
        displayCertificates(taskDetailsData.certificates, taskDetailsData.task_status, $taskDetailWindow);
        displayMedias(taskDetailsData.files, $taskDetailWindow);
        displayEvents(taskDetailsData.events, $taskDetailWindow);
        displayReviewedComments(taskDetailsData, $taskDetailWindow);
        displaySafetyFeedback(taskDetailsData.safety_feedbacks, $taskDetailWindow);
        displayObservations(taskDetailsData.observations, $taskDetailWindow);
        
        var actionBtns = `<button data-actions="sorAction(this,'${taskDetailsData.task_status}')" type="button" class="check_actions mt-1 mb-1 btn btn-success waves-effect waves-light me-2 popup-form-button-sors" data-after-load-func="initializeSors" data-heading="Modify SORs - #${taskDetailsData.task_code}" data-form-url="${cdn_url}job/${taskDetailsData.job_id}/task/${taskDetailsData.id}/sors">Modify SORs</button>`;
            actionBtns += `<button data-actions="handleTaskAction(this, '${taskDetailsData.task_status}', 'comment')" class="check_actions mt-1 mb-1 btn btn-info me-2 waves-effect waves-light action-task-comment" data-task-id="${taskDetailsData.id}" data-comments="${taskDetailsData.manager_comments}">Add Comments</button>`;
            actionBtns += `<button data-actions="handleTaskAction(this, '${taskDetailsData.task_status}', 'approve')" class="check_actions mt-1 mb-1 btn btn-primary me-2 waves-effect waves-light action-task-approve" data-task-id="${taskDetailsData.id}">Approve</button>`;
            actionBtns += `<button data-actions="handleTaskAction(this, '${taskDetailsData.task_status}', 'reject')" class="check_actions mt-1 mb-1 btn btn-danger me-2 waves-effect waves-light action-task-reject" data-task-id="${taskDetailsData.id}">Reject</button>`;            
        $(".task-detail-actions").html(actionBtns);

        initValidations();
        ajs.apply_permissions();
        $('#card-task-details-fixed').tooltip({selector: '[data-bs-toggle="tooltip"]'});
    } catch (error) {
        console.error('Error:', error);
    }
}

async function displayMedias(medias, $scope) {
    let mediaData = `<tr><td colspan="7" class="text-center">Data not available!</td></tr>`;

    if (Array.isArray(medias) && medias.length) {
        mediaData = medias.map((value, index) => {
            const file_type = value.file_type || "-";
            const caption = value.caption || "-";
            const added_by = value.added_by_name || "-";
            const date = ajs.format_datetime(value.add_date || "-");

            const preview_link = file_type === 'image' 
                ? `<img style="width:120px; cursor:pointer;" 
                         data-bs-toggle="modal" 
                         data-bs-target="#imagePreviewModal" 
                         src="${value.file_path}" 
                         alt="${caption}">`
                : `<a href="${value.file_path}" target="_BLANK">View/Download</a>`;

            return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${file_type}</td>
                    <td>${preview_link}</td>
                    <td>${caption}</td>
                    <td>${added_by}</td>
                    <td>${date}</td>
                </tr>`;
        }).join("");
    }

    scoped($scope, ".task-detail-medias").html(mediaData);
}


async function displayCertificates(certificates, taskStatus, $scope) {
    let certificateData = `<tr><td colspan="10" class="text-center">Data not available!</td></tr>`;

    if (Array.isArray(certificates) && certificates.length) {
        certificateData = certificates.map((value, index) => {
            const required = value.is_required == "1" ? "Yes" : "No";
            const assigned_to_name = value.assigned_to_name || "-";
            const status_label1 = cert_status_label(value.status);

            const edit_url = `<a class="check_actions check-permission" data-actions="handleCertificateAction(this, '${taskStatus}', '${value.status}')" href="${cdn_url}job/edit-certificate/${value.task_id}/${value.id}" target="_BLANK" data-module="Certificates" data-action="edit">${edit_icon()}</a>`;
            var actionbtns = handleCertificateAction(null, taskStatus, value.status);
            const certificate_url = (value.pdf_url && value.pdf_url != null) ? `<a class="check_actions check-permission" href="javascript:void(0)" onclick="actionCertificates(this, ${value.task_id}, ${value.id}, ${actionbtns})" data-url="${value.pdf_url}" data-module="Certificates" data-action="view"><i title="View" class="fa fa-file-pdf-o align-bottom me-2 primary-btn fs-15"></i></a>`: '-';

            return `
                <tr>
                    <td>${certificate_url} ${edit_url}</td>
                    <td>${value.certificate_code || '-'}</td>
                    <td>${truncate_string(value.title || '-')}</td>
                    <td>${required}</td>
                    <td>${assigned_to_name}</td>
                    <td>${status_label1}</td>
                    <td>${setDefValue(value.added_by_name || '')}</td>
                    <td>${ajs.format_datetime(value.add_date || '-')}</td>
                </tr>`;
        }).join("");
    }
    scoped($scope, ".task-detail-certificates").html(certificateData);
}


async function displayAssets(assets, $scope) {
    const isProperty = Array.isArray(assets) && assets.length > 0 && assets[0]?.asset_type === "PROPERTY";       
    const colCount = isProperty ? 5 : 7;
    let assetsData = `<tr><td colspan="${colCount}" class="text-center">Data not available!</td></tr>`;

    let headerData = isProperty ? `
        <tr>
            <th>#</th>
            <th>UPRN No.</th>
            <th>Resident Name</th>
            <th>Address</th>
            <th>Postcode</th>
        </tr>
    ` : `
        <tr>
            <th>#</th>
            <th>Client Asset No.</th>
            <th>Serial No.</th>
            <th>Type</th>
            <th>Make</th>
            <th>Model</th>
            <th>Installation Date</th>
        </tr>
    `;

    if (Array.isArray(assets) && assets.length) {
        if (isProperty) {
            assetsData = assets.map((value, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${value.uprn_no || '-'}</td>
                    <td>${value.resident_name || '-'}</td>
                    <td>${value.address1 || '-'}</td>
                    <td>${value.postalcode || '-'}</td>
                </tr>
            `).join("");
        } else {
            assetsData = assets.map((value, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${value.client_asset_number || '-'}</td>
                    <td>${value.serial_number || '-'}</td>
                    <td>${value.equipment_type || '-'}</td>
                    <td>${value.make || '-'}</td>
                    <td>${value.model || '-'}</td>
                    <td>${ajs.format_date(value.installation_date)}</td>
                </tr>
            `).join("");
        }
    }

    const $tbody = scoped($scope, ".task-detail-assets");
    $tbody.closest("table").find("thead").html(headerData);
    $tbody.html(assetsData);
}


async function displayEvents(events, $scope) {
    let eventData = `<tr><td colspan="5" class="text-center">Data not available!</td></tr>`;

    if (Array.isArray(events) && events.length) {
        eventData = events.map((value, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${format_string(value.action_name || "-")}</td>
                <td>${setDefValue(value.added_by_name || "")}</td>
                <td>${ajs.format_datetime(value.add_date || "-")}</td>
                <td>${setDefValue(value.comments || "")}</td>
            </tr>
        `).join("");
    }
    scoped($scope, ".task-detail-events").html(eventData);
}

async function displaySafetyFeedback(safetyFeedback, $scope) {
    let feedbackData = `<tr><td colspan="4" class="text-center">Data not available!</td></tr>`;
    let answers = safetyFeedback?.answers || [];
    let added_date = safetyFeedback?.add_date ? ajs.format_datetime(safetyFeedback.add_date) : '-';
    if (Array.isArray(answers) && answers.length) {
        feedbackData = answers.map((value, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${value.question || '-'}</td>
                <td>${setDefValue(value.answer || '')}</td>
                <td>${added_date}</td>
            </tr>
        `).join("");
    }
    if(!isEmpty(safetyFeedback?.supervisor_advice)) {
        feedbackData += `
            <tr>
                <td colspan="4" class="text-center">
                    <strong>Supervisor Advice:</strong> ${safetyFeedback.supervisor_advice}
                </td>
            </tr>
        `;
    }
    scoped($scope, ".task-detail-safety-feedback").html(feedbackData);
}

function isObservationImageUrl(url) {
    return /\.(jpe?g|png|gif|webp|bmp|svg)(\?.*)?$/i.test(url || '');
}

function renderObservationFieldMedia(media) {
    const url = media.media_url || media.file_path || '';
    const caption = media.caption || '-';
    if (!url) {
        return '';
    }

    const preview_link = isObservationImageUrl(url)
        ? `<img style="width:120px;max-height: 140px; cursor:pointer;margin-bottom: 5px;"
                 data-bs-toggle="modal"
                 data-bs-target="#imagePreviewModal"
                 src="${url}"
                 alt="${caption}">`
        : `<a href="${url}" target="_BLANK">View/Download</a>`;

    return `<div class="mb-2">${preview_link}<br><span class="text-muted">${caption}</span></div>`;
}

function buildObservationComments(answer) {
    const parts = [];    

    (answer?.text_fields || []).forEach(tf => {
        if (!tf.text_answer) {
            return;
        }
        parts.push(
            tf.question
                ? `<b>${tf.question}: </b>${tf.text_answer}`
                : tf.text_answer
        );
    });

    (answer?.fields || []).forEach(field => {
        let label = field.label ? `<b>${field.label}: </b>` : null;
        let cnt = 1;
        (field.values || []).forEach(value => {
            if (value.media_url || value.path) {
                return;
            }
            if (value.value) {
                if(cnt == 1 && label) { 
                    parts.push(`${label} ${value.value}`);
                } else {
                    parts.push(value.value);
                }
            }
            cnt++;
        });
    });

    return parts.length ? parts.join('<br>') : '-';
}

function buildObservationFiles(answer) {
    const files = [];
    (answer?.fields || []).forEach(field => {
        (field.values || []).forEach(value => {
            if (value.media_url || value.path) {
                files.push(renderObservationFieldMedia(value));
            }
        });
    });
    return files.length ? files.join('') : '-';
}

async function displayObservations(observations, $scope) {
    let observationData = `<tr><td colspan="6" class="text-center">Data not available!</td></tr>`;

    let answers = observations?.answers || [];
    let added_date = observations?.add_date
        ? ajs.format_datetime(observations.add_date)
        : '-';

    if (Array.isArray(answers) && answers.length) {
        observationData = answers.map((value, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${value.question || '-'}</td>
                <td>${setDefValue(value.answer || '')}</td>
                <td>${buildObservationComments(value)}</td>
                <td>${buildObservationFiles(value)}</td>
                <td>${added_date}</td>
            </tr>
        `).join("");
    }

    scoped($scope, ".task-detail-observations").html(observationData);
}

async function displaySors(sors, taskStatus, $scope) {
    let sorData = `<tr><td colspan="14" class="text-center">Data not available!</td></tr>`;
    if (Array.isArray(sors) && sors.length) {
        sorData = sors.map((value, index) => {
            const is_chargeable = value.is_chargeable == 1 ? ['Yes','success'] : ['No','danger'];
            const is_payable = value.is_payable == 1 ? ['Yes','success'] : ['No','danger'];
            // const is_ctp = value.is_ctp == 1 ? ['Yes','success'] : ['No','danger'];
            var is_ctp = value.is_ctp == 1 ? 'checked' : '';

            const chargeable_comments = !isEmpty(value.chargeable_comments)
                ? `<span class="tooltip-container">
                    <i class="ri-message-2-line fs-16 ms-2 show-comment cursor-pointer" 
                       data-message="${value.chargeable_comments}"></i>
                   </span>` 
                : '';

            const payable_comments = !isEmpty(value.payable_comments)
                ? `<span class="tooltip-container">
                    <i class="ri-message-2-line fs-16 ms-2 show-comment cursor-pointer" 
                       data-message="${value.payable_comments}"></i>
                   </span>` 
                : '';
            var sorStatus = handleSorAction(null, taskStatus, value.sor_completion_status);
            var isDisabled = sorStatus && value.is_payable == 1 && ajs.check_role('SORs', 'edit') ? "" : "disabled";
            return `
                <tr>
                    <td>${value.sor_code}</td>
                    <td>${value.approval_description || '-'}</td>
                    <td>${value.comments || '-'}</td>
                    <td class="text-end">${value.material_price.toFixed(2) || '-'}</td>
                    <td class="text-end">${value.labor_price_org.toFixed(2) || '-'}</td>
                    <td class="text-end">${value.overhead_price.toFixed(2) || '-'}</td>
                    <td class="text-end">${value.overhead_percentage || '-'}</td>
                    <td class="text-end">${value.sell_price.toFixed(2) || '-'}</td>
                    <td class="text-center">${value.quantity || 0}</td>
                    <td class="text-center">${value.total_certs || 0}</td>
                    <td class="text-center">${value.total_pics || 0}</td>
                    <td>
                        <div class="form-check form-switch text-center">
                            <span data-bs-toggle="tooltip" data-bs-placement="top" title="${chargeable_comments}" class="badge border border-${is_chargeable[1]} text-${is_chargeable[1]}">${is_chargeable[0]}</span>
                        </div>
                    </td>
                    <td>
                        <div class="form-check form-switch text-center">
                            <span data-bs-toggle="tooltip" data-bs-placement="top" title="${payable_comments}" class="badge border border-${is_payable[1]} text-${is_payable[1]}">${is_payable[0]}</span>
                        </div>
                    </td>
                    <td>
                        <div class="form-check form-switch">
                            <input class="form-check-input action-update-ctp" type="checkbox" data-task-sor="${value.task_sor_id}" role="switch" id="updateCTP" ${is_ctp} ${isDisabled}/>
                        </div>
                    </td>
                    <td class="text-center"><i class="mdi mdi-circle fs-11 align-middle me-1 blinkd" style="color:green"></i></td>
                    <td>${value.added_by_name || '-'}</td>
                    <td>${ajs.format_datetime(value.add_date || '-')}</td>
                </tr>`;
        }).join("");
    }

    scoped($scope, ".task-detail-sors").html(sorData);
}

function displayReviewedComments(task, $scope) {
    var reviewed_comments = '';
    if(task.task_status.toLowerCase() == 'approved') {
        reviewed_comments = `<h5>Approved Comments</h5><p><span>` + setDefValue(task.approval_comments) + `</span></p>`;
    } else if(task.task_status.toLowerCase() == 'rejected') {
        reviewed_comments = `<h5>Rejected Comments</h5><p><span>` + setDefValue(task.rejection_comments) + `</span></p>`;
    }
    scoped($scope, '.reviewed_comments').html(reviewed_comments);

    var threshold_comments = '';
    if(task.thresold_comments != null) {
        threshold_comments = `<h5>Threshold Comments</h5><p><span>` + setDefValue(task.thresold_comments) + `</span></p>`;
    }
    scoped($scope, '.threshold_comments').html(threshold_comments);

    var no_access_reason = '';
    if(task.reason != null) {
        let label = task?.user_type	== 'E' ? 'Access' : 'Appointment';
        no_access_reason = `<h5>No ${label} Reason</h5><p><span>` + setDefValue(task.reason) + `</span></p>`;
    }
    scoped($scope, '.no_access_reason').html(no_access_reason);
}

$(document).on("click", ".action-task-comment", function (e) {
    e.preventDefault();

    const task_id = $(this).data("task-id");
    const def_comment = $(this).data("comments") ?? '';

    Swal.fire({
        text: "Please provide Manager comment for this task.",
        input: "textarea",
        inputValue: def_comment,
        inputAttributes: {
            autocapitalize: "off",
            placeholder: "Enter comments...",
        },
        showCancelButton: true,
        confirmButtonText: "Save",
        showLoaderOnConfirm: true,
        preConfirm: async (comments) => {
            if ($.trim(comments) === "") {
                return Swal.showValidationMessage(`Please enter comments.`);
            }
            try {
                const url =  `${site_url}mytasks/update_comment`;
                return await ajs.ajax_form(url, { comments, task_id, type: 'manager' }, "POST", null, "1", "1", updateComment, updateComment);
            } catch (error) {
                Swal.showValidationMessage(`<strong>Request Failed:</strong> ${error.message}`);
            }
        },
        allowOutsideClick: () => !Swal.isLoading(),
    })
});
function updateComment(result_json){
    if (ajs_form_handler.check_result(result_json)){
        Swal.fire({icon: "success",title: "Add Comments", text: result_json.message});
        if(typeof refresh_task_details === 'function'){ refresh_task_details(); }
        else{ location.reload(); }
    }else{
        const errorMessage = result_json.message || "An unexpected error occurred. Please try again.";
        return Swal.showValidationMessage(`<strong>Error:&nbsp;</strong> ${errorMessage}`);
    }
}

// // Approve Job Task
$(document).on("click", ".action-task-approve", function (e) {
    e.preventDefault();

    const task_id = $(this).data("task-id");
    Swal.fire({
        title: "Approve Job Task",
        text: "Please provide a comment for approving this job task.",
        icon: "warning",
        input: "textarea",
        inputAttributes: {
            autocapitalize: "off",
            placeholder: "Enter your comment for approval...",
        },
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Approve",
        showLoaderOnConfirm: true,
        preConfirm: async (comments) => {
            if ($.trim(comments) === "") {
                return Swal.showValidationMessage(`Approval comment is required.`);
            }
            try {
                const url = `${site_url}job/task_approve_reject`;
                const status_code = 'APPROVED';
                return await ajs.ajax_form(url, { comments, task_id, status_code }, "POST", null, "1", "1", approveTask, approveTask);
            } catch (error) {
                Swal.showValidationMessage(`<strong>Request Failed:</strong> ${error.message}`);
            }
        },
        allowOutsideClick: () => !Swal.isLoading(),
    })
});

function approveTask(result_json){
    if (ajs_form_handler.check_result(result_json)){
        Swal.fire({icon: "success",title: "Job Task Approved", text: result_json.message});
        if(typeof refresh_task_details === 'function'){ refresh_task_details(); }
        else{ location.reload(); }
    }else{
        const errorMessage = result_json.message || "An unexpected error occurred. Please try again.";
        return Swal.showValidationMessage(`<strong>Error:&nbsp;</strong> ${errorMessage}`);
    }
}
// Reject Job Task
$(document).on("click", ".action-task-reject", function (e) {
    e.preventDefault();

    const task_id = $(this).data("task-id");
    Swal.fire({
        title: "Reject Job Task",
        text: "Please provide a reason for rejecting this job task.",
        icon: "warning",
        // input: "textarea",
        // inputAttributes: {
        //     autocapitalize: "off",
        //     placeholder: "Enter your reason for rejection...",
        // },
        html: `<textarea id="rejection_reason" autocapitalize="off" placeholder="Enter the reason for rejection..." class="swal2-textarea m-0 w-100" spellcheck="false" style="display: flex;"></textarea>
                <div class="p-0 mt-2 form-check">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" id="send_back_to_engineer" type="checkbox" name="send_back_to_engineer" value="yes"/>
                        <label class="form-check-label" for="send_back_to_engineer">Return this task to the Engineer</label>
                    </div>
                </div>
                <div id="send_back_task_option_box" style="display:none;">
                    <div class="p-0 mt-3 form-check">
                        <label>Select a reason for rejecting this task:</label><br/>
                        <div class="form-check form-check-inline mt-1">
                            <input class="form-check-input" id="reject_task_reason" type="radio" name="rejection_reason_type" value="0" checked/>
                            <label class="form-check-label" for="reject_task_reason">Reject the Task</label>
                        </div>
                        <div class="form-check form-check-inline mt-1">
                            <input class="form-check-input" id="reject_certificate" type="radio" name="rejection_reason_type" value="1"/>
                            <label class="form-check-label" for="reject_certificate">Reject the Certificate</label>
                        </div>
                    </div>

                    <div class="p-0 mt-3 form-check">
                        <label>How should this task be completed?</label><br/>
                        <div class="form-check form-check-inline mt-1">
                            <input class="form-check-input" id="can_be_done_remotely" type="radio" name="task_completion_method" value="0" checked/>
                            <label class="form-check-label" for="can_be_done_remotely">Can be Done Remotely</label>
                        </div>
                        <div class="form-check form-check-inline mt-1">
                            <input class="form-check-input" id="requires_site_visit" type="radio" name="task_completion_method" value="1"/>
                            <label class="form-check-label" for="requires_site_visit">Requires a Site Visit</label>
                        </div>
                    </div>
                </div>`,
        showCancelButton: true,
        confirmButtonText: "Reject",
        showLoaderOnConfirm: true,
        focusConfirm: false,
        customClass: {
            confirmButton: 'swal2-deny',
        },
        didOpen: () => {
            $("#send_back_to_engineer").on("change", function () {
                if ($(this).is(":checked")) {
                    $("#send_back_task_option_box").slideDown(400);
                } else {
                    $("#send_back_task_option_box").slideUp(400);
                    setTimeout(()=>{
                        $("#can_be_done_remotely").prop("checked",true);
                        $("#reject_task_reason").prop("checked",true);
                    },401)
                }
            });
        },
        preConfirm: async (comments) => {
            const rejectionReason = $.trim($("#rejection_reason").val());
            const reqType = $("input[name='rejection_reason_type']:checked").val();
            const reqMethod = $("input[name='task_completion_method']:checked").val();
            if (comments === "") {
                return Swal.showValidationMessage(`Rejection reason is required.`);
            }
            let reqData = {comments : rejectionReason, task_id};
            if($("#send_back_to_engineer").is(":checked")) {
                reqData.send_back = 1;
                reqData.req_type = reqType;
                reqData.req_method = reqMethod;
            }
            try {
                const url = `${site_url}job/task_approve_reject`;
                const status_code = 'REJECTED';
                    reqData.status_code = status_code;
                return await ajs.ajax_form(url, reqData, "POST", null, "1", "1", rejectTask, rejectTask);
            } catch (error) {
                Swal.showValidationMessage(`<strong>Request Failed:</strong> ${error.message}`);
            }
        },
        allowOutsideClick: () => !Swal.isLoading(),
    })
});
function rejectTask(result_json){
    if (ajs_form_handler.check_result(result_json)){
        Swal.fire({icon: "success",title: "Job Task Rejected", text: result_json.message});
        if(typeof refresh_task_details === 'function'){ refresh_task_details(); }
        else{ location.reload(); }
    }else{
        const errorMessage = result_json.message || "An unexpected error occurred. Please try again.";
        return Swal.showValidationMessage(`<strong>Error:&nbsp;</strong> ${errorMessage}`);
    }
}
// Sor Modify Start
let sorRowIndex = 1;
let sorTemplateRow = null;
let jobContractId = null;
let jobPropertyId = null;
let jobServiceId = null;
let jobId = null;
let taskId = null;
let validator = null;
async function initializeSors(){
    sorRowIndex = 1;
    await new Promise(resolve => setTimeout(resolve, 0));
    validator = $("#modifySORsForm").validate({
        onkeyup: false,
        rules: {
        },
        errorPlacement: function (error, element) {
            if (element.hasClass("select2") && element.next(".select2-container").length) {
                error.insertAfter(element.next(".select2-container"));
            } 
            else if (element.parent(".input-group").length || element.parent(".error-div").length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form) {
            var sub_button = $(form).find(":submit:first");
            ajs.submit_button_element = sub_button;
            var action = $(form).attr("action");
            var method = $(form).attr("method");

            var formData = $(form).serializeArray();
            // // Modify checkbox value if checked
            ajs.ajax_form(action, formData, method, null, "1", "1", ajs_form_handler.offcanvas_form3, ajs_form_handler.offcanvas_form3);

            setTimeout(function () {
                if(typeof refresh_task_details === 'function'){ refresh_task_details(); }
                else{ location.reload(); }
            }, 100);

            return false;
        },
    });

    $.validator.addMethod("validateDuplicateSor", function (value, element) {
        var isValid = true;
        var selectedValues = [];

        // Loop through each dropdown
        $('#task-sor-section .sor-id').each(function () {
            var val = $(this).val();

            if (val !== "") {
                if (selectedValues.includes(val)) {
                    if (element === this) {
                        isValid = false;
                    }
                }
                selectedValues.push(val);
            }
        });

        return isValid;
    }, "Duplicate task SOR selected.");

    $.validator.addMethod("validateQty", function (value, element) {
        checkOptionVal(element)
        return true
    }, "Enter valid quantity.");

    $(document).on("focusout focusin", "#task-sor-section .sor-qty", function(){
        checkOptionVal($(this));
    })

    function checkOptionVal(Obj){
        $this = $(Obj);
        let qty = $.trim($this.val());
        qty = parseInt(qty);
        if (qty < 1 || isNaN(qty)) 
        {
            qty = 1;
        }
        $this.val(qty)
    }
    sorTemplateRow = $(".task-sor-row").first().clone();
    $("#task-sor-section .task-sor-row").remove();
    initSORsOptions("sor_id_0");
    await sorsListEdit();

    async function sorsListEdit() {
        try {
            const sorData = await task_details(previousVisitURL);
            const sors = sorData.data.sors || [];
            sorAction($(".add-more-sors"), sorData.data.task_status);

            if (Array.isArray(sors) && sors.length) {
                sorRowIndex = 0;
                for (let i = 0; i < sors.length; i++) {
                    $(".add-more-sors").trigger('click', true);
                }

                sors.forEach((task_sor, index) => {
                    const isChargeable = task_sor.is_chargeable == 1;
                    const isPayable = task_sor.is_payable == 1;
                    const isCTP = task_sor.is_ctp == 1;

                    $(`input[name='task_sors[${index}][id]']`).val(task_sor.task_sor_id);
                    $(`input[name='task_sors[${index}][description]']`).val(task_sor.approval_description);
                    $(`input[name='task_sors[${index}][quantity]']`).val(task_sor.quantity);
                    $(`input[name='task_sors[${index}][material]']`).val(task_sor.material_price);
                    $(`input[name='task_sors[${index}][labor]']`).val(task_sor.labor_price);
                    $(`input[name='task_sors[${index}][sell]']`).val(task_sor.sell_price);
                    $(`input[name='task_sors[${index}][is_chargeable]']`).prop("checked", isChargeable);
                    $(`input[name='task_sors[${index}][is_payable]']`).prop("checked", isPayable).trigger('change');
                    $(`input[name='task_sors[${index}][is_ctp]']`).prop("checked", isCTP);
                    $("select[name='task_sors[" + index + "][pricing_model]']").val(task_sor.pricing_model);

                    if(task_sor?.is_fixed_price == 1){
                        $("input[name='task_sors[" + index + "][quantity]']").attr("readonly", true);
                        $(`input[name='task_sors[${index}][is_chargeable]']`).prop("disabled", true);
                        $(`input[name='task_sors[${index}][is_payable]']`).prop("disabled", true);
                        $("select[name='task_sors[" + index + "][pricing_model]']").attr("disabled", true);
                        $("#asset_id_" + index).attr("disabled", true);
                    }

                    const select2El = `sor_id_${index}`;
                    initSORsOptions(select2El,task_sor.id, true)
                    init_sor_asset(`asset_id_${index}`,task_sor.asset_id)
                    $(`#${select2El}`).parents(".task-sor-row").find(".remove-task-sor").remove();
                    addValidationRules(index);
                });
            }
        } catch (error) {
            console.log("Failed to load SOR data:", error);
        }
    } 

    $(document).on("click", ".remove-task-sor", function () {
        var parent = $(this).closest('.task-sor-row');
        parent.remove();
    });
}

function init_sor_asset(element, asset_id = null) {
    var filters = {property_id: jobPropertyId};
    if ($('#' + element).hasClass('select2-hidden-accessible'))
    {
        $("#" + element).select2("destroy");
        $("#" + element).empty();
    }
    add_autocomplete_custom('#' + element, site_url + 'api/asset_autocomplete', ['client_asset_number', 'serial_number', 'client_id'], filters, 'offcanvasRight3', asset_id);
}

/**
 * Reset SOR based on pricing model.
 */
function reset_band_sor(sor_element, row, asset_quantity) {
    const filters = {contract_id: jobContractId, service_id: jobServiceId, qty: asset_quantity, with_sor_details: true};
    ajs.ajax_form(site_url + 'contract_masterplan/unit_price', filters, 'GET', null, '1', '1', function (resp) {
        var res = resp && resp.message ? resp.message.data : null;
        if (res) {
            if (res.sor_id) {
                initSORsOptions(sor_element, res.sor_id, false, true);
                row.find('.material-rate').val(res.material_price);
                row.find('.labour-rate').val(res.labor_price);
                row.find('.sell-rate').val(res.sell_price);
                row.find('.desc').val(res.short_description || '');
            } else {
                initSORsOptions(sor_element);
            }
        }
    }, ajs_form_handler.show_errors);
}

/**
 * Reset SOR pricing and description for one task SOR rows.
 *
 */
function resetSorPricingAndDescription(row = null) {
    row.find(".material-rate, .labour-rate, .sell-rate, .desc").each(function () {
        $(this).val("").trigger("input");
    }); 
}

function addValidationRules(target) {
    const sorIdField = `task_sors[${target}][sor_id]`;
    const qtyField = `task_sors[${target}][quantity]`;

    validator.settings.rules[sorIdField] = {
        required: true,
        validateDuplicateSor: true
    };
    validator.settings.rules[qtyField] = {
        // required: true,
        validateQty: true,
    };
    validator.settings.messages[sorIdField] = {
        required: "Please select a valid SOR.",
        validateDuplicateSor: "Duplicate SOR selected, please choose a unique one."
    };
}
let lastActionCTP = null;
$(document).on("change", ".action-update-ctp", function (e) {
    e.preventDefault();
    lastActionCTP = $(this);
    let taskSOR = $.trim($(this).data("task-sor"));
    const ctpURL = `${site_url}task/sor/ctp/update/${taskSOR}`;
     ajs.ajax_form(ctpURL, null, "GET", null, "1", "1", handleCTPAction, handleCTPAction);
});

function handleCTPAction(result_json){
    if (ajs_form_handler.check_result(result_json)){
        Toastify({text: result_json.message, duration: 12000, gravity: "bottom", position: "right", close: true, }).showToast();
    }else{
        const message = result_json && result_json.message ? result_json.message : "An unexpected error occurred. Please try again.";
        Toastify({text: "Error: "+ message, duration: 12000, gravity: "bottom", position: "right", close: true, }).showToast();
        var statusCTP = lastActionCTP.is(":checked") ? false: true;
            lastActionCTP.prop("checked",statusCTP);
    }
}

$(document).on("change", ".payable-switch", function (e) {
    e.preventDefault();
    var  ctp = $(this).closest('.task-sor-row').find('.ctp-switch');
    if($(this).is(':checked')) {
        ctp.prop("disabled",false);
    } else {
        ctp.prop("checked",false);
        ctp.prop("disabled",true);
    }
});

$(document).on("click", ".add-more-sors", function (e, isEdit = false) {
    e.preventDefault();
    const newSorId = `sor_id_${sorRowIndex}`; 
    const newAssetId = `asset_id_${sorRowIndex}`;
    const clonedRow = sorTemplateRow.clone();
    clonedRow.find('.sor-id').prop('id', newSorId);
    clonedRow.find('.sor-asset').prop('id', newAssetId);
    clonedRow.find('.popup-form-search-button').attr('data-element', newSorId);
    clonedRow.html((i, oldHTML) => 
        oldHTML.replaceAll('task_sors[0]', `task_sors[${sorRowIndex}]`)
        );
    $("#task-sor-section").append(clonedRow);
    if (jobId && !isEdit) {
        initSORsOptions(newSorId);
        init_sor_asset(newAssetId);
    }
    addValidationRules(sorRowIndex)
    sorRowIndex++;
});

$(document).on('change', '#modifySORsForm .pricing-model', function () {

    const pricing_model = $(this).val();
    const row = $(this).closest('.task-sor-row');
    let sor_element = row.find('.sor-id').attr('id');
    let asset_quantity = row.find('.sor-qty').val() || 1;
    resetSorPricingAndDescription(row);
    if(!sor_element) {
        return false;
    }
    
    if (pricing_model == 3) {
        row.find('.sell-rate,.labour-rate').attr('disabled', false);
    } else {
        row.find('.sell-rate,.labour-rate').attr('disabled', true);
    }

    if (pricing_model == 2) {
        row.find('.sor-asset').attr('required', true);
        reset_band_sor(sor_element, row, asset_quantity);
    } else {
        row.find('.sor-asset').attr('required', false);
        initSORsOptions(sor_element);
    }
    
});

$(document).on('select2:select', '#modifySORsForm .sor-asset', function (e) {
    const asset = e.params.data?.item;
    const asset_quantity = asset?.quantity || 1;
    const row = $(this).closest('.task-sor-row');
    row.find('.sor-qty').val(asset_quantity);
    let sor_element = row.find('.sor-id').attr('id');
    let pricing_model = row.find('.pricing-model').val();
    resetSorPricingAndDescription(row);
    if(!sor_element) {
        return false;
    }
    if (pricing_model == 2) {
        reset_band_sor(sor_element, row, asset_quantity);
    } else {
        initSORsOptions(sor_element);
    }
});

$(document).on('select2:select', '.sor-id', function (e) {
    const sor = e.params.data?.item;
    const row = $(this).closest('.task-sor-row');
    let material_price = sor?.material_price || 0;
    let labor_price = sor?.labor_price || 0;
    let sell_price = sor?.sell_price || 0;
/* 
    if(sor && sor?.unit_rates?.length) {
        let unit_key = 0;
        let unit_matched = false;

        const asset_total_quantity = (task_assets || []).reduce((sum, asset) => {
            return sum + (Number(asset?.quantity) || 0);
        }, 0);

        
        $.each(sor.unit_rates, function(key, value) {
            if(value.unit_from <= asset_total_quantity && value.unit_to >= asset_total_quantity) {
                unit_key = key;
                unit_matched = true;
                return false; // break loop
            }
        });
        if(unit_matched) {
            ({labor_price, sell_price} = sor.unit_rates[unit_key]);
        }
    } */
    row.find('.desc').val(sor?.short_description || '');
    row.find('.material-rate').val(material_price);
    row.find('.labour-rate').val(labor_price);
    row.find('.sell-rate').val(sell_price);
});

function initSORsOptions(newSorId, sor_id=null, isDisabled = false, isReadonly = false) {
    //const contractSorUrl = `${site_url}contract_sor/get/${jobContractId}?start=0&end=1000`;
    const with_deleted = isDisabled ? 1 : 0;
    const jobSorUrl = `${site_url}job-workstream-sors/get/${jobId}?with_deleted=${with_deleted}`;
    //select2_ajax(`#${newSorId}`, jobSorUrl, ["title", "sor_code"], null, "offcanvasRight3", value);
    if ($(`#${newSorId}`).hasClass('select2-hidden-accessible'))
    {
        $(`#${newSorId}`).select2("destroy");
        $(`#${newSorId}`).empty();
    }
    if(sor_id > 0) {
        add_autocomplete_custom_dropdown(`#${newSorId}`, jobSorUrl, ["sor_code"], null, "offcanvasRight3", sor_id, null, site_url + 'sor/get/' + sor_id);
    } else {
        add_autocomplete_custom_dropdown(`#${newSorId}`, jobSorUrl, [ "sor_code"], null, "offcanvasRight3");
    }
    //$(`#${newSorId}`).attr('data-filters', JSON.stringify({ 'sors.contract_id': jobContractId }));
    if(isDisabled){
       $(`#${newSorId}`).prop('disabled', true).trigger('change.select2');
    }
    if(isReadonly){
       $(`#${newSorId}`).prop('readonly', true).trigger('change.select2');
    }
}

function cert_status_label(value) {
    if (value === null) return "-";
    value = String(value);
    switch (value) {
        case '0':
            return `<span class="badge border border-warning text-warning text-capitalize">Pending</span>`;
        case '1':
            return `<span class="badge border border-success text-success text-capitalize">Complete</span>`;
        case '2':
            return `<span class="badge border border-danger text-danger text-capitalize">Rejected</span>`;
        case '3':
            return `<span class="badge border border-success text-success text-capitalize">Update and approve</span>`;
        case '4':
            return `<span class="badge border border-success text-success text-capitalize">Approved</span>`;
        default:
            return "-";
    }
}

// status actions management start
const allowedActionsStatuses = ["TASK ABANDONED", "H&S FAIL", "ASBESTOS FAIL", "NO ACCESS", "TASK COMPLETE", "FURTHER WORKS", "MATERIALS REQUIRED", "COMPLETE", "REMOTE COMPLETE"];
const disallowedActionsStatuses = ["APPROVED", "REJECTED"];
function handleJobAction(thisObj, jobStatus) {
    if (["COMPLETE", "CANCELLED"].includes(jobStatus)) {
        $(thisObj).remove();
        return true;
    }
    return false;
}

function handleTaskAction(thisObj, taskStatus, reqBtn ='') {
    taskStatus = taskStatus.toUpperCase();
    if (!disallowedActionsStatuses.includes(taskStatus) && ajs.check_role('Jobs', 'approve')) {
        return true;
    }
    else{
        $(thisObj).remove();
    }
}

function handleCertificateAction(thisObj, taskStatus, certificateStatus) {
    taskStatus = taskStatus.toUpperCase();
    if ((certificateStatus == "1") && !disallowedActionsStatuses.includes(taskStatus)) {
        return true;
    }
    else{
        if(thisObj != null){
            $(thisObj).remove();
        }
        return false;
    }
}

function handleSorAction(thisObj, taskStatus, sorStatus) {
    taskStatus = taskStatus.toUpperCase();
    if (!disallowedActionsStatuses.includes(taskStatus)) {
        return true;
    }
    else{
        if(thisObj != null){
            $(thisObj).remove();
        }
        return false;
    }
}
function sor_labels(thisObj,status){
    if(status == "1"){
        $(thisObj).replaceWith(`<span class="badge border border-success text-success text-capitalize">CTP</span>`);
    }
    else if(status == "2"){
        $(thisObj).replaceWith(`<span class="badge border border-danger text-danger text-capitalize">Non-CTP</span>`);
    }
    else{
        $(thisObj).replaceWith(`<span class="badge border border-warning text-warning text-capitalize">Pending</span>`);
    }
}
// 
function sorAction(thisObj, taskStatus) {
    // alert(taskStatus)
    taskStatus = taskStatus.toUpperCase();
    if (!disallowedActionsStatuses.includes(taskStatus) && ajs.check_role('SORs', 'edit')) {
        return true;
    }
    else{
        $(thisObj).remove();
    }
}
// status actions management end

// // 
// $(document).on("click", ".action-sor-approve", function (e) {
//     e.preventDefault();

//     const action = $(this).data("action");
//     Swal.fire({
//         title: "Approve Task SOR",
//         text: "Are you sure you want to approve this Task SOR? This action cannot be undone.",
//         icon: "warning",
//         focusConfirm: false,
//         showCancelButton: true,
//         confirmButtonText: "Yes, Approve",
//         showLoaderOnConfirm: true,
//         preConfirm: async (comments) => {
//             try {
//                 const url = `${site_url}${action}`;
//                 return await ajs.ajax_form(url, null, "POST", null, "1", "1", approveSOR, approveSOR);
//             } catch (error) {
//                 Swal.showValidationMessage(`<strong>Request Failed:</strong> ${error.message}`);
//             }
//         },
//         allowOutsideClick: () => !Swal.isLoading(),
//     })
// });
// function approveSOR(result_json){
//     if (ajs_form_handler.check_result(result_json)){
//         Swal.fire({icon: "success",title: "SOR Approved", text: result_json.message});
//         if(typeof refresh_task_details === "function"){ refresh_task_details(); }
//     }else{
//         const errorMessage = result_json.message || "An unexpected error occurred. Please try again.";
//         return Swal.showValidationMessage(`<strong>Error:&nbsp;</strong> ${errorMessage}`);
//     }
// }
// // Approve task sor

// // Reject task sor
// $(document).on("click", ".action-sor-reject", function (e) {
//     e.preventDefault();

//     const action = $(this).data("action");
//     Swal.fire({
//         title: "Reject Task SOR",
//         text: "Are you sure you want to reject this Task SOR? Please provide a reason below.",
//         icon: "warning",
//         input: "textarea",
//         inputAttributes: {
//             autocapitalize: "off",
//             placeholder: "Enter your reason for rejection...",
//         },
//         focusConfirm: false,
//         showCancelButton: true,
//         confirmButtonText: "Yes, Reject",
//         showLoaderOnConfirm: true,
//         customClass: {
//             confirmButton: 'swal2-deny',
//         },
//         preConfirm: async (comment) => {
//             if ($.trim(comment) === "") {
//                 return Swal.showValidationMessage("Rejection reason is required.");
//             }
//             try {
//                 const url = `${site_url}${action}`;
//                 return await ajs.ajax_form(url, {comment}, "POST", null, "1", "1", rejectSOR, rejectSOR);
//             } catch (error) {
//                 Swal.showValidationMessage(`<strong>Request Failed:</strong> ${error.message}`);
//             }
//         },
//         allowOutsideClick: () => !Swal.isLoading(),
//     })
// });
// function rejectSOR(result_json){
//     if (ajs_form_handler.check_result(result_json)){
//         Swal.fire({icon: "success",title: "SOR Rejected", text: result_json.message});
//         if(typeof refresh_task_details === "function"){ refresh_task_details(); }
//     }else{
//         const errorMessage = result_json.message || "An unexpected error occurred. Please try again.";
//         return Swal.showValidationMessage(`<strong>Error:&nbsp;</strong> ${errorMessage}`);
//     }
// }
// // Reject task sor
if (typeof initValidations !== "function") {
    function initValidations(){
        $(".check_actions").each(function(){
            var action = $(this).data("actions");
            eval(action)
        })
    }
}