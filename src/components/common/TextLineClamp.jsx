import React from "react";

const TextLineClamp = ({ children, line }) => {
  const textStyle = {
    display: "-webkit-box",
    WebkitLineClamp: line, // Số dòng nhận từ prop
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return <p style={textStyle}>{children}</p>;
};

export default TextLineClamp;
