const { Router } = require("express");
const { getUsers, getUserById, updateUser, disableUser } = require("../controllers/usuarios.controller");
const validarToken = require("../middlewares/validarToken");

const router = Router();


/**
 * GET /api/usuarios
 */
router.get("/", validarToken, getUsers);

/**
 * GET /api/usuarios/:id
 */
router.get("/:id", validarToken, getUserById);

/**
 * PUT /api/usuarios/:id
 */
router.put("/:id", validarToken, updateUser);

/**
 * DELETE /api/usuarios/:id
 */
router.delete("/:id", validarToken, disableUser);


module.exports = router;