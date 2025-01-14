<?php

namespace App\Controllers;
// use App\Models\Ejemplo;

class Pages extends Controller
{

    private $preffix;
    private $sitioweb;
    // private $author;

    function __construct()
    {
        parent::__construct();
        session_start();
        $this->preffix = 'pages/';
        $this->sitioweb = $_ENV['NAME_SITE'];
        // $this->author = author_name();
    }

    function blankPage()
    {
        $this->protectedPage();

        $styles = [
            'plugins/bootstrap.min',
            'plugins/mdb.min',
            'plugins/addons/datatables.min',
            'plugins/addons/datatables-select.min'
        ];

        $scripts = [
            'plugins/jquery-3.4.1.min',
            'plugins/popper.min',
            'plugins/bootstrap.min',
            'plugins/mdb.min',
            // 'main'
        ];

        $configSeo = [
            "title"         => "Inicio - " . $this->sitioweb,
            // "title"         => "Inicio - ",
            "description"   => "descrion del home",
            "keywords"      => "palabras, claves",
            // "author"        => $this->author
        ];

        $this->templates->addData([
            'configSeo' => $configSeo,
            'styles' => $styles,
            'scripts' => $scripts
        ]);
        echo $this->templates->render($this->preffix . '/blankPage');
    }

    function datatables()
    {
        $styles = [
            'plugins/bootstrap.min',
            'plugins/mdb.min',
            'plugins/addons/datatables.min',
            'plugins/addons/datatables-select.min'
        ];

        $scripts = [
            'plugins/jquery-3.4.1.min',
            'plugins/popper.min',
            'plugins/bootstrap.min',
            'plugins/mdb.min',
            // 'main'
        ];

        $configSeo = [
            // "title"         => "Inicio - " . $this->sitioweb,
            "title"         => "Inicio - ",
            "description"   => "descrion del home",
            "keywords"      => "palabras, claves",
            // "author"        => $this->author
        ];

        $this->templates->addData([
            'configSeo' => $configSeo,
            'styles' => $styles,
            'scripts' => $scripts
        ]);
        echo $this->templates->render($this->preffix . '/properties/dataTables');
    }

    /* -------------------------------------------------------------------------- */
    /*                            Lista de Propiedades                            */
    /* -------------------------------------------------------------------------- */

    function properties()
    {

        $this->protectedPage();

        // $categories = new Ejemplo();
        // $categories->getAgenda();
        // pre($categories);

        $styles = [
            'plugins/bootstrap.min',
            'plugins/mdb.min',
            'plugins/addons/datatables.min',
            'plugins/addons/datatables-select.min',
            'properties'
        ];

        $scripts = [
            'plugins/jquery-3.4.1.min',
            'plugins/popper.min',
            'plugins/bootstrap.min',
            'plugins/mdb.min',
            'plugins/addons/datatables.min',
            'plugins/addons/datatables-select.min',
            'plugins/addons/dataTables.buttons.min',
            'plugins/sweetalert2.all.min',
            'properties',
            // 'properties'
        ];

        $configSeo = [
            "title"         => "Propiedades - " . $this->sitioweb,
            // "title"         => "Inicio - " . $_ENV["NAME_SITE"],
            "description"   => "descrion del home",
            "keywords"      => "palabras, claves",
            // "author"        => $this->author
        ];

        $getDatatables = [
            "Id" => "id_property",
            "Imagen" => "property_image",
            "Categoria" => "type",
            "Ciudad" => "city",
            "Estado" => "name_status",
            "Precio" => "price",
            "Agente" => "agent",
            "Status" => "statu",
            "Acciones" => null
        ];


        $this->templates->addData([
            'configSeo' => $configSeo,
            'styles' => $styles,
            'scripts' => $scripts,
            'datatables' => $getDatatables
        ]);
        echo $this->templates->render($this->preffix . '/properties/propertyList');
    }

    function dataTable()
    {
        $getDatatables = [
            "Id" => "id_property",
            "Imagen" => "property_image",
            "Categoria" => "type",
            "Ciudad" => "city",
            "Estado" => "name_status",
            "Precio" => "price",
            "Agente" => "agent",
            "Status" => "statu",
            "Acciones" => null
        ];

        echo json_encode($getDatatables);
    }


    function addProperty()
    {
        $this->protectedPage();

        // $this->getToken(false);
        // echo "Hola desde addProperty<br>";

        $styles = [
            'plugins/bootstrap.min',
            'plugins/mdb.min',
            'plugins/dropzone.min',
            'plugins/leaflet',
            'plugins/leaflet-locationpicker',
            // 'plugins/bootstrap-datetimepicker.min',
            'addProperty',
            'inputNumber'
        ];

        $scripts = [
            'plugins/jquery-3.4.1.min',
            'plugins/popper.min',
            'plugins/bootstrap.min',
            'plugins/mdb.min',
            'plugins/dropzone.min',
            'plugins/leaflet',
            'plugins/leaflet-locationpicker',
            'plugins/sweetalert2.all.min',
            'plugins/vendor/tinymce/tinymce.min',
            'plugins/jquery.mask',
            // 'plugins/moment.min',
            // 'plugins/bootstrap-datetimepicker.min',
            'properties',
            // 'addProperty'
        ];

        $configSeo = [
            "title"         => "Agregar Propiedad - " . $this->sitioweb,
            //"title"         => "Agregar Propiedad - ",
            "description"   => "descrion del home",
            "keywords"      => "palabras, claves",
            // "author"        => $this->author
        ];

        $categories = $this->getRecursos("property/categories", "GET");
        $subcategories = $this->getRecursos("property/subcategories", "GET");

        // var_dump($categories);
        // return;
        $status = $this->getRecursos("property/status", "GET");
        $currencies = $this->getRecursos("property/currencies", "GET");
        $users = $this->getRecursos("user/", "GET");
        //pre($users["data"]);

        $this->templates->addData([
            'configSeo' => $configSeo,
            'styles' => $styles,
            'scripts' => $scripts,
            'categories' => $categories,
            'subcategories' => $subcategories,
            'status' => $status,
            'currencies' => $currencies,
            'users' => $users["data"]
        ]);

        echo $this->templates->render($this->preffix . '/properties/addProperty');
    }

