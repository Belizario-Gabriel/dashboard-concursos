// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FiArrowRight } from "react-icons/fi";
import { supabase } from "../../../supabase"; // ajuste o caminho conforme seu projeto
import {
  validateEmail,
  validateFullName,
  passwordChecks,
  passwordStrength,
} from "../utils/validators";
import "./Auth.css";

const RULES = [
  { key: "length",  text: "8+ caracteres" },
  { key: "upper",   text: "1 letra A-Z" },
  { key: "lower",   text: "1 letra a-z" },
  { key: "digit",   text: "1 número" },
  { key: "special", text: "1 caractere especial" },
];

function Signup() {
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
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirm: "", terms: false,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const checks = passwordChecks(form.password);
  const strength = passwordStrength(form.password);

  const validate = (v = form) => {
    const e = {};
    if (!v.name) e.name = "Informe seu nome completo.";
    else if (!validateFullName(v.name)) e.name = "Digite nome e sobrenome (apenas letras).";
    if (!v.email) e.email = "Informe seu e-mail.";
    else if (!validateEmail(v.email)) e.email = "Formato de e-mail inválido.";
    if (!v.password) e.password = "Crie uma senha.";
    else if (passwordStrength(v.password) < 4) e.password = "A senha precisa cumprir pelo menos 4 das regras.";
    if (!v.confirm) e.confirm = "Confirme sua senha.";
    else if (v.confirm !== v.password) e.confirm = "As senhas não coincidem.";
    if (!v.terms) e.terms = "Aceite os termos para continuar.";
    return e;
  };

  const handleChange = (key) => (ev) => {
    const v = key === "terms" ? ev.target.checked : ev.target.value;
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
    setTouched({ name: true, email: true, password: true, confirm: true, terms: true });
    if (Object.keys(e).length) return;

    setLoading(true);
    setAlert(null);

    const { data, error } = await supabase.auth.signUp({
      email: form.email.trim(),
      password: form.password,
      options: {
        data: { full_name: form.name.trim() }, // vai para user_metadata
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    setLoading(false);

    if (error) {
      setAlert({ type: "error", msg: error.message });
      return;
    }

    setAlert({
      type: "success",
      msg: "Conta criada! Verifique seu e-mail para confirmar o cadastro.",
    });
    // se sua conta Supabase NÃO exigir confirmação por e-mail,
    // você pode redirecionar direto: navigate("/dashboard");
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
          <span className="brand-eyebrow"> comece grátis</span>
          <h1 className="brand-title">Sua jornada rumo à <em>aprovação</em> começa aqui.</h1>
          <p className="brand-sub">
            Crie sua conta para acompanhar simulados e organizar disciplinas em um só lugar.
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
            <h1>Crie sua conta</h1>
            <p>Comece de graça em menos de um minuto.</p>
          </div>

          {alert && <div className={`alert ${alert.type}`}>{alert.msg}</div>}

          <button type="button" className="btn-oauth" onClick={handleGoogleLogin}>
            <FcGoogle size={22} />
            <span>Cadastrar com Google</span>
            <FiArrowRight className="arrow" size={18} />
          </button>

          <div className="divider">
            <span className="line" />
            <span className="label">ou continue com e-mail</span>
            <span className="line" />
          </div>

          <div className="field">
            <label htmlFor="name" className="field-label">NOME COMPLETO</label>
            <div className={`input-wrap ${touched.name && errors.name ? "invalid" : ""}`}>
              <input
                id="name" type="text" autoComplete="name"
                placeholder="Gabriel Silva"
                value={form.name}
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
              />
            </div>
            {touched.name && errors.name && <div className="field-error">{errors.name}</div>}
          </div>

          <div className="field">
            <label htmlFor="email-su" className="field-label">E-MAIL</label>
            <div className={`input-wrap ${touched.email && errors.email ? "invalid" : ""}`}>
              <input
                id="email-su" type="email" autoComplete="email" inputMode="email"
                placeholder="voce@exemplo.com"
                value={form.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
              />
            </div>
            {touched.email && errors.email && <div className="field-error">{errors.email}</div>}
          </div>

          <div className="field">
            <label htmlFor="password-su" className="field-label">SENHA</label>
            <div className={`input-wrap has-toggle ${touched.password && errors.password ? "invalid" : ""}`}>
              <input
                id="password-su" type={showPwd ? "text" : "password"} autoComplete="new-password"
                placeholder="Mínimo 8 caracteres"
                value={form.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
              />
              <button type="button" className="toggle-eye" onClick={() => setShowPwd((s) => !s)}>
                {showPwd ? "ocultar" : "mostrar"}
              </button>
            </div>

            <div className="strength">
              <div className="strength-meter">
                {[1, 2, 3, 4].map((i) => (
                  <i key={i} className={form.password && strength >= i + (strength >= 4 ? 0 : 0)
                    ? `on-${Math.min(4, Math.max(1, strength - 1))}` : ""}
                  />
                ))}
              </div>
              <ul className="strength-rules">
                {RULES.map((r) => (
                  <li key={r.key} className={checks[r.key] ? "ok" : ""}>
                    <span className="dot" /> {r.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="field">
            <label htmlFor="confirm-su" className="field-label">CONFIRMAR SENHA</label>
            <div className={`input-wrap has-toggle ${touched.confirm && errors.confirm ? "invalid" : ""}`}>
              <input
                id="confirm-su" type={showPwd ? "text" : "password"} autoComplete="new-password"
                placeholder="Repita a senha"
                value={form.confirm}
                onChange={handleChange("confirm")}
                onBlur={handleBlur("confirm")}
              />
            </div>
            {touched.confirm && errors.confirm && <div className="field-error">{errors.confirm}</div>}
          </div>

          <label className="checkbox">
            <input
              type="checkbox"
              checked={form.terms}
              onChange={handleChange("terms")}
              onBlur={handleBlur("terms")}
            />
            <span className="box"></span>
            Concordo com os <Link to="/termos" className="link">Termos</Link> e a{" "}
            <Link to="/privacidade" className="link">Política de Privacidade</Link>.
          </label>
          {touched.terms && errors.terms && <div className="field-error">{errors.terms}</div>}

          <button className="btn-submit" type="submit" disabled={loading}>
            {loading ? "Criando conta…" : "Criar conta"}
          </button>

          <div className="auth-foot">
            Já tem uma conta? <Link to="/login" className="link">Entre aqui</Link>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Signup;
