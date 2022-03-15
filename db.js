const pg = require('pg');
const { Pool } = pg;

const config = {
  user: 'postgres',
  host: 'localhost',
  password: '1234',
  database: 'mercadoweb',
  port: 5432,
  max: 20,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 2000,
};

const pool = new Pool(config);

async function agregarAlCarrito(id, nombre, precio) {
  try {
    const client = await pool.connect();
    const res = await client.query({
      text: 'insert into carrito (id, nombre, precio) values ($1,$2,$3)',
      values: [id, nombre, precio],
    });
    client.release();

    return res.rowCount && `Producto registrado con exito`;
  } catch (error) {
    console.log(error);
    throw error.message;
  }
}
async function getCarrito(nombre, balance) {
  try {
    const client = await pool.connect();
    const res = await client.query(
      'SELECT carrito.id, carrito.nombre, COUNT (carrito.id) as cantidad, SUM (carrito.precio) as subtotal FROM carrito GROUP BY carrito.id ,carrito.nombre;'
    );
    client.release();
    return res.rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = { agregarAlCarrito, getCarrito };
