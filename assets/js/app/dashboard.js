function getChartColorsArray(e) {
	if (null !== document.getElementById(e)) return e = document.getElementById(e).getAttribute("data-colors"), (e = JSON.parse(e)).map(function(e) {
		var t = e.replace(" ", "");
		return -1 === t.indexOf(",") ? getComputedStyle(document.documentElement).getPropertyValue(t) || t : 2 == (e = e.split(",")).length ? "rgba(" + getComputedStyle(document.documentElement).getPropertyValue(e[0]) + "," + e[1] + ")" : t
	})
}

// ─── Config ───────────────────────────────────────────────────────────────────

// Contract KPI targets. K01 has no contractual target, so it is reported but
// excluded from the "Overall performance" score.
var KPI_TARGETS = { k03a: 95, k03b: 95, k04: 99, k06: 99 };

var dashCharts = {};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function esc(str) {
    if (str === null || typeof str === 'undefined') return '';
    return String(str).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
}

function toInt(val) {
    var n = parseInt(val, 10);
    return isNaN(n) ? 0 : n;
}

// Reads a theme token so charts follow light/dark mode instead of hardcoding.
function themeColor(token, fallback) {
    var val = getComputedStyle(document.documentElement).getPropertyValue(token);
    return (val && val.trim()) ? val.trim() : fallback;
}

// Feeds the theme's counter animation. Resets the text first so a refresh
// re-animates instead of choking on the comma-formatted previous value.
function setCount(selector, val) {
    var n = toInt(val);
    $(selector).attr('data-target', n).text('0');
    return n;
}

