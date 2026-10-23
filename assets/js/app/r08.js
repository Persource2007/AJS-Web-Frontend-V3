// ─── R08 — Property Condition, Health & Safety, Damp/Mould, Hazards (Monthly) ──
// Mirrors r04.js structure: collapsible contract cards, drilldown per submission.
// ──────────────────────────────────────────────────────────────────────────────

var r08Data = null;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function r08ComplianceBadge(pct) {
    if (pct === null || pct === undefined) {
        return '<span class="badge bg-light text-muted border">N/A</span>';
    }
    var cls = pct >= 100 ? 'bg-success' : pct >= 75 ? 'bg-warning text-dark' : 'bg-danger';
    return '<span class="badge ' + cls + '">' + pct + '%</span>';
}

function r08ComplianceBar(pct) {
    if (pct === null || pct === undefined) {
        return '<span class="text-muted fs-12">No data</span>';
    }
    var barCls = pct >= 100 ? 'bg-success' : pct >= 75 ? 'bg-warning' : 'bg-danger';
    return '<div class="progress" style="height:14px;border-radius:4px;">'
        + '<div class="progress-bar ' + barCls + '" role="progressbar" style="width:' + pct + '%;font-size:11px;line-height:14px;" aria-valuenow="' + pct + '" aria-valuemin="0" aria-valuemax="100">'
        + (pct >= 15 ? pct + '%' : '')
        + '</div></div>';
}

