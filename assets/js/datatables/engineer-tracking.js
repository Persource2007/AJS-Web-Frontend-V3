let loaded = false;

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
    $('#tracking-content').show();
    $('#error-container').hide();
}

function showSkeleton() {
    $('#skeleton-loader').show();
    $('#tracking-content').hide();
    $('#error-container').hide();
}

function showError(message) {
    $('#skeleton-loader').hide();
    $('#tracking-content').hide();
    $('#error-message').text(message);
    $('#error-container').show();
}

function formatDate(dateStr) {
    if (!dateStr || dateStr === '0000-00-00') return 'N/A';

    try {
        const dateObj = new Date(dateStr);
        return dateObj.toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (e) {
        return dateStr;
    }
}

async function load_data() {
    showSkeleton();
    try {
        const response = await $.ajax({
            type: 'GET',
            url: tracking_details_url,
            timeout: 30000
        });

        loaded = true;

        if (response.status && response.data) {
            const data = response.data;

            // Populate Name
            let engFirstName = data.engineer_first_name || 'your engineer';
            let engNameDisplay = `Your assigned engineer is <strong>${engFirstName}</strong>.`;
            $('#engineer_name_display').html(engNameDisplay);

            // Populate Job Type, Date and Time
            $('#job_type_title_display').text(data.job_type_title || 'N/A');
            let formattedDate = data.formatted_date || formatDate(data.task_date);
            $('#task_date_display').text(formattedDate);

            // Appointment time: use formatted_time from API, or format task_time (HH:MM:SS -> HH:MM)
            let formattedTime = data.formatted_time || (data.task_time ? data.task_time.substring(0, 5) : '');
            if (formattedTime) {
                $('#task_time_display').text(formattedTime);
                $('#task_time_row').show();
            } else {
                $('#task_time_row').hide();
            }

            // Populating Status / Tracking Message
            let targetMessage = '';

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const appointmentParts = data.task_date ? data.task_date.split('-') : []; // YYYY-MM-DD
            let appointmentDate = new Date(); // fallback
            if (appointmentParts.length === 3) {
                appointmentDate = new Date(appointmentParts[0], appointmentParts[1] - 1, appointmentParts[2]);
            }
            appointmentDate.setHours(0, 0, 0, 0);

            if (appointmentDate.getTime() === today.getTime()) {
                // Today
                let jobsAhead = parseInt(data.jobs_ahead_count);

                if (isNaN(jobsAhead) || !engFirstName) {
                    targetMessage = "We could not calculate the remaining appointments at this time.";
                } else if (jobsAhead > 0) {
                    targetMessage = `${engFirstName} currently has <strong>${jobsAhead}</strong> appointment(s) ahead of yours.`;
                } else {
                    targetMessage = `You are the next appointment! ${engFirstName} is on their way.`;
                }
            } else if (appointmentDate.getTime() > today.getTime()) {
                // Future date
                targetMessage = `Your tracking and task date is ${formattedDate} kindly use this link on that day to track your engineer.`;
            } else {
                // Past date
                targetMessage = "The information is no longer available and your date of appointment has already surpassed.";
            }

            $('#tracking_status_message').html(targetMessage);

            applyBranding(data);

            showContent();
        } else {
            showError(response.message || 'This tracking link is invalid or has expired.');
        }
    } catch (error) {
        const msg = error.responseJSON?.message || 'An unexpected error occurred while fetching the tracking details.';
        showError(msg);
    }
}

$(document).ready(function () {
    load_data();
});
