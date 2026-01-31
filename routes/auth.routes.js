const { Router } = require("express");
const { login, register, me } = require("../controllers/usuarios.controller");
const validarCredenciales = require("../middlewares/validarCredenciales");
const validarToken = require("../middlewares/validarToken");

const router = Router();


/**
 * POST /api/auth/login
 */
router.post("/login", validarCredenciales, login);

/**
 * POST /api/auth/register
 */
router.post("/register", register);


/**
 * POST /api/auth/me
 */
router.get("/me", validarToken, me);


module.exports = router;