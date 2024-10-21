import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, onDelete }) => {
  const [mode, setMode] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const containerStyle = {
    padding: "10px 15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    width: "80%",
    maxWidth: "700px",
  };

  const titleStyle = {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "5px",
  };

  const buttonStyle = {
    padding: "5px 10px",
    backgroundColor: mode ? "#ff6666" : "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    marginLeft: "10px",
  };

  const detailStyle = {
    marginTop: "10px",
    color: "#555",
  };

  const handleLike = async () => {
    try {
      const updatedBlog = await blogService.update(blog.id);
      setLikes(updatedBlog.likes);
      console.log("Updated Blog:", updatedBlog);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleDeleteBlog = async () => {
    const confirmBlogDeletion = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );
    try {
      if (confirmBlogDeletion) {
         await onDelete(blog.id)
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  return (
    <div style={containerStyle}>
      <div>
        <div style={{display:"flex", justifyContent: "space-between"}}>
          <span style={titleStyle}>{blog.title}</span>
          <button style={buttonStyle} onClick={() => setMode(!mode)}>
            {!mode ? "View" : "Hide"}
          </button>
        </div>

        {mode && (
          <div style={detailStyle}>
            <p>
              URL: <a href={blog.url}>{blog.url}</a>
            </p>
            <p>
              Likes: {likes} <button onClick={handleLike}>Like</button>
            </p>
            <p>Author: {blog.author}</p>
              <button onClick={handleDeleteBlog} style={{background:"blue"}}>remove</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
