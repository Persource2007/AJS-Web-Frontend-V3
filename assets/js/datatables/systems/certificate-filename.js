/**
 * System (global) Certificate File Name builder
 * Global default template for naming generated certificate PDF files, built from tags.
 * Used when a client has not set their own. Click a tag to append it; tags are joined
 * by '-' automatically and '.pdf' is appended automatically. Each tag can be used only
 * once. Stored (without '.pdf') in global_vars (certificate/filename_template).
 *
 * Endpoints:
 *   GET  /setting/certificate_filename  - load template + tag list
 *   POST /setting/certificate_filename  - save template
 *
 * GET success:  { status:true, data:{ template, default_template, tags:[{tag,label}] } }
 * POST success: { status:true, message:"..." }
 */

// -----------------------------------------------------------------------
// State
// -----------------------------------------------------------------------
var certFnState = {
    selected: [],          // ordered array of tag strings, e.g. ['{$uprn}','{$address}']
    tags: [],              // available tags: [{ tag, label }]
    defaultTemplate: '',
    isSaving: false,
    error: null,
    success: false
};

var CERT_FN_SEPARATOR = '-';
var CERT_FN_EXTENSION = '.pdf';

// -----------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------
function cert_fn_escape(str) {
    return $('<div>').text(str == null ? '' : String(str)).html();
}

