/* eslint-disable react-hooks/exhaustive-deps */
import LazyLoadImage from "components/common/LazyLoadImage";
import TemplateContent from "components/layout/TemplateContent";
import { STATUS_LABEL, TYPE_LABEL } from "constants";
import { ROUTES } from "constants/routerWeb";
import { formatCurrency } from "helper/functions";
import _map from "lodash/map";
import { Fragment, useEffect, useState } from "react";
import { Badge, Collapse, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { actionDetail } from "store/Customer/action";
function DetailCustomer(props) {
  const {
    actionStatus: { isLoading },
    detail,
  } = useSelector((state) => state.customerReducer);

  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();
  const onGetDetailCustomer = (id) => dispatch(actionDetail(id));

  const [expandedRows, setExpandedRows] = useState(null);
  useEffect(() => {
    if (!isLoading) onGetDetailCustomer(id);
  }, []);

  const handleExpandCollapse = (index) => {
    setExpandedRows((prev) => {
      if (prev === index) return -1;
      return index;
    });
  };
  return (
    <div className="mb-5">
      <TemplateContent
        title="Thông tin chi tiết khách hàng"
        showNew
        labelNew="Quay lại"
        btnProps={{
          onClick: () => navigate(ROUTES.ADMIN_CUSTOMER),
          variant: "outline-primary",
        }}
        cardProps={{ className: "col-12" }}
      >
        {isLoading ? (
          <div
            className=" card d-flex justify-content-center align-items-center w-full"
            style={{ height: 400 }}
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <div className="row g-2">
            <div className="col-12 col-md-4">
              <div className="card text-center py-2">
                <h5>Thông tin khách hàng</h5>
                <div>
                  <LazyLoadImage
                    src={detail?.image}
                    alt={detail?.name}
                    width={80}
                    height={80}
                    className="rounded-circle"
                  />
                  <div>Tên khách hàng: {detail?.fullname || "_"}</div>
                  <div>Email: {detail?.email || "_"}</div>
                  <div>Số điện thoại: {detail?.phone || "_"}</div>
                </div>
                <hr className="w-75 mx-auto" />
                <h5> Cơ sở thường đến </h5>
                {_map(detail?.listFactory, (item, index) => (
                  <div key={index}>
                    {index + 1}. {item.name} ({item.count})
                  </div>
                ))}
              </div>
            </div>
            <div className="col-12 col-md">
              <div className="card mb-2">
                <h5 className="mt-2 px-2">Dịch vụ yêu thích</h5>
                <div className="px-2">
                  <table className="table table-hover table-striped">
                    <thead>
                      <tr>
                        <th scope="col" className="align-middle">
                          #
                        </th>
                        <th scope="col" className="align-middle">
                          Hình ảnh
                        </th>
                        <th scope="col" className="align-middle">
                          Tên dịch vụ
                        </th>
                        <th scope="col" className="align-middle">
                          Số buổi
                        </th>
                        <th scope="col" className="align-middle">
                          Giá
                        </th>
                        <th scope="col" className="align-middle">
                          Thời gian
                        </th>
                        <th scope="col" className="align-middle">
                          Danh mục
                        </th>
                        <th scope="col" className="align-middle">
                          Lượt đặt
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {_map(detail?.listService, (item, index) => (
                        <tr key={item.updatedAt + index}>
                          <th scope="row" className="align-middle">
                            {index + 1}
                          </th>
                          <td className="align-middle">
                            <LazyLoadImage
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            />
                          </td>
                          <td className="align-middle">{item.name}</td>
                          <td className="align-middle">
                            {item.numbersesion} buổi
                          </td>
                          <td className="align-middle">
                            {formatCurrency(item.price)}
                          </td>
                          <td className="align-middle">{item.time}</td>
                          <td className="align-middle">{item.category}</td>
                          <td className="align-middle">{item.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card">
                <h5 className="mt-2 px-2">Lịch sử đặt lịch</h5>
                <div className="px-2">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col" className="align-middle"></th>
                        <th scope="col" className="align-middle">
                          #
                        </th>
                        <th scope="col" className="align-middle">
                          Thời gian
                        </th>
                        <th scope="col" className="align-middle">
                          Cơ sở
                        </th>
                        <th scope="col" className="align-middle">
                          Trạng thái
                        </th>
                        <th scope="col" className="align-middle">
                          Ghi chú
                        </th>
                        {/* <th scope="col" className="align-middle">
                            Hành động
                          </th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {_map(detail?.listBooking, (item, index) => (
                        <Fragment key={item.updatedAt + index}>
                          <tr onClick={() => handleExpandCollapse(index)}>
                            <th scope="row" className="align-middle">
                              <div style={{ width: 16 }}>
                                {expandedRows === index ? (
                                  <i className="fas fa-chevron-down text-secondary"></i>
                                ) : (
                                  <i className="fas fa-chevron-right text-secondary"></i>
                                )}
                              </div>
                            </th>
                            <th scope="row" className="align-middle">
                              {index + 1}
                            </th>
                            <td className="align-middle">
                              {`${item.timedate} ${item.timehour}`}
                            </td>
                            <td className="align-middle">
                              {item?.factory?.name || "_"}
                            </td>
                            <td className="align-middle">
                              <Badge
                                className="py-2 px-3"
                                pill
                                bg={STATUS_LABEL[item.status].bg}
                              >
                                {STATUS_LABEL[item.status].name}
                              </Badge>
                            </td>
                            <td className="align-middle">{item.note || "_"}</td>
                            {/* <td className="align-middle">
                                {item.status === "CONFIRMED" && (
                                  <div className="d-flex gap-2">
                                    <button
                                      className="btn btn-outline-primary rounded-circle d-flex justify-content-center align-items-center"
                                      style={{ width: 30, height: 30 }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        // handleDetailBooking(item.id);
                                      }}
                                    >
                                      <i className="far fa-eye"></i>
                                    </button>
                                    <button
                                      className="btn btn-outline-warning rounded-circle d-flex justify-content-center align-items-center"
                                      style={{ width: 30, height: 30 }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        // setDetail((prev) => ({
                                        //   ...prev,
                                        //   info: item,
                                        //   visible: true,
                                        //   type: "edit",
                                        // }));
                                      }}
                                    >
                                      <i className="fas fa-pencil-alt"></i>
                                    </button>
                                  </div>
                                )}
                                {item.status === "IN_PROCCESS" && (
                                  <div className="d-flex gap-2">
                                    <button
                                      className="btn btn-outline-success rounded-circle d-flex justify-content-center align-items-center"
                                      style={{ width: 30, height: 30 }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        // setTooltip((prev) => {
                                        //   return {
                                        //     visible:
                                        //       prev.target === e.target
                                        //         ? !tooltip.visible
                                        //         : true,
                                        //     target: e.target,
                                        //     info: item,
                                        //     type: "confirm",
                                        //   };
                                        // });
                                      }}
                                    >
                                      <i className="far fa-check-circle"></i>
                                    </button>
                                    <button
                                      className="btn btn-outline-danger rounded-circle d-flex justify-content-center align-items-center"
                                      style={{ width: 30, height: 30 }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        // setTooltip((prev) => {
                                        //   return {
                                        //     visible:
                                        //       prev.target === e.target
                                        //         ? !tooltip.visible
                                        //         : true,
                                        //     target: e.target,
                                        //     info: item,
                                        //     type: "destroy",
                                        //   };
                                        // });
                                      }}
                                    >
                                      <i className="far fa-times-circle"></i>
                                    </button>
                                  </div>
                                )}
                              </td> */}
                          </tr>
                          <tr>
                            <td colSpan="9" className="p-0">
                              <Collapse in={expandedRows === index}>
                                <div className="p-2">
                                  <table className="table table-hover table-striped mb-0">
                                    <thead>
                                      <tr>
                                        <th
                                          scope="col"
                                          className="align-middle"
                                        >
                                          #
                                        </th>
                                        <th
                                          scope="col"
                                          className="align-middle"
                                        >
                                          Hình ảnh
                                        </th>
                                        <th
                                          scope="col"
                                          className="align-middle"
                                        >
                                          Tên dịch vụ
                                        </th>
                                        <th
                                          scope="col"
                                          className="align-middle"
                                        >
                                          Số buổi
                                        </th>
                                        <th
                                          scope="col"
                                          className="align-middle"
                                        >
                                          Giá
                                        </th>
                                        <th
                                          scope="col"
                                          className="align-middle"
                                        >
                                          Thời gian
                                        </th>
                                        <th
                                          scope="col"
                                          className="align-middle"
                                        >
                                          Danh mục
                                        </th>
                                        <th
                                          scope="col"
                                          className="align-middle"
                                        >
                                          Trạng thái
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {item.listService.map((ele, index) => (
                                        <tr key={ele.updatedAt + index}>
                                          <th
                                            scope="row"
                                            className="align-middle"
                                          >
                                            {index + 1}
                                          </th>
                                          <td className="align-middle">
                                            <LazyLoadImage
                                              src={ele.image}
                                              alt={ele.name}
                                              width={50}
                                              height={50}
                                            />
                                          </td>
                                          <td className="align-middle">
                                            {ele.name}
                                          </td>
                                          <td className="align-middle">
                                            {ele.numbersesion} buổi
                                          </td>
                                          <td className="align-middle">
                                            {formatCurrency(ele.price)}
                                          </td>
                                          <td className="align-middle">
                                            {ele.time}
                                          </td>
                                          <td className="align-middle">
                                            {TYPE_LABEL[ele.category]}
                                          </td>
                                          <td className="align-middle">
                                            <Badge
                                              className="py-2 px-3"
                                              pill
                                              bg={STATUS_LABEL[item.status].bg}
                                            >
                                              {STATUS_LABEL[item.status].name}
                                            </Badge>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </Collapse>
                            </td>
                          </tr>
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </TemplateContent>
    </div>
  );
}

export default DetailCustomer;