    function updateProperty($params)
    {

        $this->protectedPage();

        $idProperty = $params["action"];

        $styles = [
            'plugins/bootstrap.min',
            'plugins/mdb.min',
            'plugins/dropzone.min',
            'plugins/leaflet',
            'plugins/leaflet-locationpicker',
            'plugins/bootstrap-datetimepicker.min',
            'plugins/bootstrap-multiselect.min',
            'addProperty',
            'inputNumber'
        ];

        $scripts = [
            'plugins/jquery-3.4.1.min',
            'plugins/jquery-ui.min',
            'plugins/popper.min',
            'plugins/bootstrap.min',
            'plugins/mdb.min',
            'plugins/dropzone.min',
            'plugins/sweetalert2.all.min',
            'plugins/leaflet',
            'plugins/leaflet-locationpicker',
            'plugins/vendor/tinymce/tinymce.min',
            'plugins/moment.min',
            'plugins/bootstrap-datetimepicker.min',
            // 'plugins/modules/material-select',
            'plugins/bootstrap-multiselect.min',
            'plugins/jquery.mask',
            'properties',
            // 'addProperty',
            // 'updateProperty'
        ];

        $configSeo = [
            // "title"         => "Agregar Propiedad - " . $this->sitioweb,
            "title"         => "Agregar Propiedad - ",
            "description"   => "descrion del home",
            "keywords"      => "palabras, claves",
            // "author"        => $this->author
        ];

        $categories = $this->getRecursos("property/categories", "GET");
        // pre($categories);
        $status = $this->getRecursos("property/status", "GET");
        //pre($status);
        $currencies = $this->getRecursos("property/currencies", "GET");
        //pre($currencies);
        $propertyDetails = $this->getRecursos("property/$idProperty", "GET");
        // print_r($propertyDetails);
        // exit();
        $users = $this->getRecursos("user/", "GET");
        // pre($users["data"]);

        // $propertyDetails["description"] = htmlspecialchars($propertyDetails["description"]);


        if (!$propertyDetails) {
            header('Location:' . $_ENV['BASE_URL'] . '/properties');
            exit();
        }

        $this->templates->addData([
            'configSeo' => $configSeo,
            'styles' => $styles,
            'scripts' => $scripts,
            'categories' => $categories,
            'status' => $status,
            'currencies' => $currencies,
            'property' => $propertyDetails,
            'users' => $users["data"]
        ]);


        echo $this->templates->render($this->preffix . '/properties/addProperty');
    }

    function prueba()
    {
        // echo "hola guapo";
        if (isset($_POST)) {
            pre($_POST);
        }
    }

    function perfil()
    {

        if (empty($_SESSION["login"])) {
            header('Location:' . base_url());
            die();
        }

        echo "controlador Perfil";
    }

    function contact()
    {

        $styles = [
            css() . 'style',
            css() . 'contact'
        ];

        $scripts = [
            // js().'main',
            js() . 'contact'
        ];

        $configSeo = [
            "title"         => "Contacto",
            "description"   => "descrion de contacto",
            "keywords"      => "palabras, claves"
        ];

        $this->templates->addData([
            'configSeo' => $configSeo,
            'styles' => $styles,
            'scripts' => $scripts
        ]);
        echo $this->templates->render($this->preffix . 'contact');
    }

    function error404()
    {
        $this->protectedPage();

        $styles = [
            'plugins/bootstrap.min',
            'plugins/mdb.min',
        ];

        $scripts = [
            'plugins/jquery-3.4.1.min',
            'plugins/popper.min',
            'plugins/bootstrap.min',
            'plugins/mdb.min',
            // 'main',
        ];

        $configSeo = [
            'title' => "Error 404"
        ];
        $this->templates->addData([
            'configSeo' => $configSeo,
            'styles' => $styles,
            'scripts' => $scripts
        ]);
        echo $this->templates->render($this->preffix . 'error404');
    }


    static function validateToken()
    {
        $response = self::getRecursos("user/check-token", "GET");
        pre($response);
    }

    // static function getToken()
    // {
    //     if (isset($_SESSION["login"])) {
    //         $token = $_SESSION["login"]["token"];
    //         // $token = "sdvdsvdsvvds";
    //         echo $token;
    //     }
    // }
}
