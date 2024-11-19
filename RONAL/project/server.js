const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "UTPL2023",
  database: "ArtistaDB",
});

db.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err);
  } else {
    console.log("Conectado a la base de datos MySQL.");
  }
});

// CRUD: Crear una obra
app.post("/obras", (req, res) => {
  const { artista_id, titulo, descripcion, imagen_url } = req.body;
  const query = "INSERT INTO obras (artista_id, titulo, descripcion, imagen_url) VALUES (?, ?, ?, ?)";
  db.query(query, [artista_id, titulo, descripcion, imagen_url], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send({ id: result.insertId });
    }
  });
});

// Leer todas las obras
app.get("/obras", (req, res) => {
  db.query("SELECT * FROM obras", (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(results);
    }
  });
});

// Actualizar una obra
app.put("/obras/:id", (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, imagen_url } = req.body;
  const query = "UPDATE obras SET titulo = ?, descripcion = ?, imagen_url = ? WHERE id = ?";
  db.query(query, [titulo, descripcion, imagen_url, id], (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send({ success: true });
    }
  });
});

// Eliminar una obra
app.delete("/obras/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM obras WHERE id = ?", [id], (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send({ success: true });
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
