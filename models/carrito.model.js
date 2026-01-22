const { pool } = require("../config/database");
const format = require("pg-format");

const getAll = async () => {
  try {

    const query = format(`SELECT * FROM carrito ORDER BY id ASC`);
    const response = await pool.query(query);
    return response.rows;
    
  } catch (error) {
    console.error("❌ Error en modelo Carrito - getAll:", error.message);
    return [];
  }
};

const getById = async (id) => {
  try {

    const query = format(`SELECT * FROM carrito WHERE id = %L`, id);
    const response = await pool.query(query);
    return response.rows[0] || null;
    
  } catch (error) {
    console.error("❌ Error en modelo Carrito - getById:", error.message);
    return null;
  }
};

const getByUserId = async (id_usuario) => {
  try {

    const query = format(`
      SELECT *
      FROM carrito
      WHERE id_usuario = %L
      ORDER BY fecha_creacion DESC
      LIMIT 1
    `, id_usuario);

    const response = await pool.query(query);
    return response.rows[0] || null;

  } catch (error) {
    console.error("❌ Error en modelo Carrito - getByUserId:", error.message);
    return null;
  }
};

const create = async (id_usuario) => {
  try {

    const query = format(`
      INSERT INTO carrito (id_usuario, fecha_creacion)
      VALUES (%L, NOW())
      RETURNING *
    `, id_usuario);

    const response = await pool.query(query);
    return response.rows[0];

  } catch (error) {
    console.error("❌ Error en modelo Carrito - create:", error.message);
    return null;
  }
};

const remove = async (id) => {
  try {

    const query = format(`
      DELETE FROM carrito
      WHERE id = %L
      RETURNING *
    `, id);

    const response = await pool.query(query);
    return response.rows[0] || null;

  } catch (error) {
    console.error("❌ Error en modelo Carrito - remove:", error.message);
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
