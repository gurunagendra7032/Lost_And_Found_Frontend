import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

 function changeSingup() {
    navigate("/signup");   // ✅ Navigate using route path
  }

  async function handleLogin() {
    try {
      const res = await fetch("https://lostandfound-production-33dc.up.railway.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

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
    <div className="page">
      <div className="Login">
        <h2 className="heading">Login</h2>

        <input
          type="text"
          placeholder="Enter Your Email"
          className="fields"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Your Password"
          className="fields"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="submit"
          value="Login"
          className="submit"
          onClick={handleLogin}
        />
      
      <div onClick={changeSingup}> Are you new user ?</div>
      </div>
    </div>
  );
}

export default Login;