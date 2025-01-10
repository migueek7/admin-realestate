<div class="modal fade" id="modalUpdateUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title" id="tituloPrincipalModal">Agregar Usuario</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <div class="modal-body p-0" style="overflow: hidden;">

                <form id="updateUserForm" method="post" class="form-row formUsuario needs-validation" novalidate>

                    <div class="col-lg-6 bg-light d-flex justify-content-center align-items-center">
                        <input type="hidden" id="idusuario" name="idusuario" value="">
                        <!-- FOTO DEL USUARIO -->

                        <div class="file-field">

                            <div class="d-flex justify-content-center">
                                <div class="modal-portada">
                                    <?php getComponent("property/portada", ["id" => "userCoverForm", "portada" => null, "carpeta" => "users"]);  ?>
                                </div>
                            </div>

                        </div>

                        <div id="respuestaFoto" class="py-2"></div>
                    </div>

                    <div class="col-lg-6 p-3 p-lg-5">
                        <!-- DATOS DEL USUARIO -->

                        <div class="form-group">
                            <label for="nameUser">Nombre</label>

                            <input type="text" id="nameUser" name="name" class="form-control" value="" required>
                            <p class="help-block"></p>
                        </div>

                        <div class="form-group">
                            <label for="emailUser">Email</label>
                            <input type="email" id="emailUser" name="email" class="form-control" value="" required>
                            <p class="help-block"></p>
                        </div>

                        <div class="form-group">
                            <label for="phoneUser">Teléfono o Celular</label>
                            <input type="email" id="phoneUser" name="phone" class="form-control" value="" required>
                            <p class="help-block"></p>
                        </div>

                        <div class="form-group">
                            <label for="">Contraseña</label>
                            <div class="input-group">
                                <input type="password" id="passwordUser" name="password" class="form-control" autocomplete="new-password" required>
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <a id="btnShowPassword">
                                            <i class="fas fa-eye" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <p class="help-block"></p>
                        </div>

                        <div class="form-group">
                            <label for="">Rol del usuario</label>
                            <select class="form-control custom-select browser-default" id="rolUser" name="rol" required>
                                <option value="">Seleccionar</option>
                                <?php foreach ($data as $key => $value) : ?>
                                    <option value="<?= $value['id'] ?>"><?= $value["name"]; ?></option>
                                <?php endforeach; ?>
                            </select>
                            <p class="help-block"></p>
                        </div>

                        <div id="respuestaUsuario"></div>

                    </div>

                    <div class="col-12 d-flex justify-content-center pt-3 border-top">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">CERRAR</button>
                        <button type="button" id="btnUpdateUser" class="btn btn-primary">ACTUALIZAR</button>
                    </div>

                </form>

            </div>

            <!-- <div class="modal-footer">
                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                <button type="submit" id="botonUsuario" class="btn btn-primary">Agregar</button>
            </div> -->

        </div>
    </div>
</div>