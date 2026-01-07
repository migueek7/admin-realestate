export default class Helpers {

    btnLoad(id) {
        let loadBtn = `
            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        `;
        document.getElementById(id).innerHTML = loadBtn;
        document.getElementById(id).disabled = true;
    }

    getRutas() {
        //let route = location.pathname.slice(0, -1)
        let url = location.pathname.slice(1);
        let route = [];
        if (url.split('/')) {
            route = url.split('/');
        } else {
            route[0] = url;
        }
        return route;
    }

    OnlyNumberInput(id) {
        $("#", id).on({
            keyup: function () {
                console.log("press key");
                // formatNumber($(this));
                this.value.match(/\D/)
                let newValue = this.value.replace(/\D/g, '');
                console.log(newValue);
                this.value = newValue;
            }
        });
    }

    Slugify(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')         // Reemplaza los espacios en blanco con guiones
            .replace(/ñ/g, 'n')           // Reemplaza las letras "ñ" con "n"
            .normalize('NFD')             // Normaliza los caracteres a su forma canónica decomposed
            .replace(/[^\w\-]+/g, '')     // Remueve caracteres especiales
            .replace(/\-\-+/g, '-')       // Remueve guiones dobles
            .replace(/^-+/, '')           // Remueve guiones al principio
        //.replace(/-+$/, '');          // Remueve guiones al final
    }

    updateSelectCategories(category, id_category) {
        console.log("updateSelectCategories");
        let select = document.getElementById("categoriesForm");
        let opcion = new Option(category, id_category);
        select.add(opcion);
    }

    buttonStatus(button, status, html = null) {
        if (typeof button === 'string') {
            document.getElementById(button).disabled = status;
            if (html != null) document.getElementById(button).innerHTML = html;
        } else {
            button.disabled = status;
            if (html != null) button.innerHTML = html;
        }
    }

    formatInputToSlug(idInput) {
        let input = document.getElementById(idInput);
        input.addEventListener("input", (e) => {
            input.value = this.Slugify(input.value);
        });
    }

    replicaInput(input1id, input2id) {
        let input1 = document.getElementById(input1id);
        let input2 = document.getElementById(input2id);

        input1.addEventListener("input", () => {
            input2.parentElement.getElementsByTagName("label")[0].classList.add("active");
            input2.value = this.Slugify(input1.value);
        });
    }
    showErrorAlert(error, href = null) {
        console.log("error", error)
        console.log("typeof error", typeof error)
        Swal.fire({
            icon: 'error',
            title: "Error",
            text: error.message ? error.message : "Se produjo un error desconocido.",
            confirmButtonText: 'Cerrar'
        }).then((result) => {
            if (href != null) {
                window.location = href;
            }
        });
    }
    showSuccessAlert(json, href = null) {
        Swal.fire({
            icon: 'success',
            title: '¡Exito!',
            text: json.message ? json.message : "La Operacion se realizó correctamente",
            confirmButtonText: 'Cerrar'
        }).then((result) => {
            if (href != null) {
                window.location = href;
            }
        });
    }
    resetFormAndValidation(nameFormId) {
        // Restablecer el formulario utilizando el método reset()

        const form = document.getElementById(nameFormId);

        form.reset();

        // Eliminar las clases de validación y los estilos de los elementos del formulario
        const formInputs = form.querySelectorAll('.form-control');
        for (let input of formInputs) {
            input.classList.remove('is-valid', 'is-invalid');
        }

        // Eliminar las clases de validación y los estilos de los elementos de validación personalizados (si los hay)
        const formValidationFeedbacks = form.querySelectorAll('.valid-feedback, .invalid-feedback');
        for (let feedback of formValidationFeedbacks) {
            feedback.style.display = 'none';
        }
    }

    async procesarError(response) {
        if (!response.ok) {
            const json = await response.json();
            throw {
                status: json.status || response.status,
                statusText: response.statusText,
                message: json.message,
            };
        }
    }


    getAlert(error, tipo, texto) {
        //Iconos
        let icono;
        if (tipo == "success") icono = "fa-check-circle";
        if (tipo == "warning") icono = "fa-exclamation-circle";
        if (tipo == "danger") icono = "fa-exclamation-triangle";

        //Tipo: success, warning, danger
        const alert = `
            <div class="alert alert-${tipo} animated fadeInUp" role="alert">
                <div class="d-flex align-items-center">
                    <i class="far ${icono} h4 m-0 pr-2"></i> 

                    <div>
                        <strong class="text-capitalize">${error ? error : ''} </strong> ${texto}
                    </div>

                    <button type="button" class="close ml-auto" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
               
            </div>
        `;
        return alert;
    }

    async compressDataUrl(dataUrl, mime = 'image/jpeg', maxWidth = 1024, quality = 0.85) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
            let width = img.width;
            let height = img.height;
            if (width > maxWidth) {
                height = Math.round(height * (maxWidth / width));
                width = maxWidth;
            }
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            const newDataUrl = canvas.toDataURL(mime, quality);
            resolve(newDataUrl);
            };
            img.src = dataUrl;
        });
    }
}
