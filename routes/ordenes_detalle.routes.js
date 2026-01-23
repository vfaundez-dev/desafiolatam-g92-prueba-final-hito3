const { Router } = require("express");
const {
  getDetailsByOrder, getDetailById, addDetail, updateDetail, removeDetail
} = require("../controllers/ordenes_detalle.controller");
const validarToken = require("../middlewares/validarToken");

const router = Router({ mergeParams: true });


/**
 * GET /api/ordenes/:id_orden/detalle
 */
router.get("/", validarToken, getDetailsByOrder);

/**
 * GET /api/ordenes/:id_orden/detalle/:id
 */
router.get("/:id", validarToken, getDetailById);

/**
 * POST /api/ordenes/:id_orden/detalle
 */
router.post("/", validarToken, addDetail);

/**
 * PUT /api/ordenes/:id_orden/detalle/:id
 */
router.put("/:id", validarToken, updateDetail);

/**
 * DELETE /api/ordenes/:id_orden/detalle/:id
 */
router.delete("/:id", validarToken, removeDetail);


module.exports = router;