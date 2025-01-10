const app = {
    base_url: window.location.origin,
    apirest_url: "http://apirestphp8.test",
    // token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjMxNzY1MDIsImV4cCI6MTY2MzE5ODEwMiwiZGF0YSI6eyJJRFRva2VuIjoiMTc0ZDRkNjM1NGJlYjUzNDQxYjM2N2QyZTY2NDJlOTNiYmVhZjc4YWE5NjIwMmM4MjYzMzk0NzI0YzA2YjlkZTdiZmQ2MmNhNTFlNTc1NmNkOTIwYmVjOWJhMTQ5MGRiNzNmZDExZDk1MzkwMGU0N2MzZjc3YTg0YmJkZmIzNTUifX0.W9ptLhWesdmjDFbRqLa37PMUCbS53pO4VsUJNEAHHio"
}

const getToken = async () => {
    try {
        const response = await fetch(app.base_url + "/get-token", {
            method: "POST",
        });
        let token = await response.text();
        // console.log(token.toString());
        return token.toString();

    } catch (error) {
        console.log(error);
    }
}


async function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        // console.log(reader.result);
        return reader.result;
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}


/* -------------------------------------------------------------------------- */
/*                           SideNav Initialization                           */
/* -------------------------------------------------------------------------- */
const SideNavInit = () => {

    $(document).ready(() => {
        $(".button-collapse").sideNav();

        var container = document.querySelector('.custom-scrollbar');
        var ps = new PerfectScrollbar(container, {
            wheelSpeed: 2,
            wheelPropagation: true,
            minScrollbarLength: 20
        });
    });
}

/* -------------------------------------------------------------------------- */
/*                                  Dark Mode                                 */
/* -------------------------------------------------------------------------- */
const DarkMode = () => {
    $('#dark-mode').on('click', function (e) {

        e.preventDefault();
        $('h4, button').not('.check').toggleClass('dark-grey-text text-white');
        $('.list-panel a').toggleClass('dark-grey-text');

        $('footer, .card').toggleClass('dark-card-admin');
        $('body, .navbar').toggleClass('white-skin navy-blue-skin');
        $(this).toggleClass('white text-dark btn-outline-black');
        $('body').toggleClass('dark-bg-admin');
        $('h6, .card, p, td, th, i, li a, h4, input, label').not(
            '#slide-out i, #slide-out a, .dropdown-item i, .dropdown-item').toggleClass('text-white');
        $('.btn-dash').toggleClass('grey blue').toggleClass('lighten-3 darken-3');
        $('.gradient-card-header').toggleClass('white black lighten-4');
        $('.list-panel a').toggleClass('navy-blue-bg-a text-white').toggleClass('list-group-border');

    });
}


const getProperties = async () => {

    try {
        const response = await fetch("http://apirestphp8.test/property/", {
            method: 'GET',
        });

        if (!response.ok) throw response;
        const json = await response.json();
        return json;

    } catch (error) {
        return await error.json();
    }
}



/* -------------------------------------------------------------------------- */
/*                               Borrar Registro                              */
/* -------------------------------------------------------------------------- */

const borrarRegistro = async (IDRegistro) => {

    const token = await getToken();
    // console.log(token);

    var requestOptions = {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + token,
        },
        redirect: 'follow'
    };

    const url = app.apirest_url + "/property/" + IDRegistro;

    try {

        const response = await fetch(url, requestOptions);
        if (!response.ok) throw response;
        const json = await response.json();
        return json;

    } catch (error) {
        return await error.json();
    }
}


/* -------------------------------------------------------------------------- */
/*                             Validar Formulario                             */
/* -------------------------------------------------------------------------- */
const validaFormulario = () => {

    const form = document.getElementById('FormInmueble');
    const inputs = form.getElementsByClassName('form-control');
    let bandera = 0;
    let totalInput = 0;

    Array.from(inputs).forEach(input => {

        if (input.required) {
            totalInput++;

            if (input.classList.contains("form") ||
                input.classList.contains("select-dropdown")) {

                if (input.id == "descriptionForm") {
                    if (tinyMCE.get('descriptionForm').getContent() != "") {
                        bandera++;
                    }
                }

                if (input.classList.contains("select-dropdown")) {

                    if (input.parentNode.getElementsByClassName("mdb-select")[0].value.trim() == "") {
                        input.classList.remove("is-valid");
                        input.classList.add("is-invalid");
                    } else {
                        input.classList.remove("is-invalid");
                        input.classList.add("is-valid");
                        bandera++;
                    }
                }
                else {

                    if (input.value.trim() == '') {
                        input.classList.add('is-invalid');
                    } else {
                        input.classList.remove('is-invalid');
                        input.classList.add('is-valid');
                        bandera++;
                    }
                }
            }
        }
    });

    console.log("TOTAL INPUTS", totalInput);
    console.log("BANDERA", bandera);

    if (bandera < totalInput) {
        return false;
    } else {
        return true;
    }
}


/* -------------------------------------------------------------------------- */
/*                               GET CATEGORIAS                               */
/* -------------------------------------------------------------------------- */
const getCategories = async () => {

    try {
        const response = await fetch(app.apirest_url + "/property/categories", {
            method: 'GET'
        });

        if (!response.ok) throw response;
        const json = response.json();
        return json;

    } catch (error) {
        return await error.json();
    }
}

/* -------------------------------------------------------------------------- */
/*                                 GET STATUS                                 */
/* -------------------------------------------------------------------------- */
const getStatus = async () => {

    try {
        const response = await fetch(app.apirest_url + "/property/status", {
            method: 'GET'
        });

        if (!response.ok) throw response;
        const json = response.json();
        return json;

    } catch (error) {
        return await error.json();
    }
}


/* -------------------------------------------------------------------------- */
/*                                Enviar Email                                */
/* -------------------------------------------------------------------------- */
const sendMail = async () => {

    let form = document.querySelector('#form');
    // obtener todos lo valores del fomurlario 
    let dataForm = new FormData(form);
    // Convertir a query string
    let queryString = new URLSearchParams(dataForm).toString();

    try {
        const request = await fetch(app.base_url + '/mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: queryString
        });

        if (!request.ok) throw request;

        console.log(request);

        const json = await request.text();
        console.log(json);

    } catch (error) {
        return await error.json();
    }
}


const rutas = () => {
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


const checkTokenValidate = async () => {
    try {
        const token = await getToken();
        const response = await fetch(app.apirest_url + '/user/check-token', {
            method: "GET",
            headers: {
                Authorization: 'Bearer ' + token,
            }
        });

        if (!response.ok) throw await response.json();

        return;

    } catch (error) {
        Swal.fire(
            error.status.toUpperCase(),
            'La token ha expirado. Porfavor vuelve a iniciar sesión',
            `${error.status}`,
        ).then((result) => {
            location.href = app.base_url + "/log-out";
        });
    }
}


const loadClose = () => {
    window.addEventListener('load', function () {
        document.querySelector('.loading').classList.add('loading-inactivo');
    });
}

export {
    app,
    rutas,
    sendMail,
    loadClose,
    SideNavInit,
    DarkMode,
    getProperties,
    borrarRegistro,
    validaFormulario,
    getCategories,
    getStatus,
    getToken,
    checkTokenValidate,
    getBase64
}