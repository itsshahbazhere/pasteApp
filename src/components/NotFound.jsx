import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-8xl font-extrabold text-red-600">404</h1>
      <p className="mt-4 text-3xl">Oops! Page not found!</p>
      <p className="mt-2 text-lg text-gray-600">
        It seems like you're lost. Don't worry, it happens to the best of us.
      </p>
      <div className="mt-6 bg-gray-200 p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-700">Here are some helpful links:</h2>
        <ul className="mt-4 space-y-2">
          <li><NavLink to="/" className="text-blue-600 hover:underline">Homepage</NavLink></li>
          <li><NavLink to="/pastes" className="text-blue-600 hover:underline">All Paste</NavLink></li>
        </ul>
      </div>
      <p className="mt-4 text-lg text-gray-600">
        Or go back to the <NavLink to="/" className="text-blue-500 hover:underline">homepage</NavLink>.
      </p>
    </div>
  );
};

export default NotFound;
