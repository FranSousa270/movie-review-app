import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PaginaFilme from "./pages/PaginaFIlme";

function App() {
  return (
  <main className="w-full min-h-screen bg-gradient-to-b from-sky-950 to-slate-900 font-noto-sans">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<PaginaFilme />} />
    </Routes>
  </main>
);
}

export default App;
