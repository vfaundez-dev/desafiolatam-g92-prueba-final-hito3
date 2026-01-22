const { getAll, getById, create, update, disable, updateStock } = require("../models/productos.model");

const getProducts = async (req, res) => {
  try {

    const products = await getAll();
    res.json(products);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener productos"
    });
  }
};

const getProductById = async (req, res) => {
  try {

    const { id } = req.params;

    const product = await getById(id);
    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado"
      });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener producto"
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, precio, stock, imagen_url, categoria } = req.body;

    if (!name || precio == null || stock == null || !imagen_url) {
      return res.status(400).json({
        message: "Faltan datos obligatorios"
      });
    }

    const newProduct = await create({
      name,
      description,
      precio,
      stock,
      imagen_url,
      categoria
    });

    res.status(201).json({
      message: "Producto creado correctamente",
      product: newProduct
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al crear producto"
    });
  }
};

const updateProduct = async (req, res) => {
  try {

    const { id } = req.params;
    const data = req.body;

    const updated = await update(id, data);
    if (!updated) {
      return res.status(404).json({
        message: "Producto no encontrado"
      });
    }

    res.json({
      message: "Producto actualizado correctamente",
      product: updated
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar producto"
    });
  }
};

const disableProduct = async (req, res) => {
  try {

    const { id } = req.params;

    const disabled = await disable(id);
    if (!disabled) {
      return res.status(404).json({
        message: "Producto no encontrado"
      });
    }

    res.json({
      message: "Producto deshabilitado correctamente",
      product: disabled
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al deshabilitar producto"
    });
  }
};

const updateProductStock = async (req, res) => {
  try {

    const { id } = req.params;
    const { cantidad } = req.body;

    if (cantidad == null) {
      return res.status(400).json({
        message: "Cantidad es obligatoria"
      });
    }

    const updated = await updateStock(id, cantidad);
    if (!updated) {
      return res.status(404).json({
        message: "Producto no encontrado"
      });
    }

    res.json({
      message: "Stock actualizado correctamente",
      product: updated
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar stock"
    });
  }
};


module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  disableProduct,
  updateProductStock
};
