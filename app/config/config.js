module.exports = {
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password:process.env.DB_PWD,
    server:process.env.SERVER,
    options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};