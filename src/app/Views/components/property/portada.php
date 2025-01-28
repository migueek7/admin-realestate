<?php
$folder = isset($data["folder"]) ? $data["folder"] : null;
$images = apirest_url() . "/public/" . $folder . "/images/";
$carpeta = $data["carpeta"] . "/";
$cover = isset($data["portada"]) && $data["portada"] != null ? $images . $carpeta . $data["portada"] : $images . $carpeta . "default.jpg";
$idFileInput = isset($data) && $data["id"] != null ? $data["id"] : null;
?>

<img src="<?= $cover ?>" id="imgPortada" class="imgPortada z-depth-1 mb-3 mx-auto img-fluid" alt="Portada" />

<!-- <p class="text-muted"><small>Agrega ó cambia la foto de portada.</small></p> -->
<!-- <div id="respuestaFoto" class="respuestaFoto py-2"></div> -->
<div class="respuestaFoto"></div>

<div class="d-flex justify-content-center">
    <!-- <button class="btn btn-info btn-rounded btn-sm">Subir Foto</button><br> -->

    <div class="file-field">
        <div type="button" class="btn btn-info btn-rounded btn-sm btnCambiarFoto" id="btnCambiarFoto">
            <i class="fas fa-upload"></i>
            <span>Subir Foto</span>
            <input type="file" id="<?= $idFileInput ?>" name="datosImagen" class="datosImagen" imagen="<?= $cover ?>">
        </div>
    </div>

    <!-- <button type="button" class="btn btn-danger btn-rounded btn-sm">Borrar</button> -->
</div>