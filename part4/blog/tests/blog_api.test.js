const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require('../models/blog')
const {initialBlogs} = require('./test_helper')
const api = supertest(app);




beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("notes are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("the unique identifier property of a blog post is named 'id'", async () => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://example.com",
    likes: 5,
  };

  // Post the new blog to the database
  const response = await api.post("/api/blogs").send(blog);

  const returnedBlog = response.body;

    const expectedBlog = {
      title: "Test Blog",
      author: "Test Author",
      url: "http://example.com",
      likes: 5,
      id: returnedBlog.id, 
    };

   assert.deepStrictEqual(returnedBlog, expectedBlog)
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
    .send(blog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length + 1)
});

test("blog without likes default to 0", async () => {
  const blog = {
    title: "Chat bad",
    author: "Kewa Kesi",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  };

  const response = await api.post('/api/blogs').send(blog)

  assert.deepStrictEqual(response.body.likes, 0)
})

test("blog without title or url", async () => {
  const blog = {
    author: "Edsger W. Dijkstra",
    likes: 0,
  };

  await api
        .post('/api/blogs')
        .send(blog)
        .expect(400)

})

after(async () => {
  await mongoose.connection.close();
});