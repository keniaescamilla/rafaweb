const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); 
const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'apimeds'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});


app.use(cors({
  origin: 'http://localhost:3000',
}));

// Endpoint para obtener los datos de los medicamentos
app.get('/medicamentos', (req, res) => {
  connection.query('SELECT * FROM new_table', (err, rows) => {
    if (err) {
      console.error('Error en la consulta:', err);
      res.status(500).send('Error obteniendo medicamentos');
      return;
    }
    res.json(rows); 
  });
});


const PORT = 3006;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});