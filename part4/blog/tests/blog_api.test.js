const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const { initialBlogs, blogsInDb} = require("./test_helper");
const api = supertest(app);
const jwt = require("jsonwebtoken");
const User = require("../models/user");

let token;

const generateToken = async () => {
  const user = new User({
    username: "testuser",
    name: "Test User",
    passwordHash:
      "$2b$10$TEeGljteeyHlZMSmJB138eLjtqUqcbD1rvqvy1HiWyBFwr3qRU0BS",
  });
  await user.save();
  const userForToken = { id: user._id };
  return jwt.sign(userForToken, process.env.SECRET);
};

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  await Blog.insertMany(initialBlogs);
  token = await generateToken();
});

describe("when there is initially some blogs save", () => {
  test("notes are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const res = await api.get("/api/blogs");

    assert.strictEqual(res.body.length, initialBlogs.length);
  });
});

describe("addition of a new blog", () => {
  beforeEach(async () => {
    const existingUser = await User.findOne({ username: "testuser" });
    if (!existingUser) {
      await User.create({ username: "testuser", ...otherFields });
    }
  })

  test("the unique identifier property of a blog post is named 'id'", async () => {
    const blog = {
      title: "Test Blog",
      author: "Test Author",
      url: "http://example.com",
      likes: 5,
    };

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(blog);

    const returnedBlog = response.body;

    const expectedBlog = {
      title: "Test Blog",
      author: "Test Author",
      url: "http://example.com",
      likes: 5,
      id: returnedBlog.id, 
    };

    assert.deepStrictEqual(
      { ...returnedBlog, user: undefined }, 
      { ...expectedBlog, user: undefined } 
    );
  });

  
  test("the blog successfully created", async () => {
    const blog = {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(blog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, initialBlogs.length + 1);
  });

  test("blog without likes default to 0", async () => {
    const blog = {
      title: "Chat bad",
      author: "Kewa Kesi",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    };

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(blog);
    assert.deepStrictEqual(response.body.likes, 0);
  });

  test("blog without title or url", async () => {
    const blog = {
      author: "Edsger W. Dijkstra",
      likes: 0,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(blog)
      .expect(400);
  });
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await blogsInDb();
    const blogToDelete = blogsAtStart[0];
    
    
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await blogsInDb();

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);

    const blog = blogsAtEnd.map((r) => r.title);
    assert(!blog.includes(blogToDelete.title));
  });
});

describe("update likes of a blog", () => {
  test("return 404 error if id is invalid", async () => {
    await api
      .put("/api/blogs/invalidid")
      .send({ likes: 10 })
      .expect(404)
      .expect("Content-Type", /application\/json/);
  });

  test("increment likes by 1 if id is valid", async () => {
    const blogsAtStart = await blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: blogToUpdate.likes + 1})
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await blogsInDb();
    const updatedBlog = blogsAtEnd.find((b) => b.id === blogToUpdate.id);

    assert.strictEqual(updatedBlog.likes, blogToUpdate.likes + 1);
  });
});

after(async () => {
  await mongoose.connection.close();
});
