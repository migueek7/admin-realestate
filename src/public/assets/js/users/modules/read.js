import Modules from '../../modules.js';
import Helpers from '../../helpers.js';
import CoverHelper from '../helpers/cover.js';
import Delete from './delete.js';
import Add from './add.js';
import Update from './update.js';

export default class Read {

    constructor(token) {
        //console.log('hola desde Read');
        this.modules = new Modules();
        this.app = this.modules.app();
        this.helpers = new Helpers();
        this.token = token;

        document.getElementById("btnShowPassword").onclick = (e) => {
            this.modules.showPassword("passwordUser", e.target)
        }

        this.cover = new CoverHelper();
        this.cover.coverInit(this.modules.getRutas());

        let table = this.initDataTable(token);
        this.add = new Add(token, table);
        this.delete = new Delete(token, table);
        this.update = new Update(token, table);
        this.modifiedFields = {};
        this.btnAction();
    }

    initDataTable() {

        const app = this.app;
        // const Token = this.token;
        // console.log("Token", Token);

        this.table = $('#dtMaterialDesignExample').DataTable({
            "ajax": {
                url: app.apirest_url + "/user/",
                type: "GET",
                // headers: {
                //     'Content-Type': 'application/json charset=utf-8',
                //     'Authorization': 'Bearer ' + Token
                // },
                dataSrc: "data"
            },
            error: function (xhr, error, code) {
                console.log(xhr);
                console.log(error);
                console.log(code);
            },
            "language": {
                "processing": "Procesando...",
                "lengthMenu": "Mostrar _MENU_ registros",
                "zeroRecords": "No se encontraron resultados",
                "emptyTable": "Ningún dato disponible en esta tabla",
                "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "infoFiltered": "(filtrado de un total de _MAX_ registros)",
                "search": "Buscar:",
                "infoThousands": ",",
                "loadingRecords": "Cargando...",
                "paginate": {
                    "first": "Primero",
                    "last": "Último",
                    "next": "Siguiente",
                    "previous": "Anterior"
                },
                "aria": {
                    "sortAscending": ": Activar para ordenar la columna de manera ascendente",
                    "sortDescending": ": Activar para ordenar la columna de manera descendente"
                },
                "buttons": {
                    "copy": "Copiar",
                    "colvis": "Visibilidad",
                    "collection": "Colección",
                    "colvisRestore": "Restaurar visibilidad",
                    "copyKeys": "Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br \/> <br \/> Para cancelar, haga clic en este mensaje o presione escape.",
                    "copySuccess": {
                        "1": "Copiada 1 fila al portapapeles",
                        "_": "Copiadas %ds fila al portapapeles"
                    },
                    "copyTitle": "Copiar al portapapeles",
                    "csv": "CSV",
                    "excel": "Excel",
                    "pageLength": {
                        "-1": "Mostrar todas las filas",
                        "_": "Mostrar %d filas"
                    },
                    "pdf": "PDF",
                    "print": "Imprimir",
                    "renameState": "Cambiar nombre",
                    "updateState": "Actualizar",
                    "createState": "Crear Estado",
                    "removeAllStates": "Remover Estados",
                    "removeState": "Remover",
                    "savedStates": "Estados Guardados",
                    "stateRestore": "Estado %d"
                },
                "autoFill": {
                    "cancel": "Cancelar",
                    "fill": "Rellene todas las celdas con <i>%d<\/i>",
                    "fillHorizontal": "Rellenar celdas horizontalmente",
                    "fillVertical": "Rellenar celdas verticalmentemente"
                },
                "decimal": ",",
                "searchBuilder": {
                    "add": "Añadir condición",
                    "button": {
                        "0": "Constructor de búsqueda",
                        "_": "Constructor de búsqueda (%d)"
                    },
                    "clearAll": "Borrar todo",
                    "condition": "Condición",
                    "conditions": {
                        "date": {
                            "after": "Despues",
                            "before": "Antes",
                            "between": "Entre",
                            "empty": "Vacío",
                            "equals": "Igual a",
                            "notBetween": "No entre",
                            "notEmpty": "No Vacio",
                            "not": "Diferente de"
                        },
                        "number": {
                            "between": "Entre",
                            "empty": "Vacio",
                            "equals": "Igual a",
                            "gt": "Mayor a",
                            "gte": "Mayor o igual a",
                            "lt": "Menor que",
                            "lte": "Menor o igual que",
                            "notBetween": "No entre",
                            "notEmpty": "No vacío",
                            "not": "Diferente de"
                        },
                        "string": {
                            "contains": "Contiene",
                            "empty": "Vacío",
                            "endsWith": "Termina en",
                            "equals": "Igual a",
                            "notEmpty": "No Vacio",
                            "startsWith": "Empieza con",
                            "not": "Diferente de",
                            "notContains": "No Contiene",
                            "notStarts": "No empieza con",
                            "notEnds": "No termina con"
                        },
                        "array": {
                            "not": "Diferente de",
                            "equals": "Igual",
                            "empty": "Vacío",
                            "contains": "Contiene",
                            "notEmpty": "No Vacío",
                            "without": "Sin"
                        }
                    },
                    "data": "Data",
                    "deleteTitle": "Eliminar regla de filtrado",
                    "leftTitle": "Criterios anulados",
                    "logicAnd": "Y",
                    "logicOr": "O",
                    "rightTitle": "Criterios de sangría",
                    "title": {
                        "0": "Constructor de búsqueda",
                        "_": "Constructor de búsqueda (%d)"
                    },
                    "value": "Valor"
                },
                "searchPanes": {
                    "clearMessage": "Borrar todo",
                    "collapse": {
                        "0": "Paneles de búsqueda",
                        "_": "Paneles de búsqueda (%d)"
                    },
                    "count": "{total}",
                    "countFiltered": "{shown} ({total})",
                    "emptyPanes": "Sin paneles de búsqueda",
                    "loadMessage": "Cargando paneles de búsqueda",
                    "title": "Filtros Activos - %d",
                    "showMessage": "Mostrar Todo",
                    "collapseMessage": "Colapsar Todo"
                },
                "select": {
                    "cells": {
                        "1": "1 celda seleccionada",
                        "_": "%d celdas seleccionadas"
                    },
                    "columns": {
                        "1": "1 columna seleccionada",
                        "_": "%d columnas seleccionadas"
                    },
                    "rows": {
                        "1": "1 fila seleccionada",
                        "_": "%d filas seleccionadas"
                    }
                },
                "thousands": ".",
                "datetime": {
                    "previous": "Anterior",
                    "next": "Proximo",
                    "hours": "Horas",
                    "minutes": "Minutos",
                    "seconds": "Segundos",
                    "unknown": "-",
                    "amPm": [
                        "AM",
                        "PM"
                    ],
                    "months": {
                        "0": "Enero",
                        "1": "Febrero",
                        "10": "Noviembre",
                        "11": "Diciembre",
                        "2": "Marzo",
                        "3": "Abril",
                        "4": "Mayo",
                        "5": "Junio",
                        "6": "Julio",
                        "7": "Agosto",
                        "8": "Septiembre",
                        "9": "Octubre"
                    },
                    "weekdays": [
                        "Dom",
                        "Lun",
                        "Mar",
                        "Mie",
                        "Jue",
                        "Vie",
                        "Sab"
                    ]
                },
                "editor": {
                    "close": "Cerrar",
                    "create": {
                        "button": "Nuevo",
                        "title": "Crear Nuevo Registro",
                        "submit": "Crear"
                    },
                    "edit": {
                        "button": "Editar",
                        "title": "Editar Registro",
                        "submit": "Actualizar"
                    },
                    "remove": {
                        "button": "Eliminar",
                        "title": "Eliminar Registro",
                        "submit": "Eliminar",
                        "confirm": {
                            "_": "¿Está seguro que desea eliminar %d filas?",
                            "1": "¿Está seguro que desea eliminar 1 fila?"
                        }
                    },
                    "error": {
                        "system": "Ha ocurrido un error en el sistema (<a target=\"\\\" rel=\"\\ nofollow\" href=\"\\\">Más información&lt;\\\/a&gt;).<\/a>"
                    },
                    "multi": {
                        "title": "Múltiples Valores",
                        "info": "Los elementos seleccionados contienen diferentes valores para este registro. Para editar y establecer todos los elementos de este registro con el mismo valor, hacer click o tap aquí, de lo contrario conservarán sus valores individuales.",
                        "restore": "Deshacer Cambios",
                        "noMulti": "Este registro puede ser editado individualmente, pero no como parte de un grupo."
                    }
                },
                "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
                "stateRestore": {
                    "creationModal": {
                        "button": "Crear",
                        "name": "Nombre:",
                        "order": "Clasificación",
                        "paging": "Paginación",
                        "search": "Busqueda",
                        "select": "Seleccionar",
                        "columns": {
                            "search": "Búsqueda de Columna",
                            "visible": "Visibilidad de Columna"
                        },
                        "title": "Crear Nuevo Estado",
                        "toggleLabel": "Incluir:"
                    },
                    "emptyError": "El nombre no puede estar vacio",
                    "removeConfirm": "¿Seguro que quiere eliminar este %s?",
                    "removeError": "Error al eliminar el registro",
                    "removeJoiner": "y",
                    "removeSubmit": "Eliminar",
                    "renameButton": "Cambiar Nombre",
                    "renameLabel": "Nuevo nombre para %s",
                    "duplicateError": "Ya existe un Estado con este nombre.",
                    "emptyStates": "No hay Estados guardados",
                    "removeTitle": "Remover Estado",
                    "renameTitle": "Cambiar Nombre Estado"
                }
            },
            columns: [
                {
                    data:
                        function (data) {
                            let photo = data.photo != "" && data.photo != null ? data.photo : "default.jpg";
                            console.log("photo", photo);
                            return `
                                <img src="${app.uploads_url}/users/${photo}" class="img-fluid" style="max-height: 50px"/>
                            `;
                        }
                },
                { data: 'name_user' },
                { data: 'email' },
                { data: 'phone' },
                { data: 'name_rol' },
                {
                    data:
                        function (data) {
                            return `
                                <div class="text-right ml-auto">
                                    <button type="button" 
                                        class="btn btn-info btn-sm btn-rounded btnDetalle" 
                                        iduser="${data.id_user}">
                                            <i class="fas fa-eye fa-md"></i>
                                    </button>

                                    <button type="button" 
                                        class="btn btn-primary btn-sm btn-rounded btnEditar" 
                                        iduser="${data.id_user}">
                                            <i class="fas fa-edit fa-md"></i>
                                    </button>

                                    <button type="button" 
                                        class="btn btn-danger btn-sm btn-rounded btnEliminar"
                                        iduser="${data.id_user}">
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
                        // this.resetModalUser();

                        // const form = document.getElementById("addUserForm");
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

    /* -------------------------------------------------------------------------- */
    /*                    Capturar Evento Click De Los Botones                    */
    /* -------------------------------------------------------------------------- */

    btnAction() {

        const cardTable = document.getElementById('cardTable');


        cardTable.addEventListener('click', async (e) => {
            e.preventDefault();



            if (e.target.classList.contains('btnEliminar')) {
                const btnEliminar = e.target;
                const idUser = btnEliminar.getAttribute("iduser");
                console.log('pulsaste Borrar', idUser);
                btnEliminar.disabled = true;
                this.delete.deleteRegister(idUser, btnEliminar);
            }

            if (e.target.classList.contains('btnEditar')) {
                const btnEditar = e.target;
                const idUser = btnEditar.getAttribute("iduser");

                btnEditar.disabled = true;
                btnEditar.innerHTML = `
                    <div class="spinner-border" role="status"></div>
                `;

                const dataUser = await this.update.getUser(idUser);// Extraer datos del usuario
                this.update.InitModalUpdate(dataUser, btnEditar);// Iniciar el Modal con los datos del usuario
                this.update.updateUser(this.token, idUser);

                //form.addEventListener("change", this.detectChangesAndStore);
            }
        });
    }

    detectChangesAndStore(event) {
        const modifiedFields = {};

        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        // Si el campo no existe en el objeto modifiedFields, lo agregamos con su valor actual.
        if (!modifiedFields.hasOwnProperty(fieldName)) {
            modifiedFields[fieldName] = fieldValue;
        } else {
            // Si el campo existe en el objeto modifiedFields y su valor ha vuelto al valor original, lo eliminamos del objeto.
            const originalValue = formElement.elements[fieldName].defaultValue;
            if (fieldValue === originalValue) {
                delete modifiedFields[fieldName];
            } else {
                // Si el campo existe en el objeto modifiedFields y su valor ha cambiado nuevamente, actualizamos su valor en el objeto.
                modifiedFields[fieldName] = fieldValue;
            }
        }
        this.modifiedFields += modifiedFields;
        console.log(this.modifiedFields);
    }

    resetModalUser() {
        document.getElementById('addUserForm').reset();
        document.getElementById('imgPortada').src = this.app.uploads_url + "/users/default.jpg";
        document.getElementById('tituloPrincipalModal').textContent = "Agregar Usuario";
        const form = document.getElementById("addUserForm");
        const rolInput = form.elements['rol'];
        rolInput.disabled = false;
    }

}