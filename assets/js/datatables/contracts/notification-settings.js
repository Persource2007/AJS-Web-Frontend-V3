/**
 * Contract Notification Settings
 * Handles notification settings (Email/SMS) for contract task status events:
 * - ON_ROUTE: On Route notifications
 * - START_TASK: Task Started notifications
 * - TASK_COMPLETE: Task Completed notifications
 * - NO_ACCESS: No Access notifications
 * - APPOINTMENT_CONFIRMED: Appointment Confirmed notifications
 * - APPOINTMENT_REMINDER: Appointment Reminder notifications
 * - APPOINTMENT_REQUEST: Appointment Confirmation Request (sent when task needs appointment confirmation)
 */

// State management
var notificationSettingsState = {
    contractId: null,
    settings: {
        ON_ROUTE: {
            id: null,
            eventCode: "ON_ROUTE",
            isActive: true,
            enableEmail: true,
            enableSms: true
        },
        START_TASK: {
            id: null,
            eventCode: "START_TASK",
            isActive: true,
            enableEmail: true,
            enableSms: true
        },
        TASK_COMPLETE: {
            id: null,
            eventCode: "TASK_COMPLETE",
            isActive: true,
            enableEmail: true,
            enableSms: true
        },
        NO_ACCESS: {
            id: null,
            eventCode: "NO_ACCESS",
            isActive: true,
            enableEmail: true,
            enableSms: true
        },
        APPOINTMENT_CONFIRMED: {
            id: null,
            eventCode: "APPOINTMENT_CONFIRMED",
            isActive: true,
            enableEmail: true,
            enableSms: true
        },
        APPOINTMENT_REMINDER: {
            id: null,
            eventCode: "APPOINTMENT_REMINDER",
            isActive: true,
            enableEmail: true,
            enableSms: true
        },
        APPOINTMENT_REQUEST: {
            id: null,
            eventCode: "APPOINTMENT_REQUEST",
            isActive: true,
            enableEmail: true,
            enableSms: true
        }
    },
    hasUnsavedChanges: false,
    isLoading: false,
    isSaving: false,
    error: null,
    success: false
};

// Event labels mapping
var eventLabels = {
    ON_ROUTE: "On Route",
    START_TASK: "Task Started",
    TASK_COMPLETE: "Task Completed",
    NO_ACCESS: "No Access",
    APPOINTMENT_CONFIRMED: "Appointment Confirmed",
    APPOINTMENT_REMINDER: "Appointment Reminder",
    APPOINTMENT_REQUEST: "Appointment Confirmation Request"
};

/**
 * Initialize notification settings
 */
function init_notification_settings() {
    var contractId = $("#contract_id").val();
    if (!contractId || contractId <= 0) {
        show_notification_error("Invalid contract ID");
        return;
    }

    notificationSettingsState.contractId = contractId;
    load_notification_settings();
}

/**
 * Load notification settings from API
 */
function load_notification_settings() {
    var contractId = notificationSettingsState.contractId;
    if (!contractId) {
        return;
    }

    notificationSettingsState.isLoading = true;
    notificationSettingsState.error = null;
    update_loading_state(true);

    ajs.ajax_form(
        site_url + 'contract/NotificationSettings/notification_settings/' + contractId,
        null,
        'GET',
        null,
        '0',
        '0',
        handle_load_settings_success,
        handle_load_settings_error
    );
}

/**
 * Handle successful load of notification settings
 */
