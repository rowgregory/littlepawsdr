import React, { ReactNode } from 'react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  modalStyles?: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, modalStyles, children }) => {
  if (!show) return null;

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'
      onClick={onClose}
    >
      <div
        className={`fade-in-slide-up bg-white rounded-xl shadow-lg w-full max-w-md relative ${modalStyles}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
