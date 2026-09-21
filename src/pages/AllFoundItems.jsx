
import React from "react";
import { useState, useEffect } from "react";
import "./AllFoundItems.css";

function AllFoundItems() {
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [getimage, setGetImage] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(
      "https://lostandfound-production-33dc.up.railway.app/api/details",
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
      `https://lostandfound-production-33dc.up.railway.app/api/deletefounditem/${id}`,
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
      `https://lostandfound-production-33dc.up.railway.app/found/search?keyword=${getimage}`,
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
    <div className="found-page">
      <nav className="found-navbar">
        <div className="search-box">
          <input
            type="search"
            placeholder="Search found item..."
            value={getimage || ""}
            onChange={(e) => setGetImage(e.target.value)}
          />
          <button type="submit" onClick={searchItem}>
            Search
          </button>
        </div>
      </nav>

      <main className="found-container">
        <div className="found-header">
          <h2>Found Items</h2>
          <p>Browse all items that have been reported as found.</p>
        </div>

        {loading ? (
          <div className="loading-message">
            <p>Loading items...</p>
          </div>
        ) : image.length === 0 ? (
          <div className="empty-message">
            <p>No found items available.</p>
          </div>
        ) : (
          <div className="found-grid">
            {image.map((img) => (
              <div className="found-card" key={img.id}>
                <div className="image-wrapper">
                  <img
                    src={img.imageUrl}
                    alt="Found item"
                  />
                </div>

                <div className="card-content">
                  <button
                    className="delete-button"
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

export default AllFoundItems;

