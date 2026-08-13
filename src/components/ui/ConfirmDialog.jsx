

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirmer",
  cancelText = "Annuler",
  confirmVariant = "danger", 
  loading = false,
}) {
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onCancel?.();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen]);

  
  const getConfirmStyles = () => {
    switch(confirmVariant) {
      case 'danger':
        return {
          background: "linear-gradient(135deg, #ef4444, #dc2626)",
          hover: "linear-gradient(135deg, #dc2626, #b91c1c)",
          color: "#fff",
        };
      case 'success':
        return {
          background: "linear-gradient(135deg, #22c55e, #16a34a)",
          hover: "linear-gradient(135deg, #16a34a, #15803d)",
          color: "#fff",
        };
      default:
        return {
          background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
          hover: "linear-gradient(135deg, #1d4ed8, #1e40af)",
          color: "#fff",
        };
    }
  };

  const confirmStyles = getConfirmStyles();

  if (!isOpen) return null;

  return (
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
            background: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            cursor: "pointer",
          }}
          onClick={onCancel}
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
            padding: "0",
            borderRadius: "20px",
            width: "400px",
            maxWidth: "90vw",
            boxShadow: "0 25px 60px rgba(0,0,0,0.2), 0 8px 20px rgba(0,0,0,0.06)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            overflow: "hidden",
          }}
          onClick={(e) => e.stopPropagation()}
        >
         
          <div
            style={{
              padding: "24px 24px 16px 24px",
              textAlign: "center",
            }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                damping: 15,
                stiffness: 200,
                delay: 0.1,
              }}
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #fef2f2, #fee2e2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px auto",
                fontSize: "28px",
              }}
            >
              ⚠️
            </motion.div>

            
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              style={{
                margin: 0,
                fontSize: "20px",
                fontWeight: "700",
                color: "#1f2937",
                lineHeight: "1.3",
              }}
            >
              {title}
            </motion.h2>
          </div>

        
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              padding: "0 24px 24px 24px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "15px",
                color: "#6b7280",
                lineHeight: "1.6",
              }}
            >
              {message}
            </p>
          </motion.div>

         
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              padding: "16px 24px 24px 24px",
              borderTop: "1px solid #f3f4f6",
              background: "rgba(249, 250, 251, 0.5)",
            }}
          >
           
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCancel}
              disabled={loading}
              style={{
                padding: "10px 20px",
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
                background: "#ffffff",
                color: "#374151",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "14px",
                fontWeight: "600",
                transition: "all 0.2s ease",
                opacity: loading ? 0.5 : 1,
                minWidth: "80px",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = "#f3f4f6";
                  e.currentTarget.style.borderColor = "#d1d5db";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = "#ffffff";
                  e.currentTarget.style.borderColor = "#e5e7eb";
                }
              }}
            >
              {cancelText}
            </motion.button>

            
            <motion.button
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.95 } : {}}
              onClick={onConfirm}
              disabled={loading}
              style={{
                padding: "10px 20px",
                borderRadius: "10px",
                border: "none",
                background: loading ? "#9ca3af" : confirmStyles.background,
                color: confirmStyles.color,
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "14px",
                fontWeight: "600",
                transition: "all 0.2s ease",
                opacity: loading ? 0.7 : 1,
                minWidth: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = confirmStyles.hover;
                  e.currentTarget.style.transform = "scale(1.02)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = confirmStyles.background;
                  e.currentTarget.style.transform = "scale(1)";
                }
              }}
            >
              {loading && (
                <span
                  style={{
                    display: "inline-block",
                    width: "16px",
                    height: "16px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTop: "2px solid #ffffff",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
              )}
              {confirmText}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </AnimatePresence>
  );
}

export default ConfirmDialog;