export default class Modules {

    async getApirest() {
        try {
            const base_url = window.location.origin;
            const response = await fetch(base_url + "/get-apirest", { method: 'GET' });
            let apirest = await response.text();
            return apirest;
        } catch (error) {
            console.log(error);
        }
    }

    app() {
        const app = {
            base_url: window.location.origin,
            apirest_url: localStorage.getItem('apirestUrl'),
            folder: 'paraiso-dorado'
        }
        return app;
    }

    loadClose() {
        window.addEventListener('load', function () {
            document.querySelector('.loading').classList.add('loading-inactivo');
        });
    }


    /* -------------------------------------------------------------------------- */
    /*                             Get Fragment Routes                            */
    /* -------------------------------------------------------------------------- */
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


    /* -------------------------------------------------------------------------- */
    /*                           TinyMCE Initialization                           */
    /* -------------------------------------------------------------------------- */
    initTinyMCE(idname) {
        tinymce.init({
            selector: idname,
            menubar: false,
            height: "294",
            plugins: [
                'advlist autolink lists link image charmap print preview anchor textcolor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table contextmenu paste code help wordcount'
            ],
        });
    }

    /* -------------------------------------------------------------------------- */
    /*                       Material Select Initialization                       */
    /* -------------------------------------------------------------------------- */
    InitMaterialSelect() {
        $(function () {
            $('.mdb-select').materialSelect({
                validate: true
            });
            var selectedValues = $('#myMultiselect').val();
            console.log("selectedValues", selectedValues)
        });
    }

    /* -------------------------------------------------------------------------- */
    /*                           Iniciar Datepicker MDB                           */
    /* -------------------------------------------------------------------------- */
    initDatepicker() {
        $('#datetimepicker1').datetimepicker();
    }

    /* -------------------------------------------------------------------------- */
    /*                              Iniciar DataTable                             */
    /* -------------------------------------------------------------------------- */
    initDataTable() {
        $(function () {

            /*=========================================
            =            ORDENAR DATATABLE            =
            =========================================*/
            $('#dtMaterialDesignExample').DataTable({ "order": [[0, "desc"]] });
            $('.dataTables_length').addClass('bs-select');

        });

    }


