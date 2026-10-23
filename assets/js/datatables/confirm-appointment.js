let loaded = false;
let jobId = null;
let taskId = null;

/**
 * Parse date string to Date object. Supports YYYY-MM-DD, DD/MM/YYYY, DD-MM-YYYY.
 * Returns null if unparseable.
 */
function parseAppointmentDate(raw) {
    if (!raw || (typeof raw !== 'string' && typeof raw !== 'number')) return null;
    raw = String(raw).trim();
    if (!raw || raw === '0000-00-00') return null;

    let year, month, day;
    if (/^\d{4}-\d{1,2}-\d{1,2}/.test(raw)) {
        const p = raw.split('-');
        year = parseInt(p[0], 10);
        month = parseInt(p[1], 10) - 1;
        day = parseInt(p[2], 10);
    } else if (/^\d{1,2}\/\d{1,2}\/\d{4}/.test(raw)) {
        const p = raw.split('/');
        day = parseInt(p[0], 10);
        month = parseInt(p[1], 10) - 1;
        year = parseInt(p[2], 10);
    } else if (/^\d{1,2}-\d{1,2}-\d{4}/.test(raw)) {
        const p = raw.split('-');
        day = parseInt(p[0], 10);
        month = parseInt(p[1], 10) - 1;
        year = parseInt(p[2], 10);
    } else {
        return null;
    }
    if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
    const d = new Date(year, month, day);
    if (isNaN(d.getTime())) return null;
    return d;
}

/**
 * Return true if appointment date is before today.
 * Tries API fields first, then falls back to parsing the displayed date from the page.
 */
function isAppointmentDatePast(data) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const raw = data && (
        data.task_date || data.appointment_date || data.preferred_date ||
        data.date || data.DATE || data.task_date_formatted
    );
    let apptDate = parseAppointmentDate(raw);
    if (apptDate) {
        apptDate.setHours(0, 0, 0, 0);
        return apptDate.getTime() < today.getTime();
    }

    // Fallback: extract DD/MM/YYYY from the displayed date-div (e.g. "Date: 23/02/2026 | Time: 13:00")
    const dateDivText = $('.date-div').text() || '';
    const match = dateDivText.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (match) {
        const day = parseInt(match[1], 10);
        const month = parseInt(match[2], 10) - 1;
        const year = parseInt(match[3], 10);
        apptDate = new Date(year, month, day);
        apptDate.setHours(0, 0, 0, 0);
        return apptDate.getTime() < today.getTime();
    }
    return false;
}

function applyBranding(data) {
    const branding = data && (data.branding || data);
    const headerUrl = branding && (branding.letter_header_url || branding.letter_header);
    const footerUrl = branding && (branding.letter_footer_url || branding.letter_footer);

    if (headerUrl) {
        $('#letter-header-img').attr('src', headerUrl).off('error').on('error', function () { $('#branding-header').hide(); });
        $('#branding-header').show();
    } else {
        $('#branding-header').hide();
    }

    if (footerUrl) {
        $('#letter-footer-img').attr('src', footerUrl).off('error').on('error', function () { $('#branding-footer').hide(); });
        $('#branding-footer').show();
    } else {
        $('#branding-footer').hide();
    }
}

function showContent() {
    $('#skeleton-loader').hide();
    $('#appointment-content').css('display', 'block');
}

function showSkeleton() {
    $('#skeleton-loader').show();
    $('#appointment-content').hide();
}

async function load_data() {
    showSkeleton();
    try {
        const response = await $.ajax({
            type: 'GET',
            url: appointment_details.replace("{APP}", app[0]),
            timeout: 30000
        });

        loaded = true;
        const res = response.data;
        if (response.status) {
            $.each(res, function (i, data) {
                $(".view_data").html(function (_, html) {
                    return html.replace(new RegExp(`{{${i.toUpperCase()}}}`, 'g'), data);
                });
            });

            showContent();

            if (response.data.task_status && response.data.task_status.toLowerCase() === 'closed') {
                $('.reschedule-btn').remove();
            }

            if (res.is_appointment_confirm == '1') {
                $('.appointment_status').text("Appointment Confirmed");
            }

            if (isAppointmentDatePast(res)) {
                $('.action-buttons').hide();
                $('#past-date-message').show();
            } else {
                if (response.data.date == null || response.data.time == null || response.data.date == '0000-00-00') {
                    $('.date-div').remove();
                    $('.reschedule-btn').html('Pick Time');
                }
                $('.action-buttons').css('display', 'flex');
            }

            jobId = res.job_id || null;
            taskId = res.task_id || res.id || null;

            applyBranding(res);
        } else {
            showContent();
            display('error', 'Data Unavailable', response.message);
        }
    } catch (error) {
        const msg = error.responseJSON?.message || 'An unexpected error occurred.';
        showContent();
        display('error', 'Error', msg);
    }
}

