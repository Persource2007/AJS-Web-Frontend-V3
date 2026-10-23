var master_data_type = "bulkimport";
dataTable = null;

var breadcrumbs = [
    { label: 'Bulk Import', url: 'javascript: void(0);' }
];

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
    dataTable = new DataTable("#ajax-datatables", {
        scrollY: (screen.height - 450) + 'px',
        scrollX: true,  
        autoWidth: false,
        serverSide: true,
        processing: true,
        paging: true,
        responsive: false,
        bDestroy: true,
        pageLength: page_limit,
        search: {
            search: search
        },
        
        
        ajax: {
            url: site_url + "bulk_import/get_all",
            method: "get",
            async: false,
            dataSrc: 'data',
            "data": function (d) {
                return $.extend({}, d, {
                    data_filters
                });
            },
            "error": function (xhr, error, thrown) {
                ajs.datatable_error(xhr, "ajax-datatables");
                if (xhr.status !== 200) {
                    $('#ajax-datatables').html('<p>No data found.</p>'); // Display "No data found" message if 404 error
                }
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            }
        },
        language: {
            emptyTable: "No data found",
        },
        columns: [
            {
                data: 'id',
                searchable: false,
                orderable: false,
                visible: false       
            },            
            {
                name: "batch_id",
                data: "batch_id",
                className: "ps-4"               
            }
            ,
            {
                name: "module",
                data: "module",
                render: function (data) {
                    return data ? data.replace('_', ' ') : data;
                }
            }, 
            {
                name: "add_date",
                data: "add_date",
                render: function (data, type, row) {
                    return ajs.format_date(row.add_date);
                }
            },         
            {
                name: "added_by_name",
                data: "added_by_name",
                render: function (data, type, row) {
                    return row.added_by_name;
                }
            },            
            {
                name: "file_path",
                data: "file_path",
                orderable: false,
                render: function (data, type, row) {
                    var download_btn = '';
                    var view_url = cdn_url + 'bulk-import/details/' + row.module + '/' + row.batch_id;
                    var view_btn = '<a href="' + view_url + '" target="_blank">'+view_icon(true)+'</a>';
                    // list_delete is the class apply_ind_roles() strips when the role has no
                    // delete right - the same gate every other list uses for its bin icon.
                    var delete_btn = '<a href="javascript:void(0);" class="bulk-import-delete list_delete" data-id="' + row.id + '" title="Delete">' +
                        '<i class="ri-delete-bin-line text-danger align-bottom me-2 fs-15"></i></a>';
                    if (data && data !== '') {
                        var download_btn = '<a href="' + data + '" target="_blank" ><i class="ri-download-2-line align-bottom me-2 fs-15"></i></a>';
                    }
                    return view_btn + download_btn + delete_btn;
                }
            }
        ],
        order: [
            ['1', 'desc']
        ],
        drawCallback: function () {
            // Rows are rebuilt on every draw, so the delete gate has to be re-applied here.
            ajs.apply_ind_roles("Bulk Import");
        }
    });    
}


if ($('#ajax-datatables').length)
{
    fetch_default_filter(master_data_type);
    set_breadcrumb(breadcrumbs);
}

// The Import and Export controls live in the PHP view, not in the grid, so they need their own
// pass - the drawCallback above only runs when the table redraws. This also lifts the pre-paint
// gate in commons/header.php, so they are never shown before the rights are known.
$(function () {
    ajs.apply_ind_roles("Bulk Import");
});


$('.import-type-option').on('click', function (e) {
    e.preventDefault();

    const type = $(this).data('type');
    const label = $(this).text();

    // Update button text
    $('#selectedImportType').text(label);

    // Show import action
    $('#job_import_action').removeClass('d-none');
    console.log('Selected import type:', type);
    // Set upload type
    $('.bulk-upload-form').data('upload-type', type);

    // Template mapping
    const templates = {
        'jobs': site_url + 'resources/templates/ajs-jobs.xlsx',
        'job_tasks': site_url + 'resources/templates/ajs-job-tasks.xlsx',
        'task_sors': site_url + 'resources/templates/ajs-job-tasks-sors.xlsx'
    };

    $('#job_import_template').attr('href', templates[type]);
    // If job_tasks selected, load existing job import batches for export from backend
    if (type === 'job_tasks') {
        $('#job_import_export').removeClass('d-none');
        $('#job_import_export').data('export-type', 'job_tasks');
        ajs.ajax_form(site_url + 'bulk_import/batches?module=jobs', null, 'GET', null, '0', '0', function (data) {
            var $sel = $('#job_batch_select');
            $sel.empty().append($('<option>').val('').text('Select batch'));
            if (Array.isArray(data) && data.length) {
                data.forEach(function (b) {
                    var label = b.batch_id + ' (' + b.add_date + ')';
                    $sel.append($('<option>').val(b.batch_id).text(label));
                });
            }
        });
    } else if (type === 'task_sors') {
        $('#job_import_export').removeClass('d-none');
        $('#job_import_export').data('export-type', 'task_sors');
        ajs.ajax_form(site_url + 'bulk_import/batches?module=job_tasks', null, 'GET', null, '0', '0', function (data) {
            var $sel = $('#job_batch_select');
            $sel.empty().append($('<option>').val('').text('Select batch'));
            if (Array.isArray(data) && data.length) {
                data.forEach(function (b) {
                    var label = b.batch_id + ' (' + b.add_date + ')';
                    $sel.append($('<option>').val(b.batch_id).text(label));
                });
            }
        });      
    } else {
        $('#job_import_export').addClass('d-none');
    }
});