// The theme binds tooltips once at initial page load, but this view can be
// rendered after that has run - so bind any that are still uninitialised.
function initDashTooltips() {
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

function renderChart(id, options) {
    var el = document.querySelector('#' + id);
    if (!el) return;
    if (dashCharts[id]) {
        try { dashCharts[id].destroy(); } catch (e) { /* already gone */ }
    }
    dashCharts[id] = new ApexCharts(el, options);
    dashCharts[id].render();
}

// Gradient radial gauge used for the five contract KPIs.
// The centre figure is HTML overlaid on the ring, not an Apex data label -
// Apex suppresses its own centre labels in sparkline mode.
function gaugeOptions(chartId, pct) {
    var value = Math.max(0, Math.min(100, Math.round(pct)));
    return {
        series: [value],
        chart: { height: 165, type: 'radialBar', sparkline: { enabled: true } },
        plotOptions: {
            radialBar: {
                hollow: { size: '62%' },
                track: { background: themeColor('--vz-light', '#eff2f7'), strokeWidth: '100%', margin: 4 },
                dataLabels: { show: false }
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: 'diagonal2',
                shadeIntensity: .45,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            }
        },
        stroke: { lineCap: 'round' },
        colors: getChartColorsArray(chartId)
    };
}

// Marks a KPI chip as on target / below target / not measurable.
// Returns 'pass', 'fail', or 'nodata' (no records in the period, which is not
// the same as failing - see setOverallPerformance).
function setKpiChip(key, pct, total) {
    var target = KPI_TARGETS[key];
    var $chip = $('.kpi-chip[data-kpi="' + key + '"]');
    if (typeof target === 'undefined') return null;

    var status = total > 0 ? (pct >= target ? 'pass' : 'fail') : 'nodata';
    if (!$chip.length) return status;

    var style = {
        pass:   { cls: 'bg-success-subtle text-success', icon: 'ri-arrow-up-line',      text: 'Target ' + target + '%' },
        fail:   { cls: 'bg-danger-subtle text-danger',   icon: 'ri-arrow-down-line',    text: 'Target ' + target + '%' },
        nodata: { cls: 'bg-light text-muted',            icon: 'ri-subtract-line',      text: 'No data this period' }
    }[status];

    $chip.removeClass('bg-light bg-success-subtle text-success bg-danger-subtle text-danger text-body text-muted')
         .addClass(style.cls)
         .html('<i class="' + style.icon + ' align-middle me-1"></i>' + style.text);
    return status;
}

// ─── Main dashboard payload ───────────────────────────────────────────────────

function setJobCountAndChart(data) {
    // Job state counts (tiles + pipeline share these classes)
    var awaitingAppointment = setCount('.appointment-count', data.job_awaiting_appointment_count);
    var awaitingReview      = setCount('.review-count', data.job_awaiting_review_count);
    var pendingInvoice      = setCount('.invoice-count', data.job_pending_invoice_count);

    var completedToday  = setCount('.today-count', data.job_completed_today);
    var completed7Days  = setCount('.last-7days-count', data.job_completed_last_7_days);
    var completed30Days = setCount('.last-30days-count', data.job_completed_last_30_days);

    var loggedToday  = setCount('.logged-today-count', data.job_logged_today);
    var logged7Days  = setCount('.logged-last-7days-count', data.job_logged_last_7_days);
    var logged30Days = setCount('.logged-last-30days-count', data.job_logged_last_30_days);

    // ── Pipeline stage bar ────────────────────────────────────────────────────
    var openTotal = awaitingAppointment + awaitingReview + pendingInvoice;
    $('.open-total').text(openTotal);

    function segWidth(part) {
        return openTotal > 0 ? ((part / openTotal) * 100) + '%' : '0%';
    }
    $('#seg-appointment').css('width', segWidth(awaitingAppointment));
    $('#seg-review').css('width', segWidth(awaitingReview));
    $('#seg-invoice').css('width', segWidth(pendingInvoice));

    // Explanatory tooltip lives on the wrapping span in the view.
    $('.completion-rate').text(logged30Days > 0 ? Math.round((completed30Days / logged30Days) * 100) + '%' : '--');

    // ── Logged vs completed ───────────────────────────────────────────────────
    var openToday  = Math.max(0, loggedToday - completedToday);
    var open7Days  = Math.max(0, logged7Days - completed7Days);
    var open30Days = Math.max(0, logged30Days - completed30Days);

    $('.open-today').text(openToday);
    $('.open-7days').text(open7Days);
    $('.open-30days').text(open30Days);

    var axisColor = themeColor('--vz-secondary-color', '#878a99');
    renderChart('logged_completed_chart', {
        series: [
            { name: 'Logged',    data: [loggedToday, logged7Days, logged30Days] },
            { name: 'Completed', data: [completedToday, completed7Days, completed30Days] }
        ],
        chart: { type: 'bar', height: 250, toolbar: { show: false }, parentHeightOffset: 0 },
        plotOptions: { bar: { horizontal: false, columnWidth: '38%', borderRadius: 6, borderRadiusApplication: 'end' } },
        dataLabels: { enabled: false },
        stroke: { show: true, width: 3, colors: ['transparent'] },
        xaxis: {
            categories: ['Today', 'Last 7 days', 'Last 30 days'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { style: { colors: axisColor, fontSize: '12px' } }
        },
        yaxis: { labels: { style: { colors: axisColor, fontSize: '12px' } } },
        fill: {
            type: 'gradient',
            gradient: { shade: 'light', type: 'vertical', shadeIntensity: .25, opacityFrom: 1, opacityTo: .85, stops: [0, 100] }
        },
        legend: { position: 'top', horizontalAlign: 'right', markers: { radius: 12 }, labels: { colors: axisColor } },
        grid: { borderColor: themeColor('--vz-border-color', '#e9ebec'), strokeDashArray: 4, xaxis: { lines: { show: false } } },
        noData: { text: 'Data not available!' },
        colors: getChartColorsArray('logged_completed_chart')
    });

    // ── K01 — First Time Fix ──────────────────────────────────────────────────
    var k01_pct = parseFloat(data.k01_first_time_fix_percentage) || 0;
    $('.k01-period').text(data.k01_period || '');
    $('.dash-period').text(data.k01_period || '--');
    var k01_total = toInt(data.k01_total_completed);
    $('.k01-fix-count').text(toInt(data.k01_first_time_fix_count));
    $('.k01-total-count').text(k01_total);
    $('.k01-percentage').text(k01_total > 0 ? Math.round(k01_pct) + '%' : '--');
    renderChart('k01_chart', gaugeOptions('k01_chart', k01_pct));

    // ── K03a — Attended Within Target ─────────────────────────────────────────
    var k03a_pct = parseFloat(data.k03a_percentage) || 0;
    $('.k03a-period').text(data.k03a_period || '');
    var k03a_total = toInt(data.k03a_total);
    $('.k03a-pass-count').text(toInt(data.k03a_attended_count));
    $('.k03a-total-count').text(k03a_total);
    $('.k03a-percentage').text(k03a_total > 0 ? Math.round(k03a_pct) + '%' : '--');
    renderChart('k03a_chart', gaugeOptions('k03a_chart', k03a_pct));

    // ── K03b — Completed Within Target (task-level) ───────────────────────────
    var k03b_pct = parseFloat(data.k03b_percentage) || 0;
    $('.k03b-period').text(data.k03b_period || '');
    var k03b_total = toInt(data.k03b_total_tasks);
    $('.k03b-pass-count').text(toInt(data.k03b_completed_count));
    $('.k03b-total-count').text(k03b_total);
    $('.k03b-percentage').text(k03b_total > 0 ? Math.round(k03b_pct) + '%' : '--');
    renderChart('k03b_chart', gaugeOptions('k03b_chart', k03b_pct));

    // ── K04 — Appointments Kept ───────────────────────────────────────────────
    var k04_pct = parseFloat(data.k04_percentage) || 0;
    $('.k04-period').text(data.k04_period || '');
    var k04_total = toInt(data.k04_total_appointments);
    $('.k04-kept-count').text(toInt(data.k04_kept_count));
    $('.k04-total-count').text(k04_total);
    $('.k04-percentage').text(k04_total > 0 ? Math.round(k04_pct) + '%' : '--');
    renderChart('k04_chart', gaugeOptions('k04_chart', k04_pct));

    // ── K06 — Rectifications within 2 working days ────────────────────────────
    var k06_pct = parseFloat(data.k06_percentage) || 0;
    $('.k06-period').text(data.k06_period || '');
    var k06_total = toInt(data.k06_total_rectifications);
    $('.k06-on-time-count').text(toInt(data.k06_completed_on_time));
    $('.k06-total-count').text(k06_total);
    $('.k06-percentage').text(k06_total > 0 ? Math.round(k06_pct) + '%' : '--');
    renderChart('k06_chart', gaugeOptions('k06_chart', k06_pct));

    setOverallPerformance({
        k03a: { pct: k03a_pct, total: k03a_total },
        k03b: { pct: k03b_pct, total: k03b_total },
        k04:  { pct: k04_pct,  total: k04_total  },
        k06:  { pct: k06_pct,  total: k06_total  }
    });
}

// ─── Overall performance (derived from the KPIs vs their targets) ─────────────

// `values` is keyed by KPI: { pct: Number, total: Number }.
// A KPI with a zero denominator has nothing to measure, so it is reported
// separately as "no data" rather than being scored as a failure.
function setOverallPerformance(values) {
    var labels = { k03a: 'K03a', k03b: 'K03b', k04: 'K04', k06: 'K06' };
    var onTarget = 0, below = 0, noData = 0, worstKey = null, worstGap = -1;

    Object.keys(KPI_TARGETS).forEach(function (key) {
        var pct = (values[key] && values[key].pct) || 0;
        var count = (values[key] && values[key].total) || 0;

        switch (setKpiChip(key, pct, count)) {
            case 'pass':
                onTarget++;
                break;
            case 'fail':
                below++;
                var gap = KPI_TARGETS[key] - pct;
                if (gap > worstGap) { worstGap = gap; worstKey = key; }
                break;
            default:
                noData++;
        }
    });

    var measured = onTarget + below;
    var pct = measured > 0 ? Math.round((onTarget / measured) * 100) : null;

    $('.perf-pct').text(pct === null ? '--' : pct + '%');
    $('.perf-on').text(onTarget);
    $('.perf-below').text(below);
    $('.perf-nodata').text(noData);
    $('.perf-nodata-row').toggleClass('d-none', noData === 0);

    // Kept to one short line - the legend above already reports the no-data count.
    var note;
    if (measured === 0) {
        note = 'Nothing to score this period.';
    } else if (worstKey) {
        note = 'Lowest: ' + labels[worstKey] + ' ' + Math.round(values[worstKey].pct)
             + '% vs ' + KPI_TARGETS[worstKey] + '% target.';
    } else {
        note = 'All measured KPIs on target.';
    }
    $('.perf-note').text(note);

    // Centre figure is HTML (.perf-pct), so Apex's own labels stay off.
    var colors = getChartColorsArray('perf_chart');
    renderChart('perf_chart', {
        series: [onTarget, below, noData],
        chart: { height: 116, type: 'donut', sparkline: { enabled: true } },
        labels: ['On target', 'Below target', 'No data'],
        legend: { show: false },
        dataLabels: { enabled: false },
        stroke: { width: 0 },
        plotOptions: { pie: { donut: { size: '76%', labels: { show: false } } } },
        // The legend beside the ring already names every slice.
        tooltip: { enabled: false },
        noData: { text: 'No data' },
        colors: [colors[0], colors[1], themeColor('--vz-light', '#eff2f7')]
    });
}

// ─── Jobs by service + most overdue jobs (K03 detail feed) ───────────────────

function buildServiceBreakdown(services) {
    var rows = (services || [])
        .map(function (s) { return { title: s.service_title, jobs: toInt(s.total_jobs) }; })
        .filter(function (s) { return s.jobs > 0; })
        .sort(function (a, b) { return b.jobs - a.jobs; });

    if (!rows.length) {
        return '<p class="text-muted mb-0 py-3">No jobs recorded for this period.</p>';
    }

    var total = rows.reduce(function (sum, r) { return sum + r.jobs; }, 0);

    // Keep the chart readable: top 6, everything else rolled into "Others".
    if (rows.length > 7) {
        var others = rows.slice(6).reduce(function (sum, r) { return sum + r.jobs; }, 0);
        rows = rows.slice(0, 6);
        rows.push({ title: 'Others', jobs: others });
    }

    var max = rows[0].jobs;
    var html = '';
    rows.forEach(function (r) {
        var share = total > 0 ? Math.round((r.jobs / total) * 100) : 0;
        var width = max > 0 ? (r.jobs / max) * 100 : 0;
        html += '<div class="bar-row">';
        html += '<div class="d-flex justify-content-between mb-1">';
        html += '<span class="fs-13 text-truncate pe-2">' + esc(r.title) + '</span>';
        html += '<span class="fs-13 fw-semibold text-nowrap tabular">' + r.jobs + ' <span class="text-muted fw-normal">(' + share + '%)</span></span>';
        html += '</div>';
        html += '<div class="bar-track"><div class="bar-fill bg-primary bg-gradient" data-width="' + width + '"></div></div>';
        html += '</div>';
    });
    html += '<p class="text-muted fs-12 mb-0 mt-3">Total jobs in period: <b class="text-body tabular">' + total + '</b></p>';
    return html;
}

// Widths are applied after paint so the bars animate in from zero.
function animateBars($scope) {
    setTimeout(function () {
        $scope.find('.bar-fill').each(function () {
            $(this).css('width', $(this).data('width') + '%');
        });
    }, 50);
}

function buildLateJobsRows(services) {
    var jobs = [];
    (services || []).forEach(function (svc) {
        (svc.k03a_failed_jobs || []).forEach(function (job) {
            jobs.push(job);
        });
    });

    if (!jobs.length) {
        return '<tr><td colspan="5" class="text-center text-success py-4">'
             + '<i class="ri-checkbox-circle-line align-middle me-1"></i>No jobs breached their attendance target in this period.</td></tr>';
    }

    jobs.sort(function (a, b) { return (parseFloat(b.late_by_hours) || 0) - (parseFloat(a.late_by_hours) || 0); });

    var html = '';
    jobs.slice(0, 5).forEach(function (job) {
        html += '<tr>';
        html += '<td class="ps-3 fw-semibold">' + esc(job.code) + '</td>';
        html += '<td>' + esc(job.service_title) + '</td>';
        html += '<td class="text-muted">' + esc(job.property_address) + '</td>';
        html += '<td>' + esc(job.engineer_name) + '</td>';
        html += '<td class="text-end pe-3"><span class="badge bg-danger-subtle text-danger tabular">'
             +  '<i class="ri-timer-flash-line align-middle me-1"></i>+' + esc(job.late_by_hours) + ' hrs</span></td>';
        html += '</tr>';
    });
    return html;
}

function loadK03Widgets() {
    ajs.ajax_form(
        site_url + 'dashboard/k03-detail',
        null, 'GET', null, '0', '0',
        function (res) {
            if (res && ajs.check_result(res) && res.data) {
                var services = res.data.services || [];
                var $breakdown = $('#service-breakdown').html(buildServiceBreakdown(services));
                animateBars($breakdown);
                $('#late-jobs-body').html(buildLateJobsRows(services));
            } else {
                k03WidgetsFailed();
            }
        },
        k03WidgetsFailed
    );
}

function k03WidgetsFailed() {
    $('#service-breakdown').html('<p class="text-muted mb-0 py-3">Breakdown unavailable right now.</p>');
    $('#late-jobs-body').html('<tr><td colspan="5" class="text-center text-muted py-4">Unable to load overdue jobs.</td></tr>');
}

// ─── Appointment outcomes (K04 detail feed) ──────────────────────────────────

function setAppointmentOutcomes(data) {
    var noAccessGroups = data.no_access_groups || [];
    var noAccessTotal = 0;
    noAccessGroups.forEach(function (g) { noAccessTotal += toInt(g.count); });

    var buckets = [
        { label: 'No access',             value: noAccessTotal,                             cls: 'text-danger' },
        { label: 'Rescheduled (pending)', value: (data.rescheduled_pending || []).length,   cls: 'text-warning' },
        { label: 'Further works',         value: (data.further_works || []).length,         cls: 'text-info' },
        { label: 'Materials required',    value: (data.materials_required || []).length,    cls: 'text-primary' },
        { label: 'Other outcomes',        value: (data.other_outcomes || []).length,        cls: 'text-secondary' }
    ];

    var total = buckets.reduce(function (sum, b) { return sum + b.value; }, 0);

    if (total === 0) {
        $('#appt_outcome_chart').html('');
        $('#appt-outcome-legend').html('<p class="text-success mb-0 py-3 text-center"><i class="ri-checkbox-circle-line align-middle me-1"></i>No appointment exceptions in this period.</p>');
        return;
    }

    renderChart('appt_outcome_chart', {
        series: buckets.map(function (b) { return b.value; }),
        chart: { height: 215, type: 'donut' },
        labels: buckets.map(function (b) { return b.label; }),
        legend: { show: false },
        dataLabels: { enabled: false },
        stroke: { width: 0 },
        plotOptions: { pie: { donut: { size: '72%', labels: {
            show: true,
            name: { fontSize: '11px', color: themeColor('--vz-secondary-color', '#878a99') },
            value: { fontSize: '22px', fontWeight: 600, color: themeColor('--vz-body-color', '#212529') },
            total: {
                show: true,
                showAlways: true,
                label: 'Exceptions',
                fontSize: '11px',
                color: themeColor('--vz-secondary-color', '#878a99'),
                formatter: function () { return total; }
            }
        } } } },
        noData: { text: 'No data' },
        colors: getChartColorsArray('appt_outcome_chart')
    });

    var html = '';
    buckets.forEach(function (b) {
        var share = Math.round((b.value / total) * 100);
        html += '<p class="mb-2 fs-13"><i class="ri-circle-fill me-1 fs-10 ' + b.cls + '"></i>' + b.label
              + '<span class="float-end fw-semibold tabular">' + b.value + ' <span class="text-muted fw-normal">(' + share + '%)</span></span></p>';
    });

    if (noAccessGroups.length) {
        var top = noAccessGroups.slice().sort(function (a, b) { return toInt(b.count) - toInt(a.count); })[0];
        html += '<hr class="my-2"><p class="text-muted fs-12 mb-0">Top no-access reason: <b class="text-body">'
              + esc(top.reason_name) + '</b> (' + toInt(top.count) + ')</p>';
    }
    $('#appt-outcome-legend').html(html);
}

function loadK04Widgets() {
    ajs.ajax_form(
        site_url + 'dashboard/k04-detail',
        null, 'GET', null, '0', '0',
        function (res) {
            if (res && ajs.check_result(res) && res.data) {
                setAppointmentOutcomes(res.data);
            } else {
                k04WidgetsFailed();
            }
        },
        k04WidgetsFailed
    );
}

function k04WidgetsFailed() {
    $('#appt-outcome-legend').html('<p class="text-muted mb-0 py-3">Appointment outcomes unavailable right now.</p>');
}

// ─── Load ─────────────────────────────────────────────────────────────────────

function set_dashboard(result_json) {
	if (ajs_form_handler.check_result(result_json)) {
        var data = result_json.data;
		setJobCountAndChart(data);
        setCount('.contract-count', data.contract_count);
        setCount('.client-count', data.client_count);
        setCount('.property-count', data.property_count);
        setCount('.user-count', data.user_count);
        showCounter();

        var now = new Date();
        $('.dash-updated').text('Updated ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + '.');
	} else {
		ajs_form_handler.show_errors(result_json);
	}
}

function loadDashboard() {
    ajs.ajax_form(
        site_url + "dashboard",
        null,
        "GET",
        null,
        "1",
        "1",
        set_dashboard,
        set_dashboard
    );

    // Detail feeds are heavier, so they load in the background and degrade
    // gracefully instead of holding up the headline numbers.
    loadK03Widgets();
    loadK04Widgets();
}

/**
 * Today at Risk card.
 *
 * Loaded separately from loadDashboard(): this endpoint is on a 90s cache while
 * the KPI aggregates cache for a day, so tying them together would either make
 * this card stale or the KPI block slow.
 */
function loadDelayCard() {
    ajs.ajax_form(
        site_url + 'dashboard/delay-board',
        null, 'GET', null, '0', '0',
        function (res) {
            if (!res || !res.status || !res.data) {
                $('.delay-top-exceptions').text('Unavailable');
                return;
            }

            var total = res.data.total_at_risk || 0;
            $('.delay-at-risk-count').attr('data-target', total).text(total);

            if (total === 0) {
                $('.delay-top-exceptions').text('Everything on track');
                return;
            }

            // Name the two biggest contributors so the card says what is wrong,
            // not just how much.
            var top = (res.data.exceptions || []).slice(0, 2).map(function (e) {
                return e.count + ' ' + e.label.toLowerCase();
            });
            $('.delay-top-exceptions').text(top.join(' · '));
        },
        function () {
            $('.delay-top-exceptions').text('Unavailable');
        }
    );
}

/**
 * Servicing Compliance card.
 */
function loadComplianceCard() {
    ajs.ajax_form(
        site_url + 'dashboard/compliance/summary',
        null, 'GET', null, '0', '0',
        function (res) {
            if (!res || !res.status || !res.data) {
                $('.compliance-breakdown').text('Unavailable');
                return;
            }

            var d = res.data;
            $('.compliance-pct').text((d.percentage !== undefined ? d.percentage : 0) + '%');

            var parts = [];
            if (d.overdue) {
                parts.push(d.overdue + ' overdue');
            }
            if (d.never_serviced) {
                parts.push(d.never_serviced + ' never serviced');
            }
            if (d.due_soon) {
                parts.push(d.due_soon + ' due soon');
            }
            $('.compliance-breakdown').text(parts.length ? parts.join(' · ') : 'All within cycle');
        },
        function () {
            $('.compliance-breakdown').text('Unavailable');
        }
    );
}

$(function () {
	if ($("#is_dashboard").val() == 1) {
        var breadcrumbs = [{ label: "Dashboard", url: null }];
	    set_breadcrumb(breadcrumbs);
        initDashTooltips();
		loadDashboard();
        loadDelayCard();
        loadComplianceCard();

        $('#dash-refresh').on('click', function () {
            var $btn = $(this).prop('disabled', true);
            $('#service-breakdown').html('<div class="skeleton w-75"></div><div class="skeleton w-50"></div><div class="skeleton w-100"></div>');
            $('#late-jobs-body').html('<tr><td colspan="5" class="text-center text-muted py-4">Loading&hellip;</td></tr>');
            loadDashboard();
            loadDelayCard();
            loadComplianceCard();
            setTimeout(function () { $btn.prop('disabled', false); }, 2000);
        });
	}
});
