import Modules from '../../modules.js';
import Delete from './delete.js';


export default class Read {

    constructor() {
        this.modules = new Modules();
        this.app = this.modules.app();
        this.folder = this.app.folder;
        //DataTable
        let table = this.initDataTable();
        this.delete = new Delete(table);
        this.btnAction();
    }

    initDataTable() {

        const app = this.app;
        const modules = this.modules;

        this.table = $('#dtMaterialDesignExample').DataTable({
            "ajax": {
                url: app.apirest_url + "/property",
                dataSrc: "data",
                type: "GET",
            },
            "order": [[0, "desc"]],
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
            "columnDefs": [
                {
                    "targets": 1,
                    "class": "imagen",
                    "render": function (data) {
                        return `
                            <img loading="lazy" src="${app.uploads_url}/properties/${data.image_property}" class="img-fluid" style="max-height: 50px">
                        `;
                    }
                },
                {
                    "targets": 2,
                    "class": "categoria",
                    "render": function (data) {
                        return `
                        ${data.category}
                    `;
                    }
                },
                {
                    "targets": 3,
                    "class": "ubicacion",
                    "render": function (data) {
                        return `
                        ${data.city}
                    `;
                    }
                },
                {
                    "targets": 4,
                    "class": "usuario",
                    "render": function (data) {
                        let color = "primary";
                        let template = ``;

                        if (data.status.length > 0) {
                            Object.values(data.status).forEach(value => {
                                if (value.status_id == 1) color = "success";
                                if (value.status_id == 2) color = "primary";
                                if (value.status_id == 3) color = "danger";
                                if (value.status_id == 5) color = "danger";
                                if (value.status_id == 6) color = "success";
                                template += `
                                    <span class="badge badge-pill badge-${color}" >
                                        ${value.status} 
                                    </span>
                                `;
                            });
                        } else {
                            color = "danger";
                        }
                        return template;
                    }
                },
                {
                    "targets": 5,
                    "class": "precio",
                    "render": function (data) {
                        let response = ``;
                        if (data.offer_price > 0) {
                            response = `
                                <span style="text-decoration-line: line-through; color: gray">$ ${modules.formatMoney(data.price, data.currency)} ${data.currency}</span> <br>
                                $ ${modules.formatMoney(data.offer_price, data.currency)} ${data.currency}
                            `;
                        } else {
                            response = `
                                $ ${modules.formatMoney(data.price, data.currency)} ${data.currency}
                            `;
                        }
                        return response;
                    }
                },
                {
                    "targets": 6,
                },
                {
                    "targets": 7,
                    "class": "usuario",
                    "render": function (data) {
                        let statu;
                        if (Number(data.status_property)) {
                            statu = `
                            <span class="badge badge-pill badge-success " >
                                Activo 
                            </span>
                        `;
                            if (Number(data.featured) == 1) {
                                statu += `
                            <span class="badge badge-pill badge-warning" >
                                Destacado 
                            </span> `;
                            }
                        } else {
                            statu = `
                            <span class="badge badge-pill badge-danger " >
                                Inactivo 
                            </span>
                        `;
                        }
                        return statu;
                    }
                },
                {
                    "targets": 8,
                    "sortable": false,
                    "class": "acciones",
                    "render": function (data) {
                        return `
                        <div class="text-right" style="margin-left: auto;">

                            <button type="button" 
                                class="btn btn-info btn-sm btn-rounded btnDetalle" 
                                idproperty="${data.id_property}">
                                    <i class="fas fa-eye fa-md"></i>
                            </button>

                            <button type="button" 
                                class="btn btn-primary btn-sm btn-rounded btnEditar" 
                                idproperty="${data.id_property}">
                                    <i class="fas fa-edit fa-md"></i>
                            </button>

                            <button type="button" 
                                class="btn btn-danger btn-sm btn-rounded btnEliminar"
                                idproperty="${data.id_property}">
                                    <i class="fas fa-trash-alt fa-md"></i>
                            </button>
                        <div>
                    `;
                    }
                },
            ],
            columns: [
                { "data": "id_property" },
                { "data": null },
                { "data": null },
                { "data": null },
                { "data": null },
                { "data": null },
                { "data": "agent" },
                { "data": null },
                { "data": null }
            ],
            dom: "<'row'<'col-md-3'B><'col-md-9 dt-left'fl>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
            buttons: [
                {
                    text: '<i class="fas fa-plus fa-md"></i> Agregar',
                    className: 'btn btn-sm btn-success btn-rounded btnAgregar',
                    action: function (e, dt, node, config) {
                        window.location = 'add-property';
                    }
                }
            ],
            responsive: true,
        });

        return this.table;
    }

    /* -------------------------------------------------------------------------- */
    /*                    Capturar Evento Click De Los Botones                    */
    /* -------------------------------------------------------------------------- */

    btnAction() {

        const cardTable = document.getElementById('cardTable');

        cardTable.addEventListener('click', (e) => {
            e.preventDefault();



            if (e.target.classList.contains('btnEliminar')) {
                const IDRegistro = e.target.getAttribute("idproperty");
                e.target.disabled = true;

                this.delete.deleteRegister(IDRegistro, e.target);
            }

            if (e.target.classList.contains('btnEditar')) {
                const IDRegistro = e.target.getAttribute('idproperty');

                /* --------------------- Desbloquear BTN en status Load --------------------- */

                let btnEditar = document.querySelectorAll('.btnEditar');
                btnEditar.forEach(element => {

                    // Desbloquea los botones de editar cuando se presiona otro boton de editar
                    if (element.getAttribute("idproperty") != IDRegistro) {
                        element.innerHTML = '<i class="fas fa-edit fa-md"></i>';
                        element.disabled = false;
                    }
                });

                /* ---------------------- Cambiar Status del BTN a Load --------------------- */

                e.target.disabled = true;
                e.target.disabled = true;
                // this.helpers.btnLoad('btnSave');
                console.log(e.target);
                e.target.disabled = true;
                // this.helpers.btnLoad('btnSave');
                console.log(e.target);

                e.target.innerHTML = `
                    <div class="spinner-border" role="status"></div>
                `;

                /* ---------------------- Redirigir a la pagina editar ---------------------- */

                location.href = this.app.base_url + "/update-property/" + IDRegistro;
            }
        });
    }

}