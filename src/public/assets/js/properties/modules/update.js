import Modules from '../../modules.js';
import Helpers from '../../helpers.js';
import CoverHelper from '../helpers/cover.js';
import DropzoneHelper from '../helpers/dropzone.js';
import ValidateHelper from '../helpers/validate.js';
import GetData from '../helpers/getData.js';
import Category from '../helpers/category.js';

// Función para iniciar la base de datos IndexedDB
async function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open("MyDatabase", 1);

        request.onupgradeneeded = event => {
            const db = event.target.result;
            const objectStore = db.createObjectStore("dataProperty", { keyPath: "id" });
            objectStore.createIndex("images", "images", { unique: false });
        };

        request.onsuccess = event => {
            resolve(event.target.result);
        };

        request.onerror = event => {
            reject("Error al abrir la base de datos");
        };
    });
}


async function clearDatabase() {
    try {
        const db = await openDatabase();
        const transaction = db.transaction("dataProperty", "readwrite");
        const objectStore = transaction.objectStore("dataProperty");
        objectStore.clear();
        await transaction.complete;
        console.log("Database cleared successfully");
    } catch (error) {
        console.error("Error clearing database:", error);
    }
}


async function getImagesUploadIndexedDB() {
    const db = await openDatabase();
    const transaction = db.transaction(["dataProperty"], "readonly");
    const objectStore = transaction.objectStore("dataProperty");

    let storedData = await new Promise(resolve => {
        const request = objectStore.get(1);
        request.onsuccess = event => {
            resolve(event.target.result);
        };
    });

    let requestData = null;
    if (storedData && storedData.images && storedData.images.upload.length > 0) {
        requestData = {
            images: storedData.images.upload
        };
    }
    if (requestData != null) {
        return requestData
    } else {
        return null
    }
}

export default class Update {

