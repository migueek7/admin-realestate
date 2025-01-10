<?php
$checked = isset($data["value"]) && $data["value"] == 1 ? "checked" : "";
?>
<div class="switch">
    <small class="form-text text-muted"><?= $data["text"] ?></small>
    <label>
        <?= $data["label1"] ?>
        <input type="checkbox" class="form" <?= $data["checked"] ? "checked='checked'" : null ?> id="<?= $data["id"] ?>" <?= $checked ?>>
        <span class="lever"></span> <?= $data["label2"] ?>
    </label>
</div>