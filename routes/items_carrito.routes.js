const { Router } = require("express");
const { getItemsByCart, getItemById, addItem, updateItem, removeItem } = require("../controllers/items_carrito.controller");
const validarToken = require("../middlewares/validarToken");

const router = Router({ mergeParams: true });


/**
 * GET /api/carrito/:id_carrito/items
 */
router.get("/", validarToken, getItemsByCart);

/**
 * GET /api/carrito/:id_carrito/items/:id
 */
router.get("/:id", validarToken, getItemById);

/**
 * POST /api/carrito/:id_carrito/items
 */
router.post("/", validarToken, addItem);

/**
 * PUT /api/carrito/:id_carrito/items/:id
 */
router.put("/:id", validarToken, updateItem);

/**
 * DELETE /api/carrito/:id_carrito/items/:id
 */
router.delete("/:id", validarToken, removeItem);


module.exports = router;