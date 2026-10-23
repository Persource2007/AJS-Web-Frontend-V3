<div class="d-flex profile-wrapper position-relative contract-subnav">
    <!-- Nav tabs -->
    <ul class="client-sub-nav nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1 pt-0" role="tablist">
        <?php
        if (isset($id) && $id > 0)
        {
            $title  = $title ?? '';
            $enc_id = hash_encode($id);

            $tabs = [
                [
                    'title' => 'Dashboard',
                    'url'   => base_url('contract/dashboard/' . $enc_id)
                ],
                [
                    'title' => 'Overview',
                    'url'   => base_url('contract/edit/' . $enc_id)
                ], [
                    'title' => 'Personnel',
                    'url'   => base_url('contract/personnel/' . $enc_id)
                ], [
                    'title' => 'Workstream',
                    'url'   => base_url('contract/services/' . $enc_id)
                ], [
                    'title' => 'PPM Master Plan',
                    'url'   => base_url('contract/master-plan/' . $enc_id)
                ], [
                    'title' => 'PPM Master Plan List',
                    'url'   => base_url('contract/master-plan-list/' . $enc_id)
                ], [
                    'title' => 'Contract SORs',
                    'url'   => base_url('contract/sors/' . $enc_id)
                ], [
                    'title' => 'Contract Finance',
                    'url'   => base_url('contract/selling-and-billing/' . $enc_id)
                ], [
                    'title' => 'Reports',
                    'url'   => base_url('contract/reports/' . $enc_id)
                ], [
                    'title' => 'Contract Settings',
                    'url'   => base_url('contract/settings/' . $enc_id)
                ], [
                    'title' => 'Framework Commission',
                    'url'   => base_url('contract/commissions/' . $enc_id)
                ]
                ,[
                    'title' => 'SOR Variations',
                    'url'   => base_url('contract/sor_variations_list/' . $enc_id)
                ]
        ];

            foreach ($tabs as $tab)
            {
                ?>
                <li class="nav-item <?= slugify($tab['title']) ?>">
                    <a class="nav-link fs-14 <?= $title == $tab['title'] ? 'active' : ''; ?>" href="<?= $tab['url'] ?>" role="tab">
                        <i class="ri-airplay-fill d-inline-block d-md-none"></i> <span class="d-none d-md-inline-block"><?= $tab['title'] ?></span>
                    </a>
                </li>
                <?php
            }
        }
        else
        {
            ?>
                <li class="nav-item">
                        <a class="nav-link fs-14 active" href="<?= base_url('contract/create') ?>" role="tab">
                            <i class="ri-airplay-fill d-inline-block d-md-none"></i> <span class="d-none d-md-inline-block">Overview</span>
                        </a>
                    </li>
                <?php } ?>
    </ul>
    <span class="d-inline-block active-contract" tabindex="0" data-bs-toggle="tooltip" data-bs-placement="bottom" title="To activate the contract, please ensure all required data is filled out.">
        <button type="button" disabled class="contract-activate-button btn btn-success">Activate Contract</button>
    </span>
    <?php
    if (isset($id) && $id > 0)
    {
        ?>
    <input type="hidden" name="contract_id_js" id="contract_id_js" value="<?= $id; ?>" />
        <?php
    }
    ?>
</div>