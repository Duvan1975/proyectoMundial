import { useState } from "react";
import { API_URL } from "./config";

export function CambiarPin() {

    const [pinActual, setPinActual] =
        useState("");

    const [nuevoPin, setNuevoPin] =
        useState("");

    const [confirmarPin, setConfirmarPin] =
        useState("");

    const cambiarPin = async () => {

        if (nuevoPin !== confirmarPin) {

            alert("Los PIN no coinciden");

            return;
        }

        try {

            const response = await fetch(
                `${API_URL}/usuarios/cambiar-pin`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({

                        usuarioId: Number(
                            localStorage.getItem(
                                "usuarioId"
                            )
                        ),

                        pinActual,

                        nuevoPin

                    })
                }
            );

            if (response.ok) {

                alert(
                    "PIN actualizado correctamente"
                );

                setPinActual("");
                setNuevoPin("");
                setConfirmarPin("");

            } else {

                const error =
                    await response.text();

                alert(error);

            }

        } catch (error) {

            console.error(error);

            alert(
                `${API_URL}/usuarios/cambiar-pin`
            );

        }

    };

    return (

        <div className="container mt-4">

            <h2>Cambiar PIN</h2>

            <div className="card p-4">

                <div className="mb-3">

                    <label className="form-label">
                        PIN Actual
                    </label>

                    <input
                        type="password"
                        className="form-control"
                        value={pinActual}
                        onChange={(e) =>
                            setPinActual(
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Nuevo PIN
                    </label>

                    <input
                        type="password"
                        className="form-control"
                        value={nuevoPin}
                        onChange={(e) =>
                            setNuevoPin(
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Confirmar PIN
                    </label>

                    <input
                        type="password"
                        className="form-control"
                        value={confirmarPin}
                        onChange={(e) =>
                            setConfirmarPin(
                                e.target.value
                            )
                        }
                    />

                </div>

                <button
                    className="btn btn-primary"
                    onClick={cambiarPin}
                >
                    Guardar
                </button>

            </div>

        </div>

    );

}

export default CambiarPin;