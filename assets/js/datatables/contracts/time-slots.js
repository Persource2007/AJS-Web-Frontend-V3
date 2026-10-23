/**
 * Contract Time Slots
 * Manages AM/PM appointment slot limits per day of the week for a contract.
 *
 * API Base: site_url (e.g. https://dev-api.ajs.co.uk or /api)
 * Auth: Bearer token via ajs.set_auth_header(xhr)
 *
 * Endpoints:
 *   GET  /contract/{contract_id}/time_slots  - fetch on page load
 *   POST /contract/{contract_id}/time_slots - save/update slots (Content-Type: application/json)
 *
 * GET success:  { status: true, data: [ { id, contract_id, day_of_week, am_slots, pm_slots }, ... ] }
 * POST success: { status: true, message: "Time slots saved successfully" }
 * Errors: status: false, message, errors?, error?, type? (API_ERROR_FORM_VALIDATION | API_ERROR_DB)
 */

// -----------------------------------------------------------------------
// State
// -----------------------------------------------------------------------
var timeSlotsState = {
    contractId: null,
    slots: [],
    isLoading: false,
    isSaving: false,
    error: null,
    success: false
};

var DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

var DAY_LABELS = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday'
};

// -----------------------------------------------------------------------
// Init
// -----------------------------------------------------------------------
function init_time_slots() {
    var contractId = $('#contract_id').val();
    if (!contractId || contractId <= 0) {
        show_time_slots_error('Invalid contract ID');
        return;
    }

    timeSlotsState.contractId = contractId;

    // Initialise slots with defaults
    timeSlotsState.slots = DAYS.map(function (d) {
        return { day_of_week: d, am_slots: 0, pm_slots: 0 };
    });

    load_time_slots();
}

// -----------------------------------------------------------------------
// Load (GET)
// -----------------------------------------------------------------------
function load_time_slots() {
    timeSlotsState.isLoading = true;
    timeSlotsState.error = null;
    update_time_slots_loading(true);

    ajs.ajax_form(
        site_url + 'contract/' + timeSlotsState.contractId + '/time_slots',
        null,
        'GET',
        null,
        '0',
        '0',
        handle_time_slots_load_success,
        handle_time_slots_load_error
    );
}

function handle_time_slots_load_success(result_json) {
    timeSlotsState.isLoading = false;

    if (result_json && result_json.status) {
        var data = result_json.data || [];

        // Map to keyed object then rebuild ordered array
        var byDay = {};
        data.forEach(function (row) { byDay[row.day_of_week] = row; });

        timeSlotsState.slots = DAYS.map(function (d) {
            var row = byDay[d];
            return {
                day_of_week: d,
                am_slots: row ? parseInt(row.am_slots, 10) : 0,
                pm_slots: row ? parseInt(row.pm_slots, 10) : 0
            };
        });

        timeSlotsState.error = null;
        timeSlotsState.success = false;
        render_time_slots();
    } else {
        handle_time_slots_load_error(result_json);
    }
}

function handle_time_slots_load_error(result_json) {
    timeSlotsState.isLoading = false;
    var msg = (result_json && result_json.message) ? result_json.message : 'Failed to load appointment slots';
    show_time_slots_error(msg);
}

