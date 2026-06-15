import { useEffect, useState } from "react";
import { API_URL } from "./config";

export function Ranking() {

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const cargarUsuarios = async () => {
            try {
                const response = await fetch(`${API_URL}/usuarios?size=1000`);
                const data = await response.json();
                setUsuarios(Array.isArray(data) ? data : data.content || []);
            } catch (error) {
                console.error("Error cargando usuarios", error);
            }
        };

        cargarUsuarios();
    }, []);

    return (

        <div className="container">

            <h2>🏆 Ranking General</h2>

            <table className="table">

                <thead>

                    <tr>
                        <th>Posición</th>
                        <th>Nombre</th>
                        <th>Puntos</th>
                    </tr>

                </thead>

                <tbody>

                    {usuarios.map((usuario, index) => (

                        <tr key={usuario.id}>

                            <td>{index + 1}</td>

                            <td>{usuario.nombre}</td>

                            <td>{usuario.puntos}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}