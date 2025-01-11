import Modules from '../../modules.js';
import Helpers from '../../helpers.js';
import ValidateHelper from '../helpers/validate.js';
// import UpdateFormData from '../helpers/updateFormData.js';
// import GetData from '../helpers/getData.js';

export default class Update {

    constructor(token, table) {

        localStorage.removeItem("photoUser");

        console.log("hola desde update");
        this.modules = new Modules();
        this.app = this.modules.app();
        this.helpers = new Helpers();
        this.table = table;
        this.token = token;
        this.validate = new ValidateHelper();
        // this.getdata = new GetData();
        // this.updateUser(token);
    }

    async getUser(idUser) {

        console.log("idUser", idUser);
        const url = this.app.apirest_url + "/user/" + idUser;

        try {
            // const response = await this.getRequest(url);
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
                // redirect: 'follow'
            });
            if (!response.status) throw response;
            //await this.helpers.procesarError(response);
            const json = await response.json();
            console.log("json", json);
            // this.InitModalUpdate(json, btnEditar);
            return json;

        } catch (error) {
            console.log(error);
            const href = error.statusText == "Unauthorized" ? this.app.base_url + "/log-out" : null;
            const json = error.json();
            this.helpers.showErrorAlert(json, href);
            this.helpers.buttonStatus('btnAddUser', false, "GUARDAR");
        }
    }


    saveOriginalData(json) {
        const datosOriginales = {
            name: json.name,
            puesto: json.puesto,
            email: json.email,
            phone: json.phone,
            password: "",
            rol: Number(json.rol),
            photo: json.photo
        }
        document.getElementById("addUserForm").setAttribute("data-original-data", JSON.stringify(datosOriginales));
    }

    formHanlder(json) {
        const form = document.getElementById("addUserForm");
        json.rol == 1 ? form.elements['rol'].disabled = true : form.elements['rol'].disabled = false;
    }

    resetButtonEdit(button) {
        button.disabled = false;
        button.innerHTML = "<i class='fas fa-edit fa-md'></i>";
    }

    insertUserDataIntoForm(json) {
        const form = document.getElementById("addUserForm");
        form.elements['name'].value = json.name;
        form.elements['puesto'].value = json.puesto;
        form.elements['email'].value = json.email;
        form.elements['phone'].value = json.phone;
        form.elements['password'].value = "";
        form.elements['rol'].value = json.rol;
    }

    InitModalUpdate(json, button) {

        /* --------------------- Guardamos los datos Originales --------------------- */

        this.saveOriginalData(json);

        /* ---------------------- Cambiamos el titulo del modal --------------------- */

        document.getElementById('tituloPrincipalModal').textContent = "Editar Usuario";

        /* ------------------------ Reseteamos el Formulario ------------------------ */

        this.helpers.resetFormAndValidation("addUserForm");

        /* ------------ Insertamos los datos del usuario en el formulario ----------- */

        this.insertUserDataIntoForm(json);

        /* --------------------- Insertamos la foto del usuario --------------------- */

        const photo = json.photo != "" ? json.photo : "default.jpg";
        document.getElementById('imgPortada').src = `${this.app.apirest_url}/public/${this.app.folder}/images/users/${photo}`;

        /* --------------- Controlamos lo que el usuario puede editar --------------- */

        this.formHanlder(json);

        /* --------------------------- Mostramos el modal --------------------------- */

        $('#modalAddUser').modal('show');

        /* -------------------- Restablecemos el boton de editar -------------------- */

        this.resetButtonEdit(button);

        /* -------------- Quitamos como dato obligatorio la contraseña -------------- */

        document.getElementById('passwordUser').required = false;

        /* ------------------ Ocultamos el buton de agregar usuario ----------------- */

        document.getElementById('btnAddUser').classList.add('d-none');

        /* ---------------- Mostramos el boton de Actualizar Usuario ---------------- */

        document.getElementById('btnUpdateUser').classList.remove('d-none');
    }


    captureFormData() {
        let formElement = document.getElementById('addUserForm');
        const originalData = JSON.parse(formElement.dataset.originalData);
        console.log("originalData", originalData);
        const formData = new FormData(formElement);
        let changedData = [];

        for (const [key, value] of formData.entries()) {
            // if (originalData[key] !== undefined && originalData[key] != value) {
            if (originalData[key] !== undefined && value.trim() != originalData[key]) {
                changedData.push({
                    key: key,
                    value: value,
                });
            }
        }

        return changedData;
    }

    async captureFormDataPhoto() {
        let formElement = document.getElementById('addUserForm');
        const fileInput = formElement.querySelector('input[name="datosImagen"]');

        let changedData = [];

        if (fileInput && fileInput.files.length > 0) {
            console.log("se cumplio condicion 1");

            const file = fileInput.files[0];

            // Create a new FileReader object
            const reader = new FileReader();

            // Read the image as a base64 string
            reader.readAsDataURL(file);

            // Listen for the `load` event and return a promise
            const prueba = new Promise((resolve, reject) => {
                reader.addEventListener('load', () => {
                    // Get the base64 string from the reader
                    const base64Data = reader.result;

                    // Do something with the base64 string
                    console.log("base64Data", base64Data);

                    changedData.push({
                        key: 'photo',
                        value: base64Data,
                    });

                    // Resolve the promise with the changedData array
                    resolve(changedData);
                });
            });

            // Await the promise returned by the prueba function
            return await prueba;
        } else {
            return changedData;
        }
    }
    /* -------------------------------------------------------------------------- */
    /*                   Procesar Datos Para Actualizar Usuario                   */
    /* -------------------------------------------------------------------------- */
    async updateUser(token, idUser) {
        document.getElementById('btnUpdateUser').onclick = async (e) => {
            console.log("click btnUpdateUser");
            localStorage.removeItem("photoUser");
            this.helpers.btnLoad('btnUpdateUser');

            let changedData1 = this.captureFormData();
            let changedData2 = await this.captureFormDataPhoto();
            const changedData = changedData1.concat(changedData2); // une los dos array

            console.log("changedData", changedData);

            if (changedData.length > 0) {
                await this.update(token, changedData, idUser);
                this.helpers.buttonStatus('btnUpdateUser', false, "ACTUALIZAR");
            } else {
                this.helpers.buttonStatus('btnUpdateUser', false, "ACTUALIZAR");
            }

        }
    }
    /* -------------------------------------------------------------------------- */
    /*                        Actualizar Datos Del Usuario                        */
    /* -------------------------------------------------------------------------- */
    async update(token, datos, idUser) {
        // Convierte el array de objetos a un objeto con pares de clave-valor
        const procesarDatos = datos.reduce((acc, item) => {
            console.log(item.key + ": " + item.value);
            acc[item.key] = item.value;
            return acc;
        }, {});

        console.log("procesarDatos", procesarDatos);
        if (localStorage.getItem("photoUser")) {
            const photo = JSON.parse(localStorage.getItem("photoUser"));
            if (photo != null && photo != "") {
                procesarDatos.photo = photo;
                console.log("procesarDatos", procesarDatos);
            }
        }

        try {
            const response = await fetch(this.app.apirest_url + "/user/" + idUser, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json charset=utf-8',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(procesarDatos),
                redirect: 'follow'
            });
            if (!response.ok) throw await response.json();
            const json = await response.json();
            $('#modalAddUser').modal('hide');
            if (json.status == "OK") this.helpers.showSuccessAlert(json);
            document.getElementById('addUserForm').reset();
            this.helpers.buttonStatus('btnUpdateUser', false, "ACTUALIZAR");
            this.table.ajax.reload(null, false);
        } catch (error) {
            console.log(error);
            this.helpers.showErrorAlert(error);
            this.helpers.buttonStatus('btnUpdateUser', false, "ACTUALIZAR");
        }
    }
}