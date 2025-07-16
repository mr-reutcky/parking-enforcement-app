import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/PlateList.css";

function List() {
  const [plates, setPlates] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://your-api-url.com/api/plates") // replace with your real API
      .then(res => {
        const now = new Date();
        const valid = res.data.filter(p => new Date(p.endTime) > now);
        setPlates(valid);
      })
      .catch(err => console.error("Error fetching plates:", err));
  }, []);

  const filtered = plates.filter(p =>
    p.licensePlate.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="list-page">
      <div className="top-bar">
        <h1 className="title">78 Radcliff Rd</h1>
        <Link to="/scanner" className="camera-btn">Use Camera</Link>
      </div>

      <div className="search-container">
        <input
          type="text"
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

        {filtered.map((plate, idx) => (
          <div className="plate-row" key={idx}>
            <span>{plate.spot}</span>
            <span>{plate.licensePlate}</span>
            <span>{new Date(plate.endTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
          </div>
        ))}
      </div>

      <div className="notify-footer">
        <p>Noticed an issue? <a href="#">Notify operations</a></p>
      </div>

      <button className="add-btn">+</button>
    </div>
  );
}

export default List;
