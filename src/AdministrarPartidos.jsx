import { useEffect, useState } from "react";
import { API_URL } from "./config";

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

                // Guardar timestamp local de la última actualización (visible a admin)
                try {
                    localStorage.setItem("ultimaActualizacion", new Date().toISOString());
                } catch (e) {
                    // ignore storage errors
                }

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

                            <div className="row">

                                <div className="col-md-5">

                                    <label className="form-label">
                                        {partido.equipoLocal}
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        className="form-control"
                                        value={
                                            partido.golesLocal ?? ""
                                        }
                                        onChange={(e) =>
                                            actualizarCampo(
                                                partido.id,
                                                "golesLocal",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="col-md-5">

                                    <label className="form-label">
                                        {partido.equipoVisitante}
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        className="form-control"
                                        value={
                                            partido.golesVisitante ?? ""
                                        }
                                        onChange={(e) =>
                                            actualizarCampo(
                                                partido.id,
                                                "golesVisitante",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="col-md-2 d-flex align-items-end">

                                    <button
                                        className="btn btn-success w-100"
                                        onClick={() =>
                                            guardarResultado(
                                                partido
                                            )
                                        }
                                    >
                                        Guardar
                                    </button>

                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={
                                                    partido.finalizado ?? false
                                                }
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
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={
                                                    partido.habilitadoPronostico ?? false
                                                }
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
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}