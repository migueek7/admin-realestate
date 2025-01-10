import Helpers from '../../helpers.js';
import Modules from '../../modules.js';

export default class Login {

    constructor() {
        console.log("hola desde login class");
        this.modules = new Modules();
        this.app = this.modules.app();
        // const base_url = await this.app.base_url;
        // console.log("base_url", this.app.base_url);

        this.helpers = new Helpers();
        this.btnLoginText = 'Ingresar';
    }

    initLogin() {
        document.getElementById('btnLogin').onclick = (e) => {
            e.preventDefault();
            console.log("diste click");

            this.helpers.btnLoad('btnLogin');

            const correo = document.getElementById('emailForm').value.trim();
            const password = document.getElementById('passForm').value.trim();

            // console.log("correo", correo);
            // console.log("password", password);

            if (correo == "" || password == "") {

                let titleError = "Datos incompletos";
                let tipoAlerta = "danger";
                let mensaje = "Porfavor completa el formulario correctamente.";
                const alert = this.helpers.getAlert(titleError, tipoAlerta, mensaje);
                document.getElementById('msgLogin').innerHTML = alert;
                this.helpers.buttonStatus('btnLogin', false, this.btnLoginText);
            } else {
                this.procesarLogin(correo, password);
            }
        }
    }


    async procesarLogin(correo, password) {

        const apirest_url = await this.modules.getApirest();
        localStorage.setItem('apirestUrl', apirest_url);
        // const apirest_url = await this.app.apirest_url

        try {
            // console.log(`${apirest_url}/auth/${correo}/${password}/`);
            const url = `${apirest_url}/auth/${correo}/${password}/`;
            const response = await fetch(url, {
                method: 'GET',
                redirect: 'follow'
            });

            if (!response.ok) throw await response.json();

            const json = await response.json();
            this.setToken(json);

        } catch (error) {
            console.log(error);
            // let titleError = error.status.toUpperCase();
            let titleError = error.status; // causa error con "toUpperCase()"
            let tipoAlerta = "danger";
            let mensaje = error.message;
            const alert = this.helpers.getAlert(titleError, tipoAlerta, mensaje);
            document.getElementById('msgLogin').innerHTML = alert;
            this.helpers.buttonStatus('btnLogin', false, this.btnLoginText);
        }
    }


    async setToken(data) {
        console.log(data.message.token);
        try {
            let details = {
                "id_user": data.message.id_user,
                "name": data.message.name,
                "rol": data.message.rol,
                "token": data.message.token
            };

            var formBody = [];
            for (var property in details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");

            // console.log("this.app.base_url", window.location.origin);
            // const base_url = await this.app.base_url;
            // console.log("base_url", base_url);

            const response = await fetch(this.app.base_url + "/set-token", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: formBody
            });

            if (!response.ok) throw await response.text();
            const json = await response.text();
            console.log("json", json);

            if (json == "ok") {
                location.href = this.app.base_url + "/properties";
            } else {
                document.getElementById('btnLogin').disabled = false;
                Swal.fire(
                    'Error',
                    'Ocurrio un error al intentar iniciar sesión',
                    'error',
                ).then((result) => {
                    document.getElementById('btnLogin').disabled = false;
                    document.getElementById('btnLogin').innerHTML = this.btnLoginText;
                });
            }

        } catch (error) {
            console.log(error);
            Swal.fire(
                'Error',
                'Ocurrio un error al intentar iniciar sesión',
                'error',
            ).then((result) => {
                document.getElementById('btnLogin').disabled = false;
                document.getElementById('btnLogin').innerHTML = this.btnLoginText;
            });
        }
    }
}





// Crear el objeto app
const loginApp = new Login();

// Cargar login
loginApp.initLogin();