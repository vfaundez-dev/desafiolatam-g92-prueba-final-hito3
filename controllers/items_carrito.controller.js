const { getAll, getById, getByCartId, create, update, remove } = require("../models/items_carrito.model");

const getItems = async (req, res) => {
  try {

    const items = await getAll();
    res.json(items);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener items del carrito"
    });
  }
};

const getItemById = async (req, res) => {
  try {

    const { id } = req.params;

    const item = await getById(id);
    if (!item) {
      return res.status(404).json({
        message: "Item no encontrado"
      });
    }

    res.json(item);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener item del carrito"
    });
  }
};

const getItemsByCart = async (req, res) => {
  try {

    const { id_carrito } = req.params;

    const items = await getByCartId(id_carrito);
    res.json(items);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener items del carrito"
    });
  }
};

const createItem = async (req, res) => {
  try {

    const { id_carrito, id_producto, cantidad } = req.body;

    if (!id_carrito || !id_producto || cantidad == null) {
      return res.status(400).json({
        message: "id_carrito, id_producto y cantidad son obligatorios"
      });
    }

    const newItem = await create({
      id_carrito,
      id_producto,
      cantidad
    });

    res.status(201).json({
      message: "Item agregado al carrito",
      item: newItem
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al agregar item al carrito"
    });
  }
};

const updateItem = async (req, res) => {
  try {

    const { id } = req.params;
    const data = req.body;

    const updated = await update(id, data);
    if (!updated) {
      return res.status(404).json({
        message: "Item no encontrado"
      });
    }

    res.json({
      message: "Item actualizado correctamente",
      item: updated
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar item"
    });
  }
};

const removeItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await remove(id);
    if (!deleted) {
      return res.status(404).json({
        message: "Item no encontrado"
      });
    }

    res.json({
      message: "Item eliminado del carrito",
      item: deleted
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar item"
    });
  }
};


module.exports = {
  getItems,
  getItemById,
  getItemsByCart,
  createItem,
  updateItem,
  removeItem
};
