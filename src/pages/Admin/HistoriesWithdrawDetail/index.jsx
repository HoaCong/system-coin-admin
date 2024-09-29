import CustomPagination from "components/common/CustomPagination";
import CustomTooltip from "components/common/CustomTooltip";
import LazyLoadImage from "components/common/LazyLoadImage";
import LinearProgress from "components/common/LinearProgress";
import TemplateContent from "components/layout/TemplateContent";
import { STATUS_LABEL } from "constants";
import { format } from "date-fns";
import { formatNumber } from "helper/functions";
import _size from "lodash/size";
import { useEffect, useState } from "react";
import { Badge, Button, Form, Spinner } from "react-bootstrap"; // Import Tabs and Tab from react-bootstrap
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  actionCancel,
  actionConfirm,
  actionGetListDetail,
  resetData,
} from "store/HistoriesWithDraw/action";
import piImg from "../../../assets/images/pi.jpg";
import sidraImg from "../../../assets/images/sidra.png";
function HistoriesWithdrawDetail(props) {
  const {
    listStatus: { isLoading, isSuccess, isFailure },
    actionStatus: { isLoading: actionLoading, isSuccess: actionSuccess },
    list,
    params,
    meta,
  } = useSelector((state) => state.withdrawReducer);

  const dispatch = useDispatch();
  const onGetList = (body) => dispatch(actionGetListDetail(body));
  const onConfirm = (body) => dispatch(actionConfirm(body));
  const onCancel = (body) => dispatch(actionCancel(body));
  const onResetData = () => dispatch(resetData());

  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [sku, setQuery] = useState("");
  const [tooltip, setTooltip] = useState({
    target: null,
    visible: false,
    id: null,
    type: "",
  });

  useEffect(() => {
    if (!isLoading)
      onGetList({ ...params, limit: 10, page: 1, customerId: id }); // Include the selected tab type in the sku
    return () => {
      onResetData();
    };
  }, []); // Fetch data when tab changes

  useEffect(() => {
    if (actionSuccess) onCloseTooltip();
  }, [actionSuccess]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onGetList({ ...params, page, customerId: id });
  };

  const onCloseTooltip = () => {
    setTooltip({
      visible: false,
      target: null,
      id: null,
    });
  };

  const handleSubmitTooltip = () => {
    if (tooltip.type === "confirm") {
      onConfirm(tooltip.id);
    } else {
      onCancel(tooltip.id);
    }
  };

  const handleSearch = (type) => {
    const tmpQuery = !sku || type === "reset" ? null : sku.trim();
    onGetList({ ...params, page: 1, sku: tmpQuery, customerId: id });
    setCurrentPage(1);
    if (type === "reset") setQuery("");
  };

  return (
    <div className="mb-5">
      <TemplateContent
        title="Danh sách giao dịch của 1 khách hàng"
        filter={
          <div className="d-flex align-items-end gap-2">
            <div style={{ width: "100%", maxWidth: 250 }}>
              <Form.Label htmlFor="search">Tìm kiếm</Form.Label>
              <Form.Control
                id="search"
                aria-label="Tìm kiếm"
                placeholder="Tìm kiếm theo sku"
                name="sku"
                value={sku}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              ></Form.Control>
            </div>
            <Button
              onClick={() => handleSearch("filter")}
              disabled={isLoading && _size(list) > 0}
            >
              Tìm kiếm
            </Button>
            <Button
              variant="outline-secondary"
              disabled={isLoading && _size(list) > 0}
              onClick={() => handleSearch("reset")}
            >
              Đặt lại
            </Button>
          </div>
        }
      >
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Loại coin</th>
              <th scope="col">Mã SKU</th>
              <th scope="col">Khách hàng</th>
              <th scope="col">Số lượng coin</th>
              <th scope="col">Số coin của khách</th>
              <th scope="col">Ví coin</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && _size(list) === 0 && (
              <tr>
                <td colSpan={13}>
                  <div
                    className="d-flex justify-content-center align-items-center w-full"
                    style={{ height: 400 }}
                  >
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                </td>
              </tr>
            )}
            {list.map((item, index) => (
              <tr key={item.updatedAt + index}>
                <th scope="row" className="align-middle">
                  {index + 1}
                </th>
                <td className="align-middle">
                  <LazyLoadImage
                    src={item.type_coin === "PI_NETWORD" ? piImg : sidraImg}
                    alt={item.sku}
                    width={50}
                    height={50}
                    className="rounded-circle"
                  />
                </td>
                <td className="align-middle">
                  <b>{item?.sku}</b>
                  <div>{format(item?.createdAt, "MM:ss dd-MM-yyyy")}</div>
                </td>
                <td className="align-middle">
                  <b>{item?.Customer?.full_name}</b>
                  <div>{item?.Customer?.email}</div>
                  <div>{item?.Customer?.phone}</div>
                </td>
                <td className="align-middle">{item?.count_coin}</td>
                <td className="align-middle">
                  <div>Pi Coin: <b>{formatNumber(item?.Customer?.picoin || 0)}</b></div>
                  <div>
                    Sidra Coin: <b>{formatNumber(item?.Customer?.sidracoin || 0)}</b>
                  </div>
                </td>
                <td className="align-middle">{item?.wallet_coin}</td>
                <td className="align-middle">
                  <Badge
                    className="py-2 px-3"
                    pill
                    bg={STATUS_LABEL[item.status_order]?.bg}
                  >
                    {STATUS_LABEL[item.status_order]?.name}
                  </Badge>
                </td>
                <td className="align-middle" style={{ width: 200 }}>
                  {item.status_order === "IN_PROCESS" && (
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-outline-danger rounded-circle d-flex justify-content-center align-items-center"
                        style={{ width: 30, height: 30 }}
                        onClick={(e) => {
                          setTooltip((prev) => {
                            return {
                              visible:
                                prev.target === e.target
                                  ? !tooltip.visible
                                  : true,
                              target: e.target,
                              id: item.id,
                              type: "cancel",
                            };
                          });
                        }}
                      >
                        <i className="far fa-times-circle"></i>
                      </button>
                      <button
                        className="btn btn-outline-primary rounded-circle d-flex justify-content-center align-items-center"
                        style={{ width: 30, height: 30 }}
                        onClick={(e) =>
                          setTooltip((prev) => {
                            return {
                              visible:
                                prev.target === e.target
                                  ? !tooltip.visible
                                  : true,
                              target: e.target,
                              id: item.id,
                              type: "confirm",
                            };
                          })
                        }
                      >
                        <i className="far fa-check-circle"></i>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {!list?.length && (isSuccess || isFailure) && (
              <tr>
                <td colSpan={15} align="center">
                  Không tìm thấy dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {isLoading && _size(list) > 0 && (
          <div className="mb-2">
            <LinearProgress />
          </div>
        )}
        <CustomPagination
          loading={isLoading}
          totalItems={meta.total}
          perPage={params.limit}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </TemplateContent>
      <CustomTooltip
        content={`Bạn có chắc muốn ${
          tooltip.type === "confirm" ? "xác nhận" : "từ chối"
        } giao dịch này không?`}
        tooltip={tooltip}
        loading={actionLoading}
        onClose={onCloseTooltip}
        onDelete={handleSubmitTooltip}
      />
    </div>
  );
}

export default HistoriesWithdrawDetail;
