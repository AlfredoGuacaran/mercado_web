const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const { agregarAlCarrito, getCarrito } = require('./db');

app.use(express.static('static'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('node_modules/jquery/dist/jquery.js'));

const productos = [
  { id: 1, nombre: 'Banana', img: 'banana.png', precio: 990 },
  { id: 2, nombre: 'Cebolla', img: 'cebolla.png', precio: 1200 },
  { id: 3, nombre: 'Lechuga', img: 'lechuga.png', precio: 1300 },
  { id: 4, nombre: 'Papa', img: 'papa.png', precio: 1350 },
  { id: 5, nombre: 'Piminton', img: 'pimenton.png', precio: 1990 },
  { id: 6, nombre: 'Tomate', img: 'tomate.png', precio: 1800 },
];

nunjucks.configure('views', {
  express: app,
  autoescape: true,
  watch: true,
});

app.get('/', async (req, res) => {
  const { carrito, total } = await getCarrito();

  res.render('index.html', {
    productos: productos,
    carrito: carrito,
    total: total,
  });
});

app.post('/agregar', async (req, res) => {
  let data;
  req.on('data', payload => {
    data = JSON.parse(payload);
  });

  req.on('end', async () => {
    try {
      const { productoId, nombre, precio } = data;

      const post = await agregarAlCarrito(productoId, nombre, precio);

      res.status(200).send({ Mensaje: 'Exitoso' });
    } catch (error) {
      console.log(error);
      res.status(400).send({ error });
    }
  });
});

app.listen(3000, () => console.log('Servidor en puerto 3000'));
