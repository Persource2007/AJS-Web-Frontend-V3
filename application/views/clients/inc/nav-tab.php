<div class="d-flex profile-wrapper">
    <!-- Nav tabs -->
    <?php $encoded_id = isset($client_id) ? hash_encode($client_id) : $encoded_id; ?>
    <ul class="client-sub-nav nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1 pt-1" role="tablist">
        <li class="nav-item">
            <a class="nav-link fs-14" data-tab="details" href="<?= base_url('clients/details/' . $encoded_id) ?>" >
                <i class="ri-airplay-fill d-inline-block d-md-none"></i> <span class="d-none d-md-inline-block">Client</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link fs-14" data-tab="client-contracts"  href="<?= base_url('clients/' . $encoded_id . '/contract') ?>" data-module="Contracts" data-action="view">
                <i class="ri-list-unordered d-inline-block d-md-none"></i> <span class="d-none d-md-inline-block">Contracts</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link fs-14" data-tab="client-properties"  href="<?= base_url('clients/' . $encoded_id . '/properties') ?>" data-module="Properties" data-action="view">
                <i class="ri-list-unordered d-inline-block d-md-none"></i> <span class="d-none d-md-inline-block">Properties</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link fs-14" data-tab="client-sors" href="<?= base_url('clients/' . $encoded_id . '/sors') ?>" role="tab" data-module="SORs" data-action="view">
                <i class="ri-price-tag-line d-inline-block d-md-none"></i> <span class="d-none d-md-inline-block">SORs</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link fs-14" data-tab="client-appointments" href="<?= base_url('clients/' . $encoded_id . '/appointments') ?>" role="tab">
                <i class="ri-folder-4-line d-inline-block d-md-none"></i> <span class="d-none d-md-inline-block">Comm. Templates</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link fs-14" data-tab="workflow-schedules" href="<?= base_url('clients/' . $encoded_id . '/schedule-process') ?>" role="tab">
                <i class="ri-folder-4-line d-inline-block d-md-none"></i> <span class="d-none d-md-inline-block">Schedule Workflow</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link fs-14" data-tab="selling-and-billing" href="<?= base_url('clients/' . $encoded_id . '/selling-and-billing') ?>" role="tab">
                <i class="ri-folder-4-line d-inline-block d-md-none"></i> <span class="d-none d-md-inline-block">Finance</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link fs-14" data-tab="code-mapping"  href="<?= base_url('clients/' . $encoded_id . '/code-mapping') ?>" role="tab">
                <i class="ri-folder-4-line d-inline-block d-md-none"></i> <span class="d-none d-md-inline-block">Code Mapping</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link fs-14" data-tab="uplifts" href="<?= base_url('clients/' . $encoded_id . '/uplifts') ?>" role="tab">
                <i class="ri-folder-4-line d-inline-block d-md-none"></i> <span class="d-none d-md-inline-block">Uplifts</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link fs-14" data-tab="interface" href="<?= base_url('clients/' . $encoded_id . '/interface') ?>" role="tab" data-module="Interface" data-action="view">
                <i class="ri-folder-4-line d-inline-block d-md-none"></i> <span class="d-none d-md-inline-block">Interface</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link fs-14" data-tab="settings" href="<?= base_url('clients/' . $encoded_id . '/settings') ?>" role="tab">
                <i class="ri-folder-4-line d-inline-block d-md-none"></i> <span class="d-none d-md-inline-block">Client Settings</span>
            </a>
        </li>
    </ul>
</div>
