import { useEffect, useState } from "react";
import { API_URL } from "./config";

export function SeleccionarUsuario() {

    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    const [pin, setPin] = useState("");

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
                        }}
                    >
                        {usuario.nombre}
                    </button>

                ))}

            </div>

            {usuarioSeleccionado && (

                <div className="card p-3">

                    <h4>

                        {usuarioSeleccionado.nombre}

                    </h4>

                    <input
                        type="password"
                        className="form-control mt-2"
                        placeholder="PIN"
                        value={pin}
                        onChange={(e) =>
                            setPin(e.target.value)
                        }
                    />

                    <button
                        className="btn btn-success mt-3"
                        onClick={ingresar}
                    >
                        Entrar
                    </button>

                </div>
            )}
        </>
    );
}

export default SeleccionarUsuario;