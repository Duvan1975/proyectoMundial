import { useEffect, useState } from "react";
import { API_URL } from "./config";

const formatFechaPartido = (fechaPartido) => {
    if (!fechaPartido) return "";

    const [datePart, timePart] = fechaPartido.split("T");
    if (!datePart || !timePart) return fechaPartido;

    const [year, month, day] = datePart.split("-");
    const [hour = "00", minute = "00"] = timePart.split(":");

    return `${day}/${month}/${year} ${hour}:${minute.split(".")[0]}`;
};

export function PartidosDisponibles() {

    const [partidos, setPartidos] = useState([]);

    const usuarioId =
        localStorage.getItem("usuarioId");

    useEffect(() => {

        fetch(`${API_URL}/partidos/disponibles-edicion/${usuarioId}`)
            .then(response => response.json())
            .then(data => {

                setPartidos(data);

            });

    }, [usuarioId]);

    const guardarPronostico = async (partido) => {

        console.log(partido);
        try {

            const metodo =
                partido.yaPronosticado
                    ? "PUT"
                    : "POST";

            const response = await fetch(
                `${API_URL}/pronosticos`,
                {
                    method: metodo,
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        usuarioId:
                            Number(usuarioId),

                        partidoId:
                            partido.id,

                        golesLocalPronosticado:
                            Number(partido.pronosticoLocal),

                        golesVisitantePronosticado:
                            Number(partido.pronosticoVisitante)
                    })
                }
            );

            if (response.ok) {

                alert(
                    "Pronóstico guardado correctamente"
                );

            } else {

                const error =
                    await response.text();

                alert(error);

            }

        } catch (error) {

            console.error(error);

            alert(
                "Error guardando pronóstico"
            );

        }

    };

    const actualizarPronostico = (
        id,
        campo,
        valor
    ) => {

        setPartidos(prev =>
            prev.map(partido =>
                partido.id === id
                    ? {
                        ...partido,
                        [campo]: valor
                    }
                    : partido
            )
        );

    };

    const tienePronosticoValido = (valor) =>
        valor !== undefined && valor !== null && valor !== "";

    return (

        <div className="container">
            <h2>
                Partidos Disponibles
            </h2>
            {partidos.map(partido => (
                <div
                    key={partido.id}
                    className="card mb-3"
                >
                    <div className="card-body">
                        <h5>
                            {partido.equipoLocal}
                            {" vs "}
                            {partido.equipoVisitante}
                        </h5>
                        <p>
                            {formatFechaPartido(
                                partido.fechaPartido
                            )}
                        </p>
                        <div
                            className="d-flex gap-2"
                        >
                            <input
                                type="number"
                                min="0"
                                className="form-control"
                                placeholder={
                                    partido.equipoLocal
                                }
                                value={
                                    partido.pronosticoLocal
                                    ?? ""
                                }
                                onChange={(e) =>
                                    actualizarPronostico(
                                        partido.id,
                                        "pronosticoLocal",
                                        e.target.value
                                    )
                                }
                            />
                            <input
                                type="number"
                                min="0"
                                className="form-control"
                                placeholder={
                                    partido.equipoVisitante
                                }
                                value={
                                    partido.pronosticoVisitante
                                    ?? ""
                                }
                                onChange={(e) =>
                                    actualizarPronostico(
                                        partido.id,
                                        "pronosticoVisitante",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <button
                            className="btn btn-success mt-3"
                            disabled={
                                !tienePronosticoValido(
                                    partido.pronosticoLocal
                                ) ||
                                !tienePronosticoValido(
                                    partido.pronosticoVisitante
                                )
                            }
                            onClick={() =>
                                guardarPronostico(
                                    partido
                                )
                            }
                        >
                            Guardar Pronóstico
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}