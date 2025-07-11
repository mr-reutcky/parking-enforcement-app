import React from "react";
import PlateListItem from "./PlateListItem";

function PlateList({ plates }) {
  return (
    <div className="plate-list">
      {plates.length === 0 ? (
        <div className="empty-plate-message">No Plates Scanned</div>
      ) : (
        <ul>
          {plates.map((plate, index) => (
            <PlateListItem key={index} plate={plate} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default PlateList;
