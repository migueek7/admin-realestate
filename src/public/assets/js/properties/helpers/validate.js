export default class ValidateHelper {

    /* -------------------------------------------------------------------------- */
    /*                             Validar Formulario                             */
    /* -------------------------------------------------------------------------- */
    validaFormulario(idForm) {
        const form = document.getElementById(idForm);
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
                    }

                    if (input.classList.contains("select-dropdown")) {
                        console.log('value select>>', input.parentNode.getElementsByClassName("mdb-select")[0].value);
                        if (input.parentNode.getElementsByClassName("mdb-select")[0].value.trim() == "" && !input.parentNode.classList.contains("multi")) {
                            input.classList.remove("is-valid");
                            input.classList.add("is-invalid");
                        }
                        else {
                            input.classList.remove("is-invalid");
                            input.classList.add("is-valid");
                            bandera++;
                        }
                        // Validar multiselect de status de la propiedad
                        if (input.parentNode.classList.contains("multi")) {
                            if (input.value == "Seleccionar Status") {
                                console.log("multi value invalido>>", input.value);
                                input.classList.remove("is-valid");
                                input.classList.add("is-invalid");
                            } else {
                                console.log("multi value valido>>", input.value);
                                input.classList.remove("is-invalid");
                                input.classList.add("is-valid");
                                bandera++;
                            }
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