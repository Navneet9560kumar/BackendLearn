import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Contact page</h1>
      <div className="contact-buttons">
        <button onClick={() => navigate("info")}>Contact Info</button>
          <button onClick={() => navigate("from")}>Contact From</button>
      </div>
      <Outlet />
    </div>
  );
};

export default Contact;
