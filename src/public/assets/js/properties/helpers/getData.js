export default class GetData {

    /* -------------------------------------------------------------------------- */
    /*                        Obtener Datos del Formulario                        */
    /* -------------------------------------------------------------------------- */
    getDataForm() {

        /* -------------- Formateamos el precio y eliminamos las comas -------------- */

        let price = document.getElementById('priceForm').value.trim();
        price = price.replace(/,/g, '');
        price = Number(price);

        let offer_price = document.getElementById('offerPriceForm').value.trim();
        offer_price = offer_price.replace(/,/g, '');
        offer_price = Number(offer_price);

        /* -------------------------- Almacenamos los datos ------------------------- */

        const dataForm = {
            "title": document.getElementById('titleForm').value.trim(),
            "extract": document.getElementById('extractForm').value.trim(),
            "city": document.getElementById('cityForm').value.trim(),
            "suburb": document.getElementById('suburbForm').value.trim(),
            "street": document.getElementById('streetForm').value.trim(),
            "coordinates": document.getElementById('coordinatesForm').value.trim(),
            "category_id": document.getElementById('categoriesForm').value.trim(),
            "price_text": document.getElementById('priceTextForm').value.trim(),
            "price": price,
            "offer_price": offer_price > 0 ? offer_price : "",
            "currency_id": document.getElementById('currencyForm').value.trim(),
            "featured": document.getElementById('featuredForm').checked ? 1 : 0,
            "status_property": document.getElementById('statuForm').checked ? 1 : 0,
            "bedrooms": document.getElementById('bedroomsForm').value.trim(),
            "bathrooms": document.getElementById('bathroomsForm').value.trim(),
            "garage": document.getElementById('garageForm').value.trim(),
            "floors": document.getElementById('floorForm').value.trim(),
            "url_video": String(document.getElementById('videoForm').value.trim()),
            "land": document.getElementById('landForm').value.trim(),
            "construction": document.getElementById('constructionForm').value.trim(),
            "agent_id": document.getElementById('usersForm').value.trim(),
            "features": document.getElementById('featuresForm').value.trim(),
            "description": tinymce.get("descriptionForm").getContent().trim(),
            "image": document.getElementById('datosImagen').files[0],
            // "statusMultiple": String($('#myMultiselect').val()).split(",")
            "statusMultiple": $('#myMultiselect').val()
        }
        if (document.getElementById('datetimepicker1')) {
            dataForm.updated_at_property = document.getElementById('datetimepicker1').value.trim()
        }
        return dataForm;
    }

    getDataAddress() {
        const dataForm = {
            "city": document.getElementById('cityForm').value.trim(),
            "suburb": document.getElementById('suburbForm').value.trim(),
            "street": document.getElementById('streetForm').value.trim(),
            "coordinates": document.getElementById('coordinatesForm').value.trim()
        }
        return dataForm;
    }
}