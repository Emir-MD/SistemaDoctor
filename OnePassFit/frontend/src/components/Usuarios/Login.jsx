import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import "./Login.css";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(correo, contraseña);
    setLoading(false);
  };

  return (
    <div className="login-wrapper">
      <form id="form" onSubmit={handleSubmit}>
        <div id="form-body">
          <div id="welcome-lines">
            <div id="welcome-line-1">OnePassFit</div>
            <div id="welcome-line-2">Bienvenido de vuelta</div>
          </div>

          <div id="input-area">
            <div className="form-inp">
              <input
                type="email"
                placeholder="Email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>

            <div className="form-inp">
              <input
                type="password"
                placeholder="Password"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <p className="error">{error}</p>}

          <div id="submit-button-cvr">
            <button className="button" type="submit" disabled={loading}>
              {loading ? "Cargando..." : "Start"}
            </button>
          </div>

          <div id="forgot-pass">
            <Link to="/cambiar-password">¿Olvidaste tu contraseña?</Link>
          </div>
        </div>
        <div id="bar"></div>
      </form>
    </div>
  );
}
