import React from "react";
import PlateListItem from "./PlateListItem";
import "../css/PlateScanner.css";

function PlateList({ plates }) {
  return (
    <div className="plate-list">
      <ul>
        {plates.map((plate, index) => (
          <PlateListItem key={index} plate={plate} />
        ))}
      </ul>
    </div>
  );
}

export default PlateList;
