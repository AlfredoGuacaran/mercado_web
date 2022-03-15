const express = require('express');
const nunjucks = require('nunjucks');
const app = express();

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

let carrito = [];

nunjucks.configure('views', {
  express: app,
  autoescape: true,
  watch: true,
});

app.get('/', (req, res) => {
  res.render('index.html', { productos, carrito });
});

app.post('/agregar', async (req, res) => {
  let data;
  req.on('data', payload => {
    data = JSON.parse(payload);
  });

  req.on('end', async () => {
    try {
      const { productoid } = data;

      const productInf = productos.filter(
        producto => producto.id == productoid
      )[0];

      carrito.push(productInf);

      console.log(carrito);

      res.status(200).send({ Mensaje: 'Exitoso' });
    } catch (error) {
      console.log(error);
      res.status(400).send({ error });
    }
  });
});

app.listen(3000, () => console.log('Servidor en puerto 3000'));
