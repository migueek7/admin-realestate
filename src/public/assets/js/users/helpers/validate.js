export default class ValidateHelper {

    /* -------------------------------------------------------------------------- */
    /*                             Validar Formulario                             */
    /* -------------------------------------------------------------------------- */
    validaFormulario(idForm) {

        console.log("valida form");
        // const form = document.getElementById('FormInmueble');
        console.log("idForm", idForm)
        const form = document.getElementById(idForm);
        console.log(form);
        const inputs = form.getElementsByClassName('form-control');
        let bandera = 0;
        let totalInput = 0;

        Array.from(inputs).forEach(input => {

            if (input.required) {
                //console.log(input.required);

                if (input.classList.contains("form-control") ||
                    input.classList.contains("select-dropdown")) {

                    if (input.id == "descriptionForm") {
                        if (input.value.trim() == "") {

                            if (tinyMCE.get('descriptionForm').getContent() != "") {
                                bandera++;
                            }
                        }
                        // else {
                        //     console.log(input.value);
                        //     bandera++;
                        // }
                    }

                    if (input.classList.contains("select-dropdown")) {
                        if (input.parentNode.getElementsByClassName("mdb-select")[0].value.trim() == "") {
                            input.classList.remove("is-valid");
                            input.classList.add("is-invalid");
                        }
                        else {
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
                    totalInput++;
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
}