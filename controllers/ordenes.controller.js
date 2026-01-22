const { getAll, getById, getByUserId, create, update, remove } = require("../models/ordenes.model");

const getOrders = async (req, res) => {
  try {

    const orders = await getAll();
    res.json(orders);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener órdenes"
    });
  }
};

const getOrderById = async (req, res) => {
  try {

    const { id } = req.params;

    const order = await getById(id);
    if (!order) {
      return res.status(404).json({
        message: "Orden no encontrada"
      });
    }

    res.json(order);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener orden"
    });
  }
};

const getOrdersByUser = async (req, res) => {
  try {

    const { id_usuario } = req.params;

    const orders = await getByUserId(id_usuario);
    res.json(orders);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener órdenes del usuario"
    });
  }
};

const createOrder = async (req, res) => {
  try {

    const { id_usuario, total_pagar, status } = req.body;

    if (!id_usuario || total_pagar == null || !status) {
      return res.status(400).json({
        message: "id_usuario, total_pagar y status son obligatorios"
      });
    }

    const newOrder = await create({
      id_usuario,
      total_pagar,
      status
    });

    res.status(201).json({
      message: "Orden creada correctamente",
      order: newOrder
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al crear orden"
    });
  }
};

const updateOrder = async (req, res) => {
  try {

    const { id } = req.params;
    const data = req.body;

    const updated = await update(id, data);
    if (!updated) {
      return res.status(404).json({
        message: "Orden no encontrada"
      });
    }

    res.json({
      message: "Orden actualizada correctamente",
      order: updated
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar orden"
    });
  }
};

const removeOrder = async (req, res) => {
  try {

    const { id } = req.params;

    const deleted = await remove(id);
    if (!deleted) {
      return res.status(404).json({
        message: "Orden no encontrada"
      });
    }

    res.json({
      message: "Orden eliminada correctamente",
      order: deleted
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar orden"
    });
  }
};


module.exports = {
  getOrders,
  getOrderById,
  getOrdersByUser,
  createOrder,
  updateOrder,
  removeOrder
};
