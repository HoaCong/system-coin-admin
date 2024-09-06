import PropTypes from "prop-types";

function ActionTable({
  propsDetail,
  propsEdit,
  propsDelete,
  onDetail,
  onEdit,
  onDelete,
}) {
  return (
    <div className="d-flex gap-2">
      {onDetail && (
        <button
          className="btn btn-outline-primary rounded-circle d-flex justify-content-center align-items-center"
          style={{ width: 30, height: 30 }}
          onClick={onDetail}
          {...propsDetail}
        >
          <i className="far fa-eye"></i>
        </button>
      )}
      {onEdit && (
        <button
          className="btn btn-outline-warning rounded-circle d-flex justify-content-center align-items-center"
          style={{ width: 30, height: 30 }}
          onClick={onEdit}
          {...propsEdit}
        >
          <i className="fas fa-pencil-alt"></i>
        </button>
      )}
      {onDelete && (
        <button
          className="btn btn-outline-danger rounded-circle d-flex justify-content-center align-items-center"
          style={{ width: 30, height: 30 }}
          onClick={onDelete}
          {...propsDelete}
        >
          <i className="far fa-trash-alt"></i>
        </button>
      )}
    </div>
  );
}

ActionTable.propTypes = {
  onDetail: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  propsDetail: PropTypes.any,
  propsEdit: PropTypes.any,
  propsDelete: PropTypes.any,
};

export default ActionTable;
