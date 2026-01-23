# Backend E-commerce – Coockie Co

## DESAFIO LATAM - _Curso Fullstack Javascript G92_

### Prueba Final Hito 3 - Backend

**_Desarrollado por Vladimir Faundez y Camila Hurtado_**
> Nota: `Esto realizado con propósitos académicos y de enseñanza. Favor no realizar copias directas del material aqui subido.`

Backend REST API desarrollado en Node.js, Express y PostgreSQL, con autenticación JWT para un sistema de e-commerce llamado "Coockie Co". Permite la gestión de usuarios, productos, carritos de compra y órdenes.

### 🚀 Tecnologías usadas

* Node.js
* Express
* PostgreSQL
* JWT (jsonwebtoken)
* bcrypt
* cors
* dotenv

---

### RUTAS DISPONIBLES

#### AUTENTICACIÓN

| Método | Ruta           | Descripción               |
| ------ | -------------- | ------------------------- |
| POST   | /auth/register | Registrar nuevo usuario   |
| POST   | /auth/login    | Iniciar sesión            |

#### USUARIOS

| Método | Ruta          | Descripción        |
| ------ | ------------- | ------------------ |
| GET    | /usuarios     | Listar usuarios    |
| GET    | /usuarios/:id | Usuario por ID     |
| PUT    | /usuarios/:id | Actualizar usuario |
| DELETE | /usuarios/:id | Desactivar usuario |

#### PRODUCTOS

| Método | Ruta                     | Descripción            |
|--------|--------------------------|------------------------|
| GET    | /productos               | Listar productos       |
| GET    | /productos/:id           | Producto por ID        |
| POST   | /productos               | Crear producto         |
| PUT    | /productos/:id           | Actualizar producto    |
| PUT    | /productos/:id/stock     | Actualizar stock       |
| DELETE | /productos/:id           | Desactivar producto    |

#### CARRITO

| Método | Ruta                         | Descripción         |
| ------ | ---------------------------- | ------------------- |
| GET    | /carrito                     | Listar carritos     |
| GET    | /carrito/:id                 | Carrito por ID      |
| GET    | /carrito/usuario/:id_usuario | Carrito del usuario |
| POST   | /carrito                     | Crear carrito       |
| DELETE | /carrito/:id                 | Eliminar carrito    |

#### ITEMS DEL CARRITO

| Método | Ruta                           | Descripción         |
| ------ | ------------------------------ | ------------------- |
| GET    | /carrito/:id_carrito/items     | Items del carrito   |
| GET    | /carrito/:id_carrito/items/:id | Item por ID         |
| POST   | /carrito/:id_carrito/items     | Agregar item        |
| PUT    | /carrito/:id_carrito/items/:id | Actualizar cantidad |
| DELETE | /carrito/:id_carrito/items/:id | Eliminar item       |

#### ÓRDENES

| Método | Ruta                         | Descripción         |
| ------ | ---------------------------- | ------------------- |
| GET    | /ordenes                     | Listar órdenes      |
| GET    | /ordenes/:id                 | Orden por ID        |
| GET    | /ordenes/usuario/:id_usuario | Órdenes del usuario |
| POST   | /ordenes                     | Crear orden         |
| PUT    | /ordenes/:id                 | Actualizar orden    |
| DELETE | /ordenes/:id                 | Eliminar orden      |

#### DETALLE DE ÓRDENES

| Método | Ruta                           | Descripción         |
| ------ | ------------------------------ | ------------------- |
| GET    | /ordenes/:id_orden/detalle     | Detalle de orden    |
| GET    | /ordenes/:id_orden/detalle/:id | Detalle por ID      |
| POST   | /ordenes/:id_orden/detalle     | Agregar producto    |
| PUT    | /ordenes/:id_orden/detalle/:id | Actualizar cantidad |
| DELETE | /ordenes/:id_orden/detalle/:id | Eliminar detalle    |

#### FAVORITOS

| Método | Ruta                           | Descripción           |
| ------ | ------------------------------ | --------------------- |
| GET    | /favoritos                     | Listar favoritos      |
| GET    | /favoritos/:id                 | Favorito por ID       |
| GET    | /favoritos/usuario/:id_usuario | Favoritos del usuario |
| POST   | /favoritos                     | Agregar favorito      |
| DELETE | /favoritos/:id                 | Eliminar favorito     |

