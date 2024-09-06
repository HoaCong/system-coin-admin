import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "store/Toast/action";

function ToastComponent() {
  const { toasts } = useSelector((state) => state.toastReducer);
  const dispatch = useDispatch();
  const onSetToast = (body) => dispatch(setToast(body));

  return (
    <ToastContainer
      position="top-end"
      className="p-3 position-fixed"
      style={{ zIndex: 3101 }}
    >
      {toasts.map((toast, index) => (
        <Toast
          key={toast.key}
          autohide
          delay={toast?.life || 3000}
          className={`mb-3 bg-${toast.type}`}
          onClose={() => {
            const newToasts = toasts.filter((item) => item.key !== toast.key);
            onSetToast(newToasts);
          }}
        >
          {toast.title && (
            <Toast.Header className="d-flex justify-content-between">
              <strong>{toast.title}</strong>
            </Toast.Header>
          )}
          <Toast.Body className="text-white d-flex align-items-center">
            <span>{toast.text}</span>
            {!toast.title && (
              <i
                className="fas fa-times ms-auto"
                onClick={() => {
                  const newToasts = toasts.filter(
                    (item) => item.key !== toast.key
                  );
                  onSetToast(newToasts);
                }}
              ></i>
            )}
          </Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
}

export default ToastComponent;
