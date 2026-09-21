
import axios from "axios";
import React, { useState } from "react";
import "./Lost.css";

function Lost() {
  const [filename, setFilename] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState([]);

  async function FileSubmited() {
    if (!filename || !description || !image || !location) {
      setError("All fields are required");
      return;
    }

    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "lost_and_find");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dxgdjobl8/image/upload",
        formData
      );

      const imageUrl = res.data.secure_url;

      await sendToBackend(imageUrl);
      await Lost();

      setFilename("");
      setDescription("");
      setLocation("");
      setImage(null);

    } catch (err) {
      console.error(err);
      setError("Upload failed");
    } finally {
      setLoading(false);
    }
  }

  async function sendToBackend(url) {
    const token = localStorage.getItem("token");

    await fetch(
      "https://lostandfound-production-33dc.up.railway.app/api/lostItem",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          imageName: filename,
          imageUrl: url,
          imageDescription: description,
          location: location,
        }),
      }
    );
  }

  async function Lost() {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://lostandfound-production-33dc.up.railway.app/api/lostitems",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setPhoto(data);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="lost-container">

      <h2 className="title">Upload Your Lost Item</h2>

      <div className="form">

        <input
          type="text"
          placeholder="Enter the Image Title"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Image Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button onClick={FileSubmited} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>

        {!loading && photo.length > 0 && (
          <p className="success">
            Item Uploaded Successfully
          </p>
        )}

        {error && (
          <p className="error">
            {error}
          </p>
        )}

      </div>

     

    </div>
  );
}

export default Lost;
