import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { authApi } from "../../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await authApi.login(form);

      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.message || "No se pudo iniciar sesión."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-shell">
        {/* =========================
            LEFT PANEL
        ========================= */}

        <div className="auth-visual">
          <div className="auth-visual-content">
            {/* Brand */}
            <div className="auth-brand">
              <div className="auth-logo-mark">C</div>

              <span>ClientFlow</span>
            </div>

            {/* Main message */}
            <div className="auth-visual-copy">
              <span className="auth-overline">
                CRM · CLIENTES · CRECIMIENTO
              </span>

              <h2>
                Todo tu negocio.
                <br />
                En un solo lugar.
              </h2>

              <p>
                Gestiona clientes, ventas y tareas
                desde una experiencia simple y clara.
              </p>
            </div>

            {/* Mini CRM preview */}
            <div className="auth-dashboard-preview">
              <div className="preview-header">
                <div>
                  <span>Resumen</span>
                  <strong>Rendimiento</strong>
                </div>

                <div className="preview-avatar">
                  N
                </div>
              </div>

              <div className="preview-stats">
                <div className="preview-stat">
                  <span>Clientes</span>
                  <strong>1,248</strong>
                </div>

                <div className="preview-stat">
                  <span>Ingresos</span>
                  <strong>$84,250</strong>
                </div>
              </div>

              <div className="preview-chart">
                <div className="chart-bar bar-1" />
                <div className="chart-bar bar-2" />
                <div className="chart-bar bar-3" />
                <div className="chart-bar bar-4" />
                <div className="chart-bar bar-5" />
                <div className="chart-bar bar-6" />
                <div className="chart-bar bar-7" />
              </div>
            </div>

            {/* Benefits */}
            <div className="auth-benefits">
              <div>
                <CheckCircle2 size={16} />
                <span>Clientes</span>
              </div>

              <div>
                <CheckCircle2 size={16} />
                <span>Pipeline</span>
              </div>

              <div>
                <CheckCircle2 size={16} />
                <span>Analytics</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            RIGHT PANEL
        ========================= */}

        <div className="auth-form-panel">
          <div className="auth-form-container">
            <div className="auth-header">
              <span className="auth-eyebrow">
              
              </span>

              <h1>Inicia sesión</h1>

              <p>
                
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="auth-form"
            >
              {/* Email */}
              <div className="auth-field">
                <label htmlFor="email">
                  ingresa tu correo 
                </label>

                <div className="auth-input">
                  <Mail size={18} />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="auth-field">
                <div className="auth-label-row">
                  <label htmlFor="password">
                    Contraseña
                  </label>

                  <Link
                    to="/forgot-password"
                    className="auth-forgot"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                <div className="auth-input">
                  <LockKeyhole size={18} />

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Introduce tu contraseña"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() =>
                      setShowPassword(
                        (current) => !current
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Ocultar contraseña"
                        : "Mostrar contraseña"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="auth-error">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="auth-spinner" />
                    Iniciando sesión...
                  </>
                ) : (
                  <>
                    Iniciar sesión
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Register */}
            <div className="auth-register">
              <span>
                ¿Aún no tienes una cuenta?
              </span>

              <Link to="/register">
                Crear cuenta
              </Link>
            </div>

            {/* Security */}
            <div className="auth-security">
              <span className="security-dot" />

              <span>
                Tus datos están protegidos y
                cifrados de forma segura.
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;