const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

const {contact} = require('./data')

app.get("/api/persons", (req, res) => {
  return res.status(200).json(contact);
});

app.listen(PORT, () => {
  console.log(`app is running on PORT:${PORT}`);
});
