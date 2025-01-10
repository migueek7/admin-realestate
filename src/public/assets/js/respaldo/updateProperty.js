/* -------------------------------------------------------------------------- */
/*                        Obtener Imagenes Para Subir                         */
/* -------------------------------------------------------------------------- */
const getDataUpdate = () => {

    // let arrayFiles = JSON.parse(localStorage.getItem("arrayFiles"));

    let data = JSON.parse(localStorage.getItem("images"));

    if (arrayFiles.length > 0) {

        for (let i = 0; i < arrayFiles.length; i++) {
            console.log(arrayFiles[i]);
            data.images[0].upload.push(arrayFiles[i].dataURL);
        }
        console.log(data);
        localStorage.setItem("images", JSON.stringify(data));
    }
}


/* -------------------------------------------------------------------------- */
/*                      Actualizar Datos de la Propiedad                      */
/* -------------------------------------------------------------------------- */
const updateProperty = async () => {

    console.log("hola desde update property");
    const property_id = rutas()[1];
    getDataUpdate();

    // if (!validateImages()) return;

    let data = JSON.parse(localStorage.getItem("images"));
    let datosForm = getDataForm();
    // datosForm = Array.of(datosForm);
    //datosForm.push(data);
    console.log(typeof datosForm);
    console.log(typeof data);

    delete datosForm.image;
    delete datosForm.features;
    delete datosForm.city;
    delete datosForm.suburb;
    delete datosForm.street;

    const returnedTarget = Object.assign(datosForm, data);
    console.log(data);
    console.log(returnedTarget);
    //return;

    try {
        const token = await getToken();
        const response = await fetch(app.apirest_url + "/property/" + property_id, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json charset=utf-8',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(returnedTarget),
            redirect: 'follow'
        });

        if (!response.ok) throw await response.json();

        const res = await response.json();

        Swal.fire(
            '¡Exito!',
            `${res.message}`,
            `${res.status}`
        ).then((result) => {
            location.href = app.base_url + "/properties";
        });

    } catch (error) {
        Swal.fire(
            `${error.status}`,
            `${error.message}`,
            `${error.status}`
        ).then((result) => {
            document.getElementById('btnAddInmueble').disabled = false;
        });
    }

}



/* -------------------------------------------------------------------------- */
/*                 DETECTA EL CAMBIO DE ORDEN DE LAS IMAGENES                 */
/* -------------------------------------------------------------------------- */
const changeOrderImages = () => {

    let dataImages = document.getElementById('imagenes').getAttribute("data");
    let imagenesMultimedia = JSON.parse(dataImages);
    console.log("imagenesMultimedia", imagenesMultimedia);

    $("#sortable3").sortable({
        stop: function (event, ui) {

            // alert("New position: " + Number(ui.item.index() + 1));

            Number(ui.item.index() + 1);

            let items = event.target.children;
            let data = JSON.parse(localStorage.getItem("images"));

            let j = 1;
            for (let i = 0; i < items.length; i++) {
                data.images[0].update.push({ 'id': Number(items[i].getAttribute('imageid')), 'position': j });
                j++;
            }
            console.log(data);
            localStorage.setItem("images", JSON.stringify(data));
        }
    });
}
changeOrderImages();