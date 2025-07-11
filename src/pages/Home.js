import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#111",
      }}
    >
      <Link
        to="/scanner"
        style={{
          padding: "20px 40px",
          fontSize: "20px",
          fontWeight: "bold",
          textDecoration: "none",
          borderRadius: "8px",
          backgroundColor: "#007bff",
          color: "white",
          cursor: "pointer",
        }}
      >
        Start Scanning
      </Link>
    </div>
  );
}

export default Home;
