const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

let {contact} = require('./data')

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


app.get("/api/persons/:id", (req, res) => {
  const personId = req.params.id
  const person = contact.find(p => p.id === personId)

  if(!person){
    return res.status(404).json({
      error : `No contact has the ${personId} as it Id`
    })
  }

  return res.json(person)
})


app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id
  contact = contact.filter(ele => ele.id !== id)
   res.status(204).end();
})

app.listen(PORT, () => {
  console.log(`app is running on PORT:${PORT}`);
});
