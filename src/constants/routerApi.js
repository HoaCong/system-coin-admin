export const ENDPOINT = {
  LOGIN: "/api/login",
  REGISTER: "/register",
  // ======/api/employee======
  LIST_EMPLOYEE: "/api/employee/search",
  ADD_EMPLOYEE: "/api/employee/create",
  EDIT_EMPLOYEE: "/api/employee/changepassword/",
  ACTIVE_EMPLOYEE: "/api/employee/active/",
  DETAIL_EMPLOYEE: "/api/employee/",
  DELETE_EMPLOYEE: "/api/employee/",
  UPDATE_DETAIL_EMPLOYEE: "/api/employee/detail/",
  // ======coin======
  DETAIL_COIN: "api/coins",
  LIST_COIN: "api/coin",
  ADD_COIN: "api/coin/create",
  EDIT_COIN: "api/coin/",
  DELETE_COIN: "api/coin/",
  // ======news======
  DETAIL_NEWS: "api/news",
  LIST_NEWS: "api/new",
  ADD_NEWS: "api/new/create",
  EDIT_NEWS: "api/new/",
  DELETE_NEWS: "api/new/",
  // ======guires======
  DETAIL_GUIRE: "api/guidlines",
  LIST_GUIRE: "api/guidline",
  ADD_GUIRE: "api/guidline/create",
  EDIT_GUIRE: "api/guidline/",
  DELETE_GUIRE: "api/guidline/",
  // ======/api/customer======
  LIST_CUSTOMER: "api/customer/search",
  ADD_CUSTOMER: "api/customer/create",
  EDIT_CUSTOMER: "api/customer/",
  ACTIVE_CUSTOMER: "api/customer/active/",
  DETAIL_CUSTOMER: "api/customer/",
  UPDATE_DETAIL_CUSTOMER: "api/customer/detail/",
  // ======api/histoties======
  LIST_HISTORIES_DETAIL: "api/order-coins",
  LIST_HISTORIES: "api/admin/order-coins",
  CONFIRM_HISTORIES: (id) => `api/order-coins/submit/${id}`,
  CANCEL_HISTORIES: (id) => `api/order-coins/cancel/${id}`,
  LIST_HISTORIES_WITHDRAW_DETAIL: "api/order-draw",
  LIST_HISTORIES_WITHDRAW: "api/admin/order-draw",
  CONFIRM_HISTORIES_WITHDRAW: (id) => `api/order-draw/submit/${id}`,
  CANCEL_HISTORIES_WITHDRAW: (id) => `api/order-draw/cancel/${id}`,
  // ======api/contact======
  LIST_CONTACT: "api/contact",
  CONFIRM_CONTACT: (id) => `api/submitcontact/${id}`,
  // ======api/contact======
  SETTING: "api/setting",
};
