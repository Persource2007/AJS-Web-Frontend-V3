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
                    'url'   => base_url('contract/dashboard/' . $enc_id . '?detail=y')
                ],
                [
                    'title' => 'Overview',
                    'url'   => base_url('contract/details/' . $enc_id)
                ],
                [
                    'title' => 'PPM Masterplan List',
                    'url'   => base_url('contract/master-plan-view/' . $enc_id . '?detail=y')
                ],
                [
                    'title' => 'Contract SORs',
                    'url'   => base_url('contract/sors/' . $enc_id . '?detail=y')
                ],
                [
                    'title' => 'Contract Finance',
                    'url'   => base_url('contract/selling-and-billing/' . $enc_id . '?detail=y')
                ],
                [
                    'title' => 'Framework Commission',
                    'url'   => base_url('contract/commissions/' . $enc_id. '?detail=y')
                ],
                // [
                //     'title' => 'Uplifts',
                //     'url'   => base_url('contract/uplifts/' . $enc_id . '?detail=y')
                // ]
            ];

            foreach ($tabs as $tab)
            {
                ?>
        <li class="nav-item">
                    <a class="nav-link fs-14 <?= $title == $tab['title'] ? 'active' : ''; ?>" href="<?= $tab['url'] ?>" role="tab">
                        <i class="ri-airplay-fill d-inline-block d-md-none"></i> <span class="d-none d-md-inline-block"><?= $tab['title'] ?></span>
                    </a>
                </li>
                <?php
            }
        }
        ?>
    </ul>
    <?php
    if (isset($id) && $id > 0)
    {
        ?>
    <input type="hidden" name="contract_id_js" id="contract_id_js" value="<?= $id; ?>" />
        <?php
    }
    ?>
</div>