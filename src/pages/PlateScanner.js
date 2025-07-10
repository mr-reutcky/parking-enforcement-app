/* global cv */
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import PlateList from "../components/PlateList";
import PlateGuideBox from "../components/PlateGuideBox";
import "../css/PlateScanner.css";

function PlateScanner() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const boxColorRef = useRef("lightblue");

  const [scannedPlates, setScannedPlates] = useState([]);
  const frameCounter = useRef(0);
  const lastApiCallTimeRef = useRef(0);

  const cooldownPeriod = 3000;
  const coolDownFrames = 15;
  const GUIDE_WIDTH = 300;
  const GUIDE_HEIGHT = 150;
  const MARGIN = 20;

  const processFrame = () => {
    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!video || video.readyState < 2) {
        requestAnimationFrame(processFrame);
        return;
      }

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;
      const targetAspect = canvasWidth / canvasHeight;
      const videoAspect = videoWidth / videoHeight;

      let sx, sy, sw, sh;
      if (videoAspect > targetAspect) {
        sh = videoHeight;
        sw = sh * targetAspect;
        sx = (videoWidth - sw) / 2;
        sy = 0;
      } else {
        sw = videoWidth;
        sh = sw / targetAspect;
        sx = 0;
        sy = (videoHeight - sh) / 2;
      }

      ctx.drawImage(video, sx, sy, sw, sh, 0, 0, canvasWidth, canvasHeight);

      const guideX = Math.floor((canvasWidth - GUIDE_WIDTH) / 2) - MARGIN;
      const guideY = Math.floor((canvasHeight - GUIDE_HEIGHT) / 2) - MARGIN;
      const regionWidth = GUIDE_WIDTH + MARGIN * 2;
      const regionHeight = GUIDE_HEIGHT + MARGIN * 2;

      const croppedImageData = ctx.getImageData(guideX, guideY, regionWidth, regionHeight);
      const croppedMat = cv.matFromImageData(croppedImageData);

      const gray = new cv.Mat();
      const edges = new cv.Mat();
      const contours = new cv.MatVector();
      const hierarchy = new cv.Mat();

      cv.cvtColor(croppedMat, gray, cv.COLOR_RGBA2GRAY, 0);
      cv.Canny(gray, edges, 50, 150, 3, false);
      cv.findContours(edges, contours, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);

      const candidates = [];
      for (let i = 0; i < contours.size(); i++) {
        const contour = contours.get(i);
        const rect = cv.boundingRect(contour);
        const aspect = rect.width / rect.height;
        if (aspect > 1.8 && aspect < 5 && rect.width > 120) {
          candidates.push(rect);
        }
        contour.delete();
      }

      if (candidates.length > 0) {
        candidates.sort((a, b) => b.width * b.height - a.width * a.height);
        const rectToCrop = candidates[0];

        const globalRect = {
          x: rectToCrop.x + guideX,
          y: rectToCrop.y + guideY,
          width: rectToCrop.width,
          height: rectToCrop.height,
        };

        ctx.strokeStyle = boxColorRef.current;
        ctx.lineWidth = 4;
        ctx.strokeRect(globalRect.x, globalRect.y, globalRect.width, globalRect.height);

        frameCounter.current++;
        const now = Date.now();

        if (
          frameCounter.current >= coolDownFrames &&
          now - lastApiCallTimeRef.current > cooldownPeriod
        ) {
          lastApiCallTimeRef.current = now;
          frameCounter.current = 0;

          const trimTopBottom = 10;
          const adjustedHeight = Math.max(globalRect.height - trimTopBottom * 2, 1);
          const adjustedY = globalRect.y + trimTopBottom;

          const cropCanvas = document.createElement("canvas");
          cropCanvas.width = globalRect.width;
          cropCanvas.height = adjustedHeight;
          const cropCtx = cropCanvas.getContext("2d");

          cropCtx.drawImage(
            canvas,
            globalRect.x,
            adjustedY,
            globalRect.width,
            adjustedHeight,
            0,
            0,
            globalRect.width,
            adjustedHeight
          );

          const dataURL = cropCanvas.toDataURL("image/jpeg");

          axios
            .post("https://example.com/api/detect-plate", { image: dataURL })
            .then((res) => {
              const plate = res.data.plate;
              const isAuthorized = res.data.isAuthorized;
              if (plate) {
                setScannedPlates((prev) => [
                  { text: plate, valid: isAuthorized },
                  ...prev,
                ]);
                boxColorRef.current = isAuthorized ? "green" : "red";
              }
              setTimeout(() => {
                boxColorRef.current = "lightblue";
              }, 3000);
            })
            .catch((err) => {
              console.error("API error:", err);
              setScannedPlates((prev) => [
                { text: "API error", valid: false },
                ...prev,
              ]);
              boxColorRef.current = "red";
              setTimeout(() => {
                boxColorRef.current = "lightblue";
              }, 3000);
            });
        }
      } else {
        frameCounter.current = 0;
      }

      croppedMat.delete();
      gray.delete();
      edges.delete();
      contours.delete();
      hierarchy.delete();
    } catch (error) {
      console.error("processFrame error:", error);
    }

    requestAnimationFrame(processFrame);
  };

  const startCamera = async () => {
    console.log("startCamera() called");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 1920 },
          frameRate: { ideal: 30, max: 30 },
        },
      });

      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      console.log("Camera stream started");

      setTimeout(() => processFrame(), 500);
    } catch (err) {
      console.error("Error accessing camera", err);
    }
  };

  const checkReady = () => {
    console.log("Checking OpenCV readiness...");
    if (window.cv) {
      if (window.cv.Mat) {
        console.log("OpenCV is ready");
        startCamera();
      } else {
        console.log("Waiting for OpenCV runtime");
        window.cv["onRuntimeInitialized"] = () => {
          console.log("OpenCV runtime initialized");
          startCamera();
        };
      }
    } else {
      console.log("cv not found, retrying...");
      setTimeout(checkReady, 100);
    }
  };

  useEffect(() => {
    checkReady();
  }, []);

  return (
    <div className="scanner-container">
      <video
        ref={videoRef}
        style={{ display: "none" }}
        playsInline
        muted
        autoPlay
      />
      <canvas ref={canvasRef} width={720} height={1280} className="scanner-canvas" />
      <PlateList plates={scannedPlates} />
      <PlateGuideBox width={200} height={100} />
    </div>
  );
}

export default PlateScanner;
