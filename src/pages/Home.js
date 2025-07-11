import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/home.css";
import { motion } from "framer-motion";
import { pageAnimation } from "../components/pageAnimations";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("scannedPlates");
  }, []);

  return (
    <motion.div className="home-page" {...pageAnimation}>
      <header className="home-header">
        <h1 className="gryd-logo">
          <span className="gryd-bold">Gryd</span><span className="gryd-green">Park</span>
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
    </motion.div>
  );
};

export default Home;
