import PropTypes from "prop-types";
import React from "react";
import { Button } from "react-bootstrap";

function TemplateContent({
  labelNew = "Thêm mới",
  title,
  filter,
  children,
  showNew,
  headerProps,
  cardProps,
  btnProps,
  filterProps,
}) {
  return (
    <div className="d-grid gap-3" id="template">
      <div className="col-12 card" {...headerProps}>
        <div className="card-body d-flex justify-content-between align-items-center">
          <h5 className="m-0 title">
            <strong>{title}</strong>
          </h5>
          {showNew && <Button {...btnProps}>{labelNew}</Button>}
        </div>
      </div>

      {filter && (
        <div className="col-12 card" {...filterProps}>
          <div className="card-body">{filter}</div>
        </div>
      )}

      <div className="col-12 card" {...cardProps}>
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
}

TemplateContent.propTypes = {
  labelNew: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
  showNew: PropTypes.bool,
  cardProps: PropTypes.object,
  btnProps: PropTypes.object,
};

export default TemplateContent;
