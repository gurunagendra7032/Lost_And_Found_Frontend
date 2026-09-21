
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [retur, setRetur] = useState("");

  const navigate = useNavigate();

  async function Submit() {
    const res = await fetch(
      "https://lostandfound-production-33dc.up.railway.app/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          Code: code,
        }),
      }
    );

    const message = await res.text();

    if (res.ok) {
      navigate("/");
    } else {
      setRetur(message);
    }
  }

  return (
    <div className="page">
      <div className="signup">

        <div className="heading">
          <h3>Registration</h3>
          <p>Create your account</p>
        </div>

        <div className="details">

          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Code</label>
            <input
              type="text"
              placeholder="Enter your code"
              className="input"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Register"
            className="submit"
            onClick={Submit}
          />

        </div>

        <div className="return">
          <p>{retur}</p>
        </div>

      </div>
    </div>
  );
}

export default Signup;

