import { useEffect, useState } from "react";
import { API_URL } from "./config";

export function MisPronosticos() {

    const [pronosticos, setPronosticos] = useState([]);
    const [pronosticosPartido, setPronosticosPartido] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    //const [partidoSeleccionado, setPartidoSeleccionado] = useState(null);
    const [tituloPartido, setTituloPartido] = useState("");

    useEffect(() => {

        const usuarioId =
            localStorage.getItem("usuarioId");

        fetch(
            `${API_URL}/pronosticos/usuario/${usuarioId}`
        )
            .then(response => response.json())
            .then(data => {

                setPronosticos(data);

            });

    }, []);

    const verPronosticos = async (partido) => {

        try {

            const response = await fetch(
                `${API_URL}/pronosticos/partido/${partido.id}`
            );

            const data = await response.json();

            data.sort(
                (a, b) =>
                    b.usuario.puntos - a.usuario.puntos
            );

            setPronosticosPartido(data);

            setTituloPartido(
                `${partido.equipoLocal} vs ${partido.equipoVisitante}`
            );

            setMostrarModal(true);

        } catch (error) {

            console.error(error);

            alert("Error cargando pronósticos");

        }

    };

    return (
        <>
            <div className="container">

                <h2>
                    Mis Pronósticos
                </h2>

                {pronosticos.map(pronostico => (

                    <div
                        key={pronostico.id}
                        className="card mb-3"
                    >

                        <div className="card-body">

                            <h5>

                                {pronostico.partido.equipoLocal}

                                {" vs "}

                                {pronostico.partido.equipoVisitante}

                            </h5>
                            <p>

                                <strong>Resultado real:

                                    {" "}

                                    {pronostico.partido.golesLocal}

                                    {" - "}

                                    {pronostico.partido.golesVisitante}</strong>

                            </p>
                            <p>

                                Mi pronóstico:

                                {" "}

                                {pronostico.golesLocalPronosticado}

                                {" - "}

                                {pronostico.golesVisitantePronosticado}

                            </p>

                            <p>

                                Puntos:

                                {" "}

                                {pronostico.puntosObtenidos
                                    ?? "Pendiente"}

                            </p>
                            <button
                                className="btn btn-info mt-2"
                                onClick={() => verPronosticos(pronostico.partido)}
                            >
                                Ver Pronósticos
                            </button>

                        </div>

                    </div>

                ))}

            </div>
            {mostrarModal && (

                <div
                    className="modal d-block"
                    tabIndex="-1"
                    style={{
                        backgroundColor:
                            "rgba(0,0,0,0.5)"
                    }}
                >

                    <div className="modal-dialog modal-lg">

                        <div className="modal-content">

                            <div className="modal-header">

                                <h5 className="modal-title">

                                    {tituloPartido}

                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() =>
                                        setMostrarModal(false)
                                    }
                                />

                            </div>

                            <div className="modal-body">

                                <table className="table table-striped">

                                    <thead>

                                        <tr>
                                            <th>Pos.</th>
                                            <th>Usuario</th>
                                            <th>Puntos</th>
                                            <th>Pronóstico</th>
                                        </tr>

                                    </thead>

                                    <tbody>

                                        {pronosticosPartido.map(
                                            (p, index) => (

                                                <tr key={p.id}>

                                                    <td>

                                                        {index === 0 && "🥇"}

                                                        {index === 1 && "🥈"}

                                                        {index === 2 && "🥉"}

                                                        {index > 2 &&
                                                            index + 1}

                                                    </td>

                                                    <td>
                                                        {p.usuario.nombre}
                                                    </td>

                                                    <td>
                                                        {p.usuario.puntos}
                                                    </td>

                                                    <td>

                                                        {p.golesLocalPronosticado}

                                                        {" - "}

                                                        {p.golesVisitantePronosticado}

                                                    </td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>

                            <div className="modal-footer">

                                <button
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        setMostrarModal(false)
                                    }
                                >
                                    Cerrar
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </>
    )
}