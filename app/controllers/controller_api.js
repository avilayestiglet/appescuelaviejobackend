const controllerApi = {};
const {
  getUserLoginService,
  getProfesoresService,
  getMateriasService,
  getUserService,
  getMatriculas,
  registerService,
  getAlumnosService,
  deleteProfesorIdService,
  deleteAlumnoID,
  getTipoUsuario,
  getMatriculasService,
  createProfesorService,
  registerBitacoraService,
  getBitacoraService,
  createMatriculaService,
} = require("../services/services");
const activity = require("../utils/message.activity");
const { createProfesorRules } = require("../utils/rules");
const translate = require("../utils/translate");
const utils = require("../utils/utils");
const { generateToken } = require("../utils/utils");

controllerApi.loginApi = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({
      status: 422,
      error: "Usuario o contraseña inválido",
    });
  }

  const result = await getUserLoginService({
    user: { email: email, password: password },
  });

  if (result.success) {
    const user = result.data[0];

    if (!user) {
      return res.status(401).json({
        status: 401,
        error: "Credenciales inválidas",
      });
    }

    req.user = user;
    next();
  } else {
    return res.status(500).json({
      status: 500,
      error: translate({ x: result?.err }),
    });
  }
};

controllerApi.authApi = (req, res, next) => {
  const token = generateToken(req.user);
  if (token == null || token == undefined) {
    req.result = {
      status: 202,
      error: "Error al generar el token (token vacio o inválido)",
    };
    next();
    return;
  }
  req.result = { status: res.statusCode, token: token };
  req.activity = activity.user("GET2");
  next();
  return;
};

controllerApi.getProfesoresApi = async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 0;
  const limit = parseInt(req.query.limit, 10) || 10;

  const result = await getProfesoresService({ filters: req.body ?? {}, page, limit });
  if (result.success) {
    req.result = {
      status: res.statusCode,
      count: result.count,
      total: result.total,
      pages: result.pages,
      current: result.current,
      data: result.data,
    };
    req.activity = activity.profesores("GET");
    next();
    return;
  } else {
    req.result = {
      status: 500,
      error: translate({ x: result?.message ?? "internal server error" }),
    };
    next();
    return;
  }
};

controllerApi.createProfesorApi = async (req, res, next) => {
  const user = req.body;
  const errors = utils.validateFields(user, createProfesorRules);
  if (errors.length != 0) {
    req.result = {
      status: res.statusCode,
      error: "Error al crear profesor",
      cause: errors,
    };
    next();
    return;
  }
  const result = await createProfesorService({ user });
  if (result.success) {
    if (result.error) {
      req.result = {
        status: res.statusCode,
        error: result.error ?? "Error al crear profesor",
        cause: errors,
      };
      req.activity = activity.profesores("INSERT");
      next();
      return;
    }
    req.result = { status: res.statusCode, data: result.data };
    req.activity = activity.profesores("INSERT");
    next();
    return;
  } else {
    req.result = {
      status: res.statusCode,
      error: translate({
        x:
          result?.message ?? "internal server error" ?? "internal server error",
      }),
    };
    next();
    return;
  }
};

controllerApi.deleteProfesorApi = async (req, res, next) => {
  const id = req?.query?.id;
  if (id == null || id == undefined) {
    req.result = { status: 422, error: "id_not_found" };
    next();
    return;
  }
  const result = await deleteProfesorIdService({ id });
  if (result.success) {
    req.result = { status: res.statusCode, data: result.data };
    req.activity = activity.profesores("DELETE");
    next();
    return;
  } else {
    req.result = {
      status: 500,
      error: translate({ x: result?.message ?? "internal server error" }),
    };
    next();
    return;
  }
};

controllerApi.getAlumnosApi = async (req, res, next) => {
  const result = await getAlumnosService({ filters: req.query });
  if (result.success) {
    req.result = { status: res.statusCode, data: result.data };
    req.activity = activity.alumnos("GET");
    next();
    return;
  } else {
    req.result = {
      status: 500,
      error: translate({ x: result?.message ?? "internal server error" }),
    };
    next();
    return;
  }
};

