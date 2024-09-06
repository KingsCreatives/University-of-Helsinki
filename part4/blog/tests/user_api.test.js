const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require('mongoose')
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app)
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { usersInDB } = require("./test_helper");

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash, name: "kofi" });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await usersInDB();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await usersInDB();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  test("creation fails with invalid user", async() => {
    const usersAtStart = await usersInDB()
     const newUser = {
       username: "mutahsjsk",
       name: "lk",
       password: "salainen",
     };

     api
       .post("/api/users")
       .send(newUser)
       .expect(400)
       .expect("Content-Type", /application\/json/);
    
      const usersAtEnd = await usersInDB()

      assert.strictEqual(usersAtEnd.length, usersAtStart.length );

      const usernames = usersAtEnd.map((u) => u.username);
      assert(!usernames.includes(newUser.username));
      
  })

  after(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });
});


