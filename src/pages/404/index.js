import React from "react";
import { Link } from "react-router-dom";

const notFound = () => {
  return (
    <div className="not-found">
      <h2 className="not-found-title">404 Page Not Found.</h2>
      <Link to="/">Go back to Homepage</Link>
    </div>
  );
};

export default notFound;
