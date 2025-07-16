import React from "react";
import { Link } from "react-router-dom";
import "../css/PlateScanner.css";
import axios from "axios"; // Currently unused — consider removing if not needed

/**
 * PlateListItem
 * Renders a single scanned plate entry with a link to its detail view.
 *
 * Props:
 * - plate (object): { text: string, valid: boolean }
 */
function PlateListItem({ plate }) {
  // Conditional class based on plate validity
  const plateClass = plate.valid ? "plate-number valid" : "plate-number invalid";
  const buttonClass = plate.valid
    ? "plate-action-button"
    : "plate-action-button report"; // Apply different styling if the plate is invalid

  return (
    <li className="plate-list-item">
      <span className={plateClass}>{plate.text}</span>

      {/* Link to detailed view, passing the plate text as a query param */}
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
