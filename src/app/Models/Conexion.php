<?php
namespace App\Models;

class Conexion 
{
  private $conexion = null;
  private static $instance = null;

  private function __construct() 
  {
    $dsn = "mysql:dbname={$_ENV['DB_NAME']};host={$_ENV['DB_HOST'] };charset=".$_ENV['DB_CHARSET'];
    try {
        $this->conexion = new \PDO($dsn, $_ENV["DB_USER"], $_ENV["DB_PASSWORD"]);
    } 
    catch (\Throwable $e) 
    {
        echo 'Falló la conexión: ' . $e->getMessage();
    }
  }

  public static function getInstance() 
  {
    if(is_null(self::$instance)) {
      self::$instance = new Conexion;
    }
    return self::$instance;
  }

  public function getConexion() 
  {
    return self::getInstance()->conexion;
  }

}