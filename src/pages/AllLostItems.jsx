import React from 'react'
import { useState,useEffect } from 'react';

function AllLostItems() {
    
     const [image,setImage]=useState([]);
     const [loading, setLoading] = useState(true);
     const [getimage,setGetImage]=useState();
    
        useEffect(() => {
          const token = localStorage.getItem("token");
        fetch("https://lostandfound-production-33dc.up.railway.app/api/lostitems", {

        method: "GET",
         headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,   // ✅ ADD THIS
         },
        })

          // change if needed
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to fetch images");
            }
            return res.json();
          })
          .then((data) => {
            setImage(data);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Error:", err);
            setLoading(false);
          });
      }, [])


     
          
      

  const deleteItem = (id) => {
    const token = localStorage.getItem("token");
  fetch(`https://lostandfound-production-33dc.up.railway.app/api/deletelostitem/${id}`, {
    method: "DELETE",
     headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,   // ✅ ADD THIS
         },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      setImage(image.filter((img) => img.id !== id));
    })
    .catch((err) => {
      console.error("Delete error:", err);
    });
};

 const searchItem = () => {

  const token = localStorage.getItem("token");

  fetch(`https://lostandfound-production-33dc.up.railway.app/lost/search?keyword=${getimage}`, {

    method: "GET",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

  })
    .then((res) => res.json())
    .then((data) => {
      setImage(data);
    })
    .catch((err) => {
      console.log(err);
    });
};


    
  return (
       <>
       <nav ><input type="search" placeholder="Enter Item" onChange={(e)=>setGetImage(e.target.value)}/><button type='submit' onClick={searchItem}>submit</button></nav>
       <div>
           <div style={{ textAlign: "center" }}>
          <h2>Image Gallery</h2>
    
          {image.length === 0 ? (
            <p>No images found</p>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "10px",
              padding: "20px"
            }}>
              {image.map((img) => (
                <div key={img.id}>
                  <img
                    src={img.imageUrl} // must match backend field
                    alt="img"
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "10px"
                    }}
                  /><button onClick={()=>deleteItem(img.id)}> Delete </button>
                </div>
              ))}
            </div>
          )}
        </div>
       </div>
    </>
      )
    }
    
    
    export default AllLostItems;

