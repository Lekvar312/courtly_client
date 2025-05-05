import { X } from "lucide-react";
import React from "react";

type Modal = {
  onClose: () => void;
  children: React.ReactNode;
};

const ModalView: React.FC<Modal> = ({ onClose, children }) => {
  return (
    <section
      onClick={onClose}
      className="w-full h-full z-50 bg-black/50 fixed inset-0 flex flex-col px-10 items-center justify-center backdrop-blur-xs"
    >
      <div onClick={(e) => e.stopPropagation()} className="bg-white relative text-black rounded-xl p-4 sm:w-96 w-full">
        <button
          type="button"
          onClick={onClose}
          className=" rounded-full absolute right-1 top-1 text-red-500 hover:bg-red-500 hover:text-white  font-bold text-xs cursor-pointer transition-all"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </section>
  );
};

export default ModalView;
