import { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

export function RegistrarPartido() {

    const [formulario, setFormulario] = useState({
        equipoLocal: "",
        equipoVisitante: "",
        fechaPartido: "",
        faseId: 1
    });

    const actualizarCampo = (campo, valor) => {
        setFormulario(prev => ({
            ...prev,
            [campo]: valor
        }));
    };

    const registrarPartido = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                `${API_URL}/partidos`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        equipoLocal: formulario.equipoLocal,
                        equipoVisitante: formulario.equipoVisitante,
                        fechaPartido: formulario.fechaPartido,
                        golesLocal: 0,
                        golesVisitante: 0,
                        finalizado: false,
                        habilitadoPronostico: false,
                        faseId: Number(formulario.faseId)
                    })
                }
            );

            if (response.ok) {

                alert("Partido registrado correctamente");

                setFormulario({
                    equipoLocal: "",
                    equipoVisitante: "",
                    fechaPartido: "",
                    faseId: 1
                });

            } else {

                const error = await response.text();

                alert(error);
            }

        } catch (error) {

            console.error(error);

            alert("Error registrando partido");
        }
    };

    return (

        <div className="container">

            <div className="card shadow-sm">

                <div className="card-body">

                    <h2 className="mb-4">
                        Registrar Partido
                    </h2>

                    <form onSubmit={registrarPartido}>

                        <div className="mb-3">
                            <label className="form-label">
                                Equipo Local
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={formulario.equipoLocal}
                                onChange={(e) =>
                                    actualizarCampo(
                                        "equipoLocal",
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Equipo Visitante
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={formulario.equipoVisitante}
                                onChange={(e) =>
                                    actualizarCampo(
                                        "equipoVisitante",
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Fecha y Hora
                            </label>

                            <input
                                type="datetime-local"
                                className="form-control"
                                value={formulario.fechaPartido}
                                onChange={(e) =>
                                    actualizarCampo(
                                        "fechaPartido",
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Fase
                            </label>

                            <select
                                className="form-select"
                                value={formulario.faseId}
                                onChange={(e) =>
                                    actualizarCampo(
                                        "faseId",
                                        e.target.value
                                    )
                                }
                            >
                                <option value={1}>GRUPOS</option>
                                <option value={2}>DIECISEISAVOS</option>
                                <option value={3}>OCTAVOS</option>
                                <option value={4}>CUARTOS</option>
                                <option value={5}>SEMIFINAL</option>
                                <option value={6}>TERCER PUESTO</option>
                                <option value={7}>FINAL</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Registrar Partido
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}