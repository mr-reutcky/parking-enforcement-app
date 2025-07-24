import React, { useState } from "react";
import "../css/ReportForm.css";
import { IoClose } from "react-icons/io5";

/**
 * ReportReview
 * Final step in the report process where the user selects the action taken,
 * views vehicle report history, and submits the report.
 */
function ReportReview({ formData, setFormData, navigate }) {
  const [showModal, setShowModal] = useState(false); // Controls the success modal visibility

  // Updates the selected action in formData
  const handleSelectAction = (action) => {
    setFormData({ ...formData, actionTaken: action });
  };

  // Navigates back to media upload step
  const handleBack = () => {
    navigate("/report/media");
  };

  // Handles report submission with success modal + auto-redirect to /list
  const handleSubmit = () => {
    if (!formData.actionTaken) return;

    // Optionally replace this with an API call to submit the report
    setShowModal(true);

    // After 2 seconds, close modal and return to report list
    setTimeout(() => {
      setShowModal(false);
      navigate("/list");
    }, 2000);
  };

  return (
    <div className="report-form-container">
      <h1>New Report</h1>
      {/* Exit icon to return to the report list */}
      <IoClose className="close-icon" onClick={() => navigate("/list")} />

      {/* Progress bar - all steps filled at this stage */}
      <div className="progress-bar">
        <div className="progress-step filled" />
        <div className="progress-step filled" />
        <div className="progress-step filled" />
      </div>

      {/* Report history and suggested action box */}
      <div className="alert-box">
        <p>This parker has been reported <strong>0 times</strong></p>
        <p><strong>Recommended action:</strong> Leave GrydPark parking reminder on the windshield.</p>
      </div>

      {/* Action selection buttons */}
      <div className="report-action-section">
        <h3>Action taken</h3>
        <button
          className={`btn ${formData.actionTaken === "warning" ? "selected" : ""}`}
          onClick={() => handleSelectAction("warning")}
        >
          Warning issued / ticketed
        </button>
        <button
          className={`btn ${formData.actionTaken === "towed" ? "selected" : ""}`}
          onClick={() => handleSelectAction("towed")}
        >
          Vehicle towed
        </button>
      </div>

      {/* Navigation + Submit button */}
      <div className="report-btn-group">
        <button className="btn" onClick={handleBack}>Previous</button>
        <button
          className="btn"
          onClick={handleSubmit}
          disabled={!formData.actionTaken}
        >
          Submit
        </button>
      </div>

      {/* Confirmation modal shown after submission */}
      {showModal && (
        <div className="modal fade-in">
          <div className="modal-content scale-in">
            <div className="check-icon">✅</div>
            <p className="modal-message">Report submitted successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportReview;
