import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="   fixed inset-0 bg-bgModal bg-opacity-50 flex  justify-center"
      onClick={handleOutsideClick}
    >
      <div className=" relative bg-dark rounded-lg max-w-lg w-full bg-darkBlack">
        {children}
      </div>
    </div>
  );
};

export default Modal;
