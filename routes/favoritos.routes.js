const { Router } = require("express");
const {
  getFavorites, getFavoriteById, getFavoritesByUser, createFavorite, removeFavorite
} = require("../controllers/favoritos.controller");
const validarToken = require("../middlewares/validarToken");

const router = Router();


/**
 * GET /api/favoritos
 */
router.get("/", validarToken, getFavorites);

/**
 * GET /api/favoritos/:id
 */
router.get("/:id", validarToken, getFavoriteById);

/**
 * GET /api/favoritos/usuario/:id_usuario
 */
router.get("/usuario/:id_usuario", validarToken, getFavoritesByUser);

/**
 * POST /api/favoritos
 */
router.post("/", validarToken, createFavorite);

/**
 * DELETE /api/favoritos/:id
 */
router.delete("/:id", validarToken, removeFavorite);


module.exports = router;