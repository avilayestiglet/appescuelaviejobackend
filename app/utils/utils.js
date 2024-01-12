const utils = {};
const jwt = require('jsonwebtoken');

utils.generarId = () => {
    let id = '';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 10; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      id += caracteres.charAt(indice);
    }
    return id;
};

utils.generateToken = (payload) => {
  const secret = process.env.SECRET;
  console.log(`usuario:`);
  console.log(payload);
  console.log(`secret: ${secret}`);
    return jwt.sign(payload, secret, { expiresIn: '1000h' });
}

utils.emailRegex = (email) => {
  let reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(reg.test(email)){
    return true;
  }
  return false;
};

utils.nameRegex = (name) => {
  let reg = /^[a-zA-Z ]+$/;
  if(reg.test(name)){
    return true;
  }
  return false;
};

utils.validateFields = (fields, rules) => {
  const errors = [];
  for (const field in rules) {
    if (!fields.hasOwnProperty(field)) {
      errors.push({ field, message: `El campo ${field} es requerido` });
      continue;
    }
    const value = fields[field];
    const rule = rules[field];
    if (!rule) {
      throw new Error(`No se encontró una regla de validación para el campo "${field}"`);
    } else if (!value) {
      errors.push({ field, message: rule.required });
    } else if (!rule.pattern.test(value)) {
      errors.push({ field, message: rule.invalid });
    }
  }
  return errors;
};

utils.currentDatetime = () => {
  const currentDate = new Date();
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  const mdate = currentDate.toLocaleString('en-US', options).replace(',', '').replace(/\//g, '-').replace('PM', '').replace('AM', '');
  
  return mdate;
};

utils.createWhereFilter = (filters) => {
  let sqlQuery = '';
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
  return sqlQuery;
}
    
module.exports = utils;
  