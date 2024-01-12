const sql = require("mssql");
const config = require("./config");
const connect = {};

connect.conn = async () => {
    return await sql.connect(config);
};

connect.pool = async () => {
    try {
      await connection.connect(); // Conéctate a la base de datos
      const transaction = new sql.Transaction(connection); // Crea una instancia de transacción
      await transaction.begin(); // Inicia la transacción
      return { connection, transaction };
    } catch (error) {
      console.log(error.message);
      return { success: false, message: error.message };
    }
  };
module.exports = connect;