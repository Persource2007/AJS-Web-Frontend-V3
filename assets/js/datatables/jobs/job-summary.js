var JobSummary = (function () {

    function esc(v) {
        if (v === null || v === undefined) return '';
        return String(v).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function pick(obj, keys, fallback) {
        for (var i = 0; i < keys.length; i++) {
            var v = obj ? obj[keys[i]] : null;
            if (v !== null && v !== undefined && v !== '') return v;
        }
        return fallback !== undefined ? fallback : '-';
    }

    function fmtDate(v) {
        if (!v) return '-';
        return (typeof ajs !== 'undefined' && ajs.format_date) ? ajs.format_date(v) : v;
    }

    function fmtDateTime(v) {
        if (!v) return '-';
        return (typeof ajs !== 'undefined' && ajs.format_datetime) ? ajs.format_datetime(v) : v;
    }

    function money(v) {
        var n = parseFloat(v);
        return '&pound;' + (isNaN(n) ? '0.00' : n.toFixed(2));
    }

    function statusLabel(v) {
        return v ? esc(v) : 'Open';
    }

    function fileNameFromUrl(url) {
        if (!url) return '';
        var clean = String(url).split('?')[0].split('#')[0];
        var parts = clean.split('/');
        var name = parts[parts.length - 1] || '';
        try { name = decodeURIComponent(name); } catch (e) {}
        return name;
    }

    function todayDMY() {
        var d = new Date();
        var dd = String(d.getDate()).padStart(2, '0');
        var mm = String(d.getMonth() + 1).padStart(2, '0');
        return dd + '/' + mm + '/' + d.getFullYear();
    }

    function renderHeader(job) {
        return '<div class="js-header">' +
            '<div class="js-logo">' +
            '<img src="' + cdn_url + 'assets/images/AJS-logo-blue.png" alt="AJS">' +
            '</div>' +
            '<div class="js-title-block">' +
            '<div class="js-title">JOB SHEET</div>' +
            '<div class="js-meta">Job No: <b>' + esc(job.code) + '</b></div>' +
            '<div class="js-meta">Generated: ' + todayDMY() + '</div>' +
            '</div>' +
            '</div>' +
            '<div class="js-doc-title">AJS Ltd - Job Sheet - ' + esc(job.code) + '</div>';
    }

    function renderJobDetails(job) {
        var address = [job.address1, job.address2].filter(Boolean).join(', ');
        var rows = [
            ['AJS Job No', esc(job.code)],
            ['Client Order No', esc(pick(job, ['client_work_order']))],
            ['Property Id', esc(pick(job, ['uprn_no', 'property_id']))],
            ['Contract', esc(pick(job, ['contract_number']))],
            ['Job Type', esc(pick(job, ['service_name']))],
            ['Recorded Date', fmtDate(job.add_date)],
            ['Target Date', fmtDate(job.target_date)],
            ['Address', esc(address || '-')],
            ['Post Code', esc(pick(job, ['postalcode']))]
        ];
        return boxHtml('JOB DETAILS', rows);
    }

    function renderCompletionDetails(job) {
        var lastCompleted = null;
        (job.job_tasks || []).forEach(function (t) {
            if (t.completed_date && (!lastCompleted || t.completed_date > lastCompleted)) {
                lastCompleted = t.completed_date;
            }
        });
        var clearedToInv = (job.financial_status == '3' || job.financial_status == '4') ? 'Y' : 'N';
        var rows = [
            ['1st Status', statusLabel(job.status)],
            ['Date Complete', fmtDate(lastCompleted)],
            ['Cleared to Inv', clearedToInv],
            ['Problem Detail', esc(job.description || '-')]
        ];
        return boxHtml('COMPLETION DETAILS', rows);
    }

    function boxHtml(title, rows) {
        var body = rows.map(function (r) {
            return '<tr><td>' + esc(r[0]) + '</td><td>' + r[1] + '</td></tr>';
        }).join('');
        return '<div class="js-box">' +
            '<div class="js-box-header js-navy">' + title + '</div>' +
            '<div class="js-box-body"><table>' + body + '</table></div>' +
            '</div>';
    }

    function renderTotalBar(job) {
        return '<div class="js-total-bar js-navy">' +
            'JOB TOTAL: ' + money(pick(job, ['total_sells'], 0)) +
            '</div>';
    }

    function groupKey(record) {
        return record.task_code || 'general';
    }

    function renderVisit(task, index, sorsByTask, certsByTask, filesByTask) {
        var key = task.task_code || 'general';
        var sors = sorsByTask[key] || [];
        var certs = certsByTask[key] || [];
        var files = filesByTask[key] || [];

        var left = [
            ['Logged On', fmtDate(task.add_date)],
            ['Action Required', esc(pick(task, ['task_name', 'action']))],
            ['Target Date', fmtDate(pick(task, ['target_date', 'preferred_date'], null))],
            ['Designation Type', esc(pick(task, ['skill_name', 'task_type']))],
            ['Attend On', fmtDate(pick(task, ['appointment_date', 'arrived_date'], null))],
            ['Problem Summary', esc(pick(task, ['service_name', 'task_name']))]
        ];
        var right = [
            ['Result Summary', esc(pick(task, ['task_status']))],
            ['Detail', esc(pick(task, ['task_description', 'summary']))],
            ['Arrived Date', fmtDate(pick(task, ['arrived_date', 'started_date'], null))],
            ['Finished Date', fmtDate(task.completed_date)],
            ['Current Status', esc(pick(task, ['task_status']))]
        ];

        var leftHtml = left.map(function (r) { return '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td></tr>'; }).join('');
        var rightHtml = right.map(function (r) { return '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td></tr>'; }).join('');

        var itemsHtml = '';
        var visitTotal = 0;
        if (sors.length) {
            var itemRows = sors.map(function (s, i) {
                var qty = parseFloat(s.quantity) || 0;
                var price = parseFloat(s.sell_price) || 0;
                var total = qty * price;
                visitTotal += total;
                return '<tr>' +
                    '<td>' + (i + 1) + '</td>' +
                    '<td>' + esc(s.sor_code) + '</td>' +
                    '<td>' + esc(s.title || s.description) + '</td>' +
                    '<td class="js-num">' + qty.toFixed(2) + '</td>' +
                    '<td class="js-num">' + money(price) + '</td>' +
                    '<td class="js-num">' + money(total) + '</td>' +
                    '</tr>';
            }).join('');
            itemsHtml = '<table class="js-table">' +
                '<thead><tr><th>Item</th><th>Stock Code</th><th>Description</th><th class="js-num">Org/Qty</th><th class="js-num">Price</th><th class="js-num">Total</th></tr></thead>' +
                '<tbody>' + itemRows +
                '<tr class="js-total-row"><td colspan="4"></td><td class="js-total-label">Visit Total</td><td class="js-num">' + money(visitTotal) + '</td></tr>' +
                '</tbody></table>';
        }

        var docRows = '';
        certs.forEach(function (c) {
            var certName = fileNameFromUrl(c.pdf_url) || (esc(c.certificate_code || 'certificate') + '.pdf');
            var certDoc = c.pdf_url ? '<a href="' + esc(c.pdf_url) + '" target="_blank">' + esc(certName) + '</a>' : esc(certName);
            docRows += '<tr>' +
                '<td>' + certDoc + '</td>' +
                '<td>Certificate</td>' +
                '<td>' + esc(c.title || c.certificate_code || '-') + '</td>' +
                '</tr>';
        });
        files.forEach(function (f) {
            var fileName = fileNameFromUrl(f.file_path) || '-';
            var isImage = f.file_type == 'image';
            var docCell, descCell;
            if (isImage && f.file_path) {
                docCell = '<a href="' + esc(f.file_path) + '" target="_blank"><img class="js-doc-thumb" src="' + esc(f.file_path) + '" alt="' + esc(fileName) + '"></a>';
                descCell = esc((f.caption ? f.caption + ' - ' : '') + fileName);
            } else {
                docCell = esc(fileName);
                descCell = esc(f.caption || '-');
            }
            docRows += '<tr>' +
                '<td>' + docCell + '</td>' +
                '<td>' + (isImage ? 'Photo' : esc(f.file_type || 'File')) + '</td>' +
                '<td>' + descCell + '</td>' +
                '</tr>';
        });
        var docHtml = docRows ? '<table class="js-doc-table">' +
            '<thead><tr><th>Document</th><th>Type</th><th>Description</th></tr></thead>' +
            '<tbody>' + docRows + '</tbody></table>' : '';

        return '<div class="js-visit-block">' +
            '<div class="js-visit-header js-navy"><span>' + esc(pick(task, ['task_name'], 'VISIT ' + (index + 1))) + '</span>' +
            '<span class="js-badge">' + statusLabel(task.task_status) + '</span></div>' +
            '<div class="js-visit-fields"><div><table>' + leftHtml + '</table></div><div><table>' + rightHtml + '</table></div></div>' +
            itemsHtml +
            docHtml +
            '</div>';
    }

    function render(job, container) {
        var sorsByTask = {}, certsByTask = {}, filesByTask = {};
        (job.sors || []).forEach(function (s) {
            var k = groupKey(s);
            (sorsByTask[k] = sorsByTask[k] || []).push(s);
        });
        (job.certificates || []).forEach(function (c) {
            var k = groupKey(c);
            (certsByTask[k] = certsByTask[k] || []).push(c);
        });
        (job.files || []).forEach(function (f) {
            var k = groupKey(f);
            (filesByTask[k] = filesByTask[k] || []).push(f);
        });

        var html = renderHeader(job) +
            '<div class="js-columns">' + renderJobDetails(job) + renderCompletionDetails(job) + '</div>' +
            renderTotalBar(job) +
            '<div class="js-section-title js-navy">JOB VISITS</div>';

        var tasks = job.job_tasks || [];
        if (!tasks.length) {
            html += '<div class="js-empty">No visits recorded for this job.</div>';
        } else {
            tasks.forEach(function (task, i) {
                html += renderVisit(task, i, sorsByTask, certsByTask, filesByTask);
            });
        }

        $(container).html('<div class="job-summary-wrap">' + html + '</div>');
    }

    function load(jobId, container, onLoaded) {
        ajs.ajax_form(site_url + "job/get/" + jobId, null, "GET", null, "1", "1", function (response) {
            if (response.status && response.data) {
                render(response.data, container);
                if (typeof onLoaded === 'function') onLoaded(response.data);
            } else {
                $(container).html('<div class="js-empty">Unable to load job summary.</div>');
            }
        }, function () {
            $(container).html('<div class="js-empty">Unable to load job summary.</div>');
        });
    }

    return {
        load: load,
        render: render
    };
})();