function handle_load_settings_success(result_json) {
    notificationSettingsState.isLoading = false;
    update_loading_state(false);

    if (ajs_form_handler.check_result(result_json)) {
        var settings = result_json.data || [];
        
        // Process all event settings
        var eventCodes = ['ON_ROUTE', 'START_TASK', 'TASK_COMPLETE', 'NO_ACCESS', 'APPOINTMENT_CONFIRMED', 'APPOINTMENT_REMINDER', 'APPOINTMENT_REQUEST'];
        
        eventCodes.forEach(function(eventCode) {
            var setting = settings.find(function(s) {
                return s.event_code === eventCode;
            });

            if (setting) {
                // Use existing settings
                notificationSettingsState.settings[eventCode] = {
                    id: setting.id || null,
                    eventCode: setting.event_code || eventCode,
                    isActive: setting.is_active !== false,
                    enableEmail: setting.enable_email !== false,
                    enableSms: setting.enable_sms !== false
                };
            } else {
                // No settings found, use defaults (all enabled)
                notificationSettingsState.settings[eventCode] = {
                    id: null,
                    eventCode: eventCode,
                    isActive: true,
                    enableEmail: true,
                    enableSms: true
                };
            }
        });

        notificationSettingsState.hasUnsavedChanges = false;
        notificationSettingsState.error = null;
        render_notification_settings();
    } else {
        handle_load_settings_error(result_json);
    }
}

/**
 * Handle error loading notification settings
 */
function handle_load_settings_error(result_json) {
    notificationSettingsState.isLoading = false;
    update_loading_state(false);

    var errorMessage = "Failed to load notification settings";
    if (result_json && result_json.message) {
        errorMessage = result_json.message;
    } else if (result_json && result_json.error) {
        errorMessage = result_json.error;
    }

    show_notification_error(errorMessage);
    notificationSettingsState.error = errorMessage;
}

/**
 * Render notification settings UI
 */
function render_notification_settings() {
    var container = $("#notification-settings-container");
    if (!container.length) {
        return;
    }

    var validationError = get_validation_error();
    var eventCodes = ['ON_ROUTE', 'START_TASK', 'TASK_COMPLETE', 'NO_ACCESS', 'APPOINTMENT_CONFIRMED', 'APPOINTMENT_REMINDER', 'APPOINTMENT_REQUEST'];

    // Generate HTML for each event
    var eventsHtml = eventCodes.map(function(eventCode, index) {
        var settings = notificationSettingsState.settings[eventCode];
        var isDisabled = !settings.isActive;
        var eventLabel = eventLabels[eventCode];
        var eventId = eventCode.toLowerCase();

        var total = eventCodes.length;
        var isLeftCol = (index % 2 === 0);
        var hasRightNeighbor = isLeftCol && ((index + 1) < total); // another section sits beside it
        var hasSectionBelow = (index + 2) < total;                 // another section sits in the next row
        var colClasses = 'col-md-6 ' + (isLeftCol ? 'pe-md-4' : 'ps-md-4') +
            (hasRightNeighbor ? ' border-end section-divider' : '');
        var innerClasses = 'mb-4' + (hasSectionBelow ? ' pb-4 border-bottom' : '');

        return `
            <div class="${colClasses}">
            <div class="${innerClasses}">
                <h6 class="mb-3">${eventLabel} Notifications</h6>
                
                <!-- Level 1: Enable/Disable Toggle -->
                <div class="mb-4">
                    <div class="d-flex align-items-center justify-content-between">
                        <div>
                            <label for="${eventId}_enable" class="form-label mb-0">Enable notifications for ${eventLabel} status change</label>
                            <p class="text-muted small mb-0">Turn on/off notifications for ${eventLabel} event</p>
                        </div>
                        <div class="form-check form-switch form-switch-lg">
                            <input 
                                class="form-check-input" 
                                type="checkbox" 
                                role="switch" 
                                id="${eventId}_enable" 
                                ${settings.isActive ? 'checked' : ''}
                                aria-label="Enable ${eventLabel} notifications"
                            >
                        </div>
                    </div>
                </div>

                <!-- Level 2: Channel Selection -->
                <div class="channel-selection ${isDisabled ? 'disabled' : ''}" id="${eventId}_channel_selection">
                    <label class="form-label mb-3">When enabled, select channels:</label>
                    
                    <div class="form-check form-switch mb-3">
                        <input 
                            class="form-check-input" 
                            type="checkbox" 
                            role="switch" 
                            id="${eventId}_email" 
                            ${settings.enableEmail ? 'checked' : ''}
                            ${isDisabled ? 'disabled' : ''}
                            aria-label="Enable Email notifications for ${eventLabel}"
                        >
                        <label class="form-check-label" for="${eventId}_email">Send Email Notifications</label>
                    </div>

                    <div class="form-check form-switch mb-3">
                        <input 
                            class="form-check-input" 
                            type="checkbox" 
                            role="switch" 
                            id="${eventId}_sms" 
                            ${settings.enableSms ? 'checked' : ''}
                            ${isDisabled ? 'disabled' : ''}
                            aria-label="Enable SMS notifications for ${eventLabel}"
                        >
                        <label class="form-check-label" for="${eventId}_sms">Send SMS Notifications</label>
                    </div>
                </div>
            </div>
            </div>
        `;
    }).join('');

    var html = `
        <div class="notification-settings-form">
            ${validationError ? `<div class="alert alert-warning mb-3" role="alert">
                <i class="ri-error-warning-line me-2"></i>
                ${validationError}
            </div>` : ''}
            
            ${notificationSettingsState.success ? `<div class="alert alert-success mb-3" role="alert">
                <i class="ri-checkbox-circle-line me-2"></i>
                Settings saved successfully!
            </div>` : ''}

            <div class="row">
                ${eventsHtml}
            </div>

            <!-- Action Buttons -->
            <div class="d-flex gap-2 justify-content-end mt-4 pt-3 border-top">
                <button 
                    type="button" 
                    class="btn btn-secondary" 
                    id="notification-cancel-btn"
                    ${!notificationSettingsState.hasUnsavedChanges ? 'disabled' : ''}
                >
                    Cancel
                </button>
                <button 
                    type="button" 
                    class="btn btn-success" 
                    id="notification-save-btn"
                    ${!can_save_settings() ? 'disabled' : ''}
                >
                    <span class="save-btn-text">Save Settings</span>
                    <span class="save-btn-spinner spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
                </button>
            </div>
        </div>
    `;

    container.html(html);
    attach_notification_event_handlers();
}

