

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Modal({
  
  isOpen,
  title,
  children,
  onClose,
  
  
  size = "md",          
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className = "",
  style = {},
}) {
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [isOpen]);

  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && closeOnEsc && isOpen) {
        onClose?.();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, closeOnEsc]);

  
  const sizes = {
    sm: { width: "400px", maxWidth: "90vw" },
    md: { width: "560px", maxWidth: "90vw" },
    lg: { width: "720px", maxWidth: "90vw" },
    xl: { width: "960px", maxWidth: "90vw" },
    full: { width: "90vw", maxWidth: "90vw" },
  };

  if (!isOpen) return null;

  
  const modalContent = (
    <AnimatePresence>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "16px",
        }}
      >
       
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            cursor: closeOnOverlayClick ? "pointer" : "default",
          }}
          onClick={closeOnOverlayClick ? onClose : undefined}
        />

        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 300,
          }}
          style={{
            position: "relative",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderRadius: "16px",
            padding: "0",
            boxShadow: "0 25px 60px rgba(0,0,0,0.2), 0 8px 20px rgba(0,0,0,0.06)",
            border: "1px solid rgba(255,255,255,0.2)",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            ...sizes[size] || sizes.md,
            ...style,
          }}
          className={className}
          onClick={(e) => e.stopPropagation()}
        >
          
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 24px",
              borderBottom: "1px solid rgba(229, 231, 235, 0.5)",
              flexShrink: 0,
            }}
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              style={{
                fontSize: "20px",
                fontWeight: "700",
                margin: 0,
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {title}
            </motion.h2>

            {showCloseButton && (
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "#9ca3af",
                  padding: "4px 8px",
                  borderRadius: "8px",
                  transition: "all 0.2s ease",
                  lineHeight: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#374151";
                  e.currentTarget.style.background = "#f3f4f6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#9ca3af";
                  e.currentTarget.style.background = "none";
                }}
              >
                ✕
              </motion.button>
            )}
          </div>

        
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            style={{
              padding: "24px",
              overflowY: "auto",
              flex: 1,
            }}
          >
            {children}
          </motion.div>

         
          {!children?.props?.noFooter && (
            <div
              style={{
                padding: "16px 24px",
                borderTop: "1px solid rgba(229, 231, 235, 0.5)",
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                flexShrink: 0,
              }}
            >
              <button
                onClick={onClose}
                style={{
                  padding: "8px 20px",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  background: "#f9fafb",
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "14px",
                  color: "#374151",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f3f4f6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#f9fafb";
                }}
              >
                Fermer
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );


  const modalRoot = document.getElementById('modal-root') || document.body;
  return createPortal(modalContent, modalRoot);
}

export default Modal;