<?php
namespace App\Controllers;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class Mailer {

    function enviarCorreo()
    {
        $data = $_POST;
        
        $valido = true;
        foreach ($data as $value) {
            if (empty($value)){
                $valido = false;
            }
        }
        if(!$valido) {
            die ("Es necesario completar todos los datos del formulario");
        }
        else 
        {
            echo "todo bien";
            return;
            $destinatario = $_ENV["EMAIL_RECIPIENT"];

            // Configuracion de cuenta de correo para envios via SMTP
            $smtpHost = $_ENV["SMTP_HOST"];
            $smtpUsuario = $_ENV["SMTP_USUARIO"];
            $smtpClave = $_ENV["SMTP_PASSWORD"];

            // Iniciar PHPMailer
            $mail = new PHPMailer();
            $mail->IsSMTP();
            $mail->SMTPAuth = true;
            $mail->Port = 587;
            $mail->IsHTML(true);
            $mail->CharSet = "utf-8";

            // Configurar HOST //
            $mail->Host = $smtpHost;
            $mail->Username = $smtpUsuario;
            $mail->Password = $smtpClave;

            // Configurar Remitente
            $mail->From = $data["email"]; 
            $mail->FromName = $data["name"];

            // Configurar Remisor
            $mail->AddAddress($destinatario);
            $mail->Subject = $_ENV["EMAIL_SUBJECT"];
            // Crear html con los datos
            $datos = "";
            foreach ($data as $key => $value) {
                $datos .= "<p>".$key.": ".$value."</p>";
            }

            $mail->Body = "
                <html>
                    <body>
                        <h3>Recibiste un nuevo mensaje desde el formulario de contacto</h3>
                        <p>Informacion enviada por el usuario de la web:</p>
                        {$datos}
                    </body>
                </html>
            ";

            $mail->AltBody = "{$data["message"]} \n\n "; // Texto sin formato HTML

            $mail->SMTPOptions = array(
                'ssl' => array(
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true
                )
            );

            $estadoEnvio = $mail->Send();
            if($estadoEnvio)
            {
                echo "ok";
            } else {
                echo "error";
            }
        }
    }
    
}