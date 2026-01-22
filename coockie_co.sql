CREATE TABLE "usuarios" (
  "id" integer PRIMARY KEY,
  "nombre" varchar(150) NOT NULL,
  "email" varchar(50) UNIQUE NOT NULL,
  "password" varchar(150) NOT NULL,
  "activo" boolean,
  "direccion" varchar(250),
  "ciudad" varchar(250),
  "comuna" varchar(250),
  "fecha_creacion" timestamp,
  "fecha_modificacion" timestamp
);

CREATE TABLE "productos" (
  "id" integer PRIMARY KEY,
  "name" varchar(150) NOT NULL,
  "description" varchar(150),
  "precio" integer NOT NULL,
  "stock" integer NOT NULL,
  "imagen_url" text NOT NULL,
  "activo" boolean,
  "categoria" varchar(150),
  "fecha_creacion" timestamp,
  "fecha_modificacion" timestamp
);

CREATE TABLE "carrito" (
  "id" integer PRIMARY KEY,
  "id_usuario" integer NOT NULL,
  "fecha_creacion" timestamp
);

CREATE TABLE "items_carrito" (
  "id" integer PRIMARY KEY,
  "id_carrito" integer NOT NULL,
  "id_producto" integer NOT NULL,
  "cantidad" integer NOT NULL,
  "fecha_creacion" timestamp
);

CREATE TABLE "ordenes" (
  "id" integer PRIMARY KEY,
  "id_usuario" integer NOT NULL,
  "total_pagar" integer NOT NULL,
  "status" varchar(30),
  "fecha_creacion" timestamp
);

CREATE TABLE "ordenes_detalle" (
  "id" integer PRIMARY KEY,
  "id_orden" integer NOT NULL,
  "id_producto" integer NOT NULL,
  "cantidad" integer NOT NULL,
  "fecha_creacion" timestamp
);

CREATE TABLE "favoritos" (
  "id" integer PRIMARY KEY,
  "id_usuario" integer NOT NULL,
  "id_producto" integer NOT NULL,
  "fecha_creacion" timestamp
);

ALTER TABLE "carrito" ADD FOREIGN KEY ("id_usuario") REFERENCES "usuarios" ("id");

ALTER TABLE "items_carrito" ADD FOREIGN KEY ("id_carrito") REFERENCES "carrito" ("id");

ALTER TABLE "items_carrito" ADD FOREIGN KEY ("id_producto") REFERENCES "productos" ("id");

ALTER TABLE "ordenes" ADD FOREIGN KEY ("id_usuario") REFERENCES "usuarios" ("id");

ALTER TABLE "ordenes_detalle" ADD FOREIGN KEY ("id_orden") REFERENCES "ordenes" ("id");

ALTER TABLE "ordenes_detalle" ADD FOREIGN KEY ("id_producto") REFERENCES "productos" ("id");

ALTER TABLE "favoritos" ADD FOREIGN KEY ("id_usuario") REFERENCES "usuarios" ("id");

ALTER TABLE "favoritos" ADD FOREIGN KEY ("id_producto") REFERENCES "productos" ("id");