/**
 * Get validation error message if any
 */
function get_validation_error() {
    var eventCodes = ['ON_ROUTE', 'START_TASK', 'TASK_COMPLETE', 'NO_ACCESS', 'APPOINTMENT_CONFIRMED', 'APPOINTMENT_REMINDER', 'APPOINTMENT_REQUEST'];
    var errors = [];
    
    eventCodes.forEach(function(eventCode) {
        var settings = notificationSettingsState.settings[eventCode];
        if (settings.isActive && !settings.enableEmail && !settings.enableSms) {
            errors.push(eventLabels[eventCode]);
        }
    });
    
    if (errors.length > 0) {
        return "At least one channel (Email or SMS) must be enabled for: " + errors.join(', ');
    }
    return null;
}

/**
 * Check if settings can be saved
 */
function can_save_settings() {
    if (!notificationSettingsState.hasUnsavedChanges) {
        return false;
    }
    
    var eventCodes = ['ON_ROUTE', 'START_TASK', 'TASK_COMPLETE', 'NO_ACCESS', 'APPOINTMENT_CONFIRMED', 'APPOINTMENT_REMINDER', 'APPOINTMENT_REQUEST'];
    
    // Check each event: if Level 1 is ON, at least one channel must be enabled
    for (var i = 0; i < eventCodes.length; i++) {
        var settings = notificationSettingsState.settings[eventCodes[i]];
        if (settings.isActive && !settings.enableEmail && !settings.enableSms) {
            return false;
        }
    }
    
    return true;
}

/**
 * Attach event handlers to notification settings UI
 */
