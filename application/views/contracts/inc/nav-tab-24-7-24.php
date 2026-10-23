<div class="d-flex profile-wrapper">
    <!-- Nav tabs -->
    <ul class="client-sub-nav nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1" role="tablist">
        <?php
        if (isset($id) && $id > 0) {
            $title  = $title ?? '';
            $enc_id = hash_encode($id);

            $tabs = [[
                'title' => 'Contract',
                'url'   => base_url('contract/edit/' . $enc_id)
            ], [
                'title' => 'Personnel',
                'url'   => base_url('contract/personnel/' . $enc_id)
            ], [
                'title' => 'Services',
                'url'   => base_url('contract/services/' . $enc_id)
            ], [
                'title' => 'PPM Master Plan',
                'url'   => base_url('contract/master-plan/' . $enc_id)
            ], [
                'title' => 'SORs',
                'url'   => base_url('contract/sors/' . $enc_id)
            ], [
                'title' => 'Finance',
                'url'   => base_url('contract/selling-and-billing/' . $enc_id)
            ], [
                'title' => 'Reports',
                'url'   => "#"
            ], [
                'title' => 'Uplifts',
                'url'   => base_url('contract/uplifts/' . $enc_id)
            ], [
                'title' => 'Settings',
                'url'   => base_url('contract/settings/' . $enc_id)
            ]];

            foreach ($tabs as $tab) {
        ?>
                <li class="nav-item">
                    <a class="nav-link fs-14 <?= $title == $tab['title'] ? 'active' : ''; ?>" href="<?= $tab['url'] ?>" role="tab">
                        <i class="ri-airplay-fill d-inline-block d-md-none"></i> <span class="d-none d-md-inline-block"><?= $tab['title'] ?></span>
                    </a>
                </li>
            <?php
            }
        } else {
            ?>
            <li class="nav-item">
                <a class="nav-link fs-14 active" href="<?= base_url('contract/create') ?>" role="tab">
                    <i class="ri-airplay-fill d-inline-block d-md-none"></i> <span class="d-none d-md-inline-block">Contract</span>
                </a>
            </li>
        <?php } ?>
    </ul>
</div>