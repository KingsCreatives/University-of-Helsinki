const blogRouter = require("express").Router();
const blog = require("../models/blog");
const Blog = require("../models/blog");

blogRouter.get("/", async(req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
});

blogRouter.post("/", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => next(error));
});

module.exports = blogRouter
