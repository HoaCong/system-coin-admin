import AdminLayout from "components/layout/AdminLayout";
import { ROUTES } from "constants/routerWeb";
import AdminChangePassword from "pages/Admin/ChangePassword";
import AdminCoin from "pages/Admin/Coin";
import AdminContact from "pages/Admin/Contact";
import AdminCustomer from "pages/Admin/Customer";
import AdminEmployee from "pages/Admin/Employee";
import AdminGuire from "pages/Admin/Guire";
import AdminHistories from "pages/Admin/Histories";
import AdminHistoriesDetail from "pages/Admin/HistoriesDetail";
import AdminHistoriesWithdraw from "pages/Admin/HistoriesWithdraw";
import AdminHistoriesWithdrawDetail from "pages/Admin/HistoriesWithdrawDetail";
import AdminMethodPayment from "pages/Admin/MethodPayment";
import AdminNews from "pages/Admin/News";
import Login from "pages/Login";
import PageNotFound from "pages/NotFoundPage";
// import Register from "pages/Register";

export const EnumHome = {
  ADMIN: ROUTES.ADMIN_HOME_PAGE,
  EMPLOYEE: ROUTES.ADMIN_HOME_PAGE,
};

export const adminRoutes = [
  {
    path: ROUTES.ADMIN_HOME_PAGE,
    name: "Admin Layout",
    element: <AdminLayout />,
    children: [
      { isRoot: true, name: "Histories Page", element: <AdminHistories /> },
      {
        path: ROUTES.ADMIN_EMPLOYEE,
        name: "Employee Page",
        element: <AdminEmployee />,
      },
      {
        path: ROUTES.ADMIN_CHANGEPASSWORD,
        name: "Change Password Page",
        element: <AdminChangePassword />,
      },
      {
        path: ROUTES.ADMIN_COIN,
        name: "Coin Page",
        element: <AdminCoin />,
      },
      {
        path: ROUTES.ADMIN_HISTORIES,
        name: "Histories Page",
        element: <AdminHistories />,
      },
      {
        path: ROUTES.ADMIN_HISTORIES_WITHDRAW,
        name: "Histories Withdraw Page",
        element: <AdminHistoriesWithdraw />,
      },
      {
        path: ROUTES.ADMIN_HISTORIES_DETAIL,
        name: "Histories Detail Page",
        element: <AdminHistoriesDetail />,
      },
      {
        path: ROUTES.ADMIN_HISTORIES_WITHDRAW_DETAIL,
        name: "Histories Withdraw Detail Page",
        element: <AdminHistoriesWithdrawDetail />,
      },
      {
        path: ROUTES.ADMIN_NEWS,
        name: "News Page",
        element: <AdminNews />,
      },
      {
        path: ROUTES.ADMIN_GUIRE,
        name: "Guire Page",
        element: <AdminGuire />,
      },
      {
        path: ROUTES.ADMIN_CUSTOMER,
        name: "Customer Page",
        element: <AdminCustomer />,
      },
      {
        path: ROUTES.ADMIN_CONTACT,
        name: "Contact Page",
        element: <AdminContact />,
      },
      {
        path: ROUTES.ADMIN_METHOD_PAYMENT,
        name: "Method Page",
        element: <AdminMethodPayment />,
      },
      { path: "*", name: "Not Found Page", element: <PageNotFound /> },
    ],
  },
];

export const managerRoutes = [];

export const userRoutes = [];

export const publicRoutes = [
  {
    path: ROUTES.LOGIN,
    name: "LOGIN",
    element: <Login />,
  },
  // {
  //   path: ROUTES.REGISTER,
  //   name: "REGISTER",
  //   element: <Register />,
  // },
  { path: "*", name: "Not Found Page", element: <PageNotFound /> },
];
