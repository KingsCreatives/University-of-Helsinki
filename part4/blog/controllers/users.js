const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  try {
     if(username.length > 2 && password.length > 2){
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const user = new User({
        username,
        name,
        passwordHash,
      });

      const savedUser = await user.save();

      res.status(201).json(savedUser);
     }else{
      res.status(400).json({error: "Invalid user data, username and password must 3 characters or more"})
     }
  } catch (error) {
    console.log(error)
  }
});

usersRouter.get('/', async(req, res) => {
  const users = await User.find({}).populate('blogs')
  res.status(200).json(users)
})

module.exports = usersRouter;
