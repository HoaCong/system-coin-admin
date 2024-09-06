import React from "react";
function ImgCover({ image, ratio = "169" }) {
  return (
    <div
      className={`image-cover ratio-${ratio}`}
      style={{ backgroundImage: `url(${image})` }}
    ></div>
  );
}

export default ImgCover;