// -----------------------------------------------------------------------
// Render
// -----------------------------------------------------------------------
function render_time_slots() {
    var container = $('#time-slots-container');
    if (!container.length) { return; }

    var rowsHtml = timeSlotsState.slots.map(function (slot, idx) {
        var isZero = slot.am_slots === 0 && slot.pm_slots === 0;
        return '<tr' + (isZero ? ' class="text-muted"' : '') + '>' +
            '<td class="align-middle fw-medium">' + DAY_LABELS[slot.day_of_week] + '</td>' +
            '<td>' +
            '<input type="number" class="form-control form-control-sm time-slot-input" ' +
            'data-idx="' + idx + '" data-field="am_slots" ' +
            'value="' + slot.am_slots + '" min="0" max="99" step="1" ' +
            'style="width:80px;" ' +
            'aria-label="AM slots for ' + DAY_LABELS[slot.day_of_week] + '">' +
            '</td>' +
            '<td>' +
            '<input type="number" class="form-control form-control-sm time-slot-input" ' +
            'data-idx="' + idx + '" data-field="pm_slots" ' +
            'value="' + slot.pm_slots + '" min="0" max="99" step="1" ' +
            'style="width:80px;" ' +
            'aria-label="PM slots for ' + DAY_LABELS[slot.day_of_week] + '">' +
            '</td>' +
            '</tr>';
    }).join('');

    var alertHtml = '';
    if (timeSlotsState.error) {
        alertHtml = '<div class="alert alert-danger mb-3" role="alert">' +
            '<i class="ri-error-warning-line me-2"></i>' + timeSlotsState.error +
            '</div>';
    }
    if (timeSlotsState.success) {
        alertHtml = '<div class="alert alert-success mb-3" role="alert">' +
            '<i class="ri-checkbox-circle-line me-2"></i>Slot settings saved successfully.' +
            '</div>';
    }

    var html = alertHtml +
        '<div class="table-responsive">' +
        '<table class="table align-middle table-nowrap mb-0 table-hover">' +
        '<thead class="table-light text-muted">' +
        '<tr>' +
        '<th style="width:160px;">Day</th>' +
        '<th style="width:120px;">AM Slots</th>' +
        '<th style="width:120px;">PM Slots</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' + rowsHtml + '</tbody>' +
        '</table>' +
        '</div>' +
        '<div class="d-flex justify-content-end mt-3">' +
        '<button type="button" class="btn btn-success" id="time-slots-save-btn">' +
        '<span class="save-slots-text">Save Slots</span>' +
        '<span class="save-slots-spinner spinner-border spinner-border-sm d-none ms-1" role="status" aria-hidden="true"></span>' +
        '</button>' +
        '</div>';

    container.html(html);
    attach_time_slots_handlers();
}

// -----------------------------------------------------------------------
// Event Handlers
// -----------------------------------------------------------------------
function attach_time_slots_handlers() {
    // Input changes → update state
    $(document).off('input.timeslots', '.time-slot-input').on('input.timeslots', '.time-slot-input', function () {
        var idx = parseInt($(this).data('idx'), 10);
        var field = $(this).data('field');
        var val = Math.max(0, parseInt($(this).val(), 10) || 0);
        $(this).val(val); // clamp negative
        timeSlotsState.slots[idx][field] = val;
        timeSlotsState.error = null;
        timeSlotsState.success = false;
    });

    // Save button
    $('#time-slots-save-btn').off('click').on('click', function () {
        save_time_slots();
    });
}

// -----------------------------------------------------------------------
// Save (POST)
// -----------------------------------------------------------------------
function save_time_slots() {
    if (timeSlotsState.isSaving) { return; }

    set_time_slots_saving(true);

    var url = site_url + 'contract/' + timeSlotsState.contractId + '/time_slots';
    var payload = { slots: timeSlotsState.slots };

    console.log('[TimeSlots] POST request:', {
        url: url,
        payload: payload,
        rawBody: JSON.stringify(payload)
    });

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
            success: handle_time_slots_save_success,
            error: function (err) {
                var status = err && err.status;
                var resp = (err && err.responseJSON) ? err.responseJSON : null;
                if (status === 401 && typeof refreshToken === 'function') {
                    refreshToken().then(function () {
                        doSave();
                    }).catch(function () {
                        set_time_slots_saving(false);
                        handle_time_slots_save_error(resp || { message: 'Session expired. Please login again.' });
                    });
                } else {
                    if (!resp && err && err.responseText) {
                        try { resp = JSON.parse(err.responseText); } catch (e) {}
                    }
                    console.error('[TimeSlots] POST error:', status, err);
                    console.error('[TimeSlots] responseJSON:', err && err.responseJSON);
                    console.error('[TimeSlots] responseText:', err && err.responseText);
                    if (resp) {
                        console.error('[TimeSlots] parsed errors:', resp.message, resp.errors);
                        if (resp.error) {
                            console.error('[TimeSlots] DB error:', resp.error);
                        }
                    }
                    handle_time_slots_save_error(resp);
                }
            }
        });
    };

    doSave();
}

