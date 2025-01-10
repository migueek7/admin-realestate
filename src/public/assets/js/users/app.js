import Modules from '../modules.js';
import Read from './modules/read.js';
import Add from './modules/add.js';
// import Update from './modules/update.js';
// import Helpers from '../helpers.js';

export default class App {

    constructor() {
        this.modules = new Modules();
        if (!localStorage.getItem('apirestUrl')) this.modules.getApirest();
    }

    async token() {
        let token = '';
        if (!localStorage.getItem('token')) {
            console.log('no existe localstorage token');
            token = await this.modules.getToken();
            localStorage.setItem('token', token);
        } else {
            console.log('existe localstorage token');
            token = localStorage.getItem('token');
        }
        return token;
    }

    async load() {
        this.token = await this.token();

        // Init Default
        this.modules.sideNavInit();
        this.modules.darkMode();
        this.modules.loadClose();
        //Listar Usuarios
        this.modules.getRutas()[0] == 'agents' ? new Read(this.token) : null;
        //Guardar Usuario
        // if (this.modules.getRutas()[0] == 'agents') {
        //     new Read(this.token)
        //     const miInstancia = new Read();
        //     const table = miInstancia.initDataTable(this.token)
        //     new Add(this.token, table)
        // }
        // this.modules.getRutas()[0] == 'agents' ? new Add(this.token) : null;
        //Editar Propiedad
        //this.modules.getRutas()[0] == 'update-property' ? new Update(token) : null;
        console.log("la aplicacion a sido inicializada");
    }
}