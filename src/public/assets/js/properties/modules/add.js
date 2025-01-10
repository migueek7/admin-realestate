import Modules from '../../modules.js';
import Helpers from '../../helpers.js';
import CoverHelper from '../helpers/cover.js';
import DropzoneHelper from '../helpers/dropzone.js';
import ValidateHelper from '../helpers/validate.js';
import GetData from '../helpers/getData.js';
import Category from '../helpers/category.js';

export default class Add {

    constructor(token) {

        this.helpers = new Helpers();
        this.helpers.replicaInput("categoryForm", "categorySlugForm");
        this.helpers.formatInputToSlug("categorySlugForm")
        this.btnSaveText = 'Publicar';

        // Iniciar Dependencias
        this.modules = new Modules();
        this.modules.initTinyMCE("#descriptionForm");
        this.modules.InitMaterialSelect();
        this.modules.materialChipInit("featuresForm");
        this.modules.preventDefaultInputNumber();
        this.modules.cleanInputToNumber("priceForm");
        this.modules.leafletLocationInit();
        this.app = this.modules.app();

        // Helpers
        this.dropzone = new DropzoneHelper();
        this.dropzone.dropzoneInit(this.app);
        this.arrayFile = this.dropzone.getArrayFile;

        this.cover = new CoverHelper();
        this.cover.coverInit(this.modules.getRutas());

        this.validate = new ValidateHelper();
        this.getdata = new GetData();
        this.category = new Category(token);
        // Inicio Predeterminado
        this.displayHomeElement();
        this.btnCancel();
        this.saveProperty(token);
    }


    /* -------------------------------------------------------------------------- */
    /*                       Mostrar Elemento Categoria Casa                      */
    /* -------------------------------------------------------------------------- */
    displayHomeElement() {

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
    }


    /* -------------------------------------------------------------------------- */
    /*                              Guardar Propiedad                             */
    /* -------------------------------------------------------------------------- */
    saveProperty(token) {
        document.getElementById('btnSave').onclick = (e) => {
            e.preventDefault();

            this.helpers.btnLoad('btnSave');

            const validaFormulario = this.validate.validaFormulario("FormInmueble");
            const arrayFile = this.getArrayFile;

            if (validaFormulario) {
                if (!this.validateImages(arrayFile)) return;

                this.modules.checkTokenValidate(token);
                this.saveProcess(token);
            } else {
                Swal.fire(
                    `¡Datos Incompletos!`,
                    `Por favor rellena los campos obligatorios`,
                    `error`
                ).then((result) => {
                    this.helpers.buttonStatus('btnSave', false, this.btnSaveText);
                });
            }
        }
    }

    async saveProcess(token) {
        let formData = new FormData();
        const datosForm = this.getdata.getDataForm();
        console.log("datosForm>>", datosForm);
        const arrayFile = this.arrayFile;

        Object.entries(datosForm).forEach((element, index) => {
            formData.append(element[0], element[1]);
        });

        for (let i = 0; i < arrayFile.length; i++) {
            formData.append("images[]", arrayFile[i]);
        }
        console.log('formData>>', formData);
        try {
            const response = await fetch(this.app.apirest_url + "/property/", {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
                body: formData,
                redirect: 'follow'
            });

            if (!response.ok) throw response;
            const json = await response.json();
            const href = this.app.base_url + "/properties";
            console.log("status", json.status)
            if (json.status == "Created") {
                console.log("Excelente!!")
                this.helpers.showSuccessAlert(json, href);
            }

        } catch (error) {
            console.log(error);
            // comprobar si error traia un json
            if (typeof error === 'object') {
                this.helpers.showErrorAlert(error);
            } else {
                const json = await error.json();
                this.helpers.showErrorAlert(json);
            }
            // console.log("error>>", error);
            // this.helpers.showErrorAlert(error);
            this.helpers.buttonStatus('btnSave', false, this.btnSaveText);
        } finally {
            this.helpers.buttonStatus('btnSave', false, this.btnSaveText);
        }
    }

    /* -------------------------------------------------------------------------- */
    /*                             Cancelar Propiedad                             */
    /* -------------------------------------------------------------------------- */
    btnCancel() {
        document.getElementById('btnCancelInmueble').addEventListener('click', () => {
            Swal.fire({
                icon: 'warning',
                title: '¿Deseas cancelar esta publicación?',
                showCancelButton: true,
                cancelButtonText: "No",
                confirmButtonText: "Si",
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
            }).then((result) => {
                if (result.isConfirmed) {
                    location.href = this.app.base_url + "/properties";
                }
            });
        });
    }

    /* -------------------------------------------------------------------------- */
    /*                              Validar Imagenes                              */
    /* -------------------------------------------------------------------------- */

    validateImages() {
        const arrayFile = this.arrayFile
        if (arrayFile.length == 0) {
            Swal.fire("¡No agregaste imagenes!", "¡Debes agregar al menos 1 imagen del inmueble!", "warning", {
                button: "Aceptar",
            });
            this.helpers.buttonStatus('btnSave', false, this.btnSaveText);
            return false;
        } else {
            return true;
        }
    }
}