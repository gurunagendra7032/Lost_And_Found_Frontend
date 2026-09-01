import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Admin.css";

function Admin() {

  const [totalFound, setTotalFound] = useState(0);
  const [totalLost, setTotalLost] = useState(0);
  const [storageItems, setStorageItems] = useState(0);
  const [returnItems, setReturnItems] = useState(0);


  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");

    // Total Found Items
    fetch("http://localhost:8080/admin/Allfounditems", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setTotalFound(data);
      })
      .catch(error => {
        console.error(error);
      });


    // Total Lost Items
    fetch("http://localhost:8080/admin/AlllostItems", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setTotalLost(data);
      })
      .catch(error => {
        console.error(error);
      });


    // Currently Stored Items
    fetch("http://localhost:8080/admin/currentStorageItems", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setStorageItems(data);
      })
      .catch(error => {
        console.error(error);
      });



      fetch("https://lostandfound-production-33dc.up.railway.app/admin/countReturnItems",{
         headers: {
        Authorization: `Bearer ${token}`,
      },

      })
      .then(response => response.json())
      .then(data => {
        setReturnItems(data);
      })
      .catch(error => {
        console.error(error);
      });

  }, []);


  return (
    <>
      <div className="admin">
        <h1>ADMIN DASH BOARD</h1>
      </div>


      <div
        className="found"
        onClick={() => navigate("/admin/founditems")}
      >
        <h3>Total Found Items</h3>
        <h2>{totalFound}</h2>
      </div>


      <div
        className="lost"
        onClick={() => navigate("/admin/lostitems")}
      >
        <h3>Total Lost Items</h3>
        <h2>{totalLost}</h2>
      </div>


      <div
        className="storage"
        onClick={() => navigate("/admin/CurrentStorageItems")}
      >
        <h3>Currently Stored Items</h3>
        <h2>{storageItems}</h2>
      </div>

      <div
        className="found"
        onClick={() => navigate("/admin/returnItems")}
      >
        <h3>Total Handover Items</h3>
        <h2>{returnItems}</h2>
      </div>


    </>
  );
}

export default Admin;