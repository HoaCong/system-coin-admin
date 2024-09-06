import _capitalize from "lodash/capitalize";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import BackgroundImage from "../../assets/images/bg.jpg";
import Logo from "../../assets/images/logo.jpg";
import "./index.scss";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EnumHome } from "router";
import { actionLogin } from "store/Login/action";

function Login() {
  // state store
  const loginState = useSelector((state) => state.loginReducer);
  // action store
  const dispatch = useDispatch();
  const onLogin = (body) => dispatch(actionLogin(body, true));
  const {
    loginStatus: { isLoading, isSuccess, isFailure },
    data,
  } = loginState;

  const { user } = data;

  // state local
  const navigate = useNavigate();
  const [formdata, setData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (isSuccess) {
      navigate(EnumHome[user.role_id]);
    }
  }, [navigate, isSuccess]);

  useEffect(() => {
    if (isFailure)
      setError((prevError) => ({
        ...prevError,
        password: data?.error,
      }));
  }, [isFailure]);

  // function local
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    setError((prevError) => ({ ...prevError, [name]: "" }));
    if (isFailure) setError((prevError) => ({ ...prevError, password: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
      onLogin({ email: formdata.username, password: formdata.password });
    }
  };

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Header */}
      <img
        className="mx-auto d-block mb-2 rounded-circle"
        src={Logo}
        width={70}
        height="auto"
        alt="logo"
      />
      {/* Form */}
      <Form className="shadow rounded text-white" onSubmit={handleSubmit}>
        {/* {noti && (
          <Alert variant="danger" onClose={() => setNoti("")} dismissible>
            <span>{noti}</span>
          </Alert>
        )} */}

        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Email</Form.Label>
          <InputGroup>
            <Form.Control
              name="username"
              placeholder="Email"
              onChange={handleChange}
            />
            <InputGroup.Text>
              <i className="fas fa-envelope text-secondary"></i>
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        {!!error.username && (
          <small className="d-block text-danger -mt-1 mb-2">
            {error.username}
          </small>
        )}

        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Mật khẩu</Form.Label>
          <InputGroup>
            <Form.Control
              type="password"
              name="password"
              placeholder="Mật khẩu"
              onChange={handleChange}
            />
            <InputGroup.Text>
              <i className="fas fa-lock text-secondary"></i>
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        {!!error.password && (
          <small className="d-block text-danger -mt-1 mb-2">
            {error.password}
          </small>
        )}

        <Button
          className="w-100 btn-fill mt-4 d-flex justify-content-center align-items-center"
          variant="primary"
          type="submit"
          disabled={isLoading}
        >
          {isLoading && (
            <div
              className="spinner-border text-white me-2"
              role="status"
              style={{ width: 16, height: 16 }}
            ></div>
          )}
          Đăng nhập
        </Button>

        <div className="d-flex justify-content-between mt-3">
          <Link>Quên mật khẩu?</Link>
        </div>
      </Form>
      <Link to="/" className="text-white cursor-pointer">
        <small> [ Quay lại trang chủ ]</small>
      </Link>
    </div>
  );
}

export default Login;
