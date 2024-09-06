// import Header from "components/header";
import Menu from "components/menu";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
// import styles
import Header from "components/header";
import "./layout.scss";
function AdminLayout(props) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="d-flex">
      <Menu collapsed={collapsed} />
      <main className="w-100">
        <Header
          menuIcon={
            <button
              className="btn-mobile px-2"
              onClick={() => {
                setCollapsed((prev) => !prev);
              }}
            >
              <i className="fas fa-bars fs-3"></i>
            </button>
          }
        ></Header>
        <div className="height-content p-2">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