function handle_time_slots_save_success(result_json) {
    set_time_slots_saving(false);

    if (result_json && result_json.status) {
        timeSlotsState.success = true;
        timeSlotsState.error = null;
        render_time_slots();

        if (result_json.warnings && result_json.warnings.length > 0) {
            var warningLines = result_json.warnings.map(function (w) {
                var dayLabel = w.day ? (w.day.charAt(0).toUpperCase() + w.day.slice(1)) : '';
                return '<li>' + dayLabel + ' ' + w.date + ': ' + w.period +
                    ' has ' + w.booked + ' bookings but limit is now ' + w.new_limit + '</li>';
            }).join('');

            var warningHtml =
                '<p class="text-start">The following dates have more bookings than the new limit:</p>' +
                '<ul class="text-start">' + warningLines + '</ul>' +
                '<p class="text-muted small mt-2 text-start">These existing appointments are not affected but may need manual rescheduling.</p>';

            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'warning',
                    title: result_json.message || 'Time slots saved with warnings',
                    html: warningHtml,
                    confirmButtonColor: '#157347'
                });
            }
        } else {
            var msg = (result_json && result_json.message) ? result_json.message : 'Appointment slot settings saved successfully.';
            if (typeof Swal !== 'undefined') {
                Swal.fire({ icon: 'success', title: 'Slots Saved', text: msg, timer: 2500, showConfirmButton: false });
            }
        }

        // Auto-dismiss in-page alert after 3 s
        setTimeout(function () {
            timeSlotsState.success = false;
            render_time_slots();
        }, 3000);
    } else {
        handle_time_slots_save_error(result_json);
    }
}

function handle_time_slots_save_error(result_json) {
    set_time_slots_saving(false);

    var msg = 'Failed to save slot settings';
    if (result_json && result_json.message) { msg = result_json.message; }
    if (result_json && result_json.error) {
        msg += ' — ' + result_json.error;
        console.error('[TimeSlots] DB error:', result_json.error);
    }
    if (result_json && result_json.type) { msg += ' — ' + result_json.type; }
    if (result_json && result_json.errors && result_json.errors.length) {
        msg += ': ' + result_json.errors.join(', ');
    }

    timeSlotsState.error = msg;
    timeSlotsState.success = false;
    render_time_slots();
}

// -----------------------------------------------------------------------
// Utilities
// -----------------------------------------------------------------------
function update_time_slots_loading(isLoading) {
    var container = $('#time-slots-container');
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

function set_time_slots_saving(isSaving) {
    timeSlotsState.isSaving = isSaving;
    var btn = $('#time-slots-save-btn');
    var text = btn.find('.save-slots-text');
    var spinner = btn.find('.save-slots-spinner');

    if (isSaving) {
        btn.prop('disabled', true);
        text.text('Saving...');
        spinner.removeClass('d-none');
    } else {
        btn.prop('disabled', false);
        text.text('Save Slots');
        spinner.addClass('d-none');
    }
}

function show_time_slots_error(message) {
    var container = $('#time-slots-container');
    container.html(
        '<div class="alert alert-danger" role="alert">' +
        '<i class="ri-error-warning-line me-2"></i>' +
        '<strong>Error:</strong> ' + message +
        ' <button type="button" class="btn btn-sm btn-outline-danger ms-2" onclick="load_time_slots()">' +
        '<i class="ri-refresh-line"></i> Retry' +
        '</button>' +
        '</div>'
    );
}

// -----------------------------------------------------------------------
// Bootstrap
// -----------------------------------------------------------------------
$(function () {
    if ($('#time-slots-container').length) {
        init_time_slots();
    }
});
