import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PlateScanner from "./pages/PlateScanner";
import Details from "./pages/Details";
import { AnimatePresence } from "framer-motion";


function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scanner" element={<PlateScanner />} />
        <Route path="/details" element={<Details />} />
        {/* <Route path="/submit" element={<SubmitPage />} /> */}
      </Routes>
    </AnimatePresence>
  );
}

export default App;
