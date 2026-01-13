import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import "./App.css";  // <-- import CSS here

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/vehicle" element={<Page2 />} />
        <Route path="/total" element={<Page3 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
