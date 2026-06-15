import { useEffect, useState } from "react";
import { API_URL } from "./config";

export function MisPronosticos() {

    const [pronosticos, setPronosticos] = useState([]);
    const [pronosticosPartido, setPronosticosPartido] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [partidoSeleccionado, setPartidoSeleccionado] = useState(null);
    const [tituloPartido, setTituloPartido] = useState("");

    const [pagina, setPagina] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const TOTAL_PARTICIPANTES = 21; // total de participantes en el pronóstico

    const cargarPronosticos = async (paginaActual = 0) => {

        const usuarioId =
            localStorage.getItem("usuarioId");

        const response = await fetch(
            `${API_URL}/pronosticos/usuario/${usuarioId}?page=${paginaActual}&size=20`
        );

        const data = await response.json();

        setPronosticos(data.content);
        setPagina(data.number);
        setTotalPaginas(data.totalPages);

    };

    useEffect(() => {

        cargarPronosticos();

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
            setPartidoSeleccionado(partido);

            setTituloPartido(
                `${partido.equipoLocal} vs ${partido.equipoVisitante} (${partido.golesLocal ?? '-'} - ${partido.golesVisitante ?? '-'})`
            );

            setMostrarModal(true);

        } catch (error) {
            console.error(error);
            alert("Error cargando pronósticos");
        }

    };

    const resumenPronosticos = pronosticosPartido.reduce(
        (acc, p) => {
            const l = Number(p.golesLocalPronosticado);
            const v = Number(p.golesVisitantePronosticado);
            if (isNaN(l) || isNaN(v)) return acc;
            if (l > v) acc.local++;
            else if (l < v) acc.visitante++;
            else acc.empate++;
            return acc;
        },
        { local: 0, empate: 0, visitante: 0 }
    );

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

                            {/* Campo de puntos removido por solicitud */}
                            <button
                                className="btn btn-info mt-2"
                                onClick={() => verPronosticos(pronostico.partido)}
                            >
                                Ver Pronósticos
                            </button>

                        </div>

                    </div>

                ))}

                <div className="d-flex justify-content-center gap-2 mb-3">

                    <button
                        className="btn btn-secondary"
                        disabled={pagina === 0}
                        onClick={() => cargarPronosticos(pagina - 1)}
                    >
                        Anterior
                    </button>

                    <span className="align-self-center">
                        Página {pagina + 1} de {totalPaginas}
                    </span>

                    <button
                        className="btn btn-secondary"
                        disabled={pagina + 1 >= totalPaginas}
                        onClick={() => cargarPronosticos(pagina + 1)}
                    >
                        Siguiente
                    </button>

                </div>

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

                                    <small className="text-muted ms-2">
                                        {pronosticosPartido.length} pronosticaron — {Math.max(0, TOTAL_PARTICIPANTES - pronosticosPartido.length)} faltan
                                    </small>

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

                                <div className="mb-3">
                                    <p>
                                        <strong>Predicciones:</strong>
                                    </p>
                                    <p>
                                        <strong>{resumenPronosticos.local}</strong> personas pronosticaron victoria de <strong>{partidoSeleccionado?.equipoLocal ?? "equipo local"}</strong>
                                    </p>
                                    <p>
                                        <strong>{resumenPronosticos.empate}</strong> personas pronosticaron empate
                                    </p>
                                    <p>
                                        <strong>{resumenPronosticos.visitante}</strong> personas pronosticaron victoria de <strong>{partidoSeleccionado?.equipoVisitante ?? "equipo visitante"}</strong>
                                    </p>
                                </div>

                                <table className="table table-striped">

                                    <thead>

                                        <tr>
                                            <th>Pos.</th>
                                            <th>Usuario</th>
                                            <th>Total Puntos</th>
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