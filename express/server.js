const express = require("express");
const app = express();

const PORT = 3000;

const friends = [
  {
    id: 0,
    name: "Kofi Mole",
  },
  {
    id: 1,
    name: "Kwame Mintah",
  },
];

// logger middleware
app.use((req, res, next) => {
  const timeNow = Date.now();
  next();
  const delta = Date.now() - timeNow
  console.log(`${req.method} ${req.url} ${delta}ms`);
});

// json middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, reviewing my express basics");
});

app.get("/messages", (req, res) => {
  res.send("Loading messages .....");
});

app.get("/friends", (req, res) => {
  res.json(friends);
});

app.get("/friends/:id", (req, res) => {
  const friendId = Number(req.params.id);
  const friend = friends[friendId];

  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).json({
      error: "friend does not exist",
    });
  }
});

// add new fried
app.post("/friends", (req, res) => {
  if(!req.body.name){
    return res.status(400).json({
      "error" : "No friend name passed"
    })
  }


   const newFriend = {
    id: friends.length,
    name : req.body.name
   }

   friends.push(newFriend)

   res.json(newFriend)
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}, you better catch it!`);
});




