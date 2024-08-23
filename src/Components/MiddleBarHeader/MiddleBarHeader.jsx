import React from "react";
import "./MiddleBarHeader.css";
 

const MiddleBarHeader = () => {
  return (
    <div className="middle-bar-header">
      <div className="heading">
        <button>For You</button>
        <button>Top Tracks</button>
      </div>
    </div>
  );
};

export default MiddleBarHeader;
