import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-bgModal bg-opacity-50 flex items-center justify-center overflow-hidden">
      <div className="fixed m-4 bg-dark rounded-lg md:w-4/5 w-52 bg-darkBlack overflow-y-auto max-h-screen h-5/6 no-scrollbar">
        <button
          className="sticky top-2 left-full m-2 bg-lightJaune bg-opacity-40 rounded-full text-white hover:bg-red-500 z-20 text-5xl"
          onClick={onClose}
        >
          <img src="/cross.svg" alt="" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
