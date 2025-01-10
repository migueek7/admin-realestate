<?php
    $descripcion = isset($data["value"]) ? $data['value'] : "";
?>
<div class="md-form">
    <?=isset($data["icon"]) ? $data["icon"] : null; ?>
    <textarea type="text" id="<?=$data["id"] ? $data["id"] : null?>" <?=isset($data["length"]) ? "length='".$data['length']."'" : ""?> 
    class="md-textarea form-control form" rows="2" <?=$data["required"] ? "required" : ""?>><?=$descripcion;?></textarea>
    <label class="form-check-label" for="<?=$data["id"] ? $data["id"] : null?>">
        <?=$data["text"];?>
    </label>
</div>