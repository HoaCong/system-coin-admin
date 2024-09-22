/* eslint-disable react-hooks/exhaustive-deps */
import TemplateContent from "components/layout/TemplateContent";
import { useFormik } from "formik";
import { useEffect } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import {
  actionGetInfo,
  actionUpdate,
  resetData,
} from "store/MethodPayment/action";
import * as Yup from "yup";
function MethodPayment(props) {
  const {
    infoStatus: { isLoading, isSuccess, isFailure },
    actionStatus: { isLoading: actionLoading, isSuccess: actionSuccess },
    info,
  } = useSelector((state) => state.methodPaymentReducer);
  const dispatch = useDispatch();
  const onGetInfo = () => dispatch(actionGetInfo());
  const onUpdate = (body) => dispatch(actionUpdate(body));
  const onResetData = () => dispatch(resetData());

  const validationSchema = Yup.object({
    // banking1: Yup.string().required("Vui lòng nhập thẻ"),
    // banking2: Yup.string().required("Required"),
    // momo_pay: Yup.string().required("Required"),
    // fee_order: Yup.number().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      banking1: "",
      banking2: "",
      momo_pay: "",
      fee_order: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Xử lý khi submit form
      console.log("Form values:", values);
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

  return (
    <div className="mb-5">
      <TemplateContent title="Phương thức thanh toán">
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-2" controlId="banking1">
            <Form.Label className="mb-0">Ngân hàng 1</Form.Label>
            <Form.Control
              type="text"
              name="banking1"
              placeholder="Nhập thông tin ngân hàng 1"
              value={formik.values.banking1}
              onChange={formik.handleChange}
              isInvalid={formik.touched.banking1 && formik.errors.banking1}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.banking1}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2" controlId="banking2">
            <Form.Label className="mb-0">Ngân hàng 2</Form.Label>
            <Form.Control
              type="text"
              name="banking2"
              placeholder="Nhập thông tin ngân hàng 2"
              value={formik.values.banking2}
              onChange={formik.handleChange}
              isInvalid={formik.touched.banking2 && formik.errors.banking2}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.banking2}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2" controlId="momo_pay">
            <Form.Label className="mb-0">Momo</Form.Label>
            <Form.Control
              type="text"
              name="momo_pay"
              placeholder="Nhập thông tin momo"
              value={formik.values.momo_pay}
              onChange={formik.handleChange}
              isInvalid={formik.touched.momo_pay && formik.errors.momo_pay}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.momo_pay}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2" controlId="fee_order">
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
          <Button type="submit" disabled={!formik?.dirty || actionLoading}>
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
        </Form>
      </TemplateContent>
    </div>
  );
}

export default MethodPayment;
