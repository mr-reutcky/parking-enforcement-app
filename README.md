# Parking Enforcement App

A mobile-optimized Progressive Web App (PWA) for real-time license plate recognition and permit validation. Built with React, OpenCV.js, and AWS Rekognition, the system enables enforcement officers to quickly detect, verify, and report vehicles in a parking lot using an AR-style interface and live camera stream.

📄 [Full Technical Documentation](https://docs.google.com/document/d/1ZUr2ucs3BqALr_eCPK9K1GGRE5FoxlXh5cY7ZRRb82g/edit?usp=sharing)

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Running Locally](#running-locally)  
- [Architecture Overview](#architecture-overview)  
  - [Core Components](#core-components)  
  - [Scanning Workflow](#scanning-workflow)  
- [API Endpoints](#api-endpoints)  
- [Code Structure](#code-structure)  
- [Development Notes](#development-notes)  

---

## Features

- Real-time plate detection using OpenCV.js  
- AR-style plate guide overlay for user alignment  
- Automatic OCR using AWS Rekognition (text + label)  
- Plate validation via mock permit database  
- Valid/Expired/Invalid status color-coded in UI  
- Scanned plate list saved with `localStorage`  
- Manual permit search and detail view  
- Report button for unauthorized vehicles  

---

## Tech Stack

### Frontend

- **React (JavaScript)** – Declarative UI and component architecture  
- **CSS** – Responsive styles and overlays  
- **OpenCV.js** – Real-time browser-based plate detection  
- **Framer Motion** – UI transitions and animations  
- **Canvas API** – Frame processing from video feed  
- **MediaDevices API** – Access device camera  

### Backend

- **Express.js** – REST API server for OCR and data validation  
- **SQLite** – Lightweight local database of permits  
- **AWS Rekognition**  
  - `DetectLabels`: Identifies vehicles and plate bounding boxes  
  - `DetectText`: Extracts plate numbers from cropped images  

---

## Getting Started

### Prerequisites

- Node.js v18+  
- npm or Yarn  
- HTTPS-capable dev server for accessing camera (`https://localhost`)

### Installation

```bash
git clone https://github.com/mr-reutcky/parking-enforcement-app.git
cd parking-enforcement-app
npm install
```

### Running Locally

```bash
npm start
```

Open your browser to:  
`https://localhost:3000/`  
Allow camera access when prompted.

---

## Architecture Overview

### Core Components

| Component/File              | Description |
|----------------------------|-------------|
| `Home.jsx`                 | Entry screen, resets state and routing |
| `PlateScanner.jsx`         | Handles OpenCV + AWS Rekognition detection |
| `PlateGuideBox.jsx`        | Draws corner guides over the camera view |
| `PlateList.jsx`            | Shows recent scans, validity status |
| `ValidPlatesList.jsx`      | All currently valid permits, searchable |
| `Details.jsx`              | Detailed view of permit and report button |
| `pageAnimation.js`         | Framer Motion page transition config |

---

## Scanning Workflow

1. Camera feed captured via `MediaDevices` → `<video>`  
2. Frame captured to `<canvas>` → OpenCV.js detects plate regions  
3. Plate region is cropped and base64-encoded  
4. Image sent to backend via `POST /api/detect-plate`  
5. AWS Rekognition returns plate text → matched against DB  
6. Result stored in local state + shown in UI

---

## API Endpoints

Base URL: `https://parking-enforcement-server.onrender.com`

| Method | Endpoint                | Description |
|--------|-------------------------|-------------|
| GET    | `/api/permits`          | Returns all permit data |
| POST   | `/api/lookup-plate`     | `{ plate }` → permit details if found |
| POST   | `/api/detect-plate`     | `{ image: base64 }` → plate text + status |
| GET    | `/`                     | Health check |

---

## Code Structure

``` bash
src/
├── components/
│   ├── PlateGuideBox.jsx
│   ├── PlateList.jsx
│   ├── PlateListItem.jsx
├── css/
│   └── *.css
├── pages/
│   ├── Home.jsx
│   ├── PlateScanner.jsx
│   ├── ValidPlatesList.jsx
│   └── Details.jsx
├── pageAnimations.js
├── setupOpenCV.js
├── App.jsx
└── index.jsx
```

---

## Development Notes

- `localStorage` retains scanned plate history  
- `cooldownPeriod` and `coolDownFrames` reduce API spam  
- OpenCV draws bounding boxes + guides on frame overlay  
- Framer Motion animations polish page transitions  
