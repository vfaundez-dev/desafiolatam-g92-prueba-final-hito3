const { pool } = require("../config/database");
const format = require("pg-format");

const getAll = async () => {
  try {

    const query = format(`
      SELECT *
      FROM favoritos
      ORDER BY id ASC
    `);
    const response = await pool.query(query);
    return response.rows;

  } catch (error) {
    console.error("❌ Error en modelo Favoritos - getAll:", error.message);
    return [];
  }
};

const getById = async (id) => {
  try {

    const query = format(`
      SELECT *
      FROM favoritos
      WHERE id = %L
    `, id);

    const response = await pool.query(query);
    return response.rows[0] || null;

  } catch (error) {
    console.error("❌ Error en modelo Favoritos - getById:", error.message);
    return null;
  }
};

const getByUserId = async (id_usuario) => {
  try {

    const query = format(`
      SELECT *
      FROM favoritos
      WHERE id_usuario = %L
      ORDER BY fecha_creacion DESC
    `, id_usuario);

    const response = await pool.query(query);
    return response.rows;

  } catch (error) {
    console.error("❌ Error en favoritos.getByUserId:", error.message);
    return [];
  }
};

const create = async ({ id_usuario, id_producto }) => {
  try {

    const query = format(`
      INSERT INTO favoritos
      (id_usuario, id_producto, fecha_creacion)
      VALUES (%L, %L, NOW())
      RETURNING *
    `,
      id_usuario,
      id_producto
    );

    const response = await pool.query(query);
    return response.rows[0];

  } catch (error) {
    console.error("❌ Error en modelo Favoritos - create:", error.message);
    return null;
  }
};

const remove = async (id) => {
  try {

    const query = format(`
      DELETE FROM favoritos
      WHERE id = %L
      RETURNING *
    `, id);

    const response = await pool.query(query);
    return response.rows[0] || null;

  } catch (error) {
    console.error("❌ Error en modelo Favoritos - remove:", error.message);
    return null;
  }
};


module.exports = {
  getAll,
  getById,
  getByUserId,
  create,
  remove
};
