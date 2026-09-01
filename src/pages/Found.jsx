import React, { useState } from "react";
import axios from "axios";

function Found() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [location,setLocation]=useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [photo,setPhoto]=useState([]);
 
 

  async function FileSubmit() {
    
    if (!image || !title || !description) {
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
    } catch (err) {
      console.error(err);
      setError("Upload failed");
    } finally {
      setLoading(false);
    }
  }
 

  async function sendToBackend(imageUrl) {
    const token = localStorage.getItem("token");
    const response = await fetch("https://lostandfound-production-33dc.up.railway.app/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        imageName: title,
        imageUrl: imageUrl,
        imageDescription: description,
        location:location,
      }),
     
     
    });
    
  }

  


  async function Bar() {
  try {
    const token = localStorage.getItem("token");
    console.log(token);

    const res1 = await fetch("https://lostandfound-production-33dc.up.railway.app/api/details", {
      method: "GET",
      headers: {
          Authorization: `Bearer ${token}`,
        },
    });
  
    const data = await res1.json();   // convert response to json
    // console.log(data);
       setPhoto(data)          // use data
    // return data;
     } catch (error) {
    console.log(error);
  }

 
   }
  
    
  

  return (
    <>
    <div style={{ padding: "20px" }}>
      <h2>Upload Found Item Image</h2>

      <input
        type="text"
        placeholder="Enter the Image Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter Image Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />

       <input
        type="text"
        placeholder="Enter location"
        onChange={(e) => setLocation(e.target.value)}
      />

      <button onClick={FileSubmit} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {success && <p style={{ color: "green" }}>File Uploaded Successfully ✅</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
   <div className="ImagesBar">
 
 
</div>

    </>
  );
}

export default Found;
