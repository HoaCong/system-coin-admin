/* eslint-disable react-hooks/exhaustive-deps */
import ModalBlock from "components/common/Modal";
import UploadImage from "components/common/UploadImage";
import _capitalize from "lodash/capitalize";
import _isEmpty from "lodash/isEmpty";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { actionAdd, actionEdit } from "store/News/action";
const initialData = {
  title: "",
  image: "",
  content: "",
};
function FormNews({ data: { type, visible, info }, onClear }) {
  const {
    actionStatus: { isLoading, isSuccess },
  } = useSelector((state) => state.newsReducer);

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
    detail: "Thông tin tin tức",
    edit: "Chỉnh sửa tin tức",
    create: "Thêm mới tin tức",
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
          <Form.Label htmlFor="title">
            Tiêu đề <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="title"
            name="title"
            defaultValue={data.title || ""}
            aria-describedby="helpertitle"
            disabled={type === "detail"}
            onChange={handleChange}
          />
          {error.title && (
            <Form.Text
              id="helpertitle"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.title}
            </Form.Text>
          )}
        </div>
        <div className="mt-3">
          <Form.Label htmlFor="Content">
            Nội dung <span className="required">*</span>
          </Form.Label>
          <Form.Control
            as="textarea"
            id="Content"
            name="content"
            defaultValue={data.content || ""}
            aria-describedby="helperContent"
            disabled={type === "detail"}
            onChange={handleChange}
          />
          {error.content && (
            <Form.Text
              id="helperContent"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.content}
            </Form.Text>
          )}
        </div>
        <div className="mt-3">
          <Form.Label htmlFor="Image">
            Hình ảnh <span className="required">*</span>
          </Form.Label>
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
      </form>
    </ModalBlock>
  );
}

export default FormNews;
