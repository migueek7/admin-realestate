import Modules from '../../modules.js';
import Helpers from '../../helpers.js';
import ValidateHelper from '../helpers/validate.js';
import UpdateFormData from '../helpers/updateFormData.js';
import GetData from '../helpers/getData.js';

export default class Update {

    constructor(token, table) {
        console.log("hola desde update");
        this.modules = new Modules();
        this.app = this.modules.app();
        this.helpers = new Helpers();
        this.table = table;
        this.token = token;
        this.validate = new ValidateHelper();
        this.getdata = new GetData();
        // this.getUser(token);
        this.datosOriginales = {};
        this.formElement = document.getElementById('addUserForm');
        // this.saveUpdate(token);
        this.updateUser(token);
    }

    async getUser(idUser, btnEditar) {

        console.log("idUser", idUser);
        const url = this.app.apirest_url + "/user/" + idUser;

        try {
            // const response = await this.getRequest(url);
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
                redirect: 'follow'
            });
            if (!response.status) throw response;
            await this.helpers.procesarError(response);
            const json = await response.json();
            // console.log(json.name);
            this.InitModalUpdate(json, btnEditar);

        } catch (error) {
            console.log(error);
            const href = error.json().statusText == "Unauthorized" ? this.app.base_url + "/log-out" : null;
            this.helpers.showErrorAlert(error, href);
            this.helpers.buttonStatus('btnAddUser', false, "GUARDAR");
        }
    }

    InitModalUpdate(json, btnEditar) {
        document.getElementById('tituloPrincipalModal').textContent = "Editar Usuario";
        const form = document.getElementById("addUserForm");
        this.helpers.resetFormAndValidation(form);




        const nameInput = form.elements['name'];
        const puestoInput = form.elements['puesto'];
        const emailInput = form.elements['email'];
        const phoneInput = form.elements['phone'];
        const passwordInput = form.elements['password'];
        const rolInput = form.elements['rol'];
        // const coverInput = form.elements['datosImagen'];


        nameInput.value = json.name;
        puestoInput.value = json.puesto;
        emailInput.value = json.email;
        phoneInput.value = json.phone;
        passwordInput.value = "";
        rolInput.value = json.rol;
        json.rol == 1 ? rolInput.disabled = true : rolInput.disabled = false;
        //coverInput.setAttribute("image", this.app.apirest_url + json[0].photo);
        const photo = json.photo != "" ? json.photo : "default.jpg";
        document.getElementById('imgPortada').src = this.app.apirest_url + "/public/images/users/" + photo;


        /**************************************/
        const datosOriginales = {
            name: json.name,
            puesto: json.puesto,
            email: json.email,
            phone: json.phone,
            password: "",
            rol: Number(json.rol)
        }
        document.getElementById("addUserForm").setAttribute("data-original-data", JSON.stringify(datosOriginales));
        /**************************************/


        // this.helpers.buttonStatus('btnAddUser', false, "GUARDAR");
        $('#modalAddUser').modal('show');
        btnEditar.disabled = false;

        // this.updateInstance = new UpdateFormData(form);
        this.formElement = form;

        document.getElementById('passwordUser').required = false;
        if (!document.getElementById('btnAddUser').classList.contains('d-none')) {
            document.getElementById('btnAddUser').classList.add('d-none');
        }
        if (document.getElementById('btnUpdateUser').classList.contains('d-none')) {
            document.getElementById('btnUpdateUser').classList.remove('d-none');
        }

    }

    captureFormData(formElement) {
        const originalData = JSON.parse(formElement.dataset.originalData);
        console.log("originalData", originalData);
        const formData = new FormData(formElement);
        const changedData = [];

        for (const [key, value] of formData.entries()) {
            // if (originalData[key] !== undefined && originalData[key] != value) {
            if (originalData[key] !== undefined && value != originalData[key]) {
                changedData.push({
                    key: key,
                    value: value,
                });
            }
        }

        return changedData;
    }


    saveUpdate(token, idUser, form) {
        document.getElementById('btnUpdateUser').onclick = (e) => {
            e.preventDefault();
            this.helpers.btnLoad('btnUpdateUser');

            // const validaFormulario = this.validate.validaFormulario("addUserForm");
            // console.log(validaFormulario);

            /************************/
            const formElement = document.getElementById('addUserForm');

            const changedDataArray = this.captureFormData(formElement);
            console.log("changedDataArray", changedDataArray);
            return;

            /************************/

            if (changedDataArray.length > 0) {
                this.update(token, changedDataArray, idUser);

                // const formElement = document.getElementById('form');
                // this.updateInstance = new UpdateFormData(this.formElement);

                //const url = "https://api.example.com/endpoint"; // Reemplaza esta URL con la URL correcta de tu API
                // const url = this.app.apirest_url + "/user/" + idUser;
                // this.updateInstance.update(url);
                this.helpers.buttonStatus('btnUpdateUser', false, "ACTUALIZAR");

            } else {
                this.helpers.buttonStatus('btnUpdateUser', false, "ACTUALIZAR");
            }
        }
    }

    async update(token, datos, idUser) {

        // Convierte el array de objetos a un objeto con pares de clave-valor
        const procesarDatos = datos.reduce((acc, item) => {
            acc[item.key] = item.value;
            return acc;
        }, {});

        // const formElement = document.querySelector("#myForm");
        // const updateInstance = new Update(formElement);

        // let form = document.getElementById('addUserForm');
        // const formData = new FormData(form);

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

            await this.helpers.procesarError(response);
            const res = await response.json();
            console.log(res);
            $('#modalAddUser').modal('hide');

            Swal.fire(
                '¡Exito!',
                `${res.message}`,
                `${res.status}`
            ).then((result) => {
                document.getElementById('addUserForm').reset();
                this.helpers.buttonStatus('btnUpdateUser', false, "ACTUALIZAR");
                this.table.ajax.reload(null, false);
            });

        } catch (error) {
            console.log(error);
            this.helpers.showErrorAlert(error);
            this.helpers.buttonStatus('btnUpdateUser', false, "ACTUALIZAR");
        }
    }

}