function cert_fn_escape_attr(str) {
    return cert_fn_escape(str).replace(/"/g, '&quot;');
}

// Known tag strings from the loaded tag list
function cert_fn_known_tags() {
    return certFnState.tags.map(function (t) { return t.tag; });
}

function cert_fn_label_for(tag) {
    var found = certFnState.tags.filter(function (t) { return t.tag === tag; })[0];
    return found ? found.label : tag;
}

// Parse a stored template string into an ordered list of known tags (drop '.pdf'/unknowns/dupes)
function cert_fn_parse_template(template) {
    if (!template) { return []; }
    var known = cert_fn_known_tags();
    var seen = {};
    return String(template)
        .replace(/\.pdf$/i, '')
        .split(CERT_FN_SEPARATOR)
        .map(function (s) { return s.trim(); })
        .filter(function (tok) {
            if (!tok || known.indexOf(tok) === -1 || seen[tok]) { return false; }
            seen[tok] = true;
            return true;
        });
}

// Sample values used only for the on-screen preview
function cert_fn_sample_values() {
    var d = new Date();
    var yyyymmdd = '' + d.getFullYear() +
        ('0' + (d.getMonth() + 1)).slice(-2) +
        ('0' + d.getDate()).slice(-2);
    return {
        '{$uprn}': '100023',
        '{$address}': '12 High Street',
        '{$certificate_code}': 'EICR',
        '{$certificate_date}': yyyymmdd
    };
}

function cert_fn_build_preview() {
    if (!certFnState.selected.length) { return ''; }
    var values = cert_fn_sample_values();
    var parts = certFnState.selected.map(function (tag) {
        return Object.prototype.hasOwnProperty.call(values, tag) ? values[tag] : tag;
    });
    return parts.join(CERT_FN_SEPARATOR) + CERT_FN_EXTENSION;
}

// -----------------------------------------------------------------------
// Init
// -----------------------------------------------------------------------
function init_certificate_filename() {
    // Global (system-level) template — no client scope.
    load_certificate_filename();
}

// -----------------------------------------------------------------------
// Load (GET)
// -----------------------------------------------------------------------
function load_certificate_filename() {
    update_certificate_filename_loading(true);

    ajs.ajax_form(
        site_url + 'setting/certificate_filename',
        null,
        'GET',
        null,
        '0',
        '0',
        handle_certificate_filename_load_success,
        handle_certificate_filename_load_error
    );
}

function handle_certificate_filename_load_success(result_json) {
    if (result_json && result_json.status && result_json.data) {
        var data = result_json.data;
        certFnState.tags            = Array.isArray(data.tags) ? data.tags : [];
        certFnState.defaultTemplate = data.default_template != null ? String(data.default_template) : '';
        certFnState.selected        = cert_fn_parse_template(data.template);
        certFnState.error   = null;
        certFnState.success = false;
        render_certificate_filename();
    } else {
        handle_certificate_filename_load_error(result_json);
    }
}

function handle_certificate_filename_load_error(result_json) {
    var msg = (result_json && result_json.message) ? result_json.message : 'Failed to load certificate file name setting';
    show_certificate_filename_error(msg);
}

// -----------------------------------------------------------------------
// Render
// -----------------------------------------------------------------------
function render_certificate_filename() {
    var container = $('#system-certificate-filename-container');
    if (!container.length) { return; }

    // Builder chips (joined visually by the separator) + locked .pdf badge
    var chipsHtml;
    if (certFnState.selected.length) {
        chipsHtml = certFnState.selected.map(function (tag, idx) {
            var sep = idx > 0
                ? '<span class="text-muted mx-1">' + cert_fn_escape(CERT_FN_SEPARATOR) + '</span>'
                : '';
            return sep +
                '<span class="badge bg-primary-subtle text-primary border border-primary-subtle d-inline-flex align-items-center py-1 px-2">' +
                '<code class="text-primary">' + cert_fn_escape(tag) + '</code>' +
                '<button type="button" class="btn-close btn-close-sm ms-2 cert-fn-chip-remove" style="font-size:.6rem;" ' +
                'data-tag="' + cert_fn_escape_attr(tag) + '" aria-label="Remove ' + cert_fn_escape_attr(tag) + '"></button>' +
                '</span>';
        }).join('');
        chipsHtml += '<span class="text-muted mx-1">' + cert_fn_escape(CERT_FN_SEPARATOR) + '</span>' +
            '<span class="badge bg-secondary-subtle text-secondary border">' + cert_fn_escape(CERT_FN_EXTENSION) + '</span>';
    } else {
        chipsHtml = '<span class="text-muted">No tags selected yet — click a tag below to start.</span>' +
            '<span class="badge bg-secondary-subtle text-secondary border ms-1">' + cert_fn_escape(CERT_FN_EXTENSION) + '</span>';
    }

    // Available tag buttons (disabled when already selected)
    var tagsHtml = certFnState.tags.map(function (t) {
        var used = certFnState.selected.indexOf(t.tag) !== -1;
        return '<button type="button" class="btn btn-sm btn-outline-primary cert-fn-variable-btn text-start mb-1 me-1"' +
            (used ? ' disabled' : '') +
            ' data-variable="' + cert_fn_escape_attr(t.tag) + '">' +
            '<code>' + cert_fn_escape(t.tag) + '</code>' +
            (t.label ? ' - ' + cert_fn_escape(t.label) : '') +
            '</button>';
    }).join('');

    var alertHtml = '';
    if (certFnState.error) {
        alertHtml = '<div class="alert alert-danger mb-3" role="alert">' +
            '<i class="ri-error-warning-line me-2"></i>' + cert_fn_escape(certFnState.error) + '</div>';
    }
    if (certFnState.success) {
        alertHtml = '<div class="alert alert-success mb-3" role="alert">' +
            '<i class="ri-checkbox-circle-line me-2"></i>Certificate file name saved successfully.</div>';
    }

    var preview = cert_fn_build_preview();

    var html = alertHtml +
        '<div class="row g-3">' +
            '<div class="col-12 col-lg-8">' +
                '<label class="form-label">File name</label>' +
                '<div id="cert-fn-builder" class="form-control d-flex flex-wrap align-items-center gap-1" style="min-height:42px; height:auto;">' +
                    chipsHtml +
                '</div>' +
                '<div class="form-text">Preview: <code id="cert-fn-preview">' + cert_fn_escape(preview) + '</code></div>' +
            '</div>' +
            '<div class="col-12 col-lg-4">' +
                '<label class="form-label">Available tags</label>' +
                '<div class="d-flex flex-wrap" id="cert-fn-tags">' + tagsHtml + '</div>' +
            '</div>' +
        '</div>' +
        '<div class="d-flex justify-content-end align-items-center gap-3 mt-3">' +
            (certFnState.selected.length ? '' : '<span class="text-muted small">At least one tag is required.</span>') +
            '<a href="javascript:void(0)" id="cert-fn-reset" class="text-muted small">Reset to default</a>' +
            '<button type="button" class="btn btn-success" id="cert-fn-save-btn"' + (certFnState.selected.length ? '' : ' disabled') + '>' +
                '<span class="save-fn-text">Save</span>' +
                '<span class="save-fn-spinner spinner-border spinner-border-sm d-none ms-1" role="status" aria-hidden="true"></span>' +
            '</button>' +
        '</div>';

    container.html(html);
    attach_certificate_filename_handlers();
}

// -----------------------------------------------------------------------
// Event Handlers
// -----------------------------------------------------------------------
function attach_certificate_filename_handlers() {
    // Append a tag (only if not already used)
    $(document).off('click.certfn', '.cert-fn-variable-btn').on('click.certfn', '.cert-fn-variable-btn', function () {
        var variable = $(this).data('variable');
        if (!variable || certFnState.selected.indexOf(variable) !== -1) { return; }
        certFnState.selected.push(variable);
        certFnState.error = null;
        certFnState.success = false;
        render_certificate_filename();
    });

    // Remove a chip (re-enables its tag button)
    $(document).off('click.certfnremove', '.cert-fn-chip-remove').on('click.certfnremove', '.cert-fn-chip-remove', function () {
        var tag = $(this).data('tag');
        certFnState.selected = certFnState.selected.filter(function (t) { return t !== tag; });
        certFnState.error = null;
        certFnState.success = false;
        render_certificate_filename();
    });

    // Reset to default order (does not auto-save)
    $('#cert-fn-reset').off('click').on('click', function () {
        certFnState.selected = cert_fn_parse_template(certFnState.defaultTemplate);
        certFnState.error = null;
        certFnState.success = false;
        render_certificate_filename();
    });

    // Save
    $('#cert-fn-save-btn').off('click').on('click', save_certificate_filename);
}

// -----------------------------------------------------------------------
// Save (POST)
// -----------------------------------------------------------------------
function save_certificate_filename() {
    if (certFnState.isSaving) { return; }

    if (!certFnState.selected.length) {
        certFnState.error = 'Add at least one tag to build the file name.';
        certFnState.success = false;
        render_certificate_filename();
        return;
    }

    set_certificate_filename_saving(true);

    var template = certFnState.selected.join(CERT_FN_SEPARATOR); // no extension; appended at use time

    ajs.ajax_form(
        site_url + 'setting/certificate_filename',
        { certificate_filename_template: template },
        'POST',
        null,
        '0',
        '0',
        function (result_json) {
            set_certificate_filename_saving(false);
            if (result_json && result_json.status) {
                certFnState.success = true;
                certFnState.error = null;
                render_certificate_filename();
                if (typeof Swal !== 'undefined') {
                    Swal.fire({ icon: 'success', title: 'Saved', text: (result_json.message || 'Certificate file name saved.'), timer: 2000, showConfirmButton: false });
                }
                setTimeout(function () {
                    certFnState.success = false;
                    render_certificate_filename();
                }, 3000);
            } else {
                handle_certificate_filename_save_error(result_json);
            }
        },
        function (result_json) {
            set_certificate_filename_saving(false);
            handle_certificate_filename_save_error(result_json);
        }
    );
}

function handle_certificate_filename_save_error(result_json) {
    var msg = (result_json && result_json.message) ? result_json.message : 'Failed to save certificate file name';
    if (result_json && result_json.error) { msg += ' — ' + result_json.error; }
    certFnState.error = msg;
    certFnState.success = false;
    render_certificate_filename();
}

// -----------------------------------------------------------------------
// Utilities
// -----------------------------------------------------------------------
function update_certificate_filename_loading(isLoading) {
    var container = $('#system-certificate-filename-container');
    if (isLoading) {
        container.html(
            '<div class="text-center py-4">' +
            '<div class="spinner-border text-primary" role="status">' +
            '<span class="visually-hidden">Loading...</span></div></div>'
        );
    }
}

function set_certificate_filename_saving(isSaving) {
    certFnState.isSaving = isSaving;
    var btn = $('#cert-fn-save-btn');
    var text = btn.find('.save-fn-text');
    var spinner = btn.find('.save-fn-spinner');
    if (isSaving) {
        btn.prop('disabled', true);
        text.text('Saving...');
        spinner.removeClass('d-none');
    } else {
        btn.prop('disabled', false);
        text.text('Save');
        spinner.addClass('d-none');
    }
}

function show_certificate_filename_error(message) {
    var container = $('#system-certificate-filename-container');
    container.html(
        '<div class="alert alert-danger" role="alert">' +
        '<i class="ri-error-warning-line me-2"></i>' +
        '<strong>Error:</strong> ' + cert_fn_escape(message) +
        ' <button type="button" class="btn btn-sm btn-outline-danger ms-2" onclick="load_certificate_filename()">' +
        '<i class="ri-refresh-line"></i> Retry</button>' +
        '</div>'
    );
}

// -----------------------------------------------------------------------
// Bootstrap
// -----------------------------------------------------------------------
$(function () {
    if ($('#system-certificate-filename-container').length) {
        init_certificate_filename();
    }
});
