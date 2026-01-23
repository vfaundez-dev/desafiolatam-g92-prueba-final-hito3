const { Router } = require("express");
const { getCarts, getCartById, getCartByUser, createCart, deleteCart } = require("../controllers/carrito.controller");
const validarToken = require("../middlewares/validarToken");

const router = Router();


/**
 * GET /api/carrito
 */
router.get("/", validarToken, getCarts);

/**
 * GET /api/carrito/:id
 */
router.get("/:id", validarToken, getCartById);

/**
 * GET /api/carrito/usuario/:id_usuario
 */
router.get("/usuario/:id_usuario", validarToken, getCartByUser);

/**
 * POST /api/carrito
 */
router.post("/", validarToken, createCart);

/**
 * DELETE /api/carrito/:id
 */
router.delete("/:id", validarToken, deleteCart);


module.exports = router;