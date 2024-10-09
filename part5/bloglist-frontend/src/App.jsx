import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });
  const [loginVisible, setLoginVisible] = useState(false);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (err) {
      showNotification("Wrong username or password", "error");
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedInUser");
    window.location.reload();
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2>{user ? "blogs" : "log in to application"}</h2>
      <div>
        {notification.message && (
          <Notification
            message={notification.message}
            type={notification.type}
          />
        )}
      </div>
      {!user && loginForm()}
      {user && (
        <div>
          <p>
            {user.username} logged in{" "}
            <button onClick={handleLogout}>logout</button>
          </p>
          <div>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm
                blogs={blogs}
                setBlogs={setBlogs}
                showNotification={showNotification}
                blogFormRef={blogFormRef}
              />
            </Togglable>
          </div>
          <ul>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
