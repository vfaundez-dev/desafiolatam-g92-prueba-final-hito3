const { pool } = require("../config/database");
const format = require("pg-format");
const bcrypt = require("bcrypt");


const getAll = async () => {
  try {

    const query = format(`SELECT * FROM usuarios ORDER BY id ASC`);
    const response = await pool.query(query);
    return response.rows;

  } catch (error) {
    console.error("❌ Error modelo Usuario - getAll:", error.message);
    return [];
  }
};

const getById = async (id) => {
  try {

    const query = format(`SELECT * FROM usuarios WHERE id = %L`, id);
    const response = await pool.query(query);
    return response.rows[0] || null;

  } catch (error) {
    console.error("❌ Error modelo Usuario - getById:", error.message);
    return null;
  }
};

const getByEmail = async (email) => {
  try {

    const query = format(`SELECT * FROM usuarios WHERE email = %L`, email);
    const response = await pool.query(query);
    return response.rows[0] || null;

  } catch (error) {
    console.error("❌ Error modelo Usuario - getByEmail:", error.message);
    return null;
  }
};

const create = async ({nombre, email, password, direccion = null, ciudad = null, comuna = null, activo = true}) => {
  try {
    const passwordEncriptada = await bcrypt.hash(password, 10);

    const query = format(`
      INSERT INTO usuarios
      (nombre, email, password, activo, direccion, ciudad, comuna, fecha_creacion)
      VALUES (%L, %L, %L, %L, %L, %L, %L, NOW())
      RETURNING *
    `,
      nombre, email, passwordEncriptada, activo, direccion, ciudad, comuna
    );

    const response = await pool.query(query);
    return response.rows[0];

  } catch (error) {
    console.error("❌ Error en modelo Usuario - create:", error.message);
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
      UPDATE usuarios
      SET ${fields.join(", ")}, fecha_modificacion = NOW()
      WHERE id = %L
      RETURNING *
    `, ...values, id);

    const response = await pool.query(query);
    return response.rows[0] || null;

  } catch (error) {
    console.error("❌ Error en updateUser:", error.message);
    return null;
  }
};

// Desactivar un usuario
const disable = async (id) => {
  try {

    const query = format(`
      UPDATE usuarios
      SET activo = false, fecha_modificacion = NOW()
      WHERE id = %L
      RETURNING *
    `, id);

    const response = await pool.query(query);
    return response.rows[0] || null;

  } catch (error) {
    console.error("❌ Error en modelo Usuario - disable:", error.message);
    return null;
  }
};

const auth = async (email, password) => {
  try {

    const query = format(`SELECT * FROM usuarios WHERE email = %L AND activo = true`, email);
    const response = await pool.query(query);

    const user = response.rows[0];
    if (!user) return null;

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return null;

    return user;

  } catch (error) {
    console.error("❌ Error en modelo Usuario - auth:", error.message);
    return null;
  }
};


module.exports = {
  getAll,
  getById,
  getByEmail,
  create,
  update,
  disable,
  auth
};