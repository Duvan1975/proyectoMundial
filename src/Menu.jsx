import { useState } from "react";
import { FormularioUsuarios } from "./FormularioUsuario";
import { TablaUsuarios } from "./TablaUsuarios";

export function Menu() {

    const [vista, setVista] = useState("menu");

    return (
        <div className='container'>
            <h1>Usuarios</h1>
            <div className="mb-4">
                <button className="btn btn-info me-2"
                    onClick={() => setVista("menu")}
                >
                    Inicio
                </button>
                <button className="btn btn-primary me-2"
                    onClick={() => setVista("formulario")}
                >
                    Registrar Usuario
                </button>
                <button className="btn btn-secondary"
                    onClick={() => setVista("tabla")}
                >
                    Listar Usuarios
                </button>
                
            </div>
            {vista === "formulario" && <FormularioUsuarios />}
            {vista === "tabla" && <TablaUsuarios />}

        </div>
    );
}