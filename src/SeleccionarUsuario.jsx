import { useEffect, useState } from "react";
import { API_URL } from "./config";

export function SeleccionarUsuario() {

    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    const [pin, setPin] = useState("");
    const [mostrarModal, setMostrarModal] = useState(false);

    const ingresar = async () => {

        const response =
            await fetch(
                `${API_URL}/usuarios/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        usuarioId:
                            usuarioSeleccionado.id,
                        pin
                    })
                }
            );

        const acceso =
            await response.json();

        if (acceso) {

            localStorage.setItem(
                "usuarioId",
                usuarioSeleccionado.id
            );

            localStorage.setItem(
                "nombreUsuario",
                usuarioSeleccionado.nombre
            );

            window.location.reload();

        } else {

            alert("PIN incorrecto");

        }

    };

    useEffect(() => {

        fetch(`${API_URL}/usuarios`)
            .then(response => response.json())
            .then(data => {

                setUsuarios(data.content);

            })
            .catch(error => {

                console.error(
                    "Error cargando usuarios",
                    error
                );

            });

    }, []);

    return (
        <>
            <div className="container mt-5">

                <h2 className="mb-4">
                    Mundial 2026
                </h2>

                <h4 className="mb-4">
                    ¿Quién eres?
                </h4>

                {usuarios.map(usuario => (

                    <button
                        key={usuario.id}
                        className="btn btn-primary d-block mb-3"
                        onClick={() => {
                            setUsuarioSeleccionado(usuario);
                            setPin("");
                            setMostrarModal(true);
                        }}
                    >
                        {usuario.nombre}
                    </button>

                ))}

            </div>

            {mostrarModal && usuarioSeleccionado && (
                <div
                    className="modal d-block"
                    style={{
                        backgroundColor:
                            "rgba(0, 0, 0, 0.5)"
                    }}
                >
                    <div
                        className="modal-dialog modal-dialog-centered"
                    >
                        <div className="modal-content">

                            <div className="modal-header">

                                <h5 className="modal-title">
                                    Ingresa tu PIN
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => {
                                        setMostrarModal(false);
                                        setUsuarioSeleccionado(null);
                                        setPin("");
                                    }}
                                />

                            </div>

                            <div className="modal-body">

                                <p className="mb-3">
                                    Usuario:{" "}
                                    <strong>
                                        {usuarioSeleccionado.nombre}
                                    </strong>
                                </p>

                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="PIN"
                                    value={pin}
                                    onChange={(e) =>
                                        setPin(e.target.value)
                                    }
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                            ingresar();
                                        }
                                    }}
                                />

                            </div>

                            <div className="modal-footer">

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        setMostrarModal(false);
                                        setUsuarioSeleccionado(null);
                                        setPin("");
                                    }}
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={ingresar}
                                >
                                    Entrar
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SeleccionarUsuario;