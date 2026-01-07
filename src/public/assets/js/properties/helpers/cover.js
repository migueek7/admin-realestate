import Helpers from '../../helpers.js';

export default class CoverHelper {

    constructor() {
        this.helpers = new Helpers();
    }
    /* -------------------------------------------------------------------------- */
    /*                          CAMBIAR IMAGEN DEL UPLOAD                         */
    /* -------------------------------------------------------------------------- */
    coverInit(rutas) {

        const datosImagen = document.querySelectorAll('.datosImagen');

        datosImagen.forEach(cover => {
            cover.addEventListener('change', (e) => {
                console.log('cambiaste imagen', e.target);

                let imagePortada = e.target.files;
                let imagen = imagePortada[0];

                const imgPortada = e.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('imgPortada')[0];
                const respuestaFoto = e.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('respuestaFoto')[0];

                /* ------------------------ Validar formato de imagen ----------------------- */

                if (imagen["type"] == "image/jpeg" ||
                    imagen["type"] == "image/jpg" ||
                    imagen["type"] == "image/png" ||
                    imagen["type"] == "image/webp"
                ) {
                    $(".alert").remove();
                } else {
                    $(".alert").remove();
                    cover.value = "";
                    respuestaFoto.innerHTML = `
                        <div class="alert alert-danger" role="alert">
                            <i class="fas fa-exclamation-circle"></i>
                            La imagen debe ser JPG o PNG.
                        </div>
                    `;
                    return;
                }

                /* ------------------------ Validar tamaño de imagen ------------------------ */

                let _URL = window.URL || window.webkitURL;
                let img = new Image();
                img.src = _URL.createObjectURL(imagen);

                img.onload = function () {
                    // console.log(img.width + ' ' + img.height);

                    if (img.width < 600 && img.height < 600) {
                        console.log('imagen inferior a 600');
                        $(".alert").remove();
                        cover.value = "";
                        respuestaFoto.innerHTML = `
                            <div class="alert alert-danger" role="alert">
                                <i class="fas fa-exclamation-triangle"></i> 
                                La imagen debe ser mayor a 600px.
                            </div>
                        `;
                        return;
                    } else {
                        $(".alert").remove();
                    }

                    /* ------------------------ Validar peso de la imagen ----------------------- */

                    if (Number(imagen["size"]) > 6000000) {
                        console.log("imagen mayor a 6MB")
                        $(".alert").remove();
                        cover.value = "";
                        respuestaFoto.innerHTML = `
                            <div class="alert alert-warning" role="alert">
                                <i class="far fa-exclamation-circle"></i> 
                                La imagen no debe pesar mas de 6MB.
                            </div>
                        `;
                        return;
                    } else {
                        $(".alert").remove();
                    }

                    /* ---------------------- Previsualizar imagen cargada ---------------------- */

                    let datosImagen = new FileReader;
                    datosImagen.readAsDataURL(imagen);

                    datosImagen.onload = async function (event) {
                        let coverImage = event.target.result;
                        console.log(coverImage);

                        console.log("rutas", rutas);
                        if (rutas[0] == 'update-property') {
                            // comprimimos la imagen para reducir tamaño
                            this.helpers = new Helpers();
                            const compressed = await this.helpers.compressDataUrl(coverImage, 'image/jpeg', 800, 0.7);
                            saveDataPortada(compressed, cover); // guardamos la versión comprimida
                        }

                        let rutaImagen = event.target.result;
                        imgPortada.setAttribute('src', rutaImagen);
                    }

                    const saveDataPortada = (coverImage) => {

                        try {
                            let nameCoverOld = cover.getAttribute('imagen');
                            let arrayData = JSON.parse(localStorage.getItem('dataProperty'));
                            arrayData.cover.delete = nameCoverOld;
                            arrayData.cover.upload = coverImage;
                            console.log(arrayData);
                            localStorage.setItem('dataProperty', JSON.stringify(arrayData));
                        } catch (e) {
                            console.error('Error al guardar en localStorage', e);
                            if (e.name === 'QuotaExceededError' || e.code === 22) {
                                // fallback: subir inmediatamente al servidor o notificar al usuario
                                alert('La imagen es demasiado grande para guardarla localmente. Se subirá al servidor.');
                                // aquí podrías enviar `coverImage` por fetch a tu endpoint de subida
                            }
                        }
                    }
                }
            })
        });
    }
}