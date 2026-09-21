
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [code, setCode] = useState();
  const [retur, setRetur] = useState();

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
          Code:code,
        }),
      }
    );

    const message = await res.text();

    if (res.ok) {
      // Registration successful
      navigate("/");
    } else {
      // Registration failed
      setRetur(message);
    }
  }

  return (
    <>
      <div className="page">
        <div className="signup">

          <div className="heading">
            <h3>Registration</h3>
          </div>

          <div className="details">

            <input
              type="text"
              placeholder="Enter Your Name"
              className="input"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Enter your Email"
              className="input"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter Your Password"
              className="input"
              onChange={(e) => setPassword(e.target.value)}
            />

              <input
              type="text"
              placeholder="Enter Your Code"
              className="input"
              onChange={(e) => setCode(e.target.value)}
            />

            <input
              type="submit"
              className="submit"
              onClick={Submit}
            />

          </div>

          <div className="return">
            <p>{retur}</p>
          </div>

        </div>
      </div>
    </>
  );
}

export default Signup;

