import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-bgModal bg-opacity-50 flex items-center justify-center overflow-hidden">
      <div className="fixed m-4 bg-dark rounded-lg max-w-lg w-full bg-darkBlack overflow-y-auto max-h-screen h-5/6 no-scrollbar">
        <button
          className="sticky top-2 left-4 text-white hover:text-yellow-500 z-20 text-5xl"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
