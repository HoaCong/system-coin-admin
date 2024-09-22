import TemplateContent from "components/layout/TemplateContent";
import { useFormik } from "formik";
import { handleUploadImage } from "helper/functions";
import { useEffect } from "react";
import { Button, Col, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import {
  actionGetInfo,
  actionUpdate,
  resetData,
} from "store/MethodPayment/action";
import { addToast } from "store/Toast/action";
import * as Yup from "yup";

function MethodPayment(props) {
  const {
    infoStatus: { isLoading, isSuccess },
    actionStatus: { isLoading: actionLoading },
    info,
  } = useSelector((state) => state.methodPaymentReducer);
  const dispatch = useDispatch();
  const onGetInfo = () => dispatch(actionGetInfo());
  const onUpdate = (body) => dispatch(actionUpdate(body));
  const onResetData = () => dispatch(resetData());
  const onAddToast = (data) => dispatch(addToast(data));

  // Cập nhật validation schema
  const validationSchema = Yup.object({
    banking1: Yup.string().required("Vui lòng nhập thẻ ngân hàng 1"),
    banking2: Yup.string().required("Vui lòng nhập thẻ ngân hàng 2"),
    momo_pay: Yup.string().required("Vui lòng nhập thẻ Momo"),
    icon_banking1: Yup.string().required("Vui lòng nhập icon ngân hàng 1"),
    icon_banking2: Yup.string().required("Vui lòng nhập icon ngân hàng 2"),
    icon_momo: Yup.string().required("Vui lòng nhập icon Momo"),
    fee_order: Yup.number().required("Vui lòng nhập phí giao dịch"),
  });

  const formik = useFormik({
    initialValues: {
      banking1: "",
      banking2: "",
      momo_pay: "",
      icon_banking1: "",
      icon_banking2: "",
      icon_momo: "",
      fee_order: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onUpdate(values);
      formik.resetForm({ values });
    },
  });

  useEffect(() => {
    if (!isLoading) onGetInfo();
    return () => {
      onResetData();
    };
  }, []);

  useEffect(() => {
    if (isSuccess) formik.resetForm({ values: info });
  }, [isSuccess]);

  const onUploadImage = (event, name) => {
    handleUploadImage(
      event,
      (url) => {
        formik.setFieldValue(name, url);
        onAddToast({
          text: "Tải ảnh lên thành công",
          type: "success",
          title: "",
        });
      },
      (error) => {
        console.log("onUploadImage  error:", error);
        onAddToast({
          text: "Đã xảy ra lỗi, Vui lòng thử lại",
          type: "danger",
          title: "",
          life: 10000,
        });
      }
    );
  };

  return (
    <div className="mb-5">
      <TemplateContent title="Phương thức thanh toán">
        <Form as={Row}>
          <Form.Group
            as={Col}
            xs={12}
            md={6}
            className="mb-2"
            controlId="icon_banking1"
          >
            <Form.Label className="mb-0">Icon Ngân hàng 1</Form.Label>
            <InputGroup>
              <Form.Control
                className="shadow-none"
                placeholder="Icon ngân hàng 1"
                value={formik.values.icon_banking1}
                onChange={formik.handleChange}
                isInvalid={
                  formik.touched.icon_banking1 && formik.errors.icon_banking1
                }
              />
              <Form.Control
                type="file"
                name="image"
                onChange={(e) => onUploadImage(e, "icon_banking1")}
              />
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              {formik.errors.icon_banking1}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            as={Col}
            xs={12}
            md={6}
            className="mb-2"
            controlId="banking1"
          >
            <Form.Label className="mb-0">Ngân hàng 1</Form.Label>
            <InputGroup>
              <Form.Control
                className="shadow-none"
                placeholder="Ngân hàng 1"
                value={formik.values.banking1}
                onChange={formik.handleChange}
                isInvalid={formik.touched.banking1 && formik.errors.banking1}
              />
              <Form.Control
                type="file"
                name="image"
                onChange={(e) => onUploadImage(e, "banking1")}
              />
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              {formik.errors.banking1}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            as={Col}
            xs={12}
            md={6}
            className="mb-2"
            controlId="icon_banking2"
          >
            <Form.Label className="mb-0">Icon Ngân hàng 2</Form.Label>
            <InputGroup>
              <Form.Control
                className="shadow-none"
                placeholder="Icon ngân hàng 2"
                value={formik.values.icon_banking2}
                onChange={formik.handleChange}
                isInvalid={
                  formik.touched.icon_banking2 && formik.errors.icon_banking2
                }
              />
              <Form.Control
                type="file"
                name="image"
                onChange={(e) => onUploadImage(e, "icon_banking2")}
              />
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              {formik.errors.icon_banking2}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            as={Col}
            xs={12}
            md={6}
            className="mb-2"
            controlId="banking2"
          >
            <Form.Label className="mb-0">Ngân hàng 2</Form.Label>
            <InputGroup>
              <Form.Control
                className="shadow-none"
                placeholder="Ngân hàng 2"
                value={formik.values.banking2}
                onChange={formik.handleChange}
                isInvalid={formik.touched.banking2 && formik.errors.banking2}
              />
              <Form.Control
                type="file"
                name="image"
                onChange={(e) => onUploadImage(e, "banking2")}
              />
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              {formik.errors.banking2}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            as={Col}
            xs={12}
            md={6}
            className="mb-2"
            controlId="icon_momo"
          >
            <Form.Label className="mb-0">Icon Momo</Form.Label>
            <InputGroup>
              <Form.Control
                className="shadow-none"
                placeholder="Icon Momo"
                value={formik.values.icon_momo}
                onChange={formik.handleChange}
                isInvalid={formik.touched.icon_momo && formik.errors.icon_momo}
              />
              <Form.Control
                type="file"
                name="image"
                onChange={(e) => onUploadImage(e, "icon_momo")}
              />
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              {formik.errors.icon_momo}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            as={Col}
            xs={12}
            md={6}
            className="mb-2"
            controlId="momo_pay"
          >
            <Form.Label className="mb-0">Momo</Form.Label>
            <InputGroup>
              <Form.Control
                className="shadow-none"
                placeholder="Momo"
                value={formik.values.momo_pay}
                onChange={formik.handleChange}
                isInvalid={formik.touched.momo_pay && formik.errors.momo_pay}
              />
              <Form.Control
                type="file"
                name="image"
                onChange={(e) => onUploadImage(e, "momo_pay")}
              />
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              {formik.errors.momo_pay}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            as={Col}
            xs={12}
            md={6}
            className="mb-2"
            controlId="fee_order"
          >
            <Form.Label className="mb-0">Phí giao dịch</Form.Label>
            <Form.Control
              as={NumericFormat}
              name="fee_order"
              placeholder="Thiết lập phí giao dịch"
              value={formik.values.fee_order}
              onChange={formik.handleChange}
              allowNegative={false}
              isInvalid={formik.touched.fee_order && formik.errors.fee_order}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.fee_order}
            </Form.Control.Feedback>
          </Form.Group>

          <div>
            <Button
              onClick={formik.handleSubmit}
              disabled={!formik?.dirty || actionLoading}
            >
              {actionLoading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              Cập nhật
            </Button>
          </div>
        </Form>
      </TemplateContent>
    </div>
  );
}

export default MethodPayment;
