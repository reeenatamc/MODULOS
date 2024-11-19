const express = require('express');
const db = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Importar path para trabajar con rutas

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, '../public')));

// Get all payments
app.get('/payments', (req, res) => {
    db.query('SELECT * FROM payments', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Create a new payment
app.post('/payments', (req, res) => {
    const { payer_name, amount, payment_date } = req.body;
    const sql = 'INSERT INTO payments (payer_name, amount, payment_date) VALUES (?, ?, ?)';
    db.query(sql, [payer_name, amount, payment_date], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Payment created');
    });
});

// Update a payment
app.put('/payments/:id', (req, res) => {
    const { id } = req.params;
    const { payer_name, amount, payment_date } = req.body;
    const sql = 'UPDATE payments SET payer_name = ?, amount = ?, payment_date = ? WHERE id = ?';
    db.query(sql, [payer_name, amount, payment_date, id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Payment updated');
    });
});

// Delete a payment
app.delete('/payments/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM payments WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Payment deleted');
    });
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
