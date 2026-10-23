/**
 * Client Notification Templates Management
 * Handles CRUD operations for client-specific notification templates
 */

// CKEditor instance for template content
var notificationTemplateEditor = null;

// Event code labels mapping
const EVENT_LABELS = {
    'START_TASK': 'Task Started',
    'ON_ROUTE': 'On Route',
    'TASK_COMPLETE': 'Task Complete',
    'NO_ACCESS': 'No Access',
    'APPOINTMENT_CONFIRMED': 'Appointment Confirmed',
    'APPOINTMENT_REMINDER': 'Appointment Reminder',
    'APPOINTMENT_REQUEST': 'Appointment Confirmation Request'
};

// Channel labels mapping
const CHANNEL_LABELS = {
    'email': 'Email',
    'sms': 'SMS'
};

// All template combinations (7 events × 2 channels = 14 templates)
const ALL_TEMPLATES = [
    { event_code: 'START_TASK', channel: 'email' },
    { event_code: 'START_TASK', channel: 'sms' },
    { event_code: 'ON_ROUTE', channel: 'email' },
    { event_code: 'ON_ROUTE', channel: 'sms' },
    { event_code: 'TASK_COMPLETE', channel: 'email' },
    { event_code: 'TASK_COMPLETE', channel: 'sms' },
    { event_code: 'NO_ACCESS', channel: 'email' },
    { event_code: 'NO_ACCESS', channel: 'sms' },
    { event_code: 'APPOINTMENT_CONFIRMED', channel: 'email' },
    { event_code: 'APPOINTMENT_CONFIRMED', channel: 'sms' },
    { event_code: 'APPOINTMENT_REMINDER', channel: 'email' },
    { event_code: 'APPOINTMENT_REMINDER', channel: 'sms' },
    { event_code: 'APPOINTMENT_REQUEST', channel: 'email' },
    { event_code: 'APPOINTMENT_REQUEST', channel: 'sms' }
];

// State management
var notificationTemplatesState = {
    templates: [],
    loading: false,
    currentTemplate: null
};

/**
 * Initialize notification templates management
 */
function initNotificationTemplates() {
    const clientId = $('#client_id').val();
    if (!clientId) {
        console.error('Client ID not found');
        return;
    }
    
    loadNotificationTemplates();
    attachEventHandlers();
}

/**
 * Load all notification templates from API
 */
function loadNotificationTemplates() {
    const clientId = $('#client_id').val();
    if (!clientId) {
        return;
    }
    
    notificationTemplatesState.loading = true;
    const url = site_url + 'client/' + clientId + '/notification-templates';
    
    ajs.ajax_form(url, null, 'GET', null, '0', '0', 
        handleLoadTemplatesSuccess, 
        handleLoadTemplatesError
    );
}

/**
 * Handle successful template list load
 */
function handleLoadTemplatesSuccess(result_json) {
    notificationTemplatesState.loading = false;
    
    if (ajs_form_handler.check_result(result_json)) {
        notificationTemplatesState.templates = result_json.data || [];
        renderTemplatesTable();
    } else {
        ajs.showAlertBar('error', 'Failed to load notification templates', 1);
        renderTemplatesTable(); // Render empty table
    }
}

/**
 * Handle error loading templates
 */
function handleLoadTemplatesError(result_json) {
    notificationTemplatesState.loading = false;
    ajs.showAlertBar('error', 'Error loading notification templates', 1);
    renderTemplatesTable(); // Render empty table
}

/**
 * Render the templates table
 */
