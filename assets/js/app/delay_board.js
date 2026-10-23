/**
 * Delay / At-Risk board.
 *
 * Read-only. Every row links out to the existing job/task screen; nothing here
 * writes. The one interactive extra is the reassign shortlist, which is also
 * display-only — it names better-placed engineers and sends the user to the
 * task page to actually make the change.
 */

var delaySuggestionCache = {};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function delayEscape(value) {
    if (value === null || value === undefined) {
        return '';
    }
    return $('<div>').text(String(value)).html();
}

function delaySeverityBadge(severity) {
    var map = { high: 'danger', medium: 'warning', low: 'secondary' };
    return map[severity] || 'secondary';
}

// Page links use cdn_url (this app) and hashid-encoded ids, matching every
// other grid in the codebase - e.g. datatables/jobs/job.js. site_url is the
// API host and must only be used for AJAX; building a page link from it sends
// the user to dev-api.ajs.co.uk, which has no such route.
function delayRowLink(row) {
    // Engineer-scoped exceptions describe a whole day rather than one job, so
    // they open the engineer's diary instead of a task. The diary takes no
    // parameters, so it cannot be pre-filtered to this engineer.
    if (row.scope === 'engineer') {
        return cdn_url + 'job/engineers-diary';
    }
    // Deliberately the job page, not job/task-details: that route renders a
    // bare fragment with no header or footer, so it is not linkable. The job
    // page carries the task and is where the reassign action lives anyway.
    if (row.job_id) {
        return cdn_url + 'job/details/' + ajs.hash_encode(row.job_id);
    }
    return null;
}

// ─── Rendering ────────────────────────────────────────────────────────────────

function buildDelayRow(row) {
    var href = delayRowLink(row);
    var html = '';

    html += '<div class="exception-row py-2 px-3">';
    html += '<div class="d-flex align-items-start gap-2">';

    html += '<div class="flex-grow-1">';

    if (row.scope === 'engineer') {
        html += '<strong class="fs-13">' + delayEscape(row.engineer_name || 'Unassigned') + '</strong>';
        html += ' <span class="badge bg-light text-muted">' + delayEscape(row.task_count) + ' task(s)</span>';
    } else {
        html += '<strong class="fs-13">' + delayEscape(row.job_code || row.task_code || '') + '</strong>';
        if (row.service_title) {
            html += ' <span class="text-muted fs-12">' + delayEscape(row.service_title) + '</span>';
        }
        if (row.engineer_name) {
            html += '<div class="text-muted fs-12">' + delayEscape(row.engineer_name) + '</div>';
        }
        if (row.property_address) {
            html += '<div class="text-muted fs-12">' + delayEscape(row.property_address) + '</div>';
        }
    }

    html += '<div class="detail-line text-danger mt-1">' + delayEscape(row.detail) + '</div>';
    html += '</div>';

    html += '<div class="flex-shrink-0 text-end">';
    if (row.appointment_time) {
        html += '<div class="fs-12 text-muted">' + delayEscape(row.appointment_time) + '</div>';
    }
    if (href) {
        html += '<a href="' + href + '" class="btn btn-sm btn-light mt-1">Open <i class="las la-external-link-alt"></i></a>';
    }
    // Suggestions only make sense where there is a task to move.
    if (row.task_id && row.actionable) {
        html += '<button type="button" class="btn btn-sm btn-outline-secondary mt-1 ms-1 delay-suggest-btn" data-task-id="' + row.task_id + '">'
              + '<i class="las la-user-friends"></i> Who else?</button>';
    }
    html += '</div>';

    html += '</div>';
    html += '<div class="suggest-box mt-2 p-2 d-none" id="delay-suggest-' + (row.task_id || 'x') + '"></div>';
    html += '</div>';

    return html;
}

function buildDelayTabs(exceptions) {
    var navHtml = '';
    var paneHtml = '';

    if (!exceptions || exceptions.length === 0) {
        return {
            nav: '',
            pane: '<div class="text-center py-5 text-success">'
                + '<i class="las la-check-circle fs-24"></i>'
                + '<div class="mt-2 fw-semibold">Nothing at risk right now.</div>'
                + '<div class="text-muted fs-13">Every engineer is checked in and today\'s work is on track.</div>'
                + '</div>'
        };
    }

    exceptions.forEach(function (group, index) {
        var active = index === 0 ? ' active' : '';
        var paneId = 'delay-tab-' + group.code;

        navHtml += '<li class="nav-item">';
        navHtml += '<a class="nav-link fw-semibold' + active + '" data-bs-toggle="tab" href="#' + paneId + '" role="tab">';
        navHtml += delayEscape(group.label);
        navHtml += '<span class="badge bg-' + delaySeverityBadge(group.severity) + '">' + group.count + '</span>';
        navHtml += '</a></li>';

        paneHtml += '<div class="tab-pane' + (active ? ' active' : '') + '" id="' + paneId + '" role="tabpanel">';
        paneHtml += '<div class="card exception-card sev-' + delayEscape(group.severity) + '">';
        paneHtml += '<div class="card-body p-0">';
        paneHtml += '<div class="px-3 py-2 border-bottom text-muted fs-12">' + delayEscape(group.description) + '</div>';

        group.rows.forEach(function (row) {
            paneHtml += buildDelayRow(row);
        });

        paneHtml += '</div></div></div>';
    });

    return { nav: navHtml, pane: paneHtml };
}

