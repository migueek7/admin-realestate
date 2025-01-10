import {
    app,
    rutas,
    getCategories,
    getStatus,
    getToken,
    getBase64,
    validaFormulario
} from "./modules2.js";

console.log(rutas());

/* -------------------------------------------------------------------------- */
/*                           TinyMCE Initialization                           */
/* -------------------------------------------------------------------------- */
tinymce.init({
    selector: '#descriptionForm',
    menubar: false,
    height: "294",
    plugins: [
        'advlist autolink lists link image charmap print preview anchor textcolor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table contextmenu paste code help wordcount'
    ],
});

/* -------------------------------------------------------------------------- */
/*                       Material Select Initialization                       */
/* -------------------------------------------------------------------------- */

$(document).ready(function () {
    $('.mdb-select').materialSelect({
        validate: true
    });
});


/* -------------------------------------------------------------------------- */
/*                        Activa o Desactiva Propiedad                        */
/* -------------------------------------------------------------------------- */

// document.getElementById('statuForm').addEventListener('change', (e) => {
//     console.log(e.target.value);

//     if (e.target.value == "on") {
//         document.getElementById('statuForm').value = "off"
//         document.getElementById('visibilidad').textContent = "Publica";
//     } else {
//         document.getElementById('statuForm').value = "on"
//         document.getElementById('visibilidad').textContent = "Privada";
//     }
// });

/* -------------------------------------------------------------------------- */
/*                             Destacar Propiedad                             */
/* -------------------------------------------------------------------------- */

// document.getElementById('featuredForm').addEventListener('change', (e) => {
//     console.log(e.target.value);

//     if (e.target.value == "on") {
//         document.getElementById('featuredForm').value = "off"
//     } else {
//         document.getElementById('featuredForm').value = "on"
//     }
// });

/* -------------------------------------------------------------------------- */
/*                      Valor Predeterminado de Imagenes                      */
/* -------------------------------------------------------------------------- */
let dataImages = {
    images: [{
        upload: [],
        delete: [],
        update: []
    }]
};

localStorage.setItem("images", JSON.stringify(dataImages));


/* -------------------------------------------------------------------------- */
/*            Evitar el Evento Submit la hacer lick en Input Number           */
/* -------------------------------------------------------------------------- */
$(".minus").on("click", function (e) {
    e.preventDefault();
});

$(".plus").on("click", function (e) {
    e.preventDefault();
});


/* -------------------------------------------------------------------------- */
/*                                  DROPZONE                                  */
/* -------------------------------------------------------------------------- */
// arrayFiles no puede guardar es localStorage porque pierde sus propiedades de Image File
const arrayFiles = [];
const minImageWidth = 999, minImageHeight = 665;
Dropzone.autoDiscover = false;

$(".dropzone").dropzone({
    url: app.base_url + "/add-property/",
    autoProcessQueue: true,
    addRemoveLinks: true,
    acceptedFiles: "image/jpeg, image/png",
    maxFilesize: 5,
    maxFiles: 15,
    preventDuplicates: true,
    // before: function () {
    //     $("#previews").append("cargando...");
    // },
    init: function () {
        this.on("addedfile", function (file) {
            arrayFiles.push(file);
            console.log("arrayFiles", arrayFiles);
            //localStorage.setItem("arrayFiles", JSON.stringify(arrayFiles));
            // return arrayFiles;
        });
        this.on("removedfile", function (file) {
            let index = arrayFiles.indexOf(file);
            arrayFiles.splice(index, 1);
            console.log("arrayFiles", arrayFiles);
            //localStorage.setItem("arrayFiles", JSON.stringify(arrayFiles));
            //return arrayFiles;
        });
        this.on("thumbnail", function (file) {
            if (file.width < minImageWidth || file.height < minImageHeight) {
                file.rejectDimensions();
                document.querySelector(".respuestaDropzone").innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>¡ERROR!</strong> La imagen debe ser mayor a 1000px * 666px.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
            }
            else {
                file.acceptDimensions();
                $(".alert").remove();
            }
        });
    },
    accept: function (file, done) {
        file.acceptDimensions = done;
        file.rejectDimensions = function () { done("Imagen menor a " + minImageWidth + "px * " + minImageHeight + "px"); };
    }
});

