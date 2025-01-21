import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

const ModalCard = ({
  children,
  handleClose,
}: {
  children: ReactNode;
  handleClose: () => void;
}) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleCloseAnywhere = (e: any) => {
    if (e.target.id === "modal-container") {
      setShowModal(false);

      setTimeout(() => {
        handleClose();
      }, 300);
    }
  };

  return createPortal(
    <div
      className={twMerge(
        "fixed top-0 left-0 right-0 bottom-0 bg-[#000000a9] flex items-center justify-center !m-0 z-[200] transition-all duration-300 w-full h-full",
        !showModal && "opacity-0 pointer-events-none -z-10"
      )}
      id="modal-container"
      onClick={handleCloseAnywhere}
      style={{ backdropFilter: "blur(10px)" }}
    >
      <div className="flex flex-col space-y-5 items-between justify-center w-10/12 max-w-[350px] lg:max-w-[unset] lg:w-[400px] bg-background rounded-xl p-4 relative max-h-[95%]">
        {children}
      </div>
    </div>,
    document.getElementById("portal")!
  );
};

export default ModalCard;
