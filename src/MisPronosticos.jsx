import { useEffect, useState } from "react";
import { API_URL } from "./config";

export function MisPronosticos() {

    const [pronosticos, setPronosticos] = useState([]);
    const [pronosticosPartido, setPronosticosPartido] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [partidoSeleccionado, setPartidoSeleccionado] = useState(null);

    const [pagina, setPagina] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const TOTAL_PARTICIPANTES = 21; // total de participantes en el pronóstico
    const PAGE_SIZE = 5;

    const cargarPronosticos = async (paginaActual = 0) => {

        const usuarioId =
            localStorage.getItem("usuarioId");

        if (!usuarioId) {
            setPronosticos([]);
            setPagina(0);
            setTotalPaginas(0);
            return;
        }

        const response = await fetch(
            `${API_URL}/pronosticos/usuario/${usuarioId}?page=${paginaActual}&size=${PAGE_SIZE}`
        );

        const data = await response.json();

        let contenido = [];
        let pageNumber = paginaActual;
        let pages = 1;

        if (Array.isArray(data)) {
            const reversed = data.reverse();
            contenido = reversed.slice(paginaActual * PAGE_SIZE, (paginaActual + 1) * PAGE_SIZE);
            pages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
        } else if (Array.isArray(data?.content)) {
            const contentArray = data.content;
            const hasServerPaging =
                typeof data.number === "number" &&
                typeof data.totalPages === "number";

            if (hasServerPaging) {
                contenido = contentArray;
                pageNumber = data.number;
                pages = data.totalPages;
            } else {
                const reversed = contentArray.reverse();
                contenido = reversed.slice(paginaActual * PAGE_SIZE, (paginaActual + 1) * PAGE_SIZE);
                pages = Math.max(1, Math.ceil(contentArray.length / PAGE_SIZE));
            }
        }

        setPronosticos(contenido);
        setPagina(pageNumber);
        setTotalPaginas(pages);

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

            // Normalizar a array por seguridad
            const items = Array.isArray(data)
                ? data
                : Array.isArray(data?.content)
                    ? data.content
                    : [];

            // Ordenar si es array
            if (Array.isArray(items)) {
                items.sort(
                    (a, b) => b.usuario?.puntos - a.usuario?.puntos
                );
            }

            setPronosticosPartido(items);
            setPartidoSeleccionado(partido);
            setMostrarModal(true);

        } catch (error) {
            console.error(error);
            alert("Error cargando pronósticos");
        }

    };

    const resumenPronosticos = Array.isArray(pronosticosPartido)
        ? pronosticosPartido.reduce((acc, p) => {
            const l = Number(p.golesLocalPronosticado);
            const v = Number(p.golesVisitantePronosticado);
            if (isNaN(l) || isNaN(v)) return acc;
            if (l > v) acc.local++;
            else if (l < v) acc.visitante++;
            else acc.empate++;
            return acc;
        }, { local: 0, empate: 0, visitante: 0 })
        : { local: 0, empate: 0, visitante: 0 };

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


    return (
        <>
            <div className="container">

                <h2>
                    Mis Pronósticos
                </h2>

                <div className="d-flex justify-content-center gap-2 mb-4">

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

                {Array.isArray(pronosticos) ? pronosticos.map(pronostico => (

                    <div
                        key={pronostico.id}
                        
                        className="card mb-3"
                    >
                        console.log(pronostico);

                        <div className="card-body">

                            <h5>
                                {renderTeamName(pronostico.partido.equipoLocal)}
                                {" vs "}
                                {renderTeamName(pronostico.partido.equipoVisitante)}
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

                )) : null}

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
                                    {renderTeamName(partidoSeleccionado?.equipoLocal ?? "")}
                                    {" vs "}
                                    {renderTeamName(partidoSeleccionado?.equipoVisitante ?? "")}
                                    {" ("}
                                    {partidoSeleccionado?.golesLocal ?? '-'}
                                    {" - "}
                                    {partidoSeleccionado?.golesVisitante ?? '-'}
                                    {")"}

                                    <small className="text-muted ms-2">
                                        {pronosticosPartido.length} de {TOTAL_PARTICIPANTES} han pronosticado
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

                                        {Array.isArray(pronosticosPartido) ? pronosticosPartido.map(
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
                                                        {p.usuario?.nombre}
                                                    </td>

                                                    <td>
                                                        {p.usuario?.puntos}
                                                    </td>

                                                    <td>

                                                        {p.golesLocalPronosticado}

                                                        {" - "}

                                                        {p.golesVisitantePronosticado}

                                                    </td>

                                                </tr>

                                            )
                                        ) : null}

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