const jwt = require('jsonwebtoken');
const middlewares = {};

middlewares.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      if(!token){
        return res.status(403).json({ error: 'No hay token de usuario' });
      }
      jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ error: 'Token inválido' });
        } else {
          req.user = user;
          next();
        }
      });
    } else {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }
};

middlewares.notFound = (req, res, next) => res.status(404).json({error: "Ruta inválida"});

module.exports = middlewares;