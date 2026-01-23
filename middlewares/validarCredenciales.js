const validarCredenciales = (req, res, next) => {
  
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email y password son obligatorios"
    });
  }

  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({
      message: "Credenciales inválidas"
    });
  }

  next();
};

module.exports = validarCredenciales;
