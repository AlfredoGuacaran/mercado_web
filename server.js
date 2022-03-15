const express = require('express');
const nunjucks = require('nunjucks');
const app = express();

app.use(express.static('static'));
app.use(express.static('node_modules/bootstrap/dist'));

const productos = [
  { nombre: 'Banana', img: 'banana.png', precio: 990 },
  { nombre: 'Cebolla', img: 'cebolla.png', precio: 1200 },
  { nombre: 'Lechuga', img: 'lechuga.png', precio: 1300 },
  { nombre: 'Papa', img: 'papa.png', precio: 1350 },
  { nombre: 'Piminton', img: 'pimenton.png', precio: 1990 },
  { nombre: 'Tomate', img: 'tomate.png', precio: 1800 },
];

nunjucks.configure('views', {
  express: app,
  autoescape: true,
  watch: true,
});

app.get('/', (req, res) => {
  res.render('index.html', { productos });
});

app.listen(3000, () => console.log('Servidor en puerto 3000'));
