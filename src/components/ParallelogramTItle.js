import React from "react";

const ParallelogramTItle = (props) => {
  return (
    <>
      <div className="parallelogram-wrapper">
        <div className="parallelogram">
          <p className="parallelogram-title">{props.title}</p>
        </div>
        <div className="parallelogram1"></div>
        <div className="parallelogram2"></div>
        <div className="parallelogram3"></div>
      </div>
    </>
  );
};

export default ParallelogramTItle;
