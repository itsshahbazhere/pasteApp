import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [indicatorPosition, setIndicatorPosition] = useState(0);

  // Update indicator position based on the current path
  useEffect(() => {
    if (location.pathname === "/") {
      setIndicatorPosition(0); // Home link position
    } else if (location.pathname === "/pastes") {
      setIndicatorPosition(100); // Paste link position
    }
  }, [location.pathname]);

  return (
    <div className="flex items-center justify-center w-full h-[70px] border-b gap-x-20 relative bg-gray-800">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-blue-500 font-semibold text-xl py-2 transition-all duration-300"
            : "text-white font-medium text-xl py-2 hover:text-blue-500 transition-colors duration-300"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/pastes"
        className={({ isActive }) =>
          isActive
            ? "text-blue-500 font-semibold text-xl py-2 transition-all duration-300"
            : "text-white font-medium text-xl py-2 hover:text-blue-500 transition-colors duration-300"
        }
      >
        Paste
      </NavLink>
      
      {/* Bottom Indicator */}
      <div
        className={`absolute bottom-0 left-0 h-1 bg-blue-500 transition-transform duration-300 ease-in-out`}
        style={{
          transform: `translateX(${indicatorPosition}%)`,
          width: '50%', // Width of the indicator
          opacity: 1, // Opacity to ensure visibility
          transition: 'transform 0.3s ease, opacity 0.3s ease', // Smooth transition
        }}
      />
    </div>
  );
};

export default Navbar;
