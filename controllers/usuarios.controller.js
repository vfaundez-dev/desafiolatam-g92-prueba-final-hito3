const { getAll, getById, getByEmail, create, update, disable, auth } = require("../models/usuarios.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();


/*-- AUTH --*/

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email y password son obligatorios"
      });
    }

    const user = await auth(email, password);
    if (!user) {
      return res.status(401).json({
        message: "Credenciales inválidas"
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({
      message: "Error realizando login",
      error: error.message
    });
  }
};

const register = async (req, res) => {
  try {

    const {nombre, email, password, direccion, ciudad, comuna} = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        message: "Nombre, email y password son obligatorios"
      });
    }

    const exists = await getByEmail(email);
    if (exists) {
      return res.status(400).json({
        message: "El email ya está registrado"
      });
    }

    const newUser = await create({
      nombre,
      email,
      password,
      direccion,
      ciudad,
      comuna
    });

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: newUser
    });

  } catch (error) {
    res.status(500).json({
      message: "Error registrando usuario",
      error: error.message
    });
  }
};


/*-- USUARIOS --*/

const getUsers = async (req, res) => {
  try {

    const users = await getAll();
    res.json(users);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener usuarios"
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await getById(id);
    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado"
      });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener usuario"
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updated = await update(id, data);
    if (!updated) {
      return res.status(404).json({
        message: "Usuario no encontrado"
      });
    }

    res.json({
      message: "Usuario actualizado correctamente",
      user: updated
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar usuario"
    });
  }
};

const disableUser = async (req, res) => {
  try {
    const { id } = req.params;

    const disabled = await disable(id);
    if (!disabled) {
      return res.status(404).json({
        message: "Usuario no encontrado"
      });
    }

    res.json({
      message: "Usuario deshabilitado correctamente",
      user: disabled
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al deshabilitar usuario"
    });
  }
};


module.exports = {
  login,
  register,
  getUsers,
  getUserById,
  updateUser,
  disableUser
};