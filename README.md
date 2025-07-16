# Parking Enforcement App

A React-based mobile-friendly Progressive Web App (PWA) designed for real-time license plate scanning and permit validation. It features an AR-style camera overlay using OpenCV.js, backend integration for plate detection and permit status fetching, and intuitive UI flows for scanning, reviewing, and reporting.

---

## Table of Contents

- [Features](#features)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Running Locally](#running-locally)  
- [App Architecture](#app-architecture)  
  - [Core Pages & Components](#core-pages--components)  
  - [Scanning Flow & Tech Stack](#scanning-flow--tech-stack)  
- [API & Configuration](#api--configuration)  
- [Code Structure](#code-structure)  
- [Development Notes](#development-notes)  

---

## Features

- Real-time license plate scanning using OpenCV.js with on-device edge detection  
- AR-style overlay helps users align plates in live video  
- Automatic optical character recognition (OCR) via backend  
- Displays plate validity using permit data (Valid / Expired / Invalid)  
- Detailed permit view with parking spot and time information  
- Scanned plates list persistently stored via `localStorage`  
- Searchable permit list for manual lookup  
- "Create Report" action if the plate doesn't have a valid permit  

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+  
- npm (bundled with Node.js) or Yarn  
- HTTPS/SSL context to allow camera access (e.g., `localhost`)

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

- Visit `https://localhost:3000/` (or `http://localhost:3000/` on desktop)  
- Grant camera permissions and follow the onboarding flow

---

## App Architecture

### Core Pages & Components

| Page / Component         | Description |
|--------------------------|-------------|
| `Home`                   | Landing page with “Start Scanning” button |
| `PieceScanner`           | AR scan mode; live camera, overlay, detection + API call |
| `List`                   | Searchable list of valid active permits |
| `Details`                | Shows permit detail; allows reporting invalid plates |
| `PlateGuideBox`          | Overlay component that draws corner guides |
| `PlateList` / `PlateListItem` | UI for listing scanned plates with validity labels |

### Scanning Flow & Tech Stack

1. OpenCV.js: edge detection → contour detection → plate detection  
2. Cooldown logic: limits API calls by frames & time  
3. Backend OCR: cropping largest candidate → `POST /detect-plate`  
4. State update: drives UI list, color-coded validity, and data persistence  
5. UX overlay: Framer Motion controls animations for polished transitions  

---

## API & Configuration

Built to work with your backend hosted at `https://parking-enforcement-server.onrender.com`, exposing:

- `GET /` – Health check / warmup  
- `GET /api/permits` – Returns JSON list of all permits  
- `POST /api/lookup-plate` – Finds permit by plate parameter  
- `POST /api/detect-plate` – Accepts `{ image: base64 }`, returns `{ plate, isAuthorized, owner }`

Note: For production, replace hard-coded URLs with an environment-specific config or `.env` file, e.g.:

```env
VITE_API_BASE_URL=https://parking-enforcement-server.onrender.com
```

---

## Code Structure

```
src/
├── components/         # Reusable UI components (PlateGuideBox, PlateList)
├── css/                # Stylesheets for each page and feature
├── pages/              # Routeable pages (Home, Scanner, List, Details)
├── components/         # Animation presets & utilities
├── App.jsx             # App routes & page transitions
├── index.jsx           # App root with BrowserRouter basename
└── setupOpenCV.js      # Handles runtime initialization for OpenCV.js
```

---

## Development Notes

- LocalStorage usage: Scanned plate history is persisted and survives reloads  
- Camera feed: Hidden `<video>` is drawn into `<canvas>` for overlays + processing  
- Cooldown controls: `coolDownFrames`, `cooldownPeriod`, `frameCounter`, etc.  
- Color feedback: Detection bounding box flashes green/red depending on validity  
