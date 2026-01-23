const { Router } = require("express");
const { login, register } = require("../controllers/usuarios.controller");
const validarCredenciales = require("../middlewares/validarCredenciales");

const router = Router();


/**
 * POST /api/auth/login
 */
router.post("/login", validarCredenciales, login);

/**
 * POST /api/auth/register
 */
router.post("/register", register);


module.exports = router;