import avatar from "assets/images/avatar.png";
import { ROUTES } from "constants/routerWeb";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { actionLogout } from "store/Login/action";
import "./index.scss";
function Header({ menuIcon, children }) {
  const {
    data: { user },
  } = useSelector((state) => state.loginReducer);

  const dispatch = useDispatch();
  const onLogout = () => dispatch(actionLogout());

  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(false);
  const handleLogout = () => {
    onLogout();
    navigate(ROUTES.LOGIN);
  };

  const handleChangePassword = () => {
    navigate(ROUTES.ADMIN_CHANGEPASSWORD);
  };
  return (
    <div className="header h-60px">
      <div className="d-flex h-100 justify-content-between align-items-center px-2">
        <div>{menuIcon}</div>
        {children}
        {/* Right header */}
        {user?.email ? (
          <div className=" d-flex justify-content-end align-items-center gap-4 mx-1 ms-auto">
            <div
              onClick={() => setIsActive((prev) => !prev)}
              className="account-header d-flex gap-2 align-items-center"
            >
              <img
                className="avatar-account"
                src={user?.image || avatar}
                alt="avatar"
              />
              <ul
                className={`${
                  !isActive ? "d-none" : ""
                } sub-menu-account list-unstyled`}
              >
                <li onClick={handleChangePassword}>
                  <Link className="text-dark">
                    <i className="fas fa-unlock-alt me-2"></i>
                    Đổi mật khẩu
                  </Link>
                </li>
                <li onClick={handleLogout}>
                  <Link className="text-dark">
                    <i className="fas fa-sign-out-alt me-2"></i>Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <Link to={ROUTES.LOGIN}>
            Login <i className="fas fa-sign-in-alt ms-1"></i>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
