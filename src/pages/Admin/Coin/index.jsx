/* eslint-disable react-hooks/exhaustive-deps */
import ActionTable from "components/common/ActionTable";
import CustomPagination from "components/common/CustomPagination";
import CustomTooltip from "components/common/CustomTooltip";
import LazyLoadImage from "components/common/LazyLoadImage";
import TemplateContent from "components/layout/TemplateContent";
import _size from "lodash/size";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionDelete, actionGetList, resetData } from "store/Coin/action";
import FormCoin from "./FormCoin";

function Coin(props) {
  const {
    listStatus: { isLoading, isSuccess, isFailure },
    actionStatus: { isLoading: actionLoading, isSuccess: actionSuccess },
    list,
    params,
    meta,
  } = useSelector((state) => state.coinReducer);

  const dispatch = useDispatch();
  const onGetListCategory = (body) => dispatch(actionGetList(body));
  const onDeleteCategory = (body) => dispatch(actionDelete(body));
  const onResetData = () => dispatch(resetData());

  const [currentPage, setCurrentPage] = useState(1);
  const [detail, setDetail] = useState({
    topic: {},
    visible: false,
    type: "",
  });
  const [tooltip, setTooltip] = useState({
    target: null,
    visible: false,
    id: null,
  });

  useEffect(() => {
    if (!isLoading) onGetListCategory(params);
    return () => {
      onResetData();
    };
  }, []);

  useEffect(() => {
    if (actionSuccess) onCloseTooltip();
  }, [actionSuccess]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onGetListCategory({ ...params, page });
  };

  const onCloseTooltip = () => {
    setTooltip({
      visible: false,
      target: null,
      id: null,
    });
  };

  return (
    <div className="mb-5">
      <TemplateContent
        title="Danh sách coin"
        showNew
        btnProps={{
          onClick: () =>
            setDetail((prev) => ({ ...prev, visible: true, type: "create" })),
        }}
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
                <td colSpan={16}>
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
              <tr key={item.updatedat + index}>
                <th scope="row" className="align-middle">
                  {index + 1}
                </th>
                <td className="align-middle">
                  {" "}
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
                <td className="align-middle">{item?.giamua}</td>
                <td className="align-middle">{item?.gaiban}</td>
                <td className="align-middle">{item?.sodu}</td>
                <td className="align-middle">{item?.address_pay}</td>
                <td className="align-middle" style={{ width: 200 }}>
                  <ActionTable
                    onDetail={() =>
                      setDetail({ info: item, visible: true, type: "detail" })
                    }
                    onEdit={() =>
                      setDetail({ info: item, visible: true, type: "edit" })
                    }
                    onDelete={(e) => {
                      setTooltip((prev) => {
                        return {
                          visible:
                            prev.target === e.target ? !tooltip.visible : true,
                          target: e.target,
                          id: item.id,
                        };
                      });
                    }}
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
        <CustomPagination
          loading={isLoading}
          totalItems={meta.total}
          perPage={params.limit}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </TemplateContent>
      <FormCoin
        data={detail}
        onClear={() => setDetail({ info: {}, visible: false, type: "" })}
      />
      <CustomTooltip
        content="Bạn có chắc muốn xóa coin này không?"
        tooltip={tooltip}
        loading={actionLoading}
        onClose={onCloseTooltip}
        onDelete={() => onDeleteCategory(tooltip.id)}
      />
    </div>
  );
}

export default Coin;