    /* -------------------------------------------------------------------------- */
    /*                               Material Chips                               */
    /* -------------------------------------------------------------------------- */
    materialChipInit(idName) {

        console.log("idName", idName);


        // $(document).ready(() => {

        let rutas = this.getRutas();

        //window.addEventListener('load', function () {
        $(function () {

            //(function (rutas) {
            $(function (rutas) {

                console.log("rutas", rutas[0]);
                let arrayData;
                /* -------------------------------------------------------------------------- */
                /*                            Iniciar materialChip                            */
                /* -------------------------------------------------------------------------- */

                if (document.getElementById(idName).value != "") {
                    console.log(JSON.parse(document.getElementById(idName).value));
                    let tags = JSON.parse(document.getElementById(idName).value);
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

                /* -------------------------------------------------------------------------- */
                /*                      Agregar etiquetas a la propiedad                      */
                /* -------------------------------------------------------------------------- */

                $('.chips').on('chip.add', function (e, chip) {

                    /* -------------------------- Init Agregar Mas Etiquetas ------------------------- */

                    // console.log(chip);

                    if (rutas[0] == 'update-property') {
                        // let arrayData = [];
                        arrayData = JSON.parse(localStorage.getItem("dataProperty"));
                        arrayData.features.insert.push(chip);
                        localStorage.setItem("dataProperty", JSON.stringify(arrayData));
                        console.log(JSON.parse(localStorage.getItem("dataProperty")));
                    }


                    /* -------------------------- End Agregar Mas Etiquetas ------------------------- */


                    let features = $('.chips-initial').materialChip('data');
                    // console.log("features", features);

                    let datos = [];
                    let cantidades = document.querySelectorAll('.chip');

                    for (let i = 0; i < cantidades.length; i++) {
                        datos.push(cantidades[i].textContent);
                    }

                    var peticion = JSON.stringify(features);
                    document.getElementById(idName).value = peticion;
                });

                /* -------------------------------------------------------------------------- */
                /*                     Eliminar etiquetas de la propiedad                     */
                /* -------------------------------------------------------------------------- */

                $('.chips').on('chip.delete', function (e, chip) {

                    /* ----------------------- Init Recuperar Tags eliminados ---------------------- */

                    // console.log(chip);

                    if (rutas[0] == 'update-property') {
                        // let arrayData = [];
                        arrayData = JSON.parse(localStorage.getItem("dataProperty"));
                        // let arrayData = JSON.parse(localStorage.getItem("dataProperty"));
                        arrayData.features.delete.push(chip);

                        localStorage.setItem("dataProperty", JSON.stringify(arrayData));
                        console.log(JSON.parse(localStorage.getItem("dataProperty")));
                    }

                    /* ----------------------- End Recuperar Tags eliminados ---------------------- */

                    let features = $('.chips-initial').materialChip('data');
                    // console.log("features", features);
                    let datos = [];
                    let cantidades = document.querySelectorAll('.chip');

                    for (let i = 0; i < cantidades.length; i++) {
                        datos.push(cantidades[i].textContent);
                    }
                    console.log('featuresForm', datos);
                    var peticion = JSON.stringify(features);
                    //$("#" + idName).val(peticion);
                    document.getElementById(idName).value = peticion;
                });

                // });
            }(rutas));

        });
    }


    /* -------------------------------------------------------------------------- */
    /*                           SideNav Initialization                           */
    /* -------------------------------------------------------------------------- */
    sideNavInit() {

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

    leafletLocationInit() {

        //fix n alwaysOpen
        $('#coordinatesForm').leafletLocationPicker({
            alwaysOpen: true,
            mapContainer: "#fixedMapCont"
        })
            .on('changeLocation', function (e) {
                // $(this)
                // .siblings('#geolat').val( e.latlng.lat )
                // .siblings('#geolng').val( e.latlng.lng )
                // .siblings('#coordinatesForm').val(e.location);
                console.log("algo cambio", e.location);
                document.getElementById('coordinatesForm').focus();
                document.getElementById('coordinatesForm').setAttribute("value", e.location);

            });



        // let geoloc5 = document.getElementById('geoloc5').value;
        // geoloc5.addEventListener('onchange', () => {
        //     console.log("algo cambio");
        // });


        // const input = document.getElementById("geoloc5");

        // input.addEventListener("input", function () {
        //     console.log("algo cambio");
        // });
    }

    /* -------------------------------------------------------------------------- */
    /*                                  Dark Mode                                 */
    /* -------------------------------------------------------------------------- */
    darkMode() {
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

    /* -------------------------------------------------------------------------- */
    /*            Evitar el Evento Submit la hacer lick en Input Number           */
    /* -------------------------------------------------------------------------- */
    preventDefaultInputNumber() {
        $(".minus").on("click", function (e) {
            e.preventDefault();
        });

        $(".plus").on("click", function (e) {
            e.preventDefault();
        });
    }

    /* -------------------------------------------------------------------------- */
    /*                              Obtener El Token                              */
    /* -------------------------------------------------------------------------- */
    async getToken() {
        // console.log(this.app());
        try {
            const response = await fetch(this.app().base_url + "/get-token", {
                method: "POST",
            });
            let token = await response.text();
            // console.log(token.toString());
            return token.toString();

        } catch (error) {
            console.log(error);
        }
    }

    /* -------------------------------------------------------------------------- */
    /*                       Comprobar que Token este Activo                      */
    /* -------------------------------------------------------------------------- */
    async checkTokenValidate(token) {
        try {
            // const token = await this.getToken();
            const response = await fetch(this.app().apirest_url + '/user/check-token', {
                method: "GET",
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            // console.log(response);

            if (!response.ok) throw await response.json();

        } catch (error) {
            console.log(error);
            Swal.fire(
                error.status.toUpperCase(),
                'La token ha expirado. Porfavor vuelve a iniciar sesión',
                `${error.status}`,
            ).then((result) => {
                location.href = this.app().base_url + "/log-out";
            });
        }
    }

    sweetAlert(status, title, text, link = null) {
        Swal.fire({
            icon: status,
            title: title,
            text: text
        }).then((result) => {
            if (link !== null) {
                location.href = this.app().base_url + link;
            }
        });

        // Swal.fire(
        //     error.status.toUpperCase(),
        //     'La token ha expirado. Porfavor vuelve a iniciar sesión',
        //     `${error.status}`,
        // ).then((result) => {
        //     location.href = this.app().base_url + "/log-out";
        // });
    }

    formatMoney(price, moneda = null) {
        const value = Intl.NumberFormat("en-US", {
            // style: "currency",
            // currency: moneda,
            useGrouping: true,
            maximumSignificantDigits: 3,
        });
        return value.format(price);
    }

    cleanInputToNumber(id) {
        document.getElementById(id).addEventListener('keyup', function (e) {
            e.preventDefault();
            e.target.value.match(/\D/)
            let newValue = e.target.value.replace(/\D/g, '');
            e.target.value = newValue;
        });
    }


    showPassword(inputId, target = null) {
        let passwordInput = document.getElementById(inputId);

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            if (target != null) {
                target.classList.remove('fa-eye')
                target.classList.add('fa-eye-slash')
            }
        } else {
            if (target != null) {
                target.classList.remove('fa-eye-slash')
                target.classList.add('fa-eye')
            }
            passwordInput.type = "password";
        }
    }
}