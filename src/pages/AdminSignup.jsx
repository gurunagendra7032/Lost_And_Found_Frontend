
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminSignup.css";

function AdminSignup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  async function Submit(e) {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://lostandfound-production-33dc.up.railway.app/adm",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password
          })
        }
      );

      const data = await res.text();

      if (res.ok) {
        setMessage(data);

        // Go to admin login after successful registration
        setTimeout(() => {
          navigate("/admin/login");
        }, 1000);

      } else {
        setMessage(data);
      }

    } catch (error) {
      console.error(error);
      setMessage("Unable to connect to server");
    }
  }

  return (
    <div className="admin-signup-page">

      <div className="admin-signup-box">

        <div className="admin-signup-heading">
          <h2>Admin Registration</h2>
          <p>Create your administrator account</p>
        </div>

        <form onSubmit={Submit}>

          <input
            type="text"
            placeholder="Enter Admin Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Enter Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Create Admin
          </button>

        </form>

        {message && (
          <p className="admin-signup-message">
            {message}
          </p>
        )}

      </div>

    </div>
  );
}

export default AdminSignup;

