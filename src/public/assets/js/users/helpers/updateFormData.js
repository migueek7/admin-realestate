export default class UpdateFormData {
    constructor(formElement) {
        this.formElement = formElement;
        this.initialState = this.getFormData();
        this.modifiedData = {};

        this.formElement.addEventListener("change", (event) => {
            console.log("algo cambio");
            this.checkModifiedData();
        });
    }

    getFormData() {
        const formData = new FormData(this.formElement);
        const data = {};

        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }

        return data;
    }

    checkModifiedData() {
        const currentState = this.getFormData();
        this.modifiedData = {};

        for (const key in currentState) {
            if (currentState[key] !== this.initialState[key]) {
                this.modifiedData[key] = currentState[key];
            }
        }

    }

    async update(url) {
        console.log(this.modifiedData);
        if (Object.keys(this.modifiedData).length > 0) {
            try {
                const response = await fetch(url, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(this.modifiedData),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Actualización exitosa:", data);
                } else {
                    console.error("Error en la actualización:", response.statusText);
                }
            } catch (error) {
                console.error("Error en la actualización:", error);
            }
        } else {
            console.log("No hay datos modificados para enviar.");
        }
    }
}
