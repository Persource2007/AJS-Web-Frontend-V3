/**
 * Contract Communication Settings
 * Manages per-contract toggles for survey (email/SMS) and EICR certificate sending.
 * Stored in contract_comm_settings table by (contract_id, type).
 */

var commSettingsState = {
    contractId:        null,
    // Survey
    is_active:         true,
    send_email:        true,
    send_sms:          true,
    // EICR
    eicr_active:       true,
    hasUnsavedChanges: false,
    justSaved:         false,
    isSaving:          false
};

function init_communication_settings() {
    commSettingsState.contractId = $('#client_id').val();
    if (!commSettingsState.contractId || commSettingsState.contractId <= 0) {
        $('#communication-settings-container').html(
            '<div class="alert alert-danger mt-3">Invalid client ID.</div>'
        );
        return;
    }
    load_communication_settings();
}

function load_communication_settings() {
    $('#communication-settings-container').html(
        '<div class="text-center py-4">' +
        '<div class="spinner-border text-primary" role="status">' +
        '<span class="visually-hidden">Loading...</span></div></div>'
    );

    var id = commSettingsState.contractId;

    // Load survey settings, then EICR settings, then render both
    ajs.ajax_form(
        site_url + 'client/CommunicationSettings/survey_settings_get/' + id,
        null, 'GET', null, '0', '0',
        function (surveyRes) {
            var sd = (surveyRes && surveyRes.data) ? surveyRes.data : {};
            commSettingsState.is_active  = sd.is_active  !== false;
            commSettingsState.send_email = sd.send_email !== false;
            commSettingsState.send_sms   = sd.send_sms   !== false;

            ajs.ajax_form(
                site_url + 'client/CommunicationSettings/eicr_settings_get/' + id,
                null, 'GET', null, '0', '0',
                function (eicrRes) {
                    var ed = (eicrRes && eicrRes.data) ? eicrRes.data : {};
                    commSettingsState.eicr_active = ed.is_active !== false;
                    commSettingsState.hasUnsavedChanges = false;
                    commSettingsState.justSaved         = false;
                    render_communication_settings();
                },
                function () {
                    commSettingsState.eicr_active       = true;
                    commSettingsState.hasUnsavedChanges = false;
                    commSettingsState.justSaved         = false;
                    render_communication_settings();
                }
            );
        },
        function () {
            $('#communication-settings-container').html(
                '<div class="alert alert-danger mt-3">' +
                '<i class="ri-error-warning-line me-2"></i>Failed to load communication settings. ' +
                '<button class="btn btn-sm btn-outline-danger ms-2" onclick="load_communication_settings()">' +
                '<i class="ri-refresh-line"></i> Retry</button></div>'
            );
        }
    );
}

function render_communication_settings() {
    var isDisabled  = !commSettingsState.is_active;
    var successHtml = commSettingsState.justSaved
        ? '<div class="alert alert-success mb-3"><i class="ri-checkbox-circle-line me-2"></i>Settings saved successfully!</div>'
        : '';

    var html =
        '<div class="notification-settings-form">' +
            successHtml +

            '<div class="row">' +

            // ── Survey Notifications ──
            '<div class="col-md-6 border-end section-divider pe-md-4">' +
            '<div class="mb-4">' +
                '<h6 class="mb-3">Survey Notifications</h6>' +

                '<div class="mb-4">' +
                    '<div class="d-flex align-items-center justify-content-between">' +
                        '<div>' +
                            '<label for="comm_survey_enable" class="form-label mb-0">Enable Survey Notification</label>' +
                            '<p class="text-muted small mb-0">Turn on/off satisfaction survey sending for this contract</p>' +
                        '</div>' +
                        '<div class="form-check form-switch form-switch-lg">' +
                            '<input class="form-check-input" type="checkbox" role="switch" id="comm_survey_enable"' +
                            (commSettingsState.is_active ? ' checked' : '') +
                            ' aria-label="Enable Survey Notification">' +
                        '</div>' +
                    '</div>' +
                '</div>' +

                '<div class="channel-selection ' + (isDisabled ? 'disabled' : '') + '" id="comm_survey_channel_selection">' +
                    '<label class="form-label mb-3">When enabled, select channels:</label>' +
                    '<div class="form-check form-switch mb-3">' +
                        '<input class="form-check-input" type="checkbox" role="switch" id="comm_survey_send_email"' +
                        (commSettingsState.send_email ? ' checked' : '') +
                        (isDisabled ? ' disabled' : '') +
                        ' aria-label="Send Survey Email">' +
                        '<label class="form-check-label" for="comm_survey_send_email">Send Survey Email</label>' +
                    '</div>' +
                    '<div class="form-check form-switch mb-3">' +
                        '<input class="form-check-input" type="checkbox" role="switch" id="comm_survey_send_sms"' +
                        (commSettingsState.send_sms ? ' checked' : '') +
                        (isDisabled ? ' disabled' : '') +
                        ' aria-label="Send Survey SMS">' +
                        '<label class="form-check-label" for="comm_survey_send_sms">Send Survey SMS</label>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '</div>' +

            // ── EICR Certificate ──
            '<div class="col-md-6 ps-md-4">' +
            '<div class="mb-4">' +
                '<h6 class="mb-3">EICR Certificate</h6>' +
                '<div class="mb-4">' +
                    '<div class="d-flex align-items-center justify-content-between">' +
                        '<div>' +
                            '<label for="comm_eicr_active" class="form-label mb-0">Send EICR Certificate</label>' +
                            '<p class="text-muted small mb-0">Send EICR certificate to resident by email on approval</p>' +
                        '</div>' +
                        '<div class="form-check form-switch form-switch-lg">' +
                            '<input class="form-check-input" type="checkbox" role="switch" id="comm_eicr_active"' +
                            (commSettingsState.eicr_active ? ' checked' : '') +
                            ' aria-label="Send EICR Certificate">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '</div>' +

            '</div>' +

            // ── Actions ── (dropped for view-only users by ajs.apply_permissions())
            '<div class="d-flex gap-2 justify-content-end mt-4 pt-3 border-top check-permission" data-module="Clients" data-action="edit">' +
                '<button type="button" class="btn btn-secondary" id="comm-settings-cancel-btn"' +
                (!commSettingsState.hasUnsavedChanges ? ' disabled' : '') + '>Cancel</button>' +
                '<button type="button" class="btn btn-success" id="comm-settings-save-btn"' +
                (!commSettingsState.hasUnsavedChanges ? ' disabled' : '') + '>' +
                    '<span class="save-btn-text">Save Settings</span>' +
                    '<span class="save-btn-spinner spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>' +
                '</button>' +
            '</div>' +
        '</div>';

    $('#communication-settings-container').html(html);
    apply_comm_settings_rights();
    attach_communication_event_handlers();
}

