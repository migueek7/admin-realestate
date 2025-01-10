<?php
if (isset($data["value"])) {
    $value = $data["value"];
} else {
    $value = 0;
}
if (isset($data["step"])) {
    $step = "step='.5'";
} else {
    $step = "";
}
?>
<div class="float-left">
    <label class="form-text text-muted""><?= $data["label"] ?></label>
    <div class=" def-number-input number-input safari_only">
        <button onclick="this.parentNode.querySelector('input[type=number]').stepDown()" class="minus"></button>
        <input id="<?= $data["id"] ?>" class="quantity form" min="0" <?= $step ?> value="<?= $value ?>" type="number" <?= $data["required"] ? "required" : null ?>>
        <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()" class="plus"></button>
</div>
</div>