import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Details.css";
import { motion } from "framer-motion";
import { pageAnimation } from "../components/pageAnimations";

/**
 * useQuery
 * Custom hook for accessing query parameters from the URL.
 */
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Details() {
  const query = useQuery();
  const plate = query.get("plate"); // Extract license plate from query params
  const [permit, setPermit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(null);
  const navigate = useNavigate();

  /**
   * formatDate
   * Converts an ISO datetime string into a human-readable format.
   * Falls back to "N/A" if date is null or invalid.
   */
  function formatDate(dateStr) {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr + ":00"); // Normalize for Safari compatibility
    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  /**
   * Fetch permit data when the plate query changes.
   * Sends a POST request to look up the plate in the backend.
   */
  useEffect(() => {
    if (!plate) return;

    axios
      .post("https://parking-enforcement-server.onrender.com/api/lookup-plate", 
        { plate },
        { headers: { "x-app-client": "lpr-client" } }
      )
      .then((res) => {
        setPermit(res.data.permit);
        setIsAuthorized(res.data.isAuthorized);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading plate info:", err);
        setLoading(false);
      });
  }, [plate]);

  // Handle missing plate in URL
  if (!plate) {
    return (
      <motion.div className="details-container" {...pageAnimation}>
        <h1>No plate provided</h1>
        <Link to="/scanner" className="back-button">Back to Scanner</Link>
      </motion.div>
    );
  }

  // Loading state while fetching API data
  if (loading) {
    return (
      <div className="details-container">
        <h1>Loading details...</h1>
      </div>
    );
  }

  return (
    <motion.div className="details-container" {...pageAnimation}>
      <h1>Booking Details</h1>

      {/* Main permit info card */}
      <div className="plate-details-card">
        <div className="row"><span className="label">Plate:</span> {plate}</div>
        <div className="row"><span className="label">Spot Number:</span> {permit?.spot || "N/A"}</div>
        <div className="row"><span className="label">Owner:</span> {permit?.owner || "N/A"}</div>
        <div className="row"><span className="label">Make:</span> {permit?.make || "N/A"}</div>
        <div className="row"><span className="label">Model:</span> {permit?.model || "N/A"}</div>
        <div className="row"><span className="label">Color:</span> {permit?.color || "N/A"}</div>
        <div className="row"><span className="label">Start:</span> {formatDate(permit?.permit_start)}</div>
        <div className="row"><span className="label">End:</span> {formatDate(permit?.permit_end)}</div>
        <div className="row">
          <span className="label">Status:</span>
          <span className={isAuthorized ? "status valid" : "status invalid"}>
            {isAuthorized ? "Valid" : "Expired / Invalid"}
          </span>
        </div>

        {/* Show "Create Report" option if unauthorized */}
        {!isAuthorized && (
          <div className="row">
            <Link to={`/report?plate=${plate}`} className="report-button">
              Create Report
            </Link>
          </div>
        )}
      </div>

      {/* Back button to return to scanner */}
      <button onClick={() => navigate(-1)} className="back-button">
        Back to Scan
      </button>
    </motion.div>
  );
}

export default Details;
