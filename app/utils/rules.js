const rules = {};

rules.createProfesorRules  = {
    nombre_completo: {
      pattern: /^[a-zA-Z ]+$/,
      required: "El nombre completo no puede estar vacío",
      invalid: "El nombre completo no es válido",
    },
    cedula: {
      pattern: /^[VEJP]\d{4,9}$/,
      required: "La cédula no puede estar vacía",
      invalid: "La cédula no es válida",
    },
    direccion: {
      pattern: /^.{4,}$/,
      required: "La dirección no puede estar vacía",
      invalid: "La dirección no es válida",
    },
    edad: {
      pattern: /^\d+$/,
      required: "La edad no puede estar vacía",
      invalid: "La edad no es válida",
    },
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      required: "El correo no puede estar vacío",
      invalid: "El correo no es válido",
    },
    password: {
      pattern: /^.{8,}$/,
      required: "La contraseña no puede estar vacía",
      invalid: "La contraseña no es válida",
    },
  };


module.exports = rules;