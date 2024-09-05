const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async(req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
});

blogRouter.post("/", async(req, res) => {
  const body = req.body
  
  try{
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
    })

    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)
  } catch(error){
    res.status(400).send({error: 'Title or URL is missing'})
  }
});

module.exports = blogRouter
