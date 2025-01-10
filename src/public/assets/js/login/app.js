import Login from './modules/login.js';

export default class App {

    load() {
        console.log("iniciar login");
        new Login();
        console.log("la aplicacion a sido inicializada");
    }
}