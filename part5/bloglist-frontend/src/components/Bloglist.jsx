import React, {useState, useEffect} from "react";
import blogService from "../services/blogs";
import Blog from "./Blog";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     blogService.getAll().then((blogs) => setBlogs(blogs));
//   }, []);

  const fetchBlogs = async () => {
    const blogsData = await blogService.getAll();
    setBlogs(blogsData);
  };

  const handleBlogDelete = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id)); 
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} onDelete={handleBlogDelete} />
      ))}
    </div>
  );
};

export default BlogList
