import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-4">
      <h1 className="sm:text-8xl text-4xl font-extrabold text-red-600">404</h1>
      <p className="mt-4 sm:text-3xl text-xl">Oops! Page not found!</p>
      <p className="mt-2 md:text-lg text-sm text-gray-600 text-center">
        It seems like you're lost. Don't worry, it happens to the best of us.
      </p>
      <div className="sm:mt-6 mt-2 bg-gray-200 sm:p-8 p-4 rounded-lg shadow-lg">
        <h2 className="sm:text-xl text-md font-semibold text-gray-700">Here are some helpful links:</h2>
        <ul className="sm:mt-4 sm:space-y-2 ">
          <li><NavLink to="/" className="text-blue-600 hover:underline sm:text-xl text-sm">Homepage</NavLink></li>
          <li><NavLink to="/pastes" className="text-blue-600 hover:underline sm:text-xl text-sm">All Paste</NavLink></li>
        </ul>
      </div>
      <p className="mt-4 sm:text-lg text-sm text-gray-600">
        Or go back to the <NavLink to="/" className="text-blue-500 hover:underline">homepage</NavLink>.
      </p>
    </div>
  );
};

export default NotFound;
