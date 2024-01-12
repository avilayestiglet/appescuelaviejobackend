const apiService  = {};
const sql = require("mssql");
const config = require("../config/config");

const { conn, pool } = require('../config/conn');
const { 
  userLoginQuery, 
  userMatriculaQuery, 
  profesoresAllQuery, 
  profesoresIdQuery, 
  materiasAllQuery, 
  materiasIdQuery, 
  matriculasQuery,
  registerQuery,
  alumnoAllQuery,
  alumnoIdQuery,
  profesorDeletequery,
  tipoUsuarioQuery,
  profesorCreatequery,
  userQueryEmail,
  registerBitacoraQuery,
  getBitacoraQuery,
  createMatriculaQuery} = require('../querys/querys')

apiService.getUserLoginService = async ({ user }) => {
    try {
      console.log(`este es el usuario del frontend ${JSON.stringify(user)}`);
      const connection = await conn();
      const result = await connection.request().query(userLoginQuery({user: user}));
      connection.close();
      console.log(result.recordset);
      return { success: true, data: result.recordset };
    } catch (error) {
      console.log(error.message);
      return { success: false, message: error.message };
    }
};

apiService.registerService = async ({ user }) => {
  try {
    const connection = await conn();
    const result = await connection.request().query(registerQuery({user: user}));
    console.log(result);
    connection.close();
    return { success: true, data: result.recordset };
  } catch (error) {
    console.log(error.message);
    return { success: false, message: error.message };
  }
};

apiService.registerBitacoraService = async ({ user, activity }) => {
  try {
    const connection = await conn();
    const result = await connection.request().query(registerBitacoraQuery({user: user, activity: activity}));
    console.log(result);
    connection.close();
    return { success: true, data: result.recordset };
  } catch (error) {
    console.log(error.message);
    return { success: false, message: error.message };
  }
};


apiService.createMatriculaService = async (matricula) => {
  const conn = await sql.connect(config);
  const transaction = new sql.Transaction(conn);
  try {
    await transaction.begin(); // Inicia la transacción
    const create = await conn.request().query(createMatriculaQuery(matricula));
    await transaction.commit(); // Confirma la transacción
    conn.close();
    return { success: true, data: "matricula creada éxitosamente" };
  } catch (error) {
    console.log(error.message);
    if (transaction) {
      await transaction.rollback(); // Deshace la transacción si algo falla
    }
    return { success: false, message: error.message };
  }
}

apiService.createProfesorService = async ({ user }) => {
  const conn = await sql.connect(config);
  const transaction = new sql.Transaction(conn);
  try {
    await transaction.begin(); // Inicia la transacción
    const getUser = await conn.request().query(userQueryEmail({ user }));
    if(getUser.recordset.length!=0){
      if(transaction){
        await transaction.rollback(); 
      }
      return { success: true, error: 'Este correo ya éxiste' };
    }
    user.id_tipo = 2;
    const register = await conn.request().query(registerQuery({ user }));

    var isRegister = register?.rowsAffected[0] != 0 ? true : false;
    if(!isRegister){
      if(transaction){
        await transaction.rollback(); 
      }
      return { success: true, error: 'No se pudo registrar el usuario' };
    }
    const getUser2 = await conn.request().query(userQueryEmail({ user }));
    const resultUser = getUser2?.recordset[0];
    if(!resultUser){
      if(transaction){
        await transaction.rollback(); 
      }
      return { success: true, error: 'El usuario no éxiste o no se logró registrar correctamente' };
    }
    
    user.id_usuario = resultUser.id_usuario;
    const registerProfesor = await conn.request().query(profesorCreatequery({ profesor: user }));

    var isRegisterProfesor = registerProfesor?.rowsAffected[0] != 0 ? true : false;
    if(!isRegisterProfesor){
      if(transaction){
        await transaction.rollback(); 
      }
      return { success: true, error: 'No se pudo registrar el profesor' };
    }
    const profesor = await apiService.getProfesoresService({ filters: {email: user.email}});
    
    await transaction.commit(); // Confirma la transacción
    return { success: true, data: profesor.data[0] };
  } catch (error) {
    console.log(error.message);
    if (transaction) {
      await transaction.rollback(); // Deshace la transacción si algo falla
    }
    return { success: false, message: error.message };
  } finally {
    await conn.close(); // Cierra la conexión en todas las situaciones
  }
};

apiService.getMatriculasService = async ({ filters }) => {
  try {
    let sqlQuery = matriculasQuery();
    let values = {};

    if (filters && typeof filters === "object" && Object.keys(filters).length > 0) {
      let whereClause = "";
      let i = 0;
      for (const [key, value] of Object.entries(filters)) {
        if (typeof value === "string" && value.trim() !== "") {
          if (i === 0) {
            whereClause += ` WHERE ${key} LIKE '${value}%'`;
          } else {
            whereClause += ` AND ${key} LIKE '${value}%'`;
          }
          values[key] = `%${value}%`;
          i++;
        }
      }
      sqlQuery += whereClause;
    }
    const connection = await conn();
    const result = await connection.request().query(sqlQuery);
    connection.close();
    return {success: true, data: result.recordset };
  } catch (error) {
    console.log(error.message);
    return{ success: false, message: error.message };
  }
};

