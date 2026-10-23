/**
 * Contract Certificate Code Settings
 * Lists every active certificate from certificate_master with its name (label) and code
 * (editable). Each code defaults to the master certificate_code and can be overridden
 * per-contract. Only changed codes are persisted; reverting to the default clears the
 * override. Stored in client_certificate_code_settings by (contract_id, certificate_id).
 *
 * API Base: site_url (e.g. https://dev-api.ajs.co.uk or /api)
 * Auth: Bearer token via ajs.set_auth_header(xhr)
 *
 * Endpoints:
 *   GET  /contract/{contract_id}/certificate_codes  - fetch on page load
 *   POST /contract/{contract_id}/certificate_codes  - save overrides (Content-Type: application/json)
 *
 * GET success:  { status: true, data: [ { certificate_id, name, default_code, code, is_overridden }, ... ] }
 * POST success: { status: true, message: "Certificate codes saved successfully" }
 */

// -----------------------------------------------------------------------
// State
// -----------------------------------------------------------------------
var certCodesState = {
    contractId: null,
    items: [],          // [{ certificate_id, name, default_code, code }]
    isLoading: false,
    isSaving: false,
    error: null,
    success: false
};

// -----------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------
function cert_codes_escape(str) {
    return $('<div>').text(str == null ? '' : String(str)).html();
}

function cert_codes_escape_attr(str) {
    return cert_codes_escape(str).replace(/"/g, '&quot;');
}

// -----------------------------------------------------------------------
// Init
// -----------------------------------------------------------------------
function init_certificate_codes() {
    var contractId = $('#client_id').val();
    if (!contractId || contractId <= 0) {
        show_certificate_codes_error('Invalid contract ID');
        return;
    }

    certCodesState.contractId = contractId;
    load_certificate_codes();
}

// -----------------------------------------------------------------------
// Load (GET)
// -----------------------------------------------------------------------
function load_certificate_codes() {
    certCodesState.isLoading = true;
    certCodesState.error = null;
    update_certificate_codes_loading(true);

    ajs.ajax_form(
        site_url + 'client/' + certCodesState.contractId + '/certificate_codes',
        null,
        'GET',
        null,
        '0',
        '0',
        handle_certificate_codes_load_success,
        handle_certificate_codes_load_error
    );
}

function handle_certificate_codes_load_success(result_json) {
    certCodesState.isLoading = false;

    if (result_json && result_json.status) {
        var data = result_json.data || [];

        certCodesState.items = data.map(function (row) {
            return {
                certificate_id: parseInt(row.certificate_id, 10),
                name: row.name || '',
                default_code: row.default_code != null ? String(row.default_code) : '',
                code: row.code != null ? String(row.code) : ''
            };
        });

        certCodesState.error = null;
        certCodesState.success = false;
        render_certificate_codes();
    } else {
        handle_certificate_codes_load_error(result_json);
    }
}

function handle_certificate_codes_load_error(result_json) {
    certCodesState.isLoading = false;
    var msg = (result_json && result_json.message) ? result_json.message : 'Failed to load certificate codes';
    show_certificate_codes_error(msg);
}

// -----------------------------------------------------------------------
// Render
// -----------------------------------------------------------------------
function render_certificate_codes() {
    var container = $('#certificate-codes-container');
    if (!container.length) { return; }

    if (!certCodesState.items.length) {
        container.html('<div class="alert alert-info mb-0" role="alert">' +
            '<i class="ri-information-line me-2"></i>No certificates found.</div>');
        return;
    }

    var rowsHtml = certCodesState.items.map(function (item, idx) {
        var isOverridden = item.code !== item.default_code;
        return '<tr>' +
            '<td class="align-middle fw-medium">' + cert_codes_escape(item.name) + '</td>' +
            '<td>' +
            '<input type="text" class="form-control form-control-sm cert-code-input" ' +
            'data-idx="' + idx + '" data-field="code" ' +
            'value="' + cert_codes_escape_attr(item.code) + '" ' +
            'placeholder="' + cert_codes_escape_attr(item.default_code) + '" ' +
            'aria-label="Code for ' + cert_codes_escape_attr(item.name) + '">' +
            '</td>' +
            '<td class="align-middle text-muted small">' +
            (isOverridden
                ? '<span class="badge bg-warning-subtle text-warning">Overridden</span> Default: ' + cert_codes_escape(item.default_code)
                : '<span class="badge bg-light text-muted">Default</span>') +
            '</td>' +
            '</tr>';
    }).join('');

    var alertHtml = '';
    if (certCodesState.error) {
        alertHtml = '<div class="alert alert-danger mb-3" role="alert">' +
            '<i class="ri-error-warning-line me-2"></i>' + cert_codes_escape(certCodesState.error) +
            '</div>';
    }
    if (certCodesState.success) {
        alertHtml = '<div class="alert alert-success mb-3" role="alert">' +
            '<i class="ri-checkbox-circle-line me-2"></i>Certificate codes saved successfully.' +
            '</div>';
    }

    var html = alertHtml +
        '<div class="table-responsive">' +
        '<table class="table table-sm table-bordered align-middle mb-0">' +
        '<thead class="table-light">' +
        '<tr>' +
        '<th>Certificate</th>' +
        '<th style="width:220px;">Code</th>' +
        '<th style="width:240px;">Status</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' + rowsHtml + '</tbody>' +
        '</table>' +
        '</div>' +
        '<div class="d-flex justify-content-end mt-3 check-permission" data-module="Clients" data-action="edit">' +
        '<button type="button" class="btn btn-success" id="certificate-codes-save-btn">' +
        '<span class="save-codes-text">Save Codes</span>' +
        '<span class="save-codes-spinner spinner-border spinner-border-sm d-none ms-1" role="status" aria-hidden="true"></span>' +
        '</button>' +
        '</div>';

    container.html(html);
    // Re-applied on every render: the card is rebuilt from scratch each time, so a one-off call
    // at page load would only ever see the loading spinner. Inputs go read-only with the button,
    // since the POST needs edit_clients and would be rejected for a view-only user anyway.
    ajs.apply_permissions();
    if (!ajs.check_role('Clients', 'edit')) {
        container.find('input, select, textarea, button').prop('disabled', true);
    }
    attach_certificate_codes_handlers();
}

// -----------------------------------------------------------------------
// Event Handlers
// -----------------------------------------------------------------------
function attach_certificate_codes_handlers() {
    // Input changes → update state
    $(document).off('input.certcodes', '.cert-code-input').on('input.certcodes', '.cert-code-input', function () {
        var idx = parseInt($(this).data('idx'), 10);
        var field = $(this).data('field');
        certCodesState.items[idx][field] = $(this).val();
        certCodesState.error = null;
        certCodesState.success = false;
    });

    // Save button
    $('#certificate-codes-save-btn').off('click').on('click', function () {
        save_certificate_codes();
    });
}

// -----------------------------------------------------------------------
// Save (POST)
// -----------------------------------------------------------------------
function save_certificate_codes() {
    if (certCodesState.isSaving) { return; }

    // Client-side non-empty validation
    var empty = certCodesState.items.find(function (item) {
        return !item.code || !item.code.trim();
    });
    if (empty) {
        certCodesState.error = 'Code is required for ' + empty.name;
        certCodesState.success = false;
        render_certificate_codes();
        return;
    }

    set_certificate_codes_saving(true);

    var url = site_url + 'client/' + certCodesState.contractId + '/certificate_codes';
    var payload = {
        certificates: certCodesState.items.map(function (item) {
            return { certificate_id: item.certificate_id, code: item.code };
        })
    };

    var doSave = function () {
        $.ajax({
            url: url,
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            processData: false,
            data: JSON.stringify(payload),
            beforeSend: function (xhr) {
                ajs.set_auth_header(xhr);
            },
            success: handle_certificate_codes_save_success,
            error: function (err) {
                var status = err && err.status;
                var resp = (err && err.responseJSON) ? err.responseJSON : null;
                if (status === 401 && typeof refreshToken === 'function') {
                    refreshToken().then(function () {
                        doSave();
                    }).catch(function () {
                        set_certificate_codes_saving(false);
                        handle_certificate_codes_save_error(resp || { message: 'Session expired. Please login again.' });
                    });
                } else {
                    if (!resp && err && err.responseText) {
                        try { resp = JSON.parse(err.responseText); } catch (e) {}
                    }
                    set_certificate_codes_saving(false);
                    handle_certificate_codes_save_error(resp);
                }
            }
        });
    };

    doSave();
}

function handle_certificate_codes_save_success(result_json) {
    set_certificate_codes_saving(false);

    if (result_json && result_json.status) {
        certCodesState.success = true;
        certCodesState.error = null;

        // Reload to reflect persisted overrides / cleared rows and refresh Status column
        load_certificate_codes();

        if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'success',
                title: 'Codes Saved',
                text: (result_json && result_json.message) ? result_json.message : 'Certificate codes saved successfully.',
                timer: 2500,
                showConfirmButton: false
            });
        }
    } else {
        handle_certificate_codes_save_error(result_json);
    }
}

