import React from "react";
import "../css/ReportForm.css";
import { IoClose } from "react-icons/io5"; // Close (X) icon from react-icons

/**
 * MediaUploadForm
 * Step 2 of 3 in the report creation flow.
 * Allows users to optionally upload images and write notes for the report.
 */
function MediaUploadForm({ formData, setFormData, navigate }) {
  // Handle file input change — limit to 3 images
  const handleMediaChange = (e) => {
    setFormData({ ...formData, media: Array.from(e.target.files).slice(0, 3) });
  };

  // Handle notes textarea change
  const handleNotesChange = (e) => {
    setFormData({ ...formData, notes: e.target.value });
  };

  // Navigate to the next step (review)
  const handleNext = () => {
    navigate("/report/review");
  };

  // Go back to vehicle details step
  const handleBack = () => {
    navigate("/report");
  };

  return (
    <div className="report-form-container">
      <h1>New Report</h1>
      {/* Exit icon to return to list page */}
      <IoClose className="close-icon" onClick={() => navigate("/list")} />

      {/* Progress bar step 2 of 3 */}
      <div className="progress-bar">
        <div className="progress-step filled" />
        <div className="progress-step filled" />
      </div>

      {/* Media upload section */}
      <div className="report-review-group">
        <label>Upload Media (optional)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleMediaChange}
        />
        <small>Max 3 images</small>
      </div>

      {/* Notes input */}
      <div className="report-review-group">
        <label>Notes (optional)</label>
        <textarea
          value={formData.notes}
          onChange={handleNotesChange}
          placeholder="Add notes to this report"
        />
      </div>

      {/* Navigation buttons */}
      <div className="report-btn-group">
        <button className="btn" onClick={handleNext}>Next</button>
        <button className="btn" onClick={handleBack}>Previous</button>
      </div>
    </div>
  );
}

export default MediaUploadForm;
