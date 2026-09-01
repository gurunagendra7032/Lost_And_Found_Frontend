import axios from 'axios';
import React from 'react'
import { useState } from 'react'
function Lost() {
  const [filename,setFilename]=useState();
  const [description,setDescription]=useState();
  const [image,setImage]=useState();
  const [error,setError]=useState("");
  const [loading,setLoading]=useState();
  const [upload, setUpload]=useState();
  const [location,setLocation]=useState();
  const [photo,setPhoto]=useState([]);


    async function FileSubmited(){
       if(!filename || !description||!image){
         setError("Fill All Blanks");
         return;
       }
      
      setError("");
      setLoading(false);
      setUpload(true);

      const formData= new FormData();
      formData.append("file",image)
      formData.append("upload_preset", "lost_and_find");

      try{
        const res= await axios.post("https://api.cloudinary.com/v1_1/dxgdjobl8/image/upload",formData)
        const imageUrl = res.data.secure_url;
        setLoading(false)
        await sendToBackend(imageUrl);
        await Lost();
        setLoading(true);
      }
      catch(err){
        console.error(err);
        setError("Upload failed");
      }
      finally{
        setUpload(false);
      }
    }

    async function sendToBackend(url){
       const token = localStorage.getItem("token");
       const back=await fetch("https://lostandfound-production-33dc.up.railway.app/api/lostItem",{
        method:"POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body:JSON.stringify({
        imageName: filename,
        imageUrl: url,
        imageDescription: description,
        location: location
        
      }),
    });
    }

    async function Lost(){
      const token = localStorage.getItem("token");
      const res= await fetch("https://lostandfound-production-33dc.up.railway.app/api/lostitems",{
        method :"GET",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      })
      console.log(res);
    }


  return (
    <>
      <h2>Lost Item</h2>
      <input type="text" placeholder="Enter Image Name" onChange={(e)=>{setFilename(e.target.value)}}/>
      <input type="text" placeholder="Enter Image Description" onChange={(e)=>{setDescription(e.target.value)}}/>
      <input type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
      <input type="text" placeholder='Enter location' onChange={(e)=>{setLocation(e.target.value)}} />
      <input type="submit" onClick={FileSubmited}/>
      {/* {upload ? <p>Uploading...</p>:<p style={{color:'red'}}>Upload failed</p>} */}
     {loading&&<p style={{color:'green'}}> Successfully Uploaded </p>}
     <div>
       {photo.map((item)=>{
        <img src="" alt="" />
       })}
     </div>

    </>
  )
}

export default Lost