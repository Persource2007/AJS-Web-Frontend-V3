<div class="dropdown topbar-head-dropdown ms-1 header-item">
    <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle page-history-btn" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false">
        <i class='bx bx-history fs-22'></i>
    </button>
    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-notifications-dropdown">
        <div class="dropdown-head bg-primary bg-pattern rounded-top">
            <div class="p-3">
                <div class="row align-items-center">
                    <div class="col">
                        <h6 class="m-0 fs-16 fw-semibold text-white">Page History</h6>
                    </div>
                </div>
            </div>
        </div>

        <div class="tab-content position-relative">
            <div class="tab-pane fade show active"  role="tabpanel">
                <div id="history-list" style="max-height: 300px; overflow: auto" class="notification-card-box">
                    <div class="text-reset notification-item d-block dropdown-item position-relative">
                        <div class="d-flex">
                            <div class="avatar-xs me-3 flex-shrink-0">
                                <span class="avatar-title bg-info-subtle text-info rounded-circle fs-16">
                                    <i class="bx bx-history"></i>
                                </span>
                            </div>
                            <div class="flex-grow-1">
                                <a href="#!" class="stretched-link">
                                    <h6 class="mt-0 mb-2 lh-base">Your <b>Elite</b> author Graphic
                                        Optimization <span class="text-secondary">reward</span> is
                                        ready!
                                    </h6>
                                </a>
                                <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                    <span><i class="mdi mdi-clock-outline"></i> Just 30 sec ago</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="text-reset notification-item d-block dropdown-item position-relative">
                        <div class="d-flex">
                            <img src="<?= cnd_url(); ?>assets/images/users/avatar-2.jpg" class="me-3 rounded-circle avatar-xs flex-shrink-0" alt="user-pic">
                            <div class="flex-grow-1">
                                <a href="#!" class="stretched-link">
                                    <h6 class="mt-0 mb-1 fs-13 fw-semibold">Angela Bernier</h6>
                                </a>
                                <div class="fs-13 text-muted">
                                    <p class="mb-1">Answered to your comment on the cash flow forecast's
                                        graph 🔔.</p>
                                </div>
                                <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                    <span><i class="mdi mdi-clock-outline"></i> 48 min ago</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>