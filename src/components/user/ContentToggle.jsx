import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

function ContentToggle({ title, content, statusCheck = false }) {
  const [checked, setChecked] = useState(statusCheck);
  useEffect(() => {
    setChecked(statusCheck);
  }, [statusCheck]);

  return (
    <div className="d-flex justify-content-between align-items-center mt-4">
      <div style={{ maxWidth: "220px" }}>
        <div className="mb-2">
          <small>
            <b>{title}</b>
          </small>
        </div>
        <div>
          <small className="text-black-50">{content}</small>
        </div>
      </div>

      <div className="form-switch fs-2 text text-right p-0">
        <input
          className="form-check-input bg-success"
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
      </div>
    </div>
  );
}

ContentToggle.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  statusCheck: PropTypes.bool,
};

export default ContentToggle;
