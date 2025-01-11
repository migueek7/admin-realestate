<?php
// phpinfo();
/* -------------------------------------------------------------------------- */
/*                                    CORS                                    */
/* -------------------------------------------------------------------------- */
header('Access-Control-Allow-Origin: *');
// header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Authorization, Accept, Access-Control-Allow-Methods");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
// header("Allow: GET, POST, OPTIONS, PUT, DELETE");
// header("Access-Control-Allow-Credentials", "true");
// Manejar solicitudes preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

/* -------------------------------------------------------------------------- */
/*                     Configuracion de Carga de Archivos                     */
/* -------------------------------------------------------------------------- */

ini_set('upload_max_filesize', '10M');
ini_set('post_max_size', '34M');
ini_set('max_file_uploads', 50);

/* -------------------------------------------------------------------------- */
/*                               Mostrar Errores                              */
/* -------------------------------------------------------------------------- */

error_reporting(E_ALL);
ini_set('ignore_repeated_errors', TRUE);
ini_set('display_errors', TRUE); // Cambiar a FALSE en produccion
ini_set('log_errors', TRUE);
ini_set('error_log', './app/Logs/php-error.log');

/* -------------------------------------------------------------------------- */
/*                                  Includes                                  */
/* -------------------------------------------------------------------------- */

require_once "./vendor/autoload.php";
require_once "./app/Helpers/helpers.php";

/* -------------------------------------------------------------------------- */
/*                            VARIABLES DE ENTORNO                            */
/* -------------------------------------------------------------------------- */

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable('./');
$dotenv->load();

/* -------------------------------------------------------------------------- */
/*                    Eliminar "/" de la ruta controlador                     */
/* -------------------------------------------------------------------------- */

$url = !empty($_GET['url']) ? rtrim($_GET['url'], '/') : '/';
$arrayUrl = explode("/", strtolower($url));
$ruta = strtolower($arrayUrl[0]);

if (count($arrayUrl) == 1 && $arrayUrl[0] !== "index.php") {
    if ($_SERVER["REQUEST_URI"][-1] == '/') {
        header("Location: " . base_url() . substr($_SERVER["REQUEST_URI"], 0, -1));
        die();
    }
}

/* -------------------------------------------------------------------------- */
/*                            CONTROLADOR DE RUTAS                            */
/* -------------------------------------------------------------------------- */

$getRoutes = new App\Controllers\Routes;
$arrayRutas = $getRoutes->getRoutes();
$router = new AltoRouter();

foreach ($arrayRutas as $clase => $rutas) {
    foreach ($rutas as $ruta => $value) {
        $router->map(
            $value['method'],
            $value['ruta'],
            $clase . '#' . $value['function']
        );
    }
}

/* -------------------------------------------------------------------------- */
/*                     VALIDAR SI EXISTE LA RUTA INGRESADA                    */
/* -------------------------------------------------------------------------- */

$match = $router->match();
$match ? callController($match) : open404Error();

/* -------------------------------------------------------------------------- */
/*                         REDIRIGE A PAGINA ERROR 404                        */
/* -------------------------------------------------------------------------- */

function open404Error()
{
    header($_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
    $controllerObject = new App\Controllers\Pages;
    $controllerObject->error404();
}

/* -------------------------------------------------------------------------- */
/*                       LLAMA AL CONTROLADOR DE LA RUTA                      */
/* -------------------------------------------------------------------------- */

function callController($match)
{
    list($controller, $action) = explode("#", $match['target']);
    $controller = 'App\\Controllers\\' . $controller;

    if (method_exists($controller, $action)) {
        $controllerObject = new $controller;
        call_user_func_array(array($controllerObject, $action), [$match['params']]);
    } else {
        open404Error();
    }
}
