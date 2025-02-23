import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Cube from "./pages/Cube";
import Orbit from "./pages/Orbit";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cube" element={<Cube />} />
      <Route path="/orbit" element={<Orbit />} />
    </Routes>
  );
}

export default App;