/**
 * The card is rebuilt on every render, so the rights have to be re-applied each time - a single
 * call at page load would only ever see the loading spinner. apply_permissions() removes the
 * action row; the toggles are disabled alongside it so a view-only user is not left flipping
 * switches that can never be saved (the POST needs edit_clients and would be rejected anyway).
 */
function apply_comm_settings_rights() {
    ajs.apply_permissions();

    if (!ajs.check_role('Clients', 'edit')) {
        $('#communication-settings-container').find('input, select, textarea, button').prop('disabled', true);
    }
}

function attach_communication_event_handlers() {
    // Survey Level 1
    $('#comm_survey_enable').off('change').on('change', function () {
        commSettingsState.is_active = $(this).is(':checked');
        if (!commSettingsState.is_active) {
            $('#comm_survey_send_email, #comm_survey_send_sms').prop('disabled', true);
            $('#comm_survey_channel_selection').addClass('disabled');
        } else {
            $('#comm_survey_send_email, #comm_survey_send_sms').prop('disabled', false);
            $('#comm_survey_channel_selection').removeClass('disabled');
        }
        mark_comm_unsaved();
    });

    // Survey Level 2
    $('#comm_survey_send_email').off('change').on('change', function () {
        commSettingsState.send_email = $(this).is(':checked');
        mark_comm_unsaved();
    });
    $('#comm_survey_send_sms').off('change').on('change', function () {
        commSettingsState.send_sms = $(this).is(':checked');
        mark_comm_unsaved();
    });

    // EICR toggle
    $('#comm_eicr_active').off('change').on('change', function () {
        commSettingsState.eicr_active = $(this).is(':checked');
        mark_comm_unsaved();
    });

    // Save
    $('#comm-settings-save-btn').off('click').on('click', save_communication_settings);

    // Cancel
    $('#comm-settings-cancel-btn').off('click').on('click', function () {
        if (!commSettingsState.hasUnsavedChanges) return;
        commSettingsState.hasUnsavedChanges = false;
        commSettingsState.justSaved         = false;
        load_communication_settings();
    });
}

function mark_comm_unsaved() {
    commSettingsState.hasUnsavedChanges = true;
    commSettingsState.justSaved         = false;
    $('#comm-settings-save-btn, #comm-settings-cancel-btn').prop('disabled', false);
}

function save_communication_settings() {
    var saveBtn = $('#comm-settings-save-btn');
    saveBtn.prop('disabled', true);
    saveBtn.find('.save-btn-text').text('Saving...');
    saveBtn.find('.save-btn-spinner').removeClass('d-none');

    var id = commSettingsState.contractId;

    ajs.ajax_form(
        site_url + 'client/CommunicationSettings/survey_settings_post/' + id,
        { is_active: commSettingsState.is_active ? 1 : 0,
          send_email: commSettingsState.send_email ? 1 : 0,
          send_sms:   commSettingsState.send_sms   ? 1 : 0 },
        'POST', null, '0', '0',
        function () {
            ajs.ajax_form(
                site_url + 'client/CommunicationSettings/eicr_settings_post/' + id,
                { is_active: commSettingsState.eicr_active ? 1 : 0 },
                'POST', null, '0', '0',
                function () {
                    commSettingsState.hasUnsavedChanges = false;
                    commSettingsState.justSaved         = true;
                    render_communication_settings();
                    setTimeout(function () {
                        commSettingsState.justSaved = false;
                        render_communication_settings();
                    }, 3000);
                },
                function () {
                    saveBtn.prop('disabled', false);
                    saveBtn.find('.save-btn-text').text('Save Settings');
                    saveBtn.find('.save-btn-spinner').addClass('d-none');
                    ajs.show_error('Failed to save communication settings.');
                }
            );
        },
        function () {
            saveBtn.prop('disabled', false);
            saveBtn.find('.save-btn-text').text('Save Settings');
            saveBtn.find('.save-btn-spinner').addClass('d-none');
            ajs.show_error('Failed to save communication settings.');
        }
    );
}

$(function () {
    if ($('#communication-settings-container').length) {
        init_communication_settings();
    }
});
