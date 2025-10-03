import React, { useEffect } from "react";
import "./Modal.css";

function Modal({ isOpen, onClose, title, description, children, footer, size = "md" }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" role="presentation" onClick={(event) => {
      if (event.target === event.currentTarget) {
        onClose?.();
      }
    }}>
      <div className={`modal ${`modal--${size}`}`.trim()} role="dialog" aria-modal="true">
        <header className="modal__header">
          {title ? <h2 className="modal__title">{title}</h2> : null}
          <button type="button" className="modal__close" aria-label="Close" onClick={onClose}>
            {'\u00d7'}
          </button>
        </header>
        {description ? <p className="modal__description">{description}</p> : null}
        <div className="modal__content">{children}</div>
        {footer ? <footer className="modal__footer">{footer}</footer> : null}
      </div>
    </div>
  );
}

export default Modal;
