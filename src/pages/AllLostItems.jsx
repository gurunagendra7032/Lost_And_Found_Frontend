
import React from "react";
import { useState, useEffect } from "react";
import "./AllLostItems.css";

function AllLostItems() {
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [getimage, setGetImage] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(
      "https://lostandfound-production-33dc.up.railway.app/api/lostitems",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
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
  }, []);

  const deleteItem = (id) => {
    const token = localStorage.getItem("token");

    fetch(
      `https://lostandfound-production-33dc.up.railway.app/api/deletelostitem/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
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

    fetch(
      `https://lostandfound-production-33dc.up.railway.app/lost/search?keyword=${getimage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setImage(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="lost-page">

      <nav className="lost-navbar">
        <div className="lost-search-box">
          <input
            type="search"
            placeholder="Search lost item..."
            value={getimage || ""}
            onChange={(e) => setGetImage(e.target.value)}
          />

          <button type="submit" onClick={searchItem}>
            Search
          </button>
        </div>
      </nav>

      <main className="lost-container">

        <div className="lost-header">
          <h2>Lost Items</h2>
          <p>Browse all items that have been reported as lost.</p>
        </div>

        {loading ? (
          <div className="lost-message">
            <p>Loading items...</p>
          </div>
        ) : image.length === 0 ? (
          <div className="lost-message">
            <p>No lost items available.</p>
          </div>
        ) : (
          <div className="lost-grid">

            {image.map((img) => (

              <div className="lost-card" key={img.id}>

                <div className="lost-image-wrapper">
                  <img
                    src={img.imageUrl}
                    alt="Lost item"
                  />
                </div>

                <div className="lost-card-content">

                  <button
                    className="lost-delete-button"
                    onClick={() => deleteItem(img.id)}
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </main>

    </div>
  );
}

export default AllLostItems;

