const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user");
  res.json(blogs);
});

blogRouter.post("/", middleware.userExtractor, async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "user not found" });
    }

    const blog = new Blog({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes || 0,
      user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", middleware.userExtractor, async (req, res) => {
  try {
    const blogId = req.params.id;

    const user = req.user;
    if (!user) {
      return res.status(404).json({ error: "invalid user" });
    }
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "blog not found" });
    }

    if (blog.user.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({ error: "only the creator can delete this blog" });
    }

    await Blog.findByIdAndDelete(blogId);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "something went wrong" });
  }
});

blogRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { likes } = req.body;

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
