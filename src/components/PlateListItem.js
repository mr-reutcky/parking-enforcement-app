import React from "react";
import "../css/PlateScanner.css";

function PlateListItem({ plate }) {
  const plateClass = plate.valid ? "plate-number valid" : "plate-number invalid";

  return (
    <li className="plate-list-item">
      <span className={plateClass}>{plate.text}</span>
      <span className="plate-owner">{plate.owner || "Unknown"}</span>
    </li>
  );
}

export default PlateListItem;
