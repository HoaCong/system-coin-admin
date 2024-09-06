/* eslint-disable react-hooks/exhaustive-deps */
import ActionTable from "components/common/ActionTable";
import CustomPagination from "components/common/CustomPagination";
import CustomTooltip from "components/common/CustomTooltip";
import LazyLoadImage from "components/common/LazyLoadImage";
import LinearProgress from "components/common/LinearProgress";
import ToggleSwitch from "components/common/ToggleSwitch";
import TemplateContent from "components/layout/TemplateContent";
import { ROUTES } from "constants/routerWeb";
import { parserRouter } from "helper/functions";
import _size from "lodash/size";
import { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionDelete, actionGetList, resetData } from "store/Customer/action";
import FormCustomer from "./FormCustomer";

function Customer(props) {
  const {
    listStatus: { isLoading, isSuccess, isFailure },
    actionStatus: { isLoading: actionLoading, isSuccess: actionSuccess },
    list,
    params,
    meta,
  } = useSelector((state) => state.customerReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onGetListCustomer = (body) => dispatch(actionGetList(body));
  const onDeleteCustomer = (body) => dispatch(actionDelete(body));
  const onResetData = () => dispatch(resetData());

  const [currentPage, setCurrentPage] = useState(1);
  const [detail, setDetail] = useState({
    info: {},
    visible: false,
    type: "",
  });
  const [tooltip, setTooltip] = useState({
    target: null,
    visible: false,
    info: null,
  });
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!isLoading) onGetListCustomer(params);
    return () => {
      onResetData();
    };
  }, []);

  useEffect(() => {
    if (actionSuccess) onCloseTooltip();
  }, [actionSuccess]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onGetListCustomer({ ...params, page });
  };

  const onCloseTooltip = () => {
    setTooltip({
      visible: false,
      target: null,
      info: null,
    });
  };

  const handleSearch = (type) => {
    const tmpQuery = !query || type === "reset" ? null : query.trim();
    onGetListCustomer({ ...params, page: 1, query: tmpQuery });
    setCurrentPage(1);
    if (type === "reset") setQuery("");
  };

  return (
    <div className="mb-5">
      <TemplateContent
        title="Danh sách khách hàng"
        showNew
        btnProps={{
          onClick: () =>
            setDetail((prev) => ({ ...prev, visible: true, type: "create" })),
        }}
        filter={
          <div className="d-flex align-items-end gap-2">
            <div style={{ width: "100%", maxWidth: 250 }}>
              <Form.Label htmlFor="search">Tìm kiếm</Form.Label>
              <Form.Control
                id="search"
                aria-label="Tìm kiếm"
                placeholder="Tìm kiếm"
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
              <th scope="col" className="align-middle">
                #
              </th>
              <th scope="col" className="align-middle">
                Hình ảnh
              </th>
              <th scope="col" className="align-middle">
                Tên khách hàng
              </th>
              <th scope="col" className="align-middle">
                Email
              </th>
              <th scope="col" className="align-middle">
                Số điện thoại
              </th>
              <th scope="col" className="align-middle">
                Email giới thiệu
              </th>
              <th scope="col" className="align-middle">
                Trạng thái
              </th>
              <th scope="col" className="align-middle">
                Hành động
              </th>
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
                  <LazyLoadImage
                    src={item.image}
                    alt={item.name}
                    witdh={50}
                    height={50}
                  />
                </td>
                <td className="align-middle">{item.full_name || "_"}</td>
                <td className="align-middle">{item.email || "_"}</td>
                <td className="align-middle">{item.phone || "_"}</td>
                <td className="align-middle">{item.ref_email || "_"}</td>
                <td className="align-middle">
                  <ToggleSwitch
                    status={item.active}
                    callback={(e) =>
                      setTooltip((prev) => {
                        return {
                          visible:
                            prev.target === e.target ? !tooltip.visible : true,
                          target: e.target,
                          info: item,
                        };
                      })
                    }
                  />
                </td>
                <td className="align-middle">
                  <ActionTable
                    onDetail={() =>
                      navigate(
                        parserRouter(ROUTES.ADMIN_CUSTOMER_DETAIL, item.id)
                      )
                    }
                    onEdit={() =>
                      setDetail({ info: item, visible: true, type: "edit" })
                    }
                  />
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
      <FormCustomer
        data={detail}
        onClear={() => setDetail({ info: {}, visible: false, type: "" })}
      />
      <CustomTooltip
        content={`Bạn có chắc muốn ${
          tooltip.info?.active ? "hủy " : ""
        }kích hoạt nhân viên này không?`}
        tooltip={tooltip}
        loading={actionLoading}
        onClose={onCloseTooltip}
        onDelete={() => onDeleteCustomer(tooltip.info.id)}
      />
    </div>
  );
}

export default Customer;
