<?php
    $checked = isset($data["value"]) && $data["value"] == 1 ? "checked" : "";
?>
<fieldset class="form-check">
    <input class="form-check-input" type="checkbox" id="<?=$data["id"] ? $data["id"] : null?>" <?=$checked?>>
    <label class="form-check-label" for="<?=$data["id"] ? $data["id"] : null?>"><?=$data["label"]?></label>
</fieldset>