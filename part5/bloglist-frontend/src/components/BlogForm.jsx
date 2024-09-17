import React from "react";
import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({blogs, setBlogs}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();

    const blogObject = {
      title: title,
      author: author,
      url: url,
    };
    
    blogService
    .create(blogObject)
    .then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setAuthor("");
      setTitle("");
      setUrl("");
      window.location.reload()
    })
    .catch(error => {
      console.error("Failed to create blogs:", error)
    })
  };

  const handleTitleChange = (event) => {
    event.preventDefault();
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    event.preventDefault();
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    event.preventDefault();
    setUrl(event.target.value);
  };

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
