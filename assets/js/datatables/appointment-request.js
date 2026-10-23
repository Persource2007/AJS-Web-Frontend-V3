/**
 * Appointment Request Page JavaScript
 * Handles appointment confirmation and rescheduling for public users
 * via email/SMS notification links
 */

let loaded = false;
let appointmentData = null;
let jobId = null;
let taskId = null;

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

/**
 * Parse date string to Date object. Supports YYYY-MM-DD, DD/MM/YYYY, DD-MM-YYYY.
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

function showContent() {
    $('#skeleton-loader').hide();
    $('#appointment-content').css('display', 'block');
}

function showSkeleton() {
    $('#skeleton-loader').show();
    $('#appointment-content').hide();
}

function formatDisplayDate(dateStr) {
    if (!dateStr || dateStr === '0000-00-00') return '-';
    const parts = dateStr.split('-');
    if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
    return dateStr;
}

function formatDisplayTime(timeStr) {
    if (!timeStr) return '-';
    const parts = timeStr.split(':');
    if (parts.length >= 2) {
        let hours = parseInt(parts[0]);
        const minutes = parts[1];
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
    }
    return timeStr;
}

async function loadAppointmentData() {
    showSkeleton();
    try {
        const response = await $.ajax({
            type: 'GET',
            url: apiAppointmentDetail,
            timeout: 30000
        });

        loaded = true;

        if (response.status && response.data) {
            appointmentData = response.data;
            const res = response.data;

            const confirmStatus = res.is_appointment_confirm;
            if (confirmStatus === '1' || confirmStatus === '2' || confirmStatus === 1 || confirmStatus === 2) {
                window.location.href = `${baseURL}confirm-appointment/${appointmentHash}`;
                return;
            }

            jobId = res.job_id || null;
            taskId = res.task_id || res.id || null;

            $.each(res, function (i, data) {
                $(".view_data").html(function (_, html) {
                    return html.replace(new RegExp(`{{${i.toUpperCase()}}}`, 'g'), data || '-');
                });
            });

            showContent();

            if (isAppointmentDatePast(res)) {
                $('.action-buttons').hide();
                $('#past-date-message').show();
            } else {
                if (res.date == null || res.time == null || res.date == '0000-00-00') {
                    $('.date-div').remove();
                }
                $('.action-buttons').css('display', 'flex');
            }

            applyBranding(res);
        } else {
            showContent();
            displayError('Unable to Load', response.message || 'Could not load appointment details.');
        }
    } catch (error) {
        showContent();
        let errorMsg = 'An unexpected error occurred.';
        if (error.status === 404) {
            errorMsg = 'This appointment link is invalid or has expired.';
        } else if (error.responseJSON?.message) {
            errorMsg = error.responseJSON.message;
        }
        displayError('Error', errorMsg);
    }
}

function displayError(title, message) {
    $('.action-buttons').hide();
    Swal.fire({ icon: 'error', title, text: message, confirmButtonColor: '#157347' });
}

function displaySuccess(title, message, callback) {
    Swal.fire({ icon: 'success', title, text: message, confirmButtonColor: '#157347' }).then(() => {
        if (callback) callback();
    });
}

async function confirmAppointment() {
    Swal.fire({
        title: 'Confirm Appointment',
        text: 'Are you sure you want to confirm this appointment?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, Confirm',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#157347',
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
        preConfirm: async () => {
            try {
                const response = await $.ajax({
                    type: 'GET',
                    url: apiAppointmentConfirm,
                    timeout: 30000
                });
                if (response.status) return response;
                Swal.showValidationMessage(response.message || 'Failed to confirm appointment');
                return false;
            } catch (error) {
                Swal.showValidationMessage(error.responseJSON?.message || 'An unexpected error occurred.');
                return false;
            }
        }
    }).then((result) => {
        if (result.isConfirmed && result.value) {
            displaySuccess(
                'Appointment Confirmed!',
                result.value.message || 'Your appointment has been successfully confirmed.',
                () => { window.location.href = `${baseURL}confirm-appointment/${appointmentHash}`; }
            );
        }
    });
}

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
// Reschedule Dialog
// -----------------------------------------------------------------------

async function showRescheduleDialog() {
    if (!loaded) {
        Swal.fire({
            icon: 'warning',
            title: 'Please Wait',
            text: 'Data is still loading. Please try again shortly.',
            confirmButtonColor: '#157347'
        });
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
                    url: apiAppointmentReschedule,
                    contentType: 'application/json',
                    data: JSON.stringify({
                        appointment_date: isoDate,
                        appointment_time: appointmentTime,
                        preferred_time_range: preferredRange
                    }),
                    dataType: 'json'
                });

                if (response.status) {
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
}

// -----------------------------------------------------------------------
// Initialize
// -----------------------------------------------------------------------

$(document).ready(function () {
    loadAppointmentData();

    $(document).on('click', '#btn-confirm, a.apply-action.confirm-btn', function (e) {
        e.preventDefault();
        confirmAppointment();
    });

    $(document).on('click', '#btn-reschedule, a.apply-action.reschedule', function (e) {
        e.preventDefault();
        showRescheduleDialog();
    });
});