function renderTemplatesTable() {
    const tbody = $('#notification-templates-tbody');
    tbody.empty();
    
    if (notificationTemplatesState.loading) {
        tbody.html(`
            <tr>
                <td colspan="6" class="text-center">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </td>
            </tr>
        `);
        return;
    }
    
    // Create a map of existing templates for quick lookup
    const templatesMap = {};
    notificationTemplatesState.templates.forEach(template => {
        const key = `${template.event_code}_${template.channel}`;
        templatesMap[key] = template;
    });
    
    // Render all 12 template combinations (6 events × 2 channels)
    const mobileContainer = $('#notification-templates-mobile');
    if (mobileContainer.length) {
        mobileContainer.empty();
    }
    
    ALL_TEMPLATES.forEach(({ event_code, channel }) => {
        const key = `${event_code}_${channel}`;
        const template = templatesMap[key] || null;
        
        const row = createTemplateRow(event_code, channel, template);
        tbody.append(row);
        
        // Mobile card view
        if (mobileContainer.length) {
            const card = renderMobileTemplateCard(template, event_code, channel);
            mobileContainer.append(card);
        }
    });
}

/**
 * Create a table row for a template
 */
function createTemplateRow(event_code, channel, template) {
    const isCustom = template && template.is_custom;
    const clientTemplate = template && template.client_template ? template.client_template : null;
    const systemTemplate = template && template.system_template ? template.system_template : null;
    
    // Get template content preview (first 50 chars)
    let templateContent = 'N/A';
    if (clientTemplate && clientTemplate.template_content) {
        const plainText = stripHtml(clientTemplate.template_content);
        templateContent = plainText.length > 50 ? plainText.substring(0, 50) + '...' : plainText;
    } else if (systemTemplate && systemTemplate.template_content) {
        const plainText = stripHtml(systemTemplate.template_content);
        templateContent = plainText.length > 50 ? plainText.substring(0, 50) + '...' : plainText;
    }
    
    const subjectTemplate = clientTemplate && clientTemplate.subject_template
        ? clientTemplate.subject_template
        : (systemTemplate && systemTemplate.subject_template ? systemTemplate.subject_template : 'N/A');
    
    const statusBadge = isCustom 
        ? '<span class="badge border border-success text-success">Custom</span>' 
        : '<span class="badge border border-indigo text-indigo">System Default</span>';
    
    const actionButtons = isCustom
        ? `<div class="btn-group" role="group">
            <button class="btn btn-sm btn-primary edit-template-btn" 
                    data-event-code="${event_code}" 
                    data-channel="${channel}" 
                    data-template-id="${clientTemplate.id}">
                <i class="ri-edit-line"></i> Edit
            </button>
            <button class="btn btn-sm btn-danger delete-template-btn" 
                    data-template-id="${clientTemplate.id}"
                    data-event-code="${event_code}"
                    data-channel="${channel}">
                <i class="ri-delete-bin-line"></i> Delete
            </button>
        </div>`
        : `
            <button class="btn btn-sm btn-success create-template-btn" 
                    data-event-code="${event_code}" 
                    data-channel="${channel}">
                <i class="ri-add-line"></i> Create Custom
            </button>
        `;
    
    // Show subject template only for email channel
    const subjectDisplay = channel === 'email' ? subjectTemplate : 'N/A';
    
    return `
        <tr>
            <td>${EVENT_LABELS[event_code] || event_code}</td>
            <td>${CHANNEL_LABELS[channel] || channel}</td>
            <td>${templateContent}</td>
            <td>${subjectDisplay}</td>
            <td>${statusBadge}</td>
            <td>${actionButtons}</td>
        </tr>
    `;
}

/**
 * Render mobile-friendly template card
 */
