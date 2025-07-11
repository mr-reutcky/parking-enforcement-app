import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <header className="home-header">
        <h1 className="gryd-logo">
          <span className="gryd-bold">Gryd</span><span className="gryd-green">park</span>
        </h1>
      </header>

      <main className="home-main">
        <div className="main-content">
          <p className="guide-text">Tap below to start scanning license plates.</p>
          <button className="start-button" onClick={() => navigate("/scanner")}>
            Start Scanning
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
