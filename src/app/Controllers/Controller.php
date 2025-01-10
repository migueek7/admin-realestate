<?php

namespace App\Controllers;

use League\Plates\Engine;
use League\Plates\Extension\URI;
use League\Plates\Template\Template;

class Controller
{
    protected $templates;

    public function __construct()
    {
        $this->templates = new Engine('./app/Views');
        $this->templates->loadExtension(new URI($_SERVER['REQUEST_URI']));
    }

    public function getRecursos(string $ruta, string $metodo, $token = null)
    {

        try {
            // echo $_ENV["APIREST_URL"]."/".$ruta."<br>";

            $token = 'Authorization: Bearer ' . $this->getToken(true);
            // echo $token;

            $curl = curl_init();

            curl_setopt_array($curl, array(
                CURLOPT_URL => $_ENV["APIREST_URL"] . "/" . $ruta,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => $metodo,
                // CURLOPT_HTTPHEADER => array($token),
                CURLOPT_HTTPHEADER => array(
                    $token,
                    "Origin: " . $_ENV['BASE_URL'], // Aquí se define el dominio de origen
                ),
            ));

            $response = curl_exec($curl);

            if (curl_errno($curl)) {
                print curl_error($curl);
            }

            curl_close($curl);
            // var_dump($response);
            // echo "<br>".$response;
            return json_decode($response, true);
            //return $response;

        } catch (\PDOException $e) {
            // manejar la excepción de PDO
            echo 'Error de PDO: ' . $e->getMessage();
        } catch (\Exception $e) {
            // manejar cualquier otra excepción
            echo 'Error: ' . $e->getMessage();
        }
    }

    function protectedPage()
    {
        if (!isset($_SESSION["login"])) {
            header('Location:' . $_ENV['BASE_URL'] . '/login');
            exit();
        }
    }
    static function getToken($curl = false)
    {
        if (isset($_SESSION["login"]["token"])) {
            $token = $_SESSION["login"]["token"];
            // $token = "sdvdsvdsvvds";
            if ($curl) {
                return $token;
            } else {
                echo $token;
            }
        } else {
            echo "error no existe un token";
        }
    }
}
