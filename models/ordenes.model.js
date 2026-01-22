const { pool } = require("../config/database");
const format = require("pg-format");

const getAll = async () => {
  try {

    const query = format(`
      SELECT *
      FROM ordenes
      ORDER BY id ASC
    `);
    const response = await pool.query(query);
    return response.rows;

  } catch (error) {
    console.error("❌ Error en modelo Ordenes - getAll:", error.message);
    return [];
  }
};

const getById = async (id) => {
  try {

    const query = format(`
      SELECT *
      FROM ordenes
      WHERE id = %L
    `, id);

    const response = await pool.query(query);
    return response.rows[0] || null;

  } catch (error) {
    console.error("❌ Error en modelo Ordenes - getById:", error.message);
    return null;
  }
};

const getByUserId = async (id_usuario) => {
  try {

    const query = format(`
      SELECT *
      FROM ordenes
      WHERE id_usuario = %L
      ORDER BY fecha_creacion DESC
    `, id_usuario);

    const response = await pool.query(query);
    return response.rows;

  } catch (error) {
    console.error("❌ Error en modelo Ordenes - getByUserId:", error.message);
    return [];
  }
};

const create = async ({ id_usuario, total_pagar, status }) => {
  try {

    const query = format(`
      INSERT INTO ordenes
      (id_usuario, total_pagar, status, fecha_creacion)
      VALUES (%L, %L, %L, NOW())
      RETURNING *
    `,
      id_usuario,
      total_pagar,
      status
    );

    const response = await pool.query(query);
    return response.rows[0];

  } catch (error) {
    console.error("❌ Error en modelo Ordenes - create:", error.message);
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
      UPDATE ordenes
      SET ${fields.join(", ")}
      WHERE id = %L
      RETURNING *
    `, ...values, id);

    const response = await pool.query(query);
    return response.rows[0] || null;

  } catch (error) {
    console.error("❌ Error en modelo Ordenes - update:", error.message);
    return null;
  }
};

const remove = async (id) => {
  try {

    const query = format(`
      DELETE FROM ordenes
      WHERE id = %L
      RETURNING *
    `, id);

    const response = await pool.query(query);
    return response.rows[0] || null;
    
  } catch (error) {
    console.error("❌ Error en modelo Ordenes - remove:", error.message);
    return null;
  }
};

module.exports = {
  getAll,
  getById,
  getByUserId,
  create,
  update,
  remove
};
