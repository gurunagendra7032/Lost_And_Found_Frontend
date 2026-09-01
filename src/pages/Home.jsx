import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="home-page">

      {/* Navigation */}
      <nav className="Navigation">
        <div className="Logo">
          <h2>Lost & Found</h2>
        </div>

        <div className="side">
          <button
            className="nav-link"
            onClick={() => navigate("/allfounditems")}
          >
            My Found Items
          </button>

          <button
            className="nav-link"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Welcome Section */}
      <section className="welcome">
        <h1>Welcome to Lost & Found</h1>
        <p>
          Report lost items, submit found items, and help reunite belongings
          with their owners.
        </p>
      </section>

      {/* Main Actions */}
      <section className="action-section">

        <div
          className="action-card"
          onClick={() => navigate("/found")}
        >
          <div className="icon"></div>
          <h2>Report Found Item</h2>
          <p>
            Found something that belongs to someone else?
            Submit the item and help return it to its owner.
          </p>

          <button>Report Found Item</button>
        </div>

        <div
          className="action-card"
          onClick={() => navigate("/lost")}
        >
          <div className="icon"></div>
          <h2>Report Lost Item</h2>
          <p>
            Lost something? Provide the details so others can
            help you find your belongings.
          </p>

          <button>Report Lost Item</button>
        </div>

      </section>

      {/* My Items */}
      <section className="my-items">

        <h2>My Items</h2>

        <div className="item-buttons">

          <button
            onClick={() => navigate("/allfounditems")}
          >
            View My Found Items
          </button>

          <button
            onClick={() => navigate("/alllostitems")}
          >
            View My Lost Items
          </button>

        </div>

      </section>

    </div>
  );
}

export default Home;