apiService.getTipoUsuario = async ({ user }) => {
  try {
    const connection = await conn();
    const result = await connection.request().query(tipoUsuarioQuery({user: user}));
    connection.close();
    return { success: true, data: result.recordset };
  } catch (error) {
    console.log(error.message);
    return { success: false, message: error.message };
  }
};


apiService.getUserService = async ({ user }) => {
    try {
      const connection = await conn();
      const result = await connection.request().query(userMatriculaQuery({user: user}));
      connection.close();
      return { success: true, data: result.recordset };
    } catch (error) {
      console.log(error.message);
      return { success: false, message: error.message };
    }
};


apiService.getProfesoresService = async ({ filters }) => {
  try {
    let sqlQuery = profesoresAllQuery();
    let values = {};

    if (filters && typeof filters === "object" && Object.keys(filters).length > 0) {
      let whereClause = "";
      let i = 0;
      for (const [key, value] of Object.entries(filters)) {
        if (typeof value === "string" && value.trim() !== "") {
          if (i === 0) {
            whereClause += ` WHERE ${key} LIKE '${value}%'`;
          } else {
            whereClause += ` AND ${key} LIKE '${value}%'`;
          }
          values[key] = `%${value}%`;
          i++;
        }
      }
      sqlQuery += whereClause;
    }
    console.log(sqlQuery);
    const connection = await conn();
    const result = await connection.request().query(sqlQuery);
    connection.close();
    return {success: true, data: result.recordset };
  } catch (error) {
    console.log(error.message);
    return{ success: false, message: error.message };
  }
};

apiService.getProfesoresIdService = async ({ id }) => {
  try {
    const connection = await conn();
    const result = await connection.request().query(profesoresIdQuery({ id }));
    connection.close();
    return {success: true, data: result.recordset };
  } catch (error) {
    console.log(error.message);
    return{ success: false, message: error.message };
  }
};

apiService.deleteProfesorIdService = async ({ id }) => {
  try {
    const connection = await conn();
    const result = await connection.request().query(profesorDeletequery({ id }));
    connection.close();
    return {success: true, data: result.recordset };
  } catch (error) {
    console.log(error.message);
    return{ success: false, message: error.message };
  }
};

apiService.getMateriasService = async () => {
  try {
    const connection = await conn();
    const result = await connection.request().query(materiasAllQuery());
    connection.close();
    return { success: true, data: result.recordset };
  } catch (error) {
    console.log(error.message);
    return{ success: false, message: error.message };
  }
};

apiService.getMateriasIdService = async ({ id }) => {
  try {
    const connection = await conn();
    const result = await connection.request().query(materiasIdQuery({ id }));
    connection.close();
    return { success: true, data: result.recordset };
  } catch (error) {
    console.log(error.message);
    return{ success: false, message: error.message };
  }
};

apiService.getAlumnosService = async ({ filters }) => {
  try {
    let sqlQuery = alumnoAllQuery();
    let values = {};

    if (filters && typeof filters === "object" && Object.keys(filters).length > 0) {
      let whereClause = "";
      let i = 0;
      for (const [key, value] of Object.entries(filters)) {
        if (typeof value === "string" && value.trim() !== "") {
          if (i === 0) {
            whereClause += ` WHERE \'${key}\' LIKE '${value}%'`;
          } else {
            whereClause += ` AND ${key} LIKE '${value}%'`;
          }
          values[key] = `%${value}%`;
          i++;
        }
      }
      sqlQuery += whereClause;
    }

    const connection = await conn();
    const request = connection.request();
    
    const result = await request.query(sqlQuery);
    connection.close();

    console.log(result);

    return { success: true, data: result.recordset };
  } catch (error) {
    console.log(error.message);
    return { success: false, message: error.message };
  }
};

apiService.getAlumnosServiceID = async ({ id }) => {
  try {
    const connection = await conn();
    const result = await connection.request().query(alumnoIdQuery({id: id}));
    connection.close();
    return { success: true, data: result.recordset };
  } catch (error) {
    console.log(error.message);
    return{ success: false, message: error.message };
  }
};

apiService.deleteAlumnoID = async ({ id }) => {
  try {
    const connection = await conn();
    const result = await connection.request().query(alumnoDeleteQuery({id: id}));
    connection.close();
    return { success: true, data: result.recordset };
  } catch (error) {
    console.log(error.message);
    return{ success: false, message: error.message };
  }
};

apiService.getBitacoraService = async () => {
  try {
    const connection = await conn();
    const result = await connection.request().query(getBitacoraQuery());
    connection.close();
    return { success: true, data: result.recordset };
  } catch (error) {
    console.log(error.message);
    return{ success: false, message: error.message };
  }
};


module.exports = apiService;

