import Modules from '../../modules.js';
import Helpers from '../../helpers.js';

export default class Delete {

    constructor(table) {
        this.modules = new Modules();
        this.app = this.modules.app();
        this.helpers = new Helpers();
        this.table = table;
    }
    /* -------------------------------------------------------------------------- */
    /*                              Eliminar Registro                             */
    /* -------------------------------------------------------------------------- */
    deleteRegister(IDRegistro, button) {
        Swal.fire({
            title: '¿Deseas borrar este registro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, bórralo!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                this.borrarRegistro(IDRegistro, button);
            } else {
                button.disabled = false;
            }
        });
    }
    /* -------------------------------------------------------------------------- */
    /*                               Borrar Registro                              */
    /* -------------------------------------------------------------------------- */
    async borrarRegistro(IDRegistro, button) {

        const token = await this.modules.getToken();
        const url = this.app.apirest_url + "/property/" + IDRegistro;

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + token,
                },
                redirect: 'follow'
            });
            console.log("response", response)

            if (!response.ok) throw response;
            const json = await response.json();

            if (json.status == "OK") {
                console.log("Excelente!!")
                this.helpers.showSuccessAlert(json);
            } else {
                console.log("Algo paso!!", json)
            }

            this.table.ajax.reload(null, false);

        } catch (error) {
            console.log("error", error)
            const json = await error.json();
            this.helpers.showErrorAlert(json);
            button.disabled = false;
        }
    }
}