<?php
$select = isset($data["value"]) ? $data['value'] : "";
// echo $select;
// print_r($data["data"]);
$roles = isset($data["roles"]) ? true : false;
$id = $data["nameid"];
?>

<select id="<?= $data["id"] ? $data["id"] : null ?>" class="mdb-select form" <?= $data["required"] ? "required" : null ?>>
    <option value="" disabled selected="<?= $select == "" ? true : false ?>">
        <?= $data["optionTitle"] ?>
    </option>

    <?php foreach ($data["data"] as $value) :
        if ($select != "" && $select == $value[$id]) : ?>

            <option value="<?= $value[$id] ?>" selected>
                <?= $value[$data['text']] ?> <?= $roles ? " - " . $value['name_rol'] : null; ?>
            </option>

        <?php else : ?>

            <option value="<?= $value[$id] ?>">
                <?= $value[$data['text']] ?> <?= $roles ? " - " . $value['name_rol'] : null; ?>
            </option>

    <?php
        endif;
    endforeach;
    ?>
</select>