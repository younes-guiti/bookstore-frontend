

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  onClear,
  disabled = false,
  size = "md", 
  variant = "default", 
}) {
  const [isFocused, setIsFocused] = useState(false);

  
  const sizes = {
    sm: {
      padding: "8px 14px",
      fontSize: "13px",
      height: "36px",
    },
    md: {
      padding: "10px 18px",
      fontSize: "15px",
      height: "44px",
    },
    lg: {
      padding: "14px 22px",
      fontSize: "17px",
      height: "52px",
    },
  };

  
  const getVariantStyles = () => {
    switch(variant) {
      case 'glass':
        return {
          background: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
        };
      case 'outlined':
        return {
          background: "transparent",
          border: "2px solid #e5e7eb",
          boxShadow: "none",
        };
      default:
        return {
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = sizes[size] || sizes.md;

  
  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange({ target: { value: "" } });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        width: "100%",
        maxWidth: "400px",
        marginBottom: "20px",
        position: "relative",
      }}
    >
      <motion.div
        animate={{
          scale: isFocused ? 1.01 : 1,
          boxShadow: isFocused 
            ? "0 0 0 4px rgba(37, 99, 235, 0.1), 0 4px 16px rgba(37, 99, 235, 0.06)" 
            : variantStyles.boxShadow || "none",
        }}
        transition={{ duration: 0.2 }}
        style={{
          display: "flex",
          alignItems: "center",
          borderRadius: "12px",
          ...variantStyles,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden",
        }}
      >
       
        <div
          style={{
            paddingLeft: sizeStyles.padding,
            display: "flex",
            alignItems: "center",
            color: isFocused ? "#2563eb" : "#9ca3af",
            transition: "color 0.2s ease",
          }}
        >
          <svg
            width={size === 'sm' ? 16 : size === 'lg' ? 20 : 18}
            height={size === 'sm' ? 16 : size === 'lg' ? 20 : 18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>

       
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            width: "100%",
            padding: sizeStyles.padding,
            paddingLeft: "8px",
            paddingRight: value ? "36px" : sizeStyles.padding,
            fontSize: sizeStyles.fontSize,
            height: sizeStyles.height,
            border: "none",
            outline: "none",
            background: "transparent",
            color: "#1f2937",
            transition: "all 0.2s ease",
            cursor: disabled ? "not-allowed" : "text",
            opacity: disabled ? 0.6 : 1,
          }}
          placeholder={placeholder}
        />

       
        <AnimatePresence>
          {value && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClear}
              disabled={disabled}
              style={{
                position: "absolute",
                right: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "4px",
                borderRadius: "50%",
                border: "none",
                background: "rgba(0,0,0,0.05)",
                color: "#9ca3af",
                cursor: disabled ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                fontSize: size === 'sm' ? '14px' : '18px',
                width: size === 'sm' ? '24px' : '28px',
                height: size === 'sm' ? '24px' : '28px',
              }}
              onMouseEnter={(e) => {
                if (!disabled) {
                  e.currentTarget.style.background = "rgba(0,0,0,0.1)";
                  e.currentTarget.style.color = "#374151";
                }
              }}
              onMouseLeave={(e) => {
                if (!disabled) {
                  e.currentTarget.style.background = "rgba(0,0,0,0.05)";
                  e.currentTarget.style.color = "#9ca3af";
                }
              }}
            >
              ✕
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

     
      {value && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: "absolute",
            bottom: "-20px",
            left: "12px",
            fontSize: "12px",
            color: "#9ca3af",
          }}
        >
          {value.length} caractères
        </motion.div>
      )}
    </motion.div>
  );
}

export default SearchBar;