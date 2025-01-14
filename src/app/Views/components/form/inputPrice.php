<?php
$length = isset($data["length"]) ? "length='" . $data['length'] . "'" : "";
$attribute = isset($data["attribute"]) ? $data["attribute"][0] . "='" . $data['attribute'][1] . "'" : "";
$required = isset($data["required"]) ? $data["required"] : "";
?>
<div class="md-form form">
    <?= isset($data["icon"]) ? $data["icon"] : null; ?>
    <input
        type="text"
        id="<?= $data["id"] ? $data["id"] : null ?>"
        class="form-control form" <?= $length ?>
        value="<?= isset($data["value"]) ? $data["value"] : ''; ?>"
        data-mask="000,000,000" data-mask-reverse="true"
        <?= $attribute ?>
        <?= $required ? "required" : '' ?>>
    <label class="form-check-label" for="<?= $data["id"] ? $data["id"] : null ?>"><?= $data["text"]; ?></label>
</div>