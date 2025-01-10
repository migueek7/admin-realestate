<?php
    $features = isset($data) && $data != null ? $data : "";

    if(is_array($features)) {
        $tags = [];
        foreach ($features as $key => $value) 
        {
            array_push($tags, ["tag" => $value["feature"]]);
        }
        $features = json_encode($tags, JSON_OBJECT_AS_ARRAY);
    }
?>

<div>
    <label for="">Ingresar características</label>
    <div class="chips chips-placeholder chips-initial"></div>
</div>

<input type="hidden" id="featuresForm" value='<?=$features?>' delete=''>