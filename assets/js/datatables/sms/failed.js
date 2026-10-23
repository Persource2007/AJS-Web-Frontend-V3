var table = null;

function isBlockedFlag(v) {
    return String(v) === '1' || v === 1 || v === true;
}

function isPermanentFailure(v) {
    return String(v) === '1' || v === 1 || v === true;
}

function renderBlockedCell(data, type, row) {
    var blocked = isBlockedFlag(row.is_blocked);
    var id = row.id;
    // Disabled rather than removed without the edit right: the switch is also how the blocked
    // state is displayed, so dropping it would hide information a viewer is allowed to see.
    var readonly = !ajs.check_role('SMS Failed', 'edit');
    return (
        '<div class="d-flex align-items-center toggle-block-wrap" data-row-id="' + id + '">' +
        '<div class="form-check form-switch m-0">' +
        '<input class="form-check-input toggle-block" type="checkbox" role="switch" data-id="' + id + '" ' +
        (blocked ? 'checked' : '') + (readonly ? ' disabled' : '') + ' id="toggle-block-' + id + '" ' +
        'title="' + (blocked ? 'Blocked' : 'Not blocked') + '">' +
        '</div>' +
        '</div>'
    );
}

function updateRowBlockState($checkbox, isBlockedVal) {
    var blocked = isBlockedFlag(isBlockedVal);
    $checkbox.prop('checked', blocked);
    $checkbox.attr('title', blocked ? 'Blocked' : 'Not blocked');
}

function formatDateTime(val) {
    if (!val) {
        return '';
    }
    if (typeof moment !== 'undefined') {
        return moment(val).format('DD/MM/YYYY HH:mm:ss');
    }
    return val;
}

