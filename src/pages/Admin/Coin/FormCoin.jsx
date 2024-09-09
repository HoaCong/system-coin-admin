/* eslint-disable react-hooks/exhaustive-deps */
import ModalBlock from "components/common/Modal";
import UploadImage from "components/common/UploadImage";
import { useFormik } from "formik";
import { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionAdd, actionEdit, resetDataAction } from "store/Coin/action";
import * as Yup from "yup";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Tên coin là bắt buộc"),
  image: Yup.string().required("Image là bắt buộc"),
  sodu: Yup.number().required("Số dư là bắt buộc"),
  giamua: Yup.number().required("Giá mua là bắt buộc"),
  giaban: Yup.number().required("Giá bán là bắt buộc"),
  address_pay: Yup.string().required("Địa chỉ mua là bắt buộc"),
});

const initialData = {
  name: "",
  image: "",
  sodu: "",
  giamua: "",
  giaban: "",
  address_pay: "",
};

function FormCoin({ data: { type, visible, info }, onClear }) {
  const {
    actionStatus: { isLoading, isSuccess },
  } = useSelector((state) => state.coinReducer);

  const dispatch = useDispatch();
  const onAddCoin = (body) => dispatch(actionAdd(body));
  const onEditCoin = (body) => dispatch(actionEdit(body));
  const onResetDataAction = () => dispatch(resetDataAction());

  const formik = useFormik({
    initialValues: info || initialData,
    validationSchema,
    onSubmit: (values) => {
      if (type === "create") onAddCoin(values);
      if (type === "edit") onEditCoin(values);
    },
  });
  console.log(111111, formik.values);

  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess]);

  const handleClose = () => {
    onClear();
    onResetDataAction();
    formik.resetForm();
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
      onSave={formik.handleSubmit}
      hideSave={type === "detail"}
      loading={isLoading}
    >
      <Form>
        <Row>
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label htmlFor="name">
                Tên coin <span className="required">*</span>
              </Form.Label>
              <Form.Control
                id="name"
                name="name"
                type="text"
                disabled={type === "detail"}
                value={formik.values.name}
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <Form.Text className="text-danger">
                  {formik.errors.name}
                </Form.Text>
              ) : null}
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label htmlFor="sodu">
                Số dư <span className="required">*</span>
              </Form.Label>
              <Form.Control
                id="sodu"
                name="sodu"
                type="number"
                disabled={type === "detail"}
                value={formik.values.sodu}
                {...formik.getFieldProps("sodu")}
              />
              {formik.touched.sodu && formik.errors.sodu ? (
                <Form.Text className="text-danger">
                  {formik.errors.sodu}
                </Form.Text>
              ) : null}
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col xs={12} md={6}>
            <Form.Group className="mt-3 mt-md-0">
              <Form.Label htmlFor="giamua">
                Giá mua <span className="required">*</span>
              </Form.Label>
              <Form.Control
                id="giamua"
                name="giamua"
                type="number"
                disabled={type === "detail"}
                value={formik.values.giamua}
                {...formik.getFieldProps("giamua")}
              />
              {formik.touched.giamua && formik.errors.giamua ? (
                <Form.Text className="text-danger">
                  {formik.errors.giamua}
                </Form.Text>
              ) : null}
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label htmlFor="giaban">
                Giá bán <span className="required">*</span>
              </Form.Label>
              <Form.Control
                id="giaban"
                name="giaban"
                type="number"
                disabled={type === "detail"}
                value={formik.values.giaban}
                {...formik.getFieldProps("giaban")}
              />
              {formik.touched.giaban && formik.errors.giaban ? (
                <Form.Text className="text-danger">
                  {formik.errors.giaban}
                </Form.Text>
              ) : null}
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col xs={12} md={6}>
            <Form.Group className="mt-3 mt-md-0">
              <Form.Label htmlFor="address_pay">
                Địa chỉ mua <span className="required">*</span>
              </Form.Label>
              <Form.Control
                id="address_pay"
                name="address_pay"
                type="text"
                disabled={type === "detail"}
                value={formik.values.address_pay}
                {...formik.getFieldProps("address_pay")}
              />
              {formik.touched.address_pay && formik.errors.address_pay ? (
                <Form.Text className="text-danger">
                  {formik.errors.address_pay}
                </Form.Text>
              ) : null}
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Label htmlFor="Image">
              Hình ảnh <span className="required">*</span>
            </Form.Label>
            <UploadImage
              image={formik.values.image || ""}
              callback={(url) =>
                formik.handleChange({
                  target: {
                    name: "image",
                    value: url,
                  },
                })
              }
              geometry="radius"
              showUpload={type !== "detail"}
            />
            {formik.touched.image && formik.errors.image ? (
              <Form.Text className="text-danger">
                {formik.errors.image}
              </Form.Text>
            ) : null}
          </Col>
        </Row>
      </Form>
    </ModalBlock>
  );
}

export default FormCoin;
