const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

const {contact} = require('./data')

app.get("/api/persons", (req, res) => {
  return res.status(200).json(contact);
});

app.get("/info", (req, res) => {
  const text = `Phonebook has info for ${contact.length} person`
 const date = new Date().toLocaleString('en-US', { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'long'
  });
  const response = `${text}\n${date}`;
   return res.send(response)
})

app.listen(PORT, () => {
  console.log(`app is running on PORT:${PORT}`);
});
