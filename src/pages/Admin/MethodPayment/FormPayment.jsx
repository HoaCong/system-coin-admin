import ModalBlock from "components/common/Modal";
import UploadImage from "components/common/UploadImage";
import { useFormik } from "formik";
import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { actionUpdate } from "store/MethodPayment/action";
import * as Yup from "yup";

const initialData = {
  logo_bank: "",
  qrcode: "",
  bank_name: "",
  bank_number: "",
};

function FormPayment({
  data: { type, visible, info, index },
  infoPayment,
  onClear,
}) {
  const {
    actionStatus: { isLoading, isSuccess },
  } = useSelector((state) => state.methodPaymentReducer);
  const dispatch = useDispatch();
  const onUpdate = (body) => dispatch(actionUpdate(body));

  const formik = useFormik({
    initialValues: initialData,
    validationSchema: Yup.object({
      logo_bank: Yup.string().required("Vui lòng tải lên logo ngân hàng"),
      qrcode: Yup.string().required("Vui lòng tải lên qrcode"),
      bank_name: Yup.string().required("Vui lòng nhập tên ngân hàng"),
      bank_number: Yup.string().required("Vui lòng nhập số tài khoản"),
    }),
    onSubmit: (values) => {
      let payments = [];
      if (type === "create") {
        payments = [...(infoPayment?.payments || []), values];
      } else {
        payments = (infoPayment?.payments || []).map((item, idx) =>
          idx === index ? values : item
        );
      }
      onUpdate({
        ...infoPayment,
        payments,
      });
    },
  });

  useEffect(() => {
    if (!!info?.logo_bank) {
      formik.setValues(info);
    }
  }, [info]);

  useEffect(() => {
    if (isSuccess) {
      onClear();
      formik.resetForm();
    }
  }, [isSuccess]);

  const handleClose = () => {
    onClear();
    formik.resetForm();
  };

  const getTitle = {
    edit: "Chỉnh sửa tài khoản",
    create: "Thêm mới tài khoản",
  };

  return (
    <ModalBlock
      title={getTitle[type]}
      show={visible}
      onClose={handleClose}
      onSave={formik.handleSubmit}
      hideSave={type === "detail"}
      loading={isLoading}
      propsModal={{ size: "lg" }}
    >
      <Form className="row">
        <Form.Group className="col-6">
          <Form.Label htmlFor="bank_name">
            Tên ngân hàng <span className="required">*</span>
          </Form.Label>
          <Form.Control
            id="bank_name"
            name="bank_name"
            value={formik.values.bank_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.bank_name && !!formik.errors.bank_name}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.bank_name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="col-6">
          <Form.Label htmlFor="bank_number">
            Số tài khoản ngân hàng <span className="required">*</span>
          </Form.Label>
          <Form.Control
            as={NumericFormat}
            id="bank_number"
            name="bank_number"
            value={formik.values.bank_number}
            onChange={formik.handleChange}
            allowLeadingZeros
            allowNegative={false}
            onBlur={formik.handleBlur}
            isInvalid={
              formik.touched.bank_number && !!formik.errors.bank_number
            }
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.bank_number}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="col-6 mt-3">
          <Form.Label htmlFor="logo_bank">
            Logo ngân hàng <span className="required">*</span>
          </Form.Label>
          <UploadImage
            image={formik.values.logo_bank || ""}
            callback={(url) =>
              formik.handleChange({
                target: {
                  name: "logo_bank",
                  value: url,
                },
              })
            }
            geometry="radius"
            showUpload={type !== "detail"}
          />
          {formik?.touched?.logo_bank && !!formik.errors.logo_bank && (
            <Form.Text danger="true" bsPrefix="d-inline-block text-danger lh-1">
              {formik.errors.logo_bank}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="col-6 mt-3">
          <Form.Label htmlFor="qrcode">
            QR Code <span className="required">*</span>
          </Form.Label>
          <UploadImage
            idInputUpload="qrcode"
            image={formik.values.qrcode || ""}
            callback={(url) =>
              formik.handleChange({
                target: {
                  name: "qrcode",
                  value: url,
                },
              })
            }
            geometry="radius"
            showUpload={type !== "detail"}
          />
          {formik?.touched?.qrcode && !!formik.errors.qrcode && (
            <Form.Text danger="true" bsPrefix="d-inline-block text-danger lh-1">
              {formik.errors.qrcode}
            </Form.Text>
          )}
        </Form.Group>
      </Form>
    </ModalBlock>
  );
}

export default FormPayment;
