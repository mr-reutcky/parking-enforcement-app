import React from "react";
import { Link } from "react-router-dom";
import "../css/PlateScanner.css";
import axios from "axios";

function PlateListItem({ plate }) {
  const plateClass = plate.valid ? "plate-number valid" : "plate-number invalid";
  const buttonClass = plate.valid
    ? "plate-action-button"
    : "plate-action-button report";

  return (
    <li className="plate-list-item">
      <span className={plateClass}>{plate.text}</span>
      <Link
        className={buttonClass}
        to={`/details?plate=${encodeURIComponent(plate.text)}`}
      >
        View Details
      </Link>
    </li>
  );
}

export default PlateListItem;
