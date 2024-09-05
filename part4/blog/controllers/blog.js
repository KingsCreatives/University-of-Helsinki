const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  const body = req.body;

  try {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
    });

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).send({ error: "Title or URL is missing" });
  }
});

blogRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Blog.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "something went wrong" });
  }
});

blogRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const {likes} = req.body
  
    try {
      const blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }

      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { $inc: { likes: 1 } },
        { new: true }
      );

      res.status(200).json(updatedBlog);
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: "Something went wrong" });
    }
});

module.exports = blogRouter;
