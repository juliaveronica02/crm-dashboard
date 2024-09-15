import React from 'react';

function Modal({ show, handleClose, title, children, onConfirm, confirmText }) {
  if (!show) return null;

  return (
    <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            {onConfirm && (
              <button type="button" className="btn btn-primary" onClick={onConfirm}>
                {confirmText || "Confirm"}
              </button>
            )}
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;