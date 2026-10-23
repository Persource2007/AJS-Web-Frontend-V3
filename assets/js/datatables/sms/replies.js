var dataTable = null;
var table = null;
$(document).ready(function () {
    var breadcrumbs = [
        {label: "SMS Replies", url: null},
    ];
    set_breadcrumb(breadcrumbs);
    table = $('#sms-replies-table').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": site_url + "api/sms/replies",
            "type": "GET",
            "data": function (d) {
                // Map DataTables parameters to API parameters
                d.page = (d.start / d.length) + 1;
                d.limit = d.length;
                d.search = $('#search_term').val();
                d.search_uprn = $('#search_uprn').val();
            },
            "dataSrc": function (json) {
                // Determine total records for pagination
                json.recordsTotal = json.pagination.total_records;
                json.recordsFiltered = json.pagination.total_records;
                return json.data;
            }
        },
        "columns": [
            { "data": "from_number" },
            {
                "data": "message",
                "render": function (data, type, row) {
                    return data.length > 50 ? data.substr(0, 50) + '...' : data;
                }
            },
            {
                "data": "received_at",
                "render": function (data, type, row) {
                    if (data) {
                        return moment(data).format('DD/MM/YYYY HH:mm:ss');
                    }
                    return '';
                }
            },
            {
                "data": "uprn",
                "render": function (data, type, row) {
                    return data ? gen_property_detail_link(row.property_id,data) : '-';
                }
            },
            {
                "data": "job_code",
                "render": function (data, type, row) {
                    if (data) {
                        return '<a href="' + cdn_url + 'job/details/' + ajs.hash_encode(row.job_id) + '" target="_blank">' + data + '</a>';
                    }
                    return '-';
                }
            },
            {
                "data": null,
                "orderable": false,
                "searchable": false,
                "render": function (data, type, row) {
                    var viewBtn = '<a href="javascript:void(0);" class="view-details"><i title="View" class="ri-eye-line align-bottom me-2 primary-btn cursor-pointer fs-15"></i></a>';
                    // Replying sends an SMS, so it needs the edit right; viewing the thread does not.
                    var replyBtn = '<a href="javascript:void(0);" class="popup-form-button check-permission" data-module="SMS Replies" data-action="edit" data-form-url="' + cdn_url + 'system/sms/reply/' + row.from_number + '" data-heading="Reply SMS" data-after-load-func="reply_sms_form"><i title="Reply" class="ri-reply-line align-bottom me-2 primary-btn cursor-pointer fs-15"></i></a>';
                    return viewBtn + replyBtn;
                }
            }
        ],
        "order": [[2, "desc"]], // Sort by Received At descending by default
        "language": {
            "processing": "Loading...",
            "search": "Search:"
        },
        "drawCallback": function () {
            // Row actions are rebuilt on every draw, so the Reply gate is re-applied here.
            ajs.apply_permissions();
        }
    });

    $('#refresh-table').on('click', function () {
        table.ajax.reload();
    });

    // View Details Modal Logic
    $('#sms-replies-table tbody').on('click', '.view-details', function () {
        var data = table.row($(this).parents('tr')).data();
        if (data) {
            $('#modal-from-number').val(data.from_number);
            $('#modal-received-at').val(moment(data.received_at).format('DD/MM/YYYY HH:mm:ss'));
            $('#modal-message').val(data.message);

            var modal = new bootstrap.Modal(document.getElementById('viewMessageModal'));
            modal.show();
        }
    });

});

function reply_sms_form() {
    $("#replySmsForm").validate({
        rules: {
            to: {
                required: true,
            },
            message: {
                required: true,
            },
        },
        submitHandler: function (form) {
            var sub_button = $(form).find(":submit:first");
            ajs.submit_button_element = sub_button;
            var action = $(form).attr("action");
            var method = $(form).attr("method");
            var formData = $(form).serializeArray();

            ajs.ajax_form(action, formData, method, null, "1", "1", ajs_form_handler.offcanvas_form, ajs_form_handler.offcanvas_form);
            
            return false;
        },
    });
}

function load_data_table(limit, search_term, filters) {
    table.ajax.reload();
}