function attach_notification_event_handlers() {
    var eventCodes = ['ON_ROUTE', 'START_TASK', 'TASK_COMPLETE', 'NO_ACCESS', 'APPOINTMENT_CONFIRMED', 'APPOINTMENT_REMINDER', 'APPOINTMENT_REQUEST'];
    
    // Attach handlers for each event
    eventCodes.forEach(function(eventCode) {
        var eventId = eventCode.toLowerCase();
        
        // Level 1: Enable/Disable toggle
        $("#" + eventId + "_enable").off('change').on('change', function() {
            var isActive = $(this).is(':checked');
            handle_enable_toggle_change(eventCode, isActive);
        });

        // Level 2: Email toggle
        $("#" + eventId + "_email").off('change').on('change', function() {
            var enabled = $(this).is(':checked');
            handle_channel_toggle_change(eventCode, 'email', enabled);
        });

        // Level 2: SMS toggle
        $("#" + eventId + "_sms").off('change').on('change', function() {
            var enabled = $(this).is(':checked');
            handle_channel_toggle_change(eventCode, 'sms', enabled);
        });
    });

    // Save button
    $("#notification-save-btn").off('click').on('click', function() {
        save_notification_settings();
    });

    // Cancel button
    $("#notification-cancel-btn").off('click').on('click', function() {
        cancel_notification_changes();
    });
}

/**
 * Handle Level 1 toggle change (Enable/Disable)
 */
function handle_enable_toggle_change(eventCode, isActive) {
    notificationSettingsState.settings[eventCode].isActive = isActive;
    notificationSettingsState.success = false;
    
    var eventId = eventCode.toLowerCase().replace(/_/g, '_');
    
    if (!isActive) {
        // Disable Level 2 toggles (but keep their values for when re-enabled)
        $("#" + eventId + "_email").prop('disabled', true);
        $("#" + eventId + "_sms").prop('disabled', true);
        $("#" + eventId + "_channel_selection").addClass('disabled');
    } else {
        // Enable Level 2 toggles
        $("#" + eventId + "_email").prop('disabled', false);
        $("#" + eventId + "_sms").prop('disabled', false);
        $("#" + eventId + "_channel_selection").removeClass('disabled');
    }

    mark_unsaved_changes();
    update_validation_state();
}

/**
 * Handle Level 2 toggle change (Email/SMS)
 */
function handle_channel_toggle_change(eventCode, channel, enabled) {
    if (!notificationSettingsState.settings[eventCode].isActive) {
        // Don't allow changes if Level 1 is disabled
        return;
    }

    notificationSettingsState.success = false;

    if (channel === 'email') {
        notificationSettingsState.settings[eventCode].enableEmail = enabled;
    } else if (channel === 'sms') {
        notificationSettingsState.settings[eventCode].enableSms = enabled;
    }

    mark_unsaved_changes();
    update_validation_state();
}

/**
 * Update validation state and re-render if needed
 */
function update_validation_state() {
    var validationError = get_validation_error();
    var canSave = can_save_settings();
    
    // Update save button state
    $("#notification-save-btn").prop('disabled', !canSave);
    
    // Re-render to show/hide validation error
    if (validationError || notificationSettingsState.error) {
        render_notification_settings();
    }
}

/**
 * Mark that there are unsaved changes
 */
function mark_unsaved_changes() {
    notificationSettingsState.hasUnsavedChanges = true;
    notificationSettingsState.error = null;
    update_validation_state();
}

/**
 * Save notification settings
 */
function save_notification_settings() {
    var contractId = notificationSettingsState.contractId;
    if (!contractId) {
        show_notification_error("Invalid contract ID");
        return;
    }

    // Validation
    var validationError = get_validation_error();
    if (validationError) {
        notificationSettingsState.error = validationError;
        render_notification_settings();
        return;
    }

    perform_save_notification_settings();
}

/**
 * Perform the actual save operation
 */
