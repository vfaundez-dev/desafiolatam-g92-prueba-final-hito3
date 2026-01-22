const { getAll, getById, getByUserId, create, remove } = require("../models/carrito.model");

const getCarts = async (req, res) => {
  try {

    const carts = await getAll();
    res.json(carts);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener carritos"
    });
  }
};

const getCartById = async (req, res) => {
  try {

    const { id } = req.params;

    const cart = await getById(id);
    if (!cart) {
      return res.status(404).json({
        message: "Carrito no encontrado"
      });
    }

    res.json(cart);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener carrito"
    });
  }
};

const getCartByUser = async (req, res) => {
  try {
    
    const { id_usuario } = req.params;

    const cart = await getByUserId(id_usuario);
    if (!cart) {
      return res.status(404).json({
        message: "Carrito no encontrado para el usuario"
      });
    }

    res.json(cart);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener carrito del usuario"
    });
  }
};

const createCart = async (req, res) => {
  try {

    const { id_usuario } = req.body;

    if (!id_usuario) {
      return res.status(400).json({
        message: "id_usuario es obligatorio"
      });
    }

    const newCart = await create(id_usuario);

    res.status(201).json({
      message: "Carrito creado correctamente",
      cart: newCart
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al crear carrito"
    });
  }
};

const removeCart = async (req, res) => {
  try {

    const { id } = req.params;

    const deleted = await remove(id);
    if (!deleted) {
      return res.status(404).json({
        message: "Carrito no encontrado"
      });
    }

    res.json({
      message: "Carrito eliminado correctamente",
      cart: deleted
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar carrito"
    });
  }
};


module.exports = {
  getCarts,
  getCartById,
  getCartByUser,
  createCart,
  removeCart
};