function renderMobileTemplateCard(template, event_code, channel) {
    const isCustom = template && template.is_custom;
    const clientTemplate = template && template.client_template ? template.client_template : null;
    const systemTemplate = template && template.system_template ? template.system_template : null;
    
    // Get template content preview (first 50 chars)
    let templateContent = 'N/A';
    if (clientTemplate && clientTemplate.template_content) {
        const plainText = stripHtml(clientTemplate.template_content);
        templateContent = plainText.length > 50 ? plainText.substring(0, 50) + '...' : plainText;
    } else if (systemTemplate && systemTemplate.template_content) {
        const plainText = stripHtml(systemTemplate.template_content);
        templateContent = plainText.length > 50 ? plainText.substring(0, 50) + '...' : plainText;
    }
    
    const subjectTemplate = clientTemplate && clientTemplate.subject_template
        ? clientTemplate.subject_template
        : (systemTemplate && systemTemplate.subject_template ? systemTemplate.subject_template : 'N/A');
    
    const statusBadge = isCustom 
        ? '<span class="badge border border-success text-success">Custom</span>' 
        : '<span class="badge border border-indigo text-indigo">System Default</span>';
    
    const actionButtons = isCustom
        ? `<div class="btn-group w-100" role="group">
            <button class="btn btn-sm btn-primary edit-template-btn" 
                    data-event-code="${event_code}" 
                    data-channel="${channel}" 
                    data-template-id="${clientTemplate.id}">
                <i class="ri-edit-line"></i> Edit
            </button>
            <button class="btn btn-sm btn-danger delete-template-btn" 
                    data-template-id="${clientTemplate.id}"
                    data-event-code="${event_code}"
                    data-channel="${channel}">
                <i class="ri-delete-bin-line"></i> Delete
            </button>
        </div>`
        : `
            <button class="btn btn-sm btn-success w-100 create-template-btn" 
                    data-event-code="${event_code}" 
                    data-channel="${channel}">
                <i class="ri-add-line"></i> Create Custom
            </button>
        `;
    
    const subjectDisplay = channel === 'email' ? subjectTemplate : 'N/A';
    
    return `
        <div class="card mb-3">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <h6 class="mb-1">${EVENT_LABELS[event_code] || event_code}</h6>
                        <small class="text-muted">${CHANNEL_LABELS[channel] || channel}</small>
                    </div>
                    ${statusBadge}
                </div>
                <div class="mb-2">
                    <strong>Template:</strong> <small class="text-muted">${templateContent}</small>
                </div>
                ${channel === 'email' ? `<div class="mb-2"><strong>Subject:</strong> <small class="text-muted">${subjectTemplate}</small></div>` : ''}
                <div class="mt-3">
                    ${actionButtons}
                </div>
            </div>
        </div>
    `;
}

/**
 * Strip HTML tags from content for preview
 */
function stripHtml(html) {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}

/**
 * Attach event handlers
 */
function attachEventHandlers() {
    // Create custom template button
    $(document).on('click', '.create-template-btn', function() {
        const eventCode = $(this).data('event-code');
        const channel = $(this).data('channel');
        openTemplateModal(eventCode, channel, null);
    });
    
    // Edit template button
    $(document).on('click', '.edit-template-btn', function() {
        const eventCode = $(this).data('event-code');
        const channel = $(this).data('channel');
        const templateId = $(this).data('template-id');
        loadTemplateDetails(eventCode, channel, templateId);
    });
    
    // Delete template button
    $(document).on('click', '.delete-template-btn', function() {
        const templateId = $(this).data('template-id');
        const eventCode = $(this).data('event-code');
        const channel = $(this).data('channel');
        confirmDeleteTemplate(templateId, eventCode, channel);
    });
    
    // Save template button
    $('#saveTemplateBtn').on('click', function() {
        saveTemplate();
    });
    
    // Variable button click handlers
    $(document).on('click', '.variable-btn', function() {
        const variable = $(this).data('variable');
        if (notificationTemplateEditor) {
            const model = notificationTemplateEditor.model;
            const selection = model.document.selection;
            const insertPosition = selection.getFirstPosition();
            model.change(writer => {
                writer.insertText(variable, insertPosition);
            });
            notificationTemplateEditor.editing.view.focus();
        } else {
            // Fallback if editor not initialized yet
            const textarea = $('#template_content');
            const cursorPos = textarea[0].selectionStart;
            const textBefore = textarea.val().substring(0, cursorPos);
            const textAfter = textarea.val().substring(cursorPos);
            textarea.val(textBefore + variable + textAfter);
            textarea[0].setSelectionRange(cursorPos + variable.length, cursorPos + variable.length);
            textarea.focus();
        }
    });
    
    // Show/hide subject template field based on channel
    $('#notificationTemplateModal').on('show.bs.modal', function() {
        const channel = $('#template_channel').val();
        if (channel === 'email') {
            $('#subject_template_div').show();
            $('#subject_template').prop('required', true);
        } else {
            $('#subject_template_div').hide();
            $('#subject_template').prop('required', false);
        }
    });
    
    // Destroy CKEditor when modal is hidden and cleanup
    $('#notificationTemplateModal').on('hidden.bs.modal', function() {
        if (notificationTemplateEditor) {
            notificationTemplateEditor.destroy().then(() => {
                notificationTemplateEditor = null;
            }).catch(error => {
                console.error('Error destroying editor:', error);
                notificationTemplateEditor = null;
            });
        }
        // Remove resize listener
        $(window).off('resize.notificationTemplates');
    });
}