function r08FormatDate(dt) {
    if (!dt) return '—';
    var d = new Date(dt.replace(' ', 'T'));
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        + ' ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

// ─── Drilldown: checklist question rows for one submission ────────────────────

function r08QuestionsTable(questions) {
    if (!questions || questions.length === 0) {
        return '<p class="text-muted p-3 mb-0 fs-13">No question data available for this submission.</p>';
    }

    var html = '<div class="table-responsive">'
        + '<table class="table table-sm table-hover mb-0 fs-12">'
        + '<thead class="table-light"><tr>'
        + '<th>#</th>'
        + '<th>Question</th>'
        + '<th>Expected Answer</th>'
        + '<th>Submitted Answer</th>'
        + '<th>Compliant</th>'
        + '</tr></thead><tbody>';

    questions.forEach(function (q, i) {
        var complianceCls = '';
        var complianceBadge = '';

        if (!q.answered) {
            complianceBadge = '<span class="badge bg-light text-muted border">Not answered</span>';
            complianceCls   = '';
        } else if (q.expected_answer_id === 0) {
            complianceBadge = '<span class="badge bg-light text-muted border">N/A</span>';
        } else if (q.is_compliant) {
            complianceBadge = '<span class="badge bg-success-subtle text-success"><i class="ri-check-line me-1"></i>Yes</span>';
            complianceCls   = 'table-success';
        } else {
            complianceBadge = '<span class="badge bg-danger-subtle text-danger"><i class="ri-close-line me-1"></i>No</span>';
            complianceCls   = 'table-danger';
        }

        html += '<tr class="' + complianceCls + '">';
        html += '<td class="text-muted">' + (i + 1) + '</td>';
        html += '<td>' + (q.question_title || '—') + '</td>';
        html += '<td class="text-muted">' + (q.expected_answer_title || '—') + '</td>';
        html += '<td><strong>' + (q.submitted_answer || '—') + '</strong></td>';
        html += '<td>' + complianceBadge + '</td>';
        html += '</tr>';
    });

    html += '</tbody></table></div>';
    return html;
}

// ─── Submissions list for one contract ───────────────────────────────────────

function r08SubmissionsSection(submissions, contractIdx) {
    if (!submissions || submissions.length === 0) {
        return '<p class="text-muted p-3 mb-0 fs-13">No checklist submissions for this contract in the selected period.</p>';
    }

    var html = '';

    submissions.forEach(function (sub, si) {
        var drillId  = 'r08-qdrill-' + contractIdx + '-' + si;
        var pct      = sub.compliance_pct;

        html += '<div class="border-top px-3 py-2">';
        html += '<div class="d-flex align-items-center justify-content-between flex-wrap gap-2">';

        html += '<div class="d-flex align-items-center gap-3 fs-12">';
        html += '<strong>' + (sub.job_code || '—') + '</strong>';
        html += '<span class="text-muted">' + r08FormatDate(sub.submitted_at) + '</span>';
        html += '<span class="text-muted">by <em>' + (sub.submitted_by || '—') + '</em></span>';
        html += '</div>';

        html += '<div class="d-flex align-items-center gap-2 fs-12">';
        if (pct !== null && pct !== undefined) {
            html += '<span>' + sub.compliant_count + '/' + sub.total_expected + ' compliant</span>';
            html += r08ComplianceBadge(pct);
        } else {
            html += '<span class="badge bg-light text-muted border">No expected answers set</span>';
        }
        html += '</div>';

        html += '</div>';

        // Toggle for question drilldown
        html += '<div class="mt-1">';
        html += '<a class="fs-12 text-muted text-decoration-none" style="cursor:pointer;" '
            + 'data-bs-toggle="collapse" data-bs-target="#' + drillId + '">'
            + '<i class="las la-angle-down me-1 r08-q-chevron-' + contractIdx + '-' + si + '"></i>'
            + 'View ' + (sub.questions ? sub.questions.length : 0) + ' checklist question' + (sub.questions && sub.questions.length !== 1 ? 's' : '')
            + '</a>';
        html += '</div>';

        html += '<div id="' + drillId + '" class="collapse mt-2">';
        html += r08QuestionsTable(sub.questions);
        html += '</div>';

        html += '</div>';
    });

    return html;
}

// ─── Main render ─────────────────────────────────────────────────────────────

function renderR08(data) {
    if (!data || data.length === 0) {
        $('#r08-results').html(
            '<div class="card"><div class="card-body text-center py-5 text-muted">'
            + '<i class="las la-info-circle fs-24 d-block mb-2"></i>'
            + 'No checklist submission data found for the selected period and filters.'
            + '</div></div>'
        );
        return;
    }

    var html = '';

    data.forEach(function (contract, idx) {
        var headerId  = 'r08-con-head-' + idx;
        var bodyId    = 'r08-con-body-' + idx;
        var pct       = contract.avg_compliance;
        var pctCls    = pct === null ? 'bg-secondary' : (pct >= 100 ? 'bg-success' : pct >= 75 ? 'bg-warning text-dark' : 'bg-danger');
        var pctLabel  = pct !== null ? pct + '%' : 'N/A';

        html += '<div class="card mb-2">';

        html += '<div class="card-header py-2 px-3" id="' + headerId + '" style="cursor:pointer;" '
            + 'data-bs-toggle="collapse" data-bs-target="#' + bodyId + '">';
        html += '<div class="d-flex align-items-center justify-content-between">';
        html += '<div class="d-flex align-items-center gap-3">';
        html += '<i class="las la-chevron-down r08-con-chevron text-muted fs-13"></i>';
        html += '<strong class="fs-13">' + contract.contract_number + '</strong>';
        html += '<span class="text-muted fs-12">' + contract.client_name + '</span>';
        html += '</div>';
        html += '<div class="d-flex gap-3 fs-12 align-items-center">';
        html += '<span>Submissions: <strong class="text-primary">' + contract.total_submissions + '</strong></span>';
        html += '<span>Fully Compliant: <strong class="text-success">' + contract.total_compliant + '</strong></span>';
        html += '<span>Avg Compliance: <span class="badge ' + pctCls + '">' + pctLabel + '</span></span>';
        html += '</div>';
        html += '</div>';
        html += '</div>';

        // ── Collapsible body ──
        html += '<div id="' + bodyId + '" class="collapse show">';

        // Compliance overview bar
        if (pct !== null) {
            html += '<div class="px-3 pt-3 pb-2">';
            html += '<p class="text-muted fs-11 fw-semibold text-uppercase letter-spacing mb-2">Average Compliance</p>';
            html += '<div style="max-width:500px;">' + r08ComplianceBar(pct) + '</div>';
            html += '</div>';
        }

        html += r08SubmissionsSection(contract.submissions, idx);

        html += '</div>';  // /collapse body
        html += '</div>';  // /card
    });

    $('#r08-results').html(html);

    // ── Chevron toggles ──
    $(document).off('show.bs.collapse.r08 hide.bs.collapse.r08')
        .on('show.bs.collapse.r08', '[id^="r08-con-body-"]', function () {
            $(this).closest('.card').find('.r08-con-chevron')
                .removeClass('la-chevron-right').addClass('la-chevron-down');
        })
        .on('hide.bs.collapse.r08', '[id^="r08-con-body-"]', function () {
            $(this).closest('.card').find('.r08-con-chevron')
                .removeClass('la-chevron-down').addClass('la-chevron-right');
        })
        .on('show.bs.collapse.r08', '[id^="r08-qdrill-"]', function () {
            var parts = this.id.replace('r08-qdrill-', '').split('-');
            $('.r08-q-chevron-' + parts[0] + '-' + parts[1])
                .removeClass('la-angle-down').addClass('la-angle-up');
        })
        .on('hide.bs.collapse.r08', '[id^="r08-qdrill-"]', function () {
            var parts = this.id.replace('r08-qdrill-', '').split('-');
            $('.r08-q-chevron-' + parts[0] + '-' + parts[1])
                .removeClass('la-angle-up').addClass('la-angle-down');
        });
}

// ─── Load data ────────────────────────────────────────────────────────────────

function loadR08Data() {
    add_autocomplete_sel("#r08-client", "clients", ["client_code"], null, null);
    var month       = $('#r08-month').val();
    var client_id   = $('#r08-client').val();
    var contract_id = $('#r08-contract').val();

    if (!month) {
        Swal.fire({ icon: 'warning', title: 'Select a month', text: 'Please select a month before generating the report.', confirmButtonText: 'OK' });
        return;
    }

    $('#r08-results').html('<div class="text-center py-5 text-muted"><i class="las la-spinner la-spin me-1"></i> Loading…</div>');
    $('#r08-summary-bar').hide();
    $('#r08-export-btn').hide();

    var url = site_url + 'report/r08?month=' + month;
    if (client_id)   url += '&client_id='   + client_id;
    if (contract_id) url += '&contract_id=' + contract_id;

    ajs.ajax_form(
        url, null, 'GET', null, '1', '1',
        function (res) {
            if (res && res.status) {
                r08Data = res.data;

                $('.r08-period').text(res.period || month);
                $('.r08-contract-count').text(res.data.length);
                $('.r08-total-submissions').text(res.total_submissions);
                $('.r08-total-compliant').text(res.total_compliant);
                $('#r08-summary-bar').show();
                $('#r08-export-btn').show();

                renderR08(res.data);
            } else {
                $('#r08-results').html('<div class="alert alert-danger m-3">Failed to load report data. Please try again.</div>');
            }
        },
        function () {
            $('#r08-results').html('<div class="alert alert-danger m-3">Error loading report data. Please check your connection.</div>');
        }
    );
}

// ─── Export ───────────────────────────────────────────────────────────────────

function exportR08() {
    var month       = $('#r08-month').val();
    var client_id   = $('#r08-client').val();
    var contract_id = $('#r08-contract').val();

    if (!month) {
        Swal.fire({ icon: 'warning', title: 'Select a month', text: 'Please select a month before exporting.', confirmButtonText: 'OK' });
        return;
    }

    var url = site_url + 'report/r08_export?month=' + encodeURIComponent(month);
    if (client_id)   url += '&client_id='   + encodeURIComponent(client_id);
    if (contract_id) url += '&contract_id=' + encodeURIComponent(contract_id);

    var token      = localStorage.getItem('access_token') || '';
    var appVersion = localStorage.getItem('app_version')  || '';
    var appPlatform= localStorage.getItem('app_platform') || 'web';

    $('#r08-export-btn').prop('disabled', true).html('<i class="las la-spinner la-spin me-1"></i> Exporting…');

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': token,
            'App-Version':   appVersion,
            'App-Platform':  appPlatform
        }
    })
        .then(function (response) {
            if (!response.ok) {
                return response.text().then(function (txt) { throw new Error(txt || response.statusText); });
            }
            return response.blob();
        })
        .then(function (blob) {
            var filename = 'R08_PropertyCondition_' + month + '.csv';
            var a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(a.href);
        })
        .catch(function (err) {
            Swal.fire({ icon: 'error', title: 'Export Failed', text: 'Could not export the report. Please try again.' });
            console.error('R08 export error:', err);
        })
        .finally(function () {
            $('#r08-export-btn').prop('disabled', false).html('<i class="las la-file-excel me-1"></i> Export CSV');
        });
}

// ─── Init ─────────────────────────────────────────────────────────────────────

$(function () {
    if ($('#is_r08').val() !== '1') return;

    set_breadcrumb([
        { label: 'Reports', url: site_url + 'reports/list' },
        { label: 'R08 — Property Condition & H&S', url: null }
    ]);

    var now  = new Date();
    var yyyy = now.getFullYear();
    var mm   = String(now.getMonth() + 1).padStart(2, '0');
    $('#r08-month').val(yyyy + '-' + mm);

    $('#r08-generate-btn').on('click', loadR08Data);
    $('#r08-export-btn').on('click', exportR08);

    loadR08Data();
});
