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
                document.getElementById('messageAddCategory').innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        <i class="far fa-exclamation-circle"></i> 
                        Por favor rellena los campos obligatorios.
                    </div>
                `;
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
            console.log(res);

            Swal.fire(
                '¡Exito!',
                `${res.message}`,
                `${res.status}`
            ).then((result) => {
                $('#modalAddCategory').modal('hide')
                document.getElementById('addCategoryForm').reset();
                this.helpers.buttonStatus('btnAddCategory', "Guardar", false)
                const id_category = res.data.id_category;
                this.helpers.updateSelectCategories(category, id_category)
            });

        } catch (error) {

            let data = await error.json();
            this.helpers.showErrorAlert(data);
            this.helpers.buttonStatus('btnAddCategory', false, "Guardar");
        }
    }

}