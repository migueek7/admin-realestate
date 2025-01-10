export default class GetData {

    /* -------------------------------------------------------------------------- */
    /*                        Obtener Datos del Formulario                        */
    /* -------------------------------------------------------------------------- */
    getDataForm() {

        const dataForm = {
            "name": document.getElementById('nameUser').value.trim(),
            "puesto": document.getElementById('puestoUser').value.trim(),
            "email": document.getElementById('emailUser').value.trim().toLowerCase(),
            "phone": document.getElementById('phoneUser').value.trim(),
            "password": document.getElementById('passwordUser').value.trim(),
            "rol": document.getElementById('rolUser').value.trim(),
            "photo": document.getElementById('userCoverForm').files[0]
        }
        return dataForm;
    }
}