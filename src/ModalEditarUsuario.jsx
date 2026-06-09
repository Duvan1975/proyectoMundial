import { useEffect, useState } from "react";

export function ModalEditarUsuario({ usuario, isVisible, onClose, onSave }) {
    const [formulario, setFormulario] = useState({
        id: "",
        nombre: "",
        puntos: ""
    });

    useEffect(() => {
        if (usuario) {
            setFormulario(usuario);
        }
    }, [usuario]);

    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    };

    const actualizarUsuario = () => {
        fetch(`http://localhost:8080/usuarios`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formulario)
        })
            .then((response) => {
                if (!response.ok) throw new Error("Error al actualizar el usuario");
                return response.json();
            })
            .then((data) => {
                alert("Usuario actualizado exitosamente");
                onSave(data);
                onClose();
            })
            .catch((error) => {
                console.error("Error en la actualización:", error);
                alert("Error al actualizar el usuario");
            });
    };

    if (!isVisible) return null;
    return (
        <div className="modal" style={{ display: "block", backgroundColor: "#000000aa" }}>
            <div className="modal-dialog">
                <div className="modal-content p-4">
                    <h4>Editar Usuario</h4>
                    <input type="text"
                        name="nombre"
                        value={formulario.nombre}
                        onChange={handleChange}
                        placeholder="Nombre"
                        className="form-control mb-2"
                    />
                    <input type="number"
                        name="puntos"
                        value={formulario.puntos}
                        onChange={handleChange}
                        placeholder="Puntos"
                        className="form-control mb-2"
                    />
                    <div className="mt-3">
                        <button
                            className="btn btn-primary me-2"
                            onClick={actualizarUsuario}
                        >
                            Actualizar Usuario
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                    </div>

                </div>

            </div>
        </div>
    )
}