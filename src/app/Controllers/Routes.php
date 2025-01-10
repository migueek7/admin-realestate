<?php

namespace App\Controllers;

class Routes
{

    function getRoutes()
    {
        $arrayRutas = [
            'Pages' => [
                ["method" => "GET", "ruta" => "/", "function" => "blankPage"],
                ["method" => "GET", "ruta" => "/properties", "function" => "properties"],
                ["method" => "GET", "ruta" => "/datatables", "function" => "datatables"],
                ["method" => "GET", "ruta" => "/add-property", "function" => "addProperty"],
                ["method" => "GET", "ruta" => "/update-property/[:action]", "function" => "updateProperty"],
                ["method" => "POST", "ruta" => "/get-token", "function" => "getToken"],

                // ["method" => "GET", "ruta" => "/agents", "function" => "users"],

                ["method" => "GET", "ruta" => "/datatable", "function" => "dataTable"],
                ["method" => "POST", "ruta" => "/prueba", "function" => "prueba"],

                ["method" => "GET", "ruta" => "/about", "function" => "about"],
                ["method" => "GET", "ruta" => "/contacto", "function" => "contact"],
                ["method" => "GET", "ruta" => "/perfil", "function" => "perfil"],
            ],
            'Users' => [
                ["method" => "GET", "ruta" => "/agents", "function" => "users"],
                ["method" => "GET", "ruta" => "/users", "function" => "users"],
                ["method" => "GET", "ruta" => "/login", "function" => "login"],
                ["method" => "GET", "ruta" => "/log-out", "function" => "logOut"],
                ["method" => "POST", "ruta" => "/set-token", "function" => "setToken"]
            ],
            'Routes' => [
                ["method" => "GET", "ruta" => "/get-apirest", "function" => "getApirest"],
            ],
            'Mailer' => [
                ["method" => "POST", "ruta" => "/mail", "function" => "enviarCorreo"],
            ]
        ];

        return $arrayRutas;
    }


    function getApirest()
    {
        echo $_ENV["APIREST_URL"];
    }
}