function perform_save_notification_settings() {
    var contractId = notificationSettingsState.contractId;
    var eventCodes = ['ON_ROUTE', 'START_TASK', 'TASK_COMPLETE', 'NO_ACCESS', 'APPOINTMENT_CONFIRMED', 'APPOINTMENT_REMINDER', 'APPOINTMENT_REQUEST'];

    // Show loading state
    set_save_button_loading(true);
    notificationSettingsState.error = null;
    notificationSettingsState.success = false;

    // Prepare request data for all events
    var settingsArray = eventCodes.map(function(eventCode) {
        var settings = notificationSettingsState.settings[eventCode];
        return {
            event_code: settings.eventCode,
            is_active: settings.isActive,
            enable_email: settings.enableEmail,
            enable_sms: settings.enableSms
        };
    });

    var requestData = {
        settings: settingsArray
    };

    ajs.ajax_form(
        site_url + 'contract/NotificationSettings/notification_settings/' + contractId,
        requestData,
        'POST',
        null,
        '0',
        '0',
        handle_save_settings_success,
        handle_save_settings_error
    );
}

/**
 * Handle successful save
 */
function handle_save_settings_success(result_json) {
    set_save_button_loading(false);

    if (ajs_form_handler.check_result(result_json)) {
        // Update state with saved data for all events
        if (result_json.data && result_json.data.length > 0) {
            result_json.data.forEach(function(savedSetting) {
                var eventCode = savedSetting.event_code;
                if (notificationSettingsState.settings[eventCode]) {
                    notificationSettingsState.settings[eventCode].id = savedSetting.id || null;
                }
            });
        }

        notificationSettingsState.hasUnsavedChanges = false;
        notificationSettingsState.success = true;
        notificationSettingsState.error = null;
        
        $("#notification-save-btn").prop('disabled', true);
        $("#notification-cancel-btn").prop('disabled', true);

        // Re-render to show success message
        render_notification_settings();
        
        // Hide success message after 3 seconds
        setTimeout(function() {
            notificationSettingsState.success = false;
            render_notification_settings();
        }, 3000);
    } else {
        handle_save_settings_error(result_json);
    }
}

/**
 * Handle error saving settings
 */
function handle_save_settings_error(result_json) {
    set_save_button_loading(false);

    var errorMessage = "Failed to save notification settings";
    if (result_json && result_json.message) {
        errorMessage = result_json.message;
    } else if (result_json && result_json.error) {
        errorMessage = result_json.error;
    }

    notificationSettingsState.error = errorMessage;
    render_notification_settings();
}

/**
 * Cancel changes and reload settings
 */
function cancel_notification_changes() {
    if (!notificationSettingsState.hasUnsavedChanges) {
        return;
    }

    Swal.fire({
        title: 'Discard Changes?',
        text: 'Are you sure you want to discard your changes?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, discard',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            notificationSettingsState.success = false;
            notificationSettingsState.error = null;
            load_notification_settings();
        }
    });
}

/**
 * Update loading state
 */
function update_loading_state(isLoading) {
    var container = $("#notification-settings-container");
    if (isLoading) {
        container.html(`
            <div class="notification-settings-loading text-center py-4">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `);
    }
}

/**
 * Set save button loading state
 */
function set_save_button_loading(isLoading) {
    var saveBtn = $("#notification-save-btn");
    var spinner = saveBtn.find('.save-btn-spinner');
    var text = saveBtn.find('.save-btn-text');

    if (isLoading) {
        notificationSettingsState.isSaving = true;
        saveBtn.prop('disabled', true);
        spinner.removeClass('d-none');
        text.text('Saving...');
    } else {
        notificationSettingsState.isSaving = false;
        saveBtn.prop('disabled', !can_save_settings());
        spinner.addClass('d-none');
        text.text('Save Settings');
    }
}

/**
 * Show error message
 */
function show_notification_error(message) {
    var container = $("#notification-settings-container");
    container.html(`
        <div class="alert alert-danger" role="alert">
            <i class="ri-error-warning-line me-2"></i>
            <strong>Error:</strong> ${message}
            <button type="button" class="btn btn-sm btn-outline-danger ms-2" onclick="load_notification_settings()">
                <i class="ri-refresh-line"></i> Retry
            </button>
        </div>
    `);
}

/**
 * Initialize on document ready
 */
$(function() {
    if ($("#notification-settings-container").length) {
        init_notification_settings();
    }
});

