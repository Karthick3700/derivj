import React from "react";

const Spinner = ({ color }) => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="dot-spinner" style={{ "--dot-color": color }}>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
      </div>
    </div>
  );
};

export default Spinner;
