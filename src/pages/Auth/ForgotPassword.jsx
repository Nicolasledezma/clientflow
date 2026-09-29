import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Send,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) return;

    setLoading(true);

  
    await new Promise((resolve) =>
      setTimeout(resolve, 800)
    );

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="auth-page">
      <div className="auth-card auth-card-recovery">

        {/* Brand */}
        <div className="auth-brand">
          <div className="auth-logo-mark">C</div>

          <span className="auth-brand-name">
            ClientFlow
          </span>
        </div>

        {!submitted ? (
          <>
            {/* Header */}
            <div className="auth-header recovery-header">
              <span className="auth-eyebrow">
                
              </span>

              <h1>
                Recupera tu acceso
              </h1>

              <p>
                Introduce tu correo y te enviaremos
                un codigo  para restablecer tu contraseña.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="auth-form"
            >
              <div className="form-group">
                <label htmlFor="email">
                  Ingresa tu correo electronico 
                </label>

                <div className="auth-input-wrapper">
                  <Mail size={18} />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="auth-spinner" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={17} />
                    Enviar codigo
                  </>
                )}
              </button>
            </form>

            {/* Back */}
            <Link
              to="/login"
              className="auth-back-link"
            >
              <ArrowLeft size={16} />
              Volver al inicio
            </Link>
          </>
        ) : (
          /* Success */
          <div className="recovery-success">
            <div className="success-icon">
              <CheckCircle2 size={28} />
            </div>

            <span className="auth-eyebrow">
              Solicitud enviada
            </span>

            <h1>
              Revisa tu correo
            </h1>

            <p>
              Si existe una cuenta asociada a{" "}
              <strong>{email}</strong>, recibirás
              un enlace para recuperar contraseña. 
            </p>

            <Link
              to="/login"
              className="auth-submit recovery-login-link"
            >
              <ArrowLeft size={17} />
              Volver al inicio de sesión
            </Link>
          </div>
        )}

        {/* Security */}
        <div className="auth-security">
          <span className="security-dot" />
          Tus datos están protegidos y cifrados.
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;