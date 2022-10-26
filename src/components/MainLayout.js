import React, { useState } from "react";
import NavigationBar from "./Navbar";
import cross from ".././assets/icons/CollapseIcon.png";
import expand from ".././assets/icons/ExpandIcon.png";

const MainLayout = (props) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };
  return (
    <main className="main">
      <div className="row">
        <NavigationBar navbarCheck={navbarOpen} />
        <div className="main-content col">
          <div className="expand-icon" onClick={handleToggle}>
            {navbarOpen ? (
              <img src={cross} alt="cross" className="invert" />
            ) : (
              <img src={expand} alt="expand" className="invert" />
            )}
          </div>
          <div className="content-area">{props.children}</div>
        </div>
      </div>
    </main>
  );
};

export default MainLayout;
