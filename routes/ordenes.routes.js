const { Router } = require("express");
const {
  getOrders, getOrderById, getOrdersByUser, createOrder, updateOrder, removeOrder
} = require("../controllers/ordenes.controller");
const validarToken = require("../middlewares/validarToken");

const router = Router();


/**
 * GET /api/ordenes
 */
router.get("/", validarToken, getOrders);

/**
 * GET /api/ordenes/:id
 */
router.get("/:id", validarToken, getOrderById);

/**
 * GET /api/ordenes/usuario/:id_usuario
 */
router.get("/usuario/:id_usuario", validarToken, getOrdersByUser);

/**
 * POST /api/ordenes
 */
router.post("/", validarToken, createOrder);

/**
 * PUT /api/ordenes/:id
 */
router.put("/:id", validarToken, updateOrder);

/**
 * DELETE /api/ordenes/:id
 */
router.delete("/:id", validarToken, removeOrder);


module.exports = router;