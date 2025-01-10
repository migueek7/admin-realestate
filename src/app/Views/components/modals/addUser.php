<div class="modal fade" id="modalAddUser" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog cascading-modal" role="document">
        <!--Content-->
        <div class="modal-content">

            <!--Header-->
            <div class="modal-header light-blue darken-3 white-text">
                <h4 class="title"><i class="fa fa-newspaper-o"></i> Agregar Usuario</h4>
                <button type="button" class="close waves-effect waves-light" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <!--Body-->
            <div class="modal-body mb-0">

                <form id="addCategoryForm">
                    <h4 class="mb-2 font-weight-bold text-center">Portada</h4>

                    <div class="d-flex justify-content-center">
                        <div class="modal-portada">
                            <?php getComponent("property/portada", ["id" => "categoryCoverForm", "portada" => null]);  ?>
                        </div>
                    </div>

                    <div class="md-form mt-2">
                        <!-- <i class="fa fa-lock prefix"></i> -->
                        <i class="fas fa-tag prefix mt-2"></i>
                        <input type="text" id="categoryForm" class="form-control form" length="30" required>
                        <label for="categoryForm">Nombre</label>
                    </div>

                    <div class="md-form mt-2">
                        <!-- <i class="fa fa-lock prefix"></i> -->
                        <i class="fas fa-tag prefix mt-2"></i>
                        <input type="text" id="puestoForm" class="form-control form" length="30" required>
                        <label for="categoryForm">Puesto</label>
                    </div>

                    <div class="md-form mt-2">
                        <i class="fas fa-link prefix mt-2"></i>
                        <input type="text" id="categorySlugForm" class="form-control form" length="30" required>
                        <label for="categorySlugForm">Correo</label>
                    </div>

                    <div class="md-form mt-2">
                        <i class="fas fa-link prefix mt-2"></i>
                        <input type="text" id="categorySlugForm" class="form-control form" length="30" required>
                        <label for="categorySlugForm">Teléfono</label>
                    </div>

                    <?php
                    $propiedades = [
                        "id" => "userRolForm",
                        "data" => $roles,
                        "text" => "rol",
                        "optionTitle" => "Elegir Rol",
                        "required" => true
                    ];
                    getComponent("form/select", $propiedades);
                    ?>


                    <!-- <p class="text-muted"><small>Agrega ó edita la url de la categoria</small></p> -->
                    <div id="messageAddCategory"></div>

                    <div class="text-center mt-1-half">
                        <button type="button" id="btnAddCategory" class="btn btn-info mb-1">
                            Guardar
                            <!-- <i class="fa fa-check ml-1"></i> -->
                        </button>
                    </div>
                </form>

            </div>
        </div>
        <!--/.Content-->
    </div>
</div>
<!--Modal: Subscription From-->