$(document).ready(function () {
    var breadcrumbs = [{ label: 'Failed SMS', url: null }];
    set_breadcrumb(breadcrumbs);

    table = $('#sms-failed-table').DataTable({
        processing: true,
        serverSide: true,
        pageLength: 50,
        ajax: {
            url: site_url + 'api/sms/failed-list',
            type: 'GET',
            beforeSend: function (xhr, settings) {
                if (typeof ajs !== 'undefined' && ajs.set_auth_header) {
                    ajs.set_auth_header(xhr, settings);
                }
            },
            data: function (d) {
                d.page = d.start / d.length + 1;
                d.limit = d.length;
                d.search = $('#search_term').val();
            },
            dataSrc: function (json) {
                if (!json || json.status === false) {
                    json.recordsTotal = 0;
                    json.recordsFiltered = 0;
                    return [];
                }
                var p = json.pagination || {};
                json.recordsTotal = typeof p.total_records !== 'undefined' ? p.total_records : 0;
                json.recordsFiltered = typeof p.total_records !== 'undefined' ? p.total_records : 0;
                return json.data || [];
            },
            error: function (xhr) {
                var msg = 'Failed to load failed SMS list.';
                if (xhr.status === 401) {
                    msg = 'You are not authenticated. Please sign in again.';
                } else if (xhr.responseJSON && xhr.responseJSON.message) {
                    msg = xhr.responseJSON.message;
                }
                if (typeof Swal !== 'undefined') {
                    Swal.fire({ icon: 'error', title: 'Error', text: msg, confirmButtonColor: '#157347' });
                }
            },
        },
        columns: [
            { data: 'phone_number', defaultContent: '-' },
            {
                data: null,
                orderable: false,
                render: function (data, type, row) {
                    var code = row.failure_code != null ? row.failure_code : '';
                    var desc = row.failure_description != null ? row.failure_description : '';
                    if (code && desc) {
                        return '<strong>' + $('<div>').text(code).html() + '</strong><br><span class="text-muted small">' + $('<div>').text(desc).html() + '</span>';
                    }
                    return code || desc || '-';
                },
            },
            {
                data: 'message_summary',
                render: function (data) {
                    if (!data) {
                        return '-';
                    }
                    var s = String(data);
                    var t = s.length > 80 ? s.substr(0, 80) + '…' : s;
                    return $('<div/>').text(t).html();
                },
            },
            {
                data: 'occurred_at',
                render: function (data) {
                    return formatDateTime(data);
                },
            },
            {
                data: 'add_date',
                render: function (data) {
                    return formatDateTime(data);
                },
            },
            {
                data: 'permanent_failure',
                render: function (data) {
                    if (isPermanentFailure(data)) {
                        return '<span class="badge border border-warning text-warning text-capitalize">Permanent</span>';
                    }
                    return '<span class="badge border border-indigo text-indigo text-capitalize">Not permanent</span>';
                },
            },
            {
                data: 'is_blocked',
                orderable: false,
                searchable: false,
                render: renderBlockedCell,
            },
        ],
        order: [[3, 'desc']],
        language: {
            processing: 'Loading…',
            search: 'Search:',
        },
    });

    $('#refresh-table').on('click', function () {
        table.ajax.reload(null, false);
    });

    // Use #sms-failed-search-btn (not #search_grid): global datatable-defaults.js binds #search_grid to
    // get_search_filter_data(), which references `dataTable` — undefined on this page and throws.
    function reloadFailedSmsSearch() {
        table.ajax.reload(null, true);
    }

    $('#sms-failed-search-btn').on('click', function (e) {
        e.preventDefault();
        reloadFailedSmsSearch();
    });

    $('#form_filters').on('submit', function (e) {
        e.preventDefault();
        reloadFailedSmsSearch();
    });

    $('#search_term').on('keydown', function (e) {
        if (e.key === 'Enter' || e.which === 13) {
            e.preventDefault();
            reloadFailedSmsSearch();
        }
    });

    $('#sms-failed-reset-btn').on('click', function (e) {
        e.preventDefault();
        $('#search_term').val('');
        table.ajax.reload(null, true);
    });

    $('#sms-failed-table tbody').on('change', '.toggle-block', function () {
        var $cb = $(this);
        var id = $cb.data('id');
        if (id === undefined || id === null) {
            return;
        }

        var desiredBlocked = $cb.prop('checked');
        var previousBlocked = !desiredBlocked;
        $cb.prop('checked', previousBlocked);

        Swal.fire({
            title: desiredBlocked ? 'Block Number' : 'Unblock Number',
            text: 'Are you sure?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#157347',
            showLoaderOnConfirm: true,
            allowOutsideClick: function () {
                return !Swal.isLoading();
            },
            preConfirm: function () {
                return new Promise(function (resolve, reject) {
                    $cb.prop('disabled', true);
                    $.ajax({
                        type: 'POST',
                        url: site_url + 'api/sms/toggle-block/' + encodeURIComponent(id),
                        beforeSend: function (xhr, settings) {
                            if (typeof ajs !== 'undefined' && ajs.set_auth_header) {
                                ajs.set_auth_header(xhr, settings);
                            }
                        },
                    })
                        .done(function (resp) {
                            if (!resp || !resp.status) {
                                Swal.showValidationMessage((resp && resp.message) || 'Update failed');
                                reject(new Error('validation'));
                                return;
                            }
                            resolve(resp);
                        })
                        .fail(function (xhr) {
                            var msg = 'Request failed';
                            if (xhr.status === 401) {
                                msg = 'You are not authenticated. Please sign in again.';
                            } else if (xhr.responseJSON && xhr.responseJSON.message) {
                                msg = xhr.responseJSON.message;
                            } else if (xhr.status === 404) {
                                msg = 'Record not found.';
                            } else if (xhr.status === 400) {
                                msg =
                                    xhr.responseJSON && xhr.responseJSON.message
                                        ? xhr.responseJSON.message
                                        : 'Invalid request.';
                            }
                            Swal.showValidationMessage(msg);
                            reject(xhr);
                        })
                        .always(function () {
                            $cb.prop('disabled', false);
                        });
                });
            },
        }).then(function (result) {
            if (result.isConfirmed && result.value && result.value.status) {
                updateRowBlockState($cb, result.value.is_blocked);
                Swal.fire({
                    icon: 'success',
                    title: result.value.message || 'Updated',
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
        });
    });
});

function load_data_table(limit, search_term, filters) {
    if (table) {
        table.ajax.reload(null, true);
    }
}
