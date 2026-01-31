const { pool } = require("../config/database");
const format = require("pg-format");


const getAll = async () => {
  try {

    const query = format(`
      SELECT * 
      FROM productos
      WHERE activo = 1
      ORDER BY id ASC
    `);
    const response = await pool.query(query);
    return response.rows;

  } catch (error) {
    console.error("❌ Error en modelo Producto - getAll:", error.message);
    return [];
  }
};

const getById = async (id) => {
  try {

    const query = format(`
      SELECT *
      FROM productos
      WHERE id = %L AND activo = 1
    `, id);

    const response = await pool.query(query);
    return response.rows[0] || null;

  } catch (error) {
    console.error("❌ Error en modelo Producto - getById:", error.message);
    return null;
  }
};

const create = async ({name, description = null, precio, stock, imagen_url, categoria = null, activo = 1}) => {
  try {

    const query = format(`
      INSERT INTO productos
      (name, description, precio, stock, imagen_url, activo, categoria, fecha_creacion)
      VALUES (%L, %L, %L, %L, %L, %L, %L, NOW())
      RETURNING *
    `,
      name, description, precio, stock, imagen_url, activo, categoria
    );

    const response = await pool.query(query);
    return response.rows[0];

  } catch (error) {
    console.error("❌ Error en modelo Producto - create:", error.message);
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
      UPDATE productos
      SET ${fields.join(", ")}, fecha_modificacion = NOW()
      WHERE id = %L
      RETURNING *
    `, ...values, id);

    const response = await pool.query(query);
    return response.rows[0] || null;

  } catch (error) {
    console.error("❌ Error en modelo Producto - update:", error.message);
    return null;
  }
};

const disable = async (id) => {
  try {

    const query = format(`
      UPDATE productos
      SET activo = 0, fecha_modificacion = NOW()
      WHERE id = %L
      RETURNING *
    `, id);

    const response = await pool.query(query);
    return response.rows[0] || null;

  } catch (error) {
    console.error("❌ Error en modelo Producto - disable:", error.message);
    return null;
  }
};

const updateStock = async (id, cantidad) => {
  try {

    const query = format(`
      UPDATE productos
      SET stock = stock + %L, fecha_modificacion = NOW()
      WHERE id = %L
      RETURNING *
    `, cantidad, id);

    const response = await pool.query(query);
    return response.rows[0] || null;

  } catch (error) {
    console.error("❌ Error en modelo Producto - updateStock:", error.message);
    return null;
  }
};


module.exports = {
  getAll,
  getById,
  create,
  update,
  disable,
  updateStock
};
