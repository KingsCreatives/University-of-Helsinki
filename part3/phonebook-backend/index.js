const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const PORT = 3001
require("dotenv").config();

const Person = require("./model/phonebook");

app.use(express.static("dist"));

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

app.use(cors());
app.use(express.json());
app.use(morgan(":method :url :status :response-time ms"));

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((error) => next(error));
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

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

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

app.put("/api/persons/:id", (req, res, next) => {
  const {name, number} = req.body;
  const person = {
    name,
    number
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson);
      // Person.find({})
      //   .then((persons) => {
      //     res.json(persons);
      //   })
      //   .catch((error) => next(error));
    })
    .catch((error) => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`app is running on PORT:${PORT}`);
});
