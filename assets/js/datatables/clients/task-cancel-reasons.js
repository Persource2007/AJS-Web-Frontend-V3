/**
 * Per-client Task Cancellation Reasons
 * Manage the reason list shown in the task-cancel dropdown for this client.
 * If a client has no reasons, the app falls back to the default (Havering) list.
 *
 * Endpoints:
 *   GET  client/cancel-reasons/{client_id}   -> { status, data: [ {id, reason_code, reason_label, position, status} ] }
 *   POST client/cancel-reason/save           -> { status, id }   (client_id, id?, reason_code, reason_label, position)
 *   POST client/cancel-reason/delete         -> { status }       (id)
 */

var tcrState = { clientId: null, items: [] };

function tcr_esc(s) { return $('<div>').text(s == null ? '' : String(s)).html(); }
function tcr_escAttr(s) { return tcr_esc(s).replace(/"/g, '&quot;'); }

function init_task_cancel_reasons() {
    var cid = $('#client_id').val();
    if (!cid || cid <= 0) { return; }
    tcrState.clientId = cid;
    load_task_cancel_reasons_list();
}

function load_task_cancel_reasons_list() {
    ajs.ajax_form(
        site_url + 'client/cancel-reasons/' + tcrState.clientId,
        null, 'GET', null, '0', '0',
        function (res) {
            tcrState.items = (res && res.data) ? res.data : [];
            render_task_cancel_reasons();
        },
        function () {
            $('#task-cancel-reasons-container').html(
                '<div class="alert alert-danger mb-0"><i class="ri-error-warning-line me-2"></i>' +
                'Could not load cancellation reasons. ' +
                '<button type="button" class="btn btn-sm btn-outline-danger ms-2" onclick="load_task_cancel_reasons_list()">' +
                '<i class="ri-refresh-line"></i> Retry</button></div>'
            );
        }
    );
}

function render_task_cancel_reasons() {
    var rows = '';
    (tcrState.items || []).forEach(function (r) {
        rows += '<tr data-id="' + r.id + '">' +
            '<td><input type="text" class="form-control form-control-sm tcr-code" value="' + tcr_escAttr(r.reason_code) + '" maxlength="50"></td>' +
            '<td><input type="text" class="form-control form-control-sm tcr-label" value="' + tcr_escAttr(r.reason_label) + '"></td>' +
            '<td class="text-end text-nowrap">' +
                '<button type="button" class="btn btn-sm btn-soft-primary tcr-save me-1"><i class="ri-save-line"></i></button>' +
                '<button type="button" class="btn btn-sm btn-soft-danger tcr-del"><i class="ri-delete-bin-line"></i></button>' +
            '</td></tr>';
    });
    if (!rows) {
        rows = '<tr><td colspan="3" class="text-muted text-center py-2">No custom reasons — the default list is used for this client.</td></tr>';
    }

    var html =
        '<p class="text-muted small mb-3 mt-3">Reasons shown in the task cancellation dropdown for this client. ' +
        'Leave empty to use the default list. <strong>Code</strong> is stored on the task; <strong>Label</strong> is shown to the user.</p>' +
        '<div class="table-responsive"><table class="table table-sm align-middle mb-2">' +
        '<thead class="table-light"><tr><th style="width:30%">Code</th><th>Label</th><th class="text-end" style="width:110px">Actions</th></tr></thead>' +
        '<tbody id="tcr-rows">' + rows + '</tbody>' +
        '<tfoot><tr class="tcr-add-row">' +
            '<td><input type="text" id="tcr-new-code" class="form-control form-control-sm" placeholder="e.g. OFFSICK" maxlength="50"></td>' +
            '<td><input type="text" id="tcr-new-label" class="form-control form-control-sm" placeholder="e.g. Operative off sick"></td>' +
            '<td class="text-end"><button type="button" class="btn btn-sm btn-success" id="tcr-add"><i class="ri-add-line"></i> Add</button></td>' +
        '</tr></tfoot>' +
        '</table></div>';

    $('#task-cancel-reasons-container').html(html);
}

function tcr_save(payload, done) {
    var data = [
        { name: 'client_id', value: tcrState.clientId },
        { name: 'reason_code', value: payload.code },
        { name: 'reason_label', value: payload.label },
        { name: 'position', value: payload.position || 0 }
    ];
    if (payload.id) { data.push({ name: 'id', value: payload.id }); }
    ajs.ajax_form(site_url + 'client/cancel-reason/save', data, 'POST', null, '1', '1', function (res) {
        if (res && res.status && typeof done === 'function') { done(); }
    });
}

// Delegated events (container is re-rendered on each load).
$(function () {
    if (!$('#task-cancel-reasons-container').length) { return; }
    init_task_cancel_reasons();

    $('#task-cancel-reasons-container')
        .on('click', '#tcr-add', function () {
            var code = $.trim($('#tcr-new-code').val());
            var label = $.trim($('#tcr-new-label').val());
            if (!code || !label) {
                ajs_form_handler.show_blocking_error('Please enter both a code and a label.');
                return;
            }
            tcr_save({ code: code, label: label, position: (tcrState.items || []).length }, load_task_cancel_reasons_list);
        })
        .on('click', '.tcr-save', function () {
            var $tr = $(this).closest('tr');
            var id = $tr.data('id');
            var code = $.trim($tr.find('.tcr-code').val());
            var label = $.trim($tr.find('.tcr-label').val());
            if (!code || !label) {
                ajs_form_handler.show_blocking_error('Please enter both a code and a label.');
                return;
            }
            tcr_save({ id: id, code: code, label: label, position: $tr.index() }, load_task_cancel_reasons_list);
        })
        .on('click', '.tcr-del', function () {
            var id = $(this).closest('tr').data('id');
            if (!id) { return; }
            var go = function () {
                ajs.ajax_form(site_url + 'client/cancel-reason/delete', [{ name: 'id', value: id }], 'POST', null, '1', '1', function (res) {
                    if (res && res.status) { load_task_cancel_reasons_list(); }
                });
            };
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: 'Remove reason?', icon: 'warning', showCancelButton: true,
                    confirmButtonText: 'Remove', confirmButtonColor: '#dc3545'
                }).then(function (r) { if (r.isConfirmed) { go(); } });
            } else if (window.confirm('Remove this reason?')) { go(); }
        });
});
