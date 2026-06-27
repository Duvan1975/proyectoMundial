import { useEffect, useState } from "react";
import { API_URL } from "./config";
import Swal from "sweetalert2";

export function AdministrarPartidos() {

    const [partidos, setPartidos] = useState([]);

    useEffect(() => {
        cargarPartidos();
    }, []);

    const cargarPartidos = async () => {

        try {

            const response = await fetch(
                `${API_URL}/partidos/pendientes`
            );

            const data = await response.json();

            setPartidos(data);

        } catch (error) {

            console.error(error);

            alert("Error cargando partidos");
        }
    };

    const actualizarCampo = (
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

    const guardarResultado = async (
        partido
    ) => {

        if (
            !window.confirm(
                `¿Guardar resultado de ${partido.equipoLocal} vs ${partido.equipoVisitante}?`
            )
        ) {
            return;
        }

        try {

            const response = await fetch(
                `${API_URL}/partidos`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        id: partido.id,
                        equipoLocal: partido.equipoLocal,
                        equipoVisitante: partido.equipoVisitante,
                        fechaPartido: partido.fechaPartido,

                        golesLocal: Number(partido.golesLocal),
                        golesVisitante: Number(partido.golesVisitante),
                        finalizado: partido.finalizado,
                        habilitadoPronostico: partido.habilitadoPronostico
                    })
                }
            );

            if (response.ok) {

                alert(
                    "Resultado guardado correctamente"
                );

                cargarPartidos();

            } else {

                const error =
                    await response.text();

                alert(error);
            }
        } catch (error) {
            console.error(error);

            alert(
                "Error actualizando partido"
            );
        }
    };

    const eliminarPartido = async (partido) => {

        const result = await Swal.fire({
            title: "¿Eliminar partido?",
            text: `${partido.equipoLocal} vs ${partido.equipoVisitante}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc3545",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        });

        if (!result.isConfirmed) {
            return;
        }

        try {

            const response = await fetch(
                `${API_URL}/partidos/${partido.id}`,
                {
                    method: "DELETE"
                }
            );

            if (response.ok) {

                await Swal.fire({
                    icon: "success",
                    title: "Partido eliminado",
                    timer: 1500,
                    showConfirmButton: false
                });

                cargarPartidos();

            } else {

                const error = await response.text();

                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error
                });

            }

        } catch (error) {

            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No fue posible eliminar el partido."
            });

        }

    };

    return (

        <div className="container">
            <h2 className="mb-4">
                Administración de Partidos
            </h2>
            {partidos.length === 0 ? (
                <div className="alert alert-info">
                    No hay partidos habilitados.
                </div>
            ) : (
                partidos.map(partido => (

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

                            <p className="text-muted">
                                {partido.fase?.nombre}
                            </p>

                            <div className="row g-3">

                                {/* Equipos */}
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">
                                        Equipo Local
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={partido.equipoLocal ?? ""}
                                        onChange={(e) =>
                                            actualizarCampo(
                                                partido.id,
                                                "equipoLocal",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-bold">
                                        Equipo Visitante
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={partido.equipoVisitante ?? ""}
                                        onChange={(e) =>
                                            actualizarCampo(
                                                partido.id,
                                                "equipoVisitante",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                {/* Marcador */}
                                <div className="col-md-3">
                                    <label className="form-label fw-bold">
                                        Goles Local
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        className="form-control"
                                        value={partido.golesLocal ?? ""}
                                        onChange={(e) =>
                                            actualizarCampo(
                                                partido.id,
                                                "golesLocal",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label fw-bold">
                                        Goles Visitante
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        className="form-control"
                                        value={partido.golesVisitante ?? ""}
                                        onChange={(e) =>
                                            actualizarCampo(
                                                partido.id,
                                                "golesVisitante",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                {/* Fecha */}
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">
                                        Fecha del Partido
                                    </label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        value={partido.fechaPartido ?? ""}
                                        onChange={(e) =>
                                            actualizarCampo(
                                                partido.id,
                                                "fechaPartido",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                {/* Checkboxes */}
                                <div className="col-md-4">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={partido.finalizado ?? false}
                                            onChange={(e) =>
                                                actualizarCampo(
                                                    partido.id,
                                                    "finalizado",
                                                    e.target.checked
                                                )
                                            }
                                        />
                                        <label className="form-check-label">
                                            Finalizado
                                        </label>
                                    </div>

                                    <div className="form-check mt-2">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={partido.habilitadoPronostico ?? false}
                                            onChange={(e) =>
                                                actualizarCampo(
                                                    partido.id,
                                                    "habilitadoPronostico",
                                                    e.target.checked
                                                )
                                            }
                                        />
                                        <label className="form-check-label">
                                            Habilitado Pronóstico
                                        </label>
                                    </div>
                                </div>

                                {/* Botón */}
                                <div className="col-md-8 d-flex justify-content-end gap-2 align-items-end">

                                    <button
                                        className="btn btn-success px-4"
                                        onClick={() => guardarResultado(partido)}
                                    >
                                        💾 Guardar
                                    </button>

                                    <button
                                        className="btn btn-danger px-4"
                                        onClick={() => eliminarPartido(partido)}
                                    >
                                        🗑 Eliminar
                                    </button>

                                </div>

                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}