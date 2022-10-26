import React from "react";
import DiagonalTitle from "../assets/breadcrumb/TitleBarOpsCare_logo.png";

const DiagonalBarTitle = (props) => {
  return (
    <div className="diagonal-title">
      <img src={DiagonalTitle} alt={props.title} />
      <p>{props.title}</p>
    </div>
  );
};

export default DiagonalBarTitle;
