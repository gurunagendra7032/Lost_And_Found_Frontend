import React, { useState } from "react";
import axios from "axios";
import "./Found.css";  // Import the CSS file

function Found() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [photo, setPhoto] = useState([]);

  async function FileSubmit() {
    if (!image || !title || !description || !location) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

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
      await Bar();

      setSuccess(true);
      setTitle("");
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

  async function sendToBackend(imageUrl) {
    const token = localStorage.getItem("token");
    await fetch("https://lostandfound-production-33dc.up.railway.app/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        imageName: title,
        imageUrl,
        imageDescription: description,
        location,
      }),
    });
  }

  async function Bar() {
    try {
      const token = localStorage.getItem("token");
      const res1 = await fetch("https://lostandfound-production-33dc.up.railway.app/api/details", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res1.json();
      setPhoto(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="found-container">
      <h2 className="title"> Upload Your Found Item</h2>

      <div className="form">
        <input
          type="text"
          placeholder="Enter the Image Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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

        <button onClick={FileSubmit} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>

        {success && <p className="success"> Image Uploaded Successfully...</p>}
        {error && <p className="error">❌ {error}</p>}
      </div>

      <div className="images-bar">
        <h3>Uploaded Items</h3>
        {photo.length > 0 ? (
          <div className="grid">
            {photo.map((item, index) => (
              <div key={index} className="card">
                <img src={item.imageUrl} alt={item.imageName} />
                <h4>{item.imageName}</h4>
                <p>{item.imageDescription}</p>
                <span className="location">📍 {item.location}</span>
              </div>
            ))}
          </div>
        ) : (
          <p>No items found yet.</p>
        )}
      </div>
    </div>
  );
}

export default Found;
