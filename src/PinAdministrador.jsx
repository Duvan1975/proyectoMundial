import { useState } from "react";

export function PinAdministrador({ onSuccess }) {

    const [pin, setPin] = useState("");

    const validarPin = () => {

        const PIN_ADMIN = process.env.REACT_APP_PIN_ADMIN;

        if (pin === PIN_ADMIN) {

            localStorage.setItem(
                "admin",
                "true"
            );

            onSuccess();

        } else {

            alert("PIN incorrecto");

        }

    };

    return (

        <div className="card p-4">

            <h3>Acceso Administrador</h3>

            <input
                type="password"
                className="form-control mt-3"
                placeholder="Ingrese PIN"
                value={pin}
                onChange={(e) =>
                    setPin(e.target.value)
                }
            />

            <button
                className="btn btn-primary mt-3"
                onClick={validarPin}
            >
                Ingresar
            </button>

        </div>

    );

}