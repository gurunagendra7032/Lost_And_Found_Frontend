
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function changeSingup() {
    navigate("/signup");
  }

  function changeSingupAdmin() {
    navigate("/admin/Signup");
  }

  async function handleLogin() {
    try {
      const res = await fetch(
        "https://lostandfound-production-33dc.up.railway.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (!res.ok) {
        alert("Invalid email or password");
        return;
      }

      const token = await res.text();

      if (!token) {
        alert("Login failed");
        return;
      }

      // Store JWT
      localStorage.setItem("token", token);

      // Decode JWT
      const decoded = jwtDecode(token);

      console.log("JWT:", decoded);
      console.log("Role:", decoded.role);

      // Navigate based on role
      if (decoded.role === "ROLE_ADMIN" || decoded.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (decoded.role === "ROLE_USER" || decoded.role === "USER") {
        navigate("/homepage");
      } else {
        alert("Unknown role");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Login to your Lost & Found account</p>
        </div>

        <div className="login-form">

          <div className="login-input-group">
            <label>Email</label>

            <input
              type="text"
              placeholder="Enter your email"
              className="login-field"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              className="login-field"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Login"
            className="login-submit"
            onClick={handleLogin}
          />

        </div>

        <div className="login-links">

          <div
            className="login-link"
            onClick={changeSingup}
          >
            Are you a new user?
          </div>

          <div
            className="login-link admin-link"
            onClick={changeSingupAdmin}
          >
            Are you a new Admin?
          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;
