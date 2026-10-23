<div class="sub-nav-tabs">
    <?php
        $url = !empty($client_id) ? 'clients/' . hash_encode($client_id).'/' : '';
    ?>
    <ul class="nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1 property-sub-nav" role="tablist">
        <li class="nav-item">
            <a class="nav-link fs-14" data-tab="property-details" href="<?= base_url($url . 'properties/details/' . hash_encode($property_id)) ?>" role="tab">
                <i class="ri-airplay-fill d-inline-block d-md-none"></i> <span class="d-none d-md-inline-block">Property</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link fs-14" data-tab="property-assets" href="<?= base_url( $url . 'properties/' . hash_encode($property_id) . '/assets') ?>" role="tab">
                <i class="ri-list-unordered d-inline-block d-md-none"></i> <span class="d-none d-md-inline-block">Assets</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link fs-14" data-tab="master-plan-list" href="<?= base_url($url . 'properties/' . hash_encode($property_id) . '/master-plan-list') ?>" role="tab">
                <i class="ri-price-tag-line d-inline-block d-md-none"></i> <span class="d-none d-md-inline-block">PPM Plans</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link fs-14" data-tab="upcoming-jobs" href="<?= base_url($url . 'properties/' . hash_encode($property_id) . '/upcoming-jobs') ?>" role="tab">
                <i class="ri-price-tag-line d-inline-block d-md-none"></i> <span class="d-none d-md-inline-block">Open Jobs</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link fs-14" data-tab="job-history" href="<?= base_url( $url . 'properties/' . hash_encode($property_id) . '/job-history') ?>" role="tab">
                <i class="ri-price-tag-line d-inline-block d-md-none"></i> <span class="d-none d-md-inline-block">Job History</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link fs-14" data-tab="certificates" href="<?= base_url( $url . 'properties/' . hash_encode($property_id) . '/certificates') ?>" role="tab">
                <i class="ri-folder-4-line d-inline-block d-md-none"></i> <span class="d-none d-md-inline-block">Certificates</span>
            </a>
        </li>
    </ul>
</div>