---

### CAMPOS REQUERIDOS POR ENDPOINT

### POST /auth/login

| Campo     | Tipo   | Requerido | Descripción          |
|-----------|--------|-----------|----------------------|
| email     | string | ✅        | Email del usuario    |
| password  | string | ✅        | Contraseña           |

### POST /auth/register

| Campo     | Tipo   | Requerido | Descripción          |
|-----------|--------|-----------|----------------------|
| nombre    | string | ✅        | Nombre del usuario   |
| email     | string | ✅        | Email único          |
| password  | string | ✅        | Contraseña           |

---

### PUT /usuarios/:id

| Campo      | Tipo    | Requerido | Descripción          |
|------------|---------|-----------|----------------------|
| nombre     | string  | ❌        | Nombre               |
| direccion  | string  | ❌        | Dirección            |
| ciudad     | string  | ❌        | Ciudad               |
| comuna     | string  | ❌        | Comuna               |
| activo     | boolean | ❌        | Estado del usuario   |

---

### POST /productos

| Campo        | Tipo    | Requerido | Descripción          |
|--------------|---------|-----------|----------------------|
| name         | string  | ✅        | Nombre del producto  |
| description  | string  | ❌        | Descripción          |
| precio       | number  | ✅        | Precio               |
| stock        | number  | ✅        | Stock                |
| imagen_url   | string  | ✅        | URL imagen           |
| categoria    | string  | ❌        | Categoría            |
| activo       | boolean | ❌        | Estado               |

### PUT /productos/:id

| Campo        | Tipo    | Requerido | Descripción          |
|--------------|---------|-----------|----------------------|
| name         | string  | ❌        | Nombre               |
| description  | string  | ❌        | Descripción          |
| precio       | number  | ❌        | Precio               |
| stock        | number  | ❌        | Stock                |
| imagen_url   | string  | ❌        | URL imagen           |
| categoria    | string  | ❌        | Categoría            |
| activo       | boolean | ❌        | Estado               |

### PUT /productos/:id/stock

| Campo | Tipo   | Requerido | Descripción  |
|-------|--------|-----------|--------------|
| stock | number | ✅        | Nuevo stock  |

---

### POST /carrito

| Campo       | Tipo   | Requerido | Descripción    |
|-------------|--------|-----------|----------------|
| id_usuario  | number | ✅        | ID del usuario |

### POST /carrito/:id_carrito/items

| Campo         | Tipo   | Requerido | Descripción      |
|---------------|--------|-----------|------------------|
| id_producto   | number | ✅        | ID del producto  |
| cantidad      | number | ✅        | Cantidad         |

### PUT /carrito/:id_carrito/items/:id

| Campo    | Tipo   | Requerido | Descripción      |
|----------|--------|-----------|------------------|
| cantidad | number | ✅        | Nueva cantidad   |

---

### POST /ordenes

| Campo        | Tipo   | Requerido | Descripción          |
|--------------|--------|-----------|----------------------|
| id_usuario   | number | ✅        | ID del usuario       |
| total_pagar  | number | ✅        | Total a pagar        |
| status       | string | ✅        | Estado de la orden   |

### PUT /ordenes/:id

| Campo        | Tipo   | Requerido | Descripción        |
|--------------|--------|-----------|--------------------|
| total_pagar  | number | ❌        | Total              |
| status       | string | ❌        | Estado             |

---

### POST /ordenes/:id_orden/detalle

| Campo         | Tipo   | Requerido | Descripción      |
|---------------|--------|-----------|------------------|
| id_producto   | number | ✅        | ID del producto  |
| cantidad      | number | ✅        | Cantidad         |

### PUT /ordenes/:id_orden/detalle/:id

| Campo    | Tipo   | Requerido | Descripción      |
|----------|--------|-----------|------------------|
| cantidad | number | ✅        | Nueva cantidad   |

---

### POST /favoritos

| Campo         | Tipo   | Requerido | Descripción      |
|---------------|--------|-----------|------------------|
| id_usuario    | number | ✅        | ID del usuario   |
| id_producto   | number | ✅        | ID del producto  |

---
