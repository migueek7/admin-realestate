import Modules from '../../modules.js';
import Helpers from '../../helpers.js';

export default class Delete {

    constructor(token, table) {
        this.modules = new Modules();
        this.app = this.modules.app();
        this.helpers = new Helpers();
        this.table = table;
        this.token = token;
    }
    /* -------------------------------------------------------------------------- */
    /*                              Eliminar Registro                             */
    /* -------------------------------------------------------------------------- */
    deleteRegister(iduser, button) {
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
                this.borrarRegistro(iduser, button);
            } else {
                button.disabled = false;
            }
        });
    }
    /* -------------------------------------------------------------------------- */
    /*                               Borrar Registro                              */
    /* -------------------------------------------------------------------------- */
    async borrarRegistro(iduser, button) {
        const url = this.app.apirest_url + "/user/";

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
                body: JSON.stringify({ "iduser": iduser }),
                redirect: 'follow'
            });
            if (!response.ok) throw await response.json();
            const json = await response.json();
            if (json.status == "OK") this.helpers.showSuccessAlert(json);
            this.table.ajax.reload(null, false);
        } catch (error) {
            console.log(error);
            this.helpers.showErrorAlert(error);
            button.disabled = false;
        }
    }
}