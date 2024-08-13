const express = require("express");
const morgan = require('morgan')
const PORT = 3001;
const app = express();
let {contact} = require('./data')

app.use(express.json());

morgan.token('body', function (req) {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :response-time ms - :body'));


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

const randomId = () => {
  return String(Math.floor(Math.random() * 1000000))
}

app.post('/api/persons', (req,res) => {
  const body = req.body

  if(!body.name || !body.number){
    const err = body.name === "" || !body.name ? 'name' : 'number'
    return res.status(404).json({error: `${err} is missing` })
  }

  const findName = contact.find(ele => ele.name.toLowerCase() === body.name.toLowerCase())

  if(findName){
    return res.status(404).json({ error: "name must be unique" });
  }

  const phoneBook = {
     name : body.name,
     number: body.number,
     id: randomId()
  }

  return res.json(phoneBook)
})

app.listen(PORT, () => {
  console.log(`app is running on PORT:${PORT}`);
});
