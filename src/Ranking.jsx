import { useEffect, useState } from "react";
import { API_URL } from "./config";
import "./style.css";

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

            <p className="text-muted">
                Participantes: 22
            </p>
            <div className="table-responsive">

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="text-center">Posición</th>
                            <th>Nombre</th>
                            <th>Puntos</th>
                            <th className="text-center">Movimiento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario, index) => {

                            const posicionActual = index + 1;

                            const diferencia = usuario.posicionAnterior
                                ? usuario.posicionAnterior - posicionActual
                                : 0;

                            return (
                                <tr
                                    key={usuario.id}
                                    className={
                                        usuario.puntos === usuarios[0]?.puntos
                                            ? "lider-ranking"
                                            : ""
                                    }
                                >
                                    <td className="text-center">
                                        {
                                            usuario.puntos === usuarios[0]?.puntos
                                                ? "🥇"
                                                : posicionActual
                                        }
                                    </td>

                                    <td>{usuario.nombre}</td>

                                    <td>{usuario.puntos}</td>

                                    <td className="text-center fw-bold">

                                        {diferencia > 0 && (
                                            <span className="text-success fs-5">
                                                ⬆ {diferencia}
                                            </span>
                                        )}

                                        {diferencia < 0 && (
                                            <span className="text-danger fs-5">
                                                ⬇ {Math.abs(diferencia)}
                                            </span>
                                        )}

                                        {diferencia === 0 && (
                                            <span className="text-secondary fs-5">
                                                ➖
                                            </span>
                                        )}

                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}