import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

export function PronosticosAdmin() {

    const [pronosticos, setPronosticos] = useState([]);
    const [pagina, setPagina] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);

    const cargarPronosticos = async (
        numeroPagina = 0
    ) => {

        try {

            const response = await fetch(
                `${API_URL}/pronosticos/admin?page=${numeroPagina}&size=20`
            );

            if (!response.ok) {
                throw new Error(
                    "Error cargando pronósticos"
                );
            }

            const data = await response.json();

            setPronosticos(data.content);
            setPagina(data.number);
            setTotalPaginas(data.totalPages);

        } catch (error) {

            console.error(error);

            alert(
                "Error cargando pronósticos"
            );
        }
    };

    useEffect(() => {
        cargarPronosticos();
    }, []);

    const eliminarPronostico = async (id) => {

        if (!window.confirm(
            `¿Eliminar pronóstico ${id}?`
        )) {
            return;
        }

        try {

            const response = await fetch(
                `${API_URL}/pronosticos/${id}`,
                {
                    method: "DELETE"
                }
            );

            if (response.ok) {

                alert(
                    "Pronóstico eliminado correctamente"
                );

                cargarPronosticos(pagina);

            } else {

                const error =
                    await response.text();

                alert(error);
            }

        } catch (error) {

            console.error(error);

            alert(
                "Error eliminando pronóstico"
            );
        }
    };

    return (

        <div className="container">

            <h2 className="mb-4">
                Pronósticos Registrados
            </h2>

            {pronosticos.length === 0 ? (

                <div className="alert alert-info">
                    No hay pronósticos registrados.
                </div>

            ) : (

                <>
                    <div className="table-responsive">

                        <table className="table table-striped">

                            <thead>

                                <tr>
                                    <th>ID</th>
                                    <th>Usuario</th>
                                    <th>Equipo Local</th>
                                    <th>Equipo Visitante</th>
                                    <th>Pronóstico</th>
                                    <th>Acciones</th>
                                </tr>

                            </thead>

                            <tbody>

                                {pronosticos.map(
                                    pronostico => (

                                        <tr
                                            key={pronostico.id}
                                        >
                                            <td>
                                                {pronostico.id}
                                            </td>

                                            <td>
                                                {pronostico.nombreUsuario}
                                            </td>

                                            <td>
                                                {pronostico.equipoLocal}
                                            </td>

                                            <td>
                                                {pronostico.equipoVisitante}
                                            </td>

                                            <td>
                                                {pronostico.golesLocalPronosticado}
                                                {" - "}
                                                {pronostico.golesVisitantePronosticado}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() =>
                                                        eliminarPronostico(
                                                            pronostico.id
                                                        )
                                                    }
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                    <div className="d-flex justify-content-center gap-2">

                        <button
                            className="btn btn-secondary"
                            disabled={pagina === 0}
                            onClick={() =>
                                cargarPronosticos(
                                    pagina - 1
                                )
                            }
                        >
                            Anterior
                        </button>

                        <span className="align-self-center">
                            Página {pagina + 1} de {totalPaginas}
                        </span>

                        <button
                            className="btn btn-secondary"
                            disabled={
                                pagina >= totalPaginas - 1
                            }
                            onClick={() =>
                                cargarPronosticos(
                                    pagina + 1
                                )
                            }
                        >
                            Siguiente
                        </button>

                    </div>
                </>
            )}

        </div>
    );
}