// enable export button when a batch is selected
$(document).on('change', '#job_batch_select', function () {
    var val = $(this).val();
    $('#job_batch_export').prop('disabled', !val);
});

// export handler - fetch job codes and generate Excel from template
$(document).on('click', '#job_batch_export', function (e) {
    e.preventDefault();
    var batch = $('#job_batch_select').val();
    if (!batch) return;
    var Type = $('#job_import_export').data('export-type');
    // console.log('Exporting batch', batch, 'type', Type);
     var templateUrl = '';
     var ajaxUrl = '';
    if(Type == 'job_tasks'){
        templateUrl = cdn_url + 'resources/uploads/ajs-job-tasks.xlsx';
        ajaxUrl = site_url + 'bulk_import/export_job_tasks?batch_id=' + batch;
    } else if(Type == 'task_sors'){
        templateUrl = cdn_url + 'resources/uploads/ajs-job-tasks-sors.xlsx';
        ajaxUrl = site_url + 'bulk_import/export_task_sors?batch_id=' + batch;
    }
    
    ajs.ajax_form(ajaxUrl, null, 'GET', null, '0', '0', function (resp) {
        console.log('Export data received', resp);
        var codes = resp.codes || [];
        if(templateUrl == '') return;
        fetch(templateUrl).then(function (res) { return res.arrayBuffer(); }).then(function (ab) {
            var wb = XLSX.read(new Uint8Array(ab), { type: 'array' });
            var firstSheet = wb.SheetNames[0];
            var ws = wb.Sheets[firstSheet];

            for (var i = 0; i < codes.length; i++) {
                var row = i + 2;

                // Set column A
                ws['A' + row] = { t: 's', v: codes[i] || '' };

                // Clear columns B to AK (including AA, AB, etc.)
                for (var colIndex = 1; colIndex <= 36; colIndex++) { // B=1, AK=36
                    var colName = XLSX.utils.encode_col(colIndex);
                    ws[colName + row] = { t: 's', v: '' };
                }
            }
            var maxRow = Math.max(1, codes.length + 1);
            ws['!ref'] = 'A1:AK' + maxRow;
            var out = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            var blob = new Blob([out], { type: 'application/octet-stream' });
            var fname = Type + '_batch_' + batch + '.xlsx';
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fname;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch(function (err) { console.error(err); alert('Failed to load template for export.'); });
    });
});

$(document).on('click', '.bulk-import-delete', function (e) {
    e.preventDefault();    

    var batchId = $(this).data('id');
    var confirmSent = false;

    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete this bulk import batch?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        showLoaderOnConfirm: true,
        preConfirm: async function () {
            try {
                var requestData = confirmSent ? { confirm: true } : null;
                var method = 'DELETE';
                const response = await ajaxWithRefresh({
                    type: method,
                    url: site_url + 'job/delete_bulk_import/' + batchId,
                    data: requestData
                });                

                if (!ajs_form_handler.check_result(response)) {
                    if (response.confirm) {
                        confirmSent = true;
                        Swal.getConfirmButton().textContent = 'Yes, confirm delete';
                        return Swal.showValidationMessage('<strong>' + (response.message || 'One or more jobs have already been started.') + '</strong>');
                    }

                    Swal.fire({
                        title: 'Error',
                        icon: 'error',
                        text: response.message || 'Unable to delete this bulk import record.'
                    });
                    return false;
                }

                return response;
            } catch (error) {
                
                var errorMsg = 'Something went wrong. Please try again...';
                if (error.responseJSON && error.responseJSON.message) {
                    errorMsg = error.responseJSON.message;
                }
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: errorMsg
                });
                return false;
            }
        },
        allowOutsideClick: function () {
            return !Swal.isLoading();
        }
    }).then(function (result) {
        if (result.isConfirmed && result.value && ajs_form_handler.check_result(result.value)) {
            Swal.fire({
                icon: 'success',
                text: result.value.message || 'Bulk import record deleted successfully.'
            });
            ajs.refreshDataTable();
        }
    });
});