import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CuadrosTexto } from './CuadrosTexto';
import { TablaUsuarios } from './TablaUsuarios';
import { AgregarTablaUsuarios } from './AgregarTablaUsuarios';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<div className='container'>
  <h1>Formulario Usuarios</h1>

  <div className='row'>
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
  </div>
    <button 
    onClick={AgregarTablaUsuarios}
    className='btn btn-success btn-lg'>Registrar</button>
    <br />
    <h2>Usuarios Registrados</h2>
    <TablaUsuarios />

</div>
);