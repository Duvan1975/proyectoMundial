import { CuadrosTexto } from "./CuadrosTexto";
import { AgregarTablaUsuarios } from "./AgregarTablaUsuarios";

export function FormularioUsuarios() {
    return (
        <div className='container'>
            <h1>Registro de Usuario</h1>
            <br />

            <div className="row">
                <CuadrosTexto
                    tamanoInput="col-md-4"
                    titulolabel="Nombre"
                    tipoinput="text"
                    nombreinput="nombre"
                    idinput="nombre"
                    placeholderinput="Ingrese su nombre aquí"
                />
                <CuadrosTexto
                    tamanoInput="col-md-4"
                    titulolabel="Puntos"
                    tipoinput="number"
                    nombreinput="puntos"
                    idinput="puntos"
                    placeholderinput="Ingrese la cantidad de puntos"
                />
                <CuadrosTexto
                    tamanoInput="col-md-4"
                    titulolabel="PIN"
                    tipoinput="password"
                    nombreinput="pin"
                    idinput="pin"
                    placeholderinput="Ingrese PIN de 4 dígitos"
                />

            </div>
            <button
                onClick={AgregarTablaUsuarios}
                className='btn btn-success btn-lg'>Registrar</button>
            <br />

            <br />
        </div>
    )
}