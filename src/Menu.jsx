import { useState } from "react";
import { FormularioUsuarios } from "./FormularioUsuario";
import { TablaUsuarios } from "./TablaUsuarios";
import { SeleccionarUsuario } from "./SeleccionarUsuario";
import { PartidosDisponibles } from "./PartidosDisponibles";
import { MisPronosticos } from "./MisPronosticos";
import { Ranking } from "./Ranking";
import { PinAdministrador } from "./PinAdministrador";
import { CambiarPin } from "./CambiarPin";
import { AdministrarPartidos } from "./AdministrarPartidos";

export function Menu() {

    const usuarioActivo = localStorage.getItem("usuarioId");
    const nombreUsuario = localStorage.getItem("nombreUsuario");

    const [vista, setVista] = useState("menu");

    const [esAdmin, setEsAdmin] =
        useState(
            localStorage.getItem("admin")
            === "true"
        );

    if (!usuarioActivo) {
        return <SeleccionarUsuario />;
    }

    return (

        <div className="container py-4">

            <header className="mb-4">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
                    <div>
                        <h1 className="h3 mb-1">Panel de Usuario</h1>
                        <p className="mb-0 text-muted">
                            Bienvenido, <strong>{nombreUsuario}</strong>
                        </p>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                        <button
                            className="btn btn-dark btn-sm"
                            onClick={() => setVista("admin")}
                        >
                            Administración
                        </button>
                        <button
                            className="btn btn-info btn-sm"
                            onClick={() => setVista("menu")}
                        >
                            Instrucciones
                        </button>

                        <button
                            className="btn btn-warning btn-sm"
                            onClick={() => setVista("pronosticos")}
                        >
                            Pronosticar
                        </button>
                        <button
                            className="btn btn-dark btn-sm"
                            onClick={() => setVista("misPronosticos")}
                        >
                            Mis Pronósticos
                        </button>
                        <button
                            className="btn btn-warning btn-sm"
                            onClick={() => setVista("ranking")}
                        >
                            Ranking
                        </button>
                        <button
                            className="btn btn-warning me-2"
                            onClick={() =>
                                setVista("cambiarPin")
                            }
                        >
                            Cambiar PIN
                        </button>
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                                localStorage.removeItem("usuarioId");
                                localStorage.removeItem("nombreUsuario");
                                window.location.reload();
                            }}
                        >
                            Salir
                        </button>
                    </div>
                </div>
            </header>

            {esAdmin && (
                <section className="mb-4">
                    <div className="card shadow-sm">
                        <div className="card-body p-3 d-flex flex-wrap gap-2 justify-content-start">
                            <button
                                className="btn btn-primary btn-sm flex-fill flex-md-grow-0"
                                onClick={() => setVista("formulario")}
                            >
                                Registrar Usuario
                            </button>
                            <button
                                className="btn btn-secondary btn-sm flex-fill flex-md-grow-0"
                                onClick={() => setVista("tabla")}
                            >
                                Listar Usuarios
                            </button>
                            <button
                                className="btn btn-success btn-sm"
                                onClick={() => setVista("seleccionar")}
                            >
                                Seleccionar Usuario
                            </button>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() =>
                                    setVista("administrarPartidos")
                                }
                            >
                                Administrar Partidos
                            </button>
                            <button
                                className="btn btn-danger btn-sm flex-fill flex-md-grow-0"
                                onClick={() => {
                                    localStorage.removeItem("admin");
                                    setEsAdmin(false);
                                    setVista("inicio");
                                }}
                            >
                                Salir Admin
                            </button>
                        </div>
                    </div>
                </section>
            )}

            <main>
                {vista === "menu" && (
                    <div className="card shadow-sm">
                        <div className="card-body">

                            <h2 className="mb-3">🏆 Mundial 2026</h2>

                            <p className="lead">
                                Bienvenido al sistema de pronósticos del Mundial 2026.
                                Aquí podrás competir con otros participantes acertando resultados de los partidos.
                            </p>

                            <hr />

                            <h5>💰 Apuesta y premio</h5>
                            <p>
                                Cada participante realiza un único pago de <strong>$20.000 COP</strong>.
                                El total recaudado forma un <strong>premio acumulado</strong> que será entregado
                                íntegramente a la persona con mayor puntuación al final del mundial.
                            </p>

                            <hr />

                            <h5>📌 Reglas importantes</h5>
                            <ul>
                                <li>Los partidos pronosticados desaparecen de la lista una vez guardados.</li>

                                <li>Los pronósticos solo se pueden hacer antes de que inicie cada partido.</li>
                                <li>Una vez el partido haya comenzado, ya no será posible realizar pronósticos sobre ese juego.</li>

                                <li>Los resultados de los partidos no son automáticos y serán cargados manualmente.</li>
                                <li>La puntuación y el ranking se actualizan manualmente después de cada jornada.</li>

                                <li>La pestaña de Administración no está disponible para usuarios.</li>
                                <li>El sistema es solo para uso recreativo entre participantes.</li>
                            </ul>

                            <hr />

                            <h5>🎯 Cómo funciona la puntuación</h5>
                            <p><strong>Ejemplo 1:</strong> Marcador real: Colombia 2 - Brasil 1</p>
                            <ul>
                                <li>2-1 → <strong>10 puntos</strong> (exacto)</li>
                                <li>1-0 → <strong>7 puntos</strong> (mismo ganador, mismos goles de diferencia)</li>
                                <li>3-1 → <strong>5 puntos</strong> (acierta ganador, diferencia de goles distinta)</li>
                                <li>1-1 → <strong>0 puntos</strong></li>
                            </ul>

                            <p><strong>Ejemplo 2:</strong> Marcador real: Colombia 1 - Brasil 1</p>
                            <ul>
                                <li>1-1 → <strong>10 puntos</strong></li>
                                <li>2-2 → <strong>5 puntos</strong></li>
                                <li>2-1 → <strong>0 puntos</strong></li>
                            </ul>

                            <hr />

                            <h5>⚽ Cómo usar la app</h5>
                            <ul>
                                <li><strong>Pronosticar:</strong> Haz tus apuestas de los partidos disponibles. Una vez guardado, no se puede modificar.</li>
                                <li><strong>Mis Pronósticos:</strong> Revisa tus apuestas realizadas.</li>
                                <li><strong>Ranking:</strong> Consulta la tabla de posiciones general.</li>
                            </ul>

                            <hr />

                            <h5>📌 Reglas importantes</h5>
                            <ul>
                                <li>Los partidos pronosticados desaparecen de la lista una vez guardados.</li>
                                <li>Los pronósticos solo se pueden hacer antes de que inicie cada partido.</li>
                                <li>Una vez el partido haya comenzado, ya no será posible realizar pronósticos sobre ese juego.</li>
                                <li>La pestaña de Administración no está disponible para usuarios.</li>
                                <li>El sistema es solo para uso recreativo entre participantes.</li>
                            </ul>

                            <hr />

                            <p className="text-muted">
                                ⚡ ¡Buena suerte y que gane el mejor!
                            </p>

                        </div>
                    </div>
                )}
                {vista === "formulario" && <FormularioUsuarios />}
                {vista === "tabla" && <TablaUsuarios />}
                {vista === "seleccionar" && <SeleccionarUsuario />}
                {vista === "pronosticos" && <PartidosDisponibles />}
                {vista === "misPronosticos" && <MisPronosticos />}
                {vista === "ranking" && <Ranking />}
                {vista === "administrarPartidos" && <AdministrarPartidos />}
                {vista === "admin" && !esAdmin && (
                    <PinAdministrador
                        onSuccess={() => {
                            setEsAdmin(true);
                            setVista("inicio");
                        }}
                    />
                )}
                {vista === "cambiarPin" && <CambiarPin />}
            </main>

        </div>
    );
}