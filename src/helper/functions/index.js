import axios from "axios";
import _random from "lodash/random";
import _size from "lodash/size";

export const parserRouter = (router, id) => {
  return router.replace(":id", id);
};

export const formatNumber = (value) => value?.toLocaleString("en-En");

export const speak = (text) => {
  const speechSynthesis = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);

  // Lấy danh sách các giọng đang hỗ trợ
  const voices = speechSynthesis.getVoices();

  // Lọc và chọn giọng random
  const randomVoice = voices[_random(0, voices.length - 1)];

  utterance.voice = randomVoice;

  speechSynthesis.speak(utterance);
};

export function isValidPhoneNumber(phoneNumber) {
  const phoneRegex =
    /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/;
  return phoneRegex.test(phoneNumber);
}

export function isValidCodePin(codePin) {
  const isNumeric = /^\d+$/.test(codePin);
  return codePin.length === 6 && isNumeric;
}

export const formatCurrency = (amount, unit = "VND") => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: unit,
  }).format(amount);
};

export const formatCurrencyToK = (amount, ratio = 1000) => {
  const formattedAmount = (amount / ratio).toLocaleString("vi-VN");
  return `${formattedAmount}K`;
};

export const getIndexActive = (list) => {
  return Math.min(
    ...list.map((item) =>
      item.status === "IN_PROCCESS" ? item.session : 1000000000000000
    )
  );
};

export const download = async (data, format) => {
  const file = document.createElement("a");
  document.body.appendChild(file);
  if (_size(data) > 0) {
    file.setAttribute("download", format);
    file.setAttribute(
      "href",
      `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`
    );
    file.click();
  }
  document.body.removeChild(file);
};

export const checkTimeExpired = (timeExpired) => {
  const now = new Date().getTime();
  return now > timeExpired;
};

export const handleUploadImage = async (
  event,
  onSuccess = () => {},
  onFailure = () => {}
) => {
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
        onSuccess(url);
      }
    } catch (error) {
      localStorage.removeItem("token_upload");
      localStorage.removeItem("expired_upload");
      event.target.value = "";
      onFailure(error);
    } finally {
      // setIsUploading(false);
    }
  }
};
