/* eslint-disable react-hooks/exhaustive-deps */
import ActionTable from "components/common/ActionTable";
import CustomPagination from "components/common/CustomPagination";
import CustomTooltip from "components/common/CustomTooltip";
import LinearProgress from "components/common/LinearProgress";
import TemplateContent from "components/layout/TemplateContent";
import _size from "lodash/size";
import { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  actionChangeActive,
  actionDelete,
  actionGetList,
  resetData,
} from "store/Employee/action";
import FormEmployee from "./FormEmployee";
import { roleEnum } from "./helper";

function Employee(props) {
  const {
    listStatus: { isLoading, isSuccess, isFailure },
    actionStatus: { isLoading: actionLoading, isSuccess: actionSuccess },
    list,
    params,
    meta,
  } = useSelector((state) => state.employeeReducer);
  const {
    data: { user },
  } = useSelector((state) => state.loginReducer);

  const dispatch = useDispatch();
  const onGetListEmployee = (body) => dispatch(actionGetList(body));
  const onDeleteEmployee = (body) => dispatch(actionDelete(body));
  const onChangeActive = (body) => dispatch(actionChangeActive(body));
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
    type: "",
  });
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!isLoading) onGetListEmployee(params);
    return () => {
      onResetData();
    };
  }, []);

  useEffect(() => {
    if (actionSuccess) onCloseTooltip();
  }, [actionSuccess]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onGetListEmployee({ ...params, page });
  };

  const onCloseTooltip = () => {
    setTooltip({
      visible: false,
      target: null,
      info: null,
      type: "",
    });
  };
  const handleSearch = (type) => {
    const tmpQuery = !query || type === "reset" ? null : query.trim();
    onGetListEmployee({ ...params, page: 1, query: tmpQuery });
    setCurrentPage(1);
    if (type === "reset") setQuery("");
  };

  const handleDelete = () => {
    if (tooltip.type === "change") onChangeActive(tooltip.info.id);
    if (tooltip.type === "delete") onDeleteEmployee(tooltip.info.id);
  };

  return (
    <div>
      <TemplateContent
        title="Danh sách nhân viên"
        showNew
        btnProps={{
          onClick: () =>
            setDetail((prev) => ({ ...prev, visible: true, type: "create" })),
        }}
        filter={
          <div className="d-flex align-items-end gap-2 flex-wrap">
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
        <div
          className="d-flex w-100 overflow-auto h-100 mb-3"
          style={{ maxHeight: "calc(100vh - 380px)" }}
        >
          <table className="table table-hover table-striped">
            <thead className="sticky-top">
              <tr>
                <th scope="col" className="align-middle">
                  #
                </th>
                <th scope="col" className="align-middle">
                  Email
                </th>
                <th scope="col" className="align-middle">
                  Quyền
                </th>
                <th scope="col" className="align-middle">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading && _size(list) === 0 && (
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
              {list.map((item, index) => (
                <tr key={item.updatedAt + index}>
                  <th scope="row" className="align-middle">
                    {index + 1}
                  </th>
                  <td className="align-middle">{item.email}</td>
                  <td className="align-middle">
                    {roleEnum[item.role_id || "EMPLOYEE"]}
                  </td>
                  {/* <td className="align-middle">
                    <ToggleSwitch
                      status={item.active}
                      callback={(e) =>
                        setTooltip((prev) => {
                          return {
                            visible:
                              prev.target === e.target
                                ? !tooltip.visible
                                : true,
                            target: e.target,
                            info: item,
                            type: "change",
                          };
                        })
                      }
                    />
                  </td> */}
                  <td className="align-middle">
                    <ActionTable
                      onDetail={() =>
                        setDetail({ info: item, visible: true, type: "detail" })
                      }
                      {...("ADMIN" === user?.role_id
                        ? {
                            onEdit: (e) =>
                              setDetail({
                                info: item,
                                visible: true,
                                type: "edit",
                              }),
                          }
                        : [])}
                      {...("ADMIN" === user?.role_id
                        ? {
                            onDelete: (e) =>
                              setTooltip((prev) => {
                                return {
                                  visible:
                                    prev.target === e.target
                                      ? !tooltip.visible
                                      : true,
                                  target: e.target,
                                  info: item,
                                  type: "delete",
                                };
                              }),
                          }
                        : [])}
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
        </div>
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
      <FormEmployee
        data={detail}
        onClear={() => setDetail({ info: {}, visible: false, type: "" })}
      />

      <CustomTooltip
        content={
          tooltip.type === "change"
            ? `Bạn có chắc muốn ${
                tooltip.info?.active ? "hủy " : ""
              }kích hoạt nhân viên này không?`
            : `Bạn có chắc muốn ${
                tooltip.info?.active ? "xóa " : ""
              }kích hoạt nhân viên này không?`
        }
        tooltip={tooltip}
        loading={actionLoading}
        onClose={onCloseTooltip}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Employee;
