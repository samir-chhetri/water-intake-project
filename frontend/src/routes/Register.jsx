import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [credentials, setCredentials] = useState({
    username: "",
    age: "",
    email: "",
    password: "",
    jobType: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

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
    console.log(credentials);
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      const response = await axios.post("/api/auth/register", {
        ...credentials,
        age: parseInt(credentials.age),
      });

      setSuccess(response.data.message);
      setCredentials({
        username: "",
        age: "",
        jobType: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setError(error.response.data.error || "Something went wrong!");
    }
  };

  return (
    <main className="authpage">
      <div className="wrapper">
        <div className="header">
          <h1 className="title">Sign Up</h1>
        </div>
        <form onSubmit={onSubmit}>
          <div className="content">
            <div className="form-control">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Test user"
                value={credentials.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                placeholder=""
                value={credentials.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="jobType">Job Type</label>
              <input
                type="text"
                id="jobType"
                name="jobType"
                placeholder="field worker"
                value={credentials.jobType}
                onChange={handleChange}
                required
              />

              <div className="form-control">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="test@gmail.com"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-control">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="******"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {success.length !== 0 && (
                <div className="message success">{success}</div>
              )}

              {error.length !== 0 && (
                <div className="message error">{error}</div>
              )}
              <button type="submit" className="submit-button">
                Register
              </button>
            </div>
          </div>
        </form>

        <div className="footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" replace>
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
