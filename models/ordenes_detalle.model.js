const { pool } = require("../config/database");
const format = require("pg-format");

const getAll = async () => {
  try {

    const query = format(`
      SELECT *
      FROM ordenes_detalle
      ORDER BY id ASC
    `);
    const response = await pool.query(query);
    return response.rows;

  } catch (error) {
    console.error("❌ Error en modelo OrdenesDetalle - getAll:", error.message);
    return [];
  }
};

const getById = async (id) => {
  try {

    const query = format(`
      SELECT *
      FROM ordenes_detalle
      WHERE id = %L
    `, id);

    const response = await pool.query(query);
    return response.rows[0] || null;

  } catch (error) {
    console.error("❌ Error en modelo OrdenesDetalle - getById:", error.message);
    return null;
  }
};

const getByOrderId = async (id_orden) => {
  try {

    const query = format(`
      SELECT *
      FROM ordenes_detalle
      WHERE id_orden = %L
      ORDER BY fecha_creacion ASC
    `, id_orden);

    const response = await pool.query(query);
    return response.rows;

  } catch (error) {
    console.error("❌ Error en modelo OrdenesDetalle - getByOrderId:", error.message);
    return [];
  }
};

const create = async ({ id_orden, id_producto, cantidad }) => {
  try {

    const query = format(`
      INSERT INTO ordenes_detalle
      (id_orden, id_producto, cantidad, fecha_creacion)
      VALUES (%L, %L, %L, NOW())
      RETURNING *
    `,
      id_orden,
      id_producto,
      cantidad
    );

    const response = await pool.query(query);
    return response.rows[0];

  } catch (error) {
    console.error("❌ Error en modelo OrdenesDetalle - create:", error.message);
    return null;
  }
};

const update = async (id, data) => {
  try {

    const fields = [];
    const values = [];

    for (const key in data) {
      fields.push(`${key} = %L`);
      values.push(data[key]);
    }

    if (fields.length === 0) return null;

    const query = format(`
      UPDATE ordenes_detalle
      SET ${fields.join(", ")}
      WHERE id = %L
      RETURNING *
    `, ...values, id);

    const response = await pool.query(query);
    return response.rows[0] || null;

  } catch (error) {
    console.error("❌ Error en modelo OrdenesDetalle - update:", error.message);
    return null;
  }
};

const remove = async (id) => {
  try {

    const query = format(`
      DELETE FROM ordenes_detalle
      WHERE id = %L
      RETURNING *
    `, id);

    const response = await pool.query(query);
    return response.rows[0] || null;

  } catch (error) {
    console.error("❌ Error en modelo OrdenesDetalle - remove:", error.message);
    return null;
  }
};


module.exports = {
  getAll,
  getById,
  getByOrderId,
  create,
  update,
  remove
};
