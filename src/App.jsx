import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom"; // Use HashRouter
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Paste from "./components/Paste";
import ViewPaste from "./components/ViewPaste";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <HashRouter>
      <div className="w-full h-full flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pastes" element={<Paste />} />
          <Route path="/pastes/:id" element={<ViewPaste />} />
          <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