$(document).ready(function () {
    load_data();
});

// -----------------------------------------------------------------------
// Slot Availability API (date-aware)
// -----------------------------------------------------------------------

async function fetchSlotAvailability(date) {
    if (!taskId && !jobId) return { time_slots: [] };

    const apiUrl = taskId
        ? `${appURL}api/task/available-time-slots?task_id=${taskId}&date=${date}`
        : `${appURL}api/task/available-time-slots?job_id=${jobId}&date=${date}`;

    try {
        const response = await $.ajax({ type: 'GET', url: apiUrl, timeout: 10000 });
        if (response.status && response.data) return response.data;
        return { time_slots: [] };
    } catch (error) {
        console.warn('[TimeSlots] Failed to load slot availability:', error);
        return { time_slots: [] };
    }
}

function renderSlotButtons(data) {
    const container = document.getElementById('time-slot-buttons');
    if (!container) return;

    const slots = (data && data.time_slots) ? data.time_slots : [];

    if (slots.length === 0) {
        container.innerHTML =
            '<label class="form-label d-block">Select Time Period</label>' +
            '<p class="text-muted small mb-0">No slots available for this date</p>';
        return;
    }

    let html = '<label class="form-label d-block">Select Time Period</label><div class="d-flex gap-2 flex-wrap">';
    slots.forEach(slot => {
        const label = slot.title || slot.id.toUpperCase();
        if (slot.available > 0) {
            html += `<button type="button" class="btn btn-outline-primary slot-toggle-btn" ` +
                `data-slot-id="${slot.id}" data-start-time="${slot.start_time}">` +
                `${label} (${slot.available} available)</button>`;
        } else {
            html += `<button type="button" class="btn btn-outline-secondary slot-toggle-btn" disabled>` +
                `${label} (Full)</button>`;
        }
    });
    html += '</div>';

    container.innerHTML = html;

    const timeInput = document.getElementById('appointment_time');
    const rangeInput = document.getElementById('preferred_time_range');
    if (timeInput) timeInput.value = '';
    if (rangeInput) rangeInput.value = '';
}

function showSlotButtonsLoading() {
    const container = document.getElementById('time-slot-buttons');
    if (container) {
        container.innerHTML =
            '<label class="form-label d-block">Select Time Period</label>' +
            '<div class="text-center py-2"><div class="spinner-border spinner-border-sm text-primary" role="status">' +
            '<span class="visually-hidden">Loading...</span></div></div>';
    }
}

// -----------------------------------------------------------------------
// Reschedule Handler
// -----------------------------------------------------------------------

