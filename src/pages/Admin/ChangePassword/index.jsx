import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionChangePassword } from "store/ChangePassword/action";

const ChangePassword = () => {
  const {
    data: { user },
  } = useSelector((state) => state.loginReducer);
  const {
    status: { isLoading, isSuccess },
  } = useSelector((state) => state.changePasswordReducer);

  const dispatch = useDispatch();
  const onChangePassword = (params) => dispatch(actionChangePassword(params));

  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setData({
        password: "",
        confirmPassword: "",
      });
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  }, [isSuccess]);

  const validateForm = () => {
    const newErrors = {};
    const regex = /^(?=.*[a-zA-Z\d!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!data.password) {
      newErrors.password = "Mật khẩu là bắt buộc";
    } else if (!regex.test(data.password)) {
      newErrors.password =
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số";
    }

    if (!data.confirmPassword || data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      onChangePassword({
        id: user.id,
        email: user.email,
        password: data.password,
      });
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => {
      const { [name]: removedError, ...rest } = prevErrors;
      return rest;
    });
  };

  return (
    <div className="mx-auto w-100" style={{ maxWidth: 400 }}>
      <h4 className="text-center">Đổi mật khẩu</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="password">Mật khẩu</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
            />
            <InputGroup.Text
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
              className="rounded-end"
            >
              {showPassword ? (
                <i className="fas fa-eye"></i>
              ) : (
                <i className="fas fa-eye-slash"></i>
              )}
            </InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label htmlFor="confirmPassword">Xác nhận mật khẩu</Form.Label>
          <InputGroup>
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              isInvalid={!!errors.confirmPassword}
            />
            <InputGroup.Text
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{ cursor: "pointer" }}
              className="rounded-end"
            >
              {showConfirmPassword ? (
                <i className="fas fa-eye"></i>
              ) : (
                <i className="fas fa-eye-slash"></i>
              )}
            </InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Button type="submit" className="mt-3" disabled={isLoading}>
          {isLoading && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="me-2"
            />
          )}
          Đổi mật khẩu
        </Button>
      </Form>
    </div>
  );
};

export default ChangePassword;
