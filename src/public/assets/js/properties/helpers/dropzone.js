import Modules from '../../modules.js';

export default class DropzoneHelper {

    constructor() {
        this.modules = new Modules();
        this.app = this.modules.app();
        this.arrayFile = [];
    }

    /* -------------------------------------------------------------------------- */
    /*                              Getter And Setter                             */
    /* -------------------------------------------------------------------------- */
    get getArrayFile() {
        return this.arrayFile;
    }

    set setArrayFile(arrayFile) {
        this.arrayFile = arrayFile;
    }

    /* -------------------------------------------------------------------------- */
    /*                                  DROPZONE                                  */
    /* -------------------------------------------------------------------------- */
    dropzoneInit(app) {
        // arrayFiles no puede guardar es localStorage porque pierde sus propiedades de Image File
        const arrayFile = this.getArrayFile;
        const minImageWidth = 600, minImageHeight = 300;

        Dropzone.autoDiscover = false;

        $("#previews").dropzone({
            url: app.base_url + "/add-property/",
            autoProcessQueue: true,
            addRemoveLinks: true,
            acceptedFiles: "image/jpeg, image/png, image/webp",
            maxFilesize: 5,
            maxFiles: 15,
            preventDuplicates: true,
            before: function () {
                $("#previews").append("cargando...");
            },
            init: function () {
                this.on("addedfile", function (file) {
                    arrayFile.push(file);
                    console.log("arrayFile", arrayFile);
                    this.setArrayFile = arrayFile;
                    // return this.arrayFile;
                });

                this.on("removedfile", function (file) {
                    let index = arrayFile.indexOf(file);
                    arrayFile.splice(index, 1);
                    console.log("arrayFile", arrayFile);
                    this.setArrayFile = arrayFile;
                });

                this.on("thumbnail", function (file) {
                    if (file.width < minImageWidth || file.height < minImageHeight) {
                        file.rejectDimensions();
                        document.querySelector(".respuestaDropzone").innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>¡ERROR!</strong> La imagen debe ser mayor a ${minImageWidth}px * ${minImageHeight}px.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`;
                    }
                    else {
                        file.acceptDimensions();
                        $(".alert").remove();
                    }
                });
            },
            accept: function (file, done) {
                file.acceptDimensions = done;
                file.rejectDimensions = function () { done("Imagen menor a " + minImageWidth + "px * " + minImageHeight + "px"); };
            }
        });
    }
}