import { useState } from "react";
import { FormularioUsuarios } from "./FormularioUsuario";
import { TablaUsuarios } from "./TablaUsuarios";
import { SeleccionarUsuario } from "./SeleccionarUsuario";
import { PartidosDisponibles } from "./PartidosDisponibles";
import { MisPronosticos } from "./MisPronosticos";
import { Ranking } from "./Ranking";
import { PinAdministrador } from "./PinAdministrador";
import { CambiarPin } from "./CambiarPin";

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
                            Inicio
                        </button>
                        <button
                            className="btn btn-success btn-sm"
                            onClick={() => setVista("seleccionar")}
                        >
                            Seleccionar Usuario
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
                {vista === "formulario" && <FormularioUsuarios />}
                {vista === "tabla" && <TablaUsuarios />}
                {vista === "seleccionar" && <SeleccionarUsuario />}
                {vista === "pronosticos" && <PartidosDisponibles />}
                {vista === "misPronosticos" && <MisPronosticos />}
                {vista === "ranking" && <Ranking />}
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