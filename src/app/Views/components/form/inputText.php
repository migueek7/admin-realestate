<?php
$length = isset($data["length"]) ? "length='" . $data['length'] . "'" : "";
$attribute = isset($data["attribute"]) ? $data["attribute"][0] . "='" . $data['attribute'][1] . "'" : "";
$required = isset($data["required"]) ? $data["required"] : "";
$type = isset($data["type"]) ? $data["type"] : "text";
?>
<div class="md-form form">
    <?= isset($data["icon"]) ? $data["icon"] : null; ?>
    <input type="<?= $type; ?>" id="<?= $data["id"] ? $data["id"] : null ?>" class="form-control form" <?= $length ?> value="<?= isset($data["value"]) ? $data["value"] : ''; ?>" <?= $attribute ?> <?= $required ? "required" : '' ?>>
    <label class="form-check-label" for="<?= $data["id"] ? $data["id"] : null ?>"><?= $data["text"]; ?></label>
</div>