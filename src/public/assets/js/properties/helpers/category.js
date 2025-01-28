import Modules from '../../modules.js';
import Helpers from '../../helpers.js';
import ValidateHelper from '../helpers/validate.js';

export default class Category {

    constructor(token) {
        this.modules = new Modules();
        this.app = this.modules.app();
        this.helpers = new Helpers();
        this.validate = new ValidateHelper();
        this.add(token);
    }

    getCategory() {
        return fetch(this.app.apirest_url + "/property/categories", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (!response.ok) throw new Error(response.status);
            return response.json();
        }).then(data => {
            return data;
        }).catch(error => {
            console.error("Error", error);
        });
    }

    /* -------------------------------------------------------------------------- */
    /*                              Agregar Categoria                             */
    /* -------------------------------------------------------------------------- */

    add(token) {
        document.getElementById('btnAddCategory').onclick = (e) => {
            this.helpers.buttonStatus('btnAddCategory', true);
            this.helpers.btnLoad('btnAddCategory');

            const validaFormulario = this.validate.validaFormulario('addCategoryForm');

            const category = document.getElementById('categoryForm').value.trim();
            const cover = document.getElementById('categoryCoverForm').files[0];
            const slug = document.getElementById('categorySlugForm').value.trim();

            if (validaFormulario) {
                $(".alert").remove();
                this.save(token, category, slug, cover);
            } else {
                document.getElementById('messageAddCategory').innerHTML =
                    this.helpers.getAlert("", "danger", 'Por favor rellena los campos obligatorios.');
                this.helpers.buttonStatus('btnAddCategory', false, "Guardar");
            }
        }
    }

    async save(token, category, slug, cover) {
        let formData = new FormData();
        formData.append("category", category);
        const slugClean = this.helpers.Slugify(slug);
        formData.append("slug", slugClean);
        formData.append("cover", cover);

        try {
            const response = await fetch(this.app.apirest_url + "/property/category", {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
                body: formData,
                redirect: 'follow'
            });

            if (!response.ok) throw await response.json();

            const res = await response.json();
            console.log("res", res);
            if (res.status === "Created") {
                Swal.fire(
                    '¡Exito!',
                    `${res.message}`,
                    `success`
                ).then((result) => {
                    $('#modalAddCategory').modal('hide')
                    document.getElementById('addCategoryForm').reset();
                    this.helpers.buttonStatus('btnAddCategory', false, "Guardar")
                    const id_category = res.data.id_category;
                    this.helpers.updateSelectCategories(category, id_category)
                });
            }
        } catch (error) {
            if (typeof error == "object" && error.status === "Conflict") {
                document.getElementById('messageAddCategory').innerHTML = this.helpers.getAlert("", "danger", error.message);
                // this.helpers.showErrorAlert(error);
                this.helpers.buttonStatus('btnAddCategory', false, "Guardar");
            } else {
                this.helpers.showErrorAlert();
                this.helpers.buttonStatus('btnAddCategory', false, "Guardar");
            }
            console.error("Error", error);
        }
    }

}