

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

function Input({
 
  type = "text",
  placeholder = "",
  value,
  onChange,
  name,
  disabled = false,
  
  
  label = "",
  error = "",
  success = false,
  required = false,
  icon: Icon,
  className = "",
  onFocus,
  onBlur,
}) {
  
  const [isFocused, setIsFocused] = useState(false);
  
 
  const [showPassword, setShowPassword] = useState(false);
  
  
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  
  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  
  const baseStyle = {
    width: "100%",
    padding: "12px 16px",
    paddingLeft: Icon ? "44px" : "16px",
    paddingRight: isPassword ? "44px" : "16px",
    border: `2px solid ${
      error ? "#ef4444" : 
      success ? "#22c55e" : 
      isFocused ? "#2563eb" : "#e5e7eb"
    }`,
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "500",
    color: "#1f2937",
    backgroundColor: error ? "#fef2f2" : success ? "#f0fdf4" : "#ffffff",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    outline: "none",
    boxShadow: isFocused ? "0 0 0 4px rgba(37, 99, 235, 0.1)" : "none",
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? "not-allowed" : "text",
    ...(disabled ? { pointerEvents: "none" } : {}),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        width: "100%",
        marginBottom: "16px",
      }}
      className={className}
    >
      
      {label && (
        <label
          style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "600",
            color: "#374151",
            marginBottom: "6px",
          }}
        >
          {label}
          {required && (
            <span style={{ color: "#ef4444", marginLeft: "4px" }}>*</span>
          )}
        </label>
      )}

      
      <div style={{ position: "relative" }}>
       
        {Icon && (
          <div
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: isFocused ? "#2563eb" : "#9ca3af",
              transition: "color 0.3s ease",
              pointerEvents: "none",
            }}
          >
            <Icon size={18} />
          </div>
        )}

        <input
         
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          disabled={disabled}
         
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          style={baseStyle}
        />

       
        <AnimatePresence>
          {success && !error && !isPassword && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#22c55e",
                pointerEvents: "none",
              }}
            >
              ✓
            </motion.div>
          )}
        </AnimatePresence>

        
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#9ca3af",
              padding: "4px",
              borderRadius: "4px",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#4b5563";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#9ca3af";
            }}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        )}
      </div>

      
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            style={{
              marginTop: "6px",
              fontSize: "13px",
              color: "#ef4444",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span>⚠️</span>
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      
      <AnimatePresence>
        {success && !error && label && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            style={{
              marginTop: "6px",
              fontSize: "13px",
              color: "#22c55e",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span>✅</span>
            Champ valide
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Input;