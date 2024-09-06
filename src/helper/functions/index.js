import _random from "lodash/random";
import _size from "lodash/size";

export const parserRouter = (router, id) => {
  return router.replace(":id", id);
};

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
