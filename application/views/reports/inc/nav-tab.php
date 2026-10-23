<div class="d-flex profile-wrapper">
    <!-- Nav tabs -->
    <ul class="client-sub-nav nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1 pt-0" role="tablist">
        <?php
        if (isset($id) && $id > 0) {
            $title = $title ?? '';
            $enc_id = hash_encode($id);

            $tabs = [[
                'title' => 'Supplier',
                'url'   => base_url('supplier/details/' . $enc_id)
                ], [
                'title' => 'Part & Equipments',
                'url'   => base_url('supplier/part-and-equipments/' . $enc_id)
            ], [
                'title' => 'Purchase Orders',
                'url'   => base_url('supplier/purchase-orders/' . $enc_id)
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
                    <a class="nav-link fs-14 active" href="<?= base_url('supplier/create') ?>" role="tab">
                        <i class="ri-airplay-fill d-inline-block d-md-none"></i> <span class="d-none d-md-inline-block">Supplier</span>
                </a>
            </li>
        <?php } ?>
    </ul>
</div>