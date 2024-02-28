import dotenv from "dotenv";
import express from "express";

// Setup .env
dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

app.get("/", (_, res) => {
  res.json({ msg: "Stealth startup nodemon" });
});

app.get("/stealth", (_, res) => {
  res.json({ msg: "Hidden secret message" });
});

app.listen(PORT, () => {
  console.log("Listening on http://localhost:8080");
});
