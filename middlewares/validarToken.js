const jwt = require("jsonwebtoken");

const validarToken = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization header no enviado"
    });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Formato de token inválido"
    });
  }

  const token = authHeader.split(" ")[1];

  try {

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
    
  } catch (error) {
    return res.status(401).json({
      message: "Token inválido o expirado"
    });
  }

};

module.exports = validarToken;
