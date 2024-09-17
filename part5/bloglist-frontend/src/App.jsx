import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from './components/LoginForm'
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if(loggedInUser){
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log("There was an error logging you in");
    }
  };

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    window.location.reload();
  }

  return (
    <div>
      <h2>{user ? "blogs" : "log in to application"}</h2>
      <br />
      {!user ? (
        <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin}/>
      ) : (
        <div>
          <div>{user.name} logged in <button onClick={handleLogout}>logout</button></div>
          <br />
          <BlogForm blogs={blogs} setBlogs={setBlogs}/>
          <br />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
