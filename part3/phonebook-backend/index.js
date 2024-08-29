require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;
const Person = require('./model/phonebook')

app.use(express.json());
morgan.token("body", function (req) {
  return JSON.stringify(req.body);
});
app.use(morgan(":method :url :status :response-time ms"));
app.use(cors());
app.use(express.static("dist"));



app.get("/api/persons", (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
});

app.get("/info", (req, res) => {
  const text = `Phonebook has info for ${contact.length} person`;
  const date = new Date().toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "long",
  });
  const response = `${text}\n${date}`;
  return res.send(response);
});

app.get("/api/persons/:id", (req, res) => {
  const personId = req.params.id;
  const person = contact.find((p) => p.id === personId);

  if (!person) {
    return res.status(404).json({
      error: `No contact has the ${personId} as it Id`,
    });
  }

  return res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const contactBefore = contact.length;
  contact = contact.filter((ele) => ele.id !== id);

  if (contactBefore === contact.length) {
    return res.status(404).json({ error: "Contact not found" });
  }

  res.status(204).end();
});

const randomId = () => {
  return String(Math.floor(Math.random() * 1000000));
};

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    const missingData = !name ? "name" : "number";
    return res.status(404).json({ error: `${missingData} is missing` });
  }

  Person.findOne({ name: name.toLowerCase() })
    .then((existingPerson) => {
      if (existingPerson) {
        return res.status(409).json({ error: "name must be unique" });
      }

      const person = new Person({
        name,
        number,
      });

      return person.save();
    })
    .then((savedPerson) => {
      res.status(201).json(savedPerson);
    })
    .catch((err) => {
      return res.status(500).json({ error: "Something went wrong" });
    });
});


app.listen(PORT, () => {
  console.log(`app is running on PORT:${PORT}`);
});
