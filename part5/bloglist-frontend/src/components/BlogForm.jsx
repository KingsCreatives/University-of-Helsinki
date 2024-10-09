import React, { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ blogs, setBlogs, showNotification, blogFormRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title,
      author,
      url,
    };
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));

      blogFormRef.current.toggleVisibility();

      setAuthor("");
      setTitle("");
      setUrl("");
      showNotification(`a new blog "${title}" by ${author} added`);
    } catch (error) {
      showNotification("Failed to create blog", "error");
    }
  };

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
