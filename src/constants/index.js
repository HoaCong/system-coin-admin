export const pageSize = 20;

export const STATUS_LABEL = {
  null: { bg: "secondary", name: "Chờ xử lý" },
  IN_PROCESS: { bg: "secondary", name: "Chờ xử lý" },
  SUCCESS: { bg: "success", name: "Đã duyệt" },
  CANCEL: { bg: "danger", name: "Đã từ chối" },
  CONFIRMED: { bg: "success", name: "Đã duyệt" },
  DESTROYED: { bg: "danger", name: "Đã hủy" },
};

export const TYPE_LABEL = {
  TRIET_LONG: "Liệu trình",
  CHAM_DA: "Thông thường",
};

export const STATUS = [
  { id: null, name: "Tất cả" },
  { id: "IN_PROCCESS", name: "Chờ xử lý" },
  { id: "CONFIRMED", name: "Đã duyệt" },
  { id: "DESTROYED", name: "Đã hủy" },
];

export const STATUS_2 = [
  { id: null, name: "Tất cả" },
  { id: "IN_PROCCESS", name: "Chờ xử lý" },
  { id: "SUCCESS", name: "Thành công" },
  { id: "DESTROYED", name: "Đã hủy" },
];

export const TIME = [
  "11:00",
  "11:30",
  "12:00",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
];
