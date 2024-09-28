import { ROUTES } from "./routerWeb";

export const MENU_ADMIN = [
  // {
  //   label: "Dashboard",
  //   active: false,
  //   src: ROUTES.ADMIN_DASHBOARD,
  //   icon: <i className="fas fa-home"></i>,
  // },
  {
    label: "Danh sách giao dịch",
    active: false,
    src: ROUTES.ADMIN_HISTORIES,
    icon: <i className="fas fa-history"></i>,
  },
  {
    label: "Danh sách rút coin",
    active: false,
    src: ROUTES.ADMIN_HISTORIES_WITHDRAW,
    icon: <i className="fas fa-history"></i>,
  },
  {
    label: "Coin",
    active: false,
    src: ROUTES.ADMIN_COIN,
    icon: <i className="fas fa-coins"></i>,
  },
  {
    label: "Nhân viên",
    active: false,
    src: ROUTES.ADMIN_EMPLOYEE,
    icon: <i className="fas fa-user"></i>,
  },
  {
    label: "Tin tức",
    active: false,
    src: ROUTES.ADMIN_NEWS,
    icon: <i className="fas fa-newspaper"></i>,
  },
  {
    label: "Hướng dẫn",
    active: false,
    src: ROUTES.ADMIN_GUIRE,
    icon: <i className="fas fa-sticky-note"></i>,
  },
  {
    label: "Khách hàng",
    active: false,
    src: ROUTES.ADMIN_CUSTOMER,
    icon: <i className="fas fa-user-alt"></i>,
  },
  {
    label: "Danh sách liên hệ",
    active: false,
    src: ROUTES.ADMIN_CONTACT,
    icon: <i className="fas fa-file-contract"></i>,
  },
  {
    label: "Phương thức thanh toán",
    active: false,
    src: ROUTES.ADMIN_METHOD_PAYMENT,
    icon: <i className="fas fa-credit-card"></i>,
  },
];
