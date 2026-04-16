const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get("/", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result.rows);
});

app.post("/clientes", async (req, res) => {
  const { nome } = req.body;

  await pool.query(
    "INSERT INTO clientes (nome) VALUES ($1)",
    [nome]
  );

  res.send("ok");
});

app.listen(3000, () => console.log("rodando"));
