<?php $sub_title = $sub_title ?? '' ?>
<div class="row">
    <div class="col-12">
        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
            <div class="page-title-right">
                <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item active"><a href="javascript: void(0);"><h4 class="mb-sm-0">Purchase Orders</h4></a></li>
                </ol>
            </div>

            <div class="page-title-right">
                <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">Purchase Orders</li>
                    <?php if($sub_title) { ?>
                    <li class="breadcrumb-item active"><?= $sub_title; ?></li>
                    <?php } ?>
                </ol>
            </div>
        </div>
    </div>
</div>