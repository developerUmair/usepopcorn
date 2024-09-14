import React, { useState } from "react";

const TextExapnder = ({ limit = 10, children, expanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const displayText = isExpanded
    ? children
    : `${children.split(" ").slice(0, limit).join(" ")}...`;

  const buttonStyle = {
    background: "none",
    border: "none",
    cursor: "pointer",
    font: "inherit",
    fontSize: '14px',
    color: '#1f09cd',
    fontWeight: '600',
    marginLeft: '6px'
  };

  console.log(typeof displayText);
  return (
    <div>
      <span>{displayText}</span>
      <button onClick={toggleExpand} style={buttonStyle}>
        {isExpanded ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

export default TextExapnder;
