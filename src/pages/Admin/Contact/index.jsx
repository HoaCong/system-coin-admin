/* eslint-disable react-hooks/exhaustive-deps */
import CustomPagination from "components/common/CustomPagination";
import CustomTooltip from "components/common/CustomTooltip";
import LinearProgress from "components/common/LinearProgress";
import TemplateContent from "components/layout/TemplateContent";
import { STATUS_LABEL } from "constants";
import _size from "lodash/size";
import { useEffect, useState } from "react";
import { Badge, Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionConfirm, actionGetList, resetData } from "store/Contact/action";

function Contact(props) {
  const {
    listStatus: { isLoading, isSuccess, isFailure },
    actionStatus: { isLoading: actionLoading, isSuccess: actionSuccess },
    list,
    params,
    meta,
  } = useSelector((state) => state.contactReducer);
  console.log("Contact  isLoading:", isLoading);

  const dispatch = useDispatch();
  const onGetList = (body) => dispatch(actionGetList(body));
  const onConfirm = (body) => dispatch(actionConfirm(body));
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
    onConfirm(tooltip.id);
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
        title="Lịch sử liên hệ"
        filter={
          <div className="d-flex align-items-end gap-2">
            <div style={{ width: "100%", maxWidth: 250 }}>
              <Form.Label htmlFor="search">Tìm kiếm</Form.Label>
              <Form.Control
                id="search"
                aria-label="Tìm kiếm"
                placeholder="Tìm kiếm theo email, sđt"
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
              <th scope="col">Họ tên</th>
              <th scope="col">Email</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Nội dung</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Thao tác</th>
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
                <td className="align-middle">{item?.full_name}</td>
                <td className="align-middle">{item?.email}</td>
                <td className="align-middle">{item?.sdt}</td>
                <td className="align-middle">{item?.content}</td>
                <td className="align-middle">
                  <Badge
                    className="py-2 px-3"
                    pill
                    bg={STATUS_LABEL[item.status]?.bg}
                  >
                    {STATUS_LABEL[item.status]?.name}
                  </Badge>
                </td>
                <td className="align-middle" style={{ width: 200 }}>
                  <div className="d-flex gap-2">
                    {item.status !== "CANCEL" && (
                      <button
                        className="btn btn-outline-danger rounded-circle d-flex justify-content-center align-items-center"
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
                              type: "cancel",
                            };
                          })
                        }
                      >
                        <i className="far fa-times-circle"></i>
                      </button>
                    )}
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
        content={`Bạn có chắc muốn đóng liên hệ này không?`}
        tooltip={tooltip}
        loading={actionLoading}
        onClose={onCloseTooltip}
        onDelete={handleSubmitTooltip}
      />
    </div>
  );
}

export default Contact;
