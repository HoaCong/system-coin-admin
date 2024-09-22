import ActionTable from "components/common/ActionTable";
import CustomTooltip from "components/common/CustomTooltip";
import LazyLoadImage from "components/common/LazyLoadImage";
import TemplateContent from "components/layout/TemplateContent";
import { useFormik } from "formik";
import _size from "lodash/size";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import {
  actionGetInfo,
  actionUpdate,
  resetData,
} from "store/MethodPayment/action";
import * as Yup from "yup";
import FormPayment from "./FormPayment";

function MethodPayment(props) {
  const {
    infoStatus: { isLoading, isSuccess },
    actionStatus: { isLoading: actionLoading, isSuccess: actionSuccess },
    info,
  } = useSelector((state) => state.methodPaymentReducer);
  const dispatch = useDispatch();
  const onGetInfo = () => dispatch(actionGetInfo());
  const onUpdate = (body) => dispatch(actionUpdate(body));
  const onResetData = () => dispatch(resetData());

  const [detail, setDetail] = useState({
    info: {},
    visible: false,
    type: "",
    index: null,
  });
  const [tooltip, setTooltip] = useState({
    target: null,
    visible: false,
    info: null,
    type: "",
    index: null,
  });

  const onCloseTooltip = () => {
    setTooltip({
      visible: false,
      target: null,
      info: null,
      type: "",
      index: null,
    });
  };

  const handleDelete = () => {
    onUpdate({
      ...info,
      payments: info.payments.filter((_i, index) => index !== tooltip.index),
    });
  };

  // Cập nhật validation schema
  const validationSchema = Yup.object({
    fee_order: Yup.number().required("Vui lòng nhập phí giao dịch"),
  });

  const formik = useFormik({
    initialValues: {
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

  useEffect(() => {
    if (actionSuccess) onCloseTooltip();
  }, [actionSuccess]);

  return (
    <div className="mb-5">
      <TemplateContent
        title="Phương thức thanh toán"
        showNew
        btnProps={{
          onClick: () =>
            setDetail((prev) => ({ ...prev, visible: true, type: "create" })),
        }}
      >
        <Form as={Row} className="align-items-end">
          <Form.Group as={Col} xs={12} md={6} controlId="fee_order">
            <Form.Label className="mb-0">Phí giao dịch (%)</Form.Label>
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

          <Col className="align-items-end">
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
          </Col>
        </Form>
        <div className="mt-3">
          <div
            className="d-flex w-100 overflow-auto h-100"
            style={{ maxHeight: "calc(100vh - 380px)" }}
          >
            <table className="table table-hover table-striped">
              <thead className="sticky-top">
                <tr>
                  <th scope="col" className="align-middle">
                    #
                  </th>
                  <th scope="col" className="align-middle">
                    Logo ngân hàng
                  </th>
                  <th scope="col" className="align-middle">
                    QR
                  </th>
                  <th scope="col" className="align-middle">
                    Ngân hàng
                  </th>
                  <th scope="col" className="align-middle">
                    Số tài khoản
                  </th>
                  <th scope="col" className="align-middle">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading && _size(info?.payments) === 0 && (
                  <tr>
                    <td colSpan={10}>
                      <div
                        className="d-flex justify-content-center align-items-center w-100"
                        style={{ height: 400 }}
                      >
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      </div>
                    </td>
                  </tr>
                )}
                {isSuccess && _size(info?.payments) === 0 && (
                  <tr>
                    <td colSpan={10} align="center">
                      Chưa thiết lập tài khoản ngân hàng nào
                    </td>
                  </tr>
                )}
                {info?.payments?.map((item, index) => (
                  <tr key={item.updatedAt + index}>
                    <th scope="row" className="align-middle">
                      {index + 1}
                    </th>
                    <td className="align-middle">
                      <LazyLoadImage
                        src={item.logo_bank}
                        alt={item.name}
                        width={50}
                        height={50}
                      />
                    </td>
                    <td className="align-middle">
                      <LazyLoadImage
                        src={item.qrcode}
                        alt={item.name}
                        width={50}
                        height={50}
                      />
                    </td>
                    <td className="align-middle">{item.bank_name}</td>
                    <td className="align-middle">{item.bank_number}</td>
                    <td className="align-middle">
                      <ActionTable
                        onEdit={(e) =>
                          setDetail({
                            info: item,
                            visible: true,
                            type: "edit",
                            index,
                          })
                        }
                        onDelete={(e) =>
                          setTooltip((prev) => {
                            return {
                              visible:
                                prev.target === e.target
                                  ? !tooltip.visible
                                  : true,
                              target: e.target,
                              info: item,
                              type: "delete",
                              index,
                            };
                          })
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <FormPayment
          data={detail}
          infoPayment={info}
          onClear={() => setDetail({ info: {}, visible: false, type: "" })}
        />
        <CustomTooltip
          loading={actionLoading}
          content={`Bạn có muốn xóa thông tin ngân hàng này không`}
          tooltip={tooltip}
          onClose={onCloseTooltip}
          onDelete={handleDelete}
        />
      </TemplateContent>
    </div>
  );
}

export default MethodPayment;
