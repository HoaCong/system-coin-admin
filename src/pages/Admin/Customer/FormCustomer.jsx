/* eslint-disable react-hooks/exhaustive-deps */
import ModalBlock from "components/common/Modal";
// import UploadImage from "components/common/UploadImage";
import UploadImage from "components/common/UploadImage";
import _capitalize from "lodash/capitalize";
import _isEmpty from "lodash/isEmpty";
import _omit from "lodash/omit";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { actionAdd, actionEdit } from "store/Customer/action";
import { isValidPhoneNumber } from "../../../helper/functions";
const initialData = {
  full_name: "",
  email: "",
  phone: "",
  image: "",
  password: "",
  ref_email: "",
};

function FormCustomer({ data: { type, visible, info }, onClear }) {
  const {
    actionStatus: { isLoading, isSuccess },
  } = useSelector((state) => state.customerReducer);

  const dispatch = useDispatch();
  const onAddCustomer = (body) => dispatch(actionAdd(body));
  const onEditCustomer = (body) => dispatch(actionEdit(body));

  const [data, setData] = useState(initialData);

  const [error, setError] = useState(initialData);

  useEffect(() => {
    if (!_isEmpty(info)) {
      setData({ ...info });
    }
  }, [info]);

  useEffect(() => {
    if (isSuccess) {
      onClear();
      setData(initialData);
    }
  }, [isSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    setError((prevError) => ({ ...prevError, [name]: "" }));
  };

  const handleSubmit = () => {
    const tmpKey = Object.keys(_omit(data, "image"));
    let validates = true;
    tmpKey.forEach((key) => {
      if (data[key] === "") {
        setError((prevError) => ({
          ...prevError,
          [key]: `${_capitalize(key)} required`,
        }));
        validates = false;
      }
      if (
        data[key] !== "" &&
        key === "phone" &&
        !isValidPhoneNumber(data[key])
      ) {
        setError((prevError) => ({
          ...prevError,
          [key]: `${_capitalize(key)} invalid format`,
        }));
        validates = false;
      }
      // if (
      //   data[key] !== "" &&
      //   key === "password" &&
      //   !isValidCodePin(data[key])
      // ) {
      //   setError((prevError) => ({
      //     ...prevError,
      //     [key]: `${_capitalize(key)} includes 6 numeric characters`,
      //   }));
      //   validates = false;
      // }
    });
    if (validates) {
      if (type === "create") onAddCustomer({ ...data });
      if (type === "edit") onEditCustomer({ ...data });
    }
  };
  const handleClose = () => {
    onClear();
    setData(initialData);
    setError(initialData);
  };

  const getTitle = {
    edit: "Chỉnh sửa khách hàng",
    create: "Thêm mới khách hàng",
  };

  return (
    <ModalBlock
      title={getTitle[type]}
      show={visible}
      onClose={handleClose}
      onSave={handleSubmit}
      loading={isLoading}
      propsModal={{
        size: "lg",
      }}
    >
      <form className="row">
        <div className="col-6">
          <Form.Label htmlFor="Customername">
            Tên khách hàng <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="Customername"
            name="full_name"
            defaultValue={data.full_name}
            aria-describedby="helperCustomername"
            onChange={handleChange}
          />
          {error.full_name && (
            <Form.Text
              id="helperCustomername"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.full_name}
            </Form.Text>
          )}
        </div>
        <div className="col-6">
          <Form.Label htmlFor="Name">
            Email <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="email"
            id="Email"
            name="email"
            defaultValue={data.email}
            aria-describedby="helperEmail"
            onChange={handleChange}
            disabled={type === "edit"}
          />
          {error.email && (
            <Form.Text
              id="helperEmail"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.email}
            </Form.Text>
          )}
        </div>

        <div className="col-6 mt-3">
          <Form.Label htmlFor="Name">
            Số điện thoại <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="Phone"
            name="phone"
            maxLength={11}
            defaultValue={data.phone}
            aria-describedby="helperPhone"
            onChange={handleChange}
          />
          {error.phone && (
            <Form.Text
              id="helperPhone"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.phone}
            </Form.Text>
          )}
        </div>
        <div className="col-6 mt-3">
          <Form.Label htmlFor="ref_email">
            Email giới thiệu <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="email"
            id="ref_email"
            name="ref_email"
            defaultValue={data.ref_email}
            aria-describedby="helperref_email"
            disabled={type === "edit"}
            onChange={handleChange}
          />
          {error.ref_email && (
            <Form.Text
              id="helperref_email"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.ref_email}
            </Form.Text>
          )}
        </div>

        <div className="col-6 mt-3">
          <Form.Label htmlFor="Name">
            Mật khẩu <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="password"
            id="Password"
            name="password"
            defaultValue={data.password}
            aria-describedby="helperPassword"
            disabled={type === "detail" || type === "edit"}
            onChange={handleChange}
          />
          {error.password && (
            <Form.Text
              id="helperPassword"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.password}
            </Form.Text>
          )}
        </div>

        {type === "edit" && (
          <div className="col-6 mt-3">
            <Form.Label htmlFor="Image">Hình ảnh</Form.Label>
            <UploadImage
              image={data.image || ""}
              callback={(url) =>
                handleChange({
                  target: {
                    name: "image",
                    value: url,
                  },
                })
              }
              geometry="radius"
              showUpload={type !== "detail"}
            />
            {error.image && (
              <Form.Text
                id="helperImage"
                danger="true"
                bsPrefix="d-inline-block text-danger lh-1"
              >
                {error.image}
              </Form.Text>
            )}
          </div>
        )}
      </form>
    </ModalBlock>
  );
}

export default FormCustomer;
