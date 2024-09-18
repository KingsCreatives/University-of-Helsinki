import React, { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ blogs, setBlogs, showNotification }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();

    const blogObject = {
      title: title,
      author: author,
      url: url,
    };

    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      setAuthor("");
      setTitle("");
      setUrl("");
      showNotification(`a new blog "${title}" by ${author} added`);
    } catch (error) {
      console.error("Failed to create blogs:", error);
      showNotification("Failed to create blog", "error");
    }
  };

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleAuthorChange = (event) => setAuthor(event.target.value);
  const handleUrlChange = (event) => setUrl(event.target.value);

  return (
    <div>
      <h2>create new blog</h2>
      <br />
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="url"
            onChange={handleUrlChange}
          />
        </div>
        <br />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
