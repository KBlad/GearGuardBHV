import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

// 1. The Dark Overlay
const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
  backdrop-filter: blur(3px); /* Delightful blur effect */
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 2. The Pop-up Box
const ModalContainer = styled(motion.div)`
  background: white;
  width: 500px;
  max-width: 90%;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  position: relative;
  z-index: 1000;
`;

// 3. Close Button
const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #888;
  &:hover { color: #333; }
`;

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Backdrop
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Close when clicking outside
        >
          <ModalContainer
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <CloseButton onClick={onClose}><FaTimes /></CloseButton>
            <h2 style={{ marginTop: 0, marginBottom: "20px", color: "#333" }}>{title}</h2>
            {children}
          </ModalContainer>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default Modal;