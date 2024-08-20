import React from 'react';
import '../../../CSS/EMPLOYERS/modal.css'



const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '300px',
        position: 'relative',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          fontSize: '16px',
          cursor: 'pointer',
        }}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
