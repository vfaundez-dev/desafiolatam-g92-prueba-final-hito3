const express = require('express');
const cors = require('cors');

const usuariosRoutes = require("./routes/usuarios.routes");
const authRoutes = require("./routes/auth.routes");
const productosRoutes = require("./routes/productos.routes");
const carritoRoutes = require("./routes/carrito.routes");
const itemsCarritoRoutes = require("./routes/items_carrito.routes");
const ordenesRoutes = require("./routes/ordenes.routes");
const ordenesDetalleRoutes = require("./routes/ordenes_detalle.routes");
const favoritosRoutes = require("./routes/favoritos.routes");

// Crear aplicacion
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.get("/", (req, res) => {
  res.json({
    author: "Vladimir Faundez - Camila Hurtado",
    message: "Bienvenido a la API de la tienda Coockie Co"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/carrito", carritoRoutes);
app.use("/api/carrito/:id_carrito/items", itemsCarritoRoutes);
app.use("/api/ordenes", ordenesRoutes);
app.use("/api/ordenes/:id_orden/detalle", ordenesDetalleRoutes);
app.use("/api/favoritos", favoritosRoutes);


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});