function handle_certificate_codes_save_error(result_json) {
    set_certificate_codes_saving(false);

    var msg = 'Failed to save certificate codes';
    if (result_json && result_json.message) { msg = result_json.message; }
    if (result_json && result_json.error) { msg += ' — ' + result_json.error; }

    certCodesState.error = msg;
    certCodesState.success = false;
    render_certificate_codes();
}

// -----------------------------------------------------------------------
// Utilities
// -----------------------------------------------------------------------
function update_certificate_codes_loading(isLoading) {
    var container = $('#certificate-codes-container');
    if (isLoading) {
        container.html(
            '<div class="text-center py-4">' +
            '<div class="spinner-border text-primary" role="status">' +
            '<span class="visually-hidden">Loading...</span>' +
            '</div>' +
            '</div>'
        );
    }
}

function set_certificate_codes_saving(isSaving) {
    certCodesState.isSaving = isSaving;
    var btn = $('#certificate-codes-save-btn');
    var text = btn.find('.save-codes-text');
    var spinner = btn.find('.save-codes-spinner');

    if (isSaving) {
        btn.prop('disabled', true);
        text.text('Saving...');
        spinner.removeClass('d-none');
    } else {
        btn.prop('disabled', false);
        text.text('Save Codes');
        spinner.addClass('d-none');
    }
}

function show_certificate_codes_error(message) {
    var container = $('#certificate-codes-container');
    container.html(
        '<div class="alert alert-danger" role="alert">' +
        '<i class="ri-error-warning-line me-2"></i>' +
        '<strong>Error:</strong> ' + cert_codes_escape(message) +
        ' <button type="button" class="btn btn-sm btn-outline-danger ms-2" onclick="load_certificate_codes()">' +
        '<i class="ri-refresh-line"></i> Retry' +
        '</button>' +
        '</div>'
    );
}

// -----------------------------------------------------------------------
// Bootstrap
// -----------------------------------------------------------------------
$(function () {
    if ($('#certificate-codes-container').length) {
        init_certificate_codes();
    }
});
