<?php
function name_site()
{
	return $_ENV['NAME_SITE'];
}
function author_name()
{
	return $_ENV["AUTHOR_NAME"];
}
function base_url()
{
	return $_ENV['BASE_URL'];
}
function apirest_url()
{
	return $_ENV['APIREST_URL'];
}
function folder_url()
{
	return $_ENV['FOLDER_URL'];
}
function apikey()
{
	return $_ENV['APIKEY'];
}
//retorna la url de assets
function assets()
{
	return $_ENV['BASE_URL'] . "/public/assets";
}
function css()
{
	return $_ENV['BASE_URL'] . "/public/assets/css";
}
function js()
{
	return $_ENV['BASE_URL'] . "/public/assets/js";
}
//retorna la url de assets
function images()
{
	return $_ENV['BASE_URL'] . "/public/assets/images";
}
// retornar la url de tamplates
function template()
{
	return $_ENV['BASE_URL'] . "views/templates";
}
// retornar la url de modals
function modals()
{
	return "templates/modals";
}
function components()
{
	return "views/components";
}
// devuelve las url separadas en un array
function rutas()
{
	$rutas = [];
	if (isset($_GET['url'])) {
		$rutas = rtrim($_GET['url'], '/');
		$rutas = explode('/', $rutas);
	}
	return $rutas;
}

function headerFront($data = "")
{
	$view_header = "views/includes/header.php";
	require_once($view_header);
}
function footerFront($data = "")
{
	$view_footer = "views/includes/footer.php";
	require_once($view_footer);
}

function getFile($url, $data)
{
	ob_start();
	require_once("views/" . $url . ".php");
	$file = ob_get_clean();
	return $file;
}

// Muestra informacion formateada
function pre($data)
{
	$format  = print_r('<pre>');
	$format .= print_r($data);
	$format .= print_r('</pre>');
	return $format;
}
// Llama a la vista de un modal
function getModal(string $nombreModal, $data = null)
{
	$vista_modal = "../views/sections/modals/" . $nombreModal . ".php";
	require_once($vista_modal);
}
//SEPARAR PALABRAS CON ESPACIOS BREADCRUM
function textoBreadcrum($texto)
{
	trim(array_reduce(
		str_split($texto),
		function ($c, $v) {
			$c .= ctype_upper($v) ? ' ' . $v : $v;
			echo $c;
		}
	));
	// return $breadcrum;
}
//Enviar Email
function sendEmail($data, $template)
{
	// $asunto = $data["asunto"];
	// $emailDestino = $data["emailDestino"];
	// $empresa = NOMBRE_REMITENTE;
	// $remitente = EMAIL_REMITENTE;
	// $emailCopia = !empty($data["emailCopia"]) ? $data["emailCopia"] : "";
	// //envio de correo
	// $de = "MIME-Version: 1.0\r\n";
	// $de .= "Content-type: text/html; charset=UTF-8\r\n";
	// $de .= "From: ".$empresa." <".$remitente.">\r\n";
	// $de .= "Bcc: ".$emailCopia."\r\n";
	// ob_start();
	// require_once("views/template/email/".$template.".php");
	// $mensaje = ob_get_clean();
	// $send = mail($emailDestino, $asunto, $mensaje, $de);
	// return $send;
}

//Elimina exceso de espacios entre palabras
function strClean($strCadena)
{
	$string = preg_replace(['/\s+/', '/^\s|\s$/'], [' ', ''], $strCadena);
	$string = trim($string); //Elimina espacios en blanco al inicio y al final
	$string = stripslashes($string); // Elimina las \ invertidas
	$string = str_ireplace("<script>", "", $string);
	$string = str_ireplace("</script>", "", $string);
	$string = str_ireplace("<script src>", "", $string);
	$string = str_ireplace("<script type=>", "", $string);
	$string = str_ireplace("SELECT * FROM", "", $string);
	$string = str_ireplace("DELETE FROM", "", $string);
	$string = str_ireplace("INSERT INTO", "", $string);
	$string = str_ireplace("SELECT COUNT(*) FROM", "", $string);
	$string = str_ireplace("DROP TABLE", "", $string);
	$string = str_ireplace("OR '1'='1", "", $string);
	$string = str_ireplace('OR "1"="1"', "", $string);
	$string = str_ireplace('OR ´1´=´1´', "", $string);
	$string = str_ireplace("is NULL; --", "", $string);
	$string = str_ireplace("is NULL; --", "", $string);
	$string = str_ireplace("LIKE '", "", $string);
	$string = str_ireplace('LIKE "', "", $string);
	$string = str_ireplace("LIKE ´", "", $string);
	$string = str_ireplace("OR 'a'='a", "", $string);
	$string = str_ireplace('OR "a"="a', "", $string);
	$string = str_ireplace("OR ´a´=´a", "", $string);
	$string = str_ireplace("OR ´a´=´a", "", $string);
	$string = str_ireplace("--", "", $string);
	$string = str_ireplace("^", "", $string);
	$string = str_ireplace("[", "", $string);
	$string = str_ireplace("]", "", $string);
	$string = str_ireplace("==", "", $string);
	return $string;
}


