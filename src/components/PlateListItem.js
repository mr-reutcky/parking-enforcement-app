import React from "react";
import "../css/PlateScanner.css";

function PlateListItem({ plate }) {
  const colorClass = plate.valid ? "valid-plate" : "invalid-plate";

  return (
    <li className={`plate-list-item ${colorClass}`}>
      {plate.text}
    </li>
  );
}

export default PlateListItem;
