import React from "react";
import PlateListItem from "./PlateListItem";

/**
 * PlateList
 * Displays a list of scanned license plates. If no plates are present, 
 * shows a fallback message.
 *
 * Props:
 * - plates (array): Array of license plate strings or objects to be rendered as list items
 */
function PlateList({ plates }) {
  return (
    <div className="plate-list">
      {/* Show message if no plates have been scanned */}
      {plates.length === 0 ? (
        <div className="empty-plate-message">No Plates Scanned</div>
      ) : (
        <ul>
          {/* Render each plate using PlateListItem component */}
          {plates.map((plate, index) => (
            <PlateListItem key={index} plate={plate} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default PlateList;
