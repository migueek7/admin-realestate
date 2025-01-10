import {
    app,
} from "./modules.js";
// loadClose();

const Login = async (correo, password) => {

    try {

        const response = await fetch(`http://apirestphp8.test/auth/${correo}/${password}/`, {
            method: 'GET',
            redirect: 'follow'
        });

        if (!response.ok) throw await response.json();

        const json = await response.json();
        setToken(json);

    } catch (error) {
        console.log(error);
        Swal.fire(
            error.status.toUpperCase(),
            `${error.message}`,
            `${error.status}`,
        ).then((result) => {
            document.getElementById('btnLogin').disabled = false;
        });
    }
}

const setToken = async (data) => {
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

        const response = await fetch(app.base_url + "/set-token", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        });

        if (!response.ok) throw await response.text();
        const json = await response.text();


        if (json == "ok") {
            location.href = app.base_url + "/properties";
        } else {
            document.getElementById('btnLogin').disabled = false;
        }

    } catch (error) {
        console.log(error);
        Swal.fire(
            'Error',
            'Ocurrio un error al intentar iniciar sesión',
            'error',
        ).then((result) => {
            document.getElementById('btnLogin').disabled = false;
        });
    }
}

document.getElementById('btnLogin').addEventListener("click", (e) => {
    e.preventDefault();
    console.log("diste click");



    document.getElementById('btnLogin').disabled = true;


    const correo = document.getElementById('emailForm').value.trim();
    const password = document.getElementById('passForm').value.trim();

    console.log("correo", correo);
    console.log("password", password);

    if (correo == "" || password == "") {

        Swal.fire(
            "Datos incompletos",
            'Porfavor Complete el formulario corractamente',
            'warning',
        ).then((result) => {
            document.getElementById('btnLogin').disabled = false;
        });
    } else {
        Login(correo, password);
    }

});