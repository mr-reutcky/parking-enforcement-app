import React from "react";

/**
 * PlateGuideBox
 * A visual overlay component that displays corner markers forming a guide box,
 * typically positioned over a live video feed to assist users in aligning license plates
 * for optimal scanning.
 *
 * Props:
 * - width (number): Width of the guide box in pixels
 * - height (number): Height of the guide box in pixels
 */
function PlateGuideBox(props) {
  return (
    <div
      className="plate-guide"
      style={{
        width: `${props.width}px`,
        height: `${props.height}px`,
      }}
    >
      {/* Corner decorations for visual guidance */}

      {/* Top Left Corner */}
      <div className="corner top-left horizontal" />
      <div className="corner top-left vertical" />

      {/* Top Right Corner */}
      <div className="corner top-right horizontal" />
      <div className="corner top-right vertical" />

      {/* Bottom Left Corner */}
      <div className="corner bottom-left horizontal" />
      <div className="corner bottom-left vertical" />

      {/* Bottom Right Corner */}
      <div className="corner bottom-right horizontal" />
      <div className="corner bottom-right vertical" />
    </div>
  );
}

export default PlateGuideBox;
