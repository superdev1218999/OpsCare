import React from "react";
import subDiagonal from "../assets/breadcrumb/DiagionalTitleBar.png";

const SubTitleDiagonal = (props) => {
  return (
    <div className={`diagonal-sub-title ${props.titleClass}`}>
      <img src={subDiagonal} alt={props.title} />
      <p>{props.title}</p>
    </div>
  );
};

export default SubTitleDiagonal;
