const express = require("express");
const mongoose = require("mongoose");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

// MongoDB
mongoose.connect("mongodb://mongo:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const mongoSchema = new mongoose.Schema({ name: String });
const MongoItem = mongoose.model("MongoItem", mongoSchema);

// PostgreSQL
const pgPool = new Pool({
  user: "user",
  host: "postgres",
  database: "testdb",
  password: "password",
  port: 5432,
});
pgPool.query("CREATE TABLE IF NOT EXISTS items (id SERIAL PRIMARY KEY, name TEXT)");

// Routes - Mongo
app.post("/mongo", async (req, res) => {
  const newItem = new MongoItem({ name: req.body.name });
  await newItem.save();
  res.send(newItem);
});

app.get("/mongo", async (req, res) => {
  const items = await MongoItem.find();
  res.send(items);
});

// Routes - Postgres
app.post("/postgres", async (req, res) => {
  const result = await pgPool.query("INSERT INTO items(name) VALUES($1) RETURNING *", [req.body.name]);
  res.send(result.rows[0]);
});

app.get("/postgres", async (req, res) => {
  const result = await pgPool.query("SELECT * FROM items");
  res.send(result.rows);
});

app.listen(3000, () => console.log("✅ Server ready at http://localhost:3000"));