function getComponent($nombre, $data = null)
{
	$component = "./app/Views/components/" . $nombre . ".php";
	include($component);
	return $data;
}


function currencyConverter($amount)
{
	// set API Endpoint, access key, required parameters
	$endpoint = 'convert';
	$access_key = 'b5a94b778ed1c53fd4eb2ab03aa3bc2b';

	$from = 'MXN';
	$to = 'EUR';
	$amount = 10;

	// initialize CURL:
	$ch = curl_init('https://api.exchangeratesapi.io/v1/' . $endpoint . '?access_key=' . $access_key . '&from=' . $from . '&to=' . $to . '&amount=' . $amount . '');
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	// get the JSON data:
	$json = curl_exec($ch);
	curl_close($ch);

	// Decode JSON response:
	$conversionResult = json_decode($json, true);

	// access the conversion result
	echo pre($conversionResult);
}


function eliminar_tildes($cadena)
{

	//Codificamos la cadena en formato utf8 en caso de que nos de errores
	// $cadena = utf8_encode($cadena);

	//Ahora reemplazamos las letras
	$cadena = str_replace(
		array('á', 'à', 'ä', 'â', 'ª', 'Á', 'À', 'Â', 'Ä'),
		array('a', 'a', 'a', 'a', 'a', 'A', 'A', 'A', 'A'),
		$cadena
	);

	$cadena = str_replace(
		array('é', 'è', 'ë', 'ê', 'É', 'È', 'Ê', 'Ë'),
		array('e', 'e', 'e', 'e', 'E', 'E', 'E', 'E'),
		$cadena
	);

	$cadena = str_replace(
		array('í', 'ì', 'ï', 'î', 'Í', 'Ì', 'Ï', 'Î'),
		array('i', 'i', 'i', 'i', 'I', 'I', 'I', 'I'),
		$cadena
	);

	$cadena = str_replace(
		array('ó', 'ò', 'ö', 'ô', 'Ó', 'Ò', 'Ö', 'Ô'),
		array('o', 'o', 'o', 'o', 'O', 'O', 'O', 'O'),
		$cadena
	);

	$cadena = str_replace(
		array('ú', 'ù', 'ü', 'û', 'Ú', 'Ù', 'Û', 'Ü'),
		array('u', 'u', 'u', 'u', 'U', 'U', 'U', 'U'),
		$cadena
	);

	$cadena = str_replace(
		array('ñ', 'Ñ', 'ç', 'Ç'),
		array('n', 'N', 'c', 'C'),
		$cadena
	);

	// Eliminar caracteres especiales
	$cadena = preg_replace(['/\s+/', '/^\s|\s$/'], [' ', ''], $cadena);

	return $cadena;
}


function convertirStringRuta($string)
{
	// elimina los espacios de mas
	$urlpropiedad = preg_replace(['/\s+/', '/^\s|\s$/'], [' ', ''], $string);
	// elimina las comas
	$urlpropiedad = str_replace(',', '', $urlpropiedad);
	// elimina los guiones medios
	$urlpropiedad = str_replace('-', '', $urlpropiedad);
	// remplaza los espacios por guiones medios
	$urlpropiedad = str_replace(' ', '-', $urlpropiedad);
	// remplaza dobles guiones por uno
	$urlpropiedad = str_replace('--', '-', $urlpropiedad);
	// convierte un string en minusculas
	$urlpropiedad = strtolower($urlpropiedad);
	// Elimina los acentos del string
	$urlpropiedad = eliminar_tildes($urlpropiedad);

	return $urlpropiedad;
}

//DesconexionDB
function disconnect($con, $stmt)
{
	global $con, $stmt;
	$stmt->closeCursor();
	$stmt = null;
	$con = null;
}


function compararCamposDeStatus($id_status, $status_property): bool
{
	foreach ($status_property as $value) {
		if ($value['status_id'] == $id_status) {
			return true;
		}
	}
	return false;
}
