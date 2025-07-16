import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/PlateList.css";

function ValidPlatesList() {
  const [plates, setPlates] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://parking-enforcement-server.onrender.com/api/permits", { headers: {"x-app-client": "lpr-client"} })
      .then(res => {
        const now = new Date();

        const valid = res.data.filter(p => {
          const start = new Date(p.permit_start);
          const end = new Date(p.permit_end);
          return start <= now && now <= end;
        });

        setPlates(valid);
      })
      .catch(err => console.error("Error fetching plates:", err));
  }, []);

  const filtered = plates.filter(p =>
    p.plate.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="list-page">
      <div className="top-bar">
        <h1 className="title">78 Radcliffe Rd</h1>
        <Link to="/scanner" className="camera-btn">Use Camera</Link>
      </div>

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
                <span>{new Date(plate.permit_end).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
              </div>
            </Link>
          ))
        ) : (
          <div className="no-results">No valid plates found.</div>
        )}
      </div>

      <div className="notify-footer">
        <p>Noticed an issue? <a href="#">Notify operations</a></p>
      </div>

      <button className="add-btn">+</button>
    </div>
  );
}

export default ValidPlatesList;
