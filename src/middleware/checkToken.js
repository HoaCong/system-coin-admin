/* eslint-disable react-hooks/exhaustive-deps */
import { ROUTES } from "constants/routerWeb";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { EnumHome } from "router";
const checkTimeExpired = (timeExpired) => {
  const now = new Date().getTime();
  return now > timeExpired;
};

const CheckTokenMiddleware = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    data: { access_token, timeExpired, user },
  } = useSelector((state) => state.loginReducer);

  useEffect(() => {
    // lofgic check token
    const isLoginPage = [ROUTES.LOGIN, ROUTES.REGISTER].includes(pathname);
    if (!access_token || checkTimeExpired(timeExpired)) {
      if (isLoginPage) return;
      return navigate(ROUTES.LOGIN);
    } else if (isLoginPage) {
      return navigate(EnumHome[user?.role_id]);
    }
  }, [access_token, pathname]);

  return children;
};

export default CheckTokenMiddleware;
