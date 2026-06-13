import { API_URL } from "./config";

export function AgregarTablaUsuarios() {

    const datos = {
        nombre: document.getElementById("nombre").value,
        puntos: document.getElementById("puntos").value,
        pin: document.getElementById("pin").value
    };

    fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos),
    })
        .then((response) => {
            if (!response.ok) {
                // eslint-disable-next-line
                throw new Error("Error al registrar");
            }
            return response.text();
        })
        .then((data) => {
            alert("Registro Exitoso");
            agregarFila(datos);
        })
        .catch((error) => {
            console.error("Error", error);
            alert("Se presento un problema al registrar el usuario");
        });

    function agregarFila(datos) {
        const tablaUsuarios = document.getElementById('tablaUsuarios').getElementsByTagName('tbody')[0];
        const fila = tablaUsuarios.insertRow(0);
        fila.insertCell(0).innerText = datos.nombre;
        fila.insertCell(1).innerText = datos.puntos;
        fila.insertCell(2).innerText = datos.pin;
    }

};