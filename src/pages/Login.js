import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { notification, Spin } from "antd";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const validEmail = "admin@test.com";
    const validPassword = "123456";

    setTimeout(() => {
      if (email === validEmail && password === validPassword) {
        const fakeToken = "mock_token_" + new Date().getTime();
        localStorage.setItem("token", fakeToken);

        notification.success({
          message: "Login Successful",
          description: "Welcome to the dashboard!",
          placement: "topRight",
        });

        navigate("/dashboard");
      } else {
        notification.error({
          message: "Login Failed",
          description: "Invalid email or password",
          placement: "topRight",
        });

        setError("Invalid email or password");
      }

      setLoading(false);
    }, 1200);
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>

      {error && <p className="error-text">{error}</p>}

      <Spin spinning={loading} tip="Authenticating...">
        <form onSubmit={handleLogin}>
          <input
            className="login-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="login-button" type="submit" disabled={loading}>
            Login
          </button>
        </form>
      </Spin>

      <div className="test-credentials">
        <p>
          <b>Test Credentials:</b>
        </p>
        <p>Email: admin@test.com</p>
        <p>Password: 123456</p>
      </div>
    </div>
  );
};

export default Login;
