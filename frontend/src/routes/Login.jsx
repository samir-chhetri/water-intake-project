import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { loginUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredentials((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/api/auth/login", credentials);

      console.log(response.data);

      setCredentials({
        email: "",
        password: "",
      });

      loginUser(response.data.user);

      navigate("/");
    } catch (error) {
      setError(error.response.data.error || "Something went wrong!");
    }
  };

  return (
    <main className="authpage">
      <div className="wrapper">
        <div className="header">
          <h1 className="title">Login</h1>
        </div>
        <form onSubmit={onSubmit}>
          <div className="content">
            <div className="form-control">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="test@gmail.com"
                required
                value={credentials.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="******"
                required
                value={credentials.password}
                onChange={handleChange}
              />
            </div>
            {error.length !== 0 && <div className="message error">{error}</div>}
            <button type="submit" className="submit-button">
              Login
            </button>
          </div>
        </form>

        <div className="footer">
          <p>
            Don&apos;t have an account?{" "}
            <Link to="/register" replace>
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
