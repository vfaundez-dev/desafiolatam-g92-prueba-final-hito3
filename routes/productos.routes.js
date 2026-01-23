const { Router } = require("express");
const {
  getProducts, getProductById, createProduct, updateProduct, disableProduct, updateStock
} = require("../controllers/productos.controller");
const validarToken = require("../middlewares/validarToken");

const router = Router();


/**
 * GET /api/productos
 */
router.get("/", getProducts);

/**
 * GET /api/productos/:id
 */
router.get("/:id", getProductById);

/**
 * POST /api/productos
 */
router.post("/", validarToken, createProduct);

/**
 * PUT /api/productos/:id
 */
router.put("/:id", validarToken, updateProduct);

/**
 * PUT /api/productos/:id/stock
 */
router.put("/:id/stock", validarToken, updateStock);

/**
 * DELETE /api/productos/:id
 */
router.delete("/:id", validarToken, disableProduct);


module.exports = router;