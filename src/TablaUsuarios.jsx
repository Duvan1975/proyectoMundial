import { useEffect, useState } from "react";
import { ModalEditarUsuario } from "./ModalEditarUsuario";
import { API_URL } from "./config";

export function TablaUsuarios() {

    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const cargarUsuarios = async () => {
            try {
                const response = await fetch(`${API_URL}/usuarios?size=1000`);
                const data = await response.json();
                setUsuarios(Array.isArray(data) ? data : data.content || []);
            } catch (error) {
                console.error("Error al obtener los usuarios", error);
            }
        };

        cargarUsuarios();
    }, []);

    const eliminarUsuario = async (id) => {
        console.log("Eliminando usuario con ID:", id);
        try {
            const response = await fetch(`${API_URL}/usuarios/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                alert("Usuarios eliminado exitosamente");
                setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
            }
            else {
                console.error("Error al eliminar el usuario:", response.statusText);
            }
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
        }
    }

    return (
        <>
            <table className="table table-striped table-hover" id="tablaUsuarios">

                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Puntos</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usu, index) => (
                        <tr key={index}>
                            <td>{usu.nombre}</td>
                            <td>{usu.puntos}</td>
                            <td>
                                <button className="btn btn-sm btn-primary"
                                    onClick={() => {
                                        setUsuarioSeleccionado(usu);
                                        setModalVisible(true);
                                    }}>
                                    Editar
                                </button>
                                <button className="btn btn-sm btn-danger"
                                    onClick={() => eliminarUsuario(usu.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ModalEditarUsuario
                usuario={usuarioSeleccionado} //Envía al modal los datos del usuario seleccionado
                isVisible={modalVisible} //Controla si el modal debe mostrarse o no
                onClose={() => setModalVisible(false)} // Función al cerrar el modal
                onSave={(usuarioActualizado) => {
                    setUsuarios(usuarios.map(
                        e => e.id === usuarioActualizado.id ? usuarioActualizado: e));
                }}
            />
        </>
    )
}