    constructor(token) {

        clearDatabase();

        // Limpiar localstorage
        localStorage.removeItem("dataProperty");

        const dataProperty = {
            features: {
                insert: [],
                delete: []
            },
            cover: {
                delete: "",
                upload: [],
            },
            images: {
                upload: [],
                delete: [],
                update: []
            },
            address: {
                city: document.getElementById('cityForm').value.trim(),
                suburb: document.getElementById('suburbForm').value.trim(),
                street: document.getElementById('streetForm').value.trim(),
                coordinates: document.getElementById('coordinatesForm').value.trim()
            }
        }
        console.log("dataProperty", dataProperty);
        localStorage.setItem("dataProperty", JSON.stringify(dataProperty));

        this.helpers = new Helpers();
        this.helpers.replicaInput("categoryForm", "categorySlugForm");
        this.helpers.formatInputToSlug("categorySlugForm")
        this.btnSaveText = 'Publicar';

        // Iniciar Dependencias
        this.modules = new Modules();
        this.modules.initTinyMCE("#descriptionForm");
        this.modules.InitMaterialSelect();
        this.modules.initDatepicker();
        this.modules.materialChipInit("featuresForm");
        this.modules.preventDefaultInputNumber();
        this.app = this.modules.app();
        this.folder = this.app.folder;

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
        this.changeOrderImages();
        this.deleteImages();
        this.btnCancel();

        // this.setDataAddress(dataProperty);
        this.setDataImages(dataProperty);

        this.updateProperty(token);

        /* -------------------------------- ADDREESS -------------------------------- */
        this.cityFormChange();
        this.suburbFormChange();
        this.streetFormChange();
        this.coordinatesFormChange();

        /* --------------------------------- STATUS --------------------------------- */

        this.statusFormChange();
    }
    /* -------------------------------------------------------------------------- */
    /*                        Obtener Imagenes Para Subir                         */
    /* -------------------------------------------------------------------------- */
    // Función para guardar datos en IndexedDB
    async setDataImages(dataProperty) {
        try {
            const db = await openDatabase();
            const transaction = db.transaction(["dataProperty"], "readwrite");
            const objectStore = transaction.objectStore("dataProperty");

            let storedData = await new Promise(resolve => {
                const request = objectStore.get(1);
                request.onsuccess = event => {
                    resolve(event.target.result);
                };
            });

            if (!storedData) {
                storedData = { id: 1, images: { upload: [] } };
            }

            if (this.arrayFile.length > 0) {
                for (let i = 0; i < this.arrayFile.length; i++) {
                    const imageDataURL = this.arrayFile[i].dataURL;
                    if (!storedData.images.upload.includes(imageDataURL)) {
                        storedData.images.upload.push(imageDataURL);
                    }
                }
                objectStore.put(storedData);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    cityFormChange() {
        document.getElementById('cityForm').addEventListener('change', (e) => {
            let dataProperty = JSON.parse(localStorage.getItem("dataProperty"));
            let value = e.target.value.trim();
            dataProperty.address.city = value;
            localStorage.setItem("dataProperty", JSON.stringify(dataProperty));
        });
    }

    suburbFormChange() {
        document.getElementById('suburbForm').addEventListener('change', (e) => {
            let dataProperty = JSON.parse(localStorage.getItem("dataProperty"));
            let value = e.target.value.trim();
            dataProperty.address.suburb = value;
            localStorage.setItem("dataProperty", JSON.stringify(dataProperty));
        });
    }

    streetFormChange() {
        document.getElementById('streetForm').addEventListener('change', (e) => {
            let dataProperty = JSON.parse(localStorage.getItem("dataProperty"));
            let value = e.target.value.trim();
            dataProperty.address.street = value;
            localStorage.setItem("dataProperty", JSON.stringify(dataProperty));
        });
    }

    coordinatesFormChange() {
        document.getElementById('coordinatesForm').addEventListener('change', (e) => {
            let dataProperty = JSON.parse(localStorage.getItem("dataProperty"));
            let value = e.target.value.trim();
            dataProperty.address.coordinates = value;
            localStorage.setItem("dataProperty", JSON.stringify(dataProperty));
        });

        $(function () {
            $('#coordinatesForm').leafletLocationPicker({
                alwaysOpen: true,
                mapContainer: "#fixedMapCont"
            }).on('changeLocation', function (e) {
                let dataProperty = JSON.parse(localStorage.getItem("dataProperty"));
                let value = e.target.value.trim();
                dataProperty.address.coordinates = value;
                localStorage.setItem("dataProperty", JSON.stringify(dataProperty));
                console.log("cambio coordinatesForm", value);
            });
        })
    }

    statusFormChange() {
        $('#myMultiselect').on('change', function () {
            var values = $(this).val();
            let dataProperty = JSON.parse(localStorage.getItem("dataProperty"));
            dataProperty.statusMultiple = values;
            console.log("myMultiselect", values)
            localStorage.setItem("dataProperty", JSON.stringify(dataProperty));
        });
    }

    /* -------------------------------------------------------------------------- */
    /*                  Procesar Datos Para Actualizar Propiedad                  */
    /* -------------------------------------------------------------------------- */
    async updateProperty(token) {
        document.getElementById('btnSave').onclick = async (e) => {
            e.preventDefault();

            this.helpers.btnLoad('btnSave');

            this.setDataImages();

            const validaFormulario = this.validate.validaFormulario("FormInmueble");

            if (validaFormulario) {

                this.modules.checkTokenValidate(token);

                let datosForm = this.getdata.getDataForm();
                delete datosForm.image;
                delete datosForm.features;
                delete datosForm.city;
                delete datosForm.suburb;
                delete datosForm.street;

                let dataProperty = JSON.parse(localStorage.getItem("dataProperty"));
                const imagesUpload = await getImagesUploadIndexedDB();
                console.log("imagesUpload", imagesUpload);
                if (imagesUpload != null) {
                    const arrayImagesUpload = imagesUpload.images;
                    console.log("arrayImagesUpload", arrayImagesUpload);
                    dataProperty.images.upload = arrayImagesUpload;
                }
                let images = dataProperty.images;
                let features = dataProperty.features;
                let address = dataProperty.address;
                let imgCover = dataProperty.cover;

                let returnedTarget;
                returnedTarget = Object.assign(datosForm, { "images": images });
                returnedTarget = Object.assign(datosForm, { "features": features });
                returnedTarget = Object.assign(datosForm, { "address": address });
                returnedTarget = Object.assign(datosForm, { "image": imgCover });
                // console.log(returnedTarget);

                this.updateProcess(token, returnedTarget);

            } else {
                Swal.fire(
                    `Error`,
                    `Por favor rellena los campos obligatorios`,
                    `error`
                ).then((result) => {
                    document.getElementById('btnSave').disabled = false;
                    document.getElementById('btnSave').innerHTML = this.btnSaveText;
                });
            }

        }
    }
    /* -------------------------------------------------------------------------- */
    /*                            Actualizar Propiedad                            */
    /* -------------------------------------------------------------------------- */
    async updateProcess(token, returnedTarget) {

        const property_id = this.modules.getRutas()[1];

        try {
            const response = await fetch(this.app.apirest_url + "/property/" + property_id, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json charset=utf-8',
                    'Authorization': 'Bearer ' + token,
                    'Origin': this.app.base_url
                },
                body: JSON.stringify(returnedTarget)
            });
            if (!response.ok) throw response;
            const json = await response.json();
            const href = this.app.base_url + "/properties";
            if (json.status == "OK") this.helpers.showSuccessAlert(json, href);

        } catch (error) {
            console.log(error);
            // comprobar si error traia un json
            if (typeof error === 'object') {
                const json = await error.json();
                this.helpers.showErrorAlert(json);
            } else {
                this.helpers.showErrorAlert(error);
            }
            this.helpers.buttonStatus('btnSave', false, this.btnSaveText);
        } finally {
            this.helpers.buttonStatus('btnSave', false, this.btnSaveText);
        }
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
    /*                             Cancelar Propiedad                             */
    /* -------------------------------------------------------------------------- */
    btnCancel() {
        document.getElementById('btnCancelInmueble').addEventListener('click', () => {
            Swal.fire({
                icon: 'warning',
                text: '¿Quieres descartar los cambios de esta propiedad?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText: 'No',
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem('dataProperty');
                    location.href = this.app.base_url + "/properties";
                }
            });
        });
    }
    /* -------------------------------------------------------------------------- */
    /*                 DETECTA EL CAMBIO DE ORDEN DE LAS IMAGENES                 */
    /* -------------------------------------------------------------------------- */
    changeOrderImages() {
        $("#sortable3").sortable({
            stop: function (event, ui) {

                Number(ui.item.index() + 1);

                let items = event.target.children;
                let data = JSON.parse(localStorage.getItem("dataProperty"));

                let j = 1;
                for (let i = 0; i < items.length; i++) {
                    data.images.update.push({ 'id': Number(items[i].getAttribute('imageid')), 'position': j });
                    j++;
                }
                console.log(data);
                localStorage.setItem("dataProperty", JSON.stringify(data));
            }
        });
    }
    /* -------------------------------------------------------------------------- */
    /*                              Eliminar Imagenes                             */
    /* -------------------------------------------------------------------------- */
    deleteImages() {

        const btnDeleteImage = document.querySelectorAll('.remove_image');

        let data = JSON.parse(localStorage.getItem("dataProperty"));

        btnDeleteImage.forEach(element => {

            element.addEventListener('click', (e) => {
                e.preventDefault();
                data = JSON.parse(localStorage.getItem("dataProperty"));
                data.images.delete.push(e.target.getAttribute("image"));
                localStorage.setItem("dataProperty", JSON.stringify(data));
                e.target.parentElement.remove();
            });
        });
    }
}