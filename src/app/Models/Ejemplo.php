<?php
namespace App\Models;
use PDO;

class Ejemplo extends Conexion {

    private $conexion;

    function __construct()
    {
        $this->conexion = Conexion::getInstance()->getConexion();
    }

    function getAgenda()
    {
        $sql = "SELECT a.id AS id_agenda, a.nombre, a.calle, a.numero, a.colonia, c.ciudad 
            FROM agenda AS a 
            INNER JOIN ciudades AS c 
            WHERE a.ciudad_id = c.id
            ORDER BY id_agenda DESC
        ";
        $stmt = $this->conexion->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt = null;
    }

    function metodoPoo()
    {
        // try {
        //     echo "hola";
        //     // $con = $this->conexion->getConexion();
        //     $sql = "SELECT * FROM categorias";
        //     $stmt = $this->conexion->prepare($sql);
        //     $stmt->execute();
        //     return $stmt->fetchAll(PDO::FETCH_ASSOC);
        //     // $stmt->close();
        //     // $stmt = null;
        //     // $this->conexion = null;
        // } catch (\PDOException $e) {
        //     // error_log('EjemploModel::metodoPoo ->'.$e);
        // }
       
    }

    static function metodoStatico()
    {
        try {
            $con = self::getConexion();
            $sql = "SELECT * FROM categorias";
            $stmt = $con->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt = null;
            $con = null;
        } catch (\PDOException $e) {
            error_log('EjemploModel::metodoStatico ->'.$e);
        }
    }

    function usarTransaccion()
    {
        try {
            $this->con = self::getConexion();
            $this->con->beginTransaction();
            $sql = "SELECT * FROM categorias";
            $stmt = $this->con->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
            $this->con->commit();
            $stmt = null;
            $this->con = null;
        } catch (\PDOException $e) {
            error_log('EjemploModel::usarTransaccion ->'.$e);
        }
    }
}