/* -------------------------------------------------------------------------- */
/*                               Material Chips                               */
/* -------------------------------------------------------------------------- */
const featuresInitConfig = () => {

    $(document).ready(() => {
        /* -------------------------- Iniciar materialChip -------------------------- */

        if (document.getElementById('featuresForm').value != "") {
            console.log(JSON.parse(document.getElementById('featuresForm').value));
            let tags = JSON.parse(document.getElementById('featuresForm').value);
            $('.chips-initial').materialChip({
                data: tags,
                placeholder: '+Agregar',
                secondaryPlaceholder: '+Caracteristicas',
            });
        } else {
            $('.chips-initial').materialChip({
                placeholder: '+Agregar',
                secondaryPlaceholder: '+Caracteristicas',
            });
        }


        /* -------------------- Agregar etiquetas a la propiedad -------------------- */

        $('.chips').on('chip.add', function (e, chip) {
            let features = $('.chips-initial').materialChip('data');
            console.log("features", features);

            let datos = [];
            let cantidades = document.querySelectorAll('.chip');

            for (let i = 0; i < cantidades.length; i++) {
                datos.push(cantidades[i].textContent);
            }
            //console.log('caracteristicas', datos);
            var peticion = JSON.stringify(features);
            // JSON.stringify(value: any, replacer?: any, space?: any)
            $("#featuresForm").val(peticion);
        });

        /* ------------------- Eliminar etiquetas de la propiedad ------------------- */

        $('.chips').on('chip.delete', function (e, chip) {
            let features = $('.chips-initial').materialChip('data');
            console.log("features", features);
            let datos = [];
            let cantidades = document.querySelectorAll('.chip');

            for (let i = 0; i < cantidades.length; i++) {
                datos.push(cantidades[i].textContent);
            }
            console.log('featuresForm', datos);
            var peticion = JSON.stringify(features);
            $("#featuresForm").val(peticion);
        });

    });
}
featuresInitConfig();


/* -------------------------------------------------------------------------- */
/*                       Mostrar Elemento Categoria Casa                      */
/* -------------------------------------------------------------------------- */
document.getElementById('categoriesForm').addEventListener('change', () => {
    let category = document.getElementById('categoriesForm').value;
    if (category == 1 || category == 2 || category == 3) {
        document.querySelector('.inputNumber').classList.add("show", "mt-5", "my-md-3");
    } else {
        document.querySelector('.inputNumber').classList.remove("show", "mt-5", "my-md-3");

        document.querySelector('.inputNumber').children.forEach(element => {
            element.children[1].getElementsByClassName('quantity')[0].value = 0;
        });
    }
});


/* -------------------------------------------------------------------------- */
/*                              Listat Categorias                             */
/* -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', async () => {

    const listCategories = async () => {

        const Categories = await getCategories();
        let optionCategories = '<option value="">Seleccionar Categoría</option>';

        Array.from(Categories).forEach(element => {
            optionCategories += `<option value="${element.id}">${element.category}</option>`;
        });
        document.getElementById('categoriesForm').innerHTML = optionCategories;
    }

    const listStatus = async () => {

        const Status = await getStatus();
        let optionStatus = '<option value="">Seleccionar Status</option>';

        Array.from(Status).forEach(element => {
            optionStatus += `<option value="${element.id}">${element.status}</option>`;
        });
        document.getElementById('statusForm').innerHTML = optionStatus;
    }

    //await Promise.all([listCategories(), listStatus()]);
});


/* -------------------------------------------------------------------------- */
/*                             Cancelar Propiedad                             */
/* -------------------------------------------------------------------------- */
document.getElementById('btnCancelInmueble').addEventListener('click', () => {
    Swal.fire({
        icon: 'warning',
        title: '¿Deseas cancelar este registro?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    }).then((result) => {
        if (result.isConfirmed) {
            location.href = app.base_url + "/properties";
        }
    });
});


/* -------------------------------------------------------------------------- */
/*                             VALIDAR FORMULARIO                             */
/* -------------------------------------------------------------------------- */
document.getElementById('btnAddInmueble').addEventListener('click', (e) => {
    e.preventDefault();

    if (validaFormulario()) {
        console.log("todo bien");
        rutas()[0] == "add-property" ? addProperty() : updateProperty();

    } else {
        Swal.fire(
            `Error`,
            `Por favor rellena los campos obligatorios`,
            `error`
        ).then((result) => {
            document.getElementById('btnAddInmueble').disabled = false;
        });
    }
});


/* -------------------------------------------------------------------------- */
/*                              Validar Imagenes                              */
/* -------------------------------------------------------------------------- */

const validateImages = () => {
    // let arrayFiles = JSON.parse(localStorage.getItem("arrayFiles"));
    if (arrayFiles.length == 0) {
        Swal.fire("¡No agregaste imagenes!", "¡Debe agregar al menos 1 imagen del inmueble!", "warning", {
            button: "Aceptar",
        });
        document.getElementById('btnAddInmueble').disabled = false;
        return false;
    } else {
        return true;
    }
}

/* -------------------------------------------------------------------------- */
/*                        Obtener Datos del Formulario                        */
/* -------------------------------------------------------------------------- */
const getDataForm = () => {

    const dataForm = {
        "title": document.getElementById('titleForm').value.trim(),
        "extract": document.getElementById('extractForm').value.trim(),
        "city": document.getElementById('cityForm').value.trim(),
        "suburb": document.getElementById('suburbForm').value.trim(),
        "street": document.getElementById('streetForm').value.trim(),
        "type_id": document.getElementById('categoriesForm').value.trim(),
        "status_id": document.getElementById('statusForm').value.trim(),
        "price": document.getElementById('priceForm').value.trim(),
        "currency_id": document.getElementById('currencyForm').value.trim(),
        "featured": document.getElementById('featuredForm').checked ? 1 : 0,
        "status": document.getElementById('statuForm').checked ? 1 : 0,
        "bedrooms": document.getElementById('bedroomsForm').value.trim(),
        "bathrooms": document.getElementById('bathroomsForm').value.trim(),
        "garage": document.getElementById('garageForm').value.trim(),
        "floor": document.getElementById('floorForm').value.trim(),
        "url_video": String(document.getElementById('videoForm').value.trim()),
        "land": document.getElementById('landForm').value.trim(),
        "construction": document.getElementById('constructionForm').value.trim(),
        "agent_id": document.getElementById('agent_id').value.trim(),
        "features": document.getElementById('featuresForm').value.trim(),
        "description": tinymce.get("descriptionForm").getContent().trim(),
        "image": document.getElementById('datosImagen').files[0]
    }
    return dataForm;
}

