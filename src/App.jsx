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
      <div>
        {/* Render Navbar only for defined routes */}
        <Routes>
          <Route path="/" element={
            <div className="w-full h-full flex flex-col">
              <Navbar />
              <Home />
            </div>
          } />
          <Route path="/pastes" element={
            <div className="w-full h-full flex flex-col">
              <Navbar />
              <Paste />
            </div>
          } />
          <Route path="/pastes/:id" element={
            <div className="w-full h-full flex flex-col">
              <Navbar />
              <ViewPaste />
            </div>
          } />
          <Route path="*" element={<NotFound div className="w-full h-full flex flex-col"/>} /> {/* Catch-all route for 404 */}
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