/**
 * Open template modal for create/edit
 */
function openTemplateModal(eventCode, channel, templateData) {
    $('#template_id').val('');
    $('#template_event_code').val(eventCode);
    $('#template_channel').val(channel);
    $('#subject_template').val('');
    $('#template_content').val('');
    
    // Set modal title
    const action = templateData ? 'Edit' : 'Create';
    const eventLabel = EVENT_LABELS[eventCode] || eventCode;
    const channelLabel = CHANNEL_LABELS[channel] || channel;
    $('#notificationTemplateModalLabel').text(`${action} ${eventLabel} - ${channelLabel} Template`);
    
    // Populate form if editing
    if (templateData) {
        $('#template_id').val(templateData.id || '');
        $('#subject_template').val(templateData.subject_template || '');
        $('#template_content').val(templateData.template_content || '');
    }
    
    // Show/hide subject template field
    if (channel === 'email') {
        $('#subject_template_div').show();
        $('#subject_template').prop('required', true);
    } else {
        $('#subject_template_div').hide();
        $('#subject_template').prop('required', false);
    }
    
    // Show modal first
    const $modal = $('#notificationTemplateModal');
    $modal.modal('show');
    
    // Adjust variables list height after modal is fully shown
    $modal.on('shown.bs.modal', function() {
        adjustVariablesListHeight();
    });
    
    // Initialize CKEditor after modal is shown
    setTimeout(function() {
        if (!notificationTemplateEditor) {
            init_ckeditor('#template_content', false).then(editor => {
                notificationTemplateEditor = editor;
                
                // Configure editor to preserve variable format
                editor.model.schema.addAttributeCheck((context, attributeName) => {
                    // Allow all attributes to preserve {$variable} format
                    return true;
                });
                
                // Set content if editing (preserve variable format)
                if (templateData && templateData.template_content) {
                    let content = templateData.template_content;
                    // Ensure variables are in correct format
                    content = autoCorrectVariables(content);
                    editor.setData(content);
                }
                
                // Add real-time validation listener (optional - can show warnings)
                editor.model.document.on('change:data', () => {
                    const content = editor.getData();
                    const errors = validateTemplateVariables(content);
                    // Visual feedback can be added here if needed
                    if (errors.length > 0) {
                        console.warn('Variable format issues detected:', errors);
                    }
                });
                
                // Adjust variables list height dynamically after editor is ready
                adjustVariablesListHeight();
            }).catch(error => {
                console.error('Error initializing CKEditor:', error);
                ajs.showAlertBar('error', 'Failed to initialize editor', 1);
            });
        } else {
            // Editor already exists, just set content if editing
            if (templateData && templateData.template_content) {
                let content = templateData.template_content;
                // Ensure variables are in correct format
                content = autoCorrectVariables(content);
                notificationTemplateEditor.setData(content);
            } else {
                notificationTemplateEditor.setData('');
            }
            // Adjust variables list height
            adjustVariablesListHeight();
        }
    }, 300);
}

