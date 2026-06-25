import { useEffect, useState } from "react";
import { API_URL } from "./config";
import Swal from "sweetalert2";

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
            .then(async response => {
                if (!response.ok) {
                    console.error("Fetch error:", response.status, response.statusText);
                    // keep partidos as array to avoid map errors
                    setPartidos([]);
                    return null;
                }

                try {
                    return await response.json();
                } catch (err) {
                    console.error("Error parsing JSON from /partidos/disponibles-edicion:", err);
                    setPartidos([]);
                    return null;
                }
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setPartidos(data);
                } else if (data === null) {
                    // already handled above
                } else {
                    console.error("Unexpected response shape for partidos:", data);
                    setPartidos([]);
                }
            })
            .catch(err => {
                console.error("Network error fetching partidos:", err);
                setPartidos([]);
            });

    }, [usuarioId]);

    const guardarPronostico = async (partido) => {

        //console.log(partido);
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

                await Swal.fire({
                    icon: "success",
                    title: partido.yaPronosticado
                        ? "Pronóstico actualizado"
                        : "Pronóstico guardado",
                    timer: 1500,
                    showConfirmButton: false
                });

            } else {

                const error =
                    await response.text();

                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error
                });

            }

        } catch (error) {

            //console.error(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error guardando pronóstico"
            });

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

    const confirmarGuardarPronostico = (partido) => {

        Swal.fire({
            title: partido.yaPronosticado
                ? "¿Actualizar pronóstico?"
                : "¿Guardar pronóstico?",
            text: `${partido.pronosticoLocal} - ${partido.pronosticoVisitante}`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#198754"
        }).then((result) => {

            if (result.isConfirmed) {
                guardarPronostico(partido);
            }

        });

    };

    const colombiaStyle = {
        fontWeight: 700,
        textShadow: "1px 1px 3px rgba(0, 0, 0, 0.25)",
        background: "linear-gradient(90deg, #FFD100 0%, #FFD100 33%, #0038A8 33%, #0038A8 66%, #CE1126 66%, #CE1126 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline-block",
        padding: "0 4px",
    };

    const renderTeamName = (equipo) =>
        equipo === "COLOMBIA"
            ? <span style={colombiaStyle}>{equipo}</span>
            : equipo;

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
                            {renderTeamName(partido.equipoLocal)}
                            {" vs "}
                            {renderTeamName(partido.equipoVisitante)}
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
                                confirmarGuardarPronostico(
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