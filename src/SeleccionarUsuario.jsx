import { useEffect, useState } from "react";
import { API_URL } from "./config";

export function SeleccionarUsuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [pin, setPin] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  const ingresar = async () => {
    const response = await fetch(`${API_URL}/usuarios/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuarioId: usuarioSeleccionado.id, pin })
    });

    const acceso = await response.json();

    if (acceso) {
      localStorage.setItem("usuarioId", usuarioSeleccionado.id);
      localStorage.setItem("nombreUsuario", usuarioSeleccionado.nombre);
      window.location.reload();
    } else {
      alert("PIN incorrecto");
    }
  };

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const response = await fetch(`${API_URL}/usuarios?size=1000`);
        const data = await response.json();
        setUsuarios(Array.isArray(data) ? data : data.content || []);
      } catch (error) {
        console.error("Error cargando usuarios", error);
      }
    };
    cargarUsuarios();
  }, []);

  return (
    <div className="container mt-5">
      {/* Header con gradiente */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">
          🌍 Mundial 2026
        </h1>
        <p className="text-muted fs-5">Selecciona tu usuario para continuar</p>
        <div className="mx-auto" style={{ width: "80px", height: "4px", background: "linear-gradient(90deg, #007bff, #6610f2)" }} />
      </div>

      <h4 className="mb-4 text-secondary">👤 ¿Quién eres?</h4>

      {/* Grid de usuarios */}
      <div className="row g-3">
        {usuarios.map((usuario) => (
          <div key={usuario.id} className="col-12 col-sm-6 col-lg-4">
            <button
              className="btn btn-outline-primary w-100 py-3 shadow-sm hover-scale"
              style={{
                borderRadius: "12px",
                fontWeight: "600",
                fontSize: "1.1rem",
                transition: "all 0.2s ease",
                borderWidth: "2px"
              }}
              onClick={() => {
                setUsuarioSeleccionado(usuario);
                setPin("");
                setMostrarModal(true);
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.02)";
                e.target.style.boxShadow = "0 8px 25px rgba(0,123,255,0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "none";
              }}
            >
              <span className="me-2">⚽</span>
              {usuario.nombre}
            </button>
          </div>
        ))}
      </div>

      {/* Modal mejorado */}
      {mostrarModal && usuarioSeleccionado && (
        <div
          className="modal d-block"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(4px)"
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ borderRadius: "16px", border: "none" }}>
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">
                  🔐 Ingresa tu PIN
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setMostrarModal(false);
                    setUsuarioSeleccionado(null);
                    setPin("");
                  }}
                />
              </div>

              <div className="modal-body pt-3">
                <div className="p-3 bg-light rounded-3 mb-3">
                  <span className="text-muted">Usuario:</span>
                  <strong className="ms-2 fs-5">{usuarioSeleccionado.nombre}</strong>
                </div>

                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Ingresa tu PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") ingresar();
                  }}
                  style={{ borderRadius: "10px" }}
                  autoFocus
                />
              </div>

              <div className="modal-footer border-0 pt-0">
                <button
                  type="button"
                  className="btn btn-light px-4"
                  onClick={() => {
                    setMostrarModal(false);
                    setUsuarioSeleccionado(null);
                    setPin("");
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary px-5"
                  onClick={ingresar}
                  style={{ borderRadius: "10px", fontWeight: "600" }}
                >
                  Entrar 🚀
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Estilos adicionales */}
      <style jsx>{`
        .hover-scale {
          transition: all 0.2s ease;
        }
        @media (max-width: 576px) {
          .display-4 {
            font-size: 2.2rem;
          }
        }
      `}</style>
    </div>
  );
}

export default SeleccionarUsuario;