import { useState } from "react";
import Swal from "sweetalert2";
import { API_URL } from "./config";
import { FormularioUsuarios } from "./FormularioUsuario";
import { TablaUsuarios } from "./TablaUsuarios";
import { SeleccionarUsuario } from "./SeleccionarUsuario";
import { PartidosDisponibles } from "./PartidosDisponibles";
import { MisPronosticos } from "./MisPronosticos";
import { Ranking } from "./Ranking";
import { PinAdministrador } from "./PinAdministrador";
import { CambiarPin } from "./CambiarPin";
import { AdministrarPartidos } from "./AdministrarPartidos";
import { RegistrarPartido } from "./RegistrarPartido";
import { PronosticosAdmin } from "./PronosticosAdmin";

export function Menu() {

    const usuarioActivo = localStorage.getItem("usuarioId");
    const nombreUsuario = localStorage.getItem("nombreUsuario");
    /*const [ultimaActualizacion, setUltimaActualizacion] = useState(
        localStorage.getItem("ultimaActualizacion")
    );*/

    const [vista, setVista] = useState("menu");

    const [esAdmin, setEsAdmin] =
        useState(
            localStorage.getItem("admin")
            === "true"
        );

    /*const inyectarUltimaActualizacion = () => {
        try {
            const ahora = new Date();
            const iso = ahora.toISOString();
            localStorage.setItem("ultimaActualizacion", iso);
            setUltimaActualizacion(iso);
        } catch (e) {
            console.error("Error guardando fecha:", e);
        }
    };*/

    if (!usuarioActivo) {
        return <SeleccionarUsuario />;
    }

    const confirmarSalida = () => {
        Swal.fire({
            title: "¿Cerrar sesión?",
            text: "Tendrás que volver a ingresar con tu PIN.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#dc3545",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Sí, salir",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("usuarioId");
                localStorage.removeItem("nombreUsuario");

                window.location.reload();
            }
        });
    };

    const congelarRanking = async () => {

        if (!window.confirm(
            "¿Desea guardar las posiciones actuales del ranking?\n\n" +
            "A partir de este momento los movimientos (⬆️⬇️) se calcularán tomando como referencia estas posiciones."
        )) {
            return;
        }

        try {

            const response = await fetch(
                `${API_URL}/usuarios/congelar-ranking`,
                {
                    method: "POST"
                }
            );

            if (!response.ok) {
                throw new Error("Error al congelar el ranking");
            }

            alert("✅ Posiciones del ranking guardadas correctamente.");

        } catch (error) {

            console.error(error);

            alert("❌ No fue posible guardar las posiciones.");
        }
    };

    return (

        <div className="container py-4">

            <header className="mb-4">
                <div className="card shadow-sm border-0" style={{ borderRadius: "16px", background: "linear-gradient(135deg, #1a1a2e, #16213e)" }}>
                    <div className="card-body p-4">
                        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3">

                            {/* Info usuario */}
                            <div className="text-white">
                                <h1 className="h3 mb-1 fw-bold">
                                    <span className="me-2">👋</span> Panel de Usuario
                                </h1>
                                <p className="mb-0 opacity-75">
                                    Bienvenido, <strong className="text-warning">{nombreUsuario}</strong>
                                </p>
                            </div>

                            {/* Botones más grandes */}
                            <div className="d-flex flex-wrap gap-2 w-100 w-lg-auto">
                                <button
                                    className="btn btn-light px-4 py-2 flex-fill flex-lg-grow-0"
                                    onClick={() => setVista("admin")}
                                    style={{ fontWeight: "600", borderRadius: "10px", fontSize: "0.95rem" }}
                                >
                                    ⚙️ Admin
                                </button>

                                <button
                                    className="btn btn-info px-4 py-2 flex-fill flex-lg-grow-0 text-white"
                                    onClick={() => setVista("menu")}
                                    style={{ fontWeight: "600", borderRadius: "10px", background: "#17a2b8", border: "none", fontSize: "0.95rem" }}
                                >
                                    📖 Instrucciones
                                </button>

                                <button
                                    className="btn btn-warning px-4 py-2 flex-fill flex-lg-grow-0"
                                    onClick={() => setVista("pronosticos")}
                                    style={{ fontWeight: "700", borderRadius: "10px", fontSize: "0.95rem" }}
                                >
                                    ✏️ Pronosticar
                                </button>

                                <button
                                    className="btn btn-outline-light px-4 py-2 flex-fill flex-lg-grow-0"
                                    onClick={() => setVista("misPronosticos")}
                                    style={{ fontWeight: "600", borderRadius: "10px", fontSize: "0.95rem" }}
                                >
                                    📋 Mis Pronósticos
                                </button>

                                <button
                                    className="btn btn-warning px-4 py-2 flex-fill flex-lg-grow-0"
                                    onClick={() => setVista("ranking")}
                                    style={{ fontWeight: "700", borderRadius: "10px", fontSize: "0.95rem" }}
                                >
                                    🏆 Ranking
                                </button>

                                <button
                                    className="btn btn-outline-light px-4 py-2 flex-fill flex-lg-grow-0"
                                    onClick={() => setVista("cambiarPin")}
                                    style={{ fontWeight: "600", borderRadius: "10px", fontSize: "0.95rem" }}
                                >
                                    🔑 Cambiar PIN
                                </button>

                                <button
                                    className="btn btn-danger px-4 py-2 flex-fill flex-lg-grow-0"
                                    onClick={confirmarSalida}
                                    style={{
                                        fontWeight: "700",
                                        borderRadius: "10px",
                                        fontSize: "0.95rem"
                                    }}
                                >
                                    🚪 Salir
                                </button>
                            </div>
                        </div>
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
                            {/*<button
                                className="btn btn-outline-info btn-sm"
                                onClick={inyectarUltimaActualizacion}
                            >
                                Registrar última actualización
                            </button>*/}
                            <button
                                className="btn btn-secondary btn-sm flex-fill flex-md-grow-0"
                                onClick={() => setVista("tabla")}
                            >
                                Listar Usuarios
                            </button>
                            <button
                                className="btn btn-success btn-sm"
                                onClick={() =>
                                    setVista("registrarPartido")
                                }
                            >
                                Registrar Partido
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
                                className="btn btn-dark btn-sm"
                                onClick={() =>
                                    setVista("pronosticosAdmin")
                                }
                            >
                                Ver Pronósticos
                            </button>
                            <button
                                className="btn btn-warning btn-sm"
                                onClick={congelarRanking}
                            >
                                📸 Congelar Ranking
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

<h6 className="mb-3 fw-bold">
  <span className="me-2">📈</span> Incremento de puntos por fase
</h6>

<div className="table-responsive">
  <table className="table table-bordered text-center align-middle">
    <thead>
      <tr style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)", color: "white" }}>
        <th style={{ minWidth: "120px" }}>Fase</th>
        <th style={{ background: "#ffd700", color: "#1a1a2e" }}>🎯 Exacto</th>
        <th style={{ background: "#ffa500", color: "#1a1a2e" }}>⚡ Dif. Gol</th>
        <th style={{ background: "#00b894", color: "white" }}>🏅 Ganador</th>
        <th style={{ background: "#0984e3", color: "white" }}>🤝 Empate</th>
      </tr>
    </thead>
    <tbody>
      <tr style={{ background: "#f8f9fa", fontWeight: "normal" }}>
        <td><span className="badge bg-secondary">🔵</span> Grupos</td>
        <td><strong>10</strong></td>
        <td><strong>7</strong></td>
        <td><strong>5</strong></td>
        <td><strong>5</strong></td>
      </tr>
      <tr style={{ background: "#e8f5e9", fontWeight: "500" }}>
        <td><span className="badge bg-success">🟢</span> Dieciseisavos</td>
        <td><strong>20</strong></td>
        <td><strong>14</strong></td>
        <td><strong>10</strong></td>
        <td><strong>10</strong></td>
      </tr>
      <tr style={{ background: "#e3f2fd", fontWeight: "500" }}>
        <td><span className="badge bg-primary">🔵</span> Octavos</td>
        <td><strong>30</strong></td>
        <td><strong>21</strong></td>
        <td><strong>15</strong></td>
        <td><strong>15</strong></td>
      </tr>
      <tr style={{ background: "#fff3e0", fontWeight: "500" }}>
        <td><span className="badge bg-warning">🟠</span> Cuartos</td>
        <td><strong>40</strong></td>
        <td><strong>28</strong></td>
        <td><strong>20</strong></td>
        <td><strong>20</strong></td>
      </tr>
      <tr style={{ background: "#fce4ec", fontWeight: "500" }}>
        <td><span className="badge bg-danger">🔴</span> Semifinal</td>
        <td><strong>50</strong></td>
        <td><strong>35</strong></td>
        <td><strong>25</strong></td>
        <td><strong>25</strong></td>
      </tr>
      <tr style={{ background: "#f3e5f5", fontWeight: "500" }}>
        <td><span className="badge bg-purple">🟣</span> Tercer Puesto</td>
        <td><strong>60</strong></td>
        <td><strong>42</strong></td>
        <td><strong>30</strong></td>
        <td><strong>30</strong></td>
      </tr>
      <tr style={{ background: "linear-gradient(135deg, #ffd700, #ff6b00)", color: "white", fontWeight: "700" }}>
        <td>🏆 Final</td>
        <td>70</td>
        <td>49</td>
        <td>35</td>
        <td>35</td>
      </tr>
    </tbody>
  </table>
</div>

<div className="alert alert-warning mt-3">
  <strong>🏆 ¡Atención!</strong> A medida que avanza el campeonato, los puntos aumentan para mantener la emoción y permitir <strong>remontadas épicas</strong> en la clasificación.
</div>

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

                                <li>Los resultados de los partidos no son automáticos y serán cargados manualmente.</li>
                                <li>La puntuación y el ranking se actualizan manualmente después de cada jornada.</li>

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
                {vista === "registrarPartido" &&
                    <RegistrarPartido />
                }
                {vista === "pronosticosAdmin" &&
                    <PronosticosAdmin />
                }
            </main>

        </div>
    );
}