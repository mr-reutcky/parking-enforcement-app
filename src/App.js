import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PlateScanner from "./pages/PlateScanner";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/scanner" element={<PlateScanner />} />
      {/* <Route path="/submit" element={<SubmitPage />} /> */}
    </Routes>
  );
}

export default App;