$(document).on("click", "a.apply-action.reschedule", function (e) {
    e.preventDefault();
    if (!loaded) {
        display('warning', 'Please Wait...', 'Data is still loading. Try again shortly.', false);
        return;
    }

    Swal.fire({
        icon: 'info',
        title: 'Reschedule Appointment',
        html: `
            <div class="form-group mb-3">
                <label for="appointment_date" class="form-label">Date (DD/MM/YYYY)</label>
                <input id="appointment_date" class="swal2-input ms-0" type="text" placeholder="DD/MM/YYYY" style="width: 100%;"/>
            </div>
            <div id="time-slot-buttons" class="mb-3">
                <label class="form-label d-block">Select Time Period</label>
                <p class="text-muted small mb-0">Please select a date first</p>
            </div>
            <input type="hidden" id="appointment_time" />
            <input type="hidden" id="preferred_time_range" />
        `,
        confirmButtonText: 'Confirm Reschedule',
        showLoaderOnConfirm: true,
        confirmButtonColor: '#157347',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        allowOutsideClick: () => !Swal.isLoading(),
        didOpen: () => {
            const dateInput = document.getElementById('appointment_date');

            if (typeof flatpickr !== 'undefined') {
                flatpickr(dateInput, {
                    dateFormat: 'd/m/Y',
                    minDate: 'today',
                    maxDate: (() => { const d = new Date(); d.setDate(d.getDate() + 14); return d; })(),
                    disableMobile: true,
                    onChange: async (selectedDates) => {
                        if (selectedDates.length === 0) return;
                        const d = selectedDates[0];
                        const isoDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

                        document.getElementById('appointment_time').value = '';
                        document.getElementById('preferred_time_range').value = '';

                        showSlotButtonsLoading();
                        const data = await fetchSlotAvailability(isoDate);
                        renderSlotButtons(data);
                    }
                });
            }

            const slotsContainer = document.getElementById('time-slot-buttons');
            if (slotsContainer) {
                slotsContainer.addEventListener('click', (ev) => {
                    const btn = ev.target.closest('.slot-toggle-btn');
                    if (!btn || btn.disabled) return;

                    slotsContainer.querySelectorAll('.slot-toggle-btn').forEach(b => {
                        b.classList.remove('btn-primary');
                        b.classList.add('btn-outline-primary');
                    });

                    btn.classList.remove('btn-outline-primary');
                    btn.classList.add('btn-primary');

                    document.getElementById('preferred_time_range').value = btn.dataset.slotId;
                    document.getElementById('appointment_time').value = btn.dataset.startTime;
                });
            }
        },
        preConfirm: async () => {
            const appointmentDate = document.getElementById('appointment_date').value.trim();
            const appointmentTime = document.getElementById('appointment_time').value;
            const preferredRange = document.getElementById('preferred_time_range').value;

            if (!appointmentDate) {
                Swal.showValidationMessage('Please select a date');
                return false;
            }

            const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
            if (!dateRegex.test(appointmentDate)) {
                Swal.showValidationMessage('Date must be in DD/MM/YYYY format');
                return false;
            }

            if (!preferredRange || !appointmentTime) {
                Swal.showValidationMessage('Please select a time period (AM or PM)');
                return false;
            }

            const [day, month, year] = appointmentDate.split('/');
            const isoDate = `${year}-${month}-${day}`;

            const selectedDate = new Date(year, month - 1, day);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const maxDate = new Date();
            maxDate.setDate(maxDate.getDate() + 14);
            maxDate.setHours(23, 59, 59, 999);
            if (selectedDate < today) {
                Swal.showValidationMessage('Date must be today or in the future');
                return false;
            }
            if (selectedDate > maxDate) {
                Swal.showValidationMessage('Date must be within the next 2 weeks');
                return false;
            }

            try {
                const response = await $.ajax({
                    type: 'POST',
                    url: reschedule_app.replace('{HASH}', appHash),
                    contentType: 'application/json',
                    data: JSON.stringify({
                        appointment_date: isoDate,
                        appointment_time: appointmentTime,
                        preferred_time_range: preferredRange
                    }),
                    dataType: 'json'
                });

                if (response.status) {
                    if (response.data) {
                        $.each(response.data, (i, data) => {
                            $('.view_data').html((_, html) =>
                                html.replace(new RegExp(`{{${i.toUpperCase()}}}`, 'g'), data)
                            );
                        });
                        if (response.data.is_appointment_confirm == '1') {
                            $('.appointment_status').text('Appointment Confirmed');
                            $('.action-buttons').remove();
                        }
                    }
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: response.message || 'Appointment rescheduled successfully',
                        confirmButtonColor: '#157347'
                    }).then(() => window.location.reload());
                } else {
                    Swal.showValidationMessage(response.message || 'Failed to reschedule appointment');
                    return false;
                }
            } catch (error) {
                let errorMsg = 'An unexpected error occurred.';
                if (error.responseJSON?.message) {
                    errorMsg = error.responseJSON.message;
                } else if (error.responseText) {
                    try {
                        errorMsg = JSON.parse(error.responseText).message || errorMsg;
                    } catch (e) { /* ignore parse error */ }
                }
                Swal.showValidationMessage(errorMsg);
                return false;
            }
        }
    });
});

// -----------------------------------------------------------------------
// Display message
// -----------------------------------------------------------------------

function display(icon, title, msg, reload = true) {
    Swal.fire({ icon, title, text: msg }).then(() => {
        if (reload && icon === 'success') {
            setTimeout(() => window.location.reload(), 1000);
        }
    });
}
