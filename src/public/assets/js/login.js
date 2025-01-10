import App from './login/app.js';

// Limpiar localstorage
localStorage.clear();

// Crear el objeto app
const loginApp = new App();

// Cargar toda la aplicación
loginApp.load();