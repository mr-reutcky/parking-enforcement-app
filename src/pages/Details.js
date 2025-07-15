import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import "../css/Details.css";
import { motion } from "framer-motion";
import { pageAnimation } from "../components/pageAnimations";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Details() {
  const query = useQuery();
  const plate = query.get("plate");
  const [permit, setPermit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(null);

  function formatDate(dateStr) {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr + ":00");
    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  useEffect(() => {
    if (!plate) return;

    axios
      .post("https://parking-enforcement-server.onrender.com/api/lookup-plate", { plate }, {
        headers: { "x-app-client": "lpr-client" }
      })
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

  if (!plate) {
    return (
      <motion.div className="details-container" {...pageAnimation}>
        <h1>No plate provided</h1>
        <Link to="/scanner" className="back-button">Back to Scanner</Link>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <div className="details-container">
        <h1>Loading details...</h1>
      </div>
    );
  }

  return (
    <motion.div className="details-container" {...pageAnimation}>
      <h1>Plate Details</h1>
        <div className="plate-details-card">
          <div className="row"><span className="label">Plate:</span> {plate}</div>
          <div className="row"><span className="label">Owner:</span> {permit?.owner || "N/A"}</div>
          <div className="row"><span className="label">Start:</span> {formatDate(permit?.permit_start) || "N/A"}</div>
          <div className="row"><span className="label">End:</span> {formatDate(permit?.permit_end) || "N/A"}</div>
          <div className="row"><span className="label">Status:</span> 
            <span className={isAuthorized ? "status valid" : "status invalid"}>
              {isAuthorized ? "Valid" : "Expired / Invalid"}
            </span>
          </div>

          {!isAuthorized && (
            <div className="row">
              <Link to={`/report?plate=${plate}`} className="report-button">
                Create Report
              </Link>
            </div>
          )}
        </div>
      <Link to="/scanner" className="back-button">Back to Scanner</Link>
    </motion.div>
  );
}

export default Details;
