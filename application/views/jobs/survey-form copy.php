<!doctype html>
<html lang="en" data-layout="vertical" data-topbar="light" data-sidebar="dark" data-sidebar-size="sm-hover" data-sidebar-image="none" data-preloader="disable">

    <head>

        <meta charset="utf-8" />
        <title>Service Feedback</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta content="" name="description" />
        <meta content="" name="author" />
        <link rel="shortcut icon" href="<?= cnd_url('assets/images/ajs-favion.png'); ?>">

        <!-- Bootstrap Css -->
        <link href="<?= cnd_url(); ?>assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <!-- Icons Css -->
        <link href="<?= cnd_url(); ?>assets/css/icons.min.css" rel="stylesheet" type="text/css" />
        <!-- App Css -->
        <link href="<?= cnd_url(); ?>assets/css/app.min.css" rel="stylesheet" type="text/css" />
        <!-- Custom Css -->
        <link href="<?= cnd_url(); ?>assets/css/custom.min.css" rel="stylesheet" type="text/css" />
        <link href="<?= cnd_url(); ?>assets/libs/sweetalert2/sweetalert2.min.css" rel="stylesheet" type="text/css" />

        <style>
            /* ── Skeleton (same as confirm-appointment) ── */
            .skeleton-box {
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: loading 1.5s ease-in-out infinite;
            }
            @keyframes loading {
                0%   { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }

            /* ── Client branding header / footer (same as confirm-appointment) ── */
            .public-branding-header,
            .public-branding-footer {
                width: 100%;
                text-align: center;
                padding: 0;
                line-height: 0;
            }
            .public-branding-header img,
            .public-branding-footer img {
                width: 100%;
                height: auto;
                display: block;
                object-fit: contain;
            }

            /* ── Yes / No / N/A answer buttons ── */
            .yn-group { display: flex; gap: 8px; flex-wrap: wrap; }
            .yn-btn {
                flex: 1;
                min-width: 80px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
                padding: 6px 10px;
                border-radius: 8px;
                border: 1.5px solid #ced4da;
                background: #fff;
                font-size: 11px;
                font-weight: 500;
                color: #495057;
                cursor: pointer;
                transition: all .15s ease;
                -webkit-tap-highlight-color: transparent;
                user-select: none;
            }
            .yn-btn:hover { border-color: #adb5bd; background: #f8f9fa; }
            .yn-btn[data-val="1"].yn-active  { border-color: #0ab39c; background: #e7f8f5; color: #0ab39c; font-weight: 600; }
            .yn-btn[data-val="0"].yn-active  { border-color: #f06548; background: #fef0ed; color: #f06548; font-weight: 600; }
            .yn-btn[data-val="na"].yn-active { border-color: #878a99; background: #f3f4f6; color: #495057; font-weight: 600; }

            /* ── Question card ── */
            .question-card {
                border: 1px solid #e9ebec;
                border-radius: 10px;
                padding: 18px 18px 16px;
                margin-bottom: 14px;
                transition: border-color .2s, background .2s;
                position: relative;
            }
            .question-card.answered {
                border-color: #b7eee7;
                background: #f7fffe;
            }
            .q-answered-tick {
                position: absolute;
                top: 14px;
                right: 14px;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: #0ab39c;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transform: scale(.4);
                transition: opacity .2s, transform .22s cubic-bezier(.34,1.56,.64,1);
            }
            .q-answered-tick i { font-size: 10px; color: #fff; line-height: 1; }
            .question-card.answered .q-answered-tick { opacity: 1; transform: scale(1); }

            /* ── Progress ── */
            .survey-progress-meta {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                color: #878a99;
                margin-bottom: 5px;
            }
            .survey-progress-meta span:last-child { color: #405189; font-weight: 600; }

            /* ── Q7 notice ── */
            .q-na-notice {
                font-size: 12px;
                color: #664d03;
                background: #fff8e6;
                border-left: 3px solid #ffc107;
                border-radius: 6px;
                padding: 8px 12px;
                margin-top: 10px;
            }

            /* ── Notes section ── */
            .notes-card {
                border: 1px solid #e9ebec;
                border-radius: 10px;
                padding: 18px;
                margin-bottom: 14px;
                background: #fff;
            }
            .notes-card label {
                font-weight: 600;
                font-size: 11px;
                color: #212529;
                margin-bottom: 4px;
                display: block;
            }
            .notes-card .notes-hint {
                font-size: 12px;
                color: #878a99;
                margin-bottom: 10px;
                margin-top: 0;
            }
            .notes-card textarea {
                width: 100%;
                border: 1px solid #ced4da;
                border-radius: 8px;
                padding: 10px 12px;
                font-size: 11px;
                color: #212529;
                resize: vertical;
                min-height: 90px;
                transition: border-color .15s, box-shadow .15s;
                font-family: inherit;
                line-height: 1.5;
            }
            .notes-card textarea:focus {
                outline: none;
                border-color: #405189;
                box-shadow: 0 0 0 3px rgba(64,81,137,.12);
            }
            .notes-card .char-count {
                font-size: 11px;
                color: #adb5bd;
                text-align: right;
                margin-top: 4px;
            }

            /* ── Thank-you icon ── */
            .state-icon {
                width: 72px;
                height: 72px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px;
            }
            .state-icon.success { background: #e7f8f5; }
            .state-icon.warning { background: #fff8e6; }
            .state-icon i { font-size: 32px; }
            .state-icon.success i { color: #0ab39c; }
            .state-icon.warning i { color: #f7b84b; }
        </style>

        <script src="https://code.jquery.com/jquery-3.4.1.min.js" crossorigin="anonymous"></script>
        <script src="<?= cnd_url(); ?>assets/libs/sweetalert2/sweetalert2.min.js"></script>

        <script>
            // Injected by CodeIgniter Job::survey_form()
            const SURVEY_TOKEN = <?= json_encode($token ?? null) ?>;
            const API_BASE     = <?= json_encode(rtrim($api_base ?? '', '/')) ?>;
        </script>

    </head>

    <body>

        <!-- Preloader -->
        <div id="status" class="d-flex align-items-center justify-content-center min-vh-100">
            <!-- <div class="spinner-border text-primary avatar-xxs m-auto" role="status">
                <span class="visually-hidden">Loading...</span>
            </div> -->
        </div>

        <!-- Main wrapper — hidden until API responds -->
        <div class="auth-page-wrapper auth-bg-cover py-4 d-flex justify-content-center align-items-center min-vh-100"
             id="main-wrapper" style="display:none !important;">
            <div class="bg-overlay"></div>

            <div class="auth-page-content overflow-hidden pt-lg-3">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card overflow-hidden">

                                <!-- ── Client letter header (from clients.letter_header via API) ── -->
                                <div id="branding-header" class="public-branding-header" style="display:none;">
                                    <img id="letter-header-img" src="" alt="Company Header">
                                </div>

                                <div class="row g-0">

                                    <!-- Left blue panel — identical to confirm-appointment -->
                                    <div class="col-lg-5">
                                        <div class="p-lg-4 auth-one-bg h-100">
                                            <div class="position-relative h-100 d-flex flex-column">
                                                <a href="#" class="d-inline-block auth-logo">
                                                    <img src="<?= cnd_url(); ?>assets/images/ajs-logo-white.svg" alt="AJS" height="60">
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Right content panel -->
                                    <div class="col-lg-7">
                                        <div class="p-lg-4 p-3">

                                            <h3 class="mb-1" id="page-heading">Service Feedback</h3>
                                            <p class="text-muted mb-4" id="page-subheading">
                                                Please take 2 minutes to rate our service.
                                            </p>

                                            <!-- ══ SKELETON ══════════════════════════════════════════ -->
                                            <div id="skeleton-loader">
                                                <div class="mb-3">
                                                    <div class="skeleton-box" style="height:13px;width:60%;border-radius:4px;margin-bottom:10px;"></div>
                                                    <div class="skeleton-box" style="height:50px;border-radius:8px;margin-bottom:14px;"></div>
                                                </div>
                                                <div class="mb-3">
                                                    <div class="skeleton-box" style="height:13px;width:78%;border-radius:4px;margin-bottom:10px;"></div>
                                                    <div class="skeleton-box" style="height:50px;border-radius:8px;margin-bottom:14px;"></div>
                                                </div>
                                                <div class="mb-3">
                                                    <div class="skeleton-box" style="height:13px;width:65%;border-radius:4px;margin-bottom:10px;"></div>
                                                    <div class="skeleton-box" style="height:50px;border-radius:8px;margin-bottom:14px;"></div>
                                                </div>
                                                <div>
                                                    <div class="skeleton-box" style="height:13px;width:55%;border-radius:4px;margin-bottom:10px;"></div>
                                                    <div class="skeleton-box" style="height:50px;border-radius:8px;"></div>
                                                </div>
                                            </div>

                                            <!-- ══ SURVEY FORM ════════════════════════════════════════ -->
                                            <div id="survey-content" style="display:none;">

                                                <!-- Job reference badge -->
                                                <div id="job-ref-wrap" class="mb-3" style="display:none;">
                                                    <span class="badge bg-light text-dark border fs-12">
                                                        <i class="ri-file-list-3-line me-1"></i>
                                                        Job Reference: <strong id="job-ref-code"></strong>
                                                    </span>
                                                </div>

                                                <!-- Progress -->
                                                <div class="mb-3">
                                                    <div class="survey-progress-meta">
                                                        <span>Your progress</span>
                                                        <span id="progress-label">0 of 0 answered</span>
                                                    </div>
                                                    <div class="progress" style="height:5px;">
                                                        <div class="progress-bar bg-primary" id="progress-bar" role="progressbar" style="width:0%;transition:width .4s ease;"></div>
                                                    </div>
                                                </div>

                                                <!-- Question cards injected here -->
                                                <div id="questions-area"></div>

                                                <!-- ── Notes section ── -->
                                                <div class="notes-card">
                                                    <label for="resident-notes">
                                                        <i class="ri-sticky-note-line me-1 text-muted"></i>
                                                        Additional Comments
                                                        <span class="text-muted fw-normal">(optional)</span>
                                                    </label>
                                                    <p class="notes-hint">Is there anything else you'd like to share about your experience today?</p>
                                                    <textarea id="resident-notes" maxlength="2000"
                                                        placeholder="e.g. The operative was very professional and explained everything clearly…"></textarea>
                                                    <div class="char-count"><span id="notes-count">0</span> / 2000</div>
                                                </div>

                                                <!-- Error alert -->
                                                <div id="error-alert" class="alert alert-danger d-none py-2" role="alert">
                                                    <i class="ri-error-warning-line me-1"></i>
                                                    <span id="error-text">Please answer all questions before submitting.</span>
                                                </div>

                                                <!-- Submit -->
                                                <div class="mt-3">
                                                    <button id="submit-btn" class="btn btn-primary w-100" disabled>
                                                        <span id="submit-label">Submit Feedback</span>
                                                        <span id="submit-spinner" class="spinner-border spinner-border-sm ms-2 d-none" role="status"></span>
                                                    </button>
                                                    <p class="text-center text-muted mt-2 mb-0" style="font-size:12px;">
                                                        All questions are required &mdash;
                                                        select <strong>N/A</strong> if a question does not apply
                                                    </p>
                                                </div>

                                            </div><!-- /survey-content -->

                                            <!-- ══ THANK-YOU ═════════════════════════════════════════ -->
                                            <div id="thankyou-content" style="display:none;" class="text-center py-4">
                                                <div class="state-icon success">
                                                    <i class="ri-check-line"></i>
                                                </div>
                                                <h4 class="mb-2">Thank you for your feedback!</h4>
                                                <p class="text-muted mb-0">
                                                    We really appreciate you taking the time to share your experience.
                                                    Your responses help us continuously improve our service.
                                                </p>
                                            </div>

                                            <!-- ══ INVALID / EXPIRED ═══════════════════════════════════ -->
                                            <div id="invalid-content" style="display:none;" class="text-center py-4">
                                                <div class="state-icon warning">
                                                    <i class="ri-error-warning-line"></i>
                                                </div>
                                                <h4 class="mb-2" id="invalid-title">Survey Unavailable</h4>
                                                <p class="text-muted mb-0" id="invalid-message">
                                                    This survey link has expired or is no longer valid.
                                                </p>
                                            </div>

                                        </div><!-- /p-lg-5 -->
                                    </div><!-- /col-lg-7 -->

                                </div><!-- /row g-0 -->

                                <!-- ── Client letter footer ── -->
                                <div id="branding-footer" class="public-branding-footer" style="display:none;">
                                    <img id="letter-footer-img" src="" alt="Company Footer">
                                </div>

                            </div><!-- /card -->
                        </div><!-- /col-lg-12 -->
                    </div><!-- /row -->
                </div><!-- /container -->
            </div><!-- /auth-page-content -->

            <!-- Footer -->
            <footer class="footer">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="text-center">
                                <p class="mb-0 text-white">
                                    &copy; <script>document.write(new Date().getFullYear())</script>
                                    Copyright &amp; Developed by
                                    <a href="https://netlink.co.in" target="_blank" class="text-warning">NetLink</a> &amp;
                                    <a href="https://www.globalbug.co.uk/" target="_blank" class="text-warning">Globalbug Ltd.</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </div><!-- /auth-page-wrapper -->

        <!-- JAVASCRIPT -->
        <script src="<?= cnd_url(); ?>assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>

        <script>
        (function () {
            'use strict';

            // ── State ─────────────────────────────────────────────────────────
            var questions = [];
            var answers   = {};  // { question_id: { question_id, question_key, answer_yn } }

            // ── DOM refs ──────────────────────────────────────────────────────
            var statusEl     = document.getElementById('status');
            var wrapperEl    = document.getElementById('main-wrapper');
            var skeletonEl   = document.getElementById('skeleton-loader');
            var surveyEl     = document.getElementById('survey-content');
            var thankyouEl   = document.getElementById('thankyou-content');
            var invalidEl    = document.getElementById('invalid-content');
            var questionsEl  = document.getElementById('questions-area');
            var progressBar  = document.getElementById('progress-bar');
            var progressLbl  = document.getElementById('progress-label');
            var submitBtn    = document.getElementById('submit-btn');
            var submitLbl    = document.getElementById('submit-label');
            var submitSpin   = document.getElementById('submit-spinner');
            var errorAlert   = document.getElementById('error-alert');
            var errorText    = document.getElementById('error-text');
            var notesEl      = document.getElementById('resident-notes');
            var notesCount   = document.getElementById('notes-count');

            // ── Utility ───────────────────────────────────────────────────────
            function showPanel(state) {
                skeletonEl.style.display  = (state === 'loading')  ? '' : 'none';
                surveyEl.style.display    = (state === 'survey')   ? '' : 'none';
                thankyouEl.style.display  = (state === 'thankyou') ? '' : 'none';
                invalidEl.style.display   = (state === 'invalid')  ? '' : 'none';

                // Hide the page heading + subheading when not on the survey/loading panel
                // so they don't appear above the thank-you or invalid messages
                var headingEl    = document.getElementById('page-heading');
                var subheadingEl = document.getElementById('page-subheading');
                var showHeading  = (state === 'loading' || state === 'survey');
                if (headingEl)    headingEl.style.display    = showHeading ? '' : 'none';
                if (subheadingEl) subheadingEl.style.display = showHeading ? '' : 'none';

                // Always make sure the full-page preloader is gone once we have a state
                statusEl.style.display = 'none';
            }

            function revealWrapper() {
                // Permanently hide the full-page preloader — never show it again
                statusEl.style.cssText = 'display:none !important';
                // Remove the inline display:none !important from the main wrapper
                wrapperEl.style.cssText = '';
            }

            function showError(msg) {
                errorText.textContent = msg;
                errorAlert.classList.remove('d-none');
            }
            function hideError() { errorAlert.classList.add('d-none'); }

            function esc(str) {
                return String(str)
                    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
            }

            // ── Progress ──────────────────────────────────────────────────────
            function updateProgress() {
                var total = questions.length;
                var done  = Object.keys(answers).length;
                var pct   = total ? Math.round(done / total * 100) : 0;
                progressBar.style.width    = pct + '%';
                progressLbl.textContent    = done + ' of ' + total + ' answered';
                submitBtn.disabled         = (done < total);
            }

            // ── Render questions ──────────────────────────────────────────────
            function renderQuestions() {
                questionsEl.innerHTML = '';

                questions.forEach(function (q, idx) {
                    var isFollowOn = (q.question_key === 'FOLLOWON_SCHEDULED');

                    var naBtn = isFollowOn
                        ? '<button class="yn-btn" data-val="na" data-qid="' + q.id
                          + '" data-qkey="' + esc(q.question_key) + '" type="button">'
                          + '<i class="ri-subtract-line"></i> N/A</button>'
                        : '';

                    var notice = isFollowOn
                        ? '<div class="q-na-notice mt-2">'
                          + '<i class="ri-information-line me-1"></i>'
                          + 'Select <strong>N/A</strong> if no follow-on works were identified during this visit.'
                          + '</div>'
                        : '';

                    var card = document.createElement('div');
                    card.className   = 'question-card';
                    card.dataset.qid = q.id;
                    card.innerHTML   =
                        '<div class="q-answered-tick"><i class="ri-check-line"></i></div>'
                        + '<p class="text-muted mb-1" style="font-size:11px;font-weight:600;letter-spacing:.7px;text-transform:uppercase;">Question ' + (idx + 1) + ' :'+ esc(q.question_text) + '</p>'
                        + '<div class="yn-group">'
                        +   '<button class="yn-btn" data-val="1"  data-qid="' + q.id + '" data-qkey="' + esc(q.question_key) + '" type="button">'
                        +     '<i class="ri-check-line"></i> Yes</button>'
                        +   '<button class="yn-btn" data-val="0"  data-qid="' + q.id + '" data-qkey="' + esc(q.question_key) + '" type="button">'
                        +     '<i class="ri-close-line"></i> No</button>'
                        +   naBtn
                        + '</div>'
                        + notice;

                    card.querySelectorAll('.yn-btn').forEach(function (btn) {
                        btn.addEventListener('click', function () {
                            onAnswer(btn, card, q.id, q.question_key, btn.dataset.val);
                        });
                    });

                    questionsEl.appendChild(card);
                });

                updateProgress();
            }

            // ── Record answer ─────────────────────────────────────────────────
            function onAnswer(btn, card, qid, qkey, val) {
                card.querySelectorAll('.yn-btn').forEach(function (b) { b.classList.remove('yn-active'); });
                btn.classList.add('yn-active');
                card.classList.add('answered');

                // N/A → answer_yn null (excluded from KPI % in the DB view)
                answers[qid] = {
                    question_id:  qid,
                    question_key: qkey,
                    answer_yn:    (val === 'na') ? null : parseInt(val, 10),
                };

                updateProgress();
                hideError();
            }

            // ── Notes character counter ───────────────────────────────────────
            notesEl.addEventListener('input', function () {
                notesCount.textContent = this.value.length;
            });

            // ── Submit ────────────────────────────────────────────────────────
            submitBtn.addEventListener('click', function () {
                var total = questions.length;
                var done  = Object.keys(answers).length;

                if (done < total) {
                    showError('Please answer all ' + total + ' questions before submitting.');
                    var first = questionsEl.querySelector('.question-card:not(.answered)');
                    if (first) { first.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
                    return;
                }

                submitBtn.disabled    = true;
                submitSpin.classList.remove('d-none');
                submitLbl.textContent = 'Submitting\u2026';
                hideError();

                var notes = notesEl.value.trim();

                fetch(API_BASE + '/survey/submit/' + SURVEY_TOKEN, {
                    method:  'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body:    JSON.stringify({
                        answers: Object.values(answers),
                        notes:   notes || null,
                    }),
                })
                .then(function (r) { return r.json(); })
                .then(function (data) {
                    if (data.status) {
                        showPanel('thankyou');
                    } else {
                        submitBtn.disabled    = false;
                        submitSpin.classList.add('d-none');
                        submitLbl.textContent = 'Submit Feedback';
                        showError(data.message || 'Failed to submit. Please try again.');
                    }
                })
                .catch(function () {
                    submitBtn.disabled    = false;
                    submitSpin.classList.add('d-none');
                    submitLbl.textContent = 'Submit Feedback';
                    showError('Network error. Please check your connection and try again.');
                });
            });

            // ── Load survey ───────────────────────────────────────────────────
            function loadSurvey() {
                if (!SURVEY_TOKEN) {
                    revealWrapper();
                    showPanel('invalid');
                    document.getElementById('invalid-title').textContent   = 'Survey Unavailable';
                    document.getElementById('invalid-message').textContent = 'No survey token was found in this link.';
                    return;
                }

                fetch(API_BASE + '/survey/form/' + SURVEY_TOKEN)
                    .then(function (r) { return r.json(); })
                    .then(function (data) {
                        revealWrapper();

                        // Already completed
                        if (data.completed) {
                            showPanel('thankyou');
                            return;
                        }

                        // Expired / invalid
                        if (!data.status) {
                            showPanel('invalid');
                            document.getElementById('invalid-message').textContent =
                                data.message || 'This survey link is no longer valid.';
                            return;
                        }

                        var ctx = data.context || {};

                        // ── Client letter header (clients.letter_header) ──────
                        if (ctx.letter_header_url) {
                            document.getElementById('letter-header-img').src = ctx.letter_header_url;
                            document.getElementById('branding-header').style.display = '';
                        }

                        // ── Client letter footer ─────────────────────────────
                        if (ctx.letter_footer_url) {
                            document.getElementById('letter-footer-img').src = ctx.letter_footer_url;
                            document.getElementById('branding-footer').style.display = '';
                        }

                        // ── Job reference badge ──────────────────────────────
                        if (ctx.job_code) {
                            document.getElementById('job-ref-code').textContent = ctx.job_code;
                            document.getElementById('job-ref-wrap').style.display = '';
                        }

                        // ── Personalise subheading with resident name ────────
                        if (ctx.resident_name) {
                            document.getElementById('page-subheading').textContent =
                                'Hi ' + ctx.resident_name + ', please take 2 minutes to rate our service.';
                        }

                        questions = data.questions || [];
                        renderQuestions();
                        showPanel('survey');
                    })
                    .catch(function () {
                        revealWrapper();
                        showPanel('invalid');
                        document.getElementById('invalid-title').textContent   = 'Unable to Load';
                        document.getElementById('invalid-message').textContent =
                            'Unable to load the survey. Please try again later.';
                    });
            }

            // ── Boot ──────────────────────────────────────────────────────────
            loadSurvey();

        }());
        </script>

    </body>

</html>