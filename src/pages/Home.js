import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/home.css";
import { motion } from "framer-motion";
import { pageAnimation } from "../components/pageAnimations";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any previously stored scan data
    localStorage.removeItem("scannedPlates");

    // Ping backend to "wake" the Render server (helps with cold start)
    axios.get("https://parking-enforcement-server.onrender.com/", {
      headers: { "x-app-client": "lpr-client" }
    })
    .then((response) => {
      console.log("Server is running:", response.data);
    })
    .catch((error) => {
      console.error("Error checking server health:", error);
    });
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

          {/* Button to navigate to the scanner list page */}
          <button className="start-button" onClick={() => navigate("/list")}>
            Start Scanning
          </button>
        </div>
      </main>
    </motion.div>
  );
};

export default Home;
