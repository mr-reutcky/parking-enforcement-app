import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import VehicleDetailsForm from "./VehicleDetailsForm";
import MediaUploadForm from "./MediaUploadForm";
import ReportReview from "./ReportReview";

/**
 * ReportPage
 * Manages the multi-step report flow:
 * - Step 1: VehicleDetailsForm
 * - Step 2: MediaUploadForm
 * - Step 3: ReportReview
 * Maintains and passes shared form state across all steps.
 */
function ReportPage() {
  const navigate = useNavigate();

  // Centralized form state shared across all steps
  const [formData, setFormData] = useState({
    spot: "",
    plate: "",
    make: "",
    model: "",
    color: "",
    media: [],
    notes: "",
    actionTaken: "",
  });

  return (
    <Routes>
      {/* Step 1: Vehicle Details Form */}
      <Route
        index
        element={
          <VehicleDetailsForm
            formData={formData}
            setFormData={setFormData}
            navigate={navigate}
          />
        }
      />
      
      {/* Step 2: Media Upload Form */}
      <Route
        path="media"
        element={
          <MediaUploadForm
            formData={formData}
            setFormData={setFormData}
            navigate={navigate}
          />
        }
      />
      
      {/* Step 3: Review & Submit */}
      <Route
        path="review"
        element={
          <ReportReview
            formData={formData}
            setFormData={setFormData}
            navigate={navigate}
          />
        }
      />
    </Routes>
  );
}

export default ReportPage;
