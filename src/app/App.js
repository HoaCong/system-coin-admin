/* eslint-disable react-hooks/exhaustive-deps */
import ImagePopup from "components/common/ImagePopup";
import ToastSnackbar from "components/common/ToastSnackbar";
import CheckTokenMiddleware from "middleware/checkToken";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { adminRoutes, managerRoutes, publicRoutes } from "router";
import "./index.scss";

function App() {
  const {
    data: { user },
  } = useSelector((state) => state.loginReducer);
  const { popup } = useSelector((state) => state.toastReducer);

  const listRouter = useCallback(() => {
    const adminMenu = [...publicRoutes, ...adminRoutes];
    const employeeMenu = [...publicRoutes, ...managerRoutes];
    const EnumRoutes = {
      ADMIN: adminMenu,
      EMPLOYEE: employeeMenu,
    };
    return EnumRoutes[user?.role_id] || EnumRoutes["ADMIN"];
  }, [user?.role_id]);

  const renderRoutes = useCallback((routes) => {
    return routes?.map((route, index) => {
      if (route.children?.length > 0) {
        return (
          <Route path={route.path} element={route.element} key={index}>
            {renderRoutes(route.children)}
          </Route>
        );
      }

      if (route.isRoot) {
        return <Route index element={route.element} key={index} />;
      }
      return <Route path={route.path} element={route.element} key={index} />;
    });
  }, []);

  return (
    <>
      <CheckTokenMiddleware>
        <Routes>{renderRoutes(listRouter())}</Routes>
      </CheckTokenMiddleware>
      <ToastSnackbar />
      {popup?.visible && <ImagePopup />}
    </>
  );
}

export default App;
