/* eslint-disable react-hooks/exhaustive-deps */
import NoImage from "assets/images/No-Image-Placeholder.png";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openPopup } from "store/Toast/action";

function useLazyLoadImage(src, defaultImage) {
  const [imageSrc, setImageSrc] = useState(defaultImage);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = src;

    image.onload = () => {
      setImageSrc(src);
      setLoaded(true);
    };

    image.onerror = () => {
      setLoaded(true);
      setImageSrc(defaultImage);
    };
  }, [src]);

  return { imageSrc, isLoaded };
}

function LazyLoadImage({ src, alt, ...restProps }) {
  const { imageSrc } = useLazyLoadImage(src, NoImage);
  const { popup } = useSelector((state) => state.toastReducer);
  const dispatch = useDispatch();
  const onOpenPopup = (payload) => dispatch(openPopup(payload));

  useEffect(() => {
    return () => {
      if (popup?.visible) onOpenPopup({});
    };
  }, []);

  return (
    <img
      id="image_lazyload"
      src={imageSrc}
      alt={alt}
      {...restProps}
      onClick={() => onOpenPopup({ visible: "true", src: imageSrc, alt })}
    />
  );
}

export default LazyLoadImage;
