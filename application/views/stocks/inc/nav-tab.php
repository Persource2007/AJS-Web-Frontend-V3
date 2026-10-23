<div class="d-flex profile-wrapper">
    <!-- Nav tabs -->
    <ul class="client-sub-nav nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1 pt-0" role="tablist">
        <?php
        if (isset($id) && $id > 0) {
            $title = $title ?? '';
            $enc_id = hash_encode($id);

            $tabs = [[
                'title' => 'Stock',
                'url'   => base_url('stock/details/' . $enc_id)
                ], [
                'title' => 'Suppliers',
                'url'   => base_url('stock/suppliers/' . $enc_id)
                // ], [
                // 'title' => 'Short Shipments',
                // 'url'   => base_url('stock/parts/' . $enc_id)
                // ], [
                // 'title' => 'Damaged Goods',
                // 'url'   => base_url('stock/orders/' . $enc_id)
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
                    <a class="nav-link fs-14 active" href="<?= base_url('stock/create') ?>" role="tab">
                        <i class="ri-airplay-fill d-inline-block d-md-none"></i> <span class="d-none d-md-inline-block">Stock</span>
                </a>
            </li>
        <?php } ?>
    </ul>
</div>