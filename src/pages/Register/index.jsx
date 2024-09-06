import { ROUTES } from "constants/routerWeb";
import _capitalize from "lodash/capitalize";
import { useState } from "react";
import { Alert, Button, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import BackgroundImage from "../../assets/images/bg.jpg";
import Logo from "../../assets/images/logo.jpg";
import "../Login/index.scss";

const Login = () => {
  // state local
  const navigate = useNavigate();
  const [noti, setNoti] = useState("");
  const [formdata, setData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    username: "",
    password: "",
  });
  // function local
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    setError((prevError) => ({ ...prevError, [name]: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const tmpKey = Object.keys(formdata);
    let validates = true;
    tmpKey.forEach((key) => {
      if (formdata[key] === "") {
        setError((prevError) => ({
          ...prevError,
          [key]: `${_capitalize(key)} required`,
        }));
        validates = false;
      }
    });
    if (validates) {
      // dispatch
      if (
        process.env.REACT_APP_USERNAME === formdata.username &&
        process.env.REACT_APP_PASSWORD === formdata.password
      ) {
        localStorage.setItem(
          "exprired_1",
          new Date().getTime() + 3 * 60 * 60 * 1000
        ); // 3h
        setTimeout(() => {
          navigate(ROUTES.HOME_PAGE);
        }, 1000);
      } else {
        setNoti("Tài khoản mật khẩu không đúng");
      }
    }
  };

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Header */}
      <img
        className="mx-auto d-block mb-2"
        src={Logo}
        width={70}
        height="auto"
        alt="logo"
      />
      {/* Form */}
      <Form className="shadow rounded text-white" onSubmit={handleSubmit}>
        {/* ALert */}
        {noti && (
          <Alert variant="danger" onClose={() => setNoti("")} dismissible>
            <span>{noti}</span>
          </Alert>
        )}

        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Họ tên</Form.Label>
          <InputGroup>
            <Form.Control
              name="username"
              placeholder="Họ tên"
              onChange={handleChange}
            />
            <InputGroup.Text>
              <i className="fas fa-envelope text-secondary"></i>
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Mật khẩu</Form.Label>
          <InputGroup>
            <Form.Control
              name="password"
              placeholder="Mật khẩu"
              onChange={handleChange}
            />
            <InputGroup.Text>
              <i className="fas fa-envelope text-secondary"></i>
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-2" controlId="re-password">
          <Form.Label>Nhập lại mật khẩu</Form.Label>
          <InputGroup>
            <Form.Control
              name="re-password"
              placeholder="Nhập lại mật khẩu"
              onChange={handleChange}
            />
            <InputGroup.Text>
              <i className="fas fa-envelope text-secondary"></i>
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-2" controlId="phone">
          <Form.Label>Điện thoại (EX: +84 909397989)</Form.Label>
          <InputGroup>
            <Form.Control
              name="phone"
              placeholder="Điện thoại"
              onChange={handleChange}
            />
            <InputGroup.Text>
              <i className="fas fa-envelope text-secondary"></i>
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <small className="d-block text-warning text-12">
          <i>
            Vui lòng nhập đúng email của bạn để kích hoạt tài khoản giao dịch
          </i>
        </small>

        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Email đăng nhập</Form.Label>
          <InputGroup>
            <Form.Control
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <InputGroup.Text>
              <i className="fas fa-envelope text-secondary"></i>
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        {!!error.email && (
          <small className="d-block text-danger -mt-1 mb-2">
            {error.email}
          </small>
        )}

        <Form.Group className="mb-2" controlId="re_email">
          <Form.Label>Nhập lại Email</Form.Label>
          <InputGroup>
            <Form.Control
              name="re_email"
              placeholder="Nhập lại Email"
              onChange={handleChange}
            />
            <InputGroup.Text>
              <i className="fas fa-envelope text-secondary"></i>
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        {!!error.re_email && (
          <small className="d-block text-danger -mt-1 mb-2">
            {error.re_email}
          </small>
        )}

        <Form.Group className="mb-2" controlId="email_ref">
          <Form.Label>Email người giới thiệu</Form.Label>
          <InputGroup>
            <Form.Control
              name="email_ref"
              placeholder="Bạn có thể để trống"
              onChange={handleChange}
            />
            <InputGroup.Text>
              <i className="fas fa-envelope text-secondary"></i>
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Button
          // disabled={isLoading}
          className="w-100 btn-fill mt-3"
          variant="primary"
          type="submit"
        >
          {false ? "Đang đăng ký..." : "Đăng ký"}
        </Button>

        <div className="d-flex justify-content-between mt-3">
          <Link to="/login">Đăng nhập</Link>
          <Link>Quên mật khẩu?</Link>
        </div>
      </Form>
      <Link to="/" className="text-white cursor-pointer">
        <small> [ Quay lại trang chủ ]</small>
      </Link>
    </div>
  );
};

export default Login;
