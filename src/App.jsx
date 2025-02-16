import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./features/Footer";
import Header from "./features/Header";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
