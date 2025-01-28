import Modules from '../../modules.js';

export default class Read {

    constructor() {
        this.app = new Modules();
        let table = this.initDataTable();
    }

    initDataTable() {

        const app = this.app;

        this.table = $('#dtMaterialDesignExample').DataTable({
            "ajax": {
                url: app.apirest_url + "/property/categories",
                type: "GET",
                dataSrc: ""
            },
            error: function (xhr, error, code) {
                console.log(xhr);
                console.log(error);
                console.log(code);
            },
            columns: [
                {
                    data:
                        function (data) {
                            let image_category = data.image_category != "" && data.image_category != null ? data.image_category : "default.jpg";
                            console.log("image_category", image_category);
                            return `
                                <img src="${app.apirest_url}/public/${app.folder}/images/categories/${image_category}" class="img-fluid" style="max-height: 50px"/>
                            `;
                        }
                },
                { data: 'category' },
                {
                    data:
                        function (data) {
                            return `
                                <div class="text-right ml-auto">
                                    <button type="button" 
                                        class="btn btn-info btn-sm btn-rounded btnDetalle" 
                                        iduser="${data.id_category}">
                                            <i class="fas fa-eye fa-md"></i>
                                    </button>

                                    <button type="button" 
                                        class="btn btn-primary btn-sm btn-rounded btnEditar" 
                                        iduser="${data.id_category}">
                                            <i class="fas fa-edit fa-md"></i>
                                    </button>

                                    <button type="button" 
                                        class="btn btn-danger btn-sm btn-rounded btnEliminar"
                                        iduser="${data.id_category}">
                                            <i class="fas fa-trash-alt fa-md"></i>
                                    </button>
                                <div>
                            `;
                        }
                }
            ],
            dom: '<"row" <"col-md-3"B> <"col-md-9 dt-left"fl> > ',
            buttons: [
                {
                    text: '<i class="fas fa-plus fa-md"></i> Agregar',
                    className: 'btn btn-sm btn-success btn-rounded btnAgregar',
                    action: function (e, dt, node, config) {
                        this.helpers.resetFormAndValidation("addUserForm");

                        if (!document.getElementById('btnUpdateUser').classList.contains('d-none')) {
                            document.getElementById('btnUpdateUser').classList.add('d-none');
                        }
                        if (document.getElementById('btnAddUser').classList.contains('d-none')) {
                            document.getElementById('btnAddUser').classList.remove('d-none');
                        }
                        $('#modalAddUser').modal('show');
                    }.bind(this)
                }
            ],
            responsive: true
        });

        $(document).ready(() => {
            $('#dtMaterialDesignExample_wrapper .mdb-select, #dt-material-checkbox_wrapper .mdb-select').materialSelect();
        });

        return this.table;
    }

}