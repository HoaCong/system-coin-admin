import { ROUTES } from "./routerWeb";

export const MENU_ADMIN = [
  {
    label: "Dashboard",
    active: false,
    src: ROUTES.ADMIN_DASHBOARD,
    icon: <i className="fas fa-home"></i>,
  },
  {
    label: "Coin",
    active: false,
    src: ROUTES.ADMIN_COIN,
    icon: <i className="fas fa-users"></i>,
  },
  {
    label: "Nhân viên",
    active: false,
    src: ROUTES.ADMIN_EMPLOYEE,
    icon: <i className="fas fa-users"></i>,
  },
  {
    label: "Tin tức",
    active: false,
    src: ROUTES.ADMIN_NEWS,
    icon: <i className="fas fa-users"></i>,
  },
  {
    label: "Hướng dẫn",
    active: false,
    src: ROUTES.ADMIN_GUIRE,
    icon: <i className="fas fa-users"></i>,
  },
  {
    label: "Khách hàng",
    active: false,
    src: ROUTES.ADMIN_CUSTOMER,
    icon: <i className="fas fa-users"></i>,
  },
];
