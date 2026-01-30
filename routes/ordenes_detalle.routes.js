const { Router } = require("express");
const {
  getOrderDetails,       
  getOrderDetailById,    
  getOrderDetailsByOrder,
  createOrderDetail,     
  updateOrderDetail,     
  removeOrderDetail
} = require("../controllers/ordenes_detalle.controller");
const validarToken = require("../middlewares/validarToken");

const router = Router({ mergeParams: true });


/**
 * GET /api/ordenes/:id_orden/detalle
 */
router.get("/", validarToken, getOrderDetailsByOrder);

/**
 * GET /api/ordenes/:id_orden/detalle/:id
 */
router.get("/:id", validarToken, getOrderDetailById);

/**
 * POST /api/ordenes/:id_orden/detalle
 */
router.post("/", validarToken, createOrderDetail);

/**
 * PUT /api/ordenes/:id_orden/detalle/:id
 */
router.put("/:id", validarToken, updateOrderDetail);

/**
 * DELETE /api/ordenes/:id_orden/detalle/:id
 */
router.delete("/:id", validarToken, removeOrderDetail);


module.exports = router;