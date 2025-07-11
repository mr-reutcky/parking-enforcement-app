import React from "react";
import { Link } from "react-router-dom";
import "../css/PlateScanner.css";

function PlateListItem({ plate }) {
  const plateClass = plate.valid ? "plate-number valid" : "plate-number invalid";
  const actionLabel = plate.valid ? "View Details" : "New Report";
  const route = plate.valid ? "/details" : "/report";
  const buttonClass = plate.valid
    ? "plate-action-button"
    : "plate-action-button report";

  return (
    <li className="plate-list-item">
      <span className={plateClass}>{plate.text}</span>
      <Link
        className={buttonClass}
        to={`${route}?plate=${encodeURIComponent(plate.text)}`}
      >
        {actionLabel}
      </Link>
    </li>
  );
}

export default PlateListItem;
