const { getAll, getById, getByUserId, create, remove } = require("../models/favoritos.model");

const getFavorites = async (req, res) => {
  try {

    const favorites = await getAll();
    res.json(favorites);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener favoritos"
    });
  }
};

const getFavoriteById = async (req, res) => {
  try {

    const { id } = req.params;

    const favorite = await getById(id);
    if (!favorite) {
      return res.status(404).json({
        message: "Favorito no encontrado"
      });
    }

    res.json(favorite);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener favorito"
    });
  }
};

const getFavoritesByUser = async (req, res) => {
  try {

    const { id_usuario } = req.params;

    const favorites = await getByUserId(id_usuario);
    res.json(favorites);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener favoritos del usuario"
    });
  }
};

const createFavorite = async (req, res) => {
  try {

    const { id_usuario, id_producto } = req.body;

    if (!id_usuario || !id_producto) {
      return res.status(400).json({
        message: "id_usuario e id_producto son obligatorios"
      });
    }

    const newFavorite = await create({
      id_usuario,
      id_producto
    });

    res.status(201).json({
      message: "Producto agregado a favoritos",
      favorite: newFavorite
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al crear favorito"
    });
  }
};

const removeFavorite = async (req, res) => {
  try {

    const { id } = req.params;

    const deleted = await remove(id);
    if (!deleted) {
      return res.status(404).json({
        message: "Favorito no encontrado"
      });
    }

    res.json({
      message: "Favorito eliminado correctamente",
      favorite: deleted
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar favorito"
    });
  }
};


module.exports = {
  getFavorites,
  getFavoriteById,
  getFavoritesByUser,
  createFavorite,
  removeFavorite
};
