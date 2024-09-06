/* eslint-disable react-hooks/exhaustive-deps */
import ModalBlock from "components/common/Modal";
import _capitalize from "lodash/capitalize";
import _isEmpty from "lodash/isEmpty";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { actionAdd, actionEdit } from "store/Coin/action";
const initialData = {
  name: "",
  sodu: "",
  address_pay: "",
};
function FormCoin({ data: { type, visible, info }, onClear }) {
  const {
    actionStatus: { isLoading, isSuccess },
  } = useSelector((state) => state.coinReducer);

  const dispatch = useDispatch();
  const onAddCategory = (body) => dispatch(actionAdd(body));
  const onEditCategory = (body) => dispatch(actionEdit(body));

  const [data, setData] = useState(initialData);

  const [error, setError] = useState(initialData);

  useEffect(() => {
    if (!_isEmpty(info)) setData(info);
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
    const tmpKey = Object.keys(data);
    let validates = true;
    tmpKey.forEach((key) => {
      if (data[key] === "") {
        setError((prevError) => ({
          ...prevError,
          [key]: `${_capitalize(key)} required`,
        }));
        validates = false;
      }
    });
    if (validates) {
      if (type === "create") onAddCategory(data);
      if (type === "edit") onEditCategory(data);
    }
  };
  const handleClose = () => {
    onClear();
    setData(initialData);
    setError(initialData);
  };

  const getTitle = {
    detail: "Thông tin coin",
    edit: "Chỉnh sửa coin",
    create: "Thêm mới coin",
  };
  return (
    <ModalBlock
      title={getTitle[type]}
      show={visible}
      onClose={handleClose}
      onSave={handleSubmit}
      hideSave={type === "detail"}
      loading={isLoading}
    >
      <form>
        <div>
          <Form.Label htmlFor="name">
            Tên coin <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="name"
            name="name"
            defaultValue={data.name || ""}
            aria-describedby="helpername"
            disabled={type === "detail"}
            onChange={handleChange}
          />
          {error.name && (
            <Form.Text
              id="helpername"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.name}
            </Form.Text>
          )}
        </div>
        <div className="mt-3">
          <Form.Label htmlFor="sodu">
            Số dư <span className="required">*</span>
          </Form.Label>
          <Form.Control
            id="sodu"
            name="sodu"
            defaultValue={data.sodu || ""}
            aria-describedby="helpersodu"
            disabled={type === "detail"}
            onChange={handleChange}
          />
          {error.sodu && (
            <Form.Text
              id="helpersodu"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.sodu}
            </Form.Text>
          )}
        </div>
        <div className="mt-3">
          <Form.Label htmlFor="address_pay">
            Địa chỉ mua<span className="required">*</span>
          </Form.Label>
          <Form.Control
            id="address_pay"
            name="address_pay"
            defaultValue={data.address_pay || ""}
            aria-describedby="helperaddress_pay"
            disabled={type === "detail"}
            onChange={handleChange}
          />
          {error.address_pay && (
            <Form.Text
              id="helperaddress_pay"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.address_pay}
            </Form.Text>
          )}
        </div>
      </form>
    </ModalBlock>
  );
}

export default FormCoin;
