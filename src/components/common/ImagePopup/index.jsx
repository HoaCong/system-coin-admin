/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openPopup } from "store/Toast/action";
import "./style.scss";

function ImagePopup() {
  const { popup } = useSelector((state) => state.toastReducer);
  const dispatch = useDispatch();
  const onOpenPopup = (payload) => dispatch(openPopup(payload));

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onOpenPopup({});
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div id="popup-image" className="popup">
        <div className="overlay" onClick={() => onOpenPopup({})}></div>
        <span className="close" onClick={() => onOpenPopup({})}>
          &times;
        </span>
        <img className="popup-content" src="" alt="" {...popup} />
      </div>
    </>
  );
}

export default ImagePopup;
