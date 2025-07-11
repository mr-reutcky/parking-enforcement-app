import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ScannerPage from "./pages/ScannerPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/scanner" element={<ScannerPage />} />
      {/* <Route path="/submit" element={<SubmitPage />} /> */}
    </Routes>
  );
}

export default App;
