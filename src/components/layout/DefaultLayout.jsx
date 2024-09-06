import Header from "components/header/HeaderUser";
import { Outlet } from "react-router-dom";
import "./layout.scss";
function DefaultLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default DefaultLayout;
