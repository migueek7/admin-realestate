import { sendMail } from "./modules.js";

const btnEnviar = document.querySelector('.btnEnviar');

if (btnEnviar) {
    btnEnviar.addEventListener('click', function (e) {
        e.preventDefault();
        sendMail();
    });
}