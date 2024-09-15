/* eslint-disable react-hooks/exhaustive-deps */
import CustomPagination from "components/common/CustomPagination";
import CustomTooltip from "components/common/CustomTooltip";
import LazyLoadImage from "components/common/LazyLoadImage";
import TemplateContent from "components/layout/TemplateContent";
import { formatNumber } from "helper/functions";
import _size from "lodash/size";
import { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  actionCancel,
  actionConfirm,
  actionGetList,
  resetData,
} from "store/Histories/action";

function Histories(props) {
  const {
    listStatus: { isLoading, isSuccess, isFailure },
    actionStatus: { isLoading: actionLoading, isSuccess: actionSuccess },
    list,
    params,
    meta,
  } = useSelector((state) => state.historiesReducer);

  const dispatch = useDispatch();
  const onGetList = (body) => dispatch(actionGetList(body));
  const onConfirm = (body) => dispatch(actionConfirm(body));
  const onCancel = (body) => dispatch(actionCancel(body));
  const onResetData = () => dispatch(resetData());

  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  const [tooltip, setTooltip] = useState({
    target: null,
    visible: false,
    id: null,
    type: "",
  });

  useEffect(() => {
    if (!isLoading) onGetList(params);
    return () => {
      onResetData();
    };
  }, []);

  useEffect(() => {
    if (actionSuccess) onCloseTooltip();
  }, [actionSuccess]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onGetList({ ...params, page });
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
    const tmpQuery = !query || type === "reset" ? null : query.trim();
    onGetList({ ...params, page: 1, query: tmpQuery });
    setCurrentPage(1);
    if (type === "reset") setQuery("");
  };

  return (
    <div className="mb-5">
      <TemplateContent
        title="Lịch sử giao dịch"
        filter={
          <div className="d-flex align-items-end gap-2">
            <div style={{ width: "100%", maxWidth: 250 }}>
              <Form.Label htmlFor="search">Tìm kiếm</Form.Label>
              <Form.Control
                id="search"
                aria-label="Tìm kiếm"
                placeholder="Tìm kiếm theo sku"
                name="query"
                value={query}
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
              <th scope="col">Hình ảnh</th>
              <th scope="col">Tên coin</th>
              <th scope="col">Giá mua</th>
              <th scope="col">Giá bán</th>
              <th scope="col">Số dư</th>
              <th scope="col">Địa chỉ mua</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && _size(list) === 0 && (
              <tr>
                <td colSpan={8}>
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
                  <td className="align-middle">
                    <LazyLoadImage
                      src={item.image}
                      alt={item.name}
                      witdh={50}
                      height={50}
                    />
                  </td>
                </td>
                <td className="align-middle">{item?.name}</td>
                <td className="align-middle">{formatNumber(item?.giamua)}</td>
                <td className="align-middle">{formatNumber(item?.giaban)}</td>
                <td className="align-middle">{formatNumber(item?.sodu)}</td>
                <td className="align-middle">{item?.address_pay}</td>
                <td className="align-middle" style={{ width: 200 }}>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-primary rounded-circle d-flex justify-content-center align-items-center"
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
                </td>
              </tr>
            ))}
            {!list?.length && (isSuccess || isFailure) && (
              <tr>
                <td colSpan={8} align="center">
                  Không tìm thấy dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
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

export default Histories;
