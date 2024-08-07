"use client";
import { useRef, useState, useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  hasCloseButton?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  hasCloseButton,
  onClose,
  children,
}) => {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      if (isModalOpen) modalElement.showModal();
      else modalElement.close();
    }
  }, [isModalOpen]);

  const handleCloseModal = () => {
    if (onClose) onClose();
    setModalOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") handleCloseModal();
  };

  return (
    <dialog ref={modalRef} className="w-1/2 h-1/2 rounded-lg">
      {children}
      {hasCloseButton && (
        <button className="modal-close-btn" onClick={handleCloseModal}>
          Close
        </button>
      )}
    </dialog>
  );
};
