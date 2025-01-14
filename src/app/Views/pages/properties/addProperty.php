<?= $this->layout('layouts/layout'); ?>

<!-- Section: Create Page -->
<?php
// isset($property) ? pre($property) : '';
// isset($status) ? pre($status) : '';
?>

<section class="container-xl container-fluid">


    <!-- Grid row -->
    <form id="FormInmueble" class="row my-3 my-md-5 needs-validation" novalidate>

        <!-- Grid column -->
        <div class="col-lg-8">

            <!-- First card -->
            <div class="card mb-4 post-title-panel">
                <div class="card-body">

                    <input type="hidden" id="agent_id" value="<?= $_SESSION["login"]["id_user"] ?>">

                    <div class="row">
                        <div class="col-sm-6">
                            <div class="md-form d-flex selectUsuario w-100">
                                <i class="fas fa-user" style="height: 42px;width: 42px;display: flex;align-items: center;font-size: 20px;"></i>
                                <?php
                                $propiedades = [
                                    "id" => "usersForm",
                                    "data" => $users,
                                    "nameid" => "id_user",
                                    "text" => "name_user",
                                    "optionTitle" => "Seleccionar Agente",
                                    "required" => true,
                                    "roles" => true
                                ];
                                if (isset($property)) {
                                    // $propiedades["value"] = $_SESSION["login"]["id_user"];
                                    $propiedades["value"] = $property['agent_id'];
                                } else {
                                    $propiedades["value"] = null;
                                }
                                getComponent("form/select", $propiedades);
                                ?>
                            </div>
                        </div>

                        <div class="col-sm-6">

                            <?php if (isset($property)) : ?>
                                <div class="d-flex mt-1">
                                    <div class="input-group md-form">
                                        <input type="text" id="datetimepicker1" class="form-control" placeholder="<?= isset($property) ? $property["updated_at_property"] : "00/00/0000 0:00" ?>" value="<?= isset($property) ? $property["updated_at_property"] : "" ?>">
                                        <div class="input-group-append">
                                            <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                                        </div>
                                    </div>
                                </div>
                            <?php endif; ?>

                        </div>
                    </div>



                    <?php
                    $propiedades = [
                        "id" => "titleForm",
                        "text" => "Titulo",
                        // "icon" => '<i class="fa fa-pencil prefix"></i>',
                        "length" => "80",
                        "required" => true
                    ];
                    isset($property) ? $propiedades["value"] = htmlspecialchars($property['title']) : null;
                    getComponent("form/inputText", $propiedades);
                    ?>

                    <!-- Titulo en ingles -->
                    <?php
                    // $propiedades = [
                    //     "id" => "titleFormEn",
                    //     "text" => "Titulo en Ingles",
                    //     "icon" => '<i class="fa fa-pencil prefix"></i>',
                    //     "length" => "80",
                    //     "required" => true
                    // ];
                    // isset($property) ? $propiedades["value"] = htmlspecialchars($property['title_en']) : null;
                    // getComponent("form/inputText", $propiedades);
                    ?>


                    <?php
                    $propiedades = [
                        "id" => "extractForm",
                        "text" => "Extracto",
                        // "icon" => '<i class="fa fa-pencil prefix"></i>',
                        "length" => "170",
                        "required" => true
                    ];
                    isset($property) ? $propiedades["value"] = htmlspecialchars($property['extract']) : null;
                    getComponent("form/textarea", $propiedades);
                    ?>


                    <div class="row align-items-center">

                        <div class="col-md-6 col-sm-6">
                            <!-- Categoria -->
                            <div class="md-form d-flex selectCategoria">
                                <i class="fas fa-tags" style="height: 42px;width: 42px;display: flex;align-items: center;font-size: 20px;"></i>
                                <?php
                                $propiedades = [
                                    "id" => "categoriesForm",
                                    "data" => $categories,
                                    "nameid" => "id_category",
                                    "text" => "category",
                                    "optionTitle" => "Elegir Categoría",
                                    "required" => true
                                ];
                                isset($property) ? $propiedades["value"] = $property['category_id'] : null;
                                getComponent("form/select", $propiedades);
                                ?>
                                <button type="button" class="rounded-sm btnFormIcon" data-toggle="modal" data-target="#modalAddCategory">
                                    <i class="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>


                        <div class="col-md-6 col-sm-6">

                            <!----------------------------------------------------------------------------->
                            <!--                             Seleccionar Status                          -->
                            <!----------------------------------------------------------------------------->

                            <div class="d-flex form-outline">
                                <i class="fas fa-sign" style="height: 42px;width: 42px;display: flex;align-items: center;font-size: 20px;"></i>

                                <select id="myMultiselect" class="mdb-select multi form" multiple="multiple" value="<?= isset($property["status"]) ? true : false ?>" required>

                                    <option value="" disabled selected="<?= isset($property["status"]) ? true : false ?>">Seleccionar Status</option>
                                    <?php
                                    foreach ($status as $key => $value) : ?>
                                        <option value="<?= $value["id_status"] ?>" <?php
                                                                                    if (isset($property["status"])) {
                                                                                        if (compararCamposDeStatus($value["id_status"], $property["status"])) {
                                                                                            echo "selected";
                                                                                        }
                                                                                    }
                                                                                    ?>>
                                            <?= $value["status"] ?>
                                        </option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="row">

                        <?php
                        $show = null;
                        if (isset($property)) {
                            if (
                                $property["category_id"] == 1 ||
                                $property["category_id"] == 2 ||
                                $property["category_id"] == 3
                            ) {
                                $show = 'show mt-5 my-md-3';
                            }
                        }
                        ?>
                        <div class="col-12 inputNumber <?= $show ?>">
                            <?php
                            $value = isset($property) ? $property["bedrooms"] : 0;
                            $data = [
                                "id" => "bedroomsForm",
                                "value" => $value,
                                "label" => "No. Recamarás",
                                "required" => true
                            ];
                            getComponent("form/inputNumber", $data);
                            ?>

                            <?php
                            $value = isset($property) ? $property["bathrooms"] : 0;
                            $data = [
                                "id" => "bathroomsForm",
                                "value" => $value,
                                "label" => "No. Baños",
                                "step" => ".5",
                                "required" => true
                            ];
                            getComponent("form/inputNumber", $data);
                            ?>

                            <?php
                            $value = isset($property) ? $property["garage"] : 0;
                            $data = [
                                "id" => "garageForm",
                                "value" => $value,
                                "label" => "Cochera",
                                "required" => true
                            ];
                            getComponent("form/inputNumber", $data);
                            ?>

                            <?php
                            $value = isset($property) ? $property["floors"] : 0;
                            $data = [
                                "id" => "floorForm",
                                "value" => $value,
                                "label" => "Pisos",
                                "required" => true
                            ];
                            getComponent("form/inputNumber", $data);
                            ?>
                        </div>
                    </div>

                    <div class="row">

                        <div class="col-md-4 col-sm-6 precio">
                            <?php
                            $propiedades = [
                                "id" => "priceTextForm",
                                "text" => "Texto Del Precio",
                                // "icon" => '<i class="prefix">$</i>',
                                "type" => 'text',
                                // "required" => true
                            ];
                            isset($property) ? $propiedades["value"] = $property['price_text'] : null;
                            getComponent("form/inputText", $propiedades);
                            ?>
                        </div>

                        <div class="col-md-4 col-sm-6 precio">
                            <?php
                            $propiedades = [
                                "id" => "priceForm",
                                "text" => "Precio",
                                "icon" => '<i class="prefix">$</i>',
                                "type" => 'number',
                                "required" => true
                            ];
                            isset($property) ? $propiedades["value"] = $property['price'] : null;
                            getComponent("form/inputText", $propiedades);
                            ?>
                        </div>

                        <div class="col-md-4 col-sm-6 precio">
                            <?php
                            $propiedades = [
                                "id" => "offerPriceForm",
                                "text" => "Precio Oferta",
                                "icon" => '<i class="prefix">$</i>',
                                "type" => 'number',
                                "required" => false
                            ];
                            isset($property) ? $propiedades["value"] = $property['offer_price'] : null;
                            getComponent("form/inputText", $propiedades);
                            ?>
                        </div>

                        <div class="col-md-4 col-sm-6">
                            <!-- Currency -->
                            <div class="d-flex selectCurrency">
                                <i class="fas fa-money-bill-wave" style="height: 42px;width: 46px;display: flex;align-items: center;font-size: 20px;"></i>
                                <?php
                                $propiedades = [
                                    "id" => "currencyForm",
                                    "data" => $currencies,
                                    "nameid" => "id_currency",
                                    "text" => "currency",
                                    "optionTitle" => "Moneda",
                                    "required" => true
                                ];
                                isset($property) ? $propiedades["value"] = $property['currency_id'] : null;
                                getComponent("form/select", $propiedades);
                                ?>
                            </div>
                        </div>

                    </div>

                    <div class="row mt-3">

                        <div class="col-md-6 col-sm-6 featured">
                            <div class="border w-100 text-center px-2 py-4">
                                <?php
                                $propiedades = [
                                    "id" => "featuredForm",
                                    "label" => "Destacar Propiedad"
                                ];
                                isset($property) ? $propiedades["value"] = $property['featured'] : null;
                                getComponent("form/checkbox", $propiedades); ?>
                            </div>
                        </div>

                        <div class="col-md-6 col-sm-6 statu">
                            <div class="border w-100 text-center p-2">
                                <?php
                                $propiedades = [
                                    "id" => "statuForm",
                                    "checked" => false,
                                    "text" => "Activar propiedad",
                                    "label1" => "Off",
                                    "label2" => "On"
                                ];
                                isset($property) ? $propiedades["value"] = $property['status_property'] : null;
                                getComponent("form/switch", $propiedades);
                                ?>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <!-- First card -->



            <!-- Second card -->
            <div class="card mb-4">
                <textarea id="descriptionForm" class="form-control form" required>
                    <?php
                    if (isset($property)) {
                        echo $property["description"];
                    }
                    ?>
                </textarea>
            </div>
            <!-- Second card -->


            <div class="card mb-4">
                <div class="card-body ">


                    <!-- ADDRESS -->
                    <div class="row">
                        <div class="col-md-4">
                            <?php
                            $propiedades = [
                                "id" => "cityForm",
                                "text" => "Ciudad",
                                "required" => true
                            ];
                            isset($property) ? $propiedades["value"] = $property['city'] : null;
                            isset($property) ? $propiedades["attribute"] = ["origin", $property['city']] : null;
                            getComponent("form/inputText", $propiedades);
                            ?>
                        </div>

                        <div class="col-md-4">
                            <?php
                            $propiedades = [
                                "id" => "suburbForm",
                                "text" => "Colonia",
                                "required" => false
                            ];
                            isset($property) ? $propiedades["value"] = $property['suburb'] : null;
                            isset($property) ? $propiedades["attribute"] = ["origin", $property['suburb']] : null;
                            getComponent("form/inputText", $propiedades);
                            ?>
                        </div>

                        <div class="col-md-4">
                            <?php
                            $propiedades = [
                                "id" => "streetForm",
                                "text" => "Calle",
                                "required" => false
                            ];
                            isset($property) ? $propiedades["value"] = $property['street'] : null;
                            isset($property) ? $propiedades["attribute"] = ["origin", $property['street']] : null;
                            getComponent("form/inputText", $propiedades);
                            ?>
                        </div>


                        <div class="col-md-4">
                            <?php
                            $propiedades = [
                                "id" => "coordinatesForm",
                                "text" => "Coordenadas",
                                "required" => false
                            ];
                            isset($property) ? $propiedades["value"] = $property['coordinates'] : null;
                            //$propiedades["value"] = $property['coordinates'] != "" ? $property['coordinates'] : "23.212026, -106.414433";
                            isset($property) ? $propiedades["attribute"] = ["origin", $property['coordinates']] : null;
                            getComponent("form/inputText", $propiedades);
                            ?>
                        </div>

                        <div class="col-md-8">
                            <div style="width:100%; min-height: 180px; min-width: 200px;">
                                <!-- <input id="geoloc5" type="text" value="" size="20" /> -->
                                <div id="fixedMapCont" style="border: 1px solid black; width:100%; height:100%; min-height:180px; min-width: 200px;"></div>
                            </div>
                        </div>



                    </div>


                    <div class="row">
                        <!-- URL VIDEO -->
                        <div class="col-md-12">
                            <?php
                            $propiedades = [
                                "id" => "videoForm",
                                "text" => "URL Video Youtube ó Vimeo",
                                "required" => false
                            ];
                            isset($property) ? $propiedades["value"] = $property['url_video'] : null;
                            getComponent("form/inputText", $propiedades);
                            ?>
                        </div>
                        <!-- SUPERFICIE TERRENO -->
                        <div class="col-md-4">
                            <?php
                            $propiedades = [
                                "id" => "landForm",
                                "text" => "Sup. Terreno",
                                "required" => false
                            ];
                            isset($property) ? $propiedades["value"] = $property['land'] : null;
                            getComponent("form/inputText", $propiedades);
                            ?>
                        </div>
                        <!-- SUPERFICIE CONSTRUCCION -->
                        <div class="col-md-4">
                            <?php
                            $propiedades = [
                                "id" => "constructionForm",
                                "text" => "Sup. Contrucción",
                                "required" => false
                            ];
                            isset($property) ? $propiedades["value"] = $property['construction'] : null;
                            getComponent("form/inputText", $propiedades);
                            ?>
                        </div>
                    </div>


                </div>
            </div>


        </div>
        <!-- Grid column -->


        <!-- Grid column -->
        <div class="col-lg-4 ">

            <div class='position-sticky' style="top: 80px;margin-bottom: 25px;">
                <!-- Publisher -->
                <?php getComponent("property/publisher"); ?>
                <!-- Publisher -->

                <!-- Portada -->
                <div class="card card-cascade narrower mb-5">
                    <!-- Card image -->
                    <div class="view view-cascade gradient-card-header blue-gradient">
                        <h4 class="mb-0 font-weight-bold">Portada</h4>
                    </div>

                    <div class="card-body card-body-cascade text-center">
                        <?php
                        isset($property) ? $portada = $property['image_property'] : $portada = null;
                        getComponent("property/portada", ["id" => "datosImagen", "portada" => $portada, "carpeta" => "properties"]);
                        ?>
                    </div>
                </div>
                <!-- Portada -->
            </div>

        </div>
        <!-- Grid column -->


        <div class="col-12">

            <!-- Caracteristicas -->
            <div class="card mb-4">
                <div class="card-body ">
                    <div class="row">
                        <div class="col-12">

                            <?php
                            $features = isset($property['features']) ? $property['features'] : null;
                            getComponent("form/chips", $features);
                            ?>

                        </div>
                    </div>
                </div>
            </div>


            <div class="card mb-4">
                <!-- Dropzone -->
                <div class="card-body">

                    <p class="text-center">Tamaño recomendado: 1000px * 666px.</p>
                    <div id="previews" class="dropzone">
                        <div class="dz-message" data-dz-message>
                            <span>Arrastrar o dar click para subir imágenes</span>
                        </div>
                    </div>
                    <div class="respuestaDropzone"></div>

                </div>
                <!-- Dropzone -->

                <div class="card-body pt-0">

                    <?php if (isset($property)) { ?>
                        <input type="hidden" id="imagenes" data='<?= json_encode($property["images"], JSON_OBJECT_AS_ARRAY); ?>'>

                        <ul id="sortable3">
                            <?php
                            if (!empty($property["images"])) :
                                //arsort($property["images"]); //ordena de menor a mayor
                                foreach ($property["images"] as $key => $value) :
                            ?>
                                    <!-- <li class="col-lg-2 col-md-3 col-sm-4 col-6 mb-3 ui-state-default"> -->
                                    <li class="ui-state-default" style="background-image: url(<?= apirest_url(); ?>/public/<?= folder_url() ?>/images/properties/<?= $value["name"]; ?>)" position="<?= $value["position"] ?>" imageid="<?= $value["id_image"] ?>">
                                        <a class="remove_image" image="<?= $value["name"]; ?>">
                                            <i class="fas fa-window-close"></i>
                                        </a>
                                    </li>
                            <?php
                                endforeach;
                            endif;
                            ?>
                        </ul>
                    <?php } ?>
                </div>
            </div>



        </div>

    </form>
    <!-- Grid row -->
</section>
<!-- Section: Create Page -->


<?php getComponent("modals/addCategory"); ?>