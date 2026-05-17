// src/utils/validators.js
// Centralize todas as regras de validação por regex aqui.

export const REGEX = {
  // Email no padrão RFC 5322 simplificado (suficiente para uso real)
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // Nome completo: aceita acentos, hífen e apóstrofo. Exige nome + sobrenome.
  fullName: /^[A-Za-zÀ-ÖØ-öø-ÿ'\-]+(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ'\-]+)+$/,

  // Regras individuais da senha — usadas para feedback granular ao usuário.
  pwd: {
    length:  /.{8,}/,
    upper:   /[A-Z]/,
    lower:   /[a-z]/,
    digit:   /\d/,
    special: /[!@#$%^&*(),.?":{}|<>_\-+=\/\\\[\]~`;']/,
  },
};

export const validateEmail = (v = "") => REGEX.email.test(v.trim());
export const validateFullName = (v = "") => REGEX.fullName.test(v.trim());

export const passwordChecks = (v = "") => ({
  length:  REGEX.pwd.length.test(v),
  upper:   REGEX.pwd.upper.test(v),
  lower:   REGEX.pwd.lower.test(v),
  digit:   REGEX.pwd.digit.test(v),
  special: REGEX.pwd.special.test(v),
});

// 0..5 → quantas regras a senha cumpre
export const passwordStrength = (v = "") =>
  Object.values(passwordChecks(v)).filter(Boolean).length;
