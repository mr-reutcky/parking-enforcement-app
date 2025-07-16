import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PlateScanner from "./pages/PlateScanner";
import Details from "./pages/Details";
import List from "./pages/List";
import { AnimatePresence } from "framer-motion";

/**
 * App
 * Defines client-side routes for the license plate scanning app.
 * Wrapped in AnimatePresence for page transition animations.
 */
function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scanner" element={<PlateScanner />} />
        <Route path="/list" element={<List />} />
        <Route path="/details" element={<Details />} />
        {/* Future: <Route path="/submit" element={<SubmitPage />} /> */}
      </Routes>
    </AnimatePresence>
  );
}

export default App;
