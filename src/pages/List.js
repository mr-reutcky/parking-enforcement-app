import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/PlateList.css";
import { motion } from "framer-motion";
import { pageAnimation } from "../components/pageAnimations";

/**
 * formatEndTime
 * Formats a datetime string into a friendly time or date+time,
 * depending on whether the permit ends today.
 */
function formatEndTime(endTimeStr) {
  const end = new Date(endTimeStr);
  const now = new Date();

  const isToday =
    end.getFullYear() === now.getFullYear() &&
    end.getMonth() === now.getMonth() &&
    end.getDate() === now.getDate();

  return isToday
    ? end.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    : end.toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
}

function ValidPlatesList() {
  const [plates, setPlates] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch all permits and filter to only currently valid ones
  useEffect(() => {
    axios
      .get("https://parking-enforcement-server.onrender.com/api/permits", {
        headers: { "x-app-client": "lpr-client" },
      })
      .then((res) => {
        const now = new Date();

        const valid = res.data.filter((p) => {
          const start = new Date(p.permit_start);
          const end = new Date(p.permit_end);
          return start <= now && now <= end;
        });

        setPlates(valid);
      })
      .catch((err) => console.error("Error fetching plates:", err));
  }, []);

  // Apply search filter
  const filtered = plates.filter((p) =>
    p.plate.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div className="list-page" {...pageAnimation}>
      {/* Header with title and camera shortcut */}
      <div className="top-bar">
        <h1 className="title">78 Radcliffe Rd</h1>
        <Link to="/scanner" className="camera-btn">Use Camera</Link>
      </div>

      {/* Search input */}
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search license plates"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Plate results table */}
      <div className="plate-table">
        <div className="plate-header">
          <span>SPOT</span>
          <span>LICENSE PLATE</span>
          <span>END TIME</span>
        </div>

        {filtered.length > 0 ? (
          filtered.map((plate, idx) => (
            <Link
              to={`/details?plate=${encodeURIComponent(plate.plate)}`}
              key={idx}
              className="plate-row-link"
            >
              <div className="plate-row">
                <span>{plate.spot}</span>
                <span>{plate.plate}</span>
                <span>{formatEndTime(plate.permit_end)}</span>
              </div>
            </Link>
          ))
        ) : (
          <div className="no-results">
            <h2>No bookings found</h2>
            <p>We can't find any active</p>
            <p>Bookings matching your search</p>
          </div>
        )}
      </div>

      {/* Persistent notification footer */}
      <div className="notify-footer">
        <p>Noticed an issue? <a href="#">Notify operations</a></p>
      </div>

      {/* Floating add button (currently no handler attached) */}
      <button className="add-btn">+</button>
    </motion.div>
  );
}

export default ValidPlatesList;