/**
 * Dynamically adjust variables list height based on available space
 */
function adjustVariablesListHeight() {
    const $modal = $('#notificationTemplateModal');
    const $variablesList = $('#variables-list');
    const $cardBody = $('#variables-card-body');
    
    if (!$variablesList.length || !$modal.hasClass('show')) {
        return;
    }
    
    // Use setTimeout to ensure modal is fully rendered
    setTimeout(function() {
        const windowHeight = $(window).height();
        const modalContent = $modal.find('.modal-content');
        const modalHeader = $modal.find('.modal-header').outerHeight() || 0;
        const modalFooter = $modal.find('.modal-footer').outerHeight() || 0;
        const card = $cardBody.closest('.card');
        const cardHeader = card.find('.card-header').outerHeight() || 0;
        const cardPadding = 16; // Top and bottom padding of card-body (p-2 = 0.5rem = 8px each)
        const cardNote = $cardBody.find('.border-top').outerHeight() || 0;
        const cardHeaderText = $cardBody.find('p.text-muted.small').first().outerHeight() || 0;
        
        // Get the actual modal body height
        const modalBody = $modal.find('.modal-body');
        const modalBodyHeight = modalBody.outerHeight() || windowHeight * 0.7;
        
        // Calculate available height more accurately
        // Use modal body height minus card header, padding, note, and header text
        const availableHeight = modalBodyHeight - cardHeader - (cardPadding * 2) - cardNote - cardHeaderText - 20; // 20px buffer
        
        // Set max-height dynamically
        const minHeight = 200;
        const maxHeight = Math.max(minHeight, Math.min(availableHeight, windowHeight * 0.5));
        
        $variablesList.css({
            'max-height': maxHeight + 'px',
            'min-height': minHeight + 'px'
        });
    }, 150);
    
    // Adjust on window resize
    $(window).off('resize.notificationTemplates').on('resize.notificationTemplates', function() {
        if ($modal.hasClass('show')) {
            adjustVariablesListHeight();
        }
    });
}

/**
 * Load template details for editing
 */
function loadTemplateDetails(eventCode, channel, templateId) {
    const clientId = $('#client_id').val();
    if (!clientId) {
        return;
    }
    
    const url = site_url + 'client/' + clientId + '/notification-templates/' + eventCode + '/' + channel;
    
    ajs.ajax_form(url, null, 'GET', null, '1', '0', 
        function(result_json) {
            if (ajs_form_handler.check_result(result_json)) {
                const template = result_json.data;
                if (template && template.client_template) {
                    openTemplateModal(eventCode, channel, template.client_template);
                } else {
                    ajs.showAlertBar('error', 'Template not found', 1);
                }
            } else {
                ajs.showAlertBar('error', 'Failed to load template details', 1);
            }
        },
        function(result_json) {
            ajs.showAlertBar('error', 'Error loading template details', 1);
        }
    );
}

/**
 * Validate variable format in template content
 */
function validateTemplateVariables(content) {
    // Check for common mistakes: {variable} without $, {{variable}}, $variable without braces
    const invalidPatterns = [
        /\{[^$][^}]*\}/g,  // {variable} without $
        /\{\{[^}]+\}\}/g,  // {{variable}}
        /\$[a-zA-Z_][a-zA-Z0-9_]*/g  // $variable without braces (but exclude {$variable})
    ];
    
    const errors = [];
    let match;
    
    // Check for {variable} without $
    const pattern1 = /\{[^$][a-zA-Z_][a-zA-Z0-9_]*\}/g;
    while ((match = pattern1.exec(content)) !== null) {
        if (!match[0].startsWith('{$')) {
            errors.push(`Invalid variable format: "${match[0]}" - Use "{$variable_name}" format`);
        }
    }
    
    // Check for {{variable}}
    const pattern2 = /\{\{[^}]+\}\}/g;
    while ((match = pattern2.exec(content)) !== null) {
        errors.push(`Invalid variable format: "${match[0]}" - Use "{$variable_name}" format`);
    }
    
    // Check for $variable without braces (but allow {$variable})
    const pattern3 = /(?<!\{)\$[a-zA-Z_][a-zA-Z0-9_]*(?!\})/g;
    while ((match = pattern3.exec(content)) !== null) {
        errors.push(`Invalid variable format: "${match[0]}" - Use "{$variable_name}" format`);
    }
    
    return errors;
}

/**
 * Auto-correct common variable format mistakes
 */
function autoCorrectVariables(content) {
    // Fix {variable} → {$variable}
    content = content.replace(/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g, '{$1}');
    
    // Fix {{variable}} → {$variable}
    content = content.replace(/\{\{([^}]+)\}\}/g, '{$1}');
    
    return content;
}

/**
 * Save template (create or update)
 */
function saveTemplate() {
    // Validate form
    const form = $('#notificationTemplateForm')[0];
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const clientId = $('#client_id').val();
    if (!clientId) {
        ajs.showAlertBar('error', 'Client ID not found', 1);
        return;
    }
    
    const eventCode = $('#template_event_code').val();
    const channel = $('#template_channel').val();
    const subjectTemplate = $('#subject_template').val().trim();
    
    // Get content from CKEditor
    let templateContent = '';
    if (notificationTemplateEditor) {
        templateContent = notificationTemplateEditor.getData();
    } else {
        templateContent = $('#template_content').val().trim();
    }
    
    if (!templateContent) {
        ajs.showAlertBar('error', 'Template content is required', 1);
        return;
    }
    
    // Auto-correct common variable format mistakes
    templateContent = autoCorrectVariables(templateContent);
    let correctedSubject = subjectTemplate;
    if (correctedSubject) {
        correctedSubject = autoCorrectVariables(correctedSubject);
    }
    
    // Validate variable format
    const contentErrors = validateTemplateVariables(templateContent);
    const subjectErrors = correctedSubject ? validateTemplateVariables(correctedSubject) : [];
    const allErrors = [...contentErrors, ...subjectErrors];
    
    if (allErrors.length > 0) {
        const errorMsg = 'Invalid variable format found:\n' + allErrors.slice(0, 3).join('\n') + (allErrors.length > 3 ? '\n...' : '');
        Swal.fire({
            title: 'Variable Format Error',
            html: errorMsg.replace(/\n/g, '<br>'),
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }
    
    // Update editor with corrected content if changes were made
    if (notificationTemplateEditor && templateContent !== notificationTemplateEditor.getData()) {
        notificationTemplateEditor.setData(templateContent);
    }
    if (correctedSubject !== subjectTemplate) {
        $('#subject_template').val(correctedSubject);
    }
    
    if (channel === 'email' && !correctedSubject) {
        ajs.showAlertBar('error', 'Subject template is required for email channel', 1);
        return;
    }
    
    const url = site_url + 'client/' + clientId + '/notification-templates';
    const postData = {
        event_code: eventCode,
        channel: channel,
        template_content: btoa(unescape(encodeURIComponent(templateContent))), // Base64 encode content
        subject_template: channel === 'email' ? correctedSubject : null
    };
    
    // Add template_id if editing
    const templateId = $('#template_id').val();
    if (templateId) {
        postData.template_id = templateId;
    }
    
    ajs.ajax_form(url, postData, 'POST', null, '1', '1', 
        function(result_json) {
            if (ajs_form_handler.check_result(result_json)) {
                ajs.showAlertBar('success', result_json.message || 'Template saved successfully', 1);
                $('#notificationTemplateModal').modal('hide');
                loadNotificationTemplates(); // Refresh the list
            } else {
                ajs_form_handler.show_errors(result_json);
            }
        },
        function(result_json) {
            ajs.showAlertBar('error', 'Error saving template', 1);
        }
    );
}

/**
 * Confirm delete template
 */
function confirmDeleteTemplate(templateId, eventCode, channel) {
    const eventLabel = EVENT_LABELS[eventCode] || eventCode;
    const channelLabel = CHANNEL_LABELS[channel] || channel;
    
    Swal.fire({
        title: 'Delete Template?',
        html: `Are you sure you want to delete the custom template for <strong>${eventLabel} - ${channelLabel}</strong>?<br><br>This action cannot be undone. The system will revert to using the default template.`,
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Yes, Delete',
        denyButtonText: 'Cancel',
        confirmButtonColor: '#d33'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteTemplate(templateId);
        }
    });
}

/**
 * Delete template via API with auto-fallback to POST
 */
function deleteTemplate(templateId) {
    const clientId = $('#client_id').val();
    if (!clientId) {
        ajs.showAlertBar('error', 'Client ID not found', 1);
        return;
    }
    
    const url = site_url + 'client/' + clientId + '/notification-templates/delete/' + templateId;
    
    // Success handler
    const successHandler = function(result_json) {
        if (ajs_form_handler.check_result(result_json)) {
            ajs.showAlertBar('success', result_json.message || 'Template deleted successfully', 1);
            loadNotificationTemplates(); // Refresh the list
        } else {
            const errorMsg = result_json && result_json.message ? result_json.message : 'Failed to delete template';
            ajs.showAlertBar('error', errorMsg, 1);
        }
    };
    
    // Error handler with fallback
    const errorHandler = function(result_json, xhr) {
        // If DELETE returns 405, try POST as fallback
        if (xhr && xhr.status === 405) {
            // Fallback to POST method
            ajs.ajax_form(url, {_method: 'DELETE'}, 'POST', null, '1', '1', successHandler, function(result_json) {
                handleDeleteError(result_json);
            });
            return;
        }
        
        // Handle other errors
        handleDeleteError(result_json);
    };
    
    // Try DELETE first (preferred method)
    $.ajax({
        url: url,
        method: 'DELETE',
        dataType: 'json',
        beforeSend: function(xhr) {
            // Set Authorization header with Bearer prefix
            var access_token = localStorage.getItem('access_token');
            if (access_token) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
            }
            // Also set other headers via ajs.set_auth_header
            ajs.set_auth_header(xhr);
            ajs.show_loader();
        },
        success: successHandler,
        error: function(xhr, status, error) {
            errorHandler(xhr.responseJSON, xhr);
        },
        complete: function() {
            ajs.hide_loader();
        }
    });
}