/* -------------------------------------------------------------------------- */
/*                           Agregar Nueva Propiedad                          */
/* -------------------------------------------------------------------------- */
const addProperty = async () => {
    console.log("hola desde addProperty");
    if (!validateImages()) return;

    let formData = new FormData();
    const datosForm = getDataForm();
    Object.entries(datosForm).forEach((element, index) => {
        formData.append(element[0], element[1]);
    });

    for (let i = 0; i < arrayFiles.length; i++) {
        formData.append("images[]", arrayFiles[i]);
    }

    try {
        const token = await getToken();
        const response = await fetch(app.apirest_url + "/property/", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            body: formData,
            redirect: 'follow'
        });

        if (!response.ok) throw await response.json();

        const res = await response.json();

        Swal.fire(
            '¡Exito!',
            `${res.message}`,
            `${res.status}`
        ).then((result) => {
            location.href = app.base_url + "/properties";
        });

    } catch (error) {
        Swal.fire(
            `${error.status}`,
            `${error.message}`,
            `${error.status}`
        ).then((result) => {
            document.getElementById('btnAddInmueble').disabled = false;
        });
    }
}


/* -------------------------------------------------------------------------- */
/*                              Eliminar Imagenes                             */
/* -------------------------------------------------------------------------- */
const deleteImages = () => {

    // localStorage.getItem("images");
    console.log(JSON.parse(localStorage.getItem("images")));

    const btnDeleteImage = document.querySelectorAll('.remove_image');

    //let deleteImg = [{ delete: [] }];
    let data = JSON.parse(localStorage.getItem("images"));
    console.log(data.images[0].delete);

    btnDeleteImage.forEach(element => {

        element.addEventListener('click', (e) => {
            e.preventDefault();
            data.images[0].delete.push(e.target.getAttribute("image"));
            localStorage.setItem("images", JSON.stringify(data));
            console.log(JSON.parse(localStorage.getItem("images")));
            e.target.parentElement.remove();
        })
    });

}
deleteImages();




/* -------------------------------------------------------------------------- */
/*                      Detectar cambios en el formulario                     */
/* -------------------------------------------------------------------------- */
// let formElements = document.getElementById('FormInmueble').elements;

// const updateFormElements = [];
// formElements.forEach(element => {
//     if (element.classList.contains("form")) {
//         console.log("contiene form");
//         element.addEventListener('change', () => {
//             console.log("el elemento ", element, "cambio");
//             updateFormElements.push([element.id, element.value]);
//             console.log("update", updateFormElements);
//         });
//     } else {
//         console.log("no contiene form");
//     }
// });


/* -------------------------------------------------------------------------- */
/*                          CAMBIAR IMAGEN DEL UPLOAD                         */
/* -------------------------------------------------------------------------- */

document.getElementById('datosImagen').addEventListener('change', () => {
    console.log('cambiaste imagen');

    let imagePortada = document.getElementById("datosImagen").files;
    let imagen = imagePortada[0];
    console.log(imagen);

    /* ------------------------ Validar formato de imagen ----------------------- */

    console.log(imagen["type"]);

    if (imagen["type"] == "image/jpeg" || imagen["type"] == "image/jpg" || imagen["type"] == "image/png") {
        $(".alert").remove();
    } else {
        $(".alert").remove();
        $("#datosImagen").val("");
        document.getElementById('respuestaFoto').innerHTML = `
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

        console.log(img.width + ' ' + img.height);

        if (img.width < 600 && img.height < 600) {
            $(".alert").remove();
            $("#datosImagen").val("");
            document.getElementById('respuestaFoto').innerHTML = `
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

        if (Number(imagen["size"]) > 3000000) {
            $(".alert").remove();
            $("#datosImagen").val("");
            document.getElementById('respuestaFoto').innerHTML = `
                <div class="alert alert-warning" role="alert">
                    <i class="far fa-exclamation-circle"></i> 
                    La imagen no debe pesar mas de 2MB.
                </div>
             `;
            return;
        } else {
            $(".alert").remove();
        }

        /* ---------------------- Previsualizar imagen cargada ---------------------- */

        let datosImagen = new FileReader;
        datosImagen.readAsDataURL(imagen);
        $(datosImagen).on("load", function (event) {
            let rutaImagen = event.target.result;
            $("#imgPortada").attr("src", rutaImagen);
        });

    }

});
