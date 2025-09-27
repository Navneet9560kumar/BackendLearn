import React from "react";
import logo from "../assets/logo.jpeg";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-4 shadow-md">
      <img src={logo} alt="Logo" className="w-12 h-12 rounded-full" />
      <ul className="flex gap-6">
        <NavLink to="/">
          <li>Home</li>
        </NavLink>
        <NavLink to="/products">
          <li>Product</li>
        </NavLink>

        <NavLink to="/about">
          {" "}
          <li>About</li>
        </NavLink>
        <NavLink to="/contact">
          {" "}
          <li>Contact</li>
        </NavLink>
        <NavLink to="/jobs">
          {" "}
          <li>jobs</li>
        </NavLink>
      </ul>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => navigate("/Contact", { replace: true })}
      >
        Get Started
      </button>
    </div>
  );
};

export default Navbar;
