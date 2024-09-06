import camera from "assets/images/camera.png";
import axios from "axios";
import LazyLoadImage from "components/common/LazyLoadImage";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToast } from "store/Toast/action";
const EnumGeometry = {
  rect: "rounded-0",
  radius: "rounded",
  circle: "rounded-circle",
};

const checkTimeExpired = (timeExpired) => {
  const now = new Date().getTime();
  return now > timeExpired;
};

function UploadImage({
  image,
  callback,
  geometry = "circle",
  size = { width: 150, height: 150 },
  classImage = "",
  showUpload = false,
}) {
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch();
  const onAddToast = (data) => dispatch(addToast(data));
  useEffect(() => {
    setFile(image);
  }, [image]);

  const handleUploadImage = async (event) => {
    const selectedFile = event.target.files[0];
    let accessToken = localStorage.getItem("token_upload");
    let exprired = localStorage.getItem("expired_upload");
    if (selectedFile) {
      try {
        // Step 1: Call the login API to get the access_token
        if (!accessToken || checkTimeExpired(exprired)) {
          const loginResponse = await axios.post(
            "https://app.mento.vn/api/v1/guest/sessions",
            {
              email: process.env.REACT_APP_USERNAME,
              password: process.env.REACT_APP_PASSWORD,
            }
          );

          accessToken = loginResponse.data.token;
          localStorage.setItem("token_upload", accessToken);
          localStorage.setItem(
            "expired_upload",
            new Date().getTime() + 3600 * 1000 * 24 * 30 // 30 day
          );
        }

        if (accessToken) {
          // Step 2: Prepare the image for upload
          const formData = new FormData();
          formData.append("images[]", selectedFile);
          setIsUploading(true);

          // Step 3: Call the image upload API with the access_token in the headers
          const uploadResponse = await axios.post(
            "https://app.mento.vn/api/v1/images",
            formData,
            {
              headers: {
                "Content-Type": "image/jpeg",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          const url = uploadResponse?.data[0].photo?.url;
          setFile(url);
          callback(url);
        }
      } catch (error) {
        localStorage.removeItem("token_upload");
        localStorage.removeItem("expired_upload");
        event.target.value = "";
        onAddToast({
          text: "Upload image failed",
          type: "danger",
          title: "",
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <>
      {file ? (
        <div>
          <LazyLoadImage
            key={file}
            src={file}
            alt="avatar"
            {...size}
            className={`${EnumGeometry[geometry]} p-2 shadow-sm ${classImage}`}
          />
        </div>
      ) : (
        <label
          htmlFor="uploadImage"
          className={`${EnumGeometry[geometry]} shadow-sm d-flex justify-content-center align-items-center text-center ${classImage}`}
          style={{
            ...size,
            cursor: "pointer",
            background: "#e1e1e1",
            border: "8px solid #ecebe8",
          }}
        >
          <div>
            <img
              src={camera}
              alt="camera"
              width={30}
              height="auto"
              className="opacity-50"
            />
            <div>
              <small className="text-black-50 opacity-75">Upload photo</small>
            </div>
          </div>
        </label>
      )}
      {showUpload && (
        <div>
          <label
            htmlFor="uploadImage"
            className={`btn btn-outline-secondary mt-3 ${
              isUploading && "pe-none"
            }`}
          >
            {isUploading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            Upload Image
          </label>
        </div>
      )}
      <input
        id="uploadImage"
        type="file"
        accept="image/*"
        multiple
        onChange={handleUploadImage}
        hidden
        disabled={isUploading}
      />
    </>
  );
}
UploadImage.propTypes = {
  src: PropTypes.string,
  callback: PropTypes.func,
};
export default UploadImage;
