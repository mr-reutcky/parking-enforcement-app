import React from "react";
import "../css/ReportForm.css";
import { IoClose } from "react-icons/io5"; 

/**
 * VehicleDetailsForm
 * Step 1 of the report creation flow: captures vehicle-related information.
 * Fields include: spot, plate, make, model, color.
 */
function VehicleDetailsForm({ formData, setFormData, navigate }) {

  // Updates the formData state when input fields change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Navigate to the media upload step only if all required fields are filled
  const handleNext = () => {
    const { spot, plate, make, model, color } = formData;
    if (spot && plate && make && model && color) {
      navigate("media");
    }
  };

  // Utility to check if all vehicle detail fields are filled
  const isFormComplete = () => {
    const { spot, plate, make, model, color } = formData;
    return spot && plate && make && model && color;
  };

  return (
    <div className="report-form-container">
      {/* Header with close icon to exit the report flow */}
      <div className="report-header">
        <h1>New Report</h1>
        <IoClose className="close-icon" onClick={() => navigate("/list")} />
      </div>

      {/* Progress bar indicating current step */}
      <div className="progress-bar">
        <div className="progress-step filled" />
        <div className="progress-step" />
        <div className="progress-step" />
      </div>

      <h3 className="section-title">Vehicle details</h3>

      {/* Input fields for vehicle details */}
      {["spot", "plate", "make", "model", "color"].map((field) => (
        <div key={field} className="report-review-group">
          <input
            name={field}
            type="text"
            placeholder={
              field === "plate"
                ? "License Plate"
                : field === "spot"
                ? "Spot Number"
                : `Vehicle ${field.charAt(0).toUpperCase() + field.slice(1)}`
            }
            value={formData[field]}
            onChange={handleChange}
            required
          />
        </div>
      ))}

      {/* Navigation buttons */}
      <div className="report-btn-group">
        <button
          className={`btn ${!isFormComplete() ? "disabled" : ""}`}
          onClick={handleNext}
          disabled={!isFormComplete()}
        >
          Next
        </button>
        <button disabled className="btn disabled">Previous</button>
      </div>
    </div>
  );
}

export default VehicleDetailsForm;
