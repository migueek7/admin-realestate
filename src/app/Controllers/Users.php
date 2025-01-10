<?php

namespace App\Controllers;

class Users extends Controller
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

    function users()
    {
        $this->protectedPage();

        $styles = [
            'plugins/bootstrap.min',
            'plugins/mdb.min',
            'plugins/addons/datatables.min',
            'plugins/addons/datatables-select.min',
            'users'
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
            'users'
        ];

        $getDatatables = [
            "Foto" => "photo",
            "Nombre" => "name",
            "Correo" => "email",
            "Teléfono" => "phone",
            "Rol" => "rol",
            "Acciones" => null
        ];

        $configSeo = [
            "title"         => "Agentes - " . $this->sitioweb,
            "description"   => "descrion del pagina agentes",
            "keywords"      => "palabras, claves"
        ];

        $roles = $this->getRecursos("user/rol/", "GET");
        //pre($roles);

        $this->templates->addData([
            'roles' => $roles,
            'configSeo' => $configSeo,
            'styles' => $styles,
            'scripts' => $scripts,
            'datatables' => $getDatatables
        ]);

        echo $this->templates->render($this->preffix . '/users/agents');
    }

    function login()
    {
        $configSeo = [
            "title"         => "Login - " . $this->sitioweb,
            //"title"         => "Login - ",
            "description"   => "Login de sistema web autoadministrable",
            "keywords"      => "palabras, claves",
            // "author"        => $this->author
        ];

        $this->templates->addData(['configSeo' => $configSeo]);
        echo $this->templates->render($this->preffix . '/login');
    }

    function logOut()
    {
        if (isset($_SESSION)) {
            // session_start();
            session_unset();
            session_destroy();
            header('Location:' . base_url() . "/login");
            exit();
        } else {
            header('Location:' . base_url() . "/login");
            exit();
        }
    }

    function setToken()
    {

        if (isset($_POST)) {

            $_SESSION["login"] = [
                "id_user"   => $_POST["id_user"],
                "name"      => $_POST["name"],
                "rol"       => $_POST["rol"],
                "token"     => $_POST["token"]
            ];

            echo "ok";
        }
    }
}
