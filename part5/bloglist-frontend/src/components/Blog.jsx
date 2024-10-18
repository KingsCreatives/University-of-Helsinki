import { useState } from "react";

const Blog = ({ blog }) => {
  const [mode, setMode] = useState(false);

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

  return (
    <div style={containerStyle}>
      <div>
      
        <span style={titleStyle}>{blog.title}</span>
        <button style={buttonStyle} onClick={() => setMode(!mode)}>
          {!mode ? "View" : "Hide"}
        </button>

        {mode && (
          <div style={detailStyle}>
            <p>
              URL: <a href={blog.url}>{blog.url}</a>
            </p>
            <p>
              Likes: 0 <button>Like</button>
            </p>
            <p>Author: {blog.author}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
