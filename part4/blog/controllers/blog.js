const jwt = require("jsonwebtoken");
const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user");
  res.json(blogs);
});

blogRouter.post("/", async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!decodedToken.id) {
      return res.status(401).json({ error: "token invalid" });
    }
    const user = await User.findById(decodedToken.id);

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

//   const body = req.body;

//   const decodedToken = jwt.verify(req.token, process.env.SECRET);
//   if (!decodedToken.id) {
//     return response.status(401).json({ error: "token invalid" });
//   }

//   const user = await User.findById(decodedToken.id);

//   const blog = new Blog({
//     title: body.title,
//     author: body.author,
//     url: body.url,
//     likes: body.likes || 0,
//     user: user.id,
//   });

//   const savedBlog = await blog.save();
//   user.blogs = user.blogs.concat(savedBlog._id);
//   await user.save();

//   res.status(201).json(savedBlog);
// });

blogRouter.delete("/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    
    if (!req.token) {
      return res.status(401).json({ error: "request must include a token" });
    }

    if (!user) {
      return res.status(401).json({ error: "invalid user" });
    }

    const decodedToken = jwt.verify(req.token, process.env.SECRET);

    if (!decodedToken.id) {
      return res.status(401).json({ error: "token invalid" });
    }

    const blog = await Blog.findById(blogId);
    if(!blog){
      return res.status(404).json({ error: "blog not found" });
    }

    if (blog.user.toString() !== decodedToken.id.toString()) {
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
