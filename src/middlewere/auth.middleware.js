// middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  // El token debe enviarse en el formato "Bearer <token>"
  const token = authHeader.split(' ')[1];

  // Verificar el token
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(403).json({ error: 'Token inválido' });
    }

    // Agregar la información del token decodificado a la solicitud
    req.user = decoded;
    next();
  });
};

module.exports = authenticateJWT;