controllerApi.getMatriculasApi = async (req, res, next) => {
  const result = await getMatriculasService({ filters: req.query });
  if (result.success) {
    req.result = { status: res.statusCode, data: result.data };
    req.activity = activity.matriculas("GET");
    next();
    return;
  } else {
    req.result = {
      status: 500,
      error: translate({ x: result?.message ?? "internal server error" }),
    };
    next();
    return;
  }
};
controllerApi.createMatriculasApi = async (req, res, next) => {
  console.log(req.body);
  let matricula = req.body.matricula;

  if (matricula == null || matricula == undefined || matricula == "") {
    req.result = { status: 422, error: "matricula_not_found" };
    next();
    return;
  }

  const result = await createMatriculaService(matricula);
  if (result.success) {
    req.result = { status: res.statusCode, data: result.data };
    req.activity = activity.matriculas("INSERT");
    next();
    return;
  } else {
    req.result = {
      status: 500,
      error: translate({ x: result?.message ?? "internal server error" }),
    };
    next();
    return;
  }
};
controllerApi.deleteAlumno = async (req, res, next) => {
  const id = req.query.id;
  if (id == null && id == undefined) {
    req.result = { status: 422, error: "id_not_found" };
    req.activity = activity.alumnos("DELETE");
    next();
    return;
  }
  const result = await deleteProfesorIdService({ id: req.params.id });
  if (result.success) {
    req.result = { status: res.statusCode, data: result.data };
    next();
    return;
  } else {
    req.result = {
      status: 500,
      error: translate({ x: result?.message ?? "internal server error" }),
    };
    next();
    return;
  }
};

controllerApi.getMateriasApi = async (req, res, next) => {
  const result = await getMateriasService();
  if (result.success) {
    req.result = { status: res.statusCode, data: result.data };
    req.activity = activity.materias("GET");

    next();
    return;
  } else {
    req.result = {
      status: 500,
      error: translate({ x: result?.message ?? "internal server error" }),
    };
    next();
    return;
  }
};

controllerApi.getUserApi = async (req, res, next) => {
  const result = await getUserLoginService({ user: req.user });
  if (result.success) {
    req.result = { status: res.statusCode, data: result.data[0] };
    req.activity = activity.user("GET");
    next();
    return;
  } else {
    req.result = {
      status: 500,
      error: translate({ x: result?.message ?? "internal server error" }),
    };
    next();
    return;
  }
};

controllerApi.registerApi = async (req, res, next) => {
  console.log(req.body);
  const user = req.body;
  const result = await getTipoUsuario({ user: user });
  if (result.success) {
    const tipo_usuario = result.data[0];
    console.log(tipo_usuario);
    if (!tipo_usuario) {
      req.result = {
        status: res.statusCode,
        error: "El tipo de usuario no existe",
      };
      next();
      return;
    }
    if (tipo_usuario.tipo == null || tipo_usuario.tipo == undefined) {
      req.result = {
        status: res.statusCode,
        error: "El tipo de usuario no existe",
      };
      next();
      return;
    }
    const id_tipo = tipo_usuario.id_tipo;
    const { email, password } = user;

    if (!email || !password) {
      const cause = [];
      email == null || email == undefined ? cause.push("email_is_empty") : "";
      password == null || password == undefined
        ? cause.push("clave_is_empty")
        : "";

      req.result = {
        status: res.statusCode,
        error: "usuario inválido",
        cause: cause,
      };
      next();
      return;
    }
    const resultRegister = await registerService({
      user: { email, password, id_tipo },
    });
    if (resultRegister.success) {
      req.result = {
        status: res.statusCode,
        message: "Usuario registrado con éxito",
      };
      req.activity = activity.user("INSERT");
      next();
      return;
    } else {
      req.result = {
        status: 500,
        error: result.message,
      };
      next();
      return;
    }
  } else {
    req.result = {
      status: 500,
      error: result.message,
    };
    next();
    return;
  }
};

controllerApi.createBitacoraApi = async (req, res) => {
  const resultBitacora = await registerBitacoraService({
    user: req.user,
    activity: req.activity ?? req.result?.error,
  });
  return res.status(req.result.status).json(req.result);
};

controllerApi.getBitacoraApi = async (req, res, next) => {
  console.log(req.query);
  // Obtener los parámetros de paginación de la query string y proporcionar valores por defecto
  const page = parseInt(req.query.page, 10) || 0;
  const limit = parseInt(req.query.limit, 10) || 10;

  try {
    // Pasar los parámetros de paginación a getBitacoraService
    const result = await getBitacoraService(page, limit);
    if (result.success) {
      req.result = {
        status: res.statusCode,
        count: result.count,
        total: result.total,
        pages: result.pages,
        current: result.current,
        data: result.data,
      };
      req.activity = activity.bitacora("GET"); // Asegúrate de que esta función esté definida y sea relevante para la lógica de tu aplicación.
      next();
    } else {
      req.result = {
        status: 500,
        error: translate({ x: result.message ?? "internal server error" }),
      };
      next();
    }
  } catch (error) {
    req.result = {
      status: 500,
      error: translate({ x: error.message ?? "internal server error" }),
    };
    next();
  }
};

module.exports = controllerApi;