// ─── Loading ──────────────────────────────────────────────────────────────────

function loadDelayBoard() {
    $('#delay-tab-content').html(
        '<div class="text-center py-5 text-muted"><i class="las la-spinner la-spin fs-22"></i>'
        + '<div class="mt-2">Checking today\'s work&hellip;</div></div>'
    );
    $('#delay-tabs-nav').empty();

    ajs.ajax_form(
        site_url + 'dashboard/delay-detail',
        null, 'GET', null, '0', '0',
        function (res) {
            if (!res || !res.status || !res.data) {
                $('#delay-tab-content').html('<p class="text-danger text-center py-5">Failed to load the board.</p>');
                return;
            }

            delaySuggestionCache = {};

            var built = buildDelayTabs(res.data.exceptions);
            $('#delay-tabs-nav').html(built.nav);
            $('#delay-tab-content').html(built.pane);
            $('.delay-generated-at').text('as at ' + (res.data.generated_at || ''));
        },
        function () {
            $('#delay-tab-content').html('<p class="text-danger text-center py-5">Error loading the board.</p>');
        }
    );
}

// ─── Reassign shortlist (display only) ────────────────────────────────────────

function renderSuggestions(data) {
    if (!data.suggestions || data.suggestions.length === 0) {
        return '<div class="text-muted fs-12">No better-placed engineer found &mdash; '
             + 'nobody else on this contract holds the required skills and is free today.</div>';
    }

    var html = '<div class="fs-12 fw-semibold mb-1">Better placed right now</div>';
    html += '<ul class="list-unstyled mb-1">';

    data.suggestions.forEach(function (s) {
        html += '<li class="mb-1">';
        html += '<strong class="fs-12">' + delayEscape(s.engineer_name) + '</strong>';
        html += ' <span class="text-muted fs-12">&mdash; ' + delayEscape(s.summary) + '</span>';
        html += '</li>';
    });

    html += '</ul>';
    // The board never writes; the change is made on the job screen. Built from
    // the same helper as the row links so there is one definition of where a
    // job lives.
    if (data.task && data.task.job_id) {
        html += '<a href="' + delayRowLink({ job_id: data.task.job_id }) + '" class="btn btn-sm btn-light">'
              + 'Open job to reassign <i class="las la-external-link-alt"></i></a>';
    }

    return html;
}

$(document).on('click', '.delay-suggest-btn', function () {
    var taskId = $(this).data('task-id');
    var $box   = $('#delay-suggest-' + taskId);

    if (!$box.hasClass('d-none')) {
        $box.addClass('d-none');
        return;
    }
    $box.removeClass('d-none');

    if (delaySuggestionCache[taskId]) {
        $box.html(renderSuggestions(delaySuggestionCache[taskId]));
        return;
    }

    $box.html('<span class="text-muted fs-12"><i class="las la-spinner la-spin"></i> Finding alternatives&hellip;</span>');

    ajs.ajax_form(
        site_url + 'dashboard/reassign-suggestions?task_id=' + taskId,
        null, 'GET', null, '0', '0',
        function (res) {
            if (res && res.status && res.data) {
                delaySuggestionCache[taskId] = res.data;
                $box.html(renderSuggestions(res.data));
            } else {
                $box.html('<span class="text-danger fs-12">Could not load alternatives.</span>');
            }
        },
        function () {
            $box.html('<span class="text-danger fs-12">Error loading alternatives.</span>');
        }
    );
});

$(document).on('click', '#delay-refresh-btn', function () {
    loadDelayBoard();
});

// The theme binds tooltips once at initial page load, part-way through a long
// chained expression in app-new.js that can be cut short on pages missing the
// elements it touches. dashboard.js re-binds for the same reason; do the same
// here rather than depend on that having run.
function initDelayTooltips() {
    if (typeof bootstrap === 'undefined' || !bootstrap.Tooltip) return;
    Array.prototype.forEach.call(
        document.querySelectorAll('.ajs-dash [data-bs-toggle="tooltip"]'),
        function (el) {
            if (!bootstrap.Tooltip.getInstance(el)) {
                new bootstrap.Tooltip(el);
            }
        }
    );
}

$(document).ready(function () {
    initDelayTooltips();

    if ($('#is_delay_board').val() === '1') {
        loadDelayBoard();
    }
});
