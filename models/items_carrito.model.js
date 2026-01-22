const { pool } = require("../config/database");
const format = require("pg-format");

const getAll = async () => {
  try {

    const query = format(`
      SELECT *
      FROM items_carrito
      ORDER BY id ASC
    `);
    const response = await pool.query(query);
    return response.rows;

  } catch (error) {
    console.error("❌ Error en modelo ItemsCarrito - getAll:", error.message);
    return [];
  }
};

const getById = async (id) => {
  try {

    const query = format(`
      SELECT *
      FROM items_carrito
      WHERE id = %L
    `, id);

    const response = await pool.query(query);
    return response.rows[0] || null;

  } catch (error) {
    console.error("❌ Error en modelo ItemsCarrito - getById:", error.message);
    return null;
  }
};

const getByCartId = async (id_carrito) => {
  try {

    const query = format(`
      SELECT *
      FROM items_carrito
      WHERE id_carrito = %L
      ORDER BY fecha_creacion ASC
    `, id_carrito);

    const response = await pool.query(query);
    return response.rows;

  } catch (error) {
    console.error("❌ Error en modelo ItemsCarrito - getByCartId:", error.message);
    return [];
  }
};

const create = async ({ id_carrito, id_producto, cantidad }) => {
  try {

    const query = format(`
      INSERT INTO items_carrito
      (id_carrito, id_producto, cantidad, fecha_creacion)
      VALUES (%L, %L, %L, NOW())
      RETURNING *
    `,
      id_carrito,
      id_producto,
      cantidad
    );

    const response = await pool.query(query);
    return response.rows[0];

  } catch (error) {
    console.error("❌ Error en modelo ItemsCarrito - create:", error.message);
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
      UPDATE items_carrito
      SET ${fields.join(", ")}
      WHERE id = %L
      RETURNING *
    `, ...values, id);

    const response = await pool.query(query);
    return response.rows[0] || null;
    
  } catch (error) {
    console.error("❌ Error en modelo ItemsCarrito - update:", error.message);
    return null;
  }
};

const remove = async (id) => {
  try {

    const query = format(`
      DELETE FROM items_carrito
      WHERE id = %L
      RETURNING *
    `, id);

    const response = await pool.query(query);
    return response.rows[0] || null;

  } catch (error) {
    console.error("❌ Error en modelo ItemsCarrito - remove:", error.message);
    return null;
  }
};


module.exports = {
  getAll,
  getById,
  getByCartId,
  create,
  update,
  remove
};