/**
 * Handle delete error responses
 */
function handleDeleteError(result_json) {
    let errorMsg = 'Error deleting template';
    if (result_json) {
        if (result_json.status === 404) {
            errorMsg = result_json.message || 'Template not found';
        } else if (result_json.status === 403) {
            errorMsg = result_json.message || 'You do not have permission to delete this template';
        } else if (result_json.status === 400) {
            errorMsg = result_json.message || 'Invalid parameters';
        } else if (result_json.status === 500) {
            errorMsg = 'Server error. Please try again later.';
        } else if (result_json.message) {
            errorMsg = result_json.message;
        } else if (result_json.errors && typeof result_json.errors === 'object') {
            const errorKeys = Object.keys(result_json.errors);
            if (errorKeys.length > 0) {
                errorMsg = result_json.errors[errorKeys[0]];
            }
        }
        
        if (result_json.errors && typeof result_json.errors === 'object' && Object.keys(result_json.errors).length > 0) {
            ajs_form_handler.show_errors(result_json);
        } else {
            ajs.showAlertBar('error', errorMsg, 1);
        }
    } else {
        ajs.showAlertBar('error', errorMsg, 1);
    }
}

// Initialize when document is ready
$(document).ready(function() {
    // Only initialize if we're on the appointments page
    if ($('#client_id').length && $('#notification-templates-table').length) {
        initNotificationTemplates();
    }
});

