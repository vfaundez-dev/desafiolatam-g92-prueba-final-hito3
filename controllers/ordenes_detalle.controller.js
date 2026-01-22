const { getAll, getById, getByOrderId, create, update, remove } = require("../models/ordenes_detalle.model");

const getOrderDetails = async (req, res) => {
  try {

    const details = await getAll();
    res.json(details);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener detalles de órdenes"
    });
  }
};

const getOrderDetailById = async (req, res) => {
  try {

    const { id } = req.params;

    const detail = await getById(id);
    if (!detail) {
      return res.status(404).json({
        message: "Detalle de orden no encontrado"
      });
    }

    res.json(detail);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener detalle de orden"
    });
  }
};

const getOrderDetailsByOrder = async (req, res) => {
  try {

    const { id_orden } = req.params;

    const details = await getByOrderId(id_orden);
    res.json(details);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener detalles de la orden"
    });
  }
};

const createOrderDetail = async (req, res) => {
  try {

    const { id_orden, id_producto, cantidad } = req.body;

    if (!id_orden || !id_producto || cantidad == null) {
      return res.status(400).json({
        message: "id_orden, id_producto y cantidad son obligatorios"
      });
    }

    const newDetail = await create({
      id_orden,
      id_producto,
      cantidad
    });

    res.status(201).json({
      message: "Detalle de orden creado correctamente",
      detail: newDetail
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al crear detalle de orden"
    });
  }
};

const updateOrderDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updated = await update(id, data);
    if (!updated) {
      return res.status(404).json({
        message: "Detalle de orden no encontrado"
      });
    }

    res.json({
      message: "Detalle de orden actualizado correctamente",
      detail: updated
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar detalle de orden"
    });
  }
};

const removeOrderDetail = async (req, res) => {
  try {

    const { id } = req.params;

    const deleted = await remove(id);
    if (!deleted) {
      return res.status(404).json({
        message: "Detalle de orden no encontrado"
      });
    }

    res.json({
      message: "Detalle de orden eliminado correctamente",
      detail: deleted
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar detalle de orden"
    });
  }
};


module.exports = {
  getOrderDetails,
  getOrderDetailById,
  getOrderDetailsByOrder,
  createOrderDetail,
  updateOrderDetail,
  removeOrderDetail
};
