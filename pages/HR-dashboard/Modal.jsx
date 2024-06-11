
import React from 'react';
import Image from 'next/image';

const Modal = ({ show, handleClose, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button onClick={handleClose} 
         style={{
          background:"transparent",
          border:"none",
          position:"fixed",
          right:"4%",
          top:"4%"
        }}>
          <Image
          src={"/img/tableIcons/x-button.png"}
          width={42}
          height={42}
          className='table-icon'
          />
        </button>
      </section>
    </div>
  );
};

export default Modal;