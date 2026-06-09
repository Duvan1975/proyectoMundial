import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CuadrosTexto } from './CuadrosTexto';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<div calassName='container'>
  <h1>Formulario Usuarios</h1>
  <button className='btn btn-success btn-lg'>Iniciar</button>
  <CuadrosTexto
    tamanoInput="col-md-4"
    titulolabel="Nombre"
    tipoinput="text"
    nombreinput="nombre"
    idinput="nombre"
    placeholderinput="Ingrese su nombre aquí"
  />
</div>
);