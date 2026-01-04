import Modules from '../../modules.js';
import Helpers from '../../helpers.js';
import ValidateHelper from '../helpers/validate.js';
import GetData from '../helpers/getData.js';

export default class Add {

    constructor(token, table) {
        this.modules = new Modules();
        this.app = this.modules.app();
        this.helpers = new Helpers();
        this.validate = new ValidateHelper();
        this.getdata = new GetData();
        this.table = table;
        this.btnAgregar();
        this.save(token);
    }

    btnAgregar() {
        document.querySelector('.btnAgregar').onclick = (e) => {
            e.preventDefault();

            document.getElementById('imgPortada').src = `${this.app.uploads_url}/users/default.jpg`;
            document.getElementById('rolUser').disabled = false;
            // const form = document.getElementById("addUserForm");
            this.helpers.resetFormAndValidation("addUserForm");
        }
    }

    save(token) {
        document.getElementById('btnAddUser').onclick = (e) => {
            e.preventDefault();
            this.helpers.btnLoad('btnAddUser');

            document.getElementById('passwordUser').setAttribute('required', true);
            const validaFormulario = this.validate.validaFormulario("addUserForm");
            console.log(validaFormulario);

            if (validaFormulario) {
                this.add(token);
            } else {
                this.helpers.buttonStatus('btnAddUser', false, "Agregar");
            }

        }
    }

    async add(token) {
        const formData = new FormData();
        const datosForm = this.getdata.getDataForm();

        Object.entries(datosForm).forEach((element, index) => {
            formData.append(element[0], element[1]);
        });

        try {
            const response = await fetch(this.app.apirest_url + "/user/", {
                method: "POST",
                headers: {
                    // 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: formData,
                redirect: 'follow'
            });

            if (!response.ok) throw await response.json();
            $('#modalAddUser').modal('hide');
            const json = await response.json();
            if (json.status == "Created") this.helpers.showSuccessAlert(json);
            document.getElementById('addUserForm').reset();
            this.helpers.buttonStatus('btnAddUser', false, "AGREGAR")
            this.table.ajax.reload(null, false);
        } catch (error) {
            console.log(error);
            this.helpers.showErrorAlert(error);
            this.helpers.buttonStatus('btnAddUser', false, "AGREGAR");
        }
    }

    // Función auxiliar para leer un archivo como Base64
    readFileAsBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(file);
        });
    }
}