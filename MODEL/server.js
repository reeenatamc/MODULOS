const express = require('express');
const mysql = require('mysql2'); // Usamos mysql2 para la conexión a la base de datos
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configura la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'filomena2015',
    database: 'artistasloja'
});

// Conectar a la base de datos
connection.connect(error => {
    if (error) {
        console.error('Error conectando a la base de datos:', error);
    } else {
        console.log('Conexión a la base de datos exitosa');
    }
});

// Ruta POST para crear un usuario (modificado según tu estructura)
app.post('/api/usuarios', (req, res) => {
    const userData = req.body;

    // Guardar el usuario en la base de datos
    const query = 'INSERT INTO usuarios (id_usuario, nombre, apellido, email, contrasena, fecha_creacion) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [userData.id_usuario, userData.nombre, userData.apellido, userData.email, userData.contrasena, new Date()], (err, result) => {
        if (err) return res.status(500).send({ message: 'Error al crear usuario' });
        res.status(201).send({ message: 'Usuario creado con éxito' });
    });
});

// Ruta GET para obtener un usuario por su ID
app.get('/api/usuarios/:id', (req, res) => {
    const userId = req.params.id;

    // Consultar al usuario en la base de datos
    const query = 'SELECT * FROM usuarios WHERE id_usuario = ?';
    connection.query(query, [userId], (err, result) => {
        if (err) return res.status(500).send({ message: 'Error al obtener usuario' });
        if (result.length === 0) return res.status(404).send({ message: 'Usuario no encontrado' });
        res.json(result[0]);
    });
});

// Ruta PUT para actualizar un usuario
app.put('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;  // Obtenemos el ID desde los parámetros de la ruta
    const { nombre, apellido, email, contrasena } = req.body;  // Obtenemos los datos desde el cuerpo de la solicitud

    const query = 'UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, contrasena = ? WHERE id_usuario = ?';
    connection.query(query, [nombre, apellido, email, contrasena, id], (err, result) => {
        if (err) return res.status(500).send({ message: 'Error al actualizar usuario' });
        res.send({ message: 'Usuario actualizado con éxito' });
    });
});



// Ruta DELETE para eliminar un usuario
app.delete('/api/usuarios/:id', (req, res) => {
    const userId = req.params.id;

    // Consultar si el usuario existe antes de eliminar
    const checkQuery = 'SELECT * FROM usuarios WHERE id_usuario = ?';
    connection.query(checkQuery, [userId], (err, result) => {
        if (err) return res.status(500).send({ message: 'Error al verificar usuario' });
        if (result.length === 0) return res.status(404).send({ message: 'Usuario no encontrado' });

        // Eliminar usuario de la base de datos
        const deleteQuery = 'DELETE FROM usuarios WHERE id_usuario = ?';
        connection.query(deleteQuery, [userId], (err, result) => {
            if (err) return res.status(500).send({ message: 'Error al eliminar usuario' });
            res.send({ message: 'Usuario eliminado con éxito' });
        });
    });
});

// Ruta POST para crear un artista
app.post('/api/artistas', (req, res) => {
    const { id, nombre, apellido, tipo_arte, descripcion, contacto, ubicacion, imagen_url } = req.body;
    const query = 'INSERT INTO artistas (id_artista, nombre, apellido, tipo_arte, descripcion, contacto, ubicacion, imagen_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [id, nombre, apellido, tipo_arte, descripcion, contacto, ubicacion, imagen_url], (err, result) => {
        if (err) return res.status(500).send({ message: 'Error al crear artista' });
        res.send({ message: 'Artista creado con éxito' });
    });
});

// Ruta GET para verificar un artista
app.get('/api/artistas/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM artistas WHERE id_artista = ?';
    connection.query(query, [id], (err, result) => {
        if (err) return res.status(500).send({ message: 'Error al verificar artista' });
        if (result.length === 0) return res.status(404).send({ message: 'Artista no encontrado' });
        res.send(result[0]);
    });
});

// Ruta PUT para actualizar un artista
app.put('/api/artistas/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, tipo_arte, descripcion, contacto, ubicacion, imagen_url } = req.body;
    const query = 'UPDATE artistas SET nombre = ?, apellido = ?, tipo_arte = ?, descripcion = ?, contacto = ?, ubicacion = ?, imagen_url = ? WHERE id_artista = ?';
    connection.query(query, [nombre, apellido, tipo_arte, descripcion, contacto, ubicacion, imagen_url, id], (err, result) => {
        if (err) return res.status(500).send({ message: 'Error al actualizar artista' });
        res.send({ message: 'Artista actualizado con éxito' });
    });
});

// Ruta DELETE para eliminar un artista
app.delete('/api/artistas/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM artistas WHERE id_artista = ?';
    connection.query(query, [id], (err, result) => {
        if (err) return res.status(500).send({ message: 'Error al eliminar artista' });
        res.send({ message: 'Artista eliminado con éxito' });
    });
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
