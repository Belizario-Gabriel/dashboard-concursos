// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FiArrowRight } from "react-icons/fi";
import { supabase } from "../../../supabase"; // ajuste o caminho conforme seu projeto
import { validateEmail } from "../utils/validators";
import "./Auth.css";

function Login() {

  const handleGoogleLogin = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // Para onde o usuário vai DEPOIS que o login no Google der certo
        redirectTo: 'http://localhost:5173/dashboard', 
      },
    });
    
    if (error) throw error;
  } catch (error) {
    console.error('Erro ao tentar logar com o Google:', error.message);
    alert('Erro ao conectar com o Google. Tente novamente!');
  }
};

  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const validate = (v = form) => {
    const e = {};
    if (!v.email) e.email = "Informe seu e-mail.";
    else if (!validateEmail(v.email)) e.email = "Formato de e-mail inválido.";
    if (!v.password) e.password = "Informe sua senha.";
    return e;
  };

  const handleChange = (key) => (ev) => {
    const v = ev.target.value;
    setForm((f) => ({ ...f, [key]: v }));
    if (touched[key]) setErrors(validate({ ...form, [key]: v }));
  };

  const handleBlur = (key) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate());
  };

  async function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    setTouched({ email: true, password: true });
    if (Object.keys(e).length) return;

    setLoading(true);
    setAlert(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email.trim(),
      password: form.password,
    });

    setLoading(false);

    if (error) {
      setAlert({ type: "error", msg: error.message || "E-mail ou senha incorretos." });
      return;
    }

    // session em data.session – Supabase já persiste por padrão
    navigate("/dashboard");
  }

  async function handleGoogle() {
    setAlert(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
    if (error) setAlert({ type: "error", msg: error.message });
  }

  return (
    <div className="auth-shell">
      <aside className="brand-panel">
        <div className="brand-grid-bg" />
        <div className="brand-glow" />
        <div className="brand-glow b" />

        <div className="brand-header">
          <div className="brand-logo-mark"><span>C</span></div>
          <div className="brand-name">Concurso<em>Dash</em></div>
        </div>

        <div className="brand-hero">
          <span className="brand-eyebrow"> painel de estudos</span>
          <h1 className="brand-title">Domine seu próximo <em>concurso</em>.</h1>
          <p className="brand-sub">
            Acompanhe simulados, identifique pontos fracos e estude com base em dados reais.
          </p>

          <div className="brand-preview">
            <div className="preview-card">
              <div className="pc-label">Média geral</div>
              <div className="pc-value">82<span style={{ fontSize: 14, color: "#94a3b8" }}>%</span></div>
              <div className="pc-meta">↑ 7 pts esta semana</div>
            </div>
            <div className="preview-card">
              <div className="pc-label">Simulados</div>
              <div className="pc-value">24</div>
              <div className="pc-meta">3 esta semana</div>
            </div>
            <div className="preview-card preview-card-wide">
              <div className="pc-label">Direito Const.</div>
              <div className="preview-bar"><i style={{ width: "98%" }} /></div>
              <div className="pc-label pc-label-spaced">Matemática</div>
              <div className="preview-bar warn"><i style={{ width: "65%" }} /></div>
            </div>
          </div>
        </div>

        <div className="brand-footer">
          <span><b>+12k</b> questões</span>
          <span><b>30+</b> disciplinas</span>
          <span><b>v2.4</b></span>
        </div>
      </aside>

      <section className="form-panel">
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-heading">
            <h1>Bem-vindo de volta</h1>
            <p>Entre para continuar acompanhando seu desempenho.</p>
          </div>

          {alert && <div className={`alert ${alert.type}`}>{alert.msg}</div>}

          <button type="button" className="btn-oauth" onClick={handleGoogleLogin}>
            <FcGoogle size={22} />
            <span>Continuar com Google</span>
            <FiArrowRight className="arrow" size={18} />
          </button>

          <div className="divider">
            <span className="line" />
            <span className="label">ou continue com e-mail</span>
            <span className="line" />
          </div>

          <div className="field">
            <label htmlFor="email" className="field-label">E-MAIL</label>
            <div className={`input-wrap ${touched.email && errors.email ? "invalid" : ""}`}>
              <input
                id="email" type="email" autoComplete="email" inputMode="email"
                placeholder="voce@exemplo.com"
                value={form.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
              />
            </div>
            {touched.email && errors.email && <div className="field-error">{errors.email}</div>}
          </div>

          <div className="field">
            <label htmlFor="password" className="field-label">SENHA</label>
            <div className={`input-wrap has-toggle ${touched.password && errors.password ? "invalid" : ""}`}>
              <input
                id="password" type={showPwd ? "text" : "password"} autoComplete="current-password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
              />
              <button type="button" className="toggle-eye" onClick={() => setShowPwd((s) => !s)}>
                {showPwd ? "ocultar" : "mostrar"}
              </button>
            </div>
            {touched.password && errors.password && <div className="field-error">{errors.password}</div>}
          </div>

          <div className="row-between">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={(e) => setForm((f) => ({ ...f, remember: e.target.checked }))}
              />
              <span className="box"></span>
              Lembrar de mim
            </label>
            <Link to="/recuperar-senha" className="link">Esqueci minha senha</Link>
          </div>

          <button className="btn-submit" type="submit" disabled={loading}>
            {loading ? "Entrando…" : "Entrar"}
          </button>

          <div className="auth-foot">
            Ainda não tem conta? <Link to="/cadastro" className="link">Cadastre-se grátis